// Cart Template '/cart' scripts
function updateItem(el, type) {
  var $input = $(el).siblings('.js-quantity')[0];
  var currentValue = parseInt($input.value);
  var newValue = type === 'add' ? currentValue + 1 : currentValue - 1;
  $input.value = newValue;
}

$('.js-cart .js-quantity-add').on('click', function(e) {
  updateItem(this, 'add');
});

$('.js-cart .js-quantity-less').on('click', function(e) {
  updateItem(this, 'less');
});
