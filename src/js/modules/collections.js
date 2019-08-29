if ($('body').hasClass('page--collection')) {
  var navEl = $('.js-all-products__filters');
  var headerEl = $('#shopify-section-header');
  var allProducts = $('.js-all-products');
  var informationNavMaxTop = headerEl.innerHeight();

  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= informationNavMaxTop) {
      navEl.addClass('all-products__filters--fixed');
      allProducts.css({ 'padding-top': navEl.innerHeight() });
    } else {
      navEl.removeClass('all-products__filters--fixed');
      allProducts.css({ 'padding-top': 0 });
    }
  });
}

$('.js-filter-item').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  
  let pathFolders = window.location.pathname.split('/');
  const tags = pathFolders.length > 3 ? pathFolders[3].split('+') : [];
  let newTags = [];

  if ($(this).data('action') && $(this).data('action') == 'remove' && tags.length > 0) {
    newTags = tags.filter(tag => !tag.includes($(this).data('type')));
  } else {
    newTags = tags.filter(tag => !tag.includes($(this).data('type')));
    newTags.push($(this).data('tag'));
  }

  $(this).parent('.js-product-filter-list').find('.all-products__filter-item').removeClass('is-active');
  $(this).parent().addClass('is-active');

  pathFolders[3] = newTags.filter(nt => nt != '').join('+');
  pathFolders = pathFolders.join('/');

  window.location.pathname = pathFolders;
});

$(window).on('load', function() {
  const activeFilterEl = $('.all-products__filter-item.is-active');

  activeFilterEl.each((index, item) => {
    const filterName = $(item).parents('.all-products__filter').find('.js-filter-name');
    filterName.text($(item).find('.js-filter-item').data('name'));
  });
});

$('.js-product-grid-color').on('change', function() {
  var target = $(`#${$(this).data('target')}`);
  var pImages = target.data('images').split(',');
  var color = $(`[name="${$(this).attr('name')}"]:checked`).val();
  target.attr('src', filterColorImages(pImages, color)[0]);
});
