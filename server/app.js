const express = require( 'express' );

const path = require( 'path' );

const cors = require( 'cors' );

const morgan = require( 'morgan' );

const errorHandler = require( 'errorhandler' );

// const session = require( 'express-session' );
// const MongoStore = require( 'connect-mongo' )( session );

const compression = require( 'compression' );

const helmet = require( 'helmet' );

const cookieParser = require( 'cookie-parser' );

// const router = express.Router();

const assets = require( 'connect-assets' );

/** @member {Object} */
const chalk = require( 'chalk' );

const webpack = require( 'webpack' );

const PrettyError = require( 'pretty-error' );

const bodyParser = require( 'body-parser' );
const winston = require( 'winston' );

const expressWinston = require( 'express-winston' );

const webpackConfig = require( '../docs/archive/webpack.server.config' );

const mongoDB = require( './config/database' );

const models = require( './models' );

const users = require( './routes/users' );
const products = require( './routes/products' );
const orders = require( './routes/orders' );

// const httpLogger = require( './config/httpLogger' );
const router = require( './routes/index' );


const expressLogger = require( './config/logger.js' );

const logger = require( '../docs/archive/logger' );

const compiler = webpack( webpackConfig );

const DIST_DIR = path.normalize( `${__dirname}/..` );

const STATIC_MIDDLEWARE = express.static( 'dist' );

const port = process.env.PORT || 3000;

const { SESS_NAME, SESS_SECRET, SESS_LIFETIME } = require( './config/server.config' );

const app = express();

// eslint-disable-next-line import/order
// const webpackDevMiddleware = require( 'webpack-dev-middleware' )(
//   compiler,
//   webpackConfig.devServer
// );

// eslint-disable-next-line import/order
// const webpackHotMiddleware = require( 'webpack-hot-middleware' )( compiler );

// Hide that we're using express. The less hackers know the better
app.disable( 'x-powered-by' );

// Log all request with morgan common
// app.use( morgan( 'combined', { stream: logger.stream }) );

// Standard is to only log in development environment
app.use( errorHandler({
  dumpExceptions: true,
  showStack: true
}) );

app.use( cookieParser() );

// app.use( webpackDevMiddleware );

// Must use after DevMiddleware, but before static middleware
// app.use( webpackHotMiddleware );

// Asset compiler and minimizer
app.use( assets({
  paths: [
    'public/stylesheets',
    'public/javascripts'
  ]
}) );

app.use( STATIC_MIDDLEWARE );

// Use the body-parser middleware in the app
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );


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

app.use( expressLogger );

// Add .css and .js static files to the app
app.use( express.static( path.join( DIST_DIR, '/public' ) ) );
app.use( '/dist', express.static( path.join( DIST_DIR, '/dist' ) ) );


// Set Application Settings
app.set( 'view engine', 'ejs' );
app.set( 'views', path.resolve( __dirname, 'views' ) );

// Add the database to the application
const mongoConnection = mongoDB( ( error ) => {
  if ( error ) {
    console.log( `MongoDB event error: ${error}` );
    process.exit( 1 );
  }
});


// Add the router to the application
app.use( '/', router );
app.use( '/users', users );
app.use( '/products', products );
app.use( '/orders', orders );


app.use( expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}) );

process.once( 'unhandledRejection', ( err ) => {
  console.log( 'UNHANDLED_REJECTION: ', err.stack.toString() );
  process.exit( 1 );
});

process.once( 'uncaughtException', ( err ) => {
  console.log( 'UNHANDLED_EXCEPTION: ', err.stack.toString() );
  process.exit( 1 );
});


// Set Server listening at PORT environment variable or 3000
app.listen( port );
// eslint-disable-next-line no-console
console.log( 'Server listening on [http://localhost:%s]', port );
console.log( 'or listening on [http://localhost:8080/debug?port=3000] for debugger' );

const errors = new PrettyError();

app.use( ( err, req, res, next ) => {
  console.log( errors.render( err ) );
  next();
});

errors.skipNodeFiles();
errors.skipPackage( 'express' );

module.exports = app;
