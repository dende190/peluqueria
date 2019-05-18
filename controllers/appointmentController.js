const logger = require("../logs/logger")
const { ObjectId } = require("mongodb")

module.exports = {
	appointment: async function(req, res){
		if (req.body.appointmentService) {
			let dbo = req.app.locals.dbo 
			dbo.collection("appointment").findOne(
			   	{
					$and: [
						{ 'date': req.body.appointmentDate },
						{ 'time' : req.body.appointmentTime }
					]
			   	}, (err, result) => {
					if(err){
						logger.error(`(ERROR) Error al iniciar sesion con usuario ${username}`, err)
					}
					if(result === null){
						dbo.collection('service').findOne( { _id: ObjectId(req.body.appointmentService) }, (err, service) =>{
							if(err){
								logger.error(`(ERROR) Error al traer datos de servicio con id: ${req.body.appointmentService}\n ${err}`)
							}else{
								let envio = {
									title: `${req.body.name.toLowerCase()} - ${service.service}`,
									start: `${req.body.appointmentDate}T${req.body.appointmentTime}`,
									service: service.service,
									date: req.body.appointmentDate,
									time: req.body.appointmentTime,
									name: req.body.name.toLowerCase(),
									email: req.body.email.toLowerCase(),
									phone: req.body.phone,
									message: req.body.message.toLowerCase(),
									assign_for: "Cliente",
									done: false,
									cancel: false,
								}
								
								dbo.collection("appointment").insertOne({ ...envio }, (err, result) => {
									if(err){
										logger.error(`(ERROR) Error al crear cita '${req.body.name.toUpperCase()}'`, err)
									}else{
										logger.info(`Cita creada '${req.body.name.toUpperCase()}'`)
									}
								});

								res.render('thanks', {
									service: envio.service,
									date: envio.date,
									time: envio.time,
								})
							}
						})
					}else{
						res.render('thanks', {
							error: 'Ya hay una agenda para esta fecha y esta hora, por favor ingresa otra'
						})
					}
				});
		}
	} 
}