module.exports = {
    registerPayment: (req, res) => {

        let dbo = req.app.locals.dbo
        let { employee } = req.body
        let { client } = req.body
        let { items } = req.body
        let { total } = req.body
        let { iscreditCard } = req.body
        let { isCash } = req.body
        let { date } = req.body

        let bill = {
            employee,
            client,
            items,
            total,
            iscreditCard,
            isCash,
            date,
        }
        console.log(employee)
        console.log(client)
        console.log(items)
        console.log(total)
        console.log(iscreditCard)
        console.log(isCash)
        console.log(date)

        dbo.collection('bills').insertOne(bill, (err,r)=>{
            if(err) {
                console.log("ERROR REGISTRANDO FACTURA")
            }
            console.log("factura ingresada correctamenrte en la db")
            // console.log(r)
            res.send("le respondo a la rata")
        })
    }
}