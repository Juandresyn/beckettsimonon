$('.js-mega-menu-on-click').on('click', function() {
  var activeClass = 'is-active';
  var target = $(this).data('target');
  $('.' + activeClass).removeClass(activeClass);

  $(this).addClass(activeClass);
  $('[data-item]').hide();
  $('[data-item="'+target+'"]').show();
});

$('.js-mega-menu-close').on('click', function() {
  var activeClass = 'is-active';
  var overlay = $('.js-mega-menu__product');

  overlay.fadeOut();
  $('.' + activeClass).removeClass(activeClass);
});

$(window).on('load', function() {
  $('.js-mega-menu-item').hide();
});

var fillVariants = function(varinats) {
  return varinats.map(function(option){
    return `<option value="${option.id}">${option.title}</option>`;
  }).join('');
};

var fillTemplate = function(product, cb) {
  var img = $('.js-mega-menu__img');
  var title = $('.js-mega-menu__title');
  var price = $('.js-mega-menu__price');
  var url = $('.js-mega-menu__url');
  var type = $('.js-mega-menu__type');
  var size = $('.js-mega-menu__size');
  var variantsWrapper = $('.js-mega-menu-variants');
  var cart = $('.js-mega-menu__cart');

  img.fadeOut(function() {
    title.html(product.title.split(' -')[0]);
    price.html('$'+product.price / 100);
    url.attr('href', product.url);
    size.attr('href', product.url + '?whats-my-size=true');
    type.html(product.type);
    variantsWrapper.html(fillVariants(product.variants));
    img.attr('src', imageService(product.featured_image, 365));
    img.fadeIn();
    cb();
  });
};

$('.js-mega-menu-product').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  var loader = $('.js-mega-menu-loader');
  var overlay = $('.js-mega-menu__product');
  var wrapper = $('.js-mega-menu__wrapper');
  var productHandle = $(this).data('handle');

  overlay.fadeIn();
  loader.fadeIn();
  wrapper.fadeOut();

  $.ajax({
    url: '/products/'+productHandle+'.js',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      fillTemplate(data, function() {
        loader.fadeOut();
        wrapper.fadeIn();
      });
    }
  });
});

$('.js-mega-menu__cart').on('click', function() {
  var variantId = $('.js-mega-menu-variants').val();

  addToCart(variantId, function(data) {
    window.location.href = '/cart';
  });
});
