import { applicationState } from './application-state';

const $ = require( 'jquery' );

localStorage.setItem( 'ORDER_HISTORY_FLAG', 'False' );

function appendOrderHistory( orderResponse ) {
  console.log( 'Starting attempt to append order history' );

  $( '#user-order-table' ).css( 'display', 'table' );
  const itemsRow = $( 'td.orderItemsRow' );

  for ( let index = 0; index < orderResponse.length; index += 1 ) {
    console.log( 'Num items in this order: ', orderResponse[ index ].items.length );
    const orderItems = {};
    // for ( let j = 0; j < orderResponse[ index ].items.length; j += 1 ) {
    //
    // }

                    // eslint-disable-next-line max-len
    $( '#user-order-table > tbody' ).append( `<tr class="product-order">
      <td class='orderNumberRow'>${orderResponse[ index ].orderNumber}</td>
      <td class="orderItemsRow">${JSON.stringify( orderResponse[ index ].items )}</td>
      <td class="orderPrice">$${orderResponse[ index ].totalPrice}</td>
      </tr>` );
  }

  itemsRow.each( ( items ) => {
    const new_text = $( this ).html()
      .replace( '"[', '' )
      .replace( '{', '' )
      .replace( '},', '' )
      .replace( '}', '' )
      .replace( ']"', '' )
      .replace( '"itemID: "', 'Item Number: ' )
      .replace( '"quantity: "', 'Quantity: ' );
    $( this ).html( new_text );
  });

  itemsRow.each( () => {
    const $element = $( this );
    const new_text = $element.text()
      .replace( '"[', '' )
      .replace( '{', '' )
      .replace( '},', '' )
      .replace( '}', '' )
      .replace( ']"', '' )
      .replace( '"itemID: "', 'Item Number: ' )
      .replace( '"quantity: "', 'Quantity: ' );
    $element.text( new_text );
  });

  itemsRow.html( itemsRow.html().replace( '"[', '' ) );
  itemsRow.html( itemsRow.html().replace( '{', '' ) );
  itemsRow.html( itemsRow.html().replace( '},', '' ) );
  itemsRow.html( itemsRow.html().replace( '}', '' ) );
  itemsRow.html( itemsRow.html().replace( ']"', '' ) );
  itemsRow.html( itemsRow.html().replace( '"itemID: "', 'Item Number: ' ) );
  itemsRow.html( itemsRow.html().replace( '"quantity: "', 'Quantity: ' ) );

}

function getOrderHistory() {
  console.log( 'Attempting to get User Order Information..' );

  const user = {
    userID: localStorage.getItem( 'userID' ),
    username: localStorage.getItem( 'username' )
  };

  $.ajax({
    url: '/orders/user_orders',
    type: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem( 'token' )}` },
    data: user
  }).then( ( response ) => {

    console.log( response );
    applicationState.registeredUserOrderHistoryAccountState();
    console.log( response.length );
    appendOrderHistory( response );

  }).catch( ( err ) => {
    // Error during request
    console.log( `Error logging out: ${err}` );
  });
}

$( () => {
  $( '#user-order-table' ).css( 'display', 'none' );

  $( '#order-history-link' ).on( 'click', () => {
    if ( localStorage.getItem( 'ORDER_HISTORY_FLAG' ) === 'False' ) {
      getOrderHistory();
      localStorage.setItem( 'ORDER_HISTORY_FLAG', 'True' );
    }
  });
});
