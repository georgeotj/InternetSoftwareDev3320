const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const userInformationSchema = new Schema({
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      required: true,
      unique: false
    },
    user_phone: {
      type: Number,
      required: true,
      unique: false
    },
    user_email: {
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

  userInformationSchema.methods.information = () => {
 return {
      fullname: this.fullname,
      phone: this.user_phone,
      email: this.user_email,
      address1: this.user_address1,
      address2: this.user_address2,
      city: this.user_city,
      state: this.user_state,
      zipcode: this.user_zipcode
    };
};

  const UsersInformation = mongoose.model( 'userInformation', userInformationSchema );


module.exports = UsersInformation;
