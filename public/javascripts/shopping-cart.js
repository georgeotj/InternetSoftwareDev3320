$( () => {

  const productDropDown = $( '#list-products' );
  const productOrders = [];
  let subtotal;


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
      return `${productDetails[ 0 ]}-${productDetails[ 1 ]}`;
    }


  function appendOrderToCart( productName, productUnits, productValue ) {
    const rowProduct = `td.${productName}`;
    console.log( $( rowProduct ).length );
    if ( $( rowProduct ).length === 1 ) {
      const unitsIdentifier = $( `td.units-${productName}` );
      const totalCostIdentifier = $( `td.total-cost-of-${productName}` );

      const oldUnits = unitsIdentifier.html();
      const oldItemCostDollarAmount = totalCostIdentifier.html();
      const oldItemCostNumber = oldItemCostDollarAmount
        .substr( oldItemCostDollarAmount.indexOf( '$' ) + 1 );
      const newUnits = Number( productUnits ) + Number( oldUnits );
      const newTotalItemCost = Number( productValue ) + Number( oldItemCostNumber );
      unitsIdentifier.html( newUnits );
      // eslint-disable-next-line no-useless-concat
      totalCostIdentifier.html( `$${newTotalItemCost}` );
    }else {

      $( '#cart-list > tbody' )
        .append( `<tr class="product-order">
                    <td class='${productName} productName'>${productName}</td>
                    <td class='units-${productName} productUnits'>${productUnits}</td>
                    // eslint-disable-next-line max-len
                    <td class='total-cost-of-${productName}'>$${productValue}</td>
                  </tr>` );
    }
  }


  function calculateSubtotal() {
    subtotal = productOrders.length > 1 ?
      productOrders.reduce( ( prev, next ) => { return prev + next; }, 0 ) : productOrders;
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
