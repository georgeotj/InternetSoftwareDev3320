import { applicationState } from './application-state';

const { valid } = require( 'jquery-validation' );
const $ = require( 'jquery' );


function getUserAccountInfo() {
  return {
    username: $( '#sign-in-username' ).val(),
    password: $( '#user-password-attempt' ).val()
  };
}

function loginUser() {
  console.log( 'Attempting to Login a New User...' );

  const user = getUserAccountInfo();

  const userLoginJSON = {
    username: user.username,
    password: user.password
  };

  $.ajax({
    type: 'POST', // GET, POST, PUT
    url: '/users/login', // the url to call
    data: userLoginJSON, // Data sent to server
    dataType: 'json'
    // beforeSend ( xhr ) { // Include the bearer token in header
    //   xhr.setRequestHeader( 'Authorization', `Bearer ${jwt}` );
    // }
  }).then( ( response ) => {
    console.log( 'Logging in was a success!' );
    localStorage.setItem( 'token', response.token );
    localStorage.setItem( 'userID', response.userID );
    applicationState.additionalInformationAccountState();
    $( '#account-username-header' ).text( response.username );
    // eslint-disable-next-line no-alert, max-len
    alert( `Thanks for Registering ${response.username}! Add additional required information before making a purchase.` );
  }).catch( ( err ) => {
    // Error during request
    console.log( `Error registering a user: ${err}` );
  });
}


$( () => {
  $( '#sign-in-account-btn' ).on( 'click', ( event ) => {
    event.preventDefault();

    if ( $( 'form[name=\'create-account-form\']' ).valid() ) {
      loginUser();
    }

  });

});
