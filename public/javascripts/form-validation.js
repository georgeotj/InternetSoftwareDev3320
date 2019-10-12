import jQuery from 'jquery';

// eslint-disable-next-line no-multi-assign
window.$ = window.jQuery = jQuery;

$('.shipping-info-form')[0].checkValidity();

$(document).ready(() => {
  $('.shipping-info-form').validate({
    rules: {
      address_1: 'required',
      address_2: 'optional',
      city: 'required',
      user_state: 'required',
      zipcode: 'required',
    },
    messages: {
      address_1: 'Address is required',
      city: 'City is required',
      user_state: 'State is required',
      zipcode: 'Zip Code is required',
    },
    submitHandler(form) {
      form.submit();
    },
  });
});
