const mongoose = require( 'mongoose' );
const chalk = require( 'chalk' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const models = require( '../../models' );
const { JWT_KEY } = require( '../../config/server.config' );

const register = async ( user ) => {

  const hashedPassword = bcrypt.hashSync( user.password, 8 );

  const userID = new mongoose.mongo.ObjectID();
  const newUser = new models.UserCredentials({
    userID,
    username: user.username,
    password: hashedPassword,
    dateCreated: new Date()
  });

  try {
      const savedUser = await newUser.save();
      console.log( 'Saving user was Successful!' );
      console.log( chalk.keyword( 'blue' )( `User that was saved: ${savedUser}` ) );
      return savedUser;
    // Generate and return the JWT Token
      // return jwt.sign({ id: savedUser.userID }, JWT_KEY, {
      //   expiresIn: 86400 // 24 hours
      // });
  } catch ( error ) {
    throw Error( 'Error While Creating User' );
  }
};

const generateAuthToken = async ( userID ) => {
  const token = jwt.sign({ _id: userID }, JWT_KEY );
  console.log( `Attempting to generate token for UserID: ${userID}` );
  console.log( `Token Generated: ${token}` );
  return token;
};

module.exports = {
  register,
  generateAuthToken
};

//   if ( !username || !password ) {
//     console.log( 'Error Registering User to Database, no username or password from request' );
//     return res.status( 400 ).json({ msg: 'Error processing request properties' });
//   }
//
//   const isUsernameNew = await isUsernameTaken( username );
//
//   if( !isUsernameNew ) {
//     const user = await register( username, password );
//   }
//   // create hashed password
//   const hashedPassword = await bcrypt.hash( password, 8 );
//
//   try {
//
//     const userID = new mongoose.mongo.ObjectID();
//
//     const user = await models.UserCredentials.create({
//       userID,
//       username,
//       password: hashedPassword
//     });
//
//     if ( !user ) {
//       return new Error( 'Error creating new user: ' );
//     }
//
//     // console.log( 'Attempting to a session for the user...' );
//     // const sessionUser = sessionizeUser( user );
//     // console.log( sessionUser );
//
//     console.log( `Successfully created a new user: ${username}` );
//     return user;
//     // res.status( 201 ).json({
//     //   success: [ {
//     //     msg: `Thanks for registering ${username}!`
//     //   } ]
//     // });
//     //
//     // req.session.user = sessionUser;
//     // res.send( sessionUser );
//   } catch ( error ) {
//     console.log( chalk.red( error ) );
//     return res.status( 500 ).json({
//       errors: [ {
//         msg: 'There was a problem registering a user'
//       } ]
//     });
//   }
// };

