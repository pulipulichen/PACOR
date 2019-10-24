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
/******/ 		return __webpack_require__.p + "" + ({"admin-components/domain":"admin-components/domain","admin-components/material":"admin-components/material","admin-components/webpage":"admin-components/webpage","admin-components/webpage-dashboard":"admin-components/webpage-dashboard","vendors/semantic-ui-niwsf":"vendors/semantic-ui-niwsf"}[chunkId]||chunkId) + ".js"
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

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CLogin%5CLogin.vue":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CLogin%5CLogin.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{"Authentication failed.":"驗證失敗。","Username":"使用者名稱","Password":"密碼","Login":"登入"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/Navigation/Items/Items.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CItems%5CItems.vue":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/components/Navigation/Items/Items.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CItems%5CItems.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/Navigation/Navigation.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CNavigation.vue":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/components/Navigation/Navigation.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CNavigation.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js?!./webpack-app/helpers/TOCHelper/tocbot/tocbot.less":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/helpers/TOCHelper/tocbot/tocbot.less ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "#tocbotNavContainer {\n  padding-top: calc(60px + 1rem);\n  right: 1rem;\n  max-height: calc(100vh - 60px - 1rem);\n  width: 200px;\n  font-family: 'Noto Sans CJK TC Light', 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;\n}\n#tocbotNavContainer.toc {\n  overflow-y: auto;\n}\n#tocbotNavContainer.toc > .toc-list {\n  overflow: hidden;\n  position: relative;\n}\n#tocbotNavContainer.toc > .toc-list li {\n  list-style: none;\n}\n#tocbotNavContainer .toc-list {\n  margin: 0;\n  padding-left: 10px;\n}\n#tocbotNavContainer a.toc-link {\n  color: currentColor;\n  height: 100%;\n  text-decoration: none;\n  line-height: 200%;\n}\n#tocbotNavContainer .is-collapsible {\n  max-height: 1000px;\n  overflow: hidden;\n  transition: all 300ms ease-in-out;\n}\n#tocbotNavContainer .is-collapsed {\n  max-height: 0;\n}\n#tocbotNavContainer.is-position-fixed {\n  position: fixed;\n  top: 0;\n  right: 0;\n  z-index: 1;\n}\n#tocbotNavContainer .is-active-link {\n  font-weight: 700;\n}\n#tocbotNavContainer .toc-link::before {\n  background-color: #EEE;\n  content: ' ';\n  display: inline-block;\n  height: inherit;\n  left: 0;\n  margin-top: -1px;\n  position: absolute;\n  width: 4px;\n}\n#tocbotNavContainer .is-active-link::before {\n  background-color: #21ba45;\n}\n.non-invasive-web-style-framework.tocbot {\n  max-width: calc(100% - 200px);\n}\n@media (max-width: calc(200px * 3)) {\n  .non-invasive-web-style-framework.tocbot {\n    max-width: 100%;\n  }\n  #tocbotNavContainer {\n    position: static !important;\n  }\n}\n", "",{"version":3,"sources":["tocbot.less"],"names":[],"mappings":"AAAA;EACE,8BAA8B;EAC9B,WAAW;EACX,qCAAqC;EACrC,YAAY;EACZ,6FAA6F;AAC/F;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,SAAS;EACT,kBAAkB;AACpB;AACA;EACE,mBAAmB;EACnB,YAAY;EACZ,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,iCAAiC;AACnC;AACA;EACE,aAAa;AACf;AACA;EACE,eAAe;EACf,MAAM;EACN,QAAQ;EACR,UAAU;AACZ;AACA;EACE,gBAAgB;AAClB;AACA;EACE,sBAAsB;EACtB,YAAY;EACZ,qBAAqB;EACrB,eAAe;EACf,OAAO;EACP,gBAAgB;EAChB,kBAAkB;EAClB,UAAU;AACZ;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,6BAA6B;AAC/B;AACA;EACE;IACE,eAAe;EACjB;EACA;IACE,2BAA2B;EAC7B;AACF","file":"tocbot.less","sourcesContent":["#tocbotNavContainer {\n  padding-top: calc(60px + 1rem);\n  right: 1rem;\n  max-height: calc(100vh - 60px - 1rem);\n  width: 200px;\n  font-family: 'Noto Sans CJK TC Light', 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;\n}\n#tocbotNavContainer.toc {\n  overflow-y: auto;\n}\n#tocbotNavContainer.toc > .toc-list {\n  overflow: hidden;\n  position: relative;\n}\n#tocbotNavContainer.toc > .toc-list li {\n  list-style: none;\n}\n#tocbotNavContainer .toc-list {\n  margin: 0;\n  padding-left: 10px;\n}\n#tocbotNavContainer a.toc-link {\n  color: currentColor;\n  height: 100%;\n  text-decoration: none;\n  line-height: 200%;\n}\n#tocbotNavContainer .is-collapsible {\n  max-height: 1000px;\n  overflow: hidden;\n  transition: all 300ms ease-in-out;\n}\n#tocbotNavContainer .is-collapsed {\n  max-height: 0;\n}\n#tocbotNavContainer.is-position-fixed {\n  position: fixed;\n  top: 0;\n  right: 0;\n  z-index: 1;\n}\n#tocbotNavContainer .is-active-link {\n  font-weight: 700;\n}\n#tocbotNavContainer .toc-link::before {\n  background-color: #EEE;\n  content: ' ';\n  display: inline-block;\n  height: inherit;\n  left: 0;\n  margin-top: -1px;\n  position: absolute;\n  width: 4px;\n}\n#tocbotNavContainer .is-active-link::before {\n  background-color: #21ba45;\n}\n.non-invasive-web-style-framework.tocbot {\n  max-width: calc(100% - 200px);\n}\n@media (max-width: calc(200px * 3)) {\n  .non-invasive-web-style-framework.tocbot {\n    max-width: 100%;\n  }\n  #tocbotNavContainer {\n    position: static !important;\n  }\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".close.item[data-v-05077283] {\n  cursor: pointer;\n  height: 3rem;\n  line-height: inherit;\n  border-bottom: 1px solid #ccc;\n}\n.item.title[data-v-05077283] {\n  font-size: 20px;\n  font-weight: bold;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n@media screen and (min-width: 600px) {\n.menu-compact.right.menu[data-v-05077283] {\n    display: none !important;\n}\n}\n@media screen and (max-width: 600px) {\n.menu-full.right.menu[data-v-05077283] {\n    display: none !important;\n}\n}\n", "",{"version":3,"sources":["Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,YAAY;EACZ,oBAAoB;EACpB,6BAA6B;AAC/B;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,cAAc;EACd,iBAAiB;AACnB;AACA;AACA;IACI,wBAAwB;AAC5B;AACA;AACA;AACA;IACI,wBAAwB;AAC5B;AACA","file":"Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true&","sourcesContent":[".close.item[data-v-05077283] {\n  cursor: pointer;\n  height: 3rem;\n  line-height: inherit;\n  border-bottom: 1px solid #ccc;\n}\n.item.title[data-v-05077283] {\n  font-size: 20px;\n  font-weight: bold;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n@media screen and (min-width: 600px) {\n.menu-compact.right.menu[data-v-05077283] {\n    display: none !important;\n}\n}\n@media screen and (max-width: 600px) {\n.menu-full.right.menu[data-v-05077283] {\n    display: none !important;\n}\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".placeholder[data-v-4a021392] {\n  padding-top: 60px;\n}\n.vertical.menu[data-v-4a021392] {\n  z-index: 103 !important;\n}\n.vertical.menu.hide[data-v-4a021392] {\n  display: none !important;\n}\n.top.menu[data-v-4a021392]  .in-vertical {\n  display: none !important;\n}\n.vertical.menu[data-v-4a021392]  .menu-compact {\n  display: none !important;\n}\n.vertical.menu[data-v-4a021392]  .right.menu > .item {\n  line-height: 3rem;\n  color: white !important;\n}\n.vertical.menu[data-v-4a021392]  .menu-full {\n  display: block !important;\n}\n.vertical.menu[data-v-4a021392]  .menu-full {\n  display: block !important;\n}\n.vertical.menu[data-v-4a021392]  .in-top {\n  display: none !important;\n}\n/*\n@media screen and (min-width: @TopMenuMinWidth) {\n  \n}\n*/\n@media screen and (max-width: 600px) {\n.placeholder[data-v-4a021392] {\n    padding-top: 0;\n}\n}\n.overlay[data-v-4a021392] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(255, 255, 255, 0.7);\n  z-index: 102;\n}\n", "",{"version":3,"sources":["Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,iBAAiB;AACnB;AACA;EACE,uBAAuB;AACzB;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,iBAAiB;EACjB,uBAAuB;AACzB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,wBAAwB;AAC1B;AACA;;;;CAIC;AACD;AACA;IACI,cAAc;AAClB;AACA;AACA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,0CAA0C;EAC1C,YAAY;AACd","file":"Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true&","sourcesContent":[".placeholder[data-v-4a021392] {\n  padding-top: 60px;\n}\n.vertical.menu[data-v-4a021392] {\n  z-index: 103 !important;\n}\n.vertical.menu.hide[data-v-4a021392] {\n  display: none !important;\n}\n.top.menu[data-v-4a021392]  .in-vertical {\n  display: none !important;\n}\n.vertical.menu[data-v-4a021392]  .menu-compact {\n  display: none !important;\n}\n.vertical.menu[data-v-4a021392]  .right.menu > .item {\n  line-height: 3rem;\n  color: white !important;\n}\n.vertical.menu[data-v-4a021392]  .menu-full {\n  display: block !important;\n}\n.vertical.menu[data-v-4a021392]  .menu-full {\n  display: block !important;\n}\n.vertical.menu[data-v-4a021392]  .in-top {\n  display: none !important;\n}\n/*\n@media screen and (min-width: @TopMenuMinWidth) {\n  \n}\n*/\n@media screen and (max-width: 600px) {\n.placeholder[data-v-4a021392] {\n    padding-top: 0;\n}\n}\n.overlay[data-v-4a021392] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(255, 255, 255, 0.7);\n  z-index: 102;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Auth/Auth.html?vue&type=template&id=1b581e5c&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/components/Auth/Auth.html?vue&type=template&id=1b581e5c& ***!
  \****************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Login/Login.html?vue&type=template&id=09598b66&scoped=true&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/components/Login/Login.html?vue&type=template&id=09598b66&scoped=true& ***!
  \******************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Navigation/Items/Items.html?vue&type=template&id=05077283&scoped=true&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/components/Navigation/Items/Items.html?vue&type=template&id=05077283&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************/
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
  return _c("fragment", [
    _c(
      "div",
      {
        staticClass: "item in-vertical close",
        on: { click: _vm.hideSideMenu }
      },
      [_c("i", { staticClass: "close icon" })]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "item avatar in-top" }, [
      _c("img", { attrs: { src: _vm.status.avatar } })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "item title in-top" }, [
      _vm._v("\r\n    " + _vm._s(_vm.status.title) + "\r\n  ")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "menu-full right menu" }, [
      _vm.status.role === "global_admin"
        ? _c(
            "a",
            {
              staticClass: "item",
              class: {
                "active disabled": _vm.$route.path.startsWith("/domain")
              },
              attrs: { href: "#/domain/list" }
            },
            [_vm._v("\r\n     " + _vm._s(_vm.$t("Domain")) + "\r\n    ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.status.role === "domain_admin"
        ? _c(
            "a",
            {
              staticClass: "item",
              class: {
                "active disabled": _vm.$route.path.startsWith("/domain")
              },
              attrs: { href: "#/webpage/" }
            },
            [_vm._v("\r\n     " + _vm._s(_vm.$t("Webpage")) + "\r\n    ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.status.role === "global_admin"
        ? _c(
            "a",
            {
              staticClass: "item",
              class: {
                "active disabled": _vm.$route.path.startsWith("/material")
              },
              attrs: { href: "#/material" }
            },
            [_vm._v("\r\n     " + _vm._s(_vm.$t("Material")) + "\r\n    ")]
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
            [_vm._v("\r\n     " + _vm._s(_vm.$t("Database")) + "\r\n    ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _c("a", { staticClass: "item", on: { click: _vm.logout } }, [
        _vm._v("\r\n     " + _vm._s(_vm.$t("Logout")) + "\r\n    ")
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
        [_vm._v("\r\n     " + _vm._s(_vm.$t("Project")) + "\r\n    ")]
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
        [_vm._v("\r\n     " + _vm._s(_vm.$t("Issues")) + "\r\n    ")]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "menu-compact right menu" }, [
      _c("a", { staticClass: "icon item", on: { click: _vm.showSideMenu } }, [
        _c("i", { staticClass: "ellipsis vertical icon" })
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Navigation/Navigation.html?vue&type=template&id=4a021392&scoped=true&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/components/Navigation/Navigation.html?vue&type=template&id=4a021392&scoped=true& ***!
  \****************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "placeholder" }, [
    _c(
      "div",
      { staticClass: "ui inverted top fixed menu" },
      [
        _c("items", {
          attrs: {
            config: _vm.config,
            status: _vm.status,
            progress: _vm.progress,
            error: _vm.error,
            lib: _vm.lib
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "ui inverted right fixed vertical menu",
        class: { hide: !_vm.sideMenuDisplay }
      },
      [
        _c("items", {
          attrs: {
            config: _vm.config,
            status: _vm.status,
            progress: _vm.progress,
            error: _vm.error,
            lib: _vm.lib
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _vm.sideMenuDisplay ? _c("div", { staticClass: "overlay" }) : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("41d8d35c", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("6f626ce2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("5dcd07cc", content, false, {});
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
/* harmony import */ var _styles_semantic_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/semantic-ui */ "./webpack-app/styles/semantic-ui.js");
/* harmony import */ var _styles_semantic_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_semantic_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/i18n */ "./webpack-app/plugins/i18n.js");
/* harmony import */ var _admin_global_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin/global-components */ "./webpack-app/admin/global-components.js");
/* harmony import */ var _admin_local_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin/local-components */ "./webpack-app/admin/local-components.js");
/* harmony import */ var _admin_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin/routes */ "./webpack-app/admin/routes.js");
/* harmony import */ var _helpers_AxiosHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/AxiosHelper */ "./webpack-app/helpers/AxiosHelper.js");
/* harmony import */ var _helpers_DayJSHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/DayJSHelper */ "./webpack-app/helpers/DayJSHelper.js");
/* harmony import */ var _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/StringHelper */ "./webpack-app/helpers/StringHelper.js");
/* harmony import */ var _helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/ValidateHelper */ "./webpack-app/helpers/ValidateHelper.js");
/* harmony import */ var _helpers_TOCHelper_TOCHelper_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/TOCHelper/TOCHelper.js */ "./webpack-app/helpers/TOCHelper/TOCHelper.js");
/* harmony import */ var _admin_components_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./admin/components/Auth/Auth.vue */ "./webpack-app/admin/components/Auth/Auth.vue");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _admin_admin_tpl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./admin/admin.tpl */ "./webpack-app/admin/admin.tpl");
/* harmony import */ var _admin_admin_tpl__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_admin_admin_tpl__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./config.js */ "./webpack-app/config.js");


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

let baseURL = '/'
let baseScript = jquery__WEBPACK_IMPORTED_MODULE_13___default()(document.currentScript)
_config_js__WEBPACK_IMPORTED_MODULE_15__["default"].baseURL = baseURL
baseScript.before(`<div id="app"></div>`)

// ---------------
// 錯誤訊息的設置

window.onerror = function(message, source, lineno, colno, error) {
  //console.log(message, source, lineno, colno, error)
  VueController.data.error = error
}

vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.errorHandler  = function(err, vm, info) {
  //console.log(`Error: ${err.stack}\nInfo: ${info}`);
  VueController.data.error = err
  console.error(err)
}

// -----------------------

let VueController = {
  data: {
    message: 'Hello, world.', // for test
    users: [],
    config: _config_js__WEBPACK_IMPORTED_MODULE_15__["default"],
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
      toc: _helpers_TOCHelper_TOCHelper_js__WEBPACK_IMPORTED_MODULE_11__["default"],
    },
    //view: 'Loading',
    view: null,
    error: '',
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
  created: function () {
  },
  mounted: function () {
    if (typeof(this.$route.query.origin) === 'string' 
            && this.$route.query.origin !== '') {
      this.loadUsers(this.$route.query.origin)
    }
    
    this.lib.DayJSHelper.setI18N((name, data) => {
      return this.$t(name, data)
    })
    
    this.lib.AxiosHelper.setErrorHandler((error) => {
      this.error = error
    })
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
  
  template: _admin_admin_tpl__WEBPACK_IMPORTED_MODULE_14___default.a,
  router: _admin_routes__WEBPACK_IMPORTED_MODULE_6__["default"],
  components: _admin_local_components__WEBPACK_IMPORTED_MODULE_5__["default"],
}

if (typeof(baseURL) === 'string') {
  jquery__WEBPACK_IMPORTED_MODULE_13___default()(() => {
    new vue__WEBPACK_IMPORTED_MODULE_0__["default"](VueController)
  })
}

window.VueController = VueController


/***/ }),

/***/ "./webpack-app/admin/admin.tpl":
/*!*************************************!*\
  !*** ./webpack-app/admin/admin.tpl ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"non-invasive-web-style-framework\">\r\n  <auth v-bind:config=\"config\"\r\n        v-bind:status=\"status\"\r\n        v-bind:progress=\"progress\"\r\n        v-bind:lib=\"lib\"\r\n        v-bind:error=\"error\"\r\n        ref=\"auth\"></auth>\r\n\r\n  <template v-if=\"progress.display === true && status.needLogin === false\">\r\n    <navigation v-bind:config=\"config\"\r\n                v-bind:status=\"status\"\r\n                v-bind:progress=\"progress\"\r\n                v-bind:error=\"error\"\r\n                v-bind:lib=\"lib\"></navigation>\r\n  </template>\r\n\r\n  <error-handler v-bind:config=\"config\"\r\n                 v-bind:error=\"error\"\r\n                 v-bind:lib=\"lib\"\r\n                 ref=\"ErrorHandler\"></error-handler>\r\n\r\n\r\n  <template v-if=\"progress.display === false\">\r\n    <loading></loading>\r\n  </template>\r\n  <template v-else>\r\n    <template v-if=\"status.needLogin === true\">\r\n      <login v-bind:config=\"config\"\r\n             v-bind:status=\"status\"\r\n             v-bind:progress=\"progress\"\r\n             v-bind:error=\"error\"\r\n             v-bind:lib=\"lib\"></login>\r\n    </template>\r\n    <template v-else>\r\n\r\n      <router-view v-bind:config=\"config\"\r\n                   v-bind:status=\"status\"\r\n                   v-bind:progress=\"progress\"\r\n                   v-bind:lib=\"lib\"\r\n                   v-bind:error=\"error\"></router-view>\r\n    </template>\r\n  </template>\r\n</div>";

/***/ }),

/***/ "./webpack-app/admin/components/Auth/Auth.html?vue&type=template&id=1b581e5c&":
/*!************************************************************************************!*\
  !*** ./webpack-app/admin/components/Auth/Auth.html?vue&type=template&id=1b581e5c& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_1b581e5c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Auth.html?vue&type=template&id=1b581e5c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Auth/Auth.html?vue&type=template&id=1b581e5c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_1b581e5c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_1b581e5c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/components/Auth/Auth.js?vue&type=script&lang=js&?74c7":
/*!****************************************************************************!*\
  !*** ./webpack-app/admin/components/Auth/Auth.js?vue&type=script&lang=js& ***!
  \****************************************************************************/
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

/***/ "./webpack-app/admin/components/Auth/Auth.js?vue&type=script&lang=js&?fd88":
/*!****************************************************************************!*\
  !*** ./webpack-app/admin/components/Auth/Auth.js?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Auth.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Auth/Auth.js?vue&type=script&lang=js&?74c7");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/components/Auth/Auth.vue":
/*!****************************************************!*\
  !*** ./webpack-app/admin/components/Auth/Auth.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_html_vue_type_template_id_1b581e5c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auth.html?vue&type=template&id=1b581e5c& */ "./webpack-app/admin/components/Auth/Auth.html?vue&type=template&id=1b581e5c&");
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Auth/Auth.js?vue&type=script&lang=js&?fd88");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Auth_html_vue_type_template_id_1b581e5c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Auth_html_vue_type_template_id_1b581e5c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/components/Auth/Auth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/components/Login/Login.html?vue&type=template&id=09598b66&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Login/Login.html?vue&type=template&id=09598b66&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_09598b66_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Login.html?vue&type=template&id=09598b66&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Login/Login.html?vue&type=template&id=09598b66&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_09598b66_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_09598b66_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/components/Login/Login.js?vue&type=script&lang=js&?94e0":
/*!******************************************************************************!*\
  !*** ./webpack-app/admin/components/Login/Login.js?vue&type=script&lang=js& ***!
  \******************************************************************************/
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
        this.error = this.$t(`Authentication failed.`)
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

/***/ "./webpack-app/admin/components/Login/Login.js?vue&type=script&lang=js&?a084":
/*!******************************************************************************!*\
  !*** ./webpack-app/admin/components/Login/Login.js?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Login.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Login/Login.js?vue&type=script&lang=js&?94e0");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CLogin%5CLogin.vue":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CLogin%5CLogin.vue ***!
  \****************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CLogin%5CLogin.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CLogin%5CLogin.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_09598b66_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_09598b66_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_09598b66_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_09598b66_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_09598b66_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_09598b66_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/Login/Login.vue":
/*!******************************************************!*\
  !*** ./webpack-app/admin/components/Login/Login.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_html_vue_type_template_id_09598b66_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.html?vue&type=template&id=09598b66&scoped=true& */ "./webpack-app/admin/components/Login/Login.html?vue&type=template&id=09598b66&scoped=true&");
/* harmony import */ var _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Login/Login.js?vue&type=script&lang=js&?a084");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_less_vue_type_style_index_0_id_09598b66_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true& */ "./webpack-app/admin/components/Login/Login.less?vue&type=style&index=0&id=09598b66&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CLogin%5CLogin.vue */ "./webpack-app/admin/components/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CLogin%5CLogin.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_html_vue_type_template_id_09598b66_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_html_vue_type_template_id_09598b66_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "09598b66",
  null
  
)

/* custom blocks */

if (typeof _Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/components/Login/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Items/Items.html?vue&type=template&id=05077283&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Items/Items.html?vue&type=template&id=05077283&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Items_html_vue_type_template_id_05077283_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Items.html?vue&type=template&id=05077283&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Navigation/Items/Items.html?vue&type=template&id=05077283&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Items_html_vue_type_template_id_05077283_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Items_html_vue_type_template_id_05077283_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Items/Items.js?vue&type=script&lang=js&?6828":
/*!*****************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Items/Items.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Items_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Items.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Navigation/Items/Items.js?vue&type=script&lang=js&?9df4");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Items_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Items/Items.js?vue&type=script&lang=js&?9df4":
/*!*****************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Items/Items.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
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
      this.$parent.showSideMenu()
    },
    hideSideMenu: function () {
      this.$parent.hideSideMenu()
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Items);

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Items/Items.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CItems%5CItems.vue":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Items/Items.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CItems%5CItems.vue ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Items.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CItems%5CItems.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/Navigation/Items/Items.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CItems%5CItems.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Items_less_vue_type_style_index_0_id_05077283_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-style-loader!../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Items_less_vue_type_style_index_0_id_05077283_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Items_less_vue_type_style_index_0_id_05077283_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Items_less_vue_type_style_index_0_id_05077283_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Items_less_vue_type_style_index_0_id_05077283_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Items_less_vue_type_style_index_0_id_05077283_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Items/Items.vue":
/*!*****************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Items/Items.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Items_html_vue_type_template_id_05077283_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Items.html?vue&type=template&id=05077283&scoped=true& */ "./webpack-app/admin/components/Navigation/Items/Items.html?vue&type=template&id=05077283&scoped=true&");
/* harmony import */ var _Items_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Items.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Navigation/Items/Items.js?vue&type=script&lang=js&?6828");
/* empty/unused harmony star reexport *//* harmony import */ var _Items_less_vue_type_style_index_0_id_05077283_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true& */ "./webpack-app/admin/components/Navigation/Items/Items.less?vue&type=style&index=0&id=05077283&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Items.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CItems%5CItems.vue */ "./webpack-app/admin/components/Navigation/Items/Items.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CItems%5CItems.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Items_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Items_html_vue_type_template_id_05077283_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Items_html_vue_type_template_id_05077283_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "05077283",
  null
  
)

/* custom blocks */

if (typeof _Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Items_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CItems_5CItems_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/components/Navigation/Items/Items.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Navigation.html?vue&type=template&id=4a021392&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Navigation.html?vue&type=template&id=4a021392&scoped=true& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Navigation_html_vue_type_template_id_4a021392_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Navigation.html?vue&type=template&id=4a021392&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/components/Navigation/Navigation.html?vue&type=template&id=4a021392&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Navigation_html_vue_type_template_id_4a021392_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Navigation_html_vue_type_template_id_4a021392_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Navigation.js?vue&type=script&lang=js&?aa53":
/*!****************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Navigation.js?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navigation_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Navigation.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Navigation/Navigation.js?vue&type=script&lang=js&?c1b8");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Navigation_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Navigation.js?vue&type=script&lang=js&?c1b8":
/*!****************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Navigation.js?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Items_Items_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Items/Items.vue */ "./webpack-app/admin/components/Navigation/Items/Items.vue");


let Navigation = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      sideMenuDisplay: false
    }
  },
  components: {
    'items': _Items_Items_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    showSideMenu: function () {
      this.sideMenuDisplay = true
    },
    hideSideMenu: function () {
      this.sideMenuDisplay = false
    }
    
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Navigation);

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Navigation.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CNavigation.vue":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Navigation.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CNavigation.vue ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Navigation.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CNavigation.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/components/Navigation/Navigation.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CNavigation.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true&":
/*!***************************************************************************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true& ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_less_vue_type_style_index_0_id_4a021392_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_less_vue_type_style_index_0_id_4a021392_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_less_vue_type_style_index_0_id_4a021392_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_less_vue_type_style_index_0_id_4a021392_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_less_vue_type_style_index_0_id_4a021392_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_less_vue_type_style_index_0_id_4a021392_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/components/Navigation/Navigation.vue":
/*!****************************************************************!*\
  !*** ./webpack-app/admin/components/Navigation/Navigation.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navigation_html_vue_type_template_id_4a021392_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navigation.html?vue&type=template&id=4a021392&scoped=true& */ "./webpack-app/admin/components/Navigation/Navigation.html?vue&type=template&id=4a021392&scoped=true&");
/* harmony import */ var _Navigation_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigation.js?vue&type=script&lang=js& */ "./webpack-app/admin/components/Navigation/Navigation.js?vue&type=script&lang=js&?aa53");
/* empty/unused harmony star reexport *//* harmony import */ var _Navigation_less_vue_type_style_index_0_id_4a021392_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true& */ "./webpack-app/admin/components/Navigation/Navigation.less?vue&type=style&index=0&id=4a021392&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Navigation.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CNavigation.vue */ "./webpack-app/admin/components/Navigation/Navigation.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5Ccomponents%5CNavigation%5CNavigation.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Navigation_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Navigation_html_vue_type_template_id_4a021392_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Navigation_html_vue_type_template_id_4a021392_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4a021392",
  null
  
)

/* custom blocks */

if (typeof _Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Navigation_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5Ccomponents_5CNavigation_5CNavigation_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/components/Navigation/Navigation.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

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
/* harmony import */ var _components_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/Pagination/Pagination.vue */ "./webpack-app/components/Pagination/Pagination.vue");
/* harmony import */ var _components_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../components/Modal/Modal.vue */ "./webpack-app/components/Modal/Modal.vue");
/* harmony import */ var _components_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../components/StepProgressBar/StepProgressBar.vue */ "./webpack-app/components/StepProgressBar/StepProgressBar.vue");



vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('pagination', _components_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('modal', _components_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('step-progress-bar', _components_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_3__["default"])

/***/ }),

/***/ "./webpack-app/admin/local-components.js":
/*!***********************************************!*\
  !*** ./webpack-app/admin/local-components.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/ErrorHandler/ErrorHandler.vue */ "./webpack-app/components/ErrorHandler/ErrorHandler.vue");
/* harmony import */ var _components_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Auth/Auth.vue */ "./webpack-app/admin/components/Auth/Auth.vue");
/* harmony import */ var _components_Login_Login_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Login/Login.vue */ "./webpack-app/admin/components/Login/Login.vue");
/* harmony import */ var _components_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Navigation/Navigation.vue */ "./webpack-app/admin/components/Navigation/Navigation.vue");
/* harmony import */ var _components_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/Loading/Loading.vue */ "./webpack-app/components/Loading/Loading.vue");






let components = {
  Loading: _components_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
  'error-handler': _components_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  Auth: _components_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  Login: _components_Login_Login_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  Navigation: _components_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
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
  { path: '/domain/:action/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/domain */ "admin-components/domain").then(__webpack_require__.bind(null, /*! ./components/Domain/Domain.vue */ "./webpack-app/admin/components/Domain/Domain.vue")) },
  { path: '/webpage/:domainID?/:action?/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/webpage */ "admin-components/webpage").then(__webpack_require__.bind(null, /*! ./components/Webpage/Webpage.vue */ "./webpack-app/admin/components/Webpage/Webpage.vue")) },
  { path: '/webpage-dashboard/:webpageID/:action?/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/webpage-dashboard */ "admin-components/webpage-dashboard").then(__webpack_require__.bind(null, /*! ./components/WebpageDashboard/WebpageDashboard.vue */ "./webpack-app/admin/components/WebpageDashboard/WebpageDashboard.vue")) },
  { path: '/material/:page?', component: () => __webpack_require__.e(/*! import() | admin-components/material */ "admin-components/material").then(__webpack_require__.bind(null, /*! ./components/Material/Material.vue */ "./webpack-app/admin/components/Material/Material.vue")) },
]

/* harmony default export */ __webpack_exports__["default"] = (new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  routes: routes
}));


/***/ }),

/***/ "./webpack-app/helpers/TOCHelper/TOCHelper.js":
/*!****************************************************!*\
  !*** ./webpack-app/helpers/TOCHelper/TOCHelper.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tocbot_tocbot_webpack_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tocbot/tocbot.webpack.js */ "./webpack-app/helpers/TOCHelper/tocbot/tocbot.webpack.js");
/* harmony import */ var _TOCHelper_tpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TOCHelper.tpl */ "./webpack-app/helpers/TOCHelper/TOCHelper.tpl");
/* harmony import */ var _TOCHelper_tpl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_TOCHelper_tpl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_style_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../styles/style.config */ "./webpack-app/styles/style.config.js");
/* harmony import */ var _styles_style_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_style_config__WEBPACK_IMPORTED_MODULE_2__);




let inited = false

let rootContainer
let container

let TOCHelper = function (doDestroy) {
  
  let init = (options) => {
    initContainer()
    
    options = initOptions(options)
    setTimeout(() => {
      //console.log(options)
      _tocbot_tocbot_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(options)
      //console.trace('inited')
    }, 0)
  }
  
  let initOptions = (options) => {
    let height = _styles_style_config__WEBPACK_IMPORTED_MODULE_2___default.a.TopMenuHeight
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
      headingSelector: 'h3, h4',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      fixedSidebarOffset: height,
    }
    
    for (let name in options) {
      defaultOptions[name] = options[name]
    }
    
    return defaultOptions
  }
  
  let initContainer = () => {
    container = window.$(_TOCHelper_tpl__WEBPACK_IMPORTED_MODULE_1___default.a)
    container.prependTo('body')
    
    rootContainer = window.$('.non-invasive-web-style-framework:first')
    rootContainer.addClass('tocbot')
  }
  
  let removeContainer = () => {
    container.remove()
    rootContainer.removeClass('tocbot')
  }
  
  let refresh = () => {
    setTimeout(() => {
      _tocbot_tocbot_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].refresh()
      //console.log('refresh')
    }, 0)
  }
  
  let reset = () => {
    inited = false
    _tocbot_tocbot_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].destroy()
    //console.log('reset')
    removeContainer()
  }
  
  
  if (typeof(doDestroy) !== 'undefined'
          && typeof(doDestroy) !== 'object') {
    return reset()
  }
  if (inited === false) {
    init(doDestroy)
    inited = true
  }
  else {
    refresh()
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TOCHelper);

/***/ }),

/***/ "./webpack-app/helpers/TOCHelper/TOCHelper.tpl":
/*!*****************************************************!*\
  !*** ./webpack-app/helpers/TOCHelper/TOCHelper.tpl ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav id=\"tocbotNavContainer\" \n     class=\"toc toc-right js-toc relative z-1 transition--300 absolute pa4 is-position-fixed\"></nav>";

/***/ }),

/***/ "./webpack-app/helpers/TOCHelper/tocbot/tocbot.less":
/*!**********************************************************!*\
  !*** ./webpack-app/helpers/TOCHelper/tocbot/tocbot.less ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./tocbot.less */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js?!./webpack-app/helpers/TOCHelper/tocbot/tocbot.less");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("d58c00d2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/helpers/TOCHelper/tocbot/tocbot.min.js":
/*!************************************************************!*\
  !*** ./webpack-app/helpers/TOCHelper/tocbot/tocbot.min.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

!function(e){function t(o){if(n[o])return n[o].exports;var l=n[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){(function(o){var l,i,s;!function(n,o){i=[],l=o(n),void 0!==(s="function"==typeof l?l.apply(t,i):l)&&(e.exports=s)}(void 0!==o?o:this.window||this.global,function(e){"use strict";function t(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t];for(var o in n)m.call(n,o)&&(e[o]=n[o])}return e}function o(e,t,n){t||(t=250);var o,l;return function(){var i=n||this,s=+new Date,r=arguments;o&&s<o+t?(clearTimeout(l),l=setTimeout(function(){o=s,e.apply(i,r)},t)):(o=s,e.apply(i,r))}}var l,i,s=n(2),r={},c={},a=n(3),u=n(4);if("undefined"!=typeof window){var d,f=!!e.document.querySelector&&!!e.addEventListener,m=Object.prototype.hasOwnProperty;return c.destroy=function(){try{document.querySelector(r.tocSelector).innerHTML=""}catch(e){console.warn("Element not found: "+r.tocSelector)}document.removeEventListener("scroll",this._scrollListener,!1),document.removeEventListener("resize",this._scrollListener,!1),l&&document.removeEventListener("click",this._clickListener,!1)},c.init=function(e){if(f&&(r=t(s,e||{}),this.options=r,this.state={},r.scrollSmooth&&(r.duration=r.scrollSmoothDuration,c.scrollSmooth=n(5).initSmoothScrolling(r)),l=a(r),i=u(r),this._buildHtml=l,this._parseContent=i,c.destroy(),null!==(d=i.selectHeadings(r.contentSelector,r.headingSelector)))){var m=i.nestHeadingsArray(d),h=m.nest;l.render(r.tocSelector,h),this._scrollListener=o(function(e){l.updateToc(d);var t=e&&e.target&&e.target.scrollingElement&&0===e.target.scrollingElement.scrollTop;(e&&(0===e.eventPhase||null===e.currentTarget)||t)&&(l.updateToc(d),r.scrollEndCallback&&r.scrollEndCallback(e))},r.throttleTimeout),this._scrollListener(),document.addEventListener("scroll",this._scrollListener,!1),document.addEventListener("resize",this._scrollListener,!1);var p=null;return this._clickListener=o(function(e){r.scrollSmooth&&l.disableTocAnimation(e),l.updateToc(d),p&&clearTimeout(p),p=setTimeout(function(){l.enableTocAnimation()},r.scrollSmoothDuration)},r.throttleTimeout),document.addEventListener("click",this._clickListener,!1),this}},c.refresh=function(e){c.destroy(),c.init(e||this.options)},e.tocbot=c,c}})}).call(t,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){e.exports={tocSelector:".js-toc",contentSelector:".js-toc-content",headingSelector:"h1, h2, h3",ignoreSelector:".js-toc-ignore",linkClass:"toc-link",extraLinkClasses:"",activeLinkClass:"is-active-link",listClass:"toc-list",extraListClasses:"",isCollapsedClass:"is-collapsed",collapsibleClass:"is-collapsible",listItemClass:"toc-list-item",activeListItemClass:"is-active-li",collapseDepth:0,scrollSmooth:!0,scrollSmoothDuration:420,scrollEndCallback:function(e){},headingsOffset:1,throttleTimeout:50,positionFixedSelector:null,positionFixedClass:"is-position-fixed",fixedSidebarOffset:"auto",includeHtml:!1,onClick:!1,orderedList:!0}},function(e,t){e.exports=function(e){function t(e,n){var i=n.appendChild(o(e));if(e.children.length){var s=l(e.isCollapsed);e.children.forEach(function(e){t(e,s)}),i.appendChild(s)}}function n(e,n){var o=l(!1);n.forEach(function(e){t(e,o)});var i=document.querySelector(e);if(null!==i)return i.firstChild&&i.removeChild(i.firstChild),0===n.length?i:i.appendChild(o)}function o(t){var n=document.createElement("li"),o=document.createElement("a");return e.listItemClass&&n.setAttribute("class",e.listItemClass),e.onClick&&(o.onclick=e.onClick),e.includeHtml&&t.childNodes.length?u.call(t.childNodes,function(e){o.appendChild(e.cloneNode(!0))}):o.textContent=t.textContent,o.setAttribute("href","#"+t.id),o.setAttribute("class",e.linkClass+h+"node-name--"+t.nodeName+h+e.extraLinkClasses),n.appendChild(o),n}function l(t){var n=e.orderedList?"ol":"ul",o=document.createElement(n),l=e.listClass+h+e.extraListClasses;return t&&(l+=h+e.collapsibleClass,l+=h+e.isCollapsedClass),o.setAttribute("class",l),o}function i(){var t=document.documentElement.scrollTop||f.scrollTop,n=document.querySelector(e.positionFixedSelector);"auto"===e.fixedSidebarOffset&&(e.fixedSidebarOffset=document.querySelector(e.tocSelector).offsetTop),t>e.fixedSidebarOffset?-1===n.className.indexOf(e.positionFixedClass)&&(n.className+=h+e.positionFixedClass):n.className=n.className.split(h+e.positionFixedClass).join("")}function s(t){var n=document.documentElement.scrollTop||f.scrollTop;e.positionFixedSelector&&i();var o,l=t;if(m&&null!==document.querySelector(e.tocSelector)&&l.length>0){d.call(l,function(t,i){if(t.offsetTop>n+e.headingsOffset+10){return o=l[0===i?i:i-1],!0}if(i===l.length-1)return o=l[l.length-1],!0});var s=document.querySelector(e.tocSelector).querySelectorAll("."+e.linkClass);u.call(s,function(t){t.className=t.className.split(h+e.activeLinkClass).join("")});var c=document.querySelector(e.tocSelector).querySelectorAll("."+e.listItemClass);u.call(c,function(t){t.className=t.className.split(h+e.activeListItemClass).join("")});var a=document.querySelector(e.tocSelector).querySelector("."+e.linkClass+".node-name--"+o.nodeName+'[href="#'+o.id+'"]');-1===a.className.indexOf(e.activeLinkClass)&&(a.className+=h+e.activeLinkClass);var p=a.parentNode;p&&-1===p.className.indexOf(e.activeListItemClass)&&(p.className+=h+e.activeListItemClass);var C=document.querySelector(e.tocSelector).querySelectorAll("."+e.listClass+"."+e.collapsibleClass);u.call(C,function(t){-1===t.className.indexOf(e.isCollapsedClass)&&(t.className+=h+e.isCollapsedClass)}),a.nextSibling&&-1!==a.nextSibling.className.indexOf(e.isCollapsedClass)&&(a.nextSibling.className=a.nextSibling.className.split(h+e.isCollapsedClass).join("")),r(a.parentNode.parentNode)}}function r(t){return-1!==t.className.indexOf(e.collapsibleClass)&&-1!==t.className.indexOf(e.isCollapsedClass)?(t.className=t.className.split(h+e.isCollapsedClass).join(""),r(t.parentNode.parentNode)):t}function c(t){var n=t.target||t.srcElement;"string"==typeof n.className&&-1!==n.className.indexOf(e.linkClass)&&(m=!1)}function a(){m=!0}var u=[].forEach,d=[].some,f=document.body,m=!0,h=" ";return{enableTocAnimation:a,disableTocAnimation:c,render:n,updateToc:s}}},function(e,t){e.exports=function(e){function t(e){return e[e.length-1]}function n(e){return+e.nodeName.split("H").join("")}function o(t){var o={id:t.id,children:[],nodeName:t.nodeName,headingLevel:n(t),textContent:t.textContent.trim()};return e.includeHtml&&(o.childNodes=t.childNodes),o}function l(l,i){for(var s=o(l),r=n(l),c=i,a=t(c),u=a?a.headingLevel:0,d=r-u;d>0;)a=t(c),a&&void 0!==a.children&&(c=a.children),d--;return r>=e.collapseDepth&&(s.isCollapsed=!0),c.push(s),c}function i(t,n){var o=n;e.ignoreSelector&&(o=n.split(",").map(function(t){return t.trim()+":not("+e.ignoreSelector+")"}));try{return document.querySelector(t).querySelectorAll(o)}catch(e){return console.warn("Element not found: "+t),null}}function s(e){return r.call(e,function(e,t){return l(o(t),e.nest),e},{nest:[]})}var r=[].reduce;return{nestHeadingsArray:s,selectHeadings:i}}},function(e,t){function n(e){function t(e){return"a"===e.tagName.toLowerCase()&&(e.hash.length>0||"#"===e.href.charAt(e.href.length-1))&&(n(e.href)===s||n(e.href)+"#"===s)}function n(e){return e.slice(0,e.lastIndexOf("#"))}function l(e){var t=document.getElementById(e.substring(1));t&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())}!function(){document.documentElement.style}();var i=e.duration,s=location.hash?n(location.href):location.href;!function(){function n(n){!t(n.target)||n.target.className.indexOf("no-smooth-scroll")>-1||"#"===n.target.href.charAt(n.target.href.length-2)&&"!"===n.target.href.charAt(n.target.href.length-1)||-1===n.target.className.indexOf(e.linkClass)||o(n.target.hash,{duration:i,callback:function(){l(n.target.hash)}})}document.body.addEventListener("click",n,!1)}()}function o(e,t){function n(e){s=e-i,window.scrollTo(0,c.easing(s,r,u,d)),s<d?requestAnimationFrame(n):o()}function o(){window.scrollTo(0,r+u),"function"==typeof c.callback&&c.callback()}function l(e,t,n,o){return(e/=o/2)<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)}var i,s,r=window.pageYOffset,c={duration:t.duration,offset:t.offset||0,callback:t.callback,easing:t.easing||l},a=document.querySelector('[id="'+decodeURI(e).split("#").join("")+'"]'),u="string"==typeof e?c.offset+(e?a&&a.getBoundingClientRect().top||0:-(document.documentElement.scrollTop||document.body.scrollTop)):e,d="function"==typeof c.duration?c.duration(u):c.duration;requestAnimationFrame(function(e){i=e,n(e)})}t.initSmoothScrolling=n}]);

/***/ }),

/***/ "./webpack-app/helpers/TOCHelper/tocbot/tocbot.webpack.js":
/*!****************************************************************!*\
  !*** ./webpack-app/helpers/TOCHelper/tocbot/tocbot.webpack.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tocbot_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tocbot.min.js */ "./webpack-app/helpers/TOCHelper/tocbot/tocbot.min.js");
/* harmony import */ var _tocbot_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tocbot_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tocbot_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tocbot.less */ "./webpack-app/helpers/TOCHelper/tocbot/tocbot.less");
/* harmony import */ var _tocbot_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tocbot_less__WEBPACK_IMPORTED_MODULE_1__);


//import './styles.css'

/* harmony default export */ __webpack_exports__["default"] = (window.tocbot);

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map