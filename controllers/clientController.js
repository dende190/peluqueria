const logger = require("../logs/logger")
const { ObjectId } = require('mongodb');

module.exports = {
	clients: async (req,res) => {
    	let dbo = req.app.locals.dbo 
		dbo.collection("clients").find({}).toArray( (err, result) => {
			if(err){
				logger.error(`(ERROR) error al traer datos para graficar el calendario \n ${err}`)
				res.render("clients", {
		        	error: true
		        })
			}else{
		        res.render("clients", {
		        	result
		        })
			}
		});
    }, 
    clientData: async (req,res) => {
    	let dbo = req.app.locals.dbo 
		dbo.collection("sales").aggregate([
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
    }
}