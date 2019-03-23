const nodemailer = require('nodemailer');
const { SERVICE, USER, PASS } = require('./configEmail.json')

exports.sendEmail = function (userEmail, asunto, nombrePDF, pathPDF){

    const hoy = new Date()
    const horas = hoy.getHours()
    let mensaje = ""

    if (horas < 12) {
        mensaje ='Buenos Días'
    } else if (horas < 18) {
        mensaje ='Buenas Tardes'
    } else {
        mensaje ='Buenas Noches'
    }

	let transporter = nodemailer.createTransport({
		service: SERVICE,
		auth: {
		    user: USER,
		    pass: PASS
		}
	});

	const mailOptions = {
		from: USER, // sender address
		to: userEmail, // list of receivers
		bcc: "soportetelefonia@ipconsultores.net",
		subject: asunto, // Subject line
        html: `<h3 style="font-weight:400">${mensaje}</h3>
                <p>Se adjunta Informe según parámetros establecidos.</p>
                <p>Cordialmente.</p>
                <br/>
                <p><strong>IP CONSULTORES S.A.S</strong></p>
                <p>Departamento de Inteligencia Informática</p>
                <p>Plataforma XENTINEL</p>
            `,
		attachments: [{ 
			filename: nombrePDF, 
			path: pathPDF,
			contentType: 'application/pdf' 
		}]
	};

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message sent: %s', info.messageId);
	    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	});
}