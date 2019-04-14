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
    },
    clients: async (req,res) => {
    	let result 
    	mongo.then(async db =>{
			await db.collection("clients").find({}).toArray( (err, result) => {
				if(err){
					logger.error(`(ERROR) error al traer datos para graficar el calendario \n ${err}`)
					res.render("clients", {
			        	error: true
			        })
				}else{
					result = result
			        res.render("clients", {
			        	result
			        })
				}
			});
		})
    }, 
    clientData: async (req,res) => {
    	mongo.then(async db =>{
			await db.collection("sales").aggregate([
				{
					$lookup: {
						from: 'clients',
						localField: 'client_id',
						foreignField: '_id',
						as: 'productsForClient'
					},
				},
				{ 
					$match:  { "productsForClient.username": req.params.username } 
				}
			]).toArray( (err, result) => {
				if(err){
					logger.error(`(ERROR) error al traer datos para graficar el calendario \n ${err}`)
					res.render("client_data", {
			        	error: true
			        })
				}else{
			        res.render("client_data", {
			        	result,
			        	username: req.params.username
			        })
				}
			});
		})
    }, 
}