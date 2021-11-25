const {body} = require('express-validator');

//Check request body or data before saving in database


const itemSchema = [

    body("itemid")
    .exists({checkFalsy : true})
    .withMessage("Please Fill Your itemid"),

    body("price")
    .isNumeric()
    .withMessage("Please Fill Your price"),
];

module.exports = itemSchema;