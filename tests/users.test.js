const request = require( 'supertest' );
const { expect } = require( 'chai' );
const app = require( '../server/app' );
const { userInformation, userCredentials } = require( '../server/models' );
