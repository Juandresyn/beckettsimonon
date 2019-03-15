window.template = (function() {
  var classes = {
    domReady: 'dom-ready',
  };

  function domReady() {
    $('html').addClass(classes.domReady);
  }

  function init() {
    domReady();
  }

  return {
    init: init,
  };
})();
