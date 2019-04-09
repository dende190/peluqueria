const mongo = require('../config/database.js').conexionMongo();
const logger = require("../logs/logger")

module.exports = {
    dashboard: async (req,res) => {
    	let result 
    	mongo.then(async db =>{
			await db.collection("appointment").find({}).toArray( (err, result) => {
				if(err){
					logger.error(`(ERROR) error al traer datos para graficar el calendario \n ${err}`)
					res.render("dashboard", {
			        	error: true
			        })
				}else{
					result = result
			        res.render("dashboard", {
			        	result
			        })
				}
			});
		})

    }
}