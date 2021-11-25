const path = require("path");
const Item = require('../models/itemModel');
const Customer = require('../models/customerModel');
const Taxjar = require('taxjar');



//Create Customer
const createCustomer = async(req, res) =>{
    const { customerid, customername, country, state, zip } = req.body;
    try {
        const newCust  = new Customer({
            customerid,
            customername,
            country,
            zip,
            state
        });
        await newCust.save();
        res.status(200).send(newCust);

    } catch (error) {
        res.status(500);
    }
};

//get all customers
const getAllCustomers = async(req, res) =>{

    try {
        const customers = await Customer.find();    
        res.status(200).json(customers);
    } catch (error) {
        res.status(503);
    }
};


module.exports = {createCustomer,getAllCustomers};