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

$(document).on('ready', function() {
  $('.js-mega-menu-item').hide();
});

var setOptions = function(options) {
  return options.map(function(option) {
    return `<option value="${option.id}"
      data-options='${option.title.replace(' / ', '-').split('/').join('').toLowerCase()}-'>${option.title.toLowerCase()}</option>`;
  }).join('');
};

var setSizes = function(sizes) {
  return sizes.values.map(function(option){
    return `<option value="${option}">${option}</option>`;
  }).join('');
};

var setType = function(tags, typeEl) {
  var material = tags.filter(m => m.includes('material_'));

  return material.length > 0 ? typeEl.html(material[0].replace('material_', '')).show() : typeEl.hide();
};

var setColors = function(options) {
  var colors = getOption(options, 'color');

  if (colors) {
    return colors.values.map(function(color, index) {
      const colorsArray = color.split('/');
      const colorSlug = colorsArray.join('').replace(' ', '');
      const colorName = colorsArray.join(' / ');
      const colorClass = colorsArray.length > 1 ? (colorsArray.length === 2 ? 'color--double' : 'color--triple') : '';
      const colorTemplate = (arr) => arr.map(c => `
        <span class="color-${c.replace(' ', '').toLowerCase()}"></span>
      `).join('');

      return `
        <div class="color-item">
          <input id="mega-menu-color-${colorSlug.toLowerCase()}"
            type="radio"
            name="color"
            value="${colorSlug.toLowerCase()}"
            data-name="${colorName.toLowerCase()}"
            class="color-item__input js-mega-menu-options-color-radio"
            ${index === 0 ? 'checked="checked"' : ''}>

          <label for="mega-menu-color-${colorSlug.toLowerCase()}"
            class="js-mega-menu-options-color color-item__label ${colorClass}"
            data-color="${colorSlug.toLowerCase()}"
            title="${colorName.toLowerCase()}">
            <div>
              ${colorTemplate(colorsArray)}
            </div>
          </label>
        </div>
      `;
    }).join('');
  }

  return null;
};

var getOption = function(options, type) {
  var option = options.filter(o => o.name.toLowerCase() === type);

  return option.length > 0 ? option[0] : null;
};

var fillTemplate = function(product, cb) {
  var variants = $('.js-mega-menu-product-variants');
  var img = $('.js-mega-menu__img');
  var title = $('.js-mega-menu__title');
  var price = $('.js-mega-menu__price');
  var url = $('.js-mega-menu__url');
  var type = $('.js-mega-menu__type');
  var size = $('.js-mega-menu__size');
  var variantsWrapper = $('.js-mega-menu-size');
  var colorsWrapper = $('.js-mega-menu-color-picker');
  var cart = $('.js-mega-menu__cart');

  img.fadeOut(function() {
    title.html(product.title.split(' -')[0]);
    price.html('$'+product.price / 100);
    url.attr('href', product.url);
    size.attr('href', product.url + '?whats-my-size=true');
    colorsWrapper.html(setColors(product.options));
    img.attr('src', imageService(product.featured_image, 365));
    img.fadeIn();

    variants.html(setOptions(product.variants));
    setType(product.tags, type);

    if (getOption(product.options, 'size').values) {
      variantsWrapper.html(setSizes(getOption(product.options, 'size')));
    }

    cb();
  });
};

$('.js-mega-menu-product').on('mouseover', function(e) {
  e.preventDefault();
  e.stopPropagation();

  $('.js-mega-menu-product').removeClass('is-active');
  $(this).addClass('is-active');

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
      window.mmpi = data.images;
      fillTemplate(data, function() {
        loader.fadeOut();
        wrapper.fadeIn();
      });
    }
  });
});

$('.js-mega-menu-color-picker').on('click', '.js-mega-menu-options-color', function() {
  var mmImg = $('.js-mega-menu__img');
  var newColor = $(this).data('color');
  var newPhoto = filterColorImages(window.mmpi, newColor)[0];

  mmImg.attr('src', imageService(newPhoto, 365));

  $(`.js-mega-menu-color-picker .js-mega-menu-options-color-radio[value="${newColor}"]`).prop('checked', 'checked');
});

$('.js-mega-menu__cart').on('click', function() {
  var variantId = $('.js-mega-menu-product-variants').val();
  AddToCartLoading(true, '.js-mega-menu__cart');
  ajaxAddToCart(variantId, 1, function(data) {
    AddToCartLoading(false, '.js-mega-menu__cart');
  });
});

var onOptionsChanged = function() {
  var variantsSelector = $('.js-mega-menu-product-variants');
  var url = $('.js-mega-menu__url');
  var productUrl = url.attr('href').split('?')[0];
  var size = $('.js-mega-menu-size').val();
  var color = $('.js-mega-menu-options-color-radio:checked').val();

  variantsSelector.find('option').each(function() {
    $(this).attr('selected', false);

    var singleOption = $(this).data('options');
    if (singleOption.includes(!!color ? `${color}-${size}-` : `${size}-`) || singleOption.includes(!!color ? `${size}-${color}-` : `${size}-`)) {
      $(this).attr('selected','selected');
    }
  });

  url.attr('href', `${productUrl}?variant=${variantsSelector.val()}`);
};

$('.js-mega-menu-size').on('change', onOptionsChanged);
$('.js-mega-menu-color-picker').on('click', '.js-mega-menu-options-color-radio', onOptionsChanged);
