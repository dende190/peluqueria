module.exports = {
	isLogged: function(req, res, next){
		if (req.isAuthenticated()) {
			next() //seguir la peticion
		}else{
			res.redirect('/login')
		}
	},
	isAdmin: function(req, res, next){
		if (req.isAuthenticated() && req.user.isAdmin) {
			next()
		}else{
			res.redirect('/')
		}
	},
    isSudo: function(req, res, next){
        if (req.isAuthenticated() && req.user.isSudo) {
            next()
        }else{
            res.redirect('/')
        }
	},
	hasCf:function(req,res,next){
		if (req.user.aplicaciones.CloudFlare && req.user.aplicaciones.CloudFlare.isActive){
			next()
		}else{
			res.redirect('/')
        }
	},
	hasKibana:function(req,res,next){
		if (req.user.aplicaciones.Kibana && req.user.aplicaciones.Kibana.isActive){
			next()
		}else{
            res.redirect('/')
        }
	},
	hasNagios:function(req,res,next){
		if (req.user.aplicaciones.Nagios && req.user.aplicaciones.Nagios.isActive){
			next()
		}else{
            res.redirect('/')
        }
	},
	hasCacti:function(req,res,next){
		if (req.user.aplicaciones.Cacti && req.user.aplicaciones.Cacti.isActive){
			next()
		}else{
			res.redirect('/')
			next()
        }
	}
}