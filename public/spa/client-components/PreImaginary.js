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
/* harmony import */ var _PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreImaginary.html?vue&type=template&id=71c8473b& */ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.html?vue&type=template&id=71c8473b&");
/* harmony import */ var _PreImaginary_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PreImaginary.js?vue&type=script&lang=js& */ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.js?vue&type=script&lang=js&?5a9f");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PreImaginary_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PreImaginary_html_vue_type_template_id_71c8473b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Questionnaire/PreImaginary/PreImaginary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/Questionnaire/components/Instruction/Instruction.js?vue&type=script&lang=js&?cf1f":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/components/Instruction/Instruction.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Instruction_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Instruction.js?vue&type=script&lang=js& */ "./webpack-app/client/Questionnaire/components/Instruction/Instruction.js?vue&type=script&lang=js&?e243");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Instruction_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Questionnaire/components/Instruction/Instruction.js?vue&type=script&lang=js&?e243":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/client/Questionnaire/components/Instruction/Instruction.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


let Instruction = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      sections: null,
      paragraphies: null,
      wordCount: 0,
      paragraphyCount: 0,
      sectionCount: 0,
      headings: [],
      images: []
    }
  },
//  components: {
//  },
  computed: {
    articleTitle () {
      return document.title
    },
    readingProgressModules () {
      return this.status.readingConfig.readingProgressModules
    },
    preImaginaryConfig () {
      return this.readingProgressModules.PreImaginary
    },
    postRecallConfig () {
      return this.readingProgressModules.PostRecall
    },
    titleHTML () {
      return this.$t(`This article is titled <span class='highlight'>&quot;{0}&quot;</span>.`, [this.articleTitle])
    },
    timeLimitTypeStart () {
      return this.$t(`The time limit is <span class='highlight'>{0} minutes</span> and the countdown starts when you start typing.`, [this.preImaginaryConfig.limitMinutes])
    },
    timeLimitAutoStart () {
      return this.$t(`The time limit is <span class='highlight'>{0} minutes</span> and the countdown starts now.`, [this.preImaginaryConfig.limitMinutes])
    },
    isDiffMode () {
      let isDiffMode = false
      if (this.lib.auth
              && this.lib.auth.currentStepConfig.preloadPreImaginaryAnswer) {
        isDiffMode = this.lib.auth.currentStepConfig.preloadPreImaginaryAnswer
      }
      return isDiffMode
    }
  },
//  watch: {
//  },
  mounted() {
    this.calculating()
  },
  methods: {
    calculating () {
      this.sections = jquery__WEBPACK_IMPORTED_MODULE_0___default()('section')
      this.paragraphies = this.sections.children()

      let text = this.lib.StringHelper.htmlToTextTrim(this.sections.html(), true)
      this.wordCount = this.lib.StringHelper.countWords(text)

      this.paragraphyCount = this.paragraphies.length

      this.sectionCount = this.sections.length

      let headings = []
      //console.log(this.sections.find('h1,h2,h3,h4,h5,h6').length)
      this.sections.find('h1,h2,h3,h4,h5,h6').each((i, heading) => {
        headings.push(heading.innerText.trim())
      })
      this.headings = headings

      let images = []
      this.sections.find('img').each((i, image) => {
        
        // 這邊要做動態縮圖
        
        images.push({
          src: this.resizeImage(image),
          title: (image.title ? image.title : image.alt)
        })
      })
      this.images = images
    },
    resizeImage (image) {
      let oCanvas = document.createElement("canvas")
      let oCtx = oCanvas.getContext("2d")
      
      let oColorImg = image
      let nWidth = oColorImg.offsetWidth
      let nHeight = oColorImg.offsetHeight
      
      let maxSize = 200
      if (nWidth > nHeight) {
        if (nWidth > 200) {
          nHeight = 200 * (nHeight / nWidth)
          nWidth = 200
        }
      }
      else {
        if (nHeight > 200) {
          nWidth = 200 * (nWidth / nHeight)
          nHeight = 200
        }
      }
      
      oCanvas.width = nWidth
      oCanvas.height = nHeight
      oCtx.drawImage(oColorImg, 0, 0, oColorImg.offsetWidth, oColorImg.offsetHeight, 0,0,nWidth,nHeight);
      
      return oCanvas.toDataURL()
    },
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Instruction);

/***/ })

}]);
//# sourceMappingURL=PreImaginary.js.map