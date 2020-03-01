/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"client": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"client-components/CollaborativeReading~client-components/FreeReading":"client-components/CollaborativeReading~client-components/FreeReading","client-components/CollaborativeReading":"client-components/CollaborativeReading","client-components/FreeReading":"client-components/FreeReading","client-components/Exit":"client-components/Exit","client-components/IndividualReading":"client-components/IndividualReading","client-components/PostRecallKeyword~client-components/PreImaginaryKeyword":"client-components/PostRecallKeyword~client-components/PreImaginaryKeyword","client-components/PostRecallKeyword":"client-components/PostRecallKeyword","client-components/PreImaginaryKeyword":"client-components/PreImaginaryKeyword","client-components/PostRecall~client-components/PreImaginary":"client-components/PostRecall~client-components/PreImaginary","client-components/PostRecall":"client-components/PostRecall","client-components/PreImaginary":"client-components/PreImaginary","vendors/HTMLEditor":"vendors/HTMLEditor","vendors/semantic-ui-niwsf":"vendors/semantic-ui-niwsf","vendors~client-components/GlobalComponents":"vendors~client-components/GlobalComponents","client-components/GlobalComponents":"client-components/GlobalComponents","vendors~client-components/Loading~client-components/ReadingComponents":"vendors~client-components/Loading~client-components/ReadingComponents","client-components/Loading~client-components/ReadingComponents":"client-components/Loading~client-components/ReadingComponents","client-components/ReadingComponents":"client-components/ReadingComponents","vendors~client-components/Loading":"vendors~client-components/Loading","client-components/Loading":"client-components/Loading"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://pc.pulipuli.info:3333/spa/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./webpack-app/client.js","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Loading/Loading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLoading%5CLoading.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/Loading/Loading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLoading%5CLoading.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":null}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".loading-modal[data-v-58ac9781] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: black;\n  color: white;\n  text-align: center;\n  padding-top: calc(50vh - 97px);\n}\n", "",{"version":3,"sources":["Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,OAAO;EACP,MAAM;EACN,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;EACZ,kBAAkB;EAClB,8BAA8B;AAChC","file":"Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true&","sourcesContent":[".loading-modal[data-v-58ac9781] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: black;\n  color: white;\n  text-align: center;\n  padding-top: calc(50vh - 97px);\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Loading/Loading.html?vue&type=template&id=58ac9781&scoped=true&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Loading/Loading.html?vue&type=template&id=58ac9781&scoped=true& ***!
  \************************************************************************************************************************************************************************/
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
    { staticClass: "Loading" },
    [
      !_vm.status.progress.initComponents
        ? _c("div", { staticClass: "loading-modal" }, [
            _c("img", {
              attrs: { src: _vm.config.baseURL + "/imgs/loading.svg" }
            })
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("auth", {
        ref: "auth",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("StyleManager", {
        ref: "style",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("PACORTestManager", {
        ref: "TestManager",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _c("error-handler", {
        ref: "ErrorHandler",
        attrs: { config: _vm.config, lib: _vm.lib, errors: _vm.errors }
      }),
      _vm._v(" "),
      _c("confirm-modal", {
        ref: "ConfirmModal",
        attrs: { config: _vm.config, lib: _vm.lib, status: _vm.status }
      }),
      _vm._v(" "),
      _c("tutorial-manager", {
        ref: "TutorialManager",
        attrs: { config: _vm.config, status: _vm.status, lib: _vm.lib }
      }),
      _vm._v(" "),
      _vm.status.view !== "Loading"
        ? _c(_vm.status.view, {
            tag: "component",
            attrs: {
              config: _vm.config,
              status: _vm.status,
              progress: _vm.progress,
              lib: _vm.lib
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("094cc382", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/client.js":
/*!*******************************!*\
  !*** ./webpack-app/client.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _plugins_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/i18n */ "./webpack-app/plugins/i18n.js");
/* harmony import */ var _client_client_tpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client/client.tpl */ "./webpack-app/client/client.tpl");
/* harmony import */ var _client_client_tpl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_client_client_tpl__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config.js */ "./webpack-app/config.js");
/* harmony import */ var _client_local_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client/local-components */ "./webpack-app/client/local-components.js");
/* global __webpack_public_path__ */



// ----------------------------------
// plugins



// ----------------------





// --------------------
// Components or routes

//import './client/global-components'
//import './client/local-global-dynamic-components'
//import './client/local-global-static-components'


// -----------------------
// 確認 baseURL

let baseURL = __webpack_require__.p
baseURL = baseURL.split('/').slice(0, 3).join('/')

let baseScript = document.currentScript
if (baseScript) {
  
  //console.log(baseScript[0].src)
  let testBaseURL = 'http://pc.pulipuli.info:3333'
  let enableBrowserTest = true
  if (enableBrowserTest === true) {
    console.log('@TEST enableBrowserTest', enableBrowserTest)
    baseURL = testBaseURL
  }
  else {
    let src = baseScript.src
    //console.log(src)
    if (src.startsWith('/')) {
      src = window.location.href
      console.log(src)
    }

    baseURL = src.split('/').slice(0, 3).join('/')
  }
  //console.log(baseURL)
  //if (enableBrowserTest && baseScript[0].src.startsWith(testBaseURL)) {
  //if (enableBrowserTest) {
  //}
  
  
  var appNode = document.createElement("div");
  appNode.id = 'app'
  baseScript.parentNode.insertBefore(appNode, baseScript);
  //baseScript.before(`<div id="app"></div>`)
}
_config_js__WEBPACK_IMPORTED_MODULE_3__["default"].baseURL = baseURL

// ---------------
// 錯誤訊息的設置

window.onerror = function(message, source, lineno, colno, error) {
  if (error === null) {
    error = message
  }
  //console.error(error)
  VueController.data.errors.push(error)
}

vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.errorHandler  = function(err, vm, info) {
  //console.log(`errorHandler Error: ${err.stack}\nInfo: ${info}`);
  //console.error(err)
  VueController.data.errors.push(err)
}

// -----------------------

let VueController = {
  data: {
    config: _config_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    status: {
      needLogin: true,
      userID: -1,
      username: '',
      displayName: '',
      avatar: '',
      role: 'reader',
      readingProgresses: [],
      title: '',
      view: 'Loading',
      preference: {},
      //notificationUnreadCount: 0,
      search: {
        keyword: '',
        showAnnotationList: false,
        peerID: null,
        count: 0,
      },
      readingConfig: {},
      filter: {
        findType: null,
        focusUser: null
      },
      notificationData: {
        unreadCount: 0,
        unreadNotifications: [],
        hasNotification: true,
      },
      progress: {
        initComponents: false,
        highlights: false
      },
      sessionToken: null
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {
      AxiosHelper: null,
      DayJSHelper: null,
      StringHelper: null,
      ValidateHelper: null,
      //style: StyleHelper.setConfig(config),
      AnnotationHelper: null,
      VueHelper: null,
      NumberHelper: null,
      
      auth: null,
      RangyManager: null,
      AnnotationPanel: null,
      UserFilter: null,
      AnnotationTypeFilter: null,
      SectionManager: null,
      ConfirmModal: null,
      NotificationManager: null,
      TestManager: null,
      TutorialManager: null,
      style: null,
      tippy: null,
      //tippyUtils: null,
    },
    errors: [],
    persistAttrs: [
    ]
  },
//  computed: { },
//  watch: {},
  //created: function () {
  //},
//  mounted: function () {
//    
//    //console.log(this.lib.auth.nextStep)
//  },
  
  //methods: { }, // methods: {
  
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: _plugins_i18n__WEBPACK_IMPORTED_MODULE_1__["default"],
  
  template: _client_client_tpl__WEBPACK_IMPORTED_MODULE_2___default.a,
  components: _client_local_components__WEBPACK_IMPORTED_MODULE_4__["default"]
}

if (typeof(baseURL) === 'string') {
  setTimeout(() => {
    new vue__WEBPACK_IMPORTED_MODULE_0__["default"](VueController)
    //$('body > #TestMessage').remove()
  }, 0)
}

// @Test
//window.VueController = VueController


/***/ }),

/***/ "./webpack-app/client/Loading/Loading.html?vue&type=template&id=58ac9781&scoped=true&":
/*!********************************************************************************************!*\
  !*** ./webpack-app/client/Loading/Loading.html?vue&type=template&id=58ac9781&scoped=true& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_58ac9781_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Loading.html?vue&type=template&id=58ac9781&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Loading/Loading.html?vue&type=template&id=58ac9781&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_58ac9781_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Loading_html_vue_type_template_id_58ac9781_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Loading/Loading.js?vue&type=script&lang=js&?dd9c":
/*!************************************************************************!*\
  !*** ./webpack-app/client/Loading/Loading.js?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../global-components */ "./webpack-app/client/global-components.js");
/* harmony import */ var _local_global_dynamic_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../local-global-dynamic-components */ "./webpack-app/client/local-global-dynamic-components.js");
/* harmony import */ var _local_global_static_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../local-global-static-components */ "./webpack-app/client/local-global-static-components.js");
/* harmony import */ var _plugins_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../plugins/plugins */ "./webpack-app/plugins/plugins.js");
/* harmony import */ var _styles_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../styles/styles */ "./webpack-app/styles/styles.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);
// --------------------
// Components or routes





// -----------------------------
// Plugin and styles






// -------------------

let Loading = {
  props: ['lib', 'status', 'config', 'progress', 'errors'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    HiddenLoading: () => Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../components/ui-modal/HiddenLoading/HiddenLoading.vue */ "./webpack-app/components/ui-modal/HiddenLoading/HiddenLoading.vue")),
    'error-handler': () => Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../components/manager/ErrorHandler/ErrorHandler.vue */ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.vue")),
    Auth: () => Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../Auth/Auth.vue */ "./webpack-app/client/Auth/Auth.vue")),
    Login: () => Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../Login/Login.vue */ "./webpack-app/client/Login/Login.vue")),
    StyleManager: () => Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../components/manager/StyleManager/StyleManager.vue */ "./webpack-app/components/manager/StyleManager/StyleManager.vue")),
    'tutorial-manager': () => Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../components/manager/TutorialManager/TutorialManager.vue */ "./webpack-app/components/manager/TutorialManager/TutorialManager.vue")),
    
    PACORTestManager: () => Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../components/test/PACORTestManager/PACORTestManager.vue */ "./webpack-app/components/test/PACORTestManager/PACORTestManager.vue")),
    
    'PreImaginary': () => Promise.all(/*! import() | client-components/PreImaginary */[__webpack_require__.e("client-components/PostRecall~client-components/PreImaginary"), __webpack_require__.e("client-components/PreImaginary")]).then(__webpack_require__.bind(null, /*! ./../Questionnaire/PreImaginary/PreImaginary.vue */ "./webpack-app/client/Questionnaire/PreImaginary/PreImaginary.vue")),
    'PostRecall': () => Promise.all(/*! import() | client-components/PostRecall */[__webpack_require__.e("client-components/PostRecall~client-components/PreImaginary"), __webpack_require__.e("client-components/PostRecall")]).then(__webpack_require__.bind(null, /*! ./../Questionnaire/PostRecall/PostRecall.vue */ "./webpack-app/client/Questionnaire/PostRecall/PostRecall.vue")),
    
    'PreImaginaryKeyword': () => Promise.all(/*! import() | client-components/PreImaginaryKeyword */[__webpack_require__.e("client-components/PostRecallKeyword~client-components/PreImaginaryKeyword"), __webpack_require__.e("client-components/PreImaginaryKeyword")]).then(__webpack_require__.bind(null, /*! ./../Questionnaire/PreImaginaryKeyword/PreImaginaryKeyword.vue */ "./webpack-app/client/Questionnaire/PreImaginaryKeyword/PreImaginaryKeyword.vue")),
    'PostRecallKeyword': () => Promise.all(/*! import() | client-components/PostRecallKeyword */[__webpack_require__.e("client-components/PostRecallKeyword~client-components/PreImaginaryKeyword"), __webpack_require__.e("client-components/PostRecallKeyword")]).then(__webpack_require__.bind(null, /*! ./../Questionnaire/PostRecallKeyword/PostRecallKeyword.vue */ "./webpack-app/client/Questionnaire/PostRecallKeyword/PostRecallKeyword.vue")),
    
    'CollaborativeReading': () => Promise.all(/*! import() | client-components/CollaborativeReading */[__webpack_require__.e("client-components/CollaborativeReading~client-components/FreeReading"), __webpack_require__.e("client-components/CollaborativeReading")]).then(__webpack_require__.bind(null, /*! ./../Reading/CollaborativeReading/CollaborativeReading.vue */ "./webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.vue")),
    'IndividualReading': () => __webpack_require__.e(/*! import() | client-components/IndividualReading */ "client-components/IndividualReading").then(__webpack_require__.bind(null, /*! ./../Reading/IndividualReading/IndividualReading.vue */ "./webpack-app/client/Reading/IndividualReading/IndividualReading.vue")),
    
    'Exit': () => __webpack_require__.e(/*! import() | client-components/Exit */ "client-components/Exit").then(__webpack_require__.bind(null, /*! ./../Exit/Exit.vue */ "./webpack-app/client/Exit/Exit.vue")),
    'FreeReading': () => Promise.all(/*! import() | client-components/FreeReading */[__webpack_require__.e("client-components/CollaborativeReading~client-components/FreeReading"), __webpack_require__.e("client-components/FreeReading")]).then(__webpack_require__.bind(null, /*! ./../Reading/FreeReading/FreeReading.vue */ "./webpack-app/client/Reading/FreeReading/FreeReading.vue")),
  },
//  computed: {
//    
//  },
  watch: {
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    },
//    "status.view" (view) {
//      console.log('改變了', view)
//    }
  },
  mounted: async function () {
    
    let AxiosHelper = await (function () {return Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../helpers/AxiosHelper.js */ "./webpack-app/helpers/AxiosHelper.js"))})()
    AxiosHelper = AxiosHelper.default
    //console.log(AxiosHelper)
    this.lib.AxiosHelper = AxiosHelper.setBaseURL(this.config.baseURL)
    
    let DayJSHelper = await (() =>Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../helpers/DayJSHelper.js */ "./webpack-app/helpers/DayJSHelper.js")))()
    this.lib.DayJSHelper = await DayJSHelper.default()
    
    let StringHelper = await (() =>Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../helpers/StringHelper.js */ "./webpack-app/helpers/StringHelper.js")))()
    this.lib.StringHelper = StringHelper.default
    
    let ValidateHelper = await (() =>Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../helpers/ValidateHelper.js */ "./webpack-app/helpers/ValidateHelper.js")))()
    this.lib.ValidateHelper = ValidateHelper.default
    
    let AnnotationHelper = await (() =>Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../helpers/AnnotationHelper.js */ "./webpack-app/helpers/AnnotationHelper.js")))()
    this.lib.AnnotationHelper = AnnotationHelper.default
    
    let VueHelper = await (() =>Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../helpers/VueHelper.js */ "./webpack-app/helpers/VueHelper.js")))()
    this.lib.VueHelper = VueHelper.default
    
    let NumberHelper = await (() =>Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../helpers/NumberHelper.js */ "./webpack-app/helpers/NumberHelper.js")))()
    this.lib.NumberHelper = NumberHelper.default
    
    let tippy = await (() =>Promise.all(/*! import() | client-components/Loading */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("vendors~client-components/Loading"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading")]).then(__webpack_require__.bind(null, /*! ./../../components/ui-button/tippy.js/tippy.utils.js */ "./webpack-app/components/ui-button/tippy.js/tippy.utils.js")))()
    this.lib.tippy = tippy.default
    
//    let tippyUtils = await (() =>import(/* webpackChunkName: "client-components/Loading" */ './../../components/ui-button/tippy.js/tippy.utils.js'))()
//    this.lib.tippyUtils = tippyUtils.default
    
    // ----------------------
    
    this.lib.AxiosHelper.setErrorHandler((error) => {
      if (this.$refs.ErrorHandler) {
        this.$refs.ErrorHandler.addError(error)
      }
    })
    
    this.initDayJSHelper()
    
    
    // ----------------------
    
    this.lib.auth = this.$refs.auth
    this.lib.style = this.$refs.style
    this.lib.AnnotationHelper.setStatus(this.status)
    this.lib.ConfirmModal = this.$refs.ConfirmModal
    this.lib.TestManager = this.$refs.TestManager
    this.lib.TutorialManager = this.$refs.TutorialManager
    
    this.lib.auth.init()
  },
  methods: {
    initDayJSHelper () {
      if (!this.lib.DayJSHelper) {
        setTimeout(() => {
          this.initDayJSHelper()
        }, 100)
        return false
      }
      
      //console.log(this.lib.DayJSHelper)
      this.lib.DayJSHelper.setI18N((name, data) => {
        return this.$t(name, data)
      })
    }
  }
//  methods: {} // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./webpack-app/client/Loading/Loading.js?vue&type=script&lang=js&?ecb5":
/*!************************************************************************!*\
  !*** ./webpack-app/client/Loading/Loading.js?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Loading.js?vue&type=script&lang=js& */ "./webpack-app/client/Loading/Loading.js?vue&type=script&lang=js&?dd9c");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_58ac9781_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_58ac9781_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_58ac9781_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_58ac9781_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_58ac9781_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Loading_less_vue_type_style_index_0_id_58ac9781_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/Loading/Loading.vue":
/*!************************************************!*\
  !*** ./webpack-app/client/Loading/Loading.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loading_html_vue_type_template_id_58ac9781_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loading.html?vue&type=template&id=58ac9781&scoped=true& */ "./webpack-app/client/Loading/Loading.html?vue&type=template&id=58ac9781&scoped=true&");
/* harmony import */ var _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loading.js?vue&type=script&lang=js& */ "./webpack-app/client/Loading/Loading.js?vue&type=script&lang=js&?ecb5");
/* empty/unused harmony star reexport *//* harmony import */ var _Loading_less_vue_type_style_index_0_id_58ac9781_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true& */ "./webpack-app/client/Loading/Loading.less?vue&type=style&index=0&id=58ac9781&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLoading%5CLoading.vue&lang=yaml */ "./webpack-app/client/Loading/Loading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLoading%5CLoading.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Loading_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Loading_html_vue_type_template_id_58ac9781_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Loading_html_vue_type_template_id_58ac9781_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "58ac9781",
  null
  
)

/* custom blocks */

if (typeof _Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Loading/Loading.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/Loading/Loading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLoading%5CLoading.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/Loading/Loading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLoading%5CLoading.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./Loading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLoading%5CLoading.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Loading/Loading.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLoading%5CLoading.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Loading_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLoading_5CLoading_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/client.tpl":
/*!***************************************!*\
  !*** ./webpack-app/client/client.tpl ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"non-invasive-web-style-framework\">\r\n  <Loading \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:lib=\"lib\"\r\n    v-bind:errors=\"errors\">\r\n  </Loading>\r\n</div>";

/***/ }),

/***/ "./webpack-app/client/global-components.js":
/*!*************************************************!*\
  !*** ./webpack-app/client/global-components.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */



//import Pagination from './../components/ui/Pagination/Pagination.vue'
//Vue.component('pagination', Pagination)

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('pagination', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui/Pagination/Pagination.vue */ "./webpack-app/components/ui/Pagination/Pagination.vue"))
})

//import Modal from './../components/ui-modal/Modal/Modal.vue'
//Vue.component('modal', Modal)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('modal', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui-modal/Modal/Modal.vue */ "./webpack-app/components/ui-modal/Modal/Modal.vue"))
})

//import ConfirmModal from './../components/ui-modal/ConfirmModal/ConfirmModal.vue'
//Vue.component('confirm-modal', ConfirmModal)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('confirm-modal', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui-modal/ConfirmModal/ConfirmModal.vue */ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.vue"))
})

//import StepProgressBar from './../components/reading-progress/StepProgressBar/StepProgressBar.vue'
//Vue.component('step-progress-bar', StepProgressBar)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('step-progress-bar', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/reading-progress/StepProgressBar/StepProgressBar.vue */ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.vue"))
})

//import BlockExit from './../components/reading-progress/BlockExit/BlockExit.vue'
//Vue.component('block-exit', BlockExit)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('block-exit', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/reading-progress/BlockExit/BlockExit.vue */ "./webpack-app/components/reading-progress/BlockExit/BlockExit.vue"))
})

//import ActivityTimer from './../components/reading-progress/ActivityTimer/ActivityTimer.vue'
//Vue.component('activity-timer', ActivityTimer)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('activity-timer', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/reading-progress/ActivityTimer/ActivityTimer.vue */ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.vue"))
})

//import Navigation from './../components/ui/Navigation/Navigation.vue'
//Vue.component('navigation', Navigation)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('navigation', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui/Navigation/Navigation.vue */ "./webpack-app/components/ui/Navigation/Navigation.vue"))
})

//import Clock from './../components/reading-progress/Clock/Clock.vue'
//Vue.component('clock', Clock)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('clock', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/reading-progress/Clock/Clock.vue */ "./webpack-app/components/reading-progress/Clock/Clock.vue"))
})

//import AnnotationTypeButton from './../components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue'
//Vue.component('annotation-type-button', AnnotationTypeButton)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-type-button', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue */ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue"))
})

//import CheckboxToggle from './../components/ui-button/CheckboxToggle/CheckboxToggle.vue'
//Vue.component('checkbox-toggle', CheckboxToggle)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('checkbox-toggle', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui-button/CheckboxToggle/CheckboxToggle.vue */ "./webpack-app/components/ui-button/CheckboxToggle/CheckboxToggle.vue"))
})

//import CountdownButton from './../components/ui-button/CountdownButton/CountdownButton.vue'
//Vue.component('countdown-button', CountdownButton)
//Vue.component('countdown-button', () => {
//  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-button/CountdownButton/CountdownButton.vue')
//})

//import SimpleCountdownTimer from './../components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue'
//Vue.component('simple-countdown-timer', SimpleCountdownTimer)
//Vue.component('simple-countdown-timer', () => {
//  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue')
//})

//import DigitalCountdownTimer from './../components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue'
//Vue.component('digital-countdown-timer', DigitalCountdownTimer)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('digital-countdown-timer', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue */ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue"))
})

//import ValidationButton from './../components/ui-button/ValidationButton/ValidationButton.vue'
//Vue.component('validation-button', ValidationButton)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('validation-button', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui-button/ValidationButton/ValidationButton.vue */ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.vue"))
})

//import UserAvatarIcons from './../components/ui-user/UserAvatarIcons/UserAvatarIcons.vue'
//Vue.component('user-avatar-icons', UserAvatarIcons)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-avatar-icons', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui-user/UserAvatarIcons/UserAvatarIcons.vue */ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.vue"))
})

//import AnnotationItem from './../components/annotation/AnnotationItem/AnnotationItem.vue'
//Vue.component('annotation-item', AnnotationItem)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-item', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/annotation/AnnotationItem/AnnotationItem.vue */ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.vue"))
})

//import AnnotationItemInteractive from './../components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue'
//Vue.component('annotation-item-interactive', AnnotationItemInteractive)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-item-interactive', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue */ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue"))
})

//import AdminBadge from './../components/ui-user/AdminBadge/AdminBadge.vue'
//Vue.component('admin-badge', AdminBadge)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('admin-badge', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui-user/AdminBadge/AdminBadge.vue */ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.vue"))
})

//import UserSelfBadge from './../components/ui-user/UserSelfBadge/UserSelfBadge.vue'
//Vue.component('user-self-badge', UserSelfBadge)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-self-badge', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui-user/UserSelfBadge/UserSelfBadge.vue */ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.vue"))
})

//import UserAvatar from './../components/ui-user/UserAvatar/UserAvatar.vue'
//Vue.component('user-avatar', UserAvatar)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-avatar', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui-user/UserAvatar/UserAvatar.vue */ "./webpack-app/components/ui-user/UserAvatar/UserAvatar.vue"))
})

//import IframeMessageSegment from './../components/ui/IframeMessageSegment/IframeMessageSegment.vue'
//Vue.component('iframe-message-segment', IframeMessageSegment)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('iframe-message-segment', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./../components/ui/IframeMessageSegment/IframeMessageSegment.vue */ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.vue"))
})

// --------------------

//Vue.component('pre-imaginary-message', () => {
//  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/PreImaginaryMessage/PreImaginaryMessage.vue')
//})
//
//Vue.component('post-recall-message', () => {
//  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/PostRecallMessage/PostRecallMessage.vue')
//})

// --------------------

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('HTMLEditor', () => {
  return __webpack_require__.e(/*! import() | vendors/HTMLEditor */ "vendors/HTMLEditor").then(__webpack_require__.bind(null, /*! ./../components/annotation/HTMLEditor/HTMLEditor.vue */ "./webpack-app/components/annotation/HTMLEditor/HTMLEditor.vue"))
})




/***/ }),

/***/ "./webpack-app/client/local-components.js":
/*!************************************************!*\
  !*** ./webpack-app/client/local-components.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Loading/Loading.vue */ "./webpack-app/client/Loading/Loading.vue");


let components = {
  Loading: _Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
}
/* harmony default export */ __webpack_exports__["default"] = (components);

/***/ }),

/***/ "./webpack-app/client/local-global-dynamic-components.js":
/*!***************************************************************!*\
  !*** ./webpack-app/client/local-global-dynamic-components.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */



vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('rangy', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/annotation/RangyManager/RangyManager.vue */ "./webpack-app/client/Reading/components/annotation/RangyManager/RangyManager.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-panel', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/annotation/AnnotationPanel/AnnotationPanel.vue */ "./webpack-app/client/Reading/components/annotation/AnnotationPanel/AnnotationPanel.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-manager', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/annotation/AnnotationManager/AnnotationManager.vue */ "./webpack-app/client/Reading/components/annotation/AnnotationManager/AnnotationManager.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('section-manager', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/annotation/SectionManager/SectionManager.vue */ "./webpack-app/client/Reading/components/annotation/SectionManager/SectionManager.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('search-manager', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/search/SearchManager/SearchManager.vue */ "./webpack-app/client/Reading/components/search/SearchManager/SearchManager.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('search-input', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/search/SearchManager/SearchInput/SearchInput.vue */ "./webpack-app/client/Reading/components/search/SearchManager/SearchInput/SearchInput.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('reading-instruction', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/ui/ReadingInstruction/ReadingInstruction.vue */ "./webpack-app/client/Reading/components/ui/ReadingInstruction/ReadingInstruction.vue"))
})

//Vue.component('compact-navigation', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/ui-navigation/CompactNavigation/CompactNavigation.vue'))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('navigation-header-item', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/ui-navigation/NavigationHeaderItem/NavigationHeaderItem.vue */ "./webpack-app/client/Reading/components/ui-navigation/NavigationHeaderItem/NavigationHeaderItem.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('about-item', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/ui-navigation/AboutItem/AboutItem.vue */ "./webpack-app/client/Reading/components/ui-navigation/AboutItem/AboutItem.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-type-filter', () => {
  return Promise.all(/*! import() | client-components/ReadingComponents */[__webpack_require__.e("vendors~client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/Loading~client-components/ReadingComponents"), __webpack_require__.e("client-components/ReadingComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/search/AnnotationTypeFilter/AnnotationTypeFilter.vue */ "./webpack-app/client/Reading/components/search/AnnotationTypeFilter/AnnotationTypeFilter.vue"))
})


/***/ }),

/***/ "./webpack-app/client/local-global-static-components.js":
/*!**************************************************************!*\
  !*** ./webpack-app/client/local-global-static-components.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */



//import NotificationManager from './Reading/components/manager/NotificationManager/NotificationManager.vue'
//Vue.component('notification-manager', NotificationManager)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('notification-manager', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/manager/NotificationManager/NotificationManager.vue */ "./webpack-app/client/Reading/components/manager/NotificationManager/NotificationManager.vue"))
})

//import NotificationIcon from './Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue'
//Vue.component('notification-icon', NotificationIcon)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('notification-icon', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue */ "./webpack-app/client/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue"))
})

//import UserFilter from './Reading/components/search/UserFilter/UserFilter.vue'
//Vue.component('user-filter', UserFilter)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-filter', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/search/UserFilter/UserFilter.vue */ "./webpack-app/client/Reading/components/search/UserFilter/UserFilter.vue"))
})

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-filter', () => {
  return Promise.all(/*! import() | client-components/GlobalComponents */[__webpack_require__.e("vendors~client-components/GlobalComponents"), __webpack_require__.e("client-components/GlobalComponents")]).then(__webpack_require__.bind(null, /*! ./Reading/components/search/UserFilter/UserFilter.vue */ "./webpack-app/client/Reading/components/search/UserFilter/UserFilter.vue"))
})

/***/ })

/******/ });
//# sourceMappingURL=client.js.map