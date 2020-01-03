(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-components/Exit"],{

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Exit/Exit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CExit%5CExit.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/Exit/Exit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CExit%5CExit.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"For {0}: Congratulation! You finished reading.":"For {0}: Congratulation! You finished reading."},"zh-TW":{"Thank you for your reading":"感謝您的閱讀","Congratulation! You finished reading.":"恭喜您讀完了！","CLOSE WINDOW":"關閉視窗","For {0}: Congratulation! You finished reading.":"{0}：恭喜您讀完了！"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "img[data-v-6bbe48c7] {\n  width: 100px;\n}\n.firework-overlay[data-v-6bbe48c7] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 999;\n  background-color: #000000;\n}\n.firework-overlay .firework-container[data-v-6bbe48c7] {\n  width: 100vw;\n  height: calc(100vh - 17em);\n  margin-top: 17em;\n  text-align: center;\n}\n.firework-overlay .firework-container[data-v-6bbe48c7]  #fireworksField {\n  top: auto !important;\n  bottom: 0;\n  width: 80vw !important;\n  height: auto !important;\n  position: static !important;\n}\n", "",{"version":3,"sources":["Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,YAAY;AACd;AACA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,yBAAyB;AAC3B;AACA;EACE,YAAY;EACZ,0BAA0B;EAC1B,gBAAgB;EAChB,kBAAkB;AACpB;AACA;EACE,oBAAoB;EACpB,SAAS;EACT,sBAAsB;EACtB,uBAAuB;EACvB,2BAA2B;AAC7B","file":"Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true&","sourcesContent":["img[data-v-6bbe48c7] {\n  width: 100px;\n}\n.firework-overlay[data-v-6bbe48c7] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 999;\n  background-color: #000000;\n}\n.firework-overlay .firework-container[data-v-6bbe48c7] {\n  width: 100vw;\n  height: calc(100vh - 17em);\n  margin-top: 17em;\n  text-align: center;\n}\n.firework-overlay .firework-container[data-v-6bbe48c7]  #fireworksField {\n  top: auto !important;\n  bottom: 0;\n  width: 80vw !important;\n  height: auto !important;\n  position: static !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Exit/Exit.html?vue&type=template&id=6bbe48c7&scoped=true&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Exit/Exit.html?vue&type=template&id=6bbe48c7&scoped=true& ***!
  \******************************************************************************************************************************************************************/
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
    { staticClass: "Exit" },
    [
      _c("modal", {
        ref: "ExitModal",
        staticClass: "ExitModal",
        attrs: {
          config: _vm.config,
          status: _vm.status,
          progress: _vm.progress,
          lib: _vm.lib,
          dimmer: "transparent",
          cancelable: "false"
        },
        scopedSlots: _vm._u([
          {
            key: "header",
            fn: function() {
              return [
                _vm._v(
                  "\r\n      " +
                    _vm._s(_vm.$t("Thank you for your reading")) +
                    "\r\n    "
                )
              ]
            },
            proxy: true
          },
          {
            key: "content",
            fn: function() {
              return [
                _c("div", { staticClass: "ui middle aligned grid" }, [
                  _c("div", { staticClass: "four wide column" }, [
                    _c("img", {
                      staticClass: "ui image",
                      attrs: { src: _vm.status.avatar }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "twelve wide column" }, [
                    _c("h1", { staticClass: "ui header" }, [
                      _vm._v(
                        "\r\n            " +
                          _vm._s(
                            _vm.$t(
                              "For {0}: Congratulation! You finished reading.",
                              [_vm.username]
                            )
                          ) +
                          "\r\n          "
                      )
                    ])
                  ])
                ])
              ]
            },
            proxy: true
          },
          {
            key: "actions",
            fn: function() {
              return [
                _c(
                  "div",
                  { staticClass: "ui button", on: { click: _vm.logout } },
                  [_vm._v(_vm._s(_vm.$t("LOGOUT")))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "ui button", on: { click: _vm.exit } },
                  [_vm._v(_vm._s(_vm.$t("CLOSE WINDOW")))]
                )
              ]
            },
            proxy: true
          }
        ])
      }),
      _vm._v(" "),
      _c("div", { staticClass: "firework-overlay" }, [
        _c("div", { ref: "FireworkOverlay", staticClass: "firework-container" })
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("09b7b37b", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/client/Exit/Exit.html?vue&type=template&id=6bbe48c7&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./webpack-app/client/Exit/Exit.html?vue&type=template&id=6bbe48c7&scoped=true& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Exit_html_vue_type_template_id_6bbe48c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Exit.html?vue&type=template&id=6bbe48c7&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Exit/Exit.html?vue&type=template&id=6bbe48c7&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Exit_html_vue_type_template_id_6bbe48c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Exit_html_vue_type_template_id_6bbe48c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Exit/Exit.js?vue&type=script&lang=js&?8134":
/*!******************************************************************!*\
  !*** ./webpack-app/client/Exit/Exit.js?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Exit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Exit.js?vue&type=script&lang=js& */ "./webpack-app/client/Exit/Exit.js?vue&type=script&lang=js&?bfcf");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Exit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Exit/Exit.js?vue&type=script&lang=js&?bfcf":
/*!******************************************************************!*\
  !*** ./webpack-app/client/Exit/Exit.js?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jquery_fireworks_jquery_fireworks_mute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jquery.fireworks/jquery.fireworks.mute.js */ "./webpack-app/client/Exit/jquery.fireworks/jquery.fireworks.mute.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);



let Exit = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    username () {
      return this.lib.auth.username
    }
  },
//  watch: {
//  },
  mounted() {
    this.$refs.ExitModal.show()
    this.startFirework()
  },
  methods: {
    logout: async function () {
      
      this.$refs.ExitModal.hide()
      this.lib.auth.logout()
    },
    exit: async function () {
      await this.lib.AxiosHelper.get('/client/auth/logout')
      window.close()
    },
    startFirework: async function () {
      //await this.lib.VueHelper.sleep(1000)
      //console.log('startFirework')
      //$('.non-invasive-web-style-framework .ui.dimmer .niwsf-overlay:first').fireworks({ 
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.$refs.FireworkOverlay).fireworks({ 
        //sound: true, 
        opacity: 0.9, 
        //width: '100%', 
        //height: '300px'
      });
    } 
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Exit);

/***/ }),

/***/ "./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Exit_less_vue_type_style_index_0_id_6bbe48c7_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Exit_less_vue_type_style_index_0_id_6bbe48c7_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Exit_less_vue_type_style_index_0_id_6bbe48c7_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Exit_less_vue_type_style_index_0_id_6bbe48c7_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Exit_less_vue_type_style_index_0_id_6bbe48c7_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Exit_less_vue_type_style_index_0_id_6bbe48c7_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/Exit/Exit.vue":
/*!******************************************!*\
  !*** ./webpack-app/client/Exit/Exit.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Exit_html_vue_type_template_id_6bbe48c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Exit.html?vue&type=template&id=6bbe48c7&scoped=true& */ "./webpack-app/client/Exit/Exit.html?vue&type=template&id=6bbe48c7&scoped=true&");
/* harmony import */ var _Exit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Exit.js?vue&type=script&lang=js& */ "./webpack-app/client/Exit/Exit.js?vue&type=script&lang=js&?8134");
/* empty/unused harmony star reexport *//* harmony import */ var _Exit_less_vue_type_style_index_0_id_6bbe48c7_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true& */ "./webpack-app/client/Exit/Exit.less?vue&type=style&index=0&id=6bbe48c7&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Exit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CExit%5CExit.vue&lang=yaml */ "./webpack-app/client/Exit/Exit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CExit%5CExit.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Exit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Exit_html_vue_type_template_id_6bbe48c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Exit_html_vue_type_template_id_6bbe48c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6bbe48c7",
  null
  
)

/* custom blocks */

if (typeof _Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Exit/Exit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/Exit/Exit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CExit%5CExit.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/Exit/Exit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CExit%5CExit.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./Exit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CExit%5CExit.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Exit/Exit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CExit%5CExit.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Exit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CExit_5CExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/Exit/jquery.fireworks/jquery.fireworks.mute.js":
/*!***************************************************************************!*\
  !*** ./webpack-app/client/Exit/jquery.fireworks/jquery.fireworks.mute.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


(function ($) {
	$.fn.fireworks = function(options) {
    // set the defaults
		options = options || {};

    //options.sound = options.sound || false;
    options.sound = false
		options.opacity = options.opacity || 1;
		options.width = options.width || $(this).width();
		options.height = options.height || $(this).height();

    var fireworksField = this,
        particles = [],
        rockets = [],
        MAX_PARTICLES = 400,
        SCREEN_WIDTH = options.width,
        SCREEN_HEIGHT = options.height;

    // cache the sounds if the plugin has been configured to use soudns
    var sounds = [], audio;
    if (options.sound) {

      audio = document.createElement('audio');
    }

    // create canvas and get the context
    var canvas = document.createElement('canvas');
    canvas.id = 'fireworksField';
		canvas.width = SCREEN_WIDTH;
		canvas.height = SCREEN_HEIGHT;
		canvas.style.width  = SCREEN_WIDTH + 'px';
		canvas.style.height = SCREEN_HEIGHT + 'px';
		canvas.style.position = 'absolute';
		canvas.style.top = '0px';
		canvas.style.left = '0px';
    canvas.style.opacity = options.opacity;
    var context = canvas.getContext('2d');

    // The Particles Object
    function Particle(pos) {
        this.pos = {
            x: pos ? pos.x : 0,
            y: pos ? pos.y : 0
        };
        this.vel = {
            x: 0,
            y: 0
        };
        this.shrink = 0.97;
        this.size = 2;

        this.resistance = 1;
        this.gravity = 0;

        this.flick = false;

        this.alpha = 1;
        this.fade = 0;
        this.color = 0;
    }

    Particle.prototype.update = function() {
        // apply resistance
        this.vel.x *= this.resistance;
        this.vel.y *= this.resistance;

        // gravity down
        this.vel.y += this.gravity;

        // update position based on speed
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        // shrink
        this.size *= this.shrink;

        // fade out
        this.alpha -= this.fade;
    };

    Particle.prototype.render = function(c) {
        if (!this.exists()) {
            return;
        }

        c.save();

        c.globalCompositeOperation = 'lighter';

        var x = this.pos.x,
            y = this.pos.y,
            r = this.size / 2;

        var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
        gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
        gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
        gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

        c.fillStyle = gradient;

        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();

        c.restore();
    };

    Particle.prototype.exists = function() {
        return this.alpha >= 0.1 && this.size >= 1;
    };

    // The Rocket Object
    function Rocket(x) {
        Particle.apply(this, [{
            x: x,
            y: SCREEN_HEIGHT}]);

        this.explosionColor = 0;
    }

    Rocket.prototype = new Particle();
    Rocket.prototype.constructor = Rocket;

    Rocket.prototype.explode = function() {
        if (options.sound) {
          var randomNumber = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }(0, 2);
          audio.src = sounds[randomNumber].prefix + sounds[randomNumber].data;
          audio.play();
        }

        var count = Math.random() * 10 + 80;

        for (var i = 0; i < count; i++) {
            var particle = new Particle(this.pos);
            var angle = Math.random() * Math.PI * 2;

            // emulate 3D effect by using cosine and put more particles in the middle
            var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

            particle.vel.x = Math.cos(angle) * speed;
            particle.vel.y = Math.sin(angle) * speed;

            particle.size = 10;

            particle.gravity = 0.2;
            particle.resistance = 0.92;
            particle.shrink = Math.random() * 0.05 + 0.93;

            particle.flick = true;
            particle.color = this.explosionColor;

            particles.push(particle);
        }
    };

    Rocket.prototype.render = function(c) {
        if (!this.exists()) {
            return;
        }

        c.save();

        c.globalCompositeOperation = 'lighter';

        var x = this.pos.x,
            y = this.pos.y,
            r = this.size / 2;

        var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
        gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
        gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");

        c.fillStyle = gradient;

        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();

        c.restore();
    };

    var loop = function() {
        // update screen size
        if (SCREEN_WIDTH != window.innerWidth) {
            canvas.width = SCREEN_WIDTH = window.innerWidth;
        }
        if (SCREEN_HEIGHT != window.innerHeight) {
            canvas.height = SCREEN_HEIGHT = window.innerHeight;
        }

        // clear canvas
        context.fillStyle = "rgba(0, 0, 0, 0.05)";
        context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        var existingRockets = [];

        for (var i = 0; i < rockets.length; i++) {
            // update and render
            rockets[i].update();
            rockets[i].render(context);

            // calculate distance with Pythagoras
            var distance = Math.sqrt(Math.pow(SCREEN_WIDTH - rockets[i].pos.x, 2) + Math.pow(SCREEN_HEIGHT - rockets[i].pos.y, 2));

            // random chance of 1% if rockets is above the middle
            var randomChance = rockets[i].pos.y < (SCREEN_HEIGHT * 2 / 3) ? (Math.random() * 100 <= 1) : false;

            /* Explosion rules
                 - 80% of screen
                - going down
                - close to the mouse
                - 1% chance of random explosion
            */
            if (rockets[i].pos.y < SCREEN_HEIGHT / 5 || rockets[i].vel.y >= 0 || distance < 50 || randomChance) {
                rockets[i].explode();
            } else {
                existingRockets.push(rockets[i]);
            }
        }

        rockets = existingRockets;

        var existingParticles = [];

        for (i = 0; i < particles.length; i++) {
            particles[i].update();

            // render and save particles that can be rendered
            if (particles[i].exists()) {
                particles[i].render(context);
                existingParticles.push(particles[i]);
            }
        }

        // update array with existing particles - old particles should be garbage collected
        particles = existingParticles;

        while (particles.length > MAX_PARTICLES) {
            particles.shift();
        }
    };

    var launchFrom = function(x) {
        if (rockets.length < 10) {
            var rocket = new Rocket(x);
            rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
            rocket.vel.y = Math.random() * -3 - 4;
            rocket.vel.x = Math.random() * 6 - 3;
            rocket.size = 8;
            rocket.shrink = 0.999;
            rocket.gravity = 0.01;
            rockets.push(rocket);
        }
    };

    var launch = function() {
        launchFrom(SCREEN_WIDTH / 2);
    };

    // Append the canvas and start the loops
    $(fireworksField).append(canvas);
    setInterval(launch, 800);
    setInterval(loop, 1000 / 50);

    return fireworksField;
  };
}(jquery__WEBPACK_IMPORTED_MODULE_0___default.a));


/***/ })

}]);
//# sourceMappingURL=Exit.js.map