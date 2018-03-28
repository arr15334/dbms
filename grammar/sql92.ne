
@{%

const moo = require('moo');

let lexer = moo.compile({
	keyword:	['NOT', 'AND', 'TO', 'OR'],
	constraintKeyword: ['KEY', 'PRIMARY', 'FOREIGN', 'CHECK', 'CONSTRAINT', 'PK_', 'REFERENCES', 'CH_', 'FK_'],
	varType: ['INT', 'FLOAT', 'DATE', 'CHAR'],
	command: ['CREATE', 'ALTER', 'RENAME',  'DROP', 'SHOW', 'USE', 'FROM', 'ADD'],
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
	|	"CHAR" "(" %num ")"
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
