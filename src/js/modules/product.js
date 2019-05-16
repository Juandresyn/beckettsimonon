var siteHeaderHeight = $('[data-section-id="header"]').height() + 20;
var productDetailsHeight = $('.product-header__details').height();
var imagesOffset = $('.product-header__images').height();
var imagesOffsetFinal = (imagesOffset - window.innerHeight) + siteHeaderHeight;
var bottomSize = window.innerHeight - (siteHeaderHeight + productDetailsHeight);
var productToolbarOffset = $('.product-toolbar').height();
var pageScrollClass = 'images-viewed';
var productToolbarBodyClass = 'product-toolbar--visible';
var productPageClass = 'page--product';
var isMobile = window.innerWidth < 1024;

function manageDetailsPosition() {
  var scrollTop = $(window).scrollTop();
  function toolbarCalculation() {
    return isMobile ?
            scrollTop >= ((imagesOffset + productDetailsHeight) - productToolbarOffset) :
            scrollTop >= (imagesOffset - productToolbarOffset);
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

if ($('body').hasClass(productPageClass)) {
  initializeEffect();


  $(window).scroll(function() {
    manageDetailsPosition();
  });
}
