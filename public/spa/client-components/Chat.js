(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-components/Chat"],{

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/components/Chat/Chat.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CChat%5CChat.vue":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/components/Chat/Chat.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CChat%5CChat.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{"Upload Image":"送出圖片","Send":"送出","Logout":"登出","Admin":"管理"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".chat-list[data-v-60defd64] {\n  max-height: 11rem;\n  overflow-y: auto;\n  border: 1px solid #ccc;\n  border-radius: 0.5rem;\n}\ninput[type=\"file\"][data-v-60defd64] {\n  display: none !important;\n}\n.extra.text[data-v-60defd64]  a > img {\n  border: 1px solid #ccc;\n  max-height: 250px !important;\n  max-width: 250px !important;\n  width: auto !important;\n  height: auto !important;\n}\n", "",{"version":3,"sources":["Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,sBAAsB;EACtB,qBAAqB;AACvB;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,sBAAsB;EACtB,4BAA4B;EAC5B,2BAA2B;EAC3B,sBAAsB;EACtB,uBAAuB;AACzB","file":"Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true&","sourcesContent":[".chat-list[data-v-60defd64] {\n  max-height: 11rem;\n  overflow-y: auto;\n  border: 1px solid #ccc;\n  border-radius: 0.5rem;\n}\ninput[type=\"file\"][data-v-60defd64] {\n  display: none !important;\n}\n.extra.text[data-v-60defd64]  a > img {\n  border: 1px solid #ccc;\n  max-height: 250px !important;\n  max-width: 250px !important;\n  width: auto !important;\n  height: auto !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/Chat/Chat.html?vue&type=template&id=60defd64&scoped=true&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/components/Chat/Chat.html?vue&type=template&id=60defd64&scoped=true& ***!
  \*****************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "ui form segment" }, [
    _c(
      "div",
      { ref: "ChatList", staticClass: "ui large feed chat-list" },
      _vm._l(_vm.displayMessages, function(message) {
        return _c("div", { staticClass: "event" }, [
          _vm._m(0, true),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _c("div", { staticClass: "summary" }, [
              _vm._v(
                "\r\n          " +
                  _vm._s(message.user.username) +
                  "\r\n          "
              ),
              _c("div", { staticClass: "date" }, [
                _vm._v(
                  "\r\n            " +
                    _vm._s(_vm.displayAge(message.timestamp)) +
                    "\r\n          "
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", {
              staticClass: "extra text",
              domProps: { innerHTML: _vm._s(message.message) }
            })
          ])
        ])
      }),
      0
    ),
    _vm._v(" "),
    _c("div", { staticClass: "unstackable inline fields" }, [
      _c("div", { staticClass: "eight wide field" }, [
        _c("label", { attrs: { for: "WritingMessage" } }, [
          _vm._v(
            "\r\n          " + _vm._s(_vm.status.username) + "\r\n        "
          )
        ]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.writingMessage,
              expression: "writingMessage"
            }
          ],
          attrs: { type: "text", id: "WritingMessage" },
          domProps: { value: _vm.writingMessage },
          on: {
            keyup: function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              return _vm.insert($event)
            },
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.writingMessage = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "two wide field" }, [
        _c("input", {
          ref: "UploadInput",
          attrs: { type: "file", name: "picture" },
          on: { change: _vm.upload }
        }),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "ui fluid button",
            attrs: { type: "button" },
            on: { click: _vm.uploadTrigger }
          },
          [
            _vm._v(
              "\r\n        " + _vm._s(_vm.$t("Upload Image")) + "\r\n      "
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "two wide field" }, [
        _c(
          "button",
          {
            staticClass: "ui fluid button",
            class: {
              disabled: _vm.writingMessage.trim() === "",
              green: _vm.writingMessage.trim() !== ""
            },
            attrs: { type: "button" },
            on: { click: _vm.insert }
          },
          [_vm._v("\r\n        " + _vm._s(_vm.$t("Send")) + "\r\n      ")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "two wide field" }, [
        _c(
          "button",
          {
            staticClass: "ui fluid button",
            attrs: { type: "button" },
            on: { click: _vm.openAdmin }
          },
          [_vm._v("\r\n        " + _vm._s(_vm.$t("Admin")) + "\r\n      ")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "two wide field" }, [
        _c(
          "button",
          {
            staticClass: "ui fluid button",
            attrs: { type: "button" },
            on: { click: _vm.logout }
          },
          [_vm._v("\r\n        " + _vm._s(_vm.$t("Logout")) + "\r\n      ")]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "label" }, [
      _c("i", { staticClass: "pencil alternate icon" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("16f3e7b5", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/client/components/Chat/Chat.html?vue&type=template&id=60defd64&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./webpack-app/client/components/Chat/Chat.html?vue&type=template&id=60defd64&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Chat_html_vue_type_template_id_60defd64_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Chat.html?vue&type=template&id=60defd64&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/Chat/Chat.html?vue&type=template&id=60defd64&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Chat_html_vue_type_template_id_60defd64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Chat_html_vue_type_template_id_60defd64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/components/Chat/Chat.js?vue&type=script&lang=js&?1f7f":
/*!*****************************************************************************!*\
  !*** ./webpack-app/client/components/Chat/Chat.js?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chat_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Chat.js?vue&type=script&lang=js& */ "./webpack-app/client/components/Chat/Chat.js?vue&type=script&lang=js&?813d");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Chat_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/components/Chat/Chat.js?vue&type=script&lang=js&?813d":
/*!*****************************************************************************!*\
  !*** ./webpack-app/client/components/Chat/Chat.js?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Chat = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      displayMessages: [],
      lastDisplayMessagesLength: 0,
      //writingMessage: 'test: ' + location.href,
      writingMessage: '',
      lastUpdateTimestamp: null,
      stopSync: false,
      syncIntervalMS: 5000,
    }
  },
  computed: {
    
  },
  watch: {
    'displayMessages': function () {
      if (this.displayMessages.length > this.lastDisplayMessagesLength) {
        this.lastDisplayMessagesLength = this.displayMessages.length
        let list = this.$refs.ChatList
        setTimeout(() => {
          list.scrollTop = list.scrollHeight
        }, 100)
      }
    }
  },
  mounted: function () {
    this.initDisplayMessages()
  },
  destroyed: function () {
    this.stopSync = true
  },
  methods: {
    initDisplayMessages: async function () {
      let messages = await this.lib.AxiosHelper.get(`/client/message/list`)
      if (Array.isArray(messages) === false) {
        return false
      }
      this.displayMessages = messages
      this.lastUpdateTimestamp = this.getTime()
      
      setTimeout(() => {
        this.syncDisplayMessages()
      }, this.syncIntervalMS)
    },
    syncDisplayMessages: async function () {
      if (this.stopSync === true) {
        return false
      }
      
      let messages = await this.lib.AxiosHelper.get(`/client/message/sync-list`, {
        lastUpdateTimestamp: this.lastUpdateTimestamp
      }, (error) => {
        console.error('Sync messages fail.')
      })
      
      if (Array.isArray(messages) === false) {
        //console.error('Sync messages fail.')
        return false
      }
      
      this.displayMessages = this.displayMessages.concat(messages)
      this.lastUpdateTimestamp = this.getTime()
      
      setTimeout(() => {
        this.syncDisplayMessages()
      }, this.syncIntervalMS)
    },
    getTime () {
      return (new Date()).getTime()
    },
    insert: async function () {
      let result = await this.lib.AxiosHelper.post(`/client/message/insert`, {
        message: this.writingMessage
      })
      
      this.displayMessages.push({
        user: {
          username: this.status.username,
        },
        message: this.writingMessage,
        timestamp: result
      })
      
      this.writingMessage = ''
    },
    logout: async function () {
      await this.lib.AxiosHelper.get(`/client/user/logout`)
      this.status.username = false
      //this.$router.replace('/login')
      this.view = 'Login'
    },
    displayAge: function (timestamp) {
      return this.lib.DayJSHelper.fromNow(timestamp)
    },
    openAdmin: function () {
      let origin = location.href
      if (origin.indexOf('#') > 0) {
        origin = origin.slice(0, origin.indexOf('#'))
      }
      let adminURL = `${this.config.baseURL}/admin#/?origin=${origin}`
      window.open(adminURL, 'admin')
    },
    uploadTrigger: function () {
      this.$refs.UploadInput.click()
    },
    upload: async function () {
      let result = await this.lib.AxiosHelper.upload('/client/message/upload', {
        message_picture: this.$refs.UploadInput
      })
      
      let imageURL = result.url
      let message = `<a href="${imageURL}" target="_blank"><img src="${imageURL}" /></a>`
      
      this.displayMessages.push({
        user: {
          username: this.status.username,
        },
        message: message,
        timestamp: result.timestamp
      })
      
      this.$refs.UploadInput.value = ''
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Chat);

/***/ }),

/***/ "./webpack-app/client/components/Chat/Chat.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CChat%5CChat.vue":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/components/Chat/Chat.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CChat%5CChat.vue ***!
  \**************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Chat.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CChat%5CChat.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/components/Chat/Chat.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CChat%5CChat.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Chat_less_vue_type_style_index_0_id_60defd64_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Chat_less_vue_type_style_index_0_id_60defd64_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Chat_less_vue_type_style_index_0_id_60defd64_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Chat_less_vue_type_style_index_0_id_60defd64_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Chat_less_vue_type_style_index_0_id_60defd64_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Chat_less_vue_type_style_index_0_id_60defd64_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/components/Chat/Chat.vue":
/*!*****************************************************!*\
  !*** ./webpack-app/client/components/Chat/Chat.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chat_html_vue_type_template_id_60defd64_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chat.html?vue&type=template&id=60defd64&scoped=true& */ "./webpack-app/client/components/Chat/Chat.html?vue&type=template&id=60defd64&scoped=true&");
/* harmony import */ var _Chat_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chat.js?vue&type=script&lang=js& */ "./webpack-app/client/components/Chat/Chat.js?vue&type=script&lang=js&?1f7f");
/* empty/unused harmony star reexport *//* harmony import */ var _Chat_less_vue_type_style_index_0_id_60defd64_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true& */ "./webpack-app/client/components/Chat/Chat.less?vue&type=style&index=0&id=60defd64&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Chat.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CChat%5CChat.vue */ "./webpack-app/client/components/Chat/Chat.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CChat%5CChat.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Chat_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Chat_html_vue_type_template_id_60defd64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Chat_html_vue_type_template_id_60defd64_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "60defd64",
  null
  
)

/* custom blocks */

if (typeof _Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Chat_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CChat_5CChat_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/components/Chat/Chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=Chat.js.map