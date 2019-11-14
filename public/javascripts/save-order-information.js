const $ = require( 'jquery' );
global.jQuery = require( 'jquery' );

function getOrderItems() {
  const items = [];
  $( '.product-order' ).each( () => {
    const productName = $( this > '.productName' ).text();
    const productQuantity = $( this > '.productUnits' ).text();

    const productID = productName.substr( productName.indexOf( '-' ) + 1 );

    const item = {};
    item.itemID = productID;
    item.quantity = productQuantity;

    items.push( item );
  });

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

  const orderJSONRequest = {
    userName,
    items: orderItems,
    totalPrice: orderPrice
  };

  console.log(
    'users/sign_up POST Request:\n',
    JSON.stringify( orderJSONRequest, null, 2 )
  );

  // $.post(
  //   '/orders/new_order',
  //   orderJSONRequest,
  //   ( data ) => {
  //     // eslint-disable-next-line no-alert
  //     alert( data );
  //   }
  // ).done(
  //   console.log( 'The order AJAX is over' )
  // );
}

$( () => {
  $( '#submit-payment-information-btn' ).on( 'click', ( event ) => {
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
