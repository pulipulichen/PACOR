(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-components/PreImaginary"],{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.html?vue&type=template&id=71c8473b&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.html?vue&type=template&id=71c8473b& ***!
  \************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "PreImaginary" },
    [
      _c("questionnaire", {
        ref: "Questionnaire",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib },
        scopedSlots: _vm._u([
          {
            key: "instruction",
            fn: function() {
              return [
                _c(
                  "div",
                  {
                    staticClass:
                      "ui segment field hint instruction-component content-full-height"
                  },
                  [
                    _c("instruction", {
                      attrs: {
                        config: _vm.config,
                        status: _vm.status,
                        lib: _vm.lib
                      }
                    })
                  ],
                  1
                )
              ]
            },
            proxy: true
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.html?vue&type=template&id=71c8473b&":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.html?vue&type=template&id=71c8473b& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./PreImaginary.html?vue&type=template&id=71c8473b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.html?vue&type=template&id=71c8473b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.js?vue&type=script&lang=js&?5a9f":
/*!************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.js?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PreImaginary_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./PreImaginary.js?vue&type=script&lang=js& */ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.js?vue&type=script&lang=js&?d55c");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_PreImaginary_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.js?vue&type=script&lang=js&?d55c":
/*!************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.js?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_QuestionnairePage_QuestionnairePage_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/QuestionnairePage/QuestionnairePage.vue */ "./webpack-app/client/Questionnaire/components/QuestionnairePage/QuestionnairePage.vue");
/* harmony import */ var _PreImaginaryInstruction_PreImaginaryInstruction_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PreImaginaryInstruction/PreImaginaryInstruction.vue */ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginaryInstruction/PreImaginaryInstruction.vue");



let PreImaginary = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'questionnaire': _components_QuestionnairePage_QuestionnairePage_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    'instruction': _PreImaginaryInstruction_PreImaginaryInstruction_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
}

/* harmony default export */ __webpack_exports__["default"] = (PreImaginary);

/***/ }),

/***/ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.vue":
/*!************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PreImaginary.html?vue&type=template&id=71c8473b& */ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.html?vue&type=template&id=71c8473b&");
/* harmony import */ var _PreImaginary_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PreImaginary.js?vue&type=script&lang=js& */ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.js?vue&type=script&lang=js&?5a9f");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _PreImaginary_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_2__["default"],
  _PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_3__["render"],
  _PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_3__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Questionnaire/PreImaginary/PreImaginary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=PreImaginary.js.map