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
/******/ 		return __webpack_require__.p + "" + ({"client-components/CollaborativeReading~client-components/FreeReading":"client-components/CollaborativeReading~client-components/FreeReading","client-components/CollaborativeReading":"client-components/CollaborativeReading","client-components/FreeReading":"client-components/FreeReading","client-components/Exit":"client-components/Exit","client-components/IndividualReading":"client-components/IndividualReading","client-components/Questionnaire":"client-components/Questionnaire","client-components/ReadingComponents":"client-components/ReadingComponents","vendors/HTMLEditor":"vendors/HTMLEditor","vendors/semantic-ui-niwsf":"vendors/semantic-ui-niwsf"}[chunkId]||chunkId) + ".js"
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
/******/ 	deferredModules.push(["./webpack-app/client.js","vendors","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLogin%5CLogin.vue":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLogin%5CLogin.vue ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"agreement-link":"By clicking Sign Up, you agree to our <a href=\u0027{0}\u0027 target=\u0027_blank\u0027>Agreement Terms</a>."},"zh-TW":{"User {0} is not existed.":"使用者{0}不存在。","User {0} is registed.":"使用者{0}已經註冊。","Password is incorrect.":"密碼錯誤。","Username":"使用者名稱","Password":"密碼","Email":"電子信箱地址","Login":"登入","Register":"註冊","Login from Google":"從Google帳號登入","Login from GitHub":"從GitHub帳號登入","Login from Instagram":"從Instagram帳號登入","agreement-link":"如果您按下「登入」按鈕，表示您同意我們的<a href=\u0027{0}\u0027 target=\u0027_blank\u0027>知情同意書</a>。","cannot contain space":"不能包含空格"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationComment%5CEventAnnotationComment.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationComment%5CEventAnnotationComment.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Reply your annotation":"回應了您的標註","Like your annotation":"覺得您的標註很讚","Like your comment":"覺得您的留言很讚","can be assisted now":"可以請您來協助了"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationCommentRate%5CEventAnnotationCommentRate.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationCommentRate%5CEventAnnotationCommentRate.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Reply your annotation":"回應了您的標註","Like your annotation":"覺得您的標註很讚","Like your comment":"覺得您的留言很讚","can be assisted now":"可以請您來協助了"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationRate%5CEventAnnotationRate.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationRate%5CEventAnnotationRate.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Reply your annotation":"回應了您的標註","Like your annotation":"覺得您的標註很讚","Like your comment":"覺得您的留言很讚","can be assisted now":"可以請您來協助了"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventReadingProgress%5CEventReadingProgress.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventReadingProgress%5CEventReadingProgress.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Reply your annotation":"回應了您的標註","Like your annotation":"覺得您的標註很讚","Like your comment":"覺得您的留言很讚","can be assisted now":"可以請您來協助了"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationFeed%5CNotificationFeed.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationFeed%5CNotificationFeed.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"No More":"沒有更早之前的通知了","No Notifications":"沒有通知，請稍候再回來看吧"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationIcon.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationIcon.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"View All Notifications":"檢視所有通知"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationModal%5CNotificationModal.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationModal%5CNotificationModal.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"Notifications":"通知","No Notifications":"沒有通知","Readers interacted with you":"跟您互動的讀者們"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerItem%5CPeerItem.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerItem%5CPeerItem.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"View All":"觀看全部成員","No annotation":"沒有撰寫標註","(Reading...)":"(仍在閱讀中...)"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerList.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerList.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChart.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChart.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":null}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartLables%5CUserChartLables.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartLables%5CUserChartLables.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"and":"以及"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartPopup%5CUserChartPopup.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartPopup%5CUserChartPopup.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserFilter.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserFilter.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"Viewing All":"觀看全員","Asist":"協助","View":"觀看"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"{0} Comments":"{0} Comment | {0} Comments","{0} Likes":"{0} Likes | {0} Likes"},"zh-TW":{"{0} Comments":" {0}篇留言","{0} Likes":" {0}讚"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"{0} Comments":"{0} Comment | {0} Comments","{0} Likes":"{0} Likes | {0} Likes"},"zh-TW":{"{0} Comments":" {0}篇留言","{0} Likes":" {0}讚","Like":"讚","Comment":"留言"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"All":"全部"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CBlockExit%5CBlockExit.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/reading-progress/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CBlockExit%5CBlockExit.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Please don\u0027t leave.":"請不要離開"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CCountdownButton%5CCountdownButton.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CCountdownButton%5CCountdownButton.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Remaining Time":"剩餘時間"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Remaining Time":"剩餘時間"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-button/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-button%5CValidationButton%5CValidationButton.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui-button/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-button%5CValidationButton%5CValidationButton.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CConfirmModal%5CConfirmModal.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CConfirmModal%5CConfirmModal.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Are you sure?":"您確定嗎？","Yes":"是的","No":"不是"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-user/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CAdminBadge%5CAdminBadge.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui-user/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CAdminBadge%5CAdminBadge.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Administrator":"管理者"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"{0} Readers":"{0} Reader | {0} Readers"},"zh-TW":{"{0} Readers":"{0}位讀者"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"You":"就是您本人"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".login-message[data-v-15c3505b] {\n  max-height: calc(100vh - 30em);\n}\n", "",{"version":3,"sources":["Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,8BAA8B;AAChC","file":"Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true&","sourcesContent":[".login-message[data-v-15c3505b] {\n  max-height: calc(100vh - 30em);\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".has-read[data-v-142d96e4] {\n  background-color: #DDD !important;\n  opacity: 0.8;\n}\n.event[data-v-142d96e4] {\n  cursor: pointer;\n}\n.label img[data-v-142d96e4] {\n  border-radius: 0 !important;\n}\n", "",{"version":3,"sources":["NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,iCAAiC;EACjC,YAAY;AACd;AACA;EACE,eAAe;AACjB;AACA;EACE,2BAA2B;AAC7B","file":"NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true&","sourcesContent":[".has-read[data-v-142d96e4] {\n  background-color: #DDD !important;\n  opacity: 0.8;\n}\n.event[data-v-142d96e4] {\n  cursor: pointer;\n}\n.label img[data-v-142d96e4] {\n  border-radius: 0 !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".has-read[data-v-63ec2610] {\n  background-color: #DDD !important;\n  opacity: 0.8;\n}\n.event[data-v-63ec2610] {\n  cursor: pointer;\n}\n.label img[data-v-63ec2610] {\n  border-radius: 0 !important;\n}\n", "",{"version":3,"sources":["NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,iCAAiC;EACjC,YAAY;AACd;AACA;EACE,eAAe;AACjB;AACA;EACE,2BAA2B;AAC7B","file":"NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true&","sourcesContent":[".has-read[data-v-63ec2610] {\n  background-color: #DDD !important;\n  opacity: 0.8;\n}\n.event[data-v-63ec2610] {\n  cursor: pointer;\n}\n.label img[data-v-63ec2610] {\n  border-radius: 0 !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".has-read[data-v-d390b978] {\n  background-color: #DDD !important;\n  opacity: 0.8;\n}\n.event[data-v-d390b978] {\n  cursor: pointer;\n}\n.label img[data-v-d390b978] {\n  border-radius: 0 !important;\n}\n", "",{"version":3,"sources":["NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,iCAAiC;EACjC,YAAY;AACd;AACA;EACE,eAAe;AACjB;AACA;EACE,2BAA2B;AAC7B","file":"NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true&","sourcesContent":[".has-read[data-v-d390b978] {\n  background-color: #DDD !important;\n  opacity: 0.8;\n}\n.event[data-v-d390b978] {\n  cursor: pointer;\n}\n.label img[data-v-d390b978] {\n  border-radius: 0 !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".has-read[data-v-ec165538] {\n  background-color: #DDD !important;\n  opacity: 0.8;\n}\n.event[data-v-ec165538] {\n  cursor: pointer;\n}\n.label img[data-v-ec165538] {\n  border-radius: 0 !important;\n}\n", "",{"version":3,"sources":["NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,iCAAiC;EACjC,YAAY;AACd;AACA;EACE,eAAe;AACjB;AACA;EACE,2BAA2B;AAC7B","file":"NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true&","sourcesContent":[".has-read[data-v-ec165538] {\n  background-color: #DDD !important;\n  opacity: 0.8;\n}\n.event[data-v-ec165538] {\n  cursor: pointer;\n}\n.label img[data-v-ec165538] {\n  border-radius: 0 !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".NotificationFeed[data-v-23ad6084] {\n  overflow-y: auto;\n  max-height: 300px;\n  padding-right: 0.5em;\n}\n@media (max-height: 320px) {\n.NotificationFeed[data-v-23ad6084] {\n    max-height: calc(100vh - 50px);\n}\n}\n.no-more[data-v-23ad6084] {\n  cursor: default;\n  user-select: none;\n  text-align: center;\n}\n", "",{"version":3,"sources":["NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,oBAAoB;AACtB;AACA;AACA;IACI,8BAA8B;AAClC;AACA;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB","file":"NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true&","sourcesContent":[".NotificationFeed[data-v-23ad6084] {\n  overflow-y: auto;\n  max-height: 300px;\n  padding-right: 0.5em;\n}\n@media (max-height: 320px) {\n.NotificationFeed[data-v-23ad6084] {\n    max-height: calc(100vh - 50px);\n}\n}\n.no-more[data-v-23ad6084] {\n  cursor: default;\n  user-select: none;\n  text-align: center;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".floating.label[data-v-3f6b6eff] {\n  padding-top: 0 !important;\n  line-height: 0.5em !important;\n  padding-left: 0.5em !important;\n  padding-right: 0.5em !important;\n  padding-bottom: 0.5em !important;\n  /* margin-right: -1em !important; */\n  left: 95% !important;\n  top: 0.3em !important;\n}\n.floating.label.disabled[data-v-3f6b6eff] {\n  color: #666;\n}\n.view-all[data-v-3f6b6eff] {\n  text-align: center;\n  cursor: pointer;\n}\n.button[data-v-3f6b6eff] {\n  position: absolute;\n}\n.popup[data-v-3f6b6eff] {\n  width: 25em !important;\n  max-width: 100vw !important;\n  background: #DCDDDE !important;\n  padding-bottom: 0.5em !important;\n}\n.popup[data-v-3f6b6eff]::before {\n  background: #DCDDDE !important;\n}\n", "",{"version":3,"sources":["NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,6BAA6B;EAC7B,8BAA8B;EAC9B,+BAA+B;EAC/B,gCAAgC;EAChC,mCAAmC;EACnC,oBAAoB;EACpB,qBAAqB;AACvB;AACA;EACE,WAAW;AACb;AACA;EACE,kBAAkB;EAClB,eAAe;AACjB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,sBAAsB;EACtB,2BAA2B;EAC3B,8BAA8B;EAC9B,gCAAgC;AAClC;AACA;EACE,8BAA8B;AAChC","file":"NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true&","sourcesContent":[".floating.label[data-v-3f6b6eff] {\n  padding-top: 0 !important;\n  line-height: 0.5em !important;\n  padding-left: 0.5em !important;\n  padding-right: 0.5em !important;\n  padding-bottom: 0.5em !important;\n  /* margin-right: -1em !important; */\n  left: 95% !important;\n  top: 0.3em !important;\n}\n.floating.label.disabled[data-v-3f6b6eff] {\n  color: #666;\n}\n.view-all[data-v-3f6b6eff] {\n  text-align: center;\n  cursor: pointer;\n}\n.button[data-v-3f6b6eff] {\n  position: absolute;\n}\n.popup[data-v-3f6b6eff] {\n  width: 25em !important;\n  max-width: 100vw !important;\n  background: #DCDDDE !important;\n  padding-bottom: 0.5em !important;\n}\n.popup[data-v-3f6b6eff]::before {\n  background: #DCDDDE !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".notification-list[data-v-135dd4ea] {\n  max-height: calc(100% - 2em);\n  overflow-y: auto;\n}\n.trigger-users[data-v-135dd4ea] {\n  text-align: center;\n}\n.trigger-users .column[data-v-135dd4ea] {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n", "",{"version":3,"sources":["NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,4BAA4B;EAC5B,gBAAgB;AAClB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;AACrB","file":"NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true&","sourcesContent":[".notification-list[data-v-135dd4ea] {\n  max-height: calc(100% - 2em);\n  overflow-y: auto;\n}\n.trigger-users[data-v-135dd4ea] {\n  text-align: center;\n}\n.trigger-users .column[data-v-135dd4ea] {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".non-invasive-web-style-framework .ui.items > .item.PeerItem[data-v-abd88654],\n.non-invasive-web-style-framework .ui.divided.items > .item.PeerItem[data-v-abd88654] {\n  user-select: none;\n  padding-top: 1em !important;\n  padding-bottom: 1em !important;\n}\n.PeerItem.selected[data-v-abd88654] {\n  background-color: yellow !important;\n}\n.PeerItem.disabled[data-v-abd88654] {\n  opacity: 0.6;\n  background-color: #DDD !important;\n  cursor: default !important;\n}\n.PeerItem.disabled .header .message[data-v-abd88654] {\n  font-size: 0.8em;\n  font-weight: normal;\n}\n.PeerItem.disabled:hover .header[data-v-abd88654] {\n  color: rgba(0, 0, 0, 0.85) !important;\n}\n/*.avatar {\n  max-width: 2em !important;\n  height: auto !important;\n}*/\n.ui.image[data-v-abd88654] {\n  text-align: right;\n}\n.ui.image .icon[data-v-abd88654] {\n  font-size: 25px;\n}\n.description[data-v-abd88654]  .AnnotationTypeButton {\n  padding-left: 0.7em !important;\n  padding-right: 0.7em !important;\n}\n", "",{"version":3,"sources":["PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;;EAEE,iBAAiB;EACjB,2BAA2B;EAC3B,8BAA8B;AAChC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,YAAY;EACZ,iCAAiC;EACjC,0BAA0B;AAC5B;AACA;EACE,gBAAgB;EAChB,mBAAmB;AACrB;AACA;EACE,qCAAqC;AACvC;AACA;;;EAGE;AACF;EACE,iBAAiB;AACnB;AACA;EACE,eAAe;AACjB;AACA;EACE,8BAA8B;EAC9B,+BAA+B;AACjC","file":"PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true&","sourcesContent":[".non-invasive-web-style-framework .ui.items > .item.PeerItem[data-v-abd88654],\n.non-invasive-web-style-framework .ui.divided.items > .item.PeerItem[data-v-abd88654] {\n  user-select: none;\n  padding-top: 1em !important;\n  padding-bottom: 1em !important;\n}\n.PeerItem.selected[data-v-abd88654] {\n  background-color: yellow !important;\n}\n.PeerItem.disabled[data-v-abd88654] {\n  opacity: 0.6;\n  background-color: #DDD !important;\n  cursor: default !important;\n}\n.PeerItem.disabled .header .message[data-v-abd88654] {\n  font-size: 0.8em;\n  font-weight: normal;\n}\n.PeerItem.disabled:hover .header[data-v-abd88654] {\n  color: rgba(0, 0, 0, 0.85) !important;\n}\n/*.avatar {\n  max-width: 2em !important;\n  height: auto !important;\n}*/\n.ui.image[data-v-abd88654] {\n  text-align: right;\n}\n.ui.image .icon[data-v-abd88654] {\n  font-size: 25px;\n}\n.description[data-v-abd88654]  .AnnotationTypeButton {\n  padding-left: 0.7em !important;\n  padding-right: 0.7em !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".items-list[data-v-30e3b3ee] {\n  overflow-y: auto;\n  max-height: calc(100% - 6rem);\n  padding-bottom: 1em !important;\n}\n.all-item[data-v-30e3b3ee] {\n  border-bottom: 1px solid rgba(34, 36, 38, 0.15) !important;\n}\n", "",{"version":3,"sources":["PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,6BAA6B;EAC7B,8BAA8B;AAChC;AACA;EACE,0DAA0D;AAC5D","file":"PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true&","sourcesContent":[".items-list[data-v-30e3b3ee] {\n  overflow-y: auto;\n  max-height: calc(100% - 6rem);\n  padding-bottom: 1em !important;\n}\n.all-item[data-v-30e3b3ee] {\n  border-bottom: 1px solid rgba(34, 36, 38, 0.15) !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".jqcloud-wrapper[data-v-0902329e] {\n  height: calc(100% - 2em);\n  overflow: hidden;\n}\n.jqcloud-container[data-v-0902329e] {\n  width: 100%;\n  height: calc(100% - 2em);\n  user-select: none;\n}\n.jqcloud-container[data-v-0902329e]  span {\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,wBAAwB;EACxB,gBAAgB;AAClB;AACA;EACE,WAAW;EACX,wBAAwB;EACxB,iBAAiB;AACnB;AACA;EACE,eAAe;AACjB","file":"UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true&","sourcesContent":[".jqcloud-wrapper[data-v-0902329e] {\n  height: calc(100% - 2em);\n  overflow: hidden;\n}\n.jqcloud-container[data-v-0902329e] {\n  width: 100%;\n  height: calc(100% - 2em);\n  user-select: none;\n}\n.jqcloud-container[data-v-0902329e]  span {\n  cursor: pointer;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".chart-labels[data-v-448d2722] {\n  text-align: center;\n}\n.chart-labels .chart-label[data-v-448d2722] {\n  margin-right: 1em;\n  display: inline-block;\n  vertical-align: middle;\n}\n.chart-labels .chart-label[data-v-448d2722]:last-of-type {\n  margin-right: 0;\n}\n.chart-labels .chart-label.my[data-v-448d2722] {\n  color: #690;\n}\n.chart-labels .chart-label .username[data-v-448d2722] {\n  font-weight: bold;\n}\n.chart-labels .chart-label i[data-v-448d2722] {\n  margin-right: 0.3em;\n}\n.chart-labels .chart-label img[data-v-448d2722] {\n  max-height: 2em;\n  width: auto;\n  margin-right: 0.5em;\n  display: inline-block;\n  vertical-align: middle;\n}\n", "",{"version":3,"sources":["UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,kBAAkB;AACpB;AACA;EACE,iBAAiB;EACjB,qBAAqB;EACrB,sBAAsB;AACxB;AACA;EACE,eAAe;AACjB;AACA;EACE,WAAW;AACb;AACA;EACE,iBAAiB;AACnB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,eAAe;EACf,WAAW;EACX,mBAAmB;EACnB,qBAAqB;EACrB,sBAAsB;AACxB","file":"UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true&","sourcesContent":[".chart-labels[data-v-448d2722] {\n  text-align: center;\n}\n.chart-labels .chart-label[data-v-448d2722] {\n  margin-right: 1em;\n  display: inline-block;\n  vertical-align: middle;\n}\n.chart-labels .chart-label[data-v-448d2722]:last-of-type {\n  margin-right: 0;\n}\n.chart-labels .chart-label.my[data-v-448d2722] {\n  color: #690;\n}\n.chart-labels .chart-label .username[data-v-448d2722] {\n  font-weight: bold;\n}\n.chart-labels .chart-label i[data-v-448d2722] {\n  margin-right: 0.3em;\n}\n.chart-labels .chart-label img[data-v-448d2722] {\n  max-height: 2em;\n  width: auto;\n  margin-right: 0.5em;\n  display: inline-block;\n  vertical-align: middle;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".popup[data-v-31df0066] {\n  cursor: pointer;\n  z-index: 999;\n}\nimg[data-v-31df0066] {\n  max-width: 1.5em !important;\n  height: auto !important;\n}\n.label-column[data-v-31df0066] {\n  display: inline-block;\n  vertical-align: middle;\n}\n.label-column.icon[data-v-31df0066] {\n  margin-right: 0.5;\n  text-align: right;\n  width: 2em;\n}\n.word-label[data-v-31df0066] {\n  margin-top: 0.5em;\n  margin-bottom: 0.5em;\n  white-space: nowrap;\n}\n.word-label.my[data-v-31df0066] {\n  margin-bottom: 0;\n}\n.focus-word[data-v-31df0066] {\n  text-align: center;\n  font-size: 1.5em;\n  font-weight: bold;\n  padding-left: 1em;\n  white-space: nowrap;\n}\n.focus-word .icon[data-v-31df0066] {\n  float: right;\n  margin-left: 0.25em;\n  margin-top: 0.1em;\n}\n", "",{"version":3,"sources":["UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,YAAY;AACd;AACA;EACE,2BAA2B;EAC3B,uBAAuB;AACzB;AACA;EACE,qBAAqB;EACrB,sBAAsB;AACxB;AACA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,UAAU;AACZ;AACA;EACE,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;AACrB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,iBAAiB;EACjB,mBAAmB;AACrB;AACA;EACE,YAAY;EACZ,mBAAmB;EACnB,iBAAiB;AACnB","file":"UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true&","sourcesContent":[".popup[data-v-31df0066] {\n  cursor: pointer;\n  z-index: 999;\n}\nimg[data-v-31df0066] {\n  max-width: 1.5em !important;\n  height: auto !important;\n}\n.label-column[data-v-31df0066] {\n  display: inline-block;\n  vertical-align: middle;\n}\n.label-column.icon[data-v-31df0066] {\n  margin-right: 0.5;\n  text-align: right;\n  width: 2em;\n}\n.word-label[data-v-31df0066] {\n  margin-top: 0.5em;\n  margin-bottom: 0.5em;\n  white-space: nowrap;\n}\n.word-label.my[data-v-31df0066] {\n  margin-bottom: 0;\n}\n.focus-word[data-v-31df0066] {\n  text-align: center;\n  font-size: 1.5em;\n  font-weight: bold;\n  padding-left: 1em;\n  white-space: nowrap;\n}\n.focus-word .icon[data-v-31df0066] {\n  float: right;\n  margin-left: 0.25em;\n  margin-top: 0.1em;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".right-column[data-v-5e5c50d9] {\n  border-left: 1px solid rgba(34, 36, 38, 0.15) !important;\n}\n.peer-all-label[data-v-5e5c50d9] {\n  margin-right: 0.5em;\n}\n.peer-label[data-v-5e5c50d9] {\n  margin-right: 0.3em;\n}\n.user-avatar[data-v-5e5c50d9] {\n  max-height: 2em !important;\n  width: auto !important;\n}\n@media (max-width: 767px) {\n.peer-label[data-v-5e5c50d9] {\n    display: none;\n}\n}\n", "",{"version":3,"sources":["UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,wDAAwD;AAC1D;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,0BAA0B;EAC1B,sBAAsB;AACxB;AACA;AACA;IACI,aAAa;AACjB;AACA","file":"UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true&","sourcesContent":[".right-column[data-v-5e5c50d9] {\n  border-left: 1px solid rgba(34, 36, 38, 0.15) !important;\n}\n.peer-all-label[data-v-5e5c50d9] {\n  margin-right: 0.5em;\n}\n.peer-label[data-v-5e5c50d9] {\n  margin-right: 0.3em;\n}\n.user-avatar[data-v-5e5c50d9] {\n  max-height: 2em !important;\n  width: auto !important;\n}\n@media (max-width: 767px) {\n.peer-label[data-v-5e5c50d9] {\n    display: none;\n}\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".meta[data-v-21a9a788] {\n  float: right;\n  user-select: none;\n  line-height: 2em !important;\n}\n.user[data-v-21a9a788] {\n  display: inline-block;\n}\n.avatar[data-v-21a9a788] {\n  max-height: 2em;\n  width: auto;\n}\n.avatar[data-v-21a9a788],\n.username[data-v-21a9a788] {\n  margin-right: 0.5em;\n}\n.username[data-v-21a9a788] {\n  max-width: 5em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: inline-block;\n  vertical-align: top;\n  line-height: 2em;\n}\n.note[data-v-21a9a788] {\n  line-height: 2em;\n  display: inline-block;\n  vertical-align: top;\n}\n.clickable[data-v-21a9a788] {\n  cursor: pointer !important;\n}\n.meta[data-v-21a9a788]  .AnnotationInteractive {\n  margin-left: 0.5em;\n}\n.annotation-item-compact[data-v-21a9a788] {\n  padding-top: 0.5em !important;\n  padding-bottom: 0.5em !important;\n  margin-bottom: 0.5em !important;\n}\n.annotation-item-compact .text-container[data-v-21a9a788] {\n  line-height: 2em;\n  display: inline-block;\n  vertical-align: top;\n}\n.annotation-item-compact .left.column[data-v-21a9a788] {\n  max-width: 70vw;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.annotation-item-compact .note[data-v-21a9a788] {\n  display: inline-block;\n  margin-left: 0.5em;\n  white-space: nowrap;\n  max-width: calc(100vw - 28em);\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n@media (max-width: 480px) {\n.AnnotationItem.annotation-item-compact[data-v-21a9a788]  .AnnotationTypeButton {\n    text-indent: -9999px;\n    padding-left: 0;\n    padding-right: 0;\n    width: 1em;\n}\n.AnnotationItem.annotation-item-compact .note[data-v-21a9a788] {\n    max-width: calc(100vw - 10em);\n}\n.AnnotationItem.annotation-item-compact .display-time[data-v-21a9a788] {\n    max-width: 0;\n    overflow-x: hidden;\n}\n}\n", "",{"version":3,"sources":["AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,iBAAiB;EACjB,2BAA2B;AAC7B;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;EACf,WAAW;AACb;AACA;;EAEE,mBAAmB;AACrB;AACA;EACE,cAAc;EACd,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;EACnB,qBAAqB;EACrB,mBAAmB;EACnB,gBAAgB;AAClB;AACA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB;AACrB;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,kBAAkB;AACpB;AACA;EACE,6BAA6B;EAC7B,gCAAgC;EAChC,+BAA+B;AACjC;AACA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB;AACrB;AACA;EACE,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,mBAAmB;EACnB,6BAA6B;EAC7B,uBAAuB;EACvB,gBAAgB;AAClB;AACA;AACA;IACI,oBAAoB;IACpB,eAAe;IACf,gBAAgB;IAChB,UAAU;AACd;AACA;IACI,6BAA6B;AACjC;AACA;IACI,YAAY;IACZ,kBAAkB;AACtB;AACA","file":"AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true&","sourcesContent":[".meta[data-v-21a9a788] {\n  float: right;\n  user-select: none;\n  line-height: 2em !important;\n}\n.user[data-v-21a9a788] {\n  display: inline-block;\n}\n.avatar[data-v-21a9a788] {\n  max-height: 2em;\n  width: auto;\n}\n.avatar[data-v-21a9a788],\n.username[data-v-21a9a788] {\n  margin-right: 0.5em;\n}\n.username[data-v-21a9a788] {\n  max-width: 5em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: inline-block;\n  vertical-align: top;\n  line-height: 2em;\n}\n.note[data-v-21a9a788] {\n  line-height: 2em;\n  display: inline-block;\n  vertical-align: top;\n}\n.clickable[data-v-21a9a788] {\n  cursor: pointer !important;\n}\n.meta[data-v-21a9a788]  .AnnotationInteractive {\n  margin-left: 0.5em;\n}\n.annotation-item-compact[data-v-21a9a788] {\n  padding-top: 0.5em !important;\n  padding-bottom: 0.5em !important;\n  margin-bottom: 0.5em !important;\n}\n.annotation-item-compact .text-container[data-v-21a9a788] {\n  line-height: 2em;\n  display: inline-block;\n  vertical-align: top;\n}\n.annotation-item-compact .left.column[data-v-21a9a788] {\n  max-width: 70vw;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.annotation-item-compact .note[data-v-21a9a788] {\n  display: inline-block;\n  margin-left: 0.5em;\n  white-space: nowrap;\n  max-width: calc(100vw - 28em);\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n@media (max-width: 480px) {\n.AnnotationItem.annotation-item-compact[data-v-21a9a788]  .AnnotationTypeButton {\n    text-indent: -9999px;\n    padding-left: 0;\n    padding-right: 0;\n    width: 1em;\n}\n.AnnotationItem.annotation-item-compact .note[data-v-21a9a788] {\n    max-width: calc(100vw - 10em);\n}\n.AnnotationItem.annotation-item-compact .display-time[data-v-21a9a788] {\n    max-width: 0;\n    overflow-x: hidden;\n}\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".note[data-v-21a9a788] {\n  max-height: 4rem;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.note[data-v-21a9a788]  p {\n  line-height: 2em !important;\n  display: inline !important;\n  vertical-align: top;\n}\n.note[data-v-21a9a788]  img {\n  max-width: 4em;\n  max-height: 4em;\n  width: auto;\n  height: auto;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n.annotation-item-compact .note[data-v-21a9a788]  [data-pacor-search-result] {\n  font-weight: bold !important;\n  background-color: yellow !important;\n  color: red !important;\n}\n.annotation-item-compact .note[data-v-21a9a788]  p {\n  display: inline !important;\n  line-height: 2em !important;\n}\n", "",{"version":3,"sources":["AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;AAClB;AACA;EACE,2BAA2B;EAC3B,0BAA0B;EAC1B,mBAAmB;AACrB;AACA;EACE,cAAc;EACd,eAAe;EACf,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;AACrB;AACA;EACE,4BAA4B;EAC5B,mCAAmC;EACnC,qBAAqB;AACvB;AACA;EACE,0BAA0B;EAC1B,2BAA2B;AAC7B","file":"AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true&","sourcesContent":[".note[data-v-21a9a788] {\n  max-height: 4rem;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.note[data-v-21a9a788]  p {\n  line-height: 2em !important;\n  display: inline !important;\n  vertical-align: top;\n}\n.note[data-v-21a9a788]  img {\n  max-width: 4em;\n  max-height: 4em;\n  width: auto;\n  height: auto;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n.annotation-item-compact .note[data-v-21a9a788]  [data-pacor-search-result] {\n  font-weight: bold !important;\n  background-color: yellow !important;\n  color: red !important;\n}\n.annotation-item-compact .note[data-v-21a9a788]  p {\n  display: inline !important;\n  line-height: 2em !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".AnnotationInteractive button[type=\"button\"].ui.button[data-v-6ce3bf7e] {\n  vertical-align: top !important;\n}\n.AnnotationInteractive button[type=\"button\"].ui.button.with-count[data-v-6ce3bf7e] {\n  padding-left: 1em;\n  padding-right: 1em;\n}\n.AnnotationInteractive button[type=\"button\"].ui.button.with-count > i[data-v-6ce3bf7e] {\n  margin-right: 0 !important;\n}\n", "",{"version":3,"sources":["AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,8BAA8B;AAChC;AACA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;AACA;EACE,0BAA0B;AAC5B","file":"AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true&","sourcesContent":[".AnnotationInteractive button[type=\"button\"].ui.button[data-v-6ce3bf7e] {\n  vertical-align: top !important;\n}\n.AnnotationInteractive button[type=\"button\"].ui.button.with-count[data-v-6ce3bf7e] {\n  padding-left: 1em;\n  padding-right: 1em;\n}\n.AnnotationInteractive button[type=\"button\"].ui.button.with-count > i[data-v-6ce3bf7e] {\n  margin-right: 0 !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".button[data-v-75d99c9c] {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n", "",{"version":3,"sources":["AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,gBAAgB;AAClB","file":"AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true&","sourcesContent":[".button[data-v-75d99c9c] {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Imports
var getUrl = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ./fonts/digital-7.ttf */ "./webpack-app/components/reading-progress/DigitalCountdownTimer/fonts/digital-7.ttf"));
// Module
exports.push([module.i, ".DigitalCountdownTimer[data-v-2b3215b5] {\n  color: #ffffff;\n  border-radius: 0.3em;\n  border: 1px solid white;\n  font-family: 'digital-7', 'sans-serif';\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  font-size: 1.5em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n  padding-top: 0.1em;\n}\n@font-face {\n  font-family: 'digital-7';\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n}\n/* CLOCK */\ndiv.clock div[data-v-2b3215b5] {\n  display: inline-block;\n  position: relative;\n}\ndiv.clock div p[data-v-2b3215b5] {\n  position: relative;\n  z-index: 100;\n  margin-bottom: 0 !important;\n  line-height: 1em;\n}\ndiv.clock div p.minutes[data-v-2b3215b5],\ndiv.clock div p.seconds[data-v-2b3215b5] {\n  transition: text-shadow 0.3s ease !important;\n}\ndiv.clock .placeholder[data-v-2b3215b5] {\n  color: #8E5229;\n  position: absolute;\n  top: 0;\n  z-index: 50;\n}\ndiv.clock .meridian[data-v-2b3215b5] {\n  margin-left: 0.5em;\n}\n/*END CLOCK*/\n/*CLASS THAT CHANGES COLOR OF TEXT TO APPEAR LIKE ITS \"ON\"*/\n.light-on[data-v-2b3215b5] {\n  color: #ffffff;\n}\n.message[data-v-2b3215b5] {\n  display: block !important;\n  font-size: 0.4em;\n  top: 0.1em;\n  text-align: center;\n  left: -0.3em;\n}\n.seconds[data-v-2b3215b5] {\n  margin-right: 0.5em;\n}\n.seconds.two[data-v-2b3215b5] {\n  margin-right: 0;\n}\n.seconds.two[data-v-2b3215b5],\n.minutes.two[data-v-2b3215b5] {\n  left: -0.5em;\n}\n.colon[data-v-2b3215b5] {\n  margin-left: -0.7em;\n  margin-right: -0.3em;\n}\n.seconds-numbers[data-v-2b3215b5] {\n  margin-right: -1em;\n}\n.minutes-numbers[data-v-2b3215b5] {\n  margin-right: 0.5em;\n}\n.minutes-numbers .minutes.hidden[data-v-2b3215b5],\n.minutes-numbers .minutes.two[data-v-2b3215b5] {\n  margin-right: -0.5em;\n}\n.glow[data-v-2b3215b5] {\n  text-shadow: 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5);\n}\n.hidden[data-v-2b3215b5] {\n  visibility: hidden;\n}\n.colon-hidden[data-v-2b3215b5] {\n  color: #8E5229;\n}\n", "",{"version":3,"sources":["DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,oBAAoB;EACpB,uBAAuB;EACvB,sCAAsC;EACtC,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,wBAAwB;EACxB,kCAAiC;AACnC;AACA,UAAU;AACV;EACE,qBAAqB;EACrB,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,YAAY;EACZ,2BAA2B;EAC3B,gBAAgB;AAClB;AACA;;EAEE,4CAA4C;AAC9C;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,MAAM;EACN,WAAW;AACb;AACA;EACE,kBAAkB;AACpB;AACA,YAAY;AACZ,2DAA2D;AAC3D;EACE,cAAc;AAChB;AACA;EACE,yBAAyB;EACzB,gBAAgB;EAChB,UAAU;EACV,kBAAkB;EAClB,YAAY;AACd;AACA;EACE,mBAAmB;AACrB;AACA;EACE,eAAe;AACjB;AACA;;EAEE,YAAY;AACd;AACA;EACE,mBAAmB;EACnB,oBAAoB;AACtB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,mBAAmB;AACrB;AACA;;EAEE,oBAAoB;AACtB;AACA;EACE,4RAA4R;AAC9R;AACA;EACE,kBAAkB;AACpB;AACA;EACE,cAAc;AAChB","file":"DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true&","sourcesContent":[".DigitalCountdownTimer[data-v-2b3215b5] {\n  color: #ffffff;\n  border-radius: 0.3em;\n  border: 1px solid white;\n  font-family: 'digital-7', 'sans-serif';\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  font-size: 1.5em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n  padding-top: 0.1em;\n}\n@font-face {\n  font-family: 'digital-7';\n  src: url('./fonts/digital-7.ttf');\n}\n/* CLOCK */\ndiv.clock div[data-v-2b3215b5] {\n  display: inline-block;\n  position: relative;\n}\ndiv.clock div p[data-v-2b3215b5] {\n  position: relative;\n  z-index: 100;\n  margin-bottom: 0 !important;\n  line-height: 1em;\n}\ndiv.clock div p.minutes[data-v-2b3215b5],\ndiv.clock div p.seconds[data-v-2b3215b5] {\n  transition: text-shadow 0.3s ease !important;\n}\ndiv.clock .placeholder[data-v-2b3215b5] {\n  color: #8E5229;\n  position: absolute;\n  top: 0;\n  z-index: 50;\n}\ndiv.clock .meridian[data-v-2b3215b5] {\n  margin-left: 0.5em;\n}\n/*END CLOCK*/\n/*CLASS THAT CHANGES COLOR OF TEXT TO APPEAR LIKE ITS \"ON\"*/\n.light-on[data-v-2b3215b5] {\n  color: #ffffff;\n}\n.message[data-v-2b3215b5] {\n  display: block !important;\n  font-size: 0.4em;\n  top: 0.1em;\n  text-align: center;\n  left: -0.3em;\n}\n.seconds[data-v-2b3215b5] {\n  margin-right: 0.5em;\n}\n.seconds.two[data-v-2b3215b5] {\n  margin-right: 0;\n}\n.seconds.two[data-v-2b3215b5],\n.minutes.two[data-v-2b3215b5] {\n  left: -0.5em;\n}\n.colon[data-v-2b3215b5] {\n  margin-left: -0.7em;\n  margin-right: -0.3em;\n}\n.seconds-numbers[data-v-2b3215b5] {\n  margin-right: -1em;\n}\n.minutes-numbers[data-v-2b3215b5] {\n  margin-right: 0.5em;\n}\n.minutes-numbers .minutes.hidden[data-v-2b3215b5],\n.minutes-numbers .minutes.two[data-v-2b3215b5] {\n  margin-right: -0.5em;\n}\n.glow[data-v-2b3215b5] {\n  text-shadow: 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5);\n}\n.hidden[data-v-2b3215b5] {\n  visibility: hidden;\n}\n.colon-hidden[data-v-2b3215b5] {\n  color: #8E5229;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".non-invasive-web-style-framework .ValidationButton[data-v-d771c0a4] {\n  overflow-y: hidden;\n  max-height: 2.5em;\n}\n.non-invasive-web-style-framework .ValidationButton .loader[data-v-d771c0a4] {\n  display: none !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled[data-v-d771c0a4] {\n  overflow-y: hidden;\n  max-height: 2.5em;\n  pointer-events: all !important;\n  cursor: wait !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled .loader[data-v-d771c0a4] {\n  display: inline-block !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled .message[data-v-d771c0a4] {\n  margin-top: 50px;\n}\n", "",{"version":3,"sources":["ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,8BAA8B;EAC9B,uBAAuB;AACzB;AACA;EACE,gCAAgC;AAClC;AACA;EACE,gBAAgB;AAClB","file":"ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true&","sourcesContent":[".non-invasive-web-style-framework .ValidationButton[data-v-d771c0a4] {\n  overflow-y: hidden;\n  max-height: 2.5em;\n}\n.non-invasive-web-style-framework .ValidationButton .loader[data-v-d771c0a4] {\n  display: none !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled[data-v-d771c0a4] {\n  overflow-y: hidden;\n  max-height: 2.5em;\n  pointer-events: all !important;\n  cursor: wait !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled .loader[data-v-d771c0a4] {\n  display: inline-block !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled .message[data-v-d771c0a4] {\n  margin-top: 50px;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".actions[data-v-74f24961] {\n  text-align: center !important;\n}\n", "",{"version":3,"sources":["ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,6BAA6B;AAC/B","file":"ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true&","sourcesContent":[".actions[data-v-74f24961] {\n  text-align: center !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".UserAvatarIcons[data-v-2027b2d6] {\n  display: inline-block;\n  user-select: none;\n}\n.UserAvatarIcons .avatar-list[data-v-2027b2d6] {\n  display: inline-block;\n  vertical-align: top;\n  direction: ltr;\n}\n.UserAvatarIcons .avatar[data-v-2027b2d6] {\n  max-height: 2em;\n  width: auto;\n  margin-left: -0.5em;\n  position: relative;\n  filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.7));\n}\n.UserAvatarIcons .avatar[data-v-2027b2d6]:first-of-type {\n  margin-left: 0;\n}\n.UserAvatarIcons .user-count[data-v-2027b2d6] {\n  display: inline-block;\n  vertical-align: top;\n  line-height: 2em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n", "",{"version":3,"sources":["UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,cAAc;AAChB;AACA;EACE,eAAe;EACf,WAAW;EACX,mBAAmB;EACnB,kBAAkB;EAClB,yDAAyD;AAC3D;AACA;EACE,cAAc;AAChB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB","file":"UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true&","sourcesContent":[".UserAvatarIcons[data-v-2027b2d6] {\n  display: inline-block;\n  user-select: none;\n}\n.UserAvatarIcons .avatar-list[data-v-2027b2d6] {\n  display: inline-block;\n  vertical-align: top;\n  direction: ltr;\n}\n.UserAvatarIcons .avatar[data-v-2027b2d6] {\n  max-height: 2em;\n  width: auto;\n  margin-left: -0.5em;\n  position: relative;\n  filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.7));\n}\n.UserAvatarIcons .avatar[data-v-2027b2d6]:first-of-type {\n  margin-left: 0;\n}\n.UserAvatarIcons .user-count[data-v-2027b2d6] {\n  display: inline-block;\n  vertical-align: top;\n  line-height: 2em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".checkbox-toggle[data-v-74379ec1] {\n  margin-left: 1em;\n  margin-right: 1em;\n  cursor: pointer !important;\n}\n.checkbox-toggle label[data-v-74379ec1] {\n  cursor: pointer !important;\n}\n", "",{"version":3,"sources":["CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,0BAA0B;AAC5B;AACA;EACE,0BAA0B;AAC5B","file":"CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true&","sourcesContent":[".checkbox-toggle[data-v-74379ec1] {\n  margin-left: 1em;\n  margin-right: 1em;\n  cursor: pointer !important;\n}\n.checkbox-toggle label[data-v-74379ec1] {\n  cursor: pointer !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".IframeMessageSegment[data-v-54264361] {\n  text-align: center;\n  overflow-x: hidden;\n  overflow-y: hidden;\n}\n.IframeMessageSegment iframe[data-v-54264361] {\n  width: 100%;\n}\n", "",{"version":3,"sources":["IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;AACpB;AACA;EACE,WAAW;AACb","file":"IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true&","sourcesContent":[".IframeMessageSegment[data-v-54264361] {\n  text-align: center;\n  overflow-x: hidden;\n  overflow-y: hidden;\n}\n.IframeMessageSegment iframe[data-v-54264361] {\n  width: 100%;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.css":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.css ***!
  \************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* fonts */\n\ndiv.jqcloud {\n  font-family: \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 10px;\n  line-height: normal;\n}\n\ndiv.jqcloud a {\n  font-size: inherit;\n  text-decoration: none;\n}\n\ndiv.jqcloud span.w10 { font-size: 550%; }\ndiv.jqcloud span.w9 { font-size: 500%; }\ndiv.jqcloud span.w8 { font-size: 450%; }\ndiv.jqcloud span.w7 { font-size: 400%; }\ndiv.jqcloud span.w6 { font-size: 350%; }\ndiv.jqcloud span.w5 { font-size: 300%; }\ndiv.jqcloud span.w4 { font-size: 250%; }\ndiv.jqcloud span.w3 { font-size: 200%; }\ndiv.jqcloud span.w2 { font-size: 150%; }\ndiv.jqcloud span.w1 { font-size: 100%; }\n\n/* colors */\n\ndiv.jqcloud { color: #09f; }\ndiv.jqcloud a { color: inherit; }\ndiv.jqcloud a:hover { color: #0df; }\ndiv.jqcloud a:hover { color: #0cf; }\ndiv.jqcloud span.w10 { color: #0cf; }\ndiv.jqcloud span.w9 { color: #0cf; }\ndiv.jqcloud span.w8 { color: #0cf; }\ndiv.jqcloud span.w7 { color: #39d; }\ndiv.jqcloud span.w6 { color: #90c5f0; }\ndiv.jqcloud span.w5 { color: #90a0dd; }\ndiv.jqcloud span.w4 { color: #90c5f0; }\ndiv.jqcloud span.w3 { color: #a0ddff; }\ndiv.jqcloud span.w2 { color: #99ccee; }\ndiv.jqcloud span.w1 { color: #aab5f0; }\n\n/* layout */\n\ndiv.jqcloud {\n  overflow: hidden;\n  position: relative;\n}\n\ndiv.jqcloud span { padding: 0; }", "",{"version":3,"sources":["jqcloud.css"],"names":[],"mappings":"AAAA,UAAU;;AAEV;EACE,6CAA6C;EAC7C,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,qBAAqB;AACvB;;AAEA,uBAAuB,eAAe,EAAE;AACxC,sBAAsB,eAAe,EAAE;AACvC,sBAAsB,eAAe,EAAE;AACvC,sBAAsB,eAAe,EAAE;AACvC,sBAAsB,eAAe,EAAE;AACvC,sBAAsB,eAAe,EAAE;AACvC,sBAAsB,eAAe,EAAE;AACvC,sBAAsB,eAAe,EAAE;AACvC,sBAAsB,eAAe,EAAE;AACvC,sBAAsB,eAAe,EAAE;;AAEvC,WAAW;;AAEX,cAAc,WAAW,EAAE;AAC3B,gBAAgB,cAAc,EAAE;AAChC,sBAAsB,WAAW,EAAE;AACnC,sBAAsB,WAAW,EAAE;AACnC,uBAAuB,WAAW,EAAE;AACpC,sBAAsB,WAAW,EAAE;AACnC,sBAAsB,WAAW,EAAE;AACnC,sBAAsB,WAAW,EAAE;AACnC,sBAAsB,cAAc,EAAE;AACtC,sBAAsB,cAAc,EAAE;AACtC,sBAAsB,cAAc,EAAE;AACtC,sBAAsB,cAAc,EAAE;AACtC,sBAAsB,cAAc,EAAE;AACtC,sBAAsB,cAAc,EAAE;;AAEtC,WAAW;;AAEX;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA,mBAAmB,UAAU,EAAE","file":"jqcloud.css","sourcesContent":["/* fonts */\n\ndiv.jqcloud {\n  font-family: \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 10px;\n  line-height: normal;\n}\n\ndiv.jqcloud a {\n  font-size: inherit;\n  text-decoration: none;\n}\n\ndiv.jqcloud span.w10 { font-size: 550%; }\ndiv.jqcloud span.w9 { font-size: 500%; }\ndiv.jqcloud span.w8 { font-size: 450%; }\ndiv.jqcloud span.w7 { font-size: 400%; }\ndiv.jqcloud span.w6 { font-size: 350%; }\ndiv.jqcloud span.w5 { font-size: 300%; }\ndiv.jqcloud span.w4 { font-size: 250%; }\ndiv.jqcloud span.w3 { font-size: 200%; }\ndiv.jqcloud span.w2 { font-size: 150%; }\ndiv.jqcloud span.w1 { font-size: 100%; }\n\n/* colors */\n\ndiv.jqcloud { color: #09f; }\ndiv.jqcloud a { color: inherit; }\ndiv.jqcloud a:hover { color: #0df; }\ndiv.jqcloud a:hover { color: #0cf; }\ndiv.jqcloud span.w10 { color: #0cf; }\ndiv.jqcloud span.w9 { color: #0cf; }\ndiv.jqcloud span.w8 { color: #0cf; }\ndiv.jqcloud span.w7 { color: #39d; }\ndiv.jqcloud span.w6 { color: #90c5f0; }\ndiv.jqcloud span.w5 { color: #90a0dd; }\ndiv.jqcloud span.w4 { color: #90c5f0; }\ndiv.jqcloud span.w3 { color: #a0ddff; }\ndiv.jqcloud span.w2 { color: #99ccee; }\ndiv.jqcloud span.w1 { color: #aab5f0; }\n\n/* layout */\n\ndiv.jqcloud {\n  overflow: hidden;\n  position: relative;\n}\n\ndiv.jqcloud span { padding: 0; }"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Auth/Auth.html?vue&type=template&id=60e46f07&":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Auth/Auth.html?vue&type=template&id=60e46f07& ***!
  \******************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Login/Login.html?vue&type=template&id=15c3505b&scoped=true&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/Login/Login.html?vue&type=template&id=15c3505b&scoped=true& ***!
  \********************************************************************************************************************************************************************/
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
    { staticClass: "login-modal" },
    [
      _c("modal", {
        ref: "LoginModal",
        attrs: {
          config: _vm.config,
          status: _vm.status,
          progress: _vm.progress,
          lib: _vm.lib,
          dimmerTransparent: "false",
          cancelable: "false"
        },
        scopedSlots: _vm._u([
          {
            key: "header",
            fn: function() {
              return [
                _c(
                  "div",
                  {
                    on: {
                      click: function($event) {
                        _vm.adminMode = !_vm.adminMode
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\r\n        " +
                        _vm._s(_vm.$t("Welcome to PACOR")) +
                        "\r\n      "
                    )
                  ]
                )
              ]
            },
            proxy: true
          },
          {
            key: "content",
            fn: function() {
              return [
                _c(
                  "div",
                  { staticClass: "ui middle aligned grid" },
                  [
                    _c(
                      "media",
                      {
                        attrs: { query: { minWidth: _vm.compactWidth } },
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
                        !_vm.isCompactMode
                          ? _c("div", { staticClass: "six wide column" }, [
                              _c("img", {
                                staticClass: "ui image",
                                attrs: {
                                  src: _vm.config.baseURL + "/imgs/pacor.svg"
                                },
                                on: { dblclick: _vm.createMockupUsername }
                              })
                            ])
                          : _vm._e()
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { class: _vm.computedFormClassList },
                      [
                        _c("iframe-message-segment", {
                          staticClass: "login-message",
                          attrs: {
                            config: _vm.config,
                            message: _vm.status.readingConfig.login.message
                          }
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "ui field" }, [
                          _c("label", { attrs: { for: "loginUsername" } }, [
                            _vm._v(
                              "\r\n              " +
                                _vm._s(_vm.$t("Username")) +
                                "\r\n              (" +
                                _vm._s(_vm.$t("cannot contain space")) +
                                ")\r\n            "
                            )
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
                                  _vm._k(
                                    $event.keyCode,
                                    "enter",
                                    13,
                                    $event.key,
                                    "Enter"
                                  )
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
                        _vm.adminMode
                          ? _c("div", { staticClass: "ui field" }, [
                              _c("label", { attrs: { for: "loginPassword" } }, [
                                _vm._v(
                                  "\r\n              " +
                                    _vm._s(_vm.$t("Password")) +
                                    "\r\n            "
                                )
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
                                  id: "loginPassword"
                                },
                                domProps: { value: _vm.password },
                                on: {
                                  keyup: function($event) {
                                    if (
                                      !$event.type.indexOf("key") &&
                                      _vm._k(
                                        $event.keyCode,
                                        "enter",
                                        13,
                                        $event.key,
                                        "Enter"
                                      )
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
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("div", {
                          staticClass: "ui field",
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.$t("agreement-link", [_vm.agreementLink])
                            )
                          }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
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
                    staticClass: "ui button login-submit",
                    class: { disabled: _vm.isDisableLogin },
                    on: { click: _vm.login }
                  },
                  [_vm._v(_vm._s(_vm.$t("LOGIN")))]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=142d96e4&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=142d96e4&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "event",
      class: _vm.computedEventClassList,
      on: { click: _vm.read }
    },
    [
      _c("div", { staticClass: "label" }, [
        _c("img", { attrs: { src: _vm.avatar } })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c("div", { staticClass: "summary" }, [
          _c("a", { staticClass: "user" }, [
            _vm._v("\r\n        " + _vm._s(_vm.username) + "\r\n      ")
          ]),
          _vm._v(
            "\r\n      \r\n      " + _vm._s(_vm.action) + "\r\n      \r\n      "
          ),
          _c("div", { staticClass: "date" }, [
            _vm._v("\r\n        " + _vm._s(_vm.displayTime) + "\r\n      ")
          ])
        ]),
        _vm._v(" "),
        _vm.summary
          ? _c("div", {
              staticClass: "extra text",
              domProps: { innerHTML: _vm._s(_vm.summary) }
            })
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=63ec2610&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=63ec2610&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "event",
      class: _vm.computedEventClassList,
      on: { click: _vm.read }
    },
    [
      _c("div", { staticClass: "label" }, [
        _c("img", { attrs: { src: _vm.avatar } })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c("div", { staticClass: "summary" }, [
          _c("a", { staticClass: "user" }, [
            _vm._v("\r\n        " + _vm._s(_vm.username) + "\r\n      ")
          ]),
          _vm._v(
            "\r\n      \r\n      " + _vm._s(_vm.action) + "\r\n      \r\n      "
          ),
          _c("div", { staticClass: "date" }, [
            _vm._v("\r\n        " + _vm._s(_vm.displayTime) + "\r\n      ")
          ])
        ]),
        _vm._v(" "),
        _vm.summary
          ? _c("div", {
              staticClass: "extra text",
              domProps: { innerHTML: _vm._s(_vm.summary) }
            })
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=d390b978&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=d390b978&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "event",
      class: _vm.computedEventClassList,
      on: { click: _vm.read }
    },
    [
      _c("div", { staticClass: "label" }, [
        _c("img", { attrs: { src: _vm.avatar } })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c("div", { staticClass: "summary" }, [
          _c("a", { staticClass: "user" }, [
            _vm._v("\r\n        " + _vm._s(_vm.username) + "\r\n      ")
          ]),
          _vm._v(
            "\r\n      \r\n      " + _vm._s(_vm.action) + "\r\n      \r\n      "
          ),
          _c("div", { staticClass: "date" }, [
            _vm._v("\r\n        " + _vm._s(_vm.displayTime) + "\r\n      ")
          ])
        ]),
        _vm._v(" "),
        _vm.summary
          ? _c("div", {
              staticClass: "extra text",
              domProps: { innerHTML: _vm._s(_vm.summary) }
            })
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=ec165538&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=ec165538&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "event",
      class: _vm.computedEventClassList,
      on: { click: _vm.read }
    },
    [
      _c("div", { staticClass: "label" }, [
        _c("img", { attrs: { src: _vm.avatar } })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c("div", { staticClass: "summary" }, [
          _c("a", { staticClass: "user" }, [
            _vm._v("\r\n        " + _vm._s(_vm.username) + "\r\n      ")
          ]),
          _vm._v(
            "\r\n      \r\n      " + _vm._s(_vm.action) + "\r\n      \r\n      "
          ),
          _c("div", { staticClass: "date" }, [
            _vm._v("\r\n        " + _vm._s(_vm.displayTime) + "\r\n      ")
          ])
        ]),
        _vm._v(" "),
        _vm.summary
          ? _c("div", {
              staticClass: "extra text",
              domProps: { innerHTML: _vm._s(_vm.summary) }
            })
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.html?vue&type=template&id=23ad6084&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.html?vue&type=template&id=23ad6084&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "NotificationFeed",
      on: {
        scroll: function($event) {
          $event.stopPropagation()
          return _vm.onScrollList($event)
        }
      }
    },
    [
      _vm.noOlder
        ? _c(
            "div",
            { staticClass: "ui secondary segment no-more" },
            [
              _vm.notificationData.unreadNotifications.length > 0
                ? [
                    _vm._v(
                      "\r\n      " + _vm._s(_vm.$t("No More")) + "\r\n    "
                    )
                  ]
                : [
                    _vm._v(
                      "\r\n      " +
                        _vm._s(_vm.$t("No Notifications")) +
                        "\r\n    "
                    )
                  ]
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { ref: "feed", staticClass: "ui divided feed" },
        _vm._l(_vm.notificationData.unreadNotifications, function(
          notification
        ) {
          return _c(_vm.eventType(notification), {
            key: notification.id,
            tag: "component",
            attrs: {
              lib: _vm.lib,
              status: _vm.status,
              config: _vm.config,
              notification: notification
            },
            on: {
              read: function($event) {
                return _vm.onRead(notification)
              }
            }
          })
        }),
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.html?vue&type=template&id=3f6b6eff&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.html?vue&type=template&id=3f6b6eff&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
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
    "a",
    {
      staticClass: "NotificationIcon item",
      on: {
        click: function($event) {
          if ($event.target !== $event.currentTarget) {
            return null
          }
          return (function() {
            _vm.$refs.anchor.click()
          })($event)
        }
      }
    },
    [
      _c("i", {
        ref: "anchor",
        staticClass: "bell icon",
        on: {
          "~click": function($event) {
            return _vm.initPopup($event)
          }
        }
      }),
      _vm._v(" "),
      _vm.notificationData.unreadCount > 0
        ? _c("div", { staticClass: "floating ui red label" }, [
            _vm._v(
              "\r\n    " + _vm._s(_vm.notificationData.unreadCount) + "\r\n  "
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { ref: "popup", staticClass: "list ui popup" },
        [
          _c("notification-feed", {
            ref: "feed",
            attrs: {
              config: _vm.config,
              status: _vm.status,
              lib: _vm.lib,
              notificationData: _vm.notificationData
            }
          }),
          _vm._v(" "),
          _vm.notificationData.hasNotification
            ? _c(
                "div",
                {
                  staticClass: "ui segment view-all",
                  on: {
                    click: function() {
                      _vm.lib.NotificationManager.showFull()
                    }
                  }
                },
                [
                  _vm._v(
                    "\r\n      " +
                      _vm._s(_vm.$t("View All Notifications")) +
                      "\r\n    "
                  )
                ]
              )
            : _vm._e()
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.html?vue&type=template&id=135dd4ea&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.html?vue&type=template&id=135dd4ea&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "NotificationModal" },
    [
      _c("modal", {
        ref: "Modal",
        attrs: {
          config: _vm.config,
          status: _vm.status,
          lib: _vm.lib,
          cancelButtonText: _vm.$t("CLOSE"),
          fullContent: true
        },
        scopedSlots: _vm._u([
          {
            key: "header",
            fn: function() {
              return [
                _vm._v(
                  "\r\n      " + _vm._s(_vm.$t("Notifications")) + "\r\n    "
                )
              ]
            },
            proxy: true
          },
          {
            key: "content",
            fn: function() {
              return [
                _c("div", { staticClass: "ui segment trigger-users" }, [
                  _c("span", { staticClass: "column" }, [
                    _vm._v(
                      "\r\n        " +
                        _vm._s(_vm.$t("Readers interacted with you")) +
                        ":\r\n        "
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "column" },
                    [
                      _c("user-avatar-icons", {
                        attrs: {
                          config: _vm.config,
                          status: _vm.status,
                          lib: _vm.lib,
                          users: _vm.triggerUsers
                        }
                      })
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    ref: "feed",
                    staticClass: "notification-list ui divided feed",
                    on: {
                      scroll: function($event) {
                        $event.stopPropagation()
                        return _vm.onScrollList($event)
                      }
                    }
                  },
                  [
                    _vm._l(_vm.notifications, function(notification) {
                      return _c(_vm.eventType(notification), {
                        key: notification.id,
                        tag: "component",
                        attrs: {
                          lib: _vm.lib,
                          status: _vm.status,
                          config: _vm.config,
                          notification: notification
                        },
                        on: {
                          read: function($event) {
                            return _vm.onRead(notification)
                          }
                        }
                      })
                    }),
                    _vm._v(" "),
                    _vm.noOlder
                      ? _c(
                          "div",
                          { staticClass: "ui secondary segment no-more" },
                          [
                            _vm.notifications.length > 0
                              ? [
                                  _vm._v(
                                    "\r\n            " +
                                      _vm._s(_vm.$t("No More")) +
                                      "\r\n          "
                                  )
                                ]
                              : [
                                  _vm._v(
                                    "\r\n            " +
                                      _vm._s(_vm.$t("No Notifications")) +
                                      "\r\n          "
                                  )
                                ]
                          ],
                          2
                        )
                      : _vm._e()
                  ],
                  2
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.html?vue&type=template&id=77c708f2&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.html?vue&type=template&id=77c708f2& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "NotificationManager" },
    [
      _c("notification-modal", {
        ref: "NotificationModal",
        attrs: {
          config: _vm.config,
          status: _vm.status,
          lib: _vm.lib,
          notificationData: _vm.notificationData
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.html?vue&type=template&id=abd88654&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.html?vue&type=template&id=abd88654&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "item PeerItem",
      class: _vm.computedItemClassList,
      on: { click: _vm.onSelectPeer }
    },
    [
      _c("div", { staticClass: "ui mini image" }, [
        _vm.user
          ? _c("img", {
              staticClass: "user-avatar",
              attrs: { src: _vm.avatar }
            })
          : _c("i", { staticClass: "large users icon" })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c(
          "div",
          { staticClass: "header" },
          [
            _vm._v(
              "\r\n      " +
                _vm._s(_vm.username) +
                "\r\n      \r\n      \r\n      "
            ),
            !_vm.isReader
              ? _c("admin-badge", {
                  attrs: {
                    status: _vm.status,
                    config: _vm.config,
                    user: _vm.user
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _c("user-self-badge", {
              attrs: { status: _vm.status, config: _vm.config, user: _vm.user }
            }),
            _vm._v(" "),
            !_vm.isReady
              ? _c("span", { staticClass: "message" }, [
                  _vm._v(
                    "\r\n        " +
                      _vm._s(_vm.$t("(Reading...)")) +
                      "\r\n      "
                  )
                ])
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "description" },
          [
            _vm._l(_vm.annotationTypes, function(t) {
              return _c("annotation-type-button", {
                key: t.type,
                attrs: {
                  lib: _vm.lib,
                  config: _vm.config,
                  status: _vm.status,
                  type: t.type,
                  count: t.count
                }
              })
            }),
            _vm._v(" "),
            _vm.user && _vm.annotationTypes.length === 0
              ? [
                  _vm._v(
                    "\r\n        " +
                      _vm._s(_vm.$t("No annotation")) +
                      "\r\n      "
                  )
                ]
              : _vm._e()
          ],
          2
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.html?vue&type=template&id=30e3b3ee&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.html?vue&type=template&id=30e3b3ee&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "PeerList content-full-height" }, [
    _c(
      "div",
      { staticClass: "ui link items all-item" },
      [
        _c("peer-item", {
          key: 0,
          attrs: {
            config: _vm.config,
            status: _vm.status,
            lib: _vm.lib,
            filterData: _vm.filterData
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { ref: "list", staticClass: "items-list ui link divided items" },
      _vm._l(_vm.filterData.users, function(user) {
        return _c("peer-item", {
          key: user.id,
          attrs: {
            config: _vm.config,
            status: _vm.status,
            lib: _vm.lib,
            user: user,
            filterData: _vm.filterData
          },
          on: {
            click: function($event) {
              return _vm.onPeerItemClick(user)
            }
          }
        })
      }),
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.html?vue&type=template&id=0902329e&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.html?vue&type=template&id=0902329e&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "UserChart content-full-height" },
    [
      _c("div", { staticClass: "jqcloud-wrapper" }, [
        _c("div", { ref: "jQCloudContainer", staticClass: "jqcloud-container" })
      ]),
      _vm._v(" "),
      _c("user-chart-popup", {
        ref: "UserChartPopup",
        attrs: {
          config: _vm.config,
          status: _vm.status,
          lib: _vm.lib,
          filterData: _vm.filterData
        }
      }),
      _vm._v(" "),
      _vm.jQCloudWords.length > 0
        ? _c("user-chart-labels", {
            ref: "UserChartLabels",
            attrs: {
              config: _vm.config,
              status: _vm.status,
              lib: _vm.lib,
              filterData: _vm.filterData
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.html?vue&type=template&id=448d2722&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.html?vue&type=template&id=448d2722&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "ui segment chart-labels UserChartLables" },
    [
      !_vm.otherIsMe
        ? [
            _vm.otherIsAll
              ? _c("span", { staticClass: "chart-label other" }, [
                  _c("i", { staticClass: "large users icon" }),
                  _vm._v(" "),
                  _c("span", { staticClass: "username" }, [
                    _vm._v(
                      "\r\n        " +
                        _vm._s(_vm.$t("All Readers")) +
                        "\r\n      "
                    )
                  ])
                ])
              : _c("span", { staticClass: "chart-label other" }, [
                  _c("img", { attrs: { src: _vm.otherAvatar } }),
                  _vm._v(" "),
                  _c("span", { staticClass: "username" }, [
                    _vm._v(
                      "\r\n        " + _vm._s(_vm.otherUsername) + "\r\n      "
                    )
                  ])
                ])
          ]
        : _vm._e(),
      _vm._v(" "),
      _c("span", { staticClass: "chart-label my" }, [
        _c("img", { attrs: { src: _vm.myAvatar } }),
        _vm._v(" "),
        _c(
          "span",
          { staticClass: "username" },
          [
            _vm._v(
              "\r\n      " +
                _vm._s(_vm.myUsername) +
                "\r\n      (" +
                _vm._s(_vm.$t("You")) +
                ")\r\n      "
            ),
            !_vm.otherIsMe
              ? [
                  _vm._v(
                    "\r\n        " + _vm._s(_vm.$t("and")) + "\r\n        "
                  ),
                  _vm.otherIsAll
                    ? [
                        _vm._v(
                          "\r\n          " +
                            _vm._s(_vm.$t("All Readers")) +
                            "\r\n        "
                        )
                      ]
                    : [
                        _vm._v(
                          "\r\n          " +
                            _vm._s(_vm.otherUsername) +
                            "\r\n        "
                        )
                      ]
                ]
              : _vm._e()
          ],
          2
        )
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.html?vue&type=template&id=31df0066&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.html?vue&type=template&id=31df0066&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
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
      ref: "popup",
      staticClass: "ui popup UserChartPopup",
      on: { click: _vm.onPopupClick }
    },
    [
      _c("div", { staticClass: "focus-word" }, [
        _c("i", { staticClass: "small search icon" }),
        _vm._v("\r\n    " + _vm._s(_vm.popupFocusText) + "\r\n  ")
      ]),
      _vm._v(" "),
      !_vm.otherIsMe
        ? [
            _vm.otherIsAll
              ? _c("div", { staticClass: "word-label all" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c("span", { staticClass: "label-column" }, [
                    _c("span", { staticClass: "username" }, [
                      _vm._v(
                        "\r\n            " +
                          _vm._s(_vm.$t("All Readers")) +
                          "\r\n          "
                      )
                    ]),
                    _vm._v(
                      "\r\n          :\r\n          " +
                        _vm._s(_vm.popupOtherCount) +
                        "\r\n        "
                    )
                  ])
                ])
              : _c("div", { staticClass: "word-label other" }, [
                  _c("span", { staticClass: "label-column icon" }, [
                    _c("img", { attrs: { src: _vm.otherAvatar } })
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "label-column" }, [
                    _c("span", { staticClass: "username" }, [
                      _vm._v(
                        "\r\n            " +
                          _vm._s(_vm.otherUsername) +
                          "\r\n          "
                      )
                    ]),
                    _vm._v(
                      "\r\n          :\r\n          " +
                        _vm._s(_vm.popupOtherCount) +
                        "\r\n        "
                    )
                  ])
                ])
          ]
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "word-label my" }, [
        _c("span", { staticClass: "label-column icon" }, [
          _c("img", { attrs: { src: _vm.myAvatar } })
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "label-column" }, [
          _c("span", { staticClass: "username" }, [
            _vm._v(
              "\r\n          " +
                _vm._s(_vm.myUsername) +
                "\r\n          (" +
                _vm._s(_vm.$t("You")) +
                ")\r\n        "
            )
          ]),
          _vm._v(
            "\r\n        :\r\n        " +
              _vm._s(_vm.popupMyCount) +
              "\r\n      "
          )
        ])
      ])
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "label-column icon" }, [
      _c("i", { staticClass: "large users icon" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.html?vue&type=template&id=5e5c50d9&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.html?vue&type=template&id=5e5c50d9&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
    "a",
    { staticClass: "item", on: { click: _vm.show } },
    [
      _vm.peerIsMe
        ? [
            _c("span", { staticClass: "peer-label" }, [
              _vm._v("\r\n      " + _vm._s(_vm.$t("View")) + " \r\n    ")
            ]),
            _vm._v(" "),
            _c("img", {
              staticClass: "user-avatar",
              attrs: { src: _vm.peer.avatar_url, title: _vm.username }
            })
          ]
        : _vm.peer
        ? [
            _c("span", { staticClass: "peer-label" }, [
              _vm._v("\r\n      " + _vm._s(_vm.$t("Asist")) + " \r\n    ")
            ]),
            _vm._v(" "),
            _c("img", {
              staticClass: "user-avatar",
              attrs: { src: _vm.peer.avatar_url, title: _vm.username }
            })
          ]
        : [
            _c("span", { staticClass: "peer-all-label peer-label" }, [
              _vm._v("\r\n      " + _vm._s(_vm.$t("Viewing All")) + "\r\n    ")
            ]),
            _vm._v(" "),
            _c("i", { staticClass: "large users icon" })
          ],
      _vm._v(" "),
      _c("modal", {
        ref: "Modal",
        attrs: {
          config: _vm.config,
          status: _vm.status,
          cancelable: "true",
          lib: _vm.lib
        },
        scopedSlots: _vm._u([
          {
            key: "header",
            fn: function() {
              return [
                _vm._v(
                  "\r\n        " +
                    _vm._s(_vm.$t("Please select a peer")) +
                    "\r\n      "
                )
              ]
            },
            proxy: true
          },
          {
            key: "content",
            fn: function() {
              return [
                _c("div", { staticClass: "ui grid" }, [
                  _c(
                    "div",
                    { staticClass: "six wide column left-column" },
                    [
                      _c("peer-list", {
                        ref: "PeerList",
                        attrs: {
                          config: _vm.config,
                          status: _vm.status,
                          lib: _vm.lib,
                          filterData: _vm.filterData
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "ten wide column right-column" },
                    [
                      _c("user-chart", {
                        ref: "UserChart",
                        attrs: {
                          config: _vm.config,
                          status: _vm.status,
                          lib: _vm.lib,
                          filterData: _vm.filterData
                        }
                      })
                    ],
                    1
                  )
                ])
              ]
            },
            proxy: true
          },
          {
            key: "actions",
            fn: function() {
              return [
                _vm.filterData.selectUser !== _vm.status.filter.focusUser
                  ? _c(
                      "div",
                      { staticClass: "ui button", on: { click: _vm.submit } },
                      [
                        _vm._v(
                          "\r\n          " +
                            _vm._s(_vm.$t("SELECT")) +
                            "\r\n        "
                        )
                      ]
                    )
                  : _vm._e()
              ]
            },
            proxy: true
          }
        ])
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.html?vue&type=template&id=21a9a788&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.html?vue&type=template&id=21a9a788&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************/
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
  return _vm.annotation
    ? _c(
        "div",
        {
          staticClass: "ui segment AnnotationItem",
          class: _vm.computedContainerClassNames,
          attrs: { "data-annotation-id": _vm.annotation.id },
          on: {
            mouseover: _vm.onMouseover,
            mouseout: _vm.onMouseout,
            click: _vm.onClick
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "meta text-container ui basic right labeled button",
              class: { clickable: _vm.findAnnotation },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  return _vm.onFindAnnotation(_vm.annotation)
                }
              }
            },
            [
              _c("span", { staticClass: "display-time" }, [
                _vm._v("\r\n      " + _vm._s(_vm.displayTime) + "\r\n    ")
              ]),
              _vm._v(" "),
              _vm.lib.auth.enableCollaboration
                ? _c("annotation-item-interactive", {
                    attrs: {
                      config: _vm.config,
                      status: _vm.status,
                      lib: _vm.lib,
                      annotation: _vm.annotation,
                      size: "mini"
                    },
                    on: {
                      like: _vm.onlike,
                      unlike: _vm.onlike,
                      comment: function($event) {
                        return _vm.$emit("comment", _vm.annotation)
                      }
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.findAnnotation
                ? _c("i", { staticClass: "right angle icon" })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "left column" },
            [
              _c(
                "div",
                {
                  staticClass: "user",
                  class: { clickable: _vm.findUser },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      return _vm.onFindUser(_vm.annotation.user)
                    }
                  }
                },
                [
                  _c("img", {
                    staticClass: "avatar",
                    attrs: { src: _vm.annotation.user.avatar_url }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "username text-container" }, [
                    _vm._v("\r\n        " + _vm._s(_vm.username) + "\r\n      ")
                  ])
                ]
              ),
              _vm._v(" "),
              _c("annotation-type-button", {
                attrs: {
                  status: _vm.status,
                  type: _vm.annotation.type,
                  clickable: typeof _vm.findType === "function"
                },
                on: {
                  find: function(type) {
                    _vm.onFindType(type)
                  }
                }
              }),
              _vm._v(" "),
              _vm.note
                ? _c("div", {
                    staticClass: "note text-container",
                    domProps: { innerHTML: _vm._s(_vm.note) }
                  })
                : _vm._e()
            ],
            1
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=6ce3bf7e&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=6ce3bf7e&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _c("span", { staticClass: "AnnotationInteractive" }, [
    _vm.isNotMe
      ? _c("span", [
          _c(
            "button",
            {
              staticClass: "like ui button",
              class: _vm.computedLikesButtonClass,
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  return _vm.like($event)
                }
              }
            },
            [
              _c("i", { staticClass: "thumbs up outline icon" }),
              _vm._v(" "),
              _vm.showLabel
                ? [
                    _vm.likes > 0
                      ? [
                          _vm._v(
                            "\r\n          " +
                              _vm._s(_vm.$t("{0} Likes", [_vm.likes])) +
                              "\r\n        "
                          )
                        ]
                      : [
                          _vm._v(
                            "\r\n          " +
                              _vm._s(_vm.$t("Like")) +
                              "\r\n        "
                          )
                        ]
                  ]
                : _vm.likes > 0
                ? [_vm._v("\r\n        " + _vm._s(_vm.likes) + "\r\n      ")]
                : _vm._e()
            ],
            2
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.enableComment && _vm.enableComment !== false
      ? _c("span", [
          _c(
            "button",
            {
              staticClass: "comments ui button",
              class: _vm.computedCommentsButtonClass,
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  return _vm.comment($event)
                }
              }
            },
            [
              _c("i", { staticClass: "comment outline icon" }),
              _vm._v(" "),
              _vm.showLabel
                ? [
                    _vm.likes > 0
                      ? [
                          _vm._v(
                            "\r\n          " +
                              _vm._s(_vm.$t("{0} Comments", [_vm.comments])) +
                              "\r\n        "
                          )
                        ]
                      : [
                          _vm._v(
                            "\r\n          " +
                              _vm._s(_vm.$t("Comment")) +
                              "\r\n        "
                          )
                        ]
                  ]
                : _vm.comments > 0
                ? [_vm._v("\r\n        " + _vm._s(_vm.comments) + "\r\n      ")]
                : _vm._e()
            ],
            2
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=75d99c9c&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=75d99c9c&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
    "span",
    {
      staticClass: "ui mini button AnnotationTypeButton",
      class: _vm.computedClass,
      style: _vm.computedStyle,
      attrs: { title: _vm.typeName },
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.$emit("find", _vm.type)
        }
      }
    },
    [
      _vm._v("\r\n  " + _vm._s(_vm.typeName) + "\r\n  "),
      _vm.count
        ? [_vm._v("\r\n    : " + _vm._s(_vm.count) + "\r\n  ")]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.html?vue&type=template&id=25440a89&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.html?vue&type=template&id=25440a89& ***!
  \*********************************************************************************************************************************************************************************************/
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
  return _c("span")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/BlockExit/BlockExit.html?vue&type=template&id=9febab1a&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/reading-progress/BlockExit/BlockExit.html?vue&type=template&id=9febab1a& ***!
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
  return _c("span", { staticClass: "BlockExit" })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/Clock/Clock.html?vue&type=template&id=4ac8668e&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/reading-progress/Clock/Clock.html?vue&type=template&id=4ac8668e& ***!
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
  return _c("fragment", [
    _vm._v("\r\n  " + _vm._s(_vm.hour) + ":" + _vm._s(_vm.minute) + "\r\n")
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.html?vue&type=template&id=7cf92a63&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.html?vue&type=template&id=7cf92a63&scoped=true& ***!
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
    "button",
    {
      staticClass: "ui button",
      class: _vm.computedClassName,
      attrs: { type: "button" },
      on: { click: _vm.onClick }
    },
    [
      _vm.isEnable
        ? [
            _vm._t("default", null, {
              autoClickRemainingSeconds: _vm.autoClickRemainingSeconds
            })
          ]
        : [_vm._v("\r\n    (" + _vm._s(_vm.disabledMessage) + ")\r\n  ")]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=2b3215b5&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=2b3215b5&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _vm.dataRemainingSec > 0
    ? _c("span", { ref: "timer", staticClass: "DigitalCountdownTimer" }, [
        _c("div", { staticClass: "clock" }, [
          _c("div", { staticClass: "message" }, [
            _vm._v("\r\n      " + _vm._s(_vm.$t("Remaining Time")) + "\r\n    ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "numbers minutes-numbers" }, [
            _c(
              "p",
              {
                ref: "minutesNumbers",
                staticClass: "minutes",
                class: _vm.computedMinutesClassList
              },
              [
                _vm.dataMinutes
                  ? [
                      _vm._v(
                        "\r\n          " +
                          _vm._s(_vm.dataMinutes) +
                          "\r\n        "
                      )
                    ]
                  : [_vm._v("\r\n          88\r\n        ")]
              ],
              2
            ),
            _vm._v(" "),
            _c("p", { staticClass: "placeholder" }, [_vm._v("88")])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "colon", class: _vm.computedMinutesColonClassList },
            [_c("p", [_vm._v(":")])]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "numbers seconds-numbers" }, [
            _c(
              "p",
              {
                ref: "secondsNumbers",
                staticClass: "seconds",
                class: _vm.computedSecondsClassList
              },
              [_vm._v("\r\n        " + _vm._s(_vm.dataSeconds) + "\r\n      ")]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "placeholder" }, [_vm._v("88")])
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=62c3709b&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=62c3709b&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
  return _vm.dataRemainingSec > 0
    ? _c("span", { staticClass: "CountdownTimer" }, [
        _vm._v(
          "\r\n  " +
            _vm._s(_vm.$t("Remaining Time")) +
            ":\r\n  " +
            _vm._s(_vm.dataRemainingTime) +
            "\r\n"
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-button/ValidationButton/ValidationButton.html?vue&type=template&id=d771c0a4&scoped=true&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui-button/ValidationButton/ValidationButton.html?vue&type=template&id=d771c0a4&scoped=true& ***!
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
  return _c(
    "button",
    {
      staticClass: "ui button ValidationButton",
      class: _vm.computedClassName,
      attrs: { type: "button" },
      on: { click: _vm.onclick }
    },
    [
      _vm.isEnable || !_vm.enable
        ? [
            _vm.hasLabeledIcon
              ? [
                  _vm.leftLabeledIcon
                    ? _c("i", { class: _vm.computedLeftLabeledIcon })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._t("default"),
                  _vm._v(" "),
                  _vm.rightLabeledIcon
                    ? _c("i", { class: _vm.computedRightLabeledIcon })
                    : _vm._e()
                ]
              : [
                  _c("div", { staticClass: "ui active mini inline loader" }),
                  _vm._v(" "),
                  _c("div", { staticClass: "message" }, [_vm._t("default")], 2)
                ]
          ]
        : [_vm._v("\r\n    (" + _vm._s(_vm.disabledMessage) + ")\r\n  ")]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.html?vue&type=template&id=74f24961&scoped=true&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.html?vue&type=template&id=74f24961&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************/
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
    { ref: "modal", staticClass: "ui basic modal ConfirmModal" },
    [
      _c(
        "div",
        { staticClass: "ui icon header" },
        [
          _vm.icon
            ? _c("i", { class: _vm.icon + " icon" })
            : _c("i", { staticClass: "question icon" }),
          _vm._v(" "),
          _vm.title
            ? void 0
            : [
                _vm._v(
                  "\r\n      " + _vm._s(_vm.$t("Are you sure?")) + "\r\n    "
                )
              ]
        ],
        2
      ),
      _vm._v(" "),
      _vm.message
        ? _c("div", {
            staticClass: "content",
            domProps: { innerHTML: _vm._s(_vm.message) }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "actions", class: _vm.computedActionsClassList },
        [
          _vm.isLeftHanded
            ? _c("div", { staticClass: "ui green ok inverted button" }, [
                _c("i", { staticClass: "checkmark icon" }),
                _vm._v("\r\n      " + _vm._s(_vm.$t("Yes")) + "\r\n    ")
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "ui red basic cancel inverted button" }, [
            _c("i", { staticClass: "remove icon" }),
            _vm._v("\r\n      " + _vm._s(_vm.$t("No")) + "\r\n    ")
          ]),
          _vm._v(" "),
          !_vm.isLeftHanded
            ? _c("div", { staticClass: "ui green ok inverted button" }, [
                _c("i", { staticClass: "checkmark icon" }),
                _vm._v("\r\n      " + _vm._s(_vm.$t("Yes")) + "\r\n    ")
              ])
            : _vm._e()
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-user/AdminBadge/AdminBadge.html?vue&type=template&id=c05ac432&scoped=true&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui-user/AdminBadge/AdminBadge.html?vue&type=template&id=c05ac432&scoped=true& ***!
  \******************************************************************************************************************************************************************************************/
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
  return _vm.isAdmin
    ? _c("i", {
        staticClass: "yellow certificate icon",
        attrs: { title: _vm.$t("Administrator") }
      })
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=2027b2d6&scoped=true&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=2027b2d6&scoped=true& ***!
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
  return _c("div", { staticClass: "UserAvatarIcons" }, [
    _c(
      "div",
      { staticClass: "avatar-list" },
      _vm._l(_vm.users, function(user, i) {
        return _c("img", {
          staticClass: "avatar",
          style: _vm.computedAvatarStyle(i),
          attrs: { title: _vm.username(user), src: user.avatar_url },
          on: {
            click: function($event) {
              $event.stopPropagation()
              return _vm.$emit("find", user)
            }
          }
        })
      }),
      0
    ),
    _vm._v(" "),
    _vm.userCount
      ? _c("div", { staticClass: "user-count" }, [
          _vm._v(
            "\r\n    " +
              _vm._s(_vm.$t("{0} Readers", [_vm.userCount])) +
              "\r\n  "
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=3e220741&scoped=true&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=3e220741&scoped=true& ***!
  \************************************************************************************************************************************************************************************************/
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
  return _vm.isYou
    ? _c("i", {
        staticClass: "green certificate icon",
        attrs: { title: _vm.$t("You") }
      })
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=74379ec1&scoped=true&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=74379ec1&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "ui toggle checkbox checkbox-toggle" }, [
    _c("input", {
      ref: "input",
      attrs: { type: "checkbox", name: "public" },
      domProps: { checked: _vm.value },
      on: {
        change: function($event) {
          return _vm.$emit("input", $event.target.checked)
        }
      }
    }),
    _vm._v(" "),
    _vm.label
      ? _c(
          "label",
          {
            on: {
              click: function($event) {
                return _vm.$refs.input.click()
              }
            }
          },
          [_vm._v(_vm._s(_vm.label))]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=54264361&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=54264361&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************/
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
    { staticClass: "IframeMessageSegment", class: _vm.computedClassList },
    [
      !_vm.url
        ? void 0
        : _c("iframe", {
            directives: [
              {
                name: "resize",
                rawName: "v-resize",
                value: { log: false },
                expression: "{ log: false }"
              }
            ],
            attrs: { src: _vm.url, frameborder: "0" }
          })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("6bc3b2fb", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("1b3778a2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("55b4c2cc", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("7ad20eac", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("51d52d16", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("950428d4", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("63a5c399", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("6382a6d0", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("4449de28", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("52608036", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("2f76c484", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("cab127ca", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("51c69aa1", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("25d5ef6f", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("5f199087", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("38b03a10", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("6c8dae16", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("2fd6bd3a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("00f46f1e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("81a57fba", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("07fe79ad", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("419ce4e4", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("20171d2e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("03fa63e6", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("abaddb70", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("0596ad56", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("02369f85", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("755fde00", content, false, {});
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
/* harmony import */ var _plugins_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/plugins */ "./webpack-app/plugins/plugins.js");
/* harmony import */ var _styles_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/styles */ "./webpack-app/styles/styles.js");
/* harmony import */ var _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/i18n */ "./webpack-app/plugins/i18n.js");
/* harmony import */ var _helpers_AxiosHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/AxiosHelper */ "./webpack-app/helpers/AxiosHelper.js");
/* harmony import */ var _helpers_DayJSHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/DayJSHelper */ "./webpack-app/helpers/DayJSHelper.js");
/* harmony import */ var _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/StringHelper */ "./webpack-app/helpers/StringHelper.js");
/* harmony import */ var _helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/ValidateHelper */ "./webpack-app/helpers/ValidateHelper.js");
/* harmony import */ var _helpers_AnnotationHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/AnnotationHelper */ "./webpack-app/helpers/AnnotationHelper.js");
/* harmony import */ var _helpers_VueHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/VueHelper */ "./webpack-app/helpers/VueHelper.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _client_client_tpl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./client/client.tpl */ "./webpack-app/client/client.tpl");
/* harmony import */ var _client_client_tpl__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_client_client_tpl__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./config.js */ "./webpack-app/config.js");
/* harmony import */ var _client_global_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./client/global-components */ "./webpack-app/client/global-components.js");
/* harmony import */ var _client_local_global_dynamic_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./client/local-global-dynamic-components */ "./webpack-app/client/local-global-dynamic-components.js");
/* harmony import */ var _client_local_global_static_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./client/local-global-static-components */ "./webpack-app/client/local-global-static-components.js");
/* harmony import */ var _client_local_components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./client/local-components */ "./webpack-app/client/local-components.js");
/* global __webpack_public_path__ */



// ----------------------------------
// plugins





// ----------------------------------
// Helpers




//import StyleHelper from './helpers/StyleHelper'



// ----------------------





// --------------------
// Components or routes






// -----------------------
// 確認 baseURL

let baseURL = __webpack_require__.p
baseURL = baseURL.split('/').slice(0, 3).join('/')
_config_js__WEBPACK_IMPORTED_MODULE_12__["default"].baseURL = baseURL

let baseScript = jquery__WEBPACK_IMPORTED_MODULE_10___default()(document.currentScript)
if (baseScript.length === 1) {
  
  //console.log(baseScript[0].src)
  let testBaseURL = 'http://127.0.0.1:4000/'
  if (baseScript[0].src.startsWith(testBaseURL)) {
    _config_js__WEBPACK_IMPORTED_MODULE_12__["default"].baseURL = testBaseURL
  }
  
  baseScript.before(`<div id="app"></div>`)
}

// ---------------
// 錯誤訊息的設置

window.onerror = function(message, source, lineno, colno, error) {
  //window.onerror = function(...args) {
  //console.log(error.stack)
  //console.log(message, source, lineno, colno, error)
  if (error === null) {
    error = message
  }
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
    config: _config_js__WEBPACK_IMPORTED_MODULE_12__["default"],
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
        peerID: null
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
      AxiosHelper: _helpers_AxiosHelper__WEBPACK_IMPORTED_MODULE_4__["default"].setBaseURL(baseURL),
      DayJSHelper: _helpers_DayJSHelper__WEBPACK_IMPORTED_MODULE_5__["default"],
      StringHelper: _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_6__["default"],
      ValidateHelper: _helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_7__["default"],
      //style: StyleHelper.setConfig(config),
      AnnotationHelper: _helpers_AnnotationHelper__WEBPACK_IMPORTED_MODULE_8__["default"],
      VueHelper: _helpers_VueHelper__WEBPACK_IMPORTED_MODULE_9__["default"],
      
      auth: null,
      RangyManager: null,
      AnnotationPanel: null,
      UserFilter: null,
      AnnotationTypeFilter: null,
      SectionManager: null,
      ConfirmModal: null,
      NotificationManager: null,
      TestManager: null,
    },
    errors: [],
    persistAttrs: [
    ]
  },
  computed: {
  },
  watch: {
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    },
  },
  //created: function () {
  //},
  mounted: function () {
    this.lib.AxiosHelper.setErrorHandler((error) => {
      //console.log(error)
      if (error.response.data.error.message === 'Please login') {
        return null
      }
      this.errors.push(error)
    })
    
    this.lib.DayJSHelper.setI18N((name, data) => {
      return this.$t(name, data)
    })
    
    this.lib.auth = this.$refs.auth
    this.lib.style = this.$refs.style
    this.lib.AnnotationHelper.setStatus(this.status)
    this.lib.ConfirmModal = this.$refs.ConfirmModal
    this.lib.TestManager = this.$refs.TestManager
    //console.log(this.lib.auth.nextStep)
  },
  
  methods: {
  }, // methods: {
  
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__["default"],
  
  template: _client_client_tpl__WEBPACK_IMPORTED_MODULE_11___default.a,
  components: _client_local_components__WEBPACK_IMPORTED_MODULE_16__["default"]
}

if (typeof(baseURL) === 'string') {
  jquery__WEBPACK_IMPORTED_MODULE_10___default()(() => {
    new vue__WEBPACK_IMPORTED_MODULE_0__["default"](VueController)
    jquery__WEBPACK_IMPORTED_MODULE_10___default()('body > #TestMessage').remove()
  })
}

window.VueController = VueController


/***/ }),

/***/ "./webpack-app/client/Auth/Auth.html?vue&type=template&id=60e46f07&":
/*!**************************************************************************!*\
  !*** ./webpack-app/client/Auth/Auth.html?vue&type=template&id=60e46f07& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_60e46f07___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Auth.html?vue&type=template&id=60e46f07& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Auth/Auth.html?vue&type=template&id=60e46f07&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_60e46f07___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_60e46f07___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Auth/Auth.js?vue&type=script&lang=js&?306c":
/*!******************************************************************!*\
  !*** ./webpack-app/client/Auth/Auth.js?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _watchAuth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watchAuth */ "./webpack-app/client/Auth/watchAuth.js");
/* harmony import */ var _methodsAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methodsAuth */ "./webpack-app/client/Auth/methodsAuth.js");
/* harmony import */ var _mountedAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mountedAuth */ "./webpack-app/client/Auth/mountedAuth.js");
/* harmony import */ var _computedAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computedAuth */ "./webpack-app/client/Auth/computedAuth.js");
let Auth = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {
    return {}
  },
  watch: {
  },
  computed: {
  },
  methods: {
  } // methods
}


Object(_watchAuth__WEBPACK_IMPORTED_MODULE_0__["default"])(Auth)


Object(_methodsAuth__WEBPACK_IMPORTED_MODULE_1__["default"])(Auth)


Object(_mountedAuth__WEBPACK_IMPORTED_MODULE_2__["default"])(Auth)


Object(_computedAuth__WEBPACK_IMPORTED_MODULE_3__["default"])(Auth)

/* harmony default export */ __webpack_exports__["default"] = (Auth);

/***/ }),

/***/ "./webpack-app/client/Auth/Auth.js?vue&type=script&lang=js&?4916":
/*!******************************************************************!*\
  !*** ./webpack-app/client/Auth/Auth.js?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Auth.js?vue&type=script&lang=js& */ "./webpack-app/client/Auth/Auth.js?vue&type=script&lang=js&?306c");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Auth/Auth.vue":
/*!******************************************!*\
  !*** ./webpack-app/client/Auth/Auth.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_html_vue_type_template_id_60e46f07___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auth.html?vue&type=template&id=60e46f07& */ "./webpack-app/client/Auth/Auth.html?vue&type=template&id=60e46f07&");
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth.js?vue&type=script&lang=js& */ "./webpack-app/client/Auth/Auth.js?vue&type=script&lang=js&?4916");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Auth_html_vue_type_template_id_60e46f07___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Auth_html_vue_type_template_id_60e46f07___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Auth/Auth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/Auth/computedAuth.js":
/*!*************************************************!*\
  !*** ./webpack-app/client/Auth/computedAuth.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (Auth) {
    
  Auth.computed.currentStep = function () {
    if (this.isAdmin) {
      return 'FreeReading'
    }
    
    //console.log(JSON.stringify(this.status.readingProgresses, null, ' '))
    if (Array.isArray(this.status.readingProgresses)
            && this.status.readingProgresses.length > 0) {
      for (let i = 0; i < this.status.readingProgresses.length; i++) {
        let s = this.status.readingProgresses[i]
        if (s.isCompleted === true) {
          continue
        }

        if (typeof (s.start_timestamp) !== 'number') {
          s.start_timestamp = this.lib.DayJSHelper.time()
          return s.step_name
        }
        if (typeof (s.start_timestamp) === 'number'
                && typeof (s.end_timestamp) !== 'number') {
          return s.step_name
        }
      }
      let finishStep = this.status.readingConfig.readingProgressesFinish
      if (this.lib.ValidateHelper.isURL(finishStep)) {
        this._redirect(finishStep)
        return false
      }
      return finishStep
    }
    return 'not-yet-started'
  } // Auth.computed.currentStep = function () {
  
  Auth.computed.currentStepConfig = function () {
    if (typeof (this.currentStep) === 'string') {

      let config = this.status.readingConfig
      if (typeof (config) === 'object') {
        return config.readingProgressModules[this.currentStep]
      }
    }
    //console.log(modules)
    return null
  } // Auth.computed.currentStepConfig = function () {
    
  Auth.computed.currentStepAnnotationConfig = function () {
    let config = this.currentStepConfig
    if (config) {
      return config.annotation
    }
    return null
  } // Auth.computed.currentStepAnnotationConfig = function () {
  Auth.computed.enableCollaboration = function () {
    let config = this.currentStepAnnotationConfig
    if (config) {
      return config.enableCollaboration
    }
    return false
  } // Auth.computed.enableCollaboration = function () {
  
  Auth.computed.isEnableCollaboration = function () {
    return this.enableCollaboration
  } // Auth.computed.isEnableCollaboration = function () {
  
  Auth.computed.username = function () {
    if (this.status.displayName !== this.status.username) {
      return this.status.displayName
    } else {
      return this.status.username
    }
  }
  
  Auth.computed.defaultPremission = function () {
    return this.currentStepAnnotationConfig.defaultPermission
  }
  
  Auth.computed.isAdmin = function () {
    let role = this.status.role
    
    return (role === 'domain_admin'
            || role === 'global_admin')
  }
  
//  Auth.computed.username = function () {
//    return this.getUsername(this.status)
//  }
  
  Auth.computed.annotationUserData = function () {
    return {
      display_name: this.status.displayName,
      username: this.status.username,
      id: this.status.userID,
      avatar_url: this.status.avatar,
      role: this.status.role
    }
  } // Auth.computed.annotationUserData = function () {
  
});

/***/ }),

/***/ "./webpack-app/client/Auth/methodsAuth.js":
/*!************************************************!*\
  !*** ./webpack-app/client/Auth/methodsAuth.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (Auth) {
  Auth.methods.loadUsernameFromURL = async function () {
    let result = await this.lib.AxiosHelper.getOther(this.config.usernameQueryURL)
    if (typeof (result) === 'string') {
      return result
    }
  }
  Auth.methods.attemptLoginViaUsername = async function (username) {
    var result = await this.lib.AxiosHelper.get(`/client/user/attempt-login-via-username`, {
      username: username
    })
    if (typeof (result) === 'string') {
      this.status.username = result
      return true
    } else {
      return false
    }
  }
  Auth.methods.checkLogin = async function () {
    var result = await this.lib.AxiosHelper.get(`/client/auth/checkLogin`)
    //console.log(result.preferenceAAA)
//      if (typeof(result) === 'object') {
//        for (let name in result) {
//          this.status[name] = result[name]
//        }
//        this.status.needLogin = false
//      }
//      else {
//        this.showLogin()
//      }
    //console.log(result)
    for (let name in result.status) {
//console.log(name)
      this.status[name] = result.status[name]
    }

    if (result.needLogin === false) {
      this.status.needLogin = false
    } else {
      this.showLogin()
    }
//this.status.username = result
  }
//  Auth.methods.getCurrentStep = function () {
//    //console.log(JSON.stringify(this.status.readingProgresses, null, ' '))
//    if (Array.isArray(this.status.readingProgresses)
//            && this.status.readingProgresses.length > 0) {
//      for (let i = 0; i < this.status.readingProgresses.length; i++) {
//        let s = this.status.readingProgresses[i]
//        if (s.isCompleted === true) {
//          continue
//        }
//
//        if (typeof (s.start_timestamp) !== 'number') {
//          s.start_timestamp = this.lib.DayJSHelper.time()
//          return s.step_name
//        }
//        if (typeof (s.start_timestamp) === 'number'
//                && typeof (s.end_timestamp) !== 'number') {
//          return s.step_name
//        }
//      }
//      let finishStep = this.status.readingConfig.readingProgressesFinish
//      if (this.lib.ValidateHelper.isURL(finishStep)) {
//        this._redirect(finishStep)
//        return false
//      }
//      return finishStep
//    }
//    return 'not-yet-started'
//  }

  Auth.methods._redirect = async function (url) {
//await this.lib.AxiosHelper.get('/client/auth/logout')
//return
    location.href = url
  }
  Auth.methods.logout = async function () {
    await this.lib.AxiosHelper.get('/client/auth/logout')
    localStorage.removeItem('PACOR.client.components.Login.login.username')
    return this.showLogin()
  }
  Auth.methods.showLogin = function () {
    this.status.needLogin = true
    this.status.view = 'Login'
  }
  Auth.methods.nextStep = async function (sendEnd) {
    //throw 'nextStep'
    if (sendEnd !== false) {
      await this.lib.AxiosHelper.get('/client/ReadingProgress/end')
    }

    let time = this.lib.DayJSHelper.time()
    for (let i = 0; i < this.status.readingProgresses.length; i++) {
      let s = this.status.readingProgresses[i]
      if (s.isCompleted === true) {
        continue
      }

      if (typeof (s.start_timestamp) === 'number'
              && typeof (s.end_timestamp) !== 'number') {
        this.status.readingProgresses[i].end_timestamp = time
        break
      }
    }
    
    this.status.readingProgresses = this.status.readingProgresses.slice(0, this.status.readingProgresses.length)
    
    //this.$forceUpdate()

    //setTimeout(() => {
      //console.log([this.currentStep, this.getCurrentStep()])
      //console.log(this.status.readingProgresses)
      this.status.view = this.currentStep
    //}, 0)
    
  }
  Auth.methodsgetHighlightAnnotationType = function (annotation) {
    let type = annotation.type
    if (annotation.user_id === this.status.userID) {
      type = 'my-' + type
    } else {
      type = 'others-' + type
    }
    return type
  }
  Auth.methods.isEditable = function (instance) {
    if (!instance || typeof (instance.id) !== 'number') {
      return true
    }

    if (['domain_admin', 'global_admin'].indexOf(this.status.role) > -1) {
      return true
    }

    return (instance.user_id === this.status.userID)
  }
  
  Auth.methods.getUsername = function (user) {
    if (user.displayName) {
      return user.displayName
    }
    else if (user.display_name) {
      return user.display_name
    }
    else {
      return user.username
    }
  }
  
  Auth.methods.getRemainingSeconds = function () {
    if (!this.status 
            || Array.isArray(this.status.readingProgresses) === false) {
      return 0
    }
    
    let start_timestamp
    for (let i = 0; i < this.status.readingProgresses.length; i++) {
      let s = this.status.readingProgresses[i]
      if (s.step_name === 'IndividualReading') {
        start_timestamp = s.start_timestamp
        break
      }
    }
    
    if (!start_timestamp) {
      return 0
    }
    
    let config = this.status.readingConfig
    let limit_minutes
    if (this.currentStep === 'IndividualReading') {
      limit_minutes = config.readingProgressModules.IndividualReading.limitMinutes
    }
    else if (this.currentStep === 'CollaborativeReading') {
      limit_minutes = config.readingProgressModules.reading.totalLimitMinutes
    }
    
    if (!limit_minutes) {
      return 0
    }
    
    let limit_ms = limit_minutes * 60 * 1000
    let remaining_ms = limit_ms - ( (new Date()).getTime() -  start_timestamp)
    if (remaining_ms < 0) {
      return 0
    }
    return Math.ceil(remaining_ms / 1000)
  }
});

/***/ }),

/***/ "./webpack-app/client/Auth/mountedAuth.js":
/*!************************************************!*\
  !*** ./webpack-app/client/Auth/mountedAuth.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (Auth) {
  Auth.mounted = async function () {
    if (typeof (this.config.username) !== 'string'
            && typeof (this.config.usernameQueryURL) === 'string') {
      this.config.username = await this.loadUsernameFromURL()
    }

    let result = false
    if (typeof (this.config.username) === 'string') {
      result = await this.attemptLoginViaUsername(this.config.username)
    }

    if (result === false) {
      await this.checkLogin()
    }
  }
});

/***/ }),

/***/ "./webpack-app/client/Auth/watchAuth.js":
/*!**********************************************!*\
  !*** ./webpack-app/client/Auth/watchAuth.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (Auth) {
  Auth.watch['status.needLogin'] = async function () {
    if (this.status.needLogin === false) {
      let view = this.currentStep
      if (this.lib.ValidateHelper.isURL(view)) {
        return await this._redirect(view)
      }
      //console.log(view)
      this.status.view = view
    }
  }
});

/***/ }),

/***/ "./webpack-app/client/Login/Login.html?vue&type=template&id=15c3505b&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./webpack-app/client/Login/Login.html?vue&type=template&id=15c3505b&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_15c3505b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Login.html?vue&type=template&id=15c3505b&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/Login/Login.html?vue&type=template&id=15c3505b&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_15c3505b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Login_html_vue_type_template_id_15c3505b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/Login/Login.js?vue&type=script&lang=js&?0c8b":
/*!********************************************************************!*\
  !*** ./webpack-app/client/Login/Login.js?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_media__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-media */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\vue-media\\dist\\vue-media.common.js");
/* harmony import */ var vue_media__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_media__WEBPACK_IMPORTED_MODULE_0__);


let Login = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      //username: '',
      username: '布丁',  // for test
      password: '',
      waiting: false,
      adminMode: false,
      key: 'PACOR.client.components.Login.',
      compactWidth: 480,
      isCompactMode: false
    }
  },
  computed: {
    isDisableLogin: function () {
      if (this.waiting === true) {
        return true
      }
      
      if (this.adminMode === false) {
        return (!this.isUsernameValid)
      }
      else {
        //console.log(this.isUsernameValid, this.password)
        return (!this.isUsernameValid || this.password === '')
      }
      
      return true
    },
    isUsernameValid () {
      return (this.username !== '' 
        && this.username.indexOf(' ') === -1)
    },
    agreementLink: function () {
      return this.config.baseURL + '/client/webpage/agreement'
    },
    computedFormClassList () {
      if (this.isCompactMode === false) {
        return 'ten wide column'
      }
      else {
        return 'sixteen wide column'
      }
    }
  },
  components: {
    'media': vue_media__WEBPACK_IMPORTED_MODULE_0___default.a,
  },
//  watch: {
//  },
  mounted() {
    //console.log('掛載！')
    this.$refs.LoginModal.show()
    this._loadFromLocalStorage()
  },
  methods: {
    _loadFromLocalStorage () {
      let username = localStorage.getItem(this.key + 'login.username')
      if (typeof(username) === 'string') {
        this.username = username
      }
      
      let password = localStorage.getItem(this.key + 'login.password')
      if (typeof(password) === 'string') {
        this.password = password
        this.adminMode = true
      }
    },
    login: async function() {
      this.waiting = true
      let data = {
        username: this.username,
      }
      
      if (this.adminMode) {
        data.password = this.password
      }
      
      let result
      result = await this.lib.AxiosHelper.get(`/client/Auth/login`, data, (e) => {
        window.alert(this.$t('Login failed.'))
      })
      
      //console.log(result)
      
      if (typeof(result) !== 'object') {
        this.waiting = false
        return false
      }
      
      for (let name in result) {
        this.status[name] = result[name]
      }
      this.status.username = this.username
      
      localStorage.setItem(this.key + 'login.username', this.username)
      localStorage.setItem(this.key + 'login.password', this.password)
      
      this.reset()
      this.$refs.LoginModal.hide()
      
      this.status.needLogin = false
      this.waiting = false
      //alert('成功登入了，然後呢？')
    },
    reset: function () {
      this.username = ''
      this.password = ''
    },
    createMockupUsername () {
      this.username = '布丁' + (new Date()).getTime()
      this.password = ''
      this.adminMode = false
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ "./webpack-app/client/Login/Login.js?vue&type=script&lang=js&?b8f6":
/*!********************************************************************!*\
  !*** ./webpack-app/client/Login/Login.js?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Login.js?vue&type=script&lang=js& */ "./webpack-app/client/Login/Login.js?vue&type=script&lang=js&?0c8b");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLogin%5CLogin.vue":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLogin%5CLogin.vue ***!
  \******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLogin%5CLogin.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLogin%5CLogin.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_15c3505b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_15c3505b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_15c3505b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_15c3505b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_15c3505b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_Login_less_vue_type_style_index_0_id_15c3505b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/Login/Login.vue":
/*!********************************************!*\
  !*** ./webpack-app/client/Login/Login.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_html_vue_type_template_id_15c3505b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.html?vue&type=template&id=15c3505b&scoped=true& */ "./webpack-app/client/Login/Login.html?vue&type=template&id=15c3505b&scoped=true&");
/* harmony import */ var _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.js?vue&type=script&lang=js& */ "./webpack-app/client/Login/Login.js?vue&type=script&lang=js&?b8f6");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_less_vue_type_style_index_0_id_15c3505b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true& */ "./webpack-app/client/Login/Login.less?vue&type=style&index=0&id=15c3505b&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLogin%5CLogin.vue */ "./webpack-app/client/Login/Login.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CLogin%5CLogin.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_html_vue_type_template_id_15c3505b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_html_vue_type_template_id_15c3505b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "15c3505b",
  null
  
)

/* custom blocks */

if (typeof _Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_Login_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CLogin_5CLogin_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/Login/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/EventComponents.js":
/*!****************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/EventComponents.js ***!
  \****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationEvent_EventAnnotationComment_EventAnnotationComment_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationEvent/EventAnnotationComment/EventAnnotationComment.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.vue");
/* harmony import */ var _NotificationEvent_EventAnnotationCommentRate_EventAnnotationCommentRate_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.vue");
/* harmony import */ var _NotificationEvent_EventAnnotationRate_EventAnnotationRate_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationEvent/EventAnnotationRate/EventAnnotationRate.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.vue");
/* harmony import */ var _NotificationEvent_EventReadingProgress_EventReadingProgress_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NotificationEvent/EventReadingProgress/EventReadingProgress.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.vue");





/* harmony default export */ __webpack_exports__["default"] = ((VM) => {
  VM.components.EventAnnotationComment = _NotificationEvent_EventAnnotationComment_EventAnnotationComment_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  VM.components.EventAnnotationCommentRate = _NotificationEvent_EventAnnotationCommentRate_EventAnnotationCommentRate_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  VM.components.EventAnnotationRate = _NotificationEvent_EventAnnotationRate_EventAnnotationRate_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  VM.components.EventReadingProgress = _NotificationEvent_EventReadingProgress_EventReadingProgress_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/EventMethods.js":
/*!*************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/EventMethods.js ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((VM) => {
  VM.methods.eventType = function (notification) {
    //return 'NotificationEvent'  // for test

    return 'Event' + notification.trigger_model
  }

  VM.methods.onRead = async function (notification) {
    let data = {
      id: notification.id
    }

    let result = await this.lib.AxiosHelper.get('/client/UserNotification/read', data)
    //console.log(result)
    if (result !== 1) {
      throw new Error(this.$t('Set notification read error'))
    }

    if (notification.has_read === false) {
      notification.has_read = true
      this.notificationData.unreadCount--
    }
    
    this.afterOnRead(notification)
  }
});

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.js?vue&type=script&lang=js&?556a":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventAnnotationComment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./EventAnnotationComment.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.js?vue&type=script&lang=js&?a4c6");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_EventAnnotationComment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.js?vue&type=script&lang=js&?a4c6":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _propsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propsNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/propsNotificationEvent.js");
/* harmony import */ var _computedNotificationEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../computedNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/computedNotificationEvent.js");
/* harmony import */ var _methodsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../methodsNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/methodsNotificationEvent.js");




let EventAnnotationComment = {
  props: _propsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function () {
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    ..._computedNotificationEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  methods: {
    ..._methodsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
}

EventAnnotationComment.computed.action = function () {
  // @TODO 現在還沒有回覆指定標註的功能
  return this.$t('Reply your annotation')
}

EventAnnotationComment.computed.summary = function () {
  if (!this.notification.summary) {
    return
  }
  let summary = this.notification.summary.summary
  
  //console.log(summary)
  if (summary.length > 0) {
    summary = summary.slice(0, 20) + this.$t('...')
  }
  return this.$t('"{0}"', [this.notification.summary.summary])
}


EventAnnotationComment.methods.read = function () {
  this.lib.AnnotationPanel.focusComment(this.notification.id)
  //console.log(this.notification)
  //throw new Error('EventAnnotationComment ' + this.notification)
  this.$emit('read')
}

/* harmony default export */ __webpack_exports__["default"] = (EventAnnotationComment);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.vue":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.vue ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationEvent_html_vue_type_template_id_142d96e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../NotificationEvent.html?vue&type=template&id=142d96e4&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=142d96e4&scoped=true&");
/* harmony import */ var _EventAnnotationComment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventAnnotationComment.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.js?vue&type=script&lang=js&?556a");
/* empty/unused harmony star reexport *//* harmony import */ var _NotificationEvent_less_vue_type_style_index_0_id_142d96e4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationComment%5CEventAnnotationComment.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationComment%5CEventAnnotationComment.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EventAnnotationComment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationEvent_html_vue_type_template_id_142d96e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationEvent_html_vue_type_template_id_142d96e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "142d96e4",
  null
  
)

/* custom blocks */

if (typeof _NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationComment/EventAnnotationComment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.js?vue&type=script&lang=js&?16f9":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _propsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propsNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/propsNotificationEvent.js");
/* harmony import */ var _computedNotificationEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../computedNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/computedNotificationEvent.js");
/* harmony import */ var _methodsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../methodsNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/methodsNotificationEvent.js");




let EventAnnotationCommentRate = {
  props: _propsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function () {
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    ..._computedNotificationEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  methods: {
    ..._methodsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
}

EventAnnotationCommentRate.computed.action = function () {
  //return this.$t('Like your comment: "{0}"', [this.notification.summary.summary])
  return this.$t('Like your comment')
}

EventAnnotationCommentRate.computed.summary = function () {
  if (!this.notification.summary) {
    return
  }
  let summary = this.notification.summary.summary
  return this.$t('"{0}"', [this.notification.summary.summary])
}

EventAnnotationCommentRate.methods.read = function () {
  this.lib.AnnotationPanel.focusComment(this.notification.anchor_model_id)
  this.$emit('read')
}

/* harmony default export */ __webpack_exports__["default"] = (EventAnnotationCommentRate);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.js?vue&type=script&lang=js&?1e6b":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventAnnotationCommentRate_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./EventAnnotationCommentRate.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.js?vue&type=script&lang=js&?16f9");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_EventAnnotationCommentRate_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.vue":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.vue ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationEvent_html_vue_type_template_id_ec165538_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../NotificationEvent.html?vue&type=template&id=ec165538&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=ec165538&scoped=true&");
/* harmony import */ var _EventAnnotationCommentRate_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventAnnotationCommentRate.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.js?vue&type=script&lang=js&?1e6b");
/* empty/unused harmony star reexport *//* harmony import */ var _NotificationEvent_less_vue_type_style_index_0_id_ec165538_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationCommentRate%5CEventAnnotationCommentRate.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationCommentRate%5CEventAnnotationCommentRate.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EventAnnotationCommentRate_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationEvent_html_vue_type_template_id_ec165538_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationEvent_html_vue_type_template_id_ec165538_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ec165538",
  null
  
)

/* custom blocks */

if (typeof _NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationCommentRate/EventAnnotationCommentRate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.js?vue&type=script&lang=js&?0915":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventAnnotationRate_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./EventAnnotationRate.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.js?vue&type=script&lang=js&?b3c5");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_EventAnnotationRate_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.js?vue&type=script&lang=js&?b3c5":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _propsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propsNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/propsNotificationEvent.js");
/* harmony import */ var _computedNotificationEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../computedNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/computedNotificationEvent.js");
/* harmony import */ var _methodsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../methodsNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/methodsNotificationEvent.js");




let EventAnnotationRate = {
  props: _propsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function () {
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    ..._computedNotificationEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  methods: {
    ..._methodsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
}

EventAnnotationRate.computed.action = function () {
  //return this.$t('Like your annotation: "{0}"', [this.notification.summary.summary])
  return this.$t('Like your annotation')
}

EventAnnotationRate.computed.summary = function () {
  if (!this.notification.summary) {
    return
  }
  let summary = this.notification.summary.summary
  return this.$t('"{0}"', [this.notification.summary.summary])
}

EventAnnotationRate.methods.read = function () {
  this.lib.AnnotationPanel.focusAnnotation(this.notification.anchor_model_id)
  this.$emit('read')
}

/* harmony default export */ __webpack_exports__["default"] = (EventAnnotationRate);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.vue":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.vue ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationEvent_html_vue_type_template_id_63ec2610_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../NotificationEvent.html?vue&type=template&id=63ec2610&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=63ec2610&scoped=true&");
/* harmony import */ var _EventAnnotationRate_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventAnnotationRate.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.js?vue&type=script&lang=js&?0915");
/* empty/unused harmony star reexport *//* harmony import */ var _NotificationEvent_less_vue_type_style_index_0_id_63ec2610_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationRate%5CEventAnnotationRate.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationRate%5CEventAnnotationRate.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EventAnnotationRate_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationEvent_html_vue_type_template_id_63ec2610_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationEvent_html_vue_type_template_id_63ec2610_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "63ec2610",
  null
  
)

/* custom blocks */

if (typeof _NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventAnnotationRate/EventAnnotationRate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.js?vue&type=script&lang=js&?302d":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _propsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../propsNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/propsNotificationEvent.js");
/* harmony import */ var _computedNotificationEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../computedNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/computedNotificationEvent.js");
/* harmony import */ var _methodsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../methodsNotificationEvent.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/methodsNotificationEvent.js");




let EventAnnotationRate = {
  props: _propsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  data: function () {
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    ..._computedNotificationEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  methods: {
    ..._methodsNotificationEvent_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
}

EventAnnotationRate.computed.action = function () {
  return this.$t('can be assisted now')
}

EventAnnotationRate.methods.read = function () {
  
  console.log(this.notification.triggerUser)
  this.lib.UserFilter.selectUser(this.notification.triggerUser.id)
  
  this.$emit('read')
}

/* harmony default export */ __webpack_exports__["default"] = (EventAnnotationRate);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.js?vue&type=script&lang=js&?7d9e":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventReadingProgress_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./EventReadingProgress.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.js?vue&type=script&lang=js&?302d");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_EventReadingProgress_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.vue":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.vue ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationEvent_html_vue_type_template_id_d390b978_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../NotificationEvent.html?vue&type=template&id=d390b978&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=d390b978&scoped=true&");
/* harmony import */ var _EventReadingProgress_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventReadingProgress.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.js?vue&type=script&lang=js&?7d9e");
/* empty/unused harmony star reexport *//* harmony import */ var _NotificationEvent_less_vue_type_style_index_0_id_d390b978_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventReadingProgress%5CEventReadingProgress.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventReadingProgress%5CEventReadingProgress.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EventReadingProgress_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationEvent_html_vue_type_template_id_d390b978_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationEvent_html_vue_type_template_id_d390b978_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d390b978",
  null
  
)

/* custom blocks */

if (typeof _NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/EventReadingProgress/EventReadingProgress.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=142d96e4&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=142d96e4&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_142d96e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NotificationEvent.html?vue&type=template&id=142d96e4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=142d96e4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_142d96e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_142d96e4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=63ec2610&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=63ec2610&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_63ec2610_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NotificationEvent.html?vue&type=template&id=63ec2610&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=63ec2610&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_63ec2610_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_63ec2610_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=d390b978&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=d390b978&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_d390b978_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NotificationEvent.html?vue&type=template&id=d390b978&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=d390b978&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_d390b978_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_d390b978_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=ec165538&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=ec165538&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_ec165538_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NotificationEvent.html?vue&type=template&id=ec165538&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.html?vue&type=template&id=ec165538&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_ec165538_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationEvent_html_vue_type_template_id_ec165538_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_142d96e4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=142d96e4&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_142d96e4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_142d96e4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_142d96e4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_142d96e4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_142d96e4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_63ec2610_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=63ec2610&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_63ec2610_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_63ec2610_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_63ec2610_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_63ec2610_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_63ec2610_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_d390b978_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=d390b978&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_d390b978_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_d390b978_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_d390b978_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_d390b978_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_d390b978_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_ec165538_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.less?vue&type=style&index=0&id=ec165538&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_ec165538_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_ec165538_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_ec165538_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_ec165538_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationEvent_less_vue_type_style_index_0_id_ec165538_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationComment%5CEventAnnotationComment.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationComment%5CEventAnnotationComment.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationComment%5CEventAnnotationComment.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationComment%5CEventAnnotationComment.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationComment_5CEventAnnotationComment_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationCommentRate%5CEventAnnotationCommentRate.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationCommentRate%5CEventAnnotationCommentRate.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationCommentRate%5CEventAnnotationCommentRate.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationCommentRate%5CEventAnnotationCommentRate.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationCommentRate_5CEventAnnotationCommentRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationRate%5CEventAnnotationRate.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationRate%5CEventAnnotationRate.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationRate%5CEventAnnotationRate.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventAnnotationRate%5CEventAnnotationRate.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventAnnotationRate_5CEventAnnotationRate_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventReadingProgress%5CEventReadingProgress.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventReadingProgress%5CEventReadingProgress.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventReadingProgress%5CEventReadingProgress.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/NotificationEvent.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationEvent%5CEventReadingProgress%5CEventReadingProgress.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationEvent_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationEvent_5CEventReadingProgress_5CEventReadingProgress_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/computedNotificationEvent.js":
/*!********************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/computedNotificationEvent.js ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  username() {
    let user = this.notification.triggerUser
    if (typeof (user.displayName) === 'string') {
      return user.displayName
    } else {
      return user.username
    }
  },
  action() {

  },
  avatar() {
    return this.notification.triggerUser.avatar_url
  },
  displayTime() {
    return this.lib.DayJSHelper.fromNow(this.notification.created_at_unixms)
  },
  summary() {
    return
  },
  computedEventClassList () {
    let classList = []
    if (this.notification.has_read === true) {
      //console.log(this.notification)
      classList.push('has-read')
    }
    //classList.push('has-read')
    //console.log(classList)
    return classList.join(' ')
  }
});

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/methodsNotificationEvent.js":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/methodsNotificationEvent.js ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  read() {
    throw new Error('read' + this.notification)
  }
}); // methods

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/propsNotificationEvent.js":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationEvent/propsNotificationEvent.js ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (['lib', 'status', 'config', 'notification']);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.html?vue&type=template&id=23ad6084&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.html?vue&type=template&id=23ad6084&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationFeed_html_vue_type_template_id_23ad6084_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NotificationFeed.html?vue&type=template&id=23ad6084&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.html?vue&type=template&id=23ad6084&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationFeed_html_vue_type_template_id_23ad6084_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationFeed_html_vue_type_template_id_23ad6084_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.js?vue&type=script&lang=js&?66ef":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventComponents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../EventComponents.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/EventComponents.js");
/* harmony import */ var _EventMethods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../EventMethods.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/EventMethods.js");


let NotificationFeed = {
  props: ['lib', 'status', 'config'
    , 'notificationData'],
  data() {    
    //this.$i18n.locale = this.config.locale
    
    let noOlder = false
    //if (this.notificationData.unreadNotifications.length === 0) {
    //  noOlder = true
    //}
    
    return {
      noOlder: noOlder,
      loadLock: false,
      
      feed: null,
      basetime: null
    }
  },
  components: {
  },
//  computed: {
//    basetime () {
//      this.notificationData.notifications[0].created_at_unixms
//    }
//  },
  watch: {
    'notificationData.unreadNotifications' () {
      if (this.notificationData.unreadNotifications.length < 3) {
        return null
      }
      
      if (!this.basetime) {
        this.scrollToBottom()
      }
      
      this.noOlder = (this.notificationData.unreadNotifications.length === 0)
      
      if (Array.isArray(this.notificationData.unreadNotifications)
              && this.notificationData.unreadNotifications.length > 0) {
        this.basetime = parseInt(this.notificationData.unreadNotifications[0].created_at_unixms, 10)
      }
    }
  },
//  mounted() {
//  },
  methods: {
    onScrollList (event) {
      if (this.loadLock === true) {
        event.preventDefault()
        event.stopPropagation()
        //console.log('prevent default')
        return null
      }
      
      let element = event.target
      //console.log(element.scrollTop, this.noMoreOlder, this.noMoreNewer, this.loadLock)
      if (element.scrollTop === 0) {
        if (this.noOlder === true) {
          return false
        }
        //console.log('scrolled');
        this.loadOlderNotifications()
      }
    },
    scrollToBottom: async function () {
      if (this.notificationData.unreadNotifications.length < 3) {
        return null
      }
      
      await this.lib.VueHelper.sleep(100)
      //console.log('有捲動嗎？')
      if (!this.feed) {
        this.feed = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.feed)
      }
      
      let event = this.feed.children('.event:last')
      event[0].scrollIntoView()
    },
    loadOlderNotifications: async function () {
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      
      let focusComment = this.feed.children('.event:first')
      
      let data = {
        basetime: this.basetime
      }
      //console.log(this.notificationData.notifications)
      //console.log(data.basetime)
      //return
      
      let notifications = await this.lib.AxiosHelper.get('/client/UserNotification/unreadOlder', data)
      //console.log(notifications)
      if (notifications.length === 0) {
        this.noOlder = true
        this.loadLock = false
        return null
      }
      
      this.notificationData.unreadNotifications = notifications.concat(this.notificationData.unreadNotifications)
      
      
      await this.lib.VueHelper.sleep(100)
      focusComment[0].scrollIntoView()
      
      await this.lib.VueHelper.sleep(100)
      this.loadLock = false
    },
    afterOnRead (notification) {
      this.notificationData.unreadNotifications = this.notificationData.unreadNotifications.filter(n => {
        return (n !== notification)
      })
    } 
  } // methods
}


Object(_EventComponents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(NotificationFeed)


Object(_EventMethods_js__WEBPACK_IMPORTED_MODULE_2__["default"])(NotificationFeed)

/* harmony default export */ __webpack_exports__["default"] = (NotificationFeed);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.js?vue&type=script&lang=js&?ef92":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationFeed_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./NotificationFeed.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.js?vue&type=script&lang=js&?66ef");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_NotificationFeed_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationFeed_less_vue_type_style_index_0_id_23ad6084_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationFeed_less_vue_type_style_index_0_id_23ad6084_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationFeed_less_vue_type_style_index_0_id_23ad6084_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationFeed_less_vue_type_style_index_0_id_23ad6084_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationFeed_less_vue_type_style_index_0_id_23ad6084_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationFeed_less_vue_type_style_index_0_id_23ad6084_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.vue":
/*!***********************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.vue ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationFeed_html_vue_type_template_id_23ad6084_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationFeed.html?vue&type=template&id=23ad6084&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.html?vue&type=template&id=23ad6084&scoped=true&");
/* harmony import */ var _NotificationFeed_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationFeed.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.js?vue&type=script&lang=js&?ef92");
/* empty/unused harmony star reexport *//* harmony import */ var _NotificationFeed_less_vue_type_style_index_0_id_23ad6084_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.less?vue&type=style&index=0&id=23ad6084&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NotificationFeed.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationFeed%5CNotificationFeed.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationFeed%5CNotificationFeed.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NotificationFeed_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationFeed_html_vue_type_template_id_23ad6084_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationFeed_html_vue_type_template_id_23ad6084_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "23ad6084",
  null
  
)

/* custom blocks */

if (typeof _NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationFeed%5CNotificationFeed.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationFeed%5CNotificationFeed.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NotificationFeed.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationFeed%5CNotificationFeed.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationFeed%5CNotificationFeed.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationFeed_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationFeed_5CNotificationFeed_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.html?vue&type=template&id=3f6b6eff&scoped=true&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.html?vue&type=template&id=3f6b6eff&scoped=true& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationIcon_html_vue_type_template_id_3f6b6eff_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NotificationIcon.html?vue&type=template&id=3f6b6eff&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.html?vue&type=template&id=3f6b6eff&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationIcon_html_vue_type_template_id_3f6b6eff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationIcon_html_vue_type_template_id_3f6b6eff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.js?vue&type=script&lang=js&?57a5":
/*!******************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NotificationFeed_NotificationFeed_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationFeed/NotificationFeed.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationFeed/NotificationFeed.vue");



let NotificationIcon = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    "notification-feed": _NotificationFeed_NotificationFeed_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  },
  computed: {
    notificationData () {
      return this.status.notificationData
    },
//    unreadCount () {
//      return this.notificationData.unreadCount
//    },
    computedBellClassList () {
      if (this.notificationData.unreadCount === 0) {
        return 'disabled'
      }
    }
  },
  methods: {
    initPopup () {
      let anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.anchor)
      
      anchor.popup({
          popup: this.$refs.popup,
          inline     : true,
          hoverable  : true,
          on    : 'click',
          distanceAway: 20,
          position: "top center",
          onShow: () => {
            if (this.notificationData.unreadNotifications.length === 0) {
              this.showFull()
              return false
            }
            this.lib.NotificationManager.stopReloadData()
          },
          onHidden: () => {
            this.lib.NotificationManager.startReloadData()
          }
      })
//      console.log('initPopup')
      anchor.click()
    },
    show () {
      this.$refs.anchor.click()
      //throw new Error('show')
    },
    showFull () {
      this.lib.NotificationManager.showFull()
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (NotificationIcon);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.js?vue&type=script&lang=js&?c0a1":
/*!******************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationIcon_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./NotificationIcon.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.js?vue&type=script&lang=js&?57a5");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_NotificationIcon_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationIcon_less_vue_type_style_index_0_id_3f6b6eff_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-style-loader!../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationIcon_less_vue_type_style_index_0_id_3f6b6eff_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationIcon_less_vue_type_style_index_0_id_3f6b6eff_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationIcon_less_vue_type_style_index_0_id_3f6b6eff_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationIcon_less_vue_type_style_index_0_id_3f6b6eff_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationIcon_less_vue_type_style_index_0_id_3f6b6eff_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue":
/*!******************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationIcon_html_vue_type_template_id_3f6b6eff_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationIcon.html?vue&type=template&id=3f6b6eff&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.html?vue&type=template&id=3f6b6eff&scoped=true&");
/* harmony import */ var _NotificationIcon_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationIcon.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.js?vue&type=script&lang=js&?c0a1");
/* empty/unused harmony star reexport *//* harmony import */ var _NotificationIcon_less_vue_type_style_index_0_id_3f6b6eff_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.less?vue&type=style&index=0&id=3f6b6eff&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NotificationIcon.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationIcon.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationIcon.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NotificationIcon_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationIcon_html_vue_type_template_id_3f6b6eff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationIcon_html_vue_type_template_id_3f6b6eff_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3f6b6eff",
  null
  
)

/* custom blocks */

if (typeof _NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationIcon.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationIcon.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NotificationIcon.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationIcon.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationIcon.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationIcon_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationIcon_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.html?vue&type=template&id=135dd4ea&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.html?vue&type=template&id=135dd4ea&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationModal_html_vue_type_template_id_135dd4ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NotificationModal.html?vue&type=template&id=135dd4ea&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.html?vue&type=template&id=135dd4ea&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationModal_html_vue_type_template_id_135dd4ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationModal_html_vue_type_template_id_135dd4ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.js?vue&type=script&lang=js&?63eb":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./NotificationModal.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.js?vue&type=script&lang=js&?66ff");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_NotificationModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.js?vue&type=script&lang=js&?66ff":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventComponents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../EventComponents.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/EventComponents.js");
/* harmony import */ var _EventMethods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../EventMethods.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/EventMethods.js");
let NotificationModal = {
  props: ['lib', 'status', 'config'
    , 'notificationData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      notifications: [],
      triggerUsers: [],
      
      noOlder: true,
      loadLock: false,
      
      feed: null,
      basetime: null
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
    show: async function () {
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/fullInit')
      
      if (result === 0) {
        throw new Error('No notification')
        return null
      }
      //console.log(result)
      for (let key in result) {
        //console.log(key)
        this[key] = result[key]
      }
      
      this.$refs.Modal.show()
    },
    hide () {
      this.$refs.Modal.hide()
    },
    
    onScrollList (event) {
      if (this.loadLock === true) {
        event.preventDefault()
        event.stopPropagation()
        //console.log('prevent default')
        return null
      }
      
      let element = event.target
      //console.log(element.scrollTop, this.noMoreOlder, this.noMoreNewer, this.loadLock)
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        if (this.noOlder === true) {
          return false
        }
        //console.log('scrolled');
        this.loadOlderNotifications()
      }
    },
    loadOlderNotifications: async function () {
      if (this.loadLock === true) {
        return null
      }
      this.loadLock = true
      
      let focusComment = this.feed.children('.event:first')
      
      let data = {
        basetime: this.basetime
      }
      //console.log(this.notificationData.notifications)
      //console.log(data.basetime)
      //return
      
      let notifications = await this.lib.AxiosHelper.get('/client/UserNotification/older', data)
      //console.log(notifications)
      if (notifications.length === 0) {
        this.noOlder = true
        this.loadLock = false
        return null
      }
      
      this.notifications = this.notifications.concat(notifications)
      
      //await this.lib.VueHelper.sleep(100)
      //focusComment[0].scrollIntoView()
      
      await this.lib.VueHelper.sleep(100)
      this.loadLock = false
    },
    afterOnRead () {
      if (typeof(this.hide) === 'function') {
        this.hide()
      }
    } 
  } // methods
}


Object(_EventComponents_js__WEBPACK_IMPORTED_MODULE_0__["default"])(NotificationModal)


Object(_EventMethods_js__WEBPACK_IMPORTED_MODULE_1__["default"])(NotificationModal)

/* harmony default export */ __webpack_exports__["default"] = (NotificationModal);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationModal_less_vue_type_style_index_0_id_135dd4ea_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationModal_less_vue_type_style_index_0_id_135dd4ea_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationModal_less_vue_type_style_index_0_id_135dd4ea_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationModal_less_vue_type_style_index_0_id_135dd4ea_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationModal_less_vue_type_style_index_0_id_135dd4ea_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NotificationModal_less_vue_type_style_index_0_id_135dd4ea_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.vue":
/*!*************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.vue ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationModal_html_vue_type_template_id_135dd4ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationModal.html?vue&type=template&id=135dd4ea&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.html?vue&type=template&id=135dd4ea&scoped=true&");
/* harmony import */ var _NotificationModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationModal.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.js?vue&type=script&lang=js&?63eb");
/* empty/unused harmony star reexport *//* harmony import */ var _NotificationModal_less_vue_type_style_index_0_id_135dd4ea_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.less?vue&type=style&index=0&id=135dd4ea&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NotificationModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationModal%5CNotificationModal.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationModal%5CNotificationModal.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NotificationModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationModal_html_vue_type_template_id_135dd4ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationModal_html_vue_type_template_id_135dd4ea_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "135dd4ea",
  null
  
)

/* custom blocks */

if (typeof _NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationModal%5CNotificationModal.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationModal%5CNotificationModal.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NotificationModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationModal%5CNotificationModal.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Cmanager%5CNotificationManager%5CNotificationIcon%5CNotificationModal%5CNotificationModal.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NotificationModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Cmanager_5CNotificationManager_5CNotificationIcon_5CNotificationModal_5CNotificationModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.html?vue&type=template&id=77c708f2&":
/*!************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.html?vue&type=template&id=77c708f2& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationManager_html_vue_type_template_id_77c708f2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NotificationManager.html?vue&type=template&id=77c708f2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.html?vue&type=template&id=77c708f2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationManager_html_vue_type_template_id_77c708f2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NotificationManager_html_vue_type_template_id_77c708f2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.js?vue&type=script&lang=js&?61b8":
/*!****************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./NotificationManager.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.js?vue&type=script&lang=js&?8ae4");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_NotificationManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.js?vue&type=script&lang=js&?8ae4":
/*!****************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationIcon_NotificationModal_NotificationModal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationIcon/NotificationModal/NotificationModal.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationModal/NotificationModal.vue");


let NotificationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
      afterTime: null,
      timer: null,
      reloadIntervalSeconds: 30,
      isLoading: false
    }
  },
  components: {
    "notification-modal": _NotificationIcon_NotificationModal_NotificationModal_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: {
    notificationData () {
      return this.status.notificationData
    },
//    unreadCount () {
//      return this.notificationData.unreadCount
//    },
    computedBellClassList () {
      if (this.notificationData.unreadCount === 0) {
        return 'disabled'
      }
    }
  },
//  watch: {
//  },
  mounted() {
    this.initNotificationData()
    
    //this.startReloadData()
  },
  destroyed () {
    this.stopReloadData()
  },
  methods: {
    initNotificationData: async function () {
      if (this.isLoading === true) {
        return null
      }
      this.isLoading = true
      
      let data = {
        afterTime: this.afterTime
      }
      //console.log(this.isLoading)
      let result = await this.lib.AxiosHelper.get('/client/UserNotification/init', data)
      
      this.afterTime = (new Date()).getTime()
      this.startReloadData()
      this.isLoading = false
      if (result === 0) {
        return null
      }
      
      for (let key in result) {
        this.notificationData[key] = result[key]
      }
      //this.show() // for test 20191123
      
      //result = await this.lib.AxiosHelper.get('/client/UserNotification/fullInit', data)
      //console.log(result)
    },
    startReloadData () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        //console.log('重新讀取')
        if (this.timer === null) {
          return null
        }
        clearTimeout(this.timer)
        //console.trace('讀了讀了')
        //return
        this.initNotificationData()
      }, this.reloadIntervalSeconds * 1000)
    },
    stopReloadData () {
      clearTimeout(this.timer)
      this.timer = null
    },
    showFull () {
      this.$refs.NotificationModal.show()
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (NotificationManager);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.vue":
/*!****************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.vue ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationManager_html_vue_type_template_id_77c708f2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationManager.html?vue&type=template&id=77c708f2& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.html?vue&type=template&id=77c708f2&");
/* harmony import */ var _NotificationManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationManager.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.js?vue&type=script&lang=js&?61b8");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NotificationManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationManager_html_vue_type_template_id_77c708f2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationManager_html_vue_type_template_id_77c708f2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.html?vue&type=template&id=abd88654&scoped=true&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.html?vue&type=template&id=abd88654&scoped=true& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PeerItem_html_vue_type_template_id_abd88654_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./PeerItem.html?vue&type=template&id=abd88654&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.html?vue&type=template&id=abd88654&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PeerItem_html_vue_type_template_id_abd88654_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PeerItem_html_vue_type_template_id_abd88654_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.js?vue&type=script&lang=js&?0dd7":
/*!*************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PeerItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./PeerItem.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.js?vue&type=script&lang=js&?7c55");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_PeerItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.js?vue&type=script&lang=js&?7c55":
/*!*************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let PeerItem = {
  props: ['lib', 'status', 'config'
    , 'user', 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isReader () {
      if (this.user) {
        return (this.user.role === 'reader')
      }
      else {
        return true
      }
    },
    avatar () {
      return this.user.avatar_url
    },
    username () {
      if (!this.user) {
        return this.$t('View All')
      }
      
      let user = this.user
      
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    annotationTypes () {
      if (!this.user) {
        return this.filterData.allAnnotationTypes
      }
      else {
        return this.user.annotationTypes
      }
    },
    computedItemClassList () {
      let classList = []
      
      if (this.user && 
              (this.user.isReady === false || this.user.annotationTypes.length === 0 )) {
        classList.push('disabled')
      }
      
      //console.log('computedItemClassList')
      if (!this.user && !this.filterData.selectUser) {
        classList.push('selected')
      }
      else if (this.filterData.selectUser 
              && this.user 
              && this.filterData.selectUser.id === this.user.id) {
        classList.push('selected')
      }
        
      return classList.join(' ')
    },
    isReady () {
      if (!this.user) {
        return true
      }
      else if (this.user && this.user.isReady === true) {
        return true
      }
      else {
        return false
      }
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    onSelectPeer () {
      if (this.user && (this.isReady === false
              || this.annotationTypes.length === 0)) {
        return null
      }
      //console.log(this.user)
      //this.$set(this.filterData, 'selectUser', this.user)
      this.filterData.selectUser = this.user
      //console.log(this.filterData.selectUser)
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (PeerItem);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerItem_less_vue_type_style_index_0_id_abd88654_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerItem_less_vue_type_style_index_0_id_abd88654_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerItem_less_vue_type_style_index_0_id_abd88654_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerItem_less_vue_type_style_index_0_id_abd88654_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerItem_less_vue_type_style_index_0_id_abd88654_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerItem_less_vue_type_style_index_0_id_abd88654_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.vue":
/*!*************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.vue ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PeerItem_html_vue_type_template_id_abd88654_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PeerItem.html?vue&type=template&id=abd88654&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.html?vue&type=template&id=abd88654&scoped=true&");
/* harmony import */ var _PeerItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PeerItem.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.js?vue&type=script&lang=js&?0dd7");
/* empty/unused harmony star reexport *//* harmony import */ var _PeerItem_less_vue_type_style_index_0_id_abd88654_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.less?vue&type=style&index=0&id=abd88654&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PeerItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerItem%5CPeerItem.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerItem%5CPeerItem.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PeerItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PeerItem_html_vue_type_template_id_abd88654_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PeerItem_html_vue_type_template_id_abd88654_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "abd88654",
  null
  
)

/* custom blocks */

if (typeof _PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerItem%5CPeerItem.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerItem%5CPeerItem.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./PeerItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerItem%5CPeerItem.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerItem%5CPeerItem.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerItem_5CPeerItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.html?vue&type=template&id=30e3b3ee&scoped=true&":
/*!************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.html?vue&type=template&id=30e3b3ee&scoped=true& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PeerList_html_vue_type_template_id_30e3b3ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./PeerList.html?vue&type=template&id=30e3b3ee&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.html?vue&type=template&id=30e3b3ee&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PeerList_html_vue_type_template_id_30e3b3ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_PeerList_html_vue_type_template_id_30e3b3ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.js?vue&type=script&lang=js&?d9f0":
/*!****************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PeerItem_PeerItem_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PeerItem/PeerItem.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerItem/PeerItem.vue");


let PeerList = {
  props: ['lib', 'status', 'config', 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'peer-item': _PeerItem_PeerItem_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    loadInit: async function () {
      let data = {
        //  好像也想不到要傳什麼資料...
      }
      
      let result = await this.lib.AxiosHelper.get('/client/UserFilter/initPeerList', data)
      
      //console.log(result)
      
      if (Array.isArray(result)) {
        this.checkTempSelectUserID(result)
        
        this.filterData.users = this.filterData.users.slice(0, 0).concat(result)
      }
      
      //console.log(this.filterData.selectUser)
    },
    checkTempSelectUserID (result) {
      if (!this.filterData.tempSelectUserID) {
        return null
      }
      
      for (let i = 0; i < result.length; i++) {
        let user = result[i]
        //console.log(user)
        if (user.id === this.filterData.tempSelectUserID) {
          this.filterData.selectUser = user
          this.filterData.tempSelectUserID = null
          return null
        }
      }
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (PeerList);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.js?vue&type=script&lang=js&?f255":
/*!****************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PeerList_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./PeerList.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.js?vue&type=script&lang=js&?d9f0");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_PeerList_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerList_less_vue_type_style_index_0_id_30e3b3ee_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-style-loader!../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerList_less_vue_type_style_index_0_id_30e3b3ee_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerList_less_vue_type_style_index_0_id_30e3b3ee_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerList_less_vue_type_style_index_0_id_30e3b3ee_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerList_less_vue_type_style_index_0_id_30e3b3ee_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_PeerList_less_vue_type_style_index_0_id_30e3b3ee_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.vue":
/*!****************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.vue ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PeerList_html_vue_type_template_id_30e3b3ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PeerList.html?vue&type=template&id=30e3b3ee&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.html?vue&type=template&id=30e3b3ee&scoped=true&");
/* harmony import */ var _PeerList_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PeerList.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.js?vue&type=script&lang=js&?f255");
/* empty/unused harmony star reexport *//* harmony import */ var _PeerList_less_vue_type_style_index_0_id_30e3b3ee_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.less?vue&type=style&index=0&id=30e3b3ee&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PeerList.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerList.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerList.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PeerList_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PeerList_html_vue_type_template_id_30e3b3ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PeerList_html_vue_type_template_id_30e3b3ee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "30e3b3ee",
  null
  
)

/* custom blocks */

if (typeof _PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerList.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerList.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./PeerList.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerList.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CPeerList%5CPeerList.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_PeerList_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CPeerList_5CPeerList_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.html?vue&type=template&id=0902329e&scoped=true&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.html?vue&type=template&id=0902329e&scoped=true& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChart_html_vue_type_template_id_0902329e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./UserChart.html?vue&type=template&id=0902329e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.html?vue&type=template&id=0902329e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChart_html_vue_type_template_id_0902329e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChart_html_vue_type_template_id_0902329e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.js?vue&type=script&lang=js&?12a4":
/*!******************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jQCloud_jqcloud_webpage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jQCloud/jqcloud.webpage.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.webpage.js");
/* harmony import */ var _UserChartPopup_UserChartPopup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserChartPopup/UserChartPopup.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.vue");
/* harmony import */ var _UserChartLables_UserChartLables_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserChartLables/UserChartLables.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.vue");
/* global this */

//import WordCloud from 'wordcloud'






let UserChart = {
  props: ['lib', 'status', 'config'
    , 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      jQCloudOptions: {
        autoResize: true,
        colors: [
          'rgba(0,0,0,0.85)',
          '#312520',
          '#493131',
          '#161823',
          '#3d3b4f',
          '#622a1d',
          '#725e82',
          '#50616d',
          '#41555d',
          '#758a99'
        ]
      },
      //allArray: null,
      othersArrayMap: {},
    }
  },
  components: {
    'user-chart-popup': _UserChartPopup_UserChartPopup_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    'user-chart-labels': _UserChartLables_UserChartLables_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  computed: {
    otherIsAll () {
      return (!this.filterData.selectUser)
    },
    otherIsMe () {
      return (this.filterData.selectUser
              && this.filterData.selectUser.id === this.status.userID)
    },
    userWordsTextArray () {
      if (!this.filterData.chart.userJSON) {
        return []
      }
      return Object.keys(this.filterData.chart.userJSON)
    },
    allWords () {
      let words = this.filterData.chart.allJSON
      return this._processWordFrequency(words)
    },
    userWords() {
      let words = this.filterData.chart.userJSON
      return this._processWordFrequency(words)
    },
    jQCloudWords () {
      if (!this.$refs.UserChartPopup) {
        return []
      }
      
      let words
      if (this.otherIsAll) {
        // 先看看有沒有暫存
        return this.allWords
      }
      else if (this.otherIsMe) {
        return this.userWords
      }
      else {
        let userID = this.filterData.selectUser.id
        if (Array.isArray(this.othersArrayMap[userID])) {
          return this.othersArrayMap[userID]
        }
        
        let words = this.filterData.chart.othersJSONMap[userID]
        if (!words) {
          return []
        }
        
        this.othersArrayMap[userID] = this._processWordFrequency(words)
        return this.othersArrayMap[userID]
      }
    }
  },
  watch: {
    'filterData.selectUser' () {
      //console.log('有變更嗎？')
      this.load()
    }
  },
//  mounted() {
//    //this._testjQCloud()
//  },
  methods: {
    loadInit: async function () {
      this.filterData.chart.userJSON = null
      this.filterData.chart.allJSON = null
      this.filterData.chart.othersJSONMap = null
      
      // 載入
      let url = '/client/UserFilter/initUserChart'
      let data = {}
      if (this.filterData.selectUser) {
        data.userID = this.filterData.selectUser.id
      }
      
      let result = await this.lib.AxiosHelper.get(url, data)
      //console.log(result)
      this.filterData.chart.userJSON = result.userJSON
      if (this.filterData.selectUser) {
        if (!this.filterData.chart.othersJSONMap) {
          this.filterData.chart.othersJSONMap = {}
        }
        this.filterData.chart.othersJSONMap[data.userID] = result.othersJSON
      }
      else {
        this.filterData.chart.allJSON = result.allJSON
      }
      
      this._draw()
    },
    load: async function () {
      
      // 這邊要先偵測快取
      if (this.otherIsMe === true) {
        //console.log('是我')
        this._draw(true)
        return null
      }
      else if (this.otherIsAll === true && this.filterData.chart.allJSON) {
        //console.log('是大家')
        this._draw(true)
        return null
      }
      else if (this.filterData.selectUser) {
        //console.log('是某人')
        let userID = this.filterData.selectUser.id
        if (this.filterData.chart.othersJSONMap
            && this.filterData.chart.othersJSONMap[userID]) {
          this._draw(true)
          return null
        }
      }
      
      // --------------------------
      
      let url = '/client/UserFilter/getUserWords'
      let data = {}
      if (this.filterData.selectUser) {
        data.userID = this.filterData.selectUser.id
      }
      let result = await this.lib.AxiosHelper.get(url, data)
      if (this.otherIsAll === true) {
        this.filterData.chart.allJSON = result
      }
      else {
        if (!this.filterData.chart.othersJSONMap) {
          this.filterData.chart.othersJSONMap = {}
        }
        this.filterData.chart.othersJSONMap[data.userID] = result
      }
      
      this._draw(true)
    },
    _draw (doUpdate) {
      // 畫
      //console.log(this.jQCloudWords)
      if (doUpdate === undefined) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.jQCloudContainer).jQCloud(this.jQCloudWords, this.jQCloudOptions)
      }
      else {
        //console.log('update')
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.jQCloudContainer).jQCloud('update', this.jQCloudWords)
      }
    },
    // ---------------------------------
    
    _processWordFrequency (words) {
      let initPopup = this.$refs.UserChartPopup.initPopup
      //let _this = this
      //console.log(typeof(initPopup))
      //console.log(words)
      return Object.keys(words).map(text => {
        let item = {
          text
        }
        item.weight = words[text]
        if (this.userWordsTextArray.indexOf(text) > -1) {
          item.color = '#690'
        }
        
        item.handlers = {
//          mouseover: function () {
//            initPopup(this)
//          },
          click: function () {
            initPopup(this)
          }
        }
        return item
      })
    },
    
    // ---------------------------------------------------------
    
    _testjQCloud: async function () {
      await this.lib.VueHelper.sleep(2000)
      
      let popupEle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.popup)
      
      let inited = false
      
      var words = [
        {text: "Lorem", weight: 13},
        {text: "Ipsum", weight: 10.5},
        {text: "Dolor", weight: 9.4, color: 'red',
        handlers: {
          mouseover: function () {
            if (inited === true) {
              return
            }
            //console.log(this)
            console.log(this.innerText.trim())
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)
              .popup({
                popup: popupEle,
                hoverable: true
            })
            inited = true
          }
        }},
        {text: "Sit", weight: 8},
        {text: "Amet", weight: 6.2},
        {text: "Consectetur", weight: 5},
        {text: "Adipiscing", weight: 5},
        /* ... */
      ];

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.jQCloudContainer).jQCloud(words, {
        autoResize: true
//        colors: function (i) {
//          console.log(i)
//          return '#F00'
//          if (words[i].text === 'Dolor') {
//            return '#F00'
//          }
//          else {
//            return 'black'
//          }
//        }
      });
      
      await this.lib.VueHelper.sleep(3000)
      
      ///$(this.$refs.jQCloudContainer).jQCloud(words, 'update');
    },
    
//    _mockupData () {
//      
//    },
//    onPopupClick () {
//      console.log('搜尋')
//    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (UserChart);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.js?vue&type=script&lang=js&?2b0b":
/*!******************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserChart_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./UserChart.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.js?vue&type=script&lang=js&?12a4");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_UserChart_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChart_less_vue_type_style_index_0_id_0902329e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/vue-style-loader!../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChart_less_vue_type_style_index_0_id_0902329e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChart_less_vue_type_style_index_0_id_0902329e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChart_less_vue_type_style_index_0_id_0902329e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChart_less_vue_type_style_index_0_id_0902329e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChart_less_vue_type_style_index_0_id_0902329e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.vue":
/*!******************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.vue ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserChart_html_vue_type_template_id_0902329e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserChart.html?vue&type=template&id=0902329e&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.html?vue&type=template&id=0902329e&scoped=true&");
/* harmony import */ var _UserChart_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserChart.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.js?vue&type=script&lang=js&?2b0b");
/* empty/unused harmony star reexport *//* harmony import */ var _UserChart_less_vue_type_style_index_0_id_0902329e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.less?vue&type=style&index=0&id=0902329e&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserChart.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChart.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChart.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserChart_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserChart_html_vue_type_template_id_0902329e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserChart_html_vue_type_template_id_0902329e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0902329e",
  null
  
)

/* custom blocks */

if (typeof _UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChart.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChart.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./UserChart.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChart.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChart.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChart_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChart_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.html?vue&type=template&id=448d2722&scoped=true&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.html?vue&type=template&id=448d2722&scoped=true& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChartLables_html_vue_type_template_id_448d2722_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./UserChartLables.html?vue&type=template&id=448d2722&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.html?vue&type=template&id=448d2722&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChartLables_html_vue_type_template_id_448d2722_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChartLables_html_vue_type_template_id_448d2722_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.js?vue&type=script&lang=js&?dae2":
/*!****************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let UserChartLables = {
  props: ['lib', 'status', 'config'
    , 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    otherIsAll () {
      return (!this.filterData.selectUser)
    },
    otherIsMe () {
      return (this.filterData.selectUser
              && this.filterData.selectUser.id === this.status.userID)
    },
    myAvatar () {
      return this.status.avatar
    },
    myUsername () {
      let user = this.status
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    otherAvatar () {
      return this.filterData.selectUser.avatar_url
    },
    otherUsername () {
      let user = this.filterData.selectUser
      if (typeof(user.display_name) === 'string') {
        return user.display_name
      }
      else {
        return user.username
      }
    },
  },
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (UserChartLables);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.js?vue&type=script&lang=js&?e5b3":
/*!****************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserChartLables_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./UserChartLables.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.js?vue&type=script&lang=js&?dae2");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_UserChartLables_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartLables_less_vue_type_style_index_0_id_448d2722_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartLables_less_vue_type_style_index_0_id_448d2722_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartLables_less_vue_type_style_index_0_id_448d2722_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartLables_less_vue_type_style_index_0_id_448d2722_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartLables_less_vue_type_style_index_0_id_448d2722_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartLables_less_vue_type_style_index_0_id_448d2722_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.vue":
/*!****************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.vue ***!
  \****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserChartLables_html_vue_type_template_id_448d2722_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserChartLables.html?vue&type=template&id=448d2722&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.html?vue&type=template&id=448d2722&scoped=true&");
/* harmony import */ var _UserChartLables_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserChartLables.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.js?vue&type=script&lang=js&?e5b3");
/* empty/unused harmony star reexport *//* harmony import */ var _UserChartLables_less_vue_type_style_index_0_id_448d2722_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.less?vue&type=style&index=0&id=448d2722&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserChartLables.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartLables%5CUserChartLables.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartLables%5CUserChartLables.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserChartLables_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserChartLables_html_vue_type_template_id_448d2722_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserChartLables_html_vue_type_template_id_448d2722_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "448d2722",
  null
  
)

/* custom blocks */

if (typeof _UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartLables%5CUserChartLables.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartLables%5CUserChartLables.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./UserChartLables.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartLables%5CUserChartLables.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartLables/UserChartLables.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartLables%5CUserChartLables.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartLables_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartLables_5CUserChartLables_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.html?vue&type=template&id=31df0066&scoped=true&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.html?vue&type=template&id=31df0066&scoped=true& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChartPopup_html_vue_type_template_id_31df0066_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./UserChartPopup.html?vue&type=template&id=31df0066&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.html?vue&type=template&id=31df0066&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChartPopup_html_vue_type_template_id_31df0066_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserChartPopup_html_vue_type_template_id_31df0066_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.js?vue&type=script&lang=js&?2ff4":
/*!**************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.js?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserChartPopup_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./UserChartPopup.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.js?vue&type=script&lang=js&?4f9c");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_UserChartPopup_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.js?vue&type=script&lang=js&?4f9c":
/*!**************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.js?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


let UserChartPopup = {
  props: ['lib', 'status', 'config'
    , 'filterData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      popupFocusText: null,
      boundary: null
    }
  },
//  components: {
//  },
  computed: {
    otherIsAll () {
      return (!this.filterData.selectUser)
    },
    otherIsMe () {
      return (this.filterData.selectUser
              && this.filterData.selectUser.id === this.status.userID)
    },
    popupOptions () {
      return {
        popup: this.$refs.popup,
        hoverable: true,
        distanceAway: -10,
        //position: 'top center',
        //duration: 0,
        exclusive: true,
        on: "click",
        boundary: this.boundary
      }
      // jqcloud-wrapper
    },
    myAvatar () {
      return this.status.avatar
    },
    myUsername () {
      let user = this.status
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    otherAvatar () {
      return this.filterData.selectUser.avatar_url
    },
    otherUsername () {
      let user = this.filterData.selectUser
      if (typeof(user.display_name) === 'string') {
        return user.display_name
      }
      else {
        return user.username
      }
    },
    popupMyCount () {
      if (!this.filterData.chart.userJSON) {
        return 0
      }
      
      let count = this.filterData.chart.userJSON[this.popupFocusText]
      if (!count) {
        count = 0
      }
      return count
    },
    popupOtherCount () {
      let count
      let text = this.popupFocusText
      //console.log(this.otherIsAll, this.filterData.chart.allJSON)
      if (this.otherIsAll) {
        if (this.filterData.chart.allJSON) {
          count = this.filterData.chart.allJSON[text]
        }
      }
      else if (!this.otherIsMe) {
        if (this.filterData.chart.othersJSONMap) {
          let userID = this.filterData.selectUser.id
          if (this.filterData.chart.othersJSONMap[userID]) {
            count = this.filterData.chart.othersJSONMap[userID][text]
          }
        }
      }
      
      if (!count) {
        count = 0
      }
      return count
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    initPopup: function (ele) {
      this.popupFocusText = ele.innerText.trim()
      
      let $ele = jquery__WEBPACK_IMPORTED_MODULE_0___default()(ele)
      if (!this.boundary) {
        this.boundary = $ele.parents('.jqcloud-container.jqcloud:first')
      }
      
      if ($ele.attr('data-popup-inited') !== undefined) {
        return null
      }
      
      $ele.popup(this.popupOptions)
      $ele.attr('data-popup-inited', true)
      $ele.click()
    },
    onPopupClick () {
      this.$parent.$parent.hide()
      
      //throw new Error('Search: ' + this.popupFocusText)
      this.status.search.keyword = this.popupFocusText
      
      
      // 先設定篩選條件
      this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)
      
      // 再來顯示
      this.lib.AnnotationPanel.setAnchorPositions()
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (UserChartPopup);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartPopup_less_vue_type_style_index_0_id_31df0066_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/vue-style-loader!../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartPopup_less_vue_type_style_index_0_id_31df0066_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartPopup_less_vue_type_style_index_0_id_31df0066_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartPopup_less_vue_type_style_index_0_id_31df0066_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartPopup_less_vue_type_style_index_0_id_31df0066_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserChartPopup_less_vue_type_style_index_0_id_31df0066_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.vue":
/*!**************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.vue ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserChartPopup_html_vue_type_template_id_31df0066_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserChartPopup.html?vue&type=template&id=31df0066&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.html?vue&type=template&id=31df0066&scoped=true&");
/* harmony import */ var _UserChartPopup_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserChartPopup.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.js?vue&type=script&lang=js&?2ff4");
/* empty/unused harmony star reexport *//* harmony import */ var _UserChartPopup_less_vue_type_style_index_0_id_31df0066_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.less?vue&type=style&index=0&id=31df0066&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserChartPopup.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartPopup%5CUserChartPopup.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartPopup%5CUserChartPopup.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserChartPopup_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserChartPopup_html_vue_type_template_id_31df0066_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserChartPopup_html_vue_type_template_id_31df0066_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "31df0066",
  null
  
)

/* custom blocks */

if (typeof _UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartPopup%5CUserChartPopup.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartPopup%5CUserChartPopup.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./UserChartPopup.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartPopup%5CUserChartPopup.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChartPopup/UserChartPopup.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserChart%5CUserChartPopup%5CUserChartPopup.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserChartPopup_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserChart_5CUserChartPopup_5CUserChartPopup_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.css":
/*!************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!./jqcloud.css */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.css");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("775015e6", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.js":
/*!***********************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Plugin class
 */
var jQCloud = function(element, word_array, options) {
    this.$element = $(element);

    this.word_array = word_array || [];
    this.options = options;

    this.sizeGenerator = null;
    this.colorGenerator = null;

    // Data used internally
    this.data = {
        placed_words: [],
        timeouts: {},
        namespace: null,
        step: null,
        angle: null,
        aspect_ratio: null,
        max_weight: null,
        min_weight: null,
        sizes: [],
        colors: []
    };

    this.initialize();
};

jQCloud.DEFAULTS = {
    width: 100,
    height: 100,
    center: { x: 0.5, y: 0.5 },
    steps: 10,
    delay: null,
    shape: 'elliptic',
    classPattern: 'w{n}',
    encodeURI: true,
    removeOverflowing: true,
    afterCloudRender: null,
    autoResize: false,
    colors: null,
    fontSize: null,
    template: null
};

jQCloud.prototype = {
    initialize: function() {
        // Set/Get dimensions
        if (this.options.width) {
            this.$element.width(this.options.width);
        }
        else {
            this.options.width = this.$element.width();
        }
        if (this.options.height) {
            this.$element.height(this.options.height);
        }
        else {
            this.options.height = this.$element.height();
        }

        // Default options value
        this.options = $.extend(true, {}, jQCloud.DEFAULTS, this.options);

        // Ensure delay
        if (this.options.delay === null) {
            this.options.delay = this.word_array.length > 50 ? 10 : 0;
        }

        // Backward compatibility
        if (this.options.center.x > 1) {
            this.options.center.x = this.options.center.x / this.options.width;
            this.options.center.y = this.options.center.y / this.options.height;
        }

        // Create colorGenerator function from options
        // Direct function
        if (typeof this.options.colors === 'function') {
            this.colorGenerator = this.options.colors;
        }
        // Array of sizes
        else if ($.isArray(this.options.colors)) {
            var cl = this.options.colors.length;
            if (cl > 0) {
                // Fill the sizes array to X items
                if (cl < this.options.steps) {
                    for (var i = cl; i < this.options.steps; i++) {
                        this.options.colors[i] = this.options.colors[cl - 1];
                    }
                }

                this.colorGenerator = function(weight) {
                    return this.options.colors[this.options.steps - weight];
                };
            }
        }

        // Create sizeGenerator function from options
        // Direct function
        if (typeof this.options.fontSize === 'function') {
            this.sizeGenerator = this.options.fontSize;
        }
        // Object with 'from' and 'to'
        else if ($.isPlainObject(this.options.fontSize)) {
            this.sizeGenerator = function(width, height, weight) {
                var max = width * this.options.fontSize.from,
                    min = width * this.options.fontSize.to;
                return Math.round(min + (max - min) * 1.0 / (this.options.steps - 1) * (weight - 1)) + 'px';
            };
        }
        // Array of sizes
        else if ($.isArray(this.options.fontSize)) {
            var sl = this.options.fontSize.length;
            if (sl > 0) {
                // Fill the sizes array to X items
                if (sl < this.options.steps) {
                    for (var j = sl; j < this.options.steps; j++) {
                        this.options.fontSize[j] = this.options.fontSize[sl - 1];
                    }
                }

                this.sizeGenerator = function(width, height, weight) {
                    return this.options.fontSize[this.options.steps - weight];
                };
            }
        }

        this.data.angle = Math.random() * 6.28;
        this.data.step = (this.options.shape === 'rectangular') ? 18.0 : 2.0;
        this.data.aspect_ratio = this.options.width / this.options.height;
        this.clearTimeouts();

        // Namespace word ids to avoid collisions between multiple clouds
        this.data.namespace = (this.$element.attr('id') || Math.floor((Math.random() * 1000000)).toString(36)) + '_word_';

        this.$element.addClass('jqcloud');

        // Container's CSS position cannot be 'static'
        if (this.$element.css('position') === 'static') {
            this.$element.css('position', 'relative');
        }

        // Delay execution so that the browser can render the page before the computatively intensive word cloud drawing
        this.createTimeout($.proxy(this.drawWordCloud, this), 10);

        // Attach window resize event
        if (this.options.autoResize) {
            $(window).on('resize.' + this.data.namespace, throttle(this.resize, 50, this));
        }
    },

    // Helper function to keep track of timeouts so they can be destroyed
    createTimeout: function(callback, time) {
        var timeout = setTimeout($.proxy(function() {
            delete this.data.timeouts[timeout];
            callback();
        }, this), time);
        this.data.timeouts[timeout] = true;
    },

    // Destroy all timeouts
    clearTimeouts: function() {
        $.each(this.data.timeouts, function(key) {
            clearTimeout(key);
        });
        this.data.timeouts = {};
    },

    // Pairwise overlap detection
    overlapping: function(a, b) {
        if (Math.abs(2.0 * a.left + a.width - 2.0 * b.left - b.width) < a.width + b.width) {
            if (Math.abs(2.0 * a.top + a.height - 2.0 * b.top - b.height) < a.height + b.height) {
                return true;
            }
        }
        return false;
    },

    // Helper function to test if an element overlaps others
    hitTest: function(elem) {
        // Check elements for overlap one by one, stop and return false as soon as an overlap is found
        for (var i = 0, l = this.data.placed_words.length; i < l; i++) {
            if (this.overlapping(elem, this.data.placed_words[i])) {
                return true;
            }
        }
        return false;
    },

    // Initialize the drawing of the whole cloud
    drawWordCloud: function() {
        var i, l;

        this.$element.children('[id^="' + this.data.namespace + '"]').remove();

        if (this.word_array.length === 0) {
            return;
        }

        // Make sure every weight is a number before sorting
        for (i = 0, l = this.word_array.length; i < l; i++) {
            this.word_array[i].weight = parseFloat(this.word_array[i].weight, 10);
        }

        // Sort word_array from the word with the highest weight to the one with the lowest
        this.word_array.sort(function(a, b) {
            return b.weight - a.weight;
        });

        // Kepp trace of bounds
        this.data.max_weight = this.word_array[0].weight;
        this.data.min_weight = this.word_array[this.word_array.length - 1].weight;

        // Generate colors
        this.data.colors = [];
        if (this.colorGenerator) {
            for (i = 0; i < this.options.steps; i++) {
                this.data.colors.push(this.colorGenerator(i + 1));
            }
        }

        // Generate font sizes
        this.data.sizes = [];
        if (this.sizeGenerator) {
            for (i = 0; i < this.options.steps; i++) {
                this.data.sizes.push(this.sizeGenerator(this.options.width, this.options.height, i + 1));
            }
        }

        // Iterate drawOneWord on every word, immediately or with delay
        if (this.options.delay > 0) {
            this.drawOneWordDelayed();
        }
        else {
            for (i = 0, l = this.word_array.length; i < l; i++) {
                this.drawOneWord(i, this.word_array[i]);
            }

            if (typeof this.options.afterCloudRender === 'function') {
                this.options.afterCloudRender.call(this.$element);
            }
        }
    },

    // Function to draw a word, by moving it in spiral until it finds a suitable empty place
    drawOneWord: function(index, word) {
        var word_id = this.data.namespace + index,
            word_selector = '#' + word_id,

        // option.shape == 'elliptic'
            angle = this.data.angle,
            radius = 0.0,

        // option.shape == 'rectangular'
            steps_in_direction = 0.0,
            quarter_turns = 0.0,

            weight = Math.floor(this.options.steps / 2),
            word_span,
            word_size,
            word_style;

        // Create word attr object
        word.attr = $.extend({}, word.html, { id: word_id });

        // Linearly map the original weight to a discrete scale from 1 to 10
        // Only if weights are different
        if (this.data.max_weight != this.data.min_weight) {
            weight = Math.round((word.weight - this.data.min_weight) * 1.0 * (this.options.steps - 1) / (this.data.max_weight - this.data.min_weight)) + 1;
        }
        word_span = $('<span>').attr(word.attr);

        word_span.addClass('jqcloud-word');

        // Apply class
        if (this.options.classPattern) {
            word_span.addClass(this.options.classPattern.replace('{n}', weight));
        }

        // Apply color
        if (this.data.colors.length) {
            word_span.css('color', this.data.colors[weight - 1]);
        }

        // Apply color from word property
        if (word.color) {
            word_span.css('color', word.color);
        }

        // Apply size
        if (this.data.sizes.length) {
            word_span.css('font-size', this.data.sizes[weight - 1]);
        }

        //Render using template function if provided.
        if (this.options.template) {
            word_span.html(this.options.template(word));
        } else if (word.link) {
            // Append link if word.link attribute was set
            // If link is a string, then use it as the link href
            if (typeof word.link === 'string') {
                word.link = { href: word.link };
            }

            if (this.options.encodeURI) {
                word.link.href = encodeURI(word.link.href).replace(/'/g, '%27');
            }

            word_span.append($('<a>').attr(word.link).text(word.text));
        }
        else {
            word_span.text(word.text);
        }

        // Bind handlers to words
        if (word.handlers) {
            word_span.on(word.handlers);
        }

        this.$element.append(word_span);

        word_size = {
            width: word_span.outerWidth(),
            height: word_span.outerHeight()
        };
        word_size.left = this.options.center.x * this.options.width - word_size.width / 2.0;
        word_size.top = this.options.center.y * this.options.height - word_size.height / 2.0;

        // Save a reference to the style property, for better performance
        word_style = word_span[0].style;
        word_style.position = 'absolute';
        word_style.left = word_size.left + 'px';
        word_style.top = word_size.top + 'px';

        while (this.hitTest(word_size)) {
            // option shape is 'rectangular' so move the word in a rectangular spiral
            if (this.options.shape === 'rectangular') {
                steps_in_direction++;

                if (steps_in_direction * this.data.step > (1 + Math.floor(quarter_turns / 2.0)) * this.data.step * ((quarter_turns % 4 % 2) === 0 ? 1 : this.data.aspect_ratio)) {
                    steps_in_direction = 0.0;
                    quarter_turns++;
                }

                switch (quarter_turns % 4) {
                    case 1:
                        word_size.left += this.data.step * this.data.aspect_ratio + Math.random() * 2.0;
                        break;
                    case 2:
                        word_size.top -= this.data.step + Math.random() * 2.0;
                        break;
                    case 3:
                        word_size.left -= this.data.step * this.data.aspect_ratio + Math.random() * 2.0;
                        break;
                    case 0:
                        word_size.top += this.data.step + Math.random() * 2.0;
                        break;
                }
            }
            // Default settings: elliptic spiral shape
            else {
                radius += this.data.step;
                angle += (index % 2 === 0 ? 1 : -1) * this.data.step;

                word_size.left = this.options.center.x * this.options.width - (word_size.width / 2.0) + (radius * Math.cos(angle)) * this.data.aspect_ratio;
                word_size.top = this.options.center.y * this.options.height + radius * Math.sin(angle) - (word_size.height / 2.0);
            }
            word_style.left = word_size.left + 'px';
            word_style.top = word_size.top + 'px';
        }

        // Don't render word if part of it would be outside the container
        if (this.options.removeOverflowing && (
                word_size.left < 0 || word_size.top < 0 ||
                (word_size.left + word_size.width) > this.options.width ||
                (word_size.top + word_size.height) > this.options.height
            )
        ) {
            word_span.remove();
            return;
        }

        // Save position for further usage
        this.data.placed_words.push(word_size);

        if (typeof word.afterWordRender === 'function') {
            word.afterWordRender.call(word_span);
        }
    },

    // Draw one word then recall the function after a delay
    drawOneWordDelayed: function(index) {
        index = index || 0;

        // if not visible then do not attempt to draw
        if (!this.$element.is(':visible')) {
            this.createTimeout($.proxy(function() {
                this.drawOneWordDelayed(index);
            }, this), 10);

            return;
        }

        if (index < this.word_array.length) {
            this.drawOneWord(index, this.word_array[index]);

            this.createTimeout($.proxy(function() {
                this.drawOneWordDelayed(index + 1);
            }, this), this.options.delay);
        }
        else {
            if (typeof this.options.afterCloudRender == 'function') {
                this.options.afterCloudRender.call(this.$element);
            }
        }
    },

    // Destroy any data and objects added by the plugin
    destroy: function() {
        if (this.options.autoResize) {
            $(window).off('resize.' + this.data.namespace);
        }

        this.clearTimeouts();
        this.$element.removeClass('jqcloud');
        this.$element.removeData('jqcloud');
        this.$element.children('[id^="' + this.data.namespace + '"]').remove();
    },

    // Update the list of words
    update: function(word_array) {
        this.word_array = word_array;
        this.data.placed_words = [];

        this.clearTimeouts();
        this.drawWordCloud();
    },

    resize: function() {
        var new_size = {
            width: this.$element.width(),
            height: this.$element.height()
        };

        if (new_size.width != this.options.width || new_size.height != this.options.height) {
            this.options.width = new_size.width;
            this.options.height = new_size.height;
            this.data.aspect_ratio = this.options.width / this.options.height;

            this.update(this.word_array);
        }
    },
};

/*
 * Apply throttling to a callback
 * @param callback {function}
 * @param delay {int} milliseconds
 * @param context {object|null}
 * @return {function}
 */
function throttle(callback, delay, context) {
    var state = {
        pid: null,
        last: 0
    };

    return function() {
        var elapsed = new Date().getTime() - state.last,
            args = arguments,
            that = this;

        function exec() {
            state.last = new Date().getTime();
            return callback.apply(context || that, Array.prototype.slice.call(args));
        }

        if (elapsed > delay) {
            return exec();
        }
        else {
            clearTimeout(state.pid);
            state.pid = setTimeout(exec, delay - elapsed);
        }
    };
}

/*
 * jQuery plugin
 */
$.fn.jQCloud = function(word_array, option) {
    var args = arguments;

    return this.each(function() {
        var $this = $(this),
            data = $this.data('jqcloud');

        if (!data && word_array === 'destroy') {
            // Don't even try to initialize when called with 'destroy'
            return;
        }
        if (!data) {
            var options = typeof option === 'object' ? option : {};
            $this.data('jqcloud', (data = new jQCloud(this, word_array, options)));
        }
        else if (typeof word_array === 'string') {
            data[word_array].apply(data, Array.prototype.slice.call(args, 1));
        }
    });
};

$.fn.jQCloud.defaults = {
    set: function(options) {
        $.extend(true, jQCloud.DEFAULTS, options);
    },
    get: function(key) {
        var options = jQCloud.DEFAULTS;
        if (key) {
            options = options[key];
        }
        return $.extend(true, {}, options);
    }
};


/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.webpage.js":
/*!*******************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.webpage.js ***!
  \*******************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jqcloud_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jqcloud.js */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.js");
/* harmony import */ var _jqcloud_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jqcloud_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jqcloud_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jqcloud.css */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/jQCloud/jqcloud.css");
/* harmony import */ var _jqcloud_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jqcloud_css__WEBPACK_IMPORTED_MODULE_1__);
//import './jqcloud-1.0.4.js'




/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.html?vue&type=template&id=5e5c50d9&scoped=true&":
/*!*****************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.html?vue&type=template&id=5e5c50d9&scoped=true& ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserFilter_html_vue_type_template_id_5e5c50d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./UserFilter.html?vue&type=template&id=5e5c50d9&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.html?vue&type=template&id=5e5c50d9&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserFilter_html_vue_type_template_id_5e5c50d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserFilter_html_vue_type_template_id_5e5c50d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.js?vue&type=script&lang=js&?ae3e":
/*!*********************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserFilter_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./UserFilter.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.js?vue&type=script&lang=js&?c2a8");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_UserFilter_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.js?vue&type=script&lang=js&?c2a8":
/*!*********************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PeerList_PeerList_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PeerList/PeerList.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/PeerList/PeerList.vue");
/* harmony import */ var _UserChart_UserChart_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserChart/UserChart.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserChart/UserChart.vue");



let UserSelector = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      filterData: {
        users: [],
        allAnnotationTypes: [],
        selectUser: null,
        tempSelectUserID: null,
        
        chart: {
          userJSON: null,

          allJSON: null,

          othersJSONMap: null,
        }
      }
    }
  },
  components: {
    'peer-list': _PeerList_PeerList_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    'user-chart': _UserChart_UserChart_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  },
  computed: {
    peer () {
      return this.status.filter.focusUser
    },
    peerIsMe () {
      return (this.status.filter.focusUser 
              && this.status.filter.focusUser.id === this.status.userID)
    },
    username () {
      if (this.peer) {
        let user = this.peer

        if (typeof(user.displayName) === 'string') {
          return user.displayName
        }
        else {
          return user.username
        }
      }
    }
  },
//  watch: {
//  },
//  mounted() {
//    //this.show() // for test
//  },
  methods: {
    show () {
      if (this.status.filter.focusUser) {
        this.filterData.selectUser = this.status.filter.focusUser
      }
      //console.log(this.filterData.selectUser)
      
      this.$refs.PeerList.loadInit()
      this.$refs.UserChart.loadInit()
      
      this.$refs.Modal.show()
      
    },
    selectUser (id) {
      //console.log(id)
      this.filterData.tempSelectUserID = id
      this.show()
    },
    hide () {
      this.$refs.Modal.hide()
      //console.log('有hide嗎？')
    },
    submit () {
      if (this.filterData.selectUser) {
        this.status.filter.focusUser = this.filterData.selectUser
      }
      else {
        this.status.filter.focusUser = null
      }
      //console.log(this.filterData.selectUser)
      
      this.$refs.Modal.hide()
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (UserSelector);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserFilter_less_vue_type_style_index_0_id_5e5c50d9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-style-loader!../../../../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserFilter_less_vue_type_style_index_0_id_5e5c50d9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserFilter_less_vue_type_style_index_0_id_5e5c50d9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserFilter_less_vue_type_style_index_0_id_5e5c50d9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserFilter_less_vue_type_style_index_0_id_5e5c50d9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserFilter_less_vue_type_style_index_0_id_5e5c50d9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.vue":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.vue ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserFilter_html_vue_type_template_id_5e5c50d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserFilter.html?vue&type=template&id=5e5c50d9&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.html?vue&type=template&id=5e5c50d9&scoped=true&");
/* harmony import */ var _UserFilter_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserFilter.js?vue&type=script&lang=js& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.js?vue&type=script&lang=js&?ae3e");
/* empty/unused harmony star reexport *//* harmony import */ var _UserFilter_less_vue_type_style_index_0_id_5e5c50d9_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true& */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.less?vue&type=style&index=0&id=5e5c50d9&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserFilter.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserFilter.vue&lang=yaml */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserFilter.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserFilter_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserFilter_html_vue_type_template_id_5e5c50d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserFilter_html_vue_type_template_id_5e5c50d9_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5e5c50d9",
  null
  
)

/* custom blocks */

if (typeof _UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserFilter.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserFilter.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/@kazupon/vue-i18n-loader/lib!./UserFilter.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserFilter.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5CReadingProgressesModuels%5CReading%5Ccomponents%5Csearch%5CUserFilter%5CUserFilter.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserFilter_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5CReadingProgressesModuels_5CReading_5Ccomponents_5Csearch_5CUserFilter_5CUserFilter_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/client.tpl":
/*!***************************************!*\
  !*** ./webpack-app/client/client.tpl ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"non-invasive-web-style-framework\">\r\n\r\n  <auth \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:lib=\"lib\"\r\n    ref=\"auth\">\r\n  </auth>\r\n  \r\n  <StyleManager \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:lib=\"lib\"\r\n    ref=\"style\">\r\n  </StyleManager>\r\n  \r\n  <PACORTestManager \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:lib=\"lib\"\r\n    ref=\"TestManager\">\r\n  </PACORTestManager>\r\n\r\n  <error-handler \r\n    v-bind:config=\"config\"\r\n    v-bind:lib=\"lib\"\r\n    v-bind:errors=\"errors\"\r\n    ref=\"ErrorHandler\">\r\n  </error-handler>\r\n  \r\n  <confirm-modal\r\n    v-bind:config=\"config\"\r\n    v-bind:lib=\"lib\"\r\n    v-bind:status=\"status\"\r\n    \r\n    ref=\"ConfirmModal\">\r\n  </confirm-modal>\r\n\r\n  <component \r\n    v-bind:is=\"status.view\"\r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:progress=\"progress\"\r\n    v-bind:lib=\"lib\">\r\n  </component>\r\n</div>";

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
/* harmony import */ var _components_ui_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/ui/Pagination/Pagination.vue */ "./webpack-app/components/ui/Pagination/Pagination.vue");
/* harmony import */ var _components_ui_modal_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../components/ui-modal/Modal/Modal.vue */ "./webpack-app/components/ui-modal/Modal/Modal.vue");
/* harmony import */ var _components_ui_modal_ConfirmModal_ConfirmModal_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../components/ui-modal/ConfirmModal/ConfirmModal.vue */ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.vue");
/* harmony import */ var _components_reading_progress_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/reading-progress/StepProgressBar/StepProgressBar.vue */ "./webpack-app/components/reading-progress/StepProgressBar/StepProgressBar.vue");
/* harmony import */ var _components_reading_progress_BlockExit_BlockExit_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/reading-progress/BlockExit/BlockExit.vue */ "./webpack-app/components/reading-progress/BlockExit/BlockExit.vue");
/* harmony import */ var _components_reading_progress_ActivityTimer_ActivityTimer_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../components/reading-progress/ActivityTimer/ActivityTimer.vue */ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.vue");
/* harmony import */ var _components_ui_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../components/ui/Navigation/Navigation.vue */ "./webpack-app/components/ui/Navigation/Navigation.vue");
/* harmony import */ var _components_reading_progress_Clock_Clock_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../components/reading-progress/Clock/Clock.vue */ "./webpack-app/components/reading-progress/Clock/Clock.vue");
/* harmony import */ var _components_annotation_AnnotationTypeButton_AnnotationTypeButton_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue */ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue");
/* harmony import */ var _components_ui_CheckboxToggle_CheckboxToggle_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../components/ui/CheckboxToggle/CheckboxToggle.vue */ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.vue");
/* harmony import */ var _components_reading_progress_CountdownButton_CountdownButton_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../components/reading-progress/CountdownButton/CountdownButton.vue */ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.vue");
/* harmony import */ var _components_reading_progress_SimpleCountdownTimer_SimpleCountdownTimer_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue */ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue");
/* harmony import */ var _components_reading_progress_DigitalCountdownTimer_DigitalCountdownTimer_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue */ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue");
/* harmony import */ var _components_ui_button_ValidationButton_ValidationButton_vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../components/ui-button/ValidationButton/ValidationButton.vue */ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.vue");
/* harmony import */ var _components_ui_user_UserAvatarIcons_UserAvatarIcons_vue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../components/ui-user/UserAvatarIcons/UserAvatarIcons.vue */ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.vue");
/* harmony import */ var _components_annotation_AnnotationItem_AnnotationItem_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../components/annotation/AnnotationItem/AnnotationItem.vue */ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.vue");
/* harmony import */ var _components_annotation_AnnotationItemInteractive_AnnotationItemInteractive_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./../components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue */ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue");
/* harmony import */ var _components_ui_user_AdminBadge_AdminBadge_vue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./../components/ui-user/AdminBadge/AdminBadge.vue */ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.vue");
/* harmony import */ var _components_ui_user_UserSelfBadge_UserSelfBadge_vue__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./../components/ui-user/UserSelfBadge/UserSelfBadge.vue */ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.vue");
/* harmony import */ var _components_ui_IframeMessageSegment_IframeMessageSegment_vue__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../components/ui/IframeMessageSegment/IframeMessageSegment.vue */ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.vue");
/* harmony import */ var _ReadingProgressesModuels_Reading_components_manager_NotificationManager_NotificationManager_vue__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.vue");
/* harmony import */ var _ReadingProgressesModuels_Reading_components_manager_NotificationManager_NotificationIcon_NotificationIcon_vue__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue");
/* harmony import */ var _ReadingProgressesModuels_Reading_components_search_UserFilter_UserFilter_vue__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.vue");
/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */




vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('pagination', _components_ui_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('modal', _components_ui_modal_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('confirm-modal', _components_ui_modal_ConfirmModal_ConfirmModal_vue__WEBPACK_IMPORTED_MODULE_3__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('step-progress-bar', _components_reading_progress_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_4__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('block-exit', _components_reading_progress_BlockExit_BlockExit_vue__WEBPACK_IMPORTED_MODULE_5__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('activity-timer', _components_reading_progress_ActivityTimer_ActivityTimer_vue__WEBPACK_IMPORTED_MODULE_6__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('navigation', _components_ui_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_7__["default"])

//import CompactNavigation from './../components/CompactNavigation/CompactNavigation.vue'
//Vue.component('compact-navigation', CompactNavigation)


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('clock', _components_reading_progress_Clock_Clock_vue__WEBPACK_IMPORTED_MODULE_8__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-type-button', _components_annotation_AnnotationTypeButton_AnnotationTypeButton_vue__WEBPACK_IMPORTED_MODULE_9__["default"])

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('HTMLEditor', () => Promise.all(/*! import() | vendors/HTMLEditor */[__webpack_require__.e("vendors"), __webpack_require__.e("vendors/HTMLEditor")]).then(__webpack_require__.bind(null, /*! ./../components/annotation/HTMLEditor/HTMLEditor.vue */ "./webpack-app/components/annotation/HTMLEditor/HTMLEditor.vue")))


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('checkbox-toggle', _components_ui_CheckboxToggle_CheckboxToggle_vue__WEBPACK_IMPORTED_MODULE_10__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('countdown-button', _components_reading_progress_CountdownButton_CountdownButton_vue__WEBPACK_IMPORTED_MODULE_11__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('simple-countdown-timer', _components_reading_progress_SimpleCountdownTimer_SimpleCountdownTimer_vue__WEBPACK_IMPORTED_MODULE_12__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('digital-countdown-timer', _components_reading_progress_DigitalCountdownTimer_DigitalCountdownTimer_vue__WEBPACK_IMPORTED_MODULE_13__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('validation-button', _components_ui_button_ValidationButton_ValidationButton_vue__WEBPACK_IMPORTED_MODULE_14__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-avatar-icons', _components_ui_user_UserAvatarIcons_UserAvatarIcons_vue__WEBPACK_IMPORTED_MODULE_15__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-item', _components_annotation_AnnotationItem_AnnotationItem_vue__WEBPACK_IMPORTED_MODULE_16__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-item-interactive', _components_annotation_AnnotationItemInteractive_AnnotationItemInteractive_vue__WEBPACK_IMPORTED_MODULE_17__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('admin-badge', _components_ui_user_AdminBadge_AdminBadge_vue__WEBPACK_IMPORTED_MODULE_18__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-self-badge', _components_ui_user_UserSelfBadge_UserSelfBadge_vue__WEBPACK_IMPORTED_MODULE_19__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('iframe-message-segment', _components_ui_IframeMessageSegment_IframeMessageSegment_vue__WEBPACK_IMPORTED_MODULE_20__["default"])

// -----------------------


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('notification-manager', _ReadingProgressesModuels_Reading_components_manager_NotificationManager_NotificationManager_vue__WEBPACK_IMPORTED_MODULE_21__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('notification-icon', _ReadingProgressesModuels_Reading_components_manager_NotificationManager_NotificationIcon_NotificationIcon_vue__WEBPACK_IMPORTED_MODULE_22__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-filter', _ReadingProgressesModuels_Reading_components_search_UserFilter_UserFilter_vue__WEBPACK_IMPORTED_MODULE_23__["default"])

// -------------------------

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('rangy', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/annotation/RangyManager/RangyManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/annotation/RangyManager/RangyManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-panel', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/annotation/AnnotationPanel/AnnotationPanel.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/annotation/AnnotationPanel/AnnotationPanel.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/annotation/AnnotationManager/AnnotationManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/annotation/AnnotationManager/AnnotationManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('section-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/annotation/SectionManager/SectionManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/annotation/SectionManager/SectionManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('search-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/search/SearchManager/SearchManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/SearchManager/SearchManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('instruction-message', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/ui/InstructionMessage/InstructionMessage.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/ui/InstructionMessage/InstructionMessage.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('compact-navigation', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/ui/CompactNavigation/CompactNavigation.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/ui/CompactNavigation/CompactNavigation.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-type-filter', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/search/AnnotationTypeFilter/AnnotationTypeFilter.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/AnnotationTypeFilter/AnnotationTypeFilter.vue")))


/***/ }),

/***/ "./webpack-app/client/local-components.js":
/*!************************************************!*\
  !*** ./webpack-app/client/local-components.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ui_modal_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/ui-modal/Loading/Loading.vue */ "./webpack-app/components/ui-modal/Loading/Loading.vue");
/* harmony import */ var _components_manager_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/manager/ErrorHandler/ErrorHandler.vue */ "./webpack-app/components/manager/ErrorHandler/ErrorHandler.vue");
/* harmony import */ var _Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Auth/Auth.vue */ "./webpack-app/client/Auth/Auth.vue");
/* harmony import */ var _Login_Login_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Login/Login.vue */ "./webpack-app/client/Login/Login.vue");
/* harmony import */ var _components_manager_StyleManager_StyleManager_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/manager/StyleManager/StyleManager.vue */ "./webpack-app/components/manager/StyleManager/StyleManager.vue");
/* harmony import */ var _components_manager_PACORTestManager_PACORTestManager_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/manager/PACORTestManager/PACORTestManager.vue */ "./webpack-app/components/manager/PACORTestManager/PACORTestManager.vue");







//import RangyManager from './components/RangyManager/RangyManager.vue'
//import NoteEditorManager from './components/NoteEditorManager/NoteEditorManager.vue'

let components = {
  Loading: _components_ui_modal_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  'error-handler': _components_manager_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  Auth: _Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  //'rangy-manager': RangyManager,
  //'note-editor-manager': NoteEditorManager,
  Login: _Login_Login_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
  StyleManager: _components_manager_StyleManager_StyleManager_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
  PACORTestManager: _components_manager_PACORTestManager_PACORTestManager_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
  //Chat: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue'),
  'CollaborativeReading': () => Promise.all(/*! import() | client-components/CollaborativeReading */[__webpack_require__.e("client-components/CollaborativeReading~client-components/FreeReading"), __webpack_require__.e("client-components/CollaborativeReading")]).then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/CollaborativeReading/CollaborativeReading.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/CollaborativeReading/CollaborativeReading.vue")),
  'IndividualReading': () => __webpack_require__.e(/*! import() | client-components/IndividualReading */ "client-components/IndividualReading").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/IndividualReading/IndividualReading.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/IndividualReading/IndividualReading.vue")),
  'PostRecall': () => __webpack_require__.e(/*! import() | client-components/Questionnaire */ "client-components/Questionnaire").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Questionnaire/PostRecall/PostRecall.vue */ "./webpack-app/client/ReadingProgressesModuels/Questionnaire/PostRecall/PostRecall.vue")),
  'PreImaginary': () => __webpack_require__.e(/*! import() | client-components/Questionnaire */ "client-components/Questionnaire").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Questionnaire/PreImaginary/PreImaginary.vue */ "./webpack-app/client/ReadingProgressesModuels/Questionnaire/PreImaginary/PreImaginary.vue")),
  'Exit': () => __webpack_require__.e(/*! import() | client-components/Exit */ "client-components/Exit").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Exit/Exit.vue */ "./webpack-app/client/ReadingProgressesModuels/Exit/Exit.vue")),
  'FreeReading': () => Promise.all(/*! import() | client-components/FreeReading */[__webpack_require__.e("client-components/CollaborativeReading~client-components/FreeReading"), __webpack_require__.e("client-components/FreeReading")]).then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/FreeReading/FreeReading.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/FreeReading/FreeReading.vue")),
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



vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('rangy', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/annotation/RangyManager/RangyManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/annotation/RangyManager/RangyManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-panel', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/annotation/AnnotationPanel/AnnotationPanel.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/annotation/AnnotationPanel/AnnotationPanel.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/annotation/AnnotationManager/AnnotationManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/annotation/AnnotationManager/AnnotationManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('section-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/annotation/SectionManager/SectionManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/annotation/SectionManager/SectionManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('search-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/search/SearchManager/SearchManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/SearchManager/SearchManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('instruction-message', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/ui/InstructionMessage/InstructionMessage.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/ui/InstructionMessage/InstructionMessage.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('compact-navigation', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/ui/CompactNavigation/CompactNavigation.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/ui/CompactNavigation/CompactNavigation.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-type-filter', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/search/AnnotationTypeFilter/AnnotationTypeFilter.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/AnnotationTypeFilter/AnnotationTypeFilter.vue")))


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
/* harmony import */ var _ReadingProgressesModuels_Reading_components_manager_NotificationManager_NotificationManager_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.vue");
/* harmony import */ var _ReadingProgressesModuels_Reading_components_manager_NotificationManager_NotificationIcon_NotificationIcon_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue");
/* harmony import */ var _ReadingProgressesModuels_Reading_components_search_UserFilter_UserFilter_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.vue");
/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */




vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('notification-manager', _ReadingProgressesModuels_Reading_components_manager_NotificationManager_NotificationManager_vue__WEBPACK_IMPORTED_MODULE_1__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('notification-icon', _ReadingProgressesModuels_Reading_components_manager_NotificationManager_NotificationIcon_NotificationIcon_vue__WEBPACK_IMPORTED_MODULE_2__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-filter', _ReadingProgressesModuels_Reading_components_search_UserFilter_UserFilter_vue__WEBPACK_IMPORTED_MODULE_3__["default"])


/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.html?vue&type=template&id=21a9a788&scoped=true&":
/*!*************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItem/AnnotationItem.html?vue&type=template&id=21a9a788&scoped=true& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItem_html_vue_type_template_id_21a9a788_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./AnnotationItem.html?vue&type=template&id=21a9a788&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.html?vue&type=template&id=21a9a788&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItem_html_vue_type_template_id_21a9a788_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItem_html_vue_type_template_id_21a9a788_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js&?15b5":
/*!*****************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./AnnotationItem.js?vue&type=script&lang=js& */ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js&?180d");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_AnnotationItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js&?180d":
/*!*****************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let AnnotationItem = {
  props: ['lib', 'status', 'config'
    , 'annotation', 'mode'
    , 'searchKeyword'
    , 'findUser', 'findType', 'findAnnotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    username () {
      let user = this.annotation.user
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    displayTime () {
      //return this.annotation.updated_at_unixms + ' ' + (new Date()).getTime()
      
      //let n = (new Date()).getTime()
      //let u = this.annotation.updated_at_unixms
      //console.log([n, u, (n - u)])
      //console.log([u])
      
      //return this.lib.DayJSHelper.toNow(this.annotation.updated_at_unixms)
      //return this.lib.DayJSHelper.fromNow(u)
      return this.lib.DayJSHelper.fromNow(this.annotation.updated_at_unixms)
    },
    computedContainerClassNames () {
      let classNames = this.mode
      if (classNames === undefined || classNames === null) {
        classNames = 'annotation-item-compact'
      }
      return classNames
    },
    note () {
      //console.log(this.annotation.notes)
      return this.annotation.notes.map(note => {
        let result = note.note
        
        let keyword = this.searchKeyword
        //if (!keyword || keyword === '') {
        //  keyword = this.status.search.keyword
        //}
        
        if (keyword && keyword !== '') {
          //result = result.split(keyword).join(`<span data-pacor-search-result>${keyword}</span>`)
          let reg = new RegExp(keyword, 'ig');
          result = result.replace(reg, (match) => {
            return `<span data-pacor-search-result>${match}</span>`
          });
        }
        
        return result
      }).join(' ')
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    onFindAnnotation (data) {
      if (typeof(this.findAnnotation) === 'function') {
        this.findAnnotation(data)
      }
    },
    onFindUser (data) {
      if (typeof(this.findUser) === 'function') {
        this.findUser(data)
      }
    },
    onFindType (data) {
      if (typeof(this.findType) === 'function') {
        this.findType(data)
      }
    },
    onClick () {
      if (this.lib.RangyManager) {
        this.lib.RangyManager.hoverIn(this.annotation)
      }
      this.$emit('click', this.annotation)
    },
    onMouseover () {
      if (this.lib.RangyManager) {
        this.lib.RangyManager.hoverIn(this.annotation)
      }
      this.$emit('mouseover', this.annotation)
    },
    onMouseout () {
      if (this.lib.RangyManager) {
        this.lib.RangyManager.hoverOut()
      }
      this.$emit('mouseout', this.annotation)
    },
    onlike: async function () {
      let data = {
        annotationID: this.annotation.id
      }
      
      let result = await this.lib.AxiosHelper.get('/client/AnnotationRate/like', data)
      
      this.$emit('like')
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (AnnotationItem);

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true&":
/*!****************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.vue":
/*!*****************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItem/AnnotationItem.vue ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationItem_html_vue_type_template_id_21a9a788_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnotationItem.html?vue&type=template&id=21a9a788&scoped=true& */ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.html?vue&type=template&id=21a9a788&scoped=true&");
/* harmony import */ var _AnnotationItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnotationItem.js?vue&type=script&lang=js& */ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js&?15b5");
/* empty/unused harmony star reexport *//* harmony import */ var _AnnotationItem_less_vue_type_style_index_0_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true& */ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=21a9a788&lang=less&scoped=true&");
/* harmony import */ var _AnnotationItem_note_less_vue_type_style_index_1_id_21a9a788_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true& */ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=21a9a788&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml */ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _AnnotationItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AnnotationItem_html_vue_type_template_id_21a9a788_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AnnotationItem_html_vue_type_template_id_21a9a788_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "21a9a788",
  null
  
)

/* custom blocks */

if (typeof _AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__["default"] === 'function') Object(_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/annotation/AnnotationItem/AnnotationItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/annotation/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=6ce3bf7e&scoped=true&":
/*!***********************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=6ce3bf7e&scoped=true& ***!
  \***********************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItemInteractive_html_vue_type_template_id_6ce3bf7e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./AnnotationItemInteractive.html?vue&type=template&id=6ce3bf7e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=6ce3bf7e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItemInteractive_html_vue_type_template_id_6ce3bf7e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItemInteractive_html_vue_type_template_id_6ce3bf7e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js&?689f":
/*!***************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* global this */

let AnnotationInteractive = {
  props: ['lib', 'status', 'config'
    , 'annotation', 'size', 'showLabel', 'enableComment'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    if (!this.annotation.__meta__) {
      this.annotation.__meta__ = {}
    }
    
    return {
    }
  },
//  components: {
//  },
  computed: {
    computedLikesButtonClass () {
      let classList = []
      if (!this.enableLike) {
        classList.push('disabled')
      }
      if (this.i_have_liked) {
        classList.push('green')
      }
      
      if (typeof(this.size) === 'string') {
        classList.push(this.size)
      }
      
      if (this.likes === 0) {
        classList.push('icon')
      }
      else {
        classList.push('with-count')
      }
      
      return classList.join(' ')
    },
    computedCommentsButtonClass () {
      let classList = []
      
      if (this.i_have_commented) {
        classList.push('green')
      }
      if (typeof(this.size) === 'string') {
        classList.push(this.size)
      }
      
      if (this.comments === 0) {
        classList.push('icon')
      }
      else {
        classList.push('with-count')
      }
      
      return classList.join(' ')
    },
    enableLike () {
      return (this.annotation.user_id !== this.status.userID)
    },
    likes () {
      if (this.annotation 
              && this.annotation.__meta__
              && typeof(this.annotation.__meta__.likes_count) !== 'undefined') {
        return parseInt(this.annotation.__meta__.likes_count, 10)
      }
      else {
        return 0
      }
    },
    comments () {
      //console.log(this.annotation.__meta__.comments_count)
      if (this.annotation 
              && this.annotation.__meta__
              && typeof(this.annotation.__meta__.comments_count) !== 'undefined') {
        return parseInt(this.annotation.__meta__.comments_count, 10)
      }
      else {
        return 0
      }
    },
    i_have_liked () {
      return (this.annotation.__meta__.i_have_liked_count === 1
              || this.annotation.__meta__.i_have_liked_count === '1')
    },
    i_have_commented () {
      let count = this.annotation.__meta__.i_have_commented_count
      if (typeof(count) === 'string'
              && isNaN(count) === false) {
        count = parseInt(count, 10)
      }
      
      if (typeof(count) === 'number') {
        return (count > 0)
      }
      else {
        return false
      }
    },
    isNotMe () {
      return (this.annotation.user_id !== this.status.userID)
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    like: async function () {
      //console.log(this.annotation)
      //console.log(this.i_have_liked)
      if (this.i_have_liked) {
        this.annotation.__meta__.i_have_liked_count = 0
        this.annotation.__meta__.likes_count--
        this.$emit('unlike')
      }
      else {
        this.annotation.__meta__.i_have_liked_count = 1
        this.annotation.__meta__.likes_count++
        this.$emit('like')
      }
    },
    comment: async function () {
      this.$emit('comment')
    },
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (AnnotationInteractive);

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js&?b55e":
/*!***************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationItemInteractive_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./AnnotationItemInteractive.js?vue&type=script&lang=js& */ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js&?689f");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_AnnotationItemInteractive_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_6ce3bf7e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_6ce3bf7e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_6ce3bf7e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_6ce3bf7e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_6ce3bf7e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_6ce3bf7e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue":
/*!***************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationItemInteractive_html_vue_type_template_id_6ce3bf7e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnotationItemInteractive.html?vue&type=template&id=6ce3bf7e&scoped=true& */ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=6ce3bf7e&scoped=true&");
/* harmony import */ var _AnnotationItemInteractive_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnotationItemInteractive.js?vue&type=script&lang=js& */ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js&?b55e");
/* empty/unused harmony star reexport *//* harmony import */ var _AnnotationItemInteractive_less_vue_type_style_index_0_id_6ce3bf7e_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true& */ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=6ce3bf7e&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml */ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AnnotationItemInteractive_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AnnotationItemInteractive_html_vue_type_template_id_6ce3bf7e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AnnotationItemInteractive_html_vue_type_template_id_6ce3bf7e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6ce3bf7e",
  null
  
)

/* custom blocks */

if (typeof _AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=75d99c9c&scoped=true&":
/*!*************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=75d99c9c&scoped=true& ***!
  \*************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationTypeButton_html_vue_type_template_id_75d99c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./AnnotationTypeButton.html?vue&type=template&id=75d99c9c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=75d99c9c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationTypeButton_html_vue_type_template_id_75d99c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationTypeButton_html_vue_type_template_id_75d99c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js&?4472":
/*!*****************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let AnnotationTypeButton = {
  props: ['status', 'type', 'count', 'clickable'],
  data() {
    return {
    }
  },
  computed: {
    typeName () {
      if (!this.type) {
        return this.$t('All')
      }
      return this.$t('ANNOTATION_TYPE.' + this.type)
    },
    computedStyle () {
      if (!this.type) {
        return null
      }
      
      //console.log(this.annotationModule)
      let color
      let backgroundColor
      
      if (typeof(this.status.readingConfig.annotationTypeModules[this.type]) !== 'undefined') {
        ({color, backgroundColor} = this.status.readingConfig.annotationTypeModules[this.type].style.button)
      }
      let style = {
        color,
        backgroundColor,
        cursor: 'default'
      }
      
      if (this.clickable !== false) {
        style.cursor = 'pointer'
      }
      
      return style
    },
    computedClass () {
      if (!this.type) {
        return 'inverted active'
      }
    }
  },
  /*
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
   */
}

/* harmony default export */ __webpack_exports__["default"] = (AnnotationTypeButton);

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js&?7f90":
/*!*****************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationTypeButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./AnnotationTypeButton.js?vue&type=script&lang=js& */ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js&?4472");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_AnnotationTypeButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true&":
/*!****************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_75d99c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_75d99c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_75d99c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_75d99c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_75d99c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_75d99c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue":
/*!*****************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationTypeButton_html_vue_type_template_id_75d99c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnotationTypeButton.html?vue&type=template&id=75d99c9c&scoped=true& */ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=75d99c9c&scoped=true&");
/* harmony import */ var _AnnotationTypeButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnotationTypeButton.js?vue&type=script&lang=js& */ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js&?7f90");
/* empty/unused harmony star reexport *//* harmony import */ var _AnnotationTypeButton_less_vue_type_style_index_0_id_75d99c9c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true& */ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=75d99c9c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml */ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AnnotationTypeButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AnnotationTypeButton_html_vue_type_template_id_75d99c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AnnotationTypeButton_html_vue_type_template_id_75d99c9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "75d99c9c",
  null
  
)

/* custom blocks */

if (typeof _AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/annotation/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cannotation%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cannotation_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.html?vue&type=template&id=25440a89&":
/*!*****************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.html?vue&type=template&id=25440a89& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ActivityTimer_html_vue_type_template_id_25440a89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ActivityTimer.html?vue&type=template&id=25440a89& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.html?vue&type=template&id=25440a89&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ActivityTimer_html_vue_type_template_id_25440a89___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ActivityTimer_html_vue_type_template_id_25440a89___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js&?2ecb":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActivityTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ActivityTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js&?a3ec");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ActivityTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js&?a3ec":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let acted = false
let lastTime
let checkActed = function () {
  if (acted === false) {
    acted = true
    lastTime = (new Date()).getTime()
  }
}

let ActivityTimer = {
  props: ['config', 'lib'],
  data() {
    return {
      timer: null,
      lastTime: null,
      enable: true
    }
  },
  created() {
    let document = window.document
    document.addEventListener('mousemove', checkActed)
    document.addEventListener('keyup', checkActed)
    document.addEventListener('touchend', checkActed)
    
    this.timer = setTimeout(() => {
      this.send()
    }, this.seconds * 1000)
  },
  computed: {
    seconds () {
      return this.config.detectActivitySeconds
    }
  },
  destroyed: async function () {
    clearInterval(this.timer)
    
    this.send()
  },
  methods: {
    toNow: function () {
      return Math.round(((new Date()).getTime() - lastTime) / 1000)
    },
    send: async function () {
      if (this.enable === false) {
        // 已經發生錯誤了，就不要再送出了
        return null
      }
      //this.lib.auth.logout()
      //return
      
      if (acted === true) {
        await this.lib.AxiosHelper.get('/client/ReadingProgress/activityTimer', {
          seconds: this.toNow()
        }, (error) => {
          this.enable = false
          if (this.lib.TestManager.isTesting === true) {
            console.error('Get error from server: ' + error)
            return null
          }
          
          console.error('Get error from server, force logout: ' + error)
          this.lib.auth.logout()
        })
        acted = false
        this.timer = setTimeout(() => {
          this.send()
        }, this.seconds * 1000)
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ActivityTimer);

/***/ }),

/***/ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.vue":
/*!*********************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.vue ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActivityTimer_html_vue_type_template_id_25440a89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivityTimer.html?vue&type=template&id=25440a89& */ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.html?vue&type=template&id=25440a89&");
/* harmony import */ var _ActivityTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActivityTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js&?2ecb");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActivityTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActivityTimer_html_vue_type_template_id_25440a89___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ActivityTimer_html_vue_type_template_id_25440a89___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/reading-progress/ActivityTimer/ActivityTimer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/reading-progress/BlockExit/BlockExit.html?vue&type=template&id=9febab1a&":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/BlockExit/BlockExit.html?vue&type=template&id=9febab1a& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_BlockExit_html_vue_type_template_id_9febab1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./BlockExit.html?vue&type=template&id=9febab1a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/BlockExit/BlockExit.html?vue&type=template&id=9febab1a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_BlockExit_html_vue_type_template_id_9febab1a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_BlockExit_html_vue_type_template_id_9febab1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/reading-progress/BlockExit/BlockExit.js?vue&type=script&lang=js&?7b00":
/*!*************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/BlockExit/BlockExit.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BlockExit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./BlockExit.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/BlockExit/BlockExit.js?vue&type=script&lang=js&?807d");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_BlockExit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/BlockExit/BlockExit.js?vue&type=script&lang=js&?807d":
/*!*************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/BlockExit/BlockExit.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let listener = function (event) {
  //var message = 'Important: Please click on \'Save\' button to leave this page.';
  /*
  if (typeof (event) === 'undefined') {
    event = window.event
  }
  if (event) {
    event.returnValue = message
  }
  return message
  */
  event.returnValue = ''
}

let BlockExit = {
  data() {
    return {
    }
  },
  created: function () {
    //return // for test
    window.addEventListener('beforeunload', listener, true)
  },
  destroyed: function () {
    window.removeEventListener('beforeunload', listener, true)
    //console.log('destroyed')
  }
}

/* harmony default export */ __webpack_exports__["default"] = (BlockExit);

/***/ }),

/***/ "./webpack-app/components/reading-progress/BlockExit/BlockExit.vue":
/*!*************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/BlockExit/BlockExit.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BlockExit_html_vue_type_template_id_9febab1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockExit.html?vue&type=template&id=9febab1a& */ "./webpack-app/components/reading-progress/BlockExit/BlockExit.html?vue&type=template&id=9febab1a&");
/* harmony import */ var _BlockExit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BlockExit.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/BlockExit/BlockExit.js?vue&type=script&lang=js&?7b00");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CBlockExit%5CBlockExit.vue&lang=yaml */ "./webpack-app/components/reading-progress/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CBlockExit%5CBlockExit.vue&lang=yaml");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BlockExit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BlockExit_html_vue_type_template_id_9febab1a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BlockExit_html_vue_type_template_id_9febab1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* custom blocks */

if (typeof _BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_3__["default"] === 'function') Object(_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_3__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/reading-progress/BlockExit/BlockExit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/reading-progress/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CBlockExit%5CBlockExit.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CBlockExit%5CBlockExit.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CBlockExit%5CBlockExit.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CBlockExit%5CBlockExit.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/Clock/Clock.html?vue&type=template&id=4ac8668e&":
/*!*************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/Clock/Clock.html?vue&type=template&id=4ac8668e& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Clock_html_vue_type_template_id_4ac8668e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Clock.html?vue&type=template&id=4ac8668e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/Clock/Clock.html?vue&type=template&id=4ac8668e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Clock_html_vue_type_template_id_4ac8668e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Clock_html_vue_type_template_id_4ac8668e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/reading-progress/Clock/Clock.js?vue&type=script&lang=js&?6ce4":
/*!*****************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/Clock/Clock.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Clock_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Clock.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/Clock/Clock.js?vue&type=script&lang=js&?8b9f");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Clock_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/Clock/Clock.js?vue&type=script&lang=js&?8b9f":
/*!*****************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/Clock/Clock.js?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let Clock = {
  data() {
    return {
      hour: 0,
      minute: 0
    }
  },
  mounted() {
    this.refreshClock()
  },
  methods: {
    refreshClock () {
      let d = new Date()
      
      let h = d.getHours()
      if (h < 10) {
        h = '0' + h
      }
      this.hour = h
      
      let m = d.getMinutes()
      if (m < 10) {
        m = '0' + m
      }
      this.minute = m
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Clock);

/***/ }),

/***/ "./webpack-app/components/reading-progress/Clock/Clock.vue":
/*!*****************************************************************!*\
  !*** ./webpack-app/components/reading-progress/Clock/Clock.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Clock_html_vue_type_template_id_4ac8668e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clock.html?vue&type=template&id=4ac8668e& */ "./webpack-app/components/reading-progress/Clock/Clock.html?vue&type=template&id=4ac8668e&");
/* harmony import */ var _Clock_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Clock.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/Clock/Clock.js?vue&type=script&lang=js&?6ce4");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Clock_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Clock_html_vue_type_template_id_4ac8668e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Clock_html_vue_type_template_id_4ac8668e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/reading-progress/Clock/Clock.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.html?vue&type=template&id=7cf92a63&scoped=true&":
/*!*********************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/CountdownButton/CountdownButton.html?vue&type=template&id=7cf92a63&scoped=true& ***!
  \*********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CountdownButton_html_vue_type_template_id_7cf92a63_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./CountdownButton.html?vue&type=template&id=7cf92a63&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.html?vue&type=template&id=7cf92a63&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CountdownButton_html_vue_type_template_id_7cf92a63_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CountdownButton_html_vue_type_template_id_7cf92a63_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.js?vue&type=script&lang=js&?33d8":
/*!*************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/CountdownButton/CountdownButton.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let debugDisable = false
if (debugDisable === true) {
  console.log('@test debugDisable')
}


let CountdownButton = {
  props: ['locale', 'lib', 'countdownSec'
    , 'minWordCount', 'maxWordCount', 'text', 'ignoreWordCount'
    , 'enableClassNames', 'enable'
    , 'autoClickSeconds'],
  data() {    
    this.$i18n.locale = this.locale
    
    let autoClickRemainingSeconds = 0
    if (this.autoClickSeconds) {
      autoClickRemainingSeconds = this.autoClickSeconds
    }
    
    return {
      remainingSeconds: 0,
      autoClickRemainingSeconds
    }
  },
  computed: {
    computedClassName () {
      if (this.isEnable === false) {
        return 'disabled'
      }
      else if (typeof(this.enableClassNames) === 'string') {
        return this.enableClassNames
      }
    },
    wordCount () {
      let count = this.lib.StringHelper.countWords(this.text)
      //console.log(count)
      return count
    },
    validWordCount () {
      if (typeof(this.minWordCount) !== 'number'
              && typeof(this.maxWordCount) !== 'number') {
        return true
      }
      
      let wordCount = this.wordCount
      if (typeof(this.minWordCount) === 'number'
              && wordCount < this.minWordCount) {
        return false
      }
      if (typeof(this.maxWordCount) === 'number'
              && wordCount > this.maxWordCount) {
        return false
      }
      return true
    },
    isEnable () {
      if (this.enable === false) {
        return false
      }
      else if (this.ignoreWordCount === true) {
        return (this.remainingSeconds === 0)
      }
      else {
        //console.log(this.remainingSeconds, this.validWordCount, this.wordCount)
        return (this.remainingSeconds === 0 && this.validWordCount === true)
      }
    },
    disabledMessage () {
      let messages = []
      //console.log(this.remainingSeconds)
      if (this.remainingSeconds > 0) {
        let remainingTime = this.lib.DayJSHelper.formatHHMMSS(this.remainingSeconds)
        if (this.remainingSeconds <= 60) {
          remainingTime = this.$t('{0} sec', [this.remainingSeconds])
        }
        //console.log(remainingTime)
        messages.push( this.$t('Remaining Time: {0}', [remainingTime]) )
      }
      
      let wordCount = this.wordCount
      if (typeof(this.minWordCount) === 'number'
              && wordCount < this.minWordCount) {
        let interval = this.minWordCount - wordCount
        messages.push( this.$t('You still need to write {0} words more', [interval]) )
      }
      else if (typeof(this.maxWordCount) === 'number'
              && wordCount > this.maxWordCount) {
        let interval = wordCount - this.maxWordCount
        messages.push( this.$t('You still need to delete {0} words more', [interval]) )
      }
      
      return messages.join(' / ')
    }
  },
  watch: {
    countdownSec (countdownSec) {
      if (typeof(countdownSec) === 'number') {
        this._initCountdown()
      }
    },
  },
//  mounted () {
//    
//    //console.log(this.countdownSec)
//    
//  },
  methods: {
    _initCountdown() {
      if (typeof(this.countdownSec) !== 'number'
              || this.countdownSec <= 0) {
        return false
      }
      this.remainingSeconds = this.countdownSec
      //console.log(this.remainingSeconds)
      
      if (debugDisable === true) {
        return null
      }
      
      this.countdown()
    },
    countdown () {
      //console.log('AAA')
      setTimeout(() => {
        //console.log(this.remainingSeconds)
        this.remainingSeconds = this.remainingSeconds - 1
        if (this.remainingSeconds > 0) {
          this.countdown()
        }
        else {
          //console.log('等於0了')
          this.$emit('timeup')
          if (typeof(this.autoClickSeconds) === 'number') {
            this.autoClickCountdown()
          }
        }
      }, 1000)
    },
    autoClickCountdown () {
      setTimeout(() => {
        this.autoClickRemainingSeconds--
        
        if (this.autoClickRemainingSeconds > 0) {
          this.autoClickCountdown()
        }
        else {
          this.onClick()
        }
      }, 1000)
    },
    onClick () {
      if (!this.isEnable) {
        return null
      }
      this.$emit('click')
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (CountdownButton);

/***/ }),

/***/ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.js?vue&type=script&lang=js&?bdd9":
/*!*************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/CountdownButton/CountdownButton.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountdownButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./CountdownButton.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.js?vue&type=script&lang=js&?33d8");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_CountdownButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true&":
/*!************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_7cf92a63_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_7cf92a63_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_7cf92a63_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_7cf92a63_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_7cf92a63_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_7cf92a63_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.vue":
/*!*************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/CountdownButton/CountdownButton.vue ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountdownButton_html_vue_type_template_id_7cf92a63_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountdownButton.html?vue&type=template&id=7cf92a63&scoped=true& */ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.html?vue&type=template&id=7cf92a63&scoped=true&");
/* harmony import */ var _CountdownButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountdownButton.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.js?vue&type=script&lang=js&?bdd9");
/* empty/unused harmony star reexport *//* harmony import */ var _CountdownButton_less_vue_type_style_index_0_id_7cf92a63_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true& */ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=7cf92a63&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CCountdownButton%5CCountdownButton.vue&lang=yaml */ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CCountdownButton%5CCountdownButton.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CountdownButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CountdownButton_html_vue_type_template_id_7cf92a63_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CountdownButton_html_vue_type_template_id_7cf92a63_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7cf92a63",
  null
  
)

/* custom blocks */

if (typeof _CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/reading-progress/CountdownButton/CountdownButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/reading-progress/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CCountdownButton%5CCountdownButton.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CCountdownButton%5CCountdownButton.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CCountdownButton%5CCountdownButton.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CCountdownButton%5CCountdownButton.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=2b3215b5&scoped=true&":
/*!*********************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=2b3215b5&scoped=true& ***!
  \*********************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_DigitalCountdownTimer_html_vue_type_template_id_2b3215b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./DigitalCountdownTimer.html?vue&type=template&id=2b3215b5&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=2b3215b5&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_DigitalCountdownTimer_html_vue_type_template_id_2b3215b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_DigitalCountdownTimer_html_vue_type_template_id_2b3215b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js&?2d50":
/*!*************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DigitalCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./DigitalCountdownTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js&?7e5a");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_DigitalCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js&?7e5a":
/*!*************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\jquery\\dist\\jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


let debugDisable = false
if (debugDisable === true) {
  console.log('@test degubDisable')
}

let DigitalCountdownTimer = {
  props: ['lib', 'config'
    , 'remainingSeconds', 'pauseAtStart'],
  data() {
    //console.log(this.remainingSeconds)
    this.$i18n.locale = this.config.locale
    let dataRemainingSec = 0
    if (this.remainingSeconds) {
      dataRemainingSec = this.remainingSeconds
    }
    
    return {
      dataRemainingSec: dataRemainingSec,
      dataPause: this.pauseAtStart,
      timerEle: null,
      isEnableGlow: false
    }
  },
  computed: {
    dataRemainingTime () {
      return this.lib.DayJSHelper.formatHHMMSS(this.dataRemainingSec)
    },
    dataMinutes () {
      if (this.dataRemainingSec < 60) {
        return null
      }
      let minutes = Math.floor(this.dataRemainingSec / 60)
      if (minutes > 99) {
        minutes = 99
      }
      return minutes
    },
    dataSeconds () {
      let sec = this.dataRemainingSec % 60
      if (this.dataRemainingSec > 10 && sec < 10) {
        sec = '0' + sec
      }
      else {
        sec = '' + sec
      }
      return sec
    },
    computedMinutesClassList () {
      let classList = []
      if (this.dataMinutes === null) {
        classList.push('hidden')
      }
      else if (this.dataMinutes >= 10) {
        classList.push('two')
      }
      
      if (this.isEnableGlow) {
        classList.push('glow')
      }
      
      return classList.join(' ')
    },
    computedSecondsClassList () {
      let classList = []
      
      if (this.dataSeconds.length === 2) {
        classList.push('two')
      }
      
      if (this.isEnableGlow) {
        classList.push('glow')
      }
      
      return classList.join(' ')
    },
//    isEnableGlow () {
//      return (this.dataRemainingSec === 60
//              || this.dataRemainingSec === 30
//              || this.dataRemainingSec <= 10)
//    },
    computedMinutesColonClassList () {
      if (this.dataMinutes === null) {
        return 'colon-hidden'
      }
    }
  },
  watch: {
    remainingSeconds (remainingSec) {
      this.dataRemainingSec = remainingSec
    },
    pauseAtStart (pause) {
      this.dataPause = pause
    }
  },
  mounted() {
    if (!this.timerEle) {
      this.timerEle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$refs.timer).find('.minutes,.seconds')
    }
    
    this.start()
  },
  methods: {
    start: function () {
      
      if (!this.dataRemainingSec) {
        //this.dataRemainingSec = await this.lib.AxiosHelper.get('/client/ReadingProgress/getRemainingSeconds')
        this.dataRemainingSec = this.lib.auth.getRemainingSeconds()
      }
      
      if ((this.dataRemainingSec === 60
              || this.dataRemainingSec === 30
              || this.dataRemainingSec <= 10)) {
        this.isEnableGlow = true
        setTimeout(() => {
          this.isEnableGlow = false
        }, 700)
      }
      
      if (debugDisable === true) {
        return null
      }
      
      if (this.dataPause === true) {
        return null
      }
      
      setTimeout(() => {
        this.dataRemainingSec--
        
        if (this.dataRemainingSec > 0) {
          this.start()
        }
        else {
          this.timeup()
        }
      }, 1000)
    },
    timeup () {
      this.$emit('timeup')
    },
    pause () {
      this.dataPause = true
    },
    resume () {
      this.dataPause = false
      this.start()
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (DigitalCountdownTimer);

/***/ }),

/***/ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true&":
/*!************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_2b3215b5_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_2b3215b5_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_2b3215b5_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_2b3215b5_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_2b3215b5_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_2b3215b5_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue":
/*!*************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DigitalCountdownTimer_html_vue_type_template_id_2b3215b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DigitalCountdownTimer.html?vue&type=template&id=2b3215b5&scoped=true& */ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=2b3215b5&scoped=true&");
/* harmony import */ var _DigitalCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DigitalCountdownTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js&?2d50");
/* empty/unused harmony star reexport *//* harmony import */ var _DigitalCountdownTimer_less_vue_type_style_index_0_id_2b3215b5_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true& */ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=2b3215b5&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml */ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DigitalCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DigitalCountdownTimer_html_vue_type_template_id_2b3215b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DigitalCountdownTimer_html_vue_type_template_id_2b3215b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2b3215b5",
  null
  
)

/* custom blocks */

if (typeof _DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/DigitalCountdownTimer/fonts/digital-7.ttf":
/*!*******************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/DigitalCountdownTimer/fonts/digital-7.ttf ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "http://127.0.0.1:3333/spa/asset/digital-7.ttf";

/***/ }),

/***/ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=62c3709b&scoped=true&":
/*!*******************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=62c3709b&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_SimpleCountdownTimer_html_vue_type_template_id_62c3709b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./SimpleCountdownTimer.html?vue&type=template&id=62c3709b&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=62c3709b&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_SimpleCountdownTimer_html_vue_type_template_id_62c3709b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_SimpleCountdownTimer_html_vue_type_template_id_62c3709b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js&?36a9":
/*!***********************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SimpleCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./SimpleCountdownTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js&?ef33");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_SimpleCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js&?ef33":
/*!***********************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let CountdownTimer = {
  props: ['lib', 'config'
    , 'remainingSeconds', 'pauseAtStart'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      dataRemainingSec: this.remainingSeconds,
      dataPause: this.pauseAtStart
    }
  },
  computed: {
    dataRemainingTime () {
      return this.lib.DayJSHelper.formatHHMMSS(this.dataRemainingSec)
    }
  },
  watch: {
    remainingSeconds (remainingSec) {
      this.dataRemainingSec = remainingSec
    },
    pauseAtStart (pause) {
      this.dataPause = pause
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    start: function () {
      if (!this.dataRemainingSec) {
        //this.dataRemainingSec = await this.lib.AxiosHelper.get('/client/ReadingProgress/getRemainingSeconds')
        this.dataRemainingSec = this.lib.auth.getRemainingSeconds()
      }
      
      //console.log(this.pauseAtStart)
      if (this.dataPause === true) {
        return null
      }
      setTimeout(() => {
        this.dataRemainingSec--
        
        if (this.dataRemainingSec > 0) {
          this.start()
        }
        else {
          this.timeup()
        }
      }, 1000)
    },
    timeup () {
      //console.log('timeup')
      this.$emit('timeup')
    },
    pause () {
      this.dataPause = true
    },
    resume () {
      this.dataPause = false
      this.start()
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (CountdownTimer);

/***/ }),

/***/ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_62c3709b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_62c3709b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_62c3709b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_62c3709b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_62c3709b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_62c3709b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue":
/*!***********************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SimpleCountdownTimer_html_vue_type_template_id_62c3709b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SimpleCountdownTimer.html?vue&type=template&id=62c3709b&scoped=true& */ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=62c3709b&scoped=true&");
/* harmony import */ var _SimpleCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SimpleCountdownTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js&?36a9");
/* empty/unused harmony star reexport *//* harmony import */ var _SimpleCountdownTimer_less_vue_type_style_index_0_id_62c3709b_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true& */ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=62c3709b&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml */ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SimpleCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SimpleCountdownTimer_html_vue_type_template_id_62c3709b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SimpleCountdownTimer_html_vue_type_template_id_62c3709b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "62c3709b",
  null
  
)

/* custom blocks */

if (typeof _SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Creading-progress%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Creading_progress_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.html?vue&type=template&id=d771c0a4&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-button/ValidationButton/ValidationButton.html?vue&type=template&id=d771c0a4&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ValidationButton_html_vue_type_template_id_d771c0a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ValidationButton.html?vue&type=template&id=d771c0a4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-button/ValidationButton/ValidationButton.html?vue&type=template&id=d771c0a4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ValidationButton_html_vue_type_template_id_d771c0a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ValidationButton_html_vue_type_template_id_d771c0a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.js?vue&type=script&lang=js&?7502":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/components/ui-button/ValidationButton/ValidationButton.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let ValidationButton = {
  props: ['locale', 'lib', 'countdownSec'
    , 'minWordCount', 'maxWordCount', 'text', 'ignoreWordCount'
    , 'color', 'enable'
    , 'rightLabeledIcon', 'leftLabeledIcon'],
  data() {    
    this.$i18n.locale = this.locale
    return {
      remainingSeconds: 0,
      await: false
    }
  },
  computed: {
    computedClassName () {
      //return 'await disabled' // for test
      
      if (this.isEnable === false) {
        return 'disabled'
      }
      
      let classList = []
      if (typeof(this.color) === 'string') {
        classList.push(this.color)
      }
      if (this.leftLabeledIcon) {
        classList.push('labeled icon button')
      }
      if (this.rightLabeledIcon) {
        classList.push('right labeled icon button')
      }
      if (this.await) {
        classList.push('await disabled')
      }
      
      return classList.join(' ')
    },
    wordCount () {
      let text = this.text
      
      //console.log('before htmlToText', text)
      text = this.lib.StringHelper.htmlToText(text, true)
      //console.log('before removePunctuations', text)
      text = this.lib.StringHelper.removePunctuations(text)
      //text = this.lib.StringHelper.removeSpaces(text)
      //console.log('countWords', text)
      let count = this.lib.StringHelper.countWords(text)
      //console.log({count})
      return count
    },
    validWordCount () {
      if (typeof(this.minWordCount) !== 'number'
              && typeof(this.maxWordCount) !== 'number') {
        return true
      }
      
      let wordCount = this.wordCount
      if (typeof(this.minWordCount) === 'number'
              && wordCount < this.minWordCount) {
        return false
      }
      if (typeof(this.maxWordCount) === 'number'
              && wordCount > this.maxWordCount) {
        return false
      }
      return true
    },
    isEnable () {
      if (this.enable === false) {
        return false
      }
      if (this.ignoreWordCount === true) {
        return (this.remainingSeconds === 0)
      }
      else {
        //console.log(this.remainingSeconds, this.validWordCount, this.wordCount)
        return (this.remainingSeconds === 0 && this.validWordCount === true)
      }
    },
    disabledMessage () {
      let messages = []
      //console.log(this.remainingSeconds)
      if (this.remainingSeconds > 0) {
        let remainingTime = this.lib.DayJSHelper.formatHHMMSS(this.remainingSeconds)
        if (this.remainingSeconds <= 60) {
          remainingTime = this.$t('{0} sec', [this.remainingSeconds])
        }
        //console.log(remainingTime)
        messages.push( this.$t('Remaining Time: {0}', [remainingTime]) )
      }
      
      let wordCount = this.wordCount
      if (typeof(this.minWordCount) === 'number'
              && wordCount < this.minWordCount) {
        let interval = this.minWordCount - wordCount
        messages.push( this.$t('You still need to write {0} words more', [interval]) )
      }
      else if (typeof(this.maxWordCount) === 'number'
              && wordCount > this.maxWordCount) {
        let interval = wordCount - this.maxWordCount
        messages.push( this.$t('You still need to delete {0} words more', [interval]) )
      }
      
      return messages.join(' / ')
    },
    hasLabeledIcon () {
      return !(this.leftLabeledIcon === null 
              && this.rightLabeledIcon === null)
    },
    computedLeftLabeledIcon () {
      if (this.await === true) {
        return 'hourglass icon'
      }
      else {
        return this.leftLabeledIcon
      }
    },
    computedRightLabeledIcon () {
      if (this.await === true) {
        return 'hourglass icon'
      }
      else {
        return this.rightLabeledIcon
      }
    }
  },
  watch: {
    countdownSec (countdownSec) {
      if (typeof(countdownSec) === 'number') {
        this._initCountdown()
      }
    },
    text () {
      this.await = false
    }
  },
//  mounted () {
//    
//    //console.log(this.countdownSec)
//    
//  },
  methods: {
    _initCountdown() {
      if (typeof(this.countdownSec) !== 'number'
              || this.countdownSec <= 0) {
        return false
      }
      this.remainingSeconds = this.countdownSec
      //console.log(this.remainingSeconds)
      this.countdown()
    },
    countdown () {
      //console.log('AAA')
      setTimeout(() => {
        //console.log(this.remainingSeconds)
        this.remainingSeconds = this.remainingSeconds - 1
        if (this.remainingSeconds > 0) {
          this.countdown()
        }
      }, 1000)
    },
    onclick () {
      this.await = true
      //return  // for test
      this.$emit('click')
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ValidationButton);

/***/ }),

/***/ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.js?vue&type=script&lang=js&?98f3":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/components/ui-button/ValidationButton/ValidationButton.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ValidationButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ValidationButton.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.js?vue&type=script&lang=js&?7502");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ValidationButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_d771c0a4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_d771c0a4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_d771c0a4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_d771c0a4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_d771c0a4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_d771c0a4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.vue":
/*!********************************************************************************!*\
  !*** ./webpack-app/components/ui-button/ValidationButton/ValidationButton.vue ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ValidationButton_html_vue_type_template_id_d771c0a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationButton.html?vue&type=template&id=d771c0a4&scoped=true& */ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.html?vue&type=template&id=d771c0a4&scoped=true&");
/* harmony import */ var _ValidationButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ValidationButton.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.js?vue&type=script&lang=js&?98f3");
/* empty/unused harmony star reexport *//* harmony import */ var _ValidationButton_less_vue_type_style_index_0_id_d771c0a4_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true& */ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=d771c0a4&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-button%5CValidationButton%5CValidationButton.vue&lang=yaml */ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-button%5CValidationButton%5CValidationButton.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ValidationButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ValidationButton_html_vue_type_template_id_d771c0a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ValidationButton_html_vue_type_template_id_d771c0a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d771c0a4",
  null
  
)

/* custom blocks */

if (typeof _ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui-button/ValidationButton/ValidationButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ui-button/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-button%5CValidationButton%5CValidationButton.vue&lang=yaml":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-button/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-button%5CValidationButton%5CValidationButton.vue&lang=yaml ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-button%5CValidationButton%5CValidationButton.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-button/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-button%5CValidationButton%5CValidationButton.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_button_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.html?vue&type=template&id=74f24961&scoped=true&":
/*!*******************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.html?vue&type=template&id=74f24961&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ConfirmModal_html_vue_type_template_id_74f24961_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ConfirmModal.html?vue&type=template&id=74f24961&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.html?vue&type=template&id=74f24961&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ConfirmModal_html_vue_type_template_id_74f24961_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ConfirmModal_html_vue_type_template_id_74f24961_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js&?00e0":
/*!***********************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let ConfirmModel = {
  props: ['lib', 'status', 'config'
    , 'icon', 'title', 'message'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      modal: null
    }
  },
//  components: {
//  },
  computed: {
    computedActionsClassList () {
      if (this.isLeftHanded) {
        return 'left-handed'
      }
    },
    isLeftHanded () {
      return this.status.preference.leftHanded
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    show: function () {
      return new Promise((resolve, reject) => {
        if (!this.modal) {
          this.modal = $(this.$refs.modal)
        }
        
        let hasBeenReturned = false
        this.modal.modal({
            onHide () {
              if (hasBeenReturned === false) {
                resolve(false)
              }
            },
            onApprove () {
              resolve(true)
              hasBeenReturned = true
              //console.log('onApprove', result)
            },
            onDeny () {
              resolve(false)
              hasBeenReturned = true
              //console.log('onDeny', result)
            },
          }).modal('show')
      })
    },
    hide () {
      this.modal('hide')
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (ConfirmModel);

/***/ }),

/***/ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js&?17ca":
/*!***********************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConfirmModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ConfirmModal.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js&?00e0");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ConfirmModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true&":
/*!**********************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_74f24961_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_74f24961_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_74f24961_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_74f24961_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_74f24961_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_74f24961_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.vue":
/*!***********************************************************************!*\
  !*** ./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConfirmModal_html_vue_type_template_id_74f24961_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfirmModal.html?vue&type=template&id=74f24961&scoped=true& */ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.html?vue&type=template&id=74f24961&scoped=true&");
/* harmony import */ var _ConfirmModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfirmModal.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js&?17ca");
/* empty/unused harmony star reexport *//* harmony import */ var _ConfirmModal_less_vue_type_style_index_0_id_74f24961_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true& */ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=74f24961&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CConfirmModal%5CConfirmModal.vue&lang=yaml */ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CConfirmModal%5CConfirmModal.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ConfirmModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ConfirmModal_html_vue_type_template_id_74f24961_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ConfirmModal_html_vue_type_template_id_74f24961_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "74f24961",
  null
  
)

/* custom blocks */

if (typeof _ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CConfirmModal%5CConfirmModal.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CConfirmModal%5CConfirmModal.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CConfirmModal%5CConfirmModal.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-modal/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-modal%5CConfirmModal%5CConfirmModal.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_modal_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.html?vue&type=template&id=c05ac432&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/AdminBadge/AdminBadge.html?vue&type=template&id=c05ac432&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AdminBadge_html_vue_type_template_id_c05ac432_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./AdminBadge.html?vue&type=template&id=c05ac432&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-user/AdminBadge/AdminBadge.html?vue&type=template&id=c05ac432&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AdminBadge_html_vue_type_template_id_c05ac432_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AdminBadge_html_vue_type_template_id_c05ac432_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.js?vue&type=script&lang=js&?1044":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/AdminBadge/AdminBadge.js?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./AdminBadge.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.js?vue&type=script&lang=js&?13e6");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_AdminBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.js?vue&type=script&lang=js&?13e6":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/AdminBadge/AdminBadge.js?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let AdminBadge = {
  props: ['config', 'status', 'user'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isAdmin () {
      let role
      if (this.user) {
        role = this.user.role
      }
      else {
        role = this.status.role
      }
      
      return (role === 'domain_admin' 
              || role === 'global_admin')
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (AdminBadge);

/***/ }),

/***/ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true&":
/*!*****************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_c05ac432_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_c05ac432_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_c05ac432_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_c05ac432_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_c05ac432_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_c05ac432_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.vue":
/*!******************************************************************!*\
  !*** ./webpack-app/components/ui-user/AdminBadge/AdminBadge.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminBadge_html_vue_type_template_id_c05ac432_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdminBadge.html?vue&type=template&id=c05ac432&scoped=true& */ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.html?vue&type=template&id=c05ac432&scoped=true&");
/* harmony import */ var _AdminBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminBadge.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.js?vue&type=script&lang=js&?1044");
/* empty/unused harmony star reexport *//* harmony import */ var _AdminBadge_less_vue_type_style_index_0_id_c05ac432_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true& */ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=c05ac432&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CAdminBadge%5CAdminBadge.vue&lang=yaml */ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CAdminBadge%5CAdminBadge.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AdminBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AdminBadge_html_vue_type_template_id_c05ac432_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AdminBadge_html_vue_type_template_id_c05ac432_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c05ac432",
  null
  
)

/* custom blocks */

if (typeof _AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui-user/AdminBadge/AdminBadge.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ui-user/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CAdminBadge%5CAdminBadge.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CAdminBadge%5CAdminBadge.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CAdminBadge%5CAdminBadge.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-user/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CAdminBadge%5CAdminBadge.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=2027b2d6&scoped=true&":
/*!************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=2027b2d6&scoped=true& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserAvatarIcons_html_vue_type_template_id_2027b2d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./UserAvatarIcons.html?vue&type=template&id=2027b2d6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=2027b2d6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserAvatarIcons_html_vue_type_template_id_2027b2d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserAvatarIcons_html_vue_type_template_id_2027b2d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js&?33e2":
/*!****************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserAvatarIcons_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./UserAvatarIcons.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js&?c6ce");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_UserAvatarIcons_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js&?c6ce":
/*!****************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let UserAvatarIcons = {
  props: ['lib', 'status', 'config', 'users', 'userCount', 'clickable'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
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
    username (user) {
      if (typeof(user.displayName) === 'string') {
        return user.displayName
      }
      else {
        return user.username
      }
    },
    computedAvatarStyle (i) {
      // {'z-index': (users.length - i)}
      let zIndex = (this.users.length - i)
      let opacity = 1 - (0.2 * i)
      let style = {
        'z-index': zIndex,
        opacity: opacity
      }
      
      if (this.clickable !== false) {
        style.cursor = 'pointer'
      }
      
      return style
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (UserAvatarIcons);

/***/ }),

/***/ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true&":
/*!***************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_2027b2d6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_2027b2d6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_2027b2d6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_2027b2d6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_2027b2d6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_2027b2d6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.vue":
/*!****************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserAvatarIcons_html_vue_type_template_id_2027b2d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserAvatarIcons.html?vue&type=template&id=2027b2d6&scoped=true& */ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=2027b2d6&scoped=true&");
/* harmony import */ var _UserAvatarIcons_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserAvatarIcons.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js&?33e2");
/* empty/unused harmony star reexport *//* harmony import */ var _UserAvatarIcons_less_vue_type_style_index_0_id_2027b2d6_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true& */ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=2027b2d6&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml */ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserAvatarIcons_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserAvatarIcons_html_vue_type_template_id_2027b2d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserAvatarIcons_html_vue_type_template_id_2027b2d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2027b2d6",
  null
  
)

/* custom blocks */

if (typeof _UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-user/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=3e220741&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=3e220741&scoped=true& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserSelfBadge_html_vue_type_template_id_3e220741_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./UserSelfBadge.html?vue&type=template&id=3e220741&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=3e220741&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserSelfBadge_html_vue_type_template_id_3e220741_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserSelfBadge_html_vue_type_template_id_3e220741_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js&?1937":
/*!************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let UserSelfBadge = {
  props: ['config', 'status', 'user'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isYou () {
      return (this.user && this.user.id === this.status.userID)
    }
  },
}

/* harmony default export */ __webpack_exports__["default"] = (UserSelfBadge);

/***/ }),

/***/ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js&?f715":
/*!************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSelfBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./UserSelfBadge.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js&?1937");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_UserSelfBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true&":
/*!***********************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_3e220741_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_3e220741_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_3e220741_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_3e220741_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_3e220741_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_3e220741_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.vue":
/*!************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSelfBadge_html_vue_type_template_id_3e220741_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSelfBadge.html?vue&type=template&id=3e220741&scoped=true& */ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=3e220741&scoped=true&");
/* harmony import */ var _UserSelfBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSelfBadge.js?vue&type=script&lang=js& */ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js&?f715");
/* empty/unused harmony star reexport *//* harmony import */ var _UserSelfBadge_less_vue_type_style_index_0_id_3e220741_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true& */ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=3e220741&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml */ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserSelfBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSelfBadge_html_vue_type_template_id_3e220741_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSelfBadge_html_vue_type_template_id_3e220741_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3e220741",
  null
  
)

/* custom blocks */

if (typeof _UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui-user/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui-user%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_user_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=74379ec1&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=74379ec1&scoped=true& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CheckboxToggle_html_vue_type_template_id_74379ec1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./CheckboxToggle.html?vue&type=template&id=74379ec1&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=74379ec1&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CheckboxToggle_html_vue_type_template_id_74379ec1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CheckboxToggle_html_vue_type_template_id_74379ec1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js&?57d2":
/*!*********************************************************************************************!*\
  !*** ./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckboxToggle_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./CheckboxToggle.js?vue&type=script&lang=js& */ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js&?8e0a");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_CheckboxToggle_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js&?8e0a":
/*!*********************************************************************************************!*\
  !*** ./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let CheckboxToggle = {
  props: ['label', 'value'],
  data() {
    return {
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (CheckboxToggle);

/***/ }),

/***/ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true&":
/*!********************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_74379ec1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_74379ec1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_74379ec1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_74379ec1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_74379ec1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_74379ec1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.vue":
/*!*********************************************************************!*\
  !*** ./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckboxToggle_html_vue_type_template_id_74379ec1_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckboxToggle.html?vue&type=template&id=74379ec1&scoped=true& */ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=74379ec1&scoped=true&");
/* harmony import */ var _CheckboxToggle_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckboxToggle.js?vue&type=script&lang=js& */ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js&?57d2");
/* empty/unused harmony star reexport *//* harmony import */ var _CheckboxToggle_less_vue_type_style_index_0_id_74379ec1_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true& */ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=74379ec1&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml */ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CheckboxToggle_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckboxToggle_html_vue_type_template_id_74379ec1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CheckboxToggle_html_vue_type_template_id_74379ec1_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "74379ec1",
  null
  
)

/* custom blocks */

if (typeof _CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui/CheckboxToggle/CheckboxToggle.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ui/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5Cui%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5Cui_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=54264361&scoped=true&":
/*!*****************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=54264361&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_IframeMessageSegment_html_vue_type_template_id_54264361_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./IframeMessageSegment.html?vue&type=template&id=54264361&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=54264361&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_IframeMessageSegment_html_vue_type_template_id_54264361_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_IframeMessageSegment_html_vue_type_template_id_54264361_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js&?a075":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IframeMessageSegment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./IframeMessageSegment.js?vue&type=script&lang=js& */ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js&?f03e");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_IframeMessageSegment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js&?f03e":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let IframeMessageSegment = {
  props: ['config', 'message', 'showBorder'],
  data() {
    return {
    }
  },
//  components: {
//  },
  computed: {
    url () {
      if (this.message.startsWith('/')) {
        return this.config.baseURL + this.message
      }
      else if (this.message.startsWith('http://')
              || this.message.startsWith('https://')) {
        return this.message
      }
    },
    computedClassList () {
      if (this.showBorder === false) {
        return ''
      }
      else {
        return 'ui segment'
      }
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (IframeMessageSegment);

/***/ }),

/***/ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true&":
/*!********************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_54264361_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_54264361_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_54264361_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_54264361_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_54264361_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_54264361_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.vue":
/*!*********************************************************************************!*\
  !*** ./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.vue ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IframeMessageSegment_html_vue_type_template_id_54264361_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IframeMessageSegment.html?vue&type=template&id=54264361&scoped=true& */ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=54264361&scoped=true&");
/* harmony import */ var _IframeMessageSegment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IframeMessageSegment.js?vue&type=script&lang=js& */ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js&?a075");
/* empty/unused harmony star reexport *//* harmony import */ var _IframeMessageSegment_less_vue_type_style_index_0_id_54264361_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true& */ "./webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=54264361&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _IframeMessageSegment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IframeMessageSegment_html_vue_type_template_id_54264361_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IframeMessageSegment_html_vue_type_template_id_54264361_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "54264361",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ui/IframeMessageSegment/IframeMessageSegment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/helpers/AnnotationHelper.js":
/*!*************************************************!*\
  !*** ./webpack-app/helpers/AnnotationHelper.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 跟標註有關的各種小工具
 * @type Object
 */
let AnnotationHelper = {
  status: null,
  
  setStatus (status) {
    this.status = status
    return this
  },
  note (annotation, type, note) {
    if (typeof(type) === 'object') {
      //console.log(type, typeof(type))
      Object.keys(type).forEach(t => {
        let n = type[t]
        this.note(annotation, t, n)
      })
      return undefined
    }
    
    let found = false
    if (!annotation.notes) {
      annotation.notes = [{
          type: type,
          note: note
      }]
    return annotation
    }
    
    annotation.notes.forEach(n => {
      if (n.type === type) {
        n.note = note
        found = true
      }
    })
    
    if (!found) {
      annotation.notes.push({
          type: type,
          note: note
      })
    }
    
    return annotation
  },
  
  highlightType (annotation) {
    let type = annotation.type
    if (annotation.user_id === this.status.userID) {
      type = 'my-' + type
    }
    else {
      type = 'others-' + type
    }
    return type
  },
  
  isEditable: function (annotation) {
    //console.log(annotation)
    if (!annotation 
            || typeof (annotation.id) !== 'number'
            || typeof (annotation.user_id) !== 'number') {
      return true
    }

    if (['domain_admin', 'global_admin'].indexOf(this.status.role) > -1) {
      return true
    }

    return (annotation.user_id === this.status.userID)
  },
  /**
   * 加上整體環境的過濾器，用於找人和找標註類型
   * @param {Object} data 傳送給伺服器用於查詢用的資料
   * @returns {undefined}
   */
  filter: function (data) {
    if (typeof(this.status.filter.findType) === 'string') {
      data.findType = this.status.filter.findType
    }
    if (this.status.filter.focusUser !== null 
            && typeof(this.status.filter.focusUser.id) === 'number') {
      data.focusUserID = this.status.filter.focusUser.id
    }
  },
  validate: function (annotation) {
    if (!annotation) {
      throw new Error('annotation is undefinded')
    }
    
    if (Array.isArray(annotation.anchorPositions) === false
            || annotation.anchorPositions.length === 0) {
      throw new Error(`Annotation's anchor positions are required. \n`
            + JSON.stringify(annotation, null, 2))
    }
    
    let pos = annotation.anchorPositions[0]
    if (pos.type === 'textContent'
            && (typeof(pos.start_pos) !== 'number' || typeof(pos.end_pos) !== 'number') ) {
      throw new Error(`Start pos and end pos of anchor positions are required. \n` 
        + JSON.stringify(annotation, null, 2))
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AnnotationHelper);

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
  } 
}

/* harmony default export */ __webpack_exports__["default"] = (VueHelper);

/***/ })

/******/ });
//# sourceMappingURL=client.js.map