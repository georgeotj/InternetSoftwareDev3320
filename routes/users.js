const mongoose = require( 'mongoose' );
const express = require( 'express' );
const userInformation = require( '../models/users-information' );

const router = express.Router();

/* POST users listing. */
router.post( '/sign_up', ( req, res, next ) => {
  console.log( 'POST:    %j', req.body );
  const user = new userInformation( req.body );
  user.userID = new mongoose.mongo.ObjectID();

  res.send( `Thanks for joining our site${req.body.fullname}!` );
  console.log( user );

  user.save().then( () => { console.log( 'MongoDB added the user to the database!' ); next(); })
    .catch( ( error ) => {
      return console.log( `MongoDB error adding user to database: ${error}` );
    });
});

module.exports = router;
