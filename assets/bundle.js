/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascript/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/app.js":
/*!***************************!*\
  !*** ./javascript/app.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _side_cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./side-cart.js */ \"./javascript/side-cart.js\");\n/* harmony import */ var _side_cart_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_side_cart_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _side_cart_upsell_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./side-cart-upsell.js */ \"./javascript/side-cart-upsell.js\");\n/* harmony import */ var _side_cart_upsell_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_side_cart_upsell_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _option_selector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./option-selector.js */ \"./javascript/option-selector.js\");\n/* harmony import */ var _option_selector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_option_selector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scss/app.scss */ \"./scss/app.scss\");\n/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scss_app_scss__WEBPACK_IMPORTED_MODULE_3__);\nwindow.$ = window.jQuery = $;\n\nsimply.ajaxCartForm = function (form, successCallback, errorCallback) {\n  var data = form.serialize();\n  var params = {\n    type: 'POST',\n    url: '/cart/add.js',\n    data: data,\n    dataType: 'json',\n    success: function success(line_item) {\n      successCallback(line_item);\n    },\n    error: function error(XMLHttpRequest, textStatus) {\n      var error = JSON.parse(XMLHttpRequest.responseText).description;\n      var error_popup = $(\"<div id='quick_error'></div>\");\n      error_popup.html(\"\");\n      error_popup.append(\"<h6>\" + error + \"</h6>\");\n      alert(error);\n      errorCallback(error);\n    }\n  };\n  jQuery.ajax(params);\n};\n\n\n\n\n\n\n//# sourceURL=webpack:///./javascript/app.js?");

/***/ }),

/***/ "./javascript/option-selector.js":
/*!***************************************!*\
  !*** ./javascript/option-selector.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar variantSelector =\n/*#__PURE__*/\nfunction () {\n  function variantSelector(_parent, _pJson) {\n    _classCallCheck(this, variantSelector);\n\n    this.parent = _parent;\n    this.pJson = _pJson;\n    this.selectChange();\n  }\n\n  _createClass(variantSelector, [{\n    key: \"selectChange\",\n    value: function selectChange() {\n      var productCard = this.parent;\n\n      if (!cn(this.pJson)) {\n        var values = [];\n        $(\".single-option-selector\", productCard).each(function (index, el) {\n          var obj = {};\n          obj.index = $(el).attr(\"data-index\");\n          obj.value = $(el).val();\n          values.push(obj);\n        });\n        var variant = this.findVairant(values);\n\n        if (!cn(variant)) {\n          $(\".single_variants\", productCard).val(variant.id);\n          this.variant = variant;\n          this.productCallback();\n        }\n      }\n    }\n  }, {\n    key: \"findVairant\",\n    value: function findVairant(values) {\n      var variants = this.pJson.variants;\n      var size = values.length;\n\n      for (var i = 0; i < variants.length; i++) {\n        var variant = variants[i];\n\n        if (size == 1) {\n          if (variant[values[0].index] == values[0].value) {\n            return variant;\n          }\n        } else if (size == 2) {\n          if (variant[values[0].index] == values[0].value && variant[values[1].index] == values[1].value) {\n            return variant;\n          }\n        } else {\n          if (variant[values[0].index] == values[0].value && variant[values[1].index] == values[1].value && variant[values[2].index] == values[2].value) {\n            return variant;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"productCallback\",\n    value: function productCallback() {}\n  }]);\n\n  return variantSelector;\n}();\n\n$(document).ready(function () {\n  simply.updateVariant = function () {\n    $('.single-option-selector').each(function () {\n      var productCard = $(this).closest(\".product_card\");\n      var id = productCard.attr(\"data-id\");\n      simply.upsellJson = $.parseJSON($(\"#upsell_json_\".concat(id)).text());\n      new variantSelector(productCard, simply.upsellJson);\n    });\n  };\n\n  simply.updateVariant();\n  $(document).on(\"change\", \".single-option-selector\", function (event) {\n    var productCard = $(this).closest(\".product_card\");\n    var id = productCard.attr(\"data-id\");\n    simply.upsellJson = $.parseJSON($(\"#upsell_json_\".concat(id)).text());\n    new variantSelector(productCard, simply.upsellJson);\n  });\n});\n\n//# sourceURL=webpack:///./javascript/option-selector.js?");

/***/ }),

/***/ "./javascript/side-cart-upsell.js":
/*!****************************************!*\
  !*** ./javascript/side-cart-upsell.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("simply.upsellAddToCart = function () {\n  $(document).on(\"click\", \"#side_cart .product_add_to_cart\", function (e) {\n    // add to cart call for upsell add button\n    e.preventDefault();\n    var button = $(this);\n    button.text(\"Adding...\");\n    var formData = $(this).closest('.ajaxCart');\n    var form = $(\"<form>\");\n    var p_id = $(\"<input name='id' value='\".concat($(\".single_variants\", formData).val(), \"'>\"));\n    var prop = $(this).parents('.flex_wrap').find('input[type=\"hidden\"]');\n    form.append(prop);\n    form.append(p_id);\n    simply.ajaxCartForm(form, function (line_item) {\n      button.text(\"+ Add\");\n      simply.miniCartInit(\"open\");\n    }, function (error_msg) {\n      button.text(\"+ Add\");\n      alert(error_msg);\n    });\n  });\n};\n\n$(document).ready(function () {\n  simply.upsellAddToCart();\n});\n\n//# sourceURL=webpack:///./javascript/side-cart-upsell.js?");

/***/ }),

/***/ "./javascript/side-cart.js":
/*!*********************************!*\
  !*** ./javascript/side-cart.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// miniCartInit: redraws updated sidecart\nsimply.miniCartInit = function (open, callback) {\n  var url = \"/cart?view=sidecart\";\n  $.ajax({\n    url: url,\n    success: function success(cartpage) {\n      if ($(\"#side_cart\").length > 0) {\n        $(\"#side_cart\").html(\"\");\n        cartpage = $(cartpage).filter(\"#side_cart\").html();\n        $(\"#side_cart\").append(cartpage);\n        var count = $(\".count.hide\").text();\n        $(\".cart .count\").html(count);\n        simply.noDataToggle();\n        simply.updateVariant();\n        simply.createUpsellSlider();\n      }\n\n      if (!cn(open)) {\n        if (!cn(callback)) {\n          callback();\n          return;\n        }\n\n        simply.noDataToggle();\n        simply.miniCartOpen();\n      }\n    }\n  });\n}; // miniCartUpdate: updates sidecart on item update\n\n\nsimply.miniCartUpdate = function (form) {\n  $(\".mini_cart_loading\").show();\n  var params = {\n    type: 'POST',\n    url: '/cart',\n    data: form.serialize(),\n    dataType: 'json',\n    success: function success(line_item) {\n      var cart_count = line_item.item_count;\n      $(\".cart .count\").html(cart_count);\n      $(\".mini_cart_loading\").hide();\n      simply.miniCartInit();\n    },\n    error: function error(XMLHttpRequest, textStatus) {\n      var error = JSON.parse(XMLHttpRequest.responseText).description;\n      error = \"<h6>\" + error + \"</h6>\";\n      $(\"#fancy_msg\").html(\"\").append(error);\n      $.fancybox(\"#fancy_msg\");\n      $(\".mini_cart_loading\").hide();\n    }\n  };\n  jQuery.ajax(params);\n}; // miniCartOpen: open sidecart\n\n\nsimply.miniCartOpen = function () {\n  $(\"#side_cart\").addClass(\"active\");\n  $(\".body_wrapper\").addClass(\"active-right active\");\n  simply.blankBgOpen();\n  simply.createUpsellSlider();\n}; // miniCartClose: close sidecart\n\n\nsimply.miniCartClose = function () {\n  $(\"#side_cart\").removeClass(\"active\");\n  $(\".body_wrapper\").removeClass(\"active-right active\");\n  simply.blankBgClose();\n}; // blankBgOpen: open overlay\n\n\nsimply.blankBgOpen = function () {\n  $(\".black_bg\").fadeIn();\n  $(\"html\").addClass(\"overflow_hidden\");\n  $(\"body\").addClass(\"overflow_hidden\");\n}; // blankBgClose: close overlay\n\n\nsimply.blankBgClose = function () {\n  $(\".black_bg\").fadeOut();\n  $(\"html\").removeClass(\"overflow_hidden\");\n  $(\"body\").removeClass(\"overflow_hidden\");\n}; // noDataToggle: toggle (hide/show) different cart parts on count update\n\n\nsimply.noDataToggle = function () {\n  var count = parseInt($('#side_cart .count.hide').text());\n\n  if (count > 0) {\n    $(\"#side_cart .cart_is_empty\").addClass('hide').hide();\n    $(\"#side_cart .cart__actions, #side_cart .cart_data\").removeClass('hide').show();\n  } else {\n    $(\"#side_cart .cart_is_empty\").removeClass('hide').show();\n    $(\"#side_cart .cart__actions, #side_cart .cart_data\").addClass('hide').hide();\n  }\n\n  if ($('.upsell_product_list').children().length > 0) {\n    $(\".upsell-wrapper\").removeClass('hide').show();\n  } else {\n    $(\".upsell-wrapper\").addClass('hide').hide();\n  }\n}; // createUpsellSlider: creates slider if there is more than one item in upsell\n\n\nsimply.createUpsellSlider = function () {\n  if ($('.upsell_product_list').children().length > 1) {\n    if ($('.upsell_product_list').hasClass('slick-initialized')) {\n      $('.upsell_product_list').slick('destroy');\n    }\n\n    $('.upsell_product_list').slick({\n      nextArrow: '<i class=\"icon icon--chevron-right\"></i>',\n      prevArrow: '<i class=\"icon icon--chevron-left\"></i>'\n    });\n  }\n}; // cart items increment/decrement events\n\n\n$(document).on(\"click\", \".spinner .plus\", function () {\n  var that = $(this);\n\n  if (that.hasClass(\"disabled\")) {\n    return false;\n  }\n\n  var target = $(this).siblings(\"input\");\n  var value = parseInt(target.val()) + 1;\n  target.val(value).trigger('change');\n  that.addClass(\"disabled\");\n  setTimeout(function () {\n    that.removeClass(\"disabled\");\n  }, 1000);\n});\n$(document).on(\"click\", \".spinner .min\", function () {\n  var that = $(this);\n\n  if (that.hasClass(\"disabled\")) {\n    return false;\n  }\n\n  var target = $(this).siblings(\"input\");\n  var value = parseInt(target.val());\n\n  if (value > 0) {\n    var value = value - 1;\n    target.val(value).trigger('change');\n    that.addClass(\"disabled\");\n    setTimeout(function () {\n      that.removeClass(\"disabled\");\n    }, 1000);\n  }\n}); // cart items direct count input on item event\n\n$(document).on(\"change\", \"#side_cart .product_qty\", function () {\n  var form = $(this).closest('form');\n  simply.miniCartUpdate(form);\n});\n$(document).ready(function () {\n  simply.noDataToggle();\n  simply.sideCartCheck = $(\"#side_cart\").length; //check if sidecart present\n\n  $(document).on(\"change\", \"#side_cart .qty.cart_item input\", function () {\n    var form = $(this).closest('form');\n    setTimeout(function () {\n      simply.miniCartUpdate(form);\n    }, 1000);\n  });\n  $(document).on(\"click\", \".side_cart\", function () {\n    //mini cart open\n    simply.miniCartOpen();\n  });\n  $(document).on(\"click\", \"#side_cart .close\", function () {\n    //mini cart close\n    simply.miniCartClose();\n  });\n  $(document).on(\"click\", \".black_bg\", function () {\n    //mini cart close on black_bg\n    simply.miniCartClose();\n  });\n  $(document).on(\"click\", \"#side_cart .remove\", function () {\n    //mini cart remove product\n    $(this).text(\"Removing...\");\n    var input = $(this).parent().find(\"input\");\n    input.val(0);\n    var form = $(\"#side_cart form\");\n    var remove = $(this);\n    simply.miniCartUpdate(form);\n  });\n});\n\n//# sourceURL=webpack:///./javascript/side-cart.js?");

/***/ }),

/***/ "./scss/app.scss":
/*!***********************!*\
  !*** ./scss/app.scss ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./scss/app.scss?");

/***/ })

/******/ });