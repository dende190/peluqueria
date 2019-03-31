const logger = require("../logs/logger")

module.exports = {
	login: (req,res) => {
		res.render('login', {
			flashMessage: req.flash('authmessage'),
		})
	},
	logout: function(req, res, next) {
        logger.info(`(CERRAR SESION) El usuario`);
        req.logout();
        res.redirect("/login");
    }
}