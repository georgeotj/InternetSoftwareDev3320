const productsDropDown = $( '#list-products' );

function appendToProductsDropDown( productsFromServer ) {
  $.each( productsFromServer, ( value, product ) => {
    productsDropDown.append(
      $( '<option></option>' )
        .val( value )
        .html(
          `<strong>${product.name}</strong> 
            &nbsp; <em>${product.description}</em> &nbsp; <b>$${product.unitPrice}</b>`
        )
    );
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
      }).done(
        console.log( 'GET /products/get_products Request is done' ),
        ( areProductsLoaded = true )
      );
    }
  });
});
