const mongoose = require( 'mongoose' );
const express = require( 'express' );
const chalk = require( 'chalk' );
const bcrypt = require( 'bcrypt' );
const models = require( '../models' );
const auth = require( '../controllers/users/user.auth.controller' );
const { login, needsAdditionalInfo } = require( '../controllers/users/user.login.controller' );

const { register, generateAuthToken } = require( '../controllers/users/user.register.controller' );

const { toggleUserInformationStatus } = require(
  '../controllers/users/user-information.controller'
  );

const router = express.Router();

/* POST users listing. */
router.post( '/additional_info', auth, async ( req, res, next ) => {
  console.log( chalk.yellow( '\nNow Starting users/additional_info POST ROUTE:\n',
    'This is an authorized only request route... Request Body:\n',
    JSON.stringify( req.body, null, 2 ) ) );

  console.log(
    chalk.keyword( 'orange' )( 'Authenticating: "userID" vs "Decoded JWT userID":\n' )
  );
  console.log( chalk.keyword( 'cyan' )( `            UserID: ${req.body.userID}` ) );
  console.log( chalk.keyword( 'cyan' )( `    Decoded UserID: ${req.user._id}` ) );

  if ( req.body.userID === ( req.user._id || req.user.id ) ) {
    console.log( chalk.keyword( 'green' )( '\nThis User is Authentic!!' ) );
    console.log( '\n\nStarting Attempt to Save User\'s additional information...' );
    const user = new models.UserInformation( req.body );

    console.log(
      chalk.keyword( 'white' )( '\nThe Additional Information in Mongoose Schema Format:\n' )
    );
    console.log( user );
    await toggleUserInformationStatus( user );

    user.save()
      .then( () => {
        console.log( '\nMongoDB added the user additional information to the database!' );
        res.send( 'Your Registration is Complete! You can now Place an Order' );
        console.log(
          chalk.keyword( 'red' )( '\nThe Authorized only "users/additional_info" Route is now' +
            ' complete... Moving onto next Route/middleware.\n\n' )
        );
        next();
      })
      .catch( ( error ) => {
        res.send( '\nThere was an Error Registering Additional Information' );
        return console.log( `MongoDB error adding user to database: ${error}` );
      });
  }

});

router.post( '/billing_info', auth, ( req, res, next ) => {
  console.log( chalk.keyword( 'darkseagreen' )( 'Now Starting users/billing_info POST ROUTE:\n',
    'This is an authorized only request route... Request Body:\n',
    JSON.stringify( req.body, null, 2 ) ) );

  console.log( chalk.keyword( 'cyan' )( `          Username: ${req.body.username}` ) );
  console.log( chalk.keyword( 'cyan' )( `    Decoded UserID: ${req.user.id}` ) );


    const billingInformation = {
      userID: req.user.id,
      cardType: req.body.cardType,
      cardName: req.body.cardName,
      cardNumber: req.body.cardNumber,
      expDate: req.body.expDate,
      CVV: req.body.CVV
    };

    const userBilling = new models.PaymentInformation( billingInformation );

    console.log( 'This is the user billing information in Mongoose Schema Form:\n' );
    console.log( userBilling );

    userBilling.save()
      .then( () => {
        console.log( 'MongoDB added the user billing information to the database!' );
        res.send( 'Your Payment Information was Accepted!' );
        next();
      })
      .catch( ( error ) => {
        return console.log(
          `MongoDB error adding user billing information to database: ${error}`
        );
      });
});

router.post( '/shipping_info', auth, ( req, res, next ) => {
  console.log( chalk.keyword( 'tan' )( 'Now Starting users/shipping_info POST ROUTE:\n',
    'This is an authorized only request route... Request Body:\n',
    JSON.stringify( req.body, null, 2 ) ) );

  console.log( chalk.keyword( 'cyan' )( `          Username: ${req.body.username}` ) );

  let decodedUserID;

  if ( req.user._id ) {
    decodedUserID = req.user._id;
    console.log( chalk.keyword( 'cyan' )( `    Decoded UserID: ${req.user._id}` ) );
  }
  if ( req.user.id ) {
    decodedUserID = req.user.id;
    console.log( chalk.keyword( 'cyan' )( `    Decoded UserID: ${req.user.id}` ) );
  }


  const shippingInformation = {
    userID: decodedUserID,
    shipping_address1: req.body.shipping_address1,
    shipping_address2: req.body.shipping_address2,
    shipping_city: req.body.shipping_city,
    shipping_state: req.body.shipping_state,
    shipping_zipcode: req.body.shipping_zipcode
  };

  const userShipping = new models.ShippingInformation( shippingInformation );

  console.log( '\nThis is the User Shipping Information in Mongoose Schema Form\n:' );
  console.log( userShipping );

  userShipping.save()
    .then( () => {
      console.log( 'MongoDB added the user shipping information to the database!' );
      res.send( `Your shipping address has been updated ${req.body.username}!` );
      next();
    })
    .catch( ( error ) => {
      return console.log(
        `MongoDB error adding user billing information to database: ${error}`
      );
    });


});

// Route to create a new user
router.post( '/register', async ( req, res, next ) => {
  console.log(
    chalk.keyword( 'orange' )( '\nNow Starting "users/register POST ROUTE:' )
  );
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  console.log( `username received: ${user.username} Password received: ${user.password}` );

  if ( !user.username || !user.password ) {
    console.log( 'Error Registering User to Database, no username or password from request' );
    return res.status( 400 )
      .json({ msg: 'Error processing request properties' });
  }

  const createdUser = await register( user );
  console.log(
    chalk.keyword( 'orange' )( 'Now Moving onto Generating a JWT Token for the user...' )
  );
  const token = await generateAuthToken( createdUser.userID );
  console.log(
    chalk.keyword( 'orange' )( '\n"users/register" Route Complete, sending JWT in response header' )
  );

  res.header( 'x-auth-token', token )
    .send({
      userID: createdUser.userID,
      username: createdUser.username,
      token
    });

  next();
  //   await user.save();
  //   const token = await user.generateAuthToken();
  //   res.status( 201 ).send({
  //       user, token
  //   });
  // } catch ( error ) {
  //   res.status( 400 ).send( error );
  // }
});

router.post( '/login', async ( req, res, next ) => {
  console.log( chalk.keyword( 'ivory' )( 'Now Starting users/login POST ROUTE:\n',
    'This is an authorized only request route... Request Body:\n',
    JSON.stringify( req.body, null, 2 ) ) );

  const user = {
    username: req.body.username,
    password: req.body.password
  };
  console.log( `username received: ${user.username} Password received: ${user.password}` );

  const userToken = await login( user );

  const getAdditionalInfo = await needsAdditionalInfo( user );

  console.log(
    // eslint-disable-next-line max-len
    chalk.keyword( 'tomato' )( `\n"This is the additional information found for the user\n${getAdditionalInfo}` )
  );

  console.log(
    chalk.keyword( 'orange' )( '\n"users/Login" Route Complete!, sending JWT in response header' )
  );

  if ( !getAdditionalInfo.fullname ) {
    res.header( 'x-auth-token', userToken )
      .send({
        userID: getAdditionalInfo,
        username: req.body.username,
        additionalInfoRequired: true,
        token: userToken
      });
    next();
  }
  if ( getAdditionalInfo.fullname ) {
    res.header( 'x-auth-token', userToken )
      .send({
        userID: getAdditionalInfo.userID,
        username: req.body.username,
        additionalInfoRequired: false,
        token: userToken,
        fullname: getAdditionalInfo.fullname,
        user_phone: getAdditionalInfo.user_phone,
        user_email: getAdditionalInfo.user_email,
        user_address1: getAdditionalInfo.user_address1,
        user_address2: getAdditionalInfo.user_address2,
        user_city: getAdditionalInfo.user_city,
        user_state: getAdditionalInfo.user_state,
        user_zipcode: getAdditionalInfo.user_zipcode
      });
    next();
  }
  next();
});

// Pass the auth controller right before the method. This ensures controller is run
// just before executing the rest of the function.
router.post( '/profile', auth, async ( req, res ) => {
  // View logged in user profile

  // get the user from the request ( added user to the request in auth controller )
  res.send( req.user );
});


router.post( '/account/logout', auth, async ( req, res ) => {
  console.log(
    chalk.keyword( 'violet' )( '\nNow Starting "users/account/logout POST ROUTE:' )
  );

  // Log user out of the application
  try {
    // Get array of all tokens NOT used by the user to login
    const usersInformation = await models.UserInformation.findOne({
      userID: req.body.userID
    });

    console.log(
      chalk.keyword( 'plum' )( `\nUserInformation for this logout:\n ${usersInformation}` )
    );

    const user = await models.UserCredentials.findOne({
      userID: req.body.userID
    });

    console.log(
      chalk.keyword( 'orchid' )( `\nUser for this logout:\n ${user}` )
    );

    console.log(
      chalk.keyword( 'blueviolet' )( '\n\nSaving the above information before logging out...' )
    );

    if ( usersInformation ) {
      await usersInformation.save();
    }
    await user.save();

    res.send( 'Logout Successful!! Thanks for your business' );

    console.log(
      chalk.keyword( 'mediumpurple' )( '\nusers/account/logout route is now complete!' )
    );
  } catch ( error ) {
    res.status( 500 )
      .send( error );
  }
});

router.post( '/profile/logoutall', auth, async ( req, res ) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice( 0, req.user.tokens.length );
    await req.user.save();
    res.send();
  }catch ( error ) {
    res.status( 500 )
      .send( error );
  }
});
module.exports = router;


// const userInformation = {
//   getSaveShippingRequestUserID: async ( userFullName ) => {
//     try {
//       const condition = { fullname: userFullName };
//       const shippingUser = await models.UserInformation.findOne( condition )
//         .exec()
//         .then( ( userForShipping ) => {
//           return userForShipping.userID;
//         });
//       console.log( `This is the UserInfo for this ShippingInfo: ${shippingUser}` );
//       return shippingUser;
//     }catch ( error ) {
//       console.log( `Error getting UserID for ShippingInfo: ${error}` );
//       return error;
//     }
//   }
// };
//
// const userShippingInformation = {
//
//   setShippingInformation() {
//     userInformation.getSaveShippingRequestUserID( req.body.userFullName ).then( ( userID ) => {
//       const shippingInformation = {
//         userID,
//         shipping_address1: req.body.shipping_address1,
//         shipping_address2: req.body.shipping_address2,
//         shipping_city: req.body.shipping_city,
//         shipping_state: req.body.shipping_state,
//         shipping_zipcode: req.body.shipping_zipcode
//       };
//
//       const userShipping = new models.ShippingInformation( shippingInformation );
//
//       console.log( 'Attempting to add this shippingInformation to the DB:' );
//       console.log( userShipping );
//
//       userShipping.save().then( () => {
//         console.log( 'MongoDB added the user shipping information to the database!' );
//         res.send( `Your shipping address has been updated ${req.body.fullname}!` );
//         next();
//       })
//         .catch( ( error ) => {
//           return console.log(
//             `MongoDB error adding user billing information to database: ${error}`
//           );
//         });
//     });
//   }
// };
// userShippingInformation.setShippingInformation();
