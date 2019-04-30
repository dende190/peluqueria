var express     = require("express");
var router = express.Router();
var passport = require("passport");

//Calling Controllers
const PagesController = require('../controllers/pagesController')
const LoginController = require('../controllers/loginController')
const UsersController = require('../controllers/usersController')
const AppointmentController = require('../controllers/appointmentController')
const DashboardController = require("../controllers/dashboardController")
const AccountingController = require("../controllers/accountingController")
const EmployeeController = require("../controllers/employeeController")
const ProductController = require("../controllers/productController")

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

//Routes for only employed authenticated in the platform.
//DashBoard
router.get("/dashboard", DashboardController.dashboard)
//Send appointment data in dashboard
router.post("/dashboard/appointment", DashboardController.dashboardAppointment)

//Create bill
router.post("/pago", AccountingController.registerPayment)

//List of Clients
router.get("/clientes",  DashboardController.clients)

//List of Employees
router.get("/empleados", EmployeeController.listEmployees)
//Create Employee
router.get("/crear-empleado", EmployeeController.createEmployeeForm)
router.post("/crear-empleado", EmployeeController.createEmployee)
//List of Products
router.get("/productos", ProductController.listProducts)
//Create Product
router.get("/crear-producto", ProductController.createProductForm)
router.post("/crear-producto", ProductController.createProduct)


//Client Data
router.get("/cliente/:username",  DashboardController.clientData)

module.exports = router;