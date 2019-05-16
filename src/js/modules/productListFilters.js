var $productFilter = $('.js-product-filter');
var $allProducts = $('.js-all-products');
var $allProductsOverlay = $('.js-all-products-overlay');
var allProductActiveClass = "all-products__filters--active";
var productFilterActiveClass = "all-products__filter--active";

$allProductsOverlay.on('click', function() {
  var $activeFilter = $('.'+productFilterActiveClass);
  $activeFilter.removeClass(productFilterActiveClass);
  $allProducts.removeClass(allProductActiveClass);
});

$productFilter.on('click', function() {
  var $this = $(this);
  var $activeFilter = $('.'+productFilterActiveClass);

  if ($activeFilter.length > 0) {
    $activeFilter.not(this).removeClass(productFilterActiveClass);
  }

  if ($this.hasClass(productFilterActiveClass)) {
    $this.removeClass(productFilterActiveClass);
    $allProducts.removeClass(allProductActiveClass);
  } else {
    $this.addClass(productFilterActiveClass);
    $allProducts.addClass(allProductActiveClass);
  }
});
