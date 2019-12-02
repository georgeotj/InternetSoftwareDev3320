const mongoose = require( 'mongoose' );
const chalk = require( 'chalk' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const models = require( '../../models' );
const { JWT_KEY } = require( '../../config/server.config' );

const login = async ( user ) => {
  console.log( chalk.keyword( 'antiquewhite' )( '\nUser Login passed to login middleware....' ) );

  console.log( `username received: ${user.username} Password received: ${user.password}` );

  const validUser = await models.UserCredentials.authenticate( user.username, user.password );

  if ( validUser ) {
    console.log( `This is the user found for the login:\n ${validUser}` );

    const token = jwt.sign({ id: validUser.userID }, JWT_KEY, {
      expiresIn: 86400 // 24 hours
    });
    console.log( `\nThis is the token: ${token}` );
    return token;
  }
      console.log( `Error returning UserCredentials Token for ${user.username}` );
      throw new Error( 'Error logging in user' );

};

const needsAdditionalInfo = async ( user ) => {
  console.log( chalk.keyword( 'antiquewhite' )( '\nUser Login Passed to Check Additional Info' ) );

  const thisUser = await models.UserCredentials.findOne({
    username: user.username
  });
  console.log( `This is the userID found for the account:\n ${thisUser.userID}` );

  const thisUserInformation = await models.UserInformation.findOne({
    userID: thisUser.userID
  });

  console.log( `This is the user found for the login:\n ${thisUserInformation}` );

  if ( !thisUserInformation ) {
    console.log(
      chalk.keyword( 'grey' )( `\nUser's info not found, returning userID:\n${thisUser.userID}` )
    );
    return thisUser.userID;
  }

  return thisUserInformation;

};

module.exports = {
  login,
  needsAdditionalInfo
};
