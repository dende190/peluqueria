// const logger = require("../logs/logger")

module.exports = {
    dash: function(req, res){
        res.render("prueba", {
            title: "prueba Pug",
            message: "Hello World"
        })
    }
}