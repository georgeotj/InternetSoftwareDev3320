const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const productsSchema = new Schema({
  productID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: false
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
},
{
 collection: 'products'
});
const products = mongoose.model( 'products', productsSchema );

module.exports = products;
