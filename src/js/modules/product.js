var siteHeaderHeight = $('[data-section-id="header"]').innerHeight() + 20;
var productDetailsHeight = $('.product-header__details').innerHeight();
var imagesOffset = ($('.product-header__images img').length * 660);
var imagesOffsetFinal = (imagesOffset - window.innerHeight) + siteHeaderHeight;
var bottomSize = window.innerHeight - (siteHeaderHeight + productDetailsHeight);
var productToolbarOffset = $('.product-toolbar').innerHeight();
var pageScrollClass = 'images-viewed';
var productToolbarBodyClass = 'product-toolbar--visible';
var productPageClass = 'page--product';

function manageDetailsPosition() {
  var scrollTop = $(window).scrollTop();

  if (window.innerWidth > 1024) {
    function toolbarCalculation() {
      return scrollTop >= (imagesOffset - productToolbarOffset);
    }

    if (scrollTop >= (imagesOffsetFinal + bottomSize)) {
      $('body').addClass(pageScrollClass);
    } else if (scrollTop < (imagesOffsetFinal + bottomSize)) {
      $('body').removeClass(pageScrollClass);
    }

    if (toolbarCalculation()) {
      $('body').addClass(productToolbarBodyClass);
    } else {
      $('body').removeClass(productToolbarBodyClass);
    }
  } else {
    if ($(window).scrollTop() >= $('#add-to-cart').offset().top) {
      $('body').addClass(productToolbarBodyClass);
    } else {
      $('body').removeClass(productToolbarBodyClass);
    }
  }
}

function initializeEffect() {
  if (imagesOffsetFinal > 0) {
    if ($(window).scrollTop() >= (imagesOffsetFinal + bottomSize)) {
      $('body').addClass(pageScrollClass);
    }
  } else {
    setTimeout(function() {
      initializeEffect();
    }, 1000);
  }
}

const handleProductChanges = function() {
  $('.js-product-options-size, .js-product-options-color').on('change', function() {
    const variantsSelector = $('.js-product-variants');
    const size = $('.js-product-options-size').val();
    let color = null;

    if ($('.js-product-options-color').val()) {
      color =  $('.js-product-options-color').filter(':checked').val();
      $('.js-product-color-label').html(color);
    }

    variantsSelector.find('option').each(function() {
      $(this).attr("selected", false);

      const singleOption = $(this).data('options');
      if (singleOption.includes(!!color ? `${size}-${color}` : `${size}-`)) {
        $(this).attr("selected","selected");
      }
    });
  });
}

if ($('body').hasClass(productPageClass)) {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazyload"
  });

  initializeEffect();

  $(window).scroll(function() {
    manageDetailsPosition();
  });
}

handleProductChanges();
