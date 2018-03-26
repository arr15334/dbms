var table_queries = {};

var fs = require('fs');

const path = './databases/';

//createTable("asdf", "qwer", "qwer", "qwer");

table_queries.createTable = function(db, name, columns, constraints) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    if (!data.hasOwnProperty(name)) {
        //Se crea un nuevo objeto para la metadata de la tabla
        var obj = {};

        //Se agregan las propiedades de la tabla al objeto de esta
        obj["columns"] = columns;
        obj["constraints"] = constraints;

        //Se agrega la tabla y su metadata a la base de datos
        data[name] = obj;
        fs.writeFileSync(path + db + '/__master.json', JSON.stringify(data), 'utf8');

        //Se crea el archivo de la tabla nueva
        fs.appendFileSync(path + db + '/' + name + ".json", JSON.stringify({}));

        return true

    } else {

        //Se muestra un error en caso que ya exista al base de datos
        let error = "Error: Ya existe una tabla con el nombre '" + name + "'.";
        console.log(error);

        return error

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
                fs.writeFileSync(path + db + '__master.json', JSON.stringify(data), 'utf8');

                fs.renameSync(path + db + '/' + name + '.json', path + db + '/' + name + '.json');

                return true
            } else {
                let error = "Error: Ya existe una tabla con el nombre '" + newName + "' en la Base de Datos.";

                return error
            }
        } else {
            let error = "Error: La tabla '" + name + "' no existe.";

            return error
        }
    } else {
        let error = "Error: La tabla '" + name + "' se está tratando de cambiar al mismo nombre."

        return error
    }
}

table_queries.deleteTable = function(db, table) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se verifica que exista la tabla
    if (data.hasOwnProperty(table)) {
        //Se elimina la tabla del archivo maestro de la Base de Datos
        delete data[table];
        fs.writeFileSync(path + db + '__master.json', JSON.stringify(data), 'utf8');

        //Se elimina el archivo de la tabla
        fs.unlinkSync(path + db + '/' + table + '.json');

        return true


    } else {
        let error = "Error: La tabla '" + table + "' no existe.";

        return error
    }
}

table_queries.showTables = function(db) {
    //Se lee la informacion en el archivo maestro de la base de datos
    let data = JSON.parse(fs.readFileSync(path + db + '/__master.json', 'utf8'));

    //Se recuperan todas las tablas del archivo maestro de la Base de Datos
    let res = Object.keys(data);

    return res
}

table_queries.addColumn = function(name, type, constraint) {
    
}

module.exports = table_queries;
