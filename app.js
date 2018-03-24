var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var antlr4 = require('antlr4');

var index = require('./routes/index');
var databases = require('./routes/databases');
var sql92Lexer = require('./grammar/sql92Lexer')
var sql92Parser = require('./grammar/sql92Parser')

var app = express();

const path = '/Usuarios/Rodrigo/UVG/4/1/Bases de datos/Proyecto1/databases/';

app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(cors())

app.post('/query', function (req, res) {
    const sqlQuery = req.body['sqlQuery']
    var chars = new antlr4.InputStream(sqlQuery);
  	var lexer = new sql92Lexer.sql92Lexer(chars);
  	var tokens = new antlr4.CommonTokenStream(lexer);
  	var parser = new sql92Parser.sql92Parser(tokens);
  	parser.buildParseTrees = true;
  	var tree = parser.program();
    // cambiar lo que devuelve
	  res.send(tree.toStringTree())
})
app.use('/', index);
app.use('/databases', databases)

app.listen(3000, function(){
  console.log("http:/localhost:3000")
});
