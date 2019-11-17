const $ = require( 'jquery' );


$( window ).on( 'unload', () => {

  console.warn( 'Page is being closed' );

  const URL = '/closing';

  navigator.sendBeacon( URL );

});
