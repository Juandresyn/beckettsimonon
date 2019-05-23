if (typeof Vue === 'function') {
  Vue.component('product-information', {
    name: 'productInformation',

    data: function () {
      return {
        information: window.productMoreInfo,
        productId: window.currentProduct.id,
        productCollection: window.currentProduct.collection,
      };
    },

    computed: {
      infoItem() {
        return this.information[this.productId][this.productCollection] || [];
      },
    },

    template: `
      <span>
        <article v-for="(item, index) in Object.keys(infoItem)"
          :key="index"
          v-if="infoItem[item].image"
          class="product-information__item">
          <div class="product-information__item-image-wrapper">
            <img class="product-information__item-image"
              :src="infoItem[item].image" />
          </div>

          <div class="product-information__item-content">
            <header class="layout-section__header">
              <small class="layout-section__eyebrow">{{ infoItem[item].eyebrow }}</small>
              <h2 class="layout-section__title">{{ infoItem[item].title }}</h2>
              <p class="layout-section__description section--why-us__description">{{ infoItem[item].description }}</p>
            </header>
          </div>
        </article>
      </span>
    `,
  });

  Vue.component('product-more-details', {
    name: 'productMoreDetails',

    data: function () {
      return {
        information: window.productMoreDetails,
        productCollection: window.currentProduct.collection,
      };
    },

    computed: {
      infoItem() {
        return this.information[this.productCollection];
      },
    },

    methods: {
      unscapify(string) {
        return decodeURI(string);
      },
    },

    template: `
      <span v-if="infoItem.length > 0">
        <article v-for="(item, index) in infoItem"
          :key="index"
          class="product-more-details__item">
          <small class="layout-section__eyebrow">{{ unscapify(item.eyebrow) }}</small>
          <p class="layout-section__description">{{ unscapify(item.description) }}</p>
          <span class="separator"></span>
        </article>
      </span>
    `,
  });

  Vue.component('product-media-video', {
    name: 'productMediaVideo',

    data: function () {
      return {
        information: window.productMedia,
        productCollection: window.currentProduct.collection,
      };
    },

    computed: {
      infoItem() {
        return this.information[this.productCollection] ? this.information[this.productCollection].video : [];
      },

      getUrls() {
        const base = 'https://fast.wistia.com/embed/medias/';
        return {
          js: `${base}${this.infoItem}.jsonp`,
          img: `${base}${this.infoItem}/swatch`,
          class: ['wistia_embed', `wistia_async_${this.infoItem}`, 'videoFoam=true'],
        };
      },
    },

    template: `
      <div class="media-video__iframe-wrapper">
        <script :src="getUrls.js" async></script>
        <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
          <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
            <div :class="getUrls.class" style="height:100%;position:relative;width:100%">
              <div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;">
                <img :src="getUrls.img"
                  style="filter:blur(5px);height:100%;object-fit:contain;width:100%;"
                  alt=""
                  onload="this.parentNode.style.opacity=1;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  });

  Vue.component('product-media-images', {
    name: 'productMediaImages',

    data: function () {
      return {
        information: window.productMedia,
        productCollection: window.currentProduct.collection,
      };
    },

    computed: {
      infoItem() {
        return this.information[this.productCollection] ? this.information[this.productCollection].images : [];
      },
    },

    template: `
      <div v-if="infoItem.length > 0" class="product-media__carousel js-slick-product-media">
        <div v-for="(item, index) in infoItem"
          :key="index"
          class="product-media__carousel-item">
          <img class="product-media__carousel-image"
            :src="item" />
        </div>
      </div>
    `,
  });

  Vue.component('product-faq', {
    name: 'productFaq',

    data: function () {
      return {
        information: window.productFaq,
        productCollection: window.currentProduct.collection,
      };
    },

    computed: {
      infoItem() {
        return this.information[this.productCollection];
      },
    },

    template: `
      <div class="accordion product-faq__items js-product-faq-items">
        <template v-for="(item, index) in infoItem">
          <h2 class="accordion__header product-faq__item-header">{{ item.question }}</h2>
          <div class="accordion__content product-faq__item-contnet">
            <p class="accordion__text product-faq__item-description">{{ item.answer }}</p>
          </div>
        </template>
      </div>
    `,
  });

  new Vue({
    el: '#product-info',
  });
}
