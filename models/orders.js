const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const ordersSchema = new Schema({

  // userID, orderNumber, and productID should be a primary key together
  userID: {
    type: Number,
    required: true,
    unique: true
  },
  orderNumber: {
    type: Number,
    required: true,
    unique: true
  },
  productID: {
    type: Number,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true,
    unique: false
  },
  totalPrice: {
    type: Number,
    required: true,
    unique: false
  }
});
const orders = mongoose.model( 'orders', ordersSchema );

module.exports = orders;
