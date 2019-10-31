const express = require( 'express' );

const app = express();
const path = require( 'path' );

const cors = require( 'cors' );

const morgan = require( 'morgan' );

const compression = require( 'compression' );

const helmet = require( 'helmet' );

const router = express.Router();

const assets = require( 'connect-assets' );

const port = process.env.PORT || 3000;

// Log all request with morgan common
app.use( morgan( 'common' ) );

// Asset compiler and minimizer
app.use( assets({
  paths: [
    'public/stylesheets',
    'public/javascripts'
  ]
}) );

// Helmet has 9 API middleware to prevent several attacks in HTTP
// Adds security to HTTP header
app.use( helmet() );
app.use( cors({

  // API will ONLY allow client apps from the address: http://localhost:3000/
  origin: [ 'http://localhost:3000' ],

  // The Client Application can only request via GET and POST
  methods: [ 'GET', 'POST' ]
}) );

// Compress request so they're lighter and load faster, compacts JSON responses
// and static files.
app.use( compression() );

// Add .css and .js static files to the app
app.use( '/public', express.static( path.join( __dirname, '/public' ) ) );

// Set Application Settings
app.set( 'view engine', 'ejs' );
app.set( 'views', path.resolve( __dirname, 'views' ) );

// Add path to HTML file to the router
router.get( '/', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.render( 'index' );
});

// Add the router to the application
app.use( '/', router );

// Set Server listening at PORT environment variable or 3000
// app.listen( port );
// eslint-disable-next-line no-console
console.log( 'Server listening on http://localhost:%s', port );

module.exports = app;
