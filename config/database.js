const MongoClient = require('mongodb').MongoClient;
const logger = require("../logs/logger")
const {
	DB_URI
} = require('./config.json')
const client = new MongoClient(DB_URI, { useNewUrlParser: true });

module.exports = {
	conexionMongo: function(){
		let dbo
		return new Promise((resolve, reject) => {
			client.connect((err, db) => {
				if(err){
					logger.error("(ERROR) Error en la conexion a 'Peluqueria' con MongoDB", err)
					return reject(null)
				}
				dbo = db.db("peluqueria");
				return resolve(dbo)
			});
		}) 
	}
}
