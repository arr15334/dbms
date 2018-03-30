var db_queries = {};

var fs = require('fs');
var rimraf = require('rimraf')

const path = './databases/';

// createDatabase("asdf");

db_queries.createDatabase = function(name) {
    //Se lee la informacion en el archivo maestro de las bases de datos
    let data = JSON.parse(fs.readFileSync(path + '__master.json', 'utf8'));
    // console.log(data);
    //Se verifica que no exista la base de datos
    if (!(data.hasOwnProperty(name)) ) {
        //Se crea la base de datos
        data[name] = {};
        fs.writeFileSync(path + '__master.json', JSON.stringify(data), 'utf8');
            //Se crea el directorio para la base de datos
        fs.mkdirSync(path+name);
            //Se crea el archivo maestro para la base de datos en su directorio
        fs.writeFileSync('./databases/'+name+'/__master.json', JSON.stringify({}));
        return {
              'success': true,
              'message': 'Created database '+name
            }
    } else {
        //Se muestra un error en caso que ya exista al base de datos
        let error = "Error: Ya existe una base de datos con el nombre '" + name + "'.";

        return {
          'success': false,
          'message': error
        }
    }
}

// renameDatabase("qwer", "asdf");

db_queries.renameDatabase = function(name, newName) {
    //Se lee la informacion en el archivo maestro de las bases de datos
    let data = JSON.parse(fs.readFileSync(path + '__master.json', 'utf8'));

    //Se verifica que: los nombres sean diferentes, exista la Base de Datos que se está
    //intentando modificar y que no exista un Base de Datos con el nuevo nombre
    if (name != newName) {
        if (data.hasOwnProperty(name)) {
            if (!data.hasOwnProperty(newName)) {
                //Para reemplazar el nombre, se crea un nuevo objeto con la informacion del
                //objeto pasado y se elimina este ultimo
                Object.defineProperty(data, newName, Object.getOwnPropertyDescriptor(data, name));
                delete data[name];

                //Se modifica el archivo con el nuevo nombre
                fs.writeFileSync(path + '__master.json', JSON.stringify(data), 'utf8');

                //Se modifica el nombre de la carpeta de la base de datos
                fs.renameSync(path+name, path+newName);

                return {
                  'success': true,
                  'message': 'Renamed database '+name+ ' to '+newName
                }

            } else {
                let error = "Error: Ya existe una Base de Datos con el nombre '" + newName + "'.";

                return {
                  'success': false,
                  'message': error
                }
            }
        } else {
            let error = "Error: La Base de Datos '" + name + "' no existe."

            return {
              'success': false,
              'message': error
            }
          }
    } else {
        let error = "Error: La Base de Datos '" + name + "' se está tratando de tratando de cambiar al mismo nombre."

        return {
          'success': false,
          'message': error
        }
      }
    }

// deleteDatabase("asdf");

db_queries.deleteDatabase = function(db) {
    //Se lee la informacion en el archivo maestro de las bases de datos
    let data = JSON.parse(fs.readFileSync(path + '__master.json', 'utf8'));

    //Se verifica que exista la Base de Datos
    if (data.hasOwnProperty(db)) {
        //Se elimina la Base de Datos del archivo maestro
        delete data[db];
        fs.writeFileSync(path + '__master.json', JSON.stringify(data), 'utf8');

        //Se elimina el directorio de la base de datos
        rimraf.sync(path + db);

        return {
          'success': true,
          'message': 'Database ' + db + ' dropped'
        }
    } else {
        let error = "Error: La Base de Datos '" + db + "' no existe."

        return {
          'success': false,
          'message': error
        }
    }
}

// ?????
db_queries.useDatabase = function(datab) {
    //Se lee la informacion en el archivo maestro de las bases de datos
    let data = JSON.parse(fs.readFileSync(path + '__master.json', 'utf8'));
    let current_db = JSON.parse(fs.readFileSync(path + 'currentdb.json', 'utf8'));
    //Se verifica que exista la Base de Datos
    if (data.hasOwnProperty(datab)) {
        // db = datab;
        const changeCurrent = {
          'current': datab
        }
        fs.writeFileSync(path + 'currentdb.json', JSON.stringify(changeCurrent), 'utf8');
        return {
          'success': true,
          'message': 'Using db: '+datab
        }
    } else {
        let error = "Error: No existe la Base de Datos '" + datab + "'.";

        return {
          'success': false,
          'message': error
        }
    }
}

db_queries.showDatabases = function() {
    //Se lee la informacion en el archivo maestro de las bases de datos
    let data = JSON.parse(fs.readFileSync(path + '__master.json', 'utf8'));

    //Se recuperan todos los nombres del archivo maestro
    let res = Object.keys(data);

    return {
      'success': true,
      'type': 'databases',
      'message': res
    }
}

db_queries.getNumberOfRegisters = function(db) {
    //Se lee la informacion en el archivo maestro de las bases de datos
    let data = JSON.parse(fs.readFileSync(path + db + '__master.json', 'utf8'));

    let res = data["registers"];

    return res
}

module.exports = db_queries;
