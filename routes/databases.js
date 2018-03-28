var express = require('express');
var router = express.Router();
var fs = require('fs');
var rimraf = require('rimraf');
const db_queries = require('./queries_functions/database');
const table_queries = require('./queries_functions/table');
const register_queries = require('./queries_functions/register');

const nearley = require('nearley')
const grammar = require('../grammar/sql92.js')
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

var db = '';
var sqlQuery = {data: []}

router.post('/queries', function (req, res) {
  parser.feed(req.body['sql_query'])
  // limpiar query anterior
  sqlQuery = {data: []}
  parseResult(parser.results[0][0][0][0])
  res.json(sqlQuery)
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
