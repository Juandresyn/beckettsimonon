$('body').on('click', '.js-on-click', function() {
  var target = $(this).data('onclick-target');
  var targetClass = $(this).data('onclick-class');
  var targetClassBehavior = $(this).data('do');

  if(targetClassBehavior && targetClassBehavior === 'add') {
    $(target).addClass(targetClass);
  } else if (targetClassBehavior && targetClassBehavior === 'remove') {
    $(target).removeClass(targetClass);
  } else {
    $(target).toggleClass(targetClass);
  }
});

$('.js-active-on-click').on('click', function() {
  $(this).toggleClass('is-active');
});
