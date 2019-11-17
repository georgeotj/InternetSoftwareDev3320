// const { createLogger, transports, format } = require( 'winston' );
const winston = require( 'winston' );
require( 'winston-daily-rotate-file' );

const { format } = winston;

const {
 label, combine, timestamp, prettyPrint, colorize
} = format;

const options = {
  file: {
    level: process.env.ENV === 'development' ? 'debug' : 'info',
    filename: './%DATE%-logsDemo.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxsize: 5242880, // 5MB
    colorize: true
  }
};

const logLevels = {
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
    error: 'orange',
    warning: 'yellow',
    info: 'green',
    debug: 'blue',
    trace: 'gray'
  }
};

winston.addColors( logLevels );

const transport = new winston.transports.Console({
  colorize: true,
  format: winston.format.prettyPrint(),
  json: true
});

// createLogger function creates a new logger
const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  // add timestamp to logs and define formatting options
  format: combine(
    timestamp(),
    prettyPrint(),
    colorize()
  ),
  transports: [
    // Display the log in the console.
    transport
    // Writes logs to file
    // new transports.DailyRotateFileTransport( options.file )
  ],
  // Handled exceptions won't cause process.exit
  exitOnError: false
});

logger.stream = {
  write: ( info ) => {
    logger.info( info );
  }
};

module.exports = logger;
