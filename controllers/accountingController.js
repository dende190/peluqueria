const moment = require('moment')

module.exports = {
    registerPayment: (req, res) => {

        let dbo = req.app.locals.dbo;
        let { employee } = req.body;
        let { client } = req.body;
        let { services } = req.body;
        services = services.split(',')
        let { products } = req.body;
        products = products.split(',')
        let { methodPay } = req.body;
        let { totalPrice } = req.body;
        let date = moment().format('YYYY-MM-DD HH:mm');

        let bill = {
            employee,
            client,
            services,
            products,
            methodPay,
            totalPrice,
        };

        if(methodPay == 'cash') {
            bill.clientMoney = req.body.clientMoney
            bill.change = req.body.totalChange
        }
        bill.date = date
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
                        price: service.price,
                    };
                    services.push(tmp)
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
                    clients.push(tmp)
                }
                res.send({
                    results: clients
                });
            });
    },
    availableEmployees: (req, res) => {
        let dbo = req.app.locals.dbo;
        let employees = [];
        dbo.collection("users")
            .find({})
            .toArray((err, docs) => {
                for (employee of docs) {
                    let tmp = {
                        id: employee._id,
                        text: `${employee.first_name} ${employee.last_name}`
                    };
                    employees.push(tmp)
                }
                res.send({
                    results: employees
                });
            });
    }
};