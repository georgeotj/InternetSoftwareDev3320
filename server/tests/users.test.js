const request = require( 'supertest' );
const { expect } = require( 'chai' );
const app = require( '../app' );
const { userInformation, userCredentials } = require( '../models' );
