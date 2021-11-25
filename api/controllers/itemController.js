const path = require("path");
const Item = require('../models/itemModel');

//create a new item
const createItem = async(req, res) =>{
    const { itemid, price } = req.body;
    
    try {
        const newItem = new Item({
            itemid,
            price
        });
        await newItem.save();
        res.send(newItem);

    } catch (error) {
        console.log(error.message);
    }
};

//get all items
const getAllItems = async(req, res) =>{

    try {
        const items = await Item.find();    
        //res.send(items);
        res.status(200).json(items);
    } catch (error) {
        res.status(503);
    }
};

module.exports = {getAllItems, createItem};