var express = require('express');
var router = express.Router();
var fs = require('fs');

db = ''
const path = '/Usuarios/Rodrigo/UVG/4/1/Bases de datos/Proyecto1/databases/';

router.post('/', function (req, res) {
    const dbName = req.body.name
    createDatabase(dbName)
    res.send('created')
});

router.post('/:db/tables', function (req, res) {
    const db = req.params.db || ''
    if (!db) res.send('no db specified')

    const tableName = req.body['table_name'];

    const columns = req.body['columns']
    createTable(db, tableName, columns);
    res.send('created table for '+db)
});

router.post('/'+db+'/rename', function (req, res) {
    const query = req.body.querysql;
    console.log(query);
    // renameTable(query)
    res.redirect('/')
});

router.get('/', function (req, res) {
    const dbs = getDatabases()
    res.render("showdbs", {dbs: dbs})
})

router.get('/'+db+'/tables', function (req, res) {

})

function getDatabases () {
    return fs.readdirSync(path)
}

function getTables(path) {
    return fs.readdirSync(path)
}

function createTable(db, name, columns) {
    fs.open(path+db+'/'+name+'.txt', 'w', function(err){
        if (err) console.log(err);
        console.log('created')
    })

}

function createDatabase(name) {
    fs.mkdirSync(path+name)
}

function renameTable(name, newName) {
    fs.rename(path+db+'/'+name+'.txt', path+db+'/'+newName+'.txt', function (err) {
        if (err) console.log(err);
        console.log('renamed')
    })
}

function deleteTable(table) {
    fs.unlinkSync(path+db+'/'+table)
}

function deleteDatabase(db) {
    fs.rmdirSync(path+db)
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