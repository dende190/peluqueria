const logger = require("../logs/logger")
const bcrypt = require("bcryptjs");

module.exports = {
	signUp: (req,res) => {
		if (req.body.firstName) {
			var salt = bcrypt.genSaltSync(12);
            var password = bcrypt.hashSync(`${req.body.password}`, salt);

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
			mongo.then(async db =>{
				await db.collection("users").insertOne({ ...envio }, (err, result) => {
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