const express = require( 'express' );

const app = express();
const path = require( 'path' );

const cors = require( 'cors' );

const morgan = require( 'morgan' );

const compression = require( 'compression' );

const helmet = require( 'helmet' );

const router = express.Router();


const port = process.env.PORT || 3000;

// Log all request with morgan common
app.use( morgan( 'common' ) );

// Helmet has 9 API middlewares to prevent several attacks in HTTP
// Adds security to HTTP header
app.use( helmet() );
app.use( cors({

  // API will only allow client apps from the address: http://localhost:3000/
  origin: [ 'http://localhost:3000' ],

  // The Client Application can only request via GET and POST
  methods: [ 'GET', 'POST' ]
}) );

// Compress request so they're lighter and load faster, compacts JSON responses
// and static files.
app.use( compression() );

// Add .css and .js static files to the app
app.use( '/public', express.static( path.join( __dirname, '/public' ) ) );

// Add path to HTML file to the router
router.get( '/', ( request, response ) => {

  // __dirname: resolves to project folder
  // sendfile(): sends HTML files to the browser
  response.sendFile( path.join( __dirname, '/index.html' ) );
});

// Add the router to the application
app.use( '/', router );

// Set Server listening at PORT environment variable or 3000
// app.listen( port );
// eslint-disable-next-line no-console
console.log( 'Server listening on http://localhost:%s', port );

module.exports = app;
