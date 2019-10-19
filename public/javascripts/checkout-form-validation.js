// const state = $('#shipping_user_state'); ca
let isCardTypeValid = true;
let isCardNameValid = true;
let isCardNumberValid = true;
let isCardExpireValid = true;
let isCardCodeValid = true;

function checkNameOnCard() {
  const cardName = $('#payment-card-name');
  const cardNameErrorMessage = $('#checkout-card-name-error-message');
  cardNameErrorMessage.hide();

  const pattern = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
  const formName = cardName.val();
  if (pattern.test(formName) && formName !== '') {
    cardNameErrorMessage.hide();
    cardName.css('border', '2px solid lightgreen');
    cardName.css('box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)');
  } else {
    cardNameErrorMessage.html('Invalid Name');
    cardNameErrorMessage.css('color', '#b00808');
    // cardNameErrorMessage.css('background-color', '#b00808');
    // cardNameErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cardNameErrorMessage.css('padding', '.7%');
    // cardNameErrorMessage.css('display', 'inline-block');
    // cardNameErrorMessage.css('position', 'absolute');
    cardNameErrorMessage.show();
    cardName.css('border', '2px solid salmon');
    cardName.css('box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)');
    isCardNameValid = false;
  }
}

function checkCardNumberValid() {
  const cardNumber = $('#payment-card-number');
  const cardNumberErrorMessage = $('#checkout-card-number-error-message');
  cardNumberErrorMessage.hide();

  const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastPattern = /^(?:5[1-5][0-9]{14})$/;
  const discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  const formName = cardNumber.val();
  if (visaPattern.test(formName) || mastPattern.test(formName) || discPattern.test(formName) && formName !== '') {
    cardNumberErrorMessage.hide();
    cardNumber.css('border', '2px solid lightgreen');
    cardNumber.css('box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)');
  } else {
    cardNumberErrorMessage.html('Invalid Card Number');
    cardNumberErrorMessage.css('color', '#b00808');
    // cardNumberErrorMessage.css('background-color', '#b00808');
    // cardNumberErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cardNumberErrorMessage.css('padding', '.7%');
    // cardNumberErrorMessage.css('display', 'inline-block');
    // cardNumberErrorMessage.css('position', 'absolute');
    cardNumberErrorMessage.show();
    cardNumber.css('border', '2px solid salmon');
    cardNumber.css('box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)');
    isCardNumberValid = false;
  }
}

function checkCardType() {
  const cardType = $('#payment-method-types');
  const cardTypeErrorMessage = $('#checkout-pay-method-error-message');
  cardTypeErrorMessage.hide();
  if (cardType.val()) {
    cardTypeErrorMessage.hide();
    cardType.css('border', '1px solid #34F458');
    cardType.css('box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)');
  } else {
    cardTypeErrorMessage.html('Choose a Card Type');
    cardTypeErrorMessage.css('color', '#b00808');
    // cardTypeErrorMessage.css('background-color', '#b00808');
    // cardTypeErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cardTypeErrorMessage.css('padding', '.7%');
    // cardTypeErrorMessage.css('display', 'inline-block');
    // cardTypeErrorMessage.css('position', 'absolute');
    cardTypeErrorMessage.show();
    cardType.css('border', '1px solid #F90A0A');
    cardType.css('box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)');
    isCardTypeValid = false;
  }
}

function checkCardExpireDate() {
  const cardExpire = $('#expiration-date');
  const cardExpireErrorMessage = $('#checkout-card-expire-error-message');
  cardExpireErrorMessage.hide();

  const pattern = /^\d{2}\/\d{2}$/;
  const formName = cardExpire.val();
  if (pattern.test(formName) && formName !== '') {
    cardExpireErrorMessage.hide();
    cardExpire.css('border', '2px solid lightgreen');
    cardExpire.css('box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)');
  } else {
    cardExpireErrorMessage.html('Invalid Expiration Date');
    cardExpireErrorMessage.css('color', '#b00808');
    // cardExpireErrorMessage.css('background-color', '#b00808');
    // cardExpireErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cardExpireErrorMessage.css('padding', '.7%');
    // cardExpireErrorMessage.css('display', 'inline-block');
    // cardExpireErrorMessage.css('position', 'absolute');
    cardExpireErrorMessage.show();
    cardExpire.css('border', '2px solid salmon');
    cardExpire.css('box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)');
    isCardExpireValid = false;
  }
}

function checkCardCVV() {
  const cardCVV = $('#verification');
  const cardCVVErrorMessage = $('#checkout-card-cvv-error-message');
  cardCVVErrorMessage.hide();
  const pattern = /^[0-9]{3,4}$/;
  const formName = cardCVV.val();
  if (pattern.test(formName) && formName !== '') {
    cardCVVErrorMessage.hide();
    cardCVV.css('border', '2px solid lightgreen');
    cardCVV.css('box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)');
  } else {
    cardCVVErrorMessage.html('Invalid CVV Code');
    cardCVVErrorMessage.css('color', '#b00808');
    cardCVVErrorMessage.show();
    cardCVV.css('border', '2px solid salmon');
    cardCVV.css('box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)');
    isCardCodeValid = false;
  }
}

/* eslint no-multiple-empty-lines:0 */
$(document).ready(() => {
  const cardName = $('#payment-card-name');
  const cardNumber = $('#payment-card-number');
  const cardType = $('#payment-method-types');
  const cardExpire = $('#expiration-date');
  const cardCVV = $('#verification');


  cardName.on('change keyup', () => {
    checkNameOnCard();
  });
  cardNumber.on('change keyup', () => {
    checkCardNumberValid();
  });
  cardType.on('change keyup', () => {
    checkCardType();
  });
  cardExpire.on('change keyup', () => {
    checkCardExpireDate();
  });
  cardCVV.on('change keyup', () => {
    checkCardCVV();
  });

  $('.shipping-info-form').submit(() => {
    isCardTypeValid = true;
    isCardNameValid = true;
    isCardExpireValid = true;
    isCardCodeValid = true;

    checkNameOnCard();
    checkCardNumberValid();
    checkCardExpireDate();
    checkCardCVV();
    checkCardType();

    if (isCardNumberValid && isCardCodeValid && isCardExpireValid && isCardTypeValid
      && isCardNameValid === true) {
      alert('Shipping Address Saved');
      return true;
    }
    alert('Please Fill Out a Shipping Address');
    return false;
  });



  // $('#payment-card-name').on('input', function () {
  //   let address_1_v2 = $(this).val();
  //   alert(address_1_v2);
  // });
});
