var express = require('express');
var router = express.Router();
var fs = require('fs');

let db = ''
const path = '/Usuarios/Rodrigo/UVG/4/1/Bases de datos/Proyecto1/databases/';
/* GET home page. */
router.post('/', function (req, res) {
    const dbName = req.body.name
    createDatabase(dbName)
    res.redirect('/')
});

router.post('/'+db+'/tables', function (req, res) {
    if (!db) {
        res.send('No ha especificado la base de datos')
    }
    const query = req.body.querysql;
    console.log(query);
    createTable(query);
    res.redirect('/')
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

function createTable(name) {
    fs.open(path+db+'/'+name+'.txt', 'w', function(err){
        if (err) console.log(err);
        console.log('created')
    })
}

function createDatabase(name) {
    fs.mkdirSync(path+name)
}

function renameTable(name, newName) {
    fs.rename(path+name+'.txt', path+newName+'.txt', function (err) {
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