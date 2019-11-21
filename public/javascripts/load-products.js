const $ = require( 'jquery' );

global.jQuery = require( 'jquery' );


const productsDropDown = $( '#list-products' );
const storeItemsTable = $( '#hidden-item-table > tbody' );


function appendToProductsDropDown( productsFromServer ) {
  $.each( productsFromServer, ( value, product ) => {
    productsDropDown.append(
      $( '<option></option>' )
        .val( product.productID )
        .html(
          `<strong>${product.name}</strong> 
            &nbsp; <em>${product.description}</em> &nbsp; <b>$${product.unitPrice}</b>`
        )
    );
  });
}

function appendToStoreItemsTable( productsFromServer ) {
  $.each( productsFromServer, ( value, product ) => {
    storeItemsTable.append( `<tr class="store-single-item">
                    <td class='store-item-ID'>${product.productID}</td>
                    <td class='store-item-name'>${product.name}</td>
                    <td class='store-item-description'>${product.description}</td>
                    <td class='store-item-unit-price'>${product.unitPrice}</td>
                  </tr>` );
  });
}

$( () => {
  let areProductsLoaded = false;

  productsDropDown.on( 'click', () => {
    if ( areProductsLoaded === false ) {
      $.get( '/products/get_products', ( serverResponse ) => {
        console.log( 'This is the JSON response:' );
        console.log( serverResponse );
        appendToProductsDropDown( serverResponse.products );
        appendToStoreItemsTable( serverResponse.products );
      })
        .done(
          console.log( 'GET /products/get_products Request is done' ),
          areProductsLoaded = true

        );
    }
  });
});
