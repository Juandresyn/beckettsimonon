$('.js-on-click').on('click', function() {
  var target = $(this).data('onclick-target');
  var targetClass = $(this).data('onclick-class');

  $(target).toggleClass(targetClass);
});
