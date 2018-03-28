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
