const mongoose = require( 'mongoose' );
const express = require( 'express' );
const models = require( '../models' );


const router = express.Router();

/* POST users listing. */
router.post( '/sign_up', ( req, res, next ) => {
  console.log( 'users/sign_up POST Request:\n',
    JSON.stringify( req.body, null, 2 ) );
  const user = new models.UserInformation( req.body );
  user.userID = new mongoose.mongo.ObjectID();

  res.send( `Thanks for joining our site ${req.body.fullname}!` );
  console.log( user );

  user.save().then( () => { console.log( 'MongoDB added the user to the database!' ); next(); })
    .catch( ( error ) => {
      return console.log( `MongoDB error adding user to database: ${error}` );
    });
});

router.post( '/billing_info', ( req, res, next ) => {
  console.log( 'users/billing_info POST request body:\n',
    JSON.stringify( req.body, null, 2 ) );
  console.log( `User's Name: ${req.body.userFullName}` );

  const userInformation = {
    getPaymentInfoRequestUserID: async ( userFullName ) => {
      try {
        const condition = { fullname: userFullName };
        const billingUser = await models.UserInformation.findOne( condition )
          .exec().then( ( userForBilling ) => {
            return userForBilling.userID;
          });
        console.log( `This is the UserInfo for this PaymentInfo: ${billingUser}` );
        return billingUser;
      }catch ( error ) {
        console.log( `Error getting UserID for PaymentInfo: ${error}` );
        return error;
      }
    }
  };
  const userPaymentInformation = {

    setPaymentInformation() {
      userInformation.getPaymentInfoRequestUserID( req.body.userFullName ).then( ( userID ) => {
        const billingInformation = {
          userID,
          cardType: req.body.cardType,
          cardName: req.body.cardName,
          cardNumber: req.body.cardNumber,
          expDate: req.body.expDate,
          CVV: req.body.CVV
        };

        const userBilling = new models.PaymentInformation( billingInformation );

        console.log( 'Attempting to add this paymentInformation to the DB:' );
        console.log( userBilling );

        userBilling.save().then( () => {
          console.log( 'MongoDB added the user billing information to the database!' ); next();
        })
          .catch( ( error ) => {
            return console.log(
              `MongoDB error adding user billing information to database: ${error}`
            );
          });
      });
    }
  };

  userPaymentInformation.setPaymentInformation();
});

router.post( '/shipping_info', ( req, res, next ) => {
  console.log( 'users/shipping_info POST request body:\n',
    JSON.stringify( req.body, null, 2 ) );

  const userInformation = {
    getSaveShippingRequestUserID: async ( userFullName ) => {
      try {
        const condition = { fullname: userFullName };
        const shippingUser = await models.UserInformation.findOne( condition )
          .exec().then( ( userForShipping ) => {
            return userForShipping.userID;
          });
        console.log( `This is the UserInfo for this ShippingInfo: ${shippingUser}` );
        return shippingUser;
      }catch ( error ) {
        console.log( `Error getting UserID for ShippingInfo: ${error}` );
        return error;
      }
    }
  };

  const userShippingInformation = {

    setShippingInformation() {
      userInformation.getSaveShippingRequestUserID( req.body.userFullName ).then( ( userID ) => {
        const shippingInformation = {
          userID,
          shipping_address1: req.body.shipping_address1,
          shipping_address2: req.body.shipping_address2,
          shipping_city: req.body.shipping_city,
          shipping_state: req.body.shipping_state,
          shipping_zipcode: req.body.shipping_zipcode
        };

        const userShipping = new models.ShippingInformation( shippingInformation );

        console.log( 'Attempting to add this shippingInformation to the DB:' );
        console.log( userShipping );

        userShipping.save().then( () => {
          console.log( 'MongoDB added the user shipping information to the database!' );
          res.send( `Your shipping address has been updated ${req.body.fullname}!` );
          next();
        })
          .catch( ( error ) => {
            return console.log(
              `MongoDB error adding user billing information to database: ${error}`
            );
          });
      });
    }
  };

  userShippingInformation.setShippingInformation();
});

module.exports = router;
