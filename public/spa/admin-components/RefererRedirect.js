(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-components/RefererRedirect"],{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/RefererRedirect/RefererRedirect.html?vue&type=template&id=cf0f0e34&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/components/RefererRedirect/RefererRedirect.html?vue&type=template&id=cf0f0e34& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("fragment")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./webpack-app/admin/components/RefererRedirect/RefererRedirect.html?vue&type=template&id=cf0f0e34&":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/admin/components/RefererRedirect/RefererRedirect.html?vue&type=template&id=cf0f0e34& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_RefererRedirect_html_vue_type_template_id_cf0f0e34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./RefererRedirect.html?vue&type=template&id=cf0f0e34& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/RefererRedirect/RefererRedirect.html?vue&type=template&id=cf0f0e34&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_RefererRedirect_html_vue_type_template_id_cf0f0e34___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_RefererRedirect_html_vue_type_template_id_cf0f0e34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/components/RefererRedirect/RefererRedirect.js?vue&type=script&lang=js&?3bd0":
/*!**************************************************************************************************!*\
  !*** ./webpack-app/admin/components/RefererRedirect/RefererRedirect.js?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RefererRedirect_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./RefererRedirect.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/RefererRedirect/RefererRedirect.js?vue&type=script&lang=js&?60dc");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_RefererRedirect_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/components/RefererRedirect/RefererRedirect.js?vue&type=script&lang=js&?60dc":
/*!**************************************************************************************************!*\
  !*** ./webpack-app/admin/components/RefererRedirect/RefererRedirect.js?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Referer = {
//  props: ['lib', 'status', 'config'],
  data() {    
//    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    console.log('RefererRedirect', this.$route.params.referer)
  },
//  methods: {
//  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Referer);

/***/ }),

/***/ "./webpack-app/admin/components/RefererRedirect/RefererRedirect.vue":
/*!**************************************************************************!*\
  !*** ./webpack-app/admin/components/RefererRedirect/RefererRedirect.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RefererRedirect_html_vue_type_template_id_cf0f0e34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RefererRedirect.html?vue&type=template&id=cf0f0e34& */ "./webpack-app/admin/components/RefererRedirect/RefererRedirect.html?vue&type=template&id=cf0f0e34&");
/* harmony import */ var _RefererRedirect_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RefererRedirect.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/RefererRedirect/RefererRedirect.js?vue&type=script&lang=js&?3bd0");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RefererRedirect_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RefererRedirect_html_vue_type_template_id_cf0f0e34___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RefererRedirect_html_vue_type_template_id_cf0f0e34___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/components/RefererRedirect/RefererRedirect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=RefererRedirect.js.map