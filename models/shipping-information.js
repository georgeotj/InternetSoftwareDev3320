const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const shippingInformationSchema = new Schema({
  userID: {
    type: Number,
    required: true,
    unique: true
},
  shipping_address1: {
    type: String,
    required: true,
    unique: false
},
  shipping_address2: {
    type: String,
    required: false,
    unique: false
},
  shipping_city: {
    type: String,
    required: true,
    unique: false
},
  shipping_state: {
    type: String,
    required: true,
    unique: false
},
  shipping_zipcode: {
    type: String,
    required: true,
    unique: false
},
  shipping_equal_billing: {
    type: Boolean,
    required: false,
    unique: false
}
});
const shippingInformation = mongoose.model( 'shipping', shippingInformationSchema );

module.exports = shippingInformation;
