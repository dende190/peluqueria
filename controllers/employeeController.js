module.exports = {
    listEmployees: (req, res) => {
        let dbo = req.app.locals.dbo
        dbo.collection('employees').find({}).toArray( (err,docs)=>{
            if(err) {
                console.log("(ERROR) The dabase cannot find all the Employees" + err)
            }
            console.log("encontre a los empleados")
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
        let { name } = req.body
        let { lastName } = req.body
        let { email } = req.body
        let { phone } = req.body
        let { position } = req.body
        let newEmployee = {
            name,
            lastName,
            email,
            phone,
            position,
        }
        dbo.collection('employees').insertOne(newEmployee, (err,r)=>{
            if(err) {
                console.log("(ERROR) creating new Employee")
            }
            console.log("Employee created Succesfully")
        })
        res.redirect("/empleados")
    },
}