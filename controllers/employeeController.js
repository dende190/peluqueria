const logger = require("../logs/logger")
const bcrypt = require("bcryptjs");
const { ObjectId } = require('mongodb');

module.exports = {
    listEmployees: (req, res) => {
        let dbo = req.app.locals.dbo

        dbo.collection('users').find({}).toArray( (err,docs)=>{
            if(err) {
                console.log("(ERROR) The dabase cannot find all the Employees" + err)
            }
            console.log("List of empleyees")
            console.log(docs)
            res.render("employees", {
                employees: docs
            })
        })
    },
    createEmployeeForm: (req, res) => {
        res.render("create_employee")
    },
    createEmployee: (req, res) => {
        let dbo = req.app.locals.dbo
        let salt = bcrypt.genSaltSync(12);
        let password = bcrypt.hashSync(`peluqueria123`, salt);

        let newEmployee = {
            first_name: req.body.name.toLowerCase(),
            last_name: req.body.lastName.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password,
            email: req.body.email.toLowerCase(),
            phone: req.body.phone,
            cc: req.body.cc,
            position: req.body.position
        }
        dbo.collection('users').insertOne({ ...newEmployee }, (err,r)=>{
            if(err) {
                console.log("(ERROR) creating new Employee")
            }
            console.log("Employee created Succesfully")
        })
        res.redirect("/empleados")
    },
    deleteEmployee: (req, res) => {
        let dbo = req.app.locals.dbo
        
        dbo.collection('users').remove( {_id: ObjectId(req.body.id) }, (err, r) => {
            if(err){
                console.log(`(ERROR) error al borrar usuario con id ${req.body.id} \n ${err}`)
            }
            console.log(`Usuario con id ${req.body.id} eliminado correctamente`)
        })

        res.redirect("/empleados")
    },
    editEmployee: (req, res) => {
        let dbo = req.app.locals.dbo

        if(req.body.name){
            let password = req.body.password
            dbo.collection('users').findOne( { _id: ObjectId(req.params.id) }, (err, result) => {
                if(err){
                    logger.error(`(ERROR) Error al traer datos del usuario con id ${req.params.id} \n ${err}`)
                }else{
                    logger.info(`Informacion del usuario con id: ${req.params.id} traida exitosamente`)
                    console.log('contraseña: ', password)
                    if(result.password != req.body.password){
                        let salt = bcrypt.genSaltSync(12);
                        password = bcrypt.hashSync(req.body.password, salt);
                    }
                    let newEmployee = {
                        first_name: req.body.name.toLowerCase(),
                        last_name: req.body.lastName.toLowerCase(),
                        username: req.body.username,
                        password,
                        email: req.body.email.toLowerCase(),
                        phone: req.body.phone,
                        cc: req.body.cc,
                        position: req.body.position
                    }
                    
                    dbo.collection('users').replaceOne( { _id: ObjectId(req.params.id) }, { ...newEmployee } , (err, result) => {
                        if(err){
                            logger.error(`(ERROR) Error al editar Usuario '${req.body.name.toUpperCase()} ${req.body.lastName.toUpperCase()}'`, err)
                        }else{
                            logger.info(`Usuario Editado Exitosamente '${req.body.name.toUpperCase()} ${req.body.lastName.toUpperCase()}'`)
                        }
                    });
                    
                    res.redirect("/empleados")
                }
            })
            
            

        }else{
            dbo.collection('users').findOne( { _id: ObjectId(req.params.id) }, (err, result) => {
                if(err){
                    logger.error(`(ERROR) Error al traer datos del usuario con id ${req.params.id} \n ${err}`)
                }else{
                    logger.info(`Informacion del usuario con id: ${req.params.id} traida exitosamente`)
                    res.render("edit_user", {
                        result,
                        data: 'employee'
                    })
                }
            })
        }
    },
}