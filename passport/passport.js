var LocalStrategy = require("passport-local").Strategy;
const mongo = require('../config/database.js').conexionMongo();
const bcrypt = require("bcryptjs")
const logger = require("../logs/logger")

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(obj, done){
        done(null, obj);
    });

    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done){
        let user;
        async function connect(){
        	await mongo.then(async db =>{
				await db.collection("users").findOne({ 'username': username }, (err, result) => {
					if(err){
						logger.error(`(ERROR) Error al iniciar sesion con usuario ${username}`, err)
					}
					user = result

					if(user){
						if (bcrypt.compareSync(password, user.password)) {
		                    return done(null, {
		                        id: user.id,
		                        nombre: user.first_name,
		                        correo: user.email,
		                        username: user.username,
		                    });
		                }
					}

					return done(null, false,req.flash('authmessage', 'Usuario o contraseña incorrecta'))
					
				});
			}).catch(err => {
				console.log("error de Conexion en Base de datos")
			})
        }

        connect();
    }));
}