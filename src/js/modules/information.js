if ($('body').hasClass('page--information')) {
  var navEl = $('.information-nav');
  var informationNavMaxTop = window.innerHeight - navEl.innerHeight();

  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= informationNavMaxTop) {
      navEl.addClass('information-nav--fixed');
    } else {
      navEl.removeClass('information-nav--fixed');
    }
  });
}
