var Request = require('tedious').Request;
var Connection = require('tedious').Connection;
var Incubadora = require('../models/incubadora');
var medicao = require('../models/medicao');
var TYPES = require('tedious').TYPES; 



module.exports = class incubadoraService {

    constructor() {

        this.config = {
            server: 'tbtt.database.windows.net',
            userName: 'Lucas',
            password: 'Projetosensor2'

            , options: {
                debug: {
                    packet: true,
                    data: true,
                    payload: true,
                    token: false,
                    log: true
                },
                database: 'lucasdatabase',
                encrypt: true // for Azure users
            }

        }


    }

 //Obtem uma lista de Incubadoras

 getIncubadoras() {

    return new Promise((resolve, reject) => {

        const connection = new Connection(this.config);
        let listaIncubadoras = [];


        connection.on('connect', function (err) {
            // If no error, then good to go...

            const request = new Request("select * from incubadora", function (err, rowCount) {
                if (err) {
                    reject(err)
                } else {
                    console.log(rowCount + ' rows')
                }

                connection.close()
            })

            request.on('row', function (columns) {
                //Salva no array
                var incubadora = new Incubadora();
                
                incubadora.idIncubadora = columns[0].value;
                incubadora.status = columns[1].value;
                incubadora.local = columns[2].value;

                listaIncubadoras.push(incubadora);

                resolve(listaIncubadoras);


            });

            // In SQL Server 2000 you may need: connection.execSqlBatch(request);
            connection.execSql(request)

        }
        );

 
    });
}










}
