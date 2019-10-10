if (typeof Vue === 'function') {
  Vue.component('login-register', {
    name: 'loginRegister',

    props: {
      customer: {
        default: '',
        type: String,
      },
      mobile: {
        default: false,
        type: Boolean,
      },
    },

    data: function () {
      return {
        isOpen: false,
        isLogin: true,
        isRegister: false,
        isRecover: false,
        isMobile: window.innerWidth < 1120,
        hovering: false,
        modalDefaultClasses: 'modal login-form-modal login-form',
        currentPath: window.location.pathname,
      };
    },

    computed: {
      modalClasses() {
        return {
          [this.modalDefaultClasses]: true,
        };
      },

      triggerClass() {
        return {
          'login-form-modal__hover': this.hovering,
        };
      },

      hasCustomer() {
        return this.customer !== '';
      },

      modalTitle() {
        return this.isLogin ? !this.isRecover ? 'Login' : 'Recover' : 'Register';
      },

      footerText() {
        return this.isLogin ? 'NEW CUSTOMER? <span>SIGN UP HERE</span>' : 'RETURNING CUSTOMER? <span>LOG IN HERE</span>';
      },

      linkLabel() {
        return this.hasCustomer ? 'My Account' : 'Login';
      },

      handleShow() {
        if (this.isMobile && this.$parent.$el.id === 'header-main-mobile') {
          return true;
        } else if (this.isMobile && this.$parent.$el.id === 'header-main') {
          return false;
        } else if (!this.isMobile && this.$parent.$el.id === 'header-main') {
          return true;
        }
      },
    },

    mounted() {
      window.addEventListener('resize', this.handleResize);
    },

    methods: {
      reset() {
        this.isOpen = false;
        this.isLogin = true;
        this.isRegister = false;
        this.isRecover = false;
        this.isMobile = window.innerWidth < 1120;
        this.hovering = false;
        this.modalDefaultClasses = 'modal login-form-modal login-form';
        this.currentPath = window.location.pathname;
      },

      toggleModal() {
        this.reset();

        if (this.isMobile && document.body.classList.contains('menu-is-open')) {
          document.querySelector('.header-main__modal').classList.toggle('menu-login-form');
        }

        this.isOpen = !this.isOpen;

        document.documentElement.classList.toggle('login-form-modal--open');
      },

      toggleForm() {
        this.isLogin = !this.isLogin;
        this.isRegister = !this.isRegister;
      },

      handleMouseIn() {
        this.hovering = !!this.customer;
      },

      handleMouseOut() {
        this.hovering = false;
      },

      handleResize() {
        this.isMobile = window.innerWidth < 1120;
      }
    },

    template: `
      <span v-if="handleShow" :class="['login-form-modal__trigger', triggerClass]">
        <span v-if="!hasCustomer" @click="toggleModal" class="login-form-modal__label">{{ linkLabel }}</span>
        <a v-if="hasCustomer" href="/account" class="login-form-modal__label">{{ linkLabel }}</a>

        <div :class="modalClasses">
          <div class="modal__container">
            <div class="modal__header">
              <h2 class="modal__title">{{ modalTitle }}</h2>

              <span class="modal__close">
                <span @click="toggleModal" class="icon icon--close"></span>
              </span>
            </div>

            <div class="modal__content">
              <transition name="fade">
                <form method="post"
                  v-if="isRecover"
                  action="/account/recover"
                  accept-charset="UTF-8">
                  <input type="hidden" name="form_type" value="recover_customer_password">
                  <input type="hidden" name="utf8" value="✓">

                  <div class="input-control">
                    <label for="email" class="form-label required">Email</label>
                    <input type="email" name="email" id="RecoverEmail" autocorrect="off" autocapitalize="off" class="input form-input">
                  </div>

                  <div class="input-control input-control--action">
                    <button class="btn btn--scarlet login-form-modal__btn"> Send Email </button>
                    <span class="btn btn--dark login-form-modal__btn" @click="isRecover = !isRecover">Login Instead</span>
                  </div>
                </form>
              </transition>

              <transition name="fade">
                <form
                  v-if="isLogin && !isRecover"
                  method="post"
                  action="/account/login"
                  id="customer_login"
                  class="login-form"
                  accept-charset="UTF-8">
                  <input type="hidden" name="checkout_url" :value="currentPath" />

                  <div class="input-control">
                    <label for="email" class="form-label required">Email</label>
                    <input type="text" name="customer[email]" id="email" class="input form-input">
                  </div>

                  <div class="input-control">
                    <label for="password" class="form-label required">Password</label>
                    <input type="password" name="customer[password]" id="password" class="input form-input" autocomplete="new-password">
                  </div>

                  <div class="input-control input-control--action">
                    <button class="btn btn--scarlet login-form-modal__btn">Login Now</button>
                    <span class="login-form-modal__forgot" @click="isRecover = !isRecover">Forgot your password?</span>
                  </div>

                  <div class='oxi-social-login'></div>
                </form>
              </transition>

              <transition name="fade">
                <form v-if="isRegister"
                  method="post"
                  action="/account"
                  id="create_customer"
                  accept-charset="UTF-8">
                  <input type="hidden" name="form_type" value="create_customer">
                  <input type="hidden" name="utf8" value="✓">

                  <div class="input-control">
                    <label for="first_name" class="form-label required">First Name</label>
                    <input id="first_name" type="text" class="input form-input" value="" name="customer[first_name]">
                  </div>

                  <div class="input-control">
                    <label for="last_name" class="form-label required">Last Name</label>
                    <input id="last_name" type="text" class="input form-input" value="" name="customer[last_name]">
                  </div>

                  <div class="input-control">
                    <label for="email" class="form-label required">Email Address</label>
                    <input id="email" type="email" class="input form-input" value="" name="customer[email]">
                  </div>

                  <div class="input-control">
                    <label for="password" class="form-label required">Password</label>
                    <input type="password" class="input form-input" value="" name="customer[password]">
                  </div>

                  <div class="input-control input-control--action">
                    <button class="btn btn--scarlet login-form-modal__btn">Create Account</button>
                  </div>
                </form>
              </transition>

              <div v-if="!isRecover" class="login-form-modal__footer">
                <span @click="toggleForm()" class="login-form-modal__toggle" v-html="footerText"></span>
              </div>

              <div class='oxi-social-login'></div>
            </div>
          </div>
        </div>
      </span>
    `,

  });

  new Vue({
    el: '#header-main',
  });

  new Vue({
    el: '#header-main-mobile',
  });
}
