const $ = require( 'jquery' );
// eslint-disable-next-line import/no-unresolved
const jquery = require( '../../node_modules/jquery/dist/jquery.min' );

global.jQuery = require( 'jquery' );

const userStateSelection = $( '#user_state' );
const shippingStateSelection = $( '#shipping_user_state' );

function setStateSelect( states ) {
  for ( let index = 0; index < states.length; index += 1 ) {
    userStateSelection.append( $( '<option></option>' )
      .val( index + 1 )
      .html( states[ index ].name ) );
    shippingStateSelection.append( $( '<option></option>' )
      .val( index + 1 )
      .html( states[ index ].name ) );
  }
}

$( () => {
  console.log( 'Attempting to GET states...' );

  $.ajax({
    url: '/states',
    type: 'GET',
    success: ( states ) => {
      console.log( states );
      console.log( states.states.length );
      console.log( states.states[ 0 ].name );

      setStateSelect( states.states );
    },
    error( x, e ) {
      console.log( e, x );
    }
  });

  // $.each( statesArray, ( value, state ) => {
  //   userStateSelection.append( $( '<option></option>' ).val( value )
  //     .html( `${state.name}` ) );
  //   shippingStateSelection.append( $( '<option></option>' ).val( value )
  //     .html( `${state.name}` ) );
  // });

});
