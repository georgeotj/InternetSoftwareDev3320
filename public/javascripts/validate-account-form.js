// const state = $('#user_state'); ca
let isAccountFirstNameValid = true;
let isAccountLastNameValid = true;
let isAccountPhoneValid = true;
let isAccountEmailValid = true;
let isAccountAddress1Valid = true;
let isAccountAddress2Valid = true;
let isAccountStateValid = true;
let isAccountCityValid = true;
let isAccountZipValid = true;

function checkUserFirstNameValid() {
  const userName = $( '#user_first_name' );
  const userNameErrorMessage = $( '#user-first-name-error-message' );
  userNameErrorMessage.hide();

  const pattern = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  const formName = userName.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    userNameErrorMessage.hide();
    userName.css( 'border', '2px solid lightgreen' );
    userName.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    userNameErrorMessage.html( 'Invalid First Name' );
    userNameErrorMessage.css( 'color', '#b00808' );
    userNameErrorMessage.show();
    userName.css( 'border', '2px solid salmon' );
    userName.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAccountFirstNameValid = false;
  }
}

function checkUserLastNameValid() {
  const userLastName = $( '#user_last_name' );
  const userLastNameErrorMessage = $( '#user-last-name-error-message' );
  userLastNameErrorMessage.hide();

  const pattern = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  const formName = userLastName.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    userLastNameErrorMessage.hide();
    userLastName.css( 'border', '2px solid lightgreen' );
    userLastName.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    userLastNameErrorMessage.html( 'Invalid Last Name' );
    userLastNameErrorMessage.css( 'color', '#b00808' );
    userLastNameErrorMessage.show();
    userLastName.css( 'border', '2px solid salmon' );
    userLastName.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAccountLastNameValid = false;
  }
}

function checkUserPhoneValid() {
  const userPhone = $( '#user_phone' );
  const userPhoneErrorMessage = $( '#user-phone-error-message' );
  userPhoneErrorMessage.hide();

  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const formName = userPhone.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    userPhoneErrorMessage.hide();
    userPhone.css( 'border', '2px solid lightgreen' );
    userPhone.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    userPhoneErrorMessage.html( 'Invalid Phone' );
    userPhoneErrorMessage.css( 'color', '#b00808' );
    userPhoneErrorMessage.show();
    userPhone.css( 'border', '2px solid salmon' );
    userPhone.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAccountPhoneValid = false;
  }
}

function checkUserEmailValid() {
  const userEmail = $( '#user_email' );
  const userEmailErrorMessage = $( '#user-email-error-message' );
  userEmailErrorMessage.hide();

  const pattern = /\S+@\S+\.\S+/;
  const formName = userEmail.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    userEmailErrorMessage.hide();
    userEmail.css( 'border', '2px solid lightgreen' );
    userEmail.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    userEmailErrorMessage.html( 'Invalid Email' );
    userEmailErrorMessage.css( 'color', '#b00808' );
    userEmailErrorMessage.show();
    userEmail.css( 'border', '2px solid salmon' );
    userEmail.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAccountEmailValid = false;
  }
}



function checkUserAddress1Valid() {
  const address1 = $( '#user_address_1' );
  const address1ErrorMessage = $( '#user-address-1-error-message' );
  address1ErrorMessage.hide();

  const pattern = /^\s*\S+(?:\s+\S+){2}/;
  const formName = address1.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    address1ErrorMessage.hide();
    address1.css( 'border', '2px solid lightgreen' );
    address1.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    address1ErrorMessage.html( 'Invalid Address' );
    address1ErrorMessage.css( 'color', '#b00808' );

    // address1ErrorMessage.css('background-color', '#b00808');
    // address1ErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // address1ErrorMessage.css('padding', '.7%');
    // address1ErrorMessage.css('display', 'inline-block');
    // address1ErrorMessage.css('position', 'absolute');
    address1ErrorMessage.show();
    address1.css( 'border', '2px solid salmon' );
    address1.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAccountAddress1Valid = false;
  }
}

function checkUserAddress2Valid2() {
  const address2 = $( '#user_address_2' );
  const address2ErrorMessage = $( '#user-address-2-error-message' );
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
    isAccountAddress2Valid = false;
  }
}

function checkAccountStateValid() {
  const state = $( '#user_state' );
  const stateErrorMessage = $( '#user-state-error-message' );
  stateErrorMessage.hide();
  if ( state.val() ) {
    stateErrorMessage.hide();
    state.css( 'border', '1px solid #34F458' );
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
    state.css( 'border', '1px solid #F90A0A' );
    state.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAccountStateValid = false;
  }
}

function checkAccountCityValid() {
  const city = $( '#user_city' );
  const cityErrorMessage = $( '#user-city-error-message' );
  cityErrorMessage.hide();

  const pattern = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
  const formName = city.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    cityErrorMessage.hide();
    city.css( 'border', '2px solid lightgreen' );
    city.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    cityErrorMessage.html( 'Invalid City' );
    cityErrorMessage.css( 'color', '#b00808' );

    // cityErrorMessage.css('background-color', '#b00808');
    // cityErrorMessage.css('clip-path', 'polygon(40% 10%, 40% 37%, 100% 37%, 100% 63%, 40% 63%, 40% 90%, 0% 50%)');
    // cityErrorMessage.css('padding', '.7%');
    // cityErrorMessage.css('display', 'inline-block');
    // cityErrorMessage.css('position', 'absolute');
    cityErrorMessage.show();
    city.css( 'border', '2px solid salmon' );
    city.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAccountCityValid = false;
  }
}

function checkAccountZipValid() {
  const zipCode = $( '#user_zipcode' );
  const zipErrorMessage = $( '#user-zip-error-message' );
  zipErrorMessage.hide();
  const pattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const formName = zipCode.val();
  if ( pattern.test( formName ) && formName !== '' ) {
    zipErrorMessage.hide();
    zipCode.css( 'border', '2px solid lightgreen' );
    zipCode.css( 'box-shadow', '0 0 8px 2px rgba(152, 251, 152, 0.75)' );
  }else {
    zipErrorMessage.html( 'Invalid Zip Code' );
    zipErrorMessage.css( 'color', '#b00808' );
    zipErrorMessage.show();
    zipCode.css( 'border', '2px solid salmon' );
    zipCode.css( 'box-shadow', '0 0 8px 2px rgba(250, 128, 114, 0.75)' );
    isAccountZipValid = false;
  }
}

function isFormValid() {
  const registerButton = $( '#register-user-btn' );

  isAccountAddress1Valid = true;
  isAccountAddress2Valid = true;
  isAccountCityValid = true;
  isAccountZipValid = true;
  isAccountEmailValid = true;
  isAccountPhoneValid = true;
  isAccountLastNameValid = true;
  isAccountFirstNameValid = true;

  checkUserFirstNameValid();
  checkUserLastNameValid();
  checkUserPhoneValid();
  checkUserEmailValid();
  checkUserAddress1Valid();
  checkUserAddress2Valid2();
  checkAccountCityValid();
  checkAccountZipValid();

  if ( isAccountStateValid && isAccountZipValid && isAccountCityValid &&
    isAccountAddress1Valid && isAccountFirstNameValid && isAccountLastNameValid &&
    isAccountPhoneValid && isAccountEmailValid === true ) {
    $( '.register-user-form' ).removeAttr( 'disabled' );
    registerButton.removeAttr( 'disabled' );
    registerButton.removeClass( 'disabled-button' );
  }else {
    $( '.register-user-form' ).attr( 'disabled', 'disabled' );
    registerButton.addClass( 'disabled-button' );

  }
}

/* eslint no-multiple-empty-lines:0 */
$( () => {
  const userName = $( '#user_first_name' );
  const userLastName = $( '#user_last_name' );
  const userPhone = $( '#user_phone' );
  const userEmail = $( '#user_email' );
  const address1 = $( '#user_address_1' );
  const address2 = $( '#user_address_2' );
  const state = $( '#user_state' );
  const city = $( '#user_city' );
  const zipCode = $( '#user_zipcode' );



  userName.on( 'change keyup', () => {
    checkUserFirstNameValid();
    isFormValid();
  });
  userLastName.on( 'change keyup', () => {
    checkUserLastNameValid();
    isFormValid();
  });
  userPhone.on( 'change keyup', () => {
    checkUserPhoneValid();
    isFormValid();
  });
  userEmail.on( 'change keyup', () => {
    checkUserEmailValid();
    isFormValid();
  });
  address1.on( 'change keyup', () => {
    checkUserAddress1Valid();
    isFormValid();
  });
  address2.on( 'change keyup', () => {
    checkUserAddress2Valid2();
  });
  state.on( 'change keyup', () => {
    checkAccountStateValid();
    isFormValid();
  });
  city.on( 'change keyup', () => {
    checkAccountCityValid();
    isFormValid();
  });
  zipCode.on( 'change keyup', () => {
    checkAccountZipValid();
    isFormValid();
  });
});
