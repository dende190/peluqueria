const mongo = require('../config/database.js').conexionMongo();
const logger = require("../logs/logger")
const bcrypt = require("bcryptjs");

module.exports = {
	signUp: async (req,res) => {
		if (req.body.firstName) {
			let salt = bcrypt.genSaltSync(12);
            let password = bcrypt.hashSync(`${req.body.password}`, salt);
            let collectionName

			let dataUser = {
				first_name: req.body.firstName.toLowerCase(),
				last_name: req.body.lastName.toLowerCase(),
				username: req.body.username.toLowerCase(),
				password: password,
				email: req.body.email.toLowerCase(),
				phone: req.body.phone,
				cc: req.body.cc,
				position: req.body.position
			}
			if(req.body.position == 'cliente'){
				let dataClient = {
					first_name: req.body.firstName.toLowerCase(),
					last_name: req.body.lastName.toLowerCase(),
					username: req.body.username.toLowerCase(),
					email: req.body.email.toLowerCase(),
					phone: req.body.phone,
					cc: req.body.cc,
				}
				await mongo.then(async db =>{
					await db.collection('clients').insertOne({ ...dataClient }, (err, result) => {
						if(err){
							logger.error(`(ERROR) Error al crear Cliente '${req.body.username.toUpperCase()}'`, err)
						}else{
							logger.info(`Cliente creado '${req.body.username.toUpperCase()}'`)
						}
					});
				})
			}
			await mongo.then(async db =>{
				await db.collection('users').insertOne({ ...dataUser }, (err, result) => {
					if(err){
						logger.error(`(ERROR) Error al crear usuario '${req.body.username.toUpperCase()}'`, err)
					}else{
						logger.info(`Usuario creado '${req.body.username.toUpperCase()}'`)
					}
				});
			})
		}
		res.render('sign_up')
	},
}