$(document).ready(() => {
  const products = {
    Product1: {
      name: '{Product}: ',
      value: '&Tab;&Tab;&Tab;$1',
    },
    Product2: {
      name: '{Product}: ',
      value: '$2',
    },
    Product3: {
      name: '{Product}: ',
      value: '$3',
    },
    Product4: {
      name: '{Product}: ',
      value: '$4',
    },
    Product5: {
      name: '{Product}: ',
      value: '$5',
    },
    Product6: {
      name: '{Product}: ',
      value: '$6',
    },
    Product7: {
      name: '{Product}: ',
      value: '$7',
    },
    Product8: {
      name: '{Product}: ',
      value: '$8',
    },

  };

  const showProductSelect = $('#list-products');

  $.each(products, (value, product) => {
    showProductSelect.append($('<option></option>').val(value).html(`${product.name} &nbsp;&nbsp;&nbsp;&nbsp; ${product.value}`));
  });

  function getSelectedProductPrice() {
    const $selectedItem = $('#list-products').find('option:selected');
    const textOfItem = $selectedItem.text();
    const getProductPrice = textOfItem.substr(textOfItem.indexOf('$') + 1);
    const productPrice = Number(getProductPrice);
    return productPrice;
  }

  function displayInitialProductPrice(produceValue) {
    document.getElementById('unit-price').value = produceValue;
  }

  function getItemQuantity(units) {
    return $(units).val();
  }

  $('#item-units').change(() => {
    const quantity = getItemQuantity('#item-units');
    const totalPrice = quantity * getSelectedProductPrice();
    displayInitialProductPrice(totalPrice);
  });

  $('#list-products').change(() => {
    const selectedItemPrice = getSelectedProductPrice();
    displayInitialProductPrice(selectedItemPrice);
  });
});
