// const state = $('#shipping_user_state'); ca

const address1ErrorMessage = $('#address-1-error-message');
const address2ErrorMessage = $('#address-2-error-message');
const stateErrorMessage = $('#shipping-state-error-message');
const cityErrorMessage = $('#city-shipping-error-message');
const zipErrorMessage = $('#shipping-zip-error-message');

address1ErrorMessage.hide();
address2ErrorMessage.hide();
stateErrorMessage.hide();
cityErrorMessage.hide();
zipErrorMessage.hide();

let isAddress1Valid = true;
let isAddress2Valid = true;
// let isStateValid = true;
let isCityValid = true;
let isZipValid = true;



function checkShippingAddress1() {
  const address1 = $('#shipping_address_1');
  const pattern = /^\s*\S+(?:\s+\S+){2}/;
  const formName = address1.val();
  if (pattern.test(formName) && formName !== '') {
    address1ErrorMessage.hide();
    address1.css('border', '2px solid lightgreen');
    address1.css('background', 'url("../assets/Images/accepted-img.jpg")');
  } else {
    address1ErrorMessage.html('Please enter a correct input for address line 1');
    address1ErrorMessage.show();
    address1.css('border-bottom', '2px solid salmon');
    address1.css('background', 'url("../assets/Images/rejected-img.jpg")');
    isAddress1Valid = false;
  }
}

function checkShippingAddress2() {
  const address2 = $('#shipping_address_2');
  const pattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  const formName = address2.val();
  if (pattern.test(formName) || formName !== '') {
    address2ErrorMessage.hide();
    address2.css('border', '2px solid #151a2f');
  } else {
    address2ErrorMessage.html('Please enter a correct input for address line 1');
    address2ErrorMessage.show();
    address2.css('border-bottom', '2px solid #151a2f');
    isAddress2Valid = false;
  }
}

// function checkShippingState() {
//   const pattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
//   const formName = address2.val();
//   if (pattern.test(formName) && formName !== '') {
//     address2ErrorMessage.hide();
//     address2.css('border-bottom', '2px solid #34F458');
//   } else {
//     address2ErrorMessage.html('Please enter a correct input for address line 1');
//     address2ErrorMessage.show();
//     address2.css('border-bottom', '2px solid #F90A0A');
//     checkAddress2Valid = true;
//   }
// }

function checkShippingCity() {
  const city = $('#shipping_city');
  const pattern = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
  const formName = city.val();
  if (pattern.test(formName) && formName !== '') {
    cityErrorMessage.hide();
    city.css('border', '2px solid lightgreen');
    city.css('background', 'url("../assets/Images/accepted-img.jpg")');
  } else {
    cityErrorMessage.html('Please enter a correct input for address line 1');
    cityErrorMessage.show();
    city.css('border-bottom', '2px solid #151a2f');
    city.css('background', 'url("../assets/Images/rejected-img.jpg")');
    isCityValid = false;
  }
}

function checkShippingZip() {
  const zipCode = $('#shipping_zipcode');
  const pattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const formName = zipCode.val();
  if (pattern.test(formName) && formName !== '') {
    zipErrorMessage.hide();
    zipCode.css('border', '2px solid lightgreen');
    zipCode.css('background', 'url("../assets/Images/accepted-img.jpg")');
  } else {
    zipErrorMessage.html('Please enter a correct input for address line 1');
    zipErrorMessage.show();
    zipCode.css('border-bottom', '2px solid #151a2f');
    zipCode.css('background', 'url("../assets/Images/rejected-img.jpg")');
    isZipValid = false;
  }
}

/* eslint no-multiple-empty-lines:0 */
$(document).ready(() => {
  const address1 = $('#shipping_address_1');
  const address2 = $('#shipping_address_2');
  // const state = $('#shipping_user_state');
  const city = $('#shipping_city');
  const zipCode = $('#shipping_zipcode');

  address1.focusout(() => {
    checkShippingAddress1();
  });
  address2.focusout(() => {
    checkShippingAddress2();
  });
  // state.focusout(() => {
  //   checkShippingState();
  // });
  city.focusout(() => {
    checkShippingCity();
  });
  zipCode.focusout(() => {
    checkShippingZip();
  });

  address1.focusin(() => {
    checkShippingAddress1();
  });
  address2.focusin(() => {
    checkShippingAddress2();
  });
  // state.focusin(() => {
  //   checkShippingState();
  // });
  city.focusin(() => {
    checkShippingCity();
  });
  zipCode.focusin(() => {
    checkShippingZip();
  });

  $('.shipping-info-form').submit(() => {
    isAddress1Valid = true;
    isAddress2Valid = true;
    isCityValid = true;
    isZipValid = true;

    checkShippingAddress1();
    checkShippingAddress2();
    checkShippingCity();
    checkShippingZip();

    if (isAddress1Valid === true && isCityValid === true && isZipValid === true) {
      alert('Shipping Address Saved');
      return true;
    }
    alert('Please Fill Out a Shipping Address');
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
//   $('.shipping-info-form').validate({
//     rules: {
//       address_1: 'required',
//       address_2: 'optional',
//       city: 'required',
//       user_state: 'required',
//       zipcode: 'required',
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
