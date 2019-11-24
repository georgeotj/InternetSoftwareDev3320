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
    url: '/authenticatedService', // the url to call
    data: userJSON, // Data sent to server
    dataType: 'json',
    beforeSend ( xhr ) { // Include the bearer token in header
      xhr.setRequestHeader( 'Authorization', `Bearer ${jwt}` );
    }
  }).done( ( response ) => {
    // Response ok. process reuslt
  }).fail( ( err ) => {
    // Error during request
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
