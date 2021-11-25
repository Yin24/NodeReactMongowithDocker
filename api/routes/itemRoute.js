const express = require('express');
const router = express.Router();
const {getAllItems, createItem } = require('../controllers/itemController');
const itemSchema = require('../schemas/itemSchema');
const validateRequest = require('../middlewares/validateReq.js');


router.post("/", itemSchema, validateRequest, createItem);
router.get("/", getAllItems);


module.exports = router;
