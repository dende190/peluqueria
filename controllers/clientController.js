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
    },
    createClient: (req, res) => {
    	if(req.body.name){
	    	let dbo = req.app.locals.dbo

			let newClient = {
				first_name: req.body.name.toLowerCase(),
				last_name: req.body.lastName.toLowerCase(),
				email: req.body.email.toLowerCase(),
				phone: req.body.phone,
				cc: req.body.cc
			}
				
			dbo.collection('clients').insertOne({ ...newClient }, (err, result) => {
				if(err){
					logger.error(`(ERROR) Error al crear Cliente '${req.body.name.toUpperCase()} ${req.body.lastName.toUpperCase()}'`, err)
				}else{
					logger.info(`Cliente creado '${req.body.name.toUpperCase()} ${req.body.lastName.toUpperCase()}'`)
				}
			});

			res.redirect("/clientes")
    	}else{
    		res.render("create_client")
    	}
    },
    editClient: (req, res) => {
    	let dbo = req.app.locals.dbo

    	if(req.body.name){
			let newClient = {
				first_name: req.body.name.toLowerCase(),
				last_name: req.body.lastName.toLowerCase(),
				email: req.body.email.toLowerCase(),
				phone: req.body.phone,
				cc: req.body.cc
			}
			
			dbo.collection('clients').replaceOne( { _id: ObjectId(req.params.id) }, { ...newClient } , (err, result) => {
				if(err){
					logger.error(`(ERROR) Error al editar Cliente '${req.body.name.toUpperCase()} ${req.body.lastName.toUpperCase()}'`, err)
				}else{
					logger.info(`Cliente editado '${req.body.name.toUpperCase()} ${req.body.lastName.toUpperCase()}'`)
				}
			});

			res.redirect("/clientes")
		}else{
			dbo.collection('clients').findOne( { _id: ObjectId(req.params.id) }, (err, result) => {
				if(err){
					logger.error(`(ERROR) Error al traer datos del usuario con id ${req.params.id} \n ${err}`)
				}else{
					logger.info(`Informacion del usuario con id: ${req.params.id} traida exitosamente`)
					res.render("edit_user", {
						result,
						data: 'client'
					})
				}
			})
		}
    },
    deleteClient: (req, res) => {
    	let dbo = req.app.locals.dbo
        
        dbo.collection('clients').remove( {_id: ObjectId(req.body.id) }, (err, r) => {
            if(err){
                console.log(`(ERROR) error al borrar cliente con id ${req.body.id} \n ${err}`)
            }
            console.log(`Cliente con id ${req.body.id} eliminado correctamente`)
        })

        res.redirect("/clientes")
    }
}