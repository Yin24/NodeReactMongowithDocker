const {body} = require('express-validator');

//Check request body or data before saving in database


const customerSchema = [

    body("customerid")
    .exists({checkFalsy : true})
    .withMessage("Please Fill Your customerid"),

    body("customername")
    .exists({checkFalsy : true})
    .withMessage("Please Fill Your customerid"),

    body("country")
    .exists({checkFalsy : true})
    .withMessage("Please Fill Your customerid"),

    body("zip")
    .exists({checkFalsy : true})
    .withMessage("Please Fill Your customerid"),

    body("state")
    .exists({checkFalsy : true})
    .withMessage("Please Fill Your customerid"),


];

module.exports = customerSchema;