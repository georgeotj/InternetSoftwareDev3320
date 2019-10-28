$( () => {
  const products = [
    {
      name: 'Product-1: ',
      price: '$1'
    },
    {
      name: 'Product-2: ',
      price: '$2'
    },
    {
      name: 'Product-3: ',
      price: '$3'
    },
    {
      name: 'Product-4: ',
      price: '$4'
    },
    {
      name: 'Product-5: ',
      price: '$5'
    },
    {
      name: 'Product-6: ',
      price: '$6'
    },
    {
      name: 'Product-7: ',
      price: '$7'
    },
    {
      name: 'Product-8: ',
      price: '$8'
    }
  ];

  const productDropDown = $( '#list-products' );
  const productOrders = [];
  let subtotal;

  $.each( products, ( value, product ) => {
    productDropDown.append( $( '<option></option>' ).val( value ).html( `${product.name} 
    &nbsp;&nbsp;&nbsp;&nbsp; ${product.price}` ) );
  });


function getSelectedProductPrice() {
    const $selectedItem = productDropDown.find( 'option:selected' );
    const textOfItem = $selectedItem.text();
    const getProductPrice = textOfItem.substr( textOfItem.indexOf( '$' ) + 1 );
    return Number( getProductPrice );
  }


function displayProductPrice( produceValue ) {
    document.getElementById( 'unit-price' ).value = Number.isNaN( produceValue ) ? 0 : produceValue;
  }


function getItemQuantity( units ) {
    return $( units ).val();
  }


function getSelectedOrderPrice() {
    const quantity = getItemQuantity( '#item-units' );
    return quantity * getSelectedProductPrice();
  }

  $( '#item-units' ).on( 'change', () => {
    // Const quantity = getItemQuantity('#item-units');
    // const totalPrice = quantity * getSelectedProductPrice();
    const totalPrice = getSelectedOrderPrice();
    displayProductPrice( totalPrice );
  });

  productDropDown.on( 'change', () => {
    const selectedItemPrice = getSelectedOrderPrice();
    displayProductPrice( selectedItemPrice );
  });


function getProductName() {
    const $selectedItem = productDropDown.find( 'option:selected' );
    const textOfProduct = $selectedItem.text();
    const productDetails = textOfProduct.split( ' ' );
    return productDetails[ 0 ].substr( 0,
      productDetails[ 0 ].length - 1 );
  }


function appendOrderToCart( productName, productUnits, productValue ) {
    $( '#cart-list > tbody' ).append( `<tr>
                                    <td>${productName}</td>
                                    <td>${productUnits}</td>
                                    <td class="order-total">$${productValue}</td>
                                    </tr>` );
  }


function calculateSubtotal() {
    subtotal = productOrders.length > 1 ?
      productOrders.reduce( ( prev, next ) => prev + next, 0 ) : productOrders;
  }

function displaySubtotal() {
    const cartSubtotal = $( '#cart-subtotal-number' );
    cartSubtotal.text( `$${subtotal}` );
  }

function addOrderTotalToSubtotal( orderTotal ) {
    productOrders.push( orderTotal );
    calculateSubtotal();
  }

  $( '#add-item-to-cart-button' ).on( 'click', () => {
    if ( getSelectedOrderPrice() !== 0 && !Number.isNaN( getSelectedProductPrice() ) ) {
      const productName = getProductName();
      const productValue = getSelectedOrderPrice();
      const productUnits = getItemQuantity( '#item-units' );
      appendOrderToCart( productName, productUnits, productValue );

      addOrderTotalToSubtotal( productValue );
      displaySubtotal();
    }
  });

  $( '#clear-cart-button' ).on( 'click', () => {
    for ( let i = 1; i < productOrders.length + 1; i += 1 ) {
      document.getElementById( 'cart-list' ).deleteRow( -1 );
    }
    productOrders.splice( 0, productOrders.length );
    subtotal = 0;
    displaySubtotal();
  });

  const checkoutCalculations = {
    getOrderTaxes() {
      return this.orderSubtotal * 0.08;
    },
    getOrderShipping() {
      return this.orderSubtotal * 0.03;
    },
    getOrderTotalCost() {
      return +this.orderSubtotal + +this.orderTaxes + +this.orderShipping;
    },

    setOrderValues( newSubtotal ) {
      this.orderSubtotal = newSubtotal;
      this.orderTaxes = this.getOrderTaxes();
      this.orderShipping = this.getOrderShipping();
      this.orderTotalCost = this.getOrderTotalCost();
    },
    getOrderValues() {
      return [
        +this.orderSubtotal,
        +this.orderTaxes,
        +this.orderShipping,
        +this.orderTotalCost
      ];
    }
  };

  $( '#send-cart-to-checkout-button' ).on( 'click', () => {
    checkoutCalculations.setOrderValues( subtotal );
    const [
      initialCost,
      taxes,
      shipping,
      totalCost
    ] = checkoutCalculations.getOrderValues();

    $( '#checkout-subtotal-value' ).text( `$${Number( initialCost ).toFixed( 2 )}` );
    $( '#checkout-taxes-value' ).text( `$${Number( taxes ).toFixed( 2 )}` );
    $( '#checkout-shipping-value' ).text( `$${Number( shipping ).toFixed( 2 )}` );
    $( '#checkout-total-value' ).text( `$${Number( totalCost ).toFixed( 2 )}` );
  });
});
