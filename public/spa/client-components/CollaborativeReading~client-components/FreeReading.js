(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-components/CollaborativeReading~client-components/FreeReading"],{

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CNavigationItems%5CNavigationItems.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CNavigationItems%5CNavigationItems.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"In {0} step":"In {0} step"},"zh-TW":{"In {0} step":"在 {0} 階段","Collaborative Reading will end at count to 0.":"請注意，倒數計時到0的時候，協助閱讀階段就會結束。","You will get notifications from other readers here.":"您可以在這裡收到來自其他讀者的通知。","You can select a peer and watch what he/she read.":"您可以在這裡選擇要協助的同儕。","You can choose a type of annotations to read.":"您可以在這裡選擇要顯示的標註類型。"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".username[data-v-97ee9ca8] {\n  margin-left: 0.5em;\n  font-size: 1.5em;\n  font-weight: bold;\n}\n.username .step[data-v-97ee9ca8] {\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5em;\n}\n.avatar img[data-v-97ee9ca8] {\n  margin-left: 0.5em !important;\n}\n/*@media (max-width: 400px) {\n  .username .step {\n    display: none;\n  }\n}*/\n", "",{"version":3,"sources":["NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;AACnB;AACA;EACE,eAAe;EACf,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,6BAA6B;AAC/B;AACA;;;;EAIE","file":"NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true&","sourcesContent":[".username[data-v-97ee9ca8] {\n  margin-left: 0.5em;\n  font-size: 1.5em;\n  font-weight: bold;\n}\n.username .step[data-v-97ee9ca8] {\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5em;\n}\n.avatar img[data-v-97ee9ca8] {\n  margin-left: 0.5em !important;\n}\n/*@media (max-width: 400px) {\n  .username .step {\n    display: none;\n  }\n}*/\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.html?vue&type=template&id=97ee9ca8&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.html?vue&type=template&id=97ee9ca8&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
  return _vm.status.progress.highlights
    ? _c("navigation", {
        ref: "nav",
        attrs: {
          config: _vm.config,
          status: _vm.status,
          lib: _vm.lib,
          compactWidth: "767",
          position: "bottom",
          color: "brown"
        },
        on: {
          onSideMenuChange: function(m) {
            _vm.isSideMenuDisplay = m
          }
        },
        scopedSlots: _vm._u(
          [
            {
              key: "header",
              fn: function() {
                return [
                  _vm.lib.style.isLeftHanded
                    ? _c("notification-icon", {
                        staticClass: "in-fullmode",
                        attrs: {
                          config: _vm.config,
                          status: _vm.status,
                          lib: _vm.lib,
                          position: "right"
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _c("navigation-header-item", {
                    staticClass: "in-top",
                    attrs: {
                      config: _vm.config,
                      status: _vm.status,
                      lib: _vm.lib
                    },
                    on: { click: _vm.showInstruction }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "fitted item" },
                    [
                      _c("digital-countdown-timer", {
                        ref: "DigitalCountdownTimer",
                        attrs: {
                          config: _vm.config,
                          status: _vm.status,
                          lib: _vm.lib,
                          pauseAtStart: _vm.pauseAtStart
                        },
                        on: {
                          timeup: function($event) {
                            return _vm.$emit("timeup")
                          }
                        }
                      })
                    ],
                    1
                  )
                ]
              },
              proxy: true
            },
            {
              key: "items",
              fn: function() {
                return [
                  _c(
                    "div",
                    { staticClass: "item in-vertical" },
                    [
                      _c("search-input", {
                        attrs: {
                          status: _vm.status,
                          lib: _vm.lib,
                          size: _vm.searchManagerSize
                        },
                        on: { search: _vm.hideSideMenu }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("user-filter", {
                    ref: "UserFilter",
                    attrs: {
                      config: _vm.config,
                      status: _vm.status,
                      lib: _vm.lib
                    },
                    on: { show: _vm.hideSideMenu }
                  }),
                  _vm._v(" "),
                  _c("annotation-type-filter", {
                    ref: "AnnotationTypeFilter",
                    attrs: {
                      config: _vm.config,
                      status: _vm.status,
                      lib: _vm.lib
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "item in-top" },
                    [
                      _c("search-input", {
                        attrs: {
                          status: _vm.status,
                          lib: _vm.lib,
                          size: _vm.searchManagerSize
                        },
                        on: { search: _vm.hideSideMenu }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  !_vm.lib.style.isLeftHanded
                    ? _c("notification-icon", {
                        staticClass: "in-top",
                        attrs: {
                          config: _vm.config,
                          status: _vm.status,
                          lib: _vm.lib,
                          position: "left"
                        }
                      })
                    : _vm._e()
                ]
              },
              proxy: true
            },
            {
              key: "compactItems",
              fn: function() {
                return [
                  _c("notification-icon", {
                    attrs: {
                      config: _vm.config,
                      status: _vm.status,
                      lib: _vm.lib,
                      position: "left"
                    }
                  })
                ]
              },
              proxy: true
            },
            {
              key: "verticalHeaderItem",
              fn: function() {
                return [
                  _c("navigation-header-item", {
                    attrs: {
                      config: _vm.config,
                      status: _vm.status,
                      lib: _vm.lib
                    },
                    on: { click: _vm.showInstruction }
                  })
                ]
              },
              proxy: true
            }
          ],
          null,
          false,
          3728633475
        )
      })
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("f125aafc", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.html?vue&type=template&id=97ee9ca8&scoped=true&":
/*!*****************************************************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.html?vue&type=template&id=97ee9ca8&scoped=true& ***!
  \*****************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NavigationItems_html_vue_type_template_id_97ee9ca8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NavigationItems.html?vue&type=template&id=97ee9ca8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.html?vue&type=template&id=97ee9ca8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NavigationItems_html_vue_type_template_id_97ee9ca8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NavigationItems_html_vue_type_template_id_97ee9ca8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.js?vue&type=script&lang=js&?7688":
/*!*********************************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _methodsTutorialNavigationItems_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methodsTutorialNavigationItems.js */ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/methodsTutorialNavigationItems.js");
//import NotificationIcon from './../../components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue'
//import UserFilter from './../../components/search/UserFilter/UserFilter.vue'
//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'

let NavigationItems = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let pauseAtStart = true
    if (this.lib.auth.currentStepConfig.debug
            && typeof(this.lib.auth.currentStepConfig.debug.countdownPause) === 'boolean') {
      pauseAtStart = this.lib.auth.currentStepConfig.debug.countdownPause
    }

    if (pauseAtStart === true) {
      console.log('@test pauseAtStart')
    }

    return {
      pauseAtStart,
      isSideMenuDisplay: false,
      menu: null,
      sideMenu: null
    }
  },
  components: {
    //'annotation-type-filter': AnnotationTypeFilter,
    //'notification-icon': NotificationIcon,
    //'user-filter': UserFilter
  },
//  
  computed: {
    searchManagerSize () {
      if (this.isSideMenuDisplay === false) {
        return 'mini'
      }
    }
  },
//  watch: {
//    'lib.TutorialManager' () {
//      if (!this.lib.TutorialManager) {
//        return false
//      }
//      this.setupTutorial()
//    }
//  },
//  watch: {
//    '$refs.UserFilter' (UserFilter) {
//      if (UserFilter) {
//        this.lib.UserFilter = this.$refs.UserFilter
//      }
//    },
//    '$refs.AnnotationTypeFilter' (AnnotationTypeFilter) {
//      if (AnnotationTypeFilter) {
//        
//        console.log(this.$refs.AnnotationTypeFilter)
//        this.lib.AnnotationTypeFilter = this.$refs.AnnotationTypeFilter
//      }
//    }
//  },
//  watch: {
//    '$refs.DigitalCountdownTimer' (DigitalCountdownTimer) {
//      if (!DigitalCountdownTimer) {
//        return false
//      }
//      this.setupTutorial()
//    }
//  },
  mounted() {
    //this.initLibComponents()
    
    //setTimeout(() => {
    this.setupTutorial()
    
      
    //}, 500)
  },
  methods: {
    showInstruction () {
      this.$emit('showInstruction')
    },
    hideSideMenu () {
      this.$refs.nav.hideSideMenu()
    }
//    nextStep () {
//      this.lib.auth.nextStep()
//    }
  } // methods
}


Object(_methodsTutorialNavigationItems_js__WEBPACK_IMPORTED_MODULE_0__["default"])(NavigationItems)

/* harmony default export */ __webpack_exports__["default"] = (NavigationItems);

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.js?vue&type=script&lang=js&?dc23":
/*!*********************************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NavigationItems_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./NavigationItems.js?vue&type=script&lang=js& */ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.js?vue&type=script&lang=js&?7688");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_NavigationItems_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_97ee9ca8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-style-loader!../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_97ee9ca8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_97ee9ca8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_97ee9ca8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_97ee9ca8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_97ee9ca8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.vue":
/*!*********************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.vue ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NavigationItems_html_vue_type_template_id_97ee9ca8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavigationItems.html?vue&type=template&id=97ee9ca8&scoped=true& */ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.html?vue&type=template&id=97ee9ca8&scoped=true&");
/* harmony import */ var _NavigationItems_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavigationItems.js?vue&type=script&lang=js& */ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.js?vue&type=script&lang=js&?dc23");
/* empty/unused harmony star reexport *//* harmony import */ var _NavigationItems_less_vue_type_style_index_0_id_97ee9ca8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true& */ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=97ee9ca8&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavigationItems.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CNavigationItems%5CNavigationItems.vue&lang=yaml */ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CNavigationItems%5CNavigationItems.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NavigationItems_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NavigationItems_html_vue_type_template_id_97ee9ca8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NavigationItems_html_vue_type_template_id_97ee9ca8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "97ee9ca8",
  null
  
)

/* custom blocks */

if (typeof _NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CNavigationItems%5CNavigationItems.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CNavigationItems%5CNavigationItems.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NavigationItems.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CNavigationItems%5CNavigationItems.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CNavigationItems%5CNavigationItems.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CNavigationItems_5CNavigationItems_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/methodsTutorialNavigationItems.js":
/*!***********************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/NavigationItems/methodsTutorialNavigationItems.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (NavigationItems) {
  NavigationItems.methods.getMenu = function () {
    if (!this.menu
            && this.$refs.nav) {
      this.menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.nav.$refs.Menu)
    }
    return this.menu
  }
  
  NavigationItems.methods.getSideMenu = function () {
    if (!this.sideMenu
            && this.$refs.nav) {
      this.sideMenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.nav.$refs.SideMenu)
    }
    return this.sideMenu
  }

  NavigationItems.methods.setupTutorial = function () {
    
    this.lib.TutorialManager.addAction({
      element: () => {
        return this.$refs.nav.find('.NotificationIcon:visible:first')
      },
      content: this.$t(`You will get notifications from other readers here.`),
      order: 32
    })
    
    // ---------------------------

    this.lib.TutorialManager.addAction({
      element: async () => {
        let element = this.$refs.nav.find('.UserFilter:visible:first')
        return element
      },
      content: this.$t('You can select a peer and watch what he/she read.'),
      order: 33
    })

    this.lib.TutorialManager.addAction({
      element: () => {
        let element = this.$refs.nav.find('.AnnotationTypeFilter:visible:first')
        return element
      },
      content: this.$t('You can choose a type of annotations to read.'),
      order: 34
    })
    
    // ---------------------------
    
    
    this.lib.TutorialManager.addAction({
      backgroundFadeOut: true,
      element: async () => {
        let icon = {
            top: window.innerHeight - 30,
            left: window.innerWidth - 30,
        }
        await this.lib.TutorialManager.showClick(icon)
        
        await this.lib.VueHelper.sleep(500)
        await this.$refs.nav.showSideMenu()
        
        return this.$refs.nav.find('.UserFilter:visible:first')
      },
      content: this.$t('You can select a peer and watch what he/she read.'),
      order: 35
    })

    this.lib.TutorialManager.addAction({
      element: () => {
        let element = this.$refs.nav.find('.AnnotationTypeFilter:visible:first')
        return element
      },
      content: this.$t('You can choose a type of annotations to read.'),
      order: 36
    })
    
    // --------------------------

    this.lib.TutorialManager.addAction({
      element: async () => {
        if (this.$refs.nav.sideMenuDisplay === true) {
          await this.$refs.nav.hideSideMenu()
        }
        return this.$refs.DigitalCountdownTimer
      },
      content: this.$t('Collaborative Reading will end at count to 0.'),
      order: 39
    })
  }
});

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/methodsTestCollaborativeReading.js":
/*!********************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/methodsTestCollaborativeReading.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (CollaborativeReading) {


// --------------------------------
  CollaborativeReading.methods._testConfirmModal = async function () {
    console.log('_testSearch')
    await this.lib.VueHelper.sleep(1000)

    let r1 = await this.lib.ConfirmModal.show()
    console.log(r1)
    let r2 = await this.lib.ConfirmModal.show()
    console.log(r2)
  }

  CollaborativeReading.methods._testSearch = async function () {
    console.log('_testSearch')
    await this.lib.VueHelper.sleep(1000)

    if (!this.lib.AnnotationPanel) {
      setTimeout(() => {
        this._testSearch()
      }, 100)
      return null
    }

    this.status.search.keyword = "特別的"
    return

    // 先設定篩選條件
    this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)

    // 再來顯示
    this.lib.AnnotationPanel.setAnchorPositions()
  }

  CollaborativeReading.methods._testAnnotationSingle = function () {
    console.log('_testAnnotationSingle')
    setTimeout(() => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.others-MainIdea:first').click()

      setTimeout(() => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget .meta').click()
      }, 300)
    }, 500)
  }

  CollaborativeReading.methods._testAnnotationSingleManyComments = function () {
    console.log('_testAnnotationSingleManyComments')
    setTimeout(() => {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.others-Clarified:first').length === 0) {
        this._testAnnotationSingleManyComments()
        return undefined
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.others-Clarified:first').click()
      setTimeout(() => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget .AnnotationTypeButton[title="已釐清"]:last').click()

        setTimeout(() => {
          //console.log($('.FilteredList .list .AnnotationItem:last .meta i').length)
          jquery__WEBPACK_IMPORTED_MODULE_0___default()('.FilteredList .list .AnnotationItem:last .meta i').click()

          // 測試搜尋
          //this.lib.AnnotationPanel.findKeyword('co')

        }, 1000)
      }, 300)
    }, 500)
  }
  
  CollaborativeReading.methods._testAnnotationSingleFocusComment = function () {
    console.log('_testAnnotationSingleFocusComment')
    setTimeout(() => {
      this.lib.AnnotationPanel.focusComment(19)
    }, 500)
  }
  
  CollaborativeReading.methods._testUserFilter = async function () {
    console.log('_testUserFilter')
    await this.lib.VueHelper.sleep(2000)

    //this.lib.UserFilter.show()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.Navigation .peer-label:first').click()

    /*
     this.status.filter.focusUser = {
     id: 1
     }
     */
  }
  
  CollaborativeReading.methods._testTypeFilter = async function () {
    console.log('_testTypeFilter')
    await this.lib.VueHelper.sleep(1000)

    this.lib.AnnotationTypeFilter.show()

    /*
     this.status.filter.focusUser = {
     id: 1
     }
     */
  }
  
  CollaborativeReading.methods._testNotificationFullList = async function () {
    console.log('_testNotificationModal')
    await this.lib.VueHelper.sleep(1000)

    this.lib.NotificationManager.showFull()
  }
  
  CollaborativeReading.methods._testVerticalMenu = async function () {
    console.log('_testVerticalMenu')
    await this.lib.VueHelper.sleep(1000)

    console.log(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.Navigation .right.menu .ellipsis.icon').length)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.Navigation .right.menu .ellipsis.icon').click()
  }
  
  CollaborativeReading.methods._testErrorAuth = async function () {
    
    await this.lib.VueHelper.sleep(1500)
    
    await this.lib.AxiosHelper.post('/admin/Development/errorAuth')
  }
  
  CollaborativeReading.methods._testTutorial = async function () {
    
    await this.lib.VueHelper.sleep(3000)
    
    this.lib.TutorialManager.start()
  }

});

/***/ })

}]);
//# sourceMappingURL=FreeReading.js.map