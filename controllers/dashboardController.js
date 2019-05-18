const logger = require("../logs/logger")
const { ObjectId } = require('mongodb');

module.exports = {
    dashboard: async (req,res) => {
		let dbo = req.app.locals.dbo

		dbo.collection("appointment").find({}).toArray( (err, appointment) => {
			if(err){
				logger.error(`(ERROR) error al traer datos para graficar el calendario \n ${err}`)
				res.render("dashboard", {
		        	error: true
		        })
			}else{
				dbo.collection("clients").find({}).toArray( (err, clients) => {
					if(err){
						logger.error(`(ERROR) error al traer lista de clientes \n ${err}`)
						res.render("dashboard", {
				        	error: true
				        })
					}else{
						dbo.collection("service").find({}).toArray ( (err, services) => {
							if(err){
								logger.error(`(ERROR) Error al traer lista de servicios \n ${err}`)
							}else{
						        res.render("dashboard", {
						        	calendar: appointment,
						        	clients,
						        	services,
						        })
							}
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
							let envio = {
								title: `${client.first_name} ${client.last_name} - ${req.body.service}`,
								start: `${req.body.date}T${req.body.time}`,
								service: req.body.service,
								date: req.body.date,
								time: req.body.time,
								name: `${client.first_name} ${client.last_name}`,
								email: client.email,
								phone: client.phone,
								message: "",
								assign_for: "JUan Pablo",
								done: false,
								cancel: false,
							}

							dbo.collection("appointment").insertOne({ ...envio }, (err, result) => {
								if(err){
									logger.error(`(ERROR) Error al crear cita '${req.body.client.toUpperCase()}'`, err)
								}else{
									logger.info(`Cita creada '${req.body.client.toUpperCase()}'`)
								}
							});
						}
					});
				}
			}
		)
    },
    dataAppointment: (req, res) => {
    	let dbo = req.app.locals.dbo

    	dbo.collection("appointment").findOne( { _id: ObjectId(req.params.id) }, (err, result) => {
    		if(err){
    			logger.error(`(ERROR) Error al traer datos de cita con id ${req.params.id} \n ${err}`)
    		}else{
    			logger.info(`Datos de cita con id: ${req.params.id} traidos exitosamente`)
    			console.log(result)
    			res.render("data_appointment", {
    				data: result
    			})
    		}
    	})
    },
    editAppointment: (req, res) => {
    	let dbo = req.app.locals.dbo

    	if(req.body.name){
    		dbo.collection('service').findOne( { _id: ObjectId(req.body.service) }, (err, service) =>{
    			if(err){
					logger.error(`(ERROR) Error al traer datos de servicio con id: ${req.body.appointmentService}\n ${err}`)
				}else{
					let editData = {
		    			title: `${req.body.name} - ${service.service}`,
		    			start: `${req.body.date}T${req.body.time}`,
		    			service: `${service.service}`,
		    			date: req.body.date,
						time: req.body.time,
		    		}
		    		dbo.collection("appointment").updateOne( { _id: ObjectId(req.params.id) }, { $set: { ...editData } } , (err, result) => {
						if(err){
							console.log(err)
						}else{
							console.log(result)
						} 			
		    		})

		    		res.redirect("/dashboard")
				}
    		})
    	}else{
    		dbo.collection("appointment").findOne( { _id: ObjectId(req.params.id) }, (err, result) => {
	    		if(err){
	    			logger.error(`(ERROR) Error al traer datos de cita con id ${req.params.id} \n ${err}`)
	    		}else{
	    			logger.info(`Datos de cita con id: ${req.params.id} traidos exitosamente`)
	    			dbo.collection("service").find({}).toArray ( (err, services) => {
						if(err){
							logger.error(`(ERROR) Error al traer lista de servicios \n ${err}`)
						}else{
			    			res.render("edit_appointment", {
			    				data: result,
			    				services
			    			})
						}
					})
	    		}
	    	})
    	}
    },
    deleteAppointment: (req, res) => {
    	let dbo = req.app.locals.dbo
        
        dbo.collection('appointment').remove( {_id: ObjectId(req.body.id) }, (err, r) => {
            if(err){
                console.log(`(ERROR) error al borrar usuario con id ${req.body.id} \n ${err}`)
            }
            console.log(`Usuario con id ${req.body.id} eliminado correctamente`)
        })

        res.redirect("/dashboard")
    }
}