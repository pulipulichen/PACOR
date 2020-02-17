(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-components/CollaborativeReading"],{

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CCollaborativeReading.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CCollaborativeReading.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.html?vue&type=template&id=b99d6bf8&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.html?vue&type=template&id=b99d6bf8&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************/
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
    { staticClass: "CollaborativeReading" },
    [
      _c("instruction-message", {
        ref: "InstructionMessage",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("rangy", {
        ref: "RangyManager",
        attrs: { status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("annotation-panel", {
        ref: "AnnotationPanel",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("navigation-items", {
        ref: "nav",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib },
        on: { showInstruction: _vm.showInstruction, timeup: _vm.timeup }
      }),
      _vm._v(" "),
      _c("annotation-manager", {
        ref: "AnnotationManager",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("section-manager", {
        ref: "SectionManager",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("search-manager", {
        ref: "SearchManager",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("activity-timer", { attrs: { config: _vm.config, lib: _vm.lib } }),
      _vm._v(" "),
      _c("notification-manager", {
        ref: "NotificationManager",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("d0c54ba2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.html?vue&type=template&id=b99d6bf8&scoped=true&":
/*!******************************************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.html?vue&type=template&id=b99d6bf8&scoped=true& ***!
  \******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CollaborativeReading_html_vue_type_template_id_b99d6bf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./CollaborativeReading.html?vue&type=template&id=b99d6bf8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.html?vue&type=template&id=b99d6bf8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CollaborativeReading_html_vue_type_template_id_b99d6bf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CollaborativeReading_html_vue_type_template_id_b99d6bf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.js?vue&type=script&lang=js&?b29d":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NavigationItems_NavigationItems_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavigationItems/NavigationItems.vue */ "./webpack-app/client/Reading/CollaborativeReading/NavigationItems/NavigationItems.vue");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _methodsTestCollaborativeReading_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methodsTestCollaborativeReading.js */ "./webpack-app/client/Reading/CollaborativeReading/methodsTestCollaborativeReading.js");

//import NotificationManager from './../components/NotificationManager/NotificationManager.vue'


let CollaborativeReading = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
  components: {
    'navigation-items': _NavigationItems_NavigationItems_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    //'notification-manager': NotificationManager
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted: async function () {
    this.initComponentToLib()
    
    // ----------------------
    // 以下是測試
    
    //this._testUserFilter()
    //await this._testShowVerticalMenu()
    //this._testSearch()
    //this._testErrorAuth()
    //this._testTutorial()
    //this._testTutorialShowClick()
    //this._testInstruction()
    //this._testNotificationFullList()
  },
  destroyed () {
    //console.log('退場了')
    this.lib.RangyManager = null
    this.lib.AnnotationPanel = null
    this.lib.SectionManager = null
    this.lib.UserFilter = null
    this.lib.AnnotationTypeFilter = null
    this.lib.NotificationManager = null
  },
  methods: {
    initComponentToLib: async function () {
      if (!this.$refs.RangyManager) {
        setTimeout(() => {
          this.initComponentToLib()
        }, 100)
        return false
      }
      
      while (!this.$refs.RangyManager) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.RangyManager = this.$refs.RangyManager
      
      while (!this.$refs.AnnotationPanel) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.AnnotationPanel = this.$refs.AnnotationPanel
      
      while (!this.$refs.SectionManager) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.SectionManager = this.$refs.SectionManager
      
      while (!this.$refs.NotificationManager) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.NotificationManager = this.$refs.NotificationManager
      
      //console.log(this.lib.NotificationManager)
      
      //console.log(this.lib.AnnotationPanel)
      await this.initNavComponentToLib()
      
      this.status.progress.initComponents = true
    },
    initNavComponentToLib: async function () {
      
      while (!this.$refs.nav.$refs.UserFilter) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.UserFilter = this.$refs.nav.$refs.UserFilter
      
      while (!this.$refs.nav.$refs.AnnotationTypeFilter) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.AnnotationTypeFilter = this.$refs.nav.$refs.AnnotationTypeFilter
    },
    showInstruction() {
      this.$refs.InstructionMessage.show()
    },
    timeup () {
      //throw new Error('Wait')
      this.lib.auth.nextStep()
    },
    
   } // methods
}


Object(_methodsTestCollaborativeReading_js__WEBPACK_IMPORTED_MODULE_2__["default"])(CollaborativeReading)

/* harmony default export */ __webpack_exports__["default"] = (CollaborativeReading);

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.js?vue&type=script&lang=js&?ec19":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CollaborativeReading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./CollaborativeReading.js?vue&type=script&lang=js& */ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.js?vue&type=script&lang=js&?b29d");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_CollaborativeReading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CollaborativeReading_less_vue_type_style_index_0_id_b99d6bf8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CollaborativeReading_less_vue_type_style_index_0_id_b99d6bf8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CollaborativeReading_less_vue_type_style_index_0_id_b99d6bf8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CollaborativeReading_less_vue_type_style_index_0_id_b99d6bf8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CollaborativeReading_less_vue_type_style_index_0_id_b99d6bf8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CollaborativeReading_less_vue_type_style_index_0_id_b99d6bf8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.vue":
/*!**********************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.vue ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CollaborativeReading_html_vue_type_template_id_b99d6bf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollaborativeReading.html?vue&type=template&id=b99d6bf8&scoped=true& */ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.html?vue&type=template&id=b99d6bf8&scoped=true&");
/* harmony import */ var _CollaborativeReading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CollaborativeReading.js?vue&type=script&lang=js& */ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.js?vue&type=script&lang=js&?ec19");
/* empty/unused harmony star reexport *//* harmony import */ var _CollaborativeReading_less_vue_type_style_index_0_id_b99d6bf8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true& */ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.less?vue&type=style&index=0&id=b99d6bf8&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CollaborativeReading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CCollaborativeReading.vue&lang=yaml */ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CCollaborativeReading.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CollaborativeReading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CollaborativeReading_html_vue_type_template_id_b99d6bf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CollaborativeReading_html_vue_type_template_id_b99d6bf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b99d6bf8",
  null
  
)

/* custom blocks */

if (typeof _CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CCollaborativeReading.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CCollaborativeReading.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./CollaborativeReading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CCollaborativeReading.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReading%5CCollaborativeReading%5CCollaborativeReading.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_CollaborativeReading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReading_5CCollaborativeReading_5CCollaborativeReading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=CollaborativeReading.js.map