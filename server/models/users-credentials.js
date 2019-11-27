const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const chalk = require( 'chalk' );
const jwt = require( 'jsonwebtoken' );
const { JWT_KEY } = require( '../config/server.config' );

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
  },
  // tokens: [ {
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // } ],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

/*        "Pre-hook", or "Middleware" for userCredentialsSchema         */

userCredentialsSchema.statics.authenticate = async ( username, password ) => {
  // eslint-disable-next-line no-undef
  const user = await UsersCredentials.findOne({
    username
  });

  if ( !user ) {
    throw new Error( 'Username wasn\'t found' );
  }
  const isMatch = await bcrypt.compare( password, user.password );

  if ( !isMatch ) {
    throw new Error( 'Unable to login, password doesn\'t match' );
  }
  // use this function to log users into the application
  return user;
};

// PRE-save action. Before saving the user model to DB, run code to hash the password
userCredentialsSchema.pre( 'save', async function save( next ) {
  const user = this;
  console.log( '\n\nUserCredentials Schema Pre Save Middleware is running' );
  console.log( `This is the user: ${user}`);
  // only use this logic if the password is modified
  if ( user.isModified( 'password' ) ) {

    console.log( '\nUsers password was modified!' );

    console.log( `\nOld User Password:\n${user.password}` );
    // hash the password with bcrypt. salt is so that even if two inputs
    // are the same, the hash will not be identical. This indicates 8 salt rounds
    // which determines the "cost factor" to calculate a single hash. Higher number
    // means more hashing rounds are done.
    user.password = await bcrypt.hash( user.password, 8 );

    console.log(
      chalk.keyword( 'hotpink' )( `Hashed Password Generated for User: ${user.password}` )
    );
  }
  next();
});

// "class method" defined on the userCredentialsSchema, determine if user exist or not
userCredentialsSchema.statics.doesNotExist = async function doesNotExist( field ) {
  return await this.where( field ).countDocuments() === 0;
};

userCredentialsSchema.methods.generateAuthToken = async function generateAuthToken() {
  // Generate an auth token for the user
  const user = this;
  // JWT sign method expects data that will be used to sign the token and
  // a JWT key which can be a random string.
  const token = jwt.sign({ _id: user.userID }, JWT_KEY );
  // Add token to user's list of tokens
  user.tokens = user.tokens.concat({ token });
  // Save changes to user
  await user.save();
  // return the token
  return token;
};


const UsersCredentials = mongoose.model( 'UsersCredentials', userCredentialsSchema );

module.exports = UsersCredentials;
