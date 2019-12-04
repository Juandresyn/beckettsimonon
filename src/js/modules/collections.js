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

const defineVariantUrl = async (productHandle, color, removeSlash = false) => {
  let item = null;
  const colorWithoutSlash = (i) => splitAndJoin(i.option1.toLowerCase(), '/', '') === color || (i.option2 ? splitAndJoin(i.option2.toLowerCase(), '/', '') === color : false);
  const colorWithSlash = (i) => i.option1.toLowerCase() === color || (i.option2 ? i.option2.toLowerCase() === color : false);
  const productColor = (i) => removeSlash ? colorWithoutSlash(i) : colorWithSlash(i);
  await $.ajax({
    url: '/products/'+productHandle+'.js',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      const firstItem = data.variants.find(i => productColor(i));
      console.log('__', color);
      item = `${data.url}?variant=${firstItem.id}`;
      return item;
    }
  });

  return item;
};

$('.js-product-grid-color').on('change', async function() {
  var handle = $(this).data('handle');
  var targetStr = $(this).data('target');
  var target = $(`#${targetStr}`);
  var targetSecondary = $(`#${$(this).data('target-secondary')}`);
  var pImages = target.data('images').split(',');
  var color = $(`[name="${$(this).attr('name')}"]:checked`).val();
  var url = await defineVariantUrl(handle, color, true);

  $(`#card-${handle}`).attr('href', url);
  target.attr('src', filterColorImages(pImages, color)[0]);
  if (filterColorImages(pImages, color)[1]) {
    targetSecondary.attr('src', filterColorImages(pImages, color)[1]);
  }
});
