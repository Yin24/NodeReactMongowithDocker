const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    customerid: {
      type: String,
      required: true,
    },
    customername: {
        type: String,
        required: true,
      },
    country:{
      type: String,
      required: true,
    },
    zip:{
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
