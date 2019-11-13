function getUserInformation() {
  const userFirstName = $( '#user_first_name' ).val();
  const userLastName = $( '#user_last_name' ).val();
  const userPhone = $( '#user_phone' ).val();
  const userEmail = $( '#user_email' ).val();
  const userAddress1 = $( '#user_address_1' ).val();
  const userAddress2 = $( '#user_address_2' ).val();
  const userState = $( '#user_state option:selected' ).text();
  const userCity = $( '#user_city' ).val();
  const userZipCode = $( '#user_zipcode' ).val();

  return [ userFirstName, userLastName, userPhone, userEmail, userAddress1, userAddress2,
  userState, userCity, userZipCode ];
}

function hideUserRegistration() {
  const userRegister = $( 'section.register-account' );
  userRegister.css( 'display', 'none' );
}

function hideUserOverview() {
  const userOverview = $( 'section.account-information' );
  userOverview.css( 'display', 'none' );
}

function showUserOverview() {
  const userOverview = $( 'section.account-information' );
  userOverview.css( 'display', 'block' );
}

function setUserOverview() {
  const [ firstName, lastName, phone, email, address1, address2,
  state, city, zipCode ] = getUserInformation();

  $( '.name-value' ).text( `${firstName} ${lastName}` );
  $( '.address-1-value' ).text( address1 );
  if ( address2 !== '' ) {
    $( '.address-2-value' ).text( address2 );
  }else {
    $( '.address-2-value' ).css( 'display', 'none' );
    $( '.address-2-label' ).css( 'display', 'none' );
    $( '.address-2-label:parent' ).css( 'display', 'none' );
  }
  $( '.city-value' ).text( city );
  $( '.state-value' ).text( state );
  $( '.zip-code-value' ).text( zipCode );
  $( '.phone-value' ).text( phone );
  $( '.email-value' ).text( email );

}

function submitUserForm() {
  console.log( 'Attempting to POST a new user...' );

  const [ firstName, lastName, phone, email, address1, address2,
    state, city, zipCode ] = getUserInformation();

  const userInformation = {
    fullname: ( `${firstName} ${lastName}` ),
    user_phone: phone,
    user_email: email,
    user_address1: address1,
    user_address2: address2,
    user_city: city,
    user_state: state,
    user_zipcode: zipCode
  };

  showUserOverview();

  $.post(
    '/users/sign_up',
    userInformation,
    ( data ) => {
      // eslint-disable-next-line no-alert
      alert( data );
    }
  ).done(
    setUserOverview()
  );

  // setUserOverview();
}

$( () => {

  hideUserOverview();
  $( '#register-user-btn' ).on( 'click', ( event ) => {
    event.preventDefault();
    submitUserForm();

    // setUserOverview();
    hideUserRegistration();
  });

  // $( '#register-user-btn' )
  //   .on( 'click', () => {
  //   });

});
