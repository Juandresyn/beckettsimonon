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
});
