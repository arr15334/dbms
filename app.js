var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

const path = '/Usuarios/Rodrigo/UVG/4/1/Bases de datos/Proyecto1/databases/';
let db = ''

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', index);

app.post('/createDatabase', function (req, res) {
    const dbName = req.body.name
    createDatabase(dbName)
    res.redirect('/')
})
app.post('/createTable', function (req, res) {
    const query = req.body.querysql;
    console.log(query);
    createTable(query);
    res.redirect('/')
});
app.post('/rename', function (req, res) {
    const query = req.body.querysql;
    console.log(query);
    // renameTable(query)
    res.redirect('/')
});

app.get('/databases', function (req, res) {
    const dbs = getDatabases()
    res.render("showdbs", {dbs: dbs})
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function createTable(name) {
    fs.open(path+name+'.txt', 'w', function(err){
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

function getDatabases () {
    return fs.readdirSync(path)
}

app.listen(3000, function(){
  console.log("...listening...")
});
