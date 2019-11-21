const winston = require( 'winston' );
const expressWinston = require( 'express-winston' );

const config = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  colors: {
    fatal: 'red',
    error: 'yellow',
    warning: 'blue',
    info: 'green',
    debug: 'blue',
    trace: 'gray'
  }
};

winston.addColors( config.colors );

const consoleTransport = new winston.transports.Console();
const colorizer = winston.format.colorize();

const logger = winston.createLogger({
  transports: [
    consoleTransport
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.align(),
    winston.format.simple()
    ),
  levels: config.levels
});

expressWinston.requestWhitelist.splice( 0 );
expressWinston.requestWhitelist = [ 'url', 'body' ];
expressWinston.responseWhitelist.splice( 0 );
expressWinston.responseWhitelist = [ 'url', 'body' ];

const expressLogger = expressWinston.logger({
  transports: [
    consoleTransport
  ],
  // meta: true,
  expressFormat: true,
  colorStatus: true,
  colorize: true,
  msg: `HTTP {{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms \n
    Request Body: \n
    {{req.body}} +
    Response Body: \n
    {{res.body}}`,
  ignoreRoute ( req, res ) { return false; },
  // requestFilter ( req, propName ) { return req[ propName ]; },
  ignoredRoutes: [ '/__webpack_hmr' ],
  dynamicMeta ( req, res, err ) {
    return {
      body: JSON.stringify( req.body ),
      FROM: req.originalUrl,
      responseBody: res.body
    };
  },
  winstonInstance: logger // The magic!
});


module.exports = expressLogger;
