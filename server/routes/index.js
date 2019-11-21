const express = require( 'express' );
/** @member {Object} */
const chalk = require( 'chalk' );
const moment = require( 'moment' );
const models = require( '../models' );

const router = express.Router();

router.post( '*', ( req, res, next ) => {

  if ( req.originalUrl !== '/__webpack_hmr' ) {
    console.log( chalk.yellow( `A POST Request was Made To: ${req.originalUrl}` ) );
  }

  return next();
});

router.get( '*', ( req, res, next ) => {
  const timestamp = moment().format( 'hh:mm:ss' );
  if ( ( req.originalUrl !== '/__webpack_hmr' ) && ( req.originalUrl !== '/' ) ) {
    console.log(
      chalk.blue( `A GET Request was Received For: ${req.originalUrl} at ${timestamp}` )
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
    console.log( chalk.green( 'Application Page Change was Requested' ) );
  }
  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.render( 'index' );
  // response.send( 'Sent the Application View' );
});


router.get( '/states', ( request, response ) => {
  models.States.find({}).then( ( states ) => {
    console.log( 'Sending states response' );
    response.send({ states });

    // console.log( 'GET /states Response:\n', JSON.stringify( states, null, 2 ) );
  });
});

router.post( '/closing', ( request, response ) => {
  console.log( chalk.red.bold( 'The Last Requested App View was CLOSED' ) );

    // console.log( 'GET /states Response:\n', JSON.stringify( states, null, 2 ) );
});
module.exports = router;
