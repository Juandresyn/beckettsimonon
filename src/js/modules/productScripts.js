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

  function initializeImagesSlider() {
    if (window.innerWidth < 1024) {
      var productImagesSliderArrowPrev = $('.js-slick-product-images__prev');
      var productImagesSliderArrowNext = $('.js-slick-product-images__next');
      var $status = $('.js-slick-product-images-counter');

      productImagesSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        var counter = (currentSlide ? currentSlide : 0) + 1;
        $status.text('0' + counter + ' / 0' + slick.slideCount);
      });

      productImagesSlider.slick({
        draggable: false,
        prevArrow: productImagesSliderArrowPrev,
        nextArrow: productImagesSliderArrowNext,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      });

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
});
