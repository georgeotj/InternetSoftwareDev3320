const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const userCredentialsSchema = new Schema({
  userID: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  }
});
const UserCredentials = mongoose.model( 'userCredentials', userCredentialsSchema );

module.exports = UserCredentials;
