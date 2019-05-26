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

var imageService = function(img, w, h = w) {
  var imgSplit = img.split('.');
  var imgFormat = imgSplit[imgSplit.length - 1];
  var imgFirst = img.split('.'+imgFormat)[0];

  return imgFirst + '_' + w + 'x' + h + '.' + imgFormat;
};

var addToCart = function(id, cb) {
  $.ajax({
    url: '/cart/add.js',
    method: 'POST',
    dataType: 'json',
    data: {
      quantity: 1,
      id,
    },
    success: function(data) {
      cb(data);
    }
  });
};

var getUrlParameter = function(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
