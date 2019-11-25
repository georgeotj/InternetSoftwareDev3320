const express = require( 'express' );
const mongoose = require( 'mongoose' );
const chalk = require( 'chalk' );
const auth = require( '../controllers/users/user.auth.controller' );
const models = require( '../models/' );


const router = express.Router();

router.post( '/new_order', auth, ( req, res, next ) => {
  console.log( chalk.keyword( 'khaki' )( 'Now Starting users/billing_info POST ROUTE:\n',
    'This is an authorized only request route... Request Body:\n',
    JSON.stringify( req.body, null, 2 ) ) );

  console.log( `User's Name for Order: ${req.body.username}` );
  console.log( `User's Items for Order: ${req.body.items}` );
  console.log( `Price for User's Order: ${req.body.totalPrice}` );

  console.log( chalk.keyword( 'cyan' )( `          Username: ${req.body.username}` ) );
  console.log( chalk.keyword( 'cyan' )( `    Decoded UserID: ${req.user._id}` ) );

  const orderNumber = new mongoose.mongo.ObjectID();
  const { items } = req.body;
  const { totalPrice } = req.body;
  const orderInformation = {
        userID: req.user._id,
        orderNumber,
        items,
        totalPrice
  };

  const userOrder = new models.Orders( orderInformation );

  console.log( 'This is the User\'s Order in Mongoose Schema Format:\n' );
  console.log( userOrder );

  userOrder.save().then( () => {
    console.log( '\nMongoDB added the user order to the database!' );
    res.send(
      // eslint-disable-next-line max-len
      `Your order was placed successfully! Order number: ${orderNumber}, an email will be sent to you with a receipt`
    );
    next();
  })
    .catch( ( error ) => {
      return console.log(
        `MongoDB error adding user order to the database: ${error}`
      );
    });
});


module.exports = router;
// const findUserID = {
//   getOrderRequestUserID: async ( userFullName ) => {
//     try {
//       const condition = { fullname: userFullName };
//       const orderUser = await models.UserInformation.findOne( condition )
//         .exec().then( ( userForOrder ) => {
//           return userForOrder.userID;
//         });
//       console.log( `This is the UserID for this Order: ${orderUser}` );
//       return orderUser;
//     }catch ( error ) {
//       console.log( `Error getting UserID for Order: ${error}` );
//       return error;
//     }
//   }
// };
//
// const usersOrder = {
//
//   createNewOrder() {
//     findUserID.getOrderRequestUserID( request.body.userName ).then( ( userID ) => {
//       const orderNumber = new mongoose.mongo.ObjectID();
//       const { items } = request.body;
//       const { totalPrice } = request.body;
//       const orderInformation = {
//         userID,
//         orderNumber,
//         items,
//         totalPrice
//       };
//
//       const userOrder = new models.Orders( orderInformation );
//
//       console.log( 'Attempting to add this Order Information to the Orders DB:' );
//       console.log( userOrder );
//
//       userOrder.save().then( () => {
//         console.log( 'MongoDB added the user order to the database!' ); next();
//       })
//         .catch( ( error ) => {
//           return console.log(
//             `MongoDB error adding user order to the database: ${error}`
//           );
//         });
//     });
//   }
// };
//
// usersOrder.createNewOrder();
