var express = require('express');
var router = express.Router();
var fs = require('fs');
var rimraf = require('rimraf')

db = ''
const path = '/Usuarios/Rodrigo/UVG/4/1/Bases de datos/Proyecto1/databases/';

router.post('/', function (req, res) {
    const dbName = req.body.name
    createDatabase(dbName)
    res.send('created')
});

router.post('/:db/tables', function (req, res) {
    // TODO añadir constraints
    const db = req.params.db || ''
    if (!db) res.send('no db specified')

    const tableName = req.body['table_name'];

    const columns = req.body['columns']
    createTable(db, tableName, columns);
    res.send('created table for '+db)
});

router.put('/:db/rename', function (req, res) {
    const newName = req.body['new_name']
    const oldName = req.params.db
    renameDatabase(oldName, newName)
    res.send('changed name')
});

router.delete('/:db/drop', function (req, res) {
    const db = req.params.db || ''
    deleteDatabase(db)
    res.send('deleted')
})

router.get('/', function (req, res) {
    const dbs = getDatabases()
    res.json(dbs)
})

router.get('/:db/tables', function (req, res) {
    const db = req.params.db
    res.json(getTables(db))
})

router.put('/:db/tables/:tableName', (req, res) => {
    const db = req.params.db
    const oldName = req.params.tableName
    const newName = req.body['new_name']
    renameTable(db, oldName, newName)
    res.send('name changed to '+newName)
})

router.delete('/:db/tables/:tableName', (req, res) => {
  const db = req.params.db
  const tableName = req.params.tableName
  deleteTable(db, tableName)
  res.send('deleted table ' + tableName)
})

function getDatabases () {
    return {
        data: {
            dbs: fs.readdirSync(path)
        }
    }
}

function getTables(db) {
    return {
        data: {
            tables: fs.readdirSync(path+db)
        }
    }
}

function createTable(db, name, columns) {
    let data = ''

    for (column of columns) {
        data += column.type+' '+column.name+';'
    }
    fs.writeFileSync(path+db+'/'+name, data)
}

function createDatabase(name) {
    fs.mkdirSync(path+name)
}

function renameDatabase(name, newName) {
    fs.renameSync(path+name, path+newName)
}

function deleteDatabase(db) {
    rimraf.sync(path+db)
    // fs.rmdirSync(path+db)
}

function renameTable(db, name, newName) {
    fs.renameSync(path+db+'/'+name+'.txt', path+db+'/'+newName)
}

function deleteTable(db, table) {
    fs.unlinkSync(path+db+'/'+table)
}

function useDatabase(datab) {
    const dbs = getDatabases()
    if (!dbs.includes(datab)) {
        // error
        return
    }
    db = datab
}



module.exports = router;
