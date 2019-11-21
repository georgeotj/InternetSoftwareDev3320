const assert = require( 'assert' );
// const { expect, should } = require( 'chai' );
const chalk = require( 'chalk' );
const request = require( 'supertest' );
const app = require( '../app' );

// Describe what the unit test will do using describe
describe( 'Unit testing the initial / route', function commonRoutes() {

  it( 'should return OK status', function returnStatusOK() {
    return request( app )
      // used SuperTest to make the HTTP call to / route
      .get( '/' )
      .then( ( response ) => {
        assert.strictEqual( response.status, 200 );
      });
  });

  it( 'should return message on rendering', function returnRenderingMessage() {
    request( app )
      .get( '/' )
      .expect( 'Content-Type', '/html/' )
      .end( ( err, res ) => {
        if ( err ) { throw err; }
      });
  });

});
