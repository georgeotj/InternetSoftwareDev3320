const express = require( 'express' );
/** @member {Object} */
const chalk = require( 'chalk' );
const moment = require( 'moment' );
const models = require( '../models' );

const router = express.Router();

router.post( '*', ( req, res, next ) => {

  if ( req.originalUrl !== '/__webpack_hmr' ) {
    console.log(
      chalk.yellow.bold( `             \nA POST Request was Received For: ${req.originalUrl}` )
    );
    console.log( chalk.yellow( 'This is the request\'s body:\n',
      JSON.stringify( req.body, null, 2 ) ) );
    console.log( ' ' );
  }

  return next();
});

router.get( '*', ( req, res, next ) => {
  const timestamp = moment().format( 'hh:mm:ss' );
  if ( ( req.originalUrl !== '/__webpack_hmr' ) && ( req.originalUrl !== '/' ) ) {
    console.log(
      chalk.blue( `        \nA GET Request was Received For: ${req.originalUrl} at ${timestamp}` )
    );
  }
  // logger.log({
  //   message: 'Request received',
  //   level: 'info',
  //   transationId: 'request',
  //   correlationId: req.originalUrl,
  //   operation: 'log request'
  // });
  return next();
});

let isViewLoaded = false;

// Add path from EJS file to the router
router.get( '/', ( request, response ) => {

  if ( isViewLoaded === false ) {
    console.log( chalk.green.bold( '\t\t\tThe Application VIEW was Requested!!' ) );
    isViewLoaded = true;
  } else {
    console.log( chalk.green( '\nApplication Page Change was Requested' ) );
  }
  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.render( 'index' );
  // response.send( 'Sent the Application View' );
});


router.get( '/states', ( request, response ) => {
  models.States.find({}).then( ( states ) => {
    console.log(
      chalk.keyword( 'pink' )( '\nSENDING Response to Request for States!\n' )
    );
    response.send({ states });

    console.log(
      chalk.keyword( 'red' )( '\nSuccess! GET "/states" Route is Now Complete. Moving onto' +
        ' next Route/Middleware...' )
    );

    // console.log( 'GET /states Response:\n', JSON.stringify( states, null, 2 ) );
  });
});

router.post( '/closing', ( request, response ) => {
  console.log( chalk.red.bold( 'The Last Requested App View was CLOSED' ) );

    // console.log( 'GET /states Response:\n', JSON.stringify( states, null, 2 ) );
});
module.exports = router;
