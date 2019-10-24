(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons"],{

/***/ "./config/reading.js":
/*!***************************!*\
  !*** ./config/reading.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  readingProgresses: ['PreImaginary', 'IndividualReading', 'CollaborativeReading', 'PostRecall'],
  readingProgressesFinish: 'Exit',  // 'FreeReading'
  readingProgressModules: {
    'PreImaginary': {
      message: '請開始想像吧！',
      minCharacters: 10,
      limitMinutes: 1
    },
    /**
     * include 'individual-reading' and 'collaborative-reading'
     */
    'reading': {
      limitMinutes: 1,
    },
    'IndividualReading': {
      annnotationTypes: ['confused', 'mainIdea'],
      checklist: [
        'I have already read this section.',
        'I have already written annotations on a sentence I don\'t understand.',
        'I have already written the main ideas of this section.',
      ]
    },
    'CollaborativeReading': {
      annnotationTypes: ['confused', 'mainIdea'],
    },
    'PostRecall': {
      message: '請開始回憶吧！',
      minCharacters: 10,
      limitMinutes: 1
    }
  },
  annotationTypeModules: {
    'confused': {
      minCharacters: 10,
      /**
       * {anchorText}
       * {questionText}
       */
      'questionTemplates': [
        {
          'hint': 'What is it?',
          'template': `I don't know what is "{anchorText}"?`
        },
        {
          'hint': 'Why is it?',
          'template': `Why is "{anchorText}"?`
        },
      ],
      'externalResourceSeachs': [
        {
          'name': 'Find answer in Wikipedia',
          'urlPattern': 'https://zh.wikipedia.org/w/index.php?search={anchorText}&title=Special%3A搜索&go=執行&ns0=1'
        },
        {
          'name': 'Find answer in Google',
          'urlPattern': 'https://www.google.com/search?q={questionText}'
        }
      ]
    },
    'mainIdea': {
      minCharacters: 10,
    }
  }
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/Modal/Modal.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CModal%5CModal.vue":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/Modal/Modal.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CModal%5CModal.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CPagination%5CPagination.vue":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CPagination%5CPagination.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js?!./webpack-app/styles/global.less":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/styles/global.less ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/*\nTo change this license header, choose License Headers in Project Properties.\nTo change this template file, choose Tools | Templates\nand open the template in the editor.\n*/\n/*\n    Created on : Oct 4, 2019, 5:33:39 PM\n    Author     : pudding\n*/\n", "",{"version":3,"sources":["global.less"],"names":[],"mappings":"AAAA;;;;CAIC;AACD;;;CAGC","file":"global.less","sourcesContent":["/*\nTo change this license header, choose License Headers in Project Properties.\nTo change this template file, choose Tools | Templates\nand open the template in the editor.\n*/\n/*\n    Created on : Oct 4, 2019, 5:33:39 PM\n    Author     : pudding\n*/\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".message[data-v-7536335c] {\n  max-width: 100%;\n  overflow: auto;\n  position: fixed !important;\n  left: 3rem;\n  width: calc(100vw - 6rem);\n  bottom: calc(60px + 1rem);\n  max-height: calc(100vh - 60px - 4rem);\n  z-index: 1001;\n}\n.message .list[data-v-7536335c] {\n  margin-top: 0 !important;\n}\n.message .close[data-v-7536335c] {\n  cursor: pointer;\n}\n.message .disabled-icon[data-v-7536335c] {\n  padding-top: 2px !important;\n}\n.message .item > i.icon[data-v-7536335c]:not(.disabled-icon) {\n  padding-top: 5px !important;\n  cursor: pointer;\n}\n.message .item > i.icon[data-v-7536335c]:not(.disabled-icon):hover,\n.message .item > i.icon[data-v-7536335c]:not(.disabled-icon):active {\n  color: #e67e22;\n}\n.message .description pre[data-v-7536335c] {\n  margin-top: 0;\n}\n.message .description pre[data-v-7536335c]:first-of-type {\n  margin-bottom: 0;\n}\n.message .header[data-v-7536335c] {\n  cursor: inherit !important;\n}\n.message .header.retry[data-v-7536335c] {\n  cursor: pointer !important;\n  font-weight: bold;\n  font-family: monospace, monospace;\n}\n.message .error-group .more[data-v-7536335c] {\n  cursor: pointer;\n}\n.message .error-group .more[data-v-7536335c]:hover,\n.message .error-group .more[data-v-7536335c]:active {\n  color: #e67e22;\n}\n.message .error-group .description[data-v-7536335c] {\n  max-width: calc(100vw - 11rem);\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n", "",{"version":3,"sources":["ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,cAAc;EACd,0BAA0B;EAC1B,UAAU;EACV,yBAAyB;EACzB,yBAAyB;EACzB,qCAAqC;EACrC,aAAa;AACf;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,eAAe;AACjB;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,2BAA2B;EAC3B,eAAe;AACjB;AACA;;EAEE,cAAc;AAChB;AACA;EACE,aAAa;AACf;AACA;EACE,gBAAgB;AAClB;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,0BAA0B;EAC1B,iBAAiB;EACjB,iCAAiC;AACnC;AACA;EACE,eAAe;AACjB;AACA;;EAEE,cAAc;AAChB;AACA;EACE,8BAA8B;EAC9B,gBAAgB;EAChB,kBAAkB;AACpB","file":"ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&","sourcesContent":[".message[data-v-7536335c] {\n  max-width: 100%;\n  overflow: auto;\n  position: fixed !important;\n  left: 3rem;\n  width: calc(100vw - 6rem);\n  bottom: calc(60px + 1rem);\n  max-height: calc(100vh - 60px - 4rem);\n  z-index: 1001;\n}\n.message .list[data-v-7536335c] {\n  margin-top: 0 !important;\n}\n.message .close[data-v-7536335c] {\n  cursor: pointer;\n}\n.message .disabled-icon[data-v-7536335c] {\n  padding-top: 2px !important;\n}\n.message .item > i.icon[data-v-7536335c]:not(.disabled-icon) {\n  padding-top: 5px !important;\n  cursor: pointer;\n}\n.message .item > i.icon[data-v-7536335c]:not(.disabled-icon):hover,\n.message .item > i.icon[data-v-7536335c]:not(.disabled-icon):active {\n  color: #e67e22;\n}\n.message .description pre[data-v-7536335c] {\n  margin-top: 0;\n}\n.message .description pre[data-v-7536335c]:first-of-type {\n  margin-bottom: 0;\n}\n.message .header[data-v-7536335c] {\n  cursor: inherit !important;\n}\n.message .header.retry[data-v-7536335c] {\n  cursor: pointer !important;\n  font-weight: bold;\n  font-family: monospace, monospace;\n}\n.message .error-group .more[data-v-7536335c] {\n  cursor: pointer;\n}\n.message .error-group .more[data-v-7536335c]:hover,\n.message .error-group .more[data-v-7536335c]:active {\n  color: #e67e22;\n}\n.message .error-group .description[data-v-7536335c] {\n  max-width: calc(100vw - 11rem);\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".dimmable > .ui.dimmer.opaque {\n  background-color: black !important;\n}\n", "",{"version":3,"sources":["Modal.global.less?vue&type=style&index=0&lang=less&"],"names":[],"mappings":"AAAA;EACE,kCAAkC;AACpC","file":"Modal.global.less?vue&type=style&index=0&lang=less&","sourcesContent":[".dimmable > .ui.dimmer.opaque {\n  background-color: black !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".pagination[data-v-16bb9012] {\n  text-align: center;\n}\n.pagination .active[data-v-16bb9012] {\n  pointer-events: none;\n}\n", "",{"version":3,"sources":["Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,kBAAkB;AACpB;AACA;EACE,oBAAoB;AACtB","file":"Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true&","sourcesContent":[".pagination[data-v-16bb9012] {\n  text-align: center;\n}\n.pagination .active[data-v-16bb9012] {\n  pointer-events: none;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".step-progress-bar[data-v-e5bffb70] {\n  /*\n  max-width: 100%;\n  overflow-x: hidden;\n    \n  \n  &> .button {\n    max-width: 100%;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n  }\n  */\n}\n.step-progress-bar .button[data-v-e5bffb70] {\n  padding: 0 !important;\n  cursor: default !important;\n}\n", "",{"version":3,"sources":["StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE;;;;;;;;;;GAUC;AACH;AACA;EACE,qBAAqB;EACrB,0BAA0B;AAC5B","file":"StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true&","sourcesContent":[".step-progress-bar[data-v-e5bffb70] {\n  /*\n  max-width: 100%;\n  overflow-x: hidden;\n    \n  \n  &> .button {\n    max-width: 100%;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n  }\n  */\n}\n.step-progress-bar .button[data-v-e5bffb70] {\n  padding: 0 !important;\n  cursor: default !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true& ***!
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
  return _vm.showError
    ? _c("div", { staticClass: "ui red floating message" }, [
        _c("i", {
          staticClass: "close icon",
          attrs: { title: _vm.$t("Click to close") },
          on: { click: _vm.close }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "ui relaxed divided list" }, [
          _vm.responseErrorMessage
            ? _c("div", { staticClass: "item error-group" }, [
                _vm.config.debug.ErrorHandler.verbose
                  ? _c("i", {
                      staticClass: "large node js icon",
                      on: {
                        click: function($event) {
                          _vm.showServerErrorStack = !_vm.showServerErrorStack
                        }
                      }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.config.debug.ErrorHandler.verbose === false
                  ? _c("i", { staticClass: "minus circle icon disabled-icon" })
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c("a", { staticClass: "header" }, [
                    _vm.responseErrorMessage
                      ? _c("span", [_vm._v(_vm._s(_vm.responseErrorMessage))])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _vm.config.debug.ErrorHandler.verbose
                    ? _c("div", { staticClass: "description" }, [
                        _vm.responseErrorStack && !_vm.showServerErrorStack
                          ? _c(
                              "pre",
                              {
                                staticClass: "more",
                                on: {
                                  click: function($event) {
                                    _vm.showServerErrorStack = !_vm.showServerErrorStack
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "(" + _vm._s(_vm.$t("Show stacks...")) + ")"
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.responseErrorStack && _vm.showServerErrorStack
                          ? _c("pre", [_vm._v(_vm._s(_vm.responseErrorStack))])
                          : _vm._e()
                      ])
                    : _vm._e()
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.localErrorMessage && _vm.config.debug.ErrorHandler.verbose
            ? _c("div", { staticClass: "item error-group" }, [
                _c("i", {
                  staticClass: "large vuejs icon",
                  on: {
                    click: function($event) {
                      _vm.showErrorStack = !_vm.showErrorStack
                    }
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c("a", { staticClass: "header" }, [
                    _vm.localErrorMessage
                      ? _c("span", [_vm._v(_vm._s(_vm.localErrorMessage))])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "description" }, [
                    _vm.localErrorStack && !_vm.showErrorStack
                      ? _c(
                          "pre",
                          {
                            staticClass: "more",
                            on: {
                              click: function($event) {
                                _vm.showErrorStack = !_vm.showErrorStack
                              }
                            }
                          },
                          [_vm._v("(" + _vm._s(_vm.$t("Show stacks...")) + ")")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.localErrorStack && _vm.showErrorStack
                      ? _c("pre", [_vm._v(_vm._s(_vm.localErrorStack))])
                      : _vm._e()
                  ])
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          typeof _vm.error === "string" && _vm.config.debug.ErrorHandler.verbose
            ? _c("div", { staticClass: "item error-group" }, [
                _c("i", {
                  staticClass: "large vuejs icon",
                  on: {
                    click: function($event) {
                      _vm.showErrorStack = !_vm.showErrorStack
                    }
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c("a", { staticClass: "header" }, [
                    _vm.error
                      ? _c("span", [_vm._v(_vm._s(_vm.error))])
                      : _vm._e()
                  ])
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.error.config &&
          _vm.error.config.method &&
          _vm.config.debug.ErrorHandler.verbose
            ? _c("div", { staticClass: "item" }, [
                _c("i", {
                  staticClass: "large redo icon",
                  on: { click: _vm.retry }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c(
                    "a",
                    { staticClass: "header retry", on: { click: _vm.retry } },
                    [
                      _vm.error.config.method
                        ? _c("span", [_vm._v(_vm._s(_vm.error.config.method))])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.error.config.method && _vm.error.config.url
                        ? _c("span", [_vm._v(": ")])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.error.config.url
                        ? _c("span", [_vm._v(_vm._s(_vm.error.config.url))])
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "description" }, [
                    _c("pre", [_vm._v(_vm._s(_vm.displayErrorData))])
                  ])
                ])
              ])
            : _vm._e()
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true& ***!
  \****************************************************************************************************************************************************************************/
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
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui segment" }, [
      _c("div", { staticClass: "ui active centered inline loader" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/Modal/Modal.html?vue&type=template&id=4cdf972e&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/Modal/Modal.html?vue&type=template&id=4cdf972e& ***!
  \************************************************************************************************************************************************************/
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
  return _c("div", { ref: "modal", staticClass: "ui modal" }, [
    _vm.cancelable !== "false"
      ? _c("i", { staticClass: "close icon" })
      : _vm._e(),
    _vm._v(" "),
    _vm.$slots.header
      ? _c("div", { staticClass: "header" }, [_vm._t("header")], 2)
      : _vm._e(),
    _vm._v(" "),
    _vm.$slots.content
      ? _c("div", { staticClass: "content" }, [
          _c("div", { staticClass: "ui form" }, [_vm._t("content")], 2)
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.$slots.actions || _vm.cancelable === "true" || _vm.reset
      ? _c(
          "div",
          { staticClass: "actions" },
          [
            _vm.cancelable !== "false"
              ? _c(
                  "div",
                  { staticClass: "ui button", on: { click: _vm.hide } },
                  [_vm._v("\r\n      " + _vm._s(_vm.$t("CANCEL")) + "\r\n    ")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.reset
              ? _c(
                  "div",
                  { staticClass: "ui button", on: { click: _vm.doReset } },
                  [_vm._v("\r\n      " + _vm._s(_vm.$t("RESET")) + "\r\n    ")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm._t("actions")
          ],
          2
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/Pagination/Pagination.html?vue&type=template&id=16bb9012&scoped=true&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/Pagination/Pagination.html?vue&type=template&id=16bb9012&scoped=true& ***!
  \**********************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "pagination" }, [
    _c(
      "div",
      { staticClass: "ui basic icon buttons" },
      _vm._l(_vm.pageConfig.maxPage, function(i) {
        return _c(
          "button",
          {
            staticClass: "ui button",
            class: { active: i === _vm.pageConfig.page },
            on: {
              click: function($event) {
                return _vm.changePage(i)
              }
            }
          },
          [_vm._v("\r\n      " + _vm._s(i) + "\r\n    ")]
        )
      }),
      0
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/StepProgressBar/StepProgressBar.html?vue&type=template&id=e5bffb70&scoped=true&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/StepProgressBar/StepProgressBar.html?vue&type=template&id=e5bffb70&scoped=true& ***!
  \********************************************************************************************************************************************************************************************/
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
    {
      staticClass: "step-progress-bar",
      class: { hide: _vm.progresses.length === 0 }
    },
    [
      _vm._v("\r\n  \r\n  " + _vm._s(_vm.currentStep) + "\r\n  \r\n"),
      _c(
        "div",
        { staticClass: "ui mini fluid buttons" },
        _vm._l(_vm.progresses, function(step, index) {
          return _c("span", {
            staticClass: "ui button",
            class: _vm.displayClass(step),
            attrs: { title: _vm.displayTitle(step) }
          })
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("9d049178", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("134aca22", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Modal.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("10e8d652", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("af78eac4", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("2f5f65d0", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ErrorHandler.html?vue&type=template&id=7536335c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?1a14":
/*!**************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ErrorHandler.js?vue&type=script&lang=js& */ "./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?9a23");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?9a23":
/*!**************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let ErrorHandler = {
  props: ['config', 'error', 'lib'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      showError: false,
      showServerErrorStack: false,
      showErrorStack: false
    }
  },
  computed: {
    responseErrorMessage: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.response) === 'object'
              && typeof(this.error.response.data) === 'object'
              && typeof(this.error.response.data.error) === 'object') {
        
        let output = ''
        let e = this.error.response.data.error
        
        if (typeof(e.status) === 'number') {
          output = output + `[${e.status}]`
        }
        
        if (typeof(e.message) === 'string') {
          if (output !== '') {
            output = ' '
          }
          output = output + '' + e.message.trim()
        }
        
        return output
      }
    },
    responseErrorStack: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.response) === 'object'
              && typeof(this.error.response.data) === 'object'
              && typeof(this.error.response.data.error) === 'object') {
        
        let output = ''
        let e = this.error.response.data.error
        
        if (Array.isArray(e.frames)) {
          if (output !== '') {
            output = output + '\n'
          }
          
          output = output + e.frames.map((f) => {
            return `at ${f.method} (${f.file} :${f.line} :${f.column})`
          }).join('\n')
        }
        
        return output
      }
    },
    localErrorMessage: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.message) === 'string') {
        return this.error.message
      }
    },
    localErrorStack: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.stack) === 'string') {
        let stack = this.error.stack
        if (stack.trim().startsWith('found in') && stack.indexOf('--->') > 0) {
          return stack.slice(stack.indexOf('--->') + 4).trim()
        }
        else {
          return stack.split('\n').slice(1).map(line => line.trim()).join('\n')
        }
      }
    },
    displayErrorData: function () {
      let data
      if (typeof(this.error) === 'object'
              && typeof(this.error.config) === 'object'
              && typeof(this.error.config.data) !== 'undefined') {
        data = this.error.config.data  
      }
      else if (typeof(this.error) === 'object'
              && typeof(this.error.config) === 'object'
              && typeof(this.error.config.params) !== 'undefined') {
        data = this.error.config.params
      }
      
      if (data === undefined) {
        return
      }
      
      if (typeof(data) === 'string') {
        try {
          data = JSON.parse(data)
        }
        catch (e) {}
      }

      if (typeof(data) === 'object') {
        data = JSON.stringify(data, null, ' ').slice(2, -2)
      }

      return data
    }
  },
  watch: {
    'error': function () {
      //console.log(typeof(this.error), this.error)
      //console.log(JSON.stringify(this.error.config, null, '\t'))
      if (typeof(this.error) === 'object' 
              || (typeof(this.error) === 'string' && this.error.trim() !== '') ) {
        this.showError = true
        this.showServerErrorStack = false
        this.showErrorStack = false
      }
    },
  },
  methods: {
    close () {
      this.showError = false
    },
    async retry (e) {
      if (typeof(this.error) !== 'object' 
              || typeof(this.error.config) !== 'object' 
              || typeof(this.error.config.url) !== 'string'
              || typeof(this.error.config.method) !== 'string') {
        return false
      }
      this.showError = false
      
      let data = this.error.config.params
      if (typeof(data) === 'undefined') {
        data = this.error.config.data
      }
      await this.lib.AxiosHelper[this.error.config.method](this.error.config.url, data)
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (ErrorHandler);

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&":
/*!*************************************************************************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ErrorHandler/ErrorHandler.vue":
/*!**************************************************************!*\
  !*** ./webpack-app/components/ErrorHandler/ErrorHandler.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ErrorHandler.html?vue&type=template&id=7536335c&scoped=true& */ "./webpack-app/components/ErrorHandler/ErrorHandler.html?vue&type=template&id=7536335c&scoped=true&");
/* harmony import */ var _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorHandler.js?vue&type=script&lang=js& */ "./webpack-app/components/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?1a14");
/* empty/unused harmony star reexport *//* harmony import */ var _ErrorHandler_less_vue_type_style_index_0_id_7536335c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true& */ "./webpack-app/components/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=7536335c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue */ "./webpack-app/components/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CErrorHandler%5CErrorHandler.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ErrorHandler_html_vue_type_template_id_7536335c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7536335c",
  null
  
)

/* custom blocks */

if (typeof _ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ErrorHandler/ErrorHandler.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Loading.html?vue&type=template&id=076bb14c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js&?82b9":
/*!****************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Loading = {
  /*
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    
  } // methods
  */
}

/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js&?dffb":
/*!****************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Loading.js?vue&type=script&lang=js& */ "./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js&?82b9");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue ***!
  \**********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Loading/Loading.vue":
/*!****************************************************!*\
  !*** ./webpack-app/components/Loading/Loading.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loading.html?vue&type=template&id=076bb14c&scoped=true& */ "./webpack-app/components/Loading/Loading.html?vue&type=template&id=076bb14c&scoped=true&");
/* harmony import */ var _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loading.js?vue&type=script&lang=js& */ "./webpack-app/components/Loading/Loading.js?vue&type=script&lang=js&?dffb");
/* empty/unused harmony star reexport *//* harmony import */ var _Loading_less_vue_type_style_index_0_id_076bb14c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true& */ "./webpack-app/components/Loading/Loading.less?vue&type=style&index=0&id=076bb14c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue */ "./webpack-app/components/Loading/Loading.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CLoading%5CLoading.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Loading_html_vue_type_template_id_076bb14c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "076bb14c",
  null
  
)

/* custom blocks */

if (typeof _Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Loading_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CLoading_5CLoading_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/Loading/Loading.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Modal.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Modal/Modal.html?vue&type=template&id=4cdf972e&":
/*!********************************************************************************!*\
  !*** ./webpack-app/components/Modal/Modal.html?vue&type=template&id=4cdf972e& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Modal_html_vue_type_template_id_4cdf972e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Modal.html?vue&type=template&id=4cdf972e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/Modal/Modal.html?vue&type=template&id=4cdf972e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Modal_html_vue_type_template_id_4cdf972e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Modal_html_vue_type_template_id_4cdf972e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/Modal/Modal.js?vue&type=script&lang=js&?0539":
/*!************************************************************************!*\
  !*** ./webpack-app/components/Modal/Modal.js?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Modal.js?vue&type=script&lang=js& */ "./webpack-app/components/Modal/Modal.js?vue&type=script&lang=js&?81d5");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Modal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/Modal/Modal.js?vue&type=script&lang=js&?81d5":
/*!************************************************************************!*\
  !*** ./webpack-app/components/Modal/Modal.js?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'
    , 'cancelable', 'reset', 'dimmerTransparent'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      resetCache: null
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
    'reset': function () {
      try {
        if (typeof(this.reset) === 'object') {
          this.resetCache = JSON.parse(JSON.stringify(this.reset))
        }
        else {
          this.resetCache = this.reset
        }
      }
      catch (e) {}
    }
  },
  mounted() {
    //setTimeout(() => {
    //  this.show()
    //}, 1000)
  },
  methods: {
    getModal: function () {
      return window.$(this.$refs.modal)
    },
    _awaitInit: function (callback) {
      let modal = this.getModal()
      let loop = () => {
        if (typeof(modal.modal) !== 'function') {
          setTimeout(loop, 100)
        }
        else {
          callback(modal)
        }
      }
      loop()
    },
    show: function () {
      this._awaitInit((modal) => {
        let options = {}
        if (this.cancelable === 'false') {
          options.closable = false
          options.duration = 0
        }
        
        if (this.dimmerTransparent === 'false') {
          options.dimmerSettings= {
            dimmerName: 'opaque'
          }
        }
        
        modal.modal(options).modal('show')
      })
    },
    hide: function () {
      this._awaitInit((modal) => {
        modal.modal('hide')
      })
    },
    doReset: function () {
      for (let name in this.resetCache) {
        this.reset[name] = this.resetCache[name]
      }
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Template);

/***/ }),

/***/ "./webpack-app/components/Modal/Modal.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CModal%5CModal.vue":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/Modal/Modal.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CModal%5CModal.vue ***!
  \**************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./Modal.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CModal%5CModal.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/Modal/Modal.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CModal%5CModal.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Modal/Modal.vue":
/*!************************************************!*\
  !*** ./webpack-app/components/Modal/Modal.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal_html_vue_type_template_id_4cdf972e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.html?vue&type=template&id=4cdf972e& */ "./webpack-app/components/Modal/Modal.html?vue&type=template&id=4cdf972e&");
/* harmony import */ var _Modal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.js?vue&type=script&lang=js& */ "./webpack-app/components/Modal/Modal.js?vue&type=script&lang=js&?0539");
/* empty/unused harmony star reexport *//* harmony import */ var _Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal.global.less?vue&type=style&index=0&lang=less& */ "./webpack-app/components/Modal/Modal.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modal.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CModal%5CModal.vue */ "./webpack-app/components/Modal/Modal.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CModal%5CModal.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Modal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Modal_html_vue_type_template_id_4cdf972e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Modal_html_vue_type_template_id_4cdf972e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* custom blocks */

if (typeof _Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Modal_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CModal_5CModal_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/Modal/Modal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/Pagination/Pagination.html?vue&type=template&id=16bb9012&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/Pagination/Pagination.html?vue&type=template&id=16bb9012&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Pagination_html_vue_type_template_id_16bb9012_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Pagination.html?vue&type=template&id=16bb9012&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/Pagination/Pagination.html?vue&type=template&id=16bb9012&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Pagination_html_vue_type_template_id_16bb9012_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Pagination_html_vue_type_template_id_16bb9012_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/Pagination/Pagination.js?vue&type=script&lang=js&?41f8":
/*!**********************************************************************************!*\
  !*** ./webpack-app/components/Pagination/Pagination.js?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pagination_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Pagination.js?vue&type=script&lang=js& */ "./webpack-app/components/Pagination/Pagination.js?vue&type=script&lang=js&?77e6");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Pagination_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/Pagination/Pagination.js?vue&type=script&lang=js&?77e6":
/*!**********************************************************************************!*\
  !*** ./webpack-app/components/Pagination/Pagination.js?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Pagination = {
  props: ['pageConfig'],
  data() {
    return {
    }
  },
  methods: {
    changePage: function (i) {
      if (i === this.pageConfig.page) {
        return false
      }
      this.pageConfig.page = i
    },
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Pagination);

/***/ }),

/***/ "./webpack-app/components/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CPagination%5CPagination.vue":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CPagination%5CPagination.vue ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CPagination%5CPagination.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CPagination%5CPagination.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_16bb9012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_16bb9012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_16bb9012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_16bb9012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_16bb9012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_16bb9012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Pagination/Pagination.vue":
/*!**********************************************************!*\
  !*** ./webpack-app/components/Pagination/Pagination.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pagination_html_vue_type_template_id_16bb9012_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination.html?vue&type=template&id=16bb9012&scoped=true& */ "./webpack-app/components/Pagination/Pagination.html?vue&type=template&id=16bb9012&scoped=true&");
/* harmony import */ var _Pagination_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.js?vue&type=script&lang=js& */ "./webpack-app/components/Pagination/Pagination.js?vue&type=script&lang=js&?41f8");
/* empty/unused harmony star reexport *//* harmony import */ var _Pagination_less_vue_type_style_index_0_id_16bb9012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true& */ "./webpack-app/components/Pagination/Pagination.less?vue&type=style&index=0&id=16bb9012&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CPagination%5CPagination.vue */ "./webpack-app/components/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CPagination%5CPagination.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Pagination_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pagination_html_vue_type_template_id_16bb9012_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Pagination_html_vue_type_template_id_16bb9012_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "16bb9012",
  null
  
)

/* custom blocks */

if (typeof _Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/Pagination/Pagination.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/StepProgressBar/StepProgressBar.html?vue&type=template&id=e5bffb70&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./webpack-app/components/StepProgressBar/StepProgressBar.html?vue&type=template&id=e5bffb70&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StepProgressBar_html_vue_type_template_id_e5bffb70_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./StepProgressBar.html?vue&type=template&id=e5bffb70&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/StepProgressBar/StepProgressBar.html?vue&type=template&id=e5bffb70&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StepProgressBar_html_vue_type_template_id_e5bffb70_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StepProgressBar_html_vue_type_template_id_e5bffb70_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js&?0155":
/*!********************************************************************************************!*\
  !*** ./webpack-app/components/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let StepProgressBar = {
  props: ['lib', 'config', 'progresses'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
    }
  },
  /*
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  */
  computed: {
    currentStep: function () {
      if (Array.isArray(this.progresses) === false 
              || this.progresses.length === 0) {
        return this.$t('Not yet started')
      }
      
      for (let i = 0; i < this.progresses.length; i++) {
        let step = this.progresses[i]
        if (step.isCompleted === true) {
          continue
        }
        
        if (i === 0 
                && typeof(step.start_timestamp) !== 'number') {
          return '(' + this.$t('Not yet started') + ')'
        }
        
        return this.displayTitle(step)
      }
      return this.$t('READING_PROGRESS.finish')
    }
  },
  methods: {
    getTitle: function (step_name) {
      if (typeof(step_name) === 'object'
              && typeof(step_name.step_name) === 'string') {
        step_name = step_name.step_name
      }
      return this.$t(`READING_PROGRESS.${step_name}`)
    },
    displayTitle: function (step) {
      let title = this.getTitle(step)
      if (typeof(step.start_timestamp) === 'number'){
        title = `${title} (${this.displayTime(step)})`
      }
      return title
    },
    displayTime: function (step) {
      if (step.isCompleted === false) {
        return this.lib.DayJSHelper.toNow(step.start_timestamp)
      }
      else {
        return this.lib.DayJSHelper.shortTime(step.end_timestamp - step.start_timestamp)
        //return this.lib.DayJSHelper.from(step.start_timestamp, step.end_timestamp)
      }
      /*
      if (index === 0) {
        return this.lib.DayJSHelper.shortTime(start_timestamp)
      }
      else {
        let baseTimestamp = this.steps[0].start_timestamp
        return this.lib.DayJSHelper.to(baseTimestamp, start_timestamp)
      }
      */
    },
    displayClass: function (step) {
      if (step.isCompleted === true) {
        return 'grey'
      }
      else if (typeof(step.start_timestamp) === 'number') {
        return 'green'
      }
      else {
        return 'basic grey'
      }
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (StepProgressBar);

/***/ }),

/***/ "./webpack-app/components/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js&?5851":
/*!********************************************************************************************!*\
  !*** ./webpack-app/components/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StepProgressBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./StepProgressBar.js?vue&type=script&lang=js& */ "./webpack-app/components/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js&?0155");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_StepProgressBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true&":
/*!*******************************************************************************************************************************!*\
  !*** ./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_e5bffb70_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_e5bffb70_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_e5bffb70_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_e5bffb70_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_e5bffb70_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_e5bffb70_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/StepProgressBar/StepProgressBar.vue":
/*!********************************************************************!*\
  !*** ./webpack-app/components/StepProgressBar/StepProgressBar.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StepProgressBar_html_vue_type_template_id_e5bffb70_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StepProgressBar.html?vue&type=template&id=e5bffb70&scoped=true& */ "./webpack-app/components/StepProgressBar/StepProgressBar.html?vue&type=template&id=e5bffb70&scoped=true&");
/* harmony import */ var _StepProgressBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StepProgressBar.js?vue&type=script&lang=js& */ "./webpack-app/components/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js&?5851");
/* empty/unused harmony star reexport *//* harmony import */ var _StepProgressBar_less_vue_type_style_index_0_id_e5bffb70_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true& */ "./webpack-app/components/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=e5bffb70&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _StepProgressBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StepProgressBar_html_vue_type_template_id_e5bffb70_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StepProgressBar_html_vue_type_template_id_e5bffb70_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e5bffb70",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/StepProgressBar/StepProgressBar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/config.js":
/*!*******************************!*\
  !*** ./webpack-app/config.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.config.js */ "./webpack-app/styles/style.config.js");
/* harmony import */ var _styles_style_config_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_style_config_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_reading_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../config/reading.js */ "./config/reading.js");
/* harmony import */ var _config_reading_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config_reading_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_production_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.production.js */ "./webpack-app/config.production.js");
let config = {
  debug: {
    ErrorHandler: {
      verbose: true
    }
  },
  
  locale: 'zh-TW',
  clientConfigName: 'CONFIG',
  detectActivitySeconds: 10
}


config.styleConfig = _styles_style_config_js__WEBPACK_IMPORTED_MODULE_0___default.a


config.readingConfig = _config_reading_js__WEBPACK_IMPORTED_MODULE_1___default.a


if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (config);

/***/ }),

/***/ "./webpack-app/config.production.js":
/*!******************************************!*\
  !*** ./webpack-app/config.production.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// 要怎麼在發佈版加入這邊的設定呢...

/* harmony default export */ __webpack_exports__["default"] = ({
  debug: {
    ErrorHandler: {
      verbose: false
    }
  }
});


/***/ }),

/***/ "./webpack-app/helpers/AxiosHelper.js":
/*!********************************************!*\
  !*** ./webpack-app/helpers/AxiosHelper.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.withCredentials = true

let AxiosHelper = {
  baseURL: '',
  errorHandler: null,
  setBaseURL: function (baseURL) {
    if (baseURL.endsWith('/') === true) {
      baseURL = baseURL.slice(0, -1)
    }
    this.baseURL = baseURL
    return this
  },
  setErrorHandler: function (handler) {
    this.errorHandler = handler
  },
  handleError: function (error, b) {
    //console.error(error.response)
    if (typeof(this.errorHandler) === 'function') {
      this.errorHandler(error)
    }
  },
  getURL: function (path) {
    if (path.startsWith('/') === false) {
      path = '/' + path
    }
    return this.baseURL + path
  },
  get: async function (path, data, errorHandler) {
    path = this.getURL(path)
    let result = await this.getOther(path, data, errorHandler)
    return result
  },
  getOther: async function (path, data, errorHandler) {
    if (typeof(data) === 'string') {
      data = JSON.parse(data)
    }
    
    let options = {}
    if (typeof(data) === 'object') {
      options.params = data
    }
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(path, options)
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return
    }
  },
  post: async function (path, data, errorHandler) {
    if (typeof(data) === 'string') {
      data = JSON.parse(data)
    }
    
    let options = {}
    if (typeof(data) === 'object') {
      options = data
    }
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.getURL(path), options)
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return
    }
  },
  upload: async function (path, data, errorHandler) {
    if (typeof(data) !== 'object') {
      this.handleError('no data')
      return ''
    }
    
    //console.log(data)
    
    let formData = new FormData()
    for (let name in data) {
      let value = data[name]
      if (typeof(value.files) === 'object') {
        value = value.files[0]
      }
      formData.append(name, value)
    }
    
    //console.log(formData)
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.getURL(path), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AxiosHelper);

/***/ }),

/***/ "./webpack-app/helpers/DayJSHelper.js":
/*!********************************************!*\
  !*** ./webpack-app/helpers/DayJSHelper.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/relativeTime */ "./node_modules/dayjs/plugin/relativeTime.js");
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1__);


//import 'dayjs/locale/zh-tw' // load on demand
dayjs__WEBPACK_IMPORTED_MODULE_0___default.a.extend(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1___default.a)

// preload locales
__webpack_require__(/*! dayjs/locale/zh-tw */ "./node_modules/dayjs/locale/zh-tw.js").default

let DayJSHelper = {
  $t: null,
  setI18N: function ($t) {
    this.$t = $t
  },
  time: function () {
    return (new Date()).getTime()
  },
  setLocale: function (dayjsLocale) {
    if (typeof(dayjsLocale) !== 'string') {
      return this
    }
    
    dayjsLocale = dayjsLocale.toLowerCase()
    
    try {
      //require(`dayjs/locale/${dayjsLocale}`).default // load on demand
      dayjs__WEBPACK_IMPORTED_MODULE_0___default.a.locale(dayjsLocale)
    }
    catch (e) {
      console.error(`dayjs locale is error: ${dayjsLocale}`)
    }
    return this
  },
  fromNow: function (timestamp) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(timestamp).fromNow()
  },
  toNow: function (timestamp) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(timestamp).toNow()
  },
  _prefixZero: function (n) {
    if (n < 10) {
      return '0' + n
    }
  },
  shortTime: function (millisecond) {
    //let intervalTimestamp = (new Date()).getTime() - timestamp
    
    let year = 0
    let month = 0
    let day = 0
    let hour = 0
    let minute = 0
    
    if (millisecond < 60000) {
      // 如果是在距離現在12小時內，那就顯示 n分鐘前
      return this.$t('in a minute')
    }
    else if (millisecond < 86400000) {
      // 如果是距離現在1天內，那就顯示 hh:mm
      hour = Math.floor(millisecond / 3600000)
      minute = Math.floor((millisecond % 3600000) / 60000)
      return this._prefixZero(hour) + ':' + this._prefixZero(minute)
      
      //return dayjs().millisecond(timestamp).format('HH:mm')
      //return this.$t('in a day')
    }
    else if (millisecond < 2592000000) {
      // 如果距離30天內，那就顯示 in {0} day
      day = Math.ceil(millisecond / 86400000)
      return this.$t('in {0} day', [day])
    }
    else if (millisecond < 31536000000) {
      // 如果距離現在1年內，那就顯示 in {0} month
      //return dayjs().millisecond(millisecond).format('MM-DD')
      month = Math.ceil(millisecond / 2592000000)
      return this.$t('in {0} month', [month])
    }
    else {
      // 如果超過1年，那就顯示 in {0} year
      
      year = Math.ceil(millisecond / 31536000000)
      return this.$t('in {0} year', [year])
    }
  },
  from: function (baseTimestamp, toTimestamp) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(baseTimestamp).from(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(toTimestamp))
  },
  to: function (baseTimestamp, toTimestamp) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(baseTimestamp).to(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(toTimestamp))
  }
}

/* harmony default export */ __webpack_exports__["default"] = (DayJSHelper);

/***/ }),

/***/ "./webpack-app/helpers/StringHelper.js":
/*!*********************************************!*\
  !*** ./webpack-app/helpers/StringHelper.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let StringHelper = {
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
}

/* harmony default export */ __webpack_exports__["default"] = (StringHelper);

/***/ }),

/***/ "./webpack-app/helpers/ValidateHelper.js":
/*!***********************************************!*\
  !*** ./webpack-app/helpers/ValidateHelper.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let ValidateHelper = {
  isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  _urlPattern: new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'), // fragment locator
  isURL(url) {
    return !!this._urlPattern.test(url);
  },
  isJSON(str) {
    if (typeof(str) !== 'string') {
      return true
    }
    try {
      JSON.parse(str)
      return true
    }
    catch (e) {
      return false
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ValidateHelper);

/***/ }),

/***/ "./webpack-app/i18n/i18n-global.conf.js":
/*!**********************************************!*\
  !*** ./webpack-app/i18n/i18n-global.conf.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let i18nGlobal = {
  "en": {
    "Title": "Example Title",
    "Groups": "Group | Groups",
    "Readers": "Reader | Readers",
    "in {0} day": "in {0} day | in {0} days",
    "in {0} month": "in {0} month | in {0} months",
    "in {0} year": "in {0} year | in {0} years"
  },
  "zh-TW": {
    "LOGIN": "登入",
    "LOGOUT": "登出",
    "EXIT": "離開",
    "Title": "標題",
    "OK": "確認",
    "UPLOAD": "上傳",
    "SUBMIT": "送出",
    "ADD": "新增",
    "CANCEL": "取消",
    "Example": "範例",
    "DATABASE": "資料庫",
    "RESET": "重設",
    "Path": "路徑",
    "Config": "設定",
    "Group": "分組",
    "Groups": "組",
    "Readers": "讀者",
    "Dashboard": "儀表板",
    "Not yet started": "尚未開始",
    "READING_PROGRESS.not-yet-started": "尚未開始",
    "READING_PROGRESS.PreImaginary": "閱讀前的想像",
    "READING_PROGRESS.IndividualReading": "個人閱讀",
    "READING_PROGRESS.CollaborativeReading": "團體閱讀",
    "READING_PROGRESS.PostRecall": "閱讀後的回想",
    "READING_PROGRESS.finish": "已經完成",
    "in {0} day": "在{0}天內",
    "in {0} month": "在{0}月內",
    "in {0} year": "在{0}年內"
  }
}

/* harmony default export */ __webpack_exports__["default"] = (i18nGlobal);

/***/ }),

/***/ "./webpack-app/plugins/i18n.js":
/*!*************************************!*\
  !*** ./webpack-app/plugins/i18n.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _i18n_i18n_global_conf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../i18n/i18n-global.conf.js */ "./webpack-app/i18n/i18n-global.conf.js");


vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_0__["default"])



const i18n = new vue_i18n__WEBPACK_IMPORTED_MODULE_0__["default"]({
  locale: 'zh-TW', // set default locale
  messages: _i18n_i18n_global_conf_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  silentTranslationWarn: true
})

/* harmony default export */ __webpack_exports__["default"] = (i18n);

/***/ }),

/***/ "./webpack-app/plugins/plugins.js":
/*!****************************************!*\
  !*** ./webpack-app/plugins/plugins.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _styles_global_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../styles/global.less */ "./webpack-app/styles/global.less");
/* harmony import */ var _styles_global_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_global_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_fragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-fragment */ "./node_modules/vue-fragment/dist/vue-fragment.esm.js");

vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.devtools = false
vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.productionTip = false




vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_fragment__WEBPACK_IMPORTED_MODULE_2__["default"].Plugin)


/***/ }),

/***/ "./webpack-app/styles/global.less":
/*!****************************************!*\
  !*** ./webpack-app/styles/global.less ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js?sourceMap!../../node_modules/less-loader/dist/cjs.js??ref--1-2!./global.less */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js?!./webpack-app/styles/global.less");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("831b4592", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/styles/semantic-ui.js":
/*!*******************************************!*\
  !*** ./webpack-app/styles/semantic-ui.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")
window.jQuery = window.$ = $

// Use Semantic UI original version
//require('./../vendors/semantic-ui/semantic.min.css')
//require('./../vendors/semantic-ui/semantic.min.js')

// Use Semantic UI NIWSF version
let SemanticUINIWSF = () => Promise.all(/*! import() | vendors/semantic-ui-niwsf */[__webpack_require__.e("vendors"), __webpack_require__.e("vendors/semantic-ui-niwsf")]).then(__webpack_require__.t.bind(null, /*! ./semantic-ui-niwsf/semantic-ui-niwsf-webpack.js */ "./webpack-app/styles/semantic-ui-niwsf/semantic-ui-niwsf-webpack.js", 7))
SemanticUINIWSF()

/***/ }),

/***/ "./webpack-app/styles/style.config.js":
/*!********************************************!*\
  !*** ./webpack-app/styles/style.config.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * If you revise following configuration, you should compile less with Webpack again.
 */
module.exports = {
  "TopMenuMinWidth": "600px",
  "TopMenuHeight": "60px",
  "TocbotWidth": "200px"
}

/***/ })

}]);
//# sourceMappingURL=commons.js.map