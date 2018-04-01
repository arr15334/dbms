
@{%

const moo = require('moo');

let lexer = moo.compile({
	command: 	['CREATE', 'ALTER', 'RENAME',  'DROP', 'SHOW', 'USE',  'ADD', 'INSERT',  'SELECT', 'UPDATE', 'DELETE', 'SET'],
	object: 	['DATABASE', 'DATABASES', 'TABLE', 'TABLES', 'COLUMNS', 'COLUMN','INTO' , 'VALUES', 'WHERE',],
	constraintKeyword: ['KEY', 'PRIMARY', 'FOREIGN', 'CHECK', 'CONSTRAINT', 'PK_', 'REFERENCES', 'CH_', 'FK_'],
	varType: 	['INT', 'FLOAT', 'DATE', 'CHAR'],
	keyword:	['NOT', 'AND', 'TO', 'OR', 'LIKE', 'SOME', 'ANY', 'IN', 'BETWEEN', 'ALL', 'EXISTS', 'ORDER', 'FROM', 'BY'],
	ws: 		{match: /\s+/, lineBreaks: true},
	id:			/[a-zA-Z][a-zA-Z0-9]*/,
	date:		/'[0-9]{4}\-[0-9]{2}\-[0-9]{2}'/,
	float:		/-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)\b/,
	int:		/-?(?:[0-9]|[1-9][0-9]+)\b/,
	char:		/'[a-zA-Z]+'/,
	';': ';',
	'(': '(',
	')': ')',
	',': ',',
	'*': '*',
	'\'': '\'',
	'<=': '<=',
	'>=': '>=',
	'<>': '<>',
	'>': '>',
	'<': '<',
	'=': '=',
	'-': '-'
})

lexer.next = (next => () => {
    let tok;
    while ((tok = next.call(lexer)) && tok.type === "ws") {}
    return tok;
})(lexer.next);

let columns = []
%}

@lexer lexer


program ->  (query ";"):*



query ->
		"CREATE" "DATABASE" %id
	|	"ALTER" "DATABASE" %id "RENAME" "TO" %id
	|	"DROP" "DATABASE" %id
	|	"SHOW" "DATABASES"
	|	"USE" "DATABASE" %id
	|	"CREATE" "TABLE" %id "(" columnDeclaration ( "," columnDeclaration):* ("," "CONSTRAINT" constraintDeclaration):* ")"
	|	"ALTER" "TABLE" %id "RENAME" "TO" %id
	|	"ALTER" "TABLE" %id (action)
	|	"DROP" "TABLE" %id
	|	"SHOW" "TABLES"
	|	"SHOW" "COLUMNS" "FROM" %id
	|	"INSERT" "INTO" %id ("(" %id ("," %id):* ")"):? "VALUES" "(" value ("," value):* ")"
	|	"UPDATE" %id "SET" %id "=" value ("," %id "=" value):* ("WHERE" expression):?
	|	"DELETE" "FROM" %id ("WHERE" expression):?
	|	selectQuery

#Query delaration, using ORDER BY and ASC|DESC operands
selectQuery ->
		"SELECT" ("*"| %id ("," %id):*) "FROM" %id ("," %id):* ("WHERE" expression):? ("ORDER" "BY" expression ("ASC"|"DESC") ("," expression ("ASC"|"DESC")):* ):?

#Starts condition declaration, with operator precedence.
condition ->
		expression
	|	expression ("NOT"):? "BETWEEN" expression "AND" expression
	|	expression ("NOT"):? "IN"  "(" selectQuery ")"
	|	expression ("NOT"):? "LIKE" pattern
	|	"EXISTS" "(" selectQuery ")"
	|	expression relOp "ALL" "(" selectQuery ")"
	|	expression relOp ("ANY"|"SOME") "(" selectQuery ")"


pattern -> "%" %id "%"



columnDeclaration -> %id dataType
{%
	function(data) {
		const column = {name: data[0], type: data[1]}
		return { type: 'column', column: column }
	}
%}



dataType ->
		"INT"
	|	"FLOAT"
	|	"DATE"
	|	"CHAR" "(" %int ")"
	{%
		function (data) {
			return 'CHAR'+'('+data[2]+')'
		}
	%}



constraintDeclaration ->
		"PK_" %id "PRIMARY" "KEY" "("  %id ("," %id):* ")"
		{%
			function(data) {
				const primaryKey = {
					name: data[1],
					elems: data.slice(5, data.length-1)
				}
				return { type: 'primaryKey', primaryKey: primaryKey }
			}
		%}
	|	"FK_" %id "FOREIGN" "KEY" "("  %id ("," %id):* ")" "REFERENCES" %id "("  %id ("," %id):* ")"
	{%
		function(data) {
			const foreignKey = {
				name: data[1],
				elems: data.slice(5, data.length-1),
				referenceTable: data[9],
				referenceColumn: data.slice(11, data.length-1)
			}
			return { type: 'foreignKey', foreignKey: foreignKey }
		}
	%}
	|	"CH_" %id "CHECK" "(" expression ")"
	{%
		function(data) {
			const check = {
				name: data[1],
				checkExp: data[4]
			}
			return { type: 'check', check: check }
		}
	%}



action ->
		"ADD" "COLUMN" columnDeclaration ("CONSTRAINT" constraintDeclaration):?
	|	"ADD" "CONSTRAINT" constraintDeclaration
	|	"DROP" "COLUMN" %id
	|	"DROP" "CONSTRAINT" %id



expression ->
		expression "OR" andTerm
	{%
		function (data) {
			return {
				operando1: data[0],
				operando2: data[2],
				operador: "OR"
			}
		}
	%}
	| andTerm {% (data) => data[0] %}

andTerm ->
	 	andTerm "AND" notTerm
	{%
		function (data) {
			return {
				operando1: data[0],
				operando2: data[2],
				operador: "AND"
			}
		}
	%}
	|	notTerm 	{% (data) => data[0] %}


notTerm ->
		"NOT" relTerm
	{%
		function (data) {
			return {
				operador: "NOT",
				operando1: data[1]
			}
		}
	%}
	|	relTerm 	{% (data) => data[0] %}

relTerm ->
		relTerm relOp factor
	{%
		function (data) {
			return {
				operando1: data[0],
				operando2: data[2],
				operador: data[1]
			}
		}
	%}
	|	factor	{% (data) => data[0] %}

factor ->
	value 	{% (data) => data[0] %}
	| "(" expression ")"
	{%
		function (data) {
			return data[1]
		}
	%}
	| %id
	{%
		function (data) {
			return {
				'type': 'id',
				'value': data[0].value
			}
		}
	%}
	| %id "." %id
	{%
		function (data) {
			return {
				'table': data[0].value,
				'column': data[1].value
			}
		}
	%}
	| "true"
	{%
		function (data) {
			return {
				'type': 'boolean',
				'value': 'true'
			}
		}
	%}
	| "false"
	{%
		function (data) {
			return {
				'type': 'boolean',
				'value': 'false'
			}
		}
	%}


relOp 	->	"<="	{% (data) => data[0].value %}
	|	">="		{% (data) => data[0].value %}
	|	"<"			{% (data) => data[0].value %}
	|	">"			{% (data) => data[0].value %}
	|	"<>"		{% (data) => data[0].value %}
	|	"="			{% (data) => data[0].value %}


value ->
		%int
		{%
			function (data) {
				return {'type': 'int', 'value': data[0].value}
			}
		%}
	|	%float
	{%
		function (data) {
			return {'type': 'float', 'value': data[0].value}
		}
	%}
	|	%date
	{%
		function (data) {
			return {'type': 'date', 'value': data[0].value}
		}
	%}
	|	%char
	{%
		function (data) {
			return {'type': 'char', 'value': data[0].value}
		}
	%}
