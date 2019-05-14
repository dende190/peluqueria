var express     = require("express");
var router = express.Router();
var passport = require("passport");

//Calling Controllers
const PagesController = require('../controllers/pagesController')
const LoginController = require('../controllers/loginController')
const UsersController = require('../controllers/usersController')
const AppointmentController = require('../controllers/appointmentController')
const DashboardController = require("../controllers/dashboardController")
const ClientController = require("../controllers/clientController")
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
//APPOINTMENT
//DashBoard
router.get("/dashboard", DashboardController.dashboard)
//Send appointment data in dashboard
router.post("/dashboard/appointment", DashboardController.dashboardAppointment)
//Show appointment data
router.get("/cita/:id", DashboardController.dataAppointment)
//Edit appointment data
router.get("/editar/cita/:id", DashboardController.editAppointment)
router.post("/editar/cita/:id", DashboardController.editAppointment)
//Delete Appointment
router.post("/borrar/cita", DashboardController.deleteAppointment)

//CLIENTS
//Clients List
router.get("/clientes",  ClientController.clients)

//Client Data
router.get("/cliente/:username",  ClientController.clientData)

//Create Client
router.get("/crear-cliente",  ClientController.createClient)
router.post("/crear-cliente",  ClientController.createClient)

//Edit Cleint
router.get("/editar/cliente/:id",  ClientController.editClient)
router.post("/editar/cliente/:id",  ClientController.editClient)

//Remove Client
router.post("/borrar-cliente",  ClientController.deleteClient)

//Create bill
router.post("/pago", AccountingController.registerPayment)

// EMPLOYEES
//List of Employees
router.get("/empleados", EmployeeController.listEmployees)

//Create Employee
router.get("/crear-empleado", EmployeeController.createEmployeeForm)
router.post("/crear-empleado", EmployeeController.createEmployee)

//Edit Cleint
router.get("/editar/empleado/:id",  EmployeeController.editEmployee)
router.post("/editar/empleado/:id",  EmployeeController.editEmployee)

//Delete Empleyee
router.post("/borrar-empleado", EmployeeController.deleteEmployee)

//PRODUCTOS
//List of Products
router.get("/productos", ProductController.listProducts)

//Create Product
router.get("/crear-producto", ProductController.createProductForm)
router.post("/crear-producto", ProductController.createProduct)





module.exports = router;