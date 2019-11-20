const assert = require( 'assert' );
const { expect } = require( 'chai' );
const chalk = require( 'chalk' );
const request = require( 'supertest' );
const app = require( '../server/app' );

// Describe what the unit test will do using describe
describe( 'Unit testing the / route', () => {

  it( 'should return OK status', () => {
    return request( app )
      // used SuperTest to make the HTTP call to / route
      .get( '/' )
      .then( ( response ) => {
        assert.strictEqual( response.status, 200 );
      });
  });

  it( 'should return message on rendering', () => {
    return request( app )
      .get( '/' )
      .then( ( response ) => {
        expect( response.body ).contain( 'Application View' );
      });
  });

});
