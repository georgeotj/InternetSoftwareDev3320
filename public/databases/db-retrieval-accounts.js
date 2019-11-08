 const mongoose = require( 'mongoose' );

const db = mongoose.connect( 'mongodb://localhost:27017/sister', ( err ) => {
    if ( err ) { throw err; }
});

mongoose.connection.on( 'open', () => {
    console.log( 'MongoDB is connected' );
});

const accountsSchema = new mongoose.Schema({
    first_name: { type: String, required: true, unique: false },
    last_name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: false },
    fakePassword: { type: String, required: true, unique: false },
    billing_street: { type: String, required: true, unique: false },
    billing_city: { type: String, required: true, unique: false },
    billing_state: { type: String, required: true, unique: false },
    billing_zip_code: { type: String, required: true, unique: false },
    shipping_street: { type: String, required: false, unique: false },
    shipping_city: { type: String, required: false, unique: false },
    shipping_state: { type: String, required: false, unique: false },
    shipping_zip_code: { type: String, required: false, unique: false },
    billingSameAsShipping: { type: String, required: false, unique: false }
}, { collection: 'webstore_AccountInfo' });

module.exports = mongoose.model( 'accountInfo', accountsSchema );
