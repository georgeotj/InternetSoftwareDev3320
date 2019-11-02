const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const userInformationSchema = new Schema({
    userID: {
      type: Number,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      required: true,
      unique: false
    },
    user_address1: {
      type: String,
      required: true,
      unique: false
    },
    user_address2: {
      type: String,
      required: false,
      unique: false
    },
    user_city: {
      type: String,
      required: true,
      unique: false
    },
    user_state: {
      type: String,
      required: true,
      unique: false
    },
    user_zipcode: {
      type: Number,
      required: true,
      unique: false
}
  });
  const UserInformation = mongoose.model( 'userInformation', userInformationSchema );

module.exports = UserInformation;
