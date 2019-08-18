$(window).on('load', function() {
  if ($('body').hasClass('page--article')) {
    var articleSlider = $('.js-article-gallery');
    var articleSliderArrowPrev = $('.js-article-carousel__prev');
    var articleSliderArrowNext = $('.js-article-carousel__next');

    articleSlider.slick({
      centerMode: true,
      centerPadding: '350px',
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            centerPadding: '200px',
          }
        },
        {
          breakpoint: 768,
          settings: {
            centerPadding: '80px',
          }
        },
        {
          breakpoint: 480,
          settings: {
            centerPadding: '40px',
          }
        },
      ],
    });

    articleSliderArrowPrev.on('click', function() {
      articleSlider.slick('slickPrev');
    });

    articleSliderArrowNext.on('click', function() {
      articleSlider.slick('slickNext');
    });
  }
});
