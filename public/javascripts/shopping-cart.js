$(document).ready(() => {
  const products = [
    {
      name: 'Product-1: ',
      price: '$1',
    },
    {
      name: 'Product-2: ',
      price: '$2',
    },
    {
      name: 'Product-3: ',
      price: '$3',
    },
    {
      name: 'Product-4: ',
      price: '$4',
    },
    {
      name: 'Product-5: ',
      price: '$5',
    },
    {
      name: 'Product-6: ',
      price: '$6',
    },
    {
      name: 'Product-7: ',
      price: '$7',
    },
    {
      name: 'Product-8: ',
      price: '$8',
    },
  ];

  const productDropDown = $('#list-products');
  const productOrders = [];
  let subtotal;

  $.each(products, (value, product) => {
    productDropDown.append($('<option></option>').val(value).html(`${product.name} 
    &nbsp;&nbsp;&nbsp;&nbsp; ${product.price}`));
  });

  function getSelectedProductPrice() {
    const $selectedItem = productDropDown.find('option:selected');
    const textOfItem = $selectedItem.text();
    const getProductPrice = textOfItem.substr(textOfItem.indexOf('$') + 1);
    return Number(getProductPrice);
  }

  function displayProductPrice(produceValue) {
    if (!Number.isNaN(produceValue)) {
      document.getElementById('unit-price').value = produceValue;
    } else {
      document.getElementById('unit-price').value = 0;
    }
  }

  function getItemQuantity(units) {
    return $(units).val();
  }

  function getSelectedOrderPrice() {
    const quantity = getItemQuantity('#item-units');
    return quantity * getSelectedProductPrice();
  }

  $('#item-units').change(() => {
    // const quantity = getItemQuantity('#item-units');
    // const totalPrice = quantity * getSelectedProductPrice();
    const totalPrice = getSelectedOrderPrice();
    displayProductPrice(totalPrice);
  });

  productDropDown.change(() => {
    const selectedItemPrice = getSelectedOrderPrice();
    displayProductPrice(selectedItemPrice);
  });

  function getProductName() {
    const $selectedItem = productDropDown.find('option:selected');
    const textOfProduct = $selectedItem.text();
    const productDetails = textOfProduct.split(' ');
    return productDetails[0].substr(0,
      productDetails[0].length - 1);
  }

  function appendOrderToCart(productName, productUnits, productValue) {
    $('#cart-list > tbody').append(`<tr>
                                    <td>${productName}</td>
                                    <td>${productUnits}</td>
                                    <td class="order-total">$${productValue}</td>
                                    </tr>`);
  }

  function calculateSubtotal() {
    if (productOrders.length > 1) {
      subtotal = productOrders.reduce((prev, next) => prev + next, 0);
    } else {
      subtotal = productOrders;
    }
  }

  function displaySubtotal() {
    const cartSubtotal = $('#cart-subtotal-number');
    cartSubtotal.text(`$${subtotal}`);
  }

  function addOrderTotalToSubtotal(orderTotal) {
    productOrders.push(orderTotal);
    calculateSubtotal();
  }

  $('#add-item-to-cart-button').on('click', () => {
    if (getSelectedOrderPrice() !== 0) {
      const productName = getProductName();
      const productValue = getSelectedOrderPrice();
      const productUnits = getItemQuantity('#item-units');
      appendOrderToCart(productName, productUnits, productValue);

      addOrderTotalToSubtotal(productValue);
      displaySubtotal();
    }
  });


  $('#clear-cart-button').on('click', () => {
    for (let i = 1; i < productOrders.length + 1; i += 1) {
      document.getElementById('cart-list').deleteRow(-1);
    }
    productOrders.splice(0, productOrders.length);
    subtotal = 0;
    displaySubtotal();
  });
});
