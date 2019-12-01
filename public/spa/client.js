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

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAdminBadge%5CAdminBadge.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAdminBadge%5CAdminBadge.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Administrator":"管理者"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"{0} Comments":"{0} Comment | {0} Comments","{0} Likes":"{0} Likes | {0} Likes"},"zh-TW":{"{0} Comments":" {0}篇留言","{0} Likes":" {0}讚"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"{0} Comments":"{0} Comment | {0} Comments","{0} Likes":"{0} Likes | {0} Likes"},"zh-TW":{"{0} Comments":" {0}篇留言","{0} Likes":" {0}讚","Like":"讚","Comment":"留言"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"All":"全部"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CBlockExit%5CBlockExit.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CBlockExit%5CBlockExit.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Please don\u0027t leave.":"請不要離開"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CConfirmModal%5CConfirmModal.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CConfirmModal%5CConfirmModal.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Are you sure?":"您確定嗎？","Yes":"是的","No":"不是"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCountdownButton%5CCountdownButton.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCountdownButton%5CCountdownButton.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Remaining Time":"剩餘時間"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Remaining Time":"剩餘時間"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{"{0} Readers":"{0} Reader | {0} Readers"},"zh-TW":{"{0} Readers":"{0}位讀者"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"You":"就是您本人"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CValidationButton%5CValidationButton.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/components/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CValidationButton%5CValidationButton.vue&lang=yaml ***!
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

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".meta[data-v-b2feccdc] {\n  float: right;\n  user-select: none;\n  line-height: 2em !important;\n}\n.user[data-v-b2feccdc] {\n  display: inline-block;\n}\n.avatar[data-v-b2feccdc] {\n  max-height: 2em;\n  width: auto;\n}\n.avatar[data-v-b2feccdc],\n.username[data-v-b2feccdc] {\n  margin-right: 0.5em;\n}\n.username[data-v-b2feccdc] {\n  max-width: 5em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: inline-block;\n  vertical-align: top;\n  line-height: 2em;\n}\n.note[data-v-b2feccdc] {\n  line-height: 2em;\n  display: inline-block;\n  vertical-align: top;\n}\n.clickable[data-v-b2feccdc] {\n  cursor: pointer !important;\n}\n.meta[data-v-b2feccdc]  .AnnotationInteractive {\n  margin-left: 0.5em;\n}\n.annotation-item-compact[data-v-b2feccdc] {\n  padding-top: 0.5em !important;\n  padding-bottom: 0.5em !important;\n  margin-bottom: 0.5em !important;\n}\n.annotation-item-compact .text-container[data-v-b2feccdc] {\n  line-height: 2em;\n  display: inline-block;\n  vertical-align: top;\n}\n.annotation-item-compact .left.column[data-v-b2feccdc] {\n  max-width: 70vw;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.annotation-item-compact .note[data-v-b2feccdc] {\n  display: inline-block;\n  margin-left: 0.5em;\n  white-space: nowrap;\n  max-width: calc(100vw - 28em);\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n@media (max-width: 480px) {\n.AnnotationItem.annotation-item-compact[data-v-b2feccdc]  .AnnotationTypeButton {\n    text-indent: -9999px;\n    padding-left: 0;\n    padding-right: 0;\n    width: 1em;\n}\n.AnnotationItem.annotation-item-compact .note[data-v-b2feccdc] {\n    max-width: calc(100vw - 10em);\n}\n.AnnotationItem.annotation-item-compact .display-time[data-v-b2feccdc] {\n    max-width: 0;\n    overflow-x: hidden;\n}\n}\n", "",{"version":3,"sources":["AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,iBAAiB;EACjB,2BAA2B;AAC7B;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;EACf,WAAW;AACb;AACA;;EAEE,mBAAmB;AACrB;AACA;EACE,cAAc;EACd,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;EACnB,qBAAqB;EACrB,mBAAmB;EACnB,gBAAgB;AAClB;AACA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB;AACrB;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,kBAAkB;AACpB;AACA;EACE,6BAA6B;EAC7B,gCAAgC;EAChC,+BAA+B;AACjC;AACA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB;AACrB;AACA;EACE,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,mBAAmB;EACnB,6BAA6B;EAC7B,uBAAuB;EACvB,gBAAgB;AAClB;AACA;AACA;IACI,oBAAoB;IACpB,eAAe;IACf,gBAAgB;IAChB,UAAU;AACd;AACA;IACI,6BAA6B;AACjC;AACA;IACI,YAAY;IACZ,kBAAkB;AACtB;AACA","file":"AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true&","sourcesContent":[".meta[data-v-b2feccdc] {\n  float: right;\n  user-select: none;\n  line-height: 2em !important;\n}\n.user[data-v-b2feccdc] {\n  display: inline-block;\n}\n.avatar[data-v-b2feccdc] {\n  max-height: 2em;\n  width: auto;\n}\n.avatar[data-v-b2feccdc],\n.username[data-v-b2feccdc] {\n  margin-right: 0.5em;\n}\n.username[data-v-b2feccdc] {\n  max-width: 5em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: inline-block;\n  vertical-align: top;\n  line-height: 2em;\n}\n.note[data-v-b2feccdc] {\n  line-height: 2em;\n  display: inline-block;\n  vertical-align: top;\n}\n.clickable[data-v-b2feccdc] {\n  cursor: pointer !important;\n}\n.meta[data-v-b2feccdc]  .AnnotationInteractive {\n  margin-left: 0.5em;\n}\n.annotation-item-compact[data-v-b2feccdc] {\n  padding-top: 0.5em !important;\n  padding-bottom: 0.5em !important;\n  margin-bottom: 0.5em !important;\n}\n.annotation-item-compact .text-container[data-v-b2feccdc] {\n  line-height: 2em;\n  display: inline-block;\n  vertical-align: top;\n}\n.annotation-item-compact .left.column[data-v-b2feccdc] {\n  max-width: 70vw;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.annotation-item-compact .note[data-v-b2feccdc] {\n  display: inline-block;\n  margin-left: 0.5em;\n  white-space: nowrap;\n  max-width: calc(100vw - 28em);\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n@media (max-width: 480px) {\n.AnnotationItem.annotation-item-compact[data-v-b2feccdc]  .AnnotationTypeButton {\n    text-indent: -9999px;\n    padding-left: 0;\n    padding-right: 0;\n    width: 1em;\n}\n.AnnotationItem.annotation-item-compact .note[data-v-b2feccdc] {\n    max-width: calc(100vw - 10em);\n}\n.AnnotationItem.annotation-item-compact .display-time[data-v-b2feccdc] {\n    max-width: 0;\n    overflow-x: hidden;\n}\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".note[data-v-b2feccdc]  p {\n  line-height: 2em !important;\n  display: inline !important;\n  vertical-align: top;\n}\n.note[data-v-b2feccdc]  img {\n  max-width: 4em;\n  max-height: 4em;\n  width: auto;\n  height: auto;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n.annotation-item-compact .note[data-v-b2feccdc]  [data-pacor-search-result] {\n  font-weight: bold !important;\n  background-color: yellow !important;\n  color: red !important;\n}\n.annotation-item-compact .note[data-v-b2feccdc]  p {\n  display: inline !important;\n  line-height: 2em !important;\n}\n", "",{"version":3,"sources":["AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,2BAA2B;EAC3B,0BAA0B;EAC1B,mBAAmB;AACrB;AACA;EACE,cAAc;EACd,eAAe;EACf,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;AACrB;AACA;EACE,4BAA4B;EAC5B,mCAAmC;EACnC,qBAAqB;AACvB;AACA;EACE,0BAA0B;EAC1B,2BAA2B;AAC7B","file":"AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true&","sourcesContent":[".note[data-v-b2feccdc]  p {\n  line-height: 2em !important;\n  display: inline !important;\n  vertical-align: top;\n}\n.note[data-v-b2feccdc]  img {\n  max-width: 4em;\n  max-height: 4em;\n  width: auto;\n  height: auto;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n.annotation-item-compact .note[data-v-b2feccdc]  [data-pacor-search-result] {\n  font-weight: bold !important;\n  background-color: yellow !important;\n  color: red !important;\n}\n.annotation-item-compact .note[data-v-b2feccdc]  p {\n  display: inline !important;\n  line-height: 2em !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".AnnotationInteractive button[type=\"button\"].ui.button[data-v-5d3a2f58] {\n  vertical-align: top !important;\n}\n", "",{"version":3,"sources":["AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,8BAA8B;AAChC","file":"AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true&","sourcesContent":[".AnnotationInteractive button[type=\"button\"].ui.button[data-v-5d3a2f58] {\n  vertical-align: top !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".button[data-v-81108e1c] {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n", "",{"version":3,"sources":["AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,gBAAgB;AAClB","file":"AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true&","sourcesContent":[".button[data-v-81108e1c] {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".checkbox-toggle[data-v-d7c8461c] {\n  margin-left: 1em;\n  margin-right: 1em;\n  cursor: pointer !important;\n}\n.checkbox-toggle label[data-v-d7c8461c] {\n  cursor: pointer !important;\n}\n", "",{"version":3,"sources":["CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,0BAA0B;AAC5B;AACA;EACE,0BAA0B;AAC5B","file":"CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true&","sourcesContent":[".checkbox-toggle[data-v-d7c8461c] {\n  margin-left: 1em;\n  margin-right: 1em;\n  cursor: pointer !important;\n}\n.checkbox-toggle label[data-v-d7c8461c] {\n  cursor: pointer !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".actions[data-v-f023f79c] {\n  text-align: center !important;\n}\n", "",{"version":3,"sources":["ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,6BAA6B;AAC/B","file":"ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true&","sourcesContent":[".actions[data-v-f023f79c] {\n  text-align: center !important;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Imports
var getUrl = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ./fonts/digital-7.ttf */ "./webpack-app/components/DigitalCountdownTimer/fonts/digital-7.ttf"));
// Module
exports.push([module.i, ".DigitalCountdownTimer[data-v-3fb22da8] {\n  color: #ffffff;\n  border-radius: 0.3em;\n  border: 1px solid white;\n  font-family: 'digital-7', 'sans-serif';\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  font-size: 1.5em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n  padding-top: 0.1em;\n}\n@font-face {\n  font-family: 'digital-7';\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n}\n/* CLOCK */\ndiv.clock div[data-v-3fb22da8] {\n  display: inline-block;\n  position: relative;\n}\ndiv.clock div p[data-v-3fb22da8] {\n  position: relative;\n  z-index: 100;\n  margin-bottom: 0 !important;\n  line-height: 1em;\n}\ndiv.clock div p.minutes[data-v-3fb22da8],\ndiv.clock div p.seconds[data-v-3fb22da8] {\n  transition: text-shadow 0.3s ease !important;\n}\ndiv.clock .placeholder[data-v-3fb22da8] {\n  color: #8E5229;\n  position: absolute;\n  top: 0;\n  z-index: 50;\n}\ndiv.clock .meridian[data-v-3fb22da8] {\n  margin-left: 0.5em;\n}\n/*END CLOCK*/\n/*CLASS THAT CHANGES COLOR OF TEXT TO APPEAR LIKE ITS \"ON\"*/\n.light-on[data-v-3fb22da8] {\n  color: #ffffff;\n}\n.message[data-v-3fb22da8] {\n  display: block !important;\n  font-size: 0.4em;\n  top: 0.1em;\n  text-align: center;\n  left: -0.3em;\n}\n.seconds[data-v-3fb22da8] {\n  margin-right: 0.5em;\n}\n.seconds.two[data-v-3fb22da8] {\n  margin-right: 0;\n}\n.seconds.two[data-v-3fb22da8],\n.minutes.two[data-v-3fb22da8] {\n  left: -0.5em;\n}\n.colon[data-v-3fb22da8] {\n  margin-left: -0.7em;\n  margin-right: -0.3em;\n}\n.seconds-numbers[data-v-3fb22da8] {\n  margin-right: -1em;\n}\n.minutes-numbers[data-v-3fb22da8] {\n  margin-right: 0.5em;\n}\n.minutes-numbers .minutes.hidden[data-v-3fb22da8],\n.minutes-numbers .minutes.two[data-v-3fb22da8] {\n  margin-right: -0.5em;\n}\n.glow[data-v-3fb22da8] {\n  text-shadow: 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5);\n}\n.hidden[data-v-3fb22da8] {\n  visibility: hidden;\n}\n.colon-hidden[data-v-3fb22da8] {\n  color: #8E5229;\n}\n", "",{"version":3,"sources":["DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,oBAAoB;EACpB,uBAAuB;EACvB,sCAAsC;EACtC,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,wBAAwB;EACxB,kCAAiC;AACnC;AACA,UAAU;AACV;EACE,qBAAqB;EACrB,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,YAAY;EACZ,2BAA2B;EAC3B,gBAAgB;AAClB;AACA;;EAEE,4CAA4C;AAC9C;AACA;EACE,cAAc;EACd,kBAAkB;EAClB,MAAM;EACN,WAAW;AACb;AACA;EACE,kBAAkB;AACpB;AACA,YAAY;AACZ,2DAA2D;AAC3D;EACE,cAAc;AAChB;AACA;EACE,yBAAyB;EACzB,gBAAgB;EAChB,UAAU;EACV,kBAAkB;EAClB,YAAY;AACd;AACA;EACE,mBAAmB;AACrB;AACA;EACE,eAAe;AACjB;AACA;;EAEE,YAAY;AACd;AACA;EACE,mBAAmB;EACnB,oBAAoB;AACtB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,mBAAmB;AACrB;AACA;;EAEE,oBAAoB;AACtB;AACA;EACE,4RAA4R;AAC9R;AACA;EACE,kBAAkB;AACpB;AACA;EACE,cAAc;AAChB","file":"DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true&","sourcesContent":[".DigitalCountdownTimer[data-v-3fb22da8] {\n  color: #ffffff;\n  border-radius: 0.3em;\n  border: 1px solid white;\n  font-family: 'digital-7', 'sans-serif';\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  font-size: 1.5em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n  padding-top: 0.1em;\n}\n@font-face {\n  font-family: 'digital-7';\n  src: url('./fonts/digital-7.ttf');\n}\n/* CLOCK */\ndiv.clock div[data-v-3fb22da8] {\n  display: inline-block;\n  position: relative;\n}\ndiv.clock div p[data-v-3fb22da8] {\n  position: relative;\n  z-index: 100;\n  margin-bottom: 0 !important;\n  line-height: 1em;\n}\ndiv.clock div p.minutes[data-v-3fb22da8],\ndiv.clock div p.seconds[data-v-3fb22da8] {\n  transition: text-shadow 0.3s ease !important;\n}\ndiv.clock .placeholder[data-v-3fb22da8] {\n  color: #8E5229;\n  position: absolute;\n  top: 0;\n  z-index: 50;\n}\ndiv.clock .meridian[data-v-3fb22da8] {\n  margin-left: 0.5em;\n}\n/*END CLOCK*/\n/*CLASS THAT CHANGES COLOR OF TEXT TO APPEAR LIKE ITS \"ON\"*/\n.light-on[data-v-3fb22da8] {\n  color: #ffffff;\n}\n.message[data-v-3fb22da8] {\n  display: block !important;\n  font-size: 0.4em;\n  top: 0.1em;\n  text-align: center;\n  left: -0.3em;\n}\n.seconds[data-v-3fb22da8] {\n  margin-right: 0.5em;\n}\n.seconds.two[data-v-3fb22da8] {\n  margin-right: 0;\n}\n.seconds.two[data-v-3fb22da8],\n.minutes.two[data-v-3fb22da8] {\n  left: -0.5em;\n}\n.colon[data-v-3fb22da8] {\n  margin-left: -0.7em;\n  margin-right: -0.3em;\n}\n.seconds-numbers[data-v-3fb22da8] {\n  margin-right: -1em;\n}\n.minutes-numbers[data-v-3fb22da8] {\n  margin-right: 0.5em;\n}\n.minutes-numbers .minutes.hidden[data-v-3fb22da8],\n.minutes-numbers .minutes.two[data-v-3fb22da8] {\n  margin-right: -0.5em;\n}\n.glow[data-v-3fb22da8] {\n  text-shadow: 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5), 0px 0px 10px rgba(255, 255, 128, 0.5);\n}\n.hidden[data-v-3fb22da8] {\n  visibility: hidden;\n}\n.colon-hidden[data-v-3fb22da8] {\n  color: #8E5229;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".IframeMessageSegment[data-v-20b1c012] {\n  text-align: center;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.IframeMessageSegment iframe[data-v-20b1c012] {\n  width: 100%;\n}\n", "",{"version":3,"sources":["IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;AAClB;AACA;EACE,WAAW;AACb","file":"IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true&","sourcesContent":[".IframeMessageSegment[data-v-20b1c012] {\n  text-align: center;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.IframeMessageSegment iframe[data-v-20b1c012] {\n  width: 100%;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".UserAvatarIcons[data-v-016deec0] {\n  display: inline-block;\n  user-select: none;\n}\n.UserAvatarIcons .avatar-list[data-v-016deec0] {\n  display: inline-block;\n  vertical-align: top;\n  direction: ltr;\n}\n.UserAvatarIcons .avatar[data-v-016deec0] {\n  max-height: 2em;\n  width: auto;\n  margin-left: -0.5em;\n  position: relative;\n  filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.7));\n}\n.UserAvatarIcons .avatar[data-v-016deec0]:first-of-type {\n  margin-left: 0;\n}\n.UserAvatarIcons .user-count[data-v-016deec0] {\n  display: inline-block;\n  vertical-align: top;\n  line-height: 2em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n", "",{"version":3,"sources":["UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,cAAc;AAChB;AACA;EACE,eAAe;EACf,WAAW;EACX,mBAAmB;EACnB,kBAAkB;EAClB,yDAAyD;AAC3D;AACA;EACE,cAAc;AAChB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;AACrB","file":"UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true&","sourcesContent":[".UserAvatarIcons[data-v-016deec0] {\n  display: inline-block;\n  user-select: none;\n}\n.UserAvatarIcons .avatar-list[data-v-016deec0] {\n  display: inline-block;\n  vertical-align: top;\n  direction: ltr;\n}\n.UserAvatarIcons .avatar[data-v-016deec0] {\n  max-height: 2em;\n  width: auto;\n  margin-left: -0.5em;\n  position: relative;\n  filter: drop-shadow(1px 1px 3px rgba(255, 255, 255, 0.7));\n}\n.UserAvatarIcons .avatar[data-v-016deec0]:first-of-type {\n  margin-left: 0;\n}\n.UserAvatarIcons .user-count[data-v-016deec0] {\n  display: inline-block;\n  vertical-align: top;\n  line-height: 2em;\n  margin-left: 0.5em;\n  margin-right: 0.5em;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true&"}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".non-invasive-web-style-framework .ValidationButton[data-v-8774681c] {\n  overflow-y: hidden;\n  max-height: 2.5em;\n}\n.non-invasive-web-style-framework .ValidationButton .loader[data-v-8774681c] {\n  display: none !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled[data-v-8774681c] {\n  overflow-y: hidden;\n  max-height: 2.5em;\n  pointer-events: all !important;\n  cursor: wait !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled .loader[data-v-8774681c] {\n  display: inline-block !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled .message[data-v-8774681c] {\n  margin-top: 50px;\n}\n", "",{"version":3,"sources":["ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,8BAA8B;EAC9B,uBAAuB;AACzB;AACA;EACE,gCAAgC;AAClC;AACA;EACE,gBAAgB;AAClB","file":"ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true&","sourcesContent":[".non-invasive-web-style-framework .ValidationButton[data-v-8774681c] {\n  overflow-y: hidden;\n  max-height: 2.5em;\n}\n.non-invasive-web-style-framework .ValidationButton .loader[data-v-8774681c] {\n  display: none !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled[data-v-8774681c] {\n  overflow-y: hidden;\n  max-height: 2.5em;\n  pointer-events: all !important;\n  cursor: wait !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled .loader[data-v-8774681c] {\n  display: inline-block !important;\n}\n.non-invasive-web-style-framework .ValidationButton.await.ui.button.disabled .message[data-v-8774681c] {\n  margin-top: 50px;\n}\n"]}]);


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
                                }
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
                    staticClass: "ui button",
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/StyleManager/StyleManager.html?vue&type=template&id=892a0ef2&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/StyleManager/StyleManager.html?vue&type=template&id=892a0ef2& ***!
  \**********************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ActivityTimer/ActivityTimer.html?vue&type=template&id=46a4ac00&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ActivityTimer/ActivityTimer.html?vue&type=template&id=46a4ac00& ***!
  \****************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/AdminBadge/AdminBadge.html?vue&type=template&id=6b9d8fd2&scoped=true&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/AdminBadge/AdminBadge.html?vue&type=template&id=6b9d8fd2&scoped=true& ***!
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/AnnotationItem/AnnotationItem.html?vue&type=template&id=b2feccdc&scoped=true&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/AnnotationItem/AnnotationItem.html?vue&type=template&id=b2feccdc&scoped=true& ***!
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=5d3a2f58&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=5d3a2f58&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=81108e1c&scoped=true&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=81108e1c&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/BlockExit/BlockExit.html?vue&type=template&id=29b99a2c&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/BlockExit/BlockExit.html?vue&type=template&id=29b99a2c& ***!
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
  return _c("span", { staticClass: "BlockExit" })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=d7c8461c&scoped=true&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=d7c8461c&scoped=true& ***!
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/Clock/Clock.html?vue&type=template&id=25c43c30&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/Clock/Clock.html?vue&type=template&id=25c43c30& ***!
  \************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ConfirmModal/ConfirmModal.html?vue&type=template&id=f023f79c&scoped=true&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ConfirmModal/ConfirmModal.html?vue&type=template&id=f023f79c&scoped=true& ***!
  \**************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/CountdownButton/CountdownButton.html?vue&type=template&id=5ca38f4c&scoped=true&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/CountdownButton/CountdownButton.html?vue&type=template&id=5ca38f4c&scoped=true& ***!
  \********************************************************************************************************************************************************************************************/
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
        ? [_vm._t("default")]
        : [_vm._v("\r\n    (" + _vm._s(_vm.disabledMessage) + ")\r\n  ")]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=3fb22da8&scoped=true&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=3fb22da8&scoped=true& ***!
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=20b1c012&scoped=true&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=20b1c012&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************/
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
    { staticClass: "ui segment IframeMessageSegment" },
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=5ef4b5d2&scoped=true&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=5ef4b5d2&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=016deec0&scoped=true&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=016deec0&scoped=true& ***!
  \********************************************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=50e6c628&scoped=true&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=50e6c628&scoped=true& ***!
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ValidationButton/ValidationButton.html?vue&type=template&id=8774681c&scoped=true&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/components/ValidationButton/ValidationButton.html?vue&type=template&id=8774681c&scoped=true& ***!
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

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("6b4ac164", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("191fd5a5", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("1cf0f71c", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("79a2dd93", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("3c89b7e3", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("a888d03c", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("f050ecfc", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("0aaabec1", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("00bbf6f7", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("779a538a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("eb4f8020", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("4ed8dc49", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("5c5b0684", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("63a18f3a", content, false, {});
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
/* harmony import */ var _client_local_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./client/local-components */ "./webpack-app/client/local-components.js");
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
    //console.log(this.lib.auth.nextStep)
  },
  
  methods: {
  }, // methods: {
  
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__["default"],
  
  template: _client_client_tpl__WEBPACK_IMPORTED_MODULE_11___default.a,
  components: _client_local_components__WEBPACK_IMPORTED_MODULE_14__["default"]
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
  
  Auth.method.getRemainingSeconds = function () {
    if (Array.isArray(this.status.readingProgresses) === false) {
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
      
      let result = await this.lib.AxiosHelper.get(`/client/Auth/login`, data)
      
      if (typeof(result) !== 'object') {
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

/***/ "./webpack-app/client/StyleManager/StyleManager.html?vue&type=template&id=892a0ef2&":
/*!******************************************************************************************!*\
  !*** ./webpack-app/client/StyleManager/StyleManager.html?vue&type=template&id=892a0ef2& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StyleManager_html_vue_type_template_id_892a0ef2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./StyleManager.html?vue&type=template&id=892a0ef2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/StyleManager/StyleManager.html?vue&type=template&id=892a0ef2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StyleManager_html_vue_type_template_id_892a0ef2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_StyleManager_html_vue_type_template_id_892a0ef2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/StyleManager/StyleManager.js?vue&type=script&lang=js&?398e":
/*!**********************************************************************************!*\
  !*** ./webpack-app/client/StyleManager/StyleManager.js?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _computedStyleManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computedStyleManager.js */ "./webpack-app/client/StyleManager/computedStyleManager.js");
let StyleManager = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
//  components: {
//  },
  computed: {
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    
    
  } // methods
}


Object(_computedStyleManager_js__WEBPACK_IMPORTED_MODULE_0__["default"])(StyleManager)

/* harmony default export */ __webpack_exports__["default"] = (StyleManager);

/***/ }),

/***/ "./webpack-app/client/StyleManager/StyleManager.js?vue&type=script&lang=js&?dc0d":
/*!**********************************************************************************!*\
  !*** ./webpack-app/client/StyleManager/StyleManager.js?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StyleManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./StyleManager.js?vue&type=script&lang=js& */ "./webpack-app/client/StyleManager/StyleManager.js?vue&type=script&lang=js&?398e");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_StyleManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/StyleManager/StyleManager.vue":
/*!**********************************************************!*\
  !*** ./webpack-app/client/StyleManager/StyleManager.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StyleManager_html_vue_type_template_id_892a0ef2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StyleManager.html?vue&type=template&id=892a0ef2& */ "./webpack-app/client/StyleManager/StyleManager.html?vue&type=template&id=892a0ef2&");
/* harmony import */ var _StyleManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StyleManager.js?vue&type=script&lang=js& */ "./webpack-app/client/StyleManager/StyleManager.js?vue&type=script&lang=js&?dc0d");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StyleManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StyleManager_html_vue_type_template_id_892a0ef2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StyleManager_html_vue_type_template_id_892a0ef2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/StyleManager/StyleManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/StyleManager/computedStyleManager.js":
/*!*****************************************************************!*\
  !*** ./webpack-app/client/StyleManager/computedStyleManager.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
            && this.status.preference.enableAnimate) {
      return this.status.preference.enableAnimate
    }
    return true
  } // StyleManager.computed.isEnableAnimate = function () {
});

/***/ }),

/***/ "./webpack-app/client/client.tpl":
/*!***************************************!*\
  !*** ./webpack-app/client/client.tpl ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"non-invasive-web-style-framework\">\r\n\r\n  <auth \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:lib=\"lib\"\r\n    ref=\"auth\">\r\n  </auth>\r\n  \r\n  <StyleManager \r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:lib=\"lib\"\r\n    ref=\"style\">\r\n  </StyleManager>\r\n\r\n  <error-handler \r\n    v-bind:config=\"config\"\r\n    v-bind:lib=\"lib\"\r\n    v-bind:errors=\"errors\"\r\n    ref=\"ErrorHandler\">\r\n  </error-handler>\r\n  \r\n  <confirm-modal\r\n    v-bind:config=\"config\"\r\n    v-bind:lib=\"lib\"\r\n    v-bind:status=\"status\"\r\n    \r\n    ref=\"ConfirmModal\">\r\n  </confirm-modal>\r\n\r\n  <component \r\n    v-bind:is=\"status.view\"\r\n    v-bind:config=\"config\"\r\n    v-bind:status=\"status\"\r\n    v-bind:progress=\"progress\"\r\n    v-bind:lib=\"lib\">\r\n  </component>\r\n</div>";

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
/* harmony import */ var _components_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/Pagination/Pagination.vue */ "./webpack-app/components/Pagination/Pagination.vue");
/* harmony import */ var _components_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../components/Modal/Modal.vue */ "./webpack-app/components/Modal/Modal.vue");
/* harmony import */ var _components_ConfirmModal_ConfirmModal_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../components/ConfirmModal/ConfirmModal.vue */ "./webpack-app/components/ConfirmModal/ConfirmModal.vue");
/* harmony import */ var _components_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../components/StepProgressBar/StepProgressBar.vue */ "./webpack-app/components/StepProgressBar/StepProgressBar.vue");
/* harmony import */ var _components_BlockExit_BlockExit_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/BlockExit/BlockExit.vue */ "./webpack-app/components/BlockExit/BlockExit.vue");
/* harmony import */ var _components_ActivityTimer_ActivityTimer_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../components/ActivityTimer/ActivityTimer.vue */ "./webpack-app/components/ActivityTimer/ActivityTimer.vue");
/* harmony import */ var _components_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../components/Navigation/Navigation.vue */ "./webpack-app/components/Navigation/Navigation.vue");
/* harmony import */ var _components_Clock_Clock_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../components/Clock/Clock.vue */ "./webpack-app/components/Clock/Clock.vue");
/* harmony import */ var _components_AnnotationTypeButton_AnnotationTypeButton_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../components/AnnotationTypeButton/AnnotationTypeButton.vue */ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.vue");
/* harmony import */ var _components_CheckboxToggle_CheckboxToggle_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../components/CheckboxToggle/CheckboxToggle.vue */ "./webpack-app/components/CheckboxToggle/CheckboxToggle.vue");
/* harmony import */ var _components_CountdownButton_CountdownButton_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../components/CountdownButton/CountdownButton.vue */ "./webpack-app/components/CountdownButton/CountdownButton.vue");
/* harmony import */ var _components_SimpleCountdownTimer_SimpleCountdownTimer_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../components/SimpleCountdownTimer/SimpleCountdownTimer.vue */ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.vue");
/* harmony import */ var _components_DigitalCountdownTimer_DigitalCountdownTimer_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../components/DigitalCountdownTimer/DigitalCountdownTimer.vue */ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.vue");
/* harmony import */ var _components_ValidationButton_ValidationButton_vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../components/ValidationButton/ValidationButton.vue */ "./webpack-app/components/ValidationButton/ValidationButton.vue");
/* harmony import */ var _components_UserAvatarIcons_UserAvatarIcons_vue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../components/UserAvatarIcons/UserAvatarIcons.vue */ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.vue");
/* harmony import */ var _components_AnnotationItem_AnnotationItem_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../components/AnnotationItem/AnnotationItem.vue */ "./webpack-app/components/AnnotationItem/AnnotationItem.vue");
/* harmony import */ var _components_AnnotationItemInteractive_AnnotationItemInteractive_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./../components/AnnotationItemInteractive/AnnotationItemInteractive.vue */ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.vue");
/* harmony import */ var _components_AdminBadge_AdminBadge_vue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./../components/AdminBadge/AdminBadge.vue */ "./webpack-app/components/AdminBadge/AdminBadge.vue");
/* harmony import */ var _components_UserSelfBadge_UserSelfBadge_vue__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./../components/UserSelfBadge/UserSelfBadge.vue */ "./webpack-app/components/UserSelfBadge/UserSelfBadge.vue");
/* harmony import */ var _components_IframeMessageSegment_IframeMessageSegment_vue__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../components/IframeMessageSegment/IframeMessageSegment.vue */ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.vue");
/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */




vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('pagination', _components_Pagination_Pagination_vue__WEBPACK_IMPORTED_MODULE_1__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('modal', _components_Modal_Modal_vue__WEBPACK_IMPORTED_MODULE_2__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('confirm-modal', _components_ConfirmModal_ConfirmModal_vue__WEBPACK_IMPORTED_MODULE_3__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('step-progress-bar', _components_StepProgressBar_StepProgressBar_vue__WEBPACK_IMPORTED_MODULE_4__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('block-exit', _components_BlockExit_BlockExit_vue__WEBPACK_IMPORTED_MODULE_5__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('activity-timer', _components_ActivityTimer_ActivityTimer_vue__WEBPACK_IMPORTED_MODULE_6__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('navigation', _components_Navigation_Navigation_vue__WEBPACK_IMPORTED_MODULE_7__["default"])

//import CompactNavigation from './../components/CompactNavigation/CompactNavigation.vue'
//Vue.component('compact-navigation', CompactNavigation)


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('clock', _components_Clock_Clock_vue__WEBPACK_IMPORTED_MODULE_8__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-type-button', _components_AnnotationTypeButton_AnnotationTypeButton_vue__WEBPACK_IMPORTED_MODULE_9__["default"])

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('HTMLEditor', () => Promise.all(/*! import() | vendors/HTMLEditor */[__webpack_require__.e("vendors"), __webpack_require__.e("vendors/HTMLEditor")]).then(__webpack_require__.bind(null, /*! ./../components/HTMLEditor/HTMLEditor.vue */ "./webpack-app/components/HTMLEditor/HTMLEditor.vue")))


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('checkbox-toggle', _components_CheckboxToggle_CheckboxToggle_vue__WEBPACK_IMPORTED_MODULE_10__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('countdown-button', _components_CountdownButton_CountdownButton_vue__WEBPACK_IMPORTED_MODULE_11__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('simple-countdown-timer', _components_SimpleCountdownTimer_SimpleCountdownTimer_vue__WEBPACK_IMPORTED_MODULE_12__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('digital-countdown-timer', _components_DigitalCountdownTimer_DigitalCountdownTimer_vue__WEBPACK_IMPORTED_MODULE_13__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('validation-button', _components_ValidationButton_ValidationButton_vue__WEBPACK_IMPORTED_MODULE_14__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-avatar-icons', _components_UserAvatarIcons_UserAvatarIcons_vue__WEBPACK_IMPORTED_MODULE_15__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-item', _components_AnnotationItem_AnnotationItem_vue__WEBPACK_IMPORTED_MODULE_16__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-item-interactive', _components_AnnotationItemInteractive_AnnotationItemInteractive_vue__WEBPACK_IMPORTED_MODULE_17__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('admin-badge', _components_AdminBadge_AdminBadge_vue__WEBPACK_IMPORTED_MODULE_18__["default"])


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('user-self-badge', _components_UserSelfBadge_UserSelfBadge_vue__WEBPACK_IMPORTED_MODULE_19__["default"])

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('rangy', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/RangyManager/RangyManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/RangyManager/RangyManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-panel', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/AnnotationPanel/AnnotationPanel.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/AnnotationPanel/AnnotationPanel.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/AnnotationManager/AnnotationManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/AnnotationManager/AnnotationManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('section-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/SectionManager/SectionManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/SectionManager/SectionManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('search-manager', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/SearchManager/SearchManager.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/SearchManager/SearchManager.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('instruction-message', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/InstructionMessage/InstructionMessage.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/InstructionMessage/InstructionMessage.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('compact-navigation', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/CompactNavigation/CompactNavigation.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/CompactNavigation/CompactNavigation.vue")))
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('annotation-type-filter', () => __webpack_require__.e(/*! import() | client-components/ReadingComponents */ "client-components/ReadingComponents").then(__webpack_require__.bind(null, /*! ./ReadingProgressesModuels/Reading/components/AnnotationTypeFilter/AnnotationTypeFilter.vue */ "./webpack-app/client/ReadingProgressesModuels/Reading/components/AnnotationTypeFilter/AnnotationTypeFilter.vue")))


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('iframe-message-segment', _components_IframeMessageSegment_IframeMessageSegment_vue__WEBPACK_IMPORTED_MODULE_20__["default"])

/***/ }),

/***/ "./webpack-app/client/local-components.js":
/*!************************************************!*\
  !*** ./webpack-app/client/local-components.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/Loading/Loading.vue */ "./webpack-app/components/Loading/Loading.vue");
/* harmony import */ var _components_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/ErrorHandler/ErrorHandler.vue */ "./webpack-app/components/ErrorHandler/ErrorHandler.vue");
/* harmony import */ var _Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Auth/Auth.vue */ "./webpack-app/client/Auth/Auth.vue");
/* harmony import */ var _Login_Login_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Login/Login.vue */ "./webpack-app/client/Login/Login.vue");
/* harmony import */ var _StyleManager_StyleManager_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StyleManager/StyleManager.vue */ "./webpack-app/client/StyleManager/StyleManager.vue");






//import RangyManager from './components/RangyManager/RangyManager.vue'
//import NoteEditorManager from './components/NoteEditorManager/NoteEditorManager.vue'

let components = {
  Loading: _components_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  'error-handler': _components_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  Auth: _Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  //'rangy-manager': RangyManager,
  //'note-editor-manager': NoteEditorManager,
  Login: _Login_Login_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
  StyleManager: _StyleManager_StyleManager_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
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

/***/ "./webpack-app/components/ActivityTimer/ActivityTimer.html?vue&type=template&id=46a4ac00&":
/*!************************************************************************************************!*\
  !*** ./webpack-app/components/ActivityTimer/ActivityTimer.html?vue&type=template&id=46a4ac00& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ActivityTimer_html_vue_type_template_id_46a4ac00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ActivityTimer.html?vue&type=template&id=46a4ac00& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ActivityTimer/ActivityTimer.html?vue&type=template&id=46a4ac00&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ActivityTimer_html_vue_type_template_id_46a4ac00___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ActivityTimer_html_vue_type_template_id_46a4ac00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js&?3c3e":
/*!****************************************************************************************!*\
  !*** ./webpack-app/components/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js& ***!
  \****************************************************************************************/
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
      lastTime: null
    }
  },
  created() {
    let document = window.document
    document.addEventListener('mousemove', checkActed)
    document.addEventListener('keyup', checkActed)
    document.addEventListener('touchend', checkActed)
    
    let seconds = this.config.detectActivitySeconds
    this.timer = setInterval(async () => {
      this.send()
    }, seconds * 1000)
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
      //this.lib.auth.logout()
      //return
      
      if (acted === true) {
        await this.lib.AxiosHelper.get('/client/ReadingProgress/activityTimer', {
          seconds: this.toNow()
        }, (error) => {
          console.error(error)
          this.lib.auth.logout()
        })
        acted = false
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ActivityTimer);

/***/ }),

/***/ "./webpack-app/components/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js&?ee1c":
/*!****************************************************************************************!*\
  !*** ./webpack-app/components/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActivityTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ActivityTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js&?3c3e");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ActivityTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ActivityTimer/ActivityTimer.vue":
/*!****************************************************************!*\
  !*** ./webpack-app/components/ActivityTimer/ActivityTimer.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActivityTimer_html_vue_type_template_id_46a4ac00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivityTimer.html?vue&type=template&id=46a4ac00& */ "./webpack-app/components/ActivityTimer/ActivityTimer.html?vue&type=template&id=46a4ac00&");
/* harmony import */ var _ActivityTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActivityTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/ActivityTimer/ActivityTimer.js?vue&type=script&lang=js&?ee1c");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActivityTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActivityTimer_html_vue_type_template_id_46a4ac00___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ActivityTimer_html_vue_type_template_id_46a4ac00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ActivityTimer/ActivityTimer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/AdminBadge/AdminBadge.html?vue&type=template&id=6b9d8fd2&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/AdminBadge/AdminBadge.html?vue&type=template&id=6b9d8fd2&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AdminBadge_html_vue_type_template_id_6b9d8fd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./AdminBadge.html?vue&type=template&id=6b9d8fd2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/AdminBadge/AdminBadge.html?vue&type=template&id=6b9d8fd2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AdminBadge_html_vue_type_template_id_6b9d8fd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AdminBadge_html_vue_type_template_id_6b9d8fd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/AdminBadge/AdminBadge.js?vue&type=script&lang=js&?8ecd":
/*!**********************************************************************************!*\
  !*** ./webpack-app/components/AdminBadge/AdminBadge.js?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./AdminBadge.js?vue&type=script&lang=js& */ "./webpack-app/components/AdminBadge/AdminBadge.js?vue&type=script&lang=js&?f332");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_AdminBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/AdminBadge/AdminBadge.js?vue&type=script&lang=js&?f332":
/*!**********************************************************************************!*\
  !*** ./webpack-app/components/AdminBadge/AdminBadge.js?vue&type=script&lang=js& ***!
  \**********************************************************************************/
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

/***/ "./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_6b9d8fd2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_6b9d8fd2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_6b9d8fd2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_6b9d8fd2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_6b9d8fd2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AdminBadge_less_vue_type_style_index_0_id_6b9d8fd2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/AdminBadge/AdminBadge.vue":
/*!**********************************************************!*\
  !*** ./webpack-app/components/AdminBadge/AdminBadge.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdminBadge_html_vue_type_template_id_6b9d8fd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdminBadge.html?vue&type=template&id=6b9d8fd2&scoped=true& */ "./webpack-app/components/AdminBadge/AdminBadge.html?vue&type=template&id=6b9d8fd2&scoped=true&");
/* harmony import */ var _AdminBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminBadge.js?vue&type=script&lang=js& */ "./webpack-app/components/AdminBadge/AdminBadge.js?vue&type=script&lang=js&?8ecd");
/* empty/unused harmony star reexport *//* harmony import */ var _AdminBadge_less_vue_type_style_index_0_id_6b9d8fd2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true& */ "./webpack-app/components/AdminBadge/AdminBadge.less?vue&type=style&index=0&id=6b9d8fd2&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAdminBadge%5CAdminBadge.vue&lang=yaml */ "./webpack-app/components/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAdminBadge%5CAdminBadge.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AdminBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AdminBadge_html_vue_type_template_id_6b9d8fd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AdminBadge_html_vue_type_template_id_6b9d8fd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6b9d8fd2",
  null
  
)

/* custom blocks */

if (typeof _AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/AdminBadge/AdminBadge.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAdminBadge%5CAdminBadge.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAdminBadge%5CAdminBadge.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAdminBadge%5CAdminBadge.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/AdminBadge/AdminBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAdminBadge%5CAdminBadge.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_AdminBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAdminBadge_5CAdminBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/AnnotationItem/AnnotationItem.html?vue&type=template&id=b2feccdc&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItem/AnnotationItem.html?vue&type=template&id=b2feccdc&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItem_html_vue_type_template_id_b2feccdc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./AnnotationItem.html?vue&type=template&id=b2feccdc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/AnnotationItem/AnnotationItem.html?vue&type=template&id=b2feccdc&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItem_html_vue_type_template_id_b2feccdc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItem_html_vue_type_template_id_b2feccdc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js&?7b90":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js& ***!
  \******************************************************************************************/
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

/***/ "./webpack-app/components/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js&?b856":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./AnnotationItem.js?vue&type=script&lang=js& */ "./webpack-app/components/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js&?7b90");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_AnnotationItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true&":
/*!*****************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_less_vue_type_style_index_0_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true&":
/*!**********************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItem_note_less_vue_type_style_index_1_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/AnnotationItem/AnnotationItem.vue":
/*!******************************************************************!*\
  !*** ./webpack-app/components/AnnotationItem/AnnotationItem.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationItem_html_vue_type_template_id_b2feccdc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnotationItem.html?vue&type=template&id=b2feccdc&scoped=true& */ "./webpack-app/components/AnnotationItem/AnnotationItem.html?vue&type=template&id=b2feccdc&scoped=true&");
/* harmony import */ var _AnnotationItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnotationItem.js?vue&type=script&lang=js& */ "./webpack-app/components/AnnotationItem/AnnotationItem.js?vue&type=script&lang=js&?b856");
/* empty/unused harmony star reexport *//* harmony import */ var _AnnotationItem_less_vue_type_style_index_0_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true& */ "./webpack-app/components/AnnotationItem/AnnotationItem.less?vue&type=style&index=0&id=b2feccdc&lang=less&scoped=true&");
/* harmony import */ var _AnnotationItem_note_less_vue_type_style_index_1_id_b2feccdc_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true& */ "./webpack-app/components/AnnotationItem/AnnotationItem.note.less?vue&type=style&index=1&id=b2feccdc&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml */ "./webpack-app/components/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _AnnotationItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AnnotationItem_html_vue_type_template_id_b2feccdc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AnnotationItem_html_vue_type_template_id_b2feccdc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b2feccdc",
  null
  
)

/* custom blocks */

if (typeof _AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__["default"] === 'function') Object(_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_5__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/AnnotationItem/AnnotationItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/AnnotationItem/AnnotationItem.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItem%5CAnnotationItem.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItem_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItem_5CAnnotationItem_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=5d3a2f58&scoped=true&":
/*!************************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=5d3a2f58&scoped=true& ***!
  \************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItemInteractive_html_vue_type_template_id_5d3a2f58_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./AnnotationItemInteractive.html?vue&type=template&id=5d3a2f58&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=5d3a2f58&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItemInteractive_html_vue_type_template_id_5d3a2f58_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationItemInteractive_html_vue_type_template_id_5d3a2f58_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js&?6224":
/*!****************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
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

/***/ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js&?7271":
/*!****************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationItemInteractive_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./AnnotationItemInteractive.js?vue&type=script&lang=js& */ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js&?6224");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_AnnotationItemInteractive_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true&":
/*!***************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true& ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_5d3a2f58_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_5d3a2f58_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_5d3a2f58_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_5d3a2f58_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_5d3a2f58_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationItemInteractive_less_vue_type_style_index_0_id_5d3a2f58_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.vue":
/*!****************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.vue ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationItemInteractive_html_vue_type_template_id_5d3a2f58_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnotationItemInteractive.html?vue&type=template&id=5d3a2f58&scoped=true& */ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.html?vue&type=template&id=5d3a2f58&scoped=true&");
/* harmony import */ var _AnnotationItemInteractive_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnotationItemInteractive.js?vue&type=script&lang=js& */ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.js?vue&type=script&lang=js&?7271");
/* empty/unused harmony star reexport *//* harmony import */ var _AnnotationItemInteractive_less_vue_type_style_index_0_id_5d3a2f58_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true& */ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.less?vue&type=style&index=0&id=5d3a2f58&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml */ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AnnotationItemInteractive_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AnnotationItemInteractive_html_vue_type_template_id_5d3a2f58_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AnnotationItemInteractive_html_vue_type_template_id_5d3a2f58_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5d3a2f58",
  null
  
)

/* custom blocks */

if (typeof _AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/AnnotationItemInteractive/AnnotationItemInteractive.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationItemInteractive%5CAnnotationItemInteractive.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationItemInteractive_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationItemInteractive_5CAnnotationItemInteractive_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=81108e1c&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=81108e1c&scoped=true& ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationTypeButton_html_vue_type_template_id_81108e1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./AnnotationTypeButton.html?vue&type=template&id=81108e1c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=81108e1c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationTypeButton_html_vue_type_template_id_81108e1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_AnnotationTypeButton_html_vue_type_template_id_81108e1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js&?81b3":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationTypeButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./AnnotationTypeButton.js?vue&type=script&lang=js& */ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js&?d665");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_AnnotationTypeButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js&?d665":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
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

/***/ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_81108e1c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_81108e1c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_81108e1c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_81108e1c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_81108e1c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_AnnotationTypeButton_less_vue_type_style_index_0_id_81108e1c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.vue":
/*!******************************************************************************!*\
  !*** ./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.vue ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnotationTypeButton_html_vue_type_template_id_81108e1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnotationTypeButton.html?vue&type=template&id=81108e1c&scoped=true& */ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.html?vue&type=template&id=81108e1c&scoped=true&");
/* harmony import */ var _AnnotationTypeButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnotationTypeButton.js?vue&type=script&lang=js& */ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.js?vue&type=script&lang=js&?81b3");
/* empty/unused harmony star reexport *//* harmony import */ var _AnnotationTypeButton_less_vue_type_style_index_0_id_81108e1c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true& */ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.less?vue&type=style&index=0&id=81108e1c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml */ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AnnotationTypeButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AnnotationTypeButton_html_vue_type_template_id_81108e1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AnnotationTypeButton_html_vue_type_template_id_81108e1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "81108e1c",
  null
  
)

/* custom blocks */

if (typeof _AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/AnnotationTypeButton/AnnotationTypeButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CAnnotationTypeButton%5CAnnotationTypeButton.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_AnnotationTypeButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CAnnotationTypeButton_5CAnnotationTypeButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/BlockExit/BlockExit.html?vue&type=template&id=29b99a2c&":
/*!****************************************************************************************!*\
  !*** ./webpack-app/components/BlockExit/BlockExit.html?vue&type=template&id=29b99a2c& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_BlockExit_html_vue_type_template_id_29b99a2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./BlockExit.html?vue&type=template&id=29b99a2c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/BlockExit/BlockExit.html?vue&type=template&id=29b99a2c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_BlockExit_html_vue_type_template_id_29b99a2c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_BlockExit_html_vue_type_template_id_29b99a2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/BlockExit/BlockExit.js?vue&type=script&lang=js&?d75d":
/*!********************************************************************************!*\
  !*** ./webpack-app/components/BlockExit/BlockExit.js?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BlockExit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./BlockExit.js?vue&type=script&lang=js& */ "./webpack-app/components/BlockExit/BlockExit.js?vue&type=script&lang=js&?d85f");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_BlockExit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/BlockExit/BlockExit.js?vue&type=script&lang=js&?d85f":
/*!********************************************************************************!*\
  !*** ./webpack-app/components/BlockExit/BlockExit.js?vue&type=script&lang=js& ***!
  \********************************************************************************/
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

/***/ "./webpack-app/components/BlockExit/BlockExit.vue":
/*!********************************************************!*\
  !*** ./webpack-app/components/BlockExit/BlockExit.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BlockExit_html_vue_type_template_id_29b99a2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockExit.html?vue&type=template&id=29b99a2c& */ "./webpack-app/components/BlockExit/BlockExit.html?vue&type=template&id=29b99a2c&");
/* harmony import */ var _BlockExit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BlockExit.js?vue&type=script&lang=js& */ "./webpack-app/components/BlockExit/BlockExit.js?vue&type=script&lang=js&?d75d");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CBlockExit%5CBlockExit.vue&lang=yaml */ "./webpack-app/components/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CBlockExit%5CBlockExit.vue&lang=yaml");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BlockExit_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BlockExit_html_vue_type_template_id_29b99a2c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BlockExit_html_vue_type_template_id_29b99a2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* custom blocks */

if (typeof _BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_3__["default"] === 'function') Object(_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_3__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/BlockExit/BlockExit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CBlockExit%5CBlockExit.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CBlockExit%5CBlockExit.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CBlockExit%5CBlockExit.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/BlockExit/BlockExit.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CBlockExit%5CBlockExit.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_BlockExit_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CBlockExit_5CBlockExit_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=d7c8461c&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./webpack-app/components/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=d7c8461c&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CheckboxToggle_html_vue_type_template_id_d7c8461c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./CheckboxToggle.html?vue&type=template&id=d7c8461c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=d7c8461c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CheckboxToggle_html_vue_type_template_id_d7c8461c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CheckboxToggle_html_vue_type_template_id_d7c8461c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js&?73b2":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckboxToggle_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./CheckboxToggle.js?vue&type=script&lang=js& */ "./webpack-app/components/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js&?e73b");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_CheckboxToggle_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js&?e73b":
/*!******************************************************************************************!*\
  !*** ./webpack-app/components/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js& ***!
  \******************************************************************************************/
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

/***/ "./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true&":
/*!*****************************************************************************************************************************!*\
  !*** ./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_d7c8461c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_d7c8461c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_d7c8461c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_d7c8461c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_d7c8461c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CheckboxToggle_less_vue_type_style_index_0_id_d7c8461c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/CheckboxToggle/CheckboxToggle.vue":
/*!******************************************************************!*\
  !*** ./webpack-app/components/CheckboxToggle/CheckboxToggle.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckboxToggle_html_vue_type_template_id_d7c8461c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckboxToggle.html?vue&type=template&id=d7c8461c&scoped=true& */ "./webpack-app/components/CheckboxToggle/CheckboxToggle.html?vue&type=template&id=d7c8461c&scoped=true&");
/* harmony import */ var _CheckboxToggle_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckboxToggle.js?vue&type=script&lang=js& */ "./webpack-app/components/CheckboxToggle/CheckboxToggle.js?vue&type=script&lang=js&?73b2");
/* empty/unused harmony star reexport *//* harmony import */ var _CheckboxToggle_less_vue_type_style_index_0_id_d7c8461c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true& */ "./webpack-app/components/CheckboxToggle/CheckboxToggle.less?vue&type=style&index=0&id=d7c8461c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml */ "./webpack-app/components/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CheckboxToggle_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckboxToggle_html_vue_type_template_id_d7c8461c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CheckboxToggle_html_vue_type_template_id_d7c8461c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d7c8461c",
  null
  
)

/* custom blocks */

if (typeof _CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/CheckboxToggle/CheckboxToggle.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/CheckboxToggle/CheckboxToggle.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCheckboxToggle%5CCheckboxToggle.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_CheckboxToggle_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCheckboxToggle_5CCheckboxToggle_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/Clock/Clock.html?vue&type=template&id=25c43c30&":
/*!********************************************************************************!*\
  !*** ./webpack-app/components/Clock/Clock.html?vue&type=template&id=25c43c30& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Clock_html_vue_type_template_id_25c43c30___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Clock.html?vue&type=template&id=25c43c30& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/Clock/Clock.html?vue&type=template&id=25c43c30&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Clock_html_vue_type_template_id_25c43c30___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Clock_html_vue_type_template_id_25c43c30___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/Clock/Clock.js?vue&type=script&lang=js&?0d8b":
/*!************************************************************************!*\
  !*** ./webpack-app/components/Clock/Clock.js?vue&type=script&lang=js& ***!
  \************************************************************************/
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

/***/ "./webpack-app/components/Clock/Clock.js?vue&type=script&lang=js&?92ff":
/*!************************************************************************!*\
  !*** ./webpack-app/components/Clock/Clock.js?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Clock_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Clock.js?vue&type=script&lang=js& */ "./webpack-app/components/Clock/Clock.js?vue&type=script&lang=js&?0d8b");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Clock_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/Clock/Clock.vue":
/*!************************************************!*\
  !*** ./webpack-app/components/Clock/Clock.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Clock_html_vue_type_template_id_25c43c30___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clock.html?vue&type=template&id=25c43c30& */ "./webpack-app/components/Clock/Clock.html?vue&type=template&id=25c43c30&");
/* harmony import */ var _Clock_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Clock.js?vue&type=script&lang=js& */ "./webpack-app/components/Clock/Clock.js?vue&type=script&lang=js&?92ff");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Clock_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Clock_html_vue_type_template_id_25c43c30___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Clock_html_vue_type_template_id_25c43c30___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/Clock/Clock.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ConfirmModal/ConfirmModal.html?vue&type=template&id=f023f79c&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./webpack-app/components/ConfirmModal/ConfirmModal.html?vue&type=template&id=f023f79c&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ConfirmModal_html_vue_type_template_id_f023f79c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ConfirmModal.html?vue&type=template&id=f023f79c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ConfirmModal/ConfirmModal.html?vue&type=template&id=f023f79c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ConfirmModal_html_vue_type_template_id_f023f79c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ConfirmModal_html_vue_type_template_id_f023f79c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js&?2553":
/*!**************************************************************************************!*\
  !*** ./webpack-app/components/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js& ***!
  \**************************************************************************************/
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

/***/ "./webpack-app/components/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js&?5884":
/*!**************************************************************************************!*\
  !*** ./webpack-app/components/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConfirmModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ConfirmModal.js?vue&type=script&lang=js& */ "./webpack-app/components/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js&?2553");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ConfirmModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true&":
/*!*************************************************************************************************************************!*\
  !*** ./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_f023f79c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_f023f79c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_f023f79c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_f023f79c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_f023f79c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ConfirmModal_less_vue_type_style_index_0_id_f023f79c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ConfirmModal/ConfirmModal.vue":
/*!**************************************************************!*\
  !*** ./webpack-app/components/ConfirmModal/ConfirmModal.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConfirmModal_html_vue_type_template_id_f023f79c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfirmModal.html?vue&type=template&id=f023f79c&scoped=true& */ "./webpack-app/components/ConfirmModal/ConfirmModal.html?vue&type=template&id=f023f79c&scoped=true&");
/* harmony import */ var _ConfirmModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfirmModal.js?vue&type=script&lang=js& */ "./webpack-app/components/ConfirmModal/ConfirmModal.js?vue&type=script&lang=js&?5884");
/* empty/unused harmony star reexport *//* harmony import */ var _ConfirmModal_less_vue_type_style_index_0_id_f023f79c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true& */ "./webpack-app/components/ConfirmModal/ConfirmModal.less?vue&type=style&index=0&id=f023f79c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CConfirmModal%5CConfirmModal.vue&lang=yaml */ "./webpack-app/components/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CConfirmModal%5CConfirmModal.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ConfirmModal_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ConfirmModal_html_vue_type_template_id_f023f79c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ConfirmModal_html_vue_type_template_id_f023f79c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "f023f79c",
  null
  
)

/* custom blocks */

if (typeof _ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ConfirmModal/ConfirmModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CConfirmModal%5CConfirmModal.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CConfirmModal%5CConfirmModal.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CConfirmModal%5CConfirmModal.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ConfirmModal/ConfirmModal.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CConfirmModal%5CConfirmModal.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_ConfirmModal_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CConfirmModal_5CConfirmModal_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/CountdownButton/CountdownButton.html?vue&type=template&id=5ca38f4c&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./webpack-app/components/CountdownButton/CountdownButton.html?vue&type=template&id=5ca38f4c&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CountdownButton_html_vue_type_template_id_5ca38f4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./CountdownButton.html?vue&type=template&id=5ca38f4c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/CountdownButton/CountdownButton.html?vue&type=template&id=5ca38f4c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CountdownButton_html_vue_type_template_id_5ca38f4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_CountdownButton_html_vue_type_template_id_5ca38f4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/CountdownButton/CountdownButton.js?vue&type=script&lang=js&?03da":
/*!********************************************************************************************!*\
  !*** ./webpack-app/components/CountdownButton/CountdownButton.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountdownButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./CountdownButton.js?vue&type=script&lang=js& */ "./webpack-app/components/CountdownButton/CountdownButton.js?vue&type=script&lang=js&?e061");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_CountdownButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/CountdownButton/CountdownButton.js?vue&type=script&lang=js&?e061":
/*!********************************************************************************************!*\
  !*** ./webpack-app/components/CountdownButton/CountdownButton.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
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
    , 'enableClassNames', 'enable'],
  data() {    
    this.$i18n.locale = this.locale
    return {
      remainingSeconds: 0
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

/***/ "./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true&":
/*!*******************************************************************************************************************************!*\
  !*** ./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_5ca38f4c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_5ca38f4c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_5ca38f4c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_5ca38f4c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_5ca38f4c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_CountdownButton_less_vue_type_style_index_0_id_5ca38f4c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/CountdownButton/CountdownButton.vue":
/*!********************************************************************!*\
  !*** ./webpack-app/components/CountdownButton/CountdownButton.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountdownButton_html_vue_type_template_id_5ca38f4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountdownButton.html?vue&type=template&id=5ca38f4c&scoped=true& */ "./webpack-app/components/CountdownButton/CountdownButton.html?vue&type=template&id=5ca38f4c&scoped=true&");
/* harmony import */ var _CountdownButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountdownButton.js?vue&type=script&lang=js& */ "./webpack-app/components/CountdownButton/CountdownButton.js?vue&type=script&lang=js&?03da");
/* empty/unused harmony star reexport *//* harmony import */ var _CountdownButton_less_vue_type_style_index_0_id_5ca38f4c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true& */ "./webpack-app/components/CountdownButton/CountdownButton.less?vue&type=style&index=0&id=5ca38f4c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCountdownButton%5CCountdownButton.vue&lang=yaml */ "./webpack-app/components/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCountdownButton%5CCountdownButton.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CountdownButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CountdownButton_html_vue_type_template_id_5ca38f4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CountdownButton_html_vue_type_template_id_5ca38f4c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5ca38f4c",
  null
  
)

/* custom blocks */

if (typeof _CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/CountdownButton/CountdownButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCountdownButton%5CCountdownButton.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCountdownButton%5CCountdownButton.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCountdownButton%5CCountdownButton.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/CountdownButton/CountdownButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CCountdownButton%5CCountdownButton.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_CountdownButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CCountdownButton_5CCountdownButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=3fb22da8&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=3fb22da8&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_DigitalCountdownTimer_html_vue_type_template_id_3fb22da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./DigitalCountdownTimer.html?vue&type=template&id=3fb22da8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=3fb22da8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_DigitalCountdownTimer_html_vue_type_template_id_3fb22da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_DigitalCountdownTimer_html_vue_type_template_id_3fb22da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js&?190b":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DigitalCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./DigitalCountdownTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js&?fdd1");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_DigitalCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js&?fdd1":
/*!********************************************************************************************************!*\
  !*** ./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
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

/***/ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true&":
/*!*******************************************************************************************************************************************!*\
  !*** ./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_3fb22da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_3fb22da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_3fb22da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_3fb22da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_3fb22da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_DigitalCountdownTimer_less_vue_type_style_index_0_id_3fb22da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.vue":
/*!********************************************************************************!*\
  !*** ./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.vue ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DigitalCountdownTimer_html_vue_type_template_id_3fb22da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DigitalCountdownTimer.html?vue&type=template&id=3fb22da8&scoped=true& */ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.html?vue&type=template&id=3fb22da8&scoped=true&");
/* harmony import */ var _DigitalCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DigitalCountdownTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.js?vue&type=script&lang=js&?190b");
/* empty/unused harmony star reexport *//* harmony import */ var _DigitalCountdownTimer_less_vue_type_style_index_0_id_3fb22da8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true& */ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.less?vue&type=style&index=0&id=3fb22da8&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml */ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DigitalCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DigitalCountdownTimer_html_vue_type_template_id_3fb22da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DigitalCountdownTimer_html_vue_type_template_id_3fb22da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3fb22da8",
  null
  
)

/* custom blocks */

if (typeof _DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/DigitalCountdownTimer/DigitalCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CDigitalCountdownTimer%5CDigitalCountdownTimer.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_DigitalCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CDigitalCountdownTimer_5CDigitalCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/DigitalCountdownTimer/fonts/digital-7.ttf":
/*!**************************************************************************!*\
  !*** ./webpack-app/components/DigitalCountdownTimer/fonts/digital-7.ttf ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "http://127.0.0.1:3333/spa/asset/digital-7.ttf";

/***/ }),

/***/ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=20b1c012&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./webpack-app/components/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=20b1c012&scoped=true& ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_IframeMessageSegment_html_vue_type_template_id_20b1c012_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./IframeMessageSegment.html?vue&type=template&id=20b1c012&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=20b1c012&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_IframeMessageSegment_html_vue_type_template_id_20b1c012_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_IframeMessageSegment_html_vue_type_template_id_20b1c012_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js&?2183":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let IframeMessageSegment = {
  props: ['config', 'message'],
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

/***/ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js&?dec1":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IframeMessageSegment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./IframeMessageSegment.js?vue&type=script&lang=js& */ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js&?2183");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_IframeMessageSegment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************!*\
  !*** ./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_20b1c012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_20b1c012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_20b1c012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_20b1c012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_20b1c012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_IframeMessageSegment_less_vue_type_style_index_0_id_20b1c012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.vue":
/*!******************************************************************************!*\
  !*** ./webpack-app/components/IframeMessageSegment/IframeMessageSegment.vue ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IframeMessageSegment_html_vue_type_template_id_20b1c012_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IframeMessageSegment.html?vue&type=template&id=20b1c012&scoped=true& */ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.html?vue&type=template&id=20b1c012&scoped=true&");
/* harmony import */ var _IframeMessageSegment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IframeMessageSegment.js?vue&type=script&lang=js& */ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.js?vue&type=script&lang=js&?dec1");
/* empty/unused harmony star reexport *//* harmony import */ var _IframeMessageSegment_less_vue_type_style_index_0_id_20b1c012_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true& */ "./webpack-app/components/IframeMessageSegment/IframeMessageSegment.less?vue&type=style&index=0&id=20b1c012&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _IframeMessageSegment_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IframeMessageSegment_html_vue_type_template_id_20b1c012_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IframeMessageSegment_html_vue_type_template_id_20b1c012_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "20b1c012",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/IframeMessageSegment/IframeMessageSegment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=5ef4b5d2&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=5ef4b5d2&scoped=true& ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_SimpleCountdownTimer_html_vue_type_template_id_5ef4b5d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./SimpleCountdownTimer.html?vue&type=template&id=5ef4b5d2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=5ef4b5d2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_SimpleCountdownTimer_html_vue_type_template_id_5ef4b5d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_SimpleCountdownTimer_html_vue_type_template_id_5ef4b5d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js&?1e7f":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
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

/***/ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js&?df8f":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SimpleCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./SimpleCountdownTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js&?1e7f");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_SimpleCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true&":
/*!*****************************************************************************************************************************************!*\
  !*** ./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_5ef4b5d2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_5ef4b5d2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_5ef4b5d2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_5ef4b5d2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_5ef4b5d2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_SimpleCountdownTimer_less_vue_type_style_index_0_id_5ef4b5d2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.vue":
/*!******************************************************************************!*\
  !*** ./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.vue ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SimpleCountdownTimer_html_vue_type_template_id_5ef4b5d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SimpleCountdownTimer.html?vue&type=template&id=5ef4b5d2&scoped=true& */ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.html?vue&type=template&id=5ef4b5d2&scoped=true&");
/* harmony import */ var _SimpleCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SimpleCountdownTimer.js?vue&type=script&lang=js& */ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.js?vue&type=script&lang=js&?df8f");
/* empty/unused harmony star reexport *//* harmony import */ var _SimpleCountdownTimer_less_vue_type_style_index_0_id_5ef4b5d2_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true& */ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.less?vue&type=style&index=0&id=5ef4b5d2&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml */ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SimpleCountdownTimer_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SimpleCountdownTimer_html_vue_type_template_id_5ef4b5d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SimpleCountdownTimer_html_vue_type_template_id_5ef4b5d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5ef4b5d2",
  null
  
)

/* custom blocks */

if (typeof _SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/SimpleCountdownTimer/SimpleCountdownTimer.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CSimpleCountdownTimer%5CSimpleCountdownTimer.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_SimpleCountdownTimer_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CSimpleCountdownTimer_5CSimpleCountdownTimer_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=016deec0&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./webpack-app/components/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=016deec0&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserAvatarIcons_html_vue_type_template_id_016deec0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./UserAvatarIcons.html?vue&type=template&id=016deec0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=016deec0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserAvatarIcons_html_vue_type_template_id_016deec0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserAvatarIcons_html_vue_type_template_id_016deec0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js&?a127":
/*!********************************************************************************************!*\
  !*** ./webpack-app/components/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
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

/***/ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js&?a33f":
/*!********************************************************************************************!*\
  !*** ./webpack-app/components/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserAvatarIcons_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./UserAvatarIcons.js?vue&type=script&lang=js& */ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js&?a127");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_UserAvatarIcons_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true&":
/*!*******************************************************************************************************************************!*\
  !*** ./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_016deec0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_016deec0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_016deec0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_016deec0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_016deec0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserAvatarIcons_less_vue_type_style_index_0_id_016deec0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.vue":
/*!********************************************************************!*\
  !*** ./webpack-app/components/UserAvatarIcons/UserAvatarIcons.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserAvatarIcons_html_vue_type_template_id_016deec0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserAvatarIcons.html?vue&type=template&id=016deec0&scoped=true& */ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.html?vue&type=template&id=016deec0&scoped=true&");
/* harmony import */ var _UserAvatarIcons_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserAvatarIcons.js?vue&type=script&lang=js& */ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.js?vue&type=script&lang=js&?a33f");
/* empty/unused harmony star reexport *//* harmony import */ var _UserAvatarIcons_less_vue_type_style_index_0_id_016deec0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true& */ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.less?vue&type=style&index=0&id=016deec0&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml */ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserAvatarIcons_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserAvatarIcons_html_vue_type_template_id_016deec0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserAvatarIcons_html_vue_type_template_id_016deec0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "016deec0",
  null
  
)

/* custom blocks */

if (typeof _UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/UserAvatarIcons/UserAvatarIcons.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/UserAvatarIcons/UserAvatarIcons.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserAvatarIcons%5CUserAvatarIcons.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserAvatarIcons_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserAvatarIcons_5CUserAvatarIcons_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=50e6c628&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./webpack-app/components/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=50e6c628&scoped=true& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserSelfBadge_html_vue_type_template_id_50e6c628_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./UserSelfBadge.html?vue&type=template&id=50e6c628&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=50e6c628&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserSelfBadge_html_vue_type_template_id_50e6c628_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_UserSelfBadge_html_vue_type_template_id_50e6c628_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js&?5446":
/*!****************************************************************************************!*\
  !*** ./webpack-app/components/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSelfBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./UserSelfBadge.js?vue&type=script&lang=js& */ "./webpack-app/components/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js&?e5af");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_UserSelfBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js&?e5af":
/*!****************************************************************************************!*\
  !*** ./webpack-app/components/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js& ***!
  \****************************************************************************************/
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

/***/ "./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true&":
/*!***************************************************************************************************************************!*\
  !*** ./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true& ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_50e6c628_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_50e6c628_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_50e6c628_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_50e6c628_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_50e6c628_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_UserSelfBadge_less_vue_type_style_index_0_id_50e6c628_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/UserSelfBadge/UserSelfBadge.vue":
/*!****************************************************************!*\
  !*** ./webpack-app/components/UserSelfBadge/UserSelfBadge.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSelfBadge_html_vue_type_template_id_50e6c628_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSelfBadge.html?vue&type=template&id=50e6c628&scoped=true& */ "./webpack-app/components/UserSelfBadge/UserSelfBadge.html?vue&type=template&id=50e6c628&scoped=true&");
/* harmony import */ var _UserSelfBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSelfBadge.js?vue&type=script&lang=js& */ "./webpack-app/components/UserSelfBadge/UserSelfBadge.js?vue&type=script&lang=js&?5446");
/* empty/unused harmony star reexport *//* harmony import */ var _UserSelfBadge_less_vue_type_style_index_0_id_50e6c628_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true& */ "./webpack-app/components/UserSelfBadge/UserSelfBadge.less?vue&type=style&index=0&id=50e6c628&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml */ "./webpack-app/components/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserSelfBadge_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSelfBadge_html_vue_type_template_id_50e6c628_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSelfBadge_html_vue_type_template_id_50e6c628_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "50e6c628",
  null
  
)

/* custom blocks */

if (typeof _UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/UserSelfBadge/UserSelfBadge.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/UserSelfBadge/UserSelfBadge.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CUserSelfBadge%5CUserSelfBadge.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_UserSelfBadge_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CUserSelfBadge_5CUserSelfBadge_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ValidationButton/ValidationButton.html?vue&type=template&id=8774681c&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./webpack-app/components/ValidationButton/ValidationButton.html?vue&type=template&id=8774681c&scoped=true& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ValidationButton_html_vue_type_template_id_8774681c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./ValidationButton.html?vue&type=template&id=8774681c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/components/ValidationButton/ValidationButton.html?vue&type=template&id=8774681c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ValidationButton_html_vue_type_template_id_8774681c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_ValidationButton_html_vue_type_template_id_8774681c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/components/ValidationButton/ValidationButton.js?vue&type=script&lang=js&?6986":
/*!**********************************************************************************************!*\
  !*** ./webpack-app/components/ValidationButton/ValidationButton.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
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

/***/ "./webpack-app/components/ValidationButton/ValidationButton.js?vue&type=script&lang=js&?cb5e":
/*!**********************************************************************************************!*\
  !*** ./webpack-app/components/ValidationButton/ValidationButton.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ValidationButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./ValidationButton.js?vue&type=script&lang=js& */ "./webpack-app/components/ValidationButton/ValidationButton.js?vue&type=script&lang=js&?6986");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_ValidationButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true&":
/*!*********************************************************************************************************************************!*\
  !*** ./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_8774681c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_8774681c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_8774681c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_8774681c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_8774681c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_ValidationButton_less_vue_type_style_index_0_id_8774681c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/components/ValidationButton/ValidationButton.vue":
/*!**********************************************************************!*\
  !*** ./webpack-app/components/ValidationButton/ValidationButton.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ValidationButton_html_vue_type_template_id_8774681c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ValidationButton.html?vue&type=template&id=8774681c&scoped=true& */ "./webpack-app/components/ValidationButton/ValidationButton.html?vue&type=template&id=8774681c&scoped=true&");
/* harmony import */ var _ValidationButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ValidationButton.js?vue&type=script&lang=js& */ "./webpack-app/components/ValidationButton/ValidationButton.js?vue&type=script&lang=js&?cb5e");
/* empty/unused harmony star reexport *//* harmony import */ var _ValidationButton_less_vue_type_style_index_0_id_8774681c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true& */ "./webpack-app/components/ValidationButton/ValidationButton.less?vue&type=style&index=0&id=8774681c&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CValidationButton%5CValidationButton.vue&lang=yaml */ "./webpack-app/components/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CValidationButton%5CValidationButton.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ValidationButton_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ValidationButton_html_vue_type_template_id_8774681c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ValidationButton_html_vue_type_template_id_8774681c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8774681c",
  null
  
)

/* custom blocks */

if (typeof _ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/components/ValidationButton/ValidationButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/components/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CValidationButton%5CValidationButton.vue&lang=yaml":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/components/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CValidationButton%5CValidationButton.vue&lang=yaml ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CValidationButton%5CValidationButton.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/components/ValidationButton/ValidationButton.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Ccomponents%5CValidationButton%5CValidationButton.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_ValidationButton_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Ccomponents_5CValidationButton_5CValidationButton_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

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
        resolve()
      }, ms)
    })
  } 
}

/* harmony default export */ __webpack_exports__["default"] = (VueHelper);

/***/ })

/******/ });
//# sourceMappingURL=client.js.map