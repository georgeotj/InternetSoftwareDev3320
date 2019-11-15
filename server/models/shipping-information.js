const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const shippingInformationSchema = new Schema({
  userID: {
    type: String,
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
}
});
const shippingInformation = mongoose.model( 'shippingInformation', shippingInformationSchema );

module.exports = shippingInformation;
