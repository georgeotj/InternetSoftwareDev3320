const $ = require( 'jquery' );

function goToSignUp() {
  $( '#sign-in-panel' ).css( 'display', 'none' );
  $( '#sign-up-create-acc-panel' ).css( 'display', 'flex' );
  $( '#account-login-signup-header' ).html( 'Sign Up' );
}

function goBackToSignIn() {
  $( '#sign-in-panel' ).css( 'display', 'flex' );
  $( '#sign-up-create-acc-panel' ).css( 'display', 'none' );
  $( '#account-login-signup-header' ).html( 'Sign In' );
}

$( () => {
  // Hide the Sign in Panel
  $( '#sign-up-create-acc-panel' ).css( 'display', 'none' );
  // Hide the Additional Information Panel
  $( '#sign-up-additional-information-panel' ).css( 'display', 'none' );

  $( '#go-to-sign-up-btn' ).on( 'click', () => {
    goToSignUp();
  });

  $( '#go-back-to-sign-in-link' ).on( 'click', () => {
    goBackToSignIn();
  });
});
