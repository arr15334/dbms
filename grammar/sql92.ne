
@{%

const moo = require('moo');

let lexer = moo.compile({
	keyword:	['KEY', 'PRIMARY', 'FOREIGN', 'CHECK',  'CONSTRAINT', 'NOT', 'AND', 'OR', 'PK_', 'REFERENCES', 'CH_'],
	varType: ['INT', 'FLOAT', 'DATE', 'CHAR'],
	command: ['CREATE', 'ALTER', 'RENAME', 'TO', 'DROP', 'SHOW', 'USE', 'FROM'],
	object: ['DATABASE', 'DATABASES', 'TABLE', 'TABLES', 'COLUMNS', 'COLUMN'],
	ws: 		{match: /\s+/, lineBreaks: true},
	id:			/[a-zA-Z][a-zA-Z0-9]*/,
	num:		/[0-9][0-9]*/,
	';': ';',
	'(': '(',
	')': ')',
	',': ',',
	'*': '*',
	'<=': '<=',
	'>=': '>=',
	'>': '>',
	'<': '<',
	'<>': '<>',
	'=': '='
})

lexer.next = (next => () => {
    let tok;
    while ((tok = next.call(lexer)) && tok.type === "ws") {}
    return tok;
})(lexer.next);

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

columnDeclaration -> %id dataType

dataType ->
		"INT"
	|	"FLOAT"
	|	"DATE"
	|	"CHAR" "(" %num ")"

constraintDeclaration ->
		"PK_" %id "PRIMARY" "KEY" "("  %id ("," %id):* ")"
	|	"FK_" %id "FOREIGN" "KEY" "("  %id ("," %id):* ")" "REFERENCES" %id "("  %id ("," %id):* ")"
	|	"CH_" %id "CHECK" "(" expression ")"

action ->
		"ADD" "COLUMN" %id dataType "CONSTRAINT" constraintDeclaration
	|	"ADD" constraintDeclaration
	|	"DROP" "COLUMN" %id
	|	"DROP" "CONSTRAINT" %id

expression ->
		"(" expression ")"
	|	%num
	|	%id
	|	"NOT" expression
	|	expression relOp expression
	|	expression "AND" expression
	|	expression "OR" expression


relOp 	->	"<="
	|	">="
	|	"<"
	|	">"
	|	"<>"
	|	"="
