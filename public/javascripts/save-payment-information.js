function getPaymentInformation() {
  return {
    paymentMethod: $( '#payment-method-types option:selected' ).text(),
    paymentCardName: $( '#payment-card-name' ).val(),
    paymentCardNumber: $( '#payment-card-number' ).val(),
    paymentCardExpirationDate: $( '#payment-expiration-date' ).val(),
    paymentCardVerificationCode: $( '#payment-card-verification' ).val(),
    userName: $( '.name-value' ).text()
  };
}

function submitPaymentInformationForm() {
  console.log( 'Attempting to save New Billing Information' );

  const paymentInformation = getPaymentInformation();

  const paymentInformationJSONRequest = {
    cardType: paymentInformation.paymentMethod,
    cardNumber: paymentInformation.paymentCardNumber,
    expDate: paymentInformation.paymentCardExpirationDate,
    CVV: paymentInformation.paymentCardVerificationCode,
    cardName: paymentInformation.paymentCardName,
    userFullName: paymentInformation.userName
  };

    $.post(
    '/users/billing_info',
    paymentInformationJSONRequest,
    ( data ) => {
      // eslint-disable-next-line no-alert
      alert( data );
    }
  ).done(
    console.log( 'The billing AJAX is over' )
  );
}

$( () => {
  $( '#submit-payment-information-btn' ).on( 'click', ( event ) => {
    event.preventDefault();
    submitPaymentInformationForm();
  });

});
