var express = require('express');
var router = express.Router();
var fs = require('fs');
var rimraf = require('rimraf');
const db_queries = require('./queries_functions/database');
const table_queries = require('./queries_functions/table');
const register_queries = require('./queries_functions/register');

const nearley = require('nearley')
const grammar = require('../grammar/sql92.js')

const path = './databases/';

var sqlQuery = {data: []}

/**
 * Route serving query processing
 * @name post/queries
 * @memberof module:router/Databases
 * @inner
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear
 */
router.post('/queries', function (req, res) {

  messages = []

  //Try to run every query
  //If error catched return the error
  try {
    //Create the parser from nealey module, and the grammar
    //Pass the queries from the req.body to the parser
    //For every querie parsed send the code through routeQueries
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(req.body['sql_query']);


    //Iterate for every query, add the message to messages Array
    for (var i in parser.results[0][0]) {
      sqlQuery = {data: []}
      parseResult(parser.results[0][0][i]);
      console.log(formatQuery());
      messages.push(routeQueries(formatQuery()));

      //If the query is unsuccessful return the message
      if (!messages[messages.length - 1].success)
        res.json({results: messages});
    }
    //Return response with all messages
    res.json({results: messages});

  } catch (err) {
    console.log(err);
    res.json({
      'success': false,
      'message': err
    });
  }
});

// funcion para ordenar el query
function parseResult (res) {
  for (let i = 0; i<res.length; i++) {
    if (!(res[i] instanceof Array)) {
      sqlQuery.data.push(res[i])
    } else {
      // llamada recursiva
      parseResult(res[i])
    }
  }
}

function formatQuery () {
  let finalQuery = {
    action: '',
    object: '',
    id: {
      name: '',
      newName: ''
    },
    columns: {},
    constraints: {},
    columnsToAdd: [],
    values: [],
	select: {
		columns: [],
		tables: [],
    order: {
      column: {},
      order: ''
    }
	}
  }
  let columns = []
  let constraints = []
  let isColumn = 0
  let isTable = 0
  let isOrder = 0
  for (const statement of sqlQuery.data) {
    if (statement) {
      if (statement.type === 'command') {
        finalQuery.action = statement.value
      }
      if (statement.type === 'object') {
        finalQuery.object = statement.value
      }
      if (statement.type === 'id' && !isColumn) {
		      if (finalQuery.action === 'SELECT') {
            if (isOrder) {
              if (statement.value === 'ASC' || statement.value === 'DESC') {
                finalQuery.select.order.order = statement.value
              } else {
                finalQuery.select.order.column = statement.value
              }
            } else if (!isTable) {
  			       finalQuery.select.columns.push(statement.value)
            } else {
  			       finalQuery.select.tables.push(statement.value)
		           }
        } else if (!finalQuery.id.name) {
          finalQuery.id.name = statement.value
        } else if (finalQuery.action === 'INSERT' || finalQuery.action === 'SET') {
          finalQuery.columnsToAdd.push(statement.value)
        } else {
          finalQuery.id.newName = statement.value
        }
      }
      if (statement.type === 'column') {
        const key = statement.column.name.value
        finalQuery.columns[key] = {}
        finalQuery.columns[key].type = statement.column.type[0].value || statement.column.type
        // columns.push({name: statement.column.name.value, type: statement.column.type[0].value || statement.column.type})
        isColumn++
      }
      if (statement.type === 'primaryKey') {
        finalQuery.constraints.primaryKey = {}
        elems = formatAst(statement.primaryKey.elems)
        finalQuery.constraints.primaryKey.name = statement.primaryKey.name.value
        finalQuery.constraints.primaryKey.elements = elems
      }
      if (statement.type === 'foreignKey') {
        const elems = formatAst(statement.foreignKey.elems)
        finalQuery.constraints.foreignKey = {}
        finalQuery.constraints.foreignKey.name = statement.foreignKey.referenceTable.value
        finalQuery.constraints.foreignKey.elements = elems
        finalQuery.constraints.foreignKey.referenceTable = statement.foreignKey.referenceTable.value
        finalQuery.constraints.foreignKey.referenceColumns = formatAst(statement.foreignKey.referenceColumn)
      }
      if (statement.type === 'check') {
        finalQuery.constraints.check = {
          name: statement.check.name.value,
          expression: extractObjectFromList(statement.check.checkExp)
        }
      }
      if (statement.type === 'constraintKeyword') {
        if (finalQuery.action === 'ADD') {
          finalQuery.object = statement.value
        } else if (finalQuery.action === 'DROP') {
          finalQuery.object = statement.value
        }
      }
      if (statement.type === 'INT' || statement.type === 'FLOAT' || statement.type === 'DATE' || statement.type === 'CHAR' ) {
        if (finalQuery.action === 'SET') finalQuery.values.push(statement)
		else if (finalQuery.action === 'INSERT' ) finalQuery.values.push(statement)
        else finalQuery.values.push(statement.value)
      }
      if (statement.type === 'keyword') {
        if (statement.value === 'FROM') isTable++
        if (statement.value === 'ORDER') isOrder++
      }
	  if (statement.type === '*') {
		  finalQuery.object = statement.value;
	  }

      if (statement.operando1 || statement.operador) {
        finalQuery.expression = statement
      }
    }
  }
  return finalQuery
}

function formatAst (l) {
  let list = []
  for (let i = 0; i<l.length; i++) {
    if (!(l[i] instanceof Array)) {
      if (l[i].value === 'REFERENCES') return list
      if (l[i].type === 'id') list.push(l[i].value)
    } else {
      // llamada recursiva
      let tempList = formatAst(l[i])
      list.push.apply(list, tempList)
    }
  }
  return list
}

/**
 * Function for sorting the query with the necesary route
 * @param {Object} query - Object describing the information of the query
 * @return {string} message - String that contains the message if the query was successful
 */
function routeQueries(query) {
  console.log(query);
  const action = query.action
  const object = query.object
  const db = getCurrentDatabase();
      if (action === 'CREATE') {
        if (object === 'DATABASE') return db_queries.createDatabase(query.id.name)
        else if (object === 'TABLE') return table_queries.createTable(db, query.id.name, query.columns, query.constraints)
          else {
          return 'Error: bad query'
        }
      } else if (action === 'DROP') {
          if (object === 'DATABASE') return db_queries.deleteDatabase(query.id.name)
          else if(object === 'TABLE') return table_queries.deleteTable(db, query.id.name)
          else if(object === 'COLUMN') return table_queries.deleteColumn(db, query.id.name, query.columns.name)
          else if(object === 'CONSTRAINT') return table_queries.deleteConstraint(db, query.id.name, query.id.newName)
          else return 'Error: bad query'
      } else if (action === 'RENAME') {
          if (object === 'TABLE') return table_queries.renameTable(db, query.id.name, query.id.newName)
          else if (object === 'DATABASE') return db_queries.renameDatabase(query.id.name, query.id.newName)
          else return 'Error: bad query'
      } else if (action === 'SHOW') {
          if (object === 'DATABASES') return db_queries.showDatabases()
          else if (object === 'TABLES') return table_queries.showTables(db)
          else if (object ==='COLUMNS') return table_queries.showColumns(db, query.id.name)
      } else if (action === 'USE') {
        if (object === 'DATABASE') {
          return db_queries.useDatabase(query.id.name)
        } else {
          return 'Error: bad query'
        }
      } else if (action === 'ADD') {
          if (object === 'COLUMN') return table_queries.addColumn(db ,query.id.name, Object.keys(query.columns)[0], query.columns[Object.keys(query.columns)[0]].type, query.constraints)
          else if (object === 'CONSTRAINT') return table_queries.addConstraint(db, query.id.name, query.constraints)
      } else if (action === 'INSERT') {
        if (object === 'VALUES') return register_queries.insert(db, query.id.name, query.columnsToAdd, query.values)
        else return 'Error: bad query'
      } else if (action === 'SET') {
        return register_queries.update(db, query.id.name, query.columnsToAdd, query.values, query.expression || {})
      } else if (action === 'DELETE') {
        return register_queries.delete(db, query.id.name, query.expression || {})
      } else if (action === 'SELECT') {
        if (query.select.order.column) {
            if (query.object) return register_queries.select(db, null, query.select.tables, query.expression || {}, query.select.order)
        } else {
          if (query.object) return register_queries.select(db, null, query.select.tables, query.expression || {}, null)
            else return register_queries.select(db, query.columns, query.select.tables, query.expression || {}, null)
        }

	  }
      else {
        return 'Error: bad query'
      }
}

function getCurrentDatabase () {
  return JSON.parse(fs.readFileSync(path + 'currentdb.json', 'utf8')).current;
}

function extractObjectFromList (l) {
  if ((l instanceof Array)) {
    let nextL = l[0]
    return extractObjectFromList(nextL)
  } else {
    return l
  }
}

module.exports = router;
