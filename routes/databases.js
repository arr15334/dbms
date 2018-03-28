var express = require('express');
var router = express.Router();
var fs = require('fs');
var rimraf = require('rimraf');
const db_queries = require('./queries_functions/database');
const table_queries = require('./queries_functions/table');
const register_queries = require('./queries_functions/register');

var db = '';


// table_queries.createTable("qwer", "asdf", {}, {});
// console.log(table_queries.addConstraint("qwer", "asdf", {
//     "primaryKey": {
//         "name": "hola",
//         "elements": []
//     }
// }));

// console.log(table_queries.addConstraint("qwer", "asdf", {
//     "foreignKey": {
//         "hola": {
//             "elements": [],
//             "referenceTable": "fbg",
//             "referenceColumn": "ertb"
//         }
//     }
// }));

// console.log(table_queries.deleteConstraint("qwer", "asdf", "hola"));

router.get('/queries', function (req, res) {

});

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
