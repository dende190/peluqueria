module.exports = {
    listProducts: (req, res) => {
        res.render("products")
    },
    createProductForm: (req, res) => {
        res.render("create_product")
    },
    createProduct: (req, res) => {
        let dbo = req.app.locals.dbo
        
        let { provider } = req.body
        let { name } = req.body
        let { description } = req.body
        let { cost } = req.body
        let { price } = req.body
        let { iva } = req.body
        let { pvp } = req.body
        let { stock } = req.body
        let product = {
            provider,
            name,
            description,
            cost,
            price,
            iva,
            pvp,
            stock,
        }
        dbo.collection('products').insertOne(product, (err, result)=>{
            if(err) {
                console.log("(ERROR) Cannot create new product in the database " + err)
            }
            console.log("New producto create it succesfully")
        })
        res.redirect("/productos")
    },
}