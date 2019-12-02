const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const cardTypes = [ 'VISA', 'MasterCard', 'American Express' ];

const paymentInformationSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true
},
  cardType: {
    type: String,
    required: true,
    unique: false,
    enum: cardTypes
},
  cardName: {
    type: String,
    required: true,
    unique: false
  },
  cardNumber: {
    type: Number,
    required: true,
    unique: false
},
  expDate: {
    type: String,
    required: true,
    unique: false
},
  CVV: {
    type: Number,
    required: true,
    unique: false
  },
  saveForFuturePurchases: {
    type: Boolean,
    default: false,
    required: true
  }
});
const paymentInformation = mongoose.model( 'paymentInformation', paymentInformationSchema );

module.exports = paymentInformation;
