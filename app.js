const express = require( 'express' );

const app = express();
const path = require( 'path' );



const port = process.env.PORT || 3000;

const router = express.Router();

// Add path to HTML file to the router
router.get( '/', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/index.html' ) );
});

router.get( '/public/stylesheets/style.css', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/public/stylesheets/style.css' ) );
});

router.get( '/public/stylesheets/style.css', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/public/stylesheets/style.css' ) );
});

router.get( '/public/javascripts/back-to-top-button.js', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/public/javascripts/back-to-top-button.js' ) );
});

router.get( '/public/javascripts/account-form-validation.js', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/public/javascripts/account-form-validation.js' ) );
});

router.get( '/public/javascripts/checkout-form-validation.js', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/public/javascripts/checkout-form-validation.js' ) );
});

router.get( '/public/javascripts/shipping-form-validation.js', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/public/javascripts/shipping-form-validation.js' ) );
});

router.get( '/public/javascripts/shopping-cart.js', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/public/javascripts/shopping-cart.js' ) );
});





// Add .css and .js static files to the app
// app.use( '/style.css', express.static( path.join( __dirname, '/public/stylesheets' ) ) );
// app.use( express.static( path.join( __dirname, '/public/javascripts/' ) ) );
app.use( express.static( 'C:\\Users\\Trevor\\Web_Development\\InternetSoftwareDev3320\\public' ) );

// Add the router to the application
app.use( '/', router );

// Set Server listening at PORT environment variable or 3000
app.listen( port );
// eslint-disable-next-line no-console
console.log( 'Server listening on http://localhost:%s', port );
