const { ObjectId } = require("mongodb");
const logger = require("../logs/logger");
module.exports = {
    listProducts: (req, res) => {
        let dbo = req.app.locals.dbo;

        dbo.collection("products")
            .find({})
            .toArray((err, docs) => {
                if (err) {
                    console.log("(ERROR) Cannot get all the products " + err);
                    return;
                }
                // console.log(docs);
                res.render("products", {
                    products: docs
                });
            });
    },
    createProductForm: (req, res) => {
        res.render("create_product");
    },
    createProduct: (req, res) => {
        let dbo = req.app.locals.dbo;

        let { provider } = req.body;
        let { name } = req.body;
        let { description } = req.body;
        let { cost } = req.body;
        let { price } = req.body;
        let { iva } = req.body;
        let { pvp } = req.body;
        let { stock } = req.body;
        let product = {
            provider,
            name,
            description,
            cost : parseFloat(cost),
            price : parseFloat(price),
            iva : parseFloat(iva),
            pvp : parseFloat(pvp),
            stock : parseInt(stock),
        };
        dbo.collection("products").insertOne(product, (err, result) => {
            if (err) {
                console.log(
                    "(ERROR) Cannot create new product in the database " + err
                );
            }
            console.log("New product created succesfully");
        });
        res.redirect("/productos");
    },
    deleteProduct: (req, res) => {
        let dbo = req.app.locals.dbo;

        dbo.collection("products").deleteOne({ _id: ObjectId(req.body.id) },(err, r) => {
            if (err) {
                console.log(`(ERROR) Error al borrar el Producto con id ${req.body.id} \n ${err}`);
            }
            console.log(`Producto con id ${req.body.id} eliminado correctamente`);
        }); //prettier-ignore

        res.redirect("/productos");
    },
    editProduct: (req, res) => {
        if (req.body.name) {
            let dbo = req.app.locals.dbo;

            let { provider } = req.body;
            let { name } = req.body;
            let { description } = req.body;
            let { cost } = req.body;
            let { price } = req.body;
            let { iva } = req.body;
            let { pvp } = req.body;
            let { stock } = req.body;
            let product = {
                provider,
                name,
                description,
                cost,
                price,
                iva,
                pvp,
                stock
            };
            console.log(product);
            dbo.collection("products").replaceOne(
                { _id: ObjectId(req.params.id) },
                product,
                (err, result) => {
                    if (err) {
                        console.log(
                            "(ERROR) Cannot edit the product in the database " +
                                err
                        );
                    }
                    console.log("Product Edited succesfully");
                }
            );
            res.redirect("/productos");
        } else {
            let dbo = req.app.locals.dbo;
            dbo.collection("products").findOne(
                { _id: ObjectId(req.params.id) },
                (err, result) => {
                    if (err) {
                        logger.error(
                            `(ERROR) Error al traer datos del producto con id ${
                                req.params.id
                            } \n ${err}`
                        );
                    } else {
                        logger.info(
                            `Informacion del producto con id: ${
                                req.params.id
                            } traida exitosamente`
                        );
                        res.render("edit_product", {
                            product: result
                        });
                    }
                }
            );
        }
    }
};