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
  const userFirstName = $( '#user_first_name' ).val();
  const userLastName = $( '#user_last_name' ).val();
  const userPhone = $( '#user_phone' ).val();
  const userEmail = $( '#user_email' ).val();
  const address1 = $( '#user_address_1' ).val();
  const address2 = $( '#user_address_2' ).val();
  const state = $( '#user_state option:selected' ).text();
  const city = $( '#user_city' ).val();
  const zipCode = $( '#user_zipcode' ).val();

  $( '.name-value' ).text( `${userFirstName} ${userLastName}` );
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
  $( '.phone-value' ).text( userPhone );
  $( '.email-value' ).text( userEmail );

}

function submitUserForm() {
  console.log( 'Attempting to POST a new user...' );

  const userFirstName = $( '#user_first_name' ).val();
  const userLastName = $( '#user_last_name' ).val();
  const userPhone = $( '#user_phone' ).val();
  const userEmail = $( '#user_email' ).val();
  const address1 = $( '#user_address_1' ).val();
  const address2 = $( '#user_address_2' ).val();
  const state = $( '#user_state option:selected' ).text();
  const city = $( '#user_city' ).val();
  const zipCode = $( '#user_zipcode' ).val();

  showUserOverview();

  $.post(
    '/users/sign_up',
    {
      fullname: ( `${userFirstName} ${userLastName}` ),
      user_phone: userPhone,
      user_email: userEmail,
      user_address1: address1,
      user_address2: address2,
      user_city: city,
      user_state: state,
      user_zipcode: zipCode
    },
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
