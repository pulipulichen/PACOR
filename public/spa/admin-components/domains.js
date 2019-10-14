(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-components/domains"],{

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/Domains/Domains.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CDomains%5CDomains.vue":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/components/Domains/Domains.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CDomains%5CDomains.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Domains/Domains.html?vue&type=template&id=6b20d61c&scoped=true&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/components/Domains/Domains.html?vue&type=template&id=6b20d61c&scoped=true& ***!
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
  return _c("div", { staticClass: "ui segment" }, [
    _c("h2", [_vm._v(_vm._s(_vm.$t("Domain Management")))]),
    _vm._v(" "),
    _c("div", { staticClass: "ui segment" }, [
      _c("div", { staticClass: "unstackable three fields" }, [
        _c("div", { staticClass: "field" }, [
          _c("label", { attrs: { for: "createDomain" } }, [
            _vm._v("\r\n          " + _vm._s(_vm.$t("Domain")) + "\r\n        ")
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.create.domain,
                expression: "create.domain"
              }
            ],
            attrs: {
              type: "url",
              id: "createDomain",
              size: "256",
              name: "createDomain"
            },
            domProps: { value: _vm.create.domain },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.create, "domain", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", { attrs: { for: "createTitle" } }, [
            _vm._v("\r\n          " + _vm._s(_vm.$t("Title")) + "\r\n        ")
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.create.title,
                expression: "create.title"
              }
            ],
            attrs: {
              type: "text",
              id: "createTitle",
              size: "256",
              name: "createTitle"
            },
            domProps: { value: _vm.create.title },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.create, "title", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "field" }, [
          _c("label", [_vm._v("\r\n           \r\n        ")]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "ui fluid button",
              class: { disabled: !_vm.enableUpload },
              attrs: { type: "button" },
              on: { click: _vm.upload }
            },
            [
              _vm._v(
                "\r\n          " + _vm._s(_vm.$t("Submit")) + "\r\n        "
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "unstackable two fields" }, [
          _c("div", { staticClass: "field" }, [
            _c("label", { attrs: { for: "createAdmins" } }, [
              _vm._v(
                "\r\n            " +
                  _vm._s(_vm.$t("Admins")) +
                  "\r\n            (" +
                  _vm._s(_vm.$t("Split admins by space")) +
                  ")\r\n          "
              )
            ]),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.create.admins,
                  expression: "create.admins"
                }
              ],
              staticClass: "ui red",
              attrs: { id: "createAdmins", name: "createAdmins" },
              domProps: { value: _vm.create.admins },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.create, "admins", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { attrs: { for: "createConfig" } }, [
              _vm._v(
                "\r\n            " +
                  _vm._s(_vm.$t("Config")) +
                  "\r\n            (" +
                  _vm._s(_vm.$t("JSON Format")) +
                  "\r\n            "
              ),
              _c(
                "a",
                {
                  attrs: { href: "./help/ConfigExample.md", target: "_blank" }
                },
                [_vm._v(_vm._s(_vm.$t("Example")))]
              ),
              _vm._v(")\r\n          ")
            ]),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.create.config,
                  expression: "create.config"
                }
              ],
              staticClass: "ui red",
              attrs: { id: "createConfig", name: "createConfig" },
              domProps: { value: _vm.create.config },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.create, "config", $event.target.value)
                }
              }
            })
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("7b455fa9", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/admin/components/Domains/Domains.html?vue&type=template&id=6b20d61c&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Domains/Domains.html?vue&type=template&id=6b20d61c&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Domains_html_vue_type_template_id_6b20d61c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Domains.html?vue&type=template&id=6b20d61c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Domains/Domains.html?vue&type=template&id=6b20d61c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Domains_html_vue_type_template_id_6b20d61c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Domains_html_vue_type_template_id_6b20d61c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/components/Domains/Domains.js?vue&type=script&lang=js&?00a7":
/*!**********************************************************************************!*\
  !*** ./webpack-app/admin/components/Domains/Domains.js?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Domains = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      create: {
        domain: '',
        title: '',
        admins: '',
        config: ''
      },
      pageConfig: {
        page: 1,
        maxPage: 0
      }
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Domains);

/***/ }),

/***/ "./webpack-app/admin/components/Domains/Domains.js?vue&type=script&lang=js&?704f":
/*!**********************************************************************************!*\
  !*** ./webpack-app/admin/components/Domains/Domains.js?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Domains_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Domains.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Domains/Domains.js?vue&type=script&lang=js&?00a7");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Domains_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/components/Domains/Domains.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CDomains%5CDomains.vue":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Domains/Domains.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CDomains%5CDomains.vue ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Domains.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CDomains%5CDomains.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/Domains/Domains.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CDomains%5CDomains.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Domains_less_vue_type_style_index_0_id_6b20d61c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Domains_less_vue_type_style_index_0_id_6b20d61c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Domains_less_vue_type_style_index_0_id_6b20d61c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Domains_less_vue_type_style_index_0_id_6b20d61c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Domains_less_vue_type_style_index_0_id_6b20d61c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Domains_less_vue_type_style_index_0_id_6b20d61c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/Domains/Domains.vue":
/*!**********************************************************!*\
  !*** ./webpack-app/admin/components/Domains/Domains.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Domains_html_vue_type_template_id_6b20d61c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Domains.html?vue&type=template&id=6b20d61c&scoped=true& */ "./webpack-app/admin/components/Domains/Domains.html?vue&type=template&id=6b20d61c&scoped=true&");
/* harmony import */ var _Domains_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Domains.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Domains/Domains.js?vue&type=script&lang=js&?704f");
/* empty/unused harmony star reexport *//* harmony import */ var _Domains_less_vue_type_style_index_0_id_6b20d61c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true& */ "./webpack-app/admin/components/Domains/Domains.less?vue&type=style&index=0&id=6b20d61c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Domains.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CDomains%5CDomains.vue */ "./webpack-app/admin/components/Domains/Domains.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CDomains%5CDomains.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Domains_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Domains_html_vue_type_template_id_6b20d61c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Domains_html_vue_type_template_id_6b20d61c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6b20d61c",
  null
  
)

/* custom blocks */

if (typeof _Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Domains_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CDomains_5CDomains_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/components/Domains/Domains.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=domains.js.map