import { applicationState } from './application-state';

const { valid } = require( 'jquery-validation' );
const $ = require( 'jquery' );


function getNewAccountInfo() {
  return {
    username: $( '#new-username' ).val(),
    password: $( '#new-password' ).val()
  };
}

function registerUser() {
  console.log( 'Attempting to Register a New User...' );

  const user = getNewAccountInfo();

  const userJSON = {
    username: user.username,
    password: user.password
  };

  $.ajax({
    type: 'POST', // GET, POST, PUT
    url: '/users/register', // the url to call
    data: userJSON, // Data sent to server
    dataType: 'json'
    // beforeSend ( xhr ) { // Include the bearer token in header
    //   xhr.setRequestHeader( 'Authorization', `Bearer ${jwt}` );
    // }
  }).then( ( response ) => {
      console.log( 'Registering was a success!' );
      localStorage.setItem( 'token', response.token );
      localStorage.setItem( 'userID', response.userID );
      applicationState.additionalInformationAccountState();
      $( '#account-username-header' ).text( response.username );
      $( '.saved-payment-options-header' ).text( `${response.username} Saved Payment Methods` );
      $( '#no-payment-methods-saved-message' ).text( 'Finish signing up to add a payment method' );
    // eslint-disable-next-line no-alert, max-len
      alert( `Thanks for Registering ${response.username}! Add additional required information before making a purchase.` );
  }).catch( ( err ) => {
    // Error during request
    console.log( `Error registering a user: ${err}` );
  });
}


$( () => {
  $( '#create-account-btn' ).on( 'click', ( event ) => {
    event.preventDefault();

    if ( $( 'form[name=\'create-account-form\']' ).valid() ) {
      registerUser();
    }

  });

});
