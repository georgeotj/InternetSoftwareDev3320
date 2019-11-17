const stream = require( 'stream' );

const morgan = require( 'morgan' );
const { logger } = require( './logger' );

module.exports = class httpLogger {
  write( message ) {
    logger.info(
        message.substring( 0, message.lastIndexOf( '\n' ) )
      );
  }
};

// module.exports = morgan(
//   ':method :url :status :response-time ms - :res[content-length]',
//   { stream: logger.stream }
// );
