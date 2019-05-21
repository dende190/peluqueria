module.exports = {
	homePage: async (req,res) => {
		let dbo = req.app.locals.dbo

		dbo.collection("service").find({}).toArray ( (err, services) => {
			if(err){
				logger.error(`(ERROR) Error al traer lista de servicios \n ${err}`)
			}else{
		        if (req.user) {
					console.log(req.user.username)
				}
				res.render('home', {
					services
				})
			}
		})
	},
	service: (req,res) => {
		let dbo = req.app.locals.dbo

		dbo.collection("service").find({}).toArray ( (err, services) => {
			if(err){
				logger.error(`(ERROR) Error al traer lista de servicios \n ${err}`)
			}else{
		        if (req.user) {
					console.log(req.user.username)
				}
				res.render('service', {
					services
				})
			}
		})
	},
	about: (req,res) => {
		let dbo = req.app.locals.dbo

		dbo.collection("service").find({}).toArray ( (err, services) => {
			if(err){
				logger.error(`(ERROR) Error al traer lista de servicios \n ${err}`)
			}else{
		        if (req.user) {
					console.log(req.user.username)
				}
				res.render('about', {
					services
				})
			}
		})
	},
	contact: (req, res) => {
		res.render("contact")
	}

}