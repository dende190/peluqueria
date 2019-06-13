
const express   = require("express");
const bodyparser = require('body-parser');
const path      = require('path');
const app       = express();
const session   = require("express-session");
const passport  = require("passport");
const morgan    = require("morgan")
const moment    = require("moment")
const flash     = require("connect-flash")
const MongoClient = require('mongodb').MongoClient;
const {
    DB_URI
} = require('./config/config.json')
// const http      = require('http').Server(app);
// const io        = require('socket.io')(http);

// Requiere de carpetas y Archivos
const web = require('./routes/web.js');
require('./passport/passport.js')(passport);
const logger = require("./logs/logger")
//Configuraciones Generales
app.set('port', process.env.PORT || 8000)
// app.set('socket.io', io);

//CONFIGURACION PARA LOGS
logger.stream = {
    write: function (message, encoding) {
        logger.http(message);
    }
};

//Sockets
//conexion de sockets
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

//MiddleWares
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    rolling:true,
    cookie: { 
        _expires : 600000
    }
}));

//CONFIGURACION DE APP
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(morgan('combined', { "stream": logger.stream }))
// app.use(morgan('dev'))

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.user = req.user;
    next()
})

//VARIABLES GLOBALES DEL PROYECTO PARA LAS VISTAS

//Archivo de rutas
app.use("/", web);

//Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'))
app.use('/modules', express.static(__dirname + '/node_modules'))


//MongoDB Connect and upload server
let dbo
MongoClient.connect(DB_URI, { useNewUrlParser: true })
    .then(client => {
        dbo = client.db('peluqueria');
        logger.info("Base de datos iniciada correctamente")
        
        //global variable for database
        // USE CONNECTION => req.app.locals.dbo 
        app.locals.dbo = dbo || null;

        //Subir el servidor
        app.listen(app.get('port'), () => {
            logger.info("Servidor Arrancando en el puerto: " + app.get('port'))
        })

    })
    .catch(error => logger.error("(ERROR) Error al iniciar base de datos", error));