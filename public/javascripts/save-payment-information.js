
function submitPaymentInformationForm() {
  console.log( 'Attempting to save New Billing Information' );

  const paymentMethod = $( '#payment-method-types option:selected' ).text();
  const paymentCardName = $( '#payment-card-name' ).val();
  const paymentCardNumber = $( '#payment-card-number' ).val();
  const paymentCardExpirationDate = $( '#payment-expiration-date' ).val();
  const paymentCardVerificationCode = $( '#payment-card-verification' ).val();
  const userName = $( '.name-value' ).text();


  $.post(
    '/users/billing_info',
    {
      cardType: paymentMethod,
      cardNumber: paymentCardNumber,
      expDate: paymentCardExpirationDate,
      CVV: paymentCardVerificationCode,
      cardName: paymentCardName,
      userFullName: userName
    },
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
