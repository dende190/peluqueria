module.exports = {
	homePage: async (req,res) => {
		console.log("Sending to the HomePage")
		if (req.user) {
			console.log(req.user.username)
		}
		res.render('home')
	},
	service: (req,res) => {
		console.log("Sending to the Service")
		res.render('service')
	},
	about: (req,res) => {
		console.log("Sending to the About")
		res.render('about')
	},
	contact: (req, res) => {
		console.log("Sending to the Contact Page")
		res.render("contact")
	}

}