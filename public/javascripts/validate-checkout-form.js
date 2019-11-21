const $ = require( 'jquery' );

const { isValid } = require( './index' );

let isCardTypeValid = true;
let isCardNameValid = true;
let isCardNumberValid = true;
let isCardExpireValid = true;
let isCardCodeValid = true;
let isPaymentAgreedTo = false;

function checkNameOnCard() {
  const cardName = $( '#payment-card-name' );
  const cardNameErrorMessage = $( '#checkout-card-name-error-message' );
  cardNameErrorMessage.hide();

  const pattern = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
  const fieldName = cardName.val();
  if ( cardName.isValid() && fieldName !== '' ) {
    cardNameErrorMessage.hide();
    cardName.addClass( 'field-is-valid' );
    if ( cardName.hasClass( 'field-is-invalid' ) ) {
      cardName.removeClass( 'field-is-invalid' );
    }
    // cardName.css( 'border', '2px solid lightgreen' );
    // cardName.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    cardNameErrorMessage.html( 'Invalid Name' );
    cardNameErrorMessage.css( 'color', '#b00808' );

    // cardNameErrorMessage.css('background-color', '#b00808');
    // cardNameErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cardNameErrorMessage.css('padding', '.7%');
    // cardNameErrorMessage.css('display', 'inline-block');
    // cardNameErrorMessage.css('position', 'absolute');
    cardNameErrorMessage.show();
    cardName.addClass( 'field-is-invalid' );
    if ( cardName.hasClass( 'field-is-valid' ) ) {
      cardName.removeClass( 'field-is-valid' );
    }

    // cardName.css( 'border', '2px solid salmon' );
    // cardName.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isCardNameValid = false;
  }
}

function checkCardNumberValid() {
  const cardType = $( '#payment-method-types' );
  const cardNumber = $( '#payment-card-number' );
  const cardNumberErrorMessage = $( '#checkout-card-number-error-message' );
  cardNumberErrorMessage.hide();

  const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastPattern = /^(?:5[1-5][0-9]{14})$/;
  const amexPattern = /^3[47][0-9]{13}$/;
  const fieldValue = cardNumber.val();
  // eslint-disable-next-line no-mixed-operators

  if ( visaPattern.test( fieldValue ) ) {
    // $( '#payment-method-types > option:eq(1)' ).prop( 'selected', true );
    cardType.prop( 'selectedIndex', 1 );
  }
  if ( mastPattern.test( fieldValue ) ) {
    // $( '#payment-method-types > option:eq(2)' ).prop( 'selected', true );
    cardType.prop( 'selectedIndex', 2 );
  }
  if ( amexPattern.test( fieldValue ) ) {
    // $( '#payment-method-types > option:eq(3)' ).prop( 'selected', true );
    cardType.prop( 'selectedIndex', 3 );
  }

  if ( ( visaPattern.test( fieldValue ) ||
      mastPattern.test( fieldValue ) || amexPattern.test( fieldValue ) ) &&
      fieldValue !== '' ) {

        cardNumberErrorMessage.hide();
        cardNumber.addClass( 'field-is-valid' );
        if ( cardNumber.hasClass( 'field-is-invalid' ) ) {
          cardNumber.removeClass( 'field-is-invalid' );
        }
        // cardNumber.css( 'border', '2px solid lightgreen' );
        // cardNumber.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    cardNumberErrorMessage.html( 'Invalid Card Number' );
    cardNumberErrorMessage.css( 'color', '#b00808' );

    // cardNumberErrorMessage.css('background-color', '#b00808');
    // cardNumberErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cardNumberErrorMessage.css('padding', '.7%');
    // cardNumberErrorMessage.css('display', 'inline-block');
    // cardNumberErrorMessage.css('position', 'absolute');
    cardNumberErrorMessage.show();

    cardNumber.addClass( 'field-is-invalid' );
    if ( cardNumber.hasClass( 'field-is-valid' ) ) {
      cardNumber.removeClass( 'field-is-valid' );
    }
    // cardNumber.css( 'border', '2px solid salmon' );
    // cardNumber.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isCardNumberValid = false;
  }
}

function checkCardType() {
  const cardType = $( '#payment-method-types' );
  const cardTypeErrorMessage = $( '#checkout-pay-method-error-message' );
  cardTypeErrorMessage.hide();
  if ( cardType.val() ) {
    cardTypeErrorMessage.hide();
    cardType.css( 'border', '1px solid #34F458' );
    cardType.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    cardTypeErrorMessage.html( 'Choose a Card Type' );
    cardTypeErrorMessage.css( 'color', '#b00808' );

    // cardTypeErrorMessage.css('background-color', '#b00808');
    // cardTypeErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cardTypeErrorMessage.css('padding', '.7%');
    // cardTypeErrorMessage.css('display', 'inline-block');
    // cardTypeErrorMessage.css('position', 'absolute');
    cardTypeErrorMessage.show();
    cardType.css( 'border', '1px solid #F90A0A' );
    cardType.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isCardTypeValid = false;
  }
}

function checkCardExpireDate() {
  const cardExpire = $( '#payment-expiration-date' );
  const cardExpireErrorMessage = $( '#checkout-card-expire-error-message' );
  cardExpireErrorMessage.hide();

  const pattern = /^\d{2}\/\d{2}$/;
  const fieldValue = cardExpire.val();
  if ( pattern.test( fieldValue ) && fieldValue !== '' ) {
    cardExpireErrorMessage.hide();
    cardExpire.addClass( 'field-is-valid' );
    if ( cardExpire.hasClass( 'field-is-invalid' ) ) {
      cardExpire.removeClass( 'field-is-invalid' );
    }
    // cardExpire.css( 'border', '2px solid lightgreen' );
    // cardExpire.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    cardExpireErrorMessage.html( 'Invalid Expiration Date' );
    cardExpireErrorMessage.css( 'color', '#b00808' );

    // cardExpireErrorMessage.css('background-color', '#b00808');
    // cardExpireErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cardExpireErrorMessage.css('padding', '.7%');
    // cardExpireErrorMessage.css('display', 'inline-block');
    // cardExpireErrorMessage.css('position', 'absolute');
    cardExpireErrorMessage.show();
    cardExpire.addClass( 'field-is-invalid' );
    if ( cardExpire.hasClass( 'field-is-valid' ) ) {
      cardExpire.removeClass( 'field-is-valid' );
    }
    // cardExpire.css( 'border', '2px solid salmon' );
    // cardExpire.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isCardExpireValid = false;
  }
}

function checkCardCVV() {
  const cardCVV = $( '#payment-card-verification' );
  const cardCVVErrorMessage = $( '#checkout-card-cvv-error-message' );
  cardCVVErrorMessage.hide();
  const pattern = /^[0-9]{3,4}$/;
  const fieldValue = cardCVV.val();
  if ( pattern.test( fieldValue ) && fieldValue !== '' ) {
    cardCVVErrorMessage.hide();
    cardCVV.css( 'border', '2px solid lightgreen' );
    cardCVV.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    cardCVVErrorMessage.html( 'Invalid CVV Code' );
    cardCVVErrorMessage.css( 'color', '#b00808' );
    cardCVVErrorMessage.show();
    cardCVV.css( 'border', '2px solid salmon' );
    cardCVV.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isCardCodeValid = false;
  }
}

function checkPaymentAgreement() {
  const paymentAgreement = $( '#pay-agreement' );

  isPaymentAgreedTo = paymentAgreement.is( ':checked' );
}

function isCheckoutFormValid() {
  const checkoutButton = $( '#submit-payment-information-btn' );

  isCardTypeValid = true;
  isCardNameValid = true;
  isCardNumberValid = true;
  isCardExpireValid = true;
  isCardCodeValid = true;
  isPaymentAgreedTo = false;

  checkNameOnCard();
  checkCardNumberValid();
  checkCardExpireDate();
  checkCardCVV();
  checkCardType();
  checkPaymentAgreement();

  if (
    isCardNumberValid &&
    isCardCodeValid &&
    isCardExpireValid &&
    isCardTypeValid &&
    isCardNameValid &&
    isPaymentAgreedTo === true
  ) {
    $( '.checkout-payment-form' ).removeAttr( 'disabled' );
    checkoutButton.removeAttr( 'disabled' );
    checkoutButton.removeClass( 'disabled-button' );
  }else {
    $( '.checkout-payment-form' ).attr( 'disabled', 'disabled' );
    checkoutButton.addClass( 'disabled-button' );
  }
}

/* eslint no-multiple-empty-lines:0 */
$( () => {
  const cardName = $( '#payment-card-name' );
  const cardNumber = $( '#payment-card-number' );
  const cardType = $( '#payment-method-types' );
  const cardExpire = $( '#payment-expiration-date' );
  const cardCVV = $( '#payment-card-verification' );
  const paymentAgreement = $( '#pay-agreement' );

  cardName.on( 'change keyup', () => {
    checkNameOnCard();
    isCheckoutFormValid();
  });
  cardNumber.on( 'change keyup', () => {
    checkCardNumberValid();
    isCheckoutFormValid();
  });
  cardType.on( 'change keyup', () => {
    checkCardType();
    isCheckoutFormValid();
  });
  cardExpire.on( 'change keyup', () => {
    checkCardExpireDate();
    isCheckoutFormValid();
  });
  cardCVV.on( 'change keyup', () => {
    checkCardCVV();
    isCheckoutFormValid();
  });
  paymentAgreement.on( 'change keyup', () => {
    checkPaymentAgreement();
    isCheckoutFormValid();
  });
});
