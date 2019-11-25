const $ = require( 'jquery' );

const applicationState = {

  defaultAccountPageState() {
    // Hide the Sign in Panel
    $( '#sign-up-create-acc-panel' ).css( 'display', 'none' );
    // Hide the Additional Information Panel
    $( '#sign-up-additional-information-panel' ).css( 'display', 'none' );
    // Hide the registered user navigation
    $( '#registered-top-bar-column-2' ).css( 'display', 'none' );
  },

  registerAccountPageState() {
    // Hide login panel
    $( '#sign-in-panel' ).css( 'display', 'none' );
    // Show Register Panel
    $( '#sign-up-create-acc-panel' ).css( 'display', 'flex' );
    // Set Account Panel Header
    $( '#account-login-signup-header' ).html( 'Register Account' );

    applicationState.toggleAccountLinkState();
  },

  loginAccountPageState() {
    // Redisplay the login panel
    $( '#sign-in-panel' ).css( 'display', 'flex' );
    // Hide the Register Account Panel Again
    $( '#sign-up-create-acc-panel' ).css( 'display', 'none' );
    // Set Account Panel Header
    $( '#account-login-signup-header' ).html( 'Returning User' );

    applicationState.toggleAccountLinkState();
  },

  toggleAccountLinkState() {
    if ( $( '#sign-in-panel' ).css( 'display' ) === 'flex' ) {
      $( '#Login-link' ).addClass( 'active' );
    } else if ( $( '#Login-link' ).hasClass( 'active' ) ) {
      $( '#Login-link' ).removeClass( 'active' );
    }

    if ( $( '#sign-up-create-acc-panel' ).css( 'display' ) === 'flex' ) {
      $( '#Register-link' ).addClass( 'active' );
    } else if ( $( '#Register-link' ).hasClass( 'active' ) ) {
      $( '#Register-link' ).removeClass( 'active' );
    }
  }
};

$( () => {

  applicationState.defaultAccountPageState();

  $( '#go-to-sign-up-btn' ).on( 'click', () => {
    applicationState.registerAccountPageState();
  });

  $( '#go-back-to-sign-in-link' ).on( 'click', () => {
    applicationState.loginAccountPageState();
  });

  $( '#register-tab-button' ).on( 'click', () => {
    applicationState.registerAccountPageState();
  });

  $( '#login-tab-button' ).on( 'click', () => {
    applicationState.loginAccountPageState();
  });
});
