const express = require( 'express' );
const mongoose = require( 'mongoose' );
const models = require( '../models/' );

const router = express.Router();

router.post( '/new_order', ( request, response, next ) => {
  console.log( 'Attempting to add a new order to the database' );
  console.log( 'orders/new_order POST request body:\n',
    JSON.stringify( request.body, null, 2 ) );

  console.log( `User's Name for Order: ${request.body.userName}` );
  console.log( `User's Items for Order: ${request.body.items}` );
  console.log( `Price for User's Order: ${request.body.totalPrice}` );

  const findUserID = {
    getOrderRequestUserID: async ( userFullName ) => {
      try {
        const condition = { fullname: userFullName };
        const orderUser = await models.UserInformation.findOne( condition )
          .exec().then( ( userForOrder ) => {
            return userForOrder.userID;
          });
        console.log( `This is the UserID for this Order: ${orderUser}` );
        return orderUser;
      }catch ( error ) {
        console.log( `Error getting UserID for Order: ${error}` );
        return error;
      }
    }
  };

  const usersOrder = {

    createNewOrder() {
      findUserID.getOrderRequestUserID( request.body.userName ).then( ( userID ) => {
        const orderNumber = new mongoose.mongo.ObjectID();
        const { items } = request.body;
        const { totalPrice } = request.body;
        const orderInformation = {
          userID,
          orderNumber,
          items,
          totalPrice
        };

        const userOrder = new models.Orders( orderInformation );

        console.log( 'Attempting to add this Order Information to the Orders DB:' );
        console.log( userOrder );

        userOrder.save().then( () => {
          console.log( 'MongoDB added the user order to the database!' ); next();
        })
          .catch( ( error ) => {
            return console.log(
              `MongoDB error adding user order to the database: ${error}`
            );
          });
      });
    }
  };

  usersOrder.createNewOrder();
});


module.exports = router;
