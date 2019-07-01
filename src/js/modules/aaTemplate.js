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

var handleSvg = function() {
  $('img.svg').each(function(){
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg');

      // Add replaced image's ID to the new SVG
      if(typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, else we gonna set it if we can.
      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
      }

      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });
};

$(window).on('load', function() {
  handleSvg();
  $('html').css("overflow", "");
});
