const logger = require("../logs/logger")
const bcrypt = require("bcryptjs");
const { ObjectId } = require('mongodb');

module.exports = {
	listService: (req, res) => {
		let dbo = req.app.locals.dbo

		dbo.collection("service").find({}).toArray( (err, result) =>{
			if(err){
				logger.error(`(ERROR) Error al traer datos de servicios \n ${err}`)
			}else{
				logger.info(`Datos de servicios traidos exitosamente `)
				res.render("service_list", {
					services: result
				})
			}
		})
	},
	createService: (req, res) => {
		let dbo = req.app.locals.dbo
		if(req.body.name){
			let newService = {
				service: req.body.name.toLowerCase(),
				price: req.body.price 
			}
			dbo.collection("service").insertOne( { ...newService }, (err, result) => {
				if(err){
					logger.error(`(ERROR) Error al crear nuevo servicio \n ${err}`)
				}else{
					logger.info(`Nuevo servicio creado exitosamente`)
				}
				res.redirect("/lista-servicios")
			})
		}else{
			res.render("create_service")
		}
	},
	editService: (req, res) => {
		let dbo = req.app.locals.dbo

    	if(req.body.name){
			let newService = {
				service: req.body.name.toLowerCase(),
				price: req.body.price,
			}
			
			dbo.collection('service').replaceOne( { _id: ObjectId(req.params.id) }, { ...newService } , (err, result) => {
				if(err){
					logger.error(`(ERROR) Error al editar Servicio '${req.body.name.toUpperCase()}'`, err)
				}else{
					logger.info(`Servicio editado '${req.body.name.toUpperCase()}'`)
				}
			});

			res.redirect("/lista-servicios")
		}else{
			dbo.collection('service').findOne( { _id: ObjectId(req.params.id) }, (err, result) => {
				if(err){
					logger.error(`(ERROR) Error al traer datos del servicio con id ${req.params.id} \n ${err}`)
				}else{
					logger.info(`Informacion del servicio con id: ${req.params.id} traida exitosamente`)
					res.render("edit_service", {
						service: result,
					})
				}
			})
		}
    },
    deleteService: (req, res) => {
    	let dbo = req.app.locals.dbo
        
        dbo.collection('service').remove( {_id: ObjectId(req.body.id) }, (err, r) => {
            if(err){
                console.log(`(ERROR) error al borrar servicio con id ${req.body.id} \n ${err}`)
            }
            console.log(`Servicio con id ${req.body.id} eliminado correctamente`)
        })

        res.redirect("/lista-servicios")
    }
}