const $ = require( 'jquery' );

function getPaymentInformation() {
  return {
    paymentMethod: $( '#payment-method-types option:selected' ).text(),
    paymentCardName: $( '#payment-card-name' ).val(),
    paymentCardNumber: $( '#payment-card-number' ).val(),
    paymentCardExpirationDate: $( '#payment-expiration-date' ).val(),
    paymentCardVerificationCode: $( '#payment-card-verification' ).val(),
    username: $( '#account-username-header' ).text()
  };
}

function submitPaymentInformationForm() {
  console.log( 'Attempting to save New Billing Information' );

  const submitOrderButton = $( '#submit-order-information-btn' );

  const paymentInformation = getPaymentInformation();

  const paymentInformationJSONRequest = {
    cardType: paymentInformation.paymentMethod,
    cardNumber: paymentInformation.paymentCardNumber,
    expDate: paymentInformation.paymentCardExpirationDate,
    CVV: paymentInformation.paymentCardVerificationCode,
    cardName: paymentInformation.paymentCardName,
    username: paymentInformation.username
  };

  $.ajax({
    url: '/users/billing_info',
    type: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem( 'token' )}` },
    data: paymentInformationJSONRequest,
    success: ( response ) => {
      submitOrderButton.removeClass( 'disabled-button' );
      submitOrderButton.removeAttr( 'disabled' );
      // eslint-disable-next-line no-alert
      alert( response );
    }
  })
    .then( ( response ) => { return ( console.log( 'The billing AJAX is over' ) ); });
}

$( () => {


  $( '#submit-payment-information-btn' ).on( 'click', ( event ) => {
    event.preventDefault();
    const accountUsername = $( '#account-username-header' ).text();

    if ( !accountUsername ) {
      // eslint-disable-next-line no-alert
      alert( 'Please Login Before Making a Purchase' );
    } else {
      submitPaymentInformationForm();
    }
  });
});
