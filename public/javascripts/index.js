import '../../node_modules/jquery/dist/jquery.min';
import '../../node_modules/jquery-ui-dist/jquery-ui.min';
// eslint-disable-next-line import/no-unresolved
import '../../node_modules/jquery-ui-dist/jquery-ui.min.css';
// eslint-disable-next-line import/no-unresolved
import '../../node_modules/jquery-validation/dist/jquery.validate.min';


import '../assets/Images/create-account-icon.jpg';
import '../assets/Images/sign-into-account-icon.jpg';

// // eslint-disable-next-line no-multi-assign
// window.$ = window.jQuery = require( 'jquery' );

import loadProducts from './load-products';
import loadStates from './load-states';
import navigationButtons from './navigation-buttons';
import saveOrderInformation from './save-order-information';
import savePaymentInformation from './save-payment-information';
import saveShippingInformation from './save-shipping-information';
import saveUserInformation from './save-user-information';
import shoppingCart from './shopping-cart';
import validateAccountForm from './validate-account-form';
import validateCheckoutForm from './validate-checkout-form';
import validateShippingForm from './validate-shipping-form';
import closingApplication from './application-closed';

import './application-state';
import './validate-user-form';
import './register-user';
import './payment-state';
import './login-user';

console.log( loadStates );

require( '../../node_modules/babel-runtime/regenerator' );
// require( 'webpack-hot-middleware/client' );
require( '../stylesheets/style.css' );

const $ = require( '../../node_modules/jquery/dist/jquery.min' );

global.jQuery = require( 'jquery' );

$( () => {
  loadProducts();
  loadStates();
  navigationButtons();
  saveOrderInformation();
  savePaymentInformation();
  saveShippingInformation();
  saveUserInformation();
  shoppingCart();
  validateCheckoutForm();
  validateAccountForm();
  validateShippingForm();
  closingApplication();
});

// eslint-disable-next-line no-multi-assign
module.exports = $.fn.isValid = function isValid() {
  return this[ 0 ].checkValidity();
};
