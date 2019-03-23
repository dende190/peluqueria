// var LocalStrategy = require("passport-local").Strategy;
// const mysql = require('../config/database.js');
// const bcrypt = require("bcryptjs")
// const logger = require("../logs/logger")
// const https = require('https')
// const {
//     sql_aplicaciones_sesion,
// } = require('../utilitis/sql/nagios.js');

// module.exports = function(passport){
//     passport.serializeUser(function(user, done){
//         done(null, user);
//     });

//     passport.deserializeUser(function(obj, done){
//         done(null, obj);
//     });

//     passport.use(new LocalStrategy({
//         passReqToCallback: true
//     }, function(req, username, password, done){
//         let user = [];
//         let datosAplicaciones;
//         let aplicaciones = {};
//         let idCloudflare
//         let idNagios
//         async function connect(){
//             // let ip = await averiguarIp()
//             const usuarios = await mysql.conexionIpconsultores()
//             const nagios = await mysql.conexionNagios()
//             if(usuarios){
//                 try {
//                     let [rows, fields] = await usuarios.query('SELECT * FROM users WHERE username=? ', username);
//                     user = rows[0];
//                 } catch(e) {
//                     console.log(e);
//                 }
//                 if(user){
//                     if (bcrypt.compareSync(password, user.password)) {
                        
//                         usuarios.end();

//                         return done(null, {
//                             id: user.id,
//                             nombre: user.nombre,
//                             correo: user.correo,
//                             username: user.username,
//                             isAdmin: user.isAdmin,
//                         });
//                     }
//                 }
                
//                 return done(null, false,req.flash('authmessage', 'Usuario o contraseña incorrecta'))
                 
//             }else{
//                 console.log("error de Conexion en Base de datos")
//             }

//         }

//         connect();
//     }));
// }