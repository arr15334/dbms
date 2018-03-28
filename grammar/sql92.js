// Generated automatically by nearley, version 2.13.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program$ebnf$1", "symbols": []},
    {"name": "program$ebnf$1$subexpression$1", "symbols": ["query", {"literal":";"}]},
    {"name": "program$ebnf$1", "symbols": ["program$ebnf$1", "program$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "program", "symbols": ["program$ebnf$1"]},
    {"name": "query", "symbols": [{"literal":"CREATE"}, {"literal":"DATABASE"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "query", "symbols": [{"literal":"ALTER"}, {"literal":"DATABASE"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"RENAME"}, {"literal":"TO"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "query", "symbols": [{"literal":"DROP"}, {"literal":"DATABASE"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "query", "symbols": [{"literal":"SHOW"}, {"literal":"DATABASES"}]},
    {"name": "query", "symbols": [{"literal":"USE"}, {"literal":"DATABASE"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "query$ebnf$1", "symbols": []},
    {"name": "query$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "columnDeclaration"]},
    {"name": "query$ebnf$1", "symbols": ["query$ebnf$1", "query$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "query$ebnf$2", "symbols": []},
    {"name": "query$ebnf$2$subexpression$1", "symbols": [{"literal":","}, {"literal":"CONSTRAINT"}, "constraintDeclaration"]},
    {"name": "query$ebnf$2", "symbols": ["query$ebnf$2", "query$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "query", "symbols": [{"literal":"CREATE"}, {"literal":"TABLE"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"("}, "columnDeclaration", "query$ebnf$1", "query$ebnf$2", {"literal":")"}]},
    {"name": "query", "symbols": [{"literal":"ALTER"}, {"literal":"TABLE"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"RENAME"}, {"literal":"TO"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "query$subexpression$1", "symbols": ["action"]},
    {"name": "query", "symbols": [{"literal":"ALTER"}, {"literal":"TABLE"}, (lexer.has("id") ? {type: "id"} : id), "query$subexpression$1"]},
    {"name": "query", "symbols": [{"literal":"DROP"}, {"literal":"TABLE"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "query", "symbols": [{"literal":"SHOW"}, {"literal":"TABLES"}]},
    {"name": "query", "symbols": [{"literal":"SHOW"}, {"literal":"COLUMNS"}, {"literal":"FROM"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "columnDeclaration", "symbols": [(lexer.has("id") ? {type: "id"} : id), "dataType"], "postprocess": 
        function(data) {
        	const column = {name: data[0], type: data[1]}
        	return { type: 'column', column: column }
        }
        },
    {"name": "dataType", "symbols": [{"literal":"INT"}]},
    {"name": "dataType", "symbols": [{"literal":"FLOAT"}]},
    {"name": "dataType", "symbols": [{"literal":"DATE"}]},
    {"name": "dataType", "symbols": [{"literal":"CHAR"}, {"literal":"("}, (lexer.has("num") ? {type: "num"} : num), {"literal":")"}], "postprocess": 
        function (data) {
        	return 'CHAR'+'('+data[2]+')'
        }
        	},
    {"name": "constraintDeclaration$ebnf$1", "symbols": []},
    {"name": "constraintDeclaration$ebnf$1$subexpression$1", "symbols": [{"literal":","}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "constraintDeclaration$ebnf$1", "symbols": ["constraintDeclaration$ebnf$1", "constraintDeclaration$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "constraintDeclaration", "symbols": [{"literal":"PK_"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"PRIMARY"}, {"literal":"KEY"}, {"literal":"("}, (lexer.has("id") ? {type: "id"} : id), "constraintDeclaration$ebnf$1", {"literal":")"}], "postprocess": 
        function(data) {
        	const primaryKey = {
        		name: data[1],
        		elems: data.slice(5, data.length-1)
        	}
        	return { type: 'primaryKey', primaryKey: primaryKey }
        }
        		},
    {"name": "constraintDeclaration$ebnf$2", "symbols": []},
    {"name": "constraintDeclaration$ebnf$2$subexpression$1", "symbols": [{"literal":","}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "constraintDeclaration$ebnf$2", "symbols": ["constraintDeclaration$ebnf$2", "constraintDeclaration$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "constraintDeclaration$ebnf$3", "symbols": []},
    {"name": "constraintDeclaration$ebnf$3$subexpression$1", "symbols": [{"literal":","}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "constraintDeclaration$ebnf$3", "symbols": ["constraintDeclaration$ebnf$3", "constraintDeclaration$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "constraintDeclaration", "symbols": [{"literal":"FK_"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"FOREIGN"}, {"literal":"KEY"}, {"literal":"("}, (lexer.has("id") ? {type: "id"} : id), "constraintDeclaration$ebnf$2", {"literal":")"}, {"literal":"REFERENCES"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"("}, (lexer.has("id") ? {type: "id"} : id), "constraintDeclaration$ebnf$3", {"literal":")"}], "postprocess": 
        function(data) {
        	const foreignKey = {
        		name: data[1],
        		elems: data.slice(5, data.length-1),
        		referenceTable: data[9],
        		referenceColumn: data.slice(11, data.length-1)
        	}
        	return { type: 'foreignKey', foreignKey: foreignKey }
        }
        	},
    {"name": "constraintDeclaration", "symbols": [{"literal":"CH_"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"CHECK"}, {"literal":"("}, "expression", {"literal":")"}], "postprocess": 
        function(data) {
        	const check = {
        		name: data[1],
        		checkExp: data[4]
        	}
        	return { type: 'check', check: check }
        }
        	},
    {"name": "action$ebnf$1$subexpression$1", "symbols": [{"literal":"CONSTRAINT"}, "constraintDeclaration"]},
    {"name": "action$ebnf$1", "symbols": ["action$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "action$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "action", "symbols": [{"literal":"ADD"}, {"literal":"COLUMN"}, "columnDeclaration", "action$ebnf$1"]},
    {"name": "action", "symbols": [{"literal":"ADD"}, "constraintDeclaration"]},
    {"name": "action", "symbols": [{"literal":"DROP"}, {"literal":"COLUMN"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "action", "symbols": [{"literal":"DROP"}, {"literal":"CONSTRAINT"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "expression", "symbols": [{"literal":"NOT"}, "expression"], "postprocess": 
        function (data) {
        	return {
        		operador: data[0],
        		operando1: data[1]
        	}
        }
        	},
    {"name": "expression", "symbols": ["expression", "relOp", "term"], "postprocess": 
        function (data) {
        	return {
        		operando1: data[0],
        		operando2: data[2],
        		operador: data[1]
        	}
        }
        	},
    {"name": "expression", "symbols": ["expression", {"literal":"OR"}, "term"], "postprocess": 
        function (data) {
        	return {
        		operando1: data[0],
        		operando2: data[2],
        		operador: data[1]
        	}
        }
        	},
    {"name": "expression", "symbols": ["term"]},
    {"name": "term", "symbols": ["factor"]},
    {"name": "term", "symbols": ["term", {"literal":"AND"}, "factor"], "postprocess": 
        function (data) {
        	return {
        		operando1: data[0],
        		operando2: data[2],
        		operador: data[1]
        	}
        }
        						},
    {"name": "factor", "symbols": [(lexer.has("num") ? {type: "num"} : num)], "postprocess": 
        function (data) {
        	return data[0]
        }
        							},
    {"name": "factor", "symbols": [{"literal":"("}, "expression", {"literal":")"}], "postprocess": 
        function (data) {
        	return data[1]
        }
        						},
    {"name": "factor", "symbols": [(lexer.has("id") ? {type: "id"} : id)], "postprocess": 
        function (data) {
        	return data[0]
        }
        						},
    {"name": "factor", "symbols": [{"literal":"true"}]},
    {"name": "factor", "symbols": [{"literal":"false"}]},
    {"name": "relOp", "symbols": [{"literal":"<="}]},
    {"name": "relOp", "symbols": [{"literal":">="}]},
    {"name": "relOp", "symbols": [{"literal":"<"}]},
    {"name": "relOp", "symbols": [{"literal":">"}]},
    {"name": "relOp", "symbols": [{"literal":"<>"}]},
    {"name": "relOp", "symbols": [{"literal":"="}]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
