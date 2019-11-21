const $ = require( 'jquery' );

// const state = $('#shipping_user_state'); ca
let isAddress1Valid = true;
let isAddress2Valid = true;
let isStateValid = true;
let isCityValid = true;
let isZipValid = true;

// eslint-disable-next-line func-names
$.fn.isValid = function isValid() {
  return this[ 0 ].checkValidity();
};

function checkShippingAddress1() {
  const address1 = $( '#shipping_address_1' );
  const address1ErrorMessage = $( '#address-1-error-message' );
  address1ErrorMessage.hide();

  const pattern = /d{1,5}\s\w.\s\w\s(\b\w*\b\s){1,2}\w*/;

  // const pattern = /^\s*\S+(?:\s+\S+){2}/;
  const formName = address1.val();
  if ( address1.isValid() && formName !== '' ) {
    address1ErrorMessage.hide();
    address1.addClass( 'field-is-valid' );
    if ( address1.hasClass( 'field-is-invalid' ) ) {
      address1.removeClass( 'field-is-invalid' );
    }
  }else {
    address1ErrorMessage.html( 'Invalid Address' );
    address1ErrorMessage.css( 'color', '#b00808' );

    // address1ErrorMessage.css('background-color', '#b00808');
    // address1ErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // address1ErrorMessage.css('padding', '.7%');
    // address1ErrorMessage.css('display', 'inline-block');
    // address1ErrorMessage.css('position', 'absolute');
    address1ErrorMessage.show();
    address1.addClass( 'field-is-invalid' );
    if ( address1.hasClass( 'field-is-valid' ) ) {
      address1.removeClass( 'field-is-valid' );
    }
    isAddress1Valid = false;
  }
}

function checkShippingAddress2() {
  const address2 = $( '#shipping_address_2' );
  const address2ErrorMessage = $( '#address-2-error-message' );
  address2ErrorMessage.hide();

  const pattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  const formName = address2.val();
  if ( address2.isValid() || formName === '' ) {
    address2ErrorMessage.hide();
    address2.css( 'border', '2px solid #151a2f' );
    address2.css( 'box-shadow', '0 0 8px 2px rgba(63, 63, 63, 0.75)' );
  }else {
    address2ErrorMessage.html( 'Invalid Address' );
    address2ErrorMessage.css( 'color', '#b00808' );

    // address2ErrorMessage.css('background-color', '#b00808');
    // address2ErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // address2ErrorMessage.css('padding', '.7%');
    // address2ErrorMessage.css('display', 'inline-block');
    // address2ErrorMessage.css('position', 'absolute');
    address2ErrorMessage.show();
    address2.css( 'border-bottom', '2px solid #151a2f' );
    address2.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAddress2Valid = false;
  }
}

function checkShippingState() {
  const state = $( '#shipping_user_state' );
  const stateErrorMessage = $( '#shipping-state-error-message' );
  stateErrorMessage.hide();
  if ( state.val() ) {
    stateErrorMessage.hide();
    state.css( 'border', '1px solid lightgreen' );
    state.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    stateErrorMessage.html( 'Select a State' );
    stateErrorMessage.css( 'color', '#b00808' );

    // stateErrorMessage.css('background-color', '#b00808');
    // stateErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // stateErrorMessage.css('padding', '.7%');
    // stateErrorMessage.css('display', 'inline-block');
    // stateErrorMessage.css('position', 'absolute');
    stateErrorMessage.show();
    state.css( 'border', '1px solid salmon' );
    state.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isStateValid = false;
  }
}

function checkShippingCity() {
  const city = $( '#shipping_city' );
  const cityErrorMessage = $( '#city-shipping-error-message' );
  cityErrorMessage.hide();

  const pattern = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
  const formName = city.val();
  if ( city.isValid() && formName !== '' ) {
    cityErrorMessage.hide();
    city.addClass( 'field-is-valid' );
    if ( city.hasClass( 'field-is-invalid' ) ) {
      city.removeClass( 'field-is-invalid' );
    }

    // city.css( 'border', '2px solid lightgreen' );
    // city.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    cityErrorMessage.html( 'Invalid City' );
    cityErrorMessage.css( 'color', '#b00808' );

    // cityErrorMessage.css('background-color', '#b00808');
    // cityErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cityErrorMessage.css('padding', '.7%');
    // cityErrorMessage.css('display', 'inline-block');
    // cityErrorMessage.css('position', 'absolute');
    cityErrorMessage.show();
    city.addClass( 'field-is-invalid' );
    if ( city.hasClass( 'field-is-valid' ) ) {
      city.removeClass( 'field-is-valid' );
    }

    // city.css( 'border', '2px solid salmon' );
    // city.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isCityValid = false;
  }
}

function checkShippingZip() {
  const zipCode = $( '#shipping_zipcode' );
  const zipErrorMessage = $( '#shipping-zip-error-message' );
  zipErrorMessage.hide();
  const pattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const formName = zipCode.val();
  if ( zipCode.isValid() && formName !== '' ) {
    zipErrorMessage.hide();
    zipCode.addClass( 'field-is-valid' );
    if ( zipCode.hasClass( 'field-is-invalid' ) ) {
      zipCode.removeClass( 'field-is-invalid' );
    }

    // zipCode.css( 'border', '2px solid lightgreen' );
    // zipCode.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    zipErrorMessage.html( 'Invalid Zip Code' );
    zipErrorMessage.css( 'color', '#b00808' );
    zipErrorMessage.show();
    zipCode.addClass( 'field-is-invalid' );
    if ( zipCode.hasClass( 'field-is-valid' ) ) {
      zipCode.removeClass( 'field-is-valid' );
    }

    // zipCode.css( 'border', '2px solid salmon' );
    // zipCode.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isZipValid = false;
  }
}

function isShippingFormValid() {
  const setShippingAddressButton = $( '#shipping-info-submit-btn' );

  isAddress1Valid = true;
  isStateValid = true;
  isAddress2Valid = true;
  isCityValid = true;
  isZipValid = true;

  checkShippingAddress1();
  checkShippingAddress2();
  checkShippingCity();
  checkShippingZip();

  if ( isStateValid && isZipValid && isCityValid && isAddress1Valid === true ) {
    $( '.shipping-info-form' ).removeAttr( 'disabled' );
    setShippingAddressButton.removeAttr( 'disabled' );
    setShippingAddressButton.removeClass( 'disabled-button' );
  }else {
    $( '.shipping-info-form' ).attr( 'disabled', 'disabled' );
    setShippingAddressButton.addClass( 'disabled-button' );
  }
}

const shippingEventHandlers = {
  address1() {
    checkShippingAddress1();
    isShippingFormValid();
  },
  address2() {
    checkShippingAddress2();
    isShippingFormValid();
  },
  city() {
    checkShippingCity();
    isShippingFormValid();
  },
  state() {
    checkShippingState();
    isShippingFormValid();
  },
  zipcode() {
    checkShippingZip();
    isShippingFormValid();
  }
};

/* eslint no-multiple-empty-lines:0 */
$( () => {
  const address1 = $( '#shipping_address_1' );
  const address2 = $( '#shipping_address_2' );
  const state = $( '#shipping_user_state' );
  const city = $( '#shipping_city' );
  const zipCode = $( '#shipping_zipcode' );

  address1.on( 'change keyup', () => {
    shippingEventHandlers.address1();
  });
  address2.on( 'change keyup', () => {
    shippingEventHandlers.address2();
  });
  state.on( 'change keyup', () => {
    shippingEventHandlers.state();
  });
  city.on( 'change keyup', () => {
    shippingEventHandlers.city();
  });
  zipCode.on( 'change keyup', () => {
    shippingEventHandlers.zipcode();
  });
});

// module.exports = shippingEventHandlers;
