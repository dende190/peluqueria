const {createLogger, format, transports, addColors} = require("winston")

const mylevels = { 
	levels: {
	  error: 1,  // un fallo en la plataforma 
	  info: 3,  // informacion de toda la plataforma
	  debug: 4,  // se usara como console log cuando se este desarrollando
	  http: 5, // respuestas http
	}

};

module.exports = createLogger({
	//configurar el logger en consola
	levels: mylevels.levels,
	format: format.combine(
				format.timestamp(),
				format.json(),
			),
	transports: [
		new transports.File({
			maxsize: 512000, //tamaño maximo de cada archivo
			maxFiles: 5, // cantidad de archivos maximos (cuando lo complete sobreescrivira el primero)
			level: 'error',
			filename: "./logs/error.log",
			handleExceptions: true,
			json: true,
            colorize: true
		}),
		new transports.File({
			maxsize: 512000, //tamaño maximo de cada archivo
			maxFiles: 5, // cantidad de archivos maximos (cuando lo complete sobreescrivira el primero)
			level: 'info',
			filename: "./logs/info.log"
		}),
		new transports.Console({
			level: 'debug', // el tipo de nivel que quiero que muestre en consola
			format: format.combine(
				format.simple()
			),
			colorize: true
		}),
		new transports.File({
			maxsize: 512000, //tamaño maximo de cada archivo
			maxFiles: 5, // cantidad de archivos maximos (cuando lo complete sobreescrivira el primero)
			level: 'http',
			filename: "./logs/http.log"
		}),
	],
	exitOnError: false
})