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
/******/ 		return __webpack_require__.p + "" + ({"admin-components/Loading":"admin-components/Loading","admin-components/domain":"admin-components/domain","admin-components/material":"admin-components/material","admin-components/referer":"admin-components/referer","admin-components/remote-console-log":"admin-components/remote-console-log","admin-components/user-dashboard":"admin-components/user-dashboard","admin-components/webpage":"admin-components/webpage","admin-components/webpage-dashboard":"admin-components/webpage-dashboard","vendors/HTMLEditor":"vendors/HTMLEditor","vendors/semantic-ui-niwsf":"vendors/semantic-ui-niwsf","vendors~client-components/GlobalComponents":"vendors~client-components/GlobalComponents","client-components/GlobalComponents":"client-components/GlobalComponents"}[chunkId]||chunkId) + ".js"
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
/******/ 	__webpack_require__.p = "http://pc.pulipuli.info:443/spa/";
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
/******/ 	deferredModules.push(["./webpack-app/admin.js","commons"]);
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

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Config":"設定"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/manager/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CErrorHandler%5CErrorHandler.vue":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/manager/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CErrorHandler%5CErrorHandler.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
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

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CStepProgressBar%5CStepProgressBar.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CStepProgressBar%5CStepProgressBar.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"not yet started":"尚未開始","Spent time":"花費時間","Started at":"開始於"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-modal/Modal/Modal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CModal%5CModal.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui-modal/Modal/Modal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CModal%5CModal.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"Open in Another Window":"開新視窗"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui/Navigation/Navigation.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CNavigation%5CNavigation.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui/Navigation/Navigation.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CNavigation%5CNavigation.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CPagination%5CPagination.vue":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CPagination%5CPagination.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


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

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".close-container[data-v-6279df20] {\n  float: right;\n}\n.message[data-v-6279df20] {\n  max-width: 100%;\n  overflow: auto;\n  position: fixed !important;\n  left: 3rem;\n  width: calc(100vw - 6rem);\n  bottom: calc(60px + 1rem);\n  max-height: calc(100vh - 60px - 4rem);\n  z-index: 1001;\n}\n.message .list[data-v-6279df20] {\n  margin-top: 0 !important;\n}\n.message .close[data-v-6279df20] {\n  cursor: pointer;\n}\n.message .disabled-icon[data-v-6279df20] {\n  padding-top: 2px !important;\n}\n.message .item > i.icon[data-v-6279df20]:not(.disabled-icon) {\n  padding-top: 5px !important;\n  cursor: pointer;\n}\n.message .item > i.icon[data-v-6279df20]:not(.disabled-icon):hover,\n.message .item > i.icon[data-v-6279df20]:not(.disabled-icon):active {\n  color: #e67e22;\n}\n.message .description pre[data-v-6279df20] {\n  margin-top: 0;\n}\n.message .description pre[data-v-6279df20]:first-of-type {\n  margin-bottom: 0;\n}\n.message .header[data-v-6279df20] {\n  cursor: inherit !important;\n}\n.message .header.retry[data-v-6279df20] {\n  cursor: pointer !important;\n  font-weight: bold;\n  font-family: monospace, monospace;\n}\n.message .error-group .more[data-v-6279df20] {\n  cursor: pointer;\n}\n.message .error-group .more[data-v-6279df20]:hover,\n.message .error-group .more[data-v-6279df20]:active {\n  color: #e67e22;\n}\n.message .error-group .description[data-v-6279df20] {\n  max-width: calc(100vw - 11rem);\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n", "",{"version":3,"sources":["ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,YAAY;AACd;AACA;EACE,eAAe;EACf,cAAc;EACd,0BAA0B;EAC1B,UAAU;EACV,yBAAyB;EACzB,yBAAyB;EACzB,qCAAqC;EACrC,aAAa;AACf;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,eAAe;AACjB;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,2BAA2B;EAC3B,eAAe;AACjB;AACA;;EAEE,cAAc;AAChB;AACA;EACE,aAAa;AACf;AACA;EACE,gBAAgB;AAClB;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,0BAA0B;EAC1B,iBAAiB;EACjB,iCAAiC;AACnC;AACA;EACE,eAAe;AACjB;AACA;;EAEE,cAAc;AAChB;AACA;EACE,8BAA8B;EAC9B,gBAAgB;EAChB,kBAAkB;AACpB","file":"ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true&","sourcesContent":[".close-container[data-v-6279df20] {\n  float: right;\n}\n.message[data-v-6279df20] {\n  max-width: 100%;\n  overflow: auto;\n  position: fixed !important;\n  left: 3rem;\n  width: calc(100vw - 6rem);\n  bottom: calc(60px + 1rem);\n  max-height: calc(100vh - 60px - 4rem);\n  z-index: 1001;\n}\n.message .list[data-v-6279df20] {\n  margin-top: 0 !important;\n}\n.message .close[data-v-6279df20] {\n  cursor: pointer;\n}\n.message .disabled-icon[data-v-6279df20] {\n  padding-top: 2px !important;\n}\n.message .item > i.icon[data-v-6279df20]:not(.disabled-icon) {\n  padding-top: 5px !important;\n  cursor: pointer;\n}\n.message .item > i.icon[data-v-6279df20]:not(.disabled-icon):hover,\n.message .item > i.icon[data-v-6279df20]:not(.disabled-icon):active {\n  color: #e67e22;\n}\n.message .description pre[data-v-6279df20] {\n  margin-top: 0;\n}\n.message .description pre[data-v-6279df20]:first-of-type {\n  margin-bottom: 0;\n}\n.message .header[data-v-6279df20] {\n  cursor: inherit !important;\n}\n.message .header.retry[data-v-6279df20] {\n  cursor: pointer !important;\n  font-weight: bold;\n  font-family: monospace, monospace;\n}\n.message .error-group .more[data-v-6279df20] {\n  cursor: pointer;\n}\n.message .error-group .more[data-v-6279df20]:hover,\n.message .error-group .more[data-v-6279df20]:active {\n  color: #e67e22;\n}\n.message .error-group .description[data-v-6279df20] {\n  max-width: calc(100vw - 11rem);\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n"]}]);


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

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".step-progress-bar[data-v-386af451] {\n  /*\n  max-width: 100%;\n  overflow-x: hidden;\n    \n  \n  &> .button {\n    max-width: 100%;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n  }\n  */\n}\n.step-progress-bar .button[data-v-386af451] {\n  padding: 0 !important;\n  cursor: default !important;\n}\n.step-progress-bar .button.grey[data-v-386af451],\n.step-progress-bar .button.green[data-v-386af451] {\n  margin-right: 0.3em !important;\n}\n.step-progress-bar .button.grey[data-v-386af451]:last-of-type,\n.step-progress-bar .button.green[data-v-386af451]:last-of-type {\n  margin-right: 0  !important;\n}\n", "",{"version":3,"sources":["StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE;;;;;;;;;;GAUC;AACH;AACA;EACE,qBAAqB;EACrB,0BAA0B;AAC5B;AACA;;EAEE,8BAA8B;AAChC;AACA;;EAEE,2BAA2B;AAC7B","file":"StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true&","sourcesContent":[".step-progress-bar[data-v-386af451] {\n  /*\n  max-width: 100%;\n  overflow-x: hidden;\n    \n  \n  &> .button {\n    max-width: 100%;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n  }\n  */\n}\n.step-progress-bar .button[data-v-386af451] {\n  padding: 0 !important;\n  cursor: default !important;\n}\n.step-progress-bar .button.grey[data-v-386af451],\n.step-progress-bar .button.green[data-v-386af451] {\n  margin-right: 0.3em !important;\n}\n.step-progress-bar .button.grey[data-v-386af451]:last-of-type,\n.step-progress-bar .button.green[data-v-386af451]:last-of-type {\n  margin-right: 0  !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".non-invasive-web-style-framework.dimmable > .ui.dimmer.opaque {\n  background-color: black !important;\n}\n.non-invasive-web-style-framework.dimmable > .ui.dimmer.transparent {\n  background-color: transparent !important;\n}\n", "",{"version":3,"sources":["Modal.global.less?vue&type=style&index=0&lang=less&"],"names":[],"mappings":"AAAA;EACE,kCAAkC;AACpC;AACA;EACE,wCAAwC;AAC1C","file":"Modal.global.less?vue&type=style&index=0&lang=less&","sourcesContent":[".non-invasive-web-style-framework.dimmable > .ui.dimmer.opaque {\n  background-color: black !important;\n}\n.non-invasive-web-style-framework.dimmable > .ui.dimmer.transparent {\n  background-color: transparent !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".header .header-slot[data-v-64f3eac6] {\n  max-width: calc(100% - 1em);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\niframe[data-v-64f3eac6] {\n  width: 100%;\n  height: calc(100vh - 14.5em);\n}\n.actions[data-v-64f3eac6] {\n  user-select: none;\n}\n.actions.left-handed[data-v-64f3eac6] {\n  text-align: left !important;\n}\n.header.has-header-menu .header-slot[data-v-64f3eac6] {\n  max-width: calc(100% - 3em);\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.header-menu[data-v-64f3eac6] {\n  float: right;\n  margin-right: 3em !important;\n  cursor: pointer;\n  /*\n  ::v-deep .item:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: rgba(0, 0, 0, 0.95);\n    font-weight: normal;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n  }\n  */\n}\n.header-menu > .item.more[data-v-64f3eac6] {\n  display: none !important;\n}\n.header-icon[data-v-64f3eac6] {\n  float: right;\n  margin-right: 2em !important;\n  cursor: pointer;\n  font-size: 0.6em;\n}\n.header-icon.no-close-button[data-v-64f3eac6] {\n  margin-right: -1em !important;\n}\n.header-icon > .icon.green[data-v-64f3eac6],\n.header-icon > .icon.positive[data-v-64f3eac6] {\n  color: #21ba45 !important;\n}\n.header-icon > .icon[data-v-64f3eac6]:hover {\n  color: #16AB39 !important;\n}\n@media only screen and (max-width: 767px) {\n.header-menu > .item[data-v-64f3eac6] {\n    display: none !important;\n}\n.header-menu > .item.more[data-v-64f3eac6] {\n    display: block !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.header-menu > .more-menu.visible[data-v-64f3eac6] {\n    display: none !important;\n}\n}\n.non-cancellable .header-menu[data-v-64f3eac6] {\n  margin-right: -1em !important;\n}\n", "",{"version":3,"sources":["Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,2BAA2B;EAC3B,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;AACA;EACE,WAAW;EACX,4BAA4B;AAC9B;AACA;EACE,iBAAiB;AACnB;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,2BAA2B;EAC3B,gBAAgB;EAChB,uBAAuB;AACzB;AACA;EACE,YAAY;EACZ,4BAA4B;EAC5B,eAAe;EACf;;;;;;;;GAQC;AACH;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,YAAY;EACZ,4BAA4B;EAC5B,eAAe;EACf,gBAAgB;AAClB;AACA;EACE,6BAA6B;AAC/B;AACA;;EAEE,yBAAyB;AAC3B;AACA;EACE,yBAAyB;AAC3B;AACA;AACA;IACI,wBAAwB;AAC5B;AACA;IACI,yBAAyB;AAC7B;AACA;AACA;AACA;IACI,wBAAwB;AAC5B;AACA;AACA;EACE,6BAA6B;AAC/B","file":"Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true&","sourcesContent":[".header .header-slot[data-v-64f3eac6] {\n  max-width: calc(100% - 1em);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\niframe[data-v-64f3eac6] {\n  width: 100%;\n  height: calc(100vh - 14.5em);\n}\n.actions[data-v-64f3eac6] {\n  user-select: none;\n}\n.actions.left-handed[data-v-64f3eac6] {\n  text-align: left !important;\n}\n.header.has-header-menu .header-slot[data-v-64f3eac6] {\n  max-width: calc(100% - 3em);\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.header-menu[data-v-64f3eac6] {\n  float: right;\n  margin-right: 3em !important;\n  cursor: pointer;\n  /*\n  ::v-deep .item:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: rgba(0, 0, 0, 0.95);\n    font-weight: normal;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n  }\n  */\n}\n.header-menu > .item.more[data-v-64f3eac6] {\n  display: none !important;\n}\n.header-icon[data-v-64f3eac6] {\n  float: right;\n  margin-right: 2em !important;\n  cursor: pointer;\n  font-size: 0.6em;\n}\n.header-icon.no-close-button[data-v-64f3eac6] {\n  margin-right: -1em !important;\n}\n.header-icon > .icon.green[data-v-64f3eac6],\n.header-icon > .icon.positive[data-v-64f3eac6] {\n  color: #21ba45 !important;\n}\n.header-icon > .icon[data-v-64f3eac6]:hover {\n  color: #16AB39 !important;\n}\n@media only screen and (max-width: 767px) {\n.header-menu > .item[data-v-64f3eac6] {\n    display: none !important;\n}\n.header-menu > .item.more[data-v-64f3eac6] {\n    display: block !important;\n}\n}\n@media only screen and (min-width: 768px) {\n.header-menu > .more-menu.visible[data-v-64f3eac6] {\n    display: none !important;\n}\n}\n.non-cancellable .header-menu[data-v-64f3eac6] {\n  margin-right: -1em !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".ui.horizontal-menu.compact-mode .item.title[data-v-338540a1] {\n  max-width: calc(100vw - 8rem);\n}\n.ui.horizontal-menu.compact-mode[data-v-338540a1]  .in-fullmode {\n  display: none !important;\n}\n", "",{"version":3,"sources":["Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,6BAA6B;AAC/B;AACA;EACE,wBAAwB;AAC1B","file":"Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true&","sourcesContent":[".ui.horizontal-menu.compact-mode .item.title[data-v-338540a1] {\n  max-width: calc(100vw - 8rem);\n}\n.ui.horizontal-menu.compact-mode[data-v-338540a1]  .in-fullmode {\n  display: none !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"Navigation.global.less?vue&type=style&index=0&lang=less&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".overlay[data-v-338540a1] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(255, 255, 255, 0.7);\n  z-index: 102;\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,0CAA0C;EAC1C,YAAY;EACZ,eAAe;AACjB","file":"Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true&","sourcesContent":[".overlay[data-v-338540a1] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(255, 255, 255, 0.7);\n  z-index: 102;\n  cursor: pointer;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".vertical.menu[data-v-338540a1] {\n  z-index: 103 !important;\n  right: 0 !important;\n  transition: 0.3s ease !important;\n}\n.vertical.menu.hide[data-v-338540a1] {\n  right: -16rem !important;\n}\n.top.menu[data-v-338540a1]  .in-vertical {\n  display: none !important;\n}\n.vertical.menu[data-v-338540a1]  {\n  /*\n  .menu-full {\n    display: block !important;\n  }\n  */\n}\n.vertical.menu[data-v-338540a1]  .menu-compact {\n  display: none !important;\n}\n.vertical.menu[data-v-338540a1]  .right.menu > .item {\n  line-height: 3rem;\n  color: white !important;\n}\n.vertical.menu[data-v-338540a1]  .menu-full {\n  display: block !important;\n}\n.vertical.menu[data-v-338540a1]  .in-top {\n  display: none !important;\n}\n.ui.vertical.menu.default-header .close.item[data-v-338540a1] {\n  height: 3rem;\n}\n.ui.vertical.menu.with-header .close.item[data-v-338540a1] {\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.ui.vertical.menu .close.item[data-v-338540a1] {\n  cursor: pointer;\n  line-height: inherit;\n  float: none;\n  opacity: 1;\n  text-shadow: none;\n  font-size: inherit;\n}\n.ui.vertical.menu .close.item[data-v-338540a1]  a.item:hover {\n  background: transparent !important;\n}\n.ui.vertical.menu .close.item .close.icon[data-v-338540a1] {\n  color: inherit;\n}\n.ui.vertical.menu .close.item img[data-v-338540a1] {\n  width: 1.5em;\n  float: left;\n  margin-top: -0.2em;\n}\n.ui.vertical.menu .close.item .site-header[data-v-338540a1] {\n  display: inline-block;\n  padding-left: 1em;\n}\n.ui.vertical.menu .right.menu[data-v-338540a1]  .item {\n  font-size: 16px;\n}\n.Navigation.menu[data-v-338540a1]  .in-vertical {\n  display: none !important;\n}\n", "",{"version":3,"sources":["Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,mBAAmB;EACnB,gCAAgC;AAClC;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,wBAAwB;AAC1B;AACA;EACE;;;;GAIC;AACH;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,iBAAiB;EACjB,uBAAuB;AACzB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,YAAY;AACd;AACA;EACE,oCAAoC;AACtC;AACA;EACE,eAAe;EACf,oBAAoB;EACpB,WAAW;EACX,UAAU;EACV,iBAAiB;EACjB,kBAAkB;AACpB;AACA;EACE,kCAAkC;AACpC;AACA;EACE,cAAc;AAChB;AACA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;AACpB;AACA;EACE,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,eAAe;AACjB;AACA;EACE,wBAAwB;AAC1B","file":"Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true&","sourcesContent":[".vertical.menu[data-v-338540a1] {\n  z-index: 103 !important;\n  right: 0 !important;\n  transition: 0.3s ease !important;\n}\n.vertical.menu.hide[data-v-338540a1] {\n  right: -16rem !important;\n}\n.top.menu[data-v-338540a1]  .in-vertical {\n  display: none !important;\n}\n.vertical.menu[data-v-338540a1]  {\n  /*\n  .menu-full {\n    display: block !important;\n  }\n  */\n}\n.vertical.menu[data-v-338540a1]  .menu-compact {\n  display: none !important;\n}\n.vertical.menu[data-v-338540a1]  .right.menu > .item {\n  line-height: 3rem;\n  color: white !important;\n}\n.vertical.menu[data-v-338540a1]  .menu-full {\n  display: block !important;\n}\n.vertical.menu[data-v-338540a1]  .in-top {\n  display: none !important;\n}\n.ui.vertical.menu.default-header .close.item[data-v-338540a1] {\n  height: 3rem;\n}\n.ui.vertical.menu.with-header .close.item[data-v-338540a1] {\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.ui.vertical.menu .close.item[data-v-338540a1] {\n  cursor: pointer;\n  line-height: inherit;\n  float: none;\n  opacity: 1;\n  text-shadow: none;\n  font-size: inherit;\n}\n.ui.vertical.menu .close.item[data-v-338540a1]  a.item:hover {\n  background: transparent !important;\n}\n.ui.vertical.menu .close.item .close.icon[data-v-338540a1] {\n  color: inherit;\n}\n.ui.vertical.menu .close.item img[data-v-338540a1] {\n  width: 1.5em;\n  float: left;\n  margin-top: -0.2em;\n}\n.ui.vertical.menu .close.item .site-header[data-v-338540a1] {\n  display: inline-block;\n  padding-left: 1em;\n}\n.ui.vertical.menu .right.menu[data-v-338540a1]  .item {\n  font-size: 16px;\n}\n.Navigation.menu[data-v-338540a1]  .in-vertical {\n  display: none !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".pagination[data-v-398190e1] {\n  text-align: center;\n}\n.pagination .active[data-v-398190e1] {\n  pointer-events: none;\n}\n", "",{"version":3,"sources":["Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,kBAAkB;AACpB;AACA;EACE,oBAAoB;AACtB","file":"Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true&","sourcesContent":[".pagination[data-v-398190e1] {\n  text-align: center;\n}\n.pagination .active[data-v-398190e1] {\n  pointer-events: none;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


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
  return _c("form", { staticClass: "ui form segment" }, [
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
        attrs: {
          type: "text",
          id: "loginUsername",
          autocomplete: "current-password"
        },
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
        attrs: {
          type: "password",
          id: "loginPassword",
          autocomplete: "current-password"
        },
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
    { staticClass: "NavigationItems" },
    [
      _c("navigation", {
        ref: "nav",
        attrs: { config: _vm.config, lib: _vm.lib, compactWidth: "600" },
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
                        attrs: { href: "#/remote-console-log/" }
                      },
                      [
                        _vm._v(
                          "\r\n        " +
                            _vm._s(_vm.$t("Console")) +
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=322867f8&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=322867f8&scoped=true& ***!
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
              class: _vm.computedButtonClassList,
              attrs: { title: _vm.computedButtonTitle },
              on: {
                click: function($event) {
                  return _vm.editConfigOpen()
                }
              }
            },
            [
              _c("i", { staticClass: "cog icon" }),
              _vm._v(" "),
              _vm.showLabel
                ? [_vm._v("\r\n      " + _vm._s(_vm.$t("Config")) + "\r\n    ")]
                : _vm._e()
            ],
            2
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
                          staticClass: "webpage-config-textarea",
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
                          staticClass: "ui button webpage-config-submit",
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
              3223902718
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=4c800c9c&scoped=true&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=4c800c9c&scoped=true& ***!
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
        {
          staticClass: "WebpageGroupEditor",
          class: _vm.computedContainerClassList
        },
        [
          _c(
            "span",
            {
              class: _vm.computedButtonClassList,
              attrs: { title: _vm.computedButtonTitle },
              on: {
                click: function($event) {
                  return _vm.editGroupsOpen()
                }
              }
            },
            [
              !_vm.buttonMode
                ? _c("i", { staticClass: "edit icon" })
                : _vm._e(),
              _vm._v(
                "\r\n    " +
                  _vm._s(_vm.computedUserCount) +
                  "\r\n    " +
                  _vm._s(_vm.$t("Readers", _vm.computedUserCount)) +
                  "\r\n    /\r\n    " +
                  _vm._s(_vm.webpage.groupsCount) +
                  "\r\n    " +
                  _vm._s(_vm.$t("Groups", _vm.webpage.groupsCount)) +
                  "\r\n    "
              ),
              _vm.buttonMode ? _c("i", { staticClass: "edit icon" }) : _vm._e()
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
                          staticClass: "webpage-group-textarea",
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
                          staticClass: "ui button webpage-group-submit",
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
              1238482665
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/manager/ErrorHandler/ErrorHandler.html?vue&type=template&id=6279df20&scoped=true&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/manager/ErrorHandler/ErrorHandler.html?vue&type=template&id=6279df20&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************/
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
  return _vm.showError && _vm.error
    ? _c("div", { staticClass: "ui red floating message" }, [
        _c(
          "span",
          { staticClass: "close-container" },
          [
            _vm.errors.length > 1
              ? [_vm._v("\r\n      " + _vm._s(_vm.errors.length) + "\r\n    ")]
              : _vm._e(),
            _vm._v(" "),
            _c("i", {
              staticClass: "close icon",
              attrs: { title: _vm.$t("Click to close") },
              on: { click: _vm.close }
            })
          ],
          2
        ),
        _vm._v(" "),
        _c("div", { staticClass: "ui relaxed divided list" }, [
          _vm.responseErrorMessage
            ? _c("div", { staticClass: "item error-group" }, [
                _vm.config.debug.ErrorHandler.verbose
                  ? _c("i", {
                      staticClass: "large node js icon",
                      on: {
                        click: function($event) {
                          _vm.showServerErrorStack = !_vm.showServerErrorStack
                        }
                      }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.config.debug.ErrorHandler.verbose === false
                  ? _c("i", { staticClass: "minus circle icon disabled-icon" })
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c("a", { staticClass: "header" }, [
                    _vm.responseErrorMessage
                      ? _c("span", [_vm._v(_vm._s(_vm.responseErrorMessage))])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _vm.config.debug.ErrorHandler.verbose
                    ? _c("div", { staticClass: "description" }, [
                        _vm.responseErrorStack && !_vm.showServerErrorStack
                          ? _c(
                              "pre",
                              {
                                staticClass: "more",
                                on: {
                                  click: function($event) {
                                    _vm.showServerErrorStack = !_vm.showServerErrorStack
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "(" + _vm._s(_vm.$t("Show stacks...")) + ")"
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.responseErrorStack && _vm.showServerErrorStack
                          ? _c("pre", [_vm._v(_vm._s(_vm.responseErrorStack))])
                          : _vm._e()
                      ])
                    : _vm._e()
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.localErrorMessage && _vm.config.debug.ErrorHandler.verbose
            ? _c("div", { staticClass: "item error-group" }, [
                _c("i", {
                  staticClass: "large vuejs icon",
                  on: {
                    click: function($event) {
                      _vm.showErrorStack = !_vm.showErrorStack
                    }
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c("a", { staticClass: "header" }, [
                    _vm.localErrorMessage
                      ? _c("span", [_vm._v(_vm._s(_vm.localErrorMessage))])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "description" }, [
                    _vm.localErrorStack && !_vm.showErrorStack
                      ? _c(
                          "pre",
                          {
                            staticClass: "more",
                            on: {
                              click: function($event) {
                                _vm.showErrorStack = !_vm.showErrorStack
                              }
                            }
                          },
                          [_vm._v("(" + _vm._s(_vm.$t("Show stacks...")) + ")")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.localErrorStack && _vm.showErrorStack
                      ? _c("pre", [_vm._v(_vm._s(_vm.localErrorStack))])
                      : _vm._e()
                  ])
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          typeof _vm.error === "string" && _vm.config.debug.ErrorHandler.verbose
            ? _c("div", { staticClass: "item error-group" }, [
                _c("i", {
                  staticClass: "large vuejs icon",
                  on: {
                    click: function($event) {
                      _vm.showErrorStack = !_vm.showErrorStack
                    }
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c("a", { staticClass: "header" }, [
                    _vm.error
                      ? _c("span", [_vm._v(_vm._s(_vm.error))])
                      : _vm._e()
                  ])
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.error.config &&
          _vm.error.config.method &&
          _vm.config.debug.ErrorHandler.verbose
            ? _c("div", { staticClass: "item" }, [
                _c("i", {
                  staticClass: "large redo icon",
                  on: { click: _vm.retry }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "content" }, [
                  _c(
                    "a",
                    { staticClass: "header retry", on: { click: _vm.retry } },
                    [
                      _vm.error.config.method
                        ? _c("span", [_vm._v(_vm._s(_vm.error.config.method))])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.error.config.method && _vm.error.config.url
                        ? _c("span", [_vm._v(": ")])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.error.config.url
                        ? _c("span", [_vm._v(_vm._s(_vm.error.config.url))])
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "description" }, [
                    _c("pre", [_vm._v(_vm._s(_vm.displayErrorData))])
                  ])
                ])
              ])
            : _vm._e()
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/manager/StyleManager/StyleManager.html?vue&type=template&id=90d28aa0&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/manager/StyleManager/StyleManager.html?vue&type=template&id=90d28aa0& ***!
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
  return _c("fragment")
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.html?vue&type=template&id=386af451&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.html?vue&type=template&id=386af451&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    {
      staticClass: "step-progress-bar",
      class: { hide: _vm.progresses.length === 0 }
    },
    [
      _vm._v("\r\n\r\n  " + _vm._s(_vm.currentStep) + "\r\n\r\n  "),
      _c(
        "div",
        { ref: "buttons", staticClass: "ui mini fluid buttons" },
        _vm._l(_vm.progresses, function(step, index) {
          return _c("span", {
            staticClass: "ui button",
            class: _vm.displayClass(step),
            attrs: {
              title: _vm.displayTitle(step),
              "data-content": _vm.displayTitle(step),
              "data-position": "bottom center"
            }
          })
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/test/PACORTestManager/PACORTestManager.html?vue&type=template&id=16c42c42&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/test/PACORTestManager/PACORTestManager.html?vue&type=template&id=16c42c42& ***!
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
  return _c("fragment")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-modal/Modal/Modal.html?vue&type=template&id=64f3eac6&scoped=true&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui-modal/Modal/Modal.html?vue&type=template&id=64f3eac6&scoped=true& ***!
  \*********************************************************************************************************************************************************************************/
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
    {
      ref: "modal",
      staticClass: "ui large modal",
      class: _vm.computedModalClassList
    },
    [
      _vm.computedShowCloseButton
        ? _c("i", { staticClass: "close icon" })
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.header
        ? _c(
            "div",
            { staticClass: "header", class: _vm.computedHeaderClassList },
            [
              _vm.$slots.headerMenu
                ? _c(
                    "div",
                    { staticClass: "header-menu ui mini compact menu" },
                    [
                      _vm._t("headerMenu"),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          ref: "HeaderMenuDropdown",
                          staticClass: "more ui dropdown icon item"
                        },
                        [_c("i", { staticClass: "ellipsis vertical icon" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "ui flowing popup transition hidden vertical menu more-menu"
                        },
                        [_vm._t("headerMenu")],
                        2
                      )
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.$slots.headerIcon
                ? _c(
                    "div",
                    {
                      staticClass: "header-icon",
                      class: { "no-close-button": !_vm.computedShowCloseButton }
                    },
                    [_vm._t("headerIcon")],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "header-slot" }, [_vm._t("header")], 2)
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.content
        ? _c("div", { staticClass: "scrolling content" }, [
            _c(
              "div",
              { staticClass: "ui form", class: { full: _vm.fullContent } },
              [_vm._t("content")],
              2
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.contentURL
        ? _c(
            "div",
            { staticClass: "content" },
            [
              _vm.isShow
                ? _c("iframe-message-segment", {
                    staticClass: "content-full-height",
                    attrs: {
                      config: _vm.config,
                      message: _vm.computedContentURL,
                      showBorder: false
                    }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.actions ||
      _vm.cancelable === "true" ||
      _vm.cancelable === true ||
      _vm.reset ||
      _vm.cancelButtonText
        ? _c(
            "div",
            { staticClass: "actions", class: _vm.computedActionsClassList },
            [
              _vm.contentURL && !_vm.disableOpenWindow
                ? _c(
                    "div",
                    {
                      staticClass: "ui button",
                      on: { click: _vm.openContentURLWindow }
                    },
                    [
                      _vm._v(
                        "\r\n      " +
                          _vm._s(_vm.$t("Open in Another Window")) +
                          "\r\n    "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.cancelable !== "false" && _vm.cancelable !== false
                ? _c(
                    "div",
                    { staticClass: "ui button", on: { click: _vm.hide } },
                    [
                      _vm.cancelButtonText
                        ? [
                            _vm._v(
                              "\r\n        " +
                                _vm._s(_vm.$t(_vm.cancelButtonText)) +
                                "\r\n      "
                            )
                          ]
                        : [
                            _vm._v(
                              "\r\n        " +
                                _vm._s(_vm.$t("CANCEL")) +
                                "\r\n      "
                            )
                          ]
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.reset
                ? _c(
                    "div",
                    { staticClass: "ui button", on: { click: _vm.doReset } },
                    [
                      _vm._v(
                        "\r\n      " + _vm._s(_vm.$t("RESET")) + "\r\n    "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._t("actions")
            ],
            2
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui/Navigation/Navigation.html?vue&type=template&id=338540a1&scoped=true&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui/Navigation/Navigation.html?vue&type=template&id=338540a1&scoped=true& ***!
  \*************************************************************************************************************************************************************************************/
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
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.isVisible !== false,
            expression: "isVisible !== false"
          }
        ],
        ref: "Menu",
        staticClass: "ui borderless inverted Navigation horizontal-menu",
        class: _vm.computedTopMenuClass,
        on: {
          click: function($event) {
            return _vm.$emit("click")
          }
        }
      },
      [
        _vm.lib.style && _vm.lib.style.isLeftHanded
          ? _c("media", { attrs: { query: { maxWidth: _vm.maxWidth } } }, [
              _c(
                "div",
                { staticClass: "menu-compact left menu" },
                [
                  _c(
                    "a",
                    {
                      staticClass: "icon item show-side-menu-item",
                      on: { click: _vm.showSideMenu }
                    },
                    [_c("i", { staticClass: "ellipsis vertical icon" })]
                  ),
                  _vm._v(" "),
                  _vm._t("compactItems")
                ],
                2
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm._t("header"),
        _vm._v(" "),
        _c(
          "media",
          {
            attrs: { query: { minWidth: _vm.maxWidth } },
            on: {
              "media-enter": function($event) {
                _vm.isCompactMode = false
              },
              "media-leave": function($event) {
                _vm.isCompactMode = true
              }
            }
          },
          [
            _c(
              "div",
              { staticClass: "menu-full right menu" },
              [
                _vm._t("items"),
                _vm._v(" "),
                _vm.showMoreButton
                  ? _c(
                      "a",
                      {
                        staticClass: "icon item show-side-menu-item",
                        on: { click: _vm.showSideMenu }
                      },
                      [_c("i", { staticClass: "ellipsis vertical icon" })]
                    )
                  : _vm._e()
              ],
              2
            )
          ]
        ),
        _vm._v(" "),
        _vm.lib.style && !_vm.lib.style.isLeftHanded
          ? _c("media", { attrs: { query: { maxWidth: _vm.maxWidth } } }, [
              _c(
                "div",
                { staticClass: "menu-compact right menu" },
                [
                  _vm._t("compactItems"),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass: "icon item show-side-menu-item",
                      on: { click: _vm.showSideMenu }
                    },
                    [_c("i", { staticClass: "ellipsis vertical icon" })]
                  )
                ],
                2
              )
            ])
          : _vm._e()
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        ref: "SideMenu",
        staticClass: "vertical-menu ui inverted",
        class: _vm.computedVerticalMenuClass
      },
      [
        _c(
          "div",
          {
            staticClass: "item in-vertical close",
            on: { click: _vm.hideSideMenu }
          },
          [
            _c("i", { staticClass: "close icon" }),
            _vm._v(" "),
            !_vm.$slots.verticalHeaderItem
              ? [
                  _c("img", {
                    attrs: { src: _vm.config.baseURL + "/imgs/pacor.svg" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "site-header" }, [
                    _vm._v(
                      "\r\n          " +
                        _vm._s(_vm.$t("PACOR")) +
                        "\r\n        "
                    )
                  ])
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm._t("verticalHeaderItem")
          ],
          2
        ),
        _vm._v(" "),
        _vm._t("items")
      ],
      2
    ),
    _vm._v(" "),
    _vm.sideMenuDisplay
      ? _c("div", { staticClass: "overlay", on: { click: _vm.hideSideMenu } })
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui/Pagination/Pagination.html?vue&type=template&id=398190e1&scoped=true&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui/Pagination/Pagination.html?vue&type=template&id=398190e1&scoped=true& ***!
  \*************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "pagination" }, [
    _c(
      "div",
      { staticClass: "ui basic icon buttons" },
      _vm._l(_vm.pageConfig.maxPage, function(i) {
        return _c(
          "a",
          {
            staticClass: "ui button",
            class: { active: i === _vm.pageConfig.page },
            attrs: { href: _vm.pageLink(i) },
            on: {
              click: function(event) {
                _vm.changePage(i, event)
              }
            }
          },
          [_vm._v("\r\n      " + _vm._s(i) + "\r\n    ")]
        )
      }),
      0
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-router/dist/vue-router.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-router/dist/vue-router.esm.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
  * vue-router v3.1.3
  * (c) 2019 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ( true && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function isExtendedError (constructor, err) {
  return (
    err instanceof constructor ||
    // _name is to support IE9 too
    (err && (err.name === constructor.name || err._name === constructor._name))
  )
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++;
        }
        if (vnodeData.keepAlive && parent._inactive) {
          inactive = true;
        }
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
     true && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    if (params.pathMatch) { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    return extend({}, raw)
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass;
    var activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass;

    var compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = { class: classes };

    var scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href: href,
        route: route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (true) {
          warn(
            false,
            ("RouterLink with to=\"" + (this.props.to) + "\" is trying to use a scoped slot but it didn't provide exactly one child.")
          );
        }
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = (a.data = extend({}, a.data));
        aData.on = aData.on || {};
        // transform existing events in both objects into arrays so we can push later
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        // append new listeners for router-link
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            // on[event] is always a function
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }

        var aAttrs = (a.data.attrs = extend({}, a.data.attrs));
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  if (true) {
    // warn if routes do not include leading slashes
    var found = pathList
    // check for missing leading slash
      .filter(function (path) { return path && path.charAt(0) !== '*' && path.charAt(0) !== '/'; });

    if (found.length > 0) {
      var pathNames = found.map(function (path) { return ("- " + path); }).join('\n');
      warn(false, ("Non-nested routes must include a leading slash character. Fix the following routes: \n" + pathNames));
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(
        path || name
      )) + " cannot be a " + "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions =
    route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (
        route.name &&
        !route.redirect &&
        route.children.some(function (child) { return /^\/?$/.test(child.path); })
      ) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
            "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
            "the default child route will not be rendered. Remove the name from " +
            "this route and use the name of the default child route for named " +
            "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if ( true && alias === path) {
        warn(
          false,
          ("Found an alias with the same value as the path: \"" + path + "\". You have to remove that alias. It will be ignored in development.")
        );
        // skip in dev to make it work
        continue
      }

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ( true && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
          "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (
  path,
  pathToRegexpOptions
) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(
        !keys[key.name],
        ("Duplicate param keys in route with path: \"" + path + "\"")
      );
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (
  path,
  parent,
  strict
) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

// use User Timing api (if present) for more accurate key precision
var Time =
  inBrowser && window.performance && window.performance.now
    ? window.performance
    : Date;

function genStateKey () {
  return Time.now().toFixed(3)
}

var _key = genStateKey();

function getStateKey () {
  return _key
}

function setStateKey (key) {
  return (_key = key)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  window.history.replaceState({ key: getStateKey() }, '', absolutePath);
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll
        .then(function (shouldScroll) {
          scrollToPosition((shouldScroll), position);
        })
        .catch(function (err) {
          if (true) {
            assert(false, err.toString());
          }
        });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
      ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
      : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset =
        shouldScroll.offset && typeof shouldScroll.offset === 'object'
          ? shouldScroll.offset
          : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState =
  inBrowser &&
  (function () {
    var ua = window.navigator.userAgent;

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false
    }

    return window.history && 'pushState' in window.history
  })();

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: getStateKey() }, '', url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
           true && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

var NavigationDuplicated = /*@__PURE__*/(function (Error) {
  function NavigationDuplicated (normalizedLocation) {
    Error.call(this);
    this.name = this._name = 'NavigationDuplicated';
    // passing the message to super() doesn't seem to work in the transpiled version
    this.message = "Navigating to current location (\"" + (normalizedLocation.fullPath) + "\") is not allowed";
    // add a stack property so services like Sentry can correctly display it
    Object.defineProperty(this, 'stack', {
      value: new Error().stack,
      writable: true,
      configurable: true
    });
    // we could also have used
    // Error.captureStackTrace(this, this.constructor)
    // but it only exists on node and chrome
  }

  if ( Error ) NavigationDuplicated.__proto__ = Error;
  NavigationDuplicated.prototype = Object.create( Error && Error.prototype );
  NavigationDuplicated.prototype.constructor = NavigationDuplicated;

  return NavigationDuplicated;
}(Error));

// support IE9
NavigationDuplicated._name = 'NavigationDuplicated';

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (
  location,
  onComplete,
  onAbort
) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(
    route,
    function () {
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();

      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        this$1.readyErrorCbs.forEach(function (cb) {
          cb(err);
        });
      }
    }
  );
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    // after merging https://github.com/vuejs/vue-router/pull/2771 we
    // When the user navigates through history through back/forward buttons
    // we do not want to throw the error. We only throw it if directly calling
    // push/replace. That's why it's not included in isError
    if (!isExtendedError(NavigationDuplicated, err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort(new NavigationDuplicated(route))
  }

  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' &&
            (typeof to.path === 'string' || typeof to.name === 'string'))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History) {
  function HTML5History (router, base) {
    var this$1 = this;

    History.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History) {
  function HashHistory (router, base, fallback) {
    History.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(
      supportsPushState ? 'popstate' : 'hashchange',
      function () {
        var current = this$1.current;
        if (!ensureSlash()) {
          return
        }
        this$1.transitionTo(getHash(), function (route) {
          if (supportsScroll) {
            handleScroll(this$1.router, route, current, true);
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath);
          }
        });
      }
    );
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else { href = decodeURI(href); }
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
    }
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History) {
  function AbstractHistory (router, base) {
    History.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function () {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      },
      function (err) {
        if (isExtendedError(NavigationDuplicated, err)) {
          this$1.index = targetIndex;
        }
      }
    );
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

   true && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    })
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    })
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(
    to,
    current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.1.3';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


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

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("444a2076", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("5e09fa0b", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("88461b0c", content, false, {});
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

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("9c1e4b2e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Modal.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("2b273c1a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("77f63751", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("0d8a5f51", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("4678302c", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("24511253", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("188176d2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("781c9d2f", content, false, {});
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
/* harmony import */ var _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/StringHelper */ "./webpack-app/helpers/StringHelper.js");
/* harmony import */ var _helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/ValidateHelper */ "./webpack-app/helpers/ValidateHelper.js");
/* harmony import */ var _helpers_VueHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/VueHelper */ "./webpack-app/helpers/VueHelper.js");
/* harmony import */ var _helpers_URLHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/URLHelper */ "./webpack-app/helpers/URLHelper.js");
/* harmony import */ var _admin_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./admin/Auth/Auth.vue */ "./webpack-app/admin/Auth/Auth.vue");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
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

//import DayJSHelper from './helpers/DayJSHelper'





// --------------------
// Components



// ----------------------





// -----------------------
// 確認 baseURL

let baseURL = ''
let baseScript = jquery__WEBPACK_IMPORTED_MODULE_13___default()(document.currentScript)
_config_js__WEBPACK_IMPORTED_MODULE_15__["default"].baseURL = baseURL
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
//    message: 'Hello, world.', // for test
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
      webpageURL: '',
      preference: null
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {
      AxiosHelper: _helpers_AxiosHelper__WEBPACK_IMPORTED_MODULE_7__["default"].setBaseURL(baseURL),
      DayJSHelper: null,
      StringHelper: _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_8__["default"],
      ValidateHelper: _helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_9__["default"],
      VueHelper: _helpers_VueHelper__WEBPACK_IMPORTED_MODULE_10__["default"],
      URLHelper: _helpers_URLHelper__WEBPACK_IMPORTED_MODULE_11__["default"],
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
      //console.log(this.$route.query.origin)
      if (typeof(this.$route.query.origin) === 'string' 
              && this.$route.query.origin !== '') {
        this.loadUsers(this.$route.query.origin)
      }
    }
  },
//  created: function () {
//  },
  mounted: async function () {
    let DayJSHelper = await (() =>__webpack_require__.e(/*! import() | admin-components/Loading */ "admin-components/Loading").then(__webpack_require__.bind(null, /*! ./helpers/DayJSHelper.js */ "./webpack-app/helpers/DayJSHelper.js")))()
    this.lib.DayJSHelper = await DayJSHelper.default()
    
    //console.log(this.config)
    
    if (typeof(this.$route.query.origin) === 'string' 
            && this.$route.query.origin !== '') {
      this.loadUsers(this.$route.query.origin)
    }
    
    this.lib.DayJSHelper.setI18N((name, data) => {
      return this.$t(name, data)
    })
    
    this.lib.AxiosHelper.setErrorHandler((error) => {
      if (this.$refs.ErrorHandler) {
        this.$refs.ErrorHandler.addError(error)
      }
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
    },
    logoutAndReload: async function () {
      await this.lib.AxiosHelper.get('/admin/auth/logout')
      location.reload()
      return false
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
  props: ['lib', 'status', 'config'],
  data: function () {
    if (this.config) {
      this.$i18n.locale = this.config.locale
    }
    return {
      
//      domain: '',
//      username: '',
//      password: '',
      
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
    config () {
      if (this.config) {
        this.$i18n.locale = this.config.locale
      }
    }
  },
//  mounted() {
//  },
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

module.exports = "<div class=\"non-invasive-web-style-framework\">\r\n  <auth \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:progress=\"progress\"\r\n    v-bind:lib=\"lib\"\r\n    ref=\"auth\">\r\n  </auth>\r\n\r\n  <template v-if=\"progress.display === true && status.needLogin === false\">\r\n    <navigation-items \r\n      v-bind:config=\"config\"\r\n      v-bind:status=\"status\"\r\n      v-bind:progress=\"progress\"\r\n      v-bind:lib=\"lib\">\r\n    </navigation-items>\r\n  </template>\r\n\r\n  <error-handler \r\n    v-bind:config=\"config\"\r\n    v-bind:lib=\"lib\"\r\n    v-bind:errors=\"errors\"\r\n    ref=\"ErrorHandler\">\r\n  </error-handler>\r\n\r\n  <StyleManager \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:lib=\"lib\"\r\n    ref=\"style\">\r\n  </StyleManager>\r\n\r\n  <!-- ========================================== -->\r\n\r\n  <template v-if=\"progress.display === false || config === undefined\">\r\n    <loading></loading>\r\n  </template>\r\n  <template v-else>\r\n    <template v-if=\"status.needLogin === true\">\r\n      <login \r\n        v-bind:config=\"config\"\r\n        v-bind:status=\"status\"\r\n        v-bind:lib=\"lib\">\r\n      </login>\r\n    </template>\r\n    <template v-else>\r\n      <router-view \r\n        v-bind:config=\"config\"\r\n        v-bind:status=\"status\"\r\n        v-bind:lib=\"lib\">\r\n      </router-view>\r\n    </template>\r\n  </template>\r\n</div>";

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
/* harmony import */ var _components_admin_WebpageConfigEditor_WebpageConfigEditor_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../components/admin/WebpageConfigEditor/WebpageConfigEditor.vue */ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.vue");
/* harmony import */ var _components_admin_WebpageGroupEditor_WebpageGroupEditor_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../components/admin/WebpageGroupEditor/WebpageGroupEditor.vue */ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.vue");



vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('pagination', _components_ui_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('modal', _components_ui_modal_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('step-progress-bar', _components_reading_progress_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_3__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('navigation', _components_ui_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_4__["default"])

//import HTMLEditor from './../components/HTMLEditor/HTMLEditor.vue'
//Vue.component('HTMLEditor', HTMLEditor)
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('HTMLEditor', () => __webpack_require__.e(/*! import() | vendors/HTMLEditor */ "vendors/HTMLEditor").then(__webpack_require__.bind(null, /*! ./../components/annotation/HTMLEditor/HTMLEditor.vue */ "./webpack-app/components/annotation/HTMLEditor/HTMLEditor.vue")))


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('table-of-contents', _components_manager_TableOfContents_TableOfContents_vue__WEBPACK_IMPORTED_MODULE_5__["default"])

// ----------------------


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('webpage-config-editor', _components_admin_WebpageConfigEditor_WebpageConfigEditor_vue__WEBPACK_IMPORTED_MODULE_6__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('webpage-group-editor', _components_admin_WebpageGroupEditor_WebpageGroupEditor_vue__WEBPACK_IMPORTED_MODULE_7__["default"])

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
/* harmony import */ var _components_manager_StyleManager_StyleManager_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/manager/StyleManager/StyleManager.vue */ "./webpack-app/components/manager/StyleManager/StyleManager.vue");
/* harmony import */ var _components_test_PACORTestManager_PACORTestManager_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/test/PACORTestManager/PACORTestManager.vue */ "./webpack-app/components/test/PACORTestManager/PACORTestManager.vue");









let components = {
  Loading: _Login_Login_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  'error-handler': _components_manager_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  Auth: _Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  Login: _Login_Login_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  NavigationItems: _NavigationItems_NavigationItems_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
  StyleManager: _components_manager_StyleManager_StyleManager_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
  PACORTestManager: _components_test_PACORTestManager_PACORTestManager_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
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
  { path: '/remote-console-log/', component: () => __webpack_require__.e(/*! import() | admin-components/remote-console-log */ "admin-components/remote-console-log").then(__webpack_require__.bind(null, /*! ./RemoteConsoleLog/RemoteConsoleLog.vue */ "./webpack-app/admin/RemoteConsoleLog/RemoteConsoleLog.vue")) },
]

/* harmony default export */ __webpack_exports__["default"] = (new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  routes: routes
}));


/***/ }),

/***/ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=322867f8&scoped=true&":
/*!******************************************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=322867f8&scoped=true& ***!
  \******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageConfigEditor_html_vue_type_template_id_322867f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./WebpageConfigEditor.html?vue&type=template&id=322867f8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=322867f8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageConfigEditor_html_vue_type_template_id_322867f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageConfigEditor_html_vue_type_template_id_322867f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js&?585d":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebpageConfigEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./WebpageConfigEditor.js?vue&type=script&lang=js& */ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js&?969c");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_WebpageConfigEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js&?969c":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let WebpageConfigEditor = {
  props: ['lib', 'status', 'config'
            , 'webpage', 'buttonMode', 'showLabel'],
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
    },
    computedButtonClassList () {
      if (this.buttonMode === false) {
        return
      }
      else {
        return 'ui icon button'
      }
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
      
      //console.log(data)

      if (typeof (data.config) !== 'object'
              && data.config) {
        this.$refs.ModelEditConfig.hide()
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

/***/ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_322867f8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_322867f8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_322867f8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_322867f8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_322867f8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageConfigEditor_less_vue_type_style_index_0_id_322867f8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.vue":
/*!**********************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.vue ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebpageConfigEditor_html_vue_type_template_id_322867f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebpageConfigEditor.html?vue&type=template&id=322867f8&scoped=true& */ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.html?vue&type=template&id=322867f8&scoped=true&");
/* harmony import */ var _WebpageConfigEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebpageConfigEditor.js?vue&type=script&lang=js& */ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.js?vue&type=script&lang=js&?585d");
/* empty/unused harmony star reexport *//* harmony import */ var _WebpageConfigEditor_less_vue_type_style_index_0_id_322867f8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true& */ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.less?vue&type=style&index=0&id=322867f8&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml */ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WebpageConfigEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WebpageConfigEditor_html_vue_type_template_id_322867f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WebpageConfigEditor_html_vue_type_template_id_322867f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "322867f8",
  null
  
)

/* custom blocks */

if (typeof _WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/admin/WebpageConfigEditor/WebpageConfigEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageConfigEditor%5CWebpageConfigEditor.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageConfigEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageConfigEditor_5CWebpageConfigEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=4c800c9c&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=4c800c9c&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageGroupEditor_html_vue_type_template_id_4c800c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./WebpageGroupEditor.html?vue&type=template&id=4c800c9c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=4c800c9c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageGroupEditor_html_vue_type_template_id_4c800c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_WebpageGroupEditor_html_vue_type_template_id_4c800c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js&?8b56":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebpageGroupEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./WebpageGroupEditor.js?vue&type=script&lang=js& */ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js&?d9fc");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_WebpageGroupEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js&?d9fc":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let WebpageGroupEditor = {
  props: ['lib', 'status', 'config'
    , 'webpage', 'buttonMode'],
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
    },
    computedButtonClassList () {
      let classList = []
      if (this.buttonMode === false) {
        return undefined
      }
      else {
        classList.push('ui right labeled icon button')
      }
      
      if (typeof(this.webpage.activeUsersCount) === 'number'
              && this.webpage.activeUsersCount > 0) {
        classList.push('positive')
      }
      else if (this.webpage.activeUsersCount === 0
              && this.webpage.groupsCount > 0) {
        classList.push('red')
      }
      
      return classList.join(' ')
    },
    computedContainerClassList () {
      if (this.buttonMode === false) {
        return 'text-mode'
      }
    },
    computedUserCount () {
      if (typeof(this.webpage.activeUsersCount) === 'number') {
        return this.webpage.activeUsersCount
      }
      if (typeof(this.webpage.usersCount) === 'number') {
        return this.webpage.usersCount
      }
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

/***/ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_4c800c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_4c800c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_4c800c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_4c800c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_4c800c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_WebpageGroupEditor_less_vue_type_style_index_0_id_4c800c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.vue":
/*!********************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.vue ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebpageGroupEditor_html_vue_type_template_id_4c800c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebpageGroupEditor.html?vue&type=template&id=4c800c9c&scoped=true& */ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.html?vue&type=template&id=4c800c9c&scoped=true&");
/* harmony import */ var _WebpageGroupEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebpageGroupEditor.js?vue&type=script&lang=js& */ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.js?vue&type=script&lang=js&?8b56");
/* empty/unused harmony star reexport *//* harmony import */ var _WebpageGroupEditor_less_vue_type_style_index_0_id_4c800c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true& */ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.less?vue&type=style&index=0&id=4c800c9c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml */ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WebpageGroupEditor_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WebpageGroupEditor_html_vue_type_template_id_4c800c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _WebpageGroupEditor_html_vue_type_template_id_4c800c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4c800c9c",
  null
  
)

/* custom blocks */

if (typeof _WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/admin/WebpageGroupEditor/WebpageGroupEditor.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cadmin%5CWebpageGroupEditor%5CWebpageGroupEditor.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_WebpageGroupEditor_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cadmin_5CWebpageGroupEditor_5CWebpageGroupEditor_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.html?vue&type=template&id=6279df20&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./webpack-app/components/manager/ErrorHandler/ErrorHandler.html?vue&type=template&id=6279df20&scoped=true& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_6279df20_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ErrorHandler.html?vue&type=template&id=6279df20&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/manager/ErrorHandler/ErrorHandler.html?vue&type=template&id=6279df20&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_6279df20_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ErrorHandler_html_vue_type_template_id_6279df20_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?7f88":
/*!**********************************************************************************************!*\
  !*** ./webpack-app/components/manager/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let ErrorHandler = {
  props: ['config', 'errors', 'lib'],
  data() {    
    this.$i18n.locale = this.config.locale
    //console.log(this.config)
    return {
      showError: false,
      showServerErrorStack: false,
      showErrorStack: false
    }
  },
  computed: {
    error () {
      if (Array.isArray(this.errors)
              && this.errors.length > 0) {
        console.error(this.errors[0])
        return this.errors[0]
      }
    },
    responseErrorMessage: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.response) === 'object'
              && typeof(this.error.response.data) === 'object'
              && typeof(this.error.response.data.error) === 'object') {
        
        let output = ''
        let e = this.error.response.data.error
        
        if (typeof(e.status) === 'number') {
          output = output + `[${e.status}]`
        }
        
        if (typeof(e.message) === 'string') {
          if (output !== '') {
            output = ' '
          }
          output = output + '' + e.message.trim()
        }
        
        return output
      }
    },
    responseErrorStack: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.response) === 'object'
              && typeof(this.error.response.data) === 'object'
              && typeof(this.error.response.data.error) === 'object') {
        
        let output = ''
        let e = this.error.response.data.error
        
        if (Array.isArray(e.frames)) {
          if (output !== '') {
            output = output + '\n'
          }
          
          output = output + e.frames.map((f) => {
            return `at ${f.method} (${f.file} :${f.line} :${f.column})`
          }).join('\n')
        }
        
        return output
      }
    },
    localErrorMessage: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.message) === 'string') {
        return this.error.message
      }
    },
    localErrorStack: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.stack) === 'string') {
        let stack = this.error.stack
        if (stack.trim().startsWith('found in') && stack.indexOf('--->') > 0) {
          return stack.slice(stack.indexOf('--->') + 4).trim()
        }
        else {
          return stack.split('\n').slice(1).map(line => line.trim()).join('\n')
        }
      }
    },
    displayErrorData: function () {
      let data
      if (typeof(this.error) === 'object'
              && typeof(this.error.config) === 'object'
              && typeof(this.error.config.data) !== 'undefined') {
        data = this.error.config.data  
      }
      else if (typeof(this.error) === 'object'
              && typeof(this.error.config) === 'object'
              && typeof(this.error.config.params) !== 'undefined') {
        data = this.error.config.params
      }
      
      if (data === undefined) {
        return undefined
      }
      
      if (typeof(data) === 'string') {
        try {
          data = JSON.parse(data)
        }
        catch (e) {}
      }

      if (typeof(data) === 'object') {
        data = JSON.stringify(data, null, ' ').slice(2, -2)
      }

      return data
    }
  },
  watch: {
    'error': function () {
      //console.log(typeof(this.error), this.error)
      //console.log(JSON.stringify(this.error.config, null, '\t'))
      if (typeof(this.error) === 'object' 
              || (typeof(this.error) === 'string' && this.error.trim() !== '') ) {
        this.showError = true
        this.showServerErrorStack = false
        this.showErrorStack = false
        
        /*
        console.log(typeof(window.PACORTestManagerError))
        console.log(typeof(window.PACORTestManagerIndex))
        
        if (typeof(window.PACORTestManagerError) === 'function') {
          let message = this.responseErrorMessage
          if (!message) {
            message = this.localErrorMessage
          }
//          console.log('有嗎？', message)
//          console.log(message)
//          console.log(typeof(message))
          window.PACORTestManagerError(message)
//          throw new Error(this.error)
        }
        */
        if (window.PACORTestManager) {
          let message = this.responseErrorMessage
          if (!message) {
            message = this.localErrorMessage
          }
          window.PACORTestManager.error(message)
        }
      }
    },
  },
  methods: {
    addError (error) {
      //console.log('setErrorHandler', error)
      if (error 
              && error.response
              && error.response.data
              && error.response.data.error) {
        let message = error.response.data.error.message
        console.log(message)
        if (message === 'Please login'
                || message === `You don't have permission to access.`) {
          this.lib.auth.logoutAndReload()
          return null
        }
        else if (message === 'Network Error') {
          return null
        }
      }
      this.errors.push(error)
    },
    close () {
      if (Array.isArray(this.errors) === true) {
        if (this.errors.length > 0) {
          this.errors.shift()
        }
        else {
          this.showError = false
        }
      }
    },
    async retry (e) {
      if (typeof(this.error) !== 'object' 
              || typeof(this.error.config) !== 'object' 
              || typeof(this.error.config.url) !== 'string'
              || typeof(this.error.config.method) !== 'string') {
        return false
      }
      this.showError = false
      
      let data = this.error.config.params
      if (typeof(data) === 'undefined') {
        data = this.error.config.data
      }
      await this.lib.AxiosHelper[this.error.config.method](this.error.config.url, data)
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (ErrorHandler);

/***/ }),

/***/ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?f976":
/*!**********************************************************************************************!*\
  !*** ./webpack-app/components/manager/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ErrorHandler.js?vue&type=script&lang=js& */ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?7f88");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CErrorHandler%5CErrorHandler.vue":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/manager/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CErrorHandler%5CErrorHandler.vue ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CErrorHandler%5CErrorHandler.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/manager/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CErrorHandler%5CErrorHandler.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true&":
/*!*********************************************************************************************************************************!*\
  !*** ./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_6279df20_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_6279df20_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_6279df20_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_6279df20_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_6279df20_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ErrorHandler_less_vue_type_style_index_0_id_6279df20_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.vue":
/*!**********************************************************************!*\
  !*** ./webpack-app/components/manager/ErrorHandler/ErrorHandler.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ErrorHandler_html_vue_type_template_id_6279df20_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ErrorHandler.html?vue&type=template&id=6279df20&scoped=true& */ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.html?vue&type=template&id=6279df20&scoped=true&");
/* harmony import */ var _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorHandler.js?vue&type=script&lang=js& */ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.js?vue&type=script&lang=js&?f976");
/* empty/unused harmony star reexport *//* harmony import */ var _ErrorHandler_less_vue_type_style_index_0_id_6279df20_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true& */ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.less?vue&type=style&index=0&id=6279df20&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CErrorHandler%5CErrorHandler.vue */ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cmanager%5CErrorHandler%5CErrorHandler.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ErrorHandler_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ErrorHandler_html_vue_type_template_id_6279df20_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ErrorHandler_html_vue_type_template_id_6279df20_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6279df20",
  null
  
)

/* custom blocks */

if (typeof _ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_ErrorHandler_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cmanager_5CErrorHandler_5CErrorHandler_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/manager/ErrorHandler/ErrorHandler.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/StyleManager.html?vue&type=template&id=90d28aa0&":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/StyleManager.html?vue&type=template&id=90d28aa0& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StyleManager_html_vue_type_template_id_90d28aa0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./StyleManager.html?vue&type=template&id=90d28aa0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/manager/StyleManager/StyleManager.html?vue&type=template&id=90d28aa0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StyleManager_html_vue_type_template_id_90d28aa0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StyleManager_html_vue_type_template_id_90d28aa0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/StyleManager.js?vue&type=script&lang=js&?18c1":
/*!**********************************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/StyleManager.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _computedStyleManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computedStyleManager.js */ "./webpack-app/components/manager/StyleManager/computedStyleManager.js");
/* harmony import */ var _computedDeviceStyleManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computedDeviceStyleManager.js */ "./webpack-app/components/manager/StyleManager/computedDeviceStyleManager.js");
/* harmony import */ var _methodsStyleManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methodsStyleManager.js */ "./webpack-app/components/manager/StyleManager/methodsStyleManager.js");
/* harmony import */ var _methodsScrollStyleManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methodsScrollStyleManager.js */ "./webpack-app/components/manager/StyleManager/methodsScrollStyleManager.js");
let StyleManager = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
      isStackWidth: null,
      isSmallHeight: null,
      clientHeight: null
    }
  },
  computed: {}, // computedStyleManager.js
//  watch: {
//  },
  mounted () {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {} // methodsStyleManager.js
}


Object(_computedStyleManager_js__WEBPACK_IMPORTED_MODULE_0__["default"])(StyleManager)


Object(_computedDeviceStyleManager_js__WEBPACK_IMPORTED_MODULE_1__["default"])(StyleManager)


Object(_methodsStyleManager_js__WEBPACK_IMPORTED_MODULE_2__["default"])(StyleManager)


Object(_methodsScrollStyleManager_js__WEBPACK_IMPORTED_MODULE_3__["default"])(StyleManager)

/* harmony default export */ __webpack_exports__["default"] = (StyleManager);

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/StyleManager.js?vue&type=script&lang=js&?644e":
/*!**********************************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/StyleManager.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StyleManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./StyleManager.js?vue&type=script&lang=js& */ "./webpack-app/components/manager/StyleManager/StyleManager.js?vue&type=script&lang=js&?18c1");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_StyleManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/StyleManager.vue":
/*!**********************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/StyleManager.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StyleManager_html_vue_type_template_id_90d28aa0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StyleManager.html?vue&type=template&id=90d28aa0& */ "./webpack-app/components/manager/StyleManager/StyleManager.html?vue&type=template&id=90d28aa0&");
/* harmony import */ var _StyleManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StyleManager.js?vue&type=script&lang=js& */ "./webpack-app/components/manager/StyleManager/StyleManager.js?vue&type=script&lang=js&?644e");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StyleManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StyleManager_html_vue_type_template_id_90d28aa0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StyleManager_html_vue_type_template_id_90d28aa0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/manager/StyleManager/StyleManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/computedDeviceStyleManager.js":
/*!***********************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/computedDeviceStyleManager.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_mobile_device_detect_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/mobile-device-detect/index.js */ "./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/index.js");


/* harmony default export */ __webpack_exports__["default"] = (function (StyleManager) {
  
  StyleManager.computed.deviceDetect = function () {
    return _lib_mobile_device_detect_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
  
//  const osMapping = {
//    'MacIntel': 'iOS',
//    'Linux armv8l': 'Android',
//    'Win32': 'Windows'
//  }
//  
//  StyleManager.computed.detectOS = function () {
//    let platform = window.navigator.platform
//    if (typeof(osMapping[platform]) === 'string') {
//      platform = osMapping[platform]
//    }
//    console.log(MDD.isMobile)
//    return platform
//  }

  /**
   * Mac OS
   */
  StyleManager.computed.detectOS = function () {
    //console.log('@TEST Detect OS: Mac OS')
    //return 'Mac OS'  // for test
    
    let osName = this.deviceDetect.osName
    //console.log({osName})
    return osName
  }
  
  StyleManager.computed.detectIsIOS = function () {
    return (this.detectOS === 'Mac OS'
            || this.detectOS === 'iOS')
  }
  
  StyleManager.computed.detectBrowser = function () {
    return this.deviceDetect.browserName
  }
});

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/computedStyleManager.js":
/*!*****************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/computedStyleManager.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_TempScrollBox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/TempScrollBox.js */ "./webpack-app/components/manager/StyleManager/lib/TempScrollBox.js");


/* harmony default export */ __webpack_exports__["default"] = (function (StyleManager) {
  
  StyleManager.computed.isLeftHanded = function () {
    if (this.status.preference
            && this.status.preference.leftHanded) {
      return this.status.preference.leftHanded
    }
    return false
  } // StyleManager.computed.isLeftHanded = function () {

  StyleManager.computed.isEnableAnimate = function () {
    if (this.status.preference
            && typeof(this.status.preference.EInkMode) === 'boolean' ) {
      return !this.status.preference.EInkMode
    }
    return true
  } // StyleManager.computed.isEnableAnimate = function () {
  
  StyleManager.computed.params = function () {
    return this.config.styleConfig
  }
  
  StyleManager.computed.scrollBarWidth = function () {
    return (new _lib_TempScrollBox_js__WEBPACK_IMPORTED_MODULE_0__["default"]()).width
  }
  
});

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/lib/TempScrollBox.js":
/*!**************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/lib/TempScrollBox.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 
 * @type typehttps://stackoverflow.com/a/55278118/6645399
 */
class TempScrollBox {
  constructor() {
    this.scrollBarWidth = 0;

    this.measureScrollbarWidth();
  }

  measureScrollbarWidth() {
    // Add temporary box to wrapper
    let scrollbox = document.createElement('div');

    // Make box scrollable
    scrollbox.style.overflow = 'scroll';

    // Append box to document
    document.body.appendChild(scrollbox);

    // Measure inner width of box
    this.scrollBarWidth = scrollbox.offsetWidth - scrollbox.clientWidth;

    // Remove box
    document.body.removeChild(scrollbox);
  }

  get width() {
    return this.scrollBarWidth;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TempScrollBox);

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/constants.js":
/*!*******************************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/constants.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DEVICE_TYPES = {
  MOBILE: "mobile",
  TABLET: "tablet",
  SMART_TV: "smarttv",
  CONSOLE: "console",
  WEARABLE: "wearable",
  BROWSER: undefined
};

const BROWSER_TYPES = {
  CHROME: "Chrome",
  FIREFOX: "Firefox",
  OPERA: "Opera",
  YANDEX: "Yandex",
  SAFARI: "Safari",
  INTERNET_EXPLORER: "Internet Explorer",
  EDGE: "Edge",
  CHROMIUM: "Chromium",
  IE: "IE",
  MOBILE_SAFARI: "Mobile Safari"
};

const OS_TYPES = {
  IOS: "iOS",
  ANDROID: "Android",
  WINDOWS_PHONE: "Windows Phone"
};

const defaultData = {
  isMobile: false,
  isTablet: false,
  isBrowser: false,
  isSmartTV: false,
  isConsole: false,
  isWearable: false
};

/* harmony default export */ __webpack_exports__["default"] = ({ BROWSER_TYPES, DEVICE_TYPES, OS_TYPES, defaultData });


/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/index.js":
/*!***************************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/index.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/constants.js");
/* harmony import */ var _ua_parser_js_ua_parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ua-parser-js/ua-parser.js */ "./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/ua-parser-js/ua-parser.js");
//const $ = require('jquery')



const {
  BROWSER_TYPES,
  OS_TYPES,
  DEVICE_TYPES,
  defaultData
} = _constants_js__WEBPACK_IMPORTED_MODULE_1__["default"]

//console.log(BROWSER_TYPES)

//const UA = require("./ua-parser-js/ua-parser.js");

//console.log(UA)

const browser = _ua_parser_js_ua_parser_js__WEBPACK_IMPORTED_MODULE_2__["default"].getBrowser();
const device = _ua_parser_js_ua_parser_js__WEBPACK_IMPORTED_MODULE_2__["default"].getDevice();
const engine = _ua_parser_js_ua_parser_js__WEBPACK_IMPORTED_MODULE_2__["default"].getEngine();
const os = _ua_parser_js_ua_parser_js__WEBPACK_IMPORTED_MODULE_2__["default"].getOS();
const ua = _ua_parser_js_ua_parser_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUA();

const {
  CHROME,
  CHROMIUM,
  IE,
  INTERNET_EXPLORER,
  OPERA,
  FIREFOX,
  SAFARI,
  EDGE,
  YANDEX,
  MOBILE_SAFARI
} = BROWSER_TYPES;
const { MOBILE, TABLET, SMART_TV, BROWSER, WEARABLE, CONSOLE } = DEVICE_TYPES;
const { ANDROID, WINDOWS_PHONE, IOS } = OS_TYPES;

const checkType = type => {
  switch (type) {
    case MOBILE:
      return { isMobile: true };
    case TABLET:
      return { isTablet: true };
    case SMART_TV:
      return { isSmartTV: true };
    case CONSOLE:
      return { isConsole: true };
    case WEARABLE:
      return { isWearable: true };
    case BROWSER:
      return { isBrowser: true };
    default:
      return defaultData;
  }
};

const broPayload = (isBrowser, browser, engine, os, ua) => {
  return {
    isBrowser,
    browserMajorVersion: browser.major,
    browserFullVersion: browser.version,
    browserName: browser.name,
    engineName: engine.name || false,
    engineVersion: engine.version,
    osName: os.name,
    osVersion: os.version,
    userAgent: ua
  };
};

const mobilePayload = (type, device, os, ua) => {
  return {
    ...type,
    vendor: device.vendor,
    model: device.model,
    os: os.name,
    osVersion: os.version,
    ua: ua
  };
};

const stvPayload = (isSmartTV, engine, os, ua) => {
  return {
    isSmartTV,
    engineName: engine.name,
    engineVersion: engine.version,
    osName: os.name,
    osVersion: os.version,
    userAgent: ua
  };
};

const consolePayload = (isConsole, engine, os, ua) => {
  return {
    isConsole,
    engineName: engine.name,
    engineVersion: engine.version,
    osName: os.name,
    osVersion: os.version,
    userAgent: ua
  };
};

const wearPayload = (isWearable, engine, os, ua) => {
  return {
    isWearable,
    engineName: engine.name,
    engineVersion: engine.version,
    osName: os.name,
    osVersion: os.version,
    userAgent: ua
  };
};

const isMobileType = () => device.type === MOBILE;
const isTabletType = () => device.type === TABLET;

const isMobileAndTabletType = () => {
  switch (device.type) {
    case MOBILE:
    case TABLET:
      return true;
    default:
      return false;
  }
};

const isSmartTVType = () => device.type === SMART_TV;
const isBrowserType = () => device.type === BROWSER;
const isWearableType = () => device.type === WEARABLE;
const isConsoleType = () => device.type === CONSOLE;
const isAndroidType = () => os.name === ANDROID;
const isWinPhoneType = () => os.name === WINDOWS_PHONE;
const isIOSType = () => os.name === IOS;
const isChromeType = () => browser.name === CHROME;
const isFirefoxType = () => browser.name === FIREFOX;
const isChromiumType = () => browser.name === CHROMIUM;
const isEdgeType = () => browser.name === EDGE;
const isYandexType = () => browser.name === YANDEX;
const isSafariType = () =>
  browser.name === SAFARI || browser.name === MOBILE_SAFARI;

const isMobileSafariType = () => browser.name === MOBILE_SAFARI;
const isOperaType = () => browser.name === OPERA;
const isIEType = () =>
  browser.name === INTERNET_EXPLORER || browser.name === IE;

const getBrowserFullVersion = () => browser.major;
const getBrowserVersion = () => browser.version;
const getOsVersion = () => (os.version ? os.version : "none");
const getOsName = () => (os.name ? os.name : "none");
const getBrowserName = () => browser.name;
const getMobileVendor = () => (device.vendor ? device.vendor : "none");
const getMobileModel = () => (device.model ? device.model : "none");
const getEngineName = () => engine.name;
const getEngineVersion = () => engine.version;
const getUseragent = () => ua;
const getDeviceType = () => device.type;

const isSmartTV = isSmartTVType();
const isConsole = isConsoleType();
const isWearable = isWearableType();
const isMobileSafari = isMobileSafariType();
const isChromium = isChromiumType();
const isMobile = isMobileAndTabletType();
const isMobileOnly = isMobileType();
const isTablet = isTabletType();
const isBrowser = isBrowserType();
const isAndroid = isAndroidType();
const isWinPhone = isWinPhoneType();
const isIOS = isIOSType();
const isChrome = isChromeType();
const isFirefox = isFirefoxType();
const isSafari = isSafariType();
const isOpera = isOperaType();
const isIE = isIEType();
const osVersion = getOsVersion();
const osName = getOsName();
const fullBrowserVersion = getBrowserFullVersion();
const browserVersion = getBrowserVersion();
const browserName = getBrowserName();
const mobileVendor = getMobileVendor();
const mobileModel = getMobileModel();
const engineName = getEngineName();
const engineVersion = getEngineVersion();
const getUA = getUseragent();
const isEdge = isEdgeType();
const isYandex = isYandexType();
const deviceType = getDeviceType()

const type = checkType(device.type);

function deviceDetect () {
  const {
    isBrowser,
    isMobile,
    isTablet,
    isSmartTV,
    isConsole,
    isWearable
  } = type;
  if (isBrowser) {
    return broPayload(isBrowser, browser, engine, os, ua);
  }

  if (isSmartTV) {
    return stvPayload(isSmartTV, engine, os, ua);
  }

  if (isConsole) {
    return consolePayload(isConsole, engine, os, ua);
  }

  if (isMobile) {
    return mobilePayload(type, device, os, ua);
  }

  if (isTablet) {
    return mobilePayload(type, device, os, ua);
  }

  if (isWearable) {
    return wearPayload(isWearable, engine, os, ua);
  }
};

/* harmony default export */ __webpack_exports__["default"] = ({
  deviceDetect,
  isSmartTV,
  isConsole,
  isWearable,
  isMobileSafari,
  isChromium,
  isMobile,
  isMobileOnly,
  isTablet,
  isBrowser,
  isAndroid,
  isWinPhone,
  isIOS,
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  osVersion,
  osName,
  fullBrowserVersion,
  browserVersion,
  browserName,
  mobileVendor,
  mobileModel,
  engineName,
  engineVersion,
  getUA,
  isEdge,
  isYandex,
  deviceType
});

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/ua-parser-js/ua-parser.js":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/lib/mobile-device-detect/ua-parser-js/ua-parser.js ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/*!
 * UAParser.js v0.7.21
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2019 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.21',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser
            /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,                      // Baidu Browser
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            ], [NAME, VERSION], [

            /(konqueror)\/([\w\.]+)/i                                           // Konqueror
            ], [[NAME, 'Konqueror'], VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i                          // Microsoft Edge
            ], [[NAME, 'Edge'], VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(Avast)\/([\w\.]+)/i                                               // Avast Secure Browser
            ], [[NAME, 'Avast Secure Browser'], VERSION], [

            /(AVG)\/([\w\.]+)/i                                                 // AVG Secure Browser
            ], [[NAME, 'AVG Secure Browser'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /(focus)\/([\w\.]+)/i                                               // Firefox Focus
            ], [[NAME, 'Firefox Focus'], VERSION], [

            /(opt)\/([\w\.]+)/i                                                 // Opera Touch
            ], [[NAME, 'Opera Touch'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i         // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(windowswechat qbcore)\/([\w\.]+)/i                                // WeChat Desktop for Windows Built-in Browser
            ], [[NAME, 'WeChat(Win) Desktop'], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(brave)\/([\w\.]+)/i                                               // Brave browser
            ], [[NAME, 'Brave'], VERSION], [

            /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
            ], [NAME, VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /(baiduboxapp)[\/\s]?([\w\.]+)/i                                    // Baidu App
            ], [NAME, VERSION], [

            /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
            ], [NAME, VERSION], [

            /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
            ], [NAME], [

            /(LBBROWSER)/i                                                      // LieBao Browser
            ], [NAME], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
            ], [VERSION, [NAME, 'Facebook']], [

            /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
            /android.+(line)\/([\w\.]+)\/iab/i                                  // Line App for Android
            ], [NAME, VERSION], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(sailfishbrowser)\/([\w\.]+)/i                                     // Sailfish Browser
            ], [[NAME, 'Sailfish Browser'], VERSION], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360
            ], [[NAME, '360 Browser']], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
            ], [[NAME, 'GSA'], VERSION], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i                        // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple'], [TYPE, SMARTTV]], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/.+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i                         // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
            /android.+aft([bms])\sbuild/i                                       // Fire TV
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,                        // HTC
            /(zte)-(\w*)/i,                                                     // ZTE
            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                                                                                // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p|vog-l29|ane-lx1|eml-l29)/i                              // Huawei
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /android.+(bah2?-a?[lw]\d{2})/i                                     // Huawei MediaPad
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w*)/i                                                        // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i                   // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i             // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [
            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
            /(lenovo)[_\s-]?([\w-]+)/i
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)[\s)]/i                                       // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel( [23])?( xl)?)[\s)]/i                              // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,    
                                                                                // Xiaomi Mi
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i       // Redmi Phones
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
            /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i            // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
            /(mz)-([\w-]{2,})/i
            ], [[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [

            /android.+a000(1)\s+build/i,                                        // OnePlus
            /android.+oneplus\s(a\d{4})[\s)]/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i                      // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+;\s(PH-1)\s/i
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /[\s\/\(](smart-?tv)[;\)]/i                                         // SmartTV
            ], [[TYPE, SMARTTV]], [

            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,     
                                                                                // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
            /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i                                                // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////
    let UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

        this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            var cpu = { architecture: undefined };
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            var engine = { name: undefined, version: undefined };
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            var os = { name: undefined, version: undefined };
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };

//console.log(new UAParser().getBrowser)

    /* harmony default export */ __webpack_exports__["default"] = (new UAParser());

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/methodsScrollStyleManager.js":
/*!**********************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/methodsScrollStyleManager.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (StyleManager) {
  
  StyleManager.methods.scrollTo = async function (options) {
    if (!this.detectIsIOS) {
      window.scrollTo(options)
    }
    else {
      let pageYOffset = window.pageYOffset
      while (pageYOffset !== options.top) {
        let interval = options.top - pageYOffset 
        
        let nextTop 
        if (Math.abs(interval) < 50) {
          nextTop = options.top
        }
        else {
          let step = (interval / 20)
          if (Math.abs(step) < 50) {
            if (step > 0) {
              step = 50
            }
            else {
              step = -50
            }
          }
          nextTop = pageYOffset + step
        }
        
        window.scrollTo({
          top: nextTop
        })
        //console.log('有動嗎？', )
        await this.lib.VueHelper.sleep(10)
        pageYOffset = nextTop
      }
    }
  }
  
  StyleManager.methods.scrollIntoView = function (element, options) {
    if (this.detectOS !== 'Mac OS') {
      element.scrollIntoView(options)
    }
    else {
      let top = element.offsetTop
      
      if (options.block === 'center') {
        let height = element.clientHeight
        top = top + (height / 2)
      }
      
      this.scrollTo({
        top
      })
    }
  }
});

/***/ }),

/***/ "./webpack-app/components/manager/StyleManager/methodsStyleManager.js":
/*!****************************************************************************!*\
  !*** ./webpack-app/components/manager/StyleManager/methodsStyleManager.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (StyleManager) {
  
  StyleManager.methods.onWindowResize = function () {
    this.isStackWidth = (window.innerWidth < this.params.StackWidth)
    
    this.clientHeight = window.innerHeight
    this.isSmallHeight = (this.clientHeight < this.params.SmallHeight)
  }
  
//  StyleManager.methods.isStackWidth = function () {
//    let StackWidth = this.config.StackWidth
//    return (window.innerWidth < StackWidth)
//  }
//  
//  StyleManager.methods.isSmallHeight = function () {
//    return (window.innerHeight < this.config.SmallHeight)
//  }
//  
//  StyleManager.methods.getClientHeight = function (unit) {
//    let height = window.innerHeight
//
//    if (typeof (unit) === 'string') {
//      height = height + unit
//    }
//
//    return height
//  } // StyleManager.methods.getClientHeight = function (unit) {
});

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
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);



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

      this.rootContainer = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.non-invasive-web-style-framework:first')
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

/***/ }),

/***/ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.html?vue&type=template&id=386af451&scoped=true&":
/*!*********************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.html?vue&type=template&id=386af451&scoped=true& ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StepProgressBar_html_vue_type_template_id_386af451_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./StepProgressBar.html?vue&type=template&id=386af451&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.html?vue&type=template&id=386af451&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StepProgressBar_html_vue_type_template_id_386af451_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StepProgressBar_html_vue_type_template_id_386af451_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js&?4682":
/*!*************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


let StepProgressBar = {
  props: ['lib', 'config', 'progresses'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  /*
  components: {
  },
  computed: {
  },
  */
  watch: {
    'progresses': function () {
      this.initPopup()
    }
  },
  mounted: function () {
    this.initPopup()
  },
  computed: {
    currentStep: function () {
      if (Array.isArray(this.progresses) === false 
              || this.progresses.length === 0) {
        return this.$t('Not yet started')
      }
      
      for (let i = 0; i < this.progresses.length; i++) {
        let step = this.progresses[i]
        if (step.isCompleted === true) {
          continue
        }
        
        if (i === 0 
                && typeof(step.start_timestamp) !== 'number') {
          return '(' + this.$t('Not yet started') + ')'
        }
        
        return this.displayTitle(step)
      }
      return this.$t('READING_PROGRESS.finish')
    },
    allStepFinished: function () {
      for (let i = 0; i < this.progresses.length; i++) {
        let step = this.progresses[i]
        if (step.isCompleted === true) {
          continue
        }
        else {
          return false
        }
      }
      return true
    }
  },
  methods: {
    initPopup: function () {
      //console.log(Array.isArray(this.progresses))
      if (Array.isArray(this.progresses)) {
        setTimeout(() => {
          let buttons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.buttons).children()
          if (buttons.length > 0) {
            buttons.popup()
          }
        }, 0)
      }
    },
    getTitle: function (step_name) {
      if (typeof(step_name) === 'object'
              && typeof(step_name.step_name) === 'string') {
        step_name = step_name.step_name
      }
      return this.$t(`READING_PROGRESS.${step_name}`)
    },
    displayTitle: function (step) {
      let title = this.getTitle(step)
      if (typeof(step.start_timestamp) === 'number'){
        if (step.end_timestamp) {
          title = `${title} (${this.$t('Spent time')}: ${this.displayTime(step)})`
        }
        else {
          title = `${title} (${this.$t('Started at')}: ${this.displayTime(step)})`
        }
      }
      else {
        title = `${title} (${this.$t('not yet started')})`
      }
      return title
    },
    displayTime: function (step) {
      if (!this.lib.DayJSHelper) {
        return undefined
      }
      
      if (step.isCompleted === false) {
        return this.lib.DayJSHelper.toNow(step.start_timestamp)
      }
      else {
        return this.lib.DayJSHelper.shortTime(step.end_timestamp - step.start_timestamp)
        //return this.lib.DayJSHelper.from(step.start_timestamp, step.end_timestamp)
      }
      /*
      if (index === 0) {
        return this.lib.DayJSHelper.shortTime(start_timestamp)
      }
      else {
        let baseTimestamp = this.steps[0].start_timestamp
        return this.lib.DayJSHelper.to(baseTimestamp, start_timestamp)
      }
      */
    },
    displayClass: function (step) {
      if (this.allStepFinished === true) {
        return 'green'
      } 
      else if (step.isCompleted === true) {
        return 'grey'
      }
      else if (typeof(step.start_timestamp) === 'number') {
        return 'green'
      }
      else {
        return 'basic grey'
      }
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (StepProgressBar);

/***/ }),

/***/ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js&?be03":
/*!*************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StepProgressBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./StepProgressBar.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js&?4682");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_StepProgressBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true&":
/*!************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_386af451_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_386af451_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_386af451_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_386af451_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_386af451_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_StepProgressBar_less_vue_type_style_index_0_id_386af451_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.vue":
/*!*************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.vue ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StepProgressBar_html_vue_type_template_id_386af451_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StepProgressBar.html?vue&type=template&id=386af451&scoped=true& */ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.html?vue&type=template&id=386af451&scoped=true&");
/* harmony import */ var _StepProgressBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StepProgressBar.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.js?vue&type=script&lang=js&?be03");
/* empty/unused harmony star reexport *//* harmony import */ var _StepProgressBar_less_vue_type_style_index_0_id_386af451_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true& */ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.less?vue&type=style&index=0&id=386af451&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StepProgressBar.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CStepProgressBar%5CStepProgressBar.vue&lang=yaml */ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CStepProgressBar%5CStepProgressBar.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _StepProgressBar_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StepProgressBar_html_vue_type_template_id_386af451_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StepProgressBar_html_vue_type_template_id_386af451_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "386af451",
  null
  
)

/* custom blocks */

if (typeof _StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CStepProgressBar%5CStepProgressBar.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CStepProgressBar%5CStepProgressBar.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./StepProgressBar.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CStepProgressBar%5CStepProgressBar.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CStepProgressBar%5CStepProgressBar.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_StepProgressBar_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CStepProgressBar_5CStepProgressBar_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/PACORTestManager.html?vue&type=template&id=16c42c42&":
/*!***********************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/PACORTestManager.html?vue&type=template&id=16c42c42& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PACORTestManager_html_vue_type_template_id_16c42c42___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./PACORTestManager.html?vue&type=template&id=16c42c42& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/test/PACORTestManager/PACORTestManager.html?vue&type=template&id=16c42c42&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PACORTestManager_html_vue_type_template_id_16c42c42___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PACORTestManager_html_vue_type_template_id_16c42c42___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/PACORTestManager.js?vue&type=script&lang=js&?9840":
/*!***************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/PACORTestManager.js?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PACORTestManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./PACORTestManager.js?vue&type=script&lang=js& */ "./webpack-app/components/test/PACORTestManager/PACORTestManager.js?vue&type=script&lang=js&?ac97");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_PACORTestManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/PACORTestManager.js?vue&type=script&lang=js&?ac97":
/*!***************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/PACORTestManager.js?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _methodsPACORTestManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methodsPACORTestManager */ "./webpack-app/components/test/PACORTestManager/methodsPACORTestManager.js");
/* harmony import */ var _methodsFactoryPACORTestManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methodsFactoryPACORTestManager */ "./webpack-app/components/test/PACORTestManager/methodsFactoryPACORTestManager.js");
/* harmony import */ var _methodsWaitPACORTestManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methodsWaitPACORTestManager */ "./webpack-app/components/test/PACORTestManager/methodsWaitPACORTestManager.js");
/* harmony import */ var _methodsRandomPACORTestManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./methodsRandomPACORTestManager */ "./webpack-app/components/test/PACORTestManager/methodsRandomPACORTestManager.js");
/* harmony import */ var _methodsPuppeteerPACORTestManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./methodsPuppeteerPACORTestManager */ "./webpack-app/components/test/PACORTestManager/methodsPuppeteerPACORTestManager.js");
/* harmony import */ var _methodsExceptionPACORTestManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./methodsExceptionPACORTestManager */ "./webpack-app/components/test/PACORTestManager/methodsExceptionPACORTestManager.js");
/* harmony import */ var _methodsRemoteConsoleLogPACORTestManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./methodsRemoteConsoleLogPACORTestManager */ "./webpack-app/components/test/PACORTestManager/methodsRemoteConsoleLogPACORTestManager.js");
/* harmony import */ var _stepsReader_stepQuestionnairePACORTestManager_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./stepsReader/stepQuestionnairePACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/stepQuestionnairePACORTestManager.js");
/* harmony import */ var _stepsReader_stepSectionPACORTestManager_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stepsReader/stepSectionPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/stepSectionPACORTestManager.js");
/* harmony import */ var _stepsReader_stepStepInstructionPACORTestManager_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stepsReader/stepStepInstructionPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/stepStepInstructionPACORTestManager.js");
/* harmony import */ var _stepsReader_stepLoginPACORTestManager_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stepsReader/stepLoginPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/stepLoginPACORTestManager.js");
/* harmony import */ var _stepsReader_stepAddAnnotationPACORTestManager_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./stepsReader/stepAddAnnotationPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/stepAddAnnotationPACORTestManager.js");
/* harmony import */ var _stepsReader_stepInteractPACORTestManager_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./stepsReader/stepInteractPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/stepInteractPACORTestManager.js");
/* harmony import */ var _stepsAdmin_stepAdminConfigPACORTestManager_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./stepsAdmin/stepAdminConfigPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsAdmin/stepAdminConfigPACORTestManager.js");
/* harmony import */ var _stepsAdmin_stepAdminLoginPACORTestManager_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./stepsAdmin/stepAdminLoginPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsAdmin/stepAdminLoginPACORTestManager.js");


let PACORTestManager = {
  props: ['lib', 'status', 'config'],
  data() {    
//    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    jQuery () {
      return jquery__WEBPACK_IMPORTED_MODULE_0___default.a
    },
    isTesting () {
      return (typeof(window.PACORTestManagerInteractions) === 'function')
    },
    forceMaxTimeoutMinutes () {
      if (!this.status.readingConfig.debug) {
        return 1
      }
      
      let forceMaxTimeoutMinutes = this.status.readingConfig.debug.forceMaxTimeoutMinutes
      if (typeof(forceMaxTimeoutMinutes) === 'number') {
        console.log('@TEST forceMaxTimeoutMinutes', forceMaxTimeoutMinutes)
      }
      return forceMaxTimeoutMinutes
    },
    testConfig () {
      return this.status.readingConfig.debug.test
    }
  },
  watch: {
    'status.readingConfig' () {
      if (this.status.readingConfig
              && this.status.readingConfig.debug
              && this.status.readingConfig.debug.enable) {
        window.PACORTestManager = this
        //console.log('aaa')
        this.initDocumentTitle()
        this.checkBaseURL()
      }
    }
  },
  mounted() {
    this.initRemoteConsole()
//    //this.testSession()
  },
  methods: {
    checkBaseURL () {
      //console.log(this.config.baseURL.indexOf(':4000'))
      if (this.config.baseURL.indexOf(':4000') === -1) {
        //console.log('Current base URL is not for test: ' + this.config.baseURL)
      }
    },
    /**
    * 測試用
    * @returns {token}
    */
    testSession: async function () {
      let token = await this.lib.AxiosHelper.get('/client/Highlight/testSessionToken')
      console.log(token)
      
      let time = await this.lib.AxiosHelper.get('/client/Highlight/testSession', {
        token
      })
      console.log(time.time)
      
      await this.lib.VueHelper.sleep(3000)
      let time2 = await this.lib.AxiosHelper.get('/client/Highlight/testSession', {
        token
      })
      console.log(time2.time, (time.time === time2.time))
      
      await this.lib.VueHelper.sleep(3000)
      let time3 = await this.lib.AxiosHelper.get('/client/Highlight/testSession', {
        token
      })
      console.log(time3.time, (time.time === time3.time))
      
      await this.lib.VueHelper.sleep(3000)
      let time4 = await this.lib.AxiosHelper.get('/client/Highlight/clearSession', {
        token
      })
      console.log(time4.time, (time.time === time4.time))
    }
  } // methods
}


Object(_methodsPACORTestManager__WEBPACK_IMPORTED_MODULE_1__["default"])(PACORTestManager)


Object(_methodsFactoryPACORTestManager__WEBPACK_IMPORTED_MODULE_2__["default"])(PACORTestManager)


Object(_methodsWaitPACORTestManager__WEBPACK_IMPORTED_MODULE_3__["default"])(PACORTestManager)


Object(_methodsRandomPACORTestManager__WEBPACK_IMPORTED_MODULE_4__["default"])(PACORTestManager)


Object(_methodsPuppeteerPACORTestManager__WEBPACK_IMPORTED_MODULE_5__["default"])(PACORTestManager)


Object(_methodsExceptionPACORTestManager__WEBPACK_IMPORTED_MODULE_6__["default"])(PACORTestManager)


Object(_methodsRemoteConsoleLogPACORTestManager__WEBPACK_IMPORTED_MODULE_7__["default"])(PACORTestManager)

//import methodsWindowPACORTestManager from './methodsWindowPACORTestManager'
//methodsWindowPACORTestManager(PACORTestManager)

// ---------------
// readerSteps
// ---------------


Object(_stepsReader_stepQuestionnairePACORTestManager_js__WEBPACK_IMPORTED_MODULE_8__["default"])(PACORTestManager)


Object(_stepsReader_stepSectionPACORTestManager_js__WEBPACK_IMPORTED_MODULE_9__["default"])(PACORTestManager)


Object(_stepsReader_stepStepInstructionPACORTestManager_js__WEBPACK_IMPORTED_MODULE_10__["default"])(PACORTestManager)


Object(_stepsReader_stepLoginPACORTestManager_js__WEBPACK_IMPORTED_MODULE_11__["default"])(PACORTestManager)


Object(_stepsReader_stepAddAnnotationPACORTestManager_js__WEBPACK_IMPORTED_MODULE_12__["default"])(PACORTestManager)


Object(_stepsReader_stepInteractPACORTestManager_js__WEBPACK_IMPORTED_MODULE_13__["default"])(PACORTestManager)

// ---------------
// adminSteps
// ---------------


Object(_stepsAdmin_stepAdminConfigPACORTestManager_js__WEBPACK_IMPORTED_MODULE_14__["default"])(PACORTestManager)


Object(_stepsAdmin_stepAdminLoginPACORTestManager_js__WEBPACK_IMPORTED_MODULE_15__["default"])(PACORTestManager)

/* harmony default export */ __webpack_exports__["default"] = (PACORTestManager);

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/PACORTestManager.vue":
/*!***************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/PACORTestManager.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PACORTestManager_html_vue_type_template_id_16c42c42___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PACORTestManager.html?vue&type=template&id=16c42c42& */ "./webpack-app/components/test/PACORTestManager/PACORTestManager.html?vue&type=template&id=16c42c42&");
/* harmony import */ var _PACORTestManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PACORTestManager.js?vue&type=script&lang=js& */ "./webpack-app/components/test/PACORTestManager/PACORTestManager.js?vue&type=script&lang=js&?9840");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PACORTestManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PACORTestManager_html_vue_type_template_id_16c42c42___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PACORTestManager_html_vue_type_template_id_16c42c42___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/test/PACORTestManager/PACORTestManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/lib/RandomKeyword.tpl":
/*!****************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/lib/RandomKeyword.tpl ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "曾經\n亞洲\n四小龍\n之首\n一直\n愛著\n老婆\n看著\n許多\n走動\n走進去\n穿著\n牛仔褲\n靴子\n老皮\n夾克\n上班族\n明天\n開始\n上班\n沒錯\n本領\n活潑\n他們\n煩愁\n沒有\n同樣\n碎痕\n力量\n翻起\n岩石\n才能\n傷損\n連根起出\n知道\n深藏\n好想你\n遠離\n世界\n塵垢\n不露痕跡\n讚\n撇開\n日子\n奔忙\n失望\n絕望\n下一站\n天堂\n固執\n善良\n朋友\n關心\n海灘\n坦蕩蕩\n悲傷\n哭泣\n空氣\n突然\n安靜\n漫天\n飛舞\n流動";

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/lib/RandomKeywordHelper.js":
/*!*********************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/lib/RandomKeywordHelper.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RandomKeyword_tpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RandomKeyword.tpl */ "./webpack-app/components/test/PACORTestManager/lib/RandomKeyword.tpl");
/* harmony import */ var _RandomKeyword_tpl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_RandomKeyword_tpl__WEBPACK_IMPORTED_MODULE_0__);



const textList = _RandomKeyword_tpl__WEBPACK_IMPORTED_MODULE_0___default.a.trim().split('\n')
const len = textList.length - 1

let RandomKeywordHelper = function () {
  let text = textList[(Math.floor(Math.random() * textList.length))]
  if (!text) {
    return RandomKeywordHelper()
  }
  else {
    return text
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RandomKeywordHelper);

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/lib/RandomText.tpl":
/*!*************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/lib/RandomText.tpl ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "到上別未得省過優由臺以\n牛是銀像狀必同投點因市大們中小：\n只灣毒致濟女成應致。同常藝著黨通教不、\n最軍務以意度品費可認導生省樂各操往持美意西送只，\n同常藝著黨通教不、同常藝著黨通教不、\n中會文不產心現位而對士太養人費存年、\n面過色夜的；和命面高文發……\n不管語他為文加服常灣展經然行到己北民動須的一隨家全求快傷。\n天定神全不今經象了日相：\n想受術……向東其不我人與去錯小字覺會這息……\n能相推生而響至；開老滿得。\n世家著可老書說分害，有少隊指！\n總本了入學想教草中飯機心望十。\n工企服先那待等答車組科心最球總理。\n意景中最我之精為包上了農條告市汽創看那下四得。\n醫而了險香明人散氣過理，來持果平當國竟真水同化？\n山太但公家……報現了這氣文如會濟資，\n層這場資學生依明回就學可紀險至邊然都明況我樂灣。\n遊樣山較位手他會使者時生的了得布望導到果引西的消下國！\n海寫結中立，馬成車可一出地陽天。一線花的站，\n龍國受；論近片的重向口爭？其雖的有是格意經故院一，\n年兒共！市路安室軍少企面品別竟上選向由把參節，\n五書布燈地不專會等死會家我的史來另夫。\n皮人支受中名但、同常藝著黨通教不、\n盡問的當……同常藝著黨通教不、\n子的照策由行想國性所意及強水紅手飛線對關美？\n兩她陸有育地日製語他變嗎太自，\n後高慢電與現不可友已公場操設麼第頭著總了一業、\n那初大望全產要不升不是斯的全？\n分化會商那了然不不五亞不較下遊法人同半大黨！\n以空氣以善的何身方良吃沒進王牛是言公選現確流充的當資了不想少爭富型民家音許重，\n的洋就間家中間友法想構前美人老？點高列一，\n未理走現條有供正這不帶一影加……導馬無說多你灣的、\n數於業源務導我差媽是營讀使了富大時得星義出，\n了高通了說法，真有議一求集才自最代好與性應手三。\n經得個令內……於具排不界過感然息紀式已議所反好與登的聯問結此觀卻更用，\n地急兒車操辦朋叫、眼重大定正國便社星候配子處！\n的同字如研子，的個一他無們此國。\n真小二國言因這養由委量現圖於變代的快面就化法活果排你為進理及車音任布常許你友工講覺常他選起不意點血停投量我年易究無一，\n靜界大員了食生校你皮回能很吃快便草我一、\n坡的小主、利的至的自面過的重下甚識機意子；\n一河看受四園動家驚布思子氣全？\n入球快色接行條特進無無十上安臺去驗我站出專狀產你黃天於；\n親人感此營陽要係慢；男神都：\n易年以麼傷表，家一如他重官權溫把而待都間始決。\n麼水年易真有，受朋國到？\n力高用我蘭長術目痛果保立像驗是如到如？\n口試中源我從，客一氣的去定最，\n不新今笑過題家縣溫候益代作裝他功西過是今這。\n主爸意是果友東期……同常藝著黨通教不、\n界即有得三自他農坡人金還生格。\n使與學麼在外式只檢！不其個資資東。\n管片到打加不形象只計把想位北口子根據太人反長簡來論從：\n世升來熱裡，表白體於且同人果不朋識大考，\n作代改弟國園！回著己，統標當我？\n理急認的，成長心需轉要照件家三。\n麼提題聽舞角為容政子之。";

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/lib/RandomTextHelper.js":
/*!******************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/lib/RandomTextHelper.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RandomText_tpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RandomText.tpl */ "./webpack-app/components/test/PACORTestManager/lib/RandomText.tpl");
/* harmony import */ var _RandomText_tpl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_RandomText_tpl__WEBPACK_IMPORTED_MODULE_0__);



const textList = _RandomText_tpl__WEBPACK_IMPORTED_MODULE_0___default.a.trim().split('\n')
const len = textList.length - 1

let RandomTextHelper = function () {
  let text = textList[(Math.floor(Math.random() * textList.length))]
  if (!text) {
    return RandomTextHelper()
  }
  else {
    return text
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RandomTextHelper);

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/methodsExceptionPACORTestManager.js":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/methodsExceptionPACORTestManager.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  
  PACORTestManager.methods.getStackTrace = function () {

    var stack;

    try {
      throw new Error('');
    } catch (error) {
      stack = error.stack || '';
    }

    stack = stack.split('\n').map(function (line) {
      return line.trim();
    });
    return stack.splice(stack[0] == 'Error' ? 3 : 1);
  }
  
  PACORTestManager.methods.getStackTraceString = function () {
    return '\n  ' + this.getStackTrace().join('\n  ')
  }
  
  /**
   * https://gist.github.com/karlgroves/7544592
   */
  PACORTestManager.methods.getDomPath = function (el) {
    var stack = [];
    while (el.parentNode != null) {
      //console.log(el.nodeName);
      var sibCount = 0;
      var sibIndex = 0;
      for (var i = 0; i < el.parentNode.childNodes.length; i++) {
        var sib = el.parentNode.childNodes[i];
        if (sib.nodeName == el.nodeName) {
          if (sib === el) {
            sibIndex = sibCount;
          }
          sibCount++;
        }
      }
      if (el.hasAttribute('id') && el.id != '') {
        stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
      } else if (sibCount > 1) {
        stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
      } else {
        stack.unshift(el.nodeName.toLowerCase());
      }
      el = el.parentNode;
    }
    return stack.slice(1); // removes the html element
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/methodsFactoryPACORTestManager.js":
/*!****************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/methodsFactoryPACORTestManager.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_RandomTextHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/RandomTextHelper.js */ "./webpack-app/components/test/PACORTestManager/lib/RandomTextHelper.js");
/* harmony import */ var _lib_RandomKeywordHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/RandomKeywordHelper.js */ "./webpack-app/components/test/PACORTestManager/lib/RandomKeywordHelper.js");



/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  PACORTestManager.methods.createRandomText = function () {
    return Object(_lib_RandomTextHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"])()
  }
  
  PACORTestManager.methods.createRandomHtml = function () {
    return '<p>' + Object(_lib_RandomTextHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"])() + '</p>'
  }
  
  PACORTestManager.methods.createRandomKeyword = function () {
    return Object(_lib_RandomKeywordHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/methodsPACORTestManager.js":
/*!*********************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/methodsPACORTestManager.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  PACORTestManager.methods.sleep = async function (ms) {
    if (!this.lib.VueHelper) {
      return false
    }
    
    let min = -500
    let max = 500
    let adjusted = min + Math.floor(Math.random() *  (max - min - 1))
    
    ms = ms + adjusted
    
    if (this.lib.VueHelper) {
      return await this.lib.VueHelper.sleep(ms)
    }
  }
  
  PACORTestManager.methods.nextStep = async function () {
    await this.lib.auth.nextStep()
  }
  
  PACORTestManager.methods.retry = async function (max, callback) {
    if (typeof(max) === 'function' 
            && callback === undefined) {
      callback = max
      max = 3
    }
    
    for (let i = 0; i < max; i++) {
      try {
        await callback()
        break
      }
      catch (e) {
        if (i === max - 1) {
          throw e
        }
        else {
          console.error(e)
          console.log('[RETRY] ' + (i+1))
        }
      }
    }
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/methodsPuppeteerPACORTestManager.js":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/methodsPuppeteerPACORTestManager.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* global Element */



/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {

//  PACORTestManager.methods.log = function (...args) {
//    console.log.apply(this, args)
//    
//    //if (typeof(window.PACORTestManagerLog) === 'function') {
//    //  window.PACORTestManagerLog.apply(this, args)
//    //}
//  }
  
  PACORTestManager.methods.interact = async function (method, selector, ...args) {
    if (typeof(window.PACORTestManagerInteractions) !== 'function') {
      return null
    }
    
    let exec = async (ele) => {
      if (isVisible(ele) === false) {
        throw new Error('\nElement is not visible: ' + this.getDomPath(ele) 
            + this.getStackTraceString())
      }
      
      let tmpClassName = 'PACORTestManagerInteractions-' + this.lib.DayJSHelper.time()
      ele.addClass(tmpClassName)
      
      await this.sleep(100)
      args.unshift('.' + tmpClassName)
      args.unshift(method)
      
      try {
        await window.PACORTestManagerInteractions.apply(this, args)
      }
      catch (e) {
        throw new Error('\nError from puppeteer: ' + e 
                + '\nElement length: ' + ele.length
                + '\nElement classList: ' + ele.prop('classList')
                + '\nElement DOM path: ' + this.getDomPath(ele)
                + this.getStackTraceString())
      }
    }
    
    if (typeof(selector) === 'string') {
      if (selector.endsWith(':visible') === false) {
        selector = selector + ':visible'
      }
      let ele = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector)
      
      if (ele.length === 0) {
        throw new Error('\nElement not found: ' + selector 
                + this.getStackTraceString())
      }
      
      await exec(ele)
    }
    else {
      await exec(selector)
    }
  }
  
  PACORTestManager.methods.typeInput = async function (selector, text, throwNonVisibleException) {
    if (typeof(window.PACORTestManagerInteractions) === 'function') {
      let ele = selector
      
      if (typeof(ele) === 'string') {
        if (selector.endsWith(':visible') === false) {
          selector = selector + ':visible'
        }
        ele = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector)
      }
      
      if (isVisible(ele) === false) {
        if (throwNonVisibleException === false) {
          console.log('\nElement is not visible: ' + this.getDomPath(ele) 
              + this.getStackTraceString())
          return undefined
        }
        else {
          throw new Error('\nElement is not visible: ' + this.getDomPath(ele) 
              + this.getStackTraceString())
        }
      }
      
      if (ele.length === 0) {
        throw new Error('Element is not found: ' + selector)
      }
      
      let tagName = ele.prop('tagName').toLowerCase()
      let value
      if (tagName === 'input'
              || tagName === 'textarea') {
        value = ele.val()
      }
      else {
        value = ele.html()
      }
      
      await this.interact('type', selector, text)
      
      await this.sleep(100)
      
      if (tagName === 'input'
              || tagName === 'textarea') {
        if (ele.val() === value) {
          console.log('資料沒改變，重寫一次', selector)
          console.log(this.getStackTraceString())
          await this.sleep(1000)
          return await this.typeInput(ele, text)
        }
      }
      else {
        if (ele.html() === value) {
          console.log('資料沒改變，重寫一次', selector)
          console.log(this.getStackTraceString())
          await this.sleep(1000)
          return await this.typeInput(ele, text)
        }
      }
      
      
    }
    else {
      let ele = selector
      if (typeof(ele) === 'string') {
        ele = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector)
      }
      let tagName = ele.prop('tagName').toLowerCase()
      if (tagName === 'input'
              || tagName === 'textarea') {
        ele.val(text)
      }
      else {
        ele.html(text)
      }
    }
  }
  
  PACORTestManager.methods.click = async function (selector) {
    if (typeof(window.PACORTestManagerInteractions) === 'function') {
      await this.interact('click', selector)
    }
    else {
      let ele = selector
      if (typeof(ele) === 'string') {
        ele = jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector)
      }
      ele.click()
    }
  }
  
  PACORTestManager.methods.getIndex = async function (selector) {
    if (typeof(window.PACORTestManagerIndex) === 'function') {
      return await window.PACORTestManagerIndex()
    }
    return 0
  }
  
  PACORTestManager.methods.getName = async function () {
    if (typeof(window.PACORTestManagerName) === 'function') {
      return await window.PACORTestManagerName()
    }
    return 0
  }
  
  let adminConfig
  PACORTestManager.methods.getAdminConfig = async function () {
    if (adminConfig) {
      return adminConfig
    }
    
    if (typeof(window.PACORTestManagerAdminConfig) === 'function') {
      adminConfig = await window.PACORTestManagerAdminConfig()
      return adminConfig
    }
    return 0
  }
  
  PACORTestManager.methods.error = async function (message) {
    if (typeof(window.PACORTestManagerError) !== 'function') {
      return setTimeout(() => {
        this.error(message)
      }, 500)
    }
    window.PACORTestManagerError(message)
  }
  
  PACORTestManager.methods.pressEnter = async function () {
    if (typeof(window.PACORTestManagerPressEnter) !== 'function') {
      return setTimeout(() => {
        this.pressEnter()
      }, 500)
    }
    await window.PACORTestManagerPressEnter()
  }
  
  PACORTestManager.methods.pressEsc = async function () {
    if (typeof(window.PACORTestManagerPressEsc) !== 'function') {
      return setTimeout(() => {
        this.pressEsc()
      }, 500)
    }
    await window.PACORTestManagerPressEsc()
  }
  
  PACORTestManager.methods.getWebpageConfig = async function () {
    if (typeof(window.PACORTestManagerWebpageConfig) !== 'function') {
      //return setTimeout(() => {
      await this.sleep(500)
      return this.getWebpageConfig()
      //}, 500)
    }
    return await window.PACORTestManagerWebpageConfig()
  }
  
  PACORTestManager.methods.getWebpageGroup = async function () {
    if (typeof(window.PACORTestManagerWebpageGroup) !== 'function') {
      //return setTimeout(() => {
      await this.sleep(500)
      return this.getWebpageGroup()
      //}, 500)
    }
    return await window.PACORTestManagerWebpageGroup()
  }
  
  PACORTestManager.methods.initDocumentTitle = async function () {
    await this.sleep(1000)
    
    if (typeof(window.PACORTestManagerTitlePrefix) !== 'function') {
      //return setTimeout(() => {
      await this.sleep(500)
      return this.initDocumentTitle()
      //}, 500)
    }
    
    let prefix = await window.PACORTestManagerTitlePrefix()
    if (typeof(prefix) === 'string') {
      document.title = prefix + document.title
    }
  }
  
  /*
  let isVisible = function (elem) {
    if (typeof(elem[0]) === 'object') {
      elem = elem[0]
    }
    
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
  }
   */
  let isVisible = function (elem) {
    if (typeof(elem.filter) !== 'function') {
      elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem)
    }
    return (elem.filter(":visible").length > 0)
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/methodsRandomPACORTestManager.js":
/*!***************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/methodsRandomPACORTestManager.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
    
  PACORTestManager.methods.getRandomInt = function (min, max) {
    if (min && !max) {
      max = min
      min = 0
    }
    
    if (max === 0) {
      return 0
    }
    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * 給於一個0到1之間的數值，返回跟這個一樣的機率
   */
  PACORTestManager.methods.isRandomTrue = function (float) {
    return (Math.random() < float)
  }
  
  /**
   * @return Array 亂數順序的Array
   */
  PACORTestManager.methods.buildRandomIndexList = function (limit) {
    let list = []
    for (let i = 0; i < limit; i++) {
      list.push(i)
    }
    
    list.sort(() => Math.random() - 0.5)
    
    return list
  }
  
  PACORTestManager.methods.getRandomElement = function (elements) {
    if (!elements) {
      return undefined
    }
    else if (elements.length === 1) {
      return elements.eq(0)
    }
    
    let max = elements.length - 1
    let i = this.getRandomInt(max)
    return elements.eq(i)
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/methodsRemoteConsoleLogPACORTestManager.js":
/*!*************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/methodsRemoteConsoleLogPACORTestManager.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  /**
   * https://stackoverflow.com/a/41343061/6645399
   */
  PACORTestManager.methods.initRemoteConsole = async function () {
    if (!this.lib.VueHelper) {
      setTimeout(() => {
        this.initRemoteConsole()
      }, 100)
      return false
    }
    
    while (!this.status.readingConfig.debug) {
      await this.lib.VueHelper.sleep(100)
    }
    //console.log(this.status.readingConfig.debug)
    if (this.status.readingConfig.debug.enableRemoteConosleLog !== true) {
      return false
    }
    
    let AxiosHelper = this.lib.AxiosHelper
    let proxy = function (context, method, type) { 
      return function() {
        let message = []
//        arguments.forEach((arg) => {
//          console.warn(arg)
//          message.push(arg)
//        })
        //console.warn(JSON.stringify(arguments[0], null, 2))
        
        for (let i = 0; i < arguments.length; i++) {
          let arg = arguments[i]
          if (Array.isArray(arg) && typeof(arg[0]) !== 'object') {
            arg = arg.join('\n')
          }
          else if (typeof(arg) === 'object') {
            if (typeof(arg.stack) === 'string') {
              arg = arg.stack.trim()
            }
            else {
              try {
                arg = JSON.stringify(arg, null, 2)
              }
              catch (e) {
                arg = arg.toString()
              } 
              if (arg.startsWith('{')) {
                arg = arg.slice(1)
              }
              if (arg.endsWith('}')) {
                arg = arg.slice(0, -1)
              }
              arg = arg.trim()
            }
          }
          message.push(arg)
        }
        //console.warn(typeof(arguments.length))
        
        // --------------------
        
        method.apply(context, Array.prototype.slice.apply(arguments))
        
        AxiosHelper.post('/admin/Log/create', {
          message: message.join('\n'), 
          type
        })
        
      }
    }

    // let's do the actual proxying over originals
    window.console.log = proxy(window.console, window.console.log, 'log')
    window.console.error = proxy(window.console, window.console.error, 'error')
    window.console.warn = proxy(window.console, window.console.warn, 'warn')
    
    //throw new Error('測試throw', '第二個訊息')
    //console.error('測試console.error', '第二個訊息')
//    AxiosHelper.post('/admin/Log/create', {
//      message: 'Hello, world.'
//    })
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/methodsWaitPACORTestManager.js":
/*!*************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/methodsWaitPACORTestManager.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {  
  PACORTestManager.jQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default.a
    
  PACORTestManager.methods.waitForElement = async function (selector, options = {}) {
    let {
      timeout,
      baseElement,
      errorMessage
    } = options
    
    if (typeof(this.forceMaxTimeoutMinutes) === 'number') {
      timeout = this.forceMaxTimeoutMinutes * 60 * 1000 // 先不管，強制試試看
    }
    
    let maxWaitMS = timeout
    
    let getElement = () => {
      if (baseElement 
              && typeof(baseElement.find) === 'function') {
        return baseElement.find(selector)
      }
      else {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector)
      }
    }
    
    if (!maxWaitMS) {
      maxWaitMS = 150000
    }
    
    let s = getElement()
    if (s.length > 0) {
      return s
    }

    return new Promise((resolve, reject) => {
      let check = () => {
        s = getElement()
        if (s.length > 0) {
          s.eq(0)[0].scrollIntoView({
            behavior: 'smooth'
          })
          return resolve(s)
        }
        else {
          maxWaitMS = maxWaitMS - 100
          if (maxWaitMS <= 0) {
            let message = []
            if (errorMessage) {
              message.push('\n' + errorMessage)
            }
            message.push('\nElement not found: ' + selector)
            message.push(this.getStackTraceString())
            return reject(message.join(''))
          }
          
          setTimeout(() => {
            check()
          }, 100)
        }
      }
      
      check()
    })
  } // PACORTestManager.methods.waitForElement = async function (selector, maxWaitMS = 15000) {
  
  PACORTestManager.methods.waitForElementVisible = async function (selector, options) {
    
    if (selector.endsWith(':visible') === false) {
      selector = selector + ':visible'
    }
    
    return await this.waitForElement(selector, options)
  } // PACORTestManager.methods.waitForElementVisible = async function (selector, maxWaitMS) {
  
  PACORTestManager.methods.waitForElementHidden = async function (selector, options = {}) {
    let {
      timeout,
      baseElement,
      errorMessage
    } = options
    
    if (typeof(this.forceMaxTimeoutMinutes) === 'number') {
      timeout = this.forceMaxTimeoutMinutes * 60 * 1000 // 先不管，強制試試看
    }
    
    let maxWaitMS = timeout
    
    if (selector.endsWith(':visible') === false) {
      selector = selector + ':visible'
    }
    
    let getElement = () => {
      if (baseElement 
              && typeof(baseElement.find) === 'function') {
        return baseElement.find(selector)
      }
      else {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(selector)
      }
    }
    
    if (!maxWaitMS) {
      maxWaitMS = 150000
    }
    
    let s = getElement()
    if (s.length === 0) {
      return true
    }

    return new Promise((resolve, reject) => {
      let check = () => {
        s = getElement()
        if (s.length === 0) {
          setTimeout(() => {
            resolve(true)
          }, 500)
          return 
        }
        else {
          maxWaitMS = maxWaitMS - 500
          if (maxWaitMS <= 0) {
            let message = []
            if (errorMessage) {
              message.push('\n' + errorMessage)
            }
            message.push('\nElement still visible: ' + selector)
            message.push(this.getStackTraceString())
            return reject(message.join(''))
          }
          
          setTimeout(() => {
            check()
          }, 500)
        }
      }
      
      check()
    })
  } // PACORTestManager.methods.waitForElementVisible = async function (selector, maxWaitMS) {
  
  PACORTestManager.methods.waitForElementVisibleClick = async function (selector, options = {}) {
    let $ele = await this.waitForElementVisible(selector, options)
    
    try {
      await this.click($ele)
    }
    catch (e) {
      if (options.errorMessage) {
        console.log(options.errorMessage)
      }
      throw e
    }
    //if (typeof($ele.click) === 'function') {
    //  $ele.click()
    //}
    
    return $ele
  }
  
  PACORTestManager.methods.waitForElementClick = async function (selector, options = {}) {
    let $ele = await this.waitForElement(selector, options)
    
    try {
      await this.click($ele)
    }
    catch (e) {
      if (options.errorMessage) {
        console.log(options.errorMessage)
      }
      throw e
    }
    //if (typeof($ele.click) === 'function') {
    //  $ele.click()
    //}
    
    return $ele
  }
  
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsAdmin/stepAdminConfigPACORTestManager.js":
/*!****************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsAdmin/stepAdminConfigPACORTestManager.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  //console.log('@TEST $ adminConfig')
  //window.$ = $
    
  PACORTestManager.methods.adminPanel = async function (page) {
    //console.log('wait for debug')
    //await this.sleep(1000 * 60 * 30)
    
    //let webpageConfig = await this.getWebpageConfig()
    //console.log(webpageConfig)
    //let webpageGroup = await this.getWebpageGroup()
    //console.log(webpageGroup) return
    
    await this.waitForElementVisibleClick('.NavigationHeaderItem .step')
    
    // ---------------------------------
    await this.adminConfig(page)
    await this.adminGroup(page)
  }
  
  PACORTestManager.methods.adminConfig = async function (page) {
    await this.waitForElementVisible('.header-menu')
    //console.log($('.header-menu .more.item:visible').length)
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-menu .more.item:visible').length > 0) {
      await this.waitForElementVisibleClick('.header-menu .more.item')
      await this.lib.VueHelper.sleep(500)
    }
    
    let webpageConfig = await this.getWebpageConfig()
    //console.log(webpageConfig)
    if (webpageConfig && webpageConfig !== '' && webpageConfig !== '{}') {
      await this.waitForElementVisibleClick('.WebpageConfigEditor')

      await this.lib.VueHelper.sleep(1000)
     
      await this.waitForElementVisible('.webpage-config-textarea')
      
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.webpage-config-textarea').val('')
      await this.typeInput('.webpage-config-textarea:visible:first', webpageConfig)


      await this.lib.VueHelper.sleep(500)
      await this.waitForElementVisibleClick('.webpage-config-submit')

      //await this.pressEsc()
      await this.sleep(1500)

      await this.waitForElementVisibleClick('.ConfirmModal .cancel.button')
      await this.sleep(1500)
    }
  }
  
  PACORTestManager.methods.adminGroup = async function (page) {
    await this.waitForElementVisible('.header-menu')
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-menu .more.item:visible').length > 0) {
      await this.waitForElementVisibleClick('.header-menu .more.item')
      await this.lib.VueHelper.sleep(500)
    }
    
    let webpageGroup = await this.getWebpageGroup()
    //console.log(webpageGroup)
    if (webpageGroup && webpageGroup !== '' && webpageGroup !== '{}') {
      
      await this.waitForElementVisibleClick('.WebpageGroupEditor')

      await this.lib.VueHelper.sleep(1000)
      await this.waitForElementVisible('.webpage-group-textarea')

      //$('.webpage-group-textarea').val(webpageGroup)
      //$('.webpage-group-textarea').val('')
      
      await this.lib.VueHelper.sleep(500)
      
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.webpage-group-textarea').val('')
      await this.typeInput('.webpage-group-textarea:visible:first', webpageGroup)

      await this.lib.VueHelper.sleep(3500)
      await this.waitForElementVisibleClick('.webpage-group-submit')

      //await this.pressEsc()
      await this.sleep(1500)
      await this.waitForElementVisibleClick('.ConfirmModal:visible .cancel.button')
      await this.sleep(1500)
      
      //console.log('await for debug')
      //await this.sleep(1000 * 60 * 60)
    }
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsAdmin/stepAdminLoginPACORTestManager.js":
/*!***************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsAdmin/stepAdminLoginPACORTestManager.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  //window.$ = $
    
  PACORTestManager.methods.adminLogin = async function (page) {
    
    await this.waitForElementVisible('.header-menu')
    await this.sleep(500)
    //await this.sleep(3000 * 1000)
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-menu .more.item:visible').length > 0) {
      await this.waitForElementVisibleClick('.header-menu .more.item')
      //console.log('有點到嗎？')
      await this.sleep(500)
    }
    
    await this.waitForElementVisibleClick('.switch-mode-item')
    await this.interact('clear', '#loginUsername')
    
    let config = await this.getAdminConfig()
    //console.log(config)
    //console.log(name)
    await this.typeInput('#loginUsername', config.username)
    await this.typeInput('#loginPassword', config.password)
    
    // 接下來要加入切換管理者登入的下拉選單...
    
    //throw new Error('@underconstruction')
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationConfusedClarifiedPACORTestManager.js":
/*!*******************************************************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationConfusedClarifiedPACORTestManager.js ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  
  PACORTestManager.methods.writeConfusedClarifiedAnnotation = async function () {
    
    //throw new Error('澄清 走錯路了！是誰？')
    
    await this.waitTutorial()
    
    let questionEditor = await this.waitForElementVisible('.AnnotationPanel .QuestionEditor.html-editor-container .note-editable', {
      timeout: 3000
    })
    //questionEditor.html(this.createRandomHtml())
    await this.typeInput(questionEditor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(questionEditor, this.createRandomText())
    
    
    await this.sleep(100)
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
      timeout: 3000,
      errorMessage: 'writeConfusedClarifiedAnnotation 是不是沒有寫到QuestionEditor? 或是寫不夠長？'
    })
    
    await this.waitTutorial()
    
    let answerEditor = await this.waitForElementVisible('.AnnotationPanel .AnswerEditor.html-editor-container .note-editable', {
      timeout: 6000,
      errorMessage: '是不是傳送儲存花太多時間了？ writeConfusedClarifiedAnnotation'
    })
    //answerEditor.html(this.createRandomHtml())
    await this.typeInput(answerEditor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(questionEditor, this.createRandomText())
    await this.sleep(3000)
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled):last', {
      timeout: 3000,
      errorMessage: 'writeConfusedClarifiedAnnotation 是不是沒有寫到 answerEditor? 或是寫不夠長？'
    })
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 6000,
      errorMessage: '是不是傳送更新花太多時間了？ writeConfusedClarifiedAnnotation'
    })
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
  
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationConfusedPACORTestManager.js":
/*!**********************************************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationConfusedPACORTestManager.js ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  
  PACORTestManager.methods.writeConfusedAnnotation = async function () {
    
    let p = this.lib.AnnotationPanel.panelData.anchorPositions
    console.log('anchorPositions', this.lib.AnnotationPanel.panelData.anchorPositions)
    
    //throw new Error('困惑 走錯路了！是誰？')
    await this.waitTutorial()
        
    let questionEditor = await this.waitForElementVisible('.AnnotationPanel .QuestionEditor.html-editor-container .note-editable', {
      timeout: 3000
    })
    
    //questionEditor.html(this.createRandomHtml())
    await this.typeInput(questionEditor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(questionEditor, this.createRandomText())
    await this.sleep(100)
    
    if (!this.lib.AnnotationPanel.panelData.anchorPositions) {
      this.lib.AnnotationPanel.panelData.anchorPositions = p
    }
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
      timeout: 3000,
      errorMessage: 'writeConfusedAnnotation 是不是沒有寫到QuestionEditor? '
    })
    
    await this.waitTutorial()
    
    //await this.log('這邊我要確認一下'); await this.sleep(60 * 1000)
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ui.button:eq(1):not(.disabled)', {
      timeout: 3000,
      errorMessage: 'writeConfusedAnnotation 這裡很奇怪？是不是儲存沒有存好？'
    })
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: 'writeConfusedAnnotation 應該只會看到前面'
    })
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaDeletePACORTestManager.js":
/*!****************************************************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaDeletePACORTestManager.js ***!
  \****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  
  PACORTestManager.methods.deleteMainIdeaAnnotation = async function () {
    
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.my-MainIdea[data-pacor-highlight]').length === 0) {
      console.log('No Main Idea annotation')
      return false
    }
    
    console.log('Delete Annotation: Main Idea')
    
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget.show.is-fixed:visible').length > 0) {
      // 已經顯示了，不用執行這個
      await this.waitForElementVisibleClick('.AnnotationFloatWidget.show.is-fixed:visible .close.icon')
    }
    
    let highlights = await this.waitForElementVisible('.my-MainIdea[data-pacor-highlight]', {
      timeout: 3000
    })
    
    let highlight = this.getRandomElement(highlights)
    highlight.mouseover()
    await this.sleep(500)
    highlight.click()
    
    await this.sleep(3000)
    let editSelector = '.AnnotationFloatWidget .AnnotationItem .meta'
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget .list-button:visible').length > 0) {
      editSelector = '.AnnotationFloatWidget .list-button'
    }
    
    try {
      await this.waitForElementVisibleClick(editSelector, {
        timeout: 1000
      })
      await this.sleep(1000)
    }
    catch (e) {
      console.log('Float widget is not visible... retry: ' + editSelector)
      return await this.deleteMainIdeaAnnotation()
    }
    
    // 等待Summernote載入
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget.show:visible > .segment').length > 0) {
      console.log('AnnotationFloatWidget還是開著 ', editSelector)
      return await this.deleteMainIdeaAnnotation()
    }
    
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .html-editor-container.editable').length === 0
            || jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .annotation-panel-buttons .delete-button:visible').length === 0) {
      // 這邊要先確認是否有在導覽中
      await this.waitTutorial()
      
      console.log('似乎是以列表的形式呈現，讓我點點看 stepAnnotationMainIdeaDeletePACORTestManager')
      try {
        await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation:first .meta', {
          timeout: 5000
        })
      }
      catch (e) {
        console.log('誤判嗎？ stepAnnotationMainIdeaDeletePACORTestManager')
      }
    }
    else {
      //await this.sleep(3000)
      // 這邊要先確認是否有在導覽中
      await this.waitTutorial()
    }
    
    try {
      await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .delete-button', {
        timeout: 5000,
        errorMessage: 'stepAnnotationMainIdeaDeletePACORTestManager 是不是資料沒有輸入？或是寫不夠長？'
      })
    }
    catch (e) {
      console.log('stepAnnotationMainIdeaDeletePACORTestManager 沒找到刪除按鈕啊，全部重來一次好了')
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .close.icon:visible').length > 0) {
        await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
          timeout: 5000
        })
      }
      return await this.deleteMainIdeaAnnotation()
    }
    
    await this.waitTutorial()
    
    await this.waitForElementVisibleClick('.ConfirmModal .ok.button')
    
    await this.sleep(1000)
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .segment:visible').length !== 0
            || jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .close.icon:visible').length > 0) {
      try {
        await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
          timeout: 5000
        })
      }
      catch (e) {
        console.log('誤判嗎？ stepAnnotationMainIdeaEditPACORTestManager')
      }
    }
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '刪除完後，AnnotationPanel沒有消失. deleteMainIdeaAnnotation'
    })
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaEditPACORTestManager.js":
/*!**************************************************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaEditPACORTestManager.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  //window.$ = $
  
  PACORTestManager.methods.editMainIdeaAnnotation = async function () {
    
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.my-MainIdea[data-pacor-highlight]').length === 0) {
      console.log('No Main Idea annotation')
      return false
    }
    
    console.log('Edit Annotation: Main Idea')
    
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget.show.is-fixed:visible').length > 0) {
      // 已經顯示了，不用執行這個
      await this.waitForElementVisibleClick('.AnnotationFloatWidget.show.is-fixed:visible .close.icon')
    }
    
    let highlights = await this.waitForElementVisible('.my-MainIdea[data-pacor-highlight]', {
      timeout: 3000
    })
    
    let highlight = this.getRandomElement(highlights)
    highlight.mouseover()
    await this.sleep(500)
    highlight.click()
    
    await this.sleep(500)
    let editSelector = '.AnnotationFloatWidget .AnnotationItem .meta'
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget .list-button:visible').length > 0) {
      editSelector = '.AnnotationFloatWidget .list-button'
    }
    
    try {
      await this.waitForElementVisibleClick(editSelector, {
        timeout: 1000
      })
      await this.sleep(1000)
    }
    catch (e) {
      console.log('Float widget is not visible... retry')
      return await this.editMainIdeaAnnotation()
    }
    
    // 等待Summernote載入
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget.show:visible > .segment').length > 0) {
      console.log('AnnotationFloatWidget還是開著 ', editSelector)
      return await this.editMainIdeaAnnotation()
    }
    
    // 如果有一筆標註以上，那就會跳出列表
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .html-editor-container.editable').length === 0
            || jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .html-editor-container .note-editable').length === 0) {
      console.log('似乎是以列表的形式呈現，讓我點點看 stepAnnotationMainIdeaEditPACORTestManager')
      // 這邊要先確認是否有在導覽中
      await this.waitTutorial()
      
      try {
        await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation[data-annotation-type="MainIdea"]:first .meta', {
          timeout: 3000
        })
        await this.sleep(5000)
      }
      catch (e) {
        console.log('誤判嗎？ stepAnnotationMainIdeaEditPACORTestManager')
      }
    }
    else {
      // 這邊要先確認是否有在導覽中
      await this.waitTutorial()
    }
    
    let editor
    try {
      editor = await this.waitForElementVisible('.AnnotationPanel .html-editor-container .note-editable', {
        timeout: 5000
      })
    }
    catch (e) {
      console.log('stepAnnotationMainIdeaEditPACORTestManager 沒找到編輯框啊，全部重來一次好了')
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .close.icon:visible').length > 0) {
        await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
          timeout: 5000
        })
      }
      
      await this.sleep(1000)
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ConfirmModal i.checkmark.icon:visible').length > 0) {
        await this.waitForElementVisibleClick('.ConfirmModal i.checkmark.icon:visible', {
          timeout: 5000
        })
      }
      return await this.editMainIdeaAnnotation()
    }
    
    await this.waitTutorial()
    
    //editor.html(this.createRandomHtml())
    await this.typeInput(editor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(editor, this.createRandomText())
    await this.sleep(500)
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
      timeout: 3000,
      errorMessage: 'writeMainIdeaAnnotation 是不是資料沒有輸入？或是寫不夠長？'
    })
    
    await this.sleep(1000)
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .segment:visible').length !== 0
            || jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .close.icon:visible').length > 0) {
      try {
        await this.waitForElementVisibleClick('.AnnotationPanel .close.icon', {
          timeout: 5000
        })
      }
      catch (e) {
        console.log('誤判嗎？ stepAnnotationMainIdeaEditPACORTestManager')
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ConfirmModal i.checkmark.icon:visible').length > 0) {
          await this.waitForElementVisibleClick('.ConfirmModal i.checkmark.icon:visible', {
            timeout: 5000
          })
        }
      }
    }
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '編輯完後，AnnotationPanel沒有消失. writeMainIdeaAnnotation'
    })
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaPACORTestManager.js":
/*!**********************************************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaPACORTestManager.js ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  
  PACORTestManager.methods.writeMainIdeaAnnotation = async function () {
    let mainIdeaConfig = this.lib.auth.mainIdeaConfig
    let enableEditorAdd = mainIdeaConfig.enableEditorAdd
    
    console.log('writeMainIdeaAnnotation', enableEditorAdd)
    if (enableEditorAdd === false) {
      return false
    }
    
    let button = await this.waitForElementVisible('.AnnotationPanel .annotation-panel-buttons .ValidationButton', {
      timeout: 3000
    })
    if (button.hasClass('disabled') === false) {
      // 現在改成可以直接新增
      throw new Error('Add button should be disabled at default')
    }
    
    await this.sleep(1000)
    
    // 這邊要先確認是否有在導覽中
    await this.waitTutorial()
    
    let editor = await this.waitForElementVisible('.AnnotationPanel .html-editor-container .note-editable', {
      timeout: 3000
    })
    //editor.html(this.createRandomHtml())
    await this.typeInput(editor, this.createRandomText())
    await this.sleep(500)
    await this.typeInput(editor, this.createRandomText())
    await this.sleep(500)
    
    
    await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
      timeout: 3000,
      errorMessage: ' writeMainIdeaAnnotation 是不是資料沒有輸入？或是寫不夠長？'
    })
    
    await this.waitForElementHidden('.AnnotationPanel .segment', {
      timeout: 3000,
      errorMessage: '是不是傳送儲存花太多時間了？ writeMainIdeaAnnotation'
    })
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.sleep(100)
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/stepAddAnnotationPACORTestManager.js":
/*!*******************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/stepAddAnnotationPACORTestManager.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AnnotationTypeModules_stepAnnotationConfusedClarifiedPACORTestManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnotationTypeModules/stepAnnotationConfusedClarifiedPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationConfusedClarifiedPACORTestManager.js");
/* harmony import */ var _AnnotationTypeModules_stepAnnotationConfusedPACORTestManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnnotationTypeModules/stepAnnotationConfusedPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationConfusedPACORTestManager.js");
/* harmony import */ var _AnnotationTypeModules_stepAnnotationMainIdeaPACORTestManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnnotationTypeModules/stepAnnotationMainIdeaPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaPACORTestManager.js");
/* harmony import */ var _AnnotationTypeModules_stepAnnotationMainIdeaEditPACORTestManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnnotationTypeModules/stepAnnotationMainIdeaEditPACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaEditPACORTestManager.js");
/* harmony import */ var _AnnotationTypeModules_stepAnnotationMainIdeaDeletePACORTestManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AnnotationTypeModules/stepAnnotationMainIdeaDeletePACORTestManager.js */ "./webpack-app/components/test/PACORTestManager/stepsReader/AnnotationTypeModules/stepAnnotationMainIdeaDeletePACORTestManager.js");









/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  PACORTestManager.methods.writeAnnotations = async function () {
    
    await this.sleep(3000)
    
    if (!this.lib.RangyManager) {
      return false
    }
    await this.lib.RangyManager.cancelSelection()
    
    //let min = 4
    //let max = 10
    
    //let min = 4
    //let max = 10
    
    let min = this.testConfig.minAnnotation
    let max = this.testConfig.maxAnnotation
    //let min = 3, max = 6
    //let min = 4, max = 10
    //let 
    
    
    let writeAnnotations = min + Math.floor(Math.random() *  (max - min))
    
    // 改用亂數排列的形式
    let iList = this.buildRandomIndexList(writeAnnotations)
    
    for (let j = 0; j < iList.length; j++) {
      let i = iList[j]
      
      //if (j === 0) {
      //  // 測試用，我第一個就想要看到疑問
      //  i = 2
      //}
      
      await this.retry(3, async () => {
        await this.sleep(100)
        let t = (i % 4)
        console.log('撰寫標註：' + (j+1) + '/' + (writeAnnotations) + ' (type: ' + t + ')' )
        await this.selectAnnotationType(i)
        if (t === 0) {
          await this.writeMainIdeaAnnotation()
          //await this.writeConfusedAnnotation()
        }
        else if (t === 1) {
          await this.writeConfusedClarifiedAnnotation()
          //await this.writeConfusedAnnotation()
        }
        else if (t === 2) {
          await this.writeConfusedAnnotation()
        }
        else {
          await this.writeMainIdeaAnnotation()
        }

        await this.sleep(100)
      })
    } // for (let j = 0; j < iList.length; j++) {
    
    await this.editMainIdeaAnnotation()
    await this.deleteMainIdeaAnnotation()
  }
  
  PACORTestManager.methods.selectAnnotationType = async function (i, errorCount = 0) {
    //this.log('selectAnnotationType', 1)
    if (!this.lib.RangyManager) {
      return false
    }
    
    //await this.lib.RangyManager.cancelSelection()
    
    await this.lib.RangyManager.selectRandomRange()
    
    //this.log('selectAnnotationType', 2)
    await this.sleep(1000)
    
    if (this.lib.RangyManager.isSelecting() === false) {
      errorCount++
      if (errorCount === 3) {
        throw new Error('Selecting is failed.')
      }
      
      await this.sleep(3000)
      return this.selectAnnotationType(i, errorCount)
    }
      
    let typeItemSelector = '.fab-main-container .fab-item-container .fab-container'

    //if (i % 2 === 0) {
    let t = i % 4
    let baseMargin = 0
    
    let mainIdeaConfig = this.status.readingConfig.annotationTypeModules.MainIdea
    if (mainIdeaConfig.enableQuickAdd === true
            && mainIdeaConfig.enableEditorAdd === true) {
      baseMargin = 1
    }
    
    if (t === 0 || t === 3) {
      // 選擇重點
      //typeItemSelector = typeItemSelector + `:eq(${0 + baseMargin})`
      typeItemSelector = typeItemSelector + `.MainIdea:not(.quick-add)`
    }
    else if (t === 1 || t === 2) {
      //typeItemSelector = typeItemSelector + `:eq(${1 + baseMargin})`
      typeItemSelector = typeItemSelector + `.Confused`
    }
    //else if (t === 2) {
      // 選擇已澄清
    //  typeItemSelector = typeItemSelector + `:eq(${1 + baseMargin})`
    //}
    
    typeItemSelector = typeItemSelector + ' .icon'
    
    try {
      await this.waitForElementVisibleClick(typeItemSelector, {
        timeout: 10 * 1000,
        errorMessage: '是不是太早選取了啊？'
      })
    }
    catch (e) {
      errorCount++
      if (errorCount >= 4) {
        throw e
      }
      return await this.selectAnnotationType(i, errorCount)
    }
    
    //console.log('有順利選擇嗎？')
    await this.sleep(3000)
    
//    let p = this.lib.AnnotationPanel.panelData.anchorPositions
//    console.log('anchorPositions', p)
//    if (p === null) {
//      throw new Error('AnnotationPanel.panelData.anchorPositions is null')
//    }
    //console.log('要確認是否有pinSelection')
    //await this.sleep(1000 * 3000)
    //this.log('selectAnnotationType', 3)
  }
  
  
  Object(_AnnotationTypeModules_stepAnnotationConfusedClarifiedPACORTestManager_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PACORTestManager)
  Object(_AnnotationTypeModules_stepAnnotationConfusedPACORTestManager_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PACORTestManager)
  Object(_AnnotationTypeModules_stepAnnotationMainIdeaPACORTestManager_js__WEBPACK_IMPORTED_MODULE_3__["default"])(PACORTestManager)
  
  Object(_AnnotationTypeModules_stepAnnotationMainIdeaDeletePACORTestManager_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PACORTestManager)
  Object(_AnnotationTypeModules_stepAnnotationMainIdeaEditPACORTestManager_js__WEBPACK_IMPORTED_MODULE_4__["default"])(PACORTestManager)
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/stepInteractPACORTestManager.js":
/*!**************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/stepInteractPACORTestManager.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  PACORTestManager.methods.selectAnnotationFromSearch = async function (excludedMyAnnotation) {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationSingle:visible').length > 0) {
      // 已經顯示了，不用執行這個
      return true
    }
    
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationFloatWidget.show.is-fixed:visible').length > 0) {
      // 已經顯示了，不用執行這個
      await this.waitForElementVisibleClick('.AnnotationFloatWidget.show.is-fixed:visible .close.icon')
    }
    
    console.log('從搜尋來開啟標註...')
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.Navigation .SearchManager:visible .ui.icon.button:visible').length ===  0) {
      //console.log('找不到搜尋按鈕，打開側邊欄')
      await this.waitForElementVisibleClick('.Navigation .show-side-menu-item')
      await this.sleep(1000)
      await this.waitForElementVisibleClick('.vertical-menu .SearchManager:visible .ui.icon.button')
    }
    else {
      await this.waitForElementVisibleClick('.Navigation .SearchManager .ui.icon.button')
    }
    
    // 這邊要先確認是否有在導覽中
    await this.waitTutorial()
      
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .MainList.List:visible').length > 0) {
      //console.log('似乎是列表')
      
      if (excludedMyAnnotation === true) {
        let annotationItemCount = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .MainList.List:visible .AnnotationItem:not(.my-annotation)').length
        if (annotationItemCount === 0) {
          return false
        }
        let i = this.getRandomInt(annotationItemCount - 1)
        
        //console.log('點選標註 i = ' + i)
        await this.waitForElementVisibleClick('.AnnotationPanel .MainList.List:visible .AnnotationItem:not(.my-annotation):eq(' + i + ') .meta .right.angle.icon')
      }
      else {
        
        let annotationItemCount = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .MainList.List:visible .AnnotationItem').length
        let i = this.getRandomInt(annotationItemCount - 1)
        //console.log('點選標註 i = ' + i)
        await this.waitForElementVisibleClick('.AnnotationPanel .MainList.List:visible .AnnotationItem:eq(' + i + ') .meta .right.angle.icon')
      }
      await this.sleep(1000)
    }
    return true
  }
  
  PACORTestManager.methods.closeSelectAnnotation = async function () {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .main-segment:visible').length === 0) {
      // 已經隱藏了，不用執行這個
      return true
    }
    
    console.log('關閉AnnotationPanel')
    await this.waitForElementVisibleClick('.AnnotationPanel .label-buttons .close.icon')
    
    await this.sleep(1000)
    
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .main-segment:visible').length > 0) {
      // 已經隱藏了，不用執行這個
      throw new Error('沒有成功關閉AnnotationPanel')
    }
  }
  
  PACORTestManager.methods.addAndEditComments = async function (min, max) {
    for (let i = 0; i < this.getRandomInt(min, max); i++) {
      await this.addAndEditComment(i)
      await this.sleep(1000)
    }
  }
    
  PACORTestManager.methods.addAndEditComment = async function (i) {
    await this.selectAnnotationFromSearch()
    
    // 這邊要先確認是否有在導覽中
    await this.waitTutorial()
    
    console.log('建議留言 i=' + i)
    await this.typeInput('.AnnotationDiscussionInput .ui.input input[type="text"]', this.createRandomText())
    await this.sleep(500)
    
    await this.waitForElementVisibleClick('.AnnotationDiscussionInput .right-column button:not(.disabled):first')
    
    // ----------------
    // 然後編輯comment
    
    //await this.sleep(1000 * 10)
    
    console.log('編輯建議')
    await this.sleep(1000)
    await this.waitForElementVisibleClick('.AnnotationDiscussionList .AnnotationComment button.edit-button')
    await this.sleep(500)
    //console.log('已經成功加上編輯')
    await this.typeInput('.AnnotationDiscussionInput .ui.input input[type="text"]', this.createRandomText())
    //console.log('修改了文字')
    await this.waitForElementVisibleClick('.AnnotationDiscussionInput .right-column button:visible:not(.disabled):first')
    //console.log('完成編輯')
    await this.sleep(1000)
    await this.closeSelectAnnotation()
  }
  
  PACORTestManager.methods.likeAnnotation = async function () {
    await this.selectAnnotationFromSearch(true)
    
    // 這邊要先確認是否有在導覽中
    await this.waitTutorial()
    
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.AnnotationPanel .annotation-editor:visible .AnnotationInteractive button.like:visible').length > 0) {
      console.log('喜愛標註')
      await this.waitForElementVisibleClick('.AnnotationPanel .annotation-editor .AnnotationInteractive button.like')
      await this.sleep(500)
      await this.waitForElementVisibleClick('.AnnotationPanel .annotation-editor .AnnotationInteractive button.like.green')
      await this.sleep(500)
    }
    
    await this.closeSelectAnnotation()
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/stepLoginPACORTestManager.js":
/*!***********************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/stepLoginPACORTestManager.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  PACORTestManager.methods.login = async function (page) {
    
//    await page.waitForElement('#loginUsername')
//          .clear('#loginUsername')
//          .type('#loginUsername', '布丁' + (new Date()).getTime())
//          .waitForElement('div.ui.button.login-submit:not(.disabled)')
//          .click('div.ui.button.login-submit:not(.disabled)')
  
    await this.waitForElementVisible('#loginUsername')
    
    await this.interact('clear', '#loginUsername')
    
    let name = await this.getName()
    //console.log(name)
    await this.typeInput('#loginUsername', name)
    
    let index = await this.getIndex()
    //if (index === 0) {
    if (false) {}
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/stepQuestionnairePACORTestManager.js":
/*!*******************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/stepQuestionnairePACORTestManager.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  PACORTestManager.methods.writeQuestionnaireSplit = async function (page) {
    
    //this.retry(3, async () => {
    try {
      let textarea = await this.waitForElementVisible('textarea.answer')

      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText(), false)

      await this.sleep(500)
      
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText(), false)

  //    textarea.val(this.createRandomText())
  //            .trigger('input')
  //            .trigger('change')

      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea.answer:visible') === 0) {
        return
      }

      await this.waitForElementVisibleClick('.ui.button.questionnaire-submit:not(.disabled)')
    }
    catch (e) {
      console.log('對話框似乎已經不見了...')
    }
    //})
      
  }
  
  PACORTestManager.methods.writeQuestionnairePage = async function (page) {
    
    //this.retry(3, async () => {
    try {
      await this.waitForElementVisibleClick('.ui.button.open-answer-page')
      
      let textarea = await this.waitForElementVisible('textarea.answer')

      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText(), false)

      await this.sleep(500)
      
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText(), false)

  //    textarea.val(this.createRandomText())
  //            .trigger('input')
  //            .trigger('change')

      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea.answer:visible') === 0) {
        return
      }

      await this.waitForElementVisibleClick('.ui.button.questionnaire-submit:not(.disabled)')
    }
    catch (e) {
      console.log('對話框似乎已經不見了...')
    }
    //})
      
  }
  
  PACORTestManager.methods.writeQuestionnairePageKeyword = async function (page) {
    
    //this.retry(3, async () => {
    try {
      await this.waitForElementVisibleClick('.ui.button.open-answer-page')
      
      let input = await this.waitForElementVisible('.ui.search input')

      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ui.search input') === 0) {
        return
      }

      for (let i = 0; i < this.getRandomInt(2, 5); i++) {
        await this.typeInput('.ui.search input', this.createRandomKeyword(), false)
        await this.sleep(100)
        await this.waitForElementVisibleClick('.ui.search .submit-button')
        await this.sleep(100)
      }
      
      await this.waitForElementVisibleClick('.ui.button.questionnaire-submit:not(.disabled)')
    }
    catch (e) {
      console.log('對話框似乎已經不見了...')
    }
    //})
  }
});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/stepSectionPACORTestManager.js":
/*!*************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/stepSectionPACORTestManager.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  PACORTestManager.methods.completeChecklists = async function () {
    await this.waitForElementVisible('.SectionChecklist', {
      timeout: 3000,
      errorMessage: '是不是沒有讀取到section init啊？壞掉了嗎？'
    })
    
    let panels = await this.waitForElementVisible('body > article > .SectionPanel', {
      timeout: 3000,
      errorMessage: '是不是section init讀取太久了？'
    })
    //let checklists = await PACORTestManager.waitForElementVisible('body > article > .SectionPanel .SectionChecklist', 1000)

    if (panels.length !== 2) {
      throw new Error('.SectionPanel .SectionChecklist not found')
    }

    //PACORTestManager.log('checklists.length', checklists.length)

    for (let i = 0; i < panels.length; i++) {
      await this.sleep(100)

      //this.log('completeChecklists panel', i, 1)

      let panel = panels.eq(i)
      let checklist = panel.find('.SectionChecklist')
      let items = checklist.find('input[type="checkbox"]')
      if (items.length !== 3) {
        throw new Error('input[type="checkbox"] not found: ' + checklist.html())
      }
      
      //this.log('completeChecklists panel', i, 2)

      for (let j = 0; j < items.length; j++) {
        await this.sleep(100)

        let item = items.eq(j)
        item[0].scrollIntoView({
          behavior: 'smooth'
        })
        item.focus().click()
      } // for (let j = 0; j < items.length; j++) {

      this.sleep(3000)

      //this.log('completeChecklists panel', i, 3)

      //item.parents('.item:first').find('label').click()
      let retry = 0
      
      // 強制讓沒選到的地方重新選3次的做法
      let writeSectionNote = async () => {
        try {
          let editor = await this.waitForElementVisible('.AnnotationPanel .html-editor-container .note-editable', {
            timeout: 3000,
            errorMessage: '有出現寫標註的地方嗎？'
          })
          
          // 等待導覽....
          await this.waitTutorial()
          
          //$('.html-editor-container .note-editable').html(this.createRandomHtml())
          await this.typeInput(editor, this.createRandomText())
          await this.sleep(500)
          await this.typeInput(editor, this.createRandomText())

          await this.sleep(100)
          await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
            timeout: 3000,
            errorMessage: '似乎不能儲存小節關鍵詞，是不是沒有寫文字？'
          })
        }
        catch (e) {
          retry++
          if (retry < 3) {
            console.log('再試一次', e)
            await writeSectionNote()
          }
          else {
            throw e
          }
        }
      }
      
      await writeSectionNote()
      
      await this.sleep(1000)

      await this.waitForElementVisibleClick('.ui.fluid.button.positive', {
        baseElement: checklist,
        timeout: 6000,
        errorMessage: '呃，是不是整個列表都不見了？發生什麼事情了嗎？也可能是create annotation需要的時間過長...？'
      })


      if (i < panels.length - 1) {
        await this.sleep(1000)

        //let editButton = await PACORTestManager.waitForElementVisible('body > article > .SectionPanel .', 1000)

        let editButton = await this.waitForElementVisible('.SectionAnnotationList > .ui.fluid.button:last', {
          baseElement: panel,
          timeout: 10000,
          errorMessage: '有看到撰寫小節關鍵詞嗎？是不是送出小節checklist的時間太久了？'
        })
        //PACORTestManager.log('editButton', editButton.text().trim())
        if (editButton.text().indexOf('撰寫小節關鍵詞') > -1) {
          throw new Error('Should not be 撰寫小節關鍵詞')
        }
      }
    } // for (let i = 0; i < checklists.length; i++) {
  }

});

/***/ }),

/***/ "./webpack-app/components/test/PACORTestManager/stepsReader/stepStepInstructionPACORTestManager.js":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/components/test/PACORTestManager/stepsReader/stepStepInstructionPACORTestManager.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (function (PACORTestManager) {
  
  PACORTestManager.methods.waitTutorial = async function () {
    let timeout = this.status.readingConfig.readingProgressModules.reading.tutorialDefaultTimeout
    
    await this.sleep(3000)
    
    let bg = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.jquery-guide-bg:visible')
    
    let tutorialWaitCount = 0
    while (bg.length > 0) {
      tutorialWaitCount++
      console.log('等待導覽結束... ' + tutorialWaitCount)
      await this.waitForElementHidden('.jquery-guide-bg')
      await this.sleep(timeout)
      bg = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.jquery-guide-bg:visible')
    }
  }
  
  PACORTestManager.methods.confirmInstructionMessage = async function () {
    await this.sleep(5000)
    
    await this.waitForElementVisibleClick('.ui.modal.InstructionMessage .actions > .button.start-tutorial', {
      timeout: 60 * 1000,
      errorMessage: '是不是傳送給end花太多時間了？'
    })
    
    
    await this.waitTutorial()
    //await this.waitForElementVisibleClick('.finish-modal')
    
    await this.sleep(5000)
  }
});

/***/ }),

/***/ "./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Modal.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-modal/Modal/Modal.html?vue&type=template&id=64f3eac6&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/Modal/Modal.html?vue&type=template&id=64f3eac6&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Modal_html_vue_type_template_id_64f3eac6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Modal.html?vue&type=template&id=64f3eac6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-modal/Modal/Modal.html?vue&type=template&id=64f3eac6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Modal_html_vue_type_template_id_64f3eac6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Modal_html_vue_type_template_id_64f3eac6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui-modal/Modal/Modal.js?vue&type=script&lang=js&?3cad":
/*!*********************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/Modal/Modal.js?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


let Modal = {
  props: ['lib', 'status', 'config'
    , 'cancelable', 'reset', 'dimmer', 'contentURL'
    , 'cancelButtonText', 'fullContent', 'disableOpenWindow', 'keyboardShortcuts'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      resetCache: null,
      modal: null,
      isShow: false,
      headerMenuInited: false
    }
  },
//  components: {
//  },
  computed: {
    computedContentURL () {
      let url = this.contentURL
      if (typeof(url) !== 'string') {
        return null
      }
      
      if (url.startsWith('/')) {
        url = this.config.baseURL + url
      }
      return url
    },
    computedActionsClassList () {
      let classList = []
      
      if (this.lib.style && this.lib.style.isLeftHanded === true) {
        classList.push('left-handed')
      }
      
      return classList.join(' ')
    },
    computedHeaderClassList () {
      if (this.$slots.headerMenu) {
        return 'has-header-menu'
      }
    },
    computedModalClassList () {
      let classList = []
      if (this.cancelable === false) {
        classList.push('non-cancellable')
      }
      return classList.join(' ')
    },
    computedShowCloseButton () {
      return (this.cancelable !== 'false' && this.cancelable !== false)
    }
  },
  destroyed: function () {
    this.hide()
    this.getModal().remove()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).removeClass('non-invasive-web-style-framework-scroll-disable')
    //console.log('Modal隱藏了喔！', this.getModal().length)
  },
  watch: {
    'reset': function () {
      try {
        if (typeof(this.reset) === 'object') {
          this.resetCache = JSON.parse(JSON.stringify(this.reset))
        }
        else {
          this.resetCache = this.reset
        }
      }
      catch (e) {}
    }
  },
  methods: {
    initDropdown() {
      if (this.headerMenuInited === true 
        || !this.$refs.HeaderMenuDropdown) {
        return undefined
      }
      if (this.$refs.HeaderMenuDropdown) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.HeaderMenuDropdown).popup({
          inline: true,
          hoverable: true,
          //position: 'bottom left',
          on: 'click',
          position: 'bottom right',
          delay: {
            //show: 300,
            hide: 800 
          }
        })
        //this.headerMenuInited = true
      }
    },
    getModal: function () {
      if (this.modal === null) {
        this.modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.modal)
      }
      return this.modal
    },
    _awaitInit: function (callback) {
      let modal = this.getModal()
      let loop = () => {
        if (typeof(modal.modal) !== 'function') {
          setTimeout(loop, 100)
        }
        else {
          callback(modal)
        }
      }
      loop()
    },
    show: function (callback) {
      this._awaitInit((modal) => {
        let options = {}
        if (this.cancelable === 'false' 
                || this.cancelable === false) {
          options.closable = false
          options.duration = 0
        }
        
        if (this.dimmer === 'opaque') {
          options.dimmerSettings= {
            dimmerName: 'opaque'
          }
        }
        else if (this.dimmer === 'transparent') {
          options.dimmerSettings= {
            dimmerName: 'transparent'
          }
        }
        
        options.onShow = () => {
          
          this.initDropdown()
          this.isShow = true
          
          if (this.lib.RangyManager) {
            this.lib.RangyManager.cancelSelection()
          }
          
          //console.log(this.lib.AnnotationManager)
          if (this.lib.AnnotationManager) {
            this.lib.AnnotationManager.hideFloatWidget()
          }
          
          if (typeof(callback) === 'function') {
            callback()
          }
        }
        
        options.onHidden = () => {
          this.isShow = false
          this.$emit('hide')
        }
        
        if (this.keyboardShortcuts === false) {
          options.keyboardShortcuts = false
        }
        
        modal.modal(options).modal('show')
      })
    },
    hide: function () {
      this._awaitInit((modal) => {
        //console.log('有hide嗎？')
        modal.modal('hide')
      })
    },
    doReset: function () {
      for (let name in this.resetCache) {
        this.reset[name] = this.resetCache[name]
      }
    },
    openContentURLWindow () {
      window.open(this.computedContentURL, '_blank')
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./webpack-app/components/ui-modal/Modal/Modal.js?vue&type=script&lang=js&?95dc":
/*!*********************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/Modal/Modal.js?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Modal.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-modal/Modal/Modal.js?vue&type=script&lang=js&?3cad");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Modal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_local_less_vue_type_style_index_1_id_64f3eac6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_local_less_vue_type_style_index_1_id_64f3eac6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_local_less_vue_type_style_index_1_id_64f3eac6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_local_less_vue_type_style_index_1_id_64f3eac6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_local_less_vue_type_style_index_1_id_64f3eac6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Modal_local_less_vue_type_style_index_1_id_64f3eac6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-modal/Modal/Modal.vue":
/*!*********************************************************!*\
  !*** ./webpack-app/components/ui-modal/Modal/Modal.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal_html_vue_type_template_id_64f3eac6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.html?vue&type=template&id=64f3eac6&scoped=true& */ "./webpack-app/components/ui-modal/Modal/Modal.html?vue&type=template&id=64f3eac6&scoped=true&");
/* harmony import */ var _Modal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-modal/Modal/Modal.js?vue&type=script&lang=js&?95dc");
/* empty/unused harmony star reexport *//* harmony import */ var _Modal_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal.global.less?vue&type=style&index=0&lang=less& */ "./webpack-app/components/ui-modal/Modal/Modal.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _Modal_local_less_vue_type_style_index_1_id_64f3eac6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true& */ "./webpack-app/components/ui-modal/Modal/Modal.local.less?vue&type=style&index=1&id=64f3eac6&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Modal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CModal%5CModal.vue&lang=yaml */ "./webpack-app/components/ui-modal/Modal/Modal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CModal%5CModal.vue&lang=yaml");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Modal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Modal_html_vue_type_template_id_64f3eac6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Modal_html_vue_type_template_id_64f3eac6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "64f3eac6",
  null
  
)

/* custom blocks */

if (typeof _Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__["default"] === 'function') Object(_Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui-modal/Modal/Modal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ui-modal/Modal/Modal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CModal%5CModal.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/Modal/Modal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CModal%5CModal.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Modal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CModal%5CModal.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-modal/Modal/Modal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CModal%5CModal.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Modal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CModal_5CModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true&":
/*!********************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_compact_less_vue_type_style_index_1_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_compact_less_vue_type_style_index_1_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_compact_less_vue_type_style_index_1_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_compact_less_vue_type_style_index_1_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_compact_less_vue_type_style_index_1_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_compact_less_vue_type_style_index_1_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation.html?vue&type=template&id=338540a1&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation.html?vue&type=template&id=338540a1&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Navigation_html_vue_type_template_id_338540a1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Navigation.html?vue&type=template&id=338540a1&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui/Navigation/Navigation.html?vue&type=template&id=338540a1&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Navigation_html_vue_type_template_id_338540a1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Navigation_html_vue_type_template_id_338540a1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation.js?vue&type=script&lang=js&?3348":
/*!*************************************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation.js?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_media__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-media */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-media\\dist\\vue-media.common.js");
/* harmony import */ var vue_media__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_media__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);



let Navigation = {
  props: ['config', 'lib', 'status'
    , 'compactWidth', 'position', 'color', 'isVisible', 'showMoreButton'],
  data() {
    return {
      sideMenuDisplay: false,
      isCompactMode: false,
      placeholder: null
    }
  },
  components: {
    'media': vue_media__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  watch: {
    isCompactMode (isCompactMode) {
      this.$emit('changeCompactMode', isCompactMode)
    },
    
    sideMenuDisplay (sideMenuDisplay) {
      this.$emit('onSideMenuChange', sideMenuDisplay)
    }
  },
  computed: {
    maxWidth: function () {
      let w = this.compactWidth
      if (typeof(w) === 'string' && isNaN(w) === false) {
        return parseInt(w, 10)
      }
      else if (typeof(w) === 'number') {
        return w
      }
      else {
        return 0
      }
    },
    computedTopMenuClass: function () {
      let classList = []
      
      if (typeof(this.position) !== 'string') {
        classList.push('top')
      }
      else {
        classList.push(this.position)
      }
      
      if (this.isCompactMode === true) {
        classList.push('compact-mode')
      }
      
      if (this.color) {
        classList.push(this.color)
      }
      
      return classList.join(' ') + ' fixed menu'
    },
    computedVerticalMenuClass: function () {
      let classList = []
      
      
      if (this.$slots.verticalHeaderItem) {
        classList.push('with-header')
      }
      else {
        classList.push('default-header')
      }
      
      // {hide: !sideMenuDisplay}
      if (!this.sideMenuDisplay) {
        classList.push('hide')
      }
      
      if (this.color) {
        classList.push(this.color)
      }
      
      if (this.lib.style && this.lib.style.isLeftHanded) {
        classList.push('left')
      }
      else {
        classList.push('right')
      }
      
      return classList.join(' ') + ' fixed vertical menu'
    }
  },
  mounted() {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    this.isCompactMode = (width < this.compactWidth)
    setTimeout(() => {
      this.initPlaceholder()
    }, 0)
  },
  destroyed () {
    this.removePlaceholder()
  },
  methods: {
    initPlaceholder: function () {
      this.placeholder = jquery__WEBPACK_IMPORTED_MODULE_1___default()(`<div class="Navigation placeholder"></div>`)
      
      if (this.position === 'bottom') {
        this.placeholder.appendTo('body')
      }
      else {
        this.placeholder.prependTo('body')
      }
      
      let height = this.$refs.Menu.clientHeight
      height = height + 20
      this.placeholder.css('height', height + 'px')
    },
    removePlaceholder: function () {
      this.placeholder.remove()
    },
    showSideMenu: async function () {
      //console.log('showSideMenu')
      this.sideMenuDisplay = true
      await this.lib.VueHelper.sleep(500)
    },
    hideSideMenu: async function () {
      this.sideMenuDisplay = false
      await this.lib.VueHelper.sleep(500)
    },
    find: function (selector) {
      if (this.sideMenuDisplay === true) {
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.$refs.SideMenu).find(selector)
      }
      else {
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.$refs.Menu).find(selector)
      }
    }
    
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Navigation);

/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation.js?vue&type=script&lang=js&?cc4a":
/*!*************************************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation.js?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navigation_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Navigation.js?vue&type=script&lang=js& */ "./webpack-app/components/ui/Navigation/Navigation.js?vue&type=script&lang=js&?3348");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Navigation_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true&":
/*!********************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_overlay_less_vue_type_style_index_3_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_overlay_less_vue_type_style_index_3_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_overlay_less_vue_type_style_index_3_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_overlay_less_vue_type_style_index_3_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_overlay_less_vue_type_style_index_3_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_overlay_less_vue_type_style_index_3_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true&":
/*!**************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_vertical_menu_less_vue_type_style_index_2_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_vertical_menu_less_vue_type_style_index_2_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_vertical_menu_less_vue_type_style_index_2_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_vertical_menu_less_vue_type_style_index_2_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_vertical_menu_less_vue_type_style_index_2_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Navigation_vertical_menu_less_vue_type_style_index_2_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation.vue":
/*!*************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Navigation_html_vue_type_template_id_338540a1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navigation.html?vue&type=template&id=338540a1&scoped=true& */ "./webpack-app/components/ui/Navigation/Navigation.html?vue&type=template&id=338540a1&scoped=true&");
/* harmony import */ var _Navigation_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigation.js?vue&type=script&lang=js& */ "./webpack-app/components/ui/Navigation/Navigation.js?vue&type=script&lang=js&?cc4a");
/* empty/unused harmony star reexport *//* harmony import */ var _Navigation_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navigation.global.less?vue&type=style&index=0&lang=less& */ "./webpack-app/components/ui/Navigation/Navigation.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _Navigation_compact_less_vue_type_style_index_1_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true& */ "./webpack-app/components/ui/Navigation/Navigation-compact.less?vue&type=style&index=1&id=338540a1&lang=less&scoped=true&");
/* harmony import */ var _Navigation_vertical_menu_less_vue_type_style_index_2_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true& */ "./webpack-app/components/ui/Navigation/Navigation.vertical-menu.less?vue&type=style&index=2&id=338540a1&lang=less&scoped=true&");
/* harmony import */ var _Navigation_overlay_less_vue_type_style_index_3_id_338540a1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true& */ "./webpack-app/components/ui/Navigation/Navigation.overlay.less?vue&type=style&index=3&id=338540a1&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Navigation.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CNavigation%5CNavigation.vue&lang=yaml */ "./webpack-app/components/ui/Navigation/Navigation.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CNavigation%5CNavigation.vue&lang=yaml");









/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_6__["default"])(
  _Navigation_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Navigation_html_vue_type_template_id_338540a1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Navigation_html_vue_type_template_id_338540a1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "338540a1",
  null
  
)

/* custom blocks */

if (typeof _Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_7__["default"] === 'function') Object(_Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_7__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui/Navigation/Navigation.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ui/Navigation/Navigation.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CNavigation%5CNavigation.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Navigation/Navigation.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CNavigation%5CNavigation.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Navigation.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CNavigation%5CNavigation.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui/Navigation/Navigation.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CNavigation%5CNavigation.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Navigation_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CNavigation_5CNavigation_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/Pagination/Pagination.html?vue&type=template&id=398190e1&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Pagination/Pagination.html?vue&type=template&id=398190e1&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Pagination_html_vue_type_template_id_398190e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Pagination.html?vue&type=template&id=398190e1&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui/Pagination/Pagination.html?vue&type=template&id=398190e1&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Pagination_html_vue_type_template_id_398190e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Pagination_html_vue_type_template_id_398190e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui/Pagination/Pagination.js?vue&type=script&lang=js&?018a":
/*!*************************************************************************************!*\
  !*** ./webpack-app/components/ui/Pagination/Pagination.js?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Pagination = {
  props: ['pageConfig', 'buildPageLink'],
  data() {
    return {
    }
  },
  methods: {
    changePage: function (i, event) {
      event.stopPropagation()
      event.preventDefault()
      
      //console.log(i, this.pageConfig.page)
      if (i === this.pageConfig.page) {
        return false
      }
      this.pageConfig.page = i
    },
    pageLink(i) {
      if (typeof(this.buildPageLink) === 'function') {
        return this.buildPageLink(i)
      }
      else {
        return undefined
      }
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Pagination);

/***/ }),

/***/ "./webpack-app/components/ui/Pagination/Pagination.js?vue&type=script&lang=js&?1e3b":
/*!*************************************************************************************!*\
  !*** ./webpack-app/components/ui/Pagination/Pagination.js?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pagination_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Pagination.js?vue&type=script&lang=js& */ "./webpack-app/components/ui/Pagination/Pagination.js?vue&type=script&lang=js&?018a");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Pagination_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CPagination%5CPagination.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CPagination%5CPagination.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CPagination%5CPagination.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CPagination%5CPagination.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true&":
/*!************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_398190e1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_398190e1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_398190e1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_398190e1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_398190e1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Pagination_less_vue_type_style_index_0_id_398190e1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/Pagination/Pagination.vue":
/*!*************************************************************!*\
  !*** ./webpack-app/components/ui/Pagination/Pagination.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pagination_html_vue_type_template_id_398190e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pagination.html?vue&type=template&id=398190e1&scoped=true& */ "./webpack-app/components/ui/Pagination/Pagination.html?vue&type=template&id=398190e1&scoped=true&");
/* harmony import */ var _Pagination_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pagination.js?vue&type=script&lang=js& */ "./webpack-app/components/ui/Pagination/Pagination.js?vue&type=script&lang=js&?1e3b");
/* empty/unused harmony star reexport *//* harmony import */ var _Pagination_less_vue_type_style_index_0_id_398190e1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true& */ "./webpack-app/components/ui/Pagination/Pagination.less?vue&type=style&index=0&id=398190e1&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CPagination%5CPagination.vue */ "./webpack-app/components/ui/Pagination/Pagination.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CPagination%5CPagination.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Pagination_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pagination_html_vue_type_template_id_398190e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Pagination_html_vue_type_template_id_398190e1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "398190e1",
  null
  
)

/* custom blocks */

if (typeof _Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Pagination_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CPagination_5CPagination_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui/Pagination/Pagination.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/helpers/AxiosHelper.js":
/*!********************************************!*\
  !*** ./webpack-app/helpers/AxiosHelper.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


axios__WEBPACK_IMPORTED_MODULE_1___default.a.defaults.withCredentials = true

let AxiosHelper = {
  baseURL: '',
  errorHandler: null,
  setBaseURL: function (baseURL) {
    if (baseURL.endsWith('/') === true) {
      baseURL = baseURL.slice(0, -1)
    }
    this.baseURL = baseURL
    return this
  },
  setErrorHandler: function (handler) {
    this.errorHandler = handler
  },
  handleError: function (error) {
    //console.error(error.response)
    if (typeof(this.errorHandler) === 'function') {
      this.errorHandler(error)
    }
  },
  getURL: function (path) {
    if (path.startsWith('/') === false) {
      path = '/' + path
    }
    return this.baseURL + path
  },
  get: async function (path, data, errorHandler) {
    path = this.getURL(path)
    let result = await this.getOther(path, data, errorHandler)
    return result
  },
  getOther: async function (path, data, errorHandler) {
    if (typeof(data) === 'string') {
      data = JSON.parse(data)
    }
    
    let options = {}
    if (typeof(data) === 'object') {
      options.params = data
    }
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(path, options)
      if (result === undefined) {
        throw new Error('No response: ' + path + `(${JSON.stringify(options)})`)
      }
      
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return undefined
    }
  },
  post: async function (path, data, errorHandler) {
    if (typeof(data) === 'string') {
      data = JSON.parse(data)
    }
    
    let options = {}
    if (typeof(data) === 'object') {
      options = data
    }
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(this.getURL(path), options)
      return result.data
    }
    catch (error) {
      //console.log(error)
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return undefined
    }
  },
  /**
   * let result = await this.lib.AxiosHelper.upload('/client/File/upload', {
        file: this.$refs.UploadInput
      })
   * @param {string} path
   * @param {object} data
   * @param {function} errorHandler
   * @returns {String|.axios@call;post.data|undefined}
   */
  upload: async function (path, data, errorHandler) {
    if (typeof(data) !== 'object') {
      this.handleError('no data')
      return ''
    }
    
    //console.log(data)
    
    let formData = new FormData()
    for (let name in data) {
      let value = data[name]
      if (typeof(value.files) === 'object') {
        value = value.files[0]
      }
      formData.append(name, value)
    }
    
    //console.log(formData)
    
    try {
      let result = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(this.getURL(path), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return undefined
    }
  },
  postNewWindow: async function (path, data) {
    path = this.getURL(path)
    
    // 建立一個form
    let form = document.createElement("form")
    let element1 = document.createElement("input")
    let element2 = document.createElement("input")

    form.method = "POST"
    form.action = path
    form.target = '_blank'
            
    Object.keys(data).forEach((key) => {
      let value = data[key]
      if (value === undefined || value === null) {
        return false
      }
      
      let element = document.createElement("input")
      element.name = key
      
      if (value && typeof(value) === 'object') {
        value = JSON.stringify(value)
      }
      element.value = value
      form.appendChild(element)
    })

    document.body.appendChild(form)
    form.submit()
    setTimeout(() => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(form).remove()
    })
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AxiosHelper);

/***/ }),

/***/ "./webpack-app/helpers/StringHelper.js":
/*!*********************************************!*\
  !*** ./webpack-app/helpers/StringHelper.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


let StringHelper = {
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  /**
   * https://www.thecodedeveloper.com/count-word-contain-utf-8-character-in-javascript/
   */
  countWords (string) {
    if (typeof(string) !== 'string') {
      return 0
    }
    
    //console.log(string)
    string = string.trim()
    if (string.startsWith('<') && string.endsWith('>')) {
      string = jquery__WEBPACK_IMPORTED_MODULE_0___default()(string).text()
    }
    
    let r1 = new RegExp('[\u3000-\u4DFF]','g');
    let r2 = new RegExp('[\u4E00-\u9FFF]','g');
    let r3 = new RegExp('[\u0E00-\u0E7F]','g');
    string = string.replace(r1,' {PNK} ');
    string = string.replace(r2,' {CJK} ');
    string = string.replace(r3,' {THI} ');
    //string = string.replace(/(<([^>]+)>)/ig,”") ;
    string = string.replace(/(\(|\)|\*|\||\+|\”|\’|_|;|:|,|\.|\?)/ig," ") ;
    string = string.replace(/(。，、；：「」『』（）—？！…《》～〔〕［］・─　)/ig," ") ;
    string = string.replace(/\s+/ig," ");
    //string = string.replace(/_+/ig," ");
    var a = string.split(/[\s+|\\|\/]/g);
    var count = 0;
    var pnkCounter = 0;
    var thiCounter = 0;
    for (var i=0;i<a.length;i++){
        if (a[i]==='{PNK}'){
              pnkCounter++;
        }
        else if(a[i]==='{THI}'){
              thiCounter++
        }
        else if (a[i].length>0){
              count++
        }
    }
    count += Math.ceil(pnkCounter/3) + Math.ceil(thiCounter/4);
    return count;
  },
  removePunctuations (s) {
    if (typeof(s) !== 'string') {
      return ''
    }
    
    s = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。，、；：「」『』（）—？！…《》～〔〕［］・─　]/g, " ")
    while (s.indexOf('  ') > -1) {
      s = s.replace(/  /g, ' ')
    }
    return s
  },
  removeSpaces (s) {
    return s.replace(/ /g, '')
  },
  htmlToText (s, spaceInDifferentElement) {
    if (typeof(s) === 'object') {
      if (typeof(s.innerHTML) === 'string') {
        s = s.innerHTML
      }
      else if (typeof(s.html) === 'function') {
        s = s.html()
      }
    }
    
    if (typeof(s) !== 'string') {
      return ''
    }
    s = s.trim()
    
    if (!s.startsWith('<') && !s.endsWith('>')) {
      return s
    }
    
    //if (!s.startsWith('<') && !s.endsWith('>')) {
    s = '<div>' + s + '</div>'
    //}
    
    let output
    if (!spaceInDifferentElement || spaceInDifferentElement === false) { 
      output = jquery__WEBPACK_IMPORTED_MODULE_0___default()(s).text().trim()
    }
    else {
      let children = jquery__WEBPACK_IMPORTED_MODULE_0___default()(s).children()
      output = []
      children.each((i, ele) => {
        output.push(ele.innerText.trim())
      })
      output = output.join(' ').trim()
    }
    
    output = output.split('\n').join(' ')
    return output
  },
  isURL (s) {
    if (typeof(s) !== 'string') {
      return false
    }
    
    return (s.startsWith('//')
            || s.startsWith('http://')
            || s.startsWith('https://')
            || s.startsWith('/'))
  },
  htmlTrim(html) {
    while (html.indexOf('<p>&nbsp;') > -1) {
      let reg = new RegExp('<p>&nbsp;', 'g')
      html = html.replace(reg, '<p>')
    }
    
    while (html.indexOf('&nbsp;</p>') > -1) {
      let reg = new RegExp('&nbsp;</p>', 'g')
      html = html.replace(reg, '</p>')
    }
    
    return html
  },
  htmlToTextTrim(html, spaceInDifferentElement) {
    let text = this.htmlToText(html, spaceInDifferentElement)
    return this.htmlTrim(text)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (StringHelper);

/***/ }),

/***/ "./webpack-app/helpers/URLHelper.js":
/*!******************************************!*\
  !*** ./webpack-app/helpers/URLHelper.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let URLHelper = {
  getPathSummary: function (path) {
    if (path.length < 50) {
      return path
    }

    let parts = path.split('/')
    let len = parts.length
    let output = ['']

    if (len === 2) {
      return path
    }
    else if (len < 4) {
      // /../..
      output.push('.../' + parts[(len - 1)])
    }
    else if (len === 4) {
      output.push(parts[1])
      output.push(parts[2].slice(0, 1) + '...' + parts[2].slice(-1, 1))
      output.push(parts[3])
    }
    else {
      output.push(parts[1])
      output.push(parts[2].slice(0, 1) + '...' + parts[(len - 2)].slice(-1))
      output.push(parts[(len - 1)])
    }

    if (output.join('/').length > 50) {
      output = ['']
      if (len < 4) {
        // /../..
        let lastPart = parts[(len - 1)]
        if (lastPart.indexOf('?') > -1) {
          let filename = lastPart.slice(0, lastPart.indexOf('?'))
          let query = lastPart.slice(lastPart.indexOf('?'))

          if (filename > 20) {
            filename = filename.slice(0, 7) + '...' + filename.slice(-7)
          }

          if (query > 20) {
            query = query.slice(0, 20) + '...'
          }

          lastPart = filename + '?' + query
        }
        else if (lastPart.indexOf('#') > -1) {
          let filename = lastPart.slice(0, lastPart.indexOf('#'))
          let query = lastPart.slice(lastPart.indexOf('#'))

          if (filename > 20) {
            filename = filename.slice(0, 7) + '...' + filename.slice(-7)
          }

          if (query > 20) {
            query = query.slice(0, 20) + '...'
          }

          lastPart = filename + '#' + query
        }

        output.push('.../' + parts[(len - 1)])
      }
      else if (len === 4) {
        output.push(parts[1].slice(0, 1) + '...' + parts[2].slice(-1, 1))
        output.push(parts[3])
      }
      else {
        output.push(parts[1].slice(0, 1) + '...' + parts[(len - 2)].slice(-1))
        output.push(parts[(len - 1)])
      }
    }

    return output.join('/')
  }
}

/* harmony default export */ __webpack_exports__["default"] = (URLHelper);

/***/ }),

/***/ "./webpack-app/helpers/ValidateHelper.js":
/*!***********************************************!*\
  !*** ./webpack-app/helpers/ValidateHelper.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let ValidateHelper = {
  isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  _urlPattern: new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'), // fragment locator
  isURL(url) {
    return !!this._urlPattern.test(url);
  },
  isJSON(str) {
    if (typeof(str) !== 'string') {
      return true
    }
    try {
      JSON.parse(str)
      return true
    }
    catch (e) {
      return false
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ValidateHelper);

/***/ }),

/***/ "./webpack-app/helpers/VueHelper.js":
/*!******************************************!*\
  !*** ./webpack-app/helpers/VueHelper.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let VueHelper = {
  sleep: function (ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
  },
//  waitReady: async function (component, callback) {
//    if (typeof(callback) !== 'function') {
//      return undefined
//    }
//    
//    while (!component) {
//      await this.sleep(100)
//    }
//    
//    callback()
//  }
}

/* harmony default export */ __webpack_exports__["default"] = (VueHelper);

/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-media\\dist\\vue-media.common.js":
/*!********************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-media/dist/vue-media.common.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-media v1.1.1
 * (c) 2017-present egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var json2mq = _interopDefault(__webpack_require__(/*! json2mq */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-media\\node_modules\\json2mq\\index.js"));

var Media = {
  name: 'media',
  props: {
    query: {
      type: [Object, String],
      required: true
    },
    visibleByDefault: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      matches: this.visibleByDefault
    }
  },
  methods: {
    updateMatches: function updateMatches() {
      this.matches = this.mediaQueryList.matches;
    }
  },
  mounted: function mounted() {
    var ref = this;
    var query = ref.query;
    var matches = ref.matches;
    if (typeof window === 'undefined') {
      return matches
    }
    var mediaQuery = json2mq(query);
    this.mediaQueryList = window.matchMedia(mediaQuery);
    this.updateMatches();
    this.mediaQueryList.addListener(this.updateMatches);
  },
  render: function render() {
    if (this.matches && this.$slots.default && this.$slots.default.length > 0) {
      return this.$slots.default[0]
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.mediaQueryList) {
      this.mediaQueryList.removeListener(this.updateMatches);
    }
  },
  watch: {
    matches: function matches(newMatch) {
      if (this.mediaQueryList) {
        newMatch
          ? this.$emit('media-enter', this.mediaQueryList.media)
          : this.$emit('media-leave', this.mediaQueryList.media);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(Media.name, Media);
}

module.exports = Media;


/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-media\\node_modules\\json2mq\\index.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-media/node_modules/json2mq/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var camel2hyphen = __webpack_require__(/*! string-convert/camel2hyphen */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-media\\node_modules\\string-convert\\camel2hyphen.js");

var isDimension = function (feature) {
  var re = /[height|width]$/;
  return re.test(feature);
};

var obj2mq = function (obj) {
  var mq = '';
  var features = Object.keys(obj);
  features.forEach(function (feature, index) {
    var value = obj[feature];
    feature = camel2hyphen(feature);
    // Add px to dimension features
    if (isDimension(feature) && typeof value === 'number') {
      value = value + 'px';
    }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += 'not ' + feature;
    } else {
      mq += '(' + feature + ': ' + value + ')';
    }
    if (index < features.length-1) {
      mq += ' and '
    }
  });
  return mq;
};

var json2mq = function (query) {
  var mq = '';
  if (typeof query === 'string') {
    return query;
  }
  // Handling array of media queries
  if (query instanceof Array) {
    query.forEach(function (q, index) {
      mq += obj2mq(q);
      if (index < query.length-1) {
        mq += ', '
      }
    });
    return mq;
  }
  // Handling single media query
  return obj2mq(query);
};

module.exports = json2mq;

/***/ }),

/***/ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-media\\node_modules\\string-convert\\camel2hyphen.js":
/*!***************************************************************************************************************!*\
  !*** C:/Users/pudding/AppData/Roaming/npm/node_modules/vue-media/node_modules/string-convert/camel2hyphen.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var camel2hyphen = function (str) {
  return str
          .replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
          })
          .toLowerCase();
};

module.exports = camel2hyphen;

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map