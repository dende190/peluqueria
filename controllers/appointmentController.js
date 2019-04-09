const mongo = require('../config/database.js').conexionMongo();
const logger = require("../logs/logger")

module.exports = {
	appointment: async function(req, res){
		if (req.body.appointmentService) {
			await mongo.then(async db =>{
				await db.collection("appointment").findOne(
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
							let start =  `${req.body.appointmentDate.replace(/\//g, '-')}T${req.body.appointmentTime}`
							let envio = {
								title: `${req.body.name.toLowerCase()} - ${req.body.appointmentService}`,
								start,
								service: req.body.appointmentService,
								date: req.body.appointmentDate,
								time: req.body.appointmentTime,
								name: req.body.name.toLowerCase(),
								email: req.body.email.toLowerCase(),
								phone: req.body.phone,
								message: req.body.message.toLowerCase(),
							}
							mongo.then(async db =>{
								await db.collection("appointment").insertOne({ ...envio }, (err, result) => {
									if(err){
										logger.error(`(ERROR) Error al crear cita '${req.body.name.toUpperCase()}'`, err)
									}else{
										logger.info(`Cita creada '${req.body.username.toUpperCase()}'`)
									}
								});
							})
							res.render('thanks', {
								service: envio.service,
								date: envio.date,
								time: envio.time,
							})
						}else{
							res.render('thanks', {
								error: 'Ya hay una agenda para esta fecha y esta hora, por favor ingresa otra'
							})
						}
					});
			}).catch(err => {
				console.log("error de Conexion en Base de datos")
			})
		}
	} 
}