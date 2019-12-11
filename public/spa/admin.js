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
/******/ 		"admin": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"admin-components/domain":"admin-components/domain","admin-components/material":"admin-components/material","admin-components/referer":"admin-components/referer","admin-components/user-dashboard":"admin-components/user-dashboard","admin-components/webpage":"admin-components/webpage","admin-components/webpage-dashboard":"admin-components/webpage-dashboard","vendors/HTMLEditor":"vendors/HTMLEditor","vendors/semantic-ui-niwsf":"vendors/semantic-ui-niwsf"}[chunkId]||chunkId) + ".js"
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
/******/ 	__webpack_require__.p = "http://127.0.0.1:3333/spa/";
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
/******/ 	deferredModules.push(["./webpack-app/admin.js","vendors","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CLogin%5CLogin.vue":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CLogin%5CLogin.vue ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{"Authentication failed.":"驗證失敗。","Username":"使用者名稱","Password":"密碼","Login":"登入"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/NavigationItems/NavigationItems.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CNavigationItems%5CNavigationItems.vue":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/NavigationItems/NavigationItems.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CNavigationItems%5CNavigationItems.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/manager/TableOfContents/TableOfContents.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CTableOfContents%5CTableOfContents.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/manager/TableOfContents/TableOfContents.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CTableOfContents%5CTableOfContents.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/TableOfContents/tocbot/tocbot.less":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/manager/TableOfContents/tocbot/tocbot.less ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "#tocbotNavContainer {\n  padding-top: calc(60px + 1rem);\n  right: 1rem;\n  max-height: calc(100vh - 60px - 1rem);\n  width: 200px;\n  font-family: 'Noto Sans CJK TC Light', 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;\n}\n#tocbotNavContainer.toc {\n  overflow-y: auto;\n}\n#tocbotNavContainer.toc > .toc-list {\n  overflow: hidden;\n  position: relative;\n}\n#tocbotNavContainer.toc > .toc-list li {\n  list-style: none;\n}\n#tocbotNavContainer .toc-list {\n  margin: 0;\n  padding-left: 10px;\n}\n#tocbotNavContainer a.toc-link {\n  color: currentColor;\n  height: 100%;\n  text-decoration: none;\n  line-height: 200%;\n}\n#tocbotNavContainer .is-collapsible {\n  max-height: 1000px;\n  overflow: hidden;\n  transition: all 300ms ease-in-out;\n}\n#tocbotNavContainer .is-collapsed {\n  max-height: 0;\n}\n#tocbotNavContainer.is-position-fixed {\n  position: fixed;\n  top: 0;\n  right: 0;\n  z-index: 1;\n}\n#tocbotNavContainer .is-active-link {\n  font-weight: 700;\n}\n#tocbotNavContainer .toc-link::before {\n  background-color: #EEE;\n  content: ' ';\n  display: inline-block;\n  height: inherit;\n  left: 0;\n  margin-top: -1px;\n  position: absolute;\n  width: 4px;\n}\n#tocbotNavContainer .is-active-link::before {\n  background-color: #21ba45;\n}\n.non-invasive-web-style-framework.tocbot {\n  max-width: calc(100% - 200px);\n}\n@media (max-width: calc(200px * 3)) {\n  .non-invasive-web-style-framework.tocbot {\n    max-width: 100%;\n  }\n  #tocbotNavContainer {\n    position: static !important;\n    padding-top: 0 !important;\n  }\n}\n", "",{"version":3,"sources":["tocbot.less"],"names":[],"mappings":"AAAA;EACE,8BAA8B;EAC9B,WAAW;EACX,qCAAqC;EACrC,YAAY;EACZ,6FAA6F;AAC/F;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,SAAS;EACT,kBAAkB;AACpB;AACA;EACE,mBAAmB;EACnB,YAAY;EACZ,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,iCAAiC;AACnC;AACA;EACE,aAAa;AACf;AACA;EACE,eAAe;EACf,MAAM;EACN,QAAQ;EACR,UAAU;AACZ;AACA;EACE,gBAAgB;AAClB;AACA;EACE,sBAAsB;EACtB,YAAY;EACZ,qBAAqB;EACrB,eAAe;EACf,OAAO;EACP,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;AACZ;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,6BAA6B;AAC/B;AACA;EACE;IACE,eAAe;EACjB;EACA;IACE,2BAA2B;IAC3B,yBAAyB;EAC3B;AACF","file":"tocbot.less","sourcesContent":["#tocbotNavContainer {\n  padding-top: calc(60px + 1rem);\n  right: 1rem;\n  max-height: calc(100vh - 60px - 1rem);\n  width: 200px;\n  font-family: 'Noto Sans CJK TC Light', 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;\n}\n#tocbotNavContainer.toc {\n  overflow-y: auto;\n}\n#tocbotNavContainer.toc > .toc-list {\n  overflow: hidden;\n  position: relative;\n}\n#tocbotNavContainer.toc > .toc-list li {\n  list-style: none;\n}\n#tocbotNavContainer .toc-list {\n  margin: 0;\n  padding-left: 10px;\n}\n#tocbotNavContainer a.toc-link {\n  color: currentColor;\n  height: 100%;\n  text-decoration: none;\n  line-height: 200%;\n}\n#tocbotNavContainer .is-collapsible {\n  max-height: 1000px;\n  overflow: hidden;\n  transition: all 300ms ease-in-out;\n}\n#tocbotNavContainer .is-collapsed {\n  max-height: 0;\n}\n#tocbotNavContainer.is-position-fixed {\n  position: fixed;\n  top: 0;\n  right: 0;\n  z-index: 1;\n}\n#tocbotNavContainer .is-active-link {\n  font-weight: 700;\n}\n#tocbotNavContainer .toc-link::before {\n  background-color: #EEE;\n  content: ' ';\n  display: inline-block;\n  height: inherit;\n  left: 0;\n  margin-top: -1px;\n  position: absolute;\n  width: 4px;\n}\n#tocbotNavContainer .is-active-link::before {\n  background-color: #21ba45;\n}\n.non-invasive-web-style-framework.tocbot {\n  max-width: calc(100% - 200px);\n}\n@media (max-width: calc(200px * 3)) {\n  .non-invasive-web-style-framework.tocbot {\n    max-width: 100%;\n  }\n  #tocbotNavContainer {\n    position: static !important;\n    padding-top: 0 !important;\n  }\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".item.title[data-v-9eabb7c6] {\n  font-size: 20px;\n  font-weight: bold;\n  padding-top: 0;\n  padding-bottom: 0;\n  max-width: calc(100vw - 40rem);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n", "",{"version":3,"sources":["NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,iBAAiB;EACjB,cAAc;EACd,iBAAiB;EACjB,8BAA8B;EAC9B,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB","file":"NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true&","sourcesContent":[".item.title[data-v-9eabb7c6] {\n  font-size: 20px;\n  font-weight: bold;\n  padding-top: 0;\n  padding-bottom: 0;\n  max-width: calc(100vw - 40rem);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "#tocbotNavContainer.is-position-fixed[data-v-72d37120] {\n  background-color: white;\n}\n", "",{"version":3,"sources":["TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,uBAAuB;AACzB","file":"TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true&","sourcesContent":["#tocbotNavContainer.is-position-fixed[data-v-72d37120] {\n  background-color: white;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/Auth/Auth.html?vue&type=template&id=f0fd87fa&":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/Auth/Auth.html?vue&type=template&id=f0fd87fa& ***!
  \*****************************************************************************************************************************************************/
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
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/Login/Login.html?vue&type=template&id=0860ce57&scoped=true&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/Login/Login.html?vue&type=template&id=0860ce57&scoped=true& ***!
  \*******************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "ui field" }, [
      _c("label", { attrs: { for: "loginDomain" } }, [
        _vm._v("\r\n      " + _vm._s(_vm.$t("Domain")) + "\r\n    ")
      ]),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.domain,
            expression: "domain"
          }
        ],
        attrs: { type: "text", id: "loginDomain" },
        domProps: { value: _vm.domain },
        on: {
          keyup: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.login($event)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.domain = $event.target.value
          }
        }
      })
    ]),
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
          keyup: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.login($event)
          },
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
          keyup: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.login($event)
          },
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
          staticClass: "ui button login-submit",
          class: { disabled: !_vm.isLoginEnable },
          attrs: { type: "button" },
          on: { click: _vm.login }
        },
        [_vm._v("\r\n      " + _vm._s(_vm.$t("Login")) + "\r\n    ")]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/NavigationItems/NavigationItems.html?vue&type=template&id=9eabb7c6&scoped=true&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/NavigationItems/NavigationItems.html?vue&type=template&id=9eabb7c6&scoped=true& ***!
  \***************************************************************************************************************************************************************************************/
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
    [
      _c("navigation", {
        ref: "nav",
        attrs: { config: _vm.config, compactWidth: "600" },
        scopedSlots: _vm._u([
          {
            key: "header",
            fn: function() {
              return [
                _c(
                  "a",
                  {
                    staticClass: "item avatar in-top",
                    attrs: { href: "/admin/" }
                  },
                  [_c("img", { attrs: { src: _vm.status.avatar } })]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "item title in-top" }, [
                  _vm._v(
                    "\r\n        " + _vm._s(_vm.status.title) + "\r\n      "
                  )
                ])
              ]
            },
            proxy: true
          },
          {
            key: "items",
            fn: function() {
              return [
                _vm.status.role === "global_admin"
                  ? _c(
                      "a",
                      {
                        staticClass: "item",
                        class: {
                          "active disabled": _vm.$route.path.startsWith(
                            "/domain"
                          )
                        },
                        attrs: { href: "#/domain/list" }
                      },
                      [
                        _vm._v(
                          "\r\n        " +
                            _vm._s(_vm.$t("Domain")) +
                            "\r\n      "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.status.role === "domain_admin"
                  ? _c(
                      "a",
                      {
                        staticClass: "item",
                        class: {
                          "active disabled": _vm.$route.path.startsWith(
                            "/domain"
                          )
                        },
                        attrs: { href: "#/webpage/" }
                      },
                      [
                        _vm._v(
                          "\r\n        " +
                            _vm._s(_vm.$t("Webpage")) +
                            "\r\n      "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.status.role === "global_admin"
                  ? _c(
                      "a",
                      {
                        staticClass: "item",
                        class: {
                          "active disabled": _vm.$route.path.startsWith(
                            "/material"
                          )
                        },
                        attrs: { href: "#/material" }
                      },
                      [
                        _vm._v(
                          "\r\n        " +
                            _vm._s(_vm.$t("Material")) +
                            "\r\n      "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.status.role === "global_admin"
                  ? _c(
                      "a",
                      {
                        staticClass: "item",
                        attrs: {
                          href: "/admin/Database/admin?table=webpages",
                          target: "_blank"
                        }
                      },
                      [
                        _vm._v(
                          "\r\n        " +
                            _vm._s(_vm.$t("Database")) +
                            "\r\n      "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c("a", { staticClass: "item", on: { click: _vm.logout } }, [
                  _vm._v(
                    "\r\n        " + _vm._s(_vm.$t("Logout")) + "\r\n      "
                  )
                ]),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "item",
                    attrs: {
                      href: "https://github.com/pulipulichen/PACOR",
                      target: "PACOR"
                    }
                  },
                  [
                    _vm._v(
                      "\r\n        " + _vm._s(_vm.$t("Project")) + "\r\n      "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "item",
                    attrs: {
                      href: "https://github.com/pulipulichen/PACOR/issues",
                      target: "PACORIssues"
                    }
                  },
                  [
                    _vm._v(
                      "\r\n        " + _vm._s(_vm.$t("Issues")) + "\r\n      "
                    )
                  ]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=ce94c290&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=ce94c290&scoped=true& ***!
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
  return _vm.webpage
    ? _c(
        "div",
        { staticClass: "WebpageConfigEditor" },
        [
          _c(
            "span",
            {
              staticClass: "ui icon button",
              attrs: { title: _vm.computedButtonTitle },
              on: {
                click: function($event) {
                  return _vm.editConfigOpen()
                }
              }
            },
            [_c("i", { staticClass: "cog icon" })]
          ),
          _vm._v(" "),
          _c("modal", {
            ref: "ModelEditConfig",
            attrs: {
              config: _vm.config,
              status: _vm.status,
              lib: _vm.lib,
              reset: _vm.editingConfig
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "header",
                  fn: function() {
                    return [
                      _c(
                        "a",
                        {
                          staticClass: "ui button",
                          attrs: {
                            href: "/admin/Database/admin?table=domains",
                            target: "_blank"
                          }
                        },
                        [
                          _vm._v(
                            "\r\n        " +
                              _vm._s(_vm.$t("DATABASE")) +
                              "\r\n      "
                          )
                        ]
                      ),
                      _vm._v(
                        "\r\n      # " +
                          _vm._s(_vm.webpage.id) +
                          "\r\n      " +
                          _vm._s(_vm.webpage.url) +
                          "\r\n      " +
                          _vm._s(_vm.title) +
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
                      _c("div", { staticClass: "ui field" }, [
                        _c("label", [
                          _vm._v(
                            "\r\n          " +
                              _vm._s(_vm.$t("Edit Config")) +
                              "\r\n          (" +
                              _vm._s(_vm.$t("JSON format.")) +
                              "\r\n          "
                          ),
                          _c(
                            "a",
                            {
                              attrs: {
                                href:
                                  "https://github.com/pulipulichen/PACOR/blob/master/help/ConfigExample.md",
                                target: "_blank"
                              }
                            },
                            [
                              _vm._v(
                                "\r\n            " +
                                  _vm._s(_vm.$t("Example")) +
                                  "\r\n          "
                              )
                            ]
                          ),
                          _vm._v(")\r\n        ")
                        ]),
                        _vm._v(" "),
                        _c("textarea", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.configString,
                              expression: "configString"
                            }
                          ],
                          domProps: { value: _vm.configString },
                          on: {
                            input: [
                              function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.configString = $event.target.value
                              },
                              function($event) {
                                _vm.editingConfig.isChanged = true
                              }
                            ]
                          }
                        })
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
                        {
                          staticClass: "ui button",
                          class: {
                            disabled: !(_vm.editingConfig.isChanged === true)
                          },
                          on: { click: _vm.editConfigSubmit }
                        },
                        [_vm._v(_vm._s(_vm.$t("OK")))]
                      )
                    ]
                  },
                  proxy: true
                }
              ],
              null,
              false,
              3603043520
            )
          })
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=0babe072&scoped=true&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=0babe072&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************/
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
  return _vm.webpage
    ? _c(
        "div",
        { staticClass: "WebpageGroupEditor" },
        [
          _c(
            "span",
            {
              staticClass: "ui right labeled icon button",
              attrs: { title: _vm.computedButtonTitle },
              on: {
                click: function($event) {
                  return _vm.editGroupsOpen()
                }
              }
            },
            [
              _vm._v(
                "\r\n    " +
                  _vm._s(_vm.webpage.usersCount) +
                  "\r\n    " +
                  _vm._s(_vm.$t("Readers", _vm.webpage.usersCount)) +
                  "\r\n    /\r\n    " +
                  _vm._s(_vm.webpage.groupsCount) +
                  "\r\n    " +
                  _vm._s(_vm.$t("Groups", _vm.webpage.groupsCount)) +
                  "\r\n    "
              ),
              _c("i", { staticClass: "edit icon" })
            ]
          ),
          _vm._v(" "),
          _c("modal", {
            ref: "ModelEditGroups",
            attrs: {
              config: _vm.config,
              status: _vm.status,
              lib: _vm.lib,
              reset: _vm.editingGroups
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "header",
                  fn: function() {
                    return [
                      _c(
                        "a",
                        {
                          staticClass: "ui button",
                          attrs: {
                            href: "/admin/Database/admin?table=users",
                            target: "_blank"
                          }
                        },
                        [
                          _vm._v(
                            "\r\n        " +
                              _vm._s(_vm.$t("DATABASE")) +
                              "\r\n      "
                          )
                        ]
                      ),
                      _vm._v(
                        "\r\n      # " +
                          _vm._s(_vm.editingGroups.id) +
                          "\r\n      " +
                          _vm._s(_vm.editingGroups.url) +
                          "\r\n      " +
                          _vm._s(_vm.title) +
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
                      _c("div", { staticClass: "ui field" }, [
                        _c("label", [
                          _vm._v(
                            "\r\n          " +
                              _vm._s(_vm.$t("Edit Groups")) +
                              "\r\n          (" +
                              _vm._s(
                                _vm.$t(
                                  "each group per line. Readers in group is splited by space."
                                )
                              ) +
                              "\r\n          "
                          ),
                          _c(
                            "a",
                            {
                              attrs: {
                                href:
                                  "https://github.com/pulipulichen/PACOR/blob/master/help/GroupsExample.md",
                                target: "_blank"
                              }
                            },
                            [_vm._v(_vm._s(_vm.$t("Example")))]
                          ),
                          _vm._v(")\r\n        ")
                        ]),
                        _vm._v(" "),
                        _c("textarea", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.editingGroups.groups,
                              expression: "editingGroups.groups"
                            }
                          ],
                          domProps: { value: _vm.editingGroups.groups },
                          on: {
                            input: [
                              function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.editingGroups,
                                  "groups",
                                  $event.target.value
                                )
                              },
                              function($event) {
                                _vm.editingGroups.isChanged = true
                              }
                            ]
                          }
                        })
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
                        {
                          staticClass: "ui button",
                          class: {
                            disabled: !(_vm.editingGroups.isChanged === true)
                          },
                          on: { click: _vm.editGroupsSubmit }
                        },
                        [_vm._v(_vm._s(_vm.$t("OK")))]
                      )
                    ]
                  },
                  proxy: true
                }
              ],
              null,
              false,
              2264056311
            )
          })
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/manager/TableOfContents/TableOfContents.html?vue&type=template&id=72d37120&scoped=true&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/manager/TableOfContents/TableOfContents.html?vue&type=template&id=72d37120&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************/
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
  return _c("nav", {
    ref: "toc",
    staticClass:
      "toc toc-right js-toc relative z-1 transition--300 absolute pa4 is-position-fixed",
    attrs: { id: "tocbotNavContainer" }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("6eb7168a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("d97b67f2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("bf87fe6a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("60f9beb6", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("3ad0bf32", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/admin.js":
/*!******************************!*\
  !*** ./webpack-app/admin.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _plugins_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/plugins */ "./webpack-app/plugins/plugins.js");
/* harmony import */ var _styles_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/styles */ "./webpack-app/styles/styles.js");
/* harmony import */ var _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/i18n */ "./webpack-app/plugins/i18n.js");
/* harmony import */ var _admin_global_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin/global-components */ "./webpack-app/admin/global-components.js");
/* harmony import */ var _admin_local_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin/local-components */ "./webpack-app/admin/local-components.js");
/* harmony import */ var _admin_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin/routes */ "./webpack-app/admin/routes.js");
/* harmony import */ var _helpers_AxiosHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/AxiosHelper */ "./webpack-app/helpers/AxiosHelper.js");
/* harmony import */ var _helpers_DayJSHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/DayJSHelper */ "./webpack-app/helpers/DayJSHelper.js");
/* harmony import */ var _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/StringHelper */ "./webpack-app/helpers/StringHelper.js");
/* harmony import */ var _helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/ValidateHelper */ "./webpack-app/helpers/ValidateHelper.js");
/* harmony import */ var _admin_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./admin/Auth/Auth.vue */ "./webpack-app/admin/Auth/Auth.vue");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _admin_admin_tpl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./admin/admin.tpl */ "./webpack-app/admin/admin.tpl");
/* harmony import */ var _admin_admin_tpl__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_admin_admin_tpl__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./config.js */ "./webpack-app/config.js");


// ----------------------------------
// plugins





// --------------------
// Components or routes






// ----------------------------------
// Helpers





// --------------------
// Components



// ----------------------





// -----------------------
// 確認 baseURL

let baseURL = ''
let baseScript = jquery__WEBPACK_IMPORTED_MODULE_12___default()(document.currentScript)
_config_js__WEBPACK_IMPORTED_MODULE_14__["default"].baseURL = baseURL
baseScript.before(`<div id="app"></div>`)

// ---------------
// 錯誤訊息的設置

window.onerror = function(message, source, lineno, colno, error) {
  //console.log(message, source, lineno, colno, error)
  VueController.data.errors.push(error)
}

vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.errorHandler  = function(err, vm, info) {
  //console.log(`Error: ${err.stack}\nInfo: ${info}`);
  VueController.data.errors.push(err)
  console.error(err)
}

// -----------------------

let VueController = {
  data: {
    message: 'Hello, world.', // for test
    users: [],
    config: _config_js__WEBPACK_IMPORTED_MODULE_14__["default"],
    status: {
      role: '',
      username: '',
      displayName: '',
      avatat: '',
      domainID: null,
      needLogin: true,
      title: '',
      webpageURL: ''
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {
      AxiosHelper: _helpers_AxiosHelper__WEBPACK_IMPORTED_MODULE_7__["default"].setBaseURL(baseURL),
      DayJSHelper: _helpers_DayJSHelper__WEBPACK_IMPORTED_MODULE_8__["default"],
      StringHelper: _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_9__["default"],
      ValidateHelper: _helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_10__["default"],
      //toc: TOCHelper,
    },
    //view: 'Loading',
    view: null,
    errors: [],
    persistAttrs: [
    ]
  },
  
  watch: {
    'status.title': function () {
      document.title = this.status.title
    },
    'status.username': function () {
      /*
      let path = '/login'
      if (typeof(this.status.username) === 'string') {
        path = '/chat'
      }
      
      if (this.$router.currentRoute.fullPath !== path) {
        this.$router.replace(path)
      }
       */
    },
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    },
    '$route.query.origin': function () {
      console.log(this.$route.query.origin)
      if (typeof(this.$route.query.origin) === 'string' 
              && this.$route.query.origin !== '') {
        this.loadUsers(this.$route.query.origin)
      }
    }
  },
//  created: function () {
//  },
  mounted: function () {
    if (typeof(this.$route.query.origin) === 'string' 
            && this.$route.query.origin !== '') {
      this.loadUsers(this.$route.query.origin)
    }
    
    this.lib.DayJSHelper.setI18N((name, data) => {
      return this.$t(name, data)
    })
    
    this.lib.AxiosHelper.setErrorHandler((error) => {
      this.errors.push(error)
    })
    
    this.lib.style = this.$refs.style
  },
  methods: {
    loadUsers: async function (origin) {
      let users = await this.lib.AxiosHelper.get('/admin/user/list', {
        origin: origin
      })
      
      if (Array.isArray(users)) {
        this.users = users
      }
    }
  }, // methods: {
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__["default"],
  
  template: _admin_admin_tpl__WEBPACK_IMPORTED_MODULE_13___default.a,
  router: _admin_routes__WEBPACK_IMPORTED_MODULE_6__["default"],
  components: _admin_local_components__WEBPACK_IMPORTED_MODULE_5__["default"],
}

if (typeof(baseURL) === 'string') {
  jquery__WEBPACK_IMPORTED_MODULE_12___default()(() => {
    new vue__WEBPACK_IMPORTED_MODULE_0__["default"](VueController)
  })
}

window.VueController = VueController


/***/ }),

/***/ "./webpack-app/admin/Auth/Auth.html?vue&type=template&id=f0fd87fa&":
/*!*************************************************************************!*\
  !*** ./webpack-app/admin/Auth/Auth.html?vue&type=template&id=f0fd87fa& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_f0fd87fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Auth.html?vue&type=template&id=f0fd87fa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/Auth/Auth.html?vue&type=template&id=f0fd87fa&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_f0fd87fa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_f0fd87fa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/Auth/Auth.js?vue&type=script&lang=js&?9597":
/*!*****************************************************************!*\
  !*** ./webpack-app/admin/Auth/Auth.js?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Auth.js?vue&type=script&lang=js& */ "./webpack-app/admin/Auth/Auth.js?vue&type=script&lang=js&?eb8e");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/Auth/Auth.js?vue&type=script&lang=js&?eb8e":
/*!*****************************************************************!*\
  !*** ./webpack-app/admin/Auth/Auth.js?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Auth = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {
    return {}
  },
  mounted: async function () {
    await this.checkLogin()
    this.progress.display = true
  },
  methods: {
    checkLogin: async function () {
      var result = await this.lib.AxiosHelper.get(`/admin/auth/checkLogin`)
      
      if (typeof(result) !== 'object') {
        return false
        // 不做任何警告
      }
      
      this.status.username = result.username
      this.status.displayName = result.displayName
      this.status.avatar = result.avatar
      this.status.role = result.role
      this.status.domainID = result.domainID
      this.status.needLogin = false
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Auth);

/***/ }),

/***/ "./webpack-app/admin/Auth/Auth.vue":
/*!*****************************************!*\
  !*** ./webpack-app/admin/Auth/Auth.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_html_vue_type_template_id_f0fd87fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auth.html?vue&type=template&id=f0fd87fa& */ "./webpack-app/admin/Auth/Auth.html?vue&type=template&id=f0fd87fa&");
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth.js?vue&type=script&lang=js& */ "./webpack-app/admin/Auth/Auth.js?vue&type=script&lang=js&?9597");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Auth_html_vue_type_template_id_f0fd87fa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Auth_html_vue_type_template_id_f0fd87fa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/Auth/Auth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/Login/Login.html?vue&type=template&id=0860ce57&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./webpack-app/admin/Login/Login.html?vue&type=template&id=0860ce57&scoped=true& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_0860ce57_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Login.html?vue&type=template&id=0860ce57&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/Login/Login.html?vue&type=template&id=0860ce57&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_0860ce57_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_0860ce57_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/Login/Login.js?vue&type=script&lang=js&?3b6f":
/*!*******************************************************************!*\
  !*** ./webpack-app/admin/Login/Login.js?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Login.js?vue&type=script&lang=js& */ "./webpack-app/admin/Login/Login.js?vue&type=script&lang=js&?9e69");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/Login/Login.js?vue&type=script&lang=js&?9e69":
/*!*******************************************************************!*\
  !*** ./webpack-app/admin/Login/Login.js?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      /*
      domain: '',
      username: '',
      password: '',
      */
      domain: '',
      username: 'admin',
      password: 'password',
    }
  },
  computed: {
    isLoginEnable() {
      return (this.username.trim() !== ''
              && this.password.trim() !== '')
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    login: async function() {
      
      let result = await this.lib.AxiosHelper.get(`/admin/auth/login`, {
        domain: this.domain,
        username: this.username,
        password: this.password,
      })
      
      if (typeof(result) !== 'object') {
        //this.errorMessage = this.$t(`Authentication failed.`)
        throw this.$t(`Authentication failed.`)
        return false
      }      
      
      this.status.username = this.username
      this.status.displayName = result.displayName
      this.status.avatar = result.avatar
      this.status.role = result.role
      this.status.domainID = result.domainID
      
      this.status.needLogin = false
      this.reset()
    },
    reset: function () {
      this.username = ''
      this.password = ''
      this.error = ''
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ "./webpack-app/admin/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CLogin%5CLogin.vue":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CLogin%5CLogin.vue ***!
  \****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CLogin%5CLogin.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CLogin%5CLogin.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_0860ce57_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_0860ce57_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_0860ce57_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_0860ce57_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_0860ce57_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_0860ce57_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/Login/Login.vue":
/*!*******************************************!*\
  !*** ./webpack-app/admin/Login/Login.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_html_vue_type_template_id_0860ce57_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.html?vue&type=template&id=0860ce57&scoped=true& */ "./webpack-app/admin/Login/Login.html?vue&type=template&id=0860ce57&scoped=true&");
/* harmony import */ var _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.js?vue&type=script&lang=js& */ "./webpack-app/admin/Login/Login.js?vue&type=script&lang=js&?3b6f");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_less_vue_type_style_index_0_id_0860ce57_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true& */ "./webpack-app/admin/Login/Login.less?vue&type=style&index=0&id=0860ce57&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CLogin%5CLogin.vue */ "./webpack-app/admin/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CLogin%5CLogin.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_html_vue_type_template_id_0860ce57_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_html_vue_type_template_id_0860ce57_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0860ce57",
  null
  
)

/* custom blocks */

if (typeof _Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/Login/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/NavigationItems/NavigationItems.html?vue&type=template&id=9eabb7c6&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./webpack-app/admin/NavigationItems/NavigationItems.html?vue&type=template&id=9eabb7c6&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NavigationItems_html_vue_type_template_id_9eabb7c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NavigationItems.html?vue&type=template&id=9eabb7c6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/NavigationItems/NavigationItems.html?vue&type=template&id=9eabb7c6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NavigationItems_html_vue_type_template_id_9eabb7c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NavigationItems_html_vue_type_template_id_9eabb7c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/NavigationItems/NavigationItems.js?vue&type=script&lang=js&?00e7":
/*!***************************************************************************************!*\
  !*** ./webpack-app/admin/NavigationItems/NavigationItems.js?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NavigationItems_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./NavigationItems.js?vue&type=script&lang=js& */ "./webpack-app/admin/NavigationItems/NavigationItems.js?vue&type=script&lang=js&?012c");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_NavigationItems_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/NavigationItems/NavigationItems.js?vue&type=script&lang=js&?012c":
/*!***************************************************************************************!*\
  !*** ./webpack-app/admin/NavigationItems/NavigationItems.js?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Items = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
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
    logout: async function () {
      await this.lib.AxiosHelper.get(`/admin/auth/logout`)
      this.status.needLogin = true
    },
    showSideMenu: function () {
      this.$refs.nav.showSideMenu()
    },
    hideSideMenu: function () {
      this.$refs.nav.hideSideMenu()
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Items);

/***/ }),

/***/ "./webpack-app/admin/NavigationItems/NavigationItems.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CNavigationItems%5CNavigationItems.vue":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/NavigationItems/NavigationItems.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CNavigationItems%5CNavigationItems.vue ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./NavigationItems.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CNavigationItems%5CNavigationItems.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/NavigationItems/NavigationItems.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CNavigationItems%5CNavigationItems.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_9eabb7c6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_9eabb7c6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_9eabb7c6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_9eabb7c6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_9eabb7c6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NavigationItems_less_vue_type_style_index_0_id_9eabb7c6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/NavigationItems/NavigationItems.vue":
/*!***************************************************************!*\
  !*** ./webpack-app/admin/NavigationItems/NavigationItems.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NavigationItems_html_vue_type_template_id_9eabb7c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavigationItems.html?vue&type=template&id=9eabb7c6&scoped=true& */ "./webpack-app/admin/NavigationItems/NavigationItems.html?vue&type=template&id=9eabb7c6&scoped=true&");
/* harmony import */ var _NavigationItems_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavigationItems.js?vue&type=script&lang=js& */ "./webpack-app/admin/NavigationItems/NavigationItems.js?vue&type=script&lang=js&?00e7");
/* empty/unused harmony star reexport *//* harmony import */ var _NavigationItems_less_vue_type_style_index_0_id_9eabb7c6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true& */ "./webpack-app/admin/NavigationItems/NavigationItems.less?vue&type=style&index=0&id=9eabb7c6&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavigationItems.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CNavigationItems%5CNavigationItems.vue */ "./webpack-app/admin/NavigationItems/NavigationItems.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CNavigationItems%5CNavigationItems.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NavigationItems_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NavigationItems_html_vue_type_template_id_9eabb7c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NavigationItems_html_vue_type_template_id_9eabb7c6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9eabb7c6",
  null
  
)

/* custom blocks */

if (typeof _NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NavigationItems_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CNavigationItems_5CNavigationItems_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/NavigationItems/NavigationItems.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/admin.tpl":
/*!*************************************!*\
  !*** ./webpack-app/admin/admin.tpl ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"non-invasive-web-style-framework\">\r\n  <auth v-bind:config=\"config\"\r\n        v-bind:status=\"status\"\r\n        v-bind:progress=\"progress\"\r\n        v-bind:lib=\"lib\"\r\n        ref=\"auth\"></auth>\r\n\r\n  <template v-if=\"progress.display === true && status.needLogin === false\">\r\n    <navigation-items v-bind:config=\"config\"\r\n                v-bind:status=\"status\"\r\n                v-bind:progress=\"progress\"\r\n                v-bind:lib=\"lib\"></navigation-items>\r\n  </template>\r\n\r\n  <error-handler v-bind:config=\"config\"\r\n                 v-bind:lib=\"lib\"\r\n                 v-bind:errors=\"errors\"\r\n                 ref=\"ErrorHandler\"></error-handler>\r\n\r\n  <StyleManager \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:lib=\"lib\"\r\n    ref=\"style\">\r\n  </StyleManager>\r\n  \r\n  <!-- ========================================== -->\r\n\r\n  <template v-if=\"progress.display === false\">\r\n    <loading></loading>\r\n  </template>\r\n  <template v-else>\r\n    <template v-if=\"status.needLogin === true\">\r\n      <login v-bind:config=\"config\"\r\n             v-bind:status=\"status\"\r\n             v-bind:progress=\"progress\"\r\n             v-bind:lib=\"lib\"></login>\r\n    </template>\r\n    <template v-else>\r\n\r\n      <router-view v-bind:config=\"config\"\r\n                   v-bind:status=\"status\"\r\n                   v-bind:progress=\"progress\"\r\n                   v-bind:lib=\"lib\"></router-view>\r\n    </template>\r\n  </template>\r\n  \r\n  \r\n</div>";

/***/ }),

/***/ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=ce94c290&scoped=true&":
/*!******************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=ce94c290&scoped=true& ***!
  \******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageConfigEditor_html_vue_type_template_id_ce94c290_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./WebpageConfigEditor.html?vue&type=template&id=ce94c290&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=ce94c290&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageConfigEditor_html_vue_type_template_id_ce94c290_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageConfigEditor_html_vue_type_template_id_ce94c290_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js&?3f5c":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebpageConfigEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./WebpageConfigEditor.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js&?fd43");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_WebpageConfigEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js&?fd43":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let WebpageConfigEditor = {
  props: ['lib', 'status', 'config'
            , 'webpage'],
  data() {
    this.$i18n.locale = this.config.locale
    
    //console.log(this.webpage.config)
    let configString = ''
    if (this.webpage 
            && this.webpage.config) {
      configString = JSON.stringify(this.webpage.config, null, 2)
    }
    
    return {
      editingConfig: this.webpage,
      configString
    }
  },
//  components: {
//  },
  computed: {
    title () {
      if (this.webpage.title !== '' 
              && this.webpage.title) {
        return '(' + this.webpage.title + ')'
      }
    },
    uri () {
      if (this.webpage.url) {
        return '/' + this.webpage.url.split('/').slice(3).join('/')
      }
    },
    computedButtonTitle () {
      let title = [
        this.$t('Edit config of')
        , '# ' + this.webpage.id
        , this.uri
      ]
      
      if (this.title) {
        title.push(this.title)
      }
      
      return title.join(' ').trim()
    }
  },
  watch: {
    webpage (webpage) {
      
      let configString = ''
      if (webpage 
              && webpage.config) {
        configString = JSON.stringify(webpage.config, null, 2)
      }
      
      this.editingConfig = webpage,
      this.configString = configString
    }
  },
//  mounted() {
//  },
  methods: {
    editConfigOpen: function () {
      this.$refs.ModelEditConfig.show()
    },
    editConfigSubmit: async function () {
      this.$refs.ModelEditConfig.hide()

      let webpage = this.editingConfig
      let data = {
        id: webpage.id
      }

      
      try {
        //data.config = JSON.parse(webpage.config)
        eval(`data.config = ${this.configString}`)
      } 
      catch (e) {
        console.log(e)
      }
      
      console.log(data)

      if (typeof (data.config) !== 'object'
              && data.config) {
        return false
      }


      await this.lib.AxiosHelper.post('/Admin/Webpage/editConfig', data)

      // 關閉Modal
      //console.log(data)
      webpage.config = data.config
      this.$emit('change', webpage)
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (WebpageConfigEditor);

/***/ }),

/***/ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_ce94c290_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_ce94c290_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_ce94c290_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_ce94c290_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_ce94c290_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_ce94c290_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.vue":
/*!**********************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.vue ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebpageConfigEditor_html_vue_type_template_id_ce94c290_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebpageConfigEditor.html?vue&type=template&id=ce94c290&scoped=true& */ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=ce94c290&scoped=true&");
/* harmony import */ var _WebpageConfigEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebpageConfigEditor.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js&?3f5c");
/* empty/unused harmony star reexport *//* harmony import */ var _WebpageConfigEditor_less_vue_type_style_index_0_id_ce94c290_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true& */ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=ce94c290&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml */ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WebpageConfigEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WebpageConfigEditor_html_vue_type_template_id_ce94c290_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WebpageConfigEditor_html_vue_type_template_id_ce94c290_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ce94c290",
  null
  
)

/* custom blocks */

if (typeof _WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=0babe072&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=0babe072&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageGroupEditor_html_vue_type_template_id_0babe072_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./WebpageGroupEditor.html?vue&type=template&id=0babe072&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=0babe072&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageGroupEditor_html_vue_type_template_id_0babe072_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageGroupEditor_html_vue_type_template_id_0babe072_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js&?6c82":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebpageGroupEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./WebpageGroupEditor.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js&?dfa8");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_WebpageGroupEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js&?dfa8":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let WebpageGroupEditor = {
  props: ['lib', 'status', 'config'
    , 'webpage'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      editingGroups: this.webpage
    }
  },
//  components: {
//  },
  computed: {
    title () {
      if (this.editingGroups.title !== '' 
              && this.editingGroups.title) {
        return '(' + this.editingGroups.title + ')'
      }
    },
    uri () {
      if (this.webpage.url) {
        return '/' + this.webpage.url.split('/').slice(3).join('/')
      }
    },
    computedButtonTitle () {
      let title = [
        this.$t('Edit groups of')
        , '# ' + this.webpage.id
        , this.uri
      ]
      
      if (this.title) {
        title.push(this.title)
      }
      
      return title.join(' ').trim()
    }
  },
  watch: {
    webpage (webpage) {
      this.editingGroups = webpage
    }
  },
//  mounted() {
//  },
  methods: {
    editGroupsOpen: function () {
      //console.log(domain)
      //this.editingGroups = this.webpage
      this.$refs.ModelEditGroups.show()
    },
    editGroupsSubmit: async function () {
      let webpage = this.editingGroups
      this.$refs.ModelEditGroups.hide()
      
      let data = {
        id: webpage.id
      }
      
      let usersCount = 0
      if (webpage.groups !== '') {
        data.groups = []
        webpage.groups.trim().split('\n').forEach(line => {
          line = line.trim()
          if (line !== '') {
            let group = line.split(' ')
            group = group.filter(u => u.trim() !== '')
            data.groups.push(group)
            usersCount = usersCount + group.length
          }
        })
      }
      
      if (data.groups.length === 0) {
        return false
      }
      
      webpage.groupsCount = data.groups.length
      webpage.usersCount = usersCount
      
      await this.lib.AxiosHelper.post('/Admin/Webpage/editGroups', data)
      
      this.$emit('change', webpage)
    },
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (WebpageGroupEditor);

/***/ }),

/***/ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_0babe072_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_0babe072_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_0babe072_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_0babe072_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_0babe072_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_0babe072_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.vue":
/*!********************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.vue ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebpageGroupEditor_html_vue_type_template_id_0babe072_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebpageGroupEditor.html?vue&type=template&id=0babe072&scoped=true& */ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=0babe072&scoped=true&");
/* harmony import */ var _WebpageGroupEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebpageGroupEditor.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js&?6c82");
/* empty/unused harmony star reexport *//* harmony import */ var _WebpageGroupEditor_less_vue_type_style_index_0_id_0babe072_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true& */ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=0babe072&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml */ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WebpageGroupEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WebpageGroupEditor_html_vue_type_template_id_0babe072_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WebpageGroupEditor_html_vue_type_template_id_0babe072_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0babe072",
  null
  
)

/* custom blocks */

if (typeof _WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/global-components.js":
/*!************************************************!*\
  !*** ./webpack-app/admin/global-components.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _components_ui_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/ui/Pagination/Pagination.vue */ "./webpack-app/components/ui/Pagination/Pagination.vue");
/* harmony import */ var _components_ui_modal_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../components/ui-modal/Modal/Modal.vue */ "./webpack-app/components/ui-modal/Modal/Modal.vue");
/* harmony import */ var _components_reading_progress_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../components/reading-progress/StepProgressBar/StepProgressBar.vue */ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.vue");
/* harmony import */ var _components_ui_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/ui/Navigation/Navigation.vue */ "./webpack-app/components/ui/Navigation/Navigation.vue");
/* harmony import */ var _components_manager_TableOfContents_TableOfContents_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/manager/TableOfContents/TableOfContents.vue */ "./webpack-app/components/manager/TableOfContents/TableOfContents.vue");
/* harmony import */ var _components_WebpageConfigEditor_WebpageConfigEditor_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/WebpageConfigEditor/WebpageConfigEditor.vue */ "./webpack-app/admin/components/WebpageConfigEditor/WebpageConfigEditor.vue");
/* harmony import */ var _components_WebpageGroupEditor_WebpageGroupEditor_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/WebpageGroupEditor/WebpageGroupEditor.vue */ "./webpack-app/admin/components/WebpageGroupEditor/WebpageGroupEditor.vue");



vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('pagination', _components_ui_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('modal', _components_ui_modal_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('step-progress-bar', _components_reading_progress_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_3__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('navigation', _components_ui_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_4__["default"])

//import HTMLEditor from './../components/HTMLEditor/HTMLEditor.vue'
//Vue.component('HTMLEditor', HTMLEditor)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('HTMLEditor', () => Promise.all(/*! import() | vendors/HTMLEditor */[__webpack_require__.e("vendors"), __webpack_require__.e("vendors/HTMLEditor")]).then(__webpack_require__.bind(null, /*! ./../components/annotation/HTMLEditor/HTMLEditor.vue */ "./webpack-app/components/annotation/HTMLEditor/HTMLEditor.vue")))


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('table-of-contents', _components_manager_TableOfContents_TableOfContents_vue__WEBPACK_IMPORTED_MODULE_5__["default"])

// ----------------------


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('webpage-config-editor', _components_WebpageConfigEditor_WebpageConfigEditor_vue__WEBPACK_IMPORTED_MODULE_6__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('webpage-group-editor', _components_WebpageGroupEditor_WebpageGroupEditor_vue__WEBPACK_IMPORTED_MODULE_7__["default"])

/***/ }),

/***/ "./webpack-app/admin/local-components.js":
/*!***********************************************!*\
  !*** ./webpack-app/admin/local-components.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_manager_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/manager/ErrorHandler/ErrorHandler.vue */ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.vue");
/* harmony import */ var _Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth/Auth.vue */ "./webpack-app/admin/Auth/Auth.vue");
/* harmony import */ var _Login_Login_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login/Login.vue */ "./webpack-app/admin/Login/Login.vue");
/* harmony import */ var _NavigationItems_NavigationItems_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NavigationItems/NavigationItems.vue */ "./webpack-app/admin/NavigationItems/NavigationItems.vue");
/* harmony import */ var _components_ui_modal_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/ui-modal/Loading/Loading.vue */ "./webpack-app/components/ui-modal/Loading/Loading.vue");
/* harmony import */ var _components_manager_StyleManager_StyleManager_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/manager/StyleManager/StyleManager.vue */ "./webpack-app/components/manager/StyleManager/StyleManager.vue");







let components = {
  Loading: _components_ui_modal_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
  'error-handler': _components_manager_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  Auth: _Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  Login: _Login_Login_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  NavigationItems: _NavigationItems_NavigationItems_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
  StyleManager: _components_manager_StyleManager_StyleManager_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
}

/* harmony default export */ __webpack_exports__["default"] = (components);

/***/ }),

/***/ "./webpack-app/admin/routes.js":
/*!*************************************!*\
  !*** ./webpack-app/admin/routes.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"])

const routes = [
  { path: '/', redirect: '/domain/list' },
  //{ path: '/domain/list/:page?', component: () => import(/* webpackChunkName: "admin-components/domain" */ './components/DomainList/DomainList.vue') },
  //{ path: '/domain/add', component: () => import(/* webpackChunkName: "admin-components/domain" */ './components/DomainAdd/DomainAdd.vue') },
  { path: '/referer/', component: () => __webpack_require__.e(/*! import() | admin-components/referer */ "admin-components/referer").then(__webpack_require__.bind(null, /*! ./RefererRedirect/RefererRedirect.vue */ "./webpack-app/admin/RefererRedirect/RefererRedirect.vue")) },
  { path: '/material/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/material */ "admin-components/material").then(__webpack_require__.bind(null, /*! ./Material/Material.vue */ "./webpack-app/admin/Material/Material.vue")) },
  { path: '/domain/:action/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/domain */ "admin-components/domain").then(__webpack_require__.bind(null, /*! ./Domain/Domain.vue */ "./webpack-app/admin/Domain/Domain.vue")) },
  { path: '/webpage/:domainID?/:action?/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/webpage */ "admin-components/webpage").then(__webpack_require__.bind(null, /*! ./Webpage/Webpage.vue */ "./webpack-app/admin/Webpage/Webpage.vue")) },
  { path: '/webpage-dashboard/:webpageID/:action?/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/webpage-dashboard */ "admin-components/webpage-dashboard").then(__webpack_require__.bind(null, /*! ./WebpageDashboard/WebpageDashboard.vue */ "./webpack-app/admin/WebpageDashboard/WebpageDashboard.vue")) },
  { path: '/user-dashboard/:webpageID/:userID/:action?/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/user-dashboard */ "admin-components/user-dashboard").then(__webpack_require__.bind(null, /*! ./UserDashboard/UserDashboard.vue */ "./webpack-app/admin/UserDashboard/UserDashboard.vue")) },
]

/* harmony default export */ __webpack_exports__["default"] = (new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  routes: routes
}));


/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/TableOfContents.html?vue&type=template&id=72d37120&scoped=true&":
/*!************************************************************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/TableOfContents.html?vue&type=template&id=72d37120&scoped=true& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_TableOfContents_html_vue_type_template_id_72d37120_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./TableOfContents.html?vue&type=template&id=72d37120&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/manager/TableOfContents/TableOfContents.html?vue&type=template&id=72d37120&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_TableOfContents_html_vue_type_template_id_72d37120_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_TableOfContents_html_vue_type_template_id_72d37120_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/TableOfContents.js?vue&type=script&lang=js&?b994":
/*!****************************************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/TableOfContents.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tocbot_tocbot_webpack_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tocbot/tocbot.webpack.js */ "./webpack-app/components/manager/TableOfContents/tocbot/tocbot.webpack.js");


let TableOfContent = {
  props: ['lib', 'config', 'headings'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      inited: false,
      rootContainer: null,
      container: null
    }
  },
  /*
  components: {
  },
  computed: {
  },
  watch: {
  },
  */
  mounted() {
    this.init()
  },
  destroyed () {
    this.inited = false
    _tocbot_tocbot_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].destroy()
    //console.log('reset')
    this.removeContainer()
  },
  methods: {
    init: function () {
      this.initContainer()
      let options = this.initOptions()
      setTimeout(() => {
        //console.log(options)
        _tocbot_tocbot_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(options)
        //console.trace('inited')
      }, 0)
    },
    initOptions: function () {
      let options = this.options
      let height = this.config.styleConfig.TopMenuHeight
      if (height.endsWith('px')) {
        height = height.slice(0, -2)
      }
      if (typeof(height) === 'string'){
        height = parseInt(height, 10)
      }

      let defaultOptions = {
        // Where to render the table of contents.
        tocSelector: '.js-toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '.non-invasive-web-style-framework',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: this.headings,
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
        fixedSidebarOffset: height,
      }
      /*
      if (options !== undefined && typeof(options) === 'object') {
        for (let name in options) {
          defaultOptions[name] = options[name]
        }
      }
      */
      return defaultOptions
    },
    initContainer: function () {
      //this.container = window.$(this.$refs.toc)
      //container.prependTo('body')

      this.rootContainer = window.$('.non-invasive-web-style-framework:first')
      this.rootContainer.addClass('tocbot')
    },
    removeContainer: function () {
      //this.container.remove()
      this.rootContainer.removeClass('tocbot')
    },
    
    refresh: function () {
      setTimeout(() => {
        _tocbot_tocbot_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].refresh()
        //console.log('refresh')
      }, 0)
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (TableOfContent);

/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/TableOfContents.js?vue&type=script&lang=js&?d655":
/*!****************************************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/TableOfContents.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TableOfContents_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./TableOfContents.js?vue&type=script&lang=js& */ "./webpack-app/components/manager/TableOfContents/TableOfContents.js?vue&type=script&lang=js&?b994");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_TableOfContents_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true&":
/*!***************************************************************************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_TableOfContents_less_vue_type_style_index_0_id_72d37120_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_TableOfContents_less_vue_type_style_index_0_id_72d37120_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_TableOfContents_less_vue_type_style_index_0_id_72d37120_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_TableOfContents_less_vue_type_style_index_0_id_72d37120_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_TableOfContents_less_vue_type_style_index_0_id_72d37120_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_TableOfContents_less_vue_type_style_index_0_id_72d37120_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/TableOfContents.vue":
/*!****************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/TableOfContents.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TableOfContents_html_vue_type_template_id_72d37120_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableOfContents.html?vue&type=template&id=72d37120&scoped=true& */ "./webpack-app/components/manager/TableOfContents/TableOfContents.html?vue&type=template&id=72d37120&scoped=true&");
/* harmony import */ var _TableOfContents_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TableOfContents.js?vue&type=script&lang=js& */ "./webpack-app/components/manager/TableOfContents/TableOfContents.js?vue&type=script&lang=js&?d655");
/* empty/unused harmony star reexport *//* harmony import */ var _TableOfContents_less_vue_type_style_index_0_id_72d37120_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true& */ "./webpack-app/components/manager/TableOfContents/TableOfContents.less?vue&type=style&index=0&id=72d37120&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TableOfContents.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CTableOfContents%5CTableOfContents.vue&lang=yaml */ "./webpack-app/components/manager/TableOfContents/TableOfContents.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CTableOfContents%5CTableOfContents.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TableOfContents_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TableOfContents_html_vue_type_template_id_72d37120_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TableOfContents_html_vue_type_template_id_72d37120_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "72d37120",
  null
  
)

/* custom blocks */

if (typeof _TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/manager/TableOfContents/TableOfContents.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/TableOfContents.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CTableOfContents%5CTableOfContents.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/TableOfContents.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CTableOfContents%5CTableOfContents.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./TableOfContents.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CTableOfContents%5CTableOfContents.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/manager/TableOfContents/TableOfContents.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CTableOfContents%5CTableOfContents.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_TableOfContents_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CTableOfContents_5CTableOfContents_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/tocbot/tocbot.less":
/*!***************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/tocbot/tocbot.less ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./tocbot.less */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/TableOfContents/tocbot/tocbot.less");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("3c23dfb7", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/tocbot/tocbot.min.js":
/*!*****************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/tocbot/tocbot.min.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

!function(e){function t(o){if(n[o])return n[o].exports;var l=n[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){(function(o){var l,i,s;!function(n,o){i=[],l=o(n),void 0!==(s="function"==typeof l?l.apply(t,i):l)&&(e.exports=s)}(void 0!==o?o:this.window||this.global,function(e){"use strict";function t(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t];for(var o in n)m.call(n,o)&&(e[o]=n[o])}return e}function o(e,t,n){t||(t=250);var o,l;return function(){var i=n||this,s=+new Date,r=arguments;o&&s<o+t?(clearTimeout(l),l=setTimeout(function(){o=s,e.apply(i,r)},t)):(o=s,e.apply(i,r))}}var l,i,s=n(2),r={},c={},a=n(3),u=n(4);if("undefined"!=typeof window){var d,f=!!e.document.querySelector&&!!e.addEventListener,m=Object.prototype.hasOwnProperty;return c.destroy=function(){try{document.querySelector(r.tocSelector).innerHTML=""}catch(e){console.warn("Element not found: "+r.tocSelector)}document.removeEventListener("scroll",this._scrollListener,!1),document.removeEventListener("resize",this._scrollListener,!1),l&&document.removeEventListener("click",this._clickListener,!1)},c.init=function(e){if(f&&(r=t(s,e||{}),this.options=r,this.state={},r.scrollSmooth&&(r.duration=r.scrollSmoothDuration,c.scrollSmooth=n(5).initSmoothScrolling(r)),l=a(r),i=u(r),this._buildHtml=l,this._parseContent=i,c.destroy(),null!==(d=i.selectHeadings(r.contentSelector,r.headingSelector)))){var m=i.nestHeadingsArray(d),h=m.nest;l.render(r.tocSelector,h),this._scrollListener=o(function(e){l.updateToc(d);var t=e&&e.target&&e.target.scrollingElement&&0===e.target.scrollingElement.scrollTop;(e&&(0===e.eventPhase||null===e.currentTarget)||t)&&(l.updateToc(d),r.scrollEndCallback&&r.scrollEndCallback(e))},r.throttleTimeout),this._scrollListener(),document.addEventListener("scroll",this._scrollListener,!1),document.addEventListener("resize",this._scrollListener,!1);var p=null;return this._clickListener=o(function(e){r.scrollSmooth&&l.disableTocAnimation(e),l.updateToc(d),p&&clearTimeout(p),p=setTimeout(function(){l.enableTocAnimation()},r.scrollSmoothDuration)},r.throttleTimeout),document.addEventListener("click",this._clickListener,!1),this}},c.refresh=function(e){c.destroy(),c.init(e||this.options)},e.tocbot=c,c}})}).call(t,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){e.exports={tocSelector:".js-toc",contentSelector:".js-toc-content",headingSelector:"h1, h2, h3",ignoreSelector:".js-toc-ignore",linkClass:"toc-link",extraLinkClasses:"",activeLinkClass:"is-active-link",listClass:"toc-list",extraListClasses:"",isCollapsedClass:"is-collapsed",collapsibleClass:"is-collapsible",listItemClass:"toc-list-item",activeListItemClass:"is-active-li",collapseDepth:0,scrollSmooth:!0,scrollSmoothDuration:420,scrollEndCallback:function(e){},headingsOffset:1,throttleTimeout:50,positionFixedSelector:null,positionFixedClass:"is-position-fixed",fixedSidebarOffset:"auto",includeHtml:!1,onClick:!1,orderedList:!0}},function(e,t){e.exports=function(e){function t(e,n){var i=n.appendChild(o(e));if(e.children.length){var s=l(e.isCollapsed);e.children.forEach(function(e){t(e,s)}),i.appendChild(s)}}function n(e,n){var o=l(!1);n.forEach(function(e){t(e,o)});var i=document.querySelector(e);if(null!==i)return i.firstChild&&i.removeChild(i.firstChild),0===n.length?i:i.appendChild(o)}function o(t){var n=document.createElement("li"),o=document.createElement("a");return e.listItemClass&&n.setAttribute("class",e.listItemClass),e.onClick&&(o.onclick=e.onClick),e.includeHtml&&t.childNodes.length?u.call(t.childNodes,function(e){o.appendChild(e.cloneNode(!0))}):o.textContent=t.textContent,o.setAttribute("href","#"+t.id),o.setAttribute("class",e.linkClass+h+"node-name--"+t.nodeName+h+e.extraLinkClasses),n.appendChild(o),n}function l(t){var n=e.orderedList?"ol":"ul",o=document.createElement(n),l=e.listClass+h+e.extraListClasses;return t&&(l+=h+e.collapsibleClass,l+=h+e.isCollapsedClass),o.setAttribute("class",l),o}function i(){var t=document.documentElement.scrollTop||f.scrollTop,n=document.querySelector(e.positionFixedSelector);"auto"===e.fixedSidebarOffset&&(e.fixedSidebarOffset=document.querySelector(e.tocSelector).offsetTop),t>e.fixedSidebarOffset?-1===n.className.indexOf(e.positionFixedClass)&&(n.className+=h+e.positionFixedClass):n.className=n.className.split(h+e.positionFixedClass).join("")}function s(t){var n=document.documentElement.scrollTop||f.scrollTop;e.positionFixedSelector&&i();var o,l=t;if(m&&null!==document.querySelector(e.tocSelector)&&l.length>0){d.call(l,function(t,i){if(t.offsetTop>n+e.headingsOffset+10){return o=l[0===i?i:i-1],!0}if(i===l.length-1)return o=l[l.length-1],!0});var s=document.querySelector(e.tocSelector).querySelectorAll("."+e.linkClass);u.call(s,function(t){t.className=t.className.split(h+e.activeLinkClass).join("")});var c=document.querySelector(e.tocSelector).querySelectorAll("."+e.listItemClass);u.call(c,function(t){t.className=t.className.split(h+e.activeListItemClass).join("")});var a=document.querySelector(e.tocSelector).querySelector("."+e.linkClass+".node-name--"+o.nodeName+'[href="#'+o.id+'"]');-1===a.className.indexOf(e.activeLinkClass)&&(a.className+=h+e.activeLinkClass);var p=a.parentNode;p&&-1===p.className.indexOf(e.activeListItemClass)&&(p.className+=h+e.activeListItemClass);var C=document.querySelector(e.tocSelector).querySelectorAll("."+e.listClass+"."+e.collapsibleClass);u.call(C,function(t){-1===t.className.indexOf(e.isCollapsedClass)&&(t.className+=h+e.isCollapsedClass)}),a.nextSibling&&-1!==a.nextSibling.className.indexOf(e.isCollapsedClass)&&(a.nextSibling.className=a.nextSibling.className.split(h+e.isCollapsedClass).join("")),r(a.parentNode.parentNode)}}function r(t){return-1!==t.className.indexOf(e.collapsibleClass)&&-1!==t.className.indexOf(e.isCollapsedClass)?(t.className=t.className.split(h+e.isCollapsedClass).join(""),r(t.parentNode.parentNode)):t}function c(t){var n=t.target||t.srcElement;"string"==typeof n.className&&-1!==n.className.indexOf(e.linkClass)&&(m=!1)}function a(){m=!0}var u=[].forEach,d=[].some,f=document.body,m=!0,h=" ";return{enableTocAnimation:a,disableTocAnimation:c,render:n,updateToc:s}}},function(e,t){e.exports=function(e){function t(e){return e[e.length-1]}function n(e){return+e.nodeName.split("H").join("")}function o(t){var o={id:t.id,children:[],nodeName:t.nodeName,headingLevel:n(t),textContent:t.textContent.trim()};return e.includeHtml&&(o.childNodes=t.childNodes),o}function l(l,i){for(var s=o(l),r=n(l),c=i,a=t(c),u=a?a.headingLevel:0,d=r-u;d>0;)a=t(c),a&&void 0!==a.children&&(c=a.children),d--;return r>=e.collapseDepth&&(s.isCollapsed=!0),c.push(s),c}function i(t,n){var o=n;e.ignoreSelector&&(o=n.split(",").map(function(t){return t.trim()+":not("+e.ignoreSelector+")"}));try{return document.querySelector(t).querySelectorAll(o)}catch(e){return console.warn("Element not found: "+t),null}}function s(e){return r.call(e,function(e,t){return l(o(t),e.nest),e},{nest:[]})}var r=[].reduce;return{nestHeadingsArray:s,selectHeadings:i}}},function(e,t){function n(e){function t(e){return"a"===e.tagName.toLowerCase()&&(e.hash.length>0||"#"===e.href.charAt(e.href.length-1))&&(n(e.href)===s||n(e.href)+"#"===s)}function n(e){return e.slice(0,e.lastIndexOf("#"))}function l(e){var t=document.getElementById(e.substring(1));t&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())}!function(){document.documentElement.style}();var i=e.duration,s=location.hash?n(location.href):location.href;!function(){function n(n){!t(n.target)||n.target.className.indexOf("no-smooth-scroll")>-1||"#"===n.target.href.charAt(n.target.href.length-2)&&"!"===n.target.href.charAt(n.target.href.length-1)||-1===n.target.className.indexOf(e.linkClass)||o(n.target.hash,{duration:i,callback:function(){l(n.target.hash)}})}document.body.addEventListener("click",n,!1)}()}function o(e,t){function n(e){s=e-i,window.scrollTo(0,c.easing(s,r,u,d)),s<d?requestAnimationFrame(n):o()}function o(){window.scrollTo(0,r+u),"function"==typeof c.callback&&c.callback()}function l(e,t,n,o){return(e/=o/2)<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)}var i,s,r=window.pageYOffset,c={duration:t.duration,offset:t.offset||0,callback:t.callback,easing:t.easing||l},a=document.querySelector('[id="'+decodeURI(e).split("#").join("")+'"]'),u="string"==typeof e?c.offset+(e?a&&a.getBoundingClientRect().top||0:-(document.documentElement.scrollTop||document.body.scrollTop)):e,d="function"==typeof c.duration?c.duration(u):c.duration;requestAnimationFrame(function(e){i=e,n(e)})}t.initSmoothScrolling=n}]);

/***/ }),

/***/ "./webpack-app/components/manager/TableOfContents/tocbot/tocbot.webpack.js":
/*!*********************************************************************************!*\
  !*** ./webpack-app/components/manager/TableOfContents/tocbot/tocbot.webpack.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tocbot_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tocbot.min.js */ "./webpack-app/components/manager/TableOfContents/tocbot/tocbot.min.js");
/* harmony import */ var _tocbot_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tocbot_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tocbot_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tocbot.less */ "./webpack-app/components/manager/TableOfContents/tocbot/tocbot.less");
/* harmony import */ var _tocbot_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tocbot_less__WEBPACK_IMPORTED_MODULE_1__);


//import './styles.css'

/* harmony default export */ __webpack_exports__["default"] = (window.tocbot);

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map