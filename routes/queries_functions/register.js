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
        len = values.length;
    }

    //Se recorren los valores ingresados
    for (var i = 0; i < len; i++) {
        let column = columns[i];

        if (dataColumns.hasOwnProperty(column)) {
            let type = dataColumns[column].type;

            //Caso que la columna sea tipo INT
            if (type == "INT"){
                //En caso que los dos tipos coincidan, simplemente se agrega al objeto nuevo
                if (Number.isInteger(values[i])) {
                    schema[column] = values[i];
                }
                //Si el número que se está tratando de guardar es float, se le hace truncate
                else if (typeof (values[i]*1) == "number") {
                    schema[column] = Number.parseInt(values[i], 10);
                }
                //En caso que no sea un número, se lanzará un error
                else {
                    error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";

                    return  {
                        "success": false,
                        "message": error
                    }
                }
            }
            //Caso que la columna sea tipo FLOAT
            else if (type == "FLOAT") {
                //En caso que los dos tipos coincidan, simplemente se agrega al objeto nuevo
                if (Number.isInteger(values[i])) {
                    schema[column] = Number.parseFloat(values[i]);
                }
                //Si el número que se está tratando de guardar es float, se le hace truncate
                else if (typeof values[i] == "number") {
                    schema[column] = values[i];
                }
                //En caso que no sea un número, se lanzará un error
                else {
                    error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";

                    return  {
                        "success": false,
                        "message": error
                    }
                }
            }
            //Caso que la columna sea tipo DATE
            else if (type == "DATE") {
                //Primero se revisa que el valor sea un string
                if (typeof values[i] == "string") {
                    //Se trata de leer el año, mes y día. Si falla algún paso se considera un error
                    try {
                        let tempDate = values[i].split("-");
                        let dateValues = [+tempDate[0], +tempDate[1], +tempDate[2]]

                        //Se valida que la fecha sea válida
                        if (Number.isInteger(dateValues0[0]) && Number.isInteger(dateValues[1]) && Number.isInteger(dateValues[2])) {
                            if (dateValues[1] > 0 && dateValues[1] < 13 && dateValues[2] > 0 && dateValues[2] < 32) {
                                schema[column] = values[i];
                            } else {
                                error = "Error: Fecha inválida.";

                                return  {
                                    "success": false,
                                    "message": error
                                }
                            }
                        } else {
                            error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";

                            return  {
                                "success": false,
                                "message": error
                            }
                        }
                    } catch (e) {
                        error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";

                        return  {
                            "success": false,
                            "message": error
                        }
                    }
                } else {
                    error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";

                    return  {
                        "success": false,
                        "message": error
                    }
                }
            }
            //Caso que la columna sea tipo CHAR
            else {
                //Primero se revisa que el valor sea un string
                if (typeof values[i] == "string") {
                    let charLen = +type.substring(5, type.length-1);

                    //Se revisa que el string sea menor o igual al especificado
                    if (values[i].length <= charLen) {
                        schema[column] = values[i];
                    } else {
                        error = "Error: El string es de mayor tamaño al especificado, debe ser " + type + ".";

                        return  {
                            "success": false,
                            "message": error
                        }
                    }
                } else {
                    error = "Error: Tipo incorrecto en la columna '" + column + "'. Debe ser " + type + ".";

                    return  {
                        "success": false,
                        "message": error
                    }
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

    //Se lee la informacion de la tabla
    let tableData = JSON.parse(fs.readFileSync(path + db + '/' + table + '.json', 'utf8'));

    //Se revisan los valores de la Primary Key
    if (data[table].hasOwnProperty("primaryKey")) {
        let pks = data[table].primaryKey.elements;

        //Revision de Primary Keys
        for (var i = 0; i < pks.length; i++) {
            let value = schema[pks[i]];

            if (!value == null) {
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

    //Se agrega el registro a la base de datos
    tableData.registers.push(schema);

    //Se guarda la información
    fs.writeFileSync(path + db + '/' + table + ".json", JSON.stringify(tableData));

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

    // exp = {
    //     "operando1" : {
    //         "value": "salat",
    //         "type": "id"
    //     },
    //     "operando2" : {
    //         "value" : "b",
    //         "type" : "INT"
    //     },
    //     "operador" : "<>"
    // }
    // console.log(navigateTree(data[table].columns, {"salat":"2"}, exp));

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
        if (values[i].type.toUpperCase() != columnsInfo[columns[i]].type) {
          console.log(values[i].type.toUpperCase() + columnsInfo[columns[i]].type);
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

            for (let j = 0; j < columns.length; j++) {
                tableData.registers[i][columns[j]] = values[j].values;
            }
            cont++
        }
    }

    //Se guarda la información
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

    let columnsInfo = data.columns;

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
            delete tableData.registers[i];
            cont++
        }
    }

    //Se guarda la información
    fs.writeFileSync(path + db + '/' + table + ".json", JSON.stringify(tableData));

    return {
        "success" : true,
        "message" : "UPDATE (" + cont + ") con éxito."
    }
}

function navigateTree(columns, register, expression) {
    let op1 = expression.operando1;
    let op2 = expression.operando2;
    let act = expression.operador.value;

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
        if (register.hasOwnProperty(op1.value)) {
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
        if (register.hasOwnProperty(op2.value)) {
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
