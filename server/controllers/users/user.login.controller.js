const mongoose = require( 'mongoose' );
const chalk = require( 'chalk' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const models = require( '../../models' );
const { JWT_KEY } = require( '../../config/server.config' );

const login = async ( user ) => {
  console.log( chalk.keyword( 'orange' )( 'Attempting to LOGIN a user... ' ) );

  console.log( `username received: ${user.username} Password received: ${user.password}` );

  const validUser = await models.UserCredentials.authenticate( user.username, user.password );

  if ( validUser ) {
    console.log( 'User found, attempting to add JSON Web Token...' );

    const token = jwt.sign({ id: validUser.userID }, JWT_KEY, {
      expiresIn: 86400 // 24 hours
    });
    console.log( `This is the token: ${token}` );
    return token;
  } else {
      console.log( `Error returning UserCredentials Token for ${user.username}` );
      throw new Error( 'Error logging in user' );
  }

};

module.exports = {
  login
};
