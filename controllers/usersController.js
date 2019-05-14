const logger = require("../logs/logger")
const bcrypt = require("bcryptjs");

module.exports = {
	signUp: async (req,res) => {
		if (req.body.firstName) {
			let dbo = req.app.locals.dbo 
			let salt = bcrypt.genSaltSync(12);
            let password = bcrypt.hashSync(`${req.body.password}`, salt);

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
			
			dbo.collection('users').insertOne({ ...dataUser }, (err, result) => {
				if(err){
					logger.error(`(ERROR) Error al crear usuario '${req.body.username.toUpperCase()}'`, err)
				}else{
					logger.info(`Usuario creado '${req.body.username.toUpperCase()}'`)
				}
			});
		}
		res.render('sign_up')
	}
}