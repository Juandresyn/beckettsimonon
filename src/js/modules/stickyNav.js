var position = $(window).scrollTop();
var siteWidth = window.innerWidth;
var navElem = $('.js-header-main');
var navClass = 'main-nav--sticky';

if ($('body').hasClass('has-sticky-nav')) {
  $(window).scroll(function() {
    if (true) {
    // if (window.innerWidth > 1023) {
      var scroll = $(window).scrollTop();
      if(window.scrollY < 80) {
        navElem.removeClass(navClass);
        $('body').removeClass('main-sticky-visible');

      } else if (scroll < (position - 5)) {
        $('body').addClass('main-sticky-visible');
        navElem.addClass(navClass);

      } else if ((scroll > position) && navElem.hasClass(navClass)) {
        navElem.addClass('leaving');

        setTimeout(function() {
          navElem.removeClass('leaving');
          navElem.removeClass(navClass);
          $('body').removeClass('main-sticky-visible');
        }, 200);
      }

      position = scroll;
    }
  });
}
