var register_queries = {};

var fs = require('fs');

const path = './databases/';

register_queries.insert = function(db, table, columns, values) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    if (!data.hasOwnProperty(table)) {
        let error = "No existe la tabla '" + table + "' en la Base de Datos '" + db + "'.";

        return {
            "success": false,
            "message": error
        }
    }

    let dataColumns = data[table].columns; //Objeto con la informacion de las columnas de la tablas
    let schema = data[table].schema;

    //Se revisa si las columnas o los valores tiene una menor longitud
    var len = columns.length;
    if (len == 0) {
        columns = Object.keys(dataColumns);
        len = columns.length;
    }
    if (len > values) {
        len = Object.keys(values).length;
    }

    //Se validan y guardan los valores ingresados
    for (var i = 0; i < len; i++) {
        let column = columns[i];
        if (dataColumns.hasOwnProperty(column)) {
            if (values[i].type.substring(0,3) == dataColumns[column].type.substring(0,3)) {
                schema[column] = values[i].value;
            } else {
                let error = "Error: El tipo de dato que se está tratando de usar en la columna '" + columns[i] + "' es incorrecto.";

                return {
                    "success" : false,
                    "message" : error
                }
            }
        } else {
            error = "Error: No existe la columna '" + column + "' en la tabla '" + table + "'.";

            return  {
                "success": false,
                "message": error
            }
        }
    }

    //Se recorren los valores ingresados
    // for (var i = 0; i < len; i++) {
    //     let column = columns[i];
    //
    //     if (dataColumns.hasOwnProperty(column)) {
    //         let type = dataColumns[column].type;
    //
    //         //Caso que la columna sea tipo INT
    //         if (type == "INT"){
    //             //En caso que los dos tipos coincidan, simplemente se agrega al objeto nuevo
    //             if (Number.isInteger(values[i])) {
    //                 schema[column] = values[i];
    //             }
    //             //Si el número que se está tratando de guardar es float, se le hace truncate
    //             else if (typeof (values[i]*1) == "number") {
    //                 schema[column] = Number.parseInt(values[i], 10);
    //             }
    //             //En caso que no sea un número, se lanzará un error
    //             else {
    //                 error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";
    //
    //                 return  {
    //                     "success": false,
    //                     "message": error
    //                 }
    //             }
    //         }
    //         //Caso que la columna sea tipo FLOAT
    //         else if (type == "FLOAT") {
    //             //En caso que los dos tipos coincidan, simplemente se agrega al objeto nuevo
    //             if (Number.isInteger(values[i])) {
    //                 schema[column] = Number.parseFloat(values[i]);
    //             }
    //             //Si el número que se está tratando de guardar es float, se le hace truncate
    //             else if ((typeof (values[i]*1)) == "number") {
    //                 schema[column] = values[i];
    //             }
    //             //En caso que no sea un número, se lanzará un error
    //             else {
    //                 error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";
    //
    //                 return  {
    //                     "success": false,
    //                     "message": error
    //                 }
    //             }
    //         }
    //         //Caso que la columna sea tipo DATE
    //         else if (type == "DATE") {
    //             //Primero se revisa que el valor sea un string
    //             if (typeof values[i] == "string") {
    //                 //Se trata de leer el año, mes y día. Si falla algún paso se considera un error
    //                 try {
    //                     let tempDate = values[i].split("-");
    //                     let dateValues = values[i].split("-")// [+tempDate[0], +tempDate[1], +tempDate[2]]
    //                     //Se valida que la fecha sea válida
    //                     if (Number.isInteger(dateValues[0].replace("'", "")*1) && Number.isInteger(dateValues[1]*1) && Number.isInteger(dateValues[2].replace("'", "")*1)) {
    //                         if (dateValues[1]*1 > 0 && dateValues[1]*1 < 13 && dateValues[2].replace("'", "")*1 > 0 && dateValues[2].replace("'", "")*1 < 32) {
    //                             schema[column] = values[i].replace(/'/g, "");
    //                         } else {
    //                             error = "Error: Fecha inválida.";
    //
    //                             return  {
    //                                 "success": false,
    //                                 "message": error
    //                             }
    //                         }
    //                     } else {
    //                         error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";
    //
    //                         return  {
    //                             "success": false,
    //                             "message": error
    //                         }
    //                     }
    //                 } catch (e) {
    //                     error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";
    //
    //                     return  {
    //                         "success": false,
    //                         "message": error
    //                     }
    //                 }
    //             } else {
    //                 error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";
    //
    //                 return  {
    //                     "success": false,
    //                     "message": error
    //                 }
    //             }
    //         }
    //         //Caso que la columna sea tipo CHAR
    //         else {
    //             //Primero se revisa que el valor sea un string
    //             if (typeof values[i] == "string") {
    //                 let charLen = +type.substring(5, type.length-1);
    //
    //                 //Se revisa que el string sea menor o igual al especificado
    //                 if (values[i].length <= charLen) {
    //                     schema[column] = values[i];
    //                 } else {
    //                     error = "Error: El string es de mayor tamaño al especificado, debe ser " + type + ".";
    //
    //                     return  {
    //                         "success": false,
    //                         "message": error
    //                     }
    //                 }
    //             } else {
    //                 error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";
    //
    //                 return  {
    //                     "success": false,
    //                     "message": error
    //                 }
    //             }
    //         }
    //     } else {
    //         error = "Error: No existe la columna '" + column + "' en la tabla '" + table + "'.";
    //
    //         return  {
    //             "success": false,
    //             "message": error
    //         }
    //     }
    // }

    //Se lee la informacion de la tabla
    let tableData = JSON.parse(fs.readFileSync(path + db + '/' + table + '.json', 'utf8'));

    //Se revisan los valores de la Primary Key
    if (data[table].constraints.hasOwnProperty("primaryKey")) {
        let pks = data[table].constraints.primaryKey.elements;

        //Revision de Primary Keys
        for (var i = 0; i < pks.length; i++) {
            let value = schema[pks[i]];

            if (value != null) {
                if (!tableData.primaryKey[pks[i]].hasOwnProperty(value)) {
                    tableData.primaryKey[pks[i]][value] = null;
                } else {
                    let error = "Error: El valor que se está tratando de ingresar para la Primary Key '" + pks[i] + "' ya existe.";

                    return {
                        "success": false,
                        "message": error
                    }
                }
            } else {
                let error = "Error: No ingresó valor de la Primary Key '" + pks[i] + "'.";

                return {
                    "success": false,
                    "message": error
                }
            }
        }
    }

    //CHECK
    if (data[table].constraints.hasOwnProperty("check")) {
        let expression = data[table].constraints.check.expression;

        let tempRes = navigateTree(dataColumns, schema, expression);

        if (typeof tempRes == "string") {
            return {
                "success" : false,
                "message" : tempRes
            }
        }
        if (!tempRes) {
            let error = "El registro que está tratando de ingresar no cumple con la condición de CHECK"Ñ
            return {
                "success" : false,
                "message" : error
            }
        }
    }

    //Se agrega el registro a la base de datos
    tableData.registers.push(schema);
    data[table].registers = data[table].registers + 1;

    //Se guarda la información
    fs.writeFileSync(path + db + '/' + table + ".json", JSON.stringify(tableData));
    fs.writeFileSync(path + db + "/__master.json", JSON.stringify(data));

    return {
        "success": true,
        "message": "Se ha añadido el nuevo registro a la tabla " + table + "."
    }

}

register_queries.update = function(db, table, columns, values, expression) {
    if (columns.length == 0) {
        let error = "Error: Debe ingresar por lo menos una columna a cambiar.";

        return {
            "success" : false,
            "message" : error
        }
    }

    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));
    let columnsInfo = data[table].columns;

    //Se revisa que exista la tabla
    if (!data.hasOwnProperty(table)) {
        let error = "Error: No existe la tabla '" + table + "' en la Base de Datos '" + db + "'.";

        return {
            "success": false,
            "message": error
        }
    }

    //Se revisa que los valores a cambiar sean del tipo correcto
    for (let i = 0; i < values.length; i++) {
        if (values[i].type.substring(0,4) != columnsInfo[columns[i]].type.substring(0,4)) {
          console.log(values[i].type + columnsInfo[columns[i]].type);
            let error = "Error: El tipo de dato que se está tratando de usar en la columna '" + columns[i] + "' es incorrecto.";

            return {
                "success" : false,
                "message" : error
            }
        }
    }

    //Se lee la informacion de la tabla
    let tableData = JSON.parse(fs.readFileSync(path + db + '/' + table + '.json', 'utf8'));

    let registers = tableData.registers;

    let cont = 0;
    let i = 0;
    const iMax = registers.length;
    for (; i < iMax; i++) {
        let res;
        if (Object.keys(expression).length == 0) {
            res = true;
        } else {
            res = navigateTree(columnsInfo, registers[i], expression)
            if (typeof res == "string") {
                return {
                    "success": false,
                    "message": res
                }
            }
        }
        if (res) {
            let j = 0;
            for (; j < columns.length; j++) {
                tableData.registers[i][columns[j]] = values[j].value;
            }
            cont++
        }
    }

    //CHECK
    if (data[table].constraints.hasOwnProperty("check")) {
        let checkExpression = data[table].constraints.check.expression;

        let tempRes = navigateTree(dataColumns, schema, checkExpression);

        if (typeof tempRes == "string") {
            return {
                "success" : false,
                "message" : tempRes
            }
        }
        if (!tempRes) {
            let error = "El registro que está tratando de ingresar no cumple con la condición de CHECK"Ñ
            return {
                "success" : false,
                "message" : error
            }
        }
    }

    //Se guarda la información
    if (cont > 0)
        fs.writeFileSync(path + db + '/' + table + ".json", JSON.stringify(tableData));

    return {
        "success" : true,
        "message" : "UPDATE (" + cont + ") con éxito."
    }
}

register_queries.delete = function(db, table, expression) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    if (!data.hasOwnProperty(table)) {
        let error = "Error: No existe la tabla '" + table + "' en la Base de Datos '" + db + "'.";

        return {
            "success": false,
            "message": error
        }
    }

    let columnsInfo = data[table].columns;

    //Se lee la informacion de la tabla
    let tableData = JSON.parse(fs.readFileSync(path + db + '/' + table + '.json', 'utf8'));

    let registers = tableData.registers;
    let expLen = Object.keys(expression).length;

    let cont = 0;
    let i = registers.length-1;
    for (; i >= 0; i--) {
        let res;
        if (expLen == 0) {
            res = true;
        } else {
            res = navigateTree(columnsInfo, registers[i], expression)
            if (typeof res == "string") {
                return {
                    "success": false,
                    "message": res
                }
            }
        }
        if (res) {
            tableData.registers.splice(i, 1);
            cont++
        }
    }

    //Se guarda la información si hubo algún cambio
    if (cont > 0)
        fs.writeFileSync(path + db + '/' + table + ".json", JSON.stringify(tableData));

    return {
        "success" : true,
        "message" : "DELETE (" + cont + ") con éxito."
    }
}

register_queries.select = function(db, columns, tables, expression) {

    //FROM
    let dbData = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));
    let tableData = {};

    //Se junta la informacion de todas las tablas definididas en el FROM
    let tablesInfo = {};
    for (let i = 0; i < tables.length; i++) {
        tablesInfo[tables[i]] = dbData[tables[i]].columns;

        tableData[tables[i]] = JSON.parse(fs.readFileSync(path + db + '/' + tables[i] + '.json', 'utf8')).registers;
    }

    //Se validan que existen las columnas de expression
    let newExp = validateTree(tablesInfo, expression);
    if (typeof newExp == "string") {
        return {
            "success" : false,
            "message" : newExp
        }
    } else {
        expression = newExp;
        console.log(expression);
    }

    //En caso que solo se use una tabla
    if (tables.length == 1) {
        let tempTable = [];
        let regs = tableData[tables[0]];
        let i = 0;
        const iMax = regs.length;
        for (; i < iMax; i++) {
            let tempRes;
            if (Object.keys(expression).length > 0) {
                tempRes = navigateTree(tablesInfo, regs[i], expression);

                if (typeof tempRes == "string")
                    return {
                        "success" : false,
                        "message" : tempRes
                    }

            } else {
                tempRes = true;
            }

            if (tempRes) {
                if (columns == null) {
                    tempTable.push(regs[i]);
                } else {
                    let tempObj = {};
                    for (var key in columns)
                        if (columns.hasOwnProperty(key)) {
                            tempObj[key] = regs[key];
                        }
                    tempTable.push(tempObj);
                }
            }
        }

        let res = {
            "success" : true,
            "registers": tempTable,
            "columns": tablesInfo
        }

        console.log(tempTable);

        return res;

    }
    //En caso que sean mas de 2 tablas y haya que realizar producto cartesiano
    else {
        //Se validan que existan las columnas que se pidieron en SELECT
        if (columns != null) {
            let newTableSchema = validateSelectColumns(columns, tablesInfo);
            if (typeof newTableSchema == "string")
                return {
                    "success" : false,
                    "message" : newTableSchema
                }
        }

        //Se realiza el producto cartesiano
        const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
        const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

        var newTable = [];
        for (var key in tableData)
            if (tableData.hasOwnProperty(key)) {
                if (newTable.length == 0) {
                    newTable = tableData[key];
                } else {
                    newTable = cartesian(newTable, tableData[key]);
                }
            }

        // Se recorre toda la nueva tabla para ver los valores que cumplan con la condicion
        // y separar las columnas que se indicaron en el SELECT
        let tempTable = [];
        let i = 0;
        const iMax = newTable.length;
        for (; i < iMax; i++) {
            let obj = {};
            for (var j = 0; j < tables.length; j++) {
                for (var column in newTable[i][j]) {
                    let str = tables[j] + "." + column;
                    obj[str] = newTable[i][j][column];
                }
            }

            let tempRes;
            if (Object.keys(expression).length > 0) {
                tempRes = navigateTree(tablesInfo, obj, expression);

                if (typeof tempRes == "string")
                    return {
                        "success" : false,
                        "message" : tempRes
                    }

            } else {
                tempRes = true;
            }

            if (tempRes) {
                if (columns == null) {
                    tempTable.push(obj);
                } else {
                    let tempObj = {};
                    for (var key in newTableSchema)
                        if (newTableSchema.hasOwnProperty(key)) {
                            tempObj[key] = obj[key];
                        }
                    tempTable.push(tempObj);
                }
            }
        }

        let res = {
            "success" : true,
            "registers": tempTable,
            "columns": tablesInfo
        }

        console.log(tempTable);

        return res;
    }
}

function validateSelectColumns(select, columns) {
    var schema = {};
    for (var columnKey in select)
        if (select.hasOwnProperty(columnKey)) {

            if (select[columnKey].table != null) {
                schema[select[columnKey].table + "." + columnKey] = null;
            } else {
                let cont = 0;
                let tempTable;
                for (var key in columns)
                    if (columns.hasOwnProperty(key)) {
                        if (columns[key].hasOwnProperty(columnKey)) {
                            cont++;
                            tempTable = key;
                        }
                    }

                if (cont == 0) {
                    error = "No existe una columna con el nombre '" + op1.value + "'.";

                    return error
                } else if (cont > 1) {
                    error =  "Existe más de una columna con el nombre '" + op1.value + "'.";

                    return error
                } else {
                    schema[tempTable + "." + columnKey] = null;
                }
            }
        }

    return schema;
}

function validateTree(columns, expression) {
    let op1 = expression.operando1;
    let op2 = expression.operando2;
    let act = expression.operador;

    if (op1.hasOwnProperty("operador1")) {
        expression.operador1 = validateTree(op1);

        if (typeof expression.operador1 == "string")
            return expression.operador1
    } else {
        if (op1.type == "id") {
            let cont = 0;
            for (var key in columns)
                if (columns.hasOwnProperty(key)) {
                    if (columns[key].hasOwnProperty(op1.value)) {
                        cont++;
                        expression.operando1.type = "idTable";
                        expression.operando1.value = {
                            "table": key,
                            "column": op1.value
                        }
                    }
                }

            if (cont == 0) {
                error = "No existe una columna con el nombre '" + op1.value + "'.";

                return error
            } else if (cont > 1) {
                error =  "Existe más de una columna con el nombre '" + op1.value + "'.";

                return error
            }
        }
    }
    if (op2.hasOwnProperty("operador1")) {
        expression.operador2 = validateTree(op2);

        if (typeof expression.operador2 == "string")
            return expression.operador2
    } else {
        if (op2.type == "id") {
            let cont = 0;
            for (var key in columns)
                if (columns.hasOwnProperty(key)) {
                    if (columns[key].hasOwnProperty(op2.value)) {
                        cont++;
                        expression.operando2.type = "idTable";
                        expression.operando2.value = {
                            "table": key,
                            "column": op2.value
                        }
                    }
                }

            if (cont == 0) {
                error = "No existe una columna con el nombre '" + op2.value + "'.";

                return error
            } else if (cont > 1) {
                error =  "Existe más de una columna con el nombre '" + op2.value + "'.";

                return error
            }
        }
    }

    return expression;

}


function navigateTree(columns, register, expression) {
    let op1 = expression.operando1;
    let act = expression.operador;
    let op2;

    if (act == "NOT") {
        if (op1.hasOwnProperty("operador1")) {
            let tempOp1 = {
                "value": navigateTree(columns, register, op1),
                "type": "BOOLEAN"
            }
            if (typeof tempOp1.value == "string")
                return tempOp1.value;
            op1 = tempOp1;
        }
        if (op1.type == "BOOLEAN") {
            return !op1.value;
        } else {
            error = "Error: No puede usar el operando '" + act + "' con el tipo '" + op1.type + "'.";

            return error
        }
    } else {
        op2 = expression.operando2;
    }

    if (op1.hasOwnProperty("operador1")) {
        let tempOp1 = {
            "value": navigateTree(columns, register, op1),
            "type": "BOOLEAN"
        }
        if (typeof tempOp1.value == "string")
            return tempOp1.value;
        op1 = tempOp1;
    }
    if (op2.hasOwnProperty("operador1")) {
        let tempOp2 = {
            "value": navigateTree(columns, register, op2),
            "type": "BOOLEAN"
        }
        if (typeof tempOp2.value == "string")
            return tempOp2.value;
        op2 = tempOp2;
    }

    if (op1.type == "id") {
        if (columns.hasOwnProperty(op1.value)) {
            let tempOp1 = {
                "value" : register[op1.value],
                "type" : columns[op1.value].type.substring(0, 4) == 'CHAR' ? "CHAR" : columns[op1.value].type
            }
            op1 = tempOp1
        } else {
            error = "Error: No existe la columna '" + op1.value + "'.";

            return error
        }
    }

    if (op2.type == "id") {
        if (columns.hasOwnProperty(op2.value)) {
            let tempOp2 = {
                "value" : register[op2.value],
                "type" : columns[op1.value].type.substring(0, 4) == 'CHAR' ? "CHAR" : columns[op1.value].type
            }
            op2 = tempOp2
        } else {
            error = "Error: No existe la columna '" + op2.value + "'.";

            return error
        }
    }

    if (op1.type == "idTable") {
        if (columns.hasOwnProperty(op1.value.table)) {
            if (columns[op1.value.table].hasOwnProperty(op1.value.column)) {
                let tempOp1 = {
                    "value" : register[op1.value.table + "." + op1.value.column],
                    "type" : columns[op1.value.table][op1.value.column].type.substring(0, 4) == "CHAR" ? "CHAR" : columns[op1.value.table][op1.value.column].type
                }
                op1 = tempOp1;
            } else {
                let error = "Error: La columna '" + op1.value.column + "' no existe en la tabla '" + op1.value.table + "'.";

                return error
            }
        } else {
            let error = "Error: La tabla '" + op1.value.table + "' no fue definida."

            return error
        }
    }

    if (op2.type == "idTable") {
        if (columns.hasOwnProperty(op2.value.table)) {
            if (columns[op2.value.table].hasOwnProperty(op2.value.column)) {
                let tempOp2 = {
                    "value" : register[op2.value.table + "." + op2.value.column],
                    "type" : columns[op2.value.table][op2.value.column].type.substring(0, 4) == "CHAR" ? "CHAR" : columns[op2.value.table][op2.value.column].type
                }
                op2 = tempOp2;
            } else {
                let error = "Error: La columna '" + op2.value.column + "' no existe en la tabla '" + op2.value.table + "'.";

                return error
            }
        } else {
            let error = "Error: La tabla '" + op2.value.table + "' no fue definida."

            return error
        }
    }

    if (op1.type == op2.type) {
        let flag = false;
        let error = null;
        switch (act) {
            case '<':
            case '>':
            case '<=':
            case '>=':
                if (op1.type != "INT") {
                    flag = true;
                    error = "Error: No puede usar el operando '" + act + "' con el tipo '" + op1.type + "'.";
                }
                break;
            case 'AND':
            case 'OR':
                if (op2.type != "BOOLEAN") {
                    flag = true;
                    error = "Error: No puede usar el operando '" + act + "' con el tipo '" + op1.type + "'.";
                }
                break;
        }

        if (flag) {
            return error
        }

        switch (act) {
            case '=':
                if (op1.value == op2.value) {
                    return true
                } else {
                    return false
                }
                break;
            case '<>':
                if (op1.value != op2.value) {
                    return true
                } else {
                    return false
                }
                break;
            case '<':
                if (op1.value < op2.value) {
                    return true
                } else {
                    return false
                }
                break;
            case '>':
                if (op1.value > op2.value) {
                    return true
                } else {
                    return false
                }
                break;
            case '<=':
                if (op1.value <= op2.value) {
                    return true
                } else {
                    return false
                }
                break;
            case '>=':
                if (op1.value >= op2.value) {
                    return true
                } else {
                    return false
                }
                break;
            case 'AND':
                return op1.value && op2.value;
                break;
            case 'OR':
                return op1.value || op2.value;
                break;
        }
    } else {
        let error = "Error: No se puede realizar la operación entre " + op1.type + " y " + op2.type + ".";

        return error
    }
}

module.exports = register_queries;
