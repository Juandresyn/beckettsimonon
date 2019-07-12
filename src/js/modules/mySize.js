if (typeof Vue === 'function') {
  const _activeItems = {
    size1: '',
    size2: '',
    size3: '',
    size4: '',
    size5: '',
    size6: '',
    size7: '',
    size8: '',
    size9: '',
    size10: '',
  };

  const _valuePicked = {
    size: null,
    shape: null,
  };

  Vue.component('my-size', {
    name: 'mySize',

    props: {
      imageUrl: {
        default: '',
        type: String,
      },
      label: {
        default: 'My Size',
        type: String,
      },
      labelClass: {
        default: '',
        type: String,
      }
    },

    data: function () {
      return {
        isOpen: false,
        modalDefaultClasses: 'modal my-size-modal my-size',
        step: 0,
        stepCount: 5,
        sizeOptions: [],
        mySize: 0,
        queryParameter: 'whats-my-size',
        takeHalf: false,
        addHalf: false,
        valuePicked: JSON.parse(JSON.stringify(_valuePicked)),
        shapeTypes: [
          {
            icon: 'shape1',
            value: 1,
            text: 'very narrow',
          },
          {
            icon: 'shape2',
            value: 2,
            text: 'somewhat narrow',
          },
          {
            icon: 'shape3',
            value: 3,
            text: 'standard width',
            popular: true,
          },
          {
            icon: 'shape4',
            value: 4,
            text: 'somewhat wide',
          },
          {
            icon: 'shape5',
            value: 5,
            text: 'very wide',
          }
        ],
        activeItems: JSON.parse(JSON.stringify(_activeItems)),
        hasError: false,
        errorCode: null,
        isMobile: window.innerWidth < 1024,
      };
    },

    computed: {
      modalClasses() {
        return {
          [this.modalDefaultClasses]: true,
          [`my-size__step my-size__step--${this.step}`]: true,
          ['my-size--started']: this.started && !this.finished,
          ['my-size--done']: this.finished,
          ['my-size--has-errors']: this.hasError,
        };
      },

      stepWidth() {
        const stepNumbers = this.stepCount + 1;
        const singleStepWidth = 100 / stepNumbers;
        let barWidth;

        if (this.hasError) {
          barWidth = 100;
        } else {
          barWidth = singleStepWidth * (this.step > stepNumbers ? stepNumbers : this.step);
        }

        return {
          'width': `${barWidth}%`,
        };
      },

      started() {
        return this.step > 0;
      },

      finished() {
        if (this.step === 6) {
          if (this.valuePicked.shape === 2) {
            this.valuePicked.size = this.takeHalf ? this.findPrevSize(this.findPrevSize(this.valuePicked.size)) : this.findPrevSize(this.valuePicked.size);
          } else if (this.valuePicked.shape === 4) {
            this.valuePicked.size = this.takeHalf ? this.findPrevSize(this.findNextSize(this.valuePicked.size)) : this.findNextSize(this.valuePicked.size);
          } else {
            this.valuePicked.size = this.takeHalf ? this.findPrevSize(this.valuePicked.size) : this.valuePicked.size;
          }

          return true;
        }

        return false;
      },

      currentIsSleceted() {
        console.log(this.activeItems, !!this.activeItems[Object.keys(this.activeItems)[this.step]]);
        return !!this.activeItems[Object.keys(this.activeItems)[this.step - 1]];
      },

      handleFooter() {
        if (this.currentIsSleceted ||
            !!this.valuePicked.shape ||
            this.hasError) {
          return true;
        } else {
          return false;
        }
      },

      sizeOptionsArray() {
        return this.sizeOptions.map(i => i.name);
      },
    },

    mounted() {
      this.setSizeOptions();
      this.setMinimunSize();

      if(getUrlParameter(this.queryParameter)) {
        this.toggleModal();
        window.history.replaceState(null, null, window.location.pathname);
      }
    },

    updated() {
      if (this.step === 5) {
        handleSvg();
      }
    },

    methods: {
      toggleModal() {
        this.reset();
        this.isOpen = !this.isOpen;

        document.documentElement.classList.toggle('my-size-modal--open');
      },

      nextStep() {
        if (this.step === 4 && !this.valuePicked.size) {
          this.showErrors();
        // } else if (!!this.valuePicked.size && !this.valuePicked.shape) {
        //   this.step = 5;
        } else if (this.valuePicked.shape && (this.valuePicked.shape === 1 || this.valuePicked.shape === 5)) {
          this.showErrors(true);
        } else {
          this.step++;
        }
      },

      prevStep() {
        this.step = this.step > 0 ? this.step - 1 : this.step;
      },

      reset() {
        this.step = 0;
        this.hasError = false;
        this.errorCode = null;
        this.valuePicked = JSON.parse(JSON.stringify(_valuePicked));
        this.activeItems = JSON.parse(JSON.stringify(_activeItems));
      },

      setSizeOptions(){
        window.productSizes.forEach((option, index) =>
          this.sizeOptions.push({
            name: option,
            index,
           })
        );
      },

      setMinimunSize() {
        this.mySize = this.sizeOptions[0].index;
      },

      setSize(size) {
        const variantSelector = document.querySelector('#product-option-size');

        variantSelector.selectedIndex = this.sizeOptionsArray.findIndex((i) => i === size);

        if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          variantSelector.dispatchEvent(evt);
        } else {
          variantSelector.fireEvent("onchange");
        }

        this.toggleModal();
      },

      shopNow(size) {
        this.setSize(size);
        handleProductChanges();

        const addTocart = document.querySelector('#add-to-cart');
        addTocart.click();
      },

      showResults() {
        // 8 is the results page
        this.step = 8;
      },

      showErrors(offer) {
        // 1 is the not enought data page
        // 10 is the not offering data page
        this.hasError = true;
        this.errorCode = (offer ? 2 : 1);
      },

      findNextSize(size) {
        const optionsArray = this.sizeOptions.map(i => i.name);
        const foundIndex = optionsArray.findIndex((i) => i === size);

        return optionsArray[foundIndex + 1];
      },

      findPrevSize(size) {
        const optionsArray = this.sizeOptions.map(i => i.name);
        const foundIndex = optionsArray.findIndex((i) => i === size);

        return optionsArray[foundIndex - 1];
      },

      handleSizeClick(size, name, takeHalf) {
        if (!this.valuePicked.size) {
          this.valuePicked.size = name;
          this.takeHalf = !!takeHalf;
        }

        this.activeItems[size] = this.activeItems[size] === name ? '' : name;

        setTimeout(() => this.nextStep(), 480);
      },

      handleShapeClick(value) {
        this.valuePicked.shape = value;

        setTimeout(() => this.nextStep(), 480);
      },

      generateImgUrl(imgName) {
        return this.imageUrl.replace('shape1', imgName);
      },
    },

    template: `
      <span>
        <span :class="labelClass" @click="toggleModal">{{ label }}</span>
        <div :class="modalClasses">
          <div class="modal__container">
            <div class="modal__header">
              <h2 v-if="step > 0 && !finished && !hasError" class="modal__title">What’s my size?</h2>
              <h2 v-if="finished && !hasError && !isMobile" class="modal__title">All done, thank you! We told you it was quick. </h2>

              <span class="modal__close">
                <span @click="toggleModal" class="icon icon--close"></span>
              </span>
            </div>

            <div class="modal__content">
              <div class="my-size__step-wrapper">
                <template v-if="step === 0">
                  <h2 class="my-size__step-heading my-size__step-heading-initial">Find out your Beckett Simonon size <br />in 30 seconds or less.</h2>
                  <p @click="prevStep" class="my-size__step-paragraph">We ask you a few simple questions, crunch the numbers and calculate the best size for you. It’s simple and extremely accurate! {{ step }}</p>
                  <span @click="nextStep" class="btn btn--scarlet my-size__step-btn">Start</span>
                </template>

                <template v-if="step === 1">
                  <h2 class="my-size__step-heading my-size__step-heading--small">Do you know your Brannock device size?</h2>

                  <div class="my-size__sizes-wrapper">
                    <span v-for="(size, index) in sizeOptions"
                      :key="index"
                      @click="handleSizeClick('size1', size.name)"
                      :class="['my-size__size', {'is-active': activeItems.size1 === size.name }]">{{ size.name }}</span>
                  </div>
                </template>

                <template v-if="step === 2">
                  <h2 class="my-size__step-heading my-size__step-heading--small">What size do you wear the most in dress shoe brands?</h2>
                  <p class="my-size__step-subtitle">i.e. Allen Edmonds, Johnston & Murphy or Cole Haan</p>

                  <div class="my-size__sizes-wrapper">
                    <span v-for="(size, index) in sizeOptions"
                      :key="index"
                      @click="handleSizeClick('size2', size.name)"
                      :class="['my-size__size', {'is-active': activeItems.size2 === size.name }]">{{ size.name }}</span>
                  </div>
                </template>

                <template v-if="step === 3">
                  <h2 class="my-size__step-heading my-size__step-heading--small">What size do you wear the most in sneaker brands?</h2>
                  <p class="my-size__step-subtitle">i.e. Adidas and Nike</p>

                  <div class="my-size__sizes-wrapper">
                    <span v-for="(size, index) in sizeOptions"
                      :key="index"
                      @click="handleSizeClick('size3', size.name, true)"
                      :class="['my-size__size', {'is-active': activeItems.size3 === size.name }]">{{ size.name }}</span>
                  </div>
                </template>

                <template v-if="step === 4 && !hasError">
                  <h2 class="my-size__step-heading my-size__step-heading--small">What is the most common shoe size in your closet today?</h2>

                  <div class="my-size__sizes-wrapper">
                    <span v-for="(size, index) in sizeOptions"
                      :key="index"
                      @click="handleSizeClick('size4', size.name)"
                      :class="['my-size__size', {'is-active': activeItems.size4 === size.name }]">{{ size.name }}</span>
                  </div>
                </template>

                <template v-if="step === 5 && !hasError">
                  <h2 class="my-size__step-heading my-size__step-heading--small">How would you describe your foot shape?</h2>

                  <div class="my-size__shape-wrapper">
                    <div v-for="(shape, index) in shapeTypes"
                      :key="index"
                      @click="handleShapeClick(shape.value)"
                      :class="['my-size__shape', {'is-active': valuePicked.shape === shape.value }]">

                      <img :src="generateImgUrl(shape.icon)" class="svg my-size__shape-icon" />
                      <span class="my-size__shape-name">{{ shape.text }}</span>
                      <small v-if="shape.popular" class="my-size__shape-small">Most popular</small>
                    </div>
                  </div>
                </template>

                <template v-if="finished">
                  <h2 v-if="isMobile" class="my-size__step-heading">All done, thank you! We told you it was quick. </h2>
                  <h2 class="my-size__step-heading my-size__step-heading--small">Your Beckett Simonon size is:</h2>
                  <span class="my-size__step-final-size">{{ valuePicked.size }}</span>
                  <p class="my-size__step-description">Still have doubts? No problem! Remember shipping, returns and size <br /> exchanges are completely free in the contiguous US.</p>
                  <span @click="shopNow(valuePicked.size)" class="btn btn--scarlet my-size__step-btn">Shop now</span>
                </template>

                <template v-if="errorCode === 1 && hasError">
                  <img :src="generateImgUrl('step-error')" class="my-size__error-icon" />
                  <h2 class="my-size__step-heading my-size__step-heading--small">Bummer! we don’t have enough data to calculate your size.</h2>
                  <p class="my-size__error-description">Please contact us at <a href="mailto:service@beckettsimonon.com">service@beckettsimonon.com</a> and we’ll give you a <br /> personalized recommendation.</p>
                </template>

                <template v-if="errorCode === 2 && hasError">
                  <img :src="generateImgUrl('step-error')" class="my-size__error-icon" />
                  <h2 class="my-size__step-heading my-size__step-heading--small">Ooops! It looks like we don’t offer your size yet.</h2>
                  <p class="my-size__error-description">We’re very sorry about that. If you’d like to be notified when we do, <br /> please contact us at <a href="mailto:service@beckettsimonon.com">service@beckettsimonon.com</a></p>
                </template>
              </div>

              <span v-if="step > 1 && step > 0 && !finished && !hasError" @click="prevStep" class="my-size__arrow my-size__arrow--left icon icon--arrow"></span>
              <span v-if="step <= stepCount && step > 0 && !hasError" @click="nextStep" class="my-size__arrow my-size__arrow--right icon icon--arrow"></span>

              <span v-if="step > 0 && !finished && !handleFooter"
                @click="nextStep"
                class="my-size__footer">I Don't Know</span>
              <div class="my-size__progress">
                <div v-if="step >= 1 && !hasError" class="my-size__progress-count">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                </div>
                <div class="my-size__progress-bar" :style="stepWidth"></div>
              </div>
            </div>
          </div>
        </div>
      </span>
    `,
  });

  new Vue({
    el: '#product',
  });
}
