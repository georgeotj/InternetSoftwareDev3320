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
    console.log( response );
    localStorage.setItem( 'token', response.token );
    localStorage.setItem( 'userID', response.userID );
    localStorage.setItem( 'username', response.username );
    if( response.additionalInfoRequired ) {
      applicationState.additionalInformationAccountState();
      $( '#account-username-header' ).text( response.username );
    } else {
      applicationState.registeredUserWithAdditionalInformationState();
      $( '#account-username-header' ).text( response.username );
      $( '.name-value' ).text( response.fullname );
      $( '.address-1-value' ).text( response.user_address1 );
      if ( response.user_address2 !== '' ) {
        $( '.address-2-value' ).text( response.user_address2 );
      }else {
        $( '.address-2-value' ).css( 'display', 'none' );
        $( '.address-2-label' ).css( 'display', 'none' );
        $( '.show-address2-block' ).css( 'display', 'none' );
      }
      $( '.city-value' ).text( response.user_city );
      $( '.state-value' ).text( response.user_state );
      $( '.zip-code-value' ).text( response.user_zipcode );
      $( '.phone-value' ).text( response.user_phone );
      $( '.email-value' ).text( response.user_email );
    }
    // eslint-disable-next-line no-alert, max-len
  }).catch( ( err ) => {
    // Error during request
    console.log( `Error registering a user: ${err}` );
  });
}


$( () => {
  $( '#sign-in-account-btn' ).on( 'click', ( event ) => {
    event.preventDefault();

    if ( $( 'form[name=\'sign-in-form\']' ).valid() ) {
      loginUser();
    }

  });

});
