const $ = require( 'jquery' );
global.jQuery = require( 'jquery' );

function getOrderItems() {
  // eslint-disable-next-line global-require
  const items = [];

  const rowsOfOrderItems = $( '.product-order' );

  rowsOfOrderItems.each( ( index, value ) => {
    const item = {};

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

function isCartNotEmpty() {
  return $( '.product-order' ).length > 0;
}

function submitOrder() {
  console.log( 'Attempting to save New Billing Information' );

  const orderItems = getOrderItems();
  const orderPrice = getOrderPrice();
  const username = $( '#account-username-header' ).text();

  if ( !username ) {
    // eslint-disable-next-line no-alert
    alert( 'Make an Account Before Completing a Purchase' );
  } else {
    const orderJSONRequest = {
      username,
      items: orderItems,
      totalPrice: orderPrice
    };

    console.log(
      'users/sign_up POST Request:\n',
      JSON.stringify( orderJSONRequest, null, 2 )
    );

    $.ajax({
      url: '/orders/new_order',
      type: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem( 'token' )}` },
      data: {
        username,
        items: orderItems,
        totalPrice: orderPrice
      },
      success: ( response ) => {
        // eslint-disable-next-line no-alert
        alert( response );
      }
    })
      .then( ( r ) => {
        return console.log( 'POST /orders/new_order is Over! ' );
      });

  }


}

$( () => {
  $( '#submit-order-information-btn' ).on( 'click', ( event ) => {
    if ( isCartNotEmpty() ) {
      event.preventDefault();
      submitOrder();
    } else {
      // eslint-disable-next-line no-alert
      alert( 'Add an Item to Your Cart Before Checking Out' );
    }
  });
});
