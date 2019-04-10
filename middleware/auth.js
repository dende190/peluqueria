module.exports = {
	isLogged: function(req, res, next){
		if (req.isAuthenticated()) {
			next() //seguir la peticion
		}else{
			res.redirect('/login')
		}
	},
	isEmploye: function(req, res, next){
		if (req.isAuthenticated() && req.user.position != 'cliente') {
			next()
		}else{
			res.redirect('/')
		}
	},
	isClientNotEntry: function(req, res, next){
		if (req.isAuthenticated() && req.user.position == 'cliente') {
			res.redirect('/')
		}else{
			next()
		}
	}
}