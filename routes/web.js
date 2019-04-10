var express     = require("express");
var router = express.Router();
var passport = require("passport");

//Calling Controllers
const PagesController = require('../controllers/pagesController')
const LoginController = require('../controllers/loginController')
const UsersController = require('../controllers/usersController')
const AppointmentController = require('../controllers/appointmentController')
const DashboardController = require("../controllers/dashboardController")

//Calling AuthMiddleware
var AuthMiddleware = require('../middleware/auth')

//Login
router.get("/login", LoginController.login)
router.post("/login", passport.authenticate('local', {
	failureRedirect: '/login',
}), (req, res) => {
	if (req.user.position === 'cliente'){
		res.redirect('/')
	}else{
		res.redirect('/dashboard')
	}
});

//Logout
router.get("/logout", AuthMiddleware.isLogged, LoginController.logout)

//Sign Up
router.get("/registro", AuthMiddleware.isClientNotEntry, UsersController.signUp);
router.post("/registro", UsersController.signUp);


//Routes for all people.

//HomePage
router.get("/", PagesController.homePage);

//Services
router.get("/servicios", PagesController.service);

//About
router.get("/nosotros", PagesController.about);

//Contact
router.get("/contacto", PagesController.contact)

//Appointment
router.post("/cita", AppointmentController.appointment)
//Thanks
router.get("/cita", AppointmentController.appointment)

//Routes for only people authenticated.

//Routes for only people authenticated in the platform.
//DashBoard
router.get("/dashboard", AuthMiddleware.isEmploye, DashboardController.dashboard)

//List of Clients
router.get("/clientes", AuthMiddleware.isEmploye, DashboardController.clients)

module.exports = router;