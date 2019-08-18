$(window).scroll(function(){
  $('.js-on-show').each(function() {
    var target = $(this).data('onshow-target');
    var targetClass = $(this).data('onshow-class');

    if (isScrolledIntoView($(this))) {
      $(this).find(target).addClass(targetClass || 'animate');
    }
  });
});

function isScrolledIntoView(elem){
  var $elem = $(elem);
  var $window = $(window);

  var docViewTop = $window.scrollTop();
  var docViewBottom = docViewTop + $window.height();

  var elemTop = $elem.offset().top;
  var elemBottom = elemTop + $elem.height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
