(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client-components/Login"],{

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CLogin%5CLogin.vue":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CLogin%5CLogin.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{"User {0} is not existed.":"使用者{0}不存在。","User {0} is registed.":"使用者{0}已經註冊。","Password is incorrect.":"密碼錯誤。","Username":"使用者名稱","Password":"密碼","Email":"電子信箱地址","Login":"登入","Register":"註冊","Login from Google":"從Google帳號登入","Login from GitHub":"從GitHub帳號登入","Login from Instagram":"從Instagram帳號登入"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/Login/Login.html?vue&type=template&id=7f785ee2&scoped=true&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/components/Login/Login.html?vue&type=template&id=7f785ee2&scoped=true& ***!
  \*******************************************************************************************************************************************************************************/
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
    _vm.errorMessage !== ""
      ? _c("div", { staticClass: "ui field" }, [
          _c("div", { staticClass: "ui negative message" }, [
            _vm._v("\r\n      " + _vm._s(_vm.errorMessage) + "\r\n    ")
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "ui field" }, [
      _c("label", { attrs: { for: "loginUsername" } }, [
        _vm._v("\r\n      " + _vm._s(_vm.$t("Username")) + "\r\n    ")
      ]),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.username,
            expression: "username"
          }
        ],
        attrs: { type: "text", id: "loginUsername" },
        domProps: { value: _vm.username },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.username = $event.target.value
          }
        }
      })
    ]),
    _vm._v(" "),
    _vm.mode === "register"
      ? _c("div", { staticClass: "ui field", class: { error: !_vm.isEmail } }, [
          _c("label", { attrs: { for: "loginEmail" } }, [
            _vm._v("\r\n      " + _vm._s(_vm.$t("Email")) + "\r\n    ")
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.email,
                expression: "email"
              }
            ],
            attrs: { type: "email", id: "loginEmail" },
            domProps: { value: _vm.email },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.email = $event.target.value
              }
            }
          })
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "ui field" }, [
      _c("label", { attrs: { for: "loginPassword" } }, [
        _vm._v("\r\n      " + _vm._s(_vm.$t("Password")) + "\r\n    ")
      ]),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.password,
            expression: "password"
          }
        ],
        attrs: { type: "password", id: "loginPassword" },
        domProps: { value: _vm.password },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.password = $event.target.value
          }
        }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "ui six buttons" }, [
      _c(
        "button",
        {
          staticClass: "ui button",
          class: { disabled: _vm.mode === "login" && !_vm.isLoginEnable },
          attrs: { type: "button" },
          on: { click: _vm.login }
        },
        [_vm._v("\r\n      " + _vm._s(_vm.$t("Login")) + "\r\n    ")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "ui button",
          class: { disabled: _vm.mode === "register" && !_vm.isRegisterEnable },
          attrs: { type: "button" },
          on: { click: _vm.register }
        },
        [_vm._v("\r\n      " + _vm._s(_vm.$t("Register")) + "\r\n    ")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "ui google button",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              return _vm.loginFromOAuth("google")
            }
          }
        },
        [
          _c("i", { staticClass: "google icon" }),
          _vm._v(
            "\r\n      " + _vm._s(_vm.$t("Login from Google")) + "\r\n    "
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "ui github button",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              return _vm.loginFromOAuth("github")
            }
          }
        },
        [
          _c("i", { staticClass: "github icon" }),
          _vm._v(
            "\r\n      " + _vm._s(_vm.$t("Login from GitHub")) + "\r\n    "
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "ui instagram button",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              return _vm.loginFromOAuth("instagram")
            }
          }
        },
        [
          _c("i", { staticClass: "instagram icon" }),
          _vm._v(
            "\r\n      " + _vm._s(_vm.$t("Login from Instagram")) + "\r\n    "
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "ui foursquare button",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              return _vm.loginFromOAuth("foursquare")
            }
          }
        },
        [
          _c("i", { staticClass: "instagram icon" }),
          _vm._v(
            "\r\n      " + _vm._s(_vm.$t("Login from Foursquare")) + "\r\n    "
          )
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("4fac615a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/client/components/Login/Login.html?vue&type=template&id=7f785ee2&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./webpack-app/client/components/Login/Login.html?vue&type=template&id=7f785ee2&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_7f785ee2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Login.html?vue&type=template&id=7f785ee2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/Login/Login.html?vue&type=template&id=7f785ee2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_7f785ee2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_7f785ee2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/components/Login/Login.js?vue&type=script&lang=js&?ba15":
/*!*******************************************************************************!*\
  !*** ./webpack-app/client/components/Login/Login.js?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      username: '',
      email: '',
      password: '',
      /*
      username: 'pudding',
      email: 'pudding@nccu.edu.tw',
      password: 'test',
       */
      mode: 'login',
      errorMessage: '',
    }
  },
  computed: {
    isEmail() {
      if (this.email.trim() === '') {
        return true
      }
      return this.lib.StringHelper.validateEmail(this.email)
    },
    isLoginEnable() {
      return (this.username.trim() !== ''
              && this.password.trim() !== '')
    },
    isRegisterEnable() {
      return (this.isEmail === true 
              && this.username.trim() !== ''
              && this.email.trim() !== ''
              && this.password.trim() !== '')
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    register: async function() {
      if (this.mode !== 'register') {
        this.mode = 'register'
        return false
      }
      
      let result = await this.lib.AxiosHelper.get(`/client/user/register`, {
        username: this.username,
        email: this.email,
        password: this.password
      })
      
      let user = result
      if (typeof(user.error) === 'string') {
        if (user.error === 'user-is-existed') { 
          this.errorMessage = this.$t(`User {0} is registed.`, [this.username])
        }
        else {
          this.errorMessage = user.error
        }
        return false
      }
      else {
        this.status.username = this.username
        this.errorMessage = ''
        //this.$router.replace('chat')
        this.view = 'Chat'
        this.reset()
      }
    },
    login: async function() {
      this.mode = 'login'
      let result = await this.lib.AxiosHelper.get(`/client/user/login`, {
          username: this.username,
          password: this.password,
      })
      
      let user = result
      if (user === undefined) {
        this.errorMessage = this.$t(`User {0} is not existed.`, [this.username])
        return
      }      
      
      if (typeof(user.error) === 'string') {
        if (user.error === 'no-user') { 
          this.errorMessage = this.$t(`User {0} is not existed.`, [this.username])
        }
        else if (user.error === 'password-wrong') { 
          this.errorMessage = this.$t(`Password is incorrect.`, [this.username])
        }
        else {
          this.errorMessage = user.error
        }
        return false
      }
      else {
        this.status.username = this.username
        this.errorMessage = ''
        //this.$router.replace('chat')
        this.view = 'Chat'
        this.reset()
      }
    },
    loginFromOAuth(driver) {
      let width = 400
      if (width > screen.availWidth) {
        width = screen.availWidth
      }
      
      let height = 600
      if (height > screen.availHeight) {
        height = screen.availHeight
      }
      
      let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      let dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

      let screenWidth = screen.availWidth
      let screenHeight = screen.availHeight

      let left = ((screenWidth - width) / 2) + dualScreenLeft
      let top = ((screenHeight - height) / 2) + dualScreenTop
      
      let win = window.open(`${this.config.baseURL}/client/oauth/request/${driver}`, '_blank', `location=0,menubar=no,copyhistory=no,directories=0,status=0,width=${width},height=${height},top=${top},left=${left}`)
      this.loginOAuthCallback(driver, win)
    },
    loginOAuthCallback: function (driver, win) {
      let callback = async (event) => {
        if (event.origin !== this.config.baseURL) {
          return false
        }
        win.close()
        let data = event.data
        if (typeof(data) === 'object') {
          data.driver = driver
          let result = await this.lib.AxiosHelper.get(`/client/oauth/login`, data)
          if (result !== false) {
            this.status.username = result
          }
        }
        window.removeEventListener('message', callback, false)
      }
      window.addEventListener('message', callback, false);
    },
    reset: function () {
      this.username = ''
      this.email = ''
      this.password = ''
      this.errorMessage = ''
      this.mode = 'login'
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ "./webpack-app/client/components/Login/Login.js?vue&type=script&lang=js&?f72b":
/*!*******************************************************************************!*\
  !*** ./webpack-app/client/components/Login/Login.js?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Login.js?vue&type=script&lang=js& */ "./webpack-app/client/components/Login/Login.js?vue&type=script&lang=js&?ba15");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CLogin%5CLogin.vue":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CLogin%5CLogin.vue ***!
  \******************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CLogin%5CLogin.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CLogin%5CLogin.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_7f785ee2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_7f785ee2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_7f785ee2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_7f785ee2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_7f785ee2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_7f785ee2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/components/Login/Login.vue":
/*!*******************************************************!*\
  !*** ./webpack-app/client/components/Login/Login.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_html_vue_type_template_id_7f785ee2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.html?vue&type=template&id=7f785ee2&scoped=true& */ "./webpack-app/client/components/Login/Login.html?vue&type=template&id=7f785ee2&scoped=true&");
/* harmony import */ var _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.js?vue&type=script&lang=js& */ "./webpack-app/client/components/Login/Login.js?vue&type=script&lang=js&?f72b");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_less_vue_type_style_index_0_id_7f785ee2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true& */ "./webpack-app/client/components/Login/Login.less?vue&type=style&index=0&id=7f785ee2&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CLogin%5CLogin.vue */ "./webpack-app/client/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CLogin%5CLogin.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_html_vue_type_template_id_7f785ee2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_html_vue_type_template_id_7f785ee2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7f785ee2",
  null
  
)

/* custom blocks */

if (typeof _Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/components/Login/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=Login.js.map