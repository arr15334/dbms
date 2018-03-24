// Generated from grammar/sql92.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by sql92Parser.

function sql92Visitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

sql92Visitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
sql92Visitor.prototype.constructor = sql92Visitor;

// Visit a parse tree produced by sql92Parser#program.
sql92Visitor.prototype.visitProgram = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by sql92Parser#query.
sql92Visitor.prototype.visitQuery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by sql92Parser#columnDeclaration.
sql92Visitor.prototype.visitColumnDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by sql92Parser#dataType.
sql92Visitor.prototype.visitDataType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by sql92Parser#constraintDeclaration.
sql92Visitor.prototype.visitConstraintDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by sql92Parser#constraint.
sql92Visitor.prototype.visitConstraint = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by sql92Parser#action.
sql92Visitor.prototype.visitAction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by sql92Parser#expression.
sql92Visitor.prototype.visitExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by sql92Parser#rel_op.
sql92Visitor.prototype.visitRel_op = function(ctx) {
  return this.visitChildren(ctx);
};



exports.sql92Visitor = sql92Visitor;