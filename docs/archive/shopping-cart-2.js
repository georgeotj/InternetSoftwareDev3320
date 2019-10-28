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
    this.selectedProduct = $( selectedProduct.thisProduct().findSelectionInfo() );
    this.selectedProductStr = $( selectedProduct.thisProduct.findSelectionStr(
      this.selectedProduct
    ) );
    // this.selectedProductName = selectedProduct.thisProduct.getSelectionName(
    //   this.selectedProductStr
    //   );
    // const selectedProductPrice = selectedProduct.thisProduct.getSelectionPrice(
    //   this.selectedProductStr
    //   );

    const thisProduct = {
      selectedProductName: this.getSelectionName( this.selectedProductStr ),
      selectedProductPrice: this.getSelectionPrice( this.selectedProductStr ),

      findSelectionInfo() {
        return productDropDown.find( 'option:selected' );
      },

      findSelectionStr( cssSelector ) {
        return cssSelector.text();
      },

      getSelectionName( selectedProductStr ) {
        const productDetailsArray = selectedProductStr.split( ' ' );
        return productDetailsArray[ 0 ].substr( 0,
          productDetailsArray[ 0 ].length - 1 )
          .toString();
      },

      getSelectionPrice( selectedProductStr ) {
        return +selectedProductStr.substr( selectedProductStr.indexOf( '$' ) + 1 );
      }
    };

    this.productUnits = selectedProduct.selectedProductOrder.unitsForOrder();
    this.productPrice = selectedProduct.selectedProductOrder.orderPrice();
    const displayOrderPrice = selectedProduct.selectedProductOrder.displayProductOrderPrice();

    const selectedProductOrder = {

      unitsForOrder( numberInput = '#item-units' ) {
        return this.document.querySelector( numberInput ).val();
      },

      orderPrice() {
        return this.unitsForOrder() * selectedProduct.thisProduct.selectedProductPrice;
      },

      displayProductOrderPrice() {
        document.getElementById( 'unit-price' ).value = Number.isNaN( this.orderPrice() ) ?
          0 :
          this.orderPrice();
      }
    };
  }

  const shoppingCart = {

    orderHandler: {
      subtotal: 0,
      productOrderPrices: [],

      calculateSubtotal () {
        this.subtotal =
          this.productOrderPrices.length > 1 ?
            this.productOrderPrices.reduce( ( prev, next ) => prev + next, 0 ) :
            this.productOrderPrices;
        return this.subtotal;
      },

      displaySubtotal ( cartSubtotalLabel = '#cart-subtotal-number' ) {
        cartSubtotalLabel.text( `$${this.calculateSubtotal()}` );
      },

      clearOrders () {
        for ( let i = 1; i < this.productOrderPrices.length + 1; i += 1 ) {
          document.getElementById( 'cart-list' ).deleteRow( -1 );
        }
        this.productOrderPrices = [];

        // this.productOrderPrices.splice( 0, productOrders.length );
        this.subtotal = 0;
      }

    },

    productHandler: {
      productName: selectedProduct.selectedProductName,
      productUnits: selectedProduct.productUnits,
      productPrice: selectedProduct.productPrice,

      appendProductToCart ( name, units, price ) {
        name = this.productName;
        units = this.productUnits;
        price = this.productPrice;

        if (
          selectedProduct.selectedProductOrder.orderPrice() !== 0 &&
          !Number.isNaN( selectedProduct.selectedProductPrice )
        ) {
          $( '#cart-list > tbody' ).append( `<tr>
                                      <td>${name}</td>
                                      <td>${units}</td>
                                      <td class="order-total">$${price}</td>
                                      </tr>` );
        }
      },

      addProductToOrders ( selectedProductPrice ) {
        this.order.productOrderPrices.push( selectedProductPrice );
      }
    }

  };


  $( '#item-units' ).on( 'change', () => {
    selectedProduct.selectedProductOrder.displayOrderPrice();
  });

  productDropDown.on( 'change', () => {
    selectedProduct.selectedProductOrder.displayProductOrderPrice();
  });

  $( '#add-item-to-cart-button' ).on( 'click', () => {
    shoppingCart.productHandler.appendProductToCart();
    shoppingCart.productHandler.addProductToOrders();

    shoppingCart.orderHandler.displaySubtotal();
  });

  $( '#clear-cart-button' ).on( 'click', () => {
    shoppingCart.orderHandler.clearOrders();
    shoppingCart.orderHandler.displaySubtotal();
  });


  storeProducts.addProductsToStoreList();
});
