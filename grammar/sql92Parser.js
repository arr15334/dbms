// Generated from grammar/sql92.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var sql92Listener = require('./sql92Listener').sql92Listener;
var sql92Visitor = require('./sql92Visitor').sql92Visitor;

var grammarFileName = "sql92.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003-\u00d7\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0003\u0002\u0007\u0002\u0016\n\u0002",
    "\f\u0002\u000e\u0002\u0019\u000b\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u00033\n\u0003\f\u0003",
    "\u000e\u00036\u000b\u0003\u0007\u00038\n\u0003\f\u0003\u000e\u0003;",
    "\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003",
    "A\n\u0003\f\u0003\u000e\u0003D\u000b\u0003\u0007\u0003F\n\u0003\f\u0003",
    "\u000e\u0003I\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003V\n\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0005\u0003a\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0005\u0005m\n\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0007\u0007z\n\u0007\f\u0007\u000e\u0007}\u000b\u0007",
    "\u0003\u0007\u0005\u0007\u0080\n\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0007",
    "\u0007\u008a\n\u0007\f\u0007\u000e\u0007\u008d\u000b\u0007\u0003\u0007",
    "\u0005\u0007\u0090\n\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0007\u0007\u0099\n\u0007",
    "\f\u0007\u000e\u0007\u009c\u000b\u0007\u0003\u0007\u0005\u0007\u009f",
    "\n\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007\u00a9\n\u0007\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b\u00b9\n\b\u0003\t\u0003\t",
    "\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\t\u00c4",
    "\n\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t",
    "\u0003\t\u0003\t\u0007\t\u00d0\n\t\f\t\u000e\t\u00d3\u000b\t\u0003\n",
    "\u0003\n\u0003\n\u0002\u0003\u0010\u000b\u0002\u0004\u0006\b\n\f\u000e",
    "\u0010\u0012\u0002\u0003\u0003\u0002%*\u0002\u00f1\u0002\u0017\u0003",
    "\u0002\u0002\u0002\u0004`\u0003\u0002\u0002\u0002\u0006b\u0003\u0002",
    "\u0002\u0002\bl\u0003\u0002\u0002\u0002\nn\u0003\u0002\u0002\u0002\f",
    "\u00a8\u0003\u0002\u0002\u0002\u000e\u00b8\u0003\u0002\u0002\u0002\u0010",
    "\u00c3\u0003\u0002\u0002\u0002\u0012\u00d4\u0003\u0002\u0002\u0002\u0014",
    "\u0016\u0005\u0004\u0003\u0002\u0015\u0014\u0003\u0002\u0002\u0002\u0016",
    "\u0019\u0003\u0002\u0002\u0002\u0017\u0015\u0003\u0002\u0002\u0002\u0017",
    "\u0018\u0003\u0002\u0002\u0002\u0018\u0003\u0003\u0002\u0002\u0002\u0019",
    "\u0017\u0003\u0002\u0002\u0002\u001a\u001b\u0007\u0003\u0002\u0002\u001b",
    "\u001c\u0007\u0004\u0002\u0002\u001ca\u0007+\u0002\u0002\u001d\u001e",
    "\u0007\u0005\u0002\u0002\u001e\u001f\u0007\u0004\u0002\u0002\u001f ",
    "\u0007+\u0002\u0002 !\u0007\u0006\u0002\u0002!\"\u0007\u0007\u0002\u0002",
    "\"a\u0007+\u0002\u0002#$\u0007\b\u0002\u0002$%\u0007\u0004\u0002\u0002",
    "%a\u0007+\u0002\u0002&\'\u0007\t\u0002\u0002\'a\u0007\n\u0002\u0002",
    "()\u0007\u000b\u0002\u0002)*\u0007\u0004\u0002\u0002*a\u0007+\u0002",
    "\u0002+,\u0007\u0003\u0002\u0002,-\u0007\f\u0002\u0002-.\u0007+\u0002",
    "\u0002.9\u0007\r\u0002\u0002/4\u0005\u0006\u0004\u000201\u0007\u000e",
    "\u0002\u000213\u0005\u0006\u0004\u000220\u0003\u0002\u0002\u000236\u0003",
    "\u0002\u0002\u000242\u0003\u0002\u0002\u000245\u0003\u0002\u0002\u0002",
    "58\u0003\u0002\u0002\u000264\u0003\u0002\u0002\u00027/\u0003\u0002\u0002",
    "\u00028;\u0003\u0002\u0002\u000297\u0003\u0002\u0002\u00029:\u0003\u0002",
    "\u0002\u0002:<\u0003\u0002\u0002\u0002;9\u0003\u0002\u0002\u0002<G\u0007",
    "\u000e\u0002\u0002=B\u0005\n\u0006\u0002>?\u0007\u000e\u0002\u0002?",
    "A\u0005\n\u0006\u0002@>\u0003\u0002\u0002\u0002AD\u0003\u0002\u0002",
    "\u0002B@\u0003\u0002\u0002\u0002BC\u0003\u0002\u0002\u0002CF\u0003\u0002",
    "\u0002\u0002DB\u0003\u0002\u0002\u0002E=\u0003\u0002\u0002\u0002FI\u0003",
    "\u0002\u0002\u0002GE\u0003\u0002\u0002\u0002GH\u0003\u0002\u0002\u0002",
    "HJ\u0003\u0002\u0002\u0002IG\u0003\u0002\u0002\u0002Ja\u0007\u000f\u0002",
    "\u0002KL\u0007\u0005\u0002\u0002LM\u0007\f\u0002\u0002MN\u0007+\u0002",
    "\u0002NO\u0007\u0006\u0002\u0002OP\u0007\u0007\u0002\u0002Pa\u0007+",
    "\u0002\u0002QR\u0007\u0005\u0002\u0002RS\u0007\f\u0002\u0002SU\u0007",
    "+\u0002\u0002TV\u0005\u000e\b\u0002UT\u0003\u0002\u0002\u0002UV\u0003",
    "\u0002\u0002\u0002Va\u0003\u0002\u0002\u0002WX\u0007\b\u0002\u0002X",
    "Y\u0007\f\u0002\u0002Ya\u0007+\u0002\u0002Z[\u0007\t\u0002\u0002[a\u0007",
    "\u0010\u0002\u0002\\]\u0007\t\u0002\u0002]^\u0007\u0011\u0002\u0002",
    "^_\u0007\u0012\u0002\u0002_a\u0007+\u0002\u0002`\u001a\u0003\u0002\u0002",
    "\u0002`\u001d\u0003\u0002\u0002\u0002`#\u0003\u0002\u0002\u0002`&\u0003",
    "\u0002\u0002\u0002`(\u0003\u0002\u0002\u0002`+\u0003\u0002\u0002\u0002",
    "`K\u0003\u0002\u0002\u0002`Q\u0003\u0002\u0002\u0002`W\u0003\u0002\u0002",
    "\u0002`Z\u0003\u0002\u0002\u0002`\\\u0003\u0002\u0002\u0002a\u0005\u0003",
    "\u0002\u0002\u0002bc\u0007+\u0002\u0002cd\u0005\b\u0005\u0002d\u0007",
    "\u0003\u0002\u0002\u0002em\u0007\u0013\u0002\u0002fm\u0007\u0014\u0002",
    "\u0002gm\u0007\u0015\u0002\u0002hi\u0007\u0016\u0002\u0002ij\u0007\r",
    "\u0002\u0002jk\u0007-\u0002\u0002km\u0007\u000f\u0002\u0002le\u0003",
    "\u0002\u0002\u0002lf\u0003\u0002\u0002\u0002lg\u0003\u0002\u0002\u0002",
    "lh\u0003\u0002\u0002\u0002m\t\u0003\u0002\u0002\u0002no\u0007\u0017",
    "\u0002\u0002op\u0005\f\u0007\u0002p\u000b\u0003\u0002\u0002\u0002qr",
    "\u0007\u0018\u0002\u0002rs\u0007+\u0002\u0002st\u0007\u0019\u0002\u0002",
    "tu\u0007\u001a\u0002\u0002u\u007f\u0007\r\u0002\u0002v{\u0007+\u0002",
    "\u0002wx\u0007\u000e\u0002\u0002xz\u0007+\u0002\u0002yw\u0003\u0002",
    "\u0002\u0002z}\u0003\u0002\u0002\u0002{y\u0003\u0002\u0002\u0002{|\u0003",
    "\u0002\u0002\u0002|\u0080\u0003\u0002\u0002\u0002}{\u0003\u0002\u0002",
    "\u0002~\u0080\u0003\u0002\u0002\u0002\u007fv\u0003\u0002\u0002\u0002",
    "\u007f~\u0003\u0002\u0002\u0002\u0080\u0081\u0003\u0002\u0002\u0002",
    "\u0081\u00a9\u0007\u000f\u0002\u0002\u0082\u0083\u0007\u001b\u0002\u0002",
    "\u0083\u0084\u0007+\u0002\u0002\u0084\u0085\u0007\u001c\u0002\u0002",
    "\u0085\u008f\u0007\r\u0002\u0002\u0086\u008b\u0007+\u0002\u0002\u0087",
    "\u0088\u0007\u000e\u0002\u0002\u0088\u008a\u0007+\u0002\u0002\u0089",
    "\u0087\u0003\u0002\u0002\u0002\u008a\u008d\u0003\u0002\u0002\u0002\u008b",
    "\u0089\u0003\u0002\u0002\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c",
    "\u0090\u0003\u0002\u0002\u0002\u008d\u008b\u0003\u0002\u0002\u0002\u008e",
    "\u0090\u0003\u0002\u0002\u0002\u008f\u0086\u0003\u0002\u0002\u0002\u008f",
    "\u008e\u0003\u0002\u0002\u0002\u0090\u0091\u0003\u0002\u0002\u0002\u0091",
    "\u0092\u0007\u000f\u0002\u0002\u0092\u0093\u0007\u001d\u0002\u0002\u0093",
    "\u0094\u0007+\u0002\u0002\u0094\u009e\u0007\r\u0002\u0002\u0095\u009a",
    "\u0007+\u0002\u0002\u0096\u0097\u0007\u000e\u0002\u0002\u0097\u0099",
    "\u0007+\u0002\u0002\u0098\u0096\u0003\u0002\u0002\u0002\u0099\u009c",
    "\u0003\u0002\u0002\u0002\u009a\u0098\u0003\u0002\u0002\u0002\u009a\u009b",
    "\u0003\u0002\u0002\u0002\u009b\u009f\u0003\u0002\u0002\u0002\u009c\u009a",
    "\u0003\u0002\u0002\u0002\u009d\u009f\u0003\u0002\u0002\u0002\u009e\u0095",
    "\u0003\u0002\u0002\u0002\u009e\u009d\u0003\u0002\u0002\u0002\u009f\u00a0",
    "\u0003\u0002\u0002\u0002\u00a0\u00a9\u0007\u000f\u0002\u0002\u00a1\u00a2",
    "\u0007\u001e\u0002\u0002\u00a2\u00a3\u0007+\u0002\u0002\u00a3\u00a4",
    "\u0007\u001f\u0002\u0002\u00a4\u00a5\u0007\r\u0002\u0002\u00a5\u00a6",
    "\u0005\u0010\t\u0002\u00a6\u00a7\u0007\u000f\u0002\u0002\u00a7\u00a9",
    "\u0003\u0002\u0002\u0002\u00a8q\u0003\u0002\u0002\u0002\u00a8\u0082",
    "\u0003\u0002\u0002\u0002\u00a8\u00a1\u0003\u0002\u0002\u0002\u00a9\r",
    "\u0003\u0002\u0002\u0002\u00aa\u00ab\u0007 \u0002\u0002\u00ab\u00ac",
    "\u0007!\u0002\u0002\u00ac\u00ad\u0007+\u0002\u0002\u00ad\u00ae\u0005",
    "\b\u0005\u0002\u00ae\u00af\u0005\n\u0006\u0002\u00af\u00b9\u0003\u0002",
    "\u0002\u0002\u00b0\u00b1\u0007 \u0002\u0002\u00b1\u00b9\u0005\n\u0006",
    "\u0002\u00b2\u00b3\u0007\b\u0002\u0002\u00b3\u00b4\u0007!\u0002\u0002",
    "\u00b4\u00b9\u0007+\u0002\u0002\u00b5\u00b6\u0007\b\u0002\u0002\u00b6",
    "\u00b7\u0007\u0017\u0002\u0002\u00b7\u00b9\u0007+\u0002\u0002\u00b8",
    "\u00aa\u0003\u0002\u0002\u0002\u00b8\u00b0\u0003\u0002\u0002\u0002\u00b8",
    "\u00b2\u0003\u0002\u0002\u0002\u00b8\u00b5\u0003\u0002\u0002\u0002\u00b9",
    "\u000f\u0003\u0002\u0002\u0002\u00ba\u00bb\b\t\u0001\u0002\u00bb\u00bc",
    "\u0007\r\u0002\u0002\u00bc\u00bd\u0005\u0010\t\u0002\u00bd\u00be\u0007",
    "\u000f\u0002\u0002\u00be\u00c4\u0003\u0002\u0002\u0002\u00bf\u00c4\u0007",
    "-\u0002\u0002\u00c0\u00c4\u0007+\u0002\u0002\u00c1\u00c2\u0007\"\u0002",
    "\u0002\u00c2\u00c4\u0005\u0010\t\u0006\u00c3\u00ba\u0003\u0002\u0002",
    "\u0002\u00c3\u00bf\u0003\u0002\u0002\u0002\u00c3\u00c0\u0003\u0002\u0002",
    "\u0002\u00c3\u00c1\u0003\u0002\u0002\u0002\u00c4\u00d1\u0003\u0002\u0002",
    "\u0002\u00c5\u00c6\f\u0005\u0002\u0002\u00c6\u00c7\u0005\u0012\n\u0002",
    "\u00c7\u00c8\u0005\u0010\t\u0006\u00c8\u00d0\u0003\u0002\u0002\u0002",
    "\u00c9\u00ca\f\u0004\u0002\u0002\u00ca\u00cb\u0007#\u0002\u0002\u00cb",
    "\u00d0\u0005\u0010\t\u0005\u00cc\u00cd\f\u0003\u0002\u0002\u00cd\u00ce",
    "\u0007$\u0002\u0002\u00ce\u00d0\u0005\u0010\t\u0004\u00cf\u00c5\u0003",
    "\u0002\u0002\u0002\u00cf\u00c9\u0003\u0002\u0002\u0002\u00cf\u00cc\u0003",
    "\u0002\u0002\u0002\u00d0\u00d3\u0003\u0002\u0002\u0002\u00d1\u00cf\u0003",
    "\u0002\u0002\u0002\u00d1\u00d2\u0003\u0002\u0002\u0002\u00d2\u0011\u0003",
    "\u0002\u0002\u0002\u00d3\u00d1\u0003\u0002\u0002\u0002\u00d4\u00d5\t",
    "\u0002\u0002\u0002\u00d5\u0013\u0003\u0002\u0002\u0002\u0015\u00174",
    "9BGU`l{\u007f\u008b\u008f\u009a\u009e\u00a8\u00b8\u00c3\u00cf\u00d1"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'CREATE'", "'DATABASE'", "'ALTER'", "'RENAME'", 
                     "'TO'", "'DROP'", "'SHOW'", "'DATABASES'", "'USE'", 
                     "'TABLE'", "'('", "','", "')'", "'TABLES'", "'COLUMNS'", 
                     "'FROM'", "'INT'", "'FLOAT'", "'DATE'", "'CHAR'", "'CONSTRAINT'", 
                     "'PK_'", "'PRIMARY'", "'KEY'", "'FK_'", "'FOREIGN KEY'", 
                     "'REFERENCES'", "'CH_'", "'CHECK'", "'ADD'", "'COLUMN'", 
                     "'NOT'", "'AND'", "'OR'", "'<'", "'>'", "'<='", "'>='", 
                     "'<>'", "'='" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, "ID", "WS", "NUM" ];

var ruleNames =  [ "program", "query", "columnDeclaration", "dataType", 
                   "constraintDeclaration", "constraint", "action", "expression", 
                   "rel_op" ];

function sql92Parser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

sql92Parser.prototype = Object.create(antlr4.Parser.prototype);
sql92Parser.prototype.constructor = sql92Parser;

Object.defineProperty(sql92Parser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

sql92Parser.EOF = antlr4.Token.EOF;
sql92Parser.T__0 = 1;
sql92Parser.T__1 = 2;
sql92Parser.T__2 = 3;
sql92Parser.T__3 = 4;
sql92Parser.T__4 = 5;
sql92Parser.T__5 = 6;
sql92Parser.T__6 = 7;
sql92Parser.T__7 = 8;
sql92Parser.T__8 = 9;
sql92Parser.T__9 = 10;
sql92Parser.T__10 = 11;
sql92Parser.T__11 = 12;
sql92Parser.T__12 = 13;
sql92Parser.T__13 = 14;
sql92Parser.T__14 = 15;
sql92Parser.T__15 = 16;
sql92Parser.T__16 = 17;
sql92Parser.T__17 = 18;
sql92Parser.T__18 = 19;
sql92Parser.T__19 = 20;
sql92Parser.T__20 = 21;
sql92Parser.T__21 = 22;
sql92Parser.T__22 = 23;
sql92Parser.T__23 = 24;
sql92Parser.T__24 = 25;
sql92Parser.T__25 = 26;
sql92Parser.T__26 = 27;
sql92Parser.T__27 = 28;
sql92Parser.T__28 = 29;
sql92Parser.T__29 = 30;
sql92Parser.T__30 = 31;
sql92Parser.T__31 = 32;
sql92Parser.T__32 = 33;
sql92Parser.T__33 = 34;
sql92Parser.T__34 = 35;
sql92Parser.T__35 = 36;
sql92Parser.T__36 = 37;
sql92Parser.T__37 = 38;
sql92Parser.T__38 = 39;
sql92Parser.T__39 = 40;
sql92Parser.ID = 41;
sql92Parser.WS = 42;
sql92Parser.NUM = 43;

sql92Parser.RULE_program = 0;
sql92Parser.RULE_query = 1;
sql92Parser.RULE_columnDeclaration = 2;
sql92Parser.RULE_dataType = 3;
sql92Parser.RULE_constraintDeclaration = 4;
sql92Parser.RULE_constraint = 5;
sql92Parser.RULE_action = 6;
sql92Parser.RULE_expression = 7;
sql92Parser.RULE_rel_op = 8;

function ProgramContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_program;
    return this;
}

ProgramContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ProgramContext.prototype.constructor = ProgramContext;

ProgramContext.prototype.query = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(QueryContext);
    } else {
        return this.getTypedRuleContext(QueryContext,i);
    }
};

ProgramContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterProgram(this);
	}
};

ProgramContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitProgram(this);
	}
};

ProgramContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitProgram(this);
    } else {
        return visitor.visitChildren(this);
    }
};




sql92Parser.ProgramContext = ProgramContext;

sql92Parser.prototype.program = function() {

    var localctx = new ProgramContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, sql92Parser.RULE_program);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 21;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << sql92Parser.T__0) | (1 << sql92Parser.T__2) | (1 << sql92Parser.T__5) | (1 << sql92Parser.T__6) | (1 << sql92Parser.T__8))) !== 0)) {
            this.state = 18;
            this.query();
            this.state = 23;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function QueryContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_query;
    return this;
}

QueryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
QueryContext.prototype.constructor = QueryContext;

QueryContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(sql92Parser.ID);
    } else {
        return this.getToken(sql92Parser.ID, i);
    }
};


QueryContext.prototype.columnDeclaration = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ColumnDeclarationContext);
    } else {
        return this.getTypedRuleContext(ColumnDeclarationContext,i);
    }
};

QueryContext.prototype.constraintDeclaration = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ConstraintDeclarationContext);
    } else {
        return this.getTypedRuleContext(ConstraintDeclarationContext,i);
    }
};

QueryContext.prototype.action = function() {
    return this.getTypedRuleContext(ActionContext,0);
};

QueryContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterQuery(this);
	}
};

QueryContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitQuery(this);
	}
};

QueryContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitQuery(this);
    } else {
        return visitor.visitChildren(this);
    }
};




sql92Parser.QueryContext = QueryContext;

sql92Parser.prototype.query = function() {

    var localctx = new QueryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, sql92Parser.RULE_query);
    var _la = 0; // Token type
    try {
        this.state = 94;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 24;
            this.match(sql92Parser.T__0);
            this.state = 25;
            this.match(sql92Parser.T__1);
            this.state = 26;
            this.match(sql92Parser.ID);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 27;
            this.match(sql92Parser.T__2);
            this.state = 28;
            this.match(sql92Parser.T__1);
            this.state = 29;
            this.match(sql92Parser.ID);
            this.state = 30;
            this.match(sql92Parser.T__3);
            this.state = 31;
            this.match(sql92Parser.T__4);
            this.state = 32;
            this.match(sql92Parser.ID);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 33;
            this.match(sql92Parser.T__5);
            this.state = 34;
            this.match(sql92Parser.T__1);
            this.state = 35;
            this.match(sql92Parser.ID);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 36;
            this.match(sql92Parser.T__6);
            this.state = 37;
            this.match(sql92Parser.T__7);
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 38;
            this.match(sql92Parser.T__8);
            this.state = 39;
            this.match(sql92Parser.T__1);
            this.state = 40;
            this.match(sql92Parser.ID);
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 41;
            this.match(sql92Parser.T__0);
            this.state = 42;
            this.match(sql92Parser.T__9);
            this.state = 43;
            this.match(sql92Parser.ID);
            this.state = 44;
            this.match(sql92Parser.T__10);
            this.state = 55;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===sql92Parser.ID) {
                this.state = 45;
                this.columnDeclaration();
                this.state = 50;
                this._errHandler.sync(this);
                var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
                while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                    if(_alt===1) {
                        this.state = 46;
                        this.match(sql92Parser.T__11);
                        this.state = 47;
                        this.columnDeclaration(); 
                    }
                    this.state = 52;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
                }

                this.state = 57;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 58;
            this.match(sql92Parser.T__11);
            this.state = 69;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===sql92Parser.T__20) {
                this.state = 59;
                this.constraintDeclaration();
                this.state = 64;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===sql92Parser.T__11) {
                    this.state = 60;
                    this.match(sql92Parser.T__11);
                    this.state = 61;
                    this.constraintDeclaration();
                    this.state = 66;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 71;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 72;
            this.match(sql92Parser.T__12);
            break;

        case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 73;
            this.match(sql92Parser.T__2);
            this.state = 74;
            this.match(sql92Parser.T__9);
            this.state = 75;
            this.match(sql92Parser.ID);
            this.state = 76;
            this.match(sql92Parser.T__3);
            this.state = 77;
            this.match(sql92Parser.T__4);
            this.state = 78;
            this.match(sql92Parser.ID);
            break;

        case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 79;
            this.match(sql92Parser.T__2);
            this.state = 80;
            this.match(sql92Parser.T__9);
            this.state = 81;
            this.match(sql92Parser.ID);
            this.state = 83;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
            if(la_===1) {
                this.state = 82;
                this.action();

            }
            break;

        case 9:
            this.enterOuterAlt(localctx, 9);
            this.state = 85;
            this.match(sql92Parser.T__5);
            this.state = 86;
            this.match(sql92Parser.T__9);
            this.state = 87;
            this.match(sql92Parser.ID);
            break;

        case 10:
            this.enterOuterAlt(localctx, 10);
            this.state = 88;
            this.match(sql92Parser.T__6);
            this.state = 89;
            this.match(sql92Parser.T__13);
            break;

        case 11:
            this.enterOuterAlt(localctx, 11);
            this.state = 90;
            this.match(sql92Parser.T__6);
            this.state = 91;
            this.match(sql92Parser.T__14);
            this.state = 92;
            this.match(sql92Parser.T__15);
            this.state = 93;
            this.match(sql92Parser.ID);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ColumnDeclarationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_columnDeclaration;
    return this;
}

ColumnDeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ColumnDeclarationContext.prototype.constructor = ColumnDeclarationContext;

ColumnDeclarationContext.prototype.ID = function() {
    return this.getToken(sql92Parser.ID, 0);
};

ColumnDeclarationContext.prototype.dataType = function() {
    return this.getTypedRuleContext(DataTypeContext,0);
};

ColumnDeclarationContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterColumnDeclaration(this);
	}
};

ColumnDeclarationContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitColumnDeclaration(this);
	}
};

ColumnDeclarationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitColumnDeclaration(this);
    } else {
        return visitor.visitChildren(this);
    }
};




sql92Parser.ColumnDeclarationContext = ColumnDeclarationContext;

sql92Parser.prototype.columnDeclaration = function() {

    var localctx = new ColumnDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, sql92Parser.RULE_columnDeclaration);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 96;
        this.match(sql92Parser.ID);
        this.state = 97;
        this.dataType();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DataTypeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_dataType;
    return this;
}

DataTypeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DataTypeContext.prototype.constructor = DataTypeContext;

DataTypeContext.prototype.NUM = function() {
    return this.getToken(sql92Parser.NUM, 0);
};

DataTypeContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterDataType(this);
	}
};

DataTypeContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitDataType(this);
	}
};

DataTypeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitDataType(this);
    } else {
        return visitor.visitChildren(this);
    }
};




sql92Parser.DataTypeContext = DataTypeContext;

sql92Parser.prototype.dataType = function() {

    var localctx = new DataTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, sql92Parser.RULE_dataType);
    try {
        this.state = 106;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case sql92Parser.T__16:
            this.enterOuterAlt(localctx, 1);
            this.state = 99;
            this.match(sql92Parser.T__16);
            break;
        case sql92Parser.T__17:
            this.enterOuterAlt(localctx, 2);
            this.state = 100;
            this.match(sql92Parser.T__17);
            break;
        case sql92Parser.T__18:
            this.enterOuterAlt(localctx, 3);
            this.state = 101;
            this.match(sql92Parser.T__18);
            break;
        case sql92Parser.T__19:
            this.enterOuterAlt(localctx, 4);
            this.state = 102;
            this.match(sql92Parser.T__19);
            this.state = 103;
            this.match(sql92Parser.T__10);
            this.state = 104;
            this.match(sql92Parser.NUM);
            this.state = 105;
            this.match(sql92Parser.T__12);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ConstraintDeclarationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_constraintDeclaration;
    return this;
}

ConstraintDeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConstraintDeclarationContext.prototype.constructor = ConstraintDeclarationContext;

ConstraintDeclarationContext.prototype.constraint = function() {
    return this.getTypedRuleContext(ConstraintContext,0);
};

ConstraintDeclarationContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterConstraintDeclaration(this);
	}
};

ConstraintDeclarationContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitConstraintDeclaration(this);
	}
};

ConstraintDeclarationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitConstraintDeclaration(this);
    } else {
        return visitor.visitChildren(this);
    }
};




sql92Parser.ConstraintDeclarationContext = ConstraintDeclarationContext;

sql92Parser.prototype.constraintDeclaration = function() {

    var localctx = new ConstraintDeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, sql92Parser.RULE_constraintDeclaration);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 108;
        this.match(sql92Parser.T__20);
        this.state = 109;
        this.constraint();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ConstraintContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_constraint;
    return this;
}

ConstraintContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConstraintContext.prototype.constructor = ConstraintContext;

ConstraintContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(sql92Parser.ID);
    } else {
        return this.getToken(sql92Parser.ID, i);
    }
};


ConstraintContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

ConstraintContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterConstraint(this);
	}
};

ConstraintContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitConstraint(this);
	}
};

ConstraintContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitConstraint(this);
    } else {
        return visitor.visitChildren(this);
    }
};




sql92Parser.ConstraintContext = ConstraintContext;

sql92Parser.prototype.constraint = function() {

    var localctx = new ConstraintContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, sql92Parser.RULE_constraint);
    var _la = 0; // Token type
    try {
        this.state = 166;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case sql92Parser.T__21:
            this.enterOuterAlt(localctx, 1);
            this.state = 111;
            this.match(sql92Parser.T__21);
            this.state = 112;
            this.match(sql92Parser.ID);
            this.state = 113;
            this.match(sql92Parser.T__22);
            this.state = 114;
            this.match(sql92Parser.T__23);
            this.state = 115;
            this.match(sql92Parser.T__10);
            this.state = 125;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case sql92Parser.ID:
                this.state = 116;
                this.match(sql92Parser.ID);
                this.state = 121;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===sql92Parser.T__11) {
                    this.state = 117;
                    this.match(sql92Parser.T__11);
                    this.state = 118;
                    this.match(sql92Parser.ID);
                    this.state = 123;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                break;
            case sql92Parser.T__12:
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 127;
            this.match(sql92Parser.T__12);
            break;
        case sql92Parser.T__24:
            this.enterOuterAlt(localctx, 2);
            this.state = 128;
            this.match(sql92Parser.T__24);
            this.state = 129;
            this.match(sql92Parser.ID);
            this.state = 130;
            this.match(sql92Parser.T__25);
            this.state = 131;
            this.match(sql92Parser.T__10);
            this.state = 141;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case sql92Parser.ID:
                this.state = 132;
                this.match(sql92Parser.ID);
                this.state = 137;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===sql92Parser.T__11) {
                    this.state = 133;
                    this.match(sql92Parser.T__11);
                    this.state = 134;
                    this.match(sql92Parser.ID);
                    this.state = 139;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                break;
            case sql92Parser.T__12:
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 143;
            this.match(sql92Parser.T__12);
            this.state = 144;
            this.match(sql92Parser.T__26);
            this.state = 145;
            this.match(sql92Parser.ID);
            this.state = 146;
            this.match(sql92Parser.T__10);
            this.state = 156;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case sql92Parser.ID:
                this.state = 147;
                this.match(sql92Parser.ID);
                this.state = 152;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===sql92Parser.T__11) {
                    this.state = 148;
                    this.match(sql92Parser.T__11);
                    this.state = 149;
                    this.match(sql92Parser.ID);
                    this.state = 154;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                break;
            case sql92Parser.T__12:
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 158;
            this.match(sql92Parser.T__12);
            break;
        case sql92Parser.T__27:
            this.enterOuterAlt(localctx, 3);
            this.state = 159;
            this.match(sql92Parser.T__27);
            this.state = 160;
            this.match(sql92Parser.ID);
            this.state = 161;
            this.match(sql92Parser.T__28);
            this.state = 162;
            this.match(sql92Parser.T__10);
            this.state = 163;
            this.expression(0);
            this.state = 164;
            this.match(sql92Parser.T__12);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ActionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_action;
    return this;
}

ActionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ActionContext.prototype.constructor = ActionContext;

ActionContext.prototype.ID = function() {
    return this.getToken(sql92Parser.ID, 0);
};

ActionContext.prototype.dataType = function() {
    return this.getTypedRuleContext(DataTypeContext,0);
};

ActionContext.prototype.constraintDeclaration = function() {
    return this.getTypedRuleContext(ConstraintDeclarationContext,0);
};

ActionContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterAction(this);
	}
};

ActionContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitAction(this);
	}
};

ActionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitAction(this);
    } else {
        return visitor.visitChildren(this);
    }
};




sql92Parser.ActionContext = ActionContext;

sql92Parser.prototype.action = function() {

    var localctx = new ActionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, sql92Parser.RULE_action);
    try {
        this.state = 182;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 168;
            this.match(sql92Parser.T__29);
            this.state = 169;
            this.match(sql92Parser.T__30);
            this.state = 170;
            this.match(sql92Parser.ID);
            this.state = 171;
            this.dataType();
            this.state = 172;
            this.constraintDeclaration();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 174;
            this.match(sql92Parser.T__29);
            this.state = 175;
            this.constraintDeclaration();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 176;
            this.match(sql92Parser.T__5);
            this.state = 177;
            this.match(sql92Parser.T__30);
            this.state = 178;
            this.match(sql92Parser.ID);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 179;
            this.match(sql92Parser.T__5);
            this.state = 180;
            this.match(sql92Parser.T__20);
            this.state = 181;
            this.match(sql92Parser.ID);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

ExpressionContext.prototype.NUM = function() {
    return this.getToken(sql92Parser.NUM, 0);
};

ExpressionContext.prototype.ID = function() {
    return this.getToken(sql92Parser.ID, 0);
};

ExpressionContext.prototype.rel_op = function() {
    return this.getTypedRuleContext(Rel_opContext,0);
};

ExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterExpression(this);
	}
};

ExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitExpression(this);
	}
};

ExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};



sql92Parser.prototype.expression = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExpressionContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 14;
    this.enterRecursionRule(localctx, 14, sql92Parser.RULE_expression, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 193;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case sql92Parser.T__10:
            this.state = 185;
            this.match(sql92Parser.T__10);
            this.state = 186;
            this.expression(0);
            this.state = 187;
            this.match(sql92Parser.T__12);
            break;
        case sql92Parser.NUM:
            this.state = 189;
            this.match(sql92Parser.NUM);
            break;
        case sql92Parser.ID:
            this.state = 190;
            this.match(sql92Parser.ID);
            break;
        case sql92Parser.T__31:
            this.state = 191;
            this.match(sql92Parser.T__31);
            this.state = 192;
            this.expression(4);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 207;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 205;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, sql92Parser.RULE_expression);
                    this.state = 195;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 196;
                    this.rel_op();
                    this.state = 197;
                    this.expression(4);
                    break;

                case 2:
                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, sql92Parser.RULE_expression);
                    this.state = 199;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 200;
                    this.match(sql92Parser.T__32);
                    this.state = 201;
                    this.expression(3);
                    break;

                case 3:
                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, sql92Parser.RULE_expression);
                    this.state = 202;
                    if (!( this.precpred(this._ctx, 1))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                    }
                    this.state = 203;
                    this.match(sql92Parser.T__33);
                    this.state = 204;
                    this.expression(2);
                    break;

                } 
            }
            this.state = 209;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function Rel_opContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = sql92Parser.RULE_rel_op;
    return this;
}

Rel_opContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
Rel_opContext.prototype.constructor = Rel_opContext;


Rel_opContext.prototype.enterRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.enterRel_op(this);
	}
};

Rel_opContext.prototype.exitRule = function(listener) {
    if(listener instanceof sql92Listener ) {
        listener.exitRel_op(this);
	}
};

Rel_opContext.prototype.accept = function(visitor) {
    if ( visitor instanceof sql92Visitor ) {
        return visitor.visitRel_op(this);
    } else {
        return visitor.visitChildren(this);
    }
};




sql92Parser.Rel_opContext = Rel_opContext;

sql92Parser.prototype.rel_op = function() {

    var localctx = new Rel_opContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, sql92Parser.RULE_rel_op);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 210;
        _la = this._input.LA(1);
        if(!(((((_la - 35)) & ~0x1f) == 0 && ((1 << (_la - 35)) & ((1 << (sql92Parser.T__34 - 35)) | (1 << (sql92Parser.T__35 - 35)) | (1 << (sql92Parser.T__36 - 35)) | (1 << (sql92Parser.T__37 - 35)) | (1 << (sql92Parser.T__38 - 35)) | (1 << (sql92Parser.T__39 - 35)))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


sql92Parser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 7:
			return this.expression_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

sql92Parser.prototype.expression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);
		case 1:
			return this.precpred(this._ctx, 2);
		case 2:
			return this.precpred(this._ctx, 1);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.sql92Parser = sql92Parser;
