var position = $(window).scrollTop();
var siteWidth = window.innerWidth;
var navElem = $('.js-header-main');
var navClass = 'main-nav--sticky';

if ($('body').hasClass('has-sticky-nav')) {
  $(window).scroll(function() {
    if (window.innerWidth > 1023) {
      var scroll = $(window).scrollTop();
      if(window.scrollY < 7) {
        navElem.removeClass(navClass);

      } else if (scroll < (position - 5)) {
        navElem.addClass(navClass);

      } else if ((scroll > position) && navElem.hasClass(navClass)) {
        navElem.addClass('leaving');

        setTimeout(function() {
          navElem.removeClass('leaving');
          navElem.removeClass(navClass);
        }, 200);
      }

      position = scroll;
    }
  });
}
