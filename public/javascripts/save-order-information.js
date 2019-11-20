const $ = require( 'jquery' );
global.jQuery = require( 'jquery' );

function getOrderItems() {
  // eslint-disable-next-line global-require
  const items = [];

  const rowsOfOrderItems = $( '.product-order' );

  rowsOfOrderItems.each( ( index, value ) => {
    const item = {};

    // console.log( $( ':eq(1)', $( this ) ).html() );
    // console.log( $( ':eq(1)', $( this ) ).text() );
    // console.log( $( ':eq(0)', $( this ) ).val() );
    // // console.log( this.cells[ 0 ].innerHTML );
    // // console.log( this.cells[ 0 ].innerText );
    // // console.log( this.cells[ 1 ].innerHTML );
    // console.log( $( this ).children( '.productID' ).text() );
    // console.log( $( this ).children( '.productName' ).text() );
    // console.log( $( this ).children( 'td.productName' ).val() );
    // console.log( $( this ).children( 'td.productName' ).text() );
    // console.log( $( this ).children( 'td.productName' ).html() );
    // console.log( $( this ).children( 'td.productName' ).eq( 1 ).text() );
    // console.log( $( this ).children( 'td.productName' ).eq( 1 ).html() );
    // console.log( $( this ).children().first().text() );
    // console.log( $( this ).children( 'td' ).slice( 1, 2 ).text() );
    // console.log( $( this ).children( 'td' ).first()
    //                                     .next()
    //                                         .text() );
    // console.log( $( this ).firstElementChild.text() );
    // console.log( $( this ).firstElementChild.next().text() );

    // console.log( $( this ).eq( 1 ).html() );
    // console.log( $( this ).children( 'td' ).eq( 1 ).text() );
    // console.log( $( this ).find( '.productName' ).text() );
    // console.log( $( this ).get( 1 ).text() );
    // console.log( $( this ).first().text() );
    // console.log( $( this ).first().next().text() );
    // console.log( $( this ).get( 1 ).value() );
                      //  .children[ 1 ]
    item.itemID = $( '.productID' ).eq( index ).text();
    item.quantity = $( '.productUnits' ).eq( index ).text();

    console.log( 'An item\'s ID from the order:', item.itemID );
    console.log( 'An item\'s Name from the order:', item.name );

    items.push( item );
  });
  console.log( 'This is the user\'s order: ', items );
  return items;
}

function getOrderPrice() {
  return $( '#checkout-total-value' )
    .text()
    .slice( 1 );
}

function checkEmptyCart() {
  return !!$( '.product-order' ).length;
}

function submitOrder() {
  console.log( 'Attempting to save New Billing Information' );

  const orderItems = getOrderItems();
  const orderPrice = getOrderPrice();
  const userName = $( '.name-value' ).text();

  if ( !userName ) {
    // eslint-disable-next-line no-alert
    alert( 'Make an Account Before Completing a Purchase' );
  }

  const orderJSONRequest = {
    userName: 'Trevor McDougald',
    items: orderItems,
    totalPrice: orderPrice
  };

  console.log(
    'users/sign_up POST Request:\n',
    JSON.stringify( orderJSONRequest, null, 2 )
  );

  $.post(
    '/orders/new_order',
    {
      userName: 'Trevor McDougald',
      items: orderItems,
      totalPrice: orderPrice
    },
    ( data ) => {
      // eslint-disable-next-line no-alert
      alert( data );
    }
  )
    .then( ( r ) => { return console.log( 'POST /orders/new_order is Over! ' ); });
}

$( () => {
  $( '#submit-order-information-btn' ).on( 'click', ( event ) => {
    event.preventDefault();
    submitOrder();

    // if ( $( 'section.account-information' ).css( 'display' ) === 'none' ) {
    //
    //   // eslint-disable-next-line no-alert
    //   alert( 'Register an Account Before Placing an Order!' );
    // }else if ( !checkEmptyCart() ) {
    //   // eslint-disable-next-line no-alert
    //   alert( 'Your Cart is Empty!' );
    // }else {
    //   submitOrder();
    // }
  });
});
