

var Request = require('tedious').Request;
var Connection = require('tedious').Connection;


 class incubadora {
    constructor(incubadora){
        this.idIncubadora = incubadora[0],
        this.codigoIncubadora = incubadora[1];

    }    
}
 
var listIncubadoras = [];




module.exports = class incubadoraService {

        constructor() {
           
            this.config = {
                server: 'tbtt.database.windows.net',
                userName: 'bandtec',
                password: 'TBTTprojeto5'
        
                , options: {
                    debug: {
                        packet: true,
                        data: true,
                        payload: true,
                        token: false,
                        log: true
                    },
                    database: 'TheBigTecTheory',
                    encrypt: true // for Azure users
                }
        
                }
        
                
            };  
            
            
            //Lista de Incubadoras
    
        getIncubadoras(){  return new Promise((resolve, reject) => {

            const connection = new Connection(this.config);
    
            connection.on('connect', function (err) {
                // If no error, then good to go...
                
                const request = new Request("select * from teste", function (err, rowCount) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(rowCount + ' rows')
                    }
        
                    connection.close()
                })
        
                request.on('row', function (columns) {

                    listColumn;

                    
                    columns.forEach(function (column) {
                        if (column.value === null) {
                            console.log('NULL');
                        } else {

                             listComun.push(column);
                             let count = listComun.length;
                        

                             if( count ==2){

                             listIncubadoras.push(new incubadora());


                             }



                            // listIncubadoras.push(column.value);

                            // columns[0].valu

                            //resolve(column.value);

                            //console.log(column);


                        }
                    });

                    console.log('oi');
                    //resolve()
                    
                });
        
                request.on('done', function (rowCount, more) {
                    console.log(rowCount + ' rows returned')
                })
        
                // In SQL Server 2000 you may need: connection.execSqlBatch(request);
                connection.execSql(request)

            }
            );

            
    
            connection.on('debug', function (text) {
                //console.log(text);
            }
            )
        });
                   
            
    
    
    }


}

