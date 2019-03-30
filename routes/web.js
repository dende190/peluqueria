var express     = require("express");
var router = express.Router();
var passport = require("passport");

//Calling Controllers
const PagesController = require('../controllers/pagesController')
const LoginController = require('../controllers/loginController')
const UsersController = require('../controllers/usersController')

//Calling AuthMiddleware
var AuthMiddleware = require('../middleware/auth')

//Login
router.get("/login", LoginController.login)
router.post("/login", passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

//Logout
router.get("/logout", AuthMiddleware.isLogged, LoginController.logout)

//Sign Up
router.get("/registro", UsersController.signUp);
router.post("/registro", UsersController.signUp);


//Routes for all people.

//HomePage
router.get("/", PagesController.homePage);

//Services
router.get("/servicios", PagesController.service);

//About
router.get("/nosotros", PagesController.about);


//Routes for only people authenticated.



module.exports = router;