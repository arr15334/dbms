var express = require('express');
var router = express.Router();
var fs = require('fs');
var rimraf = require('rimraf');
const db_queries = require('./queries_functions/database');
const table_queries = require('./queries_functions/table');
const register_queries = require('./queries_functions/register');

const nearley = require('nearley')
const grammar = require('../grammar/sql92.js')

var db = '';
var sqlQuery = {data: []}

router.post('/queries', function (req, res) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(req.body['sql_query'])
  // limpiar query anterior
  sqlQuery = {data: []}
  parseResult(parser.results[0][0][0])
  console.log(sqlQuery);
  const sqlObj = formatQuery()
  console.log(routeQueries(sqlObj,db));
  res.json(sqlObj)
});

// funcion para ordenar el query
function parseResult (res) {
  for (let i = 0; i<res.length; i++) {
    if (!(res[i] instanceof Array)) {
      sqlQuery.data.push(res[i])
    } else {
      // llamada recursiva
      parseResult(res[i])
    }
  }
}

function formatQuery () {
  let finalQuery = {
    action: '',
    object: '',
    id: {
      name: '',
      newName: ''
    },
    columns: {},
    constraints: {}
  }
  let columns = []
  let constraints = []
  let isColumn = 0
  let isConstraint = 0
  for (const statement of sqlQuery.data) {
    if (statement) {
      if (statement.type === 'command') {
        finalQuery.action = statement.value
      }
      if (statement.type === 'object') {
        finalQuery.object = statement.value
      }
      if (statement.type === 'id' && !isColumn) {
        if (finalQuery.id.name) {
          finalQuery.id.newName = statement.value
        } else {
          finalQuery.id.name = statement.value
        }
      }
      if (statement.type === 'column') {
        const key = statement.column.name.value
        finalQuery.columns[key] = {}
        finalQuery.columns[key].type = statement.column.type[0].value || statement.column.type
        // columns.push({name: statement.column.name.value, type: statement.column.type[0].value || statement.column.type})
        isColumn++
      }
      if (statement.type === 'primaryKey') {
        finalQuery.constraints.primaryKey = {}
        elems = formatAst(statement.primaryKey.elems)
        finalQuery.constraints.primaryKey.name = statement.primaryKey.name.value
        finalQuery.constraints.primaryKey.elems = elems
        constraints.push({
          type: 'PK',
          name: statement.primaryKey.name.value,
          elems: elems
        })
      }
      if (statement.type === 'foreignKey') {
        const elems = formatAst(statement.foreignKey.elems)
        finalQuery.constraints.foreignKey = {}
        finalQuery.constraints.foreignKey.name = statement.foreignKey.referenceTable.value
        finalQuery.constraints.foreignKey.elements = elems
        finalQuery.constraints.foreignKey.referenceTable = statement.foreignKey.referenceTable.value
        finalQuery.constraints.foreignKey.referenceColumns = formatAst(statement.foreignKey.referenceColumn)
        constraints.push({
          type: 'FK',
          name: statement.foreignKey.name.value,
          localColumns: elems,
          referenceTable: statement.foreignKey.referenceTable.value,
          referenceColumns: formatAst(statement.foreignKey.referenceColumn)
        })
      }
      if (statement.type === 'check') {
        finalQuery.constraints.check = {
          name: statement.check.name.value,
          expression: statement.check.checkExp
        }
        constraints.push({
          type: 'CHECK',
          name: statement.check.name.value,
          expression: statement.check.checkExp
        })
      }
    }
  }
  // finalQuery.columns = columns
  // finalQuery.constraints = constraints
  return finalQuery
}

function formatAst (l) {
  let list = []
  for (let i = 0; i<l.length; i++) {
    if (!(l[i] instanceof Array)) {
      if (l[i].value === 'REFERENCES') return list
      if (l[i].type === 'id') list.push(l[i].value)
    } else {
      // llamada recursiva
      let tempList = formatAst(l[i])
      list.push.apply(list, tempList)
    }
  }
  return list
}

/**
 * Function for sorting the query with the necesary route
 * @param {Object} query - Object describing the information of the query
 * @param {string} [db=''] - String of the name of the database
 * @return {string} message - String that contains the message if the query was successful
 */
function routeQueries(query, db = '') {
  //Constant sort has the routes for every combination of action and object.
  const sort = {
    'CREATE': {
      'TABLE': table_queries.createTable(db, query.id.name, query.columns, query.constraints),
      'DATABASE': db_queries.createDatabase(query.id.name),
    },
    'RENAME': {
      'TABLE': table_queries.renameTable(db, query.id.name, query.id.newName),
      'DATABASE': db_queries.renameDatabase(query.id.name, query.id.newName),
    },
    'DROP': {
      'COLUMN': table_queries.deleteColumn(db,query.id.name, query.columns[Object.keys(query.columns)[0]].name),
      'CONSTRAINT': table_queries.deleteCosntraint(db. query.id.name, query.constraints[Object.keys(query.constraints)[0]].name),
      'TABLES': table_queries.deleteTable(ds, query.id.name),
      'DATABASE': db_queries.deleteDatabase(query.id.name),
    },
    'SHOW': {
      'COLUMNS': table_queries.showColumns(db, query.id.name),
      'TABLES': table_queries.showTables(db),
      'DATABASES': db_queries.showDatabases(),
    },
    USE: {'DATABASE': db_queries.useDatabase(query.id.name),},
    'ADD': {
      'COLUMN': table_queries.addColumn(db,query.id.name, query.columns[Object.keys(query.columns)[0]].name, query.columns[Object.keys(query.columns)[0]].type, query.constraints[Object.keys(query.constraints)[0]]),
      'CONSTRAINT': table_queries.addConstraint(db. query.id.name, query.constraints[Object.keys(query.constraints)[0]]),
    },
  }

  //The function is called by a element of sort, and returns a message 
  return sort[query.action][query.object];
}


// router.post('/', function (req, res) {
//     const dbName = req.body.name
//     createDatabase(dbName)
//     res.send('created')
// });
//
// router.post('/:db/tables', function (req, res) {
//     // TODO añadir constraints
//     const db = req.params.db || ''
//     if (!db) res.send('no db specified')
//
//     const tableName = req.body['table_name'];
//
//     const columns = req.body['columns']
//     createTable(db, tableName, columns);
//     res.send('created table for '+db)
// });
//
// router.put('/:db/rename', function (req, res) {
//     const newName = req.body['new_name']
//     const oldName = req.params.db
//     renameDatabase(oldName, newName)
//     res.send('changed name')
// });
//
// router.delete('/:db/drop', function (req, res) {
//     const db = req.params.db || ''
//     deleteDatabase(db)
//     res.send('deleted')
// })
//
// router.get('/', function (req, res) {
//     const dbs = getDatabases()
//     res.json(dbs)
// })
//
// router.get('/:db/tables', function (req, res) {
//     const db = req.params.db
//     res.json(getTables(db))
// })
//
// router.put('/:db/tables/:tableName', (req, res) => {
//     const db = req.params.db
//     const oldName = req.params.tableName
//     const newName = req.body['new_name']
//     renameTable(db, oldName, newName)
//     res.send('name changed to '+newName)
// })
//
// router.delete('/:db/tables/:tableName', (req, res) => {
//   const db = req.params.db
//   const tableName = req.params.tableName
//   deleteTable(db, tableName)
//   res.send('deleted table ' + tableName)
// })


module.exports = router;
