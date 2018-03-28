var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var antlr4 = require('antlr4');

var index = require('./routes/index');
var databases = require('./routes/databases');

var app = express();

const path = './databases/';

app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(cors())

app.use('/', index);
app.use('/databases', databases)

app.listen(3000, function(){
  console.log("http:/localhost:3000")
});
