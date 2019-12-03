const jwt = require( 'jsonwebtoken' );
const chalk = require( 'chalk' );
const models = require( '../../models' );
const { JWT_KEY } = require( '../../config/server.config' );

const auth = async( req, res, next ) => {
  console.log( chalk.keyword( 'dodgerblue' )( '\nStarting Authentication Middleware' ) );

  console.log(
    chalk.keyword( 'deepskyblue' )( '\nThe incoming request has this request header:\n',
      JSON.stringify( req.headers, null, 2 ) )
  );
  // Get the token from the request header...
  // token comes in format: Bearer["space"]token, replace with '' so it's just token
  const token = req.header( 'Authorization' ).replace( 'Bearer ', '' );

  if ( !token ) {
    const secondToken = req.headers[ 'x-access-token' ];
    console.log( `First attempt to get token failed, here's other way: ${secondToken}` );
  }

  if ( token ) {
    console.log( `This is the JWT Token from the request: ${token}\n` );
  }

  // use JWT verify method to see if token received is valid or was created with this JWT_KEY
  // JWT verify method returns the payload that was used to create the token.
  const decoded = jwt.verify( token, JWT_KEY );

  console.log(
    chalk.keyword( 'deepskyblue' )( '\nThis is the decoded user verified for the jwt:\n',
      JSON.stringify( decoded, null, 2 ) )
  );

  try {
    // with the payload from the token, find a user with that id, also where token is in user's
    // token array

    let user;

    if ( decoded._id ) {
      user = await models.UserCredentials.findOne({
        userID: decoded._id
      });
    } else if ( decoded.id ) {
      user = await models.UserCredentials.findOne({
        userID: decoded.id
      });
    } else {
      console.log( '\nCan\'t Find The Fucking Decoded ID' );
    }


    // Handle an error if a user is not returned
    if ( !user ) {
      throw new Error( 'Error finding user with JWT and Tokens' );
    }
    console.log( chalk.keyword( 'deepskyblue' )( `Decoded User found for THIS token:\n ${user}` ) );

    console.log( chalk.keyword( 'cyan' )( `          Username: ${req.body.username}` ) );
    console.log( chalk.keyword( 'cyan' )( `    Decoded UserID: ${user.username}` ) );
    // // Attach found user and token onto request
    req.user = decoded;
    // req.token = token;
    console.log(
      chalk.keyword( 'lightblue' )( '\nThe Decoded User is Now Attached to This Request.' +
        ' Authentication Middleware is Complete', req.user )
    );
    // // Move onto next middleware
    next();
  } catch ( error ) {
    res.status( 401 ).send({ error: 'Not authorized to access this resource' });
    console.log( chalk.keyword( 'purple' )( error ) );
  }

};

module.exports = auth;
