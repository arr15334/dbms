// Generated from grammar/sql92.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by sql92Parser.
function sql92Listener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

sql92Listener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
sql92Listener.prototype.constructor = sql92Listener;

// Enter a parse tree produced by sql92Parser#program.
sql92Listener.prototype.enterProgram = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#program.
sql92Listener.prototype.exitProgram = function(ctx) {
};


// Enter a parse tree produced by sql92Parser#query.
sql92Listener.prototype.enterQuery = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#query.
sql92Listener.prototype.exitQuery = function(ctx) {
};


// Enter a parse tree produced by sql92Parser#columnDeclaration.
sql92Listener.prototype.enterColumnDeclaration = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#columnDeclaration.
sql92Listener.prototype.exitColumnDeclaration = function(ctx) {
};


// Enter a parse tree produced by sql92Parser#dataType.
sql92Listener.prototype.enterDataType = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#dataType.
sql92Listener.prototype.exitDataType = function(ctx) {
};


// Enter a parse tree produced by sql92Parser#constraintDeclaration.
sql92Listener.prototype.enterConstraintDeclaration = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#constraintDeclaration.
sql92Listener.prototype.exitConstraintDeclaration = function(ctx) {
};


// Enter a parse tree produced by sql92Parser#constraint.
sql92Listener.prototype.enterConstraint = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#constraint.
sql92Listener.prototype.exitConstraint = function(ctx) {
};


// Enter a parse tree produced by sql92Parser#action.
sql92Listener.prototype.enterAction = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#action.
sql92Listener.prototype.exitAction = function(ctx) {
};


// Enter a parse tree produced by sql92Parser#expression.
sql92Listener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#expression.
sql92Listener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by sql92Parser#rel_op.
sql92Listener.prototype.enterRel_op = function(ctx) {
};

// Exit a parse tree produced by sql92Parser#rel_op.
sql92Listener.prototype.exitRel_op = function(ctx) {
};



exports.sql92Listener = sql92Listener;