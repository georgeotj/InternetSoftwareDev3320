const mongoose = require( 'mongoose' );
const chalk = require( 'chalk' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const models = require( '../../models' );
const { JWT_KEY } = require( '../../config/server.config' );

const toggleUserInformationStatus = async ( user ) => {
  console.log( chalk.keyword( 'antiquewhite' )( '\nUser Info Passed to toggleInformationStatus' ) );
  await models.UserCredentials.updateOne({ userID: `${user.userID}` },
    {
      additionalInfoRequired: false
    });
};

module.exports = {
  toggleUserInformationStatus
};
