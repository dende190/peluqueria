const mongo = require('../config/database.js').conexionMongo();
const logger = require("../logs/logger")
const bcrypt = require("bcryptjs");

module.exports = {
	signUp: (req,res) => {
		if (req.body.firstName) {
			let salt = bcrypt.genSaltSync(12);
            let password = bcrypt.hashSync(`${req.body.password}`, salt);
            let collectionName

			let envio = {
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
				collectionName = 'clients'
			}else{
				collectionName = 'users'
			}
			mongo.then(async db =>{
				await db.collection(collectionName).insertOne({ ...envio }, (err, result) => {
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