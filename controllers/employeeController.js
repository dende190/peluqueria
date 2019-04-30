module.exports = {
    listEmployees: (req,res)=>{
        res.render("employees")
    },
    createEmployee: (req,res)=>{
        res.render("create_employee")
    },
}