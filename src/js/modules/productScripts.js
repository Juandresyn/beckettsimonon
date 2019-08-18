$(window).on('load', function() {
  var mediaSlider = $('.js-slick-product-media');
  var mediaSliderArrowPrev = $('.js-slick-product-media__prev');
  var mediaSliderArrowNext = $('.js-slick-product-media__next');
  var $status = $('.js-slick-product-media-counter');

  mediaSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    var counter = (currentSlide ? currentSlide : 0) + 1;
    $status.text('0' + counter + ' / 0' + slick.slideCount);
  });

  mediaSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  });

  mediaSliderArrowPrev.on('click', function() {
    mediaSlider.slick('slickPrev');
  });

  mediaSliderArrowNext.on('click', function() {
    mediaSlider.slick('slickNext');
  });

  $('.js-product-faq-items').accordion({
    active: false,
    collapsible: true,
  });

  var productImagesSlider = $('.js-slick-product-images');
  var productImagesSliderConfig = {
    draggable: false,
    prevArrow: $('.js-slick-product-images__prev'),
    nextArrow: $('.js-slick-product-images__next'),
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  function initializeImagesSlider() {
    if (window.innerWidth < 1025) {
      var productImagesSliderArrowPrev = $('.js-slick-product-images__prev');
      var productImagesSliderArrowNext = $('.js-slick-product-images__next');
      var $status = $('.js-slick-product-images-counter');

      productImagesSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        var counter = (currentSlide ? currentSlide : 0) + 1;
        $status.text('0' + counter + ' / 0' + slick.slideCount);
      });

      productImagesSlider.slick(productImagesSliderConfig);

      productImagesSliderArrowPrev.on('click', function() {
        productImagesSlider.slick('slickPrev');
      });

      productImagesSliderArrowNext.on('click', function() {
        productImagesSlider.slick('slickNext');
      });
    }
  }

  initializeImagesSlider();

  $(window).on('resize', function() {
    if (!productImagesSlider.hasClass('slick-initialized')) {
      initializeImagesSlider();
    }
  });

  $('.js-add-to-cart').on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const id = $('#product-variants').val();

    ajaxAddToCart(id, 1);

    $('html').toggleClass('modal--open');
    $('html').toggleClass('cart-is-open');
  });
});


const ajaxAddToCart = (id, quantity, cb = () => null) => {
  $.ajax({
    method: "POST",
    url: "/cart/add.js",
    dataType: 'json',
    data: {
      id,
      quantity,
    }
  })
  .done(() => {
    state.reRender = new Date().getTime();
    cb();
  });
};
