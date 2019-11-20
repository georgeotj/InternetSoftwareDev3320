const mongoose = require( './mongoose-promise' );
const config = require( './server.config.js' );

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  reconnectTries: 30,
  reconnectInterval: 800
};

module.exports = ( cb ) => {
  const mongoDBurl = `mongodb://${config.MONGO_DB_HOST}:${config.MONGO_DB_PORT}/${config.MONGO_DB_DATABASE}`;

  console.log( 'Starting Connection to MongoDB at: %s\n', mongoDBurl );


  mongoose.connect( mongoDBurl, mongooseOptions ).then( () => {
    return console.log( 'MongoDB connected [%s]', mongoDBurl );
})
    .catch( ( error ) => { cb( error ); return console.log( `MongoDB event error: ${error}` ); });

  mongoose.connection.on( 'connected', () => {
    console.log( 'MongoDB event connected' );
  });

  mongoose.connection.on( 'disconnected', () => {
    console.log( 'MongoDB event disconnected' );
  });

  mongoose.connection.on( 'reconnected', () => {
    console.log( 'MongoDB event reconnected' );
  });

  mongoose.connection.on( 'error', ( err ) => {
    console.log( `MongoDB event error: ${err}` );
  });

  return mongoose;
};
