function resultTemplate(result) {
  return '<li class="search-modal__result"><a href="' + result.url + '" class="search-modal__result-link"><img src="' + result.thumb + '" class="search-modal__result-image" /><div class="search-modal__result-info"><h3 class="search-modal__result-title">' + result.label + '</h3><p class="search-modal__result-price">' + result.price + '</p></div></a></li>';
}

function appendResults(results, $target) {
  for (i = 0; i < results.length; i++) {
    $target.append(resultTemplate(results[i]));
  }
}

$('.js-live-search').on('keyup', function(e) {
  var appendTo = $(this).siblings('.js-live-search-results');
  var searchTerm = e.target.value.toLowerCase();

  if (searchTerm.length >= 3) {
    $.ajax({
      url: "/search",
      data: {
        q: "*" + e.target.value.toLowerCase() + "*",
        type: "product",
        view: "json",
      },
      dataType: "json",
      success: function(data) {
        appendTo.html('');
        appendResults(data, appendTo);
      }
    });
  } else {
    appendTo.html('');
  }
});
