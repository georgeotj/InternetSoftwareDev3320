const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const userCredentialsSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
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
const UsersCredentials = mongoose.model( 'userCredentials', userCredentialsSchema );

module.exports = UsersCredentials;
