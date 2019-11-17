const express = require( 'express' );
const productsDB = require( '../models/products' );

const router = express.Router();

router.get( '/get_products', ( request, response ) => {

    let logProducts;

    productsDB.find({}).then( ( products ) => {
    // console.log( 'Success, Sending the products from database as the response' );
      logProducts = products;
      response.send({ products });
    // console.log( 'GET /get_products Response:\n', JSON.stringify( products, null, 2 ) );
  }).then( () => {
        console.log( 'Success, Sending the products from database as the response' );
        console.log( 'Server Response to GET /get_products:\n',
          JSON.stringify( logProducts, null, 2 ) );
    })
      .catch( ( error ) => {
        throw error;
      });
});


module.exports = router;
