const {validationResult} = require('express-validator');
const fs = require("fs");

//Check requested data
const validateRequest = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors : errors.array()[0].msg });
    }

    next();
};

module.exports = validateRequest;