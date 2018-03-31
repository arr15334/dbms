var express = require('express');
var router = express.Router();
var fs = require('fs');
var rimraf = require('rimraf');
const db_queries = require('./queries_functions/database');
const table_queries = require('./queries_functions/table');
const register_queries = require('./queries_functions/register');

const nearley = require('nearley')
const grammar = require('../grammar/sql92.js')

const path = './databases/';

var sqlQuery = {data: []}

router.post('/queries', function (req, res) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(req.body['sql_query'])
  // limpiar query anterior
  sqlQuery = {data: []}
  parseResult(parser.results[0][0][0])
  console.log(sqlQuery);
  const sqlObj = formatQuery()
  return Promise.resolve()
    .then(() => {
      return formatQuery()
    })
    /*
    .then((query) => {
      return routeQueries(query)
    })
    */
    .then((result) => {
      res.json(result)
    })
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
    constraints: {},
    columnsToAdd: [],
    values: []
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
        if (!finalQuery.id.name) {
          finalQuery.id.name = statement.value
        } else if (finalQuery.action === 'INSERT') {
          finalQuery.columnsToAdd.push(statement.value)
        } else {
          finalQuery.id.newName = statement.value
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
          expression: extractObjectFromList(statement.check.checkExp)
        }
        constraints.push({
          type: 'CHECK',
          name: statement.check.name.value,
          expression: statement.check.checkExp
        })
      }
      if (statement.type === 'int' || statement.type === 'float' || statement.type === 'date' || statement.type === 'char' ) {
        finalQuery.values.push(statement.value)
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
function routeQueries(query) {
  const action = query.action
  const object = query.object
  return getCurrentDatabase()
    .then((db) => {
      console.log(query)
      if (action === 'CREATE') {
        if (object === 'DATABASE') return db_queries.createDatabase(query.id.name)
        else if (object === 'TABLE') return table_queries.createTable(db, query.id.name, query.columns, query.constraints)
          else {
          return 'Error: bad query'
        }
      } else if (action === 'DROP') {
          if (object === 'DATABASE') return db_queries.deleteDatabase(query.id.name)
          else if(object === 'TABLE') return table_queries.deleteTable(db, query.id.name)
          else if(object === 'COLUMN') return table_queries.deleteColumn(db, query.id.name, query.columns.name)
          else if(object === 'CONSTRAINT') return table_queries.deleteConstraint(db, query.id.name, query.constraints.name)
          else return 'Error: bad query'
      } else if (action === 'RENAME') {
          if (object === 'TABLE') return table_queries.renameTable(db, query.id.name, query.id.newName)
          else if (object === 'DATABASE') return db_queries.renameDatabase(query.id.name, query.id.newName)
          else return 'Error: bad query'
      } else if (action === 'SHOW') {
          if (object === 'DATABASES') return db_queries.showDatabases()
          else if (object === 'TABLES') return table_queries.showTables(db)
          else if (object ==='COLUMNS') return table_queries.showColumns(db, query.id.name)
      } else if (action === 'USE') {
        if (object === 'DATABASE') {
          return db_queries.useDatabase(query.id.name)
        } else {
          return 'Error: bad query'
        }
      } else if (action === 'ADD') {
          if (object === 'COLUMN') return table_queries.addColumn(db ,query.id.name, Object.keys(query.columns)[0], query.columns[Object.keys(query.columns)[0]].type, query.constraints)
          else if (object === 'CONSTRAINT') return table_queries.addConstraint(db, query.id.name, query.constraints[Object.keys(query.constraints)[0]])
      } else if (action === 'INSERT') {
        if (object === 'VALUES') return register_queries.insert(db, query.id.name, query.columnsToAdd, query.values)
        else return 'Error: bad query'
      }
      else {
        return 'Error: bad query'
      }
    })
  //Constant sort has the routes for every combination of action and object.
  /*
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
      // table_queries.deleteColumn(db, query.id.name, query.columns.name)
      'COLUMN': console.log('delete'),
      'CONSTRAINT': table_queries.deleteConstraint(db, query.id.name, query.constraints.name),
      'TABLES': table_queries.deleteTable(db, query.id.name),
      'DATABASE': db_queries.deleteDatabase(query.id.name),
    },
    'SHOW': {
      'COLUMNS': table_queries.showColumns(db, query.id.name),
      'TABLES': table_queries.showTables(db),
      'DATABASES': db_queries.showDatabases(),
    },
    // 'USE': {'DATABASE': db_queries.useDatabase(query.id.name)},
    'USE': {'DATABASE': console.log('use db')},
    'ADD': {
      'COLUMN': table_queries.addColumn(db,query.id.name, query.columns.name, query.columns.name ? query.columns.name.type : '', query.constraints),
      'CONSTRAINT': table_queries.addConstraint(db, query.id.name, query.constraints[Object.keys(query.constraints)[0]]),
    },
  }
<<<<<<< HEAD

  //The function is called by a element of sort, and returns a message
  return sort[query.action][query.object];
=======
*/
  //The function is called by an element of sort, and returns a message
  // return sort[query.action][query.object];
}

function getCurrentDatabase () {
  return Promise.resolve()
    .then(() => {
      return JSON.parse(fs.readFileSync(path + 'currentdb.json', 'utf8'));
    })
    .then((data) => {
      return data.current
    })
}

function extractObjectFromList (l) {
  if ((l instanceof Array)) {
    let nextL = l[0]
    return extractObjectFromList(nextL)
  } else {
    return l
  }
}

module.exports = router;
