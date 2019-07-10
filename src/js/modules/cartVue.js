const state = {
  reRender: '0',
  cart: window.cart,
  cart_count: window.window.cart_count
};

if (typeof Vue === 'function') {
  Vue.component('inline-cart-item', {
    name: 'InlineCartItem',

    data: function() { return state; },

    watch: {
      reRender(newVal) {
        console.log('>>>>>>>>>>>', this.cart_count, newVal);
        this.handleRerender();
      }
    },

    mounted() {
      if (this.cart_count === 0) {
        $('.js-empty-template').toggle();
      }
    },

    methods: {
      cleanTitle(title) {
        return title.split(' -')[0];
      },

      cleanPrice(price) {
        return price.toString().endsWith('00') ? price / 100 : price;
      },

      handleRemoveLink(index) {
        return `/cart/change?line=${index }&amp;quantity=0`;
      },

      updateGlobalCartCount() {
        this.ajaxGetCart(({ item_count }) => {
          this.cart_count = item_count;

          document.querySelectorAll('.js-cart-count')
            .forEach((item) => item.innerHTML = item_count);
        });
      },

      updateInlineCartTotalPrice() {
        this.ajaxGetCart(({ total_price }) => document.querySelector('.js-inline-cart-total').innerHTML = `$${this.cleanPrice(total_price)}`);
      },

      handleQuantity(type, qty, index, price) {
        const totalQty = type === 'add' ? qty + 1 : qty - 1;
        const finalQty = totalQty <= 1 ? 1 : totalQty;
        const globalQty = (this.cart_count - qty) + finalQty;

        this.ajaxUpdateItem(this.cart[index].key, finalQty, () => {
          this.cart_count = globalQty;
          this.cart[index].quantity = finalQty;
          this.cart[index].line_price = price * finalQty;

          this.updateGlobalCartCount(globalQty);
          this.updateInlineCartTotalPrice();
        });
      },

      handleRemoveItem(index) {
        const currentQty = this.cart[index].quantity;
        const newCartCount = this.cart_count - currentQty;

        if (newCartCount === 0) {
          $('.js-empty-template').toggle();
        }

        return this.ajaxUpdateItem(this.cart[index].key, 0, () => {
          this.cart[index].quantity = 0;
          this.cart[index].line_price = 0;

          this.updateGlobalCartCount(newCartCount);
          this.updateInlineCartTotalPrice();
        });
      },

      ajaxUpdateItem(id, quantity, cb) {
        $.ajax({
          method: "POST",
          url: "/cart/change.js",
          dataType: 'json',
          data: {
            id,
            quantity,
          }
        })
        .done(() => {
          cb();
        });
      },

      ajaxGetCart(cb) {
        $.ajax({
          method: "POST",
          url: "/cart.js",
          dataType: 'json',
        })
        .done((data) => {
          console.log(data);
          cb(data);
        });
      },

      handleRerender() {
        this.ajaxGetCart(({ items }) => {
          this.cart = items;
          if (this.cart_count === 0) {
            $('.js-empty-template').toggle();
          }

          this.cart_count = items.length;
          this.updateGlobalCartCount(items.length);
          this.updateInlineCartTotalPrice();

        });
      }
    },

    template: `
      <div class="cart__list">
        <div v-for="(item, index) in cart"
          :key="index"
          v-if="item.quantity > 0"
          class="cart__item">
          <a :href="item.url">
            <img class="cart-item__image"
              :src="item.image"
              :alt="item.title">
          </a>

          <div class="cart-item__info">
            <h2 class="cart-item__title">{{ cleanTitle(item.title) }}</h2>

            <small class="cart-item__small">{{ item.product_type }}</small>
            <small class="cart-item__small">Size. {{ item.variant_title }}</small>

            <div class="cart-item__quantity">
              <span @click="handleQuantity('less', item.quantity, index, item.price)"
                type="submit"
                class="cart-item__quantity-button">-</span>

              <input
                class="cart-item__quantity-input"
                type="text"
                readonly
                :value="item.quantity" />

              <span @click="handleQuantity('add', item.quantity, index, item.price)"
                type="submit"
                class="cart-item__quantity-button">+</span>
            </div>
          </div>

          <p class="cart-item__price">$ {{ cleanPrice(item.line_price) }}</p>
          <span @click="handleRemoveItem(index)" class="cart-item__remove">Remove</span>
        </div>
      </div>
    `,
  });

  new Vue({
    el: '#inline-cart',
  });
}
