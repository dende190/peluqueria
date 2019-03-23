const logger = require("../logs/logger")

module.exports = {
    dash: function(req, res){
        res.render("prueba.ejs", {
            p: "hola mundo"
        })
    }
}