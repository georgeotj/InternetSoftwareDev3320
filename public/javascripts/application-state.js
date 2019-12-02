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

    applicationState.toggleHeadNavAccountLinkState();
  },

  loginAccountPageState() {
    // Redisplay the login panel
    $( '#sign-in-panel' ).css( 'display', 'flex' );
    // Hide the Register Account Panel Again
    $( '#sign-up-create-acc-panel' ).css( 'display', 'none' );
    // Set Account Panel Header
    $( '#account-login-signup-header' ).html( 'Returning User' );

    applicationState.toggleHeadNavAccountLinkState();
  },

  additionalInformationAccountState() {
    $( '#registered-top-bar-column-2' ).css( 'display', 'block' );
    $( '#unregistered-top-bar-column-2' ).css( 'display', 'none' );
    $( '#sign-in-panel' ).css( 'display', 'none' );
    $( '#sign-up-create-acc-panel' ).css( 'display', 'none' );
    $( '#sign-up-additional-information-panel' ).css( 'display', 'flex' );
    $( '#account-login-signup-header' ).html( 'Finish Registering!' );
  },

  registeredUserWithAdditionalInformationState() {
    $( '#registered-top-bar-column-2' ).css( 'display', 'block' );
    $( '#sign-in-panel' ).css( 'display', 'none' );
    $( '#sign-up-create-acc-panel' ).css( 'display', 'none' );
    $( '#sign-up-additional-information-panel' ).css( 'display', 'none' );
    $( '#unregistered-top-bar-column-2' ).css( 'display', 'none' );
    const userOverview = $( 'section.account-information' );
    userOverview.css( 'display', 'block' );
  },

  registeredShippingInfoAccountState() {
    $( '.shipping-info-panel' ).css( 'display', 'block' );
    $( '.account-information-panel' ).css( 'display', 'none' );
    $( '.saved-payment-methods-panel' ).css( 'display', 'none' );
    $( '.order-history-panel' ).css( 'display', 'none' );
    applicationState.toggleRegisteredNavLinkState();
  },

  registeredUserOverviewAccountState() {
    $( '.account-information-panel' ).css( 'display', 'flex' );
    $( '.shipping-info-panel' ).css( 'display', 'none' );
    $( '.saved-payment-methods-panel' ).css( 'display', 'none' );
    $( '.order-history-panel' ).css( 'display', 'none' );
    applicationState.toggleRegisteredNavLinkState();
  },

  registeredUserPaymentHistoryAccountState() {
    $( '.saved-payment-methods-panel' ).css( 'display', 'block' );
    $( '.account-information-panel' ).css( 'display', 'none' );
    $( '.shipping-info-panel' ).css( 'display', 'none' );
    $( '.order-history-panel' ).css( 'display', 'none' );
    applicationState.toggleRegisteredNavLinkState();
  },

  registeredUserOrderHistoryAccountState() {
    $( '.order-history-panel' ).css( 'display', 'block' );
    $( '.saved-payment-methods-panel' ).css( 'display', 'none' );
    $( '.account-information-panel' ).css( 'display', 'none' );
    $( '.shipping-info-panel' ).css( 'display', 'none' );
    applicationState.toggleRegisteredNavLinkState();
  },

  toggleHeadNavAccountLinkState() {
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
  },

  toggleRegisteredNavLinkState() {
    if( $( '.account-information-panel' ).css( 'display' ) === 'flex' ) {
      $( '#overview-link' ).addClass( 'active' );
    } else if ( $( '#overview-link' ).hasClass( 'active' ) ) {
      $( '#overview-link' ).removeClass( 'active' );
    }

    if( $( '.shipping-info-panel' ).css( 'display' ) === 'block' ) {
      $( '#shipping-link' ).addClass( 'active' );
    } else if ( $( '#shipping-link' ).hasClass( 'active' ) ) {
      $( '#shipping-link' ).removeClass( 'active' );
    }

    if( $( '.saved-payment-methods-panel' ).css( 'display' ) === 'block' ) {
      $( '#payment-information-link' ).addClass( 'active' );
    } else if ( $( '#payment-information-link' ).hasClass( 'active' ) ) {
      $( '#payment-information-link' ).removeClass( 'active' );
    }

    if( $( '.order-history-panel' ).css( 'display' ) === 'block' ) {
      $( '#order-history-link' ).addClass( 'active' );
    } else if ( $( '#order-history-link' ).hasClass( 'active' ) ) {
      $( '#order-history-link' ).removeClass( 'active' );
    }
  },

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

  $( '#shipping-link' ).on( 'click', () => {
    applicationState.registeredShippingInfoAccountState();
  });

  $( '#overview-link' ).on( 'click', () => {
    applicationState.registeredUserOverviewAccountState();
  });

  $( '#saved-payment-link' ).on( 'click', () => {
    applicationState.registeredUserPaymentHistoryAccountState();
  });

  $( '#order-history-link' ).on( 'click', () => {
    applicationState.registeredUserOrderHistoryAccountState();
  });
});

module.exports = {
  applicationState
};
