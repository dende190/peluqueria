const moment = require("moment");
const { ObjectId } = require("mongodb");
module.exports = {
    registerPayment: (req, res) => {
        let dbo = req.app.locals.dbo;
        let { user } = req.body;
        user = ObjectId(user);
        let { client } = req.body;
        client = ObjectId(client);
        let { services } = req.body;
        services = services.split(",");
        services = services.map(service => ObjectId(service));
        let { products } = req.body;
        products = products.split(",");
        products = products.map(product => ObjectId(product));
        let { methodPay } = req.body;
        let { totalPrice } = req.body;
        let date = new Date();

        let bill = {
            user,
            client,
            services,
            products,
            methodPay,
            totalPrice
        };

        if (methodPay == "cash") {
            bill.clientMoney = req.body.clientMoney;
            bill.change = req.body.totalChange;
        }
        bill.date = date;
        // console.log(bill);
        dbo.collection("bills").insertOne(bill, (err, r) => {
            if (err) {
                console.log("ERROR REGISTRANDO FACTURA");
            }
            console.log("factura ingresada correctamenrte en la db");
            // console.log(r)
            res.redirect("/dashboard");
        });
    },
    availableProducts: (req, res) => {
        let dbo = req.app.locals.dbo;
        let products = [];
        dbo.collection("products")
            .find({})
            .toArray((err, docs) => {
                for (product of docs) {
                    // console.log(product);
                    let tmp = {
                        id: product._id,
                        text: product.name,
                        price: product.pvp
                    };
                    products.push(tmp);
                }
                // console.log(products);
                res.send({
                    results: products
                });
            });
    },
    availableServices: (req, res) => {
        let dbo = req.app.locals.dbo;
        let services = [];
        dbo.collection("service")
            .find({})
            .toArray((err, docs) => {
                for (service of docs) {
                    let tmp = {
                        id: service._id,
                        text: service.service,
                        price: service.price
                    };
                    services.push(tmp);
                }
                res.send({
                    results: services
                });
            });
    },
    availableClients: (req, res) => {
        let dbo = req.app.locals.dbo;
        let clients = [];
        dbo.collection("clients")
            .find({})
            .toArray((err, docs) => {
                for (client of docs) {
                    let tmp = {
                        id: client._id,
                        text: `${client.first_name} ${client.last_name}`
                    };
                    clients.push(tmp);
                }
                res.send({
                    results: clients
                });
            });
    },
    availableUsers: (req, res) => {
        let dbo = req.app.locals.dbo;
        let users = [];
        dbo.collection("users")
            .find({})
            .toArray((err, docs) => {
                for (user of docs) {
                    let tmp = {
                        id: user._id,
                        text: `${user.first_name} ${user.last_name}`
                    };
                    users.push(tmp);
                }
                res.send({
                    results: users
                });
            });
    },
    countRegister: (req, res) => {
        res.render("count-register");
    },
    todayBills: (req, res) => {
        let dbo = req.app.locals.dbo;
        let today = moment().format("YYYY-MM-DD");
        today = new Date(today);
        console.log(today);
        dbo.collection("bills")
            .aggregate([
                {
                    $match: {
                        date: { $gte: today }
                    }
                },
                {
                    $lookup: {
                        from: "clients",
                        localField: "client",
                        foreignField: "_id",
                        as: "common_client"
                    }
                },
                {
                    $lookup: {
                        from: "service",
                        localField: "services",
                        foreignField: "_id",
                        as: "common_services"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "common_user"
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "products",
                        foreignField: "_id",
                        as: "common_products"
                    }
                }
            ])
            .toArray((err, docs) => {
                if (err) {
                    console.log("ERROR Cannot get today bills" + err);
                }
                res.send(docs);
            });
    },
    listBills: (req, res) => {
        res.render("list_bills");
    }
};
