const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const paymentInformationSchema = new Schema({
  userID: {
    type: Number,
    required: true,
    unique: true
},
  cardType: {
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
    type: Date,
    required: true,
    unique: false
}
});
const paymentInformation = mongoose.model( 'payment', paymentInformationSchema );

module.exports = paymentInformation;
