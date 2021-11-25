const express = require('express');
const router = express.Router();
const calculatePayment  = require('../controllers/mainController');

const validateRequest = require('../middlewares/validateReq.js');


router.post("/calpay", calculatePayment);



module.exports = router;
