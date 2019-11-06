$( () => {


  $( '#register-user-btn' )
    .on( 'click', () => {


      $.ajax({
        type: 'POST',
        url: 'users/sign_up',
        data:
      })
    });

});
