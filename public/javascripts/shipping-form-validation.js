// const state = $('#shipping_user_state'); ca
let isAddress1Valid = true;
let isAddress2Valid = true;
let isStateValid = true;
let isCityValid = true;
let isZipValid = true;

function checkShippingAddress1() {
  const address1 = $( '#shipping_address_1' );
  const address1ErrorMessage = $( '#address-1-error-message' );
  address1ErrorMessage.hide();

  const pattern = /^\s*\S+(?:\s+\S+){2}/;
  const formName = address1.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    address1ErrorMessage.hide();
    address1.addClass( 'form-is-valid' );

    // address1.css( 'border', '2px solid lightgreen' );
    // address1.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    address1ErrorMessage.html( 'Invalid Address' );
    address1ErrorMessage.css( 'color', '#b00808' );

    // address1ErrorMessage.css('background-color', '#b00808');
    // address1ErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // address1ErrorMessage.css('padding', '.7%');
    // address1ErrorMessage.css('display', 'inline-block');
    // address1ErrorMessage.css('position', 'absolute');
    address1ErrorMessage.show();
    address1.addClass( 'form-is-invalid' );

    // address1.css( 'border', '2px solid salmon' );
    // address1.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAddress1Valid = false;
  }
}

function checkShippingAddress2() {
  const address2 = $( '#shipping_address_2' );
  const address2ErrorMessage = $( '#address-2-error-message' );
  address2ErrorMessage.hide();

  const pattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  const formName = address2.val();
  if ( pattern.test( formName ) || formName === '' ) {
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
    state.addClass( 'form-is-valid' );

    // state.css( 'border', '1px solid lightgreen' );
    // state.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    stateErrorMessage.html( 'Select a State' );
    stateErrorMessage.css( 'color', '#b00808' );

    // stateErrorMessage.css('background-color', '#b00808');
    // stateErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // stateErrorMessage.css('padding', '.7%');
    // stateErrorMessage.css('display', 'inline-block');
    // stateErrorMessage.css('position', 'absolute');
    stateErrorMessage.show();
    state.addClass( 'form-is-invalid' );

    // state.css( 'border', '1px solid salmon' );
    // state.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isStateValid = false;
  }
}

function checkShippingCity() {
  const city = $( '#shipping_city' );
  const cityErrorMessage = $( '#city-shipping-error-message' );
  cityErrorMessage.hide();

  const pattern = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
  const formName = city.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    cityErrorMessage.hide();
    city.addClass( 'form-is-valid' );

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
    city.addClass( 'form-is-invalid' );

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
  if ( pattern.test( formName ) && formName !== '' ) {
    zipErrorMessage.hide();
    zipCode.addClass( 'form-is-valid' );

    // zipCode.css( 'border', '2px solid lightgreen' );
    // zipCode.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    zipErrorMessage.html( 'Invalid Zip Code' );
    zipErrorMessage.css( 'color', '#b00808' );
    zipErrorMessage.show();
    zipCode.addClass( 'form-is-invalid' );

    // zipCode.css( 'border', '2px solid salmon' );
    // zipCode.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isZipValid = false;
  }
}

/* eslint no-multiple-empty-lines:0 */
$( document ).ready( () => {
  const address1 = $( '#shipping_address_1' );
  const address2 = $( '#shipping_address_2' );
  const state = $( '#shipping_user_state' );
  const city = $( '#shipping_city' );
  const zipCode = $( '#shipping_zipcode' );

  // address1.focusout(() => {
  //   checkShippingAddress1();
  // });
  // address2.focusout(() => {
  //   checkShippingAddress2();
  // });
  // // state.focusout(() => {
  // //   checkShippingState();
  // // });
  // city.focusout(() => {
  //   checkShippingCity();
  // });
  // zipCode.focusout(() => {
  //   checkShippingZip();
  // });
  //
  // address1.focusin(() => {
  //   checkShippingAddress1();
  // });
  // address2.focusin(() => {
  //   checkShippingAddress2();
  // });
  // // state.focusin(() => {
  // //   checkShippingState();
  // // });
  // city.focusin(() => {
  //   checkShippingCity();
  // });
  // zipCode.focusin(() => {
  //   checkShippingZip();
  // });

  address1.on( 'change keyup', () => {
    checkShippingAddress1();
  });
  address2.on( 'change keyup', () => {
    checkShippingAddress2();
  });
  state.on( 'change keyup', () => {
    checkShippingState();
  });
  city.on( 'change keyup', () => {
    checkShippingCity();
  });
  zipCode.on( 'change keyup', () => {
    checkShippingZip();
  });

  $( '.shipping-info-form' ).submit( () => {
    isAddress1Valid = true;
    isAddress2Valid = true;
    isCityValid = true;
    isZipValid = true;

    checkShippingAddress1();
    checkShippingAddress2();
    checkShippingCity();
    checkShippingZip();

    if ( isStateValid && isZipValid && isCityValid && isAddress1Valid === true ) {
      alert( 'Shipping Address Saved' );
      return true;
    }
    alert( 'Please Fill Out a Shipping Address' );
    return false;
  });



  // $('#shipping_address_1').on('input', function () {
  //   let address_1_v2 = $(this).val();
  //   alert(address_1_v2);
  // });
});

// $('#shipping-info-form').validate({
//   onsubmit: false,
//   submitHandler(form) {
//     if ($(form).valid()) {
//       form.submit();
//     }
//     return false;
//   },
// });
//
// // eslint-disable-next-line no-multi-assign
// window.$ = window.jQuery = jQuery;
//
// $(document).ready(() => {
//   $('#shipping-info-form').validate({
//     rules: {
//       address_1: 'required',
//       address_2: 'optional',
//       city: 'required',
//       user_state: 'required',
//       zipcode: {
//          required: true,
//          minlength: 5,
//          maxlength: 9,
//     },
//     messages: {
//       address_1: 'Address is required',
//       city: 'City is required',
//       user_state: 'State is required',
//       zipcode: 'Zip Code is required',
//     },
//     submitHandler(form) {
//       form.submit();
//     },
//   });
// });
