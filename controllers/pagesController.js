const mongo = require('../config/database.js').conexionMongo();
const logger = require("../logs/logger")
const bcrypt = require("bcryptjs");

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
	
	
}