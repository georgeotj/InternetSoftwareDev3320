import { applicationState } from './application-state';

const $ = require( 'jquery' );

function logoutUser() {
  console.log( 'Attempting to Logout User...' );

  const userInformation = {
    userID: localStorage.getItem( 'userID' ),
    username: localStorage.getItem( 'username' )
  };

  $.ajax({
    url: '/users/account/logout',
    type: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem( 'token' )}` },
    data: userInformation
  }).then( ( response ) => {
    // eslint-disable-next-line no-alert
    alert( response );
    applicationState.userLogoutAccountPageState();
    localStorage.removeItem( 'userID' );
    localStorage.removeItem( 'username' );
    localStorage.removeItem( 'token' );
    localStorage.setItem( 'ORDER_HISTORY_FLAG', 'False' );
  }).catch( ( err ) => {
    // Error during request
    console.log( `Error logging out: ${err}` );
  });
}

$( () => {
  $( '#logout-button' ).on( 'click', ( event ) => {
    event.preventDefault();
    logoutUser();
  });

});
