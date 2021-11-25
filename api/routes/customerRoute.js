const express = require('express');
const router = express.Router();
const {createCustomer,getAllCustomers} = require('../controllers/customerController');
const customerSchema = require('../schemas/customerSchema');
const validateRequest = require('../middlewares/validateReq.js');


router.post("/", customerSchema, validateRequest, createCustomer);
router.get("/", getAllCustomers);

module.exports = router;
