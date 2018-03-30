var register_queries = {};

var fs = require('fs');

const path = './databases/';

register_queries.insert = function(db, table, columns, values) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

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
                else if (typeof values[i] == "number") {
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

module.exports = register_queries;
