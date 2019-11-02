const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const productsSchema = new Schema({
  productID: {
    type: Number,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  unitPrice: {
    type: Number,
    required: true,
    unique: false
  }
});
const products = mongoose.model( 'products', productsSchema );

module.exports = products;
