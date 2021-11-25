const path = require("path");
const Item = require('../models/itemModel');
const Customer = require('../models/customerModel');
const Taxjar = require('taxjar');


//calculate payment
const calculatePayment = async(req, res)=>{
    const customerid =req.body.customerid;
    const quantities = req.body.quantities;

    try {
        //get customer name
        const customer = await Customer.findOne({customerid});
        const {customername, country, zip, state} = customer;

        //get total price & total price for each item
        let totalPrice = 0;
        const items = await Item.find();
        for (let i = 0; i < items.length; i++) {
            //total price
            const quantity =  quantities[i] || 0;
            totalPrice = totalPrice + items[i].price * quantity;
            //total price for each item
            items[i].price = items[i].price * quantity;
          }

          //calculate tax
                var totalTax = 0;
                const client = await new Taxjar({
                    apiKey: process.env.TAXJAR_API_KEY
                });
            
                await client.taxForOrder({
                    from_country: country,
                    from_zip: zip,
                    from_state: state,
                    to_country: 'US',
                    to_zip: '07446',
                    to_state: 'NJ',
                    amount: totalPrice,
                    shipping: 1.5
                }).then(res => {
                    totalTax = JSON.stringify(res.tax.amount_to_collect);                              
                }) .catch(error =>{
                    console.log(error.message);
                });
 
                res.json({customername, totalPrice, totalTax, items  });   

    } catch (error) {
        res.status(500);
    }
};


module.exports = calculatePayment;