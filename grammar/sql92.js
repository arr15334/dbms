// Generated automatically by nearley, version 2.13.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


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
    {"name": "query$ebnf$3$subexpression$1$ebnf$1", "symbols": []},
    {"name": "query$ebnf$3$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":","}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "query$ebnf$3$subexpression$1$ebnf$1", "symbols": ["query$ebnf$3$subexpression$1$ebnf$1", "query$ebnf$3$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "query$ebnf$3$subexpression$1", "symbols": [{"literal":"("}, (lexer.has("id") ? {type: "id"} : id), "query$ebnf$3$subexpression$1$ebnf$1", {"literal":")"}]},
    {"name": "query$ebnf$3", "symbols": ["query$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "query$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "query$ebnf$4", "symbols": []},
    {"name": "query$ebnf$4$subexpression$1", "symbols": [{"literal":","}, "value"]},
    {"name": "query$ebnf$4", "symbols": ["query$ebnf$4", "query$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "query", "symbols": [{"literal":"INSERT"}, {"literal":"INTO"}, (lexer.has("id") ? {type: "id"} : id), "query$ebnf$3", {"literal":"VALUES"}, {"literal":"("}, "value", "query$ebnf$4", {"literal":")"}]},
    {"name": "query$ebnf$5", "symbols": []},
    {"name": "query$ebnf$5$subexpression$1", "symbols": [{"literal":","}, (lexer.has("id") ? {type: "id"} : id), {"literal":"="}, "value"]},
    {"name": "query$ebnf$5", "symbols": ["query$ebnf$5", "query$ebnf$5$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "query$ebnf$6$subexpression$1", "symbols": [{"literal":"WHERE"}, "expression"]},
    {"name": "query$ebnf$6", "symbols": ["query$ebnf$6$subexpression$1"], "postprocess": id},
    {"name": "query$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "query", "symbols": [{"literal":"UPDATE"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"SET"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"="}, "value", "query$ebnf$5", "query$ebnf$6"]},
    {"name": "query$ebnf$7$subexpression$1", "symbols": [{"literal":"WHERE"}, "expression"]},
    {"name": "query$ebnf$7", "symbols": ["query$ebnf$7$subexpression$1"], "postprocess": id},
    {"name": "query$ebnf$7", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "query", "symbols": [{"literal":"DELETE"}, {"literal":"FROM"}, (lexer.has("id") ? {type: "id"} : id), "query$ebnf$7"]},
    {"name": "query", "symbols": ["selectQuery"]},
    {"name": "selectQuery$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "selectQuery$subexpression$1$ebnf$1", "symbols": []},
    {"name": "selectQuery$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":","}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "selectQuery$subexpression$1$ebnf$1", "symbols": ["selectQuery$subexpression$1$ebnf$1", "selectQuery$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selectQuery$subexpression$1", "symbols": [(lexer.has("id") ? {type: "id"} : id), "selectQuery$subexpression$1$ebnf$1"]},
    {"name": "selectQuery$ebnf$1", "symbols": []},
    {"name": "selectQuery$ebnf$1$subexpression$1", "symbols": [{"literal":","}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "selectQuery$ebnf$1", "symbols": ["selectQuery$ebnf$1", "selectQuery$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selectQuery$ebnf$2$subexpression$1", "symbols": [{"literal":"WHERE"}, "expression"]},
    {"name": "selectQuery$ebnf$2", "symbols": ["selectQuery$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "selectQuery$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selectQuery$ebnf$3$subexpression$1$subexpression$1", "symbols": [{"literal":"ASC"}]},
    {"name": "selectQuery$ebnf$3$subexpression$1$subexpression$1", "symbols": [{"literal":"DESC"}]},
    {"name": "selectQuery$ebnf$3$subexpression$1$ebnf$1", "symbols": []},
    {"name": "selectQuery$ebnf$3$subexpression$1$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"ASC"}]},
    {"name": "selectQuery$ebnf$3$subexpression$1$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"DESC"}]},
    {"name": "selectQuery$ebnf$3$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "expression", "selectQuery$ebnf$3$subexpression$1$ebnf$1$subexpression$1$subexpression$1"]},
    {"name": "selectQuery$ebnf$3$subexpression$1$ebnf$1", "symbols": ["selectQuery$ebnf$3$subexpression$1$ebnf$1", "selectQuery$ebnf$3$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selectQuery$ebnf$3$subexpression$1", "symbols": [{"literal":"ORDER"}, {"literal":"BY"}, "expression", "selectQuery$ebnf$3$subexpression$1$subexpression$1", "selectQuery$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "selectQuery$ebnf$3", "symbols": ["selectQuery$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "selectQuery$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selectQuery", "symbols": [{"literal":"SELECT"}, "selectQuery$subexpression$1", {"literal":"FROM"}, (lexer.has("id") ? {type: "id"} : id), "selectQuery$ebnf$1", "selectQuery$ebnf$2", "selectQuery$ebnf$3"]},
    {"name": "condition", "symbols": ["expression"]},
    {"name": "condition$ebnf$1$subexpression$1", "symbols": [{"literal":"NOT"}]},
    {"name": "condition$ebnf$1", "symbols": ["condition$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "condition$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "condition", "symbols": ["expression", "condition$ebnf$1", {"literal":"BETWEEN"}, "expression", {"literal":"AND"}, "expression"]},
    {"name": "condition$ebnf$2$subexpression$1", "symbols": [{"literal":"NOT"}]},
    {"name": "condition$ebnf$2", "symbols": ["condition$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "condition$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "condition", "symbols": ["expression", "condition$ebnf$2", {"literal":"IN"}, {"literal":"("}, "selectQuery", {"literal":")"}]},
    {"name": "condition$ebnf$3$subexpression$1", "symbols": [{"literal":"NOT"}]},
    {"name": "condition$ebnf$3", "symbols": ["condition$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "condition$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "condition", "symbols": ["expression", "condition$ebnf$3", {"literal":"LIKE"}, "pattern"]},
    {"name": "condition", "symbols": [{"literal":"EXISTS"}, {"literal":"("}, "selectQuery", {"literal":")"}]},
    {"name": "condition", "symbols": ["expression", "relOp", {"literal":"ALL"}, {"literal":"("}, "selectQuery", {"literal":")"}]},
    {"name": "condition$subexpression$1", "symbols": [{"literal":"ANY"}]},
    {"name": "condition$subexpression$1", "symbols": [{"literal":"SOME"}]},
    {"name": "condition", "symbols": ["expression", "relOp", "condition$subexpression$1", {"literal":"("}, "selectQuery", {"literal":")"}]},
    {"name": "pattern", "symbols": [{"literal":"%"}, (lexer.has("id") ? {type: "id"} : id), {"literal":"%"}]},
    {"name": "columnDeclaration", "symbols": [(lexer.has("id") ? {type: "id"} : id), "dataType"], "postprocess": 
        function(data) {
        	const column = {name: data[0], type: data[1]}
        	return { type: 'column', column: column }
        }
        },
    {"name": "dataType", "symbols": [{"literal":"INT"}]},
    {"name": "dataType", "symbols": [{"literal":"FLOAT"}]},
    {"name": "dataType", "symbols": [{"literal":"DATE"}]},
    {"name": "dataType", "symbols": [{"literal":"CHAR"}, {"literal":"("}, (lexer.has("int") ? {type: "int"} : int), {"literal":")"}], "postprocess": 
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
    {"name": "action", "symbols": [{"literal":"ADD"}, {"literal":"CONSTRAINT"}, "constraintDeclaration"]},
    {"name": "action", "symbols": [{"literal":"DROP"}, {"literal":"COLUMN"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "action", "symbols": [{"literal":"DROP"}, {"literal":"CONSTRAINT"}, (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "expression", "symbols": ["expression", {"literal":"OR"}, "andTerm"], "postprocess": 
        function (data) {
        	return {
        		operando1: data[0],
        		operando2: data[2],
        		operador: "OR"
        	}
        }
        	},
    {"name": "expression", "symbols": ["andTerm"], "postprocess": (data) => data[0]},
    {"name": "andTerm", "symbols": ["andTerm", {"literal":"AND"}, "notTerm"], "postprocess": 
        function (data) {
        	return {
        		operando1: data[0],
        		operando2: data[2],
        		operador: "AND"
        	}
        }
        	},
    {"name": "andTerm", "symbols": ["notTerm"], "postprocess": (data) => data[0]},
    {"name": "notTerm", "symbols": [{"literal":"NOT"}, "relTerm"], "postprocess": 
        function (data) {
        	return {
        		operador: "NOT",
        		operando1: data[1]
        	}
        }
        	},
    {"name": "notTerm", "symbols": ["relTerm"], "postprocess": (data) => data[0]},
    {"name": "relTerm", "symbols": ["relTerm", "relOp", "factor"], "postprocess": 
        function (data) {
        	return {
        		operando1: data[0],
        		operando2: data[2],
        		operador: data[1]
        	}
        }
        	},
    {"name": "relTerm", "symbols": ["factor"], "postprocess": (data) => data[0]},
    {"name": "factor", "symbols": ["value"], "postprocess": (data) => data[0]},
    {"name": "factor", "symbols": [{"literal":"("}, "expression", {"literal":")"}], "postprocess": 
        function (data) {
        	return data[1]
        }
        	},
    {"name": "factor", "symbols": [(lexer.has("id") ? {type: "id"} : id)], "postprocess": 
        function (data) {
        	return {
        		'type': 'id',
        		'value': data[0].value
        	}
        }
        	},
    {"name": "factor", "symbols": [(lexer.has("id") ? {type: "id"} : id), {"literal":"."}, (lexer.has("id") ? {type: "id"} : id)], "postprocess": 
        function (data) {
        	return {
        		'table': data[0].value,
        		'column': data[1].value
        	}
        }
        	},
    {"name": "factor", "symbols": [{"literal":"true"}], "postprocess": 
        function (data) {
        	return {
        		'type': 'boolean',
        		'value': 'true'
        	}
        }
        	},
    {"name": "factor", "symbols": [{"literal":"false"}], "postprocess": 
        function (data) {
        	return {
        		'type': 'boolean',
        		'value': 'false'
        	}
        }
        	},
    {"name": "relOp", "symbols": [{"literal":"<="}], "postprocess": (data) => data[0].value},
    {"name": "relOp", "symbols": [{"literal":">="}], "postprocess": (data) => data[0].value},
    {"name": "relOp", "symbols": [{"literal":"<"}], "postprocess": (data) => data[0].value},
    {"name": "relOp", "symbols": [{"literal":">"}], "postprocess": (data) => data[0].value},
    {"name": "relOp", "symbols": [{"literal":"<>"}], "postprocess": (data) => data[0].value},
    {"name": "relOp", "symbols": [{"literal":"="}], "postprocess": (data) => data[0].value},
    {"name": "value", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": 
        function (data) {
        	return {'type': 'INT', 'value': data[0].value}
        }
        		},
    {"name": "value", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": 
        function (data) {
        	return {'type': 'FLOAT', 'value': data[0].value}
        }
        	},
    {"name": "value", "symbols": [(lexer.has("date") ? {type: "date"} : date)], "postprocess": 
        function (data) {
        	return {'type': 'DATE', 'value': data[0].value}
        }
        	},
    {"name": "value", "symbols": [(lexer.has("char") ? {type: "char"} : char)], "postprocess": 
        function (data) {
        	return {'type': 'CHAR', 'value': data[0].value}
        }
        	}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
