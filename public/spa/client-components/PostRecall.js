(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-components/PostRecall"],{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Questionnaire/PostRecall/PostRecall.html?vue&type=template&id=359e549b&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Questionnaire/PostRecall/PostRecall.html?vue&type=template&id=359e549b& ***!
  \********************************************************************************************************************************************************************************/
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
    { staticClass: "PostRecall" },
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

/***/ "./webpack-app/client/Questionnaire/PostRecall/PostRecall.html?vue&type=template&id=359e549b&":
/*!****************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PostRecall/PostRecall.html?vue&type=template&id=359e549b& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PostRecall_html_vue_type_template_id_359e549b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./PostRecall.html?vue&type=template&id=359e549b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Questionnaire/PostRecall/PostRecall.html?vue&type=template&id=359e549b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PostRecall_html_vue_type_template_id_359e549b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PostRecall_html_vue_type_template_id_359e549b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Questionnaire/PostRecall/PostRecall.js?vue&type=script&lang=js&?14c9":
/*!********************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PostRecall/PostRecall.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_QuestionnairePage_QuestionnairePage_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/QuestionnairePage/QuestionnairePage.vue */ "./webpack-app/client/Questionnaire/components/QuestionnairePage/QuestionnairePage.vue");
/* harmony import */ var _PostRecallInstruction_PostRecallInstruction_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostRecallInstruction/PostRecallInstruction.vue */ "./webpack-app/client/Questionnaire/PostRecall/PostRecallInstruction/PostRecallInstruction.vue");



let PostRecall = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'questionnaire': _components_QuestionnairePage_QuestionnairePage_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    'instruction': _PostRecallInstruction_PostRecallInstruction_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  mounted: async function () {
    //console.log(this.lib.auth.currentStepConfig.preloadPreImaginaryAnswer)
    //console.log(this.$refs.Questionnaire.answer)
    if (this.lib.auth.currentStepConfig.preloadPreImaginaryAnswer === true
            && this.$refs.Questionnaire.answer === '') {
      let answer = await this.lib.AxiosHelper.get('/client/Questionnaire/getPreImaginaryAnswer')
      //console.log(answer)
      this.$refs.Questionnaire.answer = answer
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (PostRecall);

/***/ }),

/***/ "./webpack-app/client/Questionnaire/PostRecall/PostRecall.js?vue&type=script&lang=js&?d73a":
/*!********************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PostRecall/PostRecall.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostRecall_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./PostRecall.js?vue&type=script&lang=js& */ "./webpack-app/client/Questionnaire/PostRecall/PostRecall.js?vue&type=script&lang=js&?14c9");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_PostRecall_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Questionnaire/PostRecall/PostRecall.vue":
/*!********************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PostRecall/PostRecall.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostRecall_html_vue_type_template_id_359e549b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostRecall.html?vue&type=template&id=359e549b& */ "./webpack-app/client/Questionnaire/PostRecall/PostRecall.html?vue&type=template&id=359e549b&");
/* harmony import */ var _PostRecall_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostRecall.js?vue&type=script&lang=js& */ "./webpack-app/client/Questionnaire/PostRecall/PostRecall.js?vue&type=script&lang=js&?d73a");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PostRecall_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PostRecall_html_vue_type_template_id_359e549b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PostRecall_html_vue_type_template_id_359e549b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Questionnaire/PostRecall/PostRecall.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=PostRecall.js.map