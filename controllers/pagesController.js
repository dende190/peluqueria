module.exports = {
	homePage: (req,res) => {
	    console.log("Sending to the HomePage")
	    res.render('home')
	},
	service: (req,res) => {
	    console.log("Sending to the Service")
	    res.render('service')
	},
}