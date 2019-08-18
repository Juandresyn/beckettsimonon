const modalClasses = ['modal--open', 'cart-is-open', 'login-form-modal--open', 'search-is-open', 'product-is-open'];
$(window).on('click', function(e) {
  if (e.target.classList.value.includes('modal ')) {
    modalClasses.forEach((i) => $('html').removeClass(i));
  }
});


$(window).on('keyup', function(e) {
  if (e.keyCode === 27 && $('html').hasClass('modal--open')) {
    modalClasses.forEach((i) => $('html').removeClass(i));
  }
});
