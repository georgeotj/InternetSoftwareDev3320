$( () => {
  const productDropDown = $( '#list-products' );
  const storeProducts = {
    products: [
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
    ],

    addProductsToStoreList () {
      for ( let i = 0; i < storeProducts.products.length; i += 1 ) {
        productDropDown.append(
          $( '<option></option>' )
            .val( i )
            .html( `${this.products[ i ].name} 
                 &nbsp;&nbsp;&nbsp;&nbsp; ${this.products[ i ].price}` )
        );
      }
    }

    // addProducts: ( value, product ) => {
    //   productDropDown.append(
    //     $( '<option></option>' )
    //       .val( value )
    //       .html( `${product.name}
    //              &nbsp;&nbsp;&nbsp;&nbsp; ${product.price}` )
    //   );
    // }
  };

  // $.each( storeProducts.products, add);

  function selectedProduct() {

    const [ productName, productPrice ] = thisProduct();
    const [ productUnits, productTotalPrice ] = thisProductOrder();

    function thisProduct() {
      const $userSelectedProduct = findSelectionInfo();
      const selectedProductStr = findSelectionStr(
        $userSelectedProduct
      );
      const selectedProductName = getSelectionName( selectedProductStr );
      const selectedProductPrice = getSelectionPrice( selectedProductStr );

      function findSelectionInfo() {
        return productDropDown.find( 'option:selected' );
      }

      function findSelectionStr( cssSelector ) {
        return cssSelector.text();
      }

      function getSelectionName( productStr ) {
        const productDetailsArray = productStr.split( ' ' );
        return productDetailsArray[ 0 ].substr( 0,
          productDetailsArray[ 0 ].length - 1 )
          .toString();
      }

      function getSelectionPrice( productStr ) {
        return +productStr.substr( productStr.indexOf( '$' ) + 1 );
      }
      return [ selectedProductName, selectedProductPrice ];
    }
    function thisProductOrder() {
      function unitsForOrder( numberInput = '#item-units' ) {
        return $( numberInput ).val();
      }
      function orderPrice() {
        return unitsForOrder() * productPrice;
      }
      return [ unitsForOrder(), orderPrice() ];
    }
    return [ productName, productUnits, productTotalPrice ];
  }

  function displayProductOrderPrice() {
    const productPrice = selectedProduct()[ 2 ];
    document.getElementById( 'unit-price' ).value = Number.isNaN( productPrice ) ?
      0 :
      productPrice;
  }

  function shoppingCart() {
      let subtotal = 0;
      let productOrderPrices = [];

      function calculateSubtotal() {
        subtotal =
          productOrderPrices.length > 1 ?
            productOrderPrices.reduce( ( prev, next ) => prev + next, 0 ) :
            productOrderPrices;
        return subtotal;
      }

      function displaySubtotal ( cartSubtotalLabel = '#cart-subtotal-number' ) {
        cartSubtotalLabel.text( `$${calculateSubtotal()}` );
      }

      function clearOrders () {
        for ( let i = 1; i < productOrderPrices.length + 1; i += 1 ) {
          document.getElementById( 'cart-list' ).deleteRow( -1 );
        }
        productOrderPrices = [];

        // this.productOrderPrices.splice( 0, productOrders.length );
        subtotal = 0;
      }


      function productHandler() {
        const [ productName, productUnits, productPrice ] = selectedProduct();

        function appendProductToCart ( name, units, price ) {
          name = productName;
          units = productUnits;
          price = productPrice;

          if (
            selectedProduct()[ 2 ] !== 0 &&
            !Number.isNaN( selectedProduct()[ 2 ])
          ) {
            $( '#cart-list > tbody' ).append( `<tr>
                                          <td>${name}</td>
                                          <td>${units}</td>
                                          <td class="order-total">$${price}</td>
                                          </tr>` );
          }
        }

        function addProductToOrders ( selectedProductPrice ) {
          productOrderPrices.push( selectedProductPrice );
        }
        return [ appendProductToCart(), addProductToOrders() ];
      }
      const [ addToCart, addToOrders ] = productHandler();

      return [ displaySubtotal(), addToCart, addToOrders, clearOrders(), calculateSubtotal() ];
  }

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
    checkoutCalculations.setOrderValues( shoppingCart()[ 5 ]);
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

  $( '#item-units' ).on( 'change', () => {
    displayProductOrderPrice();
  });

  productDropDown.on( 'change', () => {
    displayProductOrderPrice();
  });

  $( '#add-item-to-cart-button' ).on( 'click', () => {
    const [ showSubtotal, addToCart, addToOrders ] = shoppingCart();
    addToOrders();
    addToCart();
    showSubtotal();
  });

  $( '#clear-cart-button' ).on( 'click', () => {
    const showSubtotal = shoppingCart()[ 0 ];
    const clearOrders = shoppingCart()[ 3 ];
    clearOrders();
    showSubtotal();
  });


  storeProducts.addProductsToStoreList();
});
