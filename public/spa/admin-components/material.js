(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-components/material"],{

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/Material/Material.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CMaterial%5CMaterial.vue":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/Material/Material.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CMaterial%5CMaterial.vue ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"Are you sure to remove {0}?":"Are you sure to remove {0}?"},"zh-TW":{"Are you sure to remove {0}?":"您確定要刪除{0}嗎？"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".hide[data-v-0443793a] {\n  display: none;\n}\n", "",{"version":3,"sources":["Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,aAAa;AACf","file":"Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true&","sourcesContent":[".hide[data-v-0443793a] {\n  display: none;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/Material/Material.html?vue&type=template&id=0443793a&scoped=true&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/Material/Material.html?vue&type=template&id=0443793a&scoped=true& ***!
  \*************************************************************************************************************************************************************************/
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
    { staticClass: "ui segment form" },
    [
      _c("h2", [_vm._v(_vm._s(_vm.$t("Material Management")))]),
      _vm._v(" "),
      _c("div", { staticClass: "ui segment" }, [
        _c("div", { staticClass: "unstackable three fields" }, [
          _c("div", { staticClass: "field" }, [
            _c("label", { attrs: { for: "MaterialName" } }, [
              _vm._v(
                "\r\n          " +
                  _vm._s(_vm.$t("Material Name")) +
                  "\r\n        "
              )
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.filename,
                  expression: "filename"
                }
              ],
              attrs: {
                type: "text",
                id: "MaterialName",
                size: "20",
                name: "MaterialName"
              },
              domProps: { value: _vm.filename },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.filename = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "field" }, [
            _c("label", { attrs: { for: "MaterialAsset" } }, [
              _vm._v(
                "\r\n          " + _vm._s(_vm.$t("File")) + "\r\n          "
              ),
              _c("a", { attrs: { href: "/materials/example-material.zip" } }, [
                _vm._v(
                  "\r\n            (" +
                    _vm._s(_vm.$t("example")) +
                    ")\r\n          "
                )
              ])
            ]),
            _vm._v(" "),
            _c("input", {
              ref: "FileInput",
              attrs: {
                type: "file",
                id: "MaterialAsset",
                name: "MaterialAsset",
                accept: "application/zip"
              },
              on: { change: _vm.checkEnableUpload }
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
                  "\r\n          " + _vm._s(_vm.$t("UPLOAD")) + "\r\n        "
                )
              ]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("input", {
        ref: "EditUploadInput",
        staticClass: "hide",
        attrs: { type: "file", accept: "application/zip" },
        on: { change: _vm.editUpload }
      }),
      _vm._v(" "),
      _c("pagination", { attrs: { pageConfig: _vm.pageConfig } }),
      _vm._v(" "),
      _c("table", { staticClass: "ui unstackable table" }, [
        _c("thead", [
          _c("tr", [
            _vm.status.role === "global_admin"
              ? _c("th", [
                  _vm._v(
                    "\r\n          " + _vm._s(_vm.$t("Domain")) + "\r\n        "
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("th", [
              _vm._v(
                "\r\n          " + _vm._s(_vm.$t("Filename")) + "\r\n        "
              )
            ]),
            _vm._v(" "),
            _c("th", [
              _vm._v("\r\n          " + _vm._s(_vm.$t("Date")) + "\r\n        ")
            ]),
            _vm._v(" "),
            _c("th", [
              _vm._v(
                "\r\n          " + _vm._s(_vm.$t("Management")) + "\r\n        "
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "tbody",
          _vm._l(_vm.assets, function(asset, index) {
            return _c("tr", [
              _vm.status.role === "global_admin"
                ? _c("td", [
                    _vm._v(
                      "\r\n          " +
                        _vm._s(asset.domain_id) +
                        "\r\n        "
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("td", [
                _c("div", { staticClass: "ui action input" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: asset.filename,
                        expression: "asset.filename"
                      }
                    ],
                    attrs: { type: "text" },
                    domProps: { value: asset.filename },
                    on: {
                      input: [
                        function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(asset, "filename", $event.target.value)
                        },
                        function($event) {
                          return _vm.change(asset.id)
                        }
                      ]
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "ui icon button",
                      class: {
                        disabled: !_vm.isAssetChanged(asset.id),
                        green: _vm.isAssetChanged(asset.id)
                      },
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.edit(index)
                        }
                      }
                    },
                    [_c("i", { staticClass: "edit icon" })]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("td", [
                _vm._v("\r\n          " + _vm._s(asset.date) + "\r\n        ")
              ]),
              _vm._v(" "),
              _c("td", [
                _c("div", { staticClass: "unstackable three fields" }, [
                  _c("div", { staticClass: "field" }, [
                    _c(
                      "a",
                      {
                        staticClass: "ui icon button",
                        attrs: {
                          target: "_blank",
                          href: "/material/asset/" + asset.id + "/"
                        }
                      },
                      [_c("i", { staticClass: "linkify icon" })]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c(
                      "button",
                      {
                        staticClass: "ui icon button",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.editUploadTrigger(asset.id)
                          }
                        }
                      },
                      [_c("i", { staticClass: "upload icon" })]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c(
                      "button",
                      {
                        staticClass: "ui icon button",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            return _vm.remove(index)
                          }
                        }
                      },
                      [_c("i", { staticClass: "close icon" })]
                    )
                  ])
                ])
              ])
            ])
          }),
          0
        )
      ]),
      _vm._v(" "),
      _c("pagination", {
        attrs: { pageConfig: _vm.pageConfig, pathPrefix: "/materials/" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("67278864", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/admin/Material/Material.html?vue&type=template&id=0443793a&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./webpack-app/admin/Material/Material.html?vue&type=template&id=0443793a&scoped=true& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Material_html_vue_type_template_id_0443793a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Material.html?vue&type=template&id=0443793a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/Material/Material.html?vue&type=template&id=0443793a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Material_html_vue_type_template_id_0443793a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Material_html_vue_type_template_id_0443793a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/Material/Material.js?vue&type=script&lang=js&?4642":
/*!*************************************************************************!*\
  !*** ./webpack-app/admin/Material/Material.js?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Material = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      filename: '',
      file: null,
      assets: [],
      changedIDs: [],
      editUploadAssetID: null,
      pageConfig: {
        page: 0,
        maxPage: 0
      },
    }
  },
  computed: {
    enableUpload: function () {
      return (this.filename !== '' 
              && this.file !== null)
    },
  },
  watch: {
    'pageConfig.page': function () {
      if (isNaN(this.pageConfig.page) === false) {
        let currentPage = this.$route.params.page
        if (isNaN(currentPage) === true
                || parseInt(currentPage, 10) !== this.pageConfig.page) {
          this.$router.push('/material/' + this.pageConfig.page)
          localStorage.setItem('Material.page', this.pageConfig.page)
          this.list()
        }
      }
    }
  },
  mounted() {
    this.initPage()
    
    this.status.title = this.$t('Material Assets Management')
    this.list()
  },
  methods: {
    initPage: function () {
      if (isNaN(this.$route.params.page) === true) {
        let lastPage = localStorage.getItem('Material.page')
        if (isNaN(lastPage) === false && lastPage !== null) {
          this.pageConfig.page = lastPage
        }
        else {
          this.pageConfig.page = 1
        }
        //this.$router.push(`/materials/${this.pageConfig.page}`)
        //localStorage.setItem('Materials.page', this.page)
      }
      else {
        this.pageConfig.page = parseInt(this.$route.params.page, 10)
      }
    },
    
    list: async function () {
      let result = await this.lib.AxiosHelper.get('/Admin/MaterialAsset/list', {
        page: this.pageConfig.page
      })
      if (typeof(result) === 'object') {
        if (Array.isArray(result.assets)) {
          if (result.assets.length === 0) {
            if (this.pageConfig.page !== 1) {
              this.pageConfig.page = 1
            }
            return false
          }
          this.assets = result.assets
        }
        if (typeof(result.maxPage) === 'number') {
          this.pageConfig.maxPage = result.maxPage
        }
      }
    },
    checkEnableUpload: function () {
      this.file = this.$refs.FileInput.files[0]
    },
    reset: function () {
      this.filename = ''
      this.file = null
      this.$refs.FileInput.value = ''
    },
    upload: async function () {
      let result = await this.lib.AxiosHelper.upload('/Admin/MaterialAsset/upload', {
        asset: this.file,
        filename: this.filename
      })
      //console.log(result)
      this.assets.unshift({
        id: result.assetID,
        domain_id: result.domainID,
        date: result.date,
        filename: this.filename
      })
      this._sortAssets()
      this.reset()
    },
    _sortAssets: function () {
      this.assets = this.assets.sort(function (a, b) {
        return a.filename > b.filename ? 1 : -1
      })
    },
    change: function (assetID) {
      for (let i = 0; i < this.assets.length; i++) {
        let asset = this.assets[i]
        if (asset.id === assetID && asset.filename === '') {
          return false
        }
      }
      
      if (this.changedIDs.indexOf(assetID) === -1) {
        this.changedIDs.push(assetID)
      }
    },
    isAssetChanged: function (assetID) {
      for (let i = 0; i < this.assets.length; i++) {
        let asset = this.assets[i]
        if (asset.id === assetID && asset.filename === '') {
          return false
        }
      }
      
      return (this.changedIDs.indexOf(assetID) > -1)
    },
    edit: async function (assetIndex) {
      let asset = this.assets[assetIndex]
      
      if (asset.filename === '') {
        return false
      }
      
      let result = await this.lib.AxiosHelper.upload('/Admin/MaterialAsset/edit', {
        assetID: asset.id,
        filename: asset.filename
      })
      
      if (result === 0 || result === null) {
        return false
      }
      
      this.changedIDs = this.changedIDs.filter((id) => {
        return id !== asset.id
      })
      this._sortAssets()
    },
    remove: async function (assetIndex) {
      let asset = this.assets[assetIndex]
      
      if (asset.filename === '') {
        return false
      }
      
      let confirmMessage = this.$t('Are you sure to remove {0}?', [asset.filename])
      if (window.confirm(confirmMessage) === false) {
        return false
      }
      
      let result = await this.lib.AxiosHelper.upload('/Admin/MaterialAsset/remove', {
        assetID: asset.id
      })
      
      if (result === 0 || result === null) {
        return false
      }
      
      this.changedIDs = this.changedIDs.filter((id) => {
        return id !== asset.id
      })
      this.assets.splice(assetIndex, 1)
    },
    editUploadTrigger: function (assetID) {
      this.editUploadAssetID = assetID
      this.$refs.EditUploadInput.click()
    },
    editUpload: async function () {
      let result = await this.lib.AxiosHelper.upload('/Admin/MaterialAsset/editUpload', {
        assetID: this.editUploadAssetID,
        asset: this.$refs.EditUploadInput.files[0]
      })
      
      if (result === 1) {
        window.alert(this.$t('File uploaded.'))
      }
      
      this.editUploadAssetID = null
      this.$refs.EditUploadInput.value = ''
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Material);

/***/ }),

/***/ "./webpack-app/admin/Material/Material.js?vue&type=script&lang=js&?660f":
/*!*************************************************************************!*\
  !*** ./webpack-app/admin/Material/Material.js?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Material_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Material.js?vue&type=script&lang=js& */ "./webpack-app/admin/Material/Material.js?vue&type=script&lang=js&?4642");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Material_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/Material/Material.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CMaterial%5CMaterial.vue":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/Material/Material.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CMaterial%5CMaterial.vue ***!
  \****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./Material.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CMaterial%5CMaterial.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/Material/Material.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CMaterial%5CMaterial.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Material_less_vue_type_style_index_0_id_0443793a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Material_less_vue_type_style_index_0_id_0443793a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Material_less_vue_type_style_index_0_id_0443793a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Material_less_vue_type_style_index_0_id_0443793a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Material_less_vue_type_style_index_0_id_0443793a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Material_less_vue_type_style_index_0_id_0443793a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/Material/Material.vue":
/*!*************************************************!*\
  !*** ./webpack-app/admin/Material/Material.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Material_html_vue_type_template_id_0443793a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material.html?vue&type=template&id=0443793a&scoped=true& */ "./webpack-app/admin/Material/Material.html?vue&type=template&id=0443793a&scoped=true&");
/* harmony import */ var _Material_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Material.js?vue&type=script&lang=js& */ "./webpack-app/admin/Material/Material.js?vue&type=script&lang=js&?660f");
/* empty/unused harmony star reexport *//* harmony import */ var _Material_less_vue_type_style_index_0_id_0443793a_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true& */ "./webpack-app/admin/Material/Material.less?vue&type=style&index=0&id=0443793a&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Material.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CMaterial%5CMaterial.vue */ "./webpack-app/admin/Material/Material.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CMaterial%5CMaterial.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Material_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Material_html_vue_type_template_id_0443793a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Material_html_vue_type_template_id_0443793a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0443793a",
  null
  
)

/* custom blocks */

if (typeof _Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Material_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CMaterial_5CMaterial_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/Material/Material.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=material.js.map