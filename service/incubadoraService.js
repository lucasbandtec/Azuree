var Request = require('tedious').Request;
var Connection = require('tedious').Connection;
var Incubadora = require('../models/incubadora')
var TYPES = require('tedious').TYPES; 



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


    }
}