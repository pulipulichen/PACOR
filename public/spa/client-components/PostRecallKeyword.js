(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-components/PostRecallKeyword"],{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.html?vue&type=template&id=261bc226&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.html?vue&type=template&id=261bc226& ***!
  \**********************************************************************************************************************************************************************************************/
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

/***/ "./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.html?vue&type=template&id=261bc226&":
/*!******************************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.html?vue&type=template&id=261bc226& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PostRecallKeyword_html_vue_type_template_id_261bc226___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./PostRecallKeyword.html?vue&type=template&id=261bc226& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.html?vue&type=template&id=261bc226&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PostRecallKeyword_html_vue_type_template_id_261bc226___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PostRecallKeyword_html_vue_type_template_id_261bc226___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.js?vue&type=script&lang=js&?c2b3":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostRecallKeyword_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./PostRecallKeyword.js?vue&type=script&lang=js& */ "./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.js?vue&type=script&lang=js&?c61f");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_PostRecallKeyword_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.js?vue&type=script&lang=js&?c61f":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_QuestionnairePage_QuestionnairePage_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/QuestionnairePage/QuestionnairePage.vue */ "./webpack-app/client/Questionnaire/components/QuestionnairePage/QuestionnairePage.vue");
!(function webpackMissingModule() { var e = new Error("Cannot find module './PostRecallInstruction/PostRecallInstruction.vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());



let PostRecall = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'questionnaire': _components_QuestionnairePage_QuestionnairePage_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    'instruction': !(function webpackMissingModule() { var e = new Error("Cannot find module './PostRecallInstruction/PostRecallInstruction.vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
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

/***/ "./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.vue":
/*!**********************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.vue ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostRecallKeyword_html_vue_type_template_id_261bc226___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostRecallKeyword.html?vue&type=template&id=261bc226& */ "./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.html?vue&type=template&id=261bc226&");
/* harmony import */ var _PostRecallKeyword_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostRecallKeyword.js?vue&type=script&lang=js& */ "./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.js?vue&type=script&lang=js&?c2b3");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PostRecallKeyword_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PostRecallKeyword_html_vue_type_template_id_261bc226___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PostRecallKeyword_html_vue_type_template_id_261bc226___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=PostRecallKeyword.js.map