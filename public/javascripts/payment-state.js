import { applicationState } from './application-state';

const { valid } = require( 'jquery-validation' );
const $ = require( 'jquery' );

const paymentState = {
  saveCardInformation: $( '.save-payment-method' ),
  doNotSaveCardInformation: $( '.dont-save-payment-method' ),

  defaultPaymentState() {
    $( '.user-payment-methods' ).css( 'display', 'block' );
    $( '.new-payment-methods' ).css( 'display', 'none' );
  },

  useNewCardPaymentState() {
    $( '.new-payment-methods' ).css( 'display', 'block' );
    paymentState.notSavingCardInformation();
  },

  noSavedPaymentMethods() {
    $( '#no-payment-methods-saved-message' ).text( 'No payment methods saved' );
  },

  savingCardInformation() {
    paymentState.saveCardInformation.addClass( 'selected-method' );
    paymentState.doNotSaveCardInformation.removeClass( 'selected-method' );
    paymentState.saveCardInfoToggle();
  },

  notSavingCardInformation() {
    paymentState.doNotSaveCardInformation.addClass( 'selected-method' );
    paymentState.saveCardInformation.removeClass( 'selected-method' );
    paymentState.saveCardInfoToggle();
  },

  saveCardInfoToggle() {
    if ( paymentState.saveCardInformation.hasClass( 'selected-method' ) ) {
      paymentState.saveCardInformation.css( 'color', 'lightgreen' );
    } else {
      paymentState.saveCardInformation.css( 'color', '#bb9eba' );
    }

    if ( paymentState.doNotSaveCardInformation.hasClass( 'selected-method' ) ) {
      paymentState.doNotSaveCardInformation.css( 'color', 'salmon' );
    } else {
      paymentState.doNotSaveCardInformation.css( 'color', '#bb9eba' );
    }
  }


};

$( () => {

  paymentState.defaultPaymentState();
  paymentState.noSavedPaymentMethods();

  $( '#use-new-payment-card' ).on( 'click', () => {
    paymentState.useNewCardPaymentState();
  });

  $( '.save-payment-method' ).on( 'click', () => {
    paymentState.savingCardInformation();

  });

  $( '.dont-save-payment-method' ).on( 'click', () => {
    paymentState.notSavingCardInformation();
  });

});
