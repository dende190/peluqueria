var express     = require("express");
var router = express.Router();
var passport = require("passport");

// LLAMADO DE CONTROLADORES
const ServiceController = require("../controller/ServiceController")

//CONTROLADOR DE MIDDLEWARE
// var AuthMiddleware = require('../middleware/auth')

//LOGIN
// router.get("/login", LoginController.login)

// router.post("/login", passport.authenticate('local', {
// 	successRedirect: '/',
// 	failureRedirect: '/login',
// 	failureFlash: true
// }));

//MIDDLEWARE
// router.use((req,res,next)=> {
// 	AuthMiddleware.isLogged(req,res,next)
// }); 

//RUTAS SOLO PARA AUTENTICADOS

//Servicios
router.get("/service" , ServiceController.dash);

module.exports = router;