// leitura dos dados do Arduino
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

// Acesso ao banco de dados SQL Server
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES; 

//require('events').EventEmitter.prototype._maxListeners = 100;
require('events').EventEmitter.defaultMaxListeners = 15;



var config = {
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
};



var connection = new Connection(config);



function registrarLeitura(temperatura, umidade) {
	console.error(`t: ${temperatura}`);
	console.error(`u: ${umidade}`);
	
	request = new Request("INSERT into medicoes  values ( @temperatura, @umidade);", function(err, linhas) {  
		 if (err) {  
			console.log(`Erro ao tentar gravar no banco: ${err} `);
		 }  else {
			console.log(`Registro salvo com sucesso. Linhas afetadas: ${linhas}`);
		 } 
		});  
		
	request.addParameter('temperatura', TYPES.Decimal, temperatura);  
    //request.addParameter('umidade', TYPES.Decimal , umidade); 
    request.addParameter('umidade', TYPES.Decimal, umidade);  
	
	connection.execSql(request);
		
	
}



class ArduinoDataRead {

    constructor(){
        this.listData = [];
    }

    get List() {
        return this.listData;
    }

    SetConnection(){
		
		

        SerialPort.list().then(listSerialDevices => {
            
            let listArduinoSerial = listSerialDevices.filter(serialDevice => {
                return serialDevice.vendorId == 2341 && serialDevice.productId == 43;
            });
            
            if (listArduinoSerial.length != 1){
                throw new Error("The Arduino was not connected or has many boards connceted");
            }

            console.log("Arduino found in the com %s", listArduinoSerial[0].comName);
             
            return  listArduinoSerial[0].comName;
            
        }).then(arduinoCom => {
            
            let arduino = new SerialPort(arduinoCom, {baudRate: 9600});
            
            const parser = new Readline();
            arduino.pipe(parser);
            
            
            parser.on('data', (data) => {
				console.error('recebeu do arduino');
				try {
					const leitura = data.split(';'); // temperatura ; umidade
					registrarLeitura( Number(leitura[0]),Number(leitura[1]));		
				} catch (e) {
					console.error(e);
				}

            });
            
        }).catch(error => console.log(`Erro ao receber dados do Arduino ${error}`));
    } 
}

const serial = new ArduinoDataRead();

// conectar com o banco
connection.on('connect', function (errc) {
});

serial.SetConnection();

//while (true) { 
//	
//}

module.exports.ArduinoData = {List: serial.List} 
