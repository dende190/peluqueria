module.exports ={
    listProducts: (req,res) => {
        res.render("products")
    },
    createProductForm: (req,res) => {
        res.render("create_product")
    },
    createProduct: (req,res) => {
        console.log(req.body.provedor)
        res.redirect("/productos")
    },
}