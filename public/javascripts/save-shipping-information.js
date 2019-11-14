const $ = require( 'jquery' );

function getShippingInputFields() {
  const shippingAddress1 = $( '#shipping_address_1' );
  const shippingAddress2 = $( '#shipping_address_2' );
  const shippingCity = $( '#shipping_city' );
  const shippingState = $( '#shipping_user_state option:selected' );
  const shippingZipCode = $( '#shipping_zipcode' );

  return [
    shippingAddress1,
    shippingAddress2,
    shippingCity,
    shippingState,
    shippingZipCode
  ];
}

function getBillingInputFields() {
  const billingAddress1 = $( '.address-1-value' );
  const billingAddress2 = $( '.address-2-value' );
  const billingCity = $( '.city-value' );
  const billingState = $( '.state-value' );
  const billingZipCode = $( '.zip-code-value' );

  return [
    billingAddress1,
    billingAddress2,
    billingCity,
    billingState,
    billingZipCode
  ];
}

function clearShippingInputs() {
  const [ address1, address2, city, state, zipcode ] = getShippingInputFields();
  address1.val( '' );
  address2.val( '' );
  city.val( '' );
  state.val( 'selected' );
  zipcode.val( '' );
}

function isTypeOfAddressBilling() {
  const useBilling = $( '#use-billing-address-for-shipping' );

  return !!useBilling.is( ':checked' );
}

function checkForBillingAddress() {
  const [ address1, , city, state, zipcode ] = getBillingInputFields();
  if (
    !address1.text() ||
    !city.text() ||
    !state.text() ||
    !zipcode.text() ||
    $( 'section.account-information' ).css( 'display' ) === 'none'
  ) {
    $( '#billing-address-error-message' ).show();
    clearShippingInputs();
  }else {
    $( '#billing-address-error-message' ).hide();
    setBillingToShipping();
  }
}

function setBillingToShipping() {
  const [
    shippingAddress1,
    shippingAddress2,
    shippingCity,
    shippingState,
    shippingZipCode
  ] = getShippingInputFields();

  const [
    billingAddress1,
    billingAddress2,
    billingCity,
    billingState,
    billingZipCode
  ] = getBillingInputFields();

  const stateString = billingState.text();

  shippingAddress1.val( billingAddress1.text() );
  shippingAddress2.val( billingAddress2.text() );
  shippingCity.val( billingCity.text() );
  $( `#shipping_user_state option:contains(${stateString})` ).attr(
    'selected',
    true
  );
  shippingZipCode.val( billingZipCode.text() );

  // shippingValidators.address1();
  // shippingValidators.address2();
  // shippingValidators.city();
  // shippingValidators.state();
  // shippingValidators.zipcode();
}

function saveAddressAsShippingInfo() {
  console.log( 'Attempting to POST a new shipping address...' );

  const [ address1, address2, city, state, zipcode ] = getShippingInputFields();

  // const shippingAddress1 = $( '#shipping_address_1' ).val();
  // const shippingAddress2 = $( '#shipping_address_2' ).val();
  // const shippingCity = $( '#shipping_user_state option:selected' ).text();
  // const shippingState = $( '#shipping_city' ).val();
  // const shippingZipCode = $( '#shipping_zipcode' ).val();
  const userName = $( '.name-value' ).text();

  $.post(
    '/users/shipping_info',
    {
      shipping_address1: address1.val(),
      shipping_address2: address2.val(),
      shipping_city: city.val(),
      shipping_state: state.text(),
      shipping_zipcode: zipcode.val(),
      userFullName: userName
    },
    ( data ) => {
      // eslint-disable-next-line no-alert
      console.log( `POST /users/shipping_info Response: ${data}` );
      // eslint-disable-next-line no-alert
      alert( data );
    }
  ).done( console.log( 'POST shipping information is complete' ) );
}

$( () => {
  $( '#billing-address-error-message' ).hide();
  const useBillingCheckBox = $( '#use-billing-address-for-shipping' );

  $( '#shipping-info-submit-btn' ).on( 'click', ( event ) => {
    event.preventDefault();
    if ( $( 'section.account-information' ).css( 'display' ) === 'none' ) {
      // eslint-disable-next-line no-alert
      alert( 'Make an Account Before Registering a Shipping Address!' );
      clearShippingInputs();
    }else {
      saveAddressAsShippingInfo();
    }
  });

  useBillingCheckBox.on( 'change keyup', () => {
    if ( isTypeOfAddressBilling() ) {
      checkForBillingAddress();
    }else {
      clearShippingInputs();
      $( '#billing-address-error-message' ).hide();
    }
  });
});
