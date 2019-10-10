var siteHeaderHeight = $('[data-section-id="header"]').innerHeight() + 20;
var productDetailsHeight = $('.product-header__details').innerHeight();
var videoOffset = ($('.product-header__video').length > 0 ? 660 : 0);
var imagesOffset = ($('.product-header__images img').length * 660) + videoOffset;
var imagesOffsetFinal = (imagesOffset - window.innerHeight) + siteHeaderHeight;
var bottomSize = window.innerHeight - (siteHeaderHeight + productDetailsHeight);
var productToolbarOffset = $('.product-toolbar').innerHeight();
var pageScrollClass = 'images-viewed';
var productToolbarBodyClass = 'product-toolbar--visible';
var productPageClass = 'page--product';

function reInitDetails() {
  siteHeaderHeight = $('[data-section-id="header"]').innerHeight() + 20;
  productDetailsHeight = $('.product-header__details').innerHeight();
  videoOffset = ($('.product-header__video').length > 0 ? 660 : 0);
  imagesOffset = ($('.product-header__images img').length * 660) + videoOffset;
  imagesOffsetFinal = (imagesOffset - window.innerHeight) + siteHeaderHeight;
  bottomSize = window.innerHeight - (siteHeaderHeight + productDetailsHeight);
  productToolbarOffset = $('.product-toolbar').innerHeight();
}

function manageDetailsPosition() {
  var scrollTop = $(window).scrollTop();

  if (window.innerWidth > 1025) {
    var toolbarCalculation = function() {
      return scrollTop >= (imagesOffset - productToolbarOffset);
    };

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

const objectToArray = (obj) => {
  const tempArray = [];

  Object.keys(obj).forEach((i) => tempArray.push(obj[i]));

  return tempArray;
};

const sortAlphaNum = (a, b) => {
  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;

  const aA = a.replace(reA, "");
  const bA = b.replace(reA, "");
  if (aA === bA) {
    const aN = parseInt(a.replace(reN, ""), 10);
    const bN = parseInt(b.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
};

const filterColorImages = function(imagesArr, color) {
  return imagesArr.filter((img) => img.includes(`_${color}_`))
    .sort(sortAlphaNum);
};

const reRenderImages = function(color) {
  const productImageEl = $('.js-product-images');
  const images = filterColorImages(window.currentProduct.images, color);

  productImageEl.html('');

  window.currentProductImages = images;
  images.forEach((image) => productImageEl.append(`<img class="product-header__image lazyload"
    src="${imageService(image, 50)}"
    data-src="${imageService(image, 650)}, ${imageService(image, 450)}, ${imageService(image, 150)}"
    alt="${window.currentProduct.title}" />`
  ));

  reInitDetails();

  $(window).scroll(function() {
    manageDetailsPosition();
  });

  if (lazyLoadInstance) {
    lazyLoadInstance.update();
  }
};

const handleProductChanges = function() {
  let color = null;
  const productImagesSliderConfig = {
    draggable: false,
    prevArrow: $('.js-slick-product-images__prev'),
    nextArrow: $('.js-slick-product-images__next'),
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  $('.js-product-options-color').on('click', function(e) {
    $(`.js-product-options-color[value="${e.target.value}"]`).prop('checked', 'checked');
  });

  $('.js-product-options-color').on('change', function() {
    if ($('.js-product-options-color').val()) {
      if ($('.js-slick-product-images').hasClass('slick-initialized')) {
        $('.js-slick-product-images').slick('unslick');
      }

      color = $('.js-product-options-color:checked').val();
      var colorName = $('.js-product-options-color:checked').data('name');
      $('.js-product-color-label').html(colorName);

      reRenderImages(color);
      manageDetailsPosition();

      document.querySelector('.top-bar').scrollIntoView({ behavior: 'smooth' });
      if(window.innerWidth < 1025) {
        $('.js-slick-product-images').slick(productImagesSliderConfig);
      }
    }
  });

  $('.js-product-options-size').on('change', function(e) {
    $('.js-product-options-size').val(e.target.value);
  });

  $('.js-product-options-size, .js-product-options-color').on('change', function() {
    const variantsSelector = $('.js-product-variants');
    const size = $('.js-product-options-size').val();
    const colorOpt = $('.js-product-options-color:checked').val();

    variantsSelector.find('option').each(function() {
      $(this).attr('selected', false);

      const singleOption = $(this).data('options');
      if (singleOption.includes(!!colorOpt ? `${colorOpt}-${size}-` : `${size}-`) || singleOption.includes(!!colorOpt ? `${size}-${colorOpt}-` : `${size}-`)) {
        $(this).attr('selected','selected');
      }
    });

    updateQueryParam('variant', variantsSelector.val());
  });
};

const lazyLoadInstance = new LazyLoad({
  elements_selector: '.lazyload'
});

if ($('body').hasClass(productPageClass)) {
  if ($('.js-product-options-color').val()) {
    reRenderImages($('.js-product-options-color:checked').val());
  }

  initializeEffect();

  $(window).scroll(function() {
    manageDetailsPosition();
  });
}

handleProductChanges();

$('.js-product-toolbar__cta').on('click', function() {
  $('.js-add-to-cart').submit();
});

function createProductGallery() {
  const productImagesEl = $('.js-product-images');
  let productImages = window.currentProductImages;

  const buildModalView = () => {
    return `<div class="product-gallery">
      <div class="product-gallery__wrapper">
        <span class="icon icon--close product-gallery__close js-product-gallery-close"></span>
        <div class="product-gallery__thumbnails">${ productImages.map((tbnail, index) => buildThumbnailView(tbnail, index === 0)).join('') }</div>
        <div class="product-gallery__big-wrapper">
          <img src="${ imageService(productImages[0], window.innerHeight - 100) }"
            class="js-product-big product-gallery__big"/>
        </div>
      </div>
    </div>`;
  };

  const buildThumbnailView = (img, active) => {
    return `<div class='product-gallery__thumbnail-wrapper'>
      <img src='${ imageService(img, 48) }'
        data-large="${ img }"
        class='js-product-thumbnail product-gallery__thumbnail ${ active ? 'is-active' : '' }'
        alt='Product Thumbnail' />
    </div>`;
  };

  const closeGallery = () => {
    $('.product-gallery').fadeOut('fast', function(e) {
      $(this).remove();
    });
  };

  productImagesEl.on('click', 'img', function() {
    productImages = window.currentProductImages;
    if (!$('body').find('.product-gallery')[0]) {
      $(buildModalView()).hide().appendTo('body').fadeIn('fast');
    }
  });

  $('body').on('click', '.js-product-thumbnail', function(e) {
    $('.js-product-thumbnail').removeClass('is-active');
    $(this).addClass('is-active');
    $('.js-product-big').attr('src', imageService(e.target.dataset.large, window.innerHeight - 100));
  });

  $(window).on('keyup', function(e) {
    if (e.keyCode === 27 &&  $('.product-gallery')[0]) {
      closeGallery();
    }
  });

  $('body').on('click', '.js-product-gallery-close', function() {
    closeGallery();
  });
}

if (window.innerWidth >= 1025) {
  createProductGallery();
}

$(window).on('resize', function() {
  if (window.innerWidth >= 1025) {
    createProductGallery();
  }
});

$('.js-open-retail-info').on('click', function () {
  $('html').addClass('modal--open product-is-open');
})
