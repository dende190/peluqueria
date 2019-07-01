const moment = require("moment");
const { ObjectId } = require("mongodb");
module.exports = {
    registerPayment: (req, res) => {
        console.log(req.body)
        let dbo = req.app.locals.dbo;
        let { user } = req.body;
        user = ObjectId(user);
        let { client } = req.body;
        client = ObjectId(client);

        let { services } = req.body;
        if (services) {
            services = services.split(",");
            services = services.map(service => ObjectId(service));
        } else {
            services = null;
        }

        let { products } = req.body;
        if (products) {
            products = products.split(",");
            products = products.map(product => ObjectId(product));
        } else {
            products = null;
        }

        let { method_pay } = req.body;
        let { subtotal_price } = req.body;
        let { total_price } = req.body;
        let { total_taxes } = req.body;
        let date = new Date();

        let bill = {
            user,
            client,
            services,
            products,
            method_pay,
            subtotal_price: parseFloat(subtotal_price),
            total_price: parseFloat(total_price),
            total_taxes: parseFloat(total_taxes)
        };

        if (method_pay == "cash") {
            bill.client_money = req.body.client_money;
            bill.change = req.body.total_change;
        }
        bill.date = date;
        // console.log(bill);
        dbo.collection("bills").insertOne(bill, (err, r) => {
            if (err) {
                console.log("ERROR REGISTRANDO FACTURA");
                res.status(500).send('se rompio weyy')
            }
            console.log("factura ingresada correctamenrte en la db");
            res.send({response: "factura creadaaaaa"})
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
                        price: product.pvp,
                        iva: product.iva
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
                        price: service.price,
                        iva: service.iva
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
        res.render("count_register");
    },
    bills: (req, res) => {
        let dbo = req.app.locals.dbo;
        let { start } = req.body;
        let { end } = req.body;
        // console.log(start);
        // console.log(end);
        start =  new Date(start)
        end =  new Date(end)
        dbo.collection("bills")
            .aggregate([
                {
                    $match: {
                        date: { $lt: end, $gte: start  }
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
                    $project: {
                        _id: 1,
                        date: 1,
                        total_price: 1,
                        total_taxes: 1,
                        method_pay: 1,
                        "common_client.first_name": 1,
                        "common_client.last_name": 1,
                        "common_user.first_name": 1,
                        "common_user.last_name": 1
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
    balanceBills: (req, res) => {
        let dbo = req.app.locals.dbo;
        let { start } = req.body;
        let { end } = req.body;
        start =  new Date(start)
        end =  new Date(end)
        dbo.collection("bills")
            .aggregate([
                {
                    $match: {
                        date: { $gte: start, $lt: end }
                    }
                },
                {
                    $group: {
                        _id: null,
                        number_bills: { $sum: 1 },
                        subtotal_price: { $sum: "$subtotal_price" },
                        total_taxes: { $sum: "$total_taxes" },
                        total_price: { $sum: "$total_price" }
                    }
                }
            ])
            .toArray((err, docs) => {
                if (err) {
                    console.log("ERROR trayendo el resumen de las facturas");
                } else {
                    res.send(docs);
                }
            });
    },
    viewBills: (req, res) => {
        res.render('bills');
    },
    billDetails: (req,res) => {
        const idBill = req.params.id
        const dbo = req.app.locals.dbo
        

        console.log(idBill)

        res.render('bill_details')
    }
};
