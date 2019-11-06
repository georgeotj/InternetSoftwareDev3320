const express = require( 'express' );

const router = express.Router();

/* POST users listing. */
router.post( '/users/sign_up', ( req, res, next ) => {
  res.send( 'respond with a resource' );
});

module.exports = router;
