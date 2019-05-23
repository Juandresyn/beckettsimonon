if ($('body').hasClass('page--collection')) {
  var navEl = $('.js-all-products__filters');
  var headerEl = $('#shopify-section-header');
  var allProducts = $('.js-all-products');
  var informationNavMaxTop = headerEl.innerHeight();

  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= informationNavMaxTop) {
      navEl.addClass('all-products__filters--fixed');
      allProducts.css({ 'padding-top': navEl.innerHeight() });
    } else {
      navEl.removeClass('all-products__filters--fixed');
      allProducts.css({ 'padding-top': 0 });
    }
  });
}
