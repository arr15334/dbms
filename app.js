var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var databases = require('./routes/databases');

var app = express();

const path = '/Usuarios/Rodrigo/UVG/4/1/Bases de datos/Proyecto1/databases/';

app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));

app.use('/', index);
app.use('/databases', databases)

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

app.post('/query', function (req, res) {
    const query = req.body.inputQuery
    if (query.includes('CREATE')) {
        if (query.includes('DATABASE')) {

        }
    }
})

app.listen(3000, function(){
  console.log("http:/localhost:3000")
});
