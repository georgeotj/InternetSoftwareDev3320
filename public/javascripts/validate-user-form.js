const { validate } = require( 'jquery-validation' );
const $ = require( 'jquery' );

$( () => {

  const pattern = /^[a-z0-9]+$/i;

  $.validator.addMethod( 'alphanum', ( value, element ) => {
    return !$.validator.methods.required( value, element ) || /^[a-z0-9]+$/i.text( value );
  }, 'Only letters and numbers are allowed' );

  $( 'form[name=\'create-account-form\']' )
    .validate({
      rules: {
        'new-username': {
          required: true,
          minlength: 5
          // alphanum: {
          //   required: {
          //     depends: ( element ) => {
          //       return pattern.test( $( '#new-username' ) );
          //     }
          //   }
          // }
        },
        'new-password': {
          required: true,
          minlength: 8
        },
        'new-password-confirm': {
          required: true,
          minlength: 8,
          equalTo: '#new-password'
        }
      },
      messages: {
        'new-username': {
          required: 'Choose a username',
          minlength: 'Username must be at least 5 characters long'
        },
        'new-password': {
          required: 'Choose a password',
          minlength: 'Password must be 8 characters long'
        },
        'new-password-confirm': {
          required: 'Re-enter your password',
          equalTo: 'Passwords don\'t match'
        }
      },
      submitHandler( form, event ) {
        event.preventDefault;
      }
    });

  $( 'form[name=\'sign-in-form\']' )
    .validate({
      rules: {
        'returning-username': {
            required: true,
            minlength: 5
        },
        'returning-password': {
          required: true,
          minlength: 8
        }
      },
    messages: {
        'returning-username': {
          required: 'Enter your username',
          minlength: 'Username doesn\'t meet the required length'
      },
        'returning-password': {
          required: 'Please enter a password',
          minlength: 'Password doesn\'t meet the required length'
        }
    },
      submitHandler( form, event ) {
        event.preventDefault;
      }
  });
});
