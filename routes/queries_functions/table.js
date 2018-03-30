var table_queries = {};

var fs = require('fs');

const path = './databases/';

table_queries.createTable = function(db, name, columns, constraints) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    if (!data.hasOwnProperty(name)) {
        //Se crea un nuevo objeto para la metadata de la tabla
        var obj = {};

        //Se agregan las propiedades de la tabla al objeto de esta
        obj["columns"] = columns;

        var schema = {};
        for (var key in columns)
            if (columns.hasOwnProperty(key)) {
                schema[key] = null;
            }

        obj["schema"] = schema;

        obj["constraints"] = constraints;

        //Se agrega la tabla y su metadata a la base de datos
        data[name] = obj;
        fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

        //Se crea el la información básica del archivo de la tabla
        var tableObj = {
            "registers": []
        };

        if (constraints.hasOwnProperty("primaryKey")) {
            tableObj["primaryKey"] = {};

            for (var i = 0; i < constraints.primaryKey.elements.length; i++) {
                tableObj["primaryKey"][constraints.primaryKey.elements[i]] = {};
            }
        }

        //Se crea el archivo de la tabla nueva
        fs.writeFileSync(path + db + '/' + name + ".json", JSON.stringify(tableObj));

        return {
          'success': true,
          'message': 'Table '+name+ ' created in database '+db
        }

    } else {

        //Se muestra un error en caso que ya exista al base de datos
        let error = "Error: Ya existe una tabla con el nombre '" + name + "'.";
        console.log(error);

        return {
          'success': false,
          'message': error
        }

    }
}

table_queries.renameTable = function(db, name, newName) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se verifica que: los nombres sean diferentes, exista la tabla que se está
    //intentando modificar y que no exista una tabla con el nuevo nombre
    if (name != newName) {
        if (data.hasOwnProperty(name)) {
            if (!data.hasOwnProperty(newName)) {
                //Para reemplazar el nombre, se crea un nuevo objeto con la informacion del
                //objeto pasado y se elimina este ultimo
                Object.defineProperty(data, newName, Object.getOwnPropertyDescriptor(data, name));
                delete data[name];

                //Se modifica el archivo con el nuevo nombre
                fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

                fs.renameSync(path + db + '/' + name + '.json', path + db + '/' + name + '.json');

                return {
                  'success': true,
                  'message': 'Table '+name+ ' renamed to ' + newName+ ' in database '+db
                }
            } else {
                let error = "Error: Ya existe una tabla con el nombre '" + newName + "' en la Base de Datos.";

                return {
                  'success': false,
                  'message': error
                }
            }
        } else {
            let error = "Error: La tabla '" + name + "' no existe.";

            return {
              'success': false,
              'message': error
            }
        }
    } else {
        let error = "Error: La tabla '" + name + "' se está tratando de cambiar al mismo nombre."

        return {
          'success': false,
          'message': error
        }
    }
}

table_queries.deleteTable = function(db, table) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se verifica que exista la tabla
    if (data.hasOwnProperty(table)) {
        //Se verifica que no exista ninguna referencia a la tabla
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (data[key].constraint) {
              if (data[key].constraint.foreignKey.referenceTable == table) {
                  error = "La tabla '" + key + "' tiene una referencia a la tabla '" + table +
                      "'. Se debe eliminar la referencia primero antes de borrar la tabla."
                  return {
                    'success': false,
                    'message': error
                  }
              }
            }
          }
        }


        //Se elimina la tabla del archivo maestro de la Base de Datos
        delete data[table];
        fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

        //Se elimina el archivo de la tabla
        fs.unlinkSync(path + db + '/' + table + '.json');

        return {
          'success': true,
          'message': 'Table '+name+ ' deleted in database '+db
        }

    } else {
        let error = "Error: La tabla '" + table + "' no existe.";

        return {
          'success': false,
          'message': error
        }
    }
}

table_queries.showTables = function(db) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se recuperan todas las tablas del archivo maestro de la Base de Datos
    let res = Object.keys(data);

    return {
      'success': true,
      'type': 'tables',
      'message': res
    }
}

table_queries.addColumn = function(db, table, name, type, constraint) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se verifica que exista la tablas
    if (data.hasOwnProperty(table)) {
        let columns = data["columns"]; //Variable temporal con las columnas

        if (!columns.hasOwnProperty(name)) {
            let res = table_queries.addConstraint(db, table, constraint);
            if (!res.success)
                return res

            //Se agrega la columna al archivo maestro de la Base de Datos
            data["columns"][name] = {
                "type": type
            }

            data[table]["schema"][name] = null;

            fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

            return {
              'success': true,
              'message': 'Column '+name+ ' added in table '+ table +' in database '+db
            }
        } else {
            error = "Ya existe una columna con el nombre '" + name + "'.";

            return {
              'success': false,
              'message': error
            }
        }
    } else {
        error = "No existe una tabla con el nombre '" + table + "'.";

        return {
          'success': false,
          'message': error
        }
    }
}

table_queries.deleteColumn = function(db, table, name) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se verifica que exista la tablas
    if (data.hasOwnProperty(table)) {
        let columns = data[table]["columns"]; //Variable temporal con las columnas

        if (columns.hasOwnProperty(name)) {
            //Se agrega la columna al archivo maestro de la Base de Datos
            delete data[table]["schema"][name];
            delete data[table]["columns"][name];
            fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

            return {
              'success': true,
              'message': 'Column '+name+ ' deleted from table '+ table +' in database '+db
            }
        } else {
            error = "No existe una columna con el nombre '" + name + "'.";

            return {
              'success': false,
              'message': error
            }
        }
    } else {
        error = "No existe una tabla con el nombre '" + table + "'.";

        return {
          'success': false,
          'message': error
        }
    }
}

table_queries.addConstraint = function(db, table, constraint) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se verifica que exista la tabla
    if (data.hasOwnProperty(table)) {
        let dataConstraints = data[table].constraints;

        //Caso 1: constraint es Primary Key
        if (constraint.hasOwnProperty("primaryKey")) {
            //Se revisa si no se ha definido una Primary Key en la tabla
            if (dataConstraints.hasOwnProperty("primaryKey")) {
                error = "Para definir una nueva Primary Key debe eliminar la anterior primero en la tabla '" + table + "'.";

                return {
                  'success': false,
                  'message': error
                }
            } else {
                //Se verifica que no exista otra constraint con ese nombre
                if (verifyNameConstraint(dataConstraints, constraint.primaryKey.name)) {
                    error = "Ya existe una constraint con el nombre '" + constraint.primaryKey.name + "' en la tabla '" + table + "'.";

                    return {
                      'success': false,
                      'message': error
                    }
                }

                //Se agrega la Primary Key al archivo maestro
                data[table]["constraints"]["primaryKey"] = constraint.primaryKey;
                fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

                return {
                  'success': true,
                  'message': 'Constraint PK added in table '+ table + ' in database '+db
                }
            }
        }

        //Caso 2: constraint es Check
        if (constraint.hasOwnProperty("check")) {
            //Se revisa si no se ha definido un Check en la tabla
            if (dataConstraints.hasOwnProperty("check")) {
                error = "Para definir un nuevo Check debe eliminar el anterior primero en la tabla '" + table + "'.";

                return {
                  'success': false,
                  'message': error
                }
            } else {
                //Se verifica que no exista otra constraint con ese nombre
                if (verifyNameConstraint(dataConstraints, constraint.check.name)) {
                    error = "Ya existe una constraint con el nombre '" + constraint.check.name + "' en la tabla '" + table +"'.";

                    return {
                      'success': false,
                      'message': error
                    }
                }

                //Se agrega el Check al archivo maestro
                data[table]["constraints"]["check"] = constraint.check;
                fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

                return {
                  'success': true,
                  'message': 'Constraint CH added in table '+ table + ' in database '+db
                }
            }
        }

        //Caso 3: constraint es Foreign Key
        if (constraint.hasOwnProperty("foreignKey")) {
            //Se obtiene el nombre de la Foreign Key que se está tratando de agregar
            let name;
            for (var tempName in constraint.foreignKey)
                if (constraint.foreignKey.hasOwnProperty(tempName)) {
                    name = tempName;
                }

            //Se revisa que no exista una Foreign Key con ese nombre
            if (dataConstraints.hasOwnProperty("foreignKey")) {
                for (var tempFK in dataConstraints.foreignKey)
                    if (dataConstraints.foreignKey.hasOwnProperty(tempFK)) {
                        console.log(tempFK);
                        if (tempFK == name) {
                            error = "Ya existe una Foreign Key con el nombre '" + tempFK + "' en la tabla '" + table + "'.";

                            return {
                              'success': false,
                              'message': error
                            }
                        }
                    }
            } else {
                data[table]["constraints"]["foreignKey"] = {};
            }

            //Se verifica que no exista otra constraint con ese nombre
            if (verifyNameConstraint(dataConstraints, name)) {
                error = "Ya existe una constraint con el nombre '" + name + "' en la tabla '" + table +"'.";

                return {
                  'success': false,
                  'message': error
                }
            }

            //Se agrega la Foreign Key al archivo maestro
            data[table]["constraints"]["foreignKey"][name] = constraint.foreignKey[name];
            fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

            return {
              'success': true,
              'message': 'Constraint FK added in table '+ table + ' in database '+db
            }
        }

    } else {
        error = "No existe una tabla con el nombre '" + table + "'.";

        return {
          'success': false,
          'message': error
        }
    }
}

table_queries.deleteConstraint = function(db, table, name) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se verifica que exista la tabla
    if (data.hasOwnProperty(table)) {
        let constraints = data[table].constraints;

        //Se verifica si la constraint es una Primary Key
        if (constraints.hasOwnProperty("primaryKey")) {
            if (constraints.primaryKey.name == name) {
                delete data[table]["constraints"]["primaryKey"];
                fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

                let tableData = JSON.parse(fs.readFileSync(path + db + '/' + table + '.json', 'utf8'));
                delete tableData.primaryKey;
                fs.writeFileSync(path + db + '/' + table + '.json', JSON.stringify(tableData), 'utf8');

                return {
                  'success': true,
                  'message': 'PK constraint deleted from table '+ table + ' in database '+db
                }
            }
        }

        //Se verifica si la constraint es Foreign Key
        if (constraints.hasOwnProperty("foreignKey")) {
            for (var tempFK in constraints.foreignKey)
                if (constraints.foreignKey.hasOwnProperty(tempFK)) {
                    if (tempFK == name) {
                        delete data[table]["constraints"]["foreignKey"][tempF];
                        fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

                        return {
                          'success': true,
                          'message': 'FK constraint deleted from table '+ table + ' in database '+db
                        }
                    }
                }
        }

        //Se verifica si la constraint es un Check
        if (constraints.hasOwnProperty("check")) {
            if (constraints.check.name == name) {
                delete data[table]["constraints"]["check"];
                fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

                return {
                  'success': true,
                  'message': 'CH constraint deleted from table '+ table + ' in database '+db
                }
            }
        }

        //Si no se encontró ninguna constraint con el nombre, se muestra un error
        error = "No se encontró una constraint con el nombre '" + name + "' en la tabla '" + table + "'."

        return {
          'success': false,
          'message': error
        }

    } else {
        error = "No existe una tabla con el nombre '" + table + "'.";

        return {
          'success': false,
          'message': error
        }
    }
}

table_queries.showColumns = function(db, table) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se verifica que exista la tabla
    if (data.hasOwnProperty(table)) {
        let columns = data[table]["columns"];

        return {
          'success': true,
          'type': 'columns',
          'columns': columns
        }
    } else {
        error = "No existe una tabla con el nombre '" + table + "'.";

        return {
          'success': false,
          'message': error
        }
    }
}

function verifyNameConstraint (constraints, name) {
    //Se verifica si la constraint es una Primary Key
    if (constraints.hasOwnProperty("primaryKey")) {
        if (constraints.primaryKey.name == name) {
            return true
        }
    }

    //Se verifica si la constraint es Foreign Key
    if (constraints.hasOwnProperty("foreignKey")) {
        for (var tempFK in constraints.foreignKey)
            if (constraints.foreignKey.hasOwnProperty(tempFK)) {
                if (tempFK == name) {
                    return true
                }
            }
    }

    //Se verifica si la constraint es un Check
    if (constraints.hasOwnProperty("check")) {
        if (constraints.check.name == name) {
            return true
        }
    }

    return false
}

module.exports = table_queries;
