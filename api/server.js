const express = require('express');
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');

const mainRoute = require('./routes/mainRoute');
const customerRoute = require('./routes/customerRoute');
const itemRoute = require('./routes/itemRoute');
const connectDb = require("./utils/connection");

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', mainRoute);
app.use('/api/customer', customerRoute);
app.use('/api/item', itemRoute);

app.use(bodyParser.json());

const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`Listening on PORT ${PORT}`);
  
    connectDb().then(() => {
      console.log("MongoDb connected");
    });
  });


