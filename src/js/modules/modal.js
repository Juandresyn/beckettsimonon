const modalClasses = ['modal--open', 'cart-is-open', 'login-form-modal--open', 'search-is-open'];
$(window).on('click', function(e) {
  if (e.target.classList.value.includes('modal ')) {
    modalClasses.forEach((i) => $('html').removeClass(i));
  }
});
