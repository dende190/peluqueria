const logger = require("../logs/logger")
const { ObjectId } = require('mongodb');

module.exports = {
    dashboard: async (req,res) => {
		let dbo = req.app.locals.dbo

    	let result 
		dbo.collection("appointment").find({}).toArray( (err, result) => {
			if(err){
				logger.error(`(ERROR) error al traer datos para graficar el calendario \n ${err}`)
				res.render("dashboard", {
		        	error: true
		        })
			}else{
				calendar = result
				dbo.collection("clients").find({}).toArray( (err, result) => {
					if(err){
						logger.error(`(ERROR) error al traer lista de clientes \n ${err}`)
						res.render("dashboard", {
				        	error: true
				        })
					}else{
				        res.render("dashboard", {
				        	calendar,
				        	clients: result
				        })
					}
				});
			}
		});
	},
    dashboardAppointment: async (req,res) => {
    	let dbo = req.app.locals.dbo 

		dbo.collection("appointment").findOne(
		   	{
				$and: [
					{ 'date': req.body.date },
					{ 'time' : req.body.time }
				]
		   	}, (err, result) => {
				if(err){
					logger.error(`(ERROR) Error al iniciar base de datos en DashBoardAppointment`, err)
				}
				if(result === null){
					
					dbo.collection("clients").findOne({ _id: ObjectId(`${req.body.client}`) }, (err, client) => {
						if(err){
							logger.error(`(ERROR) Error al crear cita '${req.body.client.toUpperCase()}'`, err)
						}else{
							let start =  `${req.body.date.replace(/\//g, '-')}T${req.body.time}`
							let envio = {
								title: `${client.first_name} ${client.last_name} - ${req.body.service}`,
								start,
								service: req.body.service,
								date: req.body.date,
								time: req.body.time,
								name: `${client.first_name} ${client.last_name}`,
								email: client.email,
								phone: client.phone,
								assign_for: "JUan Pablo"
							}

							dbo.collection("appointment").insertOne({ ...envio }, (err, result) => {
								if(err){
									logger.error(`(ERROR) Error al crear cita '${req.body.client.toUpperCase()}'`, err)
								}else{
									logger.info(`Cita creada '${req.body.username.toUpperCase()}'`)
								}
							});
						}
					});
				}
			}
		);
    }, 
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
}