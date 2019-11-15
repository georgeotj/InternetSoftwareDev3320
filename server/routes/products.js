const express = require( 'express' );
const productsDB = require( '../models/products' );

const router = express.Router();

router.get( '/get_products', ( request, response ) => {
    console.log( 'Attempting to get products from the database...' );

    productsDB.find({}).then( ( products ) => {
    console.log( 'Success, Sending the products from database as the response' );
    response.send({ products });
    console.log( 'GET /get_products Response:\n', JSON.stringify( products, null, 2 ) );
  });
});


module.exports = router;
