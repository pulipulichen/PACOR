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
/******/ 		return __webpack_require__.p + "" + ({"client-components/Chat":"client-components/Chat","client-components/Login":"client-components/Login","vendors/semantic-ui-niwsf":"vendors/semantic-ui-niwsf"}[chunkId]||chunkId) + ".js"
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

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CNoteEditorManager%5CNoteEditorManager.vue":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CNoteEditorManager%5CNoteEditorManager.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/components/RangyManager/RangyManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CRangyManager%5CRangyManager.vue":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/client/components/RangyManager/RangyManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CRangyManager%5CRangyManager.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":{},"zh-TW":{"User {0} is not existed.":"使用者{0}不存在。","User {0} is registed.":"使用者{0}已經註冊。","Password is incorrect.":"密碼錯誤。","Username":"使用者名稱","Password":"密碼","Email":"電子信箱地址","Login":"登入","Register":"註冊","Login from Google":"從Google帳號登入","Login from GitHub":"從GitHub帳號登入","Login from Instagram":"從Instagram帳號登入"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js?!./webpack-app/vendors/summernote/summernote-lite.less":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/vendors/summernote/summernote-lite.less ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Imports
var getUrl = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ./font/summernote.eot?4c7e83314b68cfa6a0d18a8b4690044b */ "./webpack-app/vendors/summernote/font/summernote.eot?4c7e83314b68cfa6a0d18a8b4690044b"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! ./font/summernote.eot?4c7e83314b68cfa6a0d18a8b4690044b */ "./webpack-app/vendors/summernote/font/summernote.eot?4c7e83314b68cfa6a0d18a8b4690044b") + "#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! ./font/summernote.woff?4c7e83314b68cfa6a0d18a8b4690044b */ "./webpack-app/vendors/summernote/font/summernote.woff?4c7e83314b68cfa6a0d18a8b4690044b"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! ./font/summernote.ttf?4c7e83314b68cfa6a0d18a8b4690044b */ "./webpack-app/vendors/summernote/font/summernote.ttf?4c7e83314b68cfa6a0d18a8b4690044b"));
// Module
exports.push([module.i, "@font-face {\n  font-family: \"summernote\";\n  font-style: normal;\n  font-weight: normal;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"truetype\");\n}\n[class^=\"note-icon-\"]:before,\n[class*=\" note-icon-\"]:before {\n  display: inline-block;\n  font: normal normal normal 14px summernote;\n  font-size: inherit;\n  -webkit-font-smoothing: antialiased;\n  text-decoration: inherit;\n  text-rendering: auto;\n  text-transform: none;\n  vertical-align: middle;\n  speak: none;\n  -moz-osx-font-smoothing: grayscale;\n}\n.note-icon-align-center:before,\n.note-icon-align-indent:before,\n.note-icon-align-justify:before,\n.note-icon-align-left:before,\n.note-icon-align-outdent:before,\n.note-icon-align-right:before,\n.note-icon-align:before,\n.note-icon-arrow-circle-down:before,\n.note-icon-arrow-circle-left:before,\n.note-icon-arrow-circle-right:before,\n.note-icon-arrow-circle-up:before,\n.note-icon-arrows-alt:before,\n.note-icon-arrows-h:before,\n.note-icon-arrows-v:before,\n.note-icon-bold:before,\n.note-icon-caret:before,\n.note-icon-chain-broken:before,\n.note-icon-circle:before,\n.note-icon-close:before,\n.note-icon-code:before,\n.note-icon-col-after:before,\n.note-icon-col-before:before,\n.note-icon-col-remove:before,\n.note-icon-eraser:before,\n.note-icon-font:before,\n.note-icon-frame:before,\n.note-icon-italic:before,\n.note-icon-link:before,\n.note-icon-magic:before,\n.note-icon-menu-check:before,\n.note-icon-minus:before,\n.note-icon-orderedlist:before,\n.note-icon-pencil:before,\n.note-icon-picture:before,\n.note-icon-question:before,\n.note-icon-redo:before,\n.note-icon-row-above:before,\n.note-icon-row-below:before,\n.note-icon-row-remove:before,\n.note-icon-special-character:before,\n.note-icon-square:before,\n.note-icon-strikethrough:before,\n.note-icon-subscript:before,\n.note-icon-summernote:before,\n.note-icon-superscript:before,\n.note-icon-table:before,\n.note-icon-text-height:before,\n.note-icon-trash:before,\n.note-icon-underline:before,\n.note-icon-undo:before,\n.note-icon-unorderedlist:before,\n.note-icon-video:before {\n  display: inline-block;\n  font-family: \"summernote\";\n  font-style: normal;\n  font-weight: normal;\n  text-decoration: inherit;\n}\n.note-icon-align-center:before {\n  content: \"\\f101\";\n}\n.note-icon-align-indent:before {\n  content: \"\\f102\";\n}\n.note-icon-align-justify:before {\n  content: \"\\f103\";\n}\n.note-icon-align-left:before {\n  content: \"\\f104\";\n}\n.note-icon-align-outdent:before {\n  content: \"\\f105\";\n}\n.note-icon-align-right:before {\n  content: \"\\f106\";\n}\n.note-icon-align:before {\n  content: \"\\f107\";\n}\n.note-icon-arrow-circle-down:before {\n  content: \"\\f108\";\n}\n.note-icon-arrow-circle-left:before {\n  content: \"\\f109\";\n}\n.note-icon-arrow-circle-right:before {\n  content: \"\\f10a\";\n}\n.note-icon-arrow-circle-up:before {\n  content: \"\\f10b\";\n}\n.note-icon-arrows-alt:before {\n  content: \"\\f10c\";\n}\n.note-icon-arrows-h:before {\n  content: \"\\f10d\";\n}\n.note-icon-arrows-v:before {\n  content: \"\\f10e\";\n}\n.note-icon-bold:before {\n  content: \"\\f10f\";\n}\n.note-icon-caret:before {\n  content: \"\\f110\";\n}\n.note-icon-chain-broken:before {\n  content: \"\\f111\";\n}\n.note-icon-circle:before {\n  content: \"\\f112\";\n}\n.note-icon-close:before {\n  content: \"\\f113\";\n}\n.note-icon-code:before {\n  content: \"\\f114\";\n}\n.note-icon-col-after:before {\n  content: \"\\f115\";\n}\n.note-icon-col-before:before {\n  content: \"\\f116\";\n}\n.note-icon-col-remove:before {\n  content: \"\\f117\";\n}\n.note-icon-eraser:before {\n  content: \"\\f118\";\n}\n.note-icon-font:before {\n  content: \"\\f119\";\n}\n.note-icon-frame:before {\n  content: \"\\f11a\";\n}\n.note-btn-formatBlock {\n  padding: 0 !important;\n}\n.note-btn-formatBlock > * {\n  line-height: 9px !important;\n  padding: 5px 10px !important;\n  margin: 0 !important;\n  height: 29px !important;\n  text-indent: 0 !important;\n  background-color: transparent;\n  border-width: 0;\n  border-radius: inherit;\n  color: #000;\n}\n.note-btn-formatBlock > *:before {\n  content: \"<H1>\";\n  font-size: 14px !important;\n  font-weight: bold;\n  line-height: 20px;\n}\n.note-btn-formatBlock > h1,\n.note-btn-formatBlock > h2 {\n  line-height: 0 !important;\n}\n.note-btn-formatBlock > h2:before {\n  content: \"<H2>\" !important;\n}\n.note-btn-formatBlock > h3:before {\n  content: \"<H3>\" !important;\n}\n.note-btn-formatBlock > h4:before {\n  content: \"<H4>\" !important;\n}\n.note-btn-formatBlock > h5:before {\n  content: \"<H5>\" !important;\n}\n.note-btn-formatBlock > h6:before {\n  content: \"<H6>\" !important;\n}\n.note-btn-formatBlock > p:before {\n  content: \"<P>\" !important;\n  font-weight: normal;\n}\n.note-btn-formatBlock > code:before {\n  content: \"<CODE>\" !important;\n  font-weight: normal;\n  line-height: 29px;\n}\n.note-icon-italic:before {\n  content: \"\\f11b\";\n}\n.note-icon-link:before {\n  content: \"\\f11c\";\n}\n.note-icon-magic:before {\n  content: \"\\f11d\";\n}\n.note-icon-menu-check:before {\n  content: \"\\f11e\";\n}\n.note-icon-minus:before {\n  content: \"\\f11f\";\n}\n.note-icon-orderedlist:before {\n  content: \"\\f120\";\n}\n.note-icon-pencil:before {\n  content: \"\\f121\";\n}\n.note-icon-picture:before {\n  content: \"\\f122\";\n}\n.note-icon-question:before {\n  content: \"\\f123\";\n}\n.note-icon-redo:before {\n  content: \"\\f124\";\n}\n.note-icon-row-above:before {\n  content: \"\\f125\";\n}\n.note-icon-row-below:before {\n  content: \"\\f126\";\n}\n.note-icon-row-remove:before {\n  content: \"\\f127\";\n}\n.note-icon-special-character:before {\n  content: \"\\f128\";\n}\n.note-icon-square:before {\n  content: \"\\f129\";\n}\n.note-icon-strikethrough:before {\n  content: \"\\f12a\";\n}\n.note-icon-subscript:before {\n  content: \"\\f12b\";\n}\n.note-icon-summernote:before {\n  content: \"\\f12c\";\n}\n.note-icon-superscript:before {\n  content: \"\\f12d\";\n}\n.note-icon-table:before {\n  content: \"\\f12e\";\n}\n.note-icon-text-height:before {\n  content: \"\\f12f\";\n}\n.note-icon-trash:before {\n  content: \"\\f130\";\n}\n.note-icon-underline:before {\n  content: \"\\f131\";\n}\n.note-icon-undo:before {\n  content: \"\\f132\";\n}\n.note-icon-unorderedlist:before {\n  content: \"\\f133\";\n}\n.note-icon-video:before {\n  content: \"\\f134\";\n}\n.note-frame * {\n  /* color: #000; */\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\np {\n  margin: 0 0 10px;\n}\nkbd {\n  padding: 3px 5px;\n  font-weight: 700;\n  color: #fff;\n  background-color: #000;\n  border-radius: 2px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.note-toolbar {\n  padding: 10px 5px;\n  border-bottom: 1px solid #e2e2e2;\n}\n.note-btn-group {\n  position: relative;\n  display: inline-block;\n  margin-right: 8px;\n}\n.note-btn-group > .note-btn-group {\n  margin-right: 0;\n}\n.note-btn-group > .note-btn,\n.note-btn-group > .note-btn-group {\n  margin-left: -4px;\n  border-radius: 0;\n}\n.note-btn-group > .note-btn.focus,\n.note-btn-group > .note-btn-group.focus,\n.note-btn-group > .note-btn.active,\n.note-btn-group > .note-btn-group.active {\n  border-radius: 0;\n}\n.note-btn-group > .note-btn:first-child,\n.note-btn-group > .note-btn-group:first-child {\n  margin-left: 0;\n  border-bottom-left-radius: 1px;\n  border-top-left-radius: 1px;\n}\n.note-btn-group > .note-btn:first-child.focus,\n.note-btn-group > .note-btn-group:first-child.focus,\n.note-btn-group > .note-btn:first-child.active,\n.note-btn-group > .note-btn-group:first-child.active {\n  border-bottom-left-radius: 1px;\n  border-top-left-radius: 1px;\n}\n.note-btn-group > .note-btn:last-child:not(.note-dropdown),\n.note-btn-group > .note-btn-group:last-child:not(.note-dropdown) {\n  border-top-right-radius: 1px;\n  border-bottom-right-radius: 1px;\n}\n.note-btn-group > .note-btn:last-child:not(.note-dropdown).focus,\n.note-btn-group > .note-btn-group:last-child:not(.note-dropdown).focus,\n.note-btn-group > .note-btn:last-child:not(.note-dropdown).active,\n.note-btn-group > .note-btn-group:last-child:not(.note-dropdown).active {\n  border-top-right-radius: 1px;\n  border-bottom-right-radius: 1px;\n}\n.note-btn-group.open > .note-dropdown {\n  display: block;\n}\n.note-btn {\n  display: inline-block;\n  padding: 5px 10px;\n  margin-bottom: 0;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1.4;\n  color: #333;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  cursor: pointer;\n  background-color: #fff;\n  background-image: none;\n  /* border: 1px solid #fff; */\n  border: 1px solid transparent;\n  border-color: #fff;\n  border-radius: 1px;\n  outline: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  touch-action: manipulation;\n}\n.note-btn:focus,\n.note-btn.focus {\n  color: #333;\n  background-color: #ebebeb;\n  /*border-color: #fff;*/\n  border-color: transparent;\n}\n.note-btn:hover {\n  color: #333;\n  background-color: #ebebeb;\n  /*border-color: #fff;*/\n  border-color: transparent;\n}\n.note-btn.disabled:focus,\n.note-btn[disabled]:focus,\nfieldset[disabled] .note-btn:focus,\n.note-btn.disabled.focus,\n.note-btn[disabled].focus,\nfieldset[disabled] .note-btn.focus {\n  background-color: #fff;\n  border-color: #fff;\n}\n.note-btn:hover,\n.note-btn:focus,\n.note-btn.focus {\n  color: #333;\n  text-decoration: none;\n  background-color: #ebebeb;\n  border: 1px solid #fff;\n  -webkit-border-radius: 1px;\n  -moz-border-radius: 1px;\n  border-radius: 1px;\n  outline: 0;\n}\n.note-btn:active,\n.note-btn.active {\n  background-image: none;\n  outline: 0;\n}\n.note-btn.disabled,\n.note-btn[disabled],\nfieldset[disabled] .note-btn {\n  cursor: not-allowed;\n  -webkit-opacity: 0.65;\n  -khtml-opacity: 0.65;\n  -moz-opacity: 0.65;\n  opacity: 0.65;\n  -ms-filter: alpha(opacity=65);\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n}\n.note-btn-primary {\n  color: #fff;\n  background: #fa6362;\n}\n.note-btn-primary:hover,\n.note-btn-primary:focus,\n.note-btn-primary.focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #fa6362;\n  border: 1px solid #fff;\n  -webkit-border-radius: 1px;\n  -moz-border-radius: 1px;\n  border-radius: 1px;\n}\n.note-btn-block {\n  display: block;\n  width: 100%;\n}\n.note-btn-block + .note-btn-block {\n  margin-top: 5px;\n}\ninput[type=\"submit\"].note-btn-block,\ninput[type=\"reset\"].note-btn-block,\ninput[type=\"button\"].note-btn-block {\n  width: 100%;\n}\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n.close {\n  float: right;\n  font-size: 21px;\n  line-height: 1;\n  color: #000;\n  opacity: 0.2;\n}\n.close:hover {\n  -webkit-opacity: 1;\n  -khtml-opacity: 1;\n  -moz-opacity: 1;\n  opacity: 1;\n  -ms-filter: alpha(opacity=100);\n  filter: alpha(opacity=100);\n}\n.note-dropdown {\n  position: relative;\n}\n.note-dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 100px;\n  padding: 5px;\n  text-align: left;\n  background: #fff;\n  border: 1px solid #e2e2e2;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);\n  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);\n  background-clip: padding-box;\n  max-height: 200px;\n  overflow-y: auto;\n}\n.note-btn-group.open .note-dropdown-menu {\n  display: block;\n}\n.note-dropdown-item {\n  display: block;\n}\n.note-dropdown-item:hover {\n  background-color: #ebebeb;\n}\na.note-dropdown-item,\na.note-dropdown-item:hover {\n  margin: 2px 0;\n  color: #000;\n  text-decoration: none;\n}\na.note-dropdown-item > * {\n  text-indent: inherit !important;\n}\n.note-dropdown-item sub,\n.note-dropdown-item sup {\n  font-size: 1rem;\n  line-height: 1rem;\n  top: 0;\n}\n.note-modal {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  -webkit-opacity: 1;\n  -khtml-opacity: 1;\n  -moz-opacity: 1;\n  opacity: 1;\n  -ms-filter: alpha(opacity=100);\n  filter: alpha(opacity=100);\n}\n.note-modal.open {\n  display: block;\n}\n.note-modal-content {\n  position: relative;\n  width: auto;\n  margin: 30px 20px;\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  outline: 0;\n  background-clip: border-box;\n}\n.note-modal-header {\n  padding: 30px 20px 20px 20px;\n  border: 1px solid #ededef;\n}\n.note-modal-header .close {\n  margin-top: -10px;\n}\n.note-modal-body {\n  position: relative;\n  padding: 20px 30px;\n}\n.note-modal-footer {\n  height: 40px;\n  padding: 10px;\n  text-align: center;\n}\n.note-modal-footer a {\n  color: #337ab7;\n  text-decoration: none;\n}\n.note-modal-footer a:hover,\n.note-modal-footer a:focus {\n  color: #23527c;\n  text-decoration: underline;\n}\n.note-modal-footer .note-btn {\n  float: right;\n}\n.note-modal-title {\n  margin: 0;\n  font-size: 26px;\n  line-height: 1.4;\n  color: #42515f;\n}\n.note-modal-backdrop {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  display: none;\n  background: #000;\n  -webkit-opacity: 0.5;\n  -khtml-opacity: 0.5;\n  -moz-opacity: 0.5;\n  opacity: 0.5;\n  -ms-filter: alpha(opacity=50);\n  filter: alpha(opacity=50);\n}\n.note-modal-backdrop.open {\n  display: block;\n}\n@media (min-width: 768px) {\n  .note-modal-content {\n    width: 600px;\n    margin: 30px auto;\n  }\n}\n@media (min-width: 992px) {\n  .note-modal-content-large {\n    width: 900px;\n  }\n}\n.note-form-group {\n  padding-bottom: 20px;\n}\n.note-form-group:last-child {\n  padding-bottom: 0;\n}\n.note-form-label {\n  display: block;\n  margin-bottom: 10px;\n  font-size: 16px;\n  font-weight: 700;\n  color: #42515f;\n}\n.note-input {\n  display: block;\n  width: 100%;\n  padding: 6px 4px;\n  font-size: 14px;\n  background: #fff;\n  border: 1px solid #ededef;\n  outline: 0;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.note-input::-webkit-input-placeholder {\n  color: #eee;\n}\n.note-input:-moz-placeholder {\n  color: #eee;\n}\n.note-input::-moz-placeholder {\n  color: #eee;\n}\n.note-input:-ms-input-placeholder {\n  color: #eee;\n}\n.note-tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-size: 13px;\n  -webkit-opacity: 0;\n  -khtml-opacity: 0;\n  -moz-opacity: 0;\n  opacity: 0;\n  -ms-filter: alpha(opacity=0);\n  filter: alpha(opacity=0);\n}\n.note-tooltip.in {\n  -webkit-opacity: 0.9;\n  -khtml-opacity: 0.9;\n  -moz-opacity: 0.9;\n  opacity: 0.9;\n  -ms-filter: alpha(opacity=90);\n  filter: alpha(opacity=90);\n}\n.note-tooltip.top {\n  padding: 5px 0;\n  margin-top: -3px;\n}\n.note-tooltip.right {\n  padding: 0 5px;\n  margin-left: 3px;\n}\n.note-tooltip.bottom {\n  padding: 5px 0;\n  margin-top: 3px;\n}\n.note-tooltip.left {\n  padding: 0 5px;\n  margin-left: -3px;\n}\n.note-tooltip.bottom .note-tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-bottom-color: #000;\n  border-width: 0 5px 5px;\n}\n.note-tooltip.top .note-tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-top-color: #000;\n  border-width: 5px 5px 0;\n}\n.note-tooltip.right .note-tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-right-color: #000;\n  border-width: 5px 5px 5px 0;\n}\n.note-tooltip.left .note-tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-left-color: #000;\n  border-width: 5px 0 5px 5px;\n}\n.note-tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.note-tooltip-content {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n}\n.note-popover {\n  position: absolute;\n  /*z-index: 1060;*/\n  z-index: 960;\n  display: block;\n  display: none;\n  font-size: 13px;\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border: 1px solid #ccc;\n}\n.note-popover.in {\n  display: block;\n}\n.note-popover.top {\n  padding: 5 0;\n  margin-top: -3px;\n}\n.note-popover.right {\n  padding: 0 5;\n  margin-left: 3px;\n}\n.note-popover.bottom {\n  padding: 5 0;\n  margin-top: 3px;\n}\n.note-popover.left {\n  padding: 0 5;\n  margin-left: -3px;\n}\n.note-popover.bottom .note-popover-arrow {\n  top: -11px;\n  left: 50%;\n  margin-left: -10px;\n  border-bottom-color: #999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  border-top-width: 0;\n}\n.note-popover.bottom .note-popover-arrow::after {\n  top: 1px;\n  margin-left: -10px;\n  border-bottom-color: #fff;\n  border-top-width: 0;\n  content: \" \";\n}\n.note-popover.top .note-popover-arrow {\n  bottom: -11px;\n  left: 50%;\n  margin-left: -10px;\n  border-top-color: #999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  border-bottom-width: 0;\n}\n.note-popover.top .note-popover-arrow::after {\n  bottom: 1px;\n  margin-left: -10px;\n  border-top-color: #fff;\n  border-bottom-width: 0;\n  content: \" \";\n}\n.note-popover.right .note-popover-arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -10px;\n  border-right-color: #999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n  border-left-width: 0;\n}\n.note-popover.right .note-popover-arrow::after {\n  left: 1px;\n  margin-top: -10px;\n  border-right-color: #fff;\n  border-left-width: 0;\n  content: \" \";\n}\n.note-popover.left .note-popover-arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -10px;\n  border-left-color: #999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n  border-right-width: 0;\n}\n.note-popover.left .note-popover-arrow::after {\n  right: 1px;\n  margin-top: -10px;\n  border-left-color: #fff;\n  border-right-width: 0;\n  content: \" \";\n}\n.note-popover-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border: 11px solid transparent;\n}\n.note-popover-arrow::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 10px;\n  content: \" \";\n}\n.note-popover-content {\n  min-width: 100px;\n  min-height: 30px;\n  padding: 3px 8px;\n  color: #000;\n  text-align: center;\n  background-color: #fff;\n}\n.note-popover .popover-content .note-hint-group .note-hint-item.active {\n  background-color: #ccc;\n}\n.note-editor {\n  position: relative;\n}\n.note-editor .note-dropzone {\n  position: absolute;\n  z-index: 100;\n  display: none;\n  color: #87cefa;\n  background-color: rgba(255, 255, 255, 0.2);\n  pointer-event: none;\n}\n.note-editor .note-dropzone .note-dropzone-message {\n  display: table-cell;\n  font-size: 28px;\n  font-weight: 700;\n  text-align: center;\n  vertical-align: middle;\n}\n.note-editor .note-dropzone.hover {\n  color: #098ddf;\n}\n.note-editor.dragover .note-dropzone {\n  display: table;\n}\n.note-editor .note-editing-area {\n  position: relative;\n}\n.note-editor .note-editing-area p {\n  margin: 0 0 10px;\n}\n.note-editor .note-editing-area .note-editable {\n  outline: 0;\n}\n.note-editor .note-editing-area .note-editable * {\n  /*color: inherit;*/\n}\n.note-editor .note-editing-area .note-editable table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.note-editor .note-editing-area .note-editable table td,\n.note-editor .note-editing-area .note-editable table th {\n  padding: 5px 3px;\n  /*border: 1px solid #ececec*/\n  border: 1px solid #ccc;\n}\n.note-editor .note-editing-area .note-editable sup {\n  vertical-align: super;\n}\n.note-editor .note-editing-area .note-editable sub {\n  vertical-align: sub;\n}\n.note-editor .note-editing-area .note-editable a {\n  font-family: inherit;\n  font-weight: inherit;\n  color: #337ab7;\n  text-decoration: underline;\n  /*text-decoration: underline !important;*/\n  background-color: inherit;\n}\n.note-editor .note-editing-area .note-editable a:hover,\n.note-editor .note-editing-area .note-editable a:focus {\n  color: #23527c;\n  text-decoration: underline;\n  outline: 0;\n}\n.note-editor .note-editing-area .note-editable figure {\n  margin: 0;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label {\n  outline: 0;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h1::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h2::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h3::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h4::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h5::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h6::before {\n  content: '<H1>';\n  font-size: 0.5rem;\n  border: 1px dotted gray;\n  background-color: gray;\n  color: white;\n  margin-bottom: 5px;\n  clear: both;\n  display: block;\n  line-height: 0.5rem;\n  width: 1.5rem;\n  text-align: center;\n  text-indent: 0;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h2 {\n  font-size: 1.75rem;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h2::before {\n  content: '<H2>';\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h3 {\n  font-size: 1.5rem;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h3::before {\n  content: '<H3>';\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h4 {\n  font-size: 1.25rem;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h4::before {\n  content: '<H4>';\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h5 {\n  font-size: 1rem;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h5::before {\n  content: '<H5>';\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h6 {\n  font-size: 1rem;\n  font-style: italic;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h6::before {\n  content: '<H6>';\n}\n.note-editor .note-editor-comment {\n  border: 1px dotted #ccc;\n  background-color: #D9E778;\n  color: #8a6d3b;\n  border-radius: 4px;\n}\n.note-editor.note-frame {\n  /* border: 1px solid #a9a9a9; */\n  border-width: 0;\n}\n.note-editor.note-frame.codeview .note-editing-area .note-editable {\n  display: none;\n}\n.note-editor.note-frame.codeview .note-editing-area .note-codable {\n  display: block;\n  border-radius: 0.5rem;\n}\n.note-editor.note-frame .note-editing-area {\n  overflow: hidden;\n}\n.note-editor.note-frame .note-editing-area .note-editable {\n  padding: 10px;\n  overflow: auto;\n  /* color: #000; */\n  word-wrap: break-word;\n  /* background-color: #fff */\n  background-color: transparent;\n  border: 1px solid white;\n  border-width: 0 1px;\n}\n.note-editor.note-frame .note-editing-area .note-editable[contenteditable=\"false\"] {\n  background-color: #e5e5e5;\n}\n.note-editor.note-frame .note-editing-area .note-codable {\n  display: none;\n  width: 100%;\n  padding: 10px;\n  margin-bottom: 0;\n  font-family: Menlo, Monaco, monospace, sans-serif;\n  font-size: 14px;\n  color: #ccc;\n  background-color: #222;\n  border: 0;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0;\n  box-shadow: none;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  resize: none;\n}\n.note-editor.note-frame.fullscreen {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1050;\n  width: 100% !important;\n}\n.note-editor.note-frame.fullscreen .note-editable {\n  background-color: #fff;\n}\n.note-editor.note-frame.fullscreen .note-resizebar {\n  display: none;\n}\n.note-editor.note-frame .note-status-output {\n  display: block;\n  width: 100%;\n  height: 20px;\n  margin-bottom: 0;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #000;\n  border: 0;\n  border-top: 1px solid #e2e2e2;\n}\n.note-editor.note-frame .note-status-output:empty {\n  height: 0;\n  border-top: 0 solid transparent;\n}\n.note-editor.note-frame .note-status-output .pull-right {\n  float: right !important;\n}\n.note-editor.note-frame .note-status-output .text-muted {\n  color: #777;\n}\n.note-editor.note-frame .note-status-output .text-primary {\n  color: #286090;\n}\n.note-editor.note-frame .note-status-output .text-success {\n  color: #3c763d;\n}\n.note-editor.note-frame .note-status-output .text-info {\n  color: #31708f;\n}\n.note-editor.note-frame .note-status-output .text-warning {\n  color: #8a6d3b;\n}\n.note-editor.note-frame .note-status-output .text-danger {\n  color: #a94442;\n}\n.note-editor.note-frame .note-status-output .alert {\n  padding: 7px 10px 2px 10px;\n  margin: -7px 0 0 0;\n  color: #000;\n  background-color: #f5f5f5;\n  border-radius: 0;\n}\n.note-editor.note-frame .note-status-output .alert .note-icon {\n  margin-right: 5px;\n}\n.note-editor.note-frame .note-status-output .alert-success {\n  color: #3c763d !important;\n  background-color: #dff0d8 !important;\n}\n.note-editor.note-frame .note-status-output .alert-info {\n  color: #31708f !important;\n  background-color: #d9edf7 !important;\n}\n.note-editor.note-frame .note-status-output .alert-warning {\n  color: #8a6d3b !important;\n  background-color: #fcf8e3 !important;\n}\n.note-editor.note-frame .note-status-output .alert-danger {\n  color: #a94442 !important;\n  background-color: #f2dede !important;\n}\n.note-editor.note-frame .note-statusbar {\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.note-editor.note-frame .note-statusbar .note-resizebar {\n  width: 100%;\n  height: 9px;\n  padding-top: 1px;\n  cursor: ns-resize;\n}\n.note-editor.note-frame .note-statusbar .note-resizebar .note-icon-bar {\n  width: 20px;\n  margin: 1px auto;\n  border-top: 1px solid #a9a9a9;\n}\n.note-editor.note-frame .note-statusbar.locked .note-resizebar {\n  cursor: default;\n}\n.note-editor.note-frame .note-statusbar.locked .note-resizebar .note-icon-bar {\n  display: none;\n}\n.note-editor.note-frame .note-placeholder {\n  padding: 10px;\n}\n.note-popover {\n  max-width: none;\n}\n.note-popover .note-popover-content a {\n  display: inline-block;\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.note-popover .note-popover-arrow {\n  left: 20px !important;\n}\n.note-popover .note-popover-content,\n.note-toolbar {\n  padding: 0 0 5px 5px;\n  margin: 0;\n  background-color: #fff;\n}\n.note-toolbar {\n  border-bottom-width: 0;\n  background: #f5f5f5;\n  border-radius: 1px;\n  /*z-index: 6000;*/\n  z-index: 600;\n}\n/*\n.note-toolbar.fixed {\n  max-height: 80px;\n  overflow-y: auto;\n}*/\n.note-toolbar.fixed {\n  box-shadow: 0px 0px 20px #f5f5f5;\n  border-bottom-color: rgba(34, 36, 38, 0.15);\n  border-bottom-style: solid;\n  border-bottom-width: 0;\n}\n.note-popover .note-popover-content > .note-btn-group,\n.note-toolbar > .note-btn-group {\n  margin-top: 5px;\n  margin-right: 5px;\n  margin-left: 0;\n}\n.note-popover .note-popover-content .note-btn-group .note-table,\n.note-toolbar .note-btn-group .note-table {\n  min-width: 0;\n  padding: 5px;\n}\n.note-toolbar .note-btn-group .note-dropdown-menu.note-table {\n  overflow: hidden;\n}\n.note-popover .note-popover-content .note-btn-group .note-table .note-dimension-picker,\n.note-toolbar .note-btn-group .note-table .note-dimension-picker {\n  font-size: 18px;\n}\n.note-popover .note-popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-mousecatcher,\n.note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-mousecatcher {\n  position: absolute!important;\n  z-index: 3;\n  width: 10em;\n  height: 10em;\n  cursor: pointer;\n}\n.note-popover .note-popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-unhighlighted,\n.note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-unhighlighted {\n  position: relative!important;\n  z-index: 1;\n  width: 5em;\n  height: 5em;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC') repeat;\n}\n.note-popover .note-popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-highlighted,\n.note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-highlighted {\n  position: absolute!important;\n  z-index: 2;\n  width: 1em;\n  height: 1em;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC') repeat;\n}\n.note-popover .note-popover-content .note-style h1,\n.note-toolbar .note-style h1,\n.note-popover .note-popover-content .note-style h2,\n.note-toolbar .note-style h2,\n.note-popover .note-popover-content .note-style h3,\n.note-toolbar .note-style h3,\n.note-popover .note-popover-content .note-style h4,\n.note-toolbar .note-style h4,\n.note-popover .note-popover-content .note-style h5,\n.note-toolbar .note-style h5,\n.note-popover .note-popover-content .note-style h6,\n.note-toolbar .note-style h6,\n.note-popover .note-popover-content .note-style blockquote,\n.note-toolbar .note-style blockquote {\n  margin: 0;\n}\n.note-popover .note-popover-content .note-color-all .note-dropdown-menu,\n.note-toolbar .note-color-all .note-dropdown-menu {\n  min-width: 346px;\n}\n.note-toolbar .note-color-all .note-dropdown-menu {\n  user-select: none;\n}\n.note-toolbar .note-color-all .note-dropdown-menu button {\n  user-select: all;\n}\n.note-popover .note-popover-content .note-color .dropdown-toggle,\n.note-toolbar .note-color .dropdown-toggle {\n  width: 20px;\n  padding-left: 5px;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu,\n.note-toolbar .note-color .note-dropdown-menu {\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette,\n.note-toolbar .note-color .note-dropdown-menu .note-palette {\n  display: inline-block;\n  width: 160px;\n  margin: 0;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette:first-child,\n.note-toolbar .note-color .note-dropdown-menu .note-palette:first-child {\n  margin: 0 5px;\n  margin-right: 15px;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-palette-title,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-palette-title {\n  margin: 2px 7px;\n  font-size: 12px;\n  text-align: center;\n  border-bottom: 1px solid #eee;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-reset,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-reset,\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-select,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-select {\n  width: 100%;\n  padding: 2px 3px;\n  margin: 3px;\n  cursor: pointer;\n  background-color: #fff;\n  border: 0;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-row,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-row {\n  height: 20px;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-reset:hover,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-reset:hover {\n  background: #eee;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-select-btn,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-select-btn {\n  display: none;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-holder-custom .note-color-btn,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-holder-custom .note-color-btn {\n  border: 1px solid #eee;\n}\n.note-popover .note-popover-content .note-style .note-dropdown-menu,\n.note-toolbar .note-style .note-dropdown-menu {\n  min-width: 216px;\n  padding: 5px;\n}\n.note-popover .note-popover-content .note-style .note-dropdown-menu > div:first-child,\n.note-toolbar .note-style .note-dropdown-menu > div:first-child {\n  margin-right: 5px;\n}\n.note-popover .note-popover-content .note-btn-fontname .note-dropdown-menu,\n.note-toolbar .note-btn-fontname .note-dropdown-menu {\n  min-width: 220px;\n}\n.note-popover .note-popover-content .note-dropdown-menu,\n.note-toolbar .note-dropdown-menu {\n  min-width: 160px;\n}\n.note-popover .note-popover-content .note-dropdown-menu.right,\n.note-toolbar .note-dropdown-menu.right {\n  right: 0;\n  left: auto;\n}\n.note-popover .note-popover-content .note-dropdown-menu.right::before,\n.note-toolbar .note-dropdown-menu.right::before {\n  right: 9px;\n  left: auto !important;\n}\n.note-popover .note-popover-content .note-dropdown-menu.right::after,\n.note-toolbar .note-dropdown-menu.right::after {\n  right: 10px;\n  left: auto !important;\n}\n.note-popover .note-popover-content .note-dropdown-menu.note-check .note-dropdown-item i,\n.note-toolbar .note-dropdown-menu.note-check .note-dropdown-item i {\n  color: deepskyblue;\n  visibility: hidden;\n}\n.note-popover .note-popover-content .note-dropdown-menu.note-check .note-dropdown-item.checked i,\n.note-toolbar .note-dropdown-menu.note-check .note-dropdown-item.checked i {\n  visibility: visible;\n}\n.note-popover .note-popover-content .note-dropdown-menu .note-dropdown-item > *,\n.note-toolbar .note-dropdown-menu .note-dropdown-item > * {\n  margin: 0;\n  display: block;\n}\n.note-popover .note-popover-content .note-fontsize-10,\n.note-toolbar .note-fontsize-10 {\n  font-size: 10px;\n}\n.note-popover .note-popover-content .note-color-palette,\n.note-toolbar .note-color-palette {\n  line-height: 1;\n}\n.note-popover .note-popover-content .note-color-palette div .note-color-btn,\n.note-toolbar .note-color-palette div .note-color-btn {\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  margin: 0;\n  border: 1px solid #fff;\n}\n.note-popover .note-popover-content .note-color-palette div .note-color-btn:hover,\n.note-toolbar .note-color-palette div .note-color-btn:hover {\n  border: 1px solid #000;\n}\n.note-modal .note-modal-body label {\n  display: inline-block;\n  padding: 2px 5px;\n  margin-bottom: 2px;\n}\n.note-modal .note-modal-body .help-list-item:hover {\n  background-color: #e0e0e0;\n}\n@-moz-document url-prefix() {\n  .note-image-input {\n    height: auto;\n  }\n}\n.note-placeholder {\n  position: absolute;\n  display: none;\n  color: gray;\n}\n.note-popover.note-image-popover {\n  max-width: 370px;\n}\n.note-handle .note-control-selection {\n  position: absolute;\n  display: none;\n  border: 1px solid black;\n}\n.note-handle .note-control-selection > div {\n  position: absolute;\n}\n.note-handle .note-control-selection .note-control-selection-bg {\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  -webkit-opacity: 0.3;\n  -khtml-opacity: 0.3;\n  -moz-opacity: 0.3;\n  opacity: 0.3;\n  -ms-filter: alpha(opacity=30);\n  filter: alpha(opacity=30);\n}\n.note-handle .note-control-selection .note-control-handle {\n  width: 7px;\n  height: 7px;\n  border: 1px solid #000;\n}\n.note-handle .note-control-selection .note-control-holder {\n  width: 7px;\n  height: 7px;\n  border: 1px solid #000;\n}\n.note-handle .note-control-selection .note-control-sizing {\n  width: 7px;\n  height: 7px;\n  background-color: #fff;\n  border: 1px solid #000;\n}\n.note-handle .note-control-selection .note-control-nw {\n  top: -5px;\n  left: -5px;\n  border-right: 0;\n  border-bottom: 0;\n}\n.note-handle .note-control-selection .note-control-ne {\n  top: -5px;\n  right: -5px;\n  border-bottom: 0;\n  border-left: none;\n}\n.note-handle .note-control-selection .note-control-sw {\n  bottom: -5px;\n  left: -5px;\n  border-top: 0;\n  border-right: 0;\n}\n.note-handle .note-control-selection .note-control-se {\n  right: -5px;\n  bottom: -5px;\n  cursor: se-resize;\n}\n.note-handle .note-control-selection .note-control-se.note-control-holder {\n  cursor: default;\n  border-top: 0;\n  border-left: none;\n}\n.note-handle .note-control-selection .note-control-selection-info {\n  right: 0;\n  bottom: 0;\n  padding: 5px;\n  margin: 5px;\n  font-size: 12px;\n  color: #fff;\n  background-color: #000;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n  -webkit-opacity: 0.7;\n  -khtml-opacity: 0.7;\n  -moz-opacity: 0.7;\n  opacity: 0.7;\n  -ms-filter: alpha(opacity=70);\n  filter: alpha(opacity=70);\n}\n.note-hint-popover {\n  min-width: 100px;\n  padding: 2px;\n}\n.note-hint-popover .note-popover-content {\n  max-height: 150px;\n  padding: 3px;\n  overflow: auto;\n}\n.note-hint-popover .note-popover-content .note-hint-group .note-hint-item {\n  display: block!important;\n  padding: 3px;\n}\n.note-hint-popover .note-popover-content .note-hint-group .note-hint-item.active,\n.note-hint-popover .note-popover-content .note-hint-group .note-hint-item:hover {\n  display: block;\n  clear: both;\n  font-weight: 400;\n  line-height: 1.4;\n  color: #fff;\n  text-decoration: none;\n  white-space: nowrap;\n  cursor: pointer;\n  background-color: #428bca;\n  outline: 0;\n}\n.note-hint-popover .note-popover-content .note-hint-group {\n  max-height: 400px;\n  overflow-y: auto;\n}\n.note-hint-popover .note-popover-content .note-hint-group .note-hint-item {\n  cursor: pointer;\n}\n.help-list-item label {\n  display: inline-block;\n  margin-bottom: 5px;\n}\n.note-modal input[type] {\n  height: inherit;\n}\n.note-modal input[type=\"radio\"] {\n  margin-top: -2px;\n  margin-right: 0.2rem;\n}\n", "",{"version":3,"sources":["summernote-lite.less"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,mBAAmB;EACnB,kCAAkE;EAClE,8JAAqQ;AACvQ;AACA;;EAEE,qBAAqB;EACrB,0CAA0C;EAC1C,kBAAkB;EAClB,mCAAmC;EACnC,wBAAwB;EACxB,oBAAoB;EACpB,oBAAoB;EACpB,sBAAsB;EACtB,WAAW;EACX,kCAAkC;AACpC;AACA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAoDE,qBAAqB;EACrB,yBAAyB;EACzB,kBAAkB;EAClB,mBAAmB;EACnB,wBAAwB;AAC1B;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,2BAA2B;EAC3B,4BAA4B;EAC5B,oBAAoB;EACpB,uBAAuB;EACvB,yBAAyB;EACzB,6BAA6B;EAC7B,eAAe;EACf,sBAAsB;EACtB,WAAW;AACb;AACA;EACE,eAAe;EACf,0BAA0B;EAC1B,iBAAiB;EACjB,iBAAiB;AACnB;AACA;;EAEE,yBAAyB;AAC3B;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,yBAAyB;EACzB,mBAAmB;AACrB;AACA;EACE,4BAA4B;EAC5B,mBAAmB;EACnB,iBAAiB;AACnB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,iBAAiB;EACjB,8BAA8B;EAC9B,2BAA2B;EAC3B,sBAAsB;AACxB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,WAAW;EACX,sBAAsB;EACtB,kBAAkB;EAClB,8BAA8B;EAC9B,2BAA2B;EAC3B,0BAA0B;EAC1B,sBAAsB;AACxB;AACA;EACE,iBAAiB;EACjB,gCAAgC;AAClC;AACA;EACE,kBAAkB;EAClB,qBAAqB;EACrB,iBAAiB;AACnB;AACA;EACE,eAAe;AACjB;AACA;;EAEE,iBAAiB;EACjB,gBAAgB;AAClB;AACA;;;;EAIE,gBAAgB;AAClB;AACA;;EAEE,cAAc;EACd,8BAA8B;EAC9B,2BAA2B;AAC7B;AACA;;;;EAIE,8BAA8B;EAC9B,2BAA2B;AAC7B;AACA;;EAEE,4BAA4B;EAC5B,+BAA+B;AACjC;AACA;;;;EAIE,4BAA4B;EAC5B,+BAA+B;AACjC;AACA;EACE,cAAc;AAChB;AACA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;EACf,gBAAgB;EAChB,gBAAgB;EAChB,WAAW;EACX,kBAAkB;EAClB,mBAAmB;EACnB,sBAAsB;EACtB,eAAe;EACf,sBAAsB;EACtB,sBAAsB;EACtB,4BAA4B;EAC5B,6BAA6B;EAC7B,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;EACV,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB;EACrB,iBAAiB;EACjB,0BAA0B;AAC5B;AACA;;EAEE,WAAW;EACX,yBAAyB;EACzB,sBAAsB;EACtB,yBAAyB;AAC3B;AACA;EACE,WAAW;EACX,yBAAyB;EACzB,sBAAsB;EACtB,yBAAyB;AAC3B;AACA;;;;;;EAME,sBAAsB;EACtB,kBAAkB;AACpB;AACA;;;EAGE,WAAW;EACX,qBAAqB;EACrB,yBAAyB;EACzB,sBAAsB;EACtB,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;AACZ;AACA;;EAEE,sBAAsB;EACtB,UAAU;AACZ;AACA;;;EAGE,mBAAmB;EACnB,qBAAqB;EACrB,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,6BAA6B;EAC7B,yBAAyB;EACzB,wBAAwB;EACxB,qBAAqB;EACrB,gBAAgB;AAClB;AACA;EACE,WAAW;EACX,mBAAmB;AACrB;AACA;;;EAGE,WAAW;EACX,qBAAqB;EACrB,yBAAyB;EACzB,sBAAsB;EACtB,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB;AACpB;AACA;EACE,cAAc;EACd,WAAW;AACb;AACA;EACE,eAAe;AACjB;AACA;;;EAGE,WAAW;AACb;AACA;EACE,UAAU;EACV,eAAe;EACf,uBAAuB;EACvB,SAAS;EACT,wBAAwB;AAC1B;AACA;EACE,YAAY;EACZ,eAAe;EACf,cAAc;EACd,WAAW;EACX,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,UAAU;EACV,8BAA8B;EAC9B,0BAA0B;AAC5B;AACA;EACE,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,SAAS;EACT,OAAO;EACP,aAAa;EACb,aAAa;EACb,WAAW;EACX,gBAAgB;EAChB,YAAY;EACZ,gBAAgB;EAChB,gBAAgB;EAChB,yBAAyB;EACzB,iDAAiD;EACjD,8CAA8C;EAC9C,yCAAyC;EACzC,4BAA4B;EAC5B,iBAAiB;EACjB,gBAAgB;AAClB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,yBAAyB;AAC3B;AACA;;EAEE,aAAa;EACb,WAAW;EACX,qBAAqB;AACvB;AACA;EACE,+BAA+B;AACjC;AACA;;EAEE,eAAe;EACf,iBAAiB;EACjB,MAAM;AACR;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,aAAa;EACb,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,UAAU;EACV,8BAA8B;EAC9B,0BAA0B;AAC5B;AACA;EACE,cAAc;AAChB;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,iBAAiB;EACjB,gBAAgB;EAChB,oCAAoC;EACpC,UAAU;EACV,2BAA2B;AAC7B;AACA;EACE,4BAA4B;EAC5B,yBAAyB;AAC3B;AACA;EACE,iBAAiB;AACnB;AACA;EACE,kBAAkB;EAClB,kBAAkB;AACpB;AACA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;AACA;EACE,cAAc;EACd,qBAAqB;AACvB;AACA;;EAEE,cAAc;EACd,0BAA0B;AAC5B;AACA;EACE,YAAY;AACd;AACA;EACE,SAAS;EACT,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;AACA;EACE,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,aAAa;EACb,aAAa;EACb,gBAAgB;EAChB,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,6BAA6B;EAC7B,yBAAyB;AAC3B;AACA;EACE,cAAc;AAChB;AACA;EACE;IACE,YAAY;IACZ,iBAAiB;EACnB;AACF;AACA;EACE;IACE,YAAY;EACd;AACF;AACA;EACE,oBAAoB;AACtB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,cAAc;EACd,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;AACA;EACE,cAAc;EACd,WAAW;EACX,gBAAgB;EAChB,eAAe;EACf,gBAAgB;EAChB,yBAAyB;EACzB,UAAU;EACV,8BAA8B;EAC9B,2BAA2B;EAC3B,0BAA0B;EAC1B,sBAAsB;AACxB;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,WAAW;AACb;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,UAAU;EACV,4BAA4B;EAC5B,wBAAwB;AAC1B;AACA;EACE,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,6BAA6B;EAC7B,yBAAyB;AAC3B;AACA;EACE,cAAc;EACd,gBAAgB;AAClB;AACA;EACE,cAAc;EACd,gBAAgB;AAClB;AACA;EACE,cAAc;EACd,eAAe;AACjB;AACA;EACE,cAAc;EACd,iBAAiB;AACnB;AACA;EACE,MAAM;EACN,SAAS;EACT,iBAAiB;EACjB,yBAAyB;EACzB,uBAAuB;AACzB;AACA;EACE,SAAS;EACT,SAAS;EACT,iBAAiB;EACjB,sBAAsB;EACtB,uBAAuB;AACzB;AACA;EACE,QAAQ;EACR,OAAO;EACP,gBAAgB;EAChB,wBAAwB;EACxB,2BAA2B;AAC7B;AACA;EACE,QAAQ;EACR,QAAQ;EACR,gBAAgB;EAChB,uBAAuB;EACvB,2BAA2B;AAC7B;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,yBAAyB;EACzB,mBAAmB;AACrB;AACA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,WAAW;EACX,kBAAkB;EAClB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,YAAY;EACZ,cAAc;EACd,aAAa;EACb,eAAe;EACf,gBAAgB;EAChB,oCAAoC;EACpC,sBAAsB;AACxB;AACA;EACE,cAAc;AAChB;AACA;EACE,YAAY;EACZ,gBAAgB;AAClB;AACA;EACE,YAAY;EACZ,gBAAgB;AAClB;AACA;EACE,YAAY;EACZ,eAAe;AACjB;AACA;EACE,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,UAAU;EACV,SAAS;EACT,kBAAkB;EAClB,yBAAyB;EACzB,wCAAwC;EACxC,mBAAmB;AACrB;AACA;EACE,QAAQ;EACR,kBAAkB;EAClB,yBAAyB;EACzB,mBAAmB;EACnB,YAAY;AACd;AACA;EACE,aAAa;EACb,SAAS;EACT,kBAAkB;EAClB,sBAAsB;EACtB,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,WAAW;EACX,kBAAkB;EAClB,sBAAsB;EACtB,sBAAsB;EACtB,YAAY;AACd;AACA;EACE,QAAQ;EACR,WAAW;EACX,iBAAiB;EACjB,wBAAwB;EACxB,uCAAuC;EACvC,oBAAoB;AACtB;AACA;EACE,SAAS;EACT,iBAAiB;EACjB,wBAAwB;EACxB,oBAAoB;EACpB,YAAY;AACd;AACA;EACE,QAAQ;EACR,YAAY;EACZ,iBAAiB;EACjB,uBAAuB;EACvB,sCAAsC;EACtC,qBAAqB;AACvB;AACA;EACE,UAAU;EACV,iBAAiB;EACjB,uBAAuB;EACvB,qBAAqB;EACrB,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,8BAA8B;AAChC;AACA;EACE,kBAAkB;EAClB,cAAc;EACd,QAAQ;EACR,SAAS;EACT,yBAAyB;EACzB,mBAAmB;EACnB,kBAAkB;EAClB,YAAY;AACd;AACA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;EAChB,WAAW;EACX,kBAAkB;EAClB,sBAAsB;AACxB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,cAAc;EACd,0CAA0C;EAC1C,mBAAmB;AACrB;AACA;EACE,mBAAmB;EACnB,eAAe;EACf,gBAAgB;EAChB,kBAAkB;EAClB,sBAAsB;AACxB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,UAAU;AACZ;AACA;EACE,kBAAkB;AACpB;AACA;EACE,WAAW;EACX,yBAAyB;AAC3B;AACA;;EAEE,gBAAgB;EAChB,4BAA4B;EAC5B,sBAAsB;AACxB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,oBAAoB;EACpB,oBAAoB;EACpB,cAAc;EACd,0BAA0B;EAC1B,yCAAyC;EACzC,yBAAyB;AAC3B;AACA;;EAEE,cAAc;EACd,0BAA0B;EAC1B,UAAU;AACZ;AACA;EACE,SAAS;AACX;AACA;EACE,UAAU;AACZ;AACA;;;;;;EAME,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,sBAAsB;EACtB,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,cAAc;EACd,mBAAmB;EACnB,aAAa;EACb,kBAAkB;EAClB,cAAc;AAChB;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;EAClB,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,uBAAuB;EACvB,yBAAyB;EACzB,cAAc;EACd,kBAAkB;AACpB;AACA;EACE,+BAA+B;EAC/B,eAAe;AACjB;AACA;EACE,aAAa;AACf;AACA;EACE,cAAc;EACd,qBAAqB;AACvB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,aAAa;EACb,cAAc;EACd,iBAAiB;EACjB,qBAAqB;EACrB,2BAA2B;EAC3B,6BAA6B;EAC7B,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,aAAa;EACb,WAAW;EACX,aAAa;EACb,gBAAgB;EAChB,iDAAiD;EACjD,eAAe;EACf,WAAW;EACX,sBAAsB;EACtB,SAAS;EACT,wBAAwB;EACxB,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,8BAA8B;EAC9B,2BAA2B;EAC3B,0BAA0B;EAC1B,sBAAsB;EACtB,YAAY;AACd;AACA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,aAAa;EACb,sBAAsB;AACxB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,aAAa;AACf;AACA;EACE,cAAc;EACd,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,eAAe;EACf,uBAAuB;EACvB,WAAW;EACX,SAAS;EACT,6BAA6B;AAC/B;AACA;EACE,SAAS;EACT,+BAA+B;AACjC;AACA;EACE,uBAAuB;AACzB;AACA;EACE,WAAW;AACb;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,0BAA0B;EAC1B,kBAAkB;EAClB,WAAW;EACX,yBAAyB;EACzB,gBAAgB;AAClB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,yBAAyB;EACzB,oCAAoC;AACtC;AACA;EACE,yBAAyB;EACzB,oCAAoC;AACtC;AACA;EACE,yBAAyB;EACzB,oCAAoC;AACtC;AACA;EACE,yBAAyB;EACzB,oCAAoC;AACtC;AACA;EACE,yBAAyB;EACzB,0BAA0B;EAC1B,+BAA+B;EAC/B,8BAA8B;AAChC;AACA;EACE,WAAW;EACX,WAAW;EACX,gBAAgB;EAChB,iBAAiB;AACnB;AACA;EACE,WAAW;EACX,gBAAgB;EAChB,6BAA6B;AAC/B;AACA;EACE,eAAe;AACjB;AACA;EACE,aAAa;AACf;AACA;EACE,aAAa;AACf;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;EACnB,sBAAsB;AACxB;AACA;EACE,qBAAqB;AACvB;AACA;;EAEE,oBAAoB;EACpB,SAAS;EACT,sBAAsB;AACxB;AACA;EACE,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;EACjB,YAAY;AACd;AACA;;;;EAIE;AACF;EACE,gCAAgC;EAChC,2CAA2C;EAC3C,0BAA0B;EAC1B,sBAAsB;AACxB;AACA;;EAEE,eAAe;EACf,iBAAiB;EACjB,cAAc;AAChB;AACA;;EAEE,YAAY;EACZ,YAAY;AACd;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,eAAe;AACjB;AACA;;EAEE,4BAA4B;EAC5B,UAAU;EACV,WAAW;EACX,YAAY;EACZ,eAAe;AACjB;AACA;;EAEE,4BAA4B;EAC5B,UAAU;EACV,UAAU;EACV,WAAW;EACX,oRAAoR;AACtR;AACA;;EAEE,4BAA4B;EAC5B,UAAU;EACV,UAAU;EACV,WAAW;EACX,oRAAoR;AACtR;AACA;;;;;;;;;;;;;;EAcE,SAAS;AACX;AACA;;EAEE,gBAAgB;AAClB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,gBAAgB;AAClB;AACA;;EAEE,WAAW;EACX,iBAAiB;AACnB;AACA;;EAEE,+BAA+B;EAC/B,4BAA4B;EAC5B,uBAAuB;AACzB;AACA;;EAEE,qBAAqB;EACrB,YAAY;EACZ,SAAS;AACX;AACA;;EAEE,aAAa;EACb,kBAAkB;AACpB;AACA;;EAEE,eAAe;EACf,eAAe;EACf,kBAAkB;EAClB,6BAA6B;AAC/B;AACA;;;;EAIE,WAAW;EACX,gBAAgB;EAChB,WAAW;EACX,eAAe;EACf,sBAAsB;EACtB,SAAS;EACT,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB;AACpB;AACA;;EAEE,YAAY;AACd;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,aAAa;AACf;AACA;;EAEE,sBAAsB;AACxB;AACA;;EAEE,gBAAgB;EAChB,YAAY;AACd;AACA;;EAEE,iBAAiB;AACnB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,QAAQ;EACR,UAAU;AACZ;AACA;;EAEE,UAAU;EACV,qBAAqB;AACvB;AACA;;EAEE,WAAW;EACX,qBAAqB;AACvB;AACA;;EAEE,kBAAkB;EAClB,kBAAkB;AACpB;AACA;;EAEE,mBAAmB;AACrB;AACA;;EAEE,SAAS;EACT,cAAc;AAChB;AACA;;EAEE,eAAe;AACjB;AACA;;EAEE,cAAc;AAChB;AACA;;EAEE,WAAW;EACX,YAAY;EACZ,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;AACA;;EAEE,sBAAsB;AACxB;AACA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,kBAAkB;AACpB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE;IACE,YAAY;EACd;AACF;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,WAAW;AACb;AACA;EACE,gBAAgB;AAClB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,uBAAuB;AACzB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,6BAA6B;EAC7B,yBAAyB;AAC3B;AACA;EACE,UAAU;EACV,WAAW;EACX,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,WAAW;EACX,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,WAAW;EACX,sBAAsB;EACtB,sBAAsB;AACxB;AACA;EACE,SAAS;EACT,UAAU;EACV,eAAe;EACf,gBAAgB;AAClB;AACA;EACE,SAAS;EACT,WAAW;EACX,gBAAgB;EAChB,iBAAiB;AACnB;AACA;EACE,YAAY;EACZ,UAAU;EACV,aAAa;EACb,eAAe;AACjB;AACA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,eAAe;EACf,aAAa;EACb,iBAAiB;AACnB;AACA;EACE,QAAQ;EACR,SAAS;EACT,YAAY;EACZ,WAAW;EACX,eAAe;EACf,WAAW;EACX,sBAAsB;EACtB,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB;EAClB,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,6BAA6B;EAC7B,yBAAyB;AAC3B;AACA;EACE,gBAAgB;EAChB,YAAY;AACd;AACA;EACE,iBAAiB;EACjB,YAAY;EACZ,cAAc;AAChB;AACA;EACE,wBAAwB;EACxB,YAAY;AACd;AACA;;EAEE,cAAc;EACd,WAAW;EACX,gBAAgB;EAChB,gBAAgB;EAChB,WAAW;EACX,qBAAqB;EACrB,mBAAmB;EACnB,eAAe;EACf,yBAAyB;EACzB,UAAU;AACZ;AACA;EACE,iBAAiB;EACjB,gBAAgB;AAClB;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;EACrB,kBAAkB;AACpB;AACA;EACE,eAAe;AACjB;AACA;EACE,gBAAgB;EAChB,oBAAoB;AACtB","file":"summernote-lite.less","sourcesContent":["@font-face {\n  font-family: \"summernote\";\n  font-style: normal;\n  font-weight: normal;\n  src: url(\"./font/summernote.eot?4c7e83314b68cfa6a0d18a8b4690044b\");\n  src: url(\"./font/summernote.eot?4c7e83314b68cfa6a0d18a8b4690044b#iefix\") format(\"embedded-opentype\"), url(\"./font/summernote.woff?4c7e83314b68cfa6a0d18a8b4690044b\") format(\"woff\"), url(\"./font/summernote.ttf?4c7e83314b68cfa6a0d18a8b4690044b\") format(\"truetype\");\n}\n[class^=\"note-icon-\"]:before,\n[class*=\" note-icon-\"]:before {\n  display: inline-block;\n  font: normal normal normal 14px summernote;\n  font-size: inherit;\n  -webkit-font-smoothing: antialiased;\n  text-decoration: inherit;\n  text-rendering: auto;\n  text-transform: none;\n  vertical-align: middle;\n  speak: none;\n  -moz-osx-font-smoothing: grayscale;\n}\n.note-icon-align-center:before,\n.note-icon-align-indent:before,\n.note-icon-align-justify:before,\n.note-icon-align-left:before,\n.note-icon-align-outdent:before,\n.note-icon-align-right:before,\n.note-icon-align:before,\n.note-icon-arrow-circle-down:before,\n.note-icon-arrow-circle-left:before,\n.note-icon-arrow-circle-right:before,\n.note-icon-arrow-circle-up:before,\n.note-icon-arrows-alt:before,\n.note-icon-arrows-h:before,\n.note-icon-arrows-v:before,\n.note-icon-bold:before,\n.note-icon-caret:before,\n.note-icon-chain-broken:before,\n.note-icon-circle:before,\n.note-icon-close:before,\n.note-icon-code:before,\n.note-icon-col-after:before,\n.note-icon-col-before:before,\n.note-icon-col-remove:before,\n.note-icon-eraser:before,\n.note-icon-font:before,\n.note-icon-frame:before,\n.note-icon-italic:before,\n.note-icon-link:before,\n.note-icon-magic:before,\n.note-icon-menu-check:before,\n.note-icon-minus:before,\n.note-icon-orderedlist:before,\n.note-icon-pencil:before,\n.note-icon-picture:before,\n.note-icon-question:before,\n.note-icon-redo:before,\n.note-icon-row-above:before,\n.note-icon-row-below:before,\n.note-icon-row-remove:before,\n.note-icon-special-character:before,\n.note-icon-square:before,\n.note-icon-strikethrough:before,\n.note-icon-subscript:before,\n.note-icon-summernote:before,\n.note-icon-superscript:before,\n.note-icon-table:before,\n.note-icon-text-height:before,\n.note-icon-trash:before,\n.note-icon-underline:before,\n.note-icon-undo:before,\n.note-icon-unorderedlist:before,\n.note-icon-video:before {\n  display: inline-block;\n  font-family: \"summernote\";\n  font-style: normal;\n  font-weight: normal;\n  text-decoration: inherit;\n}\n.note-icon-align-center:before {\n  content: \"\\f101\";\n}\n.note-icon-align-indent:before {\n  content: \"\\f102\";\n}\n.note-icon-align-justify:before {\n  content: \"\\f103\";\n}\n.note-icon-align-left:before {\n  content: \"\\f104\";\n}\n.note-icon-align-outdent:before {\n  content: \"\\f105\";\n}\n.note-icon-align-right:before {\n  content: \"\\f106\";\n}\n.note-icon-align:before {\n  content: \"\\f107\";\n}\n.note-icon-arrow-circle-down:before {\n  content: \"\\f108\";\n}\n.note-icon-arrow-circle-left:before {\n  content: \"\\f109\";\n}\n.note-icon-arrow-circle-right:before {\n  content: \"\\f10a\";\n}\n.note-icon-arrow-circle-up:before {\n  content: \"\\f10b\";\n}\n.note-icon-arrows-alt:before {\n  content: \"\\f10c\";\n}\n.note-icon-arrows-h:before {\n  content: \"\\f10d\";\n}\n.note-icon-arrows-v:before {\n  content: \"\\f10e\";\n}\n.note-icon-bold:before {\n  content: \"\\f10f\";\n}\n.note-icon-caret:before {\n  content: \"\\f110\";\n}\n.note-icon-chain-broken:before {\n  content: \"\\f111\";\n}\n.note-icon-circle:before {\n  content: \"\\f112\";\n}\n.note-icon-close:before {\n  content: \"\\f113\";\n}\n.note-icon-code:before {\n  content: \"\\f114\";\n}\n.note-icon-col-after:before {\n  content: \"\\f115\";\n}\n.note-icon-col-before:before {\n  content: \"\\f116\";\n}\n.note-icon-col-remove:before {\n  content: \"\\f117\";\n}\n.note-icon-eraser:before {\n  content: \"\\f118\";\n}\n.note-icon-font:before {\n  content: \"\\f119\";\n}\n.note-icon-frame:before {\n  content: \"\\f11a\";\n}\n.note-btn-formatBlock {\n  padding: 0 !important;\n}\n.note-btn-formatBlock > * {\n  line-height: 9px !important;\n  padding: 5px 10px !important;\n  margin: 0 !important;\n  height: 29px !important;\n  text-indent: 0 !important;\n  background-color: transparent;\n  border-width: 0;\n  border-radius: inherit;\n  color: #000;\n}\n.note-btn-formatBlock > *:before {\n  content: \"<H1>\";\n  font-size: 14px !important;\n  font-weight: bold;\n  line-height: 20px;\n}\n.note-btn-formatBlock > h1,\n.note-btn-formatBlock > h2 {\n  line-height: 0 !important;\n}\n.note-btn-formatBlock > h2:before {\n  content: \"<H2>\" !important;\n}\n.note-btn-formatBlock > h3:before {\n  content: \"<H3>\" !important;\n}\n.note-btn-formatBlock > h4:before {\n  content: \"<H4>\" !important;\n}\n.note-btn-formatBlock > h5:before {\n  content: \"<H5>\" !important;\n}\n.note-btn-formatBlock > h6:before {\n  content: \"<H6>\" !important;\n}\n.note-btn-formatBlock > p:before {\n  content: \"<P>\" !important;\n  font-weight: normal;\n}\n.note-btn-formatBlock > code:before {\n  content: \"<CODE>\" !important;\n  font-weight: normal;\n  line-height: 29px;\n}\n.note-icon-italic:before {\n  content: \"\\f11b\";\n}\n.note-icon-link:before {\n  content: \"\\f11c\";\n}\n.note-icon-magic:before {\n  content: \"\\f11d\";\n}\n.note-icon-menu-check:before {\n  content: \"\\f11e\";\n}\n.note-icon-minus:before {\n  content: \"\\f11f\";\n}\n.note-icon-orderedlist:before {\n  content: \"\\f120\";\n}\n.note-icon-pencil:before {\n  content: \"\\f121\";\n}\n.note-icon-picture:before {\n  content: \"\\f122\";\n}\n.note-icon-question:before {\n  content: \"\\f123\";\n}\n.note-icon-redo:before {\n  content: \"\\f124\";\n}\n.note-icon-row-above:before {\n  content: \"\\f125\";\n}\n.note-icon-row-below:before {\n  content: \"\\f126\";\n}\n.note-icon-row-remove:before {\n  content: \"\\f127\";\n}\n.note-icon-special-character:before {\n  content: \"\\f128\";\n}\n.note-icon-square:before {\n  content: \"\\f129\";\n}\n.note-icon-strikethrough:before {\n  content: \"\\f12a\";\n}\n.note-icon-subscript:before {\n  content: \"\\f12b\";\n}\n.note-icon-summernote:before {\n  content: \"\\f12c\";\n}\n.note-icon-superscript:before {\n  content: \"\\f12d\";\n}\n.note-icon-table:before {\n  content: \"\\f12e\";\n}\n.note-icon-text-height:before {\n  content: \"\\f12f\";\n}\n.note-icon-trash:before {\n  content: \"\\f130\";\n}\n.note-icon-underline:before {\n  content: \"\\f131\";\n}\n.note-icon-undo:before {\n  content: \"\\f132\";\n}\n.note-icon-unorderedlist:before {\n  content: \"\\f133\";\n}\n.note-icon-video:before {\n  content: \"\\f134\";\n}\n.note-frame * {\n  /* color: #000; */\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\np {\n  margin: 0 0 10px;\n}\nkbd {\n  padding: 3px 5px;\n  font-weight: 700;\n  color: #fff;\n  background-color: #000;\n  border-radius: 2px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.note-toolbar {\n  padding: 10px 5px;\n  border-bottom: 1px solid #e2e2e2;\n}\n.note-btn-group {\n  position: relative;\n  display: inline-block;\n  margin-right: 8px;\n}\n.note-btn-group > .note-btn-group {\n  margin-right: 0;\n}\n.note-btn-group > .note-btn,\n.note-btn-group > .note-btn-group {\n  margin-left: -4px;\n  border-radius: 0;\n}\n.note-btn-group > .note-btn.focus,\n.note-btn-group > .note-btn-group.focus,\n.note-btn-group > .note-btn.active,\n.note-btn-group > .note-btn-group.active {\n  border-radius: 0;\n}\n.note-btn-group > .note-btn:first-child,\n.note-btn-group > .note-btn-group:first-child {\n  margin-left: 0;\n  border-bottom-left-radius: 1px;\n  border-top-left-radius: 1px;\n}\n.note-btn-group > .note-btn:first-child.focus,\n.note-btn-group > .note-btn-group:first-child.focus,\n.note-btn-group > .note-btn:first-child.active,\n.note-btn-group > .note-btn-group:first-child.active {\n  border-bottom-left-radius: 1px;\n  border-top-left-radius: 1px;\n}\n.note-btn-group > .note-btn:last-child:not(.note-dropdown),\n.note-btn-group > .note-btn-group:last-child:not(.note-dropdown) {\n  border-top-right-radius: 1px;\n  border-bottom-right-radius: 1px;\n}\n.note-btn-group > .note-btn:last-child:not(.note-dropdown).focus,\n.note-btn-group > .note-btn-group:last-child:not(.note-dropdown).focus,\n.note-btn-group > .note-btn:last-child:not(.note-dropdown).active,\n.note-btn-group > .note-btn-group:last-child:not(.note-dropdown).active {\n  border-top-right-radius: 1px;\n  border-bottom-right-radius: 1px;\n}\n.note-btn-group.open > .note-dropdown {\n  display: block;\n}\n.note-btn {\n  display: inline-block;\n  padding: 5px 10px;\n  margin-bottom: 0;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1.4;\n  color: #333;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  cursor: pointer;\n  background-color: #fff;\n  background-image: none;\n  /* border: 1px solid #fff; */\n  border: 1px solid transparent;\n  border-color: #fff;\n  border-radius: 1px;\n  outline: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  touch-action: manipulation;\n}\n.note-btn:focus,\n.note-btn.focus {\n  color: #333;\n  background-color: #ebebeb;\n  /*border-color: #fff;*/\n  border-color: transparent;\n}\n.note-btn:hover {\n  color: #333;\n  background-color: #ebebeb;\n  /*border-color: #fff;*/\n  border-color: transparent;\n}\n.note-btn.disabled:focus,\n.note-btn[disabled]:focus,\nfieldset[disabled] .note-btn:focus,\n.note-btn.disabled.focus,\n.note-btn[disabled].focus,\nfieldset[disabled] .note-btn.focus {\n  background-color: #fff;\n  border-color: #fff;\n}\n.note-btn:hover,\n.note-btn:focus,\n.note-btn.focus {\n  color: #333;\n  text-decoration: none;\n  background-color: #ebebeb;\n  border: 1px solid #fff;\n  -webkit-border-radius: 1px;\n  -moz-border-radius: 1px;\n  border-radius: 1px;\n  outline: 0;\n}\n.note-btn:active,\n.note-btn.active {\n  background-image: none;\n  outline: 0;\n}\n.note-btn.disabled,\n.note-btn[disabled],\nfieldset[disabled] .note-btn {\n  cursor: not-allowed;\n  -webkit-opacity: 0.65;\n  -khtml-opacity: 0.65;\n  -moz-opacity: 0.65;\n  opacity: 0.65;\n  -ms-filter: alpha(opacity=65);\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n}\n.note-btn-primary {\n  color: #fff;\n  background: #fa6362;\n}\n.note-btn-primary:hover,\n.note-btn-primary:focus,\n.note-btn-primary.focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #fa6362;\n  border: 1px solid #fff;\n  -webkit-border-radius: 1px;\n  -moz-border-radius: 1px;\n  border-radius: 1px;\n}\n.note-btn-block {\n  display: block;\n  width: 100%;\n}\n.note-btn-block + .note-btn-block {\n  margin-top: 5px;\n}\ninput[type=\"submit\"].note-btn-block,\ninput[type=\"reset\"].note-btn-block,\ninput[type=\"button\"].note-btn-block {\n  width: 100%;\n}\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n.close {\n  float: right;\n  font-size: 21px;\n  line-height: 1;\n  color: #000;\n  opacity: 0.2;\n}\n.close:hover {\n  -webkit-opacity: 1;\n  -khtml-opacity: 1;\n  -moz-opacity: 1;\n  opacity: 1;\n  -ms-filter: alpha(opacity=100);\n  filter: alpha(opacity=100);\n}\n.note-dropdown {\n  position: relative;\n}\n.note-dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 100px;\n  padding: 5px;\n  text-align: left;\n  background: #fff;\n  border: 1px solid #e2e2e2;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);\n  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);\n  background-clip: padding-box;\n  max-height: 200px;\n  overflow-y: auto;\n}\n.note-btn-group.open .note-dropdown-menu {\n  display: block;\n}\n.note-dropdown-item {\n  display: block;\n}\n.note-dropdown-item:hover {\n  background-color: #ebebeb;\n}\na.note-dropdown-item,\na.note-dropdown-item:hover {\n  margin: 2px 0;\n  color: #000;\n  text-decoration: none;\n}\na.note-dropdown-item > * {\n  text-indent: inherit !important;\n}\n.note-dropdown-item sub,\n.note-dropdown-item sup {\n  font-size: 1rem;\n  line-height: 1rem;\n  top: 0;\n}\n.note-modal {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  -webkit-opacity: 1;\n  -khtml-opacity: 1;\n  -moz-opacity: 1;\n  opacity: 1;\n  -ms-filter: alpha(opacity=100);\n  filter: alpha(opacity=100);\n}\n.note-modal.open {\n  display: block;\n}\n.note-modal-content {\n  position: relative;\n  width: auto;\n  margin: 30px 20px;\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  outline: 0;\n  background-clip: border-box;\n}\n.note-modal-header {\n  padding: 30px 20px 20px 20px;\n  border: 1px solid #ededef;\n}\n.note-modal-header .close {\n  margin-top: -10px;\n}\n.note-modal-body {\n  position: relative;\n  padding: 20px 30px;\n}\n.note-modal-footer {\n  height: 40px;\n  padding: 10px;\n  text-align: center;\n}\n.note-modal-footer a {\n  color: #337ab7;\n  text-decoration: none;\n}\n.note-modal-footer a:hover,\n.note-modal-footer a:focus {\n  color: #23527c;\n  text-decoration: underline;\n}\n.note-modal-footer .note-btn {\n  float: right;\n}\n.note-modal-title {\n  margin: 0;\n  font-size: 26px;\n  line-height: 1.4;\n  color: #42515f;\n}\n.note-modal-backdrop {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  display: none;\n  background: #000;\n  -webkit-opacity: 0.5;\n  -khtml-opacity: 0.5;\n  -moz-opacity: 0.5;\n  opacity: 0.5;\n  -ms-filter: alpha(opacity=50);\n  filter: alpha(opacity=50);\n}\n.note-modal-backdrop.open {\n  display: block;\n}\n@media (min-width: 768px) {\n  .note-modal-content {\n    width: 600px;\n    margin: 30px auto;\n  }\n}\n@media (min-width: 992px) {\n  .note-modal-content-large {\n    width: 900px;\n  }\n}\n.note-form-group {\n  padding-bottom: 20px;\n}\n.note-form-group:last-child {\n  padding-bottom: 0;\n}\n.note-form-label {\n  display: block;\n  margin-bottom: 10px;\n  font-size: 16px;\n  font-weight: 700;\n  color: #42515f;\n}\n.note-input {\n  display: block;\n  width: 100%;\n  padding: 6px 4px;\n  font-size: 14px;\n  background: #fff;\n  border: 1px solid #ededef;\n  outline: 0;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.note-input::-webkit-input-placeholder {\n  color: #eee;\n}\n.note-input:-moz-placeholder {\n  color: #eee;\n}\n.note-input::-moz-placeholder {\n  color: #eee;\n}\n.note-input:-ms-input-placeholder {\n  color: #eee;\n}\n.note-tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-size: 13px;\n  -webkit-opacity: 0;\n  -khtml-opacity: 0;\n  -moz-opacity: 0;\n  opacity: 0;\n  -ms-filter: alpha(opacity=0);\n  filter: alpha(opacity=0);\n}\n.note-tooltip.in {\n  -webkit-opacity: 0.9;\n  -khtml-opacity: 0.9;\n  -moz-opacity: 0.9;\n  opacity: 0.9;\n  -ms-filter: alpha(opacity=90);\n  filter: alpha(opacity=90);\n}\n.note-tooltip.top {\n  padding: 5px 0;\n  margin-top: -3px;\n}\n.note-tooltip.right {\n  padding: 0 5px;\n  margin-left: 3px;\n}\n.note-tooltip.bottom {\n  padding: 5px 0;\n  margin-top: 3px;\n}\n.note-tooltip.left {\n  padding: 0 5px;\n  margin-left: -3px;\n}\n.note-tooltip.bottom .note-tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-bottom-color: #000;\n  border-width: 0 5px 5px;\n}\n.note-tooltip.top .note-tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-top-color: #000;\n  border-width: 5px 5px 0;\n}\n.note-tooltip.right .note-tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-right-color: #000;\n  border-width: 5px 5px 5px 0;\n}\n.note-tooltip.left .note-tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-left-color: #000;\n  border-width: 5px 0 5px 5px;\n}\n.note-tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.note-tooltip-content {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n}\n.note-popover {\n  position: absolute;\n  /*z-index: 1060;*/\n  z-index: 960;\n  display: block;\n  display: none;\n  font-size: 13px;\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border: 1px solid #ccc;\n}\n.note-popover.in {\n  display: block;\n}\n.note-popover.top {\n  padding: 5 0;\n  margin-top: -3px;\n}\n.note-popover.right {\n  padding: 0 5;\n  margin-left: 3px;\n}\n.note-popover.bottom {\n  padding: 5 0;\n  margin-top: 3px;\n}\n.note-popover.left {\n  padding: 0 5;\n  margin-left: -3px;\n}\n.note-popover.bottom .note-popover-arrow {\n  top: -11px;\n  left: 50%;\n  margin-left: -10px;\n  border-bottom-color: #999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  border-top-width: 0;\n}\n.note-popover.bottom .note-popover-arrow::after {\n  top: 1px;\n  margin-left: -10px;\n  border-bottom-color: #fff;\n  border-top-width: 0;\n  content: \" \";\n}\n.note-popover.top .note-popover-arrow {\n  bottom: -11px;\n  left: 50%;\n  margin-left: -10px;\n  border-top-color: #999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  border-bottom-width: 0;\n}\n.note-popover.top .note-popover-arrow::after {\n  bottom: 1px;\n  margin-left: -10px;\n  border-top-color: #fff;\n  border-bottom-width: 0;\n  content: \" \";\n}\n.note-popover.right .note-popover-arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -10px;\n  border-right-color: #999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n  border-left-width: 0;\n}\n.note-popover.right .note-popover-arrow::after {\n  left: 1px;\n  margin-top: -10px;\n  border-right-color: #fff;\n  border-left-width: 0;\n  content: \" \";\n}\n.note-popover.left .note-popover-arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -10px;\n  border-left-color: #999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n  border-right-width: 0;\n}\n.note-popover.left .note-popover-arrow::after {\n  right: 1px;\n  margin-top: -10px;\n  border-left-color: #fff;\n  border-right-width: 0;\n  content: \" \";\n}\n.note-popover-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border: 11px solid transparent;\n}\n.note-popover-arrow::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 10px;\n  content: \" \";\n}\n.note-popover-content {\n  min-width: 100px;\n  min-height: 30px;\n  padding: 3px 8px;\n  color: #000;\n  text-align: center;\n  background-color: #fff;\n}\n.note-popover .popover-content .note-hint-group .note-hint-item.active {\n  background-color: #ccc;\n}\n.note-editor {\n  position: relative;\n}\n.note-editor .note-dropzone {\n  position: absolute;\n  z-index: 100;\n  display: none;\n  color: #87cefa;\n  background-color: rgba(255, 255, 255, 0.2);\n  pointer-event: none;\n}\n.note-editor .note-dropzone .note-dropzone-message {\n  display: table-cell;\n  font-size: 28px;\n  font-weight: 700;\n  text-align: center;\n  vertical-align: middle;\n}\n.note-editor .note-dropzone.hover {\n  color: #098ddf;\n}\n.note-editor.dragover .note-dropzone {\n  display: table;\n}\n.note-editor .note-editing-area {\n  position: relative;\n}\n.note-editor .note-editing-area p {\n  margin: 0 0 10px;\n}\n.note-editor .note-editing-area .note-editable {\n  outline: 0;\n}\n.note-editor .note-editing-area .note-editable * {\n  /*color: inherit;*/\n}\n.note-editor .note-editing-area .note-editable table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.note-editor .note-editing-area .note-editable table td,\n.note-editor .note-editing-area .note-editable table th {\n  padding: 5px 3px;\n  /*border: 1px solid #ececec*/\n  border: 1px solid #ccc;\n}\n.note-editor .note-editing-area .note-editable sup {\n  vertical-align: super;\n}\n.note-editor .note-editing-area .note-editable sub {\n  vertical-align: sub;\n}\n.note-editor .note-editing-area .note-editable a {\n  font-family: inherit;\n  font-weight: inherit;\n  color: #337ab7;\n  text-decoration: underline;\n  /*text-decoration: underline !important;*/\n  background-color: inherit;\n}\n.note-editor .note-editing-area .note-editable a:hover,\n.note-editor .note-editing-area .note-editable a:focus {\n  color: #23527c;\n  text-decoration: underline;\n  outline: 0;\n}\n.note-editor .note-editing-area .note-editable figure {\n  margin: 0;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label {\n  outline: 0;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h1::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h2::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h3::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h4::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h5::before,\n.note-editor .note-editing-area .note-editable.show-heading-label h6::before {\n  content: '<H1>';\n  font-size: 0.5rem;\n  border: 1px dotted gray;\n  background-color: gray;\n  color: white;\n  margin-bottom: 5px;\n  clear: both;\n  display: block;\n  line-height: 0.5rem;\n  width: 1.5rem;\n  text-align: center;\n  text-indent: 0;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h2 {\n  font-size: 1.75rem;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h2::before {\n  content: '<H2>';\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h3 {\n  font-size: 1.5rem;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h3::before {\n  content: '<H3>';\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h4 {\n  font-size: 1.25rem;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h4::before {\n  content: '<H4>';\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h5 {\n  font-size: 1rem;\n  font-weight: bold;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h5::before {\n  content: '<H5>';\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h6 {\n  font-size: 1rem;\n  font-style: italic;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.note-editor .note-editing-area .note-editable.show-heading-label h6::before {\n  content: '<H6>';\n}\n.note-editor .note-editor-comment {\n  border: 1px dotted #ccc;\n  background-color: #D9E778;\n  color: #8a6d3b;\n  border-radius: 4px;\n}\n.note-editor.note-frame {\n  /* border: 1px solid #a9a9a9; */\n  border-width: 0;\n}\n.note-editor.note-frame.codeview .note-editing-area .note-editable {\n  display: none;\n}\n.note-editor.note-frame.codeview .note-editing-area .note-codable {\n  display: block;\n  border-radius: 0.5rem;\n}\n.note-editor.note-frame .note-editing-area {\n  overflow: hidden;\n}\n.note-editor.note-frame .note-editing-area .note-editable {\n  padding: 10px;\n  overflow: auto;\n  /* color: #000; */\n  word-wrap: break-word;\n  /* background-color: #fff */\n  background-color: transparent;\n  border: 1px solid white;\n  border-width: 0 1px;\n}\n.note-editor.note-frame .note-editing-area .note-editable[contenteditable=\"false\"] {\n  background-color: #e5e5e5;\n}\n.note-editor.note-frame .note-editing-area .note-codable {\n  display: none;\n  width: 100%;\n  padding: 10px;\n  margin-bottom: 0;\n  font-family: Menlo, Monaco, monospace, sans-serif;\n  font-size: 14px;\n  color: #ccc;\n  background-color: #222;\n  border: 0;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0;\n  box-shadow: none;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  resize: none;\n}\n.note-editor.note-frame.fullscreen {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1050;\n  width: 100% !important;\n}\n.note-editor.note-frame.fullscreen .note-editable {\n  background-color: #fff;\n}\n.note-editor.note-frame.fullscreen .note-resizebar {\n  display: none;\n}\n.note-editor.note-frame .note-status-output {\n  display: block;\n  width: 100%;\n  height: 20px;\n  margin-bottom: 0;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #000;\n  border: 0;\n  border-top: 1px solid #e2e2e2;\n}\n.note-editor.note-frame .note-status-output:empty {\n  height: 0;\n  border-top: 0 solid transparent;\n}\n.note-editor.note-frame .note-status-output .pull-right {\n  float: right !important;\n}\n.note-editor.note-frame .note-status-output .text-muted {\n  color: #777;\n}\n.note-editor.note-frame .note-status-output .text-primary {\n  color: #286090;\n}\n.note-editor.note-frame .note-status-output .text-success {\n  color: #3c763d;\n}\n.note-editor.note-frame .note-status-output .text-info {\n  color: #31708f;\n}\n.note-editor.note-frame .note-status-output .text-warning {\n  color: #8a6d3b;\n}\n.note-editor.note-frame .note-status-output .text-danger {\n  color: #a94442;\n}\n.note-editor.note-frame .note-status-output .alert {\n  padding: 7px 10px 2px 10px;\n  margin: -7px 0 0 0;\n  color: #000;\n  background-color: #f5f5f5;\n  border-radius: 0;\n}\n.note-editor.note-frame .note-status-output .alert .note-icon {\n  margin-right: 5px;\n}\n.note-editor.note-frame .note-status-output .alert-success {\n  color: #3c763d !important;\n  background-color: #dff0d8 !important;\n}\n.note-editor.note-frame .note-status-output .alert-info {\n  color: #31708f !important;\n  background-color: #d9edf7 !important;\n}\n.note-editor.note-frame .note-status-output .alert-warning {\n  color: #8a6d3b !important;\n  background-color: #fcf8e3 !important;\n}\n.note-editor.note-frame .note-status-output .alert-danger {\n  color: #a94442 !important;\n  background-color: #f2dede !important;\n}\n.note-editor.note-frame .note-statusbar {\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.note-editor.note-frame .note-statusbar .note-resizebar {\n  width: 100%;\n  height: 9px;\n  padding-top: 1px;\n  cursor: ns-resize;\n}\n.note-editor.note-frame .note-statusbar .note-resizebar .note-icon-bar {\n  width: 20px;\n  margin: 1px auto;\n  border-top: 1px solid #a9a9a9;\n}\n.note-editor.note-frame .note-statusbar.locked .note-resizebar {\n  cursor: default;\n}\n.note-editor.note-frame .note-statusbar.locked .note-resizebar .note-icon-bar {\n  display: none;\n}\n.note-editor.note-frame .note-placeholder {\n  padding: 10px;\n}\n.note-popover {\n  max-width: none;\n}\n.note-popover .note-popover-content a {\n  display: inline-block;\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.note-popover .note-popover-arrow {\n  left: 20px !important;\n}\n.note-popover .note-popover-content,\n.note-toolbar {\n  padding: 0 0 5px 5px;\n  margin: 0;\n  background-color: #fff;\n}\n.note-toolbar {\n  border-bottom-width: 0;\n  background: #f5f5f5;\n  border-radius: 1px;\n  /*z-index: 6000;*/\n  z-index: 600;\n}\n/*\n.note-toolbar.fixed {\n  max-height: 80px;\n  overflow-y: auto;\n}*/\n.note-toolbar.fixed {\n  box-shadow: 0px 0px 20px #f5f5f5;\n  border-bottom-color: rgba(34, 36, 38, 0.15);\n  border-bottom-style: solid;\n  border-bottom-width: 0;\n}\n.note-popover .note-popover-content > .note-btn-group,\n.note-toolbar > .note-btn-group {\n  margin-top: 5px;\n  margin-right: 5px;\n  margin-left: 0;\n}\n.note-popover .note-popover-content .note-btn-group .note-table,\n.note-toolbar .note-btn-group .note-table {\n  min-width: 0;\n  padding: 5px;\n}\n.note-toolbar .note-btn-group .note-dropdown-menu.note-table {\n  overflow: hidden;\n}\n.note-popover .note-popover-content .note-btn-group .note-table .note-dimension-picker,\n.note-toolbar .note-btn-group .note-table .note-dimension-picker {\n  font-size: 18px;\n}\n.note-popover .note-popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-mousecatcher,\n.note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-mousecatcher {\n  position: absolute!important;\n  z-index: 3;\n  width: 10em;\n  height: 10em;\n  cursor: pointer;\n}\n.note-popover .note-popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-unhighlighted,\n.note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-unhighlighted {\n  position: relative!important;\n  z-index: 1;\n  width: 5em;\n  height: 5em;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC') repeat;\n}\n.note-popover .note-popover-content .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-highlighted,\n.note-toolbar .note-btn-group .note-table .note-dimension-picker .note-dimension-picker-highlighted {\n  position: absolute!important;\n  z-index: 2;\n  width: 1em;\n  height: 1em;\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIjd6vvD2f9LKLW+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKwNDEVT0AAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC') repeat;\n}\n.note-popover .note-popover-content .note-style h1,\n.note-toolbar .note-style h1,\n.note-popover .note-popover-content .note-style h2,\n.note-toolbar .note-style h2,\n.note-popover .note-popover-content .note-style h3,\n.note-toolbar .note-style h3,\n.note-popover .note-popover-content .note-style h4,\n.note-toolbar .note-style h4,\n.note-popover .note-popover-content .note-style h5,\n.note-toolbar .note-style h5,\n.note-popover .note-popover-content .note-style h6,\n.note-toolbar .note-style h6,\n.note-popover .note-popover-content .note-style blockquote,\n.note-toolbar .note-style blockquote {\n  margin: 0;\n}\n.note-popover .note-popover-content .note-color-all .note-dropdown-menu,\n.note-toolbar .note-color-all .note-dropdown-menu {\n  min-width: 346px;\n}\n.note-toolbar .note-color-all .note-dropdown-menu {\n  user-select: none;\n}\n.note-toolbar .note-color-all .note-dropdown-menu button {\n  user-select: all;\n}\n.note-popover .note-popover-content .note-color .dropdown-toggle,\n.note-toolbar .note-color .dropdown-toggle {\n  width: 20px;\n  padding-left: 5px;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu,\n.note-toolbar .note-color .note-dropdown-menu {\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette,\n.note-toolbar .note-color .note-dropdown-menu .note-palette {\n  display: inline-block;\n  width: 160px;\n  margin: 0;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette:first-child,\n.note-toolbar .note-color .note-dropdown-menu .note-palette:first-child {\n  margin: 0 5px;\n  margin-right: 15px;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-palette-title,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-palette-title {\n  margin: 2px 7px;\n  font-size: 12px;\n  text-align: center;\n  border-bottom: 1px solid #eee;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-reset,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-reset,\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-select,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-select {\n  width: 100%;\n  padding: 2px 3px;\n  margin: 3px;\n  cursor: pointer;\n  background-color: #fff;\n  border: 0;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-row,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-row {\n  height: 20px;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-reset:hover,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-reset:hover {\n  background: #eee;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-color-select-btn,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-color-select-btn {\n  display: none;\n}\n.note-popover .note-popover-content .note-color .note-dropdown-menu .note-palette .note-holder-custom .note-color-btn,\n.note-toolbar .note-color .note-dropdown-menu .note-palette .note-holder-custom .note-color-btn {\n  border: 1px solid #eee;\n}\n.note-popover .note-popover-content .note-style .note-dropdown-menu,\n.note-toolbar .note-style .note-dropdown-menu {\n  min-width: 216px;\n  padding: 5px;\n}\n.note-popover .note-popover-content .note-style .note-dropdown-menu > div:first-child,\n.note-toolbar .note-style .note-dropdown-menu > div:first-child {\n  margin-right: 5px;\n}\n.note-popover .note-popover-content .note-btn-fontname .note-dropdown-menu,\n.note-toolbar .note-btn-fontname .note-dropdown-menu {\n  min-width: 220px;\n}\n.note-popover .note-popover-content .note-dropdown-menu,\n.note-toolbar .note-dropdown-menu {\n  min-width: 160px;\n}\n.note-popover .note-popover-content .note-dropdown-menu.right,\n.note-toolbar .note-dropdown-menu.right {\n  right: 0;\n  left: auto;\n}\n.note-popover .note-popover-content .note-dropdown-menu.right::before,\n.note-toolbar .note-dropdown-menu.right::before {\n  right: 9px;\n  left: auto !important;\n}\n.note-popover .note-popover-content .note-dropdown-menu.right::after,\n.note-toolbar .note-dropdown-menu.right::after {\n  right: 10px;\n  left: auto !important;\n}\n.note-popover .note-popover-content .note-dropdown-menu.note-check .note-dropdown-item i,\n.note-toolbar .note-dropdown-menu.note-check .note-dropdown-item i {\n  color: deepskyblue;\n  visibility: hidden;\n}\n.note-popover .note-popover-content .note-dropdown-menu.note-check .note-dropdown-item.checked i,\n.note-toolbar .note-dropdown-menu.note-check .note-dropdown-item.checked i {\n  visibility: visible;\n}\n.note-popover .note-popover-content .note-dropdown-menu .note-dropdown-item > *,\n.note-toolbar .note-dropdown-menu .note-dropdown-item > * {\n  margin: 0;\n  display: block;\n}\n.note-popover .note-popover-content .note-fontsize-10,\n.note-toolbar .note-fontsize-10 {\n  font-size: 10px;\n}\n.note-popover .note-popover-content .note-color-palette,\n.note-toolbar .note-color-palette {\n  line-height: 1;\n}\n.note-popover .note-popover-content .note-color-palette div .note-color-btn,\n.note-toolbar .note-color-palette div .note-color-btn {\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  margin: 0;\n  border: 1px solid #fff;\n}\n.note-popover .note-popover-content .note-color-palette div .note-color-btn:hover,\n.note-toolbar .note-color-palette div .note-color-btn:hover {\n  border: 1px solid #000;\n}\n.note-modal .note-modal-body label {\n  display: inline-block;\n  padding: 2px 5px;\n  margin-bottom: 2px;\n}\n.note-modal .note-modal-body .help-list-item:hover {\n  background-color: #e0e0e0;\n}\n@-moz-document url-prefix() {\n  .note-image-input {\n    height: auto;\n  }\n}\n.note-placeholder {\n  position: absolute;\n  display: none;\n  color: gray;\n}\n.note-popover.note-image-popover {\n  max-width: 370px;\n}\n.note-handle .note-control-selection {\n  position: absolute;\n  display: none;\n  border: 1px solid black;\n}\n.note-handle .note-control-selection > div {\n  position: absolute;\n}\n.note-handle .note-control-selection .note-control-selection-bg {\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  -webkit-opacity: 0.3;\n  -khtml-opacity: 0.3;\n  -moz-opacity: 0.3;\n  opacity: 0.3;\n  -ms-filter: alpha(opacity=30);\n  filter: alpha(opacity=30);\n}\n.note-handle .note-control-selection .note-control-handle {\n  width: 7px;\n  height: 7px;\n  border: 1px solid #000;\n}\n.note-handle .note-control-selection .note-control-holder {\n  width: 7px;\n  height: 7px;\n  border: 1px solid #000;\n}\n.note-handle .note-control-selection .note-control-sizing {\n  width: 7px;\n  height: 7px;\n  background-color: #fff;\n  border: 1px solid #000;\n}\n.note-handle .note-control-selection .note-control-nw {\n  top: -5px;\n  left: -5px;\n  border-right: 0;\n  border-bottom: 0;\n}\n.note-handle .note-control-selection .note-control-ne {\n  top: -5px;\n  right: -5px;\n  border-bottom: 0;\n  border-left: none;\n}\n.note-handle .note-control-selection .note-control-sw {\n  bottom: -5px;\n  left: -5px;\n  border-top: 0;\n  border-right: 0;\n}\n.note-handle .note-control-selection .note-control-se {\n  right: -5px;\n  bottom: -5px;\n  cursor: se-resize;\n}\n.note-handle .note-control-selection .note-control-se.note-control-holder {\n  cursor: default;\n  border-top: 0;\n  border-left: none;\n}\n.note-handle .note-control-selection .note-control-selection-info {\n  right: 0;\n  bottom: 0;\n  padding: 5px;\n  margin: 5px;\n  font-size: 12px;\n  color: #fff;\n  background-color: #000;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n  -webkit-opacity: 0.7;\n  -khtml-opacity: 0.7;\n  -moz-opacity: 0.7;\n  opacity: 0.7;\n  -ms-filter: alpha(opacity=70);\n  filter: alpha(opacity=70);\n}\n.note-hint-popover {\n  min-width: 100px;\n  padding: 2px;\n}\n.note-hint-popover .note-popover-content {\n  max-height: 150px;\n  padding: 3px;\n  overflow: auto;\n}\n.note-hint-popover .note-popover-content .note-hint-group .note-hint-item {\n  display: block!important;\n  padding: 3px;\n}\n.note-hint-popover .note-popover-content .note-hint-group .note-hint-item.active,\n.note-hint-popover .note-popover-content .note-hint-group .note-hint-item:hover {\n  display: block;\n  clear: both;\n  font-weight: 400;\n  line-height: 1.4;\n  color: #fff;\n  text-decoration: none;\n  white-space: nowrap;\n  cursor: pointer;\n  background-color: #428bca;\n  outline: 0;\n}\n.note-hint-popover .note-popover-content .note-hint-group {\n  max-height: 400px;\n  overflow-y: auto;\n}\n.note-hint-popover .note-popover-content .note-hint-group .note-hint-item {\n  cursor: pointer;\n}\n.help-list-item label {\n  display: inline-block;\n  margin-bottom: 5px;\n}\n.note-modal input[type] {\n  height: inherit;\n}\n.note-modal input[type=\"radio\"] {\n  margin-top: -2px;\n  margin-right: 0.2rem;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".editor-container {\n  position: fixed;\n  top: 10vh;\n  left: 20vw;\n  border: 1px solid red;\n  background-color: white;\n}\n", "",{"version":3,"sources":["NoteEditorManager.global.less?vue&type=style&index=0&lang=less&"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,SAAS;EACT,UAAU;EACV,qBAAqB;EACrB,uBAAuB;AACzB","file":"NoteEditorManager.global.less?vue&type=style&index=0&lang=less&","sourcesContent":[".editor-container {\n  position: fixed;\n  top: 10vh;\n  left: 20vw;\n  border: 1px solid red;\n  background-color: white;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less&":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "@media print {\n.annotate-panel {\n    display: none;\n}\n.highlight {\n    /*background-color: #333;*/\n    background-color: yellow;\n}\n}\n.highlight {\n  background-color: yellow;\n}\n.annotate-panel {\n  position: fixed;\n  /*right: 10px;*/\n  /*top: 10px;*/\n  display: none;\n  background-color: white;\n  background-color: #CCC;\n  border-radius: 10px;\n  /*padding: 5px;*/\n  box-shadow: 5px 5px 2px grey;\n  user-select: none;\n}\n.annotate-panel.show {\n  display: inline-block;\n}\n.annotate-panel .button {\n  border-width: 0;\n  background-color: transparent;\n  text-align: center;\n  display: inline-block;\n  /*border-right: 3px ridge white;*/\n  cursor: pointer;\n  font-size: 0.8em;\n  padding: 5px;\n}\n.annotate-panel .button.highlightSelectedText {\n  border-radius: 10px 0 0 10px;\n}\n.annotate-panel .button.removeHighlightFromSelectedText {\n  border-radius: 0 10px 10px 0 ;\n  margin-left: -5px;\n}\n.annotate-panel .button-container {\n  border-right: 3px ridge white;\n  display: inline-block;\n  /*padding-right: 4px;*/\n}\n.annotate-panel .button:hover {\n  background-color: yellow;\n}\n.annotate-panel .button-container:last-of-type {\n  border-right-width: 0;\n  padding-right: 0px;\n}\n.annotate-panel.hide-remove .button-container.remove {\n  display: none;\n}\n.annotate-panel.hide-remove .button-container {\n  border-right-width: 0;\n  padding-right: 0px;\n}\n.annotate-panel.hide-remove .button {\n  border-radius: 10px;\n}\n", "",{"version":3,"sources":["RangyManager.global.less?vue&type=style&index=0&lang=less&"],"names":[],"mappings":"AAAA;AACA;IACI,aAAa;AACjB;AACA;IACI,0BAA0B;IAC1B,wBAAwB;AAC5B;AACA;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,eAAe;EACf,eAAe;EACf,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,4BAA4B;EAC5B,iBAAiB;AACnB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;EACf,6BAA6B;EAC7B,kBAAkB;EAClB,qBAAqB;EACrB,iCAAiC;EACjC,eAAe;EACf,gBAAgB;EAChB,YAAY;AACd;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,6BAA6B;EAC7B,iBAAiB;AACnB;AACA;EACE,6BAA6B;EAC7B,qBAAqB;EACrB,sBAAsB;AACxB;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,qBAAqB;EACrB,kBAAkB;AACpB;AACA;EACE,aAAa;AACf;AACA;EACE,qBAAqB;EACrB,kBAAkB;AACpB;AACA;EACE,mBAAmB;AACrB","file":"RangyManager.global.less?vue&type=style&index=0&lang=less&","sourcesContent":["@media print {\n.annotate-panel {\n    display: none;\n}\n.highlight {\n    /*background-color: #333;*/\n    background-color: yellow;\n}\n}\n.highlight {\n  background-color: yellow;\n}\n.annotate-panel {\n  position: fixed;\n  /*right: 10px;*/\n  /*top: 10px;*/\n  display: none;\n  background-color: white;\n  background-color: #CCC;\n  border-radius: 10px;\n  /*padding: 5px;*/\n  box-shadow: 5px 5px 2px grey;\n  user-select: none;\n}\n.annotate-panel.show {\n  display: inline-block;\n}\n.annotate-panel .button {\n  border-width: 0;\n  background-color: transparent;\n  text-align: center;\n  display: inline-block;\n  /*border-right: 3px ridge white;*/\n  cursor: pointer;\n  font-size: 0.8em;\n  padding: 5px;\n}\n.annotate-panel .button.highlightSelectedText {\n  border-radius: 10px 0 0 10px;\n}\n.annotate-panel .button.removeHighlightFromSelectedText {\n  border-radius: 0 10px 10px 0 ;\n  margin-left: -5px;\n}\n.annotate-panel .button-container {\n  border-right: 3px ridge white;\n  display: inline-block;\n  /*padding-right: 4px;*/\n}\n.annotate-panel .button:hover {\n  background-color: yellow;\n}\n.annotate-panel .button-container:last-of-type {\n  border-right-width: 0;\n  padding-right: 0px;\n}\n.annotate-panel.hide-remove .button-container.remove {\n  display: none;\n}\n.annotate-panel.hide-remove .button-container {\n  border-right-width: 0;\n  padding-right: 0px;\n}\n.annotate-panel.hide-remove .button {\n  border-radius: 10px;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964& ***!
  \*****************************************************************************************************************************************************************/
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.html?vue&type=template&id=733f65a8&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.html?vue&type=template&id=733f65a8& ***!
  \*******************************************************************************************************************************************************************************************/
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
  return _c("div", [_vm._v("\r\n  OK\r\n")])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/RangyManager/RangyManager.html?vue&type=template&id=620c2ace&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/client/components/RangyManager/RangyManager.html?vue&type=template&id=620c2ace& ***!
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
  return _c("div", [
    _c(
      "button",
      { attrs: { type: "button" }, on: { click: _vm.highlightSelectedText } },
      [_vm._v("\r\n    Highlight\r\n  ")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NoteEditorManager.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("92dc1c7a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./RangyManager.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("89d264be", content, false, {});
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
/* harmony import */ var _plugins_semantic_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins/semantic-ui */ "./webpack-app/plugins/semantic-ui.js");
/* harmony import */ var _plugins_semantic_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_plugins_semantic_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/i18n */ "./webpack-app/plugins/i18n.js");
/* harmony import */ var _helpers_AxiosHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/AxiosHelper */ "./webpack-app/helpers/AxiosHelper.js");
/* harmony import */ var _helpers_DayJSHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/DayJSHelper */ "./webpack-app/helpers/DayJSHelper.js");
/* harmony import */ var _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/StringHelper */ "./webpack-app/helpers/StringHelper.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _client_client_tpl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./client/client.tpl */ "./webpack-app/client/client.tpl");
/* harmony import */ var _client_client_tpl__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_client_client_tpl__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./config.js */ "./webpack-app/config.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_config_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _client_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./client/routes */ "./webpack-app/client/routes.js");
/* harmony import */ var _client_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./client/components */ "./webpack-app/client/components.js");
/* global __webpack_public_path__ */


// ----------------------------------
// plugins





// ----------------------------------
// Helpers




// ----------------------





// --------------------
// Components or routes




// -----------------------
// 確認 baseURL

let baseURL = __webpack_require__.p
baseURL = baseURL.split('/').slice(0, 3).join('/')
_config_js__WEBPACK_IMPORTED_MODULE_9___default.a.baseURL = baseURL

let baseScript = jquery__WEBPACK_IMPORTED_MODULE_7___default()(document.currentScript)
if (baseScript.length === 1) {
  baseScript.before(`<div id="app"></div>`)
}

// -----------------------

let VueController = {
  data: {
    config: _config_js__WEBPACK_IMPORTED_MODULE_9___default.a,
    status: {
      username: '',
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {
      AxiosHelper: _helpers_AxiosHelper__WEBPACK_IMPORTED_MODULE_4__["default"].setBaseURL(baseURL),
      DayJSHelper: _helpers_DayJSHelper__WEBPACK_IMPORTED_MODULE_5__["default"],
      StringHelper: _helpers_StringHelper__WEBPACK_IMPORTED_MODULE_6__["default"]
    },
    view: 'Loading',
    error: '',
    persistAttrs: [
    ]
  },
  watch: {
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
      let view = 'Login'
      if (typeof(this.status.username) === 'string') {
        view = 'Chat'
      }
      //console.log(view)
      this.view = view
    },
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    }
  },
  created: function () {
    /*
    if (this.$router.currentRoute.fullPath !== '/') {
      this.$router.replace('/')
    }
     */
    this.loadClientConfig()
  },
  mounted: function () {
    this.lib.AxiosHelper.setErrorHandler((error) => {
      this.error = error
    })
  },
  
  methods: {
    loadClientConfig: function () {
      let config = window[this.config.clientConfigName]
      
      if (typeof(config) === 'object') {
        for (let key in config) {
          this.config[key] = config[key]
        }
      }
      
      //console.log(this.config)
    },
  }, // methods: {
  
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__["default"],
  
  template: _client_client_tpl__WEBPACK_IMPORTED_MODULE_8___default.a,
  router: _client_routes__WEBPACK_IMPORTED_MODULE_10__["default"],
  components: _client_components__WEBPACK_IMPORTED_MODULE_11__["default"],
  errorCaptured(err, vm, info) {
    // https://medium.com/js-dojo/error-exception-handling-in-vue-js-application-6c26eeb6b3e4
    this.error = err.stack
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.
    // TODO: Perform any custom logic or log to server
    // return false to stop the propagation of errors further to parent or global error handler
  },
}

if (typeof(baseURL) === 'string') {
  jquery__WEBPACK_IMPORTED_MODULE_7___default()(() => {
    new vue__WEBPACK_IMPORTED_MODULE_0__["default"](VueController)
    
    jquery__WEBPACK_IMPORTED_MODULE_7___default()('body > #TestMessage').remove()
  })
}

window.VueController = VueController


/***/ }),

/***/ "./webpack-app/client/client.tpl":
/*!***************************************!*\
  !*** ./webpack-app/client/client.tpl ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"non-invasive-web-style-framework\">\r\n\r\n  <auth v-bind:config=\"config\"\r\n        v-bind:status=\"status\"\r\n        v-bind:progress=\"progress\"\r\n        v-bind:lib=\"lib\"\r\n        v-bind:error=\"error\"\r\n        ref=\"auth\"></auth>\r\n  <error-handler v-bind:config=\"config\"\r\n                 v-bind:error=\"error\"\r\n                 ref=\"ErrorHandler\"></error-handler>\r\n  \r\n  <router-view v-bind:config=\"config\"\r\n               v-bind:status=\"status\"\r\n               v-bind:progress=\"progress\"\r\n               v-bind:lib=\"lib\"\r\n               v-bind:error=\"error\"></router-view>\r\n  \r\n  <!--\r\n  <rangy-manager v-bind:config=\"config\"\r\n        v-bind:status=\"status\"\r\n        v-bind:progress=\"progress\"\r\n        v-bind:lib=\"lib\"\r\n        v-bind:error=\"error\"\r\n        v-bind:view=\"view\"></rangy-manager>\r\n  \r\n  <note-editor-manager v-bind:config=\"config\"\r\n        v-bind:status=\"status\"\r\n        v-bind:progress=\"progress\"\r\n        v-bind:lib=\"lib\"\r\n        v-bind:error=\"error\"\r\n        v-bind:view=\"view\"></note-editor-manager>\r\n  -->\r\n  <keep-alive>\r\n    <component v-bind:is=\"view\"\r\n        v-bind:config=\"config\"\r\n        v-bind:status=\"status\"\r\n        v-bind:progress=\"progress\"\r\n        v-bind:lib=\"lib\"\r\n        v-bind:error=\"error\"\r\n        v-bind:view=\"view\"></component>\r\n  </keep-alive>\r\n</div>";

/***/ }),

/***/ "./webpack-app/client/components.js":
/*!******************************************!*\
  !*** ./webpack-app/client/components.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../components/Loading/Loading.vue */ "./webpack-app/components/Loading/Loading.vue");
/* harmony import */ var _components_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/ErrorHandler/ErrorHandler.vue */ "./webpack-app/components/ErrorHandler/ErrorHandler.vue");
/* harmony import */ var _components_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Auth/Auth.vue */ "./webpack-app/client/components/Auth/Auth.vue");
/* harmony import */ var _components_RangyManager_RangyManager_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/RangyManager/RangyManager.vue */ "./webpack-app/client/components/RangyManager/RangyManager.vue");
/* harmony import */ var _components_NoteEditorManager_NoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/NoteEditorManager/NoteEditorManager.vue */ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.vue");






let components = {
  Loading: _components_Loading_Loading_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  'error-handler': _components_ErrorHandler_ErrorHandler_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  Auth: _components_Auth_Auth_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  'rangy-manager': _components_RangyManager_RangyManager_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
  'note-editor-manager': _components_NoteEditorManager_NoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
  Login: () => __webpack_require__.e(/*! import() | client-components/Login */ "client-components/Login").then(__webpack_require__.bind(null, /*! ./components/Login/Login.vue */ "./webpack-app/client/components/Login/Login.vue")),
  Chat: () => __webpack_require__.e(/*! import() | client-components/Chat */ "client-components/Chat").then(__webpack_require__.bind(null, /*! ./components/Chat/Chat.vue */ "./webpack-app/client/components/Chat/Chat.vue")),
}
/* harmony default export */ __webpack_exports__["default"] = (components);

/***/ }),

/***/ "./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964&":
/*!*************************************************************************************!*\
  !*** ./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./Auth.html?vue&type=template&id=206d1964& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js&?1f9c":
/*!*****************************************************************************!*\
  !*** ./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./Auth.js?vue&type=script&lang=js& */ "./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js&?ecd4");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js&?ecd4":
/*!*****************************************************************************!*\
  !*** ./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js& ***!
  \*****************************************************************************/
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
    if (typeof(this.config.username) !== 'string' 
            && typeof(this.config.usernameQueryURL) === 'string') {
      this.config.username = await this.loadUsernameFromURL()
    }
    
    let result = false
    if (typeof(this.config.username) === 'string') {
      result = await this.attemptLoginViaUsername(this.config.username)
    }
    
    if (result === false) {
      await this.checkLogin()
    }
  },
  methods: {
    loadUsernameFromURL: async function () {
      let result = await this.lib.AxiosHelper.getOther(this.config.usernameQueryURL)
      if (typeof(result) === 'string') {
        return result
      }
    },
    attemptLoginViaUsername: async function (username) {
      var result = await this.lib.AxiosHelper.get(`/client/user/attempt-login-via-username`, {
        username: username
      })
      if (typeof(result) === 'string') {
        this.status.username = result
        return true
      }
      else {
        return false
      }
    },
    checkLogin: async function () {
      var result = await this.lib.AxiosHelper.get(`/client/user/check-login`)
      this.status.username = result
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (Auth);

/***/ }),

/***/ "./webpack-app/client/components/Auth/Auth.vue":
/*!*****************************************************!*\
  !*** ./webpack-app/client/components/Auth/Auth.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auth.html?vue&type=template&id=206d1964& */ "./webpack-app/client/components/Auth/Auth.html?vue&type=template&id=206d1964&");
/* harmony import */ var _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth.js?vue&type=script&lang=js& */ "./webpack-app/client/components/Auth/Auth.js?vue&type=script&lang=js&?1f9c");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Auth_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Auth_html_vue_type_template_id_206d1964___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/components/Auth/Auth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less&":
/*!*************************************************************************************************************************!*\
  !*** ./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NoteEditorManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./NoteEditorManager.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NoteEditorManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NoteEditorManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NoteEditorManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NoteEditorManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_NoteEditorManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.html?vue&type=template&id=733f65a8&":
/*!***************************************************************************************************************!*\
  !*** ./webpack-app/client/components/NoteEditorManager/NoteEditorManager.html?vue&type=template&id=733f65a8& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NoteEditorManager_html_vue_type_template_id_733f65a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./NoteEditorManager.html?vue&type=template&id=733f65a8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.html?vue&type=template&id=733f65a8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NoteEditorManager_html_vue_type_template_id_733f65a8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_NoteEditorManager_html_vue_type_template_id_733f65a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.js?vue&type=script&lang=js&?734d":
/*!*******************************************************************************************************!*\
  !*** ./webpack-app/client/components/NoteEditorManager/NoteEditorManager.js?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendors_summernote_summernote_lite_webpack_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../vendors/summernote/summernote-lite.webpack.js */ "./webpack-app/vendors/summernote/summernote-lite.webpack.js");


let NoteEditorManager = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      serializedHighlights: null
    }
  },  // data() {
  computed: {
  },  // computed: {
  watch: {
  },  // watch: {
  mounted() {
    this.initEditor()
  },  // mounted() {
  methods: {
    initEditor: function () {
      $('<div class="editor-container"><div id="editor"><h1>Hello Summernote</h1></div></div>').appendTo('body')
      $('#editor').summernote({
        //airMode: true
      })
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (NoteEditorManager);

/***/ }),

/***/ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.js?vue&type=script&lang=js&?b412":
/*!*******************************************************************************************************!*\
  !*** ./webpack-app/client/components/NoteEditorManager/NoteEditorManager.js?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NoteEditorManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./NoteEditorManager.js?vue&type=script&lang=js& */ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.js?vue&type=script&lang=js&?734d");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_NoteEditorManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CNoteEditorManager%5CNoteEditorManager.vue":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/components/NoteEditorManager/NoteEditorManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CNoteEditorManager%5CNoteEditorManager.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./NoteEditorManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CNoteEditorManager%5CNoteEditorManager.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/components/NoteEditorManager/NoteEditorManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CNoteEditorManager%5CNoteEditorManager.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.vue":
/*!*******************************************************************************!*\
  !*** ./webpack-app/client/components/NoteEditorManager/NoteEditorManager.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NoteEditorManager_html_vue_type_template_id_733f65a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NoteEditorManager.html?vue&type=template&id=733f65a8& */ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.html?vue&type=template&id=733f65a8&");
/* harmony import */ var _NoteEditorManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NoteEditorManager.js?vue&type=script&lang=js& */ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.js?vue&type=script&lang=js&?b412");
/* empty/unused harmony star reexport *//* harmony import */ var _NoteEditorManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NoteEditorManager.global.less?vue&type=style&index=0&lang=less& */ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NoteEditorManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CNoteEditorManager%5CNoteEditorManager.vue */ "./webpack-app/client/components/NoteEditorManager/NoteEditorManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CNoteEditorManager%5CNoteEditorManager.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NoteEditorManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NoteEditorManager_html_vue_type_template_id_733f65a8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NoteEditorManager_html_vue_type_template_id_733f65a8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* custom blocks */

if (typeof _NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_NoteEditorManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CNoteEditorManager_5CNoteEditorManager_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/components/NoteEditorManager/NoteEditorManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************!*\
  !*** ./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_RangyManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./RangyManager.global.less?vue&type=style&index=0&lang=less& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_RangyManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_RangyManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_RangyManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_RangyManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_RangyManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/components/RangyManager/RangyManager.html?vue&type=template&id=620c2ace&":
/*!*****************************************************************************************************!*\
  !*** ./webpack-app/client/components/RangyManager/RangyManager.html?vue&type=template&id=620c2ace& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_RangyManager_html_vue_type_template_id_620c2ace___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./RangyManager.html?vue&type=template&id=620c2ace& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/client/components/RangyManager/RangyManager.html?vue&type=template&id=620c2ace&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_RangyManager_html_vue_type_template_id_620c2ace___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_RangyManager_html_vue_type_template_id_620c2ace___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/client/components/RangyManager/RangyManager.js?vue&type=script&lang=js&?43e0":
/*!*********************************************************************************************!*\
  !*** ./webpack-app/client/components/RangyManager/RangyManager.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendors_rangy_rangy_webpack_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../vendors/rangy/rangy-webpack.js */ "./webpack-app/vendors/rangy/rangy-webpack.js");

let highlighter

let RangyManager = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      serializedHighlights: null
    }
  },  // data() {
  computed: {
  },  // computed: {
  watch: {
  },  // watch: {
  mounted() {
    window.rangy = _vendors_rangy_rangy_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"]
    this.initHighlighter()
    //console.log(rangy)
  },  // mounted() {
  methods: {
    initHighlighter: function () {
      _vendors_rangy_rangy_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].init()
      highlighter = _vendors_rangy_rangy_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].createHighlighter()

      highlighter.addClassApplier(_vendors_rangy_rangy_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].createClassApplier("highlight", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"],
        elementProperties: {
              href: "#",
              onclick: function() {
                  let highlight = highlighter.getHighlightForElement(this);
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
          }
      }));

      highlighter.addClassApplier(_vendors_rangy_rangy_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].createClassApplier("note", {
          ignoreWhiteSpace: true,
          elementTagName: "a",
          elementProperties: {
              href: "#",
              onclick: function() {
                  let highlight = highlighter.getHighlightForElement(this);
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
          }
      }))
      
       if (this.serializedHighlights) {
          highlighter.deserialize(this.serializedHighlights);
       }
    },
    highlightSelectedText: function () {
      highlighter.highlightSelection("highlight");
      console.log(highlighter.serialize())
      //$$.cookie(_get_cookie_key(), highlighter.serialize(), {expires: _cookie_expire }); 
      var sel = _vendors_rangy_rangy_webpack_js__WEBPACK_IMPORTED_MODULE_0__["default"].getSelection();
      sel.removeAllRanges();
    }
  } // methods
}

/* harmony default export */ __webpack_exports__["default"] = (RangyManager);

/***/ }),

/***/ "./webpack-app/client/components/RangyManager/RangyManager.js?vue&type=script&lang=js&?db26":
/*!*********************************************************************************************!*\
  !*** ./webpack-app/client/components/RangyManager/RangyManager.js?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RangyManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./RangyManager.js?vue&type=script&lang=js& */ "./webpack-app/client/components/RangyManager/RangyManager.js?vue&type=script&lang=js&?43e0");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_RangyManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/client/components/RangyManager/RangyManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CRangyManager%5CRangyManager.vue":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/client/components/RangyManager/RangyManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CRangyManager%5CRangyManager.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/@kazupon/vue-i18n-loader/lib!./RangyManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CRangyManager%5CRangyManager.vue */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/client/components/RangyManager/RangyManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CRangyManager%5CRangyManager.vue");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/client/components/RangyManager/RangyManager.vue":
/*!*********************************************************************!*\
  !*** ./webpack-app/client/components/RangyManager/RangyManager.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RangyManager_html_vue_type_template_id_620c2ace___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RangyManager.html?vue&type=template&id=620c2ace& */ "./webpack-app/client/components/RangyManager/RangyManager.html?vue&type=template&id=620c2ace&");
/* harmony import */ var _RangyManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RangyManager.js?vue&type=script&lang=js& */ "./webpack-app/client/components/RangyManager/RangyManager.js?vue&type=script&lang=js&?db26");
/* empty/unused harmony star reexport *//* harmony import */ var _RangyManager_global_less_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RangyManager.global.less?vue&type=style&index=0&lang=less& */ "./webpack-app/client/components/RangyManager/RangyManager.global.less?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RangyManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CRangyManager%5CRangyManager.vue */ "./webpack-app/client/components/RangyManager/RangyManager.json?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cclient%5Ccomponents%5CRangyManager%5CRangyManager.vue");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RangyManager_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RangyManager_html_vue_type_template_id_620c2ace___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RangyManager_html_vue_type_template_id_620c2ace___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* custom blocks */

if (typeof _RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_RangyManager_json_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cclient_5Ccomponents_5CRangyManager_5CRangyManager_vue__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/client/components/RangyManager/RangyManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/client/routes.js":
/*!**************************************!*\
  !*** ./webpack-app/client/routes.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"])

const routes = [
  //{ path: '/', component: require('./components/Loading/Loading.vue') },
  //{ path: '/login', component: () => import(/* webpackChunkName: "client-components/login" */ './components/Login/Login.vue') },
  //{ path: '/chat', component: () => import(/* webpackChunkName: "client-components/chat" */ './components/Chat/Chat.vue') }
]

/* harmony default export */ __webpack_exports__["default"] = (new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  routes: routes
}));

/***/ }),

/***/ "./webpack-app/vendors/rangy/rangy-classapplier.js":
/*!*********************************************************!*\
  !*** ./webpack-app/vendors/rangy/rangy-classapplier.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Class Applier module for Rangy.
 * Adds, removes and toggles classes on Ranges and Selections
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Depends on Rangy core.
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.1-dev
 * Build date: 20 May 2015
 */
(function(factory, root) {
    if (true) {
        // AMD. Register as an anonymous module with a dependency on Rangy.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./rangy-core */ "./webpack-app/vendors/rangy/rangy-core.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(function(rangy) {
    rangy.createModule("ClassApplier", ["WrappedSelection"], function(api, module) {
        var dom = api.dom;
        var DomPosition = dom.DomPosition;
        var contains = dom.arrayContains;
        var util = api.util;
        var forEach = util.forEach;


        var defaultTagName = "span";
        var createElementNSSupported = util.isHostMethod(document, "createElementNS");

        function each(obj, func) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (func(i, obj[i]) === false) {
                        return false;
                    }
                }
            }
            return true;
        }

        function trim(str) {
            return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        }

        function classNameContainsClass(fullClassName, className) {
            return !!fullClassName && new RegExp("(?:^|\\s)" + className + "(?:\\s|$)").test(fullClassName);
        }

        // Inefficient, inelegant nonsense for IE's svg element, which has no classList and non-HTML className implementation
        function hasClass(el, className) {
            if (typeof el.classList == "object") {
                return el.classList.contains(className);
            } else {
                var classNameSupported = (typeof el.className == "string");
                var elClass = classNameSupported ? el.className : el.getAttribute("class");
                return classNameContainsClass(elClass, className);
            }
        }

        function addClass(el, className) {
            if (typeof el.classList == "object") {
                el.classList.add(className);
            } else {
                var classNameSupported = (typeof el.className == "string");
                var elClass = classNameSupported ? el.className : el.getAttribute("class");
                if (elClass) {
                    if (!classNameContainsClass(elClass, className)) {
                        elClass += " " + className;
                    }
                } else {
                    elClass = className;
                }
                if (classNameSupported) {
                    el.className = elClass;
                } else {
                    el.setAttribute("class", elClass);
                }
            }
        }

        var removeClass = (function() {
            function replacer(matched, whiteSpaceBefore, whiteSpaceAfter) {
                return (whiteSpaceBefore && whiteSpaceAfter) ? " " : "";
            }

            return function(el, className) {
                if (typeof el.classList == "object") {
                    el.classList.remove(className);
                } else {
                    var classNameSupported = (typeof el.className == "string");
                    var elClass = classNameSupported ? el.className : el.getAttribute("class");
                    elClass = elClass.replace(new RegExp("(^|\\s)" + className + "(\\s|$)"), replacer);
                    if (classNameSupported) {
                        el.className = elClass;
                    } else {
                        el.setAttribute("class", elClass);
                    }
                }
            };
        })();

        function getClass(el) {
            var classNameSupported = (typeof el.className == "string");
            return classNameSupported ? el.className : el.getAttribute("class");
        }

        function sortClassName(className) {
            return className && className.split(/\s+/).sort().join(" ");
        }

        function getSortedClassName(el) {
            return sortClassName( getClass(el) );
        }

        function haveSameClasses(el1, el2) {
            return getSortedClassName(el1) == getSortedClassName(el2);
        }

        function hasAllClasses(el, className) {
            var classes = className.split(/\s+/);
            for (var i = 0, len = classes.length; i < len; ++i) {
                if (!hasClass(el, trim(classes[i]))) {
                    return false;
                }
            }
            return true;
        }

        function canTextBeStyled(textNode) {
            var parent = textNode.parentNode;
            return (parent && parent.nodeType == 1 && !/^(textarea|style|script|select|iframe)$/i.test(parent.nodeName));
        }

        function movePosition(position, oldParent, oldIndex, newParent, newIndex) {
            var posNode = position.node, posOffset = position.offset;
            var newNode = posNode, newOffset = posOffset;

            if (posNode == newParent && posOffset > newIndex) {
                ++newOffset;
            }

            if (posNode == oldParent && (posOffset == oldIndex  || posOffset == oldIndex + 1)) {
                newNode = newParent;
                newOffset += newIndex - oldIndex;
            }

            if (posNode == oldParent && posOffset > oldIndex + 1) {
                --newOffset;
            }

            position.node = newNode;
            position.offset = newOffset;
        }

        function movePositionWhenRemovingNode(position, parentNode, index) {
            if (position.node == parentNode && position.offset > index) {
                --position.offset;
            }
        }

        function movePreservingPositions(node, newParent, newIndex, positionsToPreserve) {
            // For convenience, allow newIndex to be -1 to mean "insert at the end".
            if (newIndex == -1) {
                newIndex = newParent.childNodes.length;
            }

            var oldParent = node.parentNode;
            var oldIndex = dom.getNodeIndex(node);

            forEach(positionsToPreserve, function(position) {
                movePosition(position, oldParent, oldIndex, newParent, newIndex);
            });

            // Now actually move the node.
            if (newParent.childNodes.length == newIndex) {
                newParent.appendChild(node);
            } else {
                newParent.insertBefore(node, newParent.childNodes[newIndex]);
            }
        }

        function removePreservingPositions(node, positionsToPreserve) {

            var oldParent = node.parentNode;
            var oldIndex = dom.getNodeIndex(node);

            forEach(positionsToPreserve, function(position) {
                movePositionWhenRemovingNode(position, oldParent, oldIndex);
            });

            dom.removeNode(node);
        }

        function moveChildrenPreservingPositions(node, newParent, newIndex, removeNode, positionsToPreserve) {
            var child, children = [];
            while ( (child = node.firstChild) ) {
                movePreservingPositions(child, newParent, newIndex++, positionsToPreserve);
                children.push(child);
            }
            if (removeNode) {
                removePreservingPositions(node, positionsToPreserve);
            }
            return children;
        }

        function replaceWithOwnChildrenPreservingPositions(element, positionsToPreserve) {
            return moveChildrenPreservingPositions(element, element.parentNode, dom.getNodeIndex(element), true, positionsToPreserve);
        }

        function rangeSelectsAnyText(range, textNode) {
            var textNodeRange = range.cloneRange();
            textNodeRange.selectNodeContents(textNode);

            var intersectionRange = textNodeRange.intersection(range);
            var text = intersectionRange ? intersectionRange.toString() : "";

            return text != "";
        }

        function getEffectiveTextNodes(range) {
            var nodes = range.getNodes([3]);

            // Optimization as per issue 145

            // Remove non-intersecting text nodes from the start of the range
            var start = 0, node;
            while ( (node = nodes[start]) && !rangeSelectsAnyText(range, node) ) {
                ++start;
            }

            // Remove non-intersecting text nodes from the start of the range
            var end = nodes.length - 1;
            while ( (node = nodes[end]) && !rangeSelectsAnyText(range, node) ) {
                --end;
            }

            return nodes.slice(start, end + 1);
        }

        function elementsHaveSameNonClassAttributes(el1, el2) {
            if (el1.attributes.length != el2.attributes.length) return false;
            for (var i = 0, len = el1.attributes.length, attr1, attr2, name; i < len; ++i) {
                attr1 = el1.attributes[i];
                name = attr1.name;
                if (name != "class") {
                    attr2 = el2.attributes.getNamedItem(name);
                    if ( (attr1 === null) != (attr2 === null) ) return false;
                    if (attr1.specified != attr2.specified) return false;
                    if (attr1.specified && attr1.nodeValue !== attr2.nodeValue) return false;
                }
            }
            return true;
        }

        function elementHasNonClassAttributes(el, exceptions) {
            for (var i = 0, len = el.attributes.length, attrName; i < len; ++i) {
                attrName = el.attributes[i].name;
                if ( !(exceptions && contains(exceptions, attrName)) && el.attributes[i].specified && attrName != "class") {
                    return true;
                }
            }
            return false;
        }

        var getComputedStyleProperty = dom.getComputedStyleProperty;
        var isEditableElement = (function() {
            var testEl = document.createElement("div");
            return typeof testEl.isContentEditable == "boolean" ?
                function (node) {
                    return node && node.nodeType == 1 && node.isContentEditable;
                } :
                function (node) {
                    if (!node || node.nodeType != 1 || node.contentEditable == "false") {
                        return false;
                    }
                    return node.contentEditable == "true" || isEditableElement(node.parentNode);
                };
        })();

        function isEditingHost(node) {
            var parent;
            return node && node.nodeType == 1 &&
                (( (parent = node.parentNode) && parent.nodeType == 9 && parent.designMode == "on") ||
                (isEditableElement(node) && !isEditableElement(node.parentNode)));
        }

        function isEditable(node) {
            return (isEditableElement(node) || (node.nodeType != 1 && isEditableElement(node.parentNode))) && !isEditingHost(node);
        }

        var inlineDisplayRegex = /^inline(-block|-table)?$/i;

        function isNonInlineElement(node) {
            return node && node.nodeType == 1 && !inlineDisplayRegex.test(getComputedStyleProperty(node, "display"));
        }

        // White space characters as defined by HTML 4 (http://www.w3.org/TR/html401/struct/text.html)
        var htmlNonWhiteSpaceRegex = /[^\r\n\t\f \u200B]/;

        function isUnrenderedWhiteSpaceNode(node) {
            if (node.data.length == 0) {
                return true;
            }
            if (htmlNonWhiteSpaceRegex.test(node.data)) {
                return false;
            }
            var cssWhiteSpace = getComputedStyleProperty(node.parentNode, "whiteSpace");
            switch (cssWhiteSpace) {
                case "pre":
                case "pre-wrap":
                case "-moz-pre-wrap":
                    return false;
                case "pre-line":
                    if (/[\r\n]/.test(node.data)) {
                        return false;
                    }
            }

            // We now have a whitespace-only text node that may be rendered depending on its context. If it is adjacent to a
            // non-inline element, it will not be rendered. This seems to be a good enough definition.
            return isNonInlineElement(node.previousSibling) || isNonInlineElement(node.nextSibling);
        }

        function getRangeBoundaries(ranges) {
            var positions = [], i, range;
            for (i = 0; range = ranges[i++]; ) {
                positions.push(
                    new DomPosition(range.startContainer, range.startOffset),
                    new DomPosition(range.endContainer, range.endOffset)
                );
            }
            return positions;
        }

        function updateRangesFromBoundaries(ranges, positions) {
            for (var i = 0, range, start, end, len = ranges.length; i < len; ++i) {
                range = ranges[i];
                start = positions[i * 2];
                end = positions[i * 2 + 1];
                range.setStartAndEnd(start.node, start.offset, end.node, end.offset);
            }
        }

        function isSplitPoint(node, offset) {
            if (dom.isCharacterDataNode(node)) {
                if (offset == 0) {
                    return !!node.previousSibling;
                } else if (offset == node.length) {
                    return !!node.nextSibling;
                } else {
                    return true;
                }
            }

            return offset > 0 && offset < node.childNodes.length;
        }

        function splitNodeAt(node, descendantNode, descendantOffset, positionsToPreserve) {
            var newNode, parentNode;
            var splitAtStart = (descendantOffset == 0);

            if (dom.isAncestorOf(descendantNode, node)) {
                return node;
            }

            if (dom.isCharacterDataNode(descendantNode)) {
                var descendantIndex = dom.getNodeIndex(descendantNode);
                if (descendantOffset == 0) {
                    descendantOffset = descendantIndex;
                } else if (descendantOffset == descendantNode.length) {
                    descendantOffset = descendantIndex + 1;
                } else {
                    throw module.createError("splitNodeAt() should not be called with offset in the middle of a data node (" +
                        descendantOffset + " in " + descendantNode.data);
                }
                descendantNode = descendantNode.parentNode;
            }

            if (isSplitPoint(descendantNode, descendantOffset)) {
                // descendantNode is now guaranteed not to be a text or other character node
                newNode = descendantNode.cloneNode(false);
                parentNode = descendantNode.parentNode;
                if (newNode.id) {
                    newNode.removeAttribute("id");
                }
                var child, newChildIndex = 0;

                while ( (child = descendantNode.childNodes[descendantOffset]) ) {
                    movePreservingPositions(child, newNode, newChildIndex++, positionsToPreserve);
                }
                movePreservingPositions(newNode, parentNode, dom.getNodeIndex(descendantNode) + 1, positionsToPreserve);
                return (descendantNode == node) ? newNode : splitNodeAt(node, parentNode, dom.getNodeIndex(newNode), positionsToPreserve);
            } else if (node != descendantNode) {
                newNode = descendantNode.parentNode;

                // Work out a new split point in the parent node
                var newNodeIndex = dom.getNodeIndex(descendantNode);

                if (!splitAtStart) {
                    newNodeIndex++;
                }
                return splitNodeAt(node, newNode, newNodeIndex, positionsToPreserve);
            }
            return node;
        }

        function areElementsMergeable(el1, el2) {
            return el1.namespaceURI == el2.namespaceURI &&
                el1.tagName.toLowerCase() == el2.tagName.toLowerCase() &&
                haveSameClasses(el1, el2) &&
                elementsHaveSameNonClassAttributes(el1, el2) &&
                getComputedStyleProperty(el1, "display") == "inline" &&
                getComputedStyleProperty(el2, "display") == "inline";
        }

        function createAdjacentMergeableTextNodeGetter(forward) {
            var siblingPropName = forward ? "nextSibling" : "previousSibling";

            return function(textNode, checkParentElement) {
                var el = textNode.parentNode;
                var adjacentNode = textNode[siblingPropName];
                if (adjacentNode) {
                    // Can merge if the node's previous/next sibling is a text node
                    if (adjacentNode && adjacentNode.nodeType == 3) {
                        return adjacentNode;
                    }
                } else if (checkParentElement) {
                    // Compare text node parent element with its sibling
                    adjacentNode = el[siblingPropName];
                    if (adjacentNode && adjacentNode.nodeType == 1 && areElementsMergeable(el, adjacentNode)) {
                        var adjacentNodeChild = adjacentNode[forward ? "firstChild" : "lastChild"];
                        if (adjacentNodeChild && adjacentNodeChild.nodeType == 3) {
                            return adjacentNodeChild;
                        }
                    }
                }
                return null;
            };
        }

        var getPreviousMergeableTextNode = createAdjacentMergeableTextNodeGetter(false),
            getNextMergeableTextNode = createAdjacentMergeableTextNodeGetter(true);

    
        function Merge(firstNode) {
            this.isElementMerge = (firstNode.nodeType == 1);
            this.textNodes = [];
            var firstTextNode = this.isElementMerge ? firstNode.lastChild : firstNode;
            if (firstTextNode) {
                this.textNodes[0] = firstTextNode;
            }
        }

        Merge.prototype = {
            doMerge: function(positionsToPreserve) {
                var textNodes = this.textNodes;
                var firstTextNode = textNodes[0];
                if (textNodes.length > 1) {
                    var firstTextNodeIndex = dom.getNodeIndex(firstTextNode);
                    var textParts = [], combinedTextLength = 0, textNode, parent;
                    forEach(textNodes, function(textNode, i) {
                        parent = textNode.parentNode;
                        if (i > 0) {
                            parent.removeChild(textNode);
                            if (!parent.hasChildNodes()) {
                                dom.removeNode(parent);
                            }
                            if (positionsToPreserve) {
                                forEach(positionsToPreserve, function(position) {
                                    // Handle case where position is inside the text node being merged into a preceding node
                                    if (position.node == textNode) {
                                        position.node = firstTextNode;
                                        position.offset += combinedTextLength;
                                    }
                                    // Handle case where both text nodes precede the position within the same parent node
                                    if (position.node == parent && position.offset > firstTextNodeIndex) {
                                        --position.offset;
                                        if (position.offset == firstTextNodeIndex + 1 && i < len - 1) {
                                            position.node = firstTextNode;
                                            position.offset = combinedTextLength;
                                        }
                                    }
                                });
                            }
                        }
                        textParts[i] = textNode.data;
                        combinedTextLength += textNode.data.length;
                    });
                    firstTextNode.data = textParts.join("");
                }
                return firstTextNode.data;
            },

            getLength: function() {
                var i = this.textNodes.length, len = 0;
                while (i--) {
                    len += this.textNodes[i].length;
                }
                return len;
            },

            toString: function() {
                var textParts = [];
                forEach(this.textNodes, function(textNode, i) {
                    textParts[i] = "'" + textNode.data + "'";
                });
                return "[Merge(" + textParts.join(",") + ")]";
            }
        };

        var optionProperties = ["elementTagName", "ignoreWhiteSpace", "applyToEditableOnly", "useExistingElements",
            "removeEmptyElements", "onElementCreate"];

        // TODO: Populate this with every attribute name that corresponds to a property with a different name. Really??
        var attrNamesForProperties = {};

        function ClassApplier(className, options, tagNames) {
            var normalize, i, len, propName, applier = this;
            applier.cssClass = applier.className = className; // cssClass property is for backward compatibility

            var elementPropertiesFromOptions = null, elementAttributes = {};

            // Initialize from options object
            if (typeof options == "object" && options !== null) {
                if (typeof options.elementTagName !== "undefined") {
                    options.elementTagName = options.elementTagName.toLowerCase();
                }
                tagNames = options.tagNames;
                elementPropertiesFromOptions = options.elementProperties;
                elementAttributes = options.elementAttributes;

                for (i = 0; propName = optionProperties[i++]; ) {
                    if (options.hasOwnProperty(propName)) {
                        applier[propName] = options[propName];
                    }
                }
                normalize = options.normalize;
            } else {
                normalize = options;
            }

            // Backward compatibility: the second parameter can also be a Boolean indicating to normalize after unapplying
            applier.normalize = (typeof normalize == "undefined") ? true : normalize;

            // Initialize element properties and attribute exceptions
            applier.attrExceptions = [];
            var el = document.createElement(applier.elementTagName);
            applier.elementProperties = applier.copyPropertiesToElement(elementPropertiesFromOptions, el, true);
            each(elementAttributes, function(attrName, attrValue) {
                applier.attrExceptions.push(attrName);
                // Ensure each attribute value is a string
                elementAttributes[attrName] = "" + attrValue;
            });
            applier.elementAttributes = elementAttributes;

            applier.elementSortedClassName = applier.elementProperties.hasOwnProperty("className") ?
                sortClassName(applier.elementProperties.className + " " + className) : className;

            // Initialize tag names
            applier.applyToAnyTagName = false;
            var type = typeof tagNames;
            if (type == "string") {
                if (tagNames == "*") {
                    applier.applyToAnyTagName = true;
                } else {
                    applier.tagNames = trim(tagNames.toLowerCase()).split(/\s*,\s*/);
                }
            } else if (type == "object" && typeof tagNames.length == "number") {
                applier.tagNames = [];
                for (i = 0, len = tagNames.length; i < len; ++i) {
                    if (tagNames[i] == "*") {
                        applier.applyToAnyTagName = true;
                    } else {
                        applier.tagNames.push(tagNames[i].toLowerCase());
                    }
                }
            } else {
                applier.tagNames = [applier.elementTagName];
            }
        }

        ClassApplier.prototype = {
            elementTagName: defaultTagName,
            elementProperties: {},
            elementAttributes: {},
            ignoreWhiteSpace: true,
            applyToEditableOnly: false,
            useExistingElements: true,
            removeEmptyElements: true,
            onElementCreate: null,

            copyPropertiesToElement: function(props, el, createCopy) {
                var s, elStyle, elProps = {}, elPropsStyle, propValue, elPropValue, attrName;

                for (var p in props) {
                    if (props.hasOwnProperty(p)) {
                        propValue = props[p];
                        elPropValue = el[p];

                        // Special case for class. The copied properties object has the applier's class as well as its own
                        // to simplify checks when removing styling elements
                        if (p == "className") {
                            addClass(el, propValue);
                            addClass(el, this.className);
                            el[p] = sortClassName(el[p]);
                            if (createCopy) {
                                elProps[p] = propValue;
                            }
                        }

                        // Special case for style
                        else if (p == "style") {
                            elStyle = elPropValue;
                            if (createCopy) {
                                elProps[p] = elPropsStyle = {};
                            }
                            for (s in props[p]) {
                                if (props[p].hasOwnProperty(s)) {
                                    elStyle[s] = propValue[s];
                                    if (createCopy) {
                                        elPropsStyle[s] = elStyle[s];
                                    }
                                }
                            }
                            this.attrExceptions.push(p);
                        } else {
                            el[p] = propValue;
                            // Copy the property back from the dummy element so that later comparisons to check whether
                            // elements may be removed are checking against the right value. For example, the href property
                            // of an element returns a fully qualified URL even if it was previously assigned a relative
                            // URL.
                            if (createCopy) {
                                elProps[p] = el[p];

                                // Not all properties map to identically-named attributes
                                attrName = attrNamesForProperties.hasOwnProperty(p) ? attrNamesForProperties[p] : p;
                                this.attrExceptions.push(attrName);
                            }
                        }
                    }
                }

                return createCopy ? elProps : "";
            },

            copyAttributesToElement: function(attrs, el) {
                for (var attrName in attrs) {
                    if (attrs.hasOwnProperty(attrName) && !/^class(?:Name)?$/i.test(attrName)) {
                        el.setAttribute(attrName, attrs[attrName]);
                    }
                }
            },

            appliesToElement: function(el) {
                return contains(this.tagNames, el.tagName.toLowerCase());
            },

            getEmptyElements: function(range) {
                var applier = this;
                return range.getNodes([1], function(el) {
                    return applier.appliesToElement(el) && !el.hasChildNodes();
                });
            },

            hasClass: function(node) {
                return node.nodeType == 1 &&
                    (this.applyToAnyTagName || this.appliesToElement(node)) &&
                    hasClass(node, this.className);
            },

            getSelfOrAncestorWithClass: function(node) {
                while (node) {
                    if (this.hasClass(node)) {
                        return node;
                    }
                    node = node.parentNode;
                }
                return null;
            },

            isModifiable: function(node) {
                return !this.applyToEditableOnly || isEditable(node);
            },

            // White space adjacent to an unwrappable node can be ignored for wrapping
            isIgnorableWhiteSpaceNode: function(node) {
                return this.ignoreWhiteSpace && node && node.nodeType == 3 && isUnrenderedWhiteSpaceNode(node);
            },

            // Normalizes nodes after applying a class to a Range.
            postApply: function(textNodes, range, positionsToPreserve, isUndo) {
                var firstNode = textNodes[0], lastNode = textNodes[textNodes.length - 1];

                var merges = [], currentMerge;

                var rangeStartNode = firstNode, rangeEndNode = lastNode;
                var rangeStartOffset = 0, rangeEndOffset = lastNode.length;

                var textNode, precedingTextNode;

                // Check for every required merge and create a Merge object for each
                forEach(textNodes, function(textNode) {
                    precedingTextNode = getPreviousMergeableTextNode(textNode, !isUndo);
                    if (precedingTextNode) {
                        if (!currentMerge) {
                            currentMerge = new Merge(precedingTextNode);
                            merges.push(currentMerge);
                        }
                        currentMerge.textNodes.push(textNode);
                        if (textNode === firstNode) {
                            rangeStartNode = currentMerge.textNodes[0];
                            rangeStartOffset = rangeStartNode.length;
                        }
                        if (textNode === lastNode) {
                            rangeEndNode = currentMerge.textNodes[0];
                            rangeEndOffset = currentMerge.getLength();
                        }
                    } else {
                        currentMerge = null;
                    }
                });

                // Test whether the first node after the range needs merging
                var nextTextNode = getNextMergeableTextNode(lastNode, !isUndo);

                if (nextTextNode) {
                    if (!currentMerge) {
                        currentMerge = new Merge(lastNode);
                        merges.push(currentMerge);
                    }
                    currentMerge.textNodes.push(nextTextNode);
                }

                // Apply the merges
                if (merges.length) {
                    for (i = 0, len = merges.length; i < len; ++i) {
                        merges[i].doMerge(positionsToPreserve);
                    }

                    // Set the range boundaries
                    range.setStartAndEnd(rangeStartNode, rangeStartOffset, rangeEndNode, rangeEndOffset);
                }
            },

            createContainer: function(parentNode) {
                var doc = dom.getDocument(parentNode);
                var namespace;
                var el = createElementNSSupported && !dom.isHtmlNamespace(parentNode) && (namespace = parentNode.namespaceURI) ?
                    doc.createElementNS(parentNode.namespaceURI, this.elementTagName) :
                    doc.createElement(this.elementTagName);

                this.copyPropertiesToElement(this.elementProperties, el, false);
                this.copyAttributesToElement(this.elementAttributes, el);
                addClass(el, this.className);
                if (this.onElementCreate) {
                    this.onElementCreate(el, this);
                }
                return el;
            },

            elementHasProperties: function(el, props) {
                var applier = this;
                return each(props, function(p, propValue) {
                    if (p == "className") {
                        // For checking whether we should reuse an existing element, we just want to check that the element
                        // has all the classes specified in the className property. When deciding whether the element is
                        // removable when unapplying a class, there is separate special handling to check whether the
                        // element has extra classes so the same simple check will do.
                        return hasAllClasses(el, propValue);
                    } else if (typeof propValue == "object") {
                        if (!applier.elementHasProperties(el[p], propValue)) {
                            return false;
                        }
                    } else if (el[p] !== propValue) {
                        return false;
                    }
                });
            },

            elementHasAttributes: function(el, attrs) {
                return each(attrs, function(name, value) {
                    if (el.getAttribute(name) !== value) {
                        return false;
                    }
                });
            },

            applyToTextNode: function(textNode, positionsToPreserve) {

                // Check whether the text node can be styled. Text within a <style> or <script> element, for example,
                // should not be styled. See issue 283.
                if (canTextBeStyled(textNode)) {
                    var parent = textNode.parentNode;
                    if (parent.childNodes.length == 1 &&
                        this.useExistingElements &&
                        this.appliesToElement(parent) &&
                        this.elementHasProperties(parent, this.elementProperties) &&
                        this.elementHasAttributes(parent, this.elementAttributes)) {

                        addClass(parent, this.className);
                    } else {
                        var textNodeParent = textNode.parentNode;
                        var el = this.createContainer(textNodeParent);
                        textNodeParent.insertBefore(el, textNode);
                        el.appendChild(textNode);
                    }
                }

            },

            isRemovable: function(el) {
                return el.tagName.toLowerCase() == this.elementTagName &&
                    getSortedClassName(el) == this.elementSortedClassName &&
                    this.elementHasProperties(el, this.elementProperties) &&
                    !elementHasNonClassAttributes(el, this.attrExceptions) &&
                    this.elementHasAttributes(el, this.elementAttributes) &&
                    this.isModifiable(el);
            },

            isEmptyContainer: function(el) {
                var childNodeCount = el.childNodes.length;
                return el.nodeType == 1 &&
                    this.isRemovable(el) &&
                    (childNodeCount == 0 || (childNodeCount == 1 && this.isEmptyContainer(el.firstChild)));
            },

            removeEmptyContainers: function(range) {
                var applier = this;
                var nodesToRemove = range.getNodes([1], function(el) {
                    return applier.isEmptyContainer(el);
                });

                var rangesToPreserve = [range];
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve);

                forEach(nodesToRemove, function(node) {
                    removePreservingPositions(node, positionsToPreserve);
                });

                // Update the range from the preserved boundary positions
                updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
            },

            undoToTextNode: function(textNode, range, ancestorWithClass, positionsToPreserve) {
                if (!range.containsNode(ancestorWithClass)) {
                    // Split out the portion of the ancestor from which we can remove the class
                    //var parent = ancestorWithClass.parentNode, index = dom.getNodeIndex(ancestorWithClass);
                    var ancestorRange = range.cloneRange();
                    ancestorRange.selectNode(ancestorWithClass);
                    if (ancestorRange.isPointInRange(range.endContainer, range.endOffset)) {
                        splitNodeAt(ancestorWithClass, range.endContainer, range.endOffset, positionsToPreserve);
                        range.setEndAfter(ancestorWithClass);
                    }
                    if (ancestorRange.isPointInRange(range.startContainer, range.startOffset)) {
                        ancestorWithClass = splitNodeAt(ancestorWithClass, range.startContainer, range.startOffset, positionsToPreserve);
                    }
                }

                if (this.isRemovable(ancestorWithClass)) {
                    replaceWithOwnChildrenPreservingPositions(ancestorWithClass, positionsToPreserve);
                } else {
                    removeClass(ancestorWithClass, this.className);
                }
            },

            splitAncestorWithClass: function(container, offset, positionsToPreserve) {
                var ancestorWithClass = this.getSelfOrAncestorWithClass(container);
                if (ancestorWithClass) {
                    splitNodeAt(ancestorWithClass, container, offset, positionsToPreserve);
                }
            },

            undoToAncestor: function(ancestorWithClass, positionsToPreserve) {
                if (this.isRemovable(ancestorWithClass)) {
                    replaceWithOwnChildrenPreservingPositions(ancestorWithClass, positionsToPreserve);
                } else {
                    removeClass(ancestorWithClass, this.className);
                }
            },

            applyToRange: function(range, rangesToPreserve) {
                var applier = this;
                rangesToPreserve = rangesToPreserve || [];

                // Create an array of range boundaries to preserve
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve || []);

                range.splitBoundariesPreservingPositions(positionsToPreserve);

                // Tidy up the DOM by removing empty containers
                if (applier.removeEmptyElements) {
                    applier.removeEmptyContainers(range);
                }

                var textNodes = getEffectiveTextNodes(range);

                if (textNodes.length) {
                    forEach(textNodes, function(textNode) {
                        if (!applier.isIgnorableWhiteSpaceNode(textNode) && !applier.getSelfOrAncestorWithClass(textNode) &&
                                applier.isModifiable(textNode)) {
                            applier.applyToTextNode(textNode, positionsToPreserve);
                        }
                    });
                    var lastTextNode = textNodes[textNodes.length - 1];
                    range.setStartAndEnd(textNodes[0], 0, lastTextNode, lastTextNode.length);
                    if (applier.normalize) {
                        applier.postApply(textNodes, range, positionsToPreserve, false);
                    }

                    // Update the ranges from the preserved boundary positions
                    updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
                }

                // Apply classes to any appropriate empty elements
                var emptyElements = applier.getEmptyElements(range);

                forEach(emptyElements, function(el) {
                    addClass(el, applier.className);
                });
            },

            applyToRanges: function(ranges) {

                var i = ranges.length;
                while (i--) {
                    this.applyToRange(ranges[i], ranges);
                }


                return ranges;
            },

            applyToSelection: function(win) {
                var sel = api.getSelection(win);
                sel.setRanges( this.applyToRanges(sel.getAllRanges()) );
            },

            undoToRange: function(range, rangesToPreserve) {
                var applier = this;
                // Create an array of range boundaries to preserve
                rangesToPreserve = rangesToPreserve || [];
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve);


                range.splitBoundariesPreservingPositions(positionsToPreserve);

                // Tidy up the DOM by removing empty containers
                if (applier.removeEmptyElements) {
                    applier.removeEmptyContainers(range, positionsToPreserve);
                }

                var textNodes = getEffectiveTextNodes(range);
                var textNode, ancestorWithClass;
                var lastTextNode = textNodes[textNodes.length - 1];

                if (textNodes.length) {
                    applier.splitAncestorWithClass(range.endContainer, range.endOffset, positionsToPreserve);
                    applier.splitAncestorWithClass(range.startContainer, range.startOffset, positionsToPreserve);
                    for (var i = 0, len = textNodes.length; i < len; ++i) {
                        textNode = textNodes[i];
                        ancestorWithClass = applier.getSelfOrAncestorWithClass(textNode);
                        if (ancestorWithClass && applier.isModifiable(textNode)) {
                            applier.undoToAncestor(ancestorWithClass, positionsToPreserve);
                        }
                    }
                    // Ensure the range is still valid
                    range.setStartAndEnd(textNodes[0], 0, lastTextNode, lastTextNode.length);


                    if (applier.normalize) {
                        applier.postApply(textNodes, range, positionsToPreserve, true);
                    }

                    // Update the ranges from the preserved boundary positions
                    updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
                }

                // Remove class from any appropriate empty elements
                var emptyElements = applier.getEmptyElements(range);

                forEach(emptyElements, function(el) {
                    removeClass(el, applier.className);
                });
            },

            undoToRanges: function(ranges) {
                // Get ranges returned in document order
                var i = ranges.length;

                while (i--) {
                    this.undoToRange(ranges[i], ranges);
                }

                return ranges;
            },

            undoToSelection: function(win) {
                var sel = api.getSelection(win);
                var ranges = api.getSelection(win).getAllRanges();
                this.undoToRanges(ranges);
                sel.setRanges(ranges);
            },

            isAppliedToRange: function(range) {
                if (range.collapsed || range.toString() == "") {
                    return !!this.getSelfOrAncestorWithClass(range.commonAncestorContainer);
                } else {
                    var textNodes = range.getNodes( [3] );
                    if (textNodes.length)
                    for (var i = 0, textNode; textNode = textNodes[i++]; ) {
                        if (!this.isIgnorableWhiteSpaceNode(textNode) && rangeSelectsAnyText(range, textNode) &&
                                this.isModifiable(textNode) && !this.getSelfOrAncestorWithClass(textNode)) {
                            return false;
                        }
                    }
                    return true;
                }
            },

            isAppliedToRanges: function(ranges) {
                var i = ranges.length;
                if (i == 0) {
                    return false;
                }
                while (i--) {
                    if (!this.isAppliedToRange(ranges[i])) {
                        return false;
                    }
                }
                return true;
            },

            isAppliedToSelection: function(win) {
                var sel = api.getSelection(win);
                return this.isAppliedToRanges(sel.getAllRanges());
            },

            toggleRange: function(range) {
                if (this.isAppliedToRange(range)) {
                    this.undoToRange(range);
                } else {
                    this.applyToRange(range);
                }
            },

            toggleSelection: function(win) {
                if (this.isAppliedToSelection(win)) {
                    this.undoToSelection(win);
                } else {
                    this.applyToSelection(win);
                }
            },

            getElementsWithClassIntersectingRange: function(range) {
                var elements = [];
                var applier = this;
                range.getNodes([3], function(textNode) {
                    var el = applier.getSelfOrAncestorWithClass(textNode);
                    if (el && !contains(elements, el)) {
                        elements.push(el);
                    }
                });
                return elements;
            },

            detach: function() {}
        };

        function createClassApplier(className, options, tagNames) {
            return new ClassApplier(className, options, tagNames);
        }

        ClassApplier.util = {
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            getClass: getClass,
            hasSameClasses: haveSameClasses,
            hasAllClasses: hasAllClasses,
            replaceWithOwnChildren: replaceWithOwnChildrenPreservingPositions,
            elementsHaveSameNonClassAttributes: elementsHaveSameNonClassAttributes,
            elementHasNonClassAttributes: elementHasNonClassAttributes,
            splitNodeAt: splitNodeAt,
            isEditableElement: isEditableElement,
            isEditingHost: isEditingHost,
            isEditable: isEditable
        };

        api.CssClassApplier = api.ClassApplier = ClassApplier;
        api.createClassApplier = createClassApplier;
        util.createAliasForDeprecatedMethod(api, "createCssClassApplier", "createClassApplier", module);
    });
    
    return rangy;
}, this);


/***/ }),

/***/ "./webpack-app/vendors/rangy/rangy-core.js":
/*!*************************************************!*\
  !*** ./webpack-app/vendors/rangy/rangy-core.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.1-dev
 * Build date: 20 May 2015
 */

(function(factory, root) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(function() {

    var OBJECT = "object", FUNCTION = "function", UNDEFINED = "undefined";

    // Minimal set of properties required for DOM Level 2 Range compliance. Comparison constants such as START_TO_START
    // are omitted because ranges in KHTML do not have them but otherwise work perfectly well. See issue 113.
    var domRangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
        "commonAncestorContainer"];

    // Minimal set of methods required for DOM Level 2 Range compliance
    var domRangeMethods = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore",
        "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents",
        "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"];

    var textRangeProperties = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"];

    // Subset of TextRange's full set of methods that we're interested in
    var textRangeMethods = ["collapse", "compareEndPoints", "duplicate", "moveToElementText", "parentElement", "select",
        "setEndPoint", "getBoundingClientRect"];

    /*----------------------------------------------------------------------------------------------------------------*/

    // Trio of functions taken from Peter Michaux's article:
    // http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
    function isHostMethod(o, p) {
        var t = typeof o[p];
        return t == FUNCTION || (!!(t == OBJECT && o[p])) || t == "unknown";
    }

    function isHostObject(o, p) {
        return !!(typeof o[p] == OBJECT && o[p]);
    }

    function isHostProperty(o, p) {
        return typeof o[p] != UNDEFINED;
    }

    // Creates a convenience function to save verbose repeated calls to tests functions
    function createMultiplePropertyTest(testFunc) {
        return function(o, props) {
            var i = props.length;
            while (i--) {
                if (!testFunc(o, props[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    // Next trio of functions are a convenience to save verbose repeated calls to previous two functions
    var areHostMethods = createMultiplePropertyTest(isHostMethod);
    var areHostObjects = createMultiplePropertyTest(isHostObject);
    var areHostProperties = createMultiplePropertyTest(isHostProperty);

    function isTextRange(range) {
        return range && areHostMethods(range, textRangeMethods) && areHostProperties(range, textRangeProperties);
    }

    function getBody(doc) {
        return isHostObject(doc, "body") ? doc.body : doc.getElementsByTagName("body")[0];
    }

    var forEach = [].forEach ?
        function(arr, func) {
            arr.forEach(func);
        } :
        function(arr, func) {
            for (var i = 0, len = arr.length; i < len; ++i) {
                func(arr[i], i);
            }
        };

    var modules = {};

    var isBrowser = (typeof window != UNDEFINED && typeof document != UNDEFINED);

    var util = {
        isHostMethod: isHostMethod,
        isHostObject: isHostObject,
        isHostProperty: isHostProperty,
        areHostMethods: areHostMethods,
        areHostObjects: areHostObjects,
        areHostProperties: areHostProperties,
        isTextRange: isTextRange,
        getBody: getBody,
        forEach: forEach
    };

    var api = {
        version: "1.3.1-dev",
        initialized: false,
        isBrowser: isBrowser,
        supported: true,
        util: util,
        features: {},
        modules: modules,
        config: {
            alertOnFail: false,
            alertOnWarn: false,
            preferTextRange: false,
            autoInitialize: (typeof rangyAutoInitialize == UNDEFINED) ? true : rangyAutoInitialize
        }
    };

    function consoleLog(msg) {
        if (typeof console != UNDEFINED && isHostMethod(console, "log")) {
            console.log(msg);
        }
    }

    function alertOrLog(msg, shouldAlert) {
        if (isBrowser && shouldAlert) {
            alert(msg);
        } else  {
            consoleLog(msg);
        }
    }

    function fail(reason) {
        api.initialized = true;
        api.supported = false;
        alertOrLog("Rangy is not supported in this environment. Reason: " + reason, api.config.alertOnFail);
    }

    api.fail = fail;

    function warn(msg) {
        alertOrLog("Rangy warning: " + msg, api.config.alertOnWarn);
    }

    api.warn = warn;

    // Add utility extend() method
    var extend;
    if ({}.hasOwnProperty) {
        util.extend = extend = function(obj, props, deep) {
            var o, p;
            for (var i in props) {
                if (props.hasOwnProperty(i)) {
                    o = obj[i];
                    p = props[i];
                    if (deep && o !== null && typeof o == "object" && p !== null && typeof p == "object") {
                        extend(o, p, true);
                    }
                    obj[i] = p;
                }
            }
            // Special case for toString, which does not show up in for...in loops in IE <= 8
            if (props.hasOwnProperty("toString")) {
                obj.toString = props.toString;
            }
            return obj;
        };

        util.createOptions = function(optionsParam, defaults) {
            var options = {};
            extend(options, defaults);
            if (optionsParam) {
                extend(options, optionsParam);
            }
            return options;
        };
    } else {
        fail("hasOwnProperty not supported");
    }

    // Test whether we're in a browser and bail out if not
    if (!isBrowser) {
        fail("Rangy can only run in a browser");
    }

    // Test whether Array.prototype.slice can be relied on for NodeLists and use an alternative toArray() if not
    (function() {
        var toArray;

        if (isBrowser) {
            var el = document.createElement("div");
            el.appendChild(document.createElement("span"));
            var slice = [].slice;
            try {
                if (slice.call(el.childNodes, 0)[0].nodeType == 1) {
                    toArray = function(arrayLike) {
                        return slice.call(arrayLike, 0);
                    };
                }
            } catch (e) {}
        }

        if (!toArray) {
            toArray = function(arrayLike) {
                var arr = [];
                for (var i = 0, len = arrayLike.length; i < len; ++i) {
                    arr[i] = arrayLike[i];
                }
                return arr;
            };
        }

        util.toArray = toArray;
    })();

    // Very simple event handler wrapper function that doesn't attempt to solve issues such as "this" handling or
    // normalization of event properties
    var addListener;
    if (isBrowser) {
        if (isHostMethod(document, "addEventListener")) {
            addListener = function(obj, eventType, listener) {
                obj.addEventListener(eventType, listener, false);
            };
        } else if (isHostMethod(document, "attachEvent")) {
            addListener = function(obj, eventType, listener) {
                obj.attachEvent("on" + eventType, listener);
            };
        } else {
            fail("Document does not have required addEventListener or attachEvent method");
        }

        util.addListener = addListener;
    }

    var initListeners = [];

    function getErrorDesc(ex) {
        return ex.message || ex.description || String(ex);
    }

    // Initialization
    function init() {
        if (!isBrowser || api.initialized) {
            return;
        }
        var testRange;
        var implementsDomRange = false, implementsTextRange = false;

        // First, perform basic feature tests

        if (isHostMethod(document, "createRange")) {
            testRange = document.createRange();
            if (areHostMethods(testRange, domRangeMethods) && areHostProperties(testRange, domRangeProperties)) {
                implementsDomRange = true;
            }
        }

        var body = getBody(document);
        if (!body || body.nodeName.toLowerCase() != "body") {
            fail("No body element found");
            return;
        }

        if (body && isHostMethod(body, "createTextRange")) {
            testRange = body.createTextRange();
            if (isTextRange(testRange)) {
                implementsTextRange = true;
            }
        }

        if (!implementsDomRange && !implementsTextRange) {
            fail("Neither Range nor TextRange are available");
            return;
        }

        api.initialized = true;
        api.features = {
            implementsDomRange: implementsDomRange,
            implementsTextRange: implementsTextRange
        };

        // Initialize modules
        var module, errorMessage;
        for (var moduleName in modules) {
            if ( (module = modules[moduleName]) instanceof Module ) {
                module.init(module, api);
            }
        }

        // Call init listeners
        for (var i = 0, len = initListeners.length; i < len; ++i) {
            try {
                initListeners[i](api);
            } catch (ex) {
                errorMessage = "Rangy init listener threw an exception. Continuing. Detail: " + getErrorDesc(ex);
                consoleLog(errorMessage);
            }
        }
    }

    function deprecationNotice(deprecated, replacement, module) {
        if (module) {
            deprecated += " in module " + module.name;
        }
        api.warn("DEPRECATED: " + deprecated + " is deprecated. Please use " +
        replacement + " instead.");
    }

    function createAliasForDeprecatedMethod(owner, deprecated, replacement, module) {
        owner[deprecated] = function() {
            deprecationNotice(deprecated, replacement, module);
            return owner[replacement].apply(owner, util.toArray(arguments));
        };
    }

    util.deprecationNotice = deprecationNotice;
    util.createAliasForDeprecatedMethod = createAliasForDeprecatedMethod;

    // Allow external scripts to initialize this library in case it's loaded after the document has loaded
    api.init = init;

    // Execute listener immediately if already initialized
    api.addInitListener = function(listener) {
        if (api.initialized) {
            listener(api);
        } else {
            initListeners.push(listener);
        }
    };

    var shimListeners = [];

    api.addShimListener = function(listener) {
        shimListeners.push(listener);
    };

    function shim(win) {
        win = win || window;
        init();

        // Notify listeners
        for (var i = 0, len = shimListeners.length; i < len; ++i) {
            shimListeners[i](win);
        }
    }

    if (isBrowser) {
        api.shim = api.createMissingNativeApi = shim;
        createAliasForDeprecatedMethod(api, "createMissingNativeApi", "shim");
    }

    function Module(name, dependencies, initializer) {
        this.name = name;
        this.dependencies = dependencies;
        this.initialized = false;
        this.supported = false;
        this.initializer = initializer;
    }

    Module.prototype = {
        init: function() {
            var requiredModuleNames = this.dependencies || [];
            for (var i = 0, len = requiredModuleNames.length, requiredModule, moduleName; i < len; ++i) {
                moduleName = requiredModuleNames[i];

                requiredModule = modules[moduleName];
                if (!requiredModule || !(requiredModule instanceof Module)) {
                    throw new Error("required module '" + moduleName + "' not found");
                }

                requiredModule.init();

                if (!requiredModule.supported) {
                    throw new Error("required module '" + moduleName + "' not supported");
                }
            }

            // Now run initializer
            this.initializer(this);
        },

        fail: function(reason) {
            this.initialized = true;
            this.supported = false;
            throw new Error(reason);
        },

        warn: function(msg) {
            api.warn("Module " + this.name + ": " + msg);
        },

        deprecationNotice: function(deprecated, replacement) {
            api.warn("DEPRECATED: " + deprecated + " in module " + this.name + " is deprecated. Please use " +
                replacement + " instead");
        },

        createError: function(msg) {
            return new Error("Error in Rangy " + this.name + " module: " + msg);
        }
    };

    function createModule(name, dependencies, initFunc) {
        var newModule = new Module(name, dependencies, function(module) {
            if (!module.initialized) {
                module.initialized = true;
                try {
                    initFunc(api, module);
                    module.supported = true;
                } catch (ex) {
                    var errorMessage = "Module '" + name + "' failed to load: " + getErrorDesc(ex);
                    consoleLog(errorMessage);
                    if (ex.stack) {
                        consoleLog(ex.stack);
                    }
                }
            }
        });
        modules[name] = newModule;
        return newModule;
    }

    api.createModule = function(name) {
        // Allow 2 or 3 arguments (second argument is an optional array of dependencies)
        var initFunc, dependencies;
        if (arguments.length == 2) {
            initFunc = arguments[1];
            dependencies = [];
        } else {
            initFunc = arguments[2];
            dependencies = arguments[1];
        }

        var module = createModule(name, dependencies, initFunc);

        // Initialize the module immediately if the core is already initialized
        if (api.initialized && api.supported) {
            module.init();
        }
    };

    api.createCoreModule = function(name, dependencies, initFunc) {
        createModule(name, dependencies, initFunc);
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Ensure rangy.rangePrototype and rangy.selectionPrototype are available immediately

    function RangePrototype() {}
    api.RangePrototype = RangePrototype;
    api.rangePrototype = new RangePrototype();

    function SelectionPrototype() {}
    api.selectionPrototype = new SelectionPrototype();

    /*----------------------------------------------------------------------------------------------------------------*/

    // DOM utility methods used by Rangy
    api.createCoreModule("DomUtil", [], function(api, module) {
        var UNDEF = "undefined";
        var util = api.util;
        var getBody = util.getBody;

        // Perform feature tests
        if (!util.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"])) {
            module.fail("document missing a Node creation method");
        }

        if (!util.isHostMethod(document, "getElementsByTagName")) {
            module.fail("document missing getElementsByTagName method");
        }

        var el = document.createElement("div");
        if (!util.areHostMethods(el, ["insertBefore", "appendChild", "cloneNode"] ||
                false)) {
            module.fail("Incomplete Element implementation");
        }

        // innerHTML is required for Range's createContextualFragment method
        if (!util.isHostProperty(el, "innerHTML")) {
            module.fail("Element is missing innerHTML property");
        }

        var textNode = document.createTextNode("test");
        if (!util.areHostMethods(textNode, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] ||
                false ||
                false)) {
            module.fail("Incomplete Text Node implementation");
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Removed use of indexOf because of a bizarre bug in Opera that is thrown in one of the Acid3 tests. I haven't been
        // able to replicate it outside of the test. The bug is that indexOf returns -1 when called on an Array that
        // contains just the document as a single element and the value searched for is the document.
        var arrayContains = /*Array.prototype.indexOf ?
            function(arr, val) {
                return arr.indexOf(val) > -1;
            }:*/

            function(arr, val) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val) {
                        return true;
                    }
                }
                return false;
            };

        // Opera 11 puts HTML elements in the null namespace, it seems, and IE 7 has undefined namespaceURI
        function isHtmlNamespace(node) {
            var ns;
            return typeof node.namespaceURI == UNDEF || ((ns = node.namespaceURI) === null || ns == "http://www.w3.org/1999/xhtml");
        }

        function parentElement(node) {
            var parent = node.parentNode;
            return (parent.nodeType == 1) ? parent : null;
        }

        function getNodeIndex(node) {
            var i = 0;
            while( (node = node.previousSibling) ) {
                ++i;
            }
            return i;
        }

        function getNodeLength(node) {
            switch (node.nodeType) {
                case 7:
                case 10:
                    return 0;
                case 3:
                case 8:
                    return node.length;
                default:
                    return node.childNodes.length;
            }
        }

        function getCommonAncestor(node1, node2) {
            var ancestors = [], n;
            for (n = node1; n; n = n.parentNode) {
                ancestors.push(n);
            }

            for (n = node2; n; n = n.parentNode) {
                if (arrayContains(ancestors, n)) {
                    return n;
                }
            }

            return null;
        }

        function isAncestorOf(ancestor, descendant, selfIsAncestor) {
            var n = selfIsAncestor ? descendant : descendant.parentNode;
            while (n) {
                if (n === ancestor) {
                    return true;
                } else {
                    n = n.parentNode;
                }
            }
            return false;
        }

        function isOrIsAncestorOf(ancestor, descendant) {
            return isAncestorOf(ancestor, descendant, true);
        }

        function getClosestAncestorIn(node, ancestor, selfIsAncestor) {
            var p, n = selfIsAncestor ? node : node.parentNode;
            while (n) {
                p = n.parentNode;
                if (p === ancestor) {
                    return n;
                }
                n = p;
            }
            return null;
        }

        function isCharacterDataNode(node) {
            var t = node.nodeType;
            return t == 3 || t == 4 || t == 8 ; // Text, CDataSection or Comment
        }

        function isTextOrCommentNode(node) {
            if (!node) {
                return false;
            }
            var t = node.nodeType;
            return t == 3 || t == 8 ; // Text or Comment
        }

        function insertAfter(node, precedingNode) {
            var nextNode = precedingNode.nextSibling, parent = precedingNode.parentNode;
            if (nextNode) {
                parent.insertBefore(node, nextNode);
            } else {
                parent.appendChild(node);
            }
            return node;
        }

        // Note that we cannot use splitText() because it is bugridden in IE 9.
        function splitDataNode(node, index, positionsToPreserve) {
            var newNode = node.cloneNode(false);
            newNode.deleteData(0, index);
            node.deleteData(index, node.length - index);
            insertAfter(newNode, node);

            // Preserve positions
            if (positionsToPreserve) {
                for (var i = 0, position; position = positionsToPreserve[i++]; ) {
                    // Handle case where position was inside the portion of node after the split point
                    if (position.node == node && position.offset > index) {
                        position.node = newNode;
                        position.offset -= index;
                    }
                    // Handle the case where the position is a node offset within node's parent
                    else if (position.node == node.parentNode && position.offset > getNodeIndex(node)) {
                        ++position.offset;
                    }
                }
            }
            return newNode;
        }

        function getDocument(node) {
            if (node.nodeType == 9) {
                return node;
            } else if (typeof node.ownerDocument != UNDEF) {
                return node.ownerDocument;
            } else if (typeof node.document != UNDEF) {
                return node.document;
            } else if (node.parentNode) {
                return getDocument(node.parentNode);
            } else {
                throw module.createError("getDocument: no document found for node");
            }
        }

        function getWindow(node) {
            var doc = getDocument(node);
            if (typeof doc.defaultView != UNDEF) {
                return doc.defaultView;
            } else if (typeof doc.parentWindow != UNDEF) {
                return doc.parentWindow;
            } else {
                throw module.createError("Cannot get a window object for node");
            }
        }

        function getIframeDocument(iframeEl) {
            if (typeof iframeEl.contentDocument != UNDEF) {
                return iframeEl.contentDocument;
            } else if (typeof iframeEl.contentWindow != UNDEF) {
                return iframeEl.contentWindow.document;
            } else {
                throw module.createError("getIframeDocument: No Document object found for iframe element");
            }
        }

        function getIframeWindow(iframeEl) {
            if (typeof iframeEl.contentWindow != UNDEF) {
                return iframeEl.contentWindow;
            } else if (typeof iframeEl.contentDocument != UNDEF) {
                return iframeEl.contentDocument.defaultView;
            } else {
                throw module.createError("getIframeWindow: No Window object found for iframe element");
            }
        }

        // This looks bad. Is it worth it?
        function isWindow(obj) {
            return obj && util.isHostMethod(obj, "setTimeout") && util.isHostObject(obj, "document");
        }

        function getContentDocument(obj, module, methodName) {
            var doc;

            if (!obj) {
                doc = document;
            }

            // Test if a DOM node has been passed and obtain a document object for it if so
            else if (util.isHostProperty(obj, "nodeType")) {
                doc = (obj.nodeType == 1 && obj.tagName.toLowerCase() == "iframe") ?
                    getIframeDocument(obj) : getDocument(obj);
            }

            // Test if the doc parameter appears to be a Window object
            else if (isWindow(obj)) {
                doc = obj.document;
            }

            if (!doc) {
                throw module.createError(methodName + "(): Parameter must be a Window object or DOM node");
            }

            return doc;
        }

        function getRootContainer(node) {
            var parent;
            while ( (parent = node.parentNode) ) {
                node = parent;
            }
            return node;
        }

        function comparePoints(nodeA, offsetA, nodeB, offsetB) {
            // See http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Comparing
            var nodeC, root, childA, childB, n;
            if (nodeA == nodeB) {
                // Case 1: nodes are the same
                return offsetA === offsetB ? 0 : (offsetA < offsetB) ? -1 : 1;
            } else if ( (nodeC = getClosestAncestorIn(nodeB, nodeA, true)) ) {
                // Case 2: node C (container B or an ancestor) is a child node of A
                return offsetA <= getNodeIndex(nodeC) ? -1 : 1;
            } else if ( (nodeC = getClosestAncestorIn(nodeA, nodeB, true)) ) {
                // Case 3: node C (container A or an ancestor) is a child node of B
                return getNodeIndex(nodeC) < offsetB  ? -1 : 1;
            } else {
                root = getCommonAncestor(nodeA, nodeB);
                if (!root) {
                    throw new Error("comparePoints error: nodes have no common ancestor");
                }

                // Case 4: containers are siblings or descendants of siblings
                childA = (nodeA === root) ? root : getClosestAncestorIn(nodeA, root, true);
                childB = (nodeB === root) ? root : getClosestAncestorIn(nodeB, root, true);

                if (childA === childB) {
                    // This shouldn't be possible
                    throw module.createError("comparePoints got to case 4 and childA and childB are the same!");
                } else {
                    n = root.firstChild;
                    while (n) {
                        if (n === childA) {
                            return -1;
                        } else if (n === childB) {
                            return 1;
                        }
                        n = n.nextSibling;
                    }
                }
            }
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Test for IE's crash (IE 6/7) or exception (IE >= 8) when a reference to garbage-collected text node is queried
        var crashyTextNodes = false;

        function isBrokenNode(node) {
            var n;
            try {
                n = node.parentNode;
                return false;
            } catch (e) {
                return true;
            }
        }

        (function() {
            var el = document.createElement("b");
            el.innerHTML = "1";
            var textNode = el.firstChild;
            el.innerHTML = "<br />";
            crashyTextNodes = isBrokenNode(textNode);

            api.features.crashyTextNodes = crashyTextNodes;
        })();

        /*----------------------------------------------------------------------------------------------------------------*/

        function inspectNode(node) {
            if (!node) {
                return "[No node]";
            }
            if (crashyTextNodes && isBrokenNode(node)) {
                return "[Broken node]";
            }
            if (isCharacterDataNode(node)) {
                return '"' + node.data + '"';
            }
            if (node.nodeType == 1) {
                var idAttr = node.id ? ' id="' + node.id + '"' : "";
                return "<" + node.nodeName + idAttr + ">[index:" + getNodeIndex(node) + ",length:" + node.childNodes.length + "][" + (node.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]";
            }
            return node.nodeName;
        }

        function fragmentFromNodeChildren(node) {
            var fragment = getDocument(node).createDocumentFragment(), child;
            while ( (child = node.firstChild) ) {
                fragment.appendChild(child);
            }
            return fragment;
        }

        var getComputedStyleProperty;
        if (typeof window.getComputedStyle != UNDEF) {
            getComputedStyleProperty = function(el, propName) {
                return getWindow(el).getComputedStyle(el, null)[propName];
            };
        } else if (typeof document.documentElement.currentStyle != UNDEF) {
            getComputedStyleProperty = function(el, propName) {
                return el.currentStyle ? el.currentStyle[propName] : "";
            };
        } else {
            module.fail("No means of obtaining computed style properties found");
        }

        function createTestElement(doc, html, contentEditable) {
            var body = getBody(doc);
            var el = doc.createElement("div");
            el.contentEditable = "" + !!contentEditable;
            if (html) {
                el.innerHTML = html;
            }

            // Insert the test element at the start of the body to prevent scrolling to the bottom in iOS (issue #292)
            var bodyFirstChild = body.firstChild;
            if (bodyFirstChild) {
                body.insertBefore(el, bodyFirstChild);
            } else {
                body.appendChild(el);
            }

            return el;
        }

        function removeNode(node) {
            return node.parentNode.removeChild(node);
        }

        function NodeIterator(root) {
            this.root = root;
            this._next = root;
        }

        NodeIterator.prototype = {
            _current: null,

            hasNext: function() {
                return !!this._next;
            },

            next: function() {
                var n = this._current = this._next;
                var child, next;
                if (this._current) {
                    child = n.firstChild;
                    if (child) {
                        this._next = child;
                    } else {
                        next = null;
                        while ((n !== this.root) && !(next = n.nextSibling)) {
                            n = n.parentNode;
                        }
                        this._next = next;
                    }
                }
                return this._current;
            },

            detach: function() {
                this._current = this._next = this.root = null;
            }
        };

        function createIterator(root) {
            return new NodeIterator(root);
        }

        function DomPosition(node, offset) {
            this.node = node;
            this.offset = offset;
        }

        DomPosition.prototype = {
            equals: function(pos) {
                return !!pos && this.node === pos.node && this.offset == pos.offset;
            },

            inspect: function() {
                return "[DomPosition(" + inspectNode(this.node) + ":" + this.offset + ")]";
            },

            toString: function() {
                return this.inspect();
            }
        };

        function DOMException(codeName) {
            this.code = this[codeName];
            this.codeName = codeName;
            this.message = "DOMException: " + this.codeName;
        }

        DOMException.prototype = {
            INDEX_SIZE_ERR: 1,
            HIERARCHY_REQUEST_ERR: 3,
            WRONG_DOCUMENT_ERR: 4,
            NO_MODIFICATION_ALLOWED_ERR: 7,
            NOT_FOUND_ERR: 8,
            NOT_SUPPORTED_ERR: 9,
            INVALID_STATE_ERR: 11,
            INVALID_NODE_TYPE_ERR: 24
        };

        DOMException.prototype.toString = function() {
            return this.message;
        };

        api.dom = {
            arrayContains: arrayContains,
            isHtmlNamespace: isHtmlNamespace,
            parentElement: parentElement,
            getNodeIndex: getNodeIndex,
            getNodeLength: getNodeLength,
            getCommonAncestor: getCommonAncestor,
            isAncestorOf: isAncestorOf,
            isOrIsAncestorOf: isOrIsAncestorOf,
            getClosestAncestorIn: getClosestAncestorIn,
            isCharacterDataNode: isCharacterDataNode,
            isTextOrCommentNode: isTextOrCommentNode,
            insertAfter: insertAfter,
            splitDataNode: splitDataNode,
            getDocument: getDocument,
            getWindow: getWindow,
            getIframeWindow: getIframeWindow,
            getIframeDocument: getIframeDocument,
            getBody: getBody,
            isWindow: isWindow,
            getContentDocument: getContentDocument,
            getRootContainer: getRootContainer,
            comparePoints: comparePoints,
            isBrokenNode: isBrokenNode,
            inspectNode: inspectNode,
            getComputedStyleProperty: getComputedStyleProperty,
            createTestElement: createTestElement,
            removeNode: removeNode,
            fragmentFromNodeChildren: fragmentFromNodeChildren,
            createIterator: createIterator,
            DomPosition: DomPosition
        };

        api.DOMException = DOMException;
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Pure JavaScript implementation of DOM Range
    api.createCoreModule("DomRange", ["DomUtil"], function(api, module) {
        var dom = api.dom;
        var util = api.util;
        var DomPosition = dom.DomPosition;
        var DOMException = api.DOMException;

        var isCharacterDataNode = dom.isCharacterDataNode;
        var getNodeIndex = dom.getNodeIndex;
        var isOrIsAncestorOf = dom.isOrIsAncestorOf;
        var getDocument = dom.getDocument;
        var comparePoints = dom.comparePoints;
        var splitDataNode = dom.splitDataNode;
        var getClosestAncestorIn = dom.getClosestAncestorIn;
        var getNodeLength = dom.getNodeLength;
        var arrayContains = dom.arrayContains;
        var getRootContainer = dom.getRootContainer;
        var crashyTextNodes = api.features.crashyTextNodes;

        var removeNode = dom.removeNode;

        /*----------------------------------------------------------------------------------------------------------------*/

        // Utility functions

        function isNonTextPartiallySelected(node, range) {
            return (node.nodeType != 3) &&
                   (isOrIsAncestorOf(node, range.startContainer) || isOrIsAncestorOf(node, range.endContainer));
        }

        function getRangeDocument(range) {
            return range.document || getDocument(range.startContainer);
        }

        function getRangeRoot(range) {
            return getRootContainer(range.startContainer);
        }

        function getBoundaryBeforeNode(node) {
            return new DomPosition(node.parentNode, getNodeIndex(node));
        }

        function getBoundaryAfterNode(node) {
            return new DomPosition(node.parentNode, getNodeIndex(node) + 1);
        }

        function insertNodeAtPosition(node, n, o) {
            var firstNodeInserted = node.nodeType == 11 ? node.firstChild : node;
            if (isCharacterDataNode(n)) {
                if (o == n.length) {
                    dom.insertAfter(node, n);
                } else {
                    n.parentNode.insertBefore(node, o == 0 ? n : splitDataNode(n, o));
                }
            } else if (o >= n.childNodes.length) {
                n.appendChild(node);
            } else {
                n.insertBefore(node, n.childNodes[o]);
            }
            return firstNodeInserted;
        }

        function rangesIntersect(rangeA, rangeB, touchingIsIntersecting) {
            assertRangeValid(rangeA);
            assertRangeValid(rangeB);

            if (getRangeDocument(rangeB) != getRangeDocument(rangeA)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }

            var startComparison = comparePoints(rangeA.startContainer, rangeA.startOffset, rangeB.endContainer, rangeB.endOffset),
                endComparison = comparePoints(rangeA.endContainer, rangeA.endOffset, rangeB.startContainer, rangeB.startOffset);

            return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
        }

        function cloneSubtree(iterator) {
            var partiallySelected;
            for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {
                partiallySelected = iterator.isPartiallySelectedSubtree();
                node = node.cloneNode(!partiallySelected);
                if (partiallySelected) {
                    subIterator = iterator.getSubtreeIterator();
                    node.appendChild(cloneSubtree(subIterator));
                    subIterator.detach();
                }

                if (node.nodeType == 10) { // DocumentType
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }
                frag.appendChild(node);
            }
            return frag;
        }

        function iterateSubtree(rangeIterator, func, iteratorState) {
            var it, n;
            iteratorState = iteratorState || { stop: false };
            for (var node, subRangeIterator; node = rangeIterator.next(); ) {
                if (rangeIterator.isPartiallySelectedSubtree()) {
                    if (func(node) === false) {
                        iteratorState.stop = true;
                        return;
                    } else {
                        // The node is partially selected by the Range, so we can use a new RangeIterator on the portion of
                        // the node selected by the Range.
                        subRangeIterator = rangeIterator.getSubtreeIterator();
                        iterateSubtree(subRangeIterator, func, iteratorState);
                        subRangeIterator.detach();
                        if (iteratorState.stop) {
                            return;
                        }
                    }
                } else {
                    // The whole node is selected, so we can use efficient DOM iteration to iterate over the node and its
                    // descendants
                    it = dom.createIterator(node);
                    while ( (n = it.next()) ) {
                        if (func(n) === false) {
                            iteratorState.stop = true;
                            return;
                        }
                    }
                }
            }
        }

        function deleteSubtree(iterator) {
            var subIterator;
            while (iterator.next()) {
                if (iterator.isPartiallySelectedSubtree()) {
                    subIterator = iterator.getSubtreeIterator();
                    deleteSubtree(subIterator);
                    subIterator.detach();
                } else {
                    iterator.remove();
                }
            }
        }

        function extractSubtree(iterator) {
            for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {

                if (iterator.isPartiallySelectedSubtree()) {
                    node = node.cloneNode(false);
                    subIterator = iterator.getSubtreeIterator();
                    node.appendChild(extractSubtree(subIterator));
                    subIterator.detach();
                } else {
                    iterator.remove();
                }
                if (node.nodeType == 10) { // DocumentType
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }
                frag.appendChild(node);
            }
            return frag;
        }

        function getNodesInRange(range, nodeTypes, filter) {
            var filterNodeTypes = !!(nodeTypes && nodeTypes.length), regex;
            var filterExists = !!filter;
            if (filterNodeTypes) {
                regex = new RegExp("^(" + nodeTypes.join("|") + ")$");
            }

            var nodes = [];
            iterateSubtree(new RangeIterator(range, false), function(node) {
                if (filterNodeTypes && !regex.test(node.nodeType)) {
                    return;
                }
                if (filterExists && !filter(node)) {
                    return;
                }
                // Don't include a boundary container if it is a character data node and the range does not contain any
                // of its character data. See issue 190.
                var sc = range.startContainer;
                if (node == sc && isCharacterDataNode(sc) && range.startOffset == sc.length) {
                    return;
                }

                var ec = range.endContainer;
                if (node == ec && isCharacterDataNode(ec) && range.endOffset == 0) {
                    return;
                }

                nodes.push(node);
            });
            return nodes;
        }

        function inspect(range) {
            var name = (typeof range.getName == "undefined") ? "Range" : range.getName();
            return "[" + name + "(" + dom.inspectNode(range.startContainer) + ":" + range.startOffset + ", " +
                    dom.inspectNode(range.endContainer) + ":" + range.endOffset + ")]";
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // RangeIterator code partially borrows from IERange by Tim Ryan (http://github.com/timcameronryan/IERange)

        function RangeIterator(range, clonePartiallySelectedTextNodes) {
            this.range = range;
            this.clonePartiallySelectedTextNodes = clonePartiallySelectedTextNodes;


            if (!range.collapsed) {
                this.sc = range.startContainer;
                this.so = range.startOffset;
                this.ec = range.endContainer;
                this.eo = range.endOffset;
                var root = range.commonAncestorContainer;

                if (this.sc === this.ec && isCharacterDataNode(this.sc)) {
                    this.isSingleCharacterDataNode = true;
                    this._first = this._last = this._next = this.sc;
                } else {
                    this._first = this._next = (this.sc === root && !isCharacterDataNode(this.sc)) ?
                        this.sc.childNodes[this.so] : getClosestAncestorIn(this.sc, root, true);
                    this._last = (this.ec === root && !isCharacterDataNode(this.ec)) ?
                        this.ec.childNodes[this.eo - 1] : getClosestAncestorIn(this.ec, root, true);
                }
            }
        }

        RangeIterator.prototype = {
            _current: null,
            _next: null,
            _first: null,
            _last: null,
            isSingleCharacterDataNode: false,

            reset: function() {
                this._current = null;
                this._next = this._first;
            },

            hasNext: function() {
                return !!this._next;
            },

            next: function() {
                // Move to next node
                var current = this._current = this._next;
                if (current) {
                    this._next = (current !== this._last) ? current.nextSibling : null;

                    // Check for partially selected text nodes
                    if (isCharacterDataNode(current) && this.clonePartiallySelectedTextNodes) {
                        if (current === this.ec) {
                            (current = current.cloneNode(true)).deleteData(this.eo, current.length - this.eo);
                        }
                        if (this._current === this.sc) {
                            (current = current.cloneNode(true)).deleteData(0, this.so);
                        }
                    }
                }

                return current;
            },

            remove: function() {
                var current = this._current, start, end;

                if (isCharacterDataNode(current) && (current === this.sc || current === this.ec)) {
                    start = (current === this.sc) ? this.so : 0;
                    end = (current === this.ec) ? this.eo : current.length;
                    if (start != end) {
                        current.deleteData(start, end - start);
                    }
                } else {
                    if (current.parentNode) {
                        removeNode(current);
                    } else {
                    }
                }
            },

            // Checks if the current node is partially selected
            isPartiallySelectedSubtree: function() {
                var current = this._current;
                return isNonTextPartiallySelected(current, this.range);
            },

            getSubtreeIterator: function() {
                var subRange;
                if (this.isSingleCharacterDataNode) {
                    subRange = this.range.cloneRange();
                    subRange.collapse(false);
                } else {
                    subRange = new Range(getRangeDocument(this.range));
                    var current = this._current;
                    var startContainer = current, startOffset = 0, endContainer = current, endOffset = getNodeLength(current);

                    if (isOrIsAncestorOf(current, this.sc)) {
                        startContainer = this.sc;
                        startOffset = this.so;
                    }
                    if (isOrIsAncestorOf(current, this.ec)) {
                        endContainer = this.ec;
                        endOffset = this.eo;
                    }

                    updateBoundaries(subRange, startContainer, startOffset, endContainer, endOffset);
                }
                return new RangeIterator(subRange, this.clonePartiallySelectedTextNodes);
            },

            detach: function() {
                this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
            }
        };

        /*----------------------------------------------------------------------------------------------------------------*/

        var beforeAfterNodeTypes = [1, 3, 4, 5, 7, 8, 10];
        var rootContainerNodeTypes = [2, 9, 11];
        var readonlyNodeTypes = [5, 6, 10, 12];
        var insertableNodeTypes = [1, 3, 4, 5, 7, 8, 10, 11];
        var surroundNodeTypes = [1, 3, 4, 5, 7, 8];

        function createAncestorFinder(nodeTypes) {
            return function(node, selfIsAncestor) {
                var t, n = selfIsAncestor ? node : node.parentNode;
                while (n) {
                    t = n.nodeType;
                    if (arrayContains(nodeTypes, t)) {
                        return n;
                    }
                    n = n.parentNode;
                }
                return null;
            };
        }

        var getDocumentOrFragmentContainer = createAncestorFinder( [9, 11] );
        var getReadonlyAncestor = createAncestorFinder(readonlyNodeTypes);
        var getDocTypeNotationEntityAncestor = createAncestorFinder( [6, 10, 12] );

        function assertNoDocTypeNotationEntityAncestor(node, allowSelf) {
            if (getDocTypeNotationEntityAncestor(node, allowSelf)) {
                throw new DOMException("INVALID_NODE_TYPE_ERR");
            }
        }

        function assertValidNodeType(node, invalidTypes) {
            if (!arrayContains(invalidTypes, node.nodeType)) {
                throw new DOMException("INVALID_NODE_TYPE_ERR");
            }
        }

        function assertValidOffset(node, offset) {
            if (offset < 0 || offset > (isCharacterDataNode(node) ? node.length : node.childNodes.length)) {
                throw new DOMException("INDEX_SIZE_ERR");
            }
        }

        function assertSameDocumentOrFragment(node1, node2) {
            if (getDocumentOrFragmentContainer(node1, true) !== getDocumentOrFragmentContainer(node2, true)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
        }

        function assertNodeNotReadOnly(node) {
            if (getReadonlyAncestor(node, true)) {
                throw new DOMException("NO_MODIFICATION_ALLOWED_ERR");
            }
        }

        function assertNode(node, codeName) {
            if (!node) {
                throw new DOMException(codeName);
            }
        }

        function isValidOffset(node, offset) {
            return offset <= (isCharacterDataNode(node) ? node.length : node.childNodes.length);
        }

        function isRangeValid(range) {
            return (!!range.startContainer && !!range.endContainer &&
                    !(crashyTextNodes && (dom.isBrokenNode(range.startContainer) || dom.isBrokenNode(range.endContainer))) &&
                    getRootContainer(range.startContainer) == getRootContainer(range.endContainer) &&
                    isValidOffset(range.startContainer, range.startOffset) &&
                    isValidOffset(range.endContainer, range.endOffset));
        }

        function assertRangeValid(range) {
            if (!isRangeValid(range)) {
                throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: (" + range.inspect() + ")");
            }
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Test the browser's innerHTML support to decide how to implement createContextualFragment
        var styleEl = document.createElement("style");
        var htmlParsingConforms = false;
        try {
            styleEl.innerHTML = "<b>x</b>";
            htmlParsingConforms = (styleEl.firstChild.nodeType == 3); // Opera incorrectly creates an element node
        } catch (e) {
            // IE 6 and 7 throw
        }

        api.features.htmlParsingConforms = htmlParsingConforms;

        var createContextualFragment = htmlParsingConforms ?

            // Implementation as per HTML parsing spec, trusting in the browser's implementation of innerHTML. See
            // discussion and base code for this implementation at issue 67.
            // Spec: http://html5.org/specs/dom-parsing.html#extensions-to-the-range-interface
            // Thanks to Aleks Williams.
            function(fragmentStr) {
                // "Let node the context object's start's node."
                var node = this.startContainer;
                var doc = getDocument(node);

                // "If the context object's start's node is null, raise an INVALID_STATE_ERR
                // exception and abort these steps."
                if (!node) {
                    throw new DOMException("INVALID_STATE_ERR");
                }

                // "Let element be as follows, depending on node's interface:"
                // Document, Document Fragment: null
                var el = null;

                // "Element: node"
                if (node.nodeType == 1) {
                    el = node;

                // "Text, Comment: node's parentElement"
                } else if (isCharacterDataNode(node)) {
                    el = dom.parentElement(node);
                }

                // "If either element is null or element's ownerDocument is an HTML document
                // and element's local name is "html" and element's namespace is the HTML
                // namespace"
                if (el === null || (
                    el.nodeName == "HTML" &&
                    dom.isHtmlNamespace(getDocument(el).documentElement) &&
                    dom.isHtmlNamespace(el)
                )) {

                // "let element be a new Element with "body" as its local name and the HTML
                // namespace as its namespace.""
                    el = doc.createElement("body");
                } else {
                    el = el.cloneNode(false);
                }

                // "If the node's document is an HTML document: Invoke the HTML fragment parsing algorithm."
                // "If the node's document is an XML document: Invoke the XML fragment parsing algorithm."
                // "In either case, the algorithm must be invoked with fragment as the input
                // and element as the context element."
                el.innerHTML = fragmentStr;

                // "If this raises an exception, then abort these steps. Otherwise, let new
                // children be the nodes returned."

                // "Let fragment be a new DocumentFragment."
                // "Append all new children to fragment."
                // "Return fragment."
                return dom.fragmentFromNodeChildren(el);
            } :

            // In this case, innerHTML cannot be trusted, so fall back to a simpler, non-conformant implementation that
            // previous versions of Rangy used (with the exception of using a body element rather than a div)
            function(fragmentStr) {
                var doc = getRangeDocument(this);
                var el = doc.createElement("body");
                el.innerHTML = fragmentStr;

                return dom.fragmentFromNodeChildren(el);
            };

        function splitRangeBoundaries(range, positionsToPreserve) {
            assertRangeValid(range);

            var sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset;
            var startEndSame = (sc === ec);

            if (isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
                splitDataNode(ec, eo, positionsToPreserve);
            }

            if (isCharacterDataNode(sc) && so > 0 && so < sc.length) {
                sc = splitDataNode(sc, so, positionsToPreserve);
                if (startEndSame) {
                    eo -= so;
                    ec = sc;
                } else if (ec == sc.parentNode && eo >= getNodeIndex(sc)) {
                    eo++;
                }
                so = 0;
            }
            range.setStartAndEnd(sc, so, ec, eo);
        }

        function rangeToHtml(range) {
            assertRangeValid(range);
            var container = range.commonAncestorContainer.parentNode.cloneNode(false);
            container.appendChild( range.cloneContents() );
            return container.innerHTML;
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        var rangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
            "commonAncestorContainer"];

        var s2s = 0, s2e = 1, e2e = 2, e2s = 3;
        var n_b = 0, n_a = 1, n_b_a = 2, n_i = 3;

        util.extend(api.rangePrototype, {
            compareBoundaryPoints: function(how, range) {
                assertRangeValid(this);
                assertSameDocumentOrFragment(this.startContainer, range.startContainer);

                var nodeA, offsetA, nodeB, offsetB;
                var prefixA = (how == e2s || how == s2s) ? "start" : "end";
                var prefixB = (how == s2e || how == s2s) ? "start" : "end";
                nodeA = this[prefixA + "Container"];
                offsetA = this[prefixA + "Offset"];
                nodeB = range[prefixB + "Container"];
                offsetB = range[prefixB + "Offset"];
                return comparePoints(nodeA, offsetA, nodeB, offsetB);
            },

            insertNode: function(node) {
                assertRangeValid(this);
                assertValidNodeType(node, insertableNodeTypes);
                assertNodeNotReadOnly(this.startContainer);

                if (isOrIsAncestorOf(node, this.startContainer)) {
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }

                // No check for whether the container of the start of the Range is of a type that does not allow
                // children of the type of node: the browser's DOM implementation should do this for us when we attempt
                // to add the node

                var firstNodeInserted = insertNodeAtPosition(node, this.startContainer, this.startOffset);
                this.setStartBefore(firstNodeInserted);
            },

            cloneContents: function() {
                assertRangeValid(this);

                var clone, frag;
                if (this.collapsed) {
                    return getRangeDocument(this).createDocumentFragment();
                } else {
                    if (this.startContainer === this.endContainer && isCharacterDataNode(this.startContainer)) {
                        clone = this.startContainer.cloneNode(true);
                        clone.data = clone.data.slice(this.startOffset, this.endOffset);
                        frag = getRangeDocument(this).createDocumentFragment();
                        frag.appendChild(clone);
                        return frag;
                    } else {
                        var iterator = new RangeIterator(this, true);
                        clone = cloneSubtree(iterator);
                        iterator.detach();
                    }
                    return clone;
                }
            },

            canSurroundContents: function() {
                assertRangeValid(this);
                assertNodeNotReadOnly(this.startContainer);
                assertNodeNotReadOnly(this.endContainer);

                // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                // no non-text nodes.
                var iterator = new RangeIterator(this, true);
                var boundariesInvalid = (iterator._first && (isNonTextPartiallySelected(iterator._first, this)) ||
                        (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                iterator.detach();
                return !boundariesInvalid;
            },

            surroundContents: function(node) {
                assertValidNodeType(node, surroundNodeTypes);

                if (!this.canSurroundContents()) {
                    throw new DOMException("INVALID_STATE_ERR");
                }

                // Extract the contents
                var content = this.extractContents();

                // Clear the children of the node
                if (node.hasChildNodes()) {
                    while (node.lastChild) {
                        node.removeChild(node.lastChild);
                    }
                }

                // Insert the new node and add the extracted contents
                insertNodeAtPosition(node, this.startContainer, this.startOffset);
                node.appendChild(content);

                this.selectNode(node);
            },

            cloneRange: function() {
                assertRangeValid(this);
                var range = new Range(getRangeDocument(this));
                var i = rangeProperties.length, prop;
                while (i--) {
                    prop = rangeProperties[i];
                    range[prop] = this[prop];
                }
                return range;
            },

            toString: function() {
                assertRangeValid(this);
                var sc = this.startContainer;
                if (sc === this.endContainer && isCharacterDataNode(sc)) {
                    return (sc.nodeType == 3 || sc.nodeType == 4) ? sc.data.slice(this.startOffset, this.endOffset) : "";
                } else {
                    var textParts = [], iterator = new RangeIterator(this, true);
                    iterateSubtree(iterator, function(node) {
                        // Accept only text or CDATA nodes, not comments
                        if (node.nodeType == 3 || node.nodeType == 4) {
                            textParts.push(node.data);
                        }
                    });
                    iterator.detach();
                    return textParts.join("");
                }
            },

            // The methods below are all non-standard. The following batch were introduced by Mozilla but have since
            // been removed from Mozilla.

            compareNode: function(node) {
                assertRangeValid(this);

                var parent = node.parentNode;
                var nodeIndex = getNodeIndex(node);

                if (!parent) {
                    throw new DOMException("NOT_FOUND_ERR");
                }

                var startComparison = this.comparePoint(parent, nodeIndex),
                    endComparison = this.comparePoint(parent, nodeIndex + 1);

                if (startComparison < 0) { // Node starts before
                    return (endComparison > 0) ? n_b_a : n_b;
                } else {
                    return (endComparison > 0) ? n_a : n_i;
                }
            },

            comparePoint: function(node, offset) {
                assertRangeValid(this);
                assertNode(node, "HIERARCHY_REQUEST_ERR");
                assertSameDocumentOrFragment(node, this.startContainer);

                if (comparePoints(node, offset, this.startContainer, this.startOffset) < 0) {
                    return -1;
                } else if (comparePoints(node, offset, this.endContainer, this.endOffset) > 0) {
                    return 1;
                }
                return 0;
            },

            createContextualFragment: createContextualFragment,

            toHtml: function() {
                return rangeToHtml(this);
            },

            // touchingIsIntersecting determines whether this method considers a node that borders a range intersects
            // with it (as in WebKit) or not (as in Gecko pre-1.9, and the default)
            intersectsNode: function(node, touchingIsIntersecting) {
                assertRangeValid(this);
                if (getRootContainer(node) != getRangeRoot(this)) {
                    return false;
                }

                var parent = node.parentNode, offset = getNodeIndex(node);
                if (!parent) {
                    return true;
                }

                var startComparison = comparePoints(parent, offset, this.endContainer, this.endOffset),
                    endComparison = comparePoints(parent, offset + 1, this.startContainer, this.startOffset);

                return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
            },

            isPointInRange: function(node, offset) {
                assertRangeValid(this);
                assertNode(node, "HIERARCHY_REQUEST_ERR");
                assertSameDocumentOrFragment(node, this.startContainer);

                return (comparePoints(node, offset, this.startContainer, this.startOffset) >= 0) &&
                       (comparePoints(node, offset, this.endContainer, this.endOffset) <= 0);
            },

            // The methods below are non-standard and invented by me.

            // Sharing a boundary start-to-end or end-to-start does not count as intersection.
            intersectsRange: function(range) {
                return rangesIntersect(this, range, false);
            },

            // Sharing a boundary start-to-end or end-to-start does count as intersection.
            intersectsOrTouchesRange: function(range) {
                return rangesIntersect(this, range, true);
            },

            intersection: function(range) {
                if (this.intersectsRange(range)) {
                    var startComparison = comparePoints(this.startContainer, this.startOffset, range.startContainer, range.startOffset),
                        endComparison = comparePoints(this.endContainer, this.endOffset, range.endContainer, range.endOffset);

                    var intersectionRange = this.cloneRange();
                    if (startComparison == -1) {
                        intersectionRange.setStart(range.startContainer, range.startOffset);
                    }
                    if (endComparison == 1) {
                        intersectionRange.setEnd(range.endContainer, range.endOffset);
                    }
                    return intersectionRange;
                }
                return null;
            },

            union: function(range) {
                if (this.intersectsOrTouchesRange(range)) {
                    var unionRange = this.cloneRange();
                    if (comparePoints(range.startContainer, range.startOffset, this.startContainer, this.startOffset) == -1) {
                        unionRange.setStart(range.startContainer, range.startOffset);
                    }
                    if (comparePoints(range.endContainer, range.endOffset, this.endContainer, this.endOffset) == 1) {
                        unionRange.setEnd(range.endContainer, range.endOffset);
                    }
                    return unionRange;
                } else {
                    throw new DOMException("Ranges do not intersect");
                }
            },

            containsNode: function(node, allowPartial) {
                if (allowPartial) {
                    return this.intersectsNode(node, false);
                } else {
                    return this.compareNode(node) == n_i;
                }
            },

            containsNodeContents: function(node) {
                return this.comparePoint(node, 0) >= 0 && this.comparePoint(node, getNodeLength(node)) <= 0;
            },

            containsRange: function(range) {
                var intersection = this.intersection(range);
                return intersection !== null && range.equals(intersection);
            },

            containsNodeText: function(node) {
                var nodeRange = this.cloneRange();
                nodeRange.selectNode(node);
                var textNodes = nodeRange.getNodes([3]);
                if (textNodes.length > 0) {
                    nodeRange.setStart(textNodes[0], 0);
                    var lastTextNode = textNodes.pop();
                    nodeRange.setEnd(lastTextNode, lastTextNode.length);
                    return this.containsRange(nodeRange);
                } else {
                    return this.containsNodeContents(node);
                }
            },

            getNodes: function(nodeTypes, filter) {
                assertRangeValid(this);
                return getNodesInRange(this, nodeTypes, filter);
            },

            getDocument: function() {
                return getRangeDocument(this);
            },

            collapseBefore: function(node) {
                this.setEndBefore(node);
                this.collapse(false);
            },

            collapseAfter: function(node) {
                this.setStartAfter(node);
                this.collapse(true);
            },

            getBookmark: function(containerNode) {
                var doc = getRangeDocument(this);
                var preSelectionRange = api.createRange(doc);
                containerNode = containerNode || dom.getBody(doc);
                preSelectionRange.selectNodeContents(containerNode);
                var range = this.intersection(preSelectionRange);
                var start = 0, end = 0;
                if (range) {
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    start = preSelectionRange.toString().length;
                    end = start + range.toString().length;
                }

                return {
                    start: start,
                    end: end,
                    containerNode: containerNode
                };
            },

            moveToBookmark: function(bookmark) {
                var containerNode = bookmark.containerNode;
                var charIndex = 0;
                this.setStart(containerNode, 0);
                this.collapse(true);
                var nodeStack = [containerNode], node, foundStart = false, stop = false;
                var nextCharIndex, i, childNodes;

                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType == 3) {
                        nextCharIndex = charIndex + node.length;
                        if (!foundStart && bookmark.start >= charIndex && bookmark.start <= nextCharIndex) {
                            this.setStart(node, bookmark.start - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && bookmark.end >= charIndex && bookmark.end <= nextCharIndex) {
                            this.setEnd(node, bookmark.end - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    } else {
                        childNodes = node.childNodes;
                        i = childNodes.length;
                        while (i--) {
                            nodeStack.push(childNodes[i]);
                        }
                    }
                }
            },

            getName: function() {
                return "DomRange";
            },

            equals: function(range) {
                return Range.rangesEqual(this, range);
            },

            isValid: function() {
                return isRangeValid(this);
            },

            inspect: function() {
                return inspect(this);
            },

            detach: function() {
                // In DOM4, detach() is now a no-op.
            }
        });

        function copyComparisonConstantsToObject(obj) {
            obj.START_TO_START = s2s;
            obj.START_TO_END = s2e;
            obj.END_TO_END = e2e;
            obj.END_TO_START = e2s;

            obj.NODE_BEFORE = n_b;
            obj.NODE_AFTER = n_a;
            obj.NODE_BEFORE_AND_AFTER = n_b_a;
            obj.NODE_INSIDE = n_i;
        }

        function copyComparisonConstants(constructor) {
            copyComparisonConstantsToObject(constructor);
            copyComparisonConstantsToObject(constructor.prototype);
        }

        function createRangeContentRemover(remover, boundaryUpdater) {
            return function() {
                assertRangeValid(this);

                var sc = this.startContainer, so = this.startOffset, root = this.commonAncestorContainer;

                var iterator = new RangeIterator(this, true);

                // Work out where to position the range after content removal
                var node, boundary;
                if (sc !== root) {
                    node = getClosestAncestorIn(sc, root, true);
                    boundary = getBoundaryAfterNode(node);
                    sc = boundary.node;
                    so = boundary.offset;
                }

                // Check none of the range is read-only
                iterateSubtree(iterator, assertNodeNotReadOnly);

                iterator.reset();

                // Remove the content
                var returnValue = remover(iterator);
                iterator.detach();

                // Move to the new position
                boundaryUpdater(this, sc, so, sc, so);

                return returnValue;
            };
        }

        function createPrototypeRange(constructor, boundaryUpdater) {
            function createBeforeAfterNodeSetter(isBefore, isStart) {
                return function(node) {
                    assertValidNodeType(node, beforeAfterNodeTypes);
                    assertValidNodeType(getRootContainer(node), rootContainerNodeTypes);

                    var boundary = (isBefore ? getBoundaryBeforeNode : getBoundaryAfterNode)(node);
                    (isStart ? setRangeStart : setRangeEnd)(this, boundary.node, boundary.offset);
                };
            }

            function setRangeStart(range, node, offset) {
                var ec = range.endContainer, eo = range.endOffset;
                if (node !== range.startContainer || offset !== range.startOffset) {
                    // Check the root containers of the range and the new boundary, and also check whether the new boundary
                    // is after the current end. In either case, collapse the range to the new position
                    if (getRootContainer(node) != getRootContainer(ec) || comparePoints(node, offset, ec, eo) == 1) {
                        ec = node;
                        eo = offset;
                    }
                    boundaryUpdater(range, node, offset, ec, eo);
                }
            }

            function setRangeEnd(range, node, offset) {
                var sc = range.startContainer, so = range.startOffset;
                if (node !== range.endContainer || offset !== range.endOffset) {
                    // Check the root containers of the range and the new boundary, and also check whether the new boundary
                    // is after the current end. In either case, collapse the range to the new position
                    if (getRootContainer(node) != getRootContainer(sc) || comparePoints(node, offset, sc, so) == -1) {
                        sc = node;
                        so = offset;
                    }
                    boundaryUpdater(range, sc, so, node, offset);
                }
            }

            // Set up inheritance
            var F = function() {};
            F.prototype = api.rangePrototype;
            constructor.prototype = new F();

            util.extend(constructor.prototype, {
                setStart: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);

                    setRangeStart(this, node, offset);
                },

                setEnd: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);

                    setRangeEnd(this, node, offset);
                },

                /**
                 * Convenience method to set a range's start and end boundaries. Overloaded as follows:
                 * - Two parameters (node, offset) creates a collapsed range at that position
                 * - Three parameters (node, startOffset, endOffset) creates a range contained with node starting at
                 *   startOffset and ending at endOffset
                 * - Four parameters (startNode, startOffset, endNode, endOffset) creates a range starting at startOffset in
                 *   startNode and ending at endOffset in endNode
                 */
                setStartAndEnd: function() {
                    var args = arguments;
                    var sc = args[0], so = args[1], ec = sc, eo = so;

                    switch (args.length) {
                        case 3:
                            eo = args[2];
                            break;
                        case 4:
                            ec = args[2];
                            eo = args[3];
                            break;
                    }

                    boundaryUpdater(this, sc, so, ec, eo);
                },

                setBoundary: function(node, offset, isStart) {
                    this["set" + (isStart ? "Start" : "End")](node, offset);
                },

                setStartBefore: createBeforeAfterNodeSetter(true, true),
                setStartAfter: createBeforeAfterNodeSetter(false, true),
                setEndBefore: createBeforeAfterNodeSetter(true, false),
                setEndAfter: createBeforeAfterNodeSetter(false, false),

                collapse: function(isStart) {
                    assertRangeValid(this);
                    if (isStart) {
                        boundaryUpdater(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset);
                    } else {
                        boundaryUpdater(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
                    }
                },

                selectNodeContents: function(node) {
                    assertNoDocTypeNotationEntityAncestor(node, true);

                    boundaryUpdater(this, node, 0, node, getNodeLength(node));
                },

                selectNode: function(node) {
                    assertNoDocTypeNotationEntityAncestor(node, false);
                    assertValidNodeType(node, beforeAfterNodeTypes);

                    var start = getBoundaryBeforeNode(node), end = getBoundaryAfterNode(node);
                    boundaryUpdater(this, start.node, start.offset, end.node, end.offset);
                },

                extractContents: createRangeContentRemover(extractSubtree, boundaryUpdater),

                deleteContents: createRangeContentRemover(deleteSubtree, boundaryUpdater),

                canSurroundContents: function() {
                    assertRangeValid(this);
                    assertNodeNotReadOnly(this.startContainer);
                    assertNodeNotReadOnly(this.endContainer);

                    // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                    // no non-text nodes.
                    var iterator = new RangeIterator(this, true);
                    var boundariesInvalid = (iterator._first && isNonTextPartiallySelected(iterator._first, this) ||
                            (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                    iterator.detach();
                    return !boundariesInvalid;
                },

                splitBoundaries: function() {
                    splitRangeBoundaries(this);
                },

                splitBoundariesPreservingPositions: function(positionsToPreserve) {
                    splitRangeBoundaries(this, positionsToPreserve);
                },

                normalizeBoundaries: function() {
                    assertRangeValid(this);

                    var sc = this.startContainer, so = this.startOffset, ec = this.endContainer, eo = this.endOffset;

                    var mergeForward = function(node) {
                        var sibling = node.nextSibling;
                        if (sibling && sibling.nodeType == node.nodeType) {
                            ec = node;
                            eo = node.length;
                            node.appendData(sibling.data);
                            removeNode(sibling);
                        }
                    };

                    var mergeBackward = function(node) {
                        var sibling = node.previousSibling;
                        if (sibling && sibling.nodeType == node.nodeType) {
                            sc = node;
                            var nodeLength = node.length;
                            so = sibling.length;
                            node.insertData(0, sibling.data);
                            removeNode(sibling);
                            if (sc == ec) {
                                eo += so;
                                ec = sc;
                            } else if (ec == node.parentNode) {
                                var nodeIndex = getNodeIndex(node);
                                if (eo == nodeIndex) {
                                    ec = node;
                                    eo = nodeLength;
                                } else if (eo > nodeIndex) {
                                    eo--;
                                }
                            }
                        }
                    };

                    var normalizeStart = true;
                    var sibling;

                    if (isCharacterDataNode(ec)) {
                        if (eo == ec.length) {
                            mergeForward(ec);
                        } else if (eo == 0) {
                            sibling = ec.previousSibling;
                            if (sibling && sibling.nodeType == ec.nodeType) {
                                eo = sibling.length;
                                if (sc == ec) {
                                    normalizeStart = false;
                                }
                                sibling.appendData(ec.data);
                                removeNode(ec);
                                ec = sibling;
                            }
                        }
                    } else {
                        if (eo > 0) {
                            var endNode = ec.childNodes[eo - 1];
                            if (endNode && isCharacterDataNode(endNode)) {
                                mergeForward(endNode);
                            }
                        }
                        normalizeStart = !this.collapsed;
                    }

                    if (normalizeStart) {
                        if (isCharacterDataNode(sc)) {
                            if (so == 0) {
                                mergeBackward(sc);
                            } else if (so == sc.length) {
                                sibling = sc.nextSibling;
                                if (sibling && sibling.nodeType == sc.nodeType) {
                                    if (ec == sibling) {
                                        ec = sc;
                                        eo += sc.length;
                                    }
                                    sc.appendData(sibling.data);
                                    removeNode(sibling);
                                }
                            }
                        } else {
                            if (so < sc.childNodes.length) {
                                var startNode = sc.childNodes[so];
                                if (startNode && isCharacterDataNode(startNode)) {
                                    mergeBackward(startNode);
                                }
                            }
                        }
                    } else {
                        sc = ec;
                        so = eo;
                    }

                    boundaryUpdater(this, sc, so, ec, eo);
                },

                collapseToPoint: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);
                    this.setStartAndEnd(node, offset);
                }
            });

            copyComparisonConstants(constructor);
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Updates commonAncestorContainer and collapsed after boundary change
        function updateCollapsedAndCommonAncestor(range) {
            range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
            range.commonAncestorContainer = range.collapsed ?
                range.startContainer : dom.getCommonAncestor(range.startContainer, range.endContainer);
        }

        function updateBoundaries(range, startContainer, startOffset, endContainer, endOffset) {
            range.startContainer = startContainer;
            range.startOffset = startOffset;
            range.endContainer = endContainer;
            range.endOffset = endOffset;
            range.document = dom.getDocument(startContainer);

            updateCollapsedAndCommonAncestor(range);
        }

        function Range(doc) {
            this.startContainer = doc;
            this.startOffset = 0;
            this.endContainer = doc;
            this.endOffset = 0;
            this.document = doc;
            updateCollapsedAndCommonAncestor(this);
        }

        createPrototypeRange(Range, updateBoundaries);

        util.extend(Range, {
            rangeProperties: rangeProperties,
            RangeIterator: RangeIterator,
            copyComparisonConstants: copyComparisonConstants,
            createPrototypeRange: createPrototypeRange,
            inspect: inspect,
            toHtml: rangeToHtml,
            getRangeDocument: getRangeDocument,
            rangesEqual: function(r1, r2) {
                return r1.startContainer === r2.startContainer &&
                    r1.startOffset === r2.startOffset &&
                    r1.endContainer === r2.endContainer &&
                    r1.endOffset === r2.endOffset;
            }
        });

        api.DomRange = Range;
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wrappers for the browser's native DOM Range and/or TextRange implementation
    api.createCoreModule("WrappedRange", ["DomRange"], function(api, module) {
        var WrappedRange, WrappedTextRange;
        var dom = api.dom;
        var util = api.util;
        var DomPosition = dom.DomPosition;
        var DomRange = api.DomRange;
        var getBody = dom.getBody;
        var getContentDocument = dom.getContentDocument;
        var isCharacterDataNode = dom.isCharacterDataNode;


        /*----------------------------------------------------------------------------------------------------------------*/

        if (api.features.implementsDomRange) {
            // This is a wrapper around the browser's native DOM Range. It has two aims:
            // - Provide workarounds for specific browser bugs
            // - provide convenient extensions, which are inherited from Rangy's DomRange

            (function() {
                var rangeProto;
                var rangeProperties = DomRange.rangeProperties;

                function updateRangeProperties(range) {
                    var i = rangeProperties.length, prop;
                    while (i--) {
                        prop = rangeProperties[i];
                        range[prop] = range.nativeRange[prop];
                    }
                    // Fix for broken collapsed property in IE 9.
                    range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
                }

                function updateNativeRange(range, startContainer, startOffset, endContainer, endOffset) {
                    var startMoved = (range.startContainer !== startContainer || range.startOffset != startOffset);
                    var endMoved = (range.endContainer !== endContainer || range.endOffset != endOffset);
                    var nativeRangeDifferent = !range.equals(range.nativeRange);

                    // Always set both boundaries for the benefit of IE9 (see issue 35)
                    if (startMoved || endMoved || nativeRangeDifferent) {
                        range.setEnd(endContainer, endOffset);
                        range.setStart(startContainer, startOffset);
                    }
                }

                var createBeforeAfterNodeSetter;

                WrappedRange = function(range) {
                    if (!range) {
                        throw module.createError("WrappedRange: Range must be specified");
                    }
                    this.nativeRange = range;
                    updateRangeProperties(this);
                };

                DomRange.createPrototypeRange(WrappedRange, updateNativeRange);

                rangeProto = WrappedRange.prototype;

                rangeProto.selectNode = function(node) {
                    this.nativeRange.selectNode(node);
                    updateRangeProperties(this);
                };

                rangeProto.cloneContents = function() {
                    return this.nativeRange.cloneContents();
                };

                // Due to a long-standing Firefox bug that I have not been able to find a reliable way to detect,
                // insertNode() is never delegated to the native range.

                rangeProto.surroundContents = function(node) {
                    this.nativeRange.surroundContents(node);
                    updateRangeProperties(this);
                };

                rangeProto.collapse = function(isStart) {
                    this.nativeRange.collapse(isStart);
                    updateRangeProperties(this);
                };

                rangeProto.cloneRange = function() {
                    return new WrappedRange(this.nativeRange.cloneRange());
                };

                rangeProto.refresh = function() {
                    updateRangeProperties(this);
                };

                rangeProto.toString = function() {
                    return this.nativeRange.toString();
                };

                // Create test range and node for feature detection

                var testTextNode = document.createTextNode("test");
                getBody(document).appendChild(testTextNode);
                var range = document.createRange();

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for Firefox 2 bug that prevents moving the start of a Range to a point after its current end and
                // correct for it

                range.setStart(testTextNode, 0);
                range.setEnd(testTextNode, 0);

                try {
                    range.setStart(testTextNode, 1);

                    rangeProto.setStart = function(node, offset) {
                        this.nativeRange.setStart(node, offset);
                        updateRangeProperties(this);
                    };

                    rangeProto.setEnd = function(node, offset) {
                        this.nativeRange.setEnd(node, offset);
                        updateRangeProperties(this);
                    };

                    createBeforeAfterNodeSetter = function(name) {
                        return function(node) {
                            this.nativeRange[name](node);
                            updateRangeProperties(this);
                        };
                    };

                } catch(ex) {

                    rangeProto.setStart = function(node, offset) {
                        try {
                            this.nativeRange.setStart(node, offset);
                        } catch (ex) {
                            this.nativeRange.setEnd(node, offset);
                            this.nativeRange.setStart(node, offset);
                        }
                        updateRangeProperties(this);
                    };

                    rangeProto.setEnd = function(node, offset) {
                        try {
                            this.nativeRange.setEnd(node, offset);
                        } catch (ex) {
                            this.nativeRange.setStart(node, offset);
                            this.nativeRange.setEnd(node, offset);
                        }
                        updateRangeProperties(this);
                    };

                    createBeforeAfterNodeSetter = function(name, oppositeName) {
                        return function(node) {
                            try {
                                this.nativeRange[name](node);
                            } catch (ex) {
                                this.nativeRange[oppositeName](node);
                                this.nativeRange[name](node);
                            }
                            updateRangeProperties(this);
                        };
                    };
                }

                rangeProto.setStartBefore = createBeforeAfterNodeSetter("setStartBefore", "setEndBefore");
                rangeProto.setStartAfter = createBeforeAfterNodeSetter("setStartAfter", "setEndAfter");
                rangeProto.setEndBefore = createBeforeAfterNodeSetter("setEndBefore", "setStartBefore");
                rangeProto.setEndAfter = createBeforeAfterNodeSetter("setEndAfter", "setStartAfter");

                /*--------------------------------------------------------------------------------------------------------*/

                // Always use DOM4-compliant selectNodeContents implementation: it's simpler and less code than testing
                // whether the native implementation can be trusted
                rangeProto.selectNodeContents = function(node) {
                    this.setStartAndEnd(node, 0, dom.getNodeLength(node));
                };

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for and correct WebKit bug that has the behaviour of compareBoundaryPoints round the wrong way for
                // constants START_TO_END and END_TO_START: https://bugs.webkit.org/show_bug.cgi?id=20738

                range.selectNodeContents(testTextNode);
                range.setEnd(testTextNode, 3);

                var range2 = document.createRange();
                range2.selectNodeContents(testTextNode);
                range2.setEnd(testTextNode, 4);
                range2.setStart(testTextNode, 2);

                if (range.compareBoundaryPoints(range.START_TO_END, range2) == -1 &&
                        range.compareBoundaryPoints(range.END_TO_START, range2) == 1) {
                    // This is the wrong way round, so correct for it

                    rangeProto.compareBoundaryPoints = function(type, range) {
                        range = range.nativeRange || range;
                        if (type == range.START_TO_END) {
                            type = range.END_TO_START;
                        } else if (type == range.END_TO_START) {
                            type = range.START_TO_END;
                        }
                        return this.nativeRange.compareBoundaryPoints(type, range);
                    };
                } else {
                    rangeProto.compareBoundaryPoints = function(type, range) {
                        return this.nativeRange.compareBoundaryPoints(type, range.nativeRange || range);
                    };
                }

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for IE deleteContents() and extractContents() bug and correct it. See issue 107.

                var el = document.createElement("div");
                el.innerHTML = "123";
                var textNode = el.firstChild;
                var body = getBody(document);
                body.appendChild(el);

                range.setStart(textNode, 1);
                range.setEnd(textNode, 2);
                range.deleteContents();

                if (textNode.data == "13") {
                    // Behaviour is correct per DOM4 Range so wrap the browser's implementation of deleteContents() and
                    // extractContents()
                    rangeProto.deleteContents = function() {
                        this.nativeRange.deleteContents();
                        updateRangeProperties(this);
                    };

                    rangeProto.extractContents = function() {
                        var frag = this.nativeRange.extractContents();
                        updateRangeProperties(this);
                        return frag;
                    };
                } else {
                }

                body.removeChild(el);
                body = null;

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for existence of createContextualFragment and delegate to it if it exists
                if (util.isHostMethod(range, "createContextualFragment")) {
                    rangeProto.createContextualFragment = function(fragmentStr) {
                        return this.nativeRange.createContextualFragment(fragmentStr);
                    };
                }

                /*--------------------------------------------------------------------------------------------------------*/

                // Clean up
                getBody(document).removeChild(testTextNode);

                rangeProto.getName = function() {
                    return "WrappedRange";
                };

                api.WrappedRange = WrappedRange;

                api.createNativeRange = function(doc) {
                    doc = getContentDocument(doc, module, "createNativeRange");
                    return doc.createRange();
                };
            })();
        }

        if (api.features.implementsTextRange) {
            /*
            This is a workaround for a bug where IE returns the wrong container element from the TextRange's parentElement()
            method. For example, in the following (where pipes denote the selection boundaries):

            <ul id="ul"><li id="a">| a </li><li id="b"> b |</li></ul>

            var range = document.selection.createRange();
            alert(range.parentElement().id); // Should alert "ul" but alerts "b"

            This method returns the common ancestor node of the following:
            - the parentElement() of the textRange
            - the parentElement() of the textRange after calling collapse(true)
            - the parentElement() of the textRange after calling collapse(false)
            */
            var getTextRangeContainerElement = function(textRange) {
                var parentEl = textRange.parentElement();
                var range = textRange.duplicate();
                range.collapse(true);
                var startEl = range.parentElement();
                range = textRange.duplicate();
                range.collapse(false);
                var endEl = range.parentElement();
                var startEndContainer = (startEl == endEl) ? startEl : dom.getCommonAncestor(startEl, endEl);

                return startEndContainer == parentEl ? startEndContainer : dom.getCommonAncestor(parentEl, startEndContainer);
            };

            var textRangeIsCollapsed = function(textRange) {
                return textRange.compareEndPoints("StartToEnd", textRange) == 0;
            };

            // Gets the boundary of a TextRange expressed as a node and an offset within that node. This function started
            // out as an improved version of code found in Tim Cameron Ryan's IERange (http://code.google.com/p/ierange/)
            // but has grown, fixing problems with line breaks in preformatted text, adding workaround for IE TextRange
            // bugs, handling for inputs and images, plus optimizations.
            var getTextRangeBoundaryPosition = function(textRange, wholeRangeContainerElement, isStart, isCollapsed, startInfo) {
                var workingRange = textRange.duplicate();
                workingRange.collapse(isStart);
                var containerElement = workingRange.parentElement();

                // Sometimes collapsing a TextRange that's at the start of a text node can move it into the previous node, so
                // check for that
                if (!dom.isOrIsAncestorOf(wholeRangeContainerElement, containerElement)) {
                    containerElement = wholeRangeContainerElement;
                }


                // Deal with nodes that cannot "contain rich HTML markup". In practice, this means form inputs, images and
                // similar. See http://msdn.microsoft.com/en-us/library/aa703950%28VS.85%29.aspx
                if (!containerElement.canHaveHTML) {
                    var pos = new DomPosition(containerElement.parentNode, dom.getNodeIndex(containerElement));
                    return {
                        boundaryPosition: pos,
                        nodeInfo: {
                            nodeIndex: pos.offset,
                            containerElement: pos.node
                        }
                    };
                }

                var workingNode = dom.getDocument(containerElement).createElement("span");

                // Workaround for HTML5 Shiv's insane violation of document.createElement(). See Rangy issue 104 and HTML5
                // Shiv issue 64: https://github.com/aFarkas/html5shiv/issues/64
                if (workingNode.parentNode) {
                    dom.removeNode(workingNode);
                }

                var comparison, workingComparisonType = isStart ? "StartToStart" : "StartToEnd";
                var previousNode, nextNode, boundaryPosition, boundaryNode;
                var start = (startInfo && startInfo.containerElement == containerElement) ? startInfo.nodeIndex : 0;
                var childNodeCount = containerElement.childNodes.length;
                var end = childNodeCount;

                // Check end first. Code within the loop assumes that the endth child node of the container is definitely
                // after the range boundary.
                var nodeIndex = end;

                while (true) {
                    if (nodeIndex == childNodeCount) {
                        containerElement.appendChild(workingNode);
                    } else {
                        containerElement.insertBefore(workingNode, containerElement.childNodes[nodeIndex]);
                    }
                    workingRange.moveToElementText(workingNode);
                    comparison = workingRange.compareEndPoints(workingComparisonType, textRange);
                    if (comparison == 0 || start == end) {
                        break;
                    } else if (comparison == -1) {
                        if (end == start + 1) {
                            // We know the endth child node is after the range boundary, so we must be done.
                            break;
                        } else {
                            start = nodeIndex;
                        }
                    } else {
                        end = (end == start + 1) ? start : nodeIndex;
                    }
                    nodeIndex = Math.floor((start + end) / 2);
                    containerElement.removeChild(workingNode);
                }


                // We've now reached or gone past the boundary of the text range we're interested in
                // so have identified the node we want
                boundaryNode = workingNode.nextSibling;

                if (comparison == -1 && boundaryNode && isCharacterDataNode(boundaryNode)) {
                    // This is a character data node (text, comment, cdata). The working range is collapsed at the start of
                    // the node containing the text range's boundary, so we move the end of the working range to the
                    // boundary point and measure the length of its text to get the boundary's offset within the node.
                    workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);

                    var offset;

                    if (/[\r\n]/.test(boundaryNode.data)) {
                        /*
                        For the particular case of a boundary within a text node containing rendered line breaks (within a
                        <pre> element, for example), we need a slightly complicated approach to get the boundary's offset in
                        IE. The facts:

                        - Each line break is represented as \r in the text node's data/nodeValue properties
                        - Each line break is represented as \r\n in the TextRange's 'text' property
                        - The 'text' property of the TextRange does not contain trailing line breaks

                        To get round the problem presented by the final fact above, we can use the fact that TextRange's
                        moveStart() and moveEnd() methods return the actual number of characters moved, which is not
                        necessarily the same as the number of characters it was instructed to move. The simplest approach is
                        to use this to store the characters moved when moving both the start and end of the range to the
                        start of the document body and subtracting the start offset from the end offset (the
                        "move-negative-gazillion" method). However, this is extremely slow when the document is large and
                        the range is near the end of it. Clearly doing the mirror image (i.e. moving the range boundaries to
                        the end of the document) has the same problem.

                        Another approach that works is to use moveStart() to move the start boundary of the range up to the
                        end boundary one character at a time and incrementing a counter with the value returned by the
                        moveStart() call. However, the check for whether the start boundary has reached the end boundary is
                        expensive, so this method is slow (although unlike "move-negative-gazillion" is largely unaffected
                        by the location of the range within the document).

                        The approach used below is a hybrid of the two methods above. It uses the fact that a string
                        containing the TextRange's 'text' property with each \r\n converted to a single \r character cannot
                        be longer than the text of the TextRange, so the start of the range is moved that length initially
                        and then a character at a time to make up for any trailing line breaks not contained in the 'text'
                        property. This has good performance in most situations compared to the previous two methods.
                        */
                        var tempRange = workingRange.duplicate();
                        var rangeLength = tempRange.text.replace(/\r\n/g, "\r").length;

                        offset = tempRange.moveStart("character", rangeLength);
                        while ( (comparison = tempRange.compareEndPoints("StartToEnd", tempRange)) == -1) {
                            offset++;
                            tempRange.moveStart("character", 1);
                        }
                    } else {
                        offset = workingRange.text.length;
                    }
                    boundaryPosition = new DomPosition(boundaryNode, offset);
                } else {

                    // If the boundary immediately follows a character data node and this is the end boundary, we should favour
                    // a position within that, and likewise for a start boundary preceding a character data node
                    previousNode = (isCollapsed || !isStart) && workingNode.previousSibling;
                    nextNode = (isCollapsed || isStart) && workingNode.nextSibling;
                    if (nextNode && isCharacterDataNode(nextNode)) {
                        boundaryPosition = new DomPosition(nextNode, 0);
                    } else if (previousNode && isCharacterDataNode(previousNode)) {
                        boundaryPosition = new DomPosition(previousNode, previousNode.data.length);
                    } else {
                        boundaryPosition = new DomPosition(containerElement, dom.getNodeIndex(workingNode));
                    }
                }

                // Clean up
                dom.removeNode(workingNode);

                return {
                    boundaryPosition: boundaryPosition,
                    nodeInfo: {
                        nodeIndex: nodeIndex,
                        containerElement: containerElement
                    }
                };
            };

            // Returns a TextRange representing the boundary of a TextRange expressed as a node and an offset within that
            // node. This function started out as an optimized version of code found in Tim Cameron Ryan's IERange
            // (http://code.google.com/p/ierange/)
            var createBoundaryTextRange = function(boundaryPosition, isStart) {
                var boundaryNode, boundaryParent, boundaryOffset = boundaryPosition.offset;
                var doc = dom.getDocument(boundaryPosition.node);
                var workingNode, childNodes, workingRange = getBody(doc).createTextRange();
                var nodeIsDataNode = isCharacterDataNode(boundaryPosition.node);

                if (nodeIsDataNode) {
                    boundaryNode = boundaryPosition.node;
                    boundaryParent = boundaryNode.parentNode;
                } else {
                    childNodes = boundaryPosition.node.childNodes;
                    boundaryNode = (boundaryOffset < childNodes.length) ? childNodes[boundaryOffset] : null;
                    boundaryParent = boundaryPosition.node;
                }

                // Position the range immediately before the node containing the boundary
                workingNode = doc.createElement("span");

                // Making the working element non-empty element persuades IE to consider the TextRange boundary to be within
                // the element rather than immediately before or after it
                workingNode.innerHTML = "&#feff;";

                // insertBefore is supposed to work like appendChild if the second parameter is null. However, a bug report
                // for IERange suggests that it can crash the browser: http://code.google.com/p/ierange/issues/detail?id=12
                if (boundaryNode) {
                    boundaryParent.insertBefore(workingNode, boundaryNode);
                } else {
                    boundaryParent.appendChild(workingNode);
                }

                workingRange.moveToElementText(workingNode);
                workingRange.collapse(!isStart);

                // Clean up
                boundaryParent.removeChild(workingNode);

                // Move the working range to the text offset, if required
                if (nodeIsDataNode) {
                    workingRange[isStart ? "moveStart" : "moveEnd"]("character", boundaryOffset);
                }

                return workingRange;
            };

            /*------------------------------------------------------------------------------------------------------------*/

            // This is a wrapper around a TextRange, providing full DOM Range functionality using rangy's DomRange as a
            // prototype

            WrappedTextRange = function(textRange) {
                this.textRange = textRange;
                this.refresh();
            };

            WrappedTextRange.prototype = new DomRange(document);

            WrappedTextRange.prototype.refresh = function() {
                var start, end, startBoundary;

                // TextRange's parentElement() method cannot be trusted. getTextRangeContainerElement() works around that.
                var rangeContainerElement = getTextRangeContainerElement(this.textRange);

                if (textRangeIsCollapsed(this.textRange)) {
                    end = start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true,
                        true).boundaryPosition;
                } else {
                    startBoundary = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, false);
                    start = startBoundary.boundaryPosition;

                    // An optimization used here is that if the start and end boundaries have the same parent element, the
                    // search scope for the end boundary can be limited to exclude the portion of the element that precedes
                    // the start boundary
                    end = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, false, false,
                        startBoundary.nodeInfo).boundaryPosition;
                }

                this.setStart(start.node, start.offset);
                this.setEnd(end.node, end.offset);
            };

            WrappedTextRange.prototype.getName = function() {
                return "WrappedTextRange";
            };

            DomRange.copyComparisonConstants(WrappedTextRange);

            var rangeToTextRange = function(range) {
                if (range.collapsed) {
                    return createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                } else {
                    var startRange = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                    var endRange = createBoundaryTextRange(new DomPosition(range.endContainer, range.endOffset), false);
                    var textRange = getBody( DomRange.getRangeDocument(range) ).createTextRange();
                    textRange.setEndPoint("StartToStart", startRange);
                    textRange.setEndPoint("EndToEnd", endRange);
                    return textRange;
                }
            };

            WrappedTextRange.rangeToTextRange = rangeToTextRange;

            WrappedTextRange.prototype.toTextRange = function() {
                return rangeToTextRange(this);
            };

            api.WrappedTextRange = WrappedTextRange;

            // IE 9 and above have both implementations and Rangy makes both available. The next few lines sets which
            // implementation to use by default.
            if (!api.features.implementsDomRange || api.config.preferTextRange) {
                // Add WrappedTextRange as the Range property of the global object to allow expression like Range.END_TO_END to work
                var globalObj = (function(f) { return f("return this;")(); })(Function);
                if (typeof globalObj.Range == "undefined") {
                    globalObj.Range = WrappedTextRange;
                }

                api.createNativeRange = function(doc) {
                    doc = getContentDocument(doc, module, "createNativeRange");
                    return getBody(doc).createTextRange();
                };

                api.WrappedRange = WrappedTextRange;
            }
        }

        api.createRange = function(doc) {
            doc = getContentDocument(doc, module, "createRange");
            return new api.WrappedRange(api.createNativeRange(doc));
        };

        api.createRangyRange = function(doc) {
            doc = getContentDocument(doc, module, "createRangyRange");
            return new DomRange(doc);
        };

        util.createAliasForDeprecatedMethod(api, "createIframeRange", "createRange");
        util.createAliasForDeprecatedMethod(api, "createIframeRangyRange", "createRangyRange");

        api.addShimListener(function(win) {
            var doc = win.document;
            if (typeof doc.createRange == "undefined") {
                doc.createRange = function() {
                    return api.createRange(doc);
                };
            }
            doc = win = null;
        });
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // This module creates a selection object wrapper that conforms as closely as possible to the Selection specification
    // in the HTML Editing spec (http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#selections)
    api.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function(api, module) {
        api.config.checkSelectionRanges = true;

        var BOOLEAN = "boolean";
        var NUMBER = "number";
        var dom = api.dom;
        var util = api.util;
        var isHostMethod = util.isHostMethod;
        var DomRange = api.DomRange;
        var WrappedRange = api.WrappedRange;
        var DOMException = api.DOMException;
        var DomPosition = dom.DomPosition;
        var getNativeSelection;
        var selectionIsCollapsed;
        var features = api.features;
        var CONTROL = "Control";
        var getDocument = dom.getDocument;
        var getBody = dom.getBody;
        var rangesEqual = DomRange.rangesEqual;


        // Utility function to support direction parameters in the API that may be a string ("backward", "backwards",
        // "forward" or "forwards") or a Boolean (true for backwards).
        function isDirectionBackward(dir) {
            return (typeof dir == "string") ? /^backward(s)?$/i.test(dir) : !!dir;
        }

        function getWindow(win, methodName) {
            if (!win) {
                return window;
            } else if (dom.isWindow(win)) {
                return win;
            } else if (win instanceof WrappedSelection) {
                return win.win;
            } else {
                var doc = dom.getContentDocument(win, module, methodName);
                return dom.getWindow(doc);
            }
        }

        function getWinSelection(winParam) {
            return getWindow(winParam, "getWinSelection").getSelection();
        }

        function getDocSelection(winParam) {
            return getWindow(winParam, "getDocSelection").document.selection;
        }

        function winSelectionIsBackward(sel) {
            var backward = false;
            if (sel.anchorNode) {
                backward = (dom.comparePoints(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset) == 1);
            }
            return backward;
        }

        // Test for the Range/TextRange and Selection features required
        // Test for ability to retrieve selection
        var implementsWinGetSelection = isHostMethod(window, "getSelection"),
            implementsDocSelection = util.isHostObject(document, "selection");

        features.implementsWinGetSelection = implementsWinGetSelection;
        features.implementsDocSelection = implementsDocSelection;

        var useDocumentSelection = implementsDocSelection && (!implementsWinGetSelection || api.config.preferTextRange);

        if (useDocumentSelection) {
            getNativeSelection = getDocSelection;
            api.isSelectionValid = function(winParam) {
                var doc = getWindow(winParam, "isSelectionValid").document, nativeSel = doc.selection;

                // Check whether the selection TextRange is actually contained within the correct document
                return (nativeSel.type != "None" || getDocument(nativeSel.createRange().parentElement()) == doc);
            };
        } else if (implementsWinGetSelection) {
            getNativeSelection = getWinSelection;
            api.isSelectionValid = function() {
                return true;
            };
        } else {
            module.fail("Neither document.selection or window.getSelection() detected.");
            return false;
        }

        api.getNativeSelection = getNativeSelection;

        var testSelection = getNativeSelection();

        // In Firefox, the selection is null in an iframe with display: none. See issue #138.
        if (!testSelection) {
            module.fail("Native selection was null (possibly issue 138?)");
            return false;
        }

        var testRange = api.createNativeRange(document);
        var body = getBody(document);

        // Obtaining a range from a selection
        var selectionHasAnchorAndFocus = util.areHostProperties(testSelection,
            ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]);

        features.selectionHasAnchorAndFocus = selectionHasAnchorAndFocus;

        // Test for existence of native selection extend() method
        var selectionHasExtend = isHostMethod(testSelection, "extend");
        features.selectionHasExtend = selectionHasExtend;

        // Test if rangeCount exists
        var selectionHasRangeCount = (typeof testSelection.rangeCount == NUMBER);
        features.selectionHasRangeCount = selectionHasRangeCount;

        var selectionSupportsMultipleRanges = false;
        var collapsedNonEditableSelectionsSupported = true;

        var addRangeBackwardToNative = selectionHasExtend ?
            function(nativeSelection, range) {
                var doc = DomRange.getRangeDocument(range);
                var endRange = api.createRange(doc);
                endRange.collapseToPoint(range.endContainer, range.endOffset);
                nativeSelection.addRange(getNativeRange(endRange));
                nativeSelection.extend(range.startContainer, range.startOffset);
            } : null;

        if (util.areHostMethods(testSelection, ["addRange", "getRangeAt", "removeAllRanges"]) &&
                typeof testSelection.rangeCount == NUMBER && features.implementsDomRange) {

            (function() {
                // Previously an iframe was used but this caused problems in some circumstances in IE, so tests are
                // performed on the current document's selection. See issue 109.

                // Note also that if a selection previously existed, it is wiped and later restored by these tests. This
                // will result in the selection direction begin reversed if the original selection was backwards and the
                // browser does not support setting backwards selections (Internet Explorer, I'm looking at you).
                var sel = window.getSelection();
                if (sel) {
                    // Store the current selection
                    var originalSelectionRangeCount = sel.rangeCount;
                    var selectionHasMultipleRanges = (originalSelectionRangeCount > 1);
                    var originalSelectionRanges = [];
                    var originalSelectionBackward = winSelectionIsBackward(sel);
                    for (var i = 0; i < originalSelectionRangeCount; ++i) {
                        originalSelectionRanges[i] = sel.getRangeAt(i);
                    }

                    // Create some test elements
                    var testEl = dom.createTestElement(document, "", false);
                    var textNode = testEl.appendChild( document.createTextNode("\u00a0\u00a0\u00a0") );

                    // Test whether the native selection will allow a collapsed selection within a non-editable element
                    var r1 = document.createRange();

                    r1.setStart(textNode, 1);
                    r1.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(r1);
                    collapsedNonEditableSelectionsSupported = (sel.rangeCount == 1);
                    sel.removeAllRanges();

                    // Test whether the native selection is capable of supporting multiple ranges.
                    if (!selectionHasMultipleRanges) {
                        // Doing the original feature test here in Chrome 36 (and presumably later versions) prints a
                        // console error of "Discontiguous selection is not supported." that cannot be suppressed. There's
                        // nothing we can do about this while retaining the feature test so we have to resort to a browser
                        // sniff. I'm not happy about it. See
                        // https://code.google.com/p/chromium/issues/detail?id=399791
                        var chromeMatch = window.navigator.appVersion.match(/Chrome\/(.*?) /);
                        if (chromeMatch && parseInt(chromeMatch[1]) >= 36) {
                            selectionSupportsMultipleRanges = false;
                        } else {
                            var r2 = r1.cloneRange();
                            r1.setStart(textNode, 0);
                            r2.setEnd(textNode, 3);
                            r2.setStart(textNode, 2);
                            sel.addRange(r1);
                            sel.addRange(r2);
                            selectionSupportsMultipleRanges = (sel.rangeCount == 2);
                        }
                    }

                    // Clean up
                    dom.removeNode(testEl);
                    sel.removeAllRanges();

                    for (i = 0; i < originalSelectionRangeCount; ++i) {
                        if (i == 0 && originalSelectionBackward) {
                            if (addRangeBackwardToNative) {
                                addRangeBackwardToNative(sel, originalSelectionRanges[i]);
                            } else {
                                api.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend");
                                sel.addRange(originalSelectionRanges[i]);
                            }
                        } else {
                            sel.addRange(originalSelectionRanges[i]);
                        }
                    }
                }
            })();
        }

        features.selectionSupportsMultipleRanges = selectionSupportsMultipleRanges;
        features.collapsedNonEditableSelectionsSupported = collapsedNonEditableSelectionsSupported;

        // ControlRanges
        var implementsControlRange = false, testControlRange;

        if (body && isHostMethod(body, "createControlRange")) {
            testControlRange = body.createControlRange();
            if (util.areHostProperties(testControlRange, ["item", "add"])) {
                implementsControlRange = true;
            }
        }
        features.implementsControlRange = implementsControlRange;

        // Selection collapsedness
        if (selectionHasAnchorAndFocus) {
            selectionIsCollapsed = function(sel) {
                return sel.anchorNode === sel.focusNode && sel.anchorOffset === sel.focusOffset;
            };
        } else {
            selectionIsCollapsed = function(sel) {
                return sel.rangeCount ? sel.getRangeAt(sel.rangeCount - 1).collapsed : false;
            };
        }

        function updateAnchorAndFocusFromRange(sel, range, backward) {
            var anchorPrefix = backward ? "end" : "start", focusPrefix = backward ? "start" : "end";
            sel.anchorNode = range[anchorPrefix + "Container"];
            sel.anchorOffset = range[anchorPrefix + "Offset"];
            sel.focusNode = range[focusPrefix + "Container"];
            sel.focusOffset = range[focusPrefix + "Offset"];
        }

        function updateAnchorAndFocusFromNativeSelection(sel) {
            var nativeSel = sel.nativeSelection;
            sel.anchorNode = nativeSel.anchorNode;
            sel.anchorOffset = nativeSel.anchorOffset;
            sel.focusNode = nativeSel.focusNode;
            sel.focusOffset = nativeSel.focusOffset;
        }

        function updateEmptySelection(sel) {
            sel.anchorNode = sel.focusNode = null;
            sel.anchorOffset = sel.focusOffset = 0;
            sel.rangeCount = 0;
            sel.isCollapsed = true;
            sel._ranges.length = 0;
        }

        function getNativeRange(range) {
            var nativeRange;
            if (range instanceof DomRange) {
                nativeRange = api.createNativeRange(range.getDocument());
                nativeRange.setEnd(range.endContainer, range.endOffset);
                nativeRange.setStart(range.startContainer, range.startOffset);
            } else if (range instanceof WrappedRange) {
                nativeRange = range.nativeRange;
            } else if (features.implementsDomRange && (range instanceof dom.getWindow(range.startContainer).Range)) {
                nativeRange = range;
            }
            return nativeRange;
        }

        function rangeContainsSingleElement(rangeNodes) {
            if (!rangeNodes.length || rangeNodes[0].nodeType != 1) {
                return false;
            }
            for (var i = 1, len = rangeNodes.length; i < len; ++i) {
                if (!dom.isAncestorOf(rangeNodes[0], rangeNodes[i])) {
                    return false;
                }
            }
            return true;
        }

        function getSingleElementFromRange(range) {
            var nodes = range.getNodes();
            if (!rangeContainsSingleElement(nodes)) {
                throw module.createError("getSingleElementFromRange: range " + range.inspect() + " did not consist of a single element");
            }
            return nodes[0];
        }

        // Simple, quick test which only needs to distinguish between a TextRange and a ControlRange
        function isTextRange(range) {
            return !!range && typeof range.text != "undefined";
        }

        function updateFromTextRange(sel, range) {
            // Create a Range from the selected TextRange
            var wrappedRange = new WrappedRange(range);
            sel._ranges = [wrappedRange];

            updateAnchorAndFocusFromRange(sel, wrappedRange, false);
            sel.rangeCount = 1;
            sel.isCollapsed = wrappedRange.collapsed;
        }

        function updateControlSelection(sel) {
            // Update the wrapped selection based on what's now in the native selection
            sel._ranges.length = 0;
            if (sel.docSelection.type == "None") {
                updateEmptySelection(sel);
            } else {
                var controlRange = sel.docSelection.createRange();
                if (isTextRange(controlRange)) {
                    // This case (where the selection type is "Control" and calling createRange() on the selection returns
                    // a TextRange) can happen in IE 9. It happens, for example, when all elements in the selected
                    // ControlRange have been removed from the ControlRange and removed from the document.
                    updateFromTextRange(sel, controlRange);
                } else {
                    sel.rangeCount = controlRange.length;
                    var range, doc = getDocument(controlRange.item(0));
                    for (var i = 0; i < sel.rangeCount; ++i) {
                        range = api.createRange(doc);
                        range.selectNode(controlRange.item(i));
                        sel._ranges.push(range);
                    }
                    sel.isCollapsed = sel.rangeCount == 1 && sel._ranges[0].collapsed;
                    updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
                }
            }
        }

        function addRangeToControlSelection(sel, range) {
            var controlRange = sel.docSelection.createRange();
            var rangeElement = getSingleElementFromRange(range);

            // Create a new ControlRange containing all the elements in the selected ControlRange plus the element
            // contained by the supplied range
            var doc = getDocument(controlRange.item(0));
            var newControlRange = getBody(doc).createControlRange();
            for (var i = 0, len = controlRange.length; i < len; ++i) {
                newControlRange.add(controlRange.item(i));
            }
            try {
                newControlRange.add(rangeElement);
            } catch (ex) {
                throw module.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
            }
            newControlRange.select();

            // Update the wrapped selection based on what's now in the native selection
            updateControlSelection(sel);
        }

        var getSelectionRangeAt;

        if (isHostMethod(testSelection, "getRangeAt")) {
            // try/catch is present because getRangeAt() must have thrown an error in some browser and some situation.
            // Unfortunately, I didn't write a comment about the specifics and am now scared to take it out. Let that be a
            // lesson to us all, especially me.
            getSelectionRangeAt = function(sel, index) {
                try {
                    return sel.getRangeAt(index);
                } catch (ex) {
                    return null;
                }
            };
        } else if (selectionHasAnchorAndFocus) {
            getSelectionRangeAt = function(sel) {
                var doc = getDocument(sel.anchorNode);
                var range = api.createRange(doc);
                range.setStartAndEnd(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset);

                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== this.isCollapsed) {
                    range.setStartAndEnd(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset);
                }

                return range;
            };
        }

        function WrappedSelection(selection, docSelection, win) {
            this.nativeSelection = selection;
            this.docSelection = docSelection;
            this._ranges = [];
            this.win = win;
            this.refresh();
        }

        WrappedSelection.prototype = api.selectionPrototype;

        function deleteProperties(sel) {
            sel.win = sel.anchorNode = sel.focusNode = sel._ranges = null;
            sel.rangeCount = sel.anchorOffset = sel.focusOffset = 0;
            sel.detached = true;
        }

        var cachedRangySelections = [];

        function actOnCachedSelection(win, action) {
            var i = cachedRangySelections.length, cached, sel;
            while (i--) {
                cached = cachedRangySelections[i];
                sel = cached.selection;
                if (action == "deleteAll") {
                    deleteProperties(sel);
                } else if (cached.win == win) {
                    if (action == "delete") {
                        cachedRangySelections.splice(i, 1);
                        return true;
                    } else {
                        return sel;
                    }
                }
            }
            if (action == "deleteAll") {
                cachedRangySelections.length = 0;
            }
            return null;
        }

        var getSelection = function(win) {
            // Check if the parameter is a Rangy Selection object
            if (win && win instanceof WrappedSelection) {
                win.refresh();
                return win;
            }

            win = getWindow(win, "getNativeSelection");

            var sel = actOnCachedSelection(win);
            var nativeSel = getNativeSelection(win), docSel = implementsDocSelection ? getDocSelection(win) : null;
            if (sel) {
                sel.nativeSelection = nativeSel;
                sel.docSelection = docSel;
                sel.refresh();
            } else {
                sel = new WrappedSelection(nativeSel, docSel, win);
                cachedRangySelections.push( { win: win, selection: sel } );
            }
            return sel;
        };

        api.getSelection = getSelection;

        util.createAliasForDeprecatedMethod(api, "getIframeSelection", "getSelection");

        var selProto = WrappedSelection.prototype;

        function createControlSelection(sel, ranges) {
            // Ensure that the selection becomes of type "Control"
            var doc = getDocument(ranges[0].startContainer);
            var controlRange = getBody(doc).createControlRange();
            for (var i = 0, el, len = ranges.length; i < len; ++i) {
                el = getSingleElementFromRange(ranges[i]);
                try {
                    controlRange.add(el);
                } catch (ex) {
                    throw module.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)");
                }
            }
            controlRange.select();

            // Update the wrapped selection based on what's now in the native selection
            updateControlSelection(sel);
        }

        // Selecting a range
        if (!useDocumentSelection && selectionHasAnchorAndFocus && util.areHostMethods(testSelection, ["removeAllRanges", "addRange"])) {
            selProto.removeAllRanges = function() {
                this.nativeSelection.removeAllRanges();
                updateEmptySelection(this);
            };

            var addRangeBackward = function(sel, range) {
                addRangeBackwardToNative(sel.nativeSelection, range);
                sel.refresh();
            };

            if (selectionHasRangeCount) {
                selProto.addRange = function(range, direction) {
                    if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                        addRangeToControlSelection(this, range);
                    } else {
                        if (isDirectionBackward(direction) && selectionHasExtend) {
                            addRangeBackward(this, range);
                        } else {
                            var previousRangeCount;
                            if (selectionSupportsMultipleRanges) {
                                previousRangeCount = this.rangeCount;
                            } else {
                                this.removeAllRanges();
                                previousRangeCount = 0;
                            }
                            // Clone the native range so that changing the selected range does not affect the selection.
                            // This is contrary to the spec but is the only way to achieve consistency between browsers. See
                            // issue 80.
                            var clonedNativeRange = getNativeRange(range).cloneRange();
                            try {
                                this.nativeSelection.addRange(clonedNativeRange);
                            } catch (ex) {
                            }

                            // Check whether adding the range was successful
                            this.rangeCount = this.nativeSelection.rangeCount;

                            if (this.rangeCount == previousRangeCount + 1) {
                                // The range was added successfully

                                // Check whether the range that we added to the selection is reflected in the last range extracted from
                                // the selection
                                if (api.config.checkSelectionRanges) {
                                    var nativeRange = getSelectionRangeAt(this.nativeSelection, this.rangeCount - 1);
                                    if (nativeRange && !rangesEqual(nativeRange, range)) {
                                        // Happens in WebKit with, for example, a selection placed at the start of a text node
                                        range = new WrappedRange(nativeRange);
                                    }
                                }
                                this._ranges[this.rangeCount - 1] = range;
                                updateAnchorAndFocusFromRange(this, range, selectionIsBackward(this.nativeSelection));
                                this.isCollapsed = selectionIsCollapsed(this);
                            } else {
                                // The range was not added successfully. The simplest thing is to refresh
                                this.refresh();
                            }
                        }
                    }
                };
            } else {
                selProto.addRange = function(range, direction) {
                    if (isDirectionBackward(direction) && selectionHasExtend) {
                        addRangeBackward(this, range);
                    } else {
                        this.nativeSelection.addRange(getNativeRange(range));
                        this.refresh();
                    }
                };
            }

            selProto.setRanges = function(ranges) {
                if (implementsControlRange && implementsDocSelection && ranges.length > 1) {
                    createControlSelection(this, ranges);
                } else {
                    this.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        this.addRange(ranges[i]);
                    }
                }
            };
        } else if (isHostMethod(testSelection, "empty") && isHostMethod(testRange, "select") &&
                   implementsControlRange && useDocumentSelection) {

            selProto.removeAllRanges = function() {
                // Added try/catch as fix for issue #21
                try {
                    this.docSelection.empty();

                    // Check for empty() not working (issue #24)
                    if (this.docSelection.type != "None") {
                        // Work around failure to empty a control selection by instead selecting a TextRange and then
                        // calling empty()
                        var doc;
                        if (this.anchorNode) {
                            doc = getDocument(this.anchorNode);
                        } else if (this.docSelection.type == CONTROL) {
                            var controlRange = this.docSelection.createRange();
                            if (controlRange.length) {
                                doc = getDocument( controlRange.item(0) );
                            }
                        }
                        if (doc) {
                            var textRange = getBody(doc).createTextRange();
                            textRange.select();
                            this.docSelection.empty();
                        }
                    }
                } catch(ex) {}
                updateEmptySelection(this);
            };

            selProto.addRange = function(range) {
                if (this.docSelection.type == CONTROL) {
                    addRangeToControlSelection(this, range);
                } else {
                    api.WrappedTextRange.rangeToTextRange(range).select();
                    this._ranges[0] = range;
                    this.rangeCount = 1;
                    this.isCollapsed = this._ranges[0].collapsed;
                    updateAnchorAndFocusFromRange(this, range, false);
                }
            };

            selProto.setRanges = function(ranges) {
                this.removeAllRanges();
                var rangeCount = ranges.length;
                if (rangeCount > 1) {
                    createControlSelection(this, ranges);
                } else if (rangeCount) {
                    this.addRange(ranges[0]);
                }
            };
        } else {
            module.fail("No means of selecting a Range or TextRange was found");
            return false;
        }

        selProto.getRangeAt = function(index) {
            if (index < 0 || index >= this.rangeCount) {
                throw new DOMException("INDEX_SIZE_ERR");
            } else {
                // Clone the range to preserve selection-range independence. See issue 80.
                return this._ranges[index].cloneRange();
            }
        };

        var refreshSelection;

        if (useDocumentSelection) {
            refreshSelection = function(sel) {
                var range;
                if (api.isSelectionValid(sel.win)) {
                    range = sel.docSelection.createRange();
                } else {
                    range = getBody(sel.win.document).createTextRange();
                    range.collapse(true);
                }

                if (sel.docSelection.type == CONTROL) {
                    updateControlSelection(sel);
                } else if (isTextRange(range)) {
                    updateFromTextRange(sel, range);
                } else {
                    updateEmptySelection(sel);
                }
            };
        } else if (isHostMethod(testSelection, "getRangeAt") && typeof testSelection.rangeCount == NUMBER) {
            refreshSelection = function(sel) {
                if (implementsControlRange && implementsDocSelection && sel.docSelection.type == CONTROL) {
                    updateControlSelection(sel);
                } else {
                    sel._ranges.length = sel.rangeCount = sel.nativeSelection.rangeCount;
                    if (sel.rangeCount) {
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            sel._ranges[i] = new api.WrappedRange(sel.nativeSelection.getRangeAt(i));
                        }
                        updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], selectionIsBackward(sel.nativeSelection));
                        sel.isCollapsed = selectionIsCollapsed(sel);
                    } else {
                        updateEmptySelection(sel);
                    }
                }
            };
        } else if (selectionHasAnchorAndFocus && typeof testSelection.isCollapsed == BOOLEAN && typeof testRange.collapsed == BOOLEAN && features.implementsDomRange) {
            refreshSelection = function(sel) {
                var range, nativeSel = sel.nativeSelection;
                if (nativeSel.anchorNode) {
                    range = getSelectionRangeAt(nativeSel, 0);
                    sel._ranges = [range];
                    sel.rangeCount = 1;
                    updateAnchorAndFocusFromNativeSelection(sel);
                    sel.isCollapsed = selectionIsCollapsed(sel);
                } else {
                    updateEmptySelection(sel);
                }
            };
        } else {
            module.fail("No means of obtaining a Range or TextRange from the user's selection was found");
            return false;
        }

        selProto.refresh = function(checkForChanges) {
            var oldRanges = checkForChanges ? this._ranges.slice(0) : null;
            var oldAnchorNode = this.anchorNode, oldAnchorOffset = this.anchorOffset;

            refreshSelection(this);
            if (checkForChanges) {
                // Check the range count first
                var i = oldRanges.length;
                if (i != this._ranges.length) {
                    return true;
                }

                // Now check the direction. Checking the anchor position is the same is enough since we're checking all the
                // ranges after this
                if (this.anchorNode != oldAnchorNode || this.anchorOffset != oldAnchorOffset) {
                    return true;
                }

                // Finally, compare each range in turn
                while (i--) {
                    if (!rangesEqual(oldRanges[i], this._ranges[i])) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Removal of a single range
        var removeRangeManually = function(sel, range) {
            var ranges = sel.getAllRanges();
            sel.removeAllRanges();
            for (var i = 0, len = ranges.length; i < len; ++i) {
                if (!rangesEqual(range, ranges[i])) {
                    sel.addRange(ranges[i]);
                }
            }
            if (!sel.rangeCount) {
                updateEmptySelection(sel);
            }
        };

        if (implementsControlRange && implementsDocSelection) {
            selProto.removeRange = function(range) {
                if (this.docSelection.type == CONTROL) {
                    var controlRange = this.docSelection.createRange();
                    var rangeElement = getSingleElementFromRange(range);

                    // Create a new ControlRange containing all the elements in the selected ControlRange minus the
                    // element contained by the supplied range
                    var doc = getDocument(controlRange.item(0));
                    var newControlRange = getBody(doc).createControlRange();
                    var el, removed = false;
                    for (var i = 0, len = controlRange.length; i < len; ++i) {
                        el = controlRange.item(i);
                        if (el !== rangeElement || removed) {
                            newControlRange.add(controlRange.item(i));
                        } else {
                            removed = true;
                        }
                    }
                    newControlRange.select();

                    // Update the wrapped selection based on what's now in the native selection
                    updateControlSelection(this);
                } else {
                    removeRangeManually(this, range);
                }
            };
        } else {
            selProto.removeRange = function(range) {
                removeRangeManually(this, range);
            };
        }

        // Detecting if a selection is backward
        var selectionIsBackward;
        if (!useDocumentSelection && selectionHasAnchorAndFocus && features.implementsDomRange) {
            selectionIsBackward = winSelectionIsBackward;

            selProto.isBackward = function() {
                return selectionIsBackward(this);
            };
        } else {
            selectionIsBackward = selProto.isBackward = function() {
                return false;
            };
        }

        // Create an alias for backwards compatibility. From 1.3, everything is "backward" rather than "backwards"
        selProto.isBackwards = selProto.isBackward;

        // Selection stringifier
        // This is conformant to the old HTML5 selections draft spec but differs from WebKit and Mozilla's implementation.
        // The current spec does not yet define this method.
        selProto.toString = function() {
            var rangeTexts = [];
            for (var i = 0, len = this.rangeCount; i < len; ++i) {
                rangeTexts[i] = "" + this._ranges[i];
            }
            return rangeTexts.join("");
        };

        function assertNodeInSameDocument(sel, node) {
            if (sel.win.document != getDocument(node)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
        }

        // No current browser conforms fully to the spec for this method, so Rangy's own method is always used
        selProto.collapse = function(node, offset) {
            assertNodeInSameDocument(this, node);
            var range = api.createRange(node);
            range.collapseToPoint(node, offset);
            this.setSingleRange(range);
            this.isCollapsed = true;
        };

        selProto.collapseToStart = function() {
            if (this.rangeCount) {
                var range = this._ranges[0];
                this.collapse(range.startContainer, range.startOffset);
            } else {
                throw new DOMException("INVALID_STATE_ERR");
            }
        };

        selProto.collapseToEnd = function() {
            if (this.rangeCount) {
                var range = this._ranges[this.rangeCount - 1];
                this.collapse(range.endContainer, range.endOffset);
            } else {
                throw new DOMException("INVALID_STATE_ERR");
            }
        };

        // The spec is very specific on how selectAllChildren should be implemented and not all browsers implement it as
        // specified so the native implementation is never used by Rangy.
        selProto.selectAllChildren = function(node) {
            assertNodeInSameDocument(this, node);
            var range = api.createRange(node);
            range.selectNodeContents(node);
            this.setSingleRange(range);
        };

        selProto.deleteFromDocument = function() {
            // Sepcial behaviour required for IE's control selections
            if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                var controlRange = this.docSelection.createRange();
                var element;
                while (controlRange.length) {
                    element = controlRange.item(0);
                    controlRange.remove(element);
                    dom.removeNode(element);
                }
                this.refresh();
            } else if (this.rangeCount) {
                var ranges = this.getAllRanges();
                if (ranges.length) {
                    this.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        ranges[i].deleteContents();
                    }
                    // The spec says nothing about what the selection should contain after calling deleteContents on each
                    // range. Firefox moves the selection to where the final selected range was, so we emulate that
                    this.addRange(ranges[len - 1]);
                }
            }
        };

        // The following are non-standard extensions
        selProto.eachRange = function(func, returnValue) {
            for (var i = 0, len = this._ranges.length; i < len; ++i) {
                if ( func( this.getRangeAt(i) ) ) {
                    return returnValue;
                }
            }
        };

        selProto.getAllRanges = function() {
            var ranges = [];
            this.eachRange(function(range) {
                ranges.push(range);
            });
            return ranges;
        };

        selProto.setSingleRange = function(range, direction) {
            this.removeAllRanges();
            this.addRange(range, direction);
        };

        selProto.callMethodOnEachRange = function(methodName, params) {
            var results = [];
            this.eachRange( function(range) {
                results.push( range[methodName].apply(range, params || []) );
            } );
            return results;
        };

        function createStartOrEndSetter(isStart) {
            return function(node, offset) {
                var range;
                if (this.rangeCount) {
                    range = this.getRangeAt(0);
                    range["set" + (isStart ? "Start" : "End")](node, offset);
                } else {
                    range = api.createRange(this.win.document);
                    range.setStartAndEnd(node, offset);
                }
                this.setSingleRange(range, this.isBackward());
            };
        }

        selProto.setStart = createStartOrEndSetter(true);
        selProto.setEnd = createStartOrEndSetter(false);

        // Add select() method to Range prototype. Any existing selection will be removed.
        api.rangePrototype.select = function(direction) {
            getSelection( this.getDocument() ).setSingleRange(this, direction);
        };

        selProto.changeEachRange = function(func) {
            var ranges = [];
            var backward = this.isBackward();

            this.eachRange(function(range) {
                func(range);
                ranges.push(range);
            });

            this.removeAllRanges();
            if (backward && ranges.length == 1) {
                this.addRange(ranges[0], "backward");
            } else {
                this.setRanges(ranges);
            }
        };

        selProto.containsNode = function(node, allowPartial) {
            return this.eachRange( function(range) {
                return range.containsNode(node, allowPartial);
            }, true ) || false;
        };

        selProto.getBookmark = function(containerNode) {
            return {
                backward: this.isBackward(),
                rangeBookmarks: this.callMethodOnEachRange("getBookmark", [containerNode])
            };
        };

        selProto.moveToBookmark = function(bookmark) {
            var selRanges = [];
            for (var i = 0, rangeBookmark, range; rangeBookmark = bookmark.rangeBookmarks[i++]; ) {
                range = api.createRange(this.win);
                range.moveToBookmark(rangeBookmark);
                selRanges.push(range);
            }
            if (bookmark.backward) {
                this.setSingleRange(selRanges[0], "backward");
            } else {
                this.setRanges(selRanges);
            }
        };

        selProto.saveRanges = function() {
            return {
                backward: this.isBackward(),
                ranges: this.callMethodOnEachRange("cloneRange")
            };
        };

        selProto.restoreRanges = function(selRanges) {
            this.removeAllRanges();
            for (var i = 0, range; range = selRanges.ranges[i]; ++i) {
                this.addRange(range, (selRanges.backward && i == 0));
            }
        };

        selProto.toHtml = function() {
            var rangeHtmls = [];
            this.eachRange(function(range) {
                rangeHtmls.push( DomRange.toHtml(range) );
            });
            return rangeHtmls.join("");
        };

        if (features.implementsTextRange) {
            selProto.getNativeTextRange = function() {
                var sel, textRange;
                if ( (sel = this.docSelection) ) {
                    var range = sel.createRange();
                    if (isTextRange(range)) {
                        return range;
                    } else {
                        throw module.createError("getNativeTextRange: selection is a control selection");
                    }
                } else if (this.rangeCount > 0) {
                    return api.WrappedTextRange.rangeToTextRange( this.getRangeAt(0) );
                } else {
                    throw module.createError("getNativeTextRange: selection contains no range");
                }
            };
        }

        function inspect(sel) {
            var rangeInspects = [];
            var anchor = new DomPosition(sel.anchorNode, sel.anchorOffset);
            var focus = new DomPosition(sel.focusNode, sel.focusOffset);
            var name = (typeof sel.getName == "function") ? sel.getName() : "Selection";

            if (typeof sel.rangeCount != "undefined") {
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    rangeInspects[i] = DomRange.inspect(sel.getRangeAt(i));
                }
            }
            return "[" + name + "(Ranges: " + rangeInspects.join(", ") +
                    ")(anchor: " + anchor.inspect() + ", focus: " + focus.inspect() + "]";
        }

        selProto.getName = function() {
            return "WrappedSelection";
        };

        selProto.inspect = function() {
            return inspect(this);
        };

        selProto.detach = function() {
            actOnCachedSelection(this.win, "delete");
            deleteProperties(this);
        };

        WrappedSelection.detachAll = function() {
            actOnCachedSelection(null, "deleteAll");
        };

        WrappedSelection.inspect = inspect;
        WrappedSelection.isDirectionBackward = isDirectionBackward;

        api.Selection = WrappedSelection;

        api.selectionPrototype = selProto;

        api.addShimListener(function(win) {
            if (typeof win.getSelection == "undefined") {
                win.getSelection = function() {
                    return getSelection(win);
                };
            }
            win = null;
        });
    });
    

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wait for document to load before initializing
    var docReady = false;

    var loadHandler = function(e) {
        if (!docReady) {
            docReady = true;
            if (!api.initialized && api.config.autoInitialize) {
                init();
            }
        }
    };

    if (isBrowser) {
        // Test whether the document has already been loaded and initialize immediately if so
        if (document.readyState == "complete") {
            loadHandler();
        } else {
            if (isHostMethod(document, "addEventListener")) {
                document.addEventListener("DOMContentLoaded", loadHandler, false);
            }

            // Add a fallback in case the DOMContentLoaded event isn't supported
            addListener(window, "load", loadHandler);
        }
    }

    return api;
}, this);

/***/ }),

/***/ "./webpack-app/vendors/rangy/rangy-highlighter.js":
/*!********************************************************!*\
  !*** ./webpack-app/vendors/rangy/rangy-highlighter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Highlighter module for Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Depends on Rangy core, ClassApplier and optionally TextRange modules.
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.1-dev
 * Build date: 20 May 2015
 */
(function(factory, root) {
    if (true) {
        // AMD. Register as an anonymous module with a dependency on Rangy.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./rangy-core */ "./webpack-app/vendors/rangy/rangy-core.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(function(rangy) {
    rangy.createModule("Highlighter", ["ClassApplier"], function(api, module) {
        var dom = api.dom;
        var contains = dom.arrayContains;
        var getBody = dom.getBody;
        var createOptions = api.util.createOptions;
        var forEach = api.util.forEach;
        var nextHighlightId = 1;

        // Puts highlights in order, last in document first.
        function compareHighlights(h1, h2) {
            return h1.characterRange.start - h2.characterRange.start;
        }

        function getContainerElement(doc, id) {
            return id ? doc.getElementById(id) : getBody(doc);
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        var highlighterTypes = {};

        function HighlighterType(type, converterCreator) {
            this.type = type;
            this.converterCreator = converterCreator;
        }

        HighlighterType.prototype.create = function() {
            var converter = this.converterCreator();
            converter.type = this.type;
            return converter;
        };

        function registerHighlighterType(type, converterCreator) {
            highlighterTypes[type] = new HighlighterType(type, converterCreator);
        }

        function getConverter(type) {
            var highlighterType = highlighterTypes[type];
            if (highlighterType instanceof HighlighterType) {
                return highlighterType.create();
            } else {
                throw new Error("Highlighter type '" + type + "' is not valid");
            }
        }

        api.registerHighlighterType = registerHighlighterType;

        /*----------------------------------------------------------------------------------------------------------------*/

        function CharacterRange(start, end) {
            this.start = start;
            this.end = end;
        }

        CharacterRange.prototype = {
            intersects: function(charRange) {
                return this.start < charRange.end && this.end > charRange.start;
            },

            isContiguousWith: function(charRange) {
                return this.start == charRange.end || this.end == charRange.start;
            },

            union: function(charRange) {
                return new CharacterRange(Math.min(this.start, charRange.start), Math.max(this.end, charRange.end));
            },

            intersection: function(charRange) {
                return new CharacterRange(Math.max(this.start, charRange.start), Math.min(this.end, charRange.end));
            },

            getComplements: function(charRange) {
                var ranges = [];
                if (this.start >= charRange.start) {
                    if (this.end <= charRange.end) {
                        return [];
                    }
                    ranges.push(new CharacterRange(charRange.end, this.end));
                } else {
                    ranges.push(new CharacterRange(this.start, Math.min(this.end, charRange.start)));
                    if (this.end > charRange.end) {
                        ranges.push(new CharacterRange(charRange.end, this.end));
                    }
                }
                return ranges;
            },

            toString: function() {
                return "[CharacterRange(" + this.start + ", " + this.end + ")]";
            }
        };

        CharacterRange.fromCharacterRange = function(charRange) {
            return new CharacterRange(charRange.start, charRange.end);
        };

        /*----------------------------------------------------------------------------------------------------------------*/

        var textContentConverter = {
            rangeToCharacterRange: function(range, containerNode) {
                var bookmark = range.getBookmark(containerNode);
                return new CharacterRange(bookmark.start, bookmark.end);
            },

            characterRangeToRange: function(doc, characterRange, containerNode) {
                var range = api.createRange(doc);
                range.moveToBookmark({
                    start: characterRange.start,
                    end: characterRange.end,
                    containerNode: containerNode
                });

                return range;
            },

            serializeSelection: function(selection, containerNode) {
                var ranges = selection.getAllRanges(), rangeCount = ranges.length;
                var rangeInfos = [];

                var backward = rangeCount == 1 && selection.isBackward();

                for (var i = 0, len = ranges.length; i < len; ++i) {
                    rangeInfos[i] = {
                        characterRange: this.rangeToCharacterRange(ranges[i], containerNode),
                        backward: backward
                    };
                }

                return rangeInfos;
            },

            restoreSelection: function(selection, savedSelection, containerNode) {
                selection.removeAllRanges();
                var doc = selection.win.document;
                for (var i = 0, len = savedSelection.length, range, rangeInfo, characterRange; i < len; ++i) {
                    rangeInfo = savedSelection[i];
                    characterRange = rangeInfo.characterRange;
                    range = this.characterRangeToRange(doc, rangeInfo.characterRange, containerNode);
                    selection.addRange(range, rangeInfo.backward);
                }
            }
        };

        registerHighlighterType("textContent", function() {
            return textContentConverter;
        });

        /*----------------------------------------------------------------------------------------------------------------*/

        // Lazily load the TextRange-based converter so that the dependency is only checked when required.
        registerHighlighterType("TextRange", (function() {
            var converter;

            return function() {
                if (!converter) {
                    // Test that textRangeModule exists and is supported
                    var textRangeModule = api.modules.TextRange;
                    if (!textRangeModule) {
                        throw new Error("TextRange module is missing.");
                    } else if (!textRangeModule.supported) {
                        throw new Error("TextRange module is present but not supported.");
                    }

                    converter = {
                        rangeToCharacterRange: function(range, containerNode) {
                            return CharacterRange.fromCharacterRange( range.toCharacterRange(containerNode) );
                        },

                        characterRangeToRange: function(doc, characterRange, containerNode) {
                            var range = api.createRange(doc);
                            range.selectCharacters(containerNode, characterRange.start, characterRange.end);
                            return range;
                        },

                        serializeSelection: function(selection, containerNode) {
                            return selection.saveCharacterRanges(containerNode);
                        },

                        restoreSelection: function(selection, savedSelection, containerNode) {
                            selection.restoreCharacterRanges(containerNode, savedSelection);
                        }
                    };
                }

                return converter;
            };
        })());

        /*----------------------------------------------------------------------------------------------------------------*/

        function Highlight(doc, characterRange, classApplier, converter, id, containerElementId) {
            if (id) {
                this.id = id;
                nextHighlightId = Math.max(nextHighlightId, id + 1);
            } else {
                this.id = nextHighlightId++;
            }
            this.characterRange = characterRange;
            this.doc = doc;
            this.classApplier = classApplier;
            this.converter = converter;
            this.containerElementId = containerElementId || null;
            this.applied = false;
        }

        Highlight.prototype = {
            getContainerElement: function() {
                return getContainerElement(this.doc, this.containerElementId);
            },

            getRange: function() {
                return this.converter.characterRangeToRange(this.doc, this.characterRange, this.getContainerElement());
            },

            fromRange: function(range) {
                this.characterRange = this.converter.rangeToCharacterRange(range, this.getContainerElement());
            },

            getText: function() {
                return this.getRange().toString();
            },

            containsElement: function(el) {
                return this.getRange().containsNodeContents(el.firstChild);
            },

            unapply: function() {
                this.classApplier.undoToRange(this.getRange());
                this.applied = false;
            },

            apply: function() {
                this.classApplier.applyToRange(this.getRange());
                this.applied = true;
            },

            getHighlightElements: function() {
                return this.classApplier.getElementsWithClassIntersectingRange(this.getRange());
            },

            toString: function() {
                return "[Highlight(ID: " + this.id + ", class: " + this.classApplier.className + ", character range: " +
                    this.characterRange.start + " - " + this.characterRange.end + ")]";
            }
        };

        /*----------------------------------------------------------------------------------------------------------------*/

        function Highlighter(doc, type) {
            type = type || "textContent";
            this.doc = doc || document;
            this.classAppliers = {};
            this.highlights = [];
            this.converter = getConverter(type);
        }

        Highlighter.prototype = {
            addClassApplier: function(classApplier) {
                this.classAppliers[classApplier.className] = classApplier;
            },

            getHighlightForElement: function(el) {
                var highlights = this.highlights;
                for (var i = 0, len = highlights.length; i < len; ++i) {
                    if (highlights[i].containsElement(el)) {
                        return highlights[i];
                    }
                }
                return null;
            },

            removeHighlights: function(highlights) {
                for (var i = 0, len = this.highlights.length, highlight; i < len; ++i) {
                    highlight = this.highlights[i];
                    if (contains(highlights, highlight)) {
                        highlight.unapply();
                        this.highlights.splice(i--, 1);
                    }
                }
            },

            removeAllHighlights: function() {
                this.removeHighlights(this.highlights);
            },

            getIntersectingHighlights: function(ranges) {
                // Test each range against each of the highlighted ranges to see whether they overlap
                var intersectingHighlights = [], highlights = this.highlights;
                forEach(ranges, function(range) {
                    //var selCharRange = converter.rangeToCharacterRange(range);
                    forEach(highlights, function(highlight) {
                        if (range.intersectsRange( highlight.getRange() ) && !contains(intersectingHighlights, highlight)) {
                            intersectingHighlights.push(highlight);
                        }
                    });
                });

                return intersectingHighlights;
            },

            highlightCharacterRanges: function(className, charRanges, options) {
                var i, len, j;
                var highlights = this.highlights;
                var converter = this.converter;
                var doc = this.doc;
                var highlightsToRemove = [];
                var classApplier = className ? this.classAppliers[className] : null;

                options = createOptions(options, {
                    containerElementId: null,
                    exclusive: true
                });

                var containerElementId = options.containerElementId;
                var exclusive = options.exclusive;

                var containerElement, containerElementRange, containerElementCharRange;
                if (containerElementId) {
                    containerElement = this.doc.getElementById(containerElementId);
                    if (containerElement) {
                        containerElementRange = api.createRange(this.doc);
                        containerElementRange.selectNodeContents(containerElement);
                        containerElementCharRange = new CharacterRange(0, containerElementRange.toString().length);
                    }
                }

                var charRange, highlightCharRange, removeHighlight, isSameClassApplier, highlightsToKeep, splitHighlight;

                for (i = 0, len = charRanges.length; i < len; ++i) {
                    charRange = charRanges[i];
                    highlightsToKeep = [];

                    // Restrict character range to container element, if it exists
                    if (containerElementCharRange) {
                        charRange = charRange.intersection(containerElementCharRange);
                    }

                    // Ignore empty ranges
                    if (charRange.start == charRange.end) {
                        continue;
                    }

                    // Check for intersection with existing highlights. For each intersection, create a new highlight
                    // which is the union of the highlight range and the selected range
                    for (j = 0; j < highlights.length; ++j) {
                        removeHighlight = false;

                        if (containerElementId == highlights[j].containerElementId) {
                            highlightCharRange = highlights[j].characterRange;
                            isSameClassApplier = (classApplier == highlights[j].classApplier);
                            splitHighlight = !isSameClassApplier && exclusive;

                            // Replace the existing highlight if it needs to be:
                            //  1. merged (isSameClassApplier)
                            //  2. partially or entirely erased (className === null)
                            //  3. partially or entirely replaced (isSameClassApplier == false && exclusive == true)
                            if (    (highlightCharRange.intersects(charRange) || highlightCharRange.isContiguousWith(charRange)) &&
                                    (isSameClassApplier || splitHighlight) ) {

                                // Remove existing highlights, keeping the unselected parts
                                if (splitHighlight) {
                                    forEach(highlightCharRange.getComplements(charRange), function(rangeToAdd) {
                                        highlightsToKeep.push( new Highlight(doc, rangeToAdd, highlights[j].classApplier, converter, null, containerElementId) );
                                    });
                                }

                                removeHighlight = true;
                                if (isSameClassApplier) {
                                    charRange = highlightCharRange.union(charRange);
                                }
                            }
                        }

                        if (removeHighlight) {
                            highlightsToRemove.push(highlights[j]);
                            highlights[j] = new Highlight(doc, highlightCharRange.union(charRange), classApplier, converter, null, containerElementId);
                        } else {
                            highlightsToKeep.push(highlights[j]);
                        }
                    }

                    // Add new range
                    if (classApplier) {
                        highlightsToKeep.push(new Highlight(doc, charRange, classApplier, converter, null, containerElementId));
                    }
                    this.highlights = highlights = highlightsToKeep;
                }

                // Remove the old highlights
                forEach(highlightsToRemove, function(highlightToRemove) {
                    highlightToRemove.unapply();
                });

                // Apply new highlights
                var newHighlights = [];
                forEach(highlights, function(highlight) {
                    if (!highlight.applied) {
                        highlight.apply();
                        newHighlights.push(highlight);
                    }
                });

                return newHighlights;
            },

            highlightRanges: function(className, ranges, options) {
                var selCharRanges = [];
                var converter = this.converter;

                options = createOptions(options, {
                    containerElement: null,
                    exclusive: true
                });

                var containerElement = options.containerElement;
                var containerElementId = containerElement ? containerElement.id : null;
                var containerElementRange;
                if (containerElement) {
                    containerElementRange = api.createRange(containerElement);
                    containerElementRange.selectNodeContents(containerElement);
                }

                forEach(ranges, function(range) {
                    var scopedRange = containerElement ? containerElementRange.intersection(range) : range;
                    selCharRanges.push( converter.rangeToCharacterRange(scopedRange, containerElement || getBody(range.getDocument())) );
                });

                return this.highlightCharacterRanges(className, selCharRanges, {
                    containerElementId: containerElementId,
                    exclusive: options.exclusive
                });
            },

            highlightSelection: function(className, options) {
                var converter = this.converter;
                var classApplier = className ? this.classAppliers[className] : false;

                options = createOptions(options, {
                    containerElementId: null,
                    exclusive: true
                });

                var containerElementId = options.containerElementId;
                var exclusive = options.exclusive;
                var selection = options.selection || api.getSelection(this.doc);
                var doc = selection.win.document;
                var containerElement = getContainerElement(doc, containerElementId);

                if (!classApplier && className !== false) {
                    throw new Error("No class applier found for class '" + className + "'");
                }

                // Store the existing selection as character ranges
                var serializedSelection = converter.serializeSelection(selection, containerElement);

                // Create an array of selected character ranges
                var selCharRanges = [];
                forEach(serializedSelection, function(rangeInfo) {
                    selCharRanges.push( CharacterRange.fromCharacterRange(rangeInfo.characterRange) );
                });

                var newHighlights = this.highlightCharacterRanges(className, selCharRanges, {
                    containerElementId: containerElementId,
                    exclusive: exclusive
                });

                // Restore selection
                converter.restoreSelection(selection, serializedSelection, containerElement);

                return newHighlights;
            },

            unhighlightSelection: function(selection) {
                selection = selection || api.getSelection(this.doc);
                var intersectingHighlights = this.getIntersectingHighlights( selection.getAllRanges() );
                this.removeHighlights(intersectingHighlights);
                selection.removeAllRanges();
                return intersectingHighlights;
            },

            getHighlightsInSelection: function(selection) {
                selection = selection || api.getSelection(this.doc);
                return this.getIntersectingHighlights(selection.getAllRanges());
            },

            selectionOverlapsHighlight: function(selection) {
                return this.getHighlightsInSelection(selection).length > 0;
            },

            serialize: function(options) {
                var highlighter = this;
                var highlights = highlighter.highlights;
                var serializedType, serializedHighlights, convertType, serializationConverter;

                highlights.sort(compareHighlights);
                options = createOptions(options, {
                    serializeHighlightText: false,
                    type: highlighter.converter.type
                });

                serializedType = options.type;
                convertType = (serializedType != highlighter.converter.type);

                if (convertType) {
                    serializationConverter = getConverter(serializedType);
                }

                serializedHighlights = ["type:" + serializedType];

                forEach(highlights, function(highlight) {
                    var characterRange = highlight.characterRange;
                    var containerElement;

                    // Convert to the current Highlighter's type, if different from the serialization type
                    if (convertType) {
                        containerElement = highlight.getContainerElement();
                        characterRange = serializationConverter.rangeToCharacterRange(
                            highlighter.converter.characterRangeToRange(highlighter.doc, characterRange, containerElement),
                            containerElement
                        );
                    }

                    var parts = [
                        characterRange.start,
                        characterRange.end,
                        highlight.id,
                        highlight.classApplier.className,
                        highlight.containerElementId
                    ];

                    if (options.serializeHighlightText) {
                        parts.push(highlight.getText());
                    }
                    serializedHighlights.push( parts.join("$") );
                });

                return serializedHighlights.join("|");
            },

            deserialize: function(serialized) {
                var serializedHighlights = serialized.split("|");
                var highlights = [];

                var firstHighlight = serializedHighlights[0];
                var regexResult;
                var serializationType, serializationConverter, convertType = false;
                if ( firstHighlight && (regexResult = /^type:(\w+)$/.exec(firstHighlight)) ) {
                    serializationType = regexResult[1];
                    if (serializationType != this.converter.type) {
                        serializationConverter = getConverter(serializationType);
                        convertType = true;
                    }
                    serializedHighlights.shift();
                } else {
                    throw new Error("Serialized highlights are invalid.");
                }

                var classApplier, highlight, characterRange, containerElementId, containerElement;

                for (var i = serializedHighlights.length, parts; i-- > 0; ) {
                    parts = serializedHighlights[i].split("$");
                    characterRange = new CharacterRange(+parts[0], +parts[1]);
                    containerElementId = parts[4] || null;

                    // Convert to the current Highlighter's type, if different from the serialization type
                    if (convertType) {
                        containerElement = getContainerElement(this.doc, containerElementId);
                        characterRange = this.converter.rangeToCharacterRange(
                            serializationConverter.characterRangeToRange(this.doc, characterRange, containerElement),
                            containerElement
                        );
                    }

                    classApplier = this.classAppliers[ parts[3] ];

                    if (!classApplier) {
                        throw new Error("No class applier found for class '" + parts[3] + "'");
                    }

                    highlight = new Highlight(this.doc, characterRange, classApplier, this.converter, parseInt(parts[2]), containerElementId);
                    highlight.apply();
                    highlights.push(highlight);
                }
                this.highlights = highlights;
            }
        };

        api.Highlighter = Highlighter;

        api.createHighlighter = function(doc, rangeCharacterOffsetConverterType) {
            return new Highlighter(doc, rangeCharacterOffsetConverterType);
        };
    });
    
    return rangy;
}, this);


/***/ }),

/***/ "./webpack-app/vendors/rangy/rangy-webpack.js":
/*!****************************************************!*\
  !*** ./webpack-app/vendors/rangy/rangy-webpack.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rangy_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rangy-core.js */ "./webpack-app/vendors/rangy/rangy-core.js");
/* harmony import */ var _rangy_core_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_rangy_core_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rangy_classapplier_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rangy-classapplier.js */ "./webpack-app/vendors/rangy/rangy-classapplier.js");
/* harmony import */ var _rangy_classapplier_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_rangy_classapplier_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _rangy_highlighter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rangy-highlighter.js */ "./webpack-app/vendors/rangy/rangy-highlighter.js");
/* harmony import */ var _rangy_highlighter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rangy_highlighter_js__WEBPACK_IMPORTED_MODULE_2__);




/* harmony default export */ __webpack_exports__["default"] = (_rangy_core_js__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "./webpack-app/vendors/summernote/font/summernote.eot?4c7e83314b68cfa6a0d18a8b4690044b":
/*!*********************************************************************************************!*\
  !*** ./webpack-app/vendors/summernote/font/summernote.eot?4c7e83314b68cfa6a0d18a8b4690044b ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "http://127.0.0.1:3333/spa/asset/summernote.eot";

/***/ }),

/***/ "./webpack-app/vendors/summernote/font/summernote.ttf?4c7e83314b68cfa6a0d18a8b4690044b":
/*!*********************************************************************************************!*\
  !*** ./webpack-app/vendors/summernote/font/summernote.ttf?4c7e83314b68cfa6a0d18a8b4690044b ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "http://127.0.0.1:3333/spa/asset/summernote.ttf";

/***/ }),

/***/ "./webpack-app/vendors/summernote/font/summernote.woff?4c7e83314b68cfa6a0d18a8b4690044b":
/*!**********************************************************************************************!*\
  !*** ./webpack-app/vendors/summernote/font/summernote.woff?4c7e83314b68cfa6a0d18a8b4690044b ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "http://127.0.0.1:3333/spa/asset/summernote.woff";

/***/ }),

/***/ "./webpack-app/vendors/summernote/summernote-lite.js":
/*!***********************************************************!*\
  !*** ./webpack-app/vendors/summernote/summernote-lite.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Super simple wysiwyg editor v0.8.11
 * https://summernote.org
 *
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license.
 *
 * Date: 2018-11-24T12:13Z
 */
(function (global, factory) {
  //typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  //typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  //(factory(global.jQuery));
  factory($)
  //console.log(typeof($))
  
}(this, (function ($$1) { 
  //'use strict';

  $$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;
  
  var Renderer = /** @class */ (function () {
      function Renderer(markup, children, options, callback) {
          this.markup = markup;
          this.children = children;
          this.options = options;
          this.callback = callback;
      }
      Renderer.prototype.render = function ($parent) {
          var $node = $$1(this.markup);
          if (this.options && this.options.contents) {
              $node.html(this.options.contents);
          }
          if (this.options && this.options.className) {
              $node.addClass(this.options.className);
          }
          if (this.options && this.options.data) {
              $$1.each(this.options.data, function (k, v) {
                  $node.attr('data-' + k, v);
              });
          }
          if (this.options && this.options.click) {
              $node.on('click', this.options.click);
          }
          if (this.children) {
              var $container_1 = $node.find('.note-children-container');
              this.children.forEach(function (child) {
                if (typeof(child.render) === 'function') {
                  child.render($container_1.length ? $container_1 : $node);
                }
              });
          }
          if (this.callback) {
              this.callback($node, this.options);
          }
          if (this.options && this.options.callback) {
              this.options.callback($node);
          }
          if ($parent) {
              $parent.append($node);
          }
          return $node;
      };
      return Renderer;
  }());
  var renderer = {
      create: function (markup, callback) {
          return function () {
              var options = typeof arguments[1] === 'object' ? arguments[1] : arguments[0];
              var children = $$1.isArray(arguments[0]) ? arguments[0] : [];
              if (options && options.children) {
                  children = options.children;
              }
              return new Renderer(markup, children, options, callback);
          };
      }
  };

  var TooltipUI = /** @class */ (function () {
      function TooltipUI($node, options) {
          this.$node = $node;
          this.options = $.extend({}, {
              title: '',
              target: options.container,
              trigger: 'hover focus',
              placement: 'bottom'
          }, options);
          // create tooltip node
          this.$tooltip = $([
              '<div class="note-tooltip in">',
              '  <div class="note-tooltip-arrow"/>',
              '  <div class="note-tooltip-content"/>',
              '</div>'
          ].join(''));
          // define event
          if (this.options.trigger !== 'manual') {
              var showCallback_1 = this.show.bind(this);
              var hideCallback_1 = this.hide.bind(this);
              var toggleCallback_1 = this.toggle.bind(this);
              this.options.trigger.split(' ').forEach(function (eventName) {
                  if (eventName === 'hover') {
                      $node.off('mouseenter mouseleave');
                      $node.on('mouseenter', showCallback_1).on('mouseleave', hideCallback_1);
                  }
                  else if (eventName === 'click') {
                      $node.on('click', toggleCallback_1);
                  }
                  else if (eventName === 'focus') {
                      $node.on('focus', showCallback_1).on('blur', hideCallback_1);
                  }
              });
          }
      }
      TooltipUI.prototype.show = function () {
          var $node = this.$node;
          var offset = $node.offset();
          var $tooltip = this.$tooltip;
          var title = this.options.title || $node.attr('title') || $node.data('title');
          var placement = this.options.placement || $node.data('placement');
          $tooltip.addClass(placement);
          $tooltip.addClass('in');
          $tooltip.find('.note-tooltip-content').text(title);
          $tooltip.appendTo(this.options.target);
          var nodeWidth = $node.outerWidth();
          var nodeHeight = $node.outerHeight();
          var tooltipWidth = $tooltip.outerWidth();
          var tooltipHeight = $tooltip.outerHeight();
          if (placement === 'bottom') {
              $tooltip.css({
                  top: offset.top + nodeHeight,
                  left: offset.left + (nodeWidth / 2 - tooltipWidth / 2)
              });
          }
          else if (placement === 'top') {
              $tooltip.css({
                  top: offset.top - tooltipHeight,
                  left: offset.left + (nodeWidth / 2 - tooltipWidth / 2)
              });
          }
          else if (placement === 'left') {
              $tooltip.css({
                  top: offset.top + (nodeHeight / 2 - tooltipHeight / 2),
                  left: offset.left - tooltipWidth
              });
          }
          else if (placement === 'right') {
              $tooltip.css({
                  top: offset.top + (nodeHeight / 2 - tooltipHeight / 2),
                  left: offset.left + nodeWidth
              });
          }
      };
      TooltipUI.prototype.hide = function () {
          this.$tooltip.removeClass('in');
          this.$tooltip.remove();
      };
      TooltipUI.prototype.toggle = function () {
          if (this.$tooltip.hasClass('in')) {
              this.hide();
          }
          else {
              this.show();
          }
      };
      return TooltipUI;
  }());

  var DropdownUI = /** @class */ (function () {
      function DropdownUI($node, options) {
          this.$button = $node;
          this.options = $.extend({}, {
              target: options.container
          }, options);
          this.setEvent();
      }
      DropdownUI.prototype.setEvent = function () {
          var _this = this;
          this.$button.on('click', function (e) {
              _this.toggle();
              e.stopImmediatePropagation();
          });
      };
      DropdownUI.prototype.clear = function () {
          var $parent = $('.note-btn-group.open');
          $parent.find('.note-btn.active').removeClass('active');
          $parent.removeClass('open');
      };
      DropdownUI.prototype.show = function () {
          this.$button.addClass('active');
          this.$button.parent().addClass('open');
          var $dropdown = this.$button.next();
          var offset = $dropdown.offset();
          var width = $dropdown.outerWidth();
          var windowWidth = $$1(window).width();
          var targetMarginRight = parseFloat($$1(this.options.target).css('margin-right'));
          if (offset.left + width > windowWidth - targetMarginRight) {
              $dropdown.css('margin-left', windowWidth - targetMarginRight - (offset.left + width));
          }
          else {
              $dropdown.css('margin-left', '');
          }
      };
      DropdownUI.prototype.hide = function () {
          this.$button.removeClass('active');
          this.$button.parent().removeClass('open');
      };
      DropdownUI.prototype.toggle = function () {
          var isOpened = this.$button.parent().hasClass('open');
          this.clear();
          if (isOpened) {
              this.hide();
          }
          else {
              this.show();
          }
      };
      return DropdownUI;
  }());
  $$1(document).on('click', function (e) {
      if (!$(e.target).closest('.note-btn-group').length) {
          $('.note-btn-group.open').removeClass('open');
      }
  });
  $$1(document).on('click.note-dropdown-menu', function (e) {
      $(e.target).closest('.note-dropdown-menu').parent().removeClass('open');
  });

  var ModalUI = /** @class */ (function () {
      function ModalUI($node, options) {
          this.options = $.extend({}, {
              target: options.container || 'body'
          }, options);
          this.$modal = $node;
          this.$backdrop = $('<div class="note-modal-backdrop" />');
          let contentChildren = this.$modal.find(".note-modal-content > *")
          let enableClickHide = true
          contentChildren.mousedown((event) => {
            //event.stopPropagation()
            enableClickHide = false
          })
          contentChildren.mouseup((event) => {
            enableClickHide = true
          })
          this.$modal.mouseup((event) => {
            setTimeout(() => {
              enableClickHide = true
            }, 10)
          })
          
          this.$modal.click((event) => {
            //event.stopPropagation()
            //event.preventDefault()
            
            //console.log(event.target)
            //console.log($$1(event.target).prop('className'))
            //console.log(event)
            if (enableClickHide && $$1(event.target).hasClass('note-modal')) {
              this.hide()
            }
          })
      }
      ModalUI.prototype.show = function () {
          if (this.options.target === 'body') {
              this.$backdrop.css('position', 'fixed');
              this.$modal.css('position', 'fixed');
          }
          else {
              this.$backdrop.css('position', 'absolute');
              this.$modal.css('position', 'absolute');
          }
          this.$backdrop.appendTo(this.options.target).show();
          this.$modal.appendTo(this.options.target).addClass('open').show();
          this.$modal.trigger('note.modal.show');
          this.$modal.off('click', '.close').on('click', '.close', this.hide.bind(this));
      };
      ModalUI.prototype.hide = function () {
          this.$modal.removeClass('open').hide();
          this.$backdrop.hide();
          this.$modal.trigger('note.modal.hide');
      };
      return ModalUI;
  }());

  var editor = renderer.create('<div class="note-editor note-frame"/>');
  var toolbar = renderer.create('<div class="note-toolbar" role="toolbar"/>');
  var editingArea = renderer.create('<div class="note-editing-area"/>');
  var codable = renderer.create('<textarea class="note-codable" role="textbox" aria-multiline="true"/>');
  var editable = renderer.create('<div class="note-editable show-heading-label" contentEditable="true" role="textbox" aria-multiline="true"/>');
  var statusbar = renderer.create([
      '<output class="note-status-output" role="status" aria-live="polite"/>',
      '<div class="note-statusbar" role="resize">',
      '  <div class="note-resizebar" role="seperator" aria-orientation="horizontal" aria-label="resize">',
      '    <div class="note-icon-bar"/>',
      '    <div class="note-icon-bar"/>',
      '    <div class="note-icon-bar"/>',
      '  </div>',
      '</div>'
  ].join(''));
  var airEditor = renderer.create('<div class="note-editor"/>');
  var airEditable = renderer.create([
      '<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>',
      '<output class="note-status-output" role="status" aria-live="polite"/>'
  ].join(''));
  var buttonGroup = renderer.create('<div class="note-btn-group">');
  var button = renderer.create('<button type="button" class="note-btn" role="button" tabindex="-1">', function ($node, options) {
      // set button type
      
      if (typeof(options) === 'object' 
              && typeof(options.tooltip) === 'string') {
        
          if (typeof(options.container) === 'undefined') {
            options.container = 'body'
          }
        
          $node.attr({
              'aria-label': options.tooltip
          });
          $node.data('_lite_tooltip', new TooltipUI($node, {
              title: options.tooltip,
              container: options.container
          }));
          
      }
      if (options.contents) {
          $node.html(options.contents);
      }
      if (options && options.data && options.data.toggle === 'dropdown') {
          $node.data('_lite_dropdown', new DropdownUI($node, {
              container: options.container
          }));
      }
      /*
      if (typeof(options.keyMap) === 'string' 
              && typeof(options.click) === 'function') {
        console.log(options.keyMap)
        console.log(_this.options.keyMap)
        console.log(_this.context)
        //var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
        //keyMap[options.keyMap] = options.click
      }
      */
  });
  var dropdown = renderer.create('<div class="note-dropdown-menu" role="list">', function ($node, options) {
      var markup = $.isArray(options.items) ? options.items.map(function (item) {
          var value = (typeof item === 'string') ? item : (item.value || '');
          var content = options.template ? options.template(item) : item;
          let areaLabel = item
          if (typeof(areaLabel) === 'object' && typeof(areaLabel.title) === 'string') {
            areaLabel = areaLabel.title
          } 
          var $temp = $('<a class="note-dropdown-item" href="#" data-value="' + value + '" role="listitem" aria-label="' + areaLabel + '"></a>');
          $temp.html(content).data('item', item);
          return $temp;
      }) : options.items;
      $node.html(markup).attr({ 'aria-label': options.title });
      $node.on('click', '> .note-dropdown-item', function (e) {
          var $a = $(this);
          var item = $a.data('item');
          var value = $a.data('value');
          if (item.click) {
              item.click($a);
          }
          else if (options.itemClick) {
              options.itemClick(e, item, value);
          }
      });
  });
  var dropdownCheck = renderer.create('<div class="note-dropdown-menu note-check" role="list">', function ($node, options) {
      var markup = $.isArray(options.items) ? options.items.map(function (item) {
          var value = (typeof item === 'string') ? item : (item.value || '');
          var content = options.template ? options.template(item) : item;
          var $temp = $('<a class="note-dropdown-item" href="#" data-value="' + value + '" role="listitem" aria-label="' + item + '"></a>');
          $temp.html([icon(options.checkClassName), ' ', content]).data('item', item);
          return $temp;
      }) : options.items;
      $node.html(markup).attr({ 'aria-label': options.title });
      $node.on('click', '> .note-dropdown-item', function (e) {
          var $a = $(this);
          var item = $a.data('item');
          var value = $a.data('value');
          if (item.click) {
              item.click($a);
          }
          else if (options.itemClick) {
              options.itemClick(e, item, value);
          }
          //console.log('set color')
      });
  });
  var dropdownButtonContents = function (contents, options) {
      return contents + ' ' + icon(options.icons.caret, 'span');
  };
  var dropdownButton = function (opt, callback) {
      return buttonGroup([
          button({
              className: 'dropdown-toggle',
              contents: opt.title + ' ' + icon('note-icon-caret'),
              tooltip: opt.tooltip,
              data: {
                  toggle: 'dropdown'
              }
          }),
          dropdown({
              className: opt.className,
              items: opt.items,
              template: opt.template,
              itemClick: opt.itemClick
          })
      ], { callback: callback }).render();
  };
  var dropdownCheckButton = function (opt, callback) {
      return buttonGroup([
          button({
              className: 'dropdown-toggle',
              contents: opt.title + ' ' + icon('note-icon-caret'),
              tooltip: opt.tooltip,
              data: {
                  toggle: 'dropdown'
              }
          }),
          dropdownCheck({
              className: opt.className,
              checkClassName: opt.checkClassName,
              items: opt.items,
              template: opt.template,
              itemClick: opt.itemClick
          })
      ], { callback: callback }).render();
  };
  var paragraphDropdownButton = function (opt) {
      return buttonGroup([
          button({
              className: 'dropdown-toggle',
              contents: opt.title + ' ' + icon('note-icon-caret'),
              tooltip: opt.tooltip,
              data: {
                  toggle: 'dropdown'
              }
          }),
          dropdown([
              buttonGroup({
                  className: 'note-align',
                  children: opt.items[0]
              }),
              buttonGroup({
                  className: 'note-list',
                  children: opt.items[1]
              })
          ])
      ]).render();
  };
  var tableMoveHandler = function (event, col, row) {
      var PX_PER_EM = 18;
      var $picker = $(event.target.parentNode); // target is mousecatcher
      var $dimensionDisplay = $picker.next();
      var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
      var $highlighted = $picker.find('.note-dimension-picker-highlighted');
      var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');
      var posOffset;
      // HTML5 with jQuery - e.offsetX is undefined in Firefox
      if (event.offsetX === undefined) {
          var posCatcher = $(event.target).offset();
          posOffset = {
              x: event.pageX - posCatcher.left,
              y: event.pageY - posCatcher.top
          };
      }
      else {
          posOffset = {
              x: event.offsetX,
              y: event.offsetY
          };
      }
      var dim = {
          c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
          r: Math.ceil(posOffset.y / PX_PER_EM) || 1
      };
      $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });
      $catcher.data('value', dim.c + 'x' + dim.r);
      if (dim.c > 3 && dim.c < col) {
          $unhighlighted.css({ width: dim.c + 1 + 'em' });
      }
      if (dim.r > 3 && dim.r < row) {
          $unhighlighted.css({ height: dim.r + 1 + 'em' });
      }
      $dimensionDisplay.html(dim.c + ' x ' + dim.r);
  };
  var tableDropdownButton = function (opt) {
      return buttonGroup([
          button({
              className: 'dropdown-toggle',
              contents: opt.title + ' ' + icon('note-icon-caret'),
              tooltip: opt.tooltip,
              data: {
                  toggle: 'dropdown'
              }
          }),
          dropdown({
              className: 'note-table',
              items: [
                  '<div class="note-dimension-picker">',
                  '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>',
                  '  <div class="note-dimension-picker-highlighted"/>',
                  '  <div class="note-dimension-picker-unhighlighted"/>',
                  '</div>',
                  '<div class="note-dimension-display">1 x 1</div>'
              ].join('')
          })
      ], {
          callback: function ($node) {
              var $catcher = $node.find('.note-dimension-picker-mousecatcher');
              $catcher.css({
                  width: opt.col + 'em',
                  height: opt.row + 'em'
              })
                  .mousedown(opt.itemClick)
                  .mousemove(function (e) {
                  tableMoveHandler(e, opt.col, opt.row);
              });
          }
      }).render();
  };
  var palette = renderer.create('<div class="note-color-palette"/>', function ($node, options) {
      var contents = [];
      for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
          var eventName = options.eventName;
          var colors = options.colors[row];
          var colorsName = options.colorsName[row];
          var buttons = [];
          for (var col = 0, colSize = colors.length; col < colSize; col++) {
              var color = colors[col];
              var colorName = colorsName[col];
              buttons.push([
                  '<button type="button" class="note-btn note-color-btn"',
                  'style="background-color:', color, '" ',
                  'data-event="', eventName, '" ',
                  'data-value="', color, '" ',
                  'title="', colorName, '" ',
                  'aria-label="', colorName, '" ',
                  'data-toggle="button" tabindex="-1"></button>'
              ].join(''));
          }
          contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
      }
      $node.html(contents.join(''));
      $node.find('.note-color-btn').each(function () {
          $(this).data('_lite_tooltip', new TooltipUI($(this), {
              container: options.container
          }));
      });
  });
  var colorDropdownButton = function (opt, type) {
      return buttonGroup({
          className: 'note-color',
          children: [
              button({
                  className: 'note-current-color-button',
                  contents: opt.title,
                  tooltip: opt.lang.color.recent,
                  click: opt.currentClick,
                  callback: function ($button) {
                      var $recentColor = $button.find('.note-recent-color');
                      if (type !== 'foreColor') {
                          $recentColor.css('background-color', '#FFFF00');
                          $button.attr('data-backColor', '#FFFF00');
                      }
                  }
              }),
              button({
                  className: 'dropdown-toggle',
                  contents: icon('note-icon-caret'),
                  tooltip: opt.lang.color.more,
                  data: {
                      toggle: 'dropdown'
                  }
              }),
              dropdown({
                  items: [
                      '<div>',
                      '<div class="note-btn-group btn-background-color">',
                      '  <div class="note-palette-title">' + opt.lang.color.background + '</div>',
                      '  <div>',
                      '<button type="button" class="note-color-reset note-btn note-btn-block" ' +
                          ' data-event="backColor" data-value="inherit">',
                      opt.lang.color.transparent,
                      '    </button>',
                      '  </div>',
                      '  <div class="note-holder" data-event="backColor"/>',
                      '  <div class="btn-sm">',
                      '    <input type="color" id="html5bcp" class="note-btn btn-default" value="#21104A" style="width:100%;" data-value="cp">',
                      '    <button type="button" class="note-color-reset btn" data-event="backColor" data-value="cpbackColor">',
                      opt.lang.color.cpSelect,
                      '    </button>',
                      '  </div>',
                      '</div>',
                      '<div class="note-btn-group btn-foreground-color">',
                      '  <div class="note-palette-title">' + opt.lang.color.foreground + '</div>',
                      '  <div>',
                      '<button type="button" class="note-color-reset note-btn note-btn-block" ' +
                          ' data-event="removeFormat" data-value="foreColor">',
                      opt.lang.color.resetToDefault,
                      '    </button>',
                      '  </div>',
                      '  <div class="note-holder" data-event="foreColor"/>',
                      '  <div class="btn-sm">',
                      '    <input type="color" id="html5fcp" class="note-btn btn-default" value="#21104A" style="width:100%;" data-value="cp">',
                      '    <button type="button" class="note-color-reset btn" data-event="foreColor" data-value="cpforeColor">',
                      opt.lang.color.cpSelect,
                      '    </button>',
                      '  </div>',
                      '</div>',
                      '</div>'
                  ].join(''),
                  callback: function ($dropdown) {
                      $dropdown.find('.note-holder').each(function () {
                          var $holder = $(this);
                          $holder.append(palette({
                              colors: opt.colors,
                              eventName: $holder.data('event')
                          }).render());
                      });
                      if (type === 'fore') {
                          $dropdown.find('.btn-background-color').hide();
                          $dropdown.css({ 'min-width': '210px' });
                      }
                      else if (type === 'back') {
                          $dropdown.find('.btn-foreground-color').hide();
                          $dropdown.css({ 'min-width': '210px' });
                      }
                  },
                  click: function (event) {
                    //console.log('set color')
                    
                      var $button = $(event.target);
                      var eventName = $button.data('event');
                      var value = $button.data('value');
                      var foreinput = document.getElementById('html5fcp').value;
                      var backinput = document.getElementById('html5bcp').value;
                      if (value === 'cp') {
                          event.stopPropagation();
                      }
                      else if (value === 'cpbackColor') {
                          value = backinput;
                      }
                      else if (value === 'cpforeColor') {
                          value = foreinput;
                      }
                      if (eventName && value) {
                          var key = eventName === 'backColor' ? 'background-color' : 'color';
                          var $color = $button.closest('.note-color').find('.note-recent-color');
                          var $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                          $color.css(key, value);
                          $currentButton.attr('data-' + eventName, value);
                          if (type === 'fore') {
                              opt.itemClick('foreColor', value);
                          }
                          else if (type === 'back') {
                              opt.itemClick('backColor', value);
                          }
                          else {
                              opt.itemClick(eventName, value);
                          }
                      }
                  }
              })
          ]
      }).render();
  };
  var dialog = renderer.create('<div class="note-modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function ($node, options) {
      if (options.fade) {
        $node.addClass('fade');
      }
      $node.attr({
        'aria-label': options.title
      });
      $node.html([
          '  <div class="note-modal-content">',
          (options.title
              ? '    <div class="note-modal-header">' +
                  '      <button type="button" class="close" aria-label="Close" aria-hidden="true"><i class="note-icon-close"></i></button>' +
                  '      <h4 class="note-modal-title">' + options.title + '</h4>' +
                  '    </div>' : ''),
          '    <div class="note-modal-body">' + options.body + '</div>',
          (options.footer
              ? '    <div class="note-modal-footer">' + options.footer + '</div>' : ''),
          '  </div>'
      ].join(''));
      $node.data('modal', new ModalUI($node, options));
  });
  var videoDialog = function (opt) {
      var body = '<div class="note-form-group">' +
          '<label class="note-form-label">' +
          opt.lang.video.url + ' <small class="text-muted">' +
          opt.lang.video.providers + '</small>' +
          '</label>' +
          '<input class="note-video-url note-input" type="text" />' +
          '</div>';
      var footer = [
          '<button type="button" href="#" class="note-btn note-btn-primary note-video-btn disabled" disabled>',
          opt.lang.video.insert,
          '</button>'
      ].join('');
      return dialog({
          title: opt.lang.video.insert,
          fade: opt.fade,
          body: body,
          footer: footer
      }).render();
  };
  var imageDialog = function (opt) {
      var body = '<div class="note-form-group note-group-select-from-files">' +
          '<label class="note-form-label">' + opt.lang.image.selectFromFiles + '</label>' +
          '<input class="note-note-image-input note-input" type="file" name="files" accept="image/*" multiple="multiple" />' +
          opt.imageLimitation +
          '</div>' +
          '<div class="note-form-group" style="overflow:auto;">' +
          '<label class="note-form-label">' + opt.lang.image.url + '</label>' +
          '<input class="note-image-url note-input" type="text" />' +
          '</div>';
      var footer = [
          '<button href="#" type="button" class="note-btn note-btn-primary note-btn-large note-image-btn disabled" disabled>',
          opt.lang.image.insert,
          '</button>'
      ].join('');
      return dialog({
          title: opt.lang.image.insert,
          fade: opt.fade,
          body: body,
          footer: footer
      }).render();
  };
  var linkDialog = function (opt) {
      var body = '<div class="note-form-group">' +
          '<label class="note-form-label">' + opt.lang.link.textToDisplay + '</label>' +
          '<input class="note-link-text note-input" type="text" />' +
          '</div>' +
          '<div class="note-form-group">' +
          '<label class="note-form-label">' + opt.lang.link.url + '</label>' +
          '<input class="note-link-url note-input" type="text" value="http://" />' +
          '</div>' +
          (!opt.disableLinkTarget
              ? '<div class="checkbox">' +
                  '<label>' + '<input type="checkbox" checked> ' + opt.lang.link.openInNewWindow + '</label>' +
                  // '<label>' + '<input type="radio" name="openMethod" value="current"> ' + opt.lang.link.openInCurrentWindow + '</label>' +
                  // '<label>' + '<input type="radio" name="openMethod" value="blank" checked> ' + opt.lang.link.openInNewWindow + '</label>' +
                  // '<label>' + '<input type="radio" name="openMethod" value="popup"> ' + opt.lang.link.openInPopup + '</label>' +
                  '</div>' : '');
      var footer = [
          '<button href="#" type="button" class="note-btn note-btn-primary note-link-btn disabled" disabled>',
          opt.lang.link.insert,
          '</button>'
      ].join('');
      return dialog({
          className: 'link-dialog',
          title: opt.lang.link.insert,
          fade: opt.fade,
          body: body,
          footer: footer
      }).render();
  };
  var popover = renderer.create([
      '<div class="note-popover bottom">',
      '  <div class="note-popover-arrow"/>',
      '  <div class="popover-content note-children-container"/>',
      '</div>'
  ].join(''), function ($node, options) {
      var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';
      $node.addClass(direction).hide();
      if (options.hideArrow) {
          $node.find('.note-popover-arrow').hide();
      }
  });
  var checkbox = renderer.create('<div class="checkbox"></div>', function ($node, options) {
      $node.html([
          '<label' + (options.id ? ' for="' + options.id + '"' : '') + '>',
          ' <input role="checkbox" type="checkbox"' + (options.id ? ' id="' + options.id + '"' : ''),
          (options.checked ? ' checked' : ''),
          ' aria-checked="' + (options.checked ? 'true' : 'false') + '"/>',
          (options.text ? options.text : ''),
          '</label>'
      ].join(''));
  });
  var radio = renderer.create('<div class="radio"></div>', function ($node, id, options) {
      let html = []
      if (Array.isArray(options)) {
        html = options.map((option, i) => {
          return [
            '<label' + ((id + i) ? ' for="' + (id + i) + '"' : '') + '>',
            ' <input role="radio" type="radio"' + ((id + i) ? ' value="' + option.value + '" id="' + (id + i) + '"' : ''),
            (option.checked ? ' checked' : ''),
            ' aria-checked="' + (option.checked ? 'true' : 'false') + '"/>',
            (option.text ? option.text : ''),
            '</label>'
        ].join('')
        })
      }
      $node.html(html.join(''))
  });
  var icon = function (iconClassName, tagName) {
      tagName = tagName || 'i';
      return '<' + tagName + ' class="' + iconClassName + '"/>';
  };
  var ui = {
      editor: editor,
      toolbar: toolbar,
      editingArea: editingArea,
      codable: codable,
      editable: editable,
      statusbar: statusbar,
      airEditor: airEditor,
      airEditable: airEditable,
      buttonGroup: buttonGroup,
      button: button,
      dropdown: dropdown,
      dropdownCheck: dropdownCheck,
      dropdownButton: dropdownButton,
      dropdownButtonContents: dropdownButtonContents,
      dropdownCheckButton: dropdownCheckButton,
      paragraphDropdownButton: paragraphDropdownButton,
      tableDropdownButton: tableDropdownButton,
      colorDropdownButton: colorDropdownButton,
      palette: palette,
      dialog: dialog,
      videoDialog: videoDialog,
      imageDialog: imageDialog,
      linkDialog: linkDialog,
      popover: popover,
      checkbox: checkbox,
      radio: radio,
      icon: icon,
      toggleBtn: function ($btn, isEnable) {
          $btn.toggleClass('disabled', !isEnable);
          $btn.attr('disabled', !isEnable);
      },
      toggleBtnActive: function ($btn, isActive) {
          $btn.toggleClass('active', isActive);
      },
      check: function ($dom, value) {
          $dom.find('.checked').removeClass('checked');
          $dom.find('[data-value="' + value + '"]').addClass('checked');
      },
      onDialogShown: function ($dialog, handler) {
          $dialog.one('note.modal.show', handler);
      },
      onDialogHidden: function ($dialog, handler) {
          $dialog.one('note.modal.hide', handler);
      },
      showDialog: function ($dialog) {
          $dialog.data('modal').show();
      },
      hideDialog: function ($dialog) {
          $dialog.data('modal').hide();
      },
      /**
       * get popover content area
       *
       * @param $popover
       * @returns {*}
       */
      getPopoverContent: function ($popover) {
          return $popover.find('.note-popover-content');
      },
      /**
       * get dialog's body area
       *
       * @param $dialog
       * @returns {*}
       */
      getDialogBody: function ($dialog) {
          return $dialog.find('.note-modal-body');
      },
      createLayout: function ($note, options) {
          var $editor = (options.airMode ? ui.airEditor([
              ui.editingArea([
                  ui.airEditable()
              ])
          ]) : ui.editor([
              ui.toolbar(),
              ui.editingArea([
                  ui.codable(),
                  ui.editable()
              ]),
              ui.statusbar()
          ])).render();
          $editor.insertAfter($note);
          return {
              note: $note,
              editor: $editor,
              toolbar: $editor.find('.note-toolbar'),
              editingArea: $editor.find('.note-editing-area'),
              editable: $editor.find('.note-editable'),
              codable: $editor.find('.note-codable'),
              statusbar: $editor.find('.note-statusbar')
          };
      },
      removeLayout: function ($note, layoutInfo) {
          $note.html(layoutInfo.editable.html());
          layoutInfo.editor.remove();
          $note.off('summernote'); // remove summernote custom event
          $note.show();
      }
  };

  $$1.summernote = $$1.summernote || {
      lang: {}
  };
  $$1.extend($$1.summernote.lang, {
      'en-US': {
          font: {
              bold: 'Bold',
              italic: 'Italic',
              underline: 'Underline',
              clear: 'Remove Font Style',
              height: 'Line Height',
              name: 'Font Family',
              strikethrough: 'Strikethrough',
              comment: 'Comment',
              uncomment: 'Uncomment',
              htmlify: 'Htmlify',
              textify: 'Textify',
              iframe: 'Iframe',
              subscript: 'Subscript',
              superscript: 'Superscript',
              size: 'Font Size'
          },
          image: {
              image: 'Picture',
              insert: 'Insert Image',
              resizeFull: 'Resize Full',
              resizeHalf: 'Resize Half',
              resizeQuarter: 'Resize Quarter',
              floatLeft: 'Float Left',
              floatRight: 'Float Right',
              floatNone: 'Float None',
              shapeRounded: 'Shape: Rounded',
              shapeCircle: 'Shape: Circle',
              shapeThumbnail: 'Shape: Thumbnail',
              shapeNone: 'Shape: None',
              dragImageHere: 'Drag image or text here',
              dropImage: 'Drop image or Text',
              selectFromFiles: 'Select from files',
              maximumFileSize: 'Maximum file size',
              maximumFileSizeError: 'Maximum file size exceeded.',
              url: 'Image URL',
              remove: 'Remove Image',
              open: 'Open Image',
              save: 'Save Image',
              copy: 'Copy URL',
              original: 'Original'
          },
          video: {
              video: 'Video',
              videoLink: 'Video Link',
              insert: 'Insert Video',
              url: 'Video URL',
              providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'
          },
          link: {
              link: 'Link',
              insert: 'Insert Link',
              unlink: 'Unlink',
              edit: 'Edit',
              textToDisplay: 'Text to display',
              url: 'To what URL should this link go?',
              title: 'Link title (optional)',
              openInCurrentWindow: 'Open in current window',
              openInNewWindow: 'Open in new window',
              openInPopup: 'Open in popup',
              remove: 'Remove'
          },
          comment: {
              dialogTitle: 'Edit Comment',
              remove: 'Remove',
              update: 'Update'
          },
          table: {
              table: 'Table',
              addRowAbove: 'Add row above',
              addRowBelow: 'Add row below',
              addColLeft: 'Add column left',
              addColRight: 'Add column right',
              delRow: 'Delete row',
              delCol: 'Delete column',
              delTable: 'Delete table'
          },
          hr: {
              insert: 'Insert Horizontal Rule'
          },
          style: {
              style: 'Style',
              p: 'Normal',
              blockquote: 'Quote',
              pre: 'pre',
              code: 'Code',
              h1: 'Header 1',
              h2: 'Header 2',
              h3: 'Header 3',
              h4: 'Header 4',
              h5: 'Header 5',
              h6: 'Header 6',
              formatPara: "Format as <p>",
              formatCode: "Format as <code>",
              formatH1: "Format as <h1>",
              formatH2: "Format as <h2>",
              formatH3: "Format as <h3>",
              formatH4: "Format as <h4>",
              formatH5: "Format as <h5>",
              formatH6: "Format as <h6>",
          },
          lists: {
              unordered: 'Unordered list',
              ordered: 'Ordered list'
          },
          options: {
              help: 'Help',
              fullscreen: 'Full Screen',
              codeview: 'Code View'
          },
          paragraph: {
              paragraph: 'Paragraph',
              outdent: 'Outdent',
              indent: 'Indent',
              left: 'Align left',
              center: 'Align center',
              right: 'Align right',
              justify: 'Justify full'
          },
          color: {
              recent: 'Recent Color',
              more: 'More Color',
              background: 'Background Color',
              foreground: 'Foreground Color',
              transparent: 'Transparent',
              setTransparent: 'Set transparent',
              reset: 'Reset',
              resetToDefault: 'Reset to default',
              cpSelect: 'Select'
          },
          shortcut: {
              shortcuts: 'Keyboard shortcuts',
              close: 'Close',
              textFormatting: 'Text formatting',
              action: 'Action',
              paragraphFormatting: 'Paragraph formatting',
              documentStyle: 'Document Style',
              extraKeys: 'Extra keys'
          },
          help: {
              'insertParagraph': 'Insert Paragraph',
              'undo': 'Undoes the last command',
              'redo': 'Redoes the last command',
              'tab': 'Tab',
              'untab': 'Untab',
              'bold': 'Set a bold style',
              'italic': 'Set a italic style',
              'underline': 'Set a underline style',
              'strikethrough': 'Set a strikethrough style',
              'comment': 'Add a comment',
              'uncomment': 'Remove comments',
              'htmlify': 'Convert selection to html',
              'textify': 'Convert selection to text',
              'SaveSnippet': 'Cut selected text as a snippet',
              'removeFormat': 'Clean a style',
              'justifyLeft': 'Set left align',
              'justifyCenter': 'Set center align',
              'justifyRight': 'Set right align',
              'justifyFull': 'Set full align',
              'insertUnorderedList': 'Toggle unordered list',
              'insertOrderedList': 'Toggle ordered list',
              'outdent': 'Outdent on current paragraph',
              'indent': 'Indent on current paragraph',
              'formatPara': 'Change current block\'s format as a paragraph(P tag)',
              'formatH1': 'Change current block\'s format as H1',
              'formatH2': 'Change current block\'s format as H2',
              'formatH3': 'Change current block\'s format as H3',
              'formatH4': 'Change current block\'s format as H4',
              'formatH5': 'Change current block\'s format as H5',
              'formatH6': 'Change current block\'s format as H6',
              'insertHorizontalRule': 'Insert horizontal rule',
              'linkDialog.show': 'Show Link Dialog',
              'iframeDialog.show': 'Show Iframe Dialog',
              'commentDialog.show': 'Show Comment Dialog'
          },
          history: {
              undo: 'Undo',
              redo: 'Redo'
          },
          specialChar: {
              specialChar: 'SPECIAL CHARACTERS',
              select: 'Select Special characters'
          },
          iframe: {
            title: "Title (optional)",
            url: "URL",
            insert: "Insert iframe",
            newWindow: "Open in new window",
            popupWindow: "Open in popup window"
          }
      }
  });

  var isSupportAmd =  true && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js"); // eslint-disable-line
  /**
   * returns whether font is installed or not.
   *
   * @param {String} fontName
   * @return {Boolean}
   */
  function isFontInstalled(fontName) {
      var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
      var $tester = $$1('<div>').css({
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          fontSize: '200px'
      }).text('mmmmmmmmmwwwwwww').appendTo(document.body);
      var originalWidth = $tester.css('fontFamily', testFontName).width();
      var width = $tester.css('fontFamily', fontName + ',' + testFontName).width();
      $tester.remove();
      return originalWidth !== width;
  }
  var userAgent = navigator.userAgent;
  var isMSIE = /MSIE|Trident/i.test(userAgent);
  var browserVersion;
  if (isMSIE) {
      var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
      if (matches) {
          browserVersion = parseFloat(matches[1]);
      }
      matches = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(userAgent);
      if (matches) {
          browserVersion = parseFloat(matches[1]);
      }
  }
  var isEdge = /Edge\/\d+/.test(userAgent);
  var hasCodeMirror = !!window.CodeMirror;
  if (!hasCodeMirror && isSupportAmd) {
      hasCodeMirror = false;
      /*
      // Webpack
      if (typeof __webpack_require__ === 'function') { // eslint-disable-line
          try {
              // If CodeMirror can't be resolved, `require.resolve` will throw an
              // exception and `hasCodeMirror` won't be set to `true`.
              require.resolve('codemirror');
              hasCodeMirror = true;
          }
          catch (e) {
              // do nothing
          }
      }
      else if (typeof require !== 'undefined') {
          // Browserify
          if (typeof require.resolve !== 'undefined') {
              try {
                  // If CodeMirror can't be resolved, `require.resolve` will throw an
                  // exception and `hasCodeMirror` won't be set to `true`.
                  require.resolve('codemirror');
                  hasCodeMirror = true;
              }
              catch (e) {
                  // do nothing
              }
              // Almond/Require
          }
          else if (typeof require.specified !== 'undefined') {
              hasCodeMirror = require.specified('codemirror');
          }
      }
      */
  }
  var isSupportTouch = (('ontouchstart' in window) ||
      (navigator.MaxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  // [workaround] IE doesn't have input events for contentEditable
  // - see: https://goo.gl/4bfIvA
  var inputEventName = (isMSIE || isEdge) ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';
  /**
   * @class core.env
   *
   * Object which check platform and agent
   *
   * @singleton
   * @alternateClassName env
   */
  var env = {
      isMac: navigator.appVersion.indexOf('Mac') > -1,
      isMSIE: isMSIE,
      isEdge: isEdge,
      isFF: !isEdge && /firefox/i.test(userAgent),
      isPhantom: /PhantomJS/i.test(userAgent),
      isWebkit: !isEdge && /webkit/i.test(userAgent),
      isChrome: !isEdge && /chrome/i.test(userAgent),
      isSafari: !isEdge && /safari/i.test(userAgent),
      browserVersion: browserVersion,
      jqueryVersion: parseFloat($$1.fn.jquery),
      isSupportAmd: isSupportAmd,
      isSupportTouch: isSupportTouch,
      hasCodeMirror: hasCodeMirror,
      isFontInstalled: isFontInstalled,
      isW3CRangeSupport: !!document.createRange,
      inputEventName: inputEventName
  };

  /**
   * @class core.func
   *
   * func utils (for high-order func's arg)
   *
   * @singleton
   * @alternateClassName func
   */
  function eq(itemA) {
      return function (itemB) {
          return itemA === itemB;
      };
  }
  function eq2(itemA, itemB) {
      return itemA === itemB;
  }
  function peq2(propName) {
      return function (itemA, itemB) {
          return itemA[propName] === itemB[propName];
      };
  }
  function ok() {
      return true;
  }
  function fail() {
      return false;
  }
  function not(f) {
      return function () {
          return !f.apply(f, arguments);
      };
  }
  function and(fA, fB) {
      return function (item) {
          return fA(item) && fB(item);
      };
  }
  function self(a) {
      return a;
  }
  function invoke(obj, method) {
      return function () {
          return obj[method].apply(obj, arguments);
      };
  }
  var idCounter = 0;
  /**
   * generate a globally-unique id
   *
   * @param {String} [prefix]
   */
  function uniqueId(prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
  }
  /**
   * returns bnd (bounds) from rect
   *
   * - IE Compatibility Issue: http://goo.gl/sRLOAo
   * - Scroll Issue: http://goo.gl/sNjUc
   *
   * @param {Rect} rect
   * @return {Object} bounds
   * @return {Number} bounds.top
   * @return {Number} bounds.left
   * @return {Number} bounds.width
   * @return {Number} bounds.height
   */
  function rect2bnd(rect) {
      var $document = $(document);
      return {
          top: rect.top + $document.scrollTop(),
          left: rect.left + $document.scrollLeft(),
          width: rect.right - rect.left,
          height: rect.bottom - rect.top
      };
  }
  /**
   * returns a copy of the object where the keys have become the values and the values the keys.
   * @param {Object} obj
   * @return {Object}
   */
  function invertObject(obj) {
      var inverted = {};
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              inverted[obj[key]] = key;
          }
      }
      return inverted;
  }
  /**
   * @param {String} namespace
   * @param {String} [prefix]
   * @return {String}
   */
  function namespaceToCamel(namespace, prefix) {
      prefix = prefix || '';
      return prefix + namespace.split('.').map(function (name) {
          return name.substring(0, 1).toUpperCase() + name.substring(1);
      }).join('');
  }
  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   * @param {Function} func
   * @param {Number} wait
   * @param {Boolean} immediate
   * @return {Function}
   */
  function debounce(func, wait, immediate) {
      var timeout;
      return function () {
          var context = this;
          var args = arguments;
          var later = function () {
              timeout = null;
              if (!immediate) {
                  func.apply(context, args);
              }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) {
              func.apply(context, args);
          }
      };
  }
  var func = {
      eq: eq,
      eq2: eq2,
      peq2: peq2,
      ok: ok,
      fail: fail,
      self: self,
      not: not,
      and: and,
      invoke: invoke,
      uniqueId: uniqueId,
      rect2bnd: rect2bnd,
      invertObject: invertObject,
      namespaceToCamel: namespaceToCamel,
      debounce: debounce
  };

  /**
   * returns the first item of an array.
   *
   * @param {Array} array
   */
  function head(array) {
      return array[0];
  }
  /**
   * returns the last item of an array.
   *
   * @param {Array} array
   */
  function last(array) {
      return array[array.length - 1];
  }
  /**
   * returns everything but the last entry of the array.
   *
   * @param {Array} array
   */
  function initial(array) {
      return array.slice(0, array.length - 1);
  }
  /**
   * returns the rest of the items in an array.
   *
   * @param {Array} array
   */
  function tail(array) {
      return array.slice(1);
  }
  /**
   * returns item of array
   */
  function find(array, pred) {
      for (var idx = 0, len = array.length; idx < len; idx++) {
          var item = array[idx];
          if (pred(item)) {
              return item;
          }
      }
  }
  /**
   * returns true if all of the values in the array pass the predicate truth test.
   */
  function all(array, pred) {
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (!pred(array[idx])) {
              return false;
          }
      }
      return true;
  }
  /**
   * returns index of item
   */
  function indexOf(array, item) {
      return $$1.inArray(item, array);
  }
  /**
   * returns true if the value is present in the list.
   */
  function contains(array, item) {
      return indexOf(array, item) !== -1;
  }
  /**
   * get sum from a list
   *
   * @param {Array} array - array
   * @param {Function} fn - iterator
   */
  function sum(array, fn) {
      fn = fn || func.self;
      return array.reduce(function (memo, v) {
          return memo + fn(v);
      }, 0);
  }
  /**
   * returns a copy of the collection with array type.
   * @param {Collection} collection - collection eg) node.childNodes, ...
   */
  function from(collection) {
      var result = [];
      var length = collection.length;
      var idx = -1;
      while (++idx < length) {
          result[idx] = collection[idx];
      }
      return result;
  }
  /**
   * returns whether list is empty or not
   */
  function isEmpty(array) {
      return !array || !array.length;
  }
  /**
   * cluster elements by predicate function.
   *
   * @param {Array} array - array
   * @param {Function} fn - predicate function for cluster rule
   * @param {Array[]}
   */
  function clusterBy(array, fn) {
      if (!array.length) {
          return [];
      }
      var aTail = tail(array);
      return aTail.reduce(function (memo, v) {
          var aLast = last(memo);
          if (fn(last(aLast), v)) {
              aLast[aLast.length] = v;
          }
          else {
              memo[memo.length] = [v];
          }
          return memo;
      }, [[head(array)]]);
  }
  /**
   * returns a copy of the array with all false values removed
   *
   * @param {Array} array - array
   * @param {Function} fn - predicate function for cluster rule
   */
  function compact(array) {
      var aResult = [];
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (array[idx]) {
              aResult.push(array[idx]);
          }
      }
      return aResult;
  }
  /**
   * produces a duplicate-free version of the array
   *
   * @param {Array} array
   */
  function unique(array) {
      var results = [];
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (!contains(results, array[idx])) {
              results.push(array[idx]);
          }
      }
      return results;
  }
  /**
   * returns next item.
   * @param {Array} array
   */
  function next(array, item) {
      var idx = indexOf(array, item);
      if (idx === -1) {
          return null;
      }
      return array[idx + 1];
  }
  /**
   * returns prev item.
   * @param {Array} array
   */
  function prev(array, item) {
      var idx = indexOf(array, item);
      if (idx === -1) {
          return null;
      }
      return array[idx - 1];
  }
  
  function hasSelectedRange () {
    //let rng = document.createRange()
    //return !(rng.so === 0 && rng.eo === 0)
    //console.log(document.getSelection().type)
    return (document.getSelection().type === 'Range')
  }
  
  /**
   * @class core.list
   *
   * list utils
   *
   * @singleton
   * @alternateClassName list
   */
  var lists = {
      head: head,
      last: last,
      initial: initial,
      tail: tail,
      prev: prev,
      next: next,
      find: find,
      contains: contains,
      all: all,
      sum: sum,
      from: from,
      isEmpty: isEmpty,
      clusterBy: clusterBy,
      compact: compact,
      unique: unique
  };

  /**
   * KEY_MAP
   * 
   * If you want to map new key, please check if the key code you want in following list.
   * @type {Object}
   */
  var KEY_MAP = {
      'BACKSPACE': 8,
      'TAB': 9,
      'ENTER': 13,
      'SPACE': 32,
      'DELETE': 46,
      // Arrow
      'LEFT': 37,
      'UP': 38,
      'RIGHT': 39,
      'DOWN': 40,
      // Number: 0-9
      'NUM0': 48,
      'NUM1': 49,
      'NUM2': 50,
      'NUM3': 51,
      'NUM4': 52,
      'NUM5': 53,
      'NUM6': 54,
      'NUM7': 55,
      'NUM8': 56,
      // Alphabet: a-z
      'B': 66,
      'E': 69,
      'H': 72,
      'I': 73,
      'J': 74,
      'K': 75,
      'L': 76,
      'M': 77,
      'R': 82,
      'S': 83,
      'U': 85,
      'V': 86,
      'X': 88,
      'Y': 89,
      'Z': 90,
      'SLASH': 191,
      'LEFTBRACKET': 219,
      'BACKSLASH': 220,
      'RIGHTBRACKET': 221,
      'ESC': 27
  };
  /**
   * @class core.key
   *
   * Object for keycodes.
   *
   * @singleton
   * @alternateClassName key
   */
  var key = {
      /**
       * @method isEdit
       *
       * @param {Number} keyCode
       * @return {Boolean}
       */
      isEdit: function (keyCode) {
          return lists.contains([
              KEY_MAP.BACKSPACE,
              KEY_MAP.TAB,
              KEY_MAP.ENTER,
              KEY_MAP.SPACE,
              KEY_MAP.DELETE
          ], keyCode);
      },
      /**
       * @method isMove
       *
       * @param {Number} keyCode
       * @return {Boolean}
       */
      isMove: function (keyCode) {
          return lists.contains([
              KEY_MAP.LEFT,
              KEY_MAP.UP,
              KEY_MAP.RIGHT,
              KEY_MAP.DOWN
          ], keyCode);
      },
      /**
       * @property {Object} nameFromCode
       * @property {String} nameFromCode.8 "BACKSPACE"
       */
      nameFromCode: func.invertObject(KEY_MAP),
      code: KEY_MAP
  };

  var NBSP_CHAR = String.fromCharCode(160);
  var ZERO_WIDTH_NBSP_CHAR = '\ufeff';
  /**
   * @method isEditable
   *
   * returns whether node is `note-editable` or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isEditable(node) {
      return node && $$1(node).hasClass('note-editable');
  }
  /**
   * @method isControlSizing
   *
   * returns whether node is `note-control-sizing` or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isControlSizing(node) {
      return node && $$1(node).hasClass('note-control-sizing');
  }
  /**
   * @method makePredByNodeName
   *
   * returns predicate which judge whether nodeName is same
   *
   * @param {String} nodeName
   * @return {Function}
   */
  function makePredByNodeName(nodeName) {
      if (nodeName === undefined) {
        return false
      }
      nodeName = nodeName.toUpperCase();
      return function (node) {
          if (node === undefined || typeof(node.nodeName) === "undefined") {
            return false
          }
          return node && node.nodeName.toUpperCase() === nodeName;
      };
  }
  /**
   * @method isText
   *
   *
   *
   * @param {Node} node
   * @return {Boolean} true if node's type is text(3)
   */
  function isText(node) {
      return node && node.nodeType === 3;
  }
  /**
   * @method isElement
   *
   *
   *
   * @param {Node} node
   * @return {Boolean} true if node's type is element(1)
   */
  function isElement(node) {
      return node && node.nodeType === 1;
  }
  /**
   * ex) br, col, embed, hr, img, input, ...
   * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
   */
  function isVoid(node) {
      if (node === undefined || typeof(node.nodeName) === "undefined") {
        return false
      }
      return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^VIDEO|^EMBED/.test(node.nodeName.toUpperCase());
  }
  function isPara(node) {
      if (isEditable(node)) {
          return false;
      }
      // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph
      if (node === undefined || typeof(node.nodeName) === "undefined") {
        return false
      }
      
      return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
  }
  function isHeading(node) {
      if (node === undefined || typeof(node.nodeName) === "undefined") {
        return false
      }
      return node && /^H[1-7]/.test(node.nodeName.toUpperCase());
  }
  var isPre = makePredByNodeName('PRE');
  var isLi = makePredByNodeName('LI');
  function isPurePara(node) {
      return isPara(node) && !isLi(node);
  }
  var isTable = makePredByNodeName('TABLE');
  var isData = makePredByNodeName('DATA');
  function isInline(node) {
      return !isBodyContainer(node) &&
          !isList(node) &&
          !isHr(node) &&
          !isPara(node) &&
          !isTable(node) &&
          !isBlockquote(node) &&
          !isData(node);
  }
  function isList(node) {
      if (node === undefined || node === null || typeof(node.nodeName) === "undefined") {
        return false
      }
      return node && /^UL|^OL/.test(node.nodeName.toUpperCase());
  }
  var isHr = makePredByNodeName('HR');
  function isCell(node) {
      if (node === undefined || typeof(node.nodeName) === "undefined") {
        return false
      }
      return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
  }
  var isBlockquote = makePredByNodeName('BLOCKQUOTE');
  function isBodyContainer(node) {
      return isCell(node) || isBlockquote(node) || isEditable(node);
  }
  var isAnchor = makePredByNodeName('A');
  function isParaInline(node) {
      return isInline(node) && !!ancestor(node, isPara);
  }
  function isBodyInline(node) {
      return isInline(node) && !ancestor(node, isPara);
  }
  var isBody = makePredByNodeName('BODY');
  
  /**
   * is parents has list
   *
   * @author Pulipuli Chen 20190420
   */
  function isParentsHasList(node) {
    if (typeof(node) !== 'object' || typeof(node.parent) !== 'function') {
      node = $(node)
    }
    
    let tagName = node.prop('tagName')
    if (tagName !== undefined && tagName.toLowerCase() === 'li') {
      return true
    }
    
    let parent = node.parent()
    while (parent.length > 0 && parent.hasClass('note-editable') === false) {
      tagName = parent.prop('tagName')
      if (tagName === undefined) {
        return false
      }
      //console.log(tagName)
      if (tagName !== undefined && tagName.toLowerCase() === 'li') {
        return true
      }
      parent = parent.parent()
    }
    return false
  }
  
  /**
   * returns whether nodeB is closest sibling of nodeA
   *
   * @param {Node} nodeA
   * @param {Node} nodeB
   * @return {Boolean}
   */
  function isClosestSibling(nodeA, nodeB) {
      return nodeA.nextSibling === nodeB ||
          nodeA.previousSibling === nodeB;
  }
  /**
   * returns array of closest siblings with node
   *
   * @param {Node} node
   * @param {function} [pred] - predicate function
   * @return {Node[]}
   */
  function withClosestSiblings(node, pred) {
      pred = pred || func.ok;
      var siblings = [];
      if (node.previousSibling && pred(node.previousSibling)) {
          siblings.push(node.previousSibling);
      }
      siblings.push(node);
      if (node.nextSibling && pred(node.nextSibling)) {
          siblings.push(node.nextSibling);
      }
      return siblings;
  }
  /**
   * blank HTML for cursor position
   * - [workaround] old IE only works with &nbsp;
   * - [workaround] IE11 and other browser works with bogus br
   */
  var blankHTML = env.isMSIE && env.browserVersion < 11 ? '&nbsp;' : '<br>';
  /**
   * @method nodeLength
   *
   * returns #text's text size or element's childNodes size
   *
   * @param {Node} node
   */
  function nodeLength(node) {
      if (isText(node)) {
          return node.nodeValue.length;
      }
      if (node) {
          return node.childNodes.length;
      }
      return 0;
  }
  /**
   * returns whether node is empty or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isEmpty$1(node) {
      var len = nodeLength(node);
      if (len === 0) {
          return true;
      }
      else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {
          // ex) <p><br></p>, <span><br></span>
          return true;
      }
      else if (lists.all(node.childNodes, isText) && node.innerHTML === '') {
          // ex) <p></p>, <span></span>
          return true;
      }
      return false;
  }
  /**
   * padding blankHTML if node is empty (for cursor position)
   */
  function paddingBlankHTML(node) {
      if (!isVoid(node) && !nodeLength(node)) {
          node.innerHTML = blankHTML;
      }
  }
  /**
   * find nearest ancestor predicate hit
   *
   * @param {Node} node
   * @param {Function} pred - predicate function
   */
  function ancestor(node, pred) {
      while (node) {
          if (pred(node)) {
              return node;
          }
          if (isEditable(node)) {
              break;
          }
          node = node.parentNode;
      }
      return null;
  }
  /**
   * find nearest ancestor only single child blood line and predicate hit
   *
   * @param {Node} node
   * @param {Function} pred - predicate function
   */
  function singleChildAncestor(node, pred) {
      node = node.parentNode;
      while (node) {
          if (nodeLength(node) !== 1) {
              break;
          }
          if (pred(node)) {
              return node;
          }
          if (isEditable(node)) {
              break;
          }
          node = node.parentNode;
      }
      return null;
  }
  /**
   * returns new array of ancestor nodes (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [optional] pred - predicate function
   */
  function listAncestor(node, pred) {
      pred = pred || func.fail;
      var ancestors = [];
      ancestor(node, function (el) {
          if (!isEditable(el)) {
              ancestors.push(el);
          }
          return pred(el);
      });
      return ancestors;
  }
  /**
   * find farthest ancestor predicate hit
   */
  function lastAncestor(node, pred) {
      var ancestors = listAncestor(node);
      return lists.last(ancestors.filter(pred));
  }
  /**
   * returns common ancestor node between two nodes.
   *
   * @param {Node} nodeA
   * @param {Node} nodeB
   */
  function commonAncestor(nodeA, nodeB) {
      var ancestors = listAncestor(nodeA);
      for (var n = nodeB; n; n = n.parentNode) {
          if ($$1.inArray(n, ancestors) > -1) {
              return n;
          }
      }
      return null; // difference document area
  }
  /**
   * listing all previous siblings (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [optional] pred - predicate function
   */
  function listPrev(node, pred) {
      pred = pred || func.fail;
      var nodes = [];
      while (node) {
          if (pred(node)) {
              break;
          }
          nodes.push(node);
          node = node.previousSibling;
      }
      return nodes;
  }
  /**
   * listing next siblings (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [pred] - predicate function
   */
  function listNext(node, pred) {
      pred = pred || func.fail;
      var nodes = [];
      while (node) {
          if (pred(node)) {
              break;
          }
          nodes.push(node);
          node = node.nextSibling;
      }
      return nodes;
  }
  /**
   * listing descendant nodes
   *
   * @param {Node} node
   * @param {Function} [pred] - predicate function
   */
  function listDescendant(node, pred) {
      var descendants = [];
      pred = pred || func.ok;
      // start DFS(depth first search) with node
      (function fnWalk(current) {
          if (node !== current && pred(current)) {
              descendants.push(current);
          }
          for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {
              fnWalk(current.childNodes[idx]);
          }
      })(node);
      return descendants;
  }
  /**
   * wrap node with new tag.
   *
   * @param {Node} node
   * @param {Node} tagName of wrapper
   * @return {Node} - wrapper
   */
  function wrap(node, wrapperName) {
      var parent = node.parentNode;
      var wrapper = $$1('<' + wrapperName + '>')[0];
      if (parent !== null) {
        parent.insertBefore(wrapper, node);
      }
      try {
        wrapper.appendChild(node);
      } catch (e) {}
      return wrapper;
  }
  /**
   * insert node after preceding
   *
   * @param {Node} node
   * @param {Node} preceding - predicate function
   */
  function insertAfter(node, preceding) {
      var next = preceding.nextSibling;
      var parent = preceding.parentNode;
      if (next) {
          parent.insertBefore(node, next);
      }
      else {
          parent.appendChild(node);
      }
      return node;
  }
  /**
   * append elements.
   *
   * @param {Node} node
   * @param {Collection} aChild
   */
  function appendChildNodes(node, aChild) {
      $$1.each(aChild, function (idx, child) {
          node.appendChild(child);
      });
      return node;
  }
  /**
   * returns whether boundaryPoint is left edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isLeftEdgePoint(point) {
      return point.offset === 0;
  }
  /**
   * returns whether boundaryPoint is right edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isRightEdgePoint(point) {
      return point.offset === nodeLength(point.node);
  }
  /**
   * returns whether boundaryPoint is edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isEdgePoint(point) {
      return isLeftEdgePoint(point) || isRightEdgePoint(point);
  }
  /**
   * returns whether node is left edge of ancestor or not.
   *
   * @param {Node} node
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isLeftEdgeOf(node, ancestor) {
      while (node && node !== ancestor) {
          if (position(node) !== 0) {
              return false;
          }
          node = node.parentNode;
      }
      return true;
  }
  /**
   * returns whether node is right edge of ancestor or not.
   *
   * @param {Node} node
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isRightEdgeOf(node, ancestor) {
      if (!ancestor) {
          return false;
      }
      while (node && node !== ancestor) {
          if (position(node) !== nodeLength(node.parentNode) - 1) {
              return false;
          }
          node = node.parentNode;
      }
      return true;
  }
  /**
   * returns whether point is left edge of ancestor or not.
   * @param {BoundaryPoint} point
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isLeftEdgePointOf(point, ancestor) {
      return isLeftEdgePoint(point) && isLeftEdgeOf(point.node, ancestor);
  }
  /**
   * returns whether point is right edge of ancestor or not.
   * @param {BoundaryPoint} point
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isRightEdgePointOf(point, ancestor) {
      return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
  }
  /**
   * returns offset from parent.
   *
   * @param {Node} node
   */
  function position(node) {
      var offset = 0;
      while ((node = node.previousSibling)) {
          offset += 1;
      }
      return offset;
  }
  function hasChildren(node) {
      return !!(node && node.childNodes && node.childNodes.length);
  }
  /**
   * returns previous boundaryPoint
   *
   * @param {BoundaryPoint} point
   * @param {Boolean} isSkipInnerOffset
   * @return {BoundaryPoint}
   */
  function prevPoint(point, isSkipInnerOffset) {
      var node;
      var offset;
      if (point.offset === 0) {
          if (isEditable(point.node)) {
              return null;
          }
          node = point.node.parentNode;
          offset = position(point.node);
      }
      else if (hasChildren(point.node)) {
          node = point.node.childNodes[point.offset - 1];
          offset = nodeLength(node);
      }
      else {
          node = point.node;
          offset = isSkipInnerOffset ? 0 : point.offset - 1;
      }
      return {
          node: node,
          offset: offset
      };
  }
  /**
   * returns next boundaryPoint
   *
   * @param {BoundaryPoint} point
   * @param {Boolean} isSkipInnerOffset
   * @return {BoundaryPoint}
   */
  function nextPoint(point, isSkipInnerOffset) {
      var node, offset;
      if (nodeLength(point.node) === point.offset) {
          if (isEditable(point.node)) {
              return null;
          }
          node = point.node.parentNode;
          offset = position(point.node) + 1;
      }
      else if (hasChildren(point.node)) {
          node = point.node.childNodes[point.offset];
          offset = 0;
      }
      else {
          node = point.node;
          offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
      }
      return {
          node: node,
          offset: offset
      };
  }
  /**
   * returns whether pointA and pointB is same or not.
   *
   * @param {BoundaryPoint} pointA
   * @param {BoundaryPoint} pointB
   * @return {Boolean}
   */
  function isSamePoint(pointA, pointB) {
      return pointA.node === pointB.node && pointA.offset === pointB.offset;
  }
  /**
   * returns whether point is visible (can set cursor) or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isVisiblePoint(point) {
      if (isText(point.node) || !hasChildren(point.node) || isEmpty$1(point.node)) {
          return true;
      }
      var leftNode = point.node.childNodes[point.offset - 1];
      var rightNode = point.node.childNodes[point.offset];
      if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {
          return true;
      }
      return false;
  }
  /**
   * @method prevPointUtil
   *
   * @param {BoundaryPoint} point
   * @param {Function} pred
   * @return {BoundaryPoint}
   */
  function prevPointUntil(point, pred) {
      while (point) {
          if (pred(point)) {
              return point;
          }
          point = prevPoint(point);
      }
      return null;
  }
  /**
   * @method nextPointUntil
   *
   * @param {BoundaryPoint} point
   * @param {Function} pred
   * @return {BoundaryPoint}
   */
  function nextPointUntil(point, pred) {
      while (point) {
          if (pred(point)) {
              return point;
          }
          point = nextPoint(point);
      }
      return null;
  }
  /**
   * returns whether point has character or not.
   *
   * @param {Point} point
   * @return {Boolean}
   */
  function isCharPoint(point) {
      if (!isText(point.node)) {
          return false;
      }
      var ch = point.node.nodeValue.charAt(point.offset - 1);
      return ch && (ch !== ' ' && ch !== NBSP_CHAR);
  }
  /**
   * @method walkPoint
   *
   * @param {BoundaryPoint} startPoint
   * @param {BoundaryPoint} endPoint
   * @param {Function} handler
   * @param {Boolean} isSkipInnerOffset
   */
  function walkPoint(startPoint, endPoint, handler, isSkipInnerOffset) {
      var point = startPoint;
      while (point) {
          handler(point);
          if (isSamePoint(point, endPoint)) {
              break;
          }
          var isSkipOffset = isSkipInnerOffset &&
              startPoint.node !== point.node &&
              endPoint.node !== point.node;
          point = nextPoint(point, isSkipOffset);
      }
  }
  /**
   * @method makeOffsetPath
   *
   * return offsetPath(array of offset) from ancestor
   *
   * @param {Node} ancestor - ancestor node
   * @param {Node} node
   */
  function makeOffsetPath(ancestor, node) {
      var ancestors = listAncestor(node, func.eq(ancestor));
      return ancestors.map(position).reverse();
  }
  /**
   * @method fromOffsetPath
   *
   * return element from offsetPath(array of offset)
   *
   * @param {Node} ancestor - ancestor node
   * @param {array} offsets - offsetPath
   */
  function fromOffsetPath(ancestor, offsets) {
      var current = ancestor;
      for (var i = 0, len = offsets.length; i < len; i++) {
          if (current !== undefined && current.childNodes.length <= offsets[i]) {
              current = current.childNodes[current.childNodes.length - 1];
          }
          else if (current !== undefined) {
              current = current.childNodes[offsets[i]];
          }
      }
      return current;
  }
  /**
   * @method splitNode
   *
   * split element or #text
   *
   * @param {BoundaryPoint} point
   * @param {Object} [options]
   * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
   * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
   * @param {Boolean} [options.isDiscardEmptySplits] - default: false
   * @return {Node} right node of boundaryPoint
   */
  function splitNode(point, options) {
      var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;
      var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;
      var isDiscardEmptySplits = options && options.isDiscardEmptySplits;
      var clearEnterFormat = options && options.clearEnterFormat;
      if (isDiscardEmptySplits) {
          isSkipPaddingBlankHTML = true;
      }
      // edge case
      if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {
          if (isLeftEdgePoint(point)) {
              return point.node;
          }
          else if (isRightEdgePoint(point)) {
              return point.node.nextSibling;
          }
      }
      // split #text
      if (isText(point.node)) {
          return point.node.splitText(point.offset);
      }
      else {
          var childNode = point.node.childNodes[point.offset];
          var clone = insertAfter(point.node.cloneNode(false), point.node);
          appendChildNodes(clone, listNext(childNode));
          //console.log(clone)
          //console.trace(clearEnterFormat)
          
          if (clearEnterFormat) {
            clone.style = ''
          }
          //clone.style = ''
          
          if (!isSkipPaddingBlankHTML) {
              paddingBlankHTML(point.node);
              paddingBlankHTML(clone);
          }
          if (isDiscardEmptySplits) {
              if (isEmpty$1(point.node)) {
                  remove(point.node);
              }
              if (isEmpty$1(clone)) {
                  remove(clone);
                  return point.node.nextSibling;
              }
          }
          return clone;
      }
  }
  /**
   * @method splitTree
   *
   * split tree by point
   *
   * @param {Node} root - split root
   * @param {BoundaryPoint} point
   * @param {Object} [options]
   * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
   * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
   * @return {Node} right node of boundaryPoint
   */
  function splitTree(root, point, options) {
      // ex) [#text, <span>, <p>]
      var ancestors = listAncestor(point.node, func.eq(root));
      if (!ancestors.length) {
          return null;
      }
      else if (ancestors.length === 1) {
          return splitNode(point, options);
      }
      return ancestors.reduce(function (node, parent) {
          if (node === point.node) {
              node = splitNode(point, options);
          }
          return splitNode({
              node: parent,
              offset: node ? position(node) : nodeLength(parent)
          }, options);
      });
  }
  /**
   * split point
   *
   * @param {Point} point
   * @param {Boolean} isInline
   * @return {Object}
   */
  function splitPoint(point, isInline) {
      // find splitRoot, container
      //  - inline: splitRoot is a child of paragraph
      //  - block: splitRoot is a child of bodyContainer
      var pred = isInline ? isPara : isBodyContainer;
      var ancestors = listAncestor(point.node, pred);
      var topAncestor = lists.last(ancestors) || point.node;
      var splitRoot, container;
      if (pred(topAncestor)) {
          splitRoot = ancestors[ancestors.length - 2];
          container = topAncestor;
      }
      else {
          splitRoot = topAncestor;
          container = splitRoot.parentNode;
      }
      // if splitRoot is exists, split with splitTree
      var pivot = splitRoot && splitTree(splitRoot, point, {
          isSkipPaddingBlankHTML: isInline,
          isNotSplitEdgePoint: isInline
      });
      // if container is point.node, find pivot with point.offset
      if (!pivot && container === point.node) {
          pivot = point.node.childNodes[point.offset];
      }
      return {
          rightNode: pivot,
          container: container
      };
  }
  function create(nodeName) {
    //console.trace(nodeName)
    return document.createElement(nodeName);
  }
  function createText(text) {
    //console.trace('[' + text + ']')
    let node = document.createTextNode(text);
    //console.log(`[${node}]`)
    return node
  }
  /**
   * @method remove
   *
   * remove node, (isRemoveChild: remove child or not)
   *
   * @param {Node} node
   * @param {Boolean} isRemoveChild
   */
  function remove(node, isRemoveChild) {
      if (!node || !node.parentNode) {
          return;
      }
      if (node.removeNode) {
          return node.removeNode(isRemoveChild);
      }
      var parent = node.parentNode;
      if (!isRemoveChild) {
          var nodes = [];
          for (var i = 0, len = node.childNodes.length; i < len; i++) {
              nodes.push(node.childNodes[i]);
          }
          for (var i = 0, len = nodes.length; i < len; i++) {
              parent.insertBefore(nodes[i], node);
          }
      }
      parent.removeChild(node);
  }
  /**
   * @method removeWhile
   *
   * @param {Node} node
   * @param {Function} pred
   */
  function removeWhile(node, pred) {
      while (node) {
          if (isEditable(node) || !pred(node)) {
              break;
          }
          var parent = node.parentNode;
          remove(node);
          node = parent;
      }
  }
  /**
   * @method replace
   *
   * replace node with provided nodeName
   *
   * @param {Node} node
   * @param {String} nodeName
   * @return {Node} - new node
   */
  function replace(node, nodeName) {
      if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {
          return node;
      }
      var newNode = create(nodeName);
      if (node.style.cssText) {
          newNode.style.cssText = node.style.cssText;
      }
      appendChildNodes(newNode, lists.from(node.childNodes));
      insertAfter(newNode, node);
      remove(node);
      return newNode;
  }
  var isTextarea = makePredByNodeName('TEXTAREA');
  /**
   * @param {jQuery} $node
   * @param {Boolean} [stripLinebreaks] - default: false
   */
  function value($node, stripLinebreaks) {
      var val = isTextarea($node[0]) ? $node.val() : $node.html();
      if (stripLinebreaks) {
          return val.replace(/[\n\r]/g, '');
      }
      return val;
  }
  /**
   * @method html
   *
   * get the HTML contents of node
   *
   * @param {jQuery} $node
   * @param {Boolean} [isNewlineOnBlock]
   */
  function html($node, isNewlineOnBlock) {
      var markup = value($node);
      //if (isNewlineOnBlock) {
      if (true) {
          var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
          markup = markup.replace(regexTag, function (match, endSlash, name) {
              name = name.toUpperCase();
              var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) &&
                  !!endSlash;
              var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);
              return match + ((isEndOfInlineContainer || isBlockNode) ? '\n' : '');
          });
          markup = $$1.trim(markup);
      }
      return markup;
  }
  function posFromPlaceholder(placeholder) {
      var $placeholder = $$1(placeholder);
      var pos = $placeholder.offset();
      //console.log($placeholder[0])
      //console.log([posFromPlaceholder, pos.top])
      var height = $placeholder.outerHeight(true); // include margin
      //console.log(height)
      //height = 0
      return {
          left: pos.left,
          top: pos.top + height
      };
  }
  function attachEvents($node, events) {
      Object.keys(events).forEach(function (key) {
          $node.on(key, events[key]);
      });
  }
  function detachEvents($node, events) {
      Object.keys(events).forEach(function (key) {
          $node.off(key, events[key]);
      });
  }
  /**
   * @method isCustomStyleTag
   *
   * assert if a node contains a "note-styletag" class,
   * which implies that's a custom-made style tag node
   *
   * @param {Node} an HTML DOM node
   */
  function isCustomStyleTag(node) {
      return node && !isText(node) && lists.contains(node.classList, 'note-styletag');
  }
  /**
   * Copy text in plain format
   * @param  {String} text 
   * @return {String} 
   */
  function copyPlainText(text) {
    let id = 'summernoteClipboardInput'
    var copyTextInput = document.getElementById(id)
    if (copyTextInput === null) {
      var copyTextInput = document.createElement("textarea");
      copyTextInput.id = id
      //copyTextInput.type = "text"
      document.body.appendChild(copyTextInput);
    }

    copyTextInput.value = text

    copyTextInput.style = "display: inline"
    /* Select the text field */
    copyTextInput.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    copyTextInput.style = "display: none"
    
    return text
  }
  
  /**
   * Copy text in rich format
   * @param  {String} text 
   * @return {String} 
   */
  function copyRichFormat(str) {
    document.addEventListener("copy", (e) => {
      copyRichFormatListener(e, str)
    })
    document.execCommand("copy")
    document.removeEventListener("copy", (e) => {
      copyRichFormatListener(e, str)
    })
  }
  
  /**
   * Copy text in rich format
   * @param  {String} text 
   * @return {String} 
   */
  function copyRichFormatListener(e, str) {
    e.clipboardData.setData("text/html", str);
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
    return str
  }
  
  var dom = {
      /** @property {String} NBSP_CHAR */
      NBSP_CHAR: NBSP_CHAR,
      /** @property {String} ZERO_WIDTH_NBSP_CHAR */
      ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,
      /** @property {String} blank */
      blank: blankHTML,
      /** @property {String} emptyPara */
      emptyPara: "<p>" + blankHTML + "</p>",
      makePredByNodeName: makePredByNodeName,
      isEditable: isEditable,
      isControlSizing: isControlSizing,
      isText: isText,
      isElement: isElement,
      isVoid: isVoid,
      isPara: isPara,
      isPurePara: isPurePara,
      isHeading: isHeading,
      isInline: isInline,
      isBlock: func.not(isInline),
      isBodyInline: isBodyInline,
      isBody: isBody,
      isParaInline: isParaInline,
      isPre: isPre,
      isList: isList,
      isTable: isTable,
      isData: isData,
      isCell: isCell,
      isBlockquote: isBlockquote,
      isBodyContainer: isBodyContainer,
      isAnchor: isAnchor,
      isDiv: makePredByNodeName('DIV'),
      isLi: isLi,
      isBR: makePredByNodeName('BR'),
      isSpan: makePredByNodeName('SPAN'),
      isB: makePredByNodeName('B'),
      isU: makePredByNodeName('U'),
      isS: makePredByNodeName('S'),
      isI: makePredByNodeName('I'),
      isImg: makePredByNodeName('IMG'),
      isTextarea: isTextarea,
      isEmpty: isEmpty$1,
      isEmptyAnchor: func.and(isAnchor, isEmpty$1),
      isClosestSibling: isClosestSibling,
      withClosestSiblings: withClosestSiblings,
      nodeLength: nodeLength,
      isLeftEdgePoint: isLeftEdgePoint,
      isRightEdgePoint: isRightEdgePoint,
      isEdgePoint: isEdgePoint,
      isLeftEdgeOf: isLeftEdgeOf,
      isRightEdgeOf: isRightEdgeOf,
      isLeftEdgePointOf: isLeftEdgePointOf,
      isRightEdgePointOf: isRightEdgePointOf,
      prevPoint: prevPoint,
      nextPoint: nextPoint,
      isSamePoint: isSamePoint,
      isVisiblePoint: isVisiblePoint,
      prevPointUntil: prevPointUntil,
      nextPointUntil: nextPointUntil,
      isCharPoint: isCharPoint,
      walkPoint: walkPoint,
      ancestor: ancestor,
      singleChildAncestor: singleChildAncestor,
      listAncestor: listAncestor,
      lastAncestor: lastAncestor,
      listNext: listNext,
      listPrev: listPrev,
      listDescendant: listDescendant,
      commonAncestor: commonAncestor,
      wrap: wrap,
      insertAfter: insertAfter,
      appendChildNodes: appendChildNodes,
      position: position,
      hasChildren: hasChildren,
      makeOffsetPath: makeOffsetPath,
      fromOffsetPath: fromOffsetPath,
      splitTree: splitTree,
      splitPoint: splitPoint,
      create: create,
      createText: createText,
      remove: remove,
      removeWhile: removeWhile,
      replace: replace,
      html: html,
      value: value,
      posFromPlaceholder: posFromPlaceholder,
      attachEvents: attachEvents,
      detachEvents: detachEvents,
      isCustomStyleTag: isCustomStyleTag,
      isParentsHasList: isParentsHasList
  };

  /**
   * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
   *
   * @param {TextRange} textRange
   * @param {Boolean} isStart
   * @return {BoundaryPoint}
   *
   * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
   */
  function textRangeToPoint(textRange, isStart) {
      var container = textRange.parentElement();
      var offset;
      var tester = document.body.createTextRange();
      var prevContainer;
      var childNodes = lists.from(container.childNodes);
      for (offset = 0; offset < childNodes.length; offset++) {
          if (dom.isText(childNodes[offset])) {
              continue;
          }
          tester.moveToElementText(childNodes[offset]);
          if (tester.compareEndPoints('StartToStart', textRange) >= 0) {
              break;
          }
          prevContainer = childNodes[offset];
      }
      if (offset !== 0 && dom.isText(childNodes[offset - 1])) {
          var textRangeStart = document.body.createTextRange();
          var curTextNode = null;
          textRangeStart.moveToElementText(prevContainer || container);
          textRangeStart.collapse(!prevContainer);
          curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;
          var pointTester = textRange.duplicate();
          pointTester.setEndPoint('StartToStart', textRangeStart);
          var textCount = pointTester.text.replace(/[\r\n]/g, '').length;
          while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {
              textCount -= curTextNode.nodeValue.length;
              curTextNode = curTextNode.nextSibling;
          }
          // [workaround] enforce IE to re-reference curTextNode, hack
          var dummy = curTextNode.nodeValue; // eslint-disable-line
          if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) &&
              textCount === curTextNode.nodeValue.length) {
              textCount -= curTextNode.nodeValue.length;
              curTextNode = curTextNode.nextSibling;
          }
          container = curTextNode;
          offset = textCount;
      }
      return {
          cont: container,
          offset: offset
      };
  }
  /**
   * return TextRange from boundary point (inspired by google closure-library)
   * @param {BoundaryPoint} point
   * @return {TextRange}
   */
  function pointToTextRange(point) {
      var textRangeInfo = function (container, offset) {
          var node, isCollapseToStart;
          if (dom.isText(container)) {
              var prevTextNodes = dom.listPrev(container, func.not(dom.isText));
              var prevContainer = lists.last(prevTextNodes).previousSibling;
              node = prevContainer || container.parentNode;
              offset += lists.sum(lists.tail(prevTextNodes), dom.nodeLength);
              isCollapseToStart = !prevContainer;
          }
          else {
              node = container.childNodes[offset] || container;
              if (dom.isText(node)) {
                  return textRangeInfo(node, 0);
              }
              offset = 0;
              isCollapseToStart = false;
          }
          return {
              node: node,
              collapseToStart: isCollapseToStart,
              offset: offset
          };
      };
      var textRange = document.body.createTextRange();
      var info = textRangeInfo(point.node, point.offset);
      textRange.moveToElementText(info.node);
      textRange.collapse(info.collapseToStart);
      textRange.moveStart('character', info.offset);
      return textRange;
  }
  /**
     * Wrapped Range
     *
     * @constructor
     * @param {Node} sc - start container
     * @param {Number} so - start offset
     * @param {Node} ec - end container
     * @param {Number} eo - end offset
     */
  var WrappedRange = /** @class */ (function () {
      function WrappedRange(sc, so, ec, eo) {
          this.sc = sc;
          this.so = so;
          this.ec = ec;
          this.eo = eo;
          // isOnEditable: judge whether range is on editable or not
          this.isOnEditable = this.makeIsOn(dom.isEditable);
          // isOnList: judge whether range is on list node or not
          this.isOnList = this.makeIsOn(dom.isList);
          // isOnAnchor: judge whether range is on anchor node or not
          this.isOnAnchor = this.makeIsOn(dom.isAnchor);
          // isOnCell: judge whether range is on cell node or not
          this.isOnCell = this.makeIsOn(dom.isCell);
          // isOnData: judge whether range is on data node or not
          this.isOnData = this.makeIsOn(dom.isData);
      }
      // nativeRange: get nativeRange from sc, so, ec, eo
      WrappedRange.prototype.nativeRange = function () {
          if (env.isW3CRangeSupport) {
              var w3cRange = document.createRange();
              try {
                w3cRange.setStart(this.sc, this.so);
                w3cRange.setEnd(this.ec, this.eo);
              } catch(e) {}
              return w3cRange;
          }
          else {
              var textRange = pointToTextRange({
                  node: this.sc,
                  offset: this.so
              });
              textRange.setEndPoint('EndToEnd', pointToTextRange({
                  node: this.ec,
                  offset: this.eo
              }));
              return textRange;
          }
      };
      WrappedRange.prototype.getPoints = function () {
          return {
              sc: this.sc,
              so: this.so,
              ec: this.ec,
              eo: this.eo
          };
      };
      WrappedRange.prototype.getStartPoint = function () {
          return {
              node: this.sc,
              offset: this.so
          };
      };
      WrappedRange.prototype.getEndPoint = function () {
          return {
              node: this.ec,
              offset: this.eo
          };
      };
      /**
       * select update visible range
       */
      WrappedRange.prototype.select = function () {
          var nativeRng = this.nativeRange();
          if (env.isW3CRangeSupport) {
              var selection = document.getSelection();
              if (selection.rangeCount > 0) {
                  selection.removeAllRanges();
              }
              selection.addRange(nativeRng);
          }
          else {
              nativeRng.select();
          }
          return this;
      };
      /**
       * Moves the scrollbar to start container(sc) of current range
       *
       * @return {WrappedRange}
       */
      WrappedRange.prototype.scrollIntoView = function (container) {
          var height = $$1(container).height();
          if (container.scrollTop + height < this.sc.offsetTop) {
              container.scrollTop += Math.abs(container.scrollTop + height - this.sc.offsetTop);
          }
          return this;
      };
      /**
       * @return {WrappedRange}
       */
      WrappedRange.prototype.normalize = function () {
          /**
           * @param {BoundaryPoint} point
           * @param {Boolean} isLeftToRight
           * @return {BoundaryPoint}
           */
          var getVisiblePoint = function (point, isLeftToRight) {
              if ((dom.isVisiblePoint(point) && !dom.isEdgePoint(point)) ||
                  (dom.isVisiblePoint(point) && dom.isRightEdgePoint(point) && !isLeftToRight) ||
                  (dom.isVisiblePoint(point) && dom.isLeftEdgePoint(point) && isLeftToRight) ||
                  (dom.isVisiblePoint(point) && dom.isBlock(point.node) && dom.isEmpty(point.node))) {
                  return point;
              }
              // point on block's edge
              var block = dom.ancestor(point.node, dom.isBlock);
              if (((dom.isLeftEdgePointOf(point, block) || dom.isVoid(dom.prevPoint(point).node)) && !isLeftToRight) ||
                  ((dom.isRightEdgePointOf(point, block) || dom.isVoid(dom.nextPoint(point).node)) && isLeftToRight)) {
                  // returns point already on visible point
                  if (dom.isVisiblePoint(point)) {
                      return point;
                  }
                  // reverse direction
                  isLeftToRight = !isLeftToRight;
              }
              var nextPoint = isLeftToRight ? dom.nextPointUntil(dom.nextPoint(point), dom.isVisiblePoint)
                  : dom.prevPointUntil(dom.prevPoint(point), dom.isVisiblePoint);
              return nextPoint || point;
          };
          var endPoint = getVisiblePoint(this.getEndPoint(), false);
          var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);
          return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
      };
      /**
       * returns matched nodes on range
       *
       * @param {Function} [pred] - predicate function
       * @param {Object} [options]
       * @param {Boolean} [options.includeAncestor]
       * @param {Boolean} [options.fullyContains]
       * @return {Node[]}
       */
      WrappedRange.prototype.nodes = function (pred, options) {
          pred = pred || func.ok;
          var includeAncestor = options && options.includeAncestor;
          var fullyContains = options && options.fullyContains;
          // TODO compare points and sort
          var startPoint = this.getStartPoint();
          var endPoint = this.getEndPoint();
          var nodes = [];
          var leftEdgeNodes = [];
          dom.walkPoint(startPoint, endPoint, function (point) {
              if (dom.isEditable(point.node)) {
                  return;
              }
              var node;
              if (fullyContains) {
                  if (dom.isLeftEdgePoint(point)) {
                      leftEdgeNodes.push(point.node);
                  }
                  if (dom.isRightEdgePoint(point) && lists.contains(leftEdgeNodes, point.node)) {
                      node = point.node;
                  }
              }
              else if (includeAncestor) {
                  node = dom.ancestor(point.node, pred);
              }
              else {
                  node = point.node;
              }
              if (node && pred(node)) {
                  nodes.push(node);
              }
          }, true);
          return lists.unique(nodes);
      };
      /**
       * returns commonAncestor of range
       * @return {Element} - commonAncestor
       */
      WrappedRange.prototype.commonAncestor = function () {
          return dom.commonAncestor(this.sc, this.ec);
      };
      /**
       * returns expanded range by pred
       *
       * @param {Function} pred - predicate function
       * @return {WrappedRange}
       */
      WrappedRange.prototype.expand = function (pred) {
          var startAncestor = dom.ancestor(this.sc, pred);
          var endAncestor = dom.ancestor(this.ec, pred);
          if (!startAncestor && !endAncestor) {
              return new WrappedRange(this.sc, this.so, this.ec, this.eo);
          }
          var boundaryPoints = this.getPoints();
          if (startAncestor) {
              boundaryPoints.sc = startAncestor;
              boundaryPoints.so = 0;
          }
          if (endAncestor) {
              boundaryPoints.ec = endAncestor;
              boundaryPoints.eo = dom.nodeLength(endAncestor);
          }
          return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
      };
      /**
       * @param {Boolean} isCollapseToStart
       * @return {WrappedRange}
       */
      WrappedRange.prototype.collapse = function (isCollapseToStart) {
          if (isCollapseToStart) {
              return new WrappedRange(this.sc, this.so, this.sc, this.so);
          }
          else {
              return new WrappedRange(this.ec, this.eo, this.ec, this.eo);
          }
      };
      /**
       * splitText on range
       */
      WrappedRange.prototype.splitText = function () {
          var isSameContainer = this.sc === this.ec;
          var boundaryPoints = this.getPoints();
          if (dom.isText(this.ec) && !dom.isEdgePoint(this.getEndPoint())) {
              this.ec.splitText(this.eo);
          }
          if (dom.isText(this.sc) && !dom.isEdgePoint(this.getStartPoint())) {
              boundaryPoints.sc = this.sc.splitText(this.so);
              boundaryPoints.so = 0;
              if (isSameContainer) {
                  boundaryPoints.ec = boundaryPoints.sc;
                  boundaryPoints.eo = this.eo - this.so;
              }
          }
          return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
      };
      /**
       * delete contents on range
       * @return {WrappedRange}
       */
      WrappedRange.prototype.deleteContents = function () {
          if (this.isCollapsed()) {
              return this;
          }
          var rng = this.splitText();
          var nodes = rng.nodes(null, {
              fullyContains: true
          });
          // find new cursor point
          var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {
              return !lists.contains(nodes, point.node);
          });
          var emptyParents = [];
          $$1.each(nodes, function (idx, node) {
              // find empty parents
              var parent = node.parentNode;
              if (point.node !== parent && dom.nodeLength(parent) === 1) {
                  emptyParents.push(parent);
              }
              dom.remove(node, false);
          });
          // remove empty parents
          $$1.each(emptyParents, function (idx, node) {
              dom.remove(node, false);
          });
          return new WrappedRange(point.node, point.offset, point.node, point.offset).normalize();
      };
      /**
       * makeIsOn: return isOn(pred) function
       */
      WrappedRange.prototype.makeIsOn = function (pred) {
          return function () {
              var ancestor = dom.ancestor(this.sc, pred);
              return !!ancestor && (ancestor === dom.ancestor(this.ec, pred));
          };
      };
      /**
       * @param {Function} pred
       * @return {Boolean}
       */
      WrappedRange.prototype.isLeftEdgeOf = function (pred) {
          if (!dom.isLeftEdgePoint(this.getStartPoint())) {
              return false;
          }
          var node = dom.ancestor(this.sc, pred);
          return node && dom.isLeftEdgeOf(this.sc, node);
      };
      /**
       * returns whether range was collapsed or not
       */
      WrappedRange.prototype.isCollapsed = function () {
          return this.sc === this.ec && this.so === this.eo;
      };
      /**
       * wrap inline nodes which children of body with paragraph
       *
       * @return {WrappedRange}
       */
      WrappedRange.prototype.wrapBodyInlineWithPara = function () {
          if (dom.isBodyContainer(this.sc) && dom.isEmpty(this.sc)) {
              this.sc.innerHTML = dom.emptyPara;
              return new WrappedRange(this.sc.firstChild, 0, this.sc.firstChild, 0);
          }
          /**
           * [workaround] firefox often create range on not visible point. so normalize here.
           *  - firefox: |<p>text</p>|
           *  - chrome: <p>|text|</p>
           */
          var rng = this.normalize();
          if (dom.isParaInline(this.sc) || dom.isPara(this.sc)) {
              return rng;
          }
          // find inline top ancestor
          var topAncestor;
          if (dom.isInline(rng.sc)) {
              var ancestors = dom.listAncestor(rng.sc, func.not(dom.isInline));
              topAncestor = lists.last(ancestors);
              if (!dom.isInline(topAncestor)) {
                  topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];
              }
          }
          else {
              topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];
          }
          // siblings not in paragraph
          var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();
          if (topAncestor !== undefined) {
            inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline));
          }
          // wrap with paragraph
          if (inlineSiblings.length) {
              var para = dom.wrap(lists.head(inlineSiblings), 'p');
              dom.appendChildNodes(para, lists.tail(inlineSiblings));
          }
          return this.normalize();
      };
      /**
       * insert node at current cursor
       *
       * @param {Node} node
       * @return {Node}
       */
      WrappedRange.prototype.insertNode = function (node) {
          let isFragment = false
          if (typeof(node) === 'string') {
            node = document.createRange().createContextualFragment('<a class="fragment-start"></a>' + node + '<a class="fragment-end"></a>')
            isFragment = true
          }
        
          var rng = this.wrapBodyInlineWithPara().deleteContents();
          var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));
          //console.log(info.rightNode
          //console.log(node)
          //console.log(['WrappedRange.prototype.insertNode', info.rightNode])
          if (info.rightNode) {
              info.rightNode.parentNode.insertBefore(node, info.rightNode);
          }
          else {
              info.container.appendChild(node);
          }
          
          if (isFragment === true) {
            // 應該在插入的時候就做這件事情
            // 先把被放進去的<a name="more"></a>拿出來

              let postBody = $$1(info.container)

              postBody.find('a.fragment-start').each((i, a) => {
                a = $(a)
                //console.log(a.prevAll().length)

                let parent = a.parent()
                if (parent.hasClass('node-editable')) {
                  return
                }

                let nextAll = a.nextAll()
                /*
                 for (let i = nextAll.length - 1; i > -1; i--) {
                 let node = nextAll.eq(i)
                 if (node.hasClass('fragment-end') === false) {
                 node.insertAfter(parent)
                 }
                 else {
                 node.remove()
                 break;
                 }
                 }
                 */
                let nextAllList = []
                for (let i = 0; i < nextAll.length; i++) {
                  let node = nextAll.eq(i)
                  if (node.hasClass('fragment-end') === false) {
                    nextAllList.push(node)
                  } else {
                    node.remove()
                    break;
                  }
                }

                nextAllList.reverse().forEach(node => {
                  node.insertAfter(parent)
                })

                if (parent.prop('innerHTML').trim() === '') {
                  parent.remove()
                }

                a.remove()
              })
          }
          
          return node;
      };
      /**
       * @author Pulipuli Chen 20190624
       * @param {String} node
       * @returns {WrappedRange}
       */
      /*
      WrappedRange.prototype.insert = function (node) {
        let insertType = 'insertNode'
        if (typeof(node) === 'string') {
          node = node.trim()
          if (!( (node.startsWith('<') && node.endsWith('>')) )) {
            insertType = 'insertText'
          }
        }
        return this[insertType](node)
      };
      */
      /**
       * insert html at current cursor
       */
      WrappedRange.prototype.pasteHTML = function (markup) {
          var contentsContainer = $$1('<div></div>').html(markup)[0];
          var childNodes = lists.from(contentsContainer.childNodes);
          var rng = this.wrapBodyInlineWithPara().deleteContents();
          if (rng.so > 0) {
              childNodes = childNodes.reverse();
          }
          childNodes = childNodes.map(function (childNode) {
              return rng.insertNode(childNode);
          });
          if (rng.so > 0) {
              childNodes = childNodes.reverse();
          }
          return childNodes;
      };
      /**
       * returns text in range
       *
       * @return {String}
       */
      WrappedRange.prototype.toString = function () {
          var nativeRng = this.nativeRange();
          return env.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;
      };
      /**
       * returns range for word before cursor
       *
       * @param {Boolean} [findAfter] - find after cursor, default: false
       * @return {WrappedRange}
       */
      WrappedRange.prototype.getWordRange = function (findAfter) {
          var endPoint = this.getEndPoint();
          if (!dom.isCharPoint(endPoint)) {
              return this;
          }
          var startPoint = dom.prevPointUntil(endPoint, function (point) {
              return !dom.isCharPoint(point);
          });
          if (findAfter) {
              endPoint = dom.nextPointUntil(endPoint, function (point) {
                  return !dom.isCharPoint(point);
              });
          }
          return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
      };
      /**
       * create offsetPath bookmark
       *
       * @param {Node} editable
       */
      WrappedRange.prototype.bookmark = function (editable) {
          return {
              s: {
                  path: dom.makeOffsetPath(editable, this.sc),
                  offset: this.so
              },
              e: {
                  path: dom.makeOffsetPath(editable, this.ec),
                  offset: this.eo
              }
          };
      };
      /**
       * create offsetPath bookmark base on paragraph
       *
       * @param {Node[]} paras
       */
      WrappedRange.prototype.paraBookmark = function (paras) {
          return {
              s: {
                  path: lists.tail(dom.makeOffsetPath(lists.head(paras), this.sc)),
                  offset: this.so
              },
              e: {
                  path: lists.tail(dom.makeOffsetPath(lists.last(paras), this.ec)),
                  offset: this.eo
              }
          };
      };
      /**
       * getClientRects
       * @return {Rect[]}
       */
      WrappedRange.prototype.getClientRects = function () {
          var nativeRng = this.nativeRange();
          return nativeRng.getClientRects();
      };
      return WrappedRange;
  }());
  /**
   * Data structure
   *  * BoundaryPoint: a point of dom tree
   *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
   *
   * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
   */
  var range = {
      /**
       * create Range Object From arguments or Browser Selection
       *
       * @param {Node} sc - start container
       * @param {Number} so - start offset
       * @param {Node} ec - end container
       * @param {Number} eo - end offset
       * @return {WrappedRange}
       */
      create: function (sc, so, ec, eo) {
          if (arguments.length === 4) {
              return new WrappedRange(sc, so, ec, eo);
          }
          else if (arguments.length === 2) { // collapsed
              ec = sc;
              eo = so;
              return new WrappedRange(sc, so, ec, eo);
          }
          else {
              var wrappedRange = this.createFromSelection();
              if (!wrappedRange && arguments.length === 1) {
                  wrappedRange = this.createFromNode(arguments[0]);
                  return wrappedRange.collapse(dom.emptyPara === arguments[0].innerHTML);
              }
              return wrappedRange;
          }
      },
      createFromSelection: function () {
          var sc, so, ec, eo;
          if (env.isW3CRangeSupport) {
              var selection = document.getSelection();
              if (!selection || selection.rangeCount === 0) {
                  return null;
              }
              else if (dom.isBody(selection.anchorNode)) {
                  // Firefox: returns entire body as range on initialization.
                  // We won't never need it.
                  return null;
              }
              var nativeRng = selection.getRangeAt(0);
              sc = nativeRng.startContainer;
              so = nativeRng.startOffset;
              ec = nativeRng.endContainer;
              eo = nativeRng.endOffset;
          }
          else { // IE8: TextRange
              var textRange = document.selection.createRange();
              var textRangeEnd = textRange.duplicate();
              textRangeEnd.collapse(false);
              var textRangeStart = textRange;
              textRangeStart.collapse(true);
              var startPoint = textRangeToPoint(textRangeStart, true);
              var endPoint = textRangeToPoint(textRangeEnd, false);
              // same visible point case: range was collapsed.
              if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) &&
                  dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) &&
                  endPoint.node.nextSibling === startPoint.node) {
                  startPoint = endPoint;
              }
              sc = startPoint.cont;
              so = startPoint.offset;
              ec = endPoint.cont;
              eo = endPoint.offset;
          }
          return new WrappedRange(sc, so, ec, eo);
      },
      /**
       * @method
       *
       * create WrappedRange from node
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNode: function (node) {
          var sc = node;
          var so = 0;
          var ec = node;
          var eo = dom.nodeLength(ec);
          // browsers can't target a picture or void node
          if (dom.isVoid(sc)) {
              so = dom.listPrev(sc).length - 1;
              sc = sc.parentNode;
          }
          if (dom.isBR(ec)) {
              eo = dom.listPrev(ec).length - 1;
              ec = ec.parentNode;
          }
          else if (dom.isVoid(ec)) {
              eo = dom.listPrev(ec).length;
              ec = ec.parentNode;
          }
          return this.create(sc, so, ec, eo);
      },
      /**
       * create WrappedRange from node after position
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNodeBefore: function (node) {
          return this.createFromNode(node).collapse(true);
      },
      /**
       * create WrappedRange from node after position
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNodeAfter: function (node) {
          return this.createFromNode(node).collapse();
      },
      /**
       * @method
       *
       * create WrappedRange from bookmark
       *
       * @param {Node} editable
       * @param {Object} bookmark
       * @return {WrappedRange}
       */
      createFromBookmark: function (editable, bookmark) {
          var sc = dom.fromOffsetPath(editable, bookmark.s.path);
          var so = bookmark.s.offset;
          var ec = dom.fromOffsetPath(editable, bookmark.e.path);
          var eo = bookmark.e.offset;
          return new WrappedRange(sc, so, ec, eo);
      },
      /**
       * @method
       *
       * create WrappedRange from paraBookmark
       *
       * @param {Object} bookmark
       * @param {Node[]} paras
       * @return {WrappedRange}
       */
      createFromParaBookmark: function (bookmark, paras) {
          var so = bookmark.s.offset;
          var eo = bookmark.e.offset;
          var sc = dom.fromOffsetPath(lists.head(paras), bookmark.s.path);
          var ec = dom.fromOffsetPath(lists.last(paras), bookmark.e.path);
          return new WrappedRange(sc, so, ec, eo);
      }
  };

  /**
   * @method readFileAsDataURL
   *
   * read contents of file as representing URL
   *
   * @param {File} file
   * @return {Promise} - then: dataUrl
   */
  function readFileAsDataURL(file) {
      return $$1.Deferred(function (deferred) {
          $$1.extend(new FileReader(), {
              onload: function (e) {
                  var dataURL = e.target.result;
                  deferred.resolve(dataURL);
              },
              onerror: function (err) {
                  deferred.reject(err);
              }
          }).readAsDataURL(file);
      }).promise();
  }
  /**
   * @method createImage
   *
   * create `<image>` from url string
   *
   * @param {String} url
   * @return {Promise} - then: $image
   */
  function createImage(url) {
      return $$1.Deferred(function (deferred) {
          var $img = $$1('<img>');
          $img.one('load', function () {
              $img.off('error abort');
              deferred.resolve($img);
          }).one('error abort', function () {
              $img.off('load').detach();
              deferred.reject($img);
          }).css({
              display: 'none'
          }).appendTo(document.body).attr('src', url);
      }).promise();
  }

  var History = /** @class */ (function () {
      function History($editable) {
          this.stack = [];
          this.stackOffset = -1;
          this.$editable = $editable;
          this.editable = $editable[0];
      }
      History.prototype.makeSnapshot = function () {
          var rng = range.create(this.editable);
          var emptyBookmark = { s: { path: [], offset: 0 }, e: { path: [], offset: 0 } };
          return {
              contents: this.$editable.html(),
              bookmark: (rng ? rng.bookmark(this.editable) : emptyBookmark)
          };
      };
      History.prototype.applySnapshot = function (snapshot) {
          if (snapshot.contents !== null) {
              this.$editable.html(snapshot.contents);
          }
          if (snapshot.bookmark !== null) {
              range.createFromBookmark(this.editable, snapshot.bookmark).select();
          }
      };
      /**
      * @method rewind
      * Rewinds the history stack back to the first snapshot taken.
      * Leaves the stack intact, so that "Redo" can still be used.
      */
      History.prototype.rewind = function () {
          // Create snap shot if not yet recorded
          if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
              this.recordUndo();
          }
          // Return to the first available snapshot.
          this.stackOffset = 0;
          // Apply that snapshot.
          this.applySnapshot(this.stack[this.stackOffset]);
      };
      /**
      *  @method commit
      *  Resets history stack, but keeps current editor's content.
      */
      History.prototype.commit = function () {
          // Clear the stack.
          this.stack = [];
          // Restore stackOffset to its original value.
          this.stackOffset = -1;
          // Record our first snapshot (of nothing).
          this.recordUndo();
      };
      /**
      * @method reset
      * Resets the history stack completely; reverting to an empty editor.
      */
      History.prototype.reset = function () {
          // Clear the stack.
          this.stack = [];
          // Restore stackOffset to its original value.
          this.stackOffset = -1;
          // Clear the editable area.
          this.$editable.html('');
          // Record our first snapshot (of nothing).
          this.recordUndo();
      };
      /**
       * undo
       */
      History.prototype.undo = function () {
          // Create snap shot if not yet recorded
          
          //console.log(["before", this.$editable.html(), this.stack[this.stackOffset].contents])
          if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
              this.recordUndo();
              //console.log(["after 1", this.$editable.html(), this.stack[this.stackOffset].contents])
          }
          if (this.stackOffset > 0) {
              this.stackOffset--;
              this.applySnapshot(this.stack[this.stackOffset]);
          }
          //console.log(["after 2", this.$editable.html(), this.stack[this.stackOffset].contents])
          
          if (this.$editable.html() === '<p><br></p>') {
            this.redo()
          }
      };
      /**
       * redo
       */
      History.prototype.redo = function () {
          if (this.stack.length - 1 > this.stackOffset) {
              this.stackOffset++;
              this.applySnapshot(this.stack[this.stackOffset]);
          }
      };
      /**
       * recorded undo
       */
      History.prototype.recordUndo = function () {
          this.stackOffset++;
          // Wash out stack after stackOffset
          if (this.stack.length > this.stackOffset) {
              this.stack = this.stack.slice(0, this.stackOffset);
          }
          // Create new snapshot and push it to the end
          this.stack.push(this.makeSnapshot());
      };
      return History;
  }());

  var Style = /** @class */ (function () {
      function Style() {
      }
      /**
       * @method jQueryCSS
       *
       * [workaround] for old jQuery
       * passing an array of style properties to .css()
       * will result in an object of property-value pairs.
       * (compability with version < 1.9)
       *
       * @private
       * @param  {jQuery} $obj
       * @param  {Array} propertyNames - An array of one or more CSS properties.
       * @return {Object}
       */
      Style.prototype.jQueryCSS = function ($obj, propertyNames) {
          if (env.jqueryVersion < 1.9) {
              var result_1 = {};
              $$1.each(propertyNames, function (idx, propertyName) {
                  result_1[propertyName] = $obj.css(propertyName);
              });
              return result_1;
          }
          try {
            return $obj.css(propertyNames);
          } catch (e) {
          }
      };
      /**
       * returns style object from node
       *
       * @param {jQuery} $node
       * @return {Object}
       */
      Style.prototype.fromNode = function ($node) {
          var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];
          var styleInfo = this.jQueryCSS($node, properties) || {};
          styleInfo['font-size'] = parseInt(styleInfo['font-size'], 10);
          return styleInfo;
      };
      /**
       * paragraph level style
       *
       * @param {WrappedRange} rng
       * @param {Object} styleInfo
       */
      Style.prototype.stylePara = function (rng, styleInfo) {
          $$1.each(rng.nodes(dom.isPara, {
              includeAncestor: true
          }), function (idx, para) {
              $$1(para).css(styleInfo);
          });
      };
      /**
       * insert and returns styleNodes on range.
       *
       * @param {WrappedRange} rng
       * @param {Object} [options] - options for styleNodes
       * @param {String} [options.nodeName] - default: `SPAN`
       * @param {Boolean} [options.expandClosestSibling] - default: `false`
       * @param {Boolean} [options.onlyPartialContains] - default: `false`
       * @return {Node[]}
       */
      Style.prototype.styleNodes = function (rng, options) {
          rng = rng.splitText();
          var nodeName = (options && options.nodeName) || 'SPAN';
          var expandClosestSibling = !!(options && options.expandClosestSibling);
          var onlyPartialContains = !!(options && options.onlyPartialContains);
          if (rng.isCollapsed()) {
              return [rng.insertNode(dom.create(nodeName))];
          }
          var pred = dom.makePredByNodeName(nodeName);
          var nodes = rng.nodes(dom.isText, {
              fullyContains: true
          }).map(function (text) {
              return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);
          });
          if (expandClosestSibling) {
              if (onlyPartialContains) {
                  var nodesInRange_1 = rng.nodes();
                  // compose with partial contains predication
                  pred = func.and(pred, function (node) {
                      return lists.contains(nodesInRange_1, node);
                  });
              }
              return nodes.map(function (node) {
                  var siblings = dom.withClosestSiblings(node, pred);
                  var head = lists.head(siblings);
                  var tails = lists.tail(siblings);
                  $$1.each(tails, function (idx, elem) {
                      dom.appendChildNodes(head, elem.childNodes);
                      dom.remove(elem);
                  });
                  return lists.head(siblings);
              });
          }
          else {
              return nodes;
          }
      };
      /**
       * get current style on cursor
       *
       * @param {WrappedRange} rng
       * @return {Object} - object contains style properties.
       */
      Style.prototype.current = function (rng) {
          var $cont = $$1(!dom.isElement(rng.sc) ? rng.sc.parentNode : rng.sc);
          var styleInfo = this.fromNode($cont);
          // document.queryCommandState for toggle state
          // [workaround] prevent Firefox nsresult: "0x80004005 (NS_ERROR_FAILURE)"
          try {
              styleInfo = $$1.extend(styleInfo, {
                  'font-bold': document.queryCommandState('bold') ? 'bold' : 'normal',
                  'font-italic': document.queryCommandState('italic') ? 'italic' : 'normal',
                  'font-underline': document.queryCommandState('underline') ? 'underline' : 'normal',
                  'font-subscript': document.queryCommandState('subscript') ? 'subscript' : 'normal',
                  'font-superscript': document.queryCommandState('superscript') ? 'superscript' : 'normal',
                  'font-strikethrough': document.queryCommandState('strikethrough') ? 'strikethrough' : 'normal',
                  'font-comment': document.queryCommandState('comment') ? 'comment' : 'normal',
                  'font-uncomment': document.queryCommandState('uncomment') ? 'uncomment' : 'normal',
                  'font-htmlify': document.queryCommandState('htmlify') ? 'htmlify' : 'normal',
                  'font-textify': document.queryCommandState('textify') ? 'textify' : 'normal',
                  'font-iframe': document.queryCommandState('iframe') ? 'iframe' : 'normal',
                  'font-family': document.queryCommandValue('fontname') || styleInfo['font-family']
              });
          }
          catch (e) { }
          // list-style-type to list-style(unordered, ordered)
          if (!rng.isOnList()) {
              styleInfo['list-style'] = 'none';
          }
          else {
              var orderedTypes = ['circle', 'disc', 'disc-leading-zero', 'square'];
              var isUnordered = $$1.inArray(styleInfo['list-style-type'], orderedTypes) > -1;
              styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';
          }
          var para = dom.ancestor(rng.sc, dom.isPara);
          if (para && para.style['line-height']) {
              styleInfo['line-height'] = para.style.lineHeight;
          }
          else {
              var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);
              styleInfo['line-height'] = lineHeight.toFixed(1);
          }
          styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);
          styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);
          styleInfo.range = rng;
          return styleInfo;
      };
      return Style;
  }());

  var Bullet = /** @class */ (function () {
      function Bullet(context) {
        this.context = context
      }
      /**
       * toggle ordered list
       */
      Bullet.prototype.insertOrderedList = function (editable) {
          this.toggleList('OL', editable);
      };
      /**
       * toggle unordered list
       */
      Bullet.prototype.insertUnorderedList = function (editable) {
          this.toggleList('UL', editable);
      };
      /**
       * indent
       */
      Bullet.prototype.indent = function (editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          let mode
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              if (dom.isLi(head)) {
                  var previousList_1 = _this.findList(head.previousSibling);
                  if (previousList_1) {
                      paras
                          .map(function (para) { return previousList_1.appendChild(para); });
                  }
                  else {
                      _this.wrapList(paras, head.parentNode.nodeName);
                      paras
                          .map(function (para) { return para.parentNode; })
                          .map(function (para) { return _this.appendToPrevious(para); });
                  }
                  mode = 'list'
              }
              else if (dom.isHeading(head)) {
                //console.log(head.tagName)
                let headingLevel = parseInt(head.tagName.slice(1), 10)
                headingLevel++
                //document.execCommand('FormatBlock', true, `H${headingLevel}`);
                //document.execCommand('insertText', true, '');
                _this.context.invoke('editor.saveScrollPosition')
                _this.context.invoke('editor.saveRange')
                _this.context.invoke('editor.formatBlock', `H${headingLevel}`)
                setTimeout(() => {
                  _this.context.invoke('editor.undo')
                  _this.context.invoke('editor.restoreScrollPosition')
                }, 0)
                mode = 'heading'
              }
              else {
                /*
              
                  $$1.each(paras, function (idx, para) {
                      $$1(para).css('marginLeft', function (idx, val) {
                          return (parseInt(val, 10) || 0) + 25;
                      });
                  });
                */
                 _this.wrapList(paras, 'UL');
                 mode = 'paragraph'
              }
          });
          
          if (mode !== 'heading') {
            rng.select();
          }
      };
      /**
       * outdent
       */
      Bullet.prototype.outdent = function (editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          let mode
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              if (dom.isLi(head)) {
                  _this.releaseList([paras]);
                  mode = 'list'
              }
              else if (dom.isHeading(head)) {
                //console.log(head.tagName)
                let headingLevel = parseInt(head.tagName.slice(1), 10)
                headingLevel--
                let tagName = 'p'
                if (headingLevel > 0) {
                  tagName = `H${headingLevel}`
                }
                _this.context.invoke('editor.saveScrollPosition')
                _this.context.invoke('editor.saveBlurRange')
                _this.context.invoke('editor.formatBlock', tagName)
                setTimeout(() => {
                  _this.context.invoke('editor.undo')
                  _this.context.invoke('editor.restoreScrollPosition')
                }, 0)
                mode = 'heading'
              }
              else {
                  $$1.each(paras, function (idx, para) {
                      $$1(para).css('marginLeft', function (idx, val) {
                          val = (parseInt(val, 10) || 0);
                          return val > 25 ? val - 25 : '';
                      });
                  });
                  mode = 'paragraph'
              }
          });
          
          if (mode !== 'heading') {
            rng.select();
          }
            
      };
      /**
       * toggle list
       *
       * @param {String} listName - OL or UL
       */
      Bullet.prototype.toggleList = function (listName, editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var bookmark = rng.paraBookmark(paras);
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          // paragraph to list
          if (lists.find(paras, dom.isPurePara)) {
              var wrappedParas_1 = [];
              $$1.each(clustereds, function (idx, paras) {
                  wrappedParas_1 = wrappedParas_1.concat(_this.wrapList(paras, listName));
              });
              paras = wrappedParas_1;
              // list to paragraph or change list style
          }
          else {
              var diffLists = rng.nodes(dom.isList, {
                  includeAncestor: true
              }).filter(function (listNode) {
                  return !$$1.nodeName(listNode, listName);
              });
              if (diffLists.length) {
                  $$1.each(diffLists, function (idx, listNode) {
                      dom.replace(listNode, listName);
                  });
              }
              else {
                  paras = this.releaseList(clustereds, true);
              }
          }
          range.createFromParaBookmark(bookmark, paras).select();
      };
      /**
       * @param {Node[]} paras
       * @param {String} listName
       * @return {Node[]}
       */
      Bullet.prototype.wrapList = function (paras, listName) {
          var head = lists.head(paras);
          var last = lists.last(paras);
          var prevList = dom.isList(head.previousSibling) && head.previousSibling;
          var nextList = dom.isList(last.nextSibling) && last.nextSibling;
          var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last);
          // P to LI
          paras = paras.map(function (para) {
              return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;
          });
          // append to list(<ul>, <ol>)
          dom.appendChildNodes(listNode, paras);
          if (nextList) {
              dom.appendChildNodes(listNode, lists.from(nextList.childNodes));
              dom.remove(nextList);
          }
          return paras;
      };
      /**
       * @method releaseList
       *
       * @param {Array[]} clustereds
       * @param {Boolean} isEscapseToBody
       * @return {Node[]}
       */
      Bullet.prototype.releaseList = function (clustereds, isEscapseToBody) {
          var _this = this;
          var releasedParas = [];
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              var last = lists.last(paras);
              var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) : head.parentNode;
              var parentItem = headList.parentNode;
              if (headList.parentNode.nodeName === 'LI') {
                  paras.map(function (para) {
                      var newList = _this.findNextSiblings(para);
                      if (parentItem.nextSibling) {
                          parentItem.parentNode.insertBefore(para, parentItem.nextSibling);
                      }
                      else {
                          parentItem.parentNode.appendChild(para);
                      }
                      if (newList.length) {
                          _this.wrapList(newList, headList.nodeName);
                          para.appendChild(newList[0].parentNode);
                      }
                  });
                  if (headList.children.length === 0) {
                      parentItem.removeChild(headList);
                  }
                  if (parentItem.childNodes.length === 0) {
                      parentItem.parentNode.removeChild(parentItem);
                  }
              }
              else {
                  var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {
                      node: last.parentNode,
                      offset: dom.position(last) + 1
                  }, {
                      isSkipPaddingBlankHTML: true
                  }) : null;
                  var middleList = dom.splitTree(headList, {
                      node: head.parentNode,
                      offset: dom.position(head)
                  }, {
                      isSkipPaddingBlankHTML: true
                  });
                  paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi)
                      : lists.from(middleList.childNodes).filter(dom.isLi);
                  // LI to P
                  if (isEscapseToBody || !dom.isList(headList.parentNode)) {
                      paras = paras.map(function (para) {
                          return dom.replace(para, 'P');
                      });
                  }
                  $$1.each(lists.from(paras).reverse(), function (idx, para) {
                      dom.insertAfter(para, headList);
                  });
                  // remove empty lists
                  var rootLists = lists.compact([headList, middleList, lastList]);
                  $$1.each(rootLists, function (idx, rootList) {
                      var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));
                      $$1.each(listNodes.reverse(), function (idx, listNode) {
                          if (!dom.nodeLength(listNode)) {
                              dom.remove(listNode, true);
                          }
                      });
                  });
              }
              releasedParas = releasedParas.concat(paras);
          });
          return releasedParas;
      };
      /**
       * @method appendToPrevious
       *
       * Appends list to previous list item, if
       * none exist it wraps the list in a new list item.
       *
       * @param {HTMLNode} ListItem
       * @return {HTMLNode}
       */
      Bullet.prototype.appendToPrevious = function (node) {
          return node.previousSibling
              ? dom.appendChildNodes(node.previousSibling, [node])
              : this.wrapList([node], 'LI');
      };
      /**
       * @method findList
       *
       * Finds an existing list in list item
       *
       * @param {HTMLNode} ListItem
       * @return {Array[]}
       */
      Bullet.prototype.findList = function (node) {
          return node
              ? lists.find(node.children, function (child) { return ['OL', 'UL'].indexOf(child.nodeName) > -1; })
              : null;
      };
      /**
       * @method findNextSiblings
       *
       * Finds all list item siblings that follow it
       *
       * @param {HTMLNode} ListItem
       * @return {HTMLNode}
       */
      Bullet.prototype.findNextSiblings = function (node) {
          var siblings = [];
          while (node.nextSibling) {
              siblings.push(node.nextSibling);
              node = node.nextSibling;
          }
          return siblings;
      };
      return Bullet;
  }());

  /**
   * @class editing.Typing
   *
   * Typing
   *
   */
  var Typing = /** @class */ (function () {
      function Typing(context) {
          // a Bullet instance to toggle lists off
          this.bullet = new Bullet(context);
          this.options = context.options;
      }
      /**
       * insert tab
       *
       * @param {WrappedRange} rng
       * @param {Number} tabsize
       */
      Typing.prototype.insertTab = function (rng, tabsize) {
          var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));
          rng = rng.deleteContents();
          rng.insertNode(tab, true);
          rng = range.create(tab, tabsize);
          rng.select();
      };
      /**
       * insert paragraph
       *
       * @param {jQuery} $editable
       * @param {WrappedRange} rng Can be used in unit tests to "mock" the range
       *
       * blockquoteBreakingLevel
       *   0 - No break, the new paragraph remains inside the quote
       *   1 - Break the first blockquote in the ancestors list
       *   2 - Break all blockquotes, so that the new paragraph is not quoted (this is the default)
       */
      Typing.prototype.insertParagraph = function (editable, rng) {
          rng = rng || range.create(editable);
          // deleteContents on range.
          rng = rng.deleteContents();
          // Wrap range if it needs to be wrapped by paragraph
          rng = rng.wrapBodyInlineWithPara();
          // finding paragraph
          var splitRoot = dom.ancestor(rng.sc, dom.isPara);
          var nextPara;
          // on paragraph: split paragraph
          if (splitRoot) {
              // if it is an empty line with li
              if (dom.isEmpty(splitRoot) && dom.isLi(splitRoot)) {
                  // toogle UL/OL and escape
                  this.bullet.toggleList(splitRoot.parentNode.nodeName);
                  return;
              }
              else {
                  var blockquote = null;
                  if (this.options.blockquoteBreakingLevel === 1) {
                      blockquote = dom.ancestor(splitRoot, dom.isBlockquote);
                  }
                  else if (this.options.blockquoteBreakingLevel === 2) {
                      blockquote = dom.lastAncestor(splitRoot, dom.isBlockquote);
                  }
                  if (blockquote) {
                      // We're inside a blockquote and options ask us to break it
                      nextPara = $$1(dom.emptyPara)[0];
                      // If the split is right before a <br>, remove it so that there's no "empty line"
                      // after the split in the new blockquote created
                      if (dom.isRightEdgePoint(rng.getStartPoint()) && dom.isBR(rng.sc.nextSibling)) {
                          $$1(rng.sc.nextSibling).remove();
                      }
                      var split = dom.splitTree(blockquote, rng.getStartPoint(), { isDiscardEmptySplits: true });
                      if (split) {
                          split.parentNode.insertBefore(nextPara, split);
                      }
                      else {
                          dom.insertAfter(nextPara, blockquote); // There's no split if we were at the end of the blockquote
                      }
                  }
                  else {
                      let splitTreeOptions = {}
                      if (typeof(this.options.clearEnterFormat) === 'boolean') {
                        splitTreeOptions.clearEnterFormat = this.options.clearEnterFormat
                      }
                  
                      nextPara = dom.splitTree(splitRoot, rng.getStartPoint(), splitTreeOptions);
                      // not a blockquote, just insert the paragraph
                      var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);
                      emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));
                      $$1.each(emptyAnchors, function (idx, anchor) {
                          dom.remove(anchor);
                      });
                      // replace empty heading, pre or custom-made styleTag with P tag
                      if ((dom.isHeading(nextPara) || dom.isPre(nextPara) || dom.isCustomStyleTag(nextPara)) && dom.isEmpty(nextPara)) {
                          nextPara = dom.replace(nextPara, 'p');
                      }
                  }
              }
              // no paragraph: insert empty paragraph
          }
          else {
              var next = rng.sc.childNodes[rng.so];
              nextPara = $$1(dom.emptyPara)[0];
              if (next) {
                  rng.sc.insertBefore(nextPara, next);
              }
              else {
                  rng.sc.appendChild(nextPara);
              }
          }
          range.create(nextPara, 0).normalize().select().scrollIntoView(editable);
      };
      return Typing;
  }());

  /**
   * @class Create a virtual table to create what actions to do in change.
   * @param {object} startPoint Cell selected to apply change.
   * @param {enum} where  Where change will be applied Row or Col. Use enum: TableResultAction.where
   * @param {enum} action Action to be applied. Use enum: TableResultAction.requestAction
   * @param {object} domTable Dom element of table to make changes.
   */
  var TableResultAction = function (startPoint, where, action, domTable) {
      var _startPoint = { 'colPos': 0, 'rowPos': 0 };
      var _virtualTable = [];
      var _actionCellList = [];
      /// ///////////////////////////////////////////
      // Private functions
      /// ///////////////////////////////////////////
      /**
       * Set the startPoint of action.
       */
      function setStartPoint() {
          if (!startPoint || !startPoint.tagName || (startPoint.tagName.toLowerCase() !== 'td' && startPoint.tagName.toLowerCase() !== 'th')) {
              console.error('Impossible to identify start Cell point.', startPoint);
              return;
          }
          _startPoint.colPos = startPoint.cellIndex;
          if (!startPoint.parentElement || !startPoint.parentElement.tagName || startPoint.parentElement.tagName.toLowerCase() !== 'tr') {
              console.error('Impossible to identify start Row point.', startPoint);
              return;
          }
          _startPoint.rowPos = startPoint.parentElement.rowIndex;
      }
      /**
       * Define virtual table position info object.
       *
       * @param {int} rowIndex Index position in line of virtual table.
       * @param {int} cellIndex Index position in column of virtual table.
       * @param {object} baseRow Row affected by this position.
       * @param {object} baseCell Cell affected by this position.
       * @param {bool} isSpan Inform if it is an span cell/row.
       */
      function setVirtualTablePosition(rowIndex, cellIndex, baseRow, baseCell, isRowSpan, isColSpan, isVirtualCell) {
          var objPosition = {
              'baseRow': baseRow,
              'baseCell': baseCell,
              'isRowSpan': isRowSpan,
              'isColSpan': isColSpan,
              'isVirtual': isVirtualCell
          };
          if (!_virtualTable[rowIndex]) {
              _virtualTable[rowIndex] = [];
          }
          _virtualTable[rowIndex][cellIndex] = objPosition;
      }
      /**
       * Create action cell object.
       *
       * @param {object} virtualTableCellObj Object of specific position on virtual table.
       * @param {enum} resultAction Action to be applied in that item.
       */
      function getActionCell(virtualTableCellObj, resultAction, virtualRowPosition, virtualColPosition) {
          return {
              'baseCell': virtualTableCellObj.baseCell,
              'action': resultAction,
              'virtualTable': {
                  'rowIndex': virtualRowPosition,
                  'cellIndex': virtualColPosition
              }
          };
      }
      /**
       * Recover free index of row to append Cell.
       *
       * @param {int} rowIndex Index of row to find free space.
       * @param {int} cellIndex Index of cell to find free space in table.
       */
      function recoverCellIndex(rowIndex, cellIndex) {
          if (!_virtualTable[rowIndex]) {
              return cellIndex;
          }
          if (!_virtualTable[rowIndex][cellIndex]) {
              return cellIndex;
          }
          var newCellIndex = cellIndex;
          while (_virtualTable[rowIndex][newCellIndex]) {
              newCellIndex++;
              if (!_virtualTable[rowIndex][newCellIndex]) {
                  return newCellIndex;
              }
          }
      }
      /**
       * Recover info about row and cell and add information to virtual table.
       *
       * @param {object} row Row to recover information.
       * @param {object} cell Cell to recover information.
       */
      function addCellInfoToVirtual(row, cell) {
          var cellIndex = recoverCellIndex(row.rowIndex, cell.cellIndex);
          var cellHasColspan = (cell.colSpan > 1);
          var cellHasRowspan = (cell.rowSpan > 1);
          var isThisSelectedCell = (row.rowIndex === _startPoint.rowPos && cell.cellIndex === _startPoint.colPos);
          setVirtualTablePosition(row.rowIndex, cellIndex, row, cell, cellHasRowspan, cellHasColspan, false);
          // Add span rows to virtual Table.
          var rowspanNumber = cell.attributes.rowSpan ? parseInt(cell.attributes.rowSpan.value, 10) : 0;
          if (rowspanNumber > 1) {
              for (var rp = 1; rp < rowspanNumber; rp++) {
                  var rowspanIndex = row.rowIndex + rp;
                  adjustStartPoint(rowspanIndex, cellIndex, cell, isThisSelectedCell);
                  setVirtualTablePosition(rowspanIndex, cellIndex, row, cell, true, cellHasColspan, true);
              }
          }
          // Add span cols to virtual table.
          var colspanNumber = cell.attributes.colSpan ? parseInt(cell.attributes.colSpan.value, 10) : 0;
          if (colspanNumber > 1) {
              for (var cp = 1; cp < colspanNumber; cp++) {
                  var cellspanIndex = recoverCellIndex(row.rowIndex, (cellIndex + cp));
                  adjustStartPoint(row.rowIndex, cellspanIndex, cell, isThisSelectedCell);
                  setVirtualTablePosition(row.rowIndex, cellspanIndex, row, cell, cellHasRowspan, true, true);
              }
          }
      }
      /**
       * Process validation and adjust of start point if needed
       *
       * @param {int} rowIndex
       * @param {int} cellIndex
       * @param {object} cell
       * @param {bool} isSelectedCell
       */
      function adjustStartPoint(rowIndex, cellIndex, cell, isSelectedCell) {
          if (rowIndex === _startPoint.rowPos && _startPoint.colPos >= cell.cellIndex && cell.cellIndex <= cellIndex && !isSelectedCell) {
              _startPoint.colPos++;
          }
      }
      /**
       * Create virtual table of cells with all cells, including span cells.
       */
      function createVirtualTable() {
          var rows = domTable.rows;
          for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
              var cells = rows[rowIndex].cells;
              for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                  addCellInfoToVirtual(rows[rowIndex], cells[cellIndex]);
              }
          }
      }
      /**
       * Get action to be applied on the cell.
       *
       * @param {object} cell virtual table cell to apply action
       */
      function getDeleteResultActionToCell(cell) {
          switch (where) {
              case TableResultAction.where.Column:
                  if (cell.isColSpan) {
                      return TableResultAction.resultAction.SubtractSpanCount;
                  }
                  break;
              case TableResultAction.where.Row:
                  if (!cell.isVirtual && cell.isRowSpan) {
                      return TableResultAction.resultAction.AddCell;
                  }
                  else if (cell.isRowSpan) {
                      return TableResultAction.resultAction.SubtractSpanCount;
                  }
                  break;
          }
          return TableResultAction.resultAction.RemoveCell;
      }
      /**
       * Get action to be applied on the cell.
       *
       * @param {object} cell virtual table cell to apply action
       */
      function getAddResultActionToCell(cell) {
          switch (where) {
              case TableResultAction.where.Column:
                  if (cell.isColSpan) {
                      return TableResultAction.resultAction.SumSpanCount;
                  }
                  else if (cell.isRowSpan && cell.isVirtual) {
                      return TableResultAction.resultAction.Ignore;
                  }
                  break;
              case TableResultAction.where.Row:
                  if (cell.isRowSpan) {
                      return TableResultAction.resultAction.SumSpanCount;
                  }
                  else if (cell.isColSpan && cell.isVirtual) {
                      return TableResultAction.resultAction.Ignore;
                  }
                  break;
          }
          return TableResultAction.resultAction.AddCell;
      }
      function init() {
          setStartPoint();
          createVirtualTable();
      }
      /// ///////////////////////////////////////////
      // Public functions
      /// ///////////////////////////////////////////
      /**
       * Recover array os what to do in table.
       */
      this.getActionList = function () {
          var fixedRow = (where === TableResultAction.where.Row) ? _startPoint.rowPos : -1;
          var fixedCol = (where === TableResultAction.where.Column) ? _startPoint.colPos : -1;
          var actualPosition = 0;
          var canContinue = true;
          while (canContinue) {
              var rowPosition = (fixedRow >= 0) ? fixedRow : actualPosition;
              var colPosition = (fixedCol >= 0) ? fixedCol : actualPosition;
              var row = _virtualTable[rowPosition];
              if (!row) {
                  canContinue = false;
                  return _actionCellList;
              }
              var cell = row[colPosition];
              if (!cell) {
                  canContinue = false;
                  return _actionCellList;
              }
              // Define action to be applied in this cell
              var resultAction = TableResultAction.resultAction.Ignore;
              switch (action) {
                  case TableResultAction.requestAction.Add:
                      resultAction = getAddResultActionToCell(cell);
                      break;
                  case TableResultAction.requestAction.Delete:
                      resultAction = getDeleteResultActionToCell(cell);
                      break;
              }
              _actionCellList.push(getActionCell(cell, resultAction, rowPosition, colPosition));
              actualPosition++;
          }
          return _actionCellList;
      };
      init();
  };
  /**
  *
  * Where action occours enum.
  */
  TableResultAction.where = { 'Row': 0, 'Column': 1 };
  /**
  *
  * Requested action to apply enum.
  */
  TableResultAction.requestAction = { 'Add': 0, 'Delete': 1 };
  /**
  *
  * Result action to be executed enum.
  */
  TableResultAction.resultAction = { 'Ignore': 0, 'SubtractSpanCount': 1, 'RemoveCell': 2, 'AddCell': 3, 'SumSpanCount': 4 };
  /**
   *
   * @class editing.Table
   *
   * Table
   *
   */
  var Table = /** @class */ (function () {
      function Table() {
      }
      /**
       * handle tab key
       *
       * @param {WrappedRange} rng
       * @param {Boolean} isShift
       */
      Table.prototype.tab = function (rng, isShift) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var table = dom.ancestor(cell, dom.isTable);
          var cells = dom.listDescendant(table, dom.isCell);
          var nextCell = lists[isShift ? 'prev' : 'next'](cells, cell);
          if (nextCell) {
              range.create(nextCell, 0).select();
          }
      };
      /**
       * Add a new row
       *
       * @param {WrappedRange} rng
       * @param {String} position (top/bottom)
       * @return {Node}
       */
      Table.prototype.addRow = function (rng, position) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var currentTr = $$1(cell).closest('tr');
          var trAttributes = this.recoverAttributes(currentTr);
          var html = $$1('<tr' + trAttributes + '></tr>');
          var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Add, $$1(currentTr).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var idCell = 0; idCell < actions.length; idCell++) {
              var currentCell = actions[idCell];
              var tdAttributes = this.recoverAttributes(currentCell.baseCell);
              switch (currentCell.action) {
                  case TableResultAction.resultAction.AddCell:
                      html.append('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      break;
                  case TableResultAction.resultAction.SumSpanCount:
                      if (position === 'top') {
                          var baseCellTr = currentCell.baseCell.parent;
                          var isTopFromRowSpan = (!baseCellTr ? 0 : currentCell.baseCell.closest('tr').rowIndex) <= currentTr[0].rowIndex;
                          if (isTopFromRowSpan) {
                              var newTd = $$1('<div></div>').append($$1('<td' + tdAttributes + '>' + dom.blank + '</td>').removeAttr('rowspan')).html();
                              html.append(newTd);
                              break;
                          }
                      }
                      var rowspanNumber = parseInt(currentCell.baseCell.rowSpan, 10);
                      rowspanNumber++;
                      currentCell.baseCell.setAttribute('rowSpan', rowspanNumber);
                      break;
              }
          }
          if (position === 'top') {
              currentTr.before(html);
          }
          else {
              var cellHasRowspan = (cell.rowSpan > 1);
              if (cellHasRowspan) {
                  var lastTrIndex = currentTr[0].rowIndex + (cell.rowSpan - 2);
                  $$1($$1(currentTr).parent().find('tr')[lastTrIndex]).after($$1(html));
                  return;
              }
              currentTr.after(html);
          }
      };
      /**
       * Add a new col
       *
       * @param {WrappedRange} rng
       * @param {String} position (left/right)
       * @return {Node}
       */
      Table.prototype.addCol = function (rng, position) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var rowsGroup = $$1(row).siblings();
          rowsGroup.push(row);
          var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Add, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              var currentCell = actions[actionIndex];
              var tdAttributes = this.recoverAttributes(currentCell.baseCell);
              switch (currentCell.action) {
                  case TableResultAction.resultAction.AddCell:
                      if (position === 'right') {
                          $$1(currentCell.baseCell).after('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      else {
                          $$1(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      break;
                  case TableResultAction.resultAction.SumSpanCount:
                      if (position === 'right') {
                          var colspanNumber = parseInt(currentCell.baseCell.colSpan, 10);
                          colspanNumber++;
                          currentCell.baseCell.setAttribute('colSpan', colspanNumber);
                      }
                      else {
                          $$1(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      break;
              }
          }
      };
      /*
      * Copy attributes from element.
      *
      * @param {object} Element to recover attributes.
      * @return {string} Copied string elements.
      */
      Table.prototype.recoverAttributes = function (el) {
          var resultStr = '';
          if (!el) {
              return resultStr;
          }
          var attrList = el.attributes || [];
          for (var i = 0; i < attrList.length; i++) {
              if (attrList[i].name.toLowerCase() === 'id') {
                  continue;
              }
              if (attrList[i].specified) {
                  resultStr += ' ' + attrList[i].name + '=\'' + attrList[i].value + '\'';
              }
          }
          return resultStr;
      };
      /**
       * Delete current row
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteRow = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var cellPos = row.children('td, th').index($$1(cell));
          var rowPos = row[0].rowIndex;
          var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Delete, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              if (!actions[actionIndex]) {
                  continue;
              }
              var baseCell = actions[actionIndex].baseCell;
              var virtualPosition = actions[actionIndex].virtualTable;
              var hasRowspan = (baseCell.rowSpan && baseCell.rowSpan > 1);
              var rowspanNumber = (hasRowspan) ? parseInt(baseCell.rowSpan, 10) : 0;
              switch (actions[actionIndex].action) {
                  case TableResultAction.resultAction.Ignore:
                      continue;
                  case TableResultAction.resultAction.AddCell:
                      var nextRow = row.next('tr')[0];
                      if (!nextRow) {
                          continue;
                      }
                      var cloneRow = row[0].cells[cellPos];
                      if (hasRowspan) {
                          if (rowspanNumber > 2) {
                              rowspanNumber--;
                              nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                              nextRow.cells[cellPos].setAttribute('rowSpan', rowspanNumber);
                              nextRow.cells[cellPos].innerHTML = '';
                          }
                          else if (rowspanNumber === 2) {
                              nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                              nextRow.cells[cellPos].removeAttribute('rowSpan');
                              nextRow.cells[cellPos].innerHTML = '';
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.SubtractSpanCount:
                      if (hasRowspan) {
                          if (rowspanNumber > 2) {
                              rowspanNumber--;
                              baseCell.setAttribute('rowSpan', rowspanNumber);
                              if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                          else if (rowspanNumber === 2) {
                              baseCell.removeAttribute('rowSpan');
                              if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.RemoveCell:
                      // Do not need remove cell because row will be deleted.
                      continue;
              }
          }
          row.remove();
      };
      /**
       * Delete current col
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteCol = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var cellPos = row.children('td, th').index($$1(cell));
          var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Delete, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              if (!actions[actionIndex]) {
                  continue;
              }
              switch (actions[actionIndex].action) {
                  case TableResultAction.resultAction.Ignore:
                      continue;
                  case TableResultAction.resultAction.SubtractSpanCount:
                      var baseCell = actions[actionIndex].baseCell;
                      var hasColspan = (baseCell.colSpan && baseCell.colSpan > 1);
                      if (hasColspan) {
                          var colspanNumber = (baseCell.colSpan) ? parseInt(baseCell.colSpan, 10) : 0;
                          if (colspanNumber > 2) {
                              colspanNumber--;
                              baseCell.setAttribute('colSpan', colspanNumber);
                              if (baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                          else if (colspanNumber === 2) {
                              baseCell.removeAttribute('colSpan');
                              if (baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.RemoveCell:
                      dom.remove(actions[actionIndex].baseCell, true);
                      continue;
              }
          }
      };
      /**
       * create empty table element
       *
       * @param {Number} rowCount
       * @param {Number} colCount
       * @return {Node}
       */
      Table.prototype.createTable = function (colCount, rowCount, options) {
          var tds = [];
          var tdHTML;
          for (var idxCol = 0; idxCol < colCount; idxCol++) {
              tds.push('<td>' + dom.blank + '</td>');
          }
          tdHTML = tds.join('');
          var trs = [];
          var trHTML;
          for (var idxRow = 0; idxRow < rowCount; idxRow++) {
              trs.push('<tr>' + tdHTML + '</tr>');
          }
          trHTML = trs.join('');
          var $table = $$1('<table border="1" cellpadding="0" cellspacing="0">' + trHTML + '</table>');
          if (options && options.tableClassName) {
              $table.addClass(options.tableClassName);
          }
          return $table[0];
      };
      /**
       * Delete current table
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteTable = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          $$1(cell).closest('table').remove();
      };
      return Table;
  }());

  var KEY_BOGUS = 'bogus';
  /**
   * @class Editor
   */
  var Editor = /** @class */ (function () {
      function Editor(context) {
          var _this = this;
          this.context = context;
          this.$note = context.layoutInfo.note;
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.editable = this.$editable[0];
          this.lastRange = null;
          this.lastBlurRange = null;
          this.lastBlurScroll = null;
          this.lastScrollPostion = null;
          this.style = new Style();
          this.table = new Table();
          this.typing = new Typing(context);
          this.bullet = new Bullet(context);
          this.history = new History(this.$editable);
          this.isFocus = false
          this.isBlurSaveRange = false
          this.context.memo('help.undo', this.lang.help.undo);
          this.context.memo('help.redo', this.lang.help.redo);
          this.context.memo('help.tab', this.lang.help.tab);
          this.context.memo('help.untab', this.lang.help.untab);
          this.context.memo('help.insertParagraph', this.lang.help.insertParagraph);
          this.context.memo('help.insertOrderedList', this.lang.help.insertOrderedList);
          this.context.memo('help.insertUnorderedList', this.lang.help.insertUnorderedList);
          this.context.memo('help.indent', this.lang.help.indent);
          this.context.memo('help.outdent', this.lang.help.outdent);
          this.context.memo('help.formatPara', this.lang.help.formatPara);
          this.context.memo('help.insertHorizontalRule', this.lang.help.insertHorizontalRule);
          this.context.memo('help.fontName', this.lang.help.fontName);
          this.context.memo('help.comment', this.lang.help.comment);
          this.context.memo('help.uncomment', this.lang.help.uncomment);
          this.context.memo('help.SaveSnippet', this.lang.help.SaveSnippet);
          this.context.memo('help.htmlify', this.lang.help.htmlify);
          
          // native commands(with execCommand), generate function for execCommand
          var commands = [
              'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
              'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
              'formatBlock', 'removeFormat', 'backColor'
          ];
          for (var idx = 0, len = commands.length; idx < len; idx++) {
              this[commands[idx]] = (function (sCmd) {
                  return function (value) {
                      _this.beforeCommand();
                      document.execCommand(sCmd, false, value);
                      _this.afterCommand(true);
                  };
              })(commands[idx]);
              this.context.memo('help.' + commands[idx], this.lang.help[commands[idx]]);
          }
          /**
           * @author Pulipuli Chen 20190703
           */
          this.comment = this.wrapCommand(function () {
            // 要看現在指向的對象有沒有note-editor-comment
            //_this.context.layoutInfo.commentDialog.show()
            
            var rng = _this.createRange();
            
            var element = rng.ec
            if (element.nodeType === 3) {
              element = element.parentElement
            }
            //console.log(element)
            if ($$1(element).hasClass('note-editor-comment')) {
              //console.log(rng)
              _this.context.invoke('commentDialog.show')
              return
            }
            
            if (this.hasSelectedRange() === false) {
              return false
            }
            
            return _this.inlineStyling({
              tagName: 'span',
              className: 'note-editor-comment'
            });
          });
          /**
           * @author Pulipuli Chen 20190709
           */
          this.uncomment = this.wrapCommand(function () {
            // 要看現在指向的對象有沒有note-editor-comment
            //_this.context.layoutInfo.commentDialog.show()
            
            var rng = _this.createRange();
            let scElement = rng.sc
            if (scElement.nodeType === 3) {
              scElement = scElement.parentElement
            }
            let ecElement = rng.ec
            if (ecElement.nodeType === 3) {
              ecElement = ecElement.parentElement
            }
            
            let elements = [scElement]
            
            if (scElement !== ecElement) {
              elements.push(ecElement)
            }
            
            let doUncomment = false
            elements.forEach((element) => {
              //console.log(element)
              let $element = $$1(element)
              if ($element.hasClass('note-editor-comment')) {
                //console.log(rng)
                $element.removeClass('note-editor-comment')
                //$element.replaceWith($element.html())
                _this.context.triggerEvent('change', _this.$editable.html());
                doUncomment = true
              }
              else {
                let $parent = $element.parents('.note-editor-comment:first')
                if ($parent.length > 0) {
                  //$parent.replaceWith($parent.html())
                  $parent.removeClass('note-editor-comment')
                  _this.context.triggerEvent('change', _this.$editable.html());
                  doUncomment = true
                }
              }
                
            })
            
            if (doUncomment === false) {
              return this.comment()
            }
            else {
              return this
            }
              
          });
          
          /**
           * @author Pulipuli Chen 20190715
           * @returns {Editor.Editor}
           */
          this.htmlify = function () {
            //var rng = _this.createRange();
            //let text = ''
            //console.log(rng)
            let sel = window.getSelection();
            //console.log(sel)
            if (typeof(sel.focusNode) === 'object') {
              let html = sel.toString()
              if (typeof(html) !== 'string') {
                return
              }
              else {
                html = html.trim()
              }
              //html = html.slice(sel.anchorOffset, sel.extentOffset)
              
              
              
              
              if (html.startsWith('<') && html.endsWith('>')) {
                let range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode($$1(html)[0]);
                _this.context.triggerEvent('change', _this.$editable.html());
              }
            }
            return this
          }
          
          
          /**
           * @author Pulipuli Chen 20190715
           * @returns {Editor.Editor}
           */
          this.textify = function () {
            //var rng = _this.createRange();
            //let text = ''
            //console.log(rng)
            let sel = window.getSelection();
            console.log(sel)
            if (typeof(sel.focusNode) === 'object') {
              let node = sel.focusNode
              if (node.nodeType === 3) {
                node = node.parentNode
              }
              let html = node.outerHTML
              console.log(html)
              if (typeof(html) !== 'string') {
                return
              }
              else {
                html = html.trim()
              }
              //html = html.slice(sel.anchorOffset, sel.extentOffset)
              
              
              
              
              if (html !== '') {
                let range = sel.getRangeAt(0);
                range.deleteContents();
                let pTag = $$1('<p></p>').text(html)
                range.insertNode($$1(pTag)[0]);
                _this.context.triggerEvent('change', _this.$editable.html());
              }
            }
            return this
          }
          
          this.replaceSelectedText = function (replacementText) {
              var sel, range;
              if (window.getSelection) {
                  sel = window.getSelection();
                  if (sel.rangeCount) {
                      range = sel.getRangeAt(0);
                      range.deleteContents();
                      range.insertNode(document.createTextNode(replacementText));
                  }
              } else if (document.selection && document.selection.createRange) {
                  range = document.selection.createRange();
                  range.text = replacementText;
              }
          }
          
          this.insertIframe = this.wrapCommand(function (iframeInfo) {
            let url
            let enableNewWindow = true
            let enablePopup = true
            let title
            if (typeof(iframeInfo) === 'string') {
              url = iframeInfo
            }
            else if (typeof(iframeInfo) === 'object') {
              if (typeof(iframeInfo.url) === 'string') {
                url = iframeInfo.url
              }
              if (typeof(iframeInfo.enableNewWindow) === 'boolean') {
                enableNewWindow = iframeInfo.enableNewWindow
              }
              if (typeof(iframeInfo.enablePopup) === 'boolean') {
                enablePopup = iframeInfo.enablePopup
              }
              if (typeof(iframeInfo.title) === 'string' && iframeInfo.title.trim() !== '') {
                title = iframeInfo.title.trim()
              }
            }
            
            let name = url
            if (name.lastIndexOf('/') > 0) {
              name = name.slice(name.lastIndexOf('/') + 1)
            }
            if (name.lastIndexOf('#') > 0) {
              name = name.slice(0, name.lastIndexOf('#'))
            }
            
            let langNewWindow = this.lang.iframe.newWindow //'Open in new window'
            let langPopupWindow = this.lang.iframe.popupWindow // 'Open in popup window'
            
            let links = []
            if (enableNewWindow === true) {
              if (title === undefined) {
                links.push(`<li><a href="${url}" target="${name}">${langNewWindow}</a></li>`)
              }
              else {
                links.push(`<li>${langNewWindow}: <a href="${url}" target="${name}">${title}</a></li>`)
              }
            }
            if (enablePopup === true) {
              if (title === undefined) {
                links.push(`<li><a href="javascript:window.open('${url}', '${name}', 'width=800,height=600,toolbar=0,menubar=0,location=0')">${langPopupWindow}</a></li>`)
              }
              else {
                links.push(`<li>${langPopupWindow}: <a href="javascript:window.open('${url}', '${name}', 'width=800,height=600,toolbar=0,menubar=0,location=0')">${title}</a></li>`)
              }
            }
            
            if (links.length > 0) {
              links = '<ul>' + links.join('\n') + '</ul>'
            }
            else {
              links = ''
            }
            
            let html = `<div>
  <iframe src="${url}" width="100%" style="height: 90vh" frameborder="0" class="post-iframe"></iframe>
</div>
${links}`
            _this.insert(html)
          })
          
          this.fontName = this.wrapCommand(function (value) {
            if (this.hasSelectedRange() === false) {
              return false
            }
            
              return _this.fontStyling('font-family', "\'" + value + "\'");
          });
          this.fontSize = this.wrapCommand(function (value) {
            if (this.hasSelectedRange() === false) {
              return false
            }
            
              return _this.fontStyling('font-size', value + 'px');
          });
          for (var idx = 1; idx <= 6; idx++) {
              this['formatH' + idx] = (function (idx) {
                  return function () {
                      _this.formatBlock('H' + idx);
                  };
              })(idx);
              this.context.memo('help.formatH' + idx, this.lang.help['formatH' + idx]);
          }
          this.insertParagraph = this.wrapCommand(function () {
              _this.typing.insertParagraph(_this.editable);
          });
          this.insertOrderedList = this.wrapCommand(function () {
              _this.bullet.insertOrderedList(_this.editable);
          });
          this.insertUnorderedList = this.wrapCommand(function () {
              _this.bullet.insertUnorderedList(_this.editable);
          });
          this.indent = this.wrapCommand(function () {
              _this.bullet.indent(_this.editable);
          });
          this.outdent = this.wrapCommand(function () {
              _this.bullet.outdent(_this.editable);
          });
          /**
           * insertNode
           * insert node
           * @param {Node} node
           */
          this.insertNode = this.wrapCommand(function (node) {
              //if (typeof(node) === "string") {
              //  node = dom.create(node)
              //}
              if (_this.isLimited($$1(node).text().length)) {
                  return;
              }
              
              if (this.isFocus === false) {
                this.restoreBlurRange()
              }
              
              var rng = _this.createRange();
              node = rng.insertNode(node);
              range.createFromNodeAfter(node).select();
              this.removeEmptySibling(node)
              
              setTimeout(() => {
                this.saveBlurRange()
              }, 0)
          });
          /**
           * @author Pulipuli Chen 20190624
           */
          this.insert = this.wrapCommand(function (node) {
            this.focus()
            let insertType = 'insertNode'
            if (typeof(node) === 'string') {
              let text = node
              node = node.trim()
              if (!( (node.startsWith('<') && node.endsWith('>')) )) {
                insertType = 'insertText'
                node = text
              }
            }
            this[insertType](node)
            //if (insertType === 'insertType') {
            //  this.clearEnterFormat()
            //}
            return node
          })
          
          /**
           * obj.summernote('editor.copyPlainHTML')
           * @author Pulipuli Chen 20190624
           * @returns {summernote-liteL#16.summernote-liteL#16#Editor.Editor}
           */
          this.copyPlainHTML = function () {
            let code = _this.context.invoke('code');
            //console.log(code)
            copyPlainText(code)
            return this
          }
          
          /**
           * obj.summernote('editor.copyPlainText')
           * @author Pulipuli Chen 20190624
           * @returns {summernote-liteL#16.summernote-liteL#16#Editor.Editor}
           */
          this.copyPlainText = function () {
            let code = _this.context.invoke('text');
            //console.log(code)
            copyPlainText(code)
            return this
          }
          
          /**
           * obj.summernote('editor.copyRichFormatHTML')
           * @author Pulipuli Chen 20190624
           * @returns {summernote-liteL#16.summernote-liteL#16#Editor.Editor}
           */
          this.copyRichFormatHTML = function () {
            let code = _this.context.invoke('code');
            //console.log(code)
            copyRichFormat(code)
            return this
          }
          
          /**
           * @author Pulipuli Chen 20190624
           */
          this.text = function (codeText) {
            if (codeText === undefined) {
              return _this.$editable.text()
            }
            else {
              //return this.insert(insertText)
              return _this.context.invoke('code', codeText);
            }
          }
          
          /**
           * insert text
           * @param {String} text
           */
          this.insertText = this.wrapCommand(function (text) {
              if (_this.isLimited(text.length)) {
                  return;
              }
              
              //console.log(this.isFocus)
              if (this.isFocus === false) {
                this.restoreBlurRange()
              }
              
              //console.trace(`[${text}]`)
              var rng = _this.createRange();
              var textNode = rng.insertNode(dom.createText(text));
              range.create(textNode, dom.nodeLength(textNode)).select();
              
              setTimeout(() => {
                this.saveBlurRange()
              }, 0)
          });
          
          /**
           * paste HTML
           * @param {String} markup
           */
          this.pasteHTML = this.wrapCommand(function (markup) {
              if (_this.isLimited(markup.length)) {
                  return;
              }
              var contents = _this.createRange().pasteHTML(markup);
              range.createFromNodeAfter(lists.last(contents)).select();
          });
          
          /**
           * formatBlock
           *
           * @param {String} tagName
           */
          this.formatBlock = this.wrapCommand(function (tagName, $target) {
              var onApplyCustomStyle = _this.options.callbacks.onApplyCustomStyle;
              if (onApplyCustomStyle) {
                  onApplyCustomStyle.call(_this, $target, _this.context, _this.onFormatBlock);
              }
              else {
                  _this.onFormatBlock(tagName, $target);
              }
          });
          
          /**
           * insert horizontal rule
           */
          this.insertHorizontalRule = this.wrapCommand(function () {
              let hrNode = _this.createRange().insertNode(dom.create('HR'));
              let prev = $(hrNode).prev()
              if (prev.length > 0 && prev.text().trim() === '') {
                  prev.remove()
              }
              let next = $(hrNode).next()
              if (next.length > 0 && next.text().trim() === '') {
                  next.remove()
              }
              if (hrNode.nextSibling) {
                  range.create(hrNode.nextSibling, 0).normalize().select();
              }
          });
          
          /**
           * lineHeight
           * @param {String} value
           */
          this.lineHeight = this.wrapCommand(function (value) {
            if (this.hasSelectedRange() === false) {
              return false
            }
            
              _this.style.stylePara(_this.createRange(), {
                  lineHeight: value
              });
          });
          
          /**
           * create link (command)
           *
           * @param {Object} linkInfo
           */
          this.createLink = this.wrapCommand(function (linkInfo) {
              var linkUrl = linkInfo.url.trim();
              if (linkUrl.trim() === '' 
                  || !( (linkUrl.startsWith("//") === false && linkUrl.length > 10)
                  || (linkUrl.startsWith("http://") !== false && linkUrl.length > 20)
                  || (linkUrl.startsWith("https://") !== false && linkUrl.length > 20)
                  || (linkUrl.startsWith("#") !== false && linkUrl.length > 1)
                  || (linkUrl.startsWith("filesystem:") !== false && linkUrl.length > 20)
                  )
                ) {
                //console.log([linkUrl, linkUrl.length])
                this.unlink()
                return
              }
              //console.log(linkInfo)
              var linkText = linkInfo.text;
              var linkTitle = linkInfo.title;
              //var isNewWindow = linkInfo.isNewWindow;
              let openMethod = linkInfo.openMethod;
              var rng = linkInfo.range || _this.createRange();
              var additionalTextLength = linkText.length - rng.toString().length;
              if (additionalTextLength > 0 && _this.isLimited(additionalTextLength)) {
                  return;
              }
              var isTextChanged = rng.toString() !== linkText;
              // handle spaced urls from input
              if (typeof linkUrl === 'string') {
                  linkUrl = linkUrl.trim();
              }
              if (_this.options.onCreateLink) {
                  linkUrl = _this.options.onCreateLink(linkUrl);
              }
              else {
                  // if url is not relative,
                  if (!/^\.?\/(.*)/.test(linkUrl)) {
                      // if url doesn't match an URL schema, set http:// as default
                      linkUrl = /^[A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?/.test(linkUrl)
                          ? linkUrl : 'http://' + linkUrl;
                  }
              }
              var anchors = [];
              if (isTextChanged) {
                  rng = rng.deleteContents();
                  var anchor = rng.insertNode($$1('<A>' + linkText + '</A>')[0]);
                  anchors.push(anchor);
              }
              else {
                  anchors = _this.style.styleNodes(rng, {
                      nodeName: 'A',
                      expandClosestSibling: true,
                      onlyPartialContains: true
                  });
              }
              $$1.each(anchors, function (idx, anchor) {
                  if (openMethod === 'blank' || openMethod === 'current') {
                    $$1(anchor).attr('href', linkUrl);
                  }
                  else {
                    let popupScript = `javascript:window.open("${linkUrl}", "_blank", "width=800,height=600,toolbar=0,menubar=0,location=0")`
                    //console.log(popupScript)
                    $$1(anchor).attr('href', popupScript);
                  }
                  
                  if (linkTitle !== undefined && linkTitle.trim() !== '') {
                    $$1(anchor).attr('title', linkTitle.trim());
                  }
                  else {
                    $$1(anchor).removeAttr('title')
                  }
                  
                  if (openMethod === 'blank') {
                      $$1(anchor).attr('target', '_blank');
                  }
                  else if (openMethod === 'current' || openMethod === 'popup') {
                      $$1(anchor).removeAttr('target');
                  }
              });
              var startRange = range.createFromNodeBefore(lists.head(anchors));
              var startPoint = startRange.getStartPoint();
              var endRange = range.createFromNodeAfter(lists.last(anchors));
              var endPoint = endRange.getEndPoint();
              range.create(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset).select();
              
              //console.log($$1(anchor).text())
              //let sel = window.getSelection();
              //range.setStart(range.s, 0);
              //console.log(range)
          });
          
          /**
           * updateComment (command)
           * 
           * @author Pulipuli Chen 20190703
           * @param {Object} linkInfo
           */
          this.updateComment = this.wrapCommand(function (commentInfo) {
              var title = commentInfo.title
              
              var rng = commentInfo.range || _this.createRange();
              //var additionalTextLength = commentInfo.length - rng.toString().length;
              //if (additionalTextLength > 0 && _this.isLimited(additionalTextLength)) {
              //    return;
              //}
              
              //var isTextChanged = false;
              // handle spaced urls from input
              if (typeof title === 'string') {
                  title = title.trim();
              }
              
              // 這邊我想要改它的範圍
              let comment = rng.sc
              if (rng.sc.nodeType === 3) {
                comment = rng.sc.parentElement
              }
              let $comment = $$1(comment)
              if ($comment.hasClass('note-editor-comment') === false) {
                $comment = $comment.parents('.note-editor-comment:first')
              }
              if ($comment.length > 0) {
                $comment.attr('title', title)
                return
              }
              
              // --------------------------------------
              
              var anchors = [];
              anchors = _this.style.styleNodes(rng, {
                  nodeName: 'span',
                  expandClosestSibling: true,
                  onlyPartialContains: true
              });
              
              $$1.each(anchors, function (idx, anchor) {
                  $$1(anchor).addClass('note-editor-comment');
                  
                  if (title !== undefined && title.trim() !== '') {
                    $$1(anchor).attr('title', title)
                  }
                  else {
                    $$1(anchor).removeAttr('title')
                  }
              });
              
              var startRange = range.createFromNodeBefore(lists.head(anchors));
              var startPoint = startRange.getStartPoint();
              var endRange = range.createFromNodeAfter(lists.last(anchors));
              var endPoint = endRange.getEndPoint();
              range.create(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset).select();
              
              //console.log($$1(anchor).text())
              //let sel = window.getSelection();
              //range.setStart(range.s, 0);
              //console.log(range)
              _this.context.triggerEvent('change', _this.$editable.html());
          });
          
          /**
           * updateComment (command)
           * 
           * @author Pulipuli Chen 20190703
           * @param {Object} linkInfo
           */
          this.removeComment = this.wrapCommand(function (commentInfo) {
              var rng = commentInfo.range || _this.createRange();
              
              // 這邊我想要改它的範圍
              let comment = rng.sc
              if (rng.sc.nodeType === 3) {
                comment = rng.sc.parentElement
              }
              let $comment = $$1(comment)
              if ($comment.hasClass('note-editor-comment') === false) {
                $comment = $comment.parents('.note-editor-comment:first')
              }
              if ($comment.length > 0) {
                $comment.removeClass("note-editor-comment")
                $comment.removeAttr('title')
              }
              _this.context.triggerEvent('change', _this.$editable.html());
          });
          /**
           * setting color
           *
           * @param {Object} sObjColor  color code
           * @param {String} sObjColor.foreColor foreground color
           * @param {String} sObjColor.backColor background color
           */
          this.color = this.wrapCommand(function (colorInfo) {
              //console.log(colorInfo)
              if (this.hasSelectedRange() === false) {
                return
              }
              
              var foreColor = colorInfo.foreColor;
              var backColor = colorInfo.backColor;
              if (foreColor) {
                  document.execCommand('foreColor', false, foreColor);
              }
              if (backColor) {
                  document.execCommand('backColor', false, backColor);
              }
          });
          /**
           * Set foreground color
           *
           * @param {String} colorCode foreground color code
           */
          this.foreColor = this.wrapCommand(function (colorInfo) {
              // 檢查一下是否有選取對象
              if (this.hasSelectedRange() === false) {
                return
              }
            
              document.execCommand('styleWithCSS', false, true);
              document.execCommand('foreColor', false, colorInfo);
          });
          /**
           * insert Table
           *
           * @param {String} dimension of table (ex : "5x5")
           */
          this.insertTable = this.wrapCommand(function (dim) {
              var dimension = dim.split('x');
              var rng = _this.createRange().deleteContents();
              let table = _this.table.createTable(dimension[0], dimension[1], _this.options)
              rng.insertNode(table);
              //this.removeEmptySibling(table)
          });
          /**
           * remove media object and Figure Elements if media object is img with Figure.
           */
          this.removeMedia = this.wrapCommand(function () {
              //console.log('removeMedia')
              var $target = $$1(_this.restoreTarget()).parent();
              //console.log($target.prop("tagName"))
              if ($target.parent('figure').length) {
                $target.parent('figure').remove();
              }
              else if ($target.prop('tagName').toLowerCase() === 'a') {
                //_this.context.invoke('editor.saveScrollPosition')
                //$target.remove();
                //_this.context.invoke('insertNode', '<p></p>')
                //$target.replaceWith($('<p><br /></p>')[0])
                $target.replaceWith($(`<p>${blankHTML}</p>`)[0])
                _this.context.triggerEvent('change', _this.$editable.html());
                //setTimeout(() => {
                //  _this.context.invoke('editor.restoreScrollPosition')
                //}, 0)
                //$target.replaceWith('<p></p>')
                //console.log('this.removeMedia')
              }
              else {
                //$target = $$1(_this.restoreTarget()).detach();
                
                //console.log($target.html().trim())
                //let parent = $target.parent()
                //while (parent.hasClass('note-editable') === false && parent.children())
                /*
                console.log(parent.prop("tagName"))
                while ($target.html() !== undefined && $target.html().trim() === "") {
                  $target.remove()
                  $target = parent
                  parent = $target.parent()
                  console.log(parent.prop("tagName"))
                  if (parent.hasClass("note-editable")) {
                    break
                  }
                }
                */
                $target = $$1(_this.restoreTarget()).detach();
              }
              _this.context.triggerEvent('media.delete', $target, _this.$editable);
          });
          /**
           * remove link
           * @author Pulipuli Chen 20190517
           */
          this.removeLink = this.wrapCommand(function () {
              var rng = this.createRange();
              if (rng.isOnAnchor()) {
                  var anchor = dom.ancestor(rng.sc, dom.isAnchor);
                  rng = range.createFromNode(anchor);
                  rng.select();
                  this.beforeCommand();
                  document.execCommand('delete')
                  this.afterCommand();
                  _this.context.triggerEvent('link.delete', $(rng.sc), _this.$editable);
              }
          });
          /**
           * copy link
           * @author Pulipuli Chen 20190517
           */
          this.copyLink = this.wrapCommand(function () {
              let rng = this.createRange();
              if (rng.isOnAnchor()) {
                  let anchor = dom.ancestor(rng.sc, dom.isAnchor);
                  rng = range.createFromNode(anchor);
                  let link = rng.sc.href
                  //console.log(link)
                  copyPlainText(link)
              }
          });
          /**
           * save media object and Figure Elements if media object is img with Figure.
           * @author Pulipuli Chen 20190421
           */
          this.saveMedia = this.wrapCommand(function () {
              //console.log('openMedia')
              
              var $target = $$1(_this.restoreTarget());
              //console.log($target.prop("tagName"))
              if ($target.attr('src') !== undefined) {
                let src = $target.attr('src')
                let windowName
                if (src.startsWith('data:') === false) {
                  windowName = src.slice(src.lastIndexOf('/') + 1)
                  if (windowName.indexOf('?') > -1) {
                    windowName = windowName.slice(0, windowName.indexOf('?'))
                  }
                  windowName = decodeURIComponent(windowName)
                }
                else {
                  let mime = src.slice(src.indexOf('/') + 1, src.indexOf(';'))
                  windowName = `image.${mime}`
                }
                //window.open(src, windowName)
                //console.log(['save media', windowName, src])
                this.saveFile(src, windowName)
                
                _this.context.triggerEvent('media.save', $target, _this.$editable);
              }
          });
          
          /**
           * code media link
           * @author Pulipuli Chen 20190517
           */
          this.copyMediaLink = this.wrapCommand(function () {
              //console.log('copyMediaLink')
              
              var $target = $$1(_this.restoreTarget());
              //console.log($target.prop("tagName"))
              if ($target.attr('src') !== undefined) {
                let src = $target.attr('src')
                copyPlainText(src)
                _this.context.triggerEvent('media.copyLink', $target, _this.$editable);
              }
          });

          /**
           * open media object and Figure Elements if media object is img with Figure.
           * @author Pulipuli Chen 20190421
           */
          this.openMedia = this.wrapCommand(function () {
              //console.log('openMedia')
              
              var $target = $$1(_this.restoreTarget());
              //console.log($target.prop("tagName"))
              if ($target.attr('src') !== undefined) {
                let src = $target.attr('src')
                let windowName = '_blank'
                if (src.startsWith('data:') === false && src.startsWith('filesystem:') === false ) {
                  windowName = src.slice(src.lastIndexOf('/') + 1)
                  windowName = decodeURIComponent(windowName)
                  //console.log(src)
                  window.open(src, windowName)
                }
                else {
                  let image = new Image();
                  image.src = src;
                
                  let w = window.open(``, '_blank');
                  w.document.write(image.outerHTML);
                  
                  if (src.startsWith('data:')) {
                    let MIME = src.slice(src.indexOf('/') + 1, src.indexOf(';'))
                    w.document.title = `image.${MIME}`
                  }
                  else if (src.startsWith('filesystem:')) {
                    windowName = src.slice(src.lastIndexOf('/') + 1)
                    windowName = decodeURIComponent(windowName)
                    w.document.title = windowName
                  }
                }
                _this.context.triggerEvent('media.open', $target, _this.$editable);
              }
          });
          
          this.saveFile = this.wrapCommand(function (url, filename) {
              let a = document.createElement('a')
              a.href = url
              if (filename === undefined && (url.startsWith('data:') === false)) {
                filename = url.slice(url.lastIndexOf('/')) + 1
                filename = decodeURIComponent(filename)
              }
              a.target = filename
              a.download = filename
              document.body.appendChild(a)
              //console.log(a)
              a.click()
              document.body.removeChild(a)
          });
          
          /**
           * float me
           *
           * @param {String} value
           */
          this.floatMe = this.wrapCommand(function (value) {
            if (this.hasSelectedRange() === false) {
              return
            }
            
              var $target = $$1(_this.restoreTarget());
              $target.toggleClass('note-float-left', value === 'left');
              $target.toggleClass('note-float-right', value === 'right');
              $target.css('float', value);
          });
          /**
           * resize overlay element
           * @param {String} value
           */
          this.resize = this.wrapCommand(function (value) {
              var $target = $$1(_this.restoreTarget());
              $target.css({
                  width: value * 100 + '%',
                  height: ''
              });
          });
          
          /**
           * @author Pulipuli Chen 20190624
           * @param {number} position
           * @returns {Editor}
           */
          this.moveCursor = function (position) {
            //console.log(position)
            let range = document.createRange();
            let sel = window.getSelection();
            //range.setStart(_this.$editable.children(':last')[0], 1);
            //range.setStart(_this.editable.children(':last')[0], 1);
            //console.log(_this.editable.childNodes[0].length)
            let len = _this.editable.childNodes[0].length
            if (typeof(position) !== 'number') {
              position = len
            }
            else if (position > len) {
              position = len
            }
            range.setStart(_this.editable.childNodes[0], position);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return this
          }
          
          /**
           * 確認有沒有選取範圍
           * @author Pulipuli Chen 20190704
           * @returns {Boolean}
           */
          this.hasSelectedRange = function () {
            let rng = _this.createRange();
            //console.log(rng)
            //console.trace((rng.so === 0 && rng.eo === 0))
            //return !(rng.so === 0 && rng.eo === 0)
            //return (rng.type === 'Range')
            return !(rng.sc === rng.ec && rng.so === rng.eo)
          }
          
          this.getSelectedNodeAndRemove = function () {
            if (this.hasSelectedRange() === false) {
              return ''
            }
            
            let html = []
            let node, nextNode
            let goNext = true
            let rng = _this.createRange()
            
            let ecNode = rng.ec
            if (ecNode.nodeType === 3) {
              ecNode = ecNode.parentElement
            }

            node = rng.sc
            if (node.nodeType === 3) {
              node = node.parentElement
            }
            
            do {
              if (node === ecNode) {
                goNext = false
              }
              html.push(node.outerHTML)
              nextNode = $$1(node).next()[0]
              $$1(node).remove()
              if (nextNode === undefined) {
                break
              }
              
              node = nextNode
              if (node.nodeType === 3) {
                node = node.parentElement
              }
            } while (goNext)
            
            _this.context.triggerEvent('change', _this.$editable.html());
            return html.join('\n')
          }
          
          if (this.options.showHeadingLabel === false) {
            this.$editable.removeClass('show-heading-label')
          }
      }
      Editor.prototype.initialize = function () {
          var _this = this;
          // bind custom events
          let keydownEvent = function (event) {
              
              _this.context.triggerEvent('keydown', event);
              if (!event.isDefaultPrevented()) {
                  if (_this.options.shortcuts) {
                      _this.handleKeyMap(event);
                  }
                  else {
                      _this.preventDefaultEditableShortCuts(event);
                  }
              }
              if (_this.isLimited(1, event)) {
                  return false;
              }
              
              if (_this.options.allowEnter === false) {
                if (event.keyCode === 13) {
                  event.preventDefault()
                  event.stopPropagation()
                }
              }
              
              // hint
              //console.log(event.keyCode)
              /*
              if (event.keyCode === 40) {
                let item = $('.note-hint-popover .note-children-container .note-hint-group .note-hint-item:visible:first')
                if (item.length > 0) {
                  item.focus()
                  console.log(item.text())
                }
              }
              */
              // 
          }
          
          this.$editable.on('keydown', keydownEvent)
          //.on('compositionstart', keydownEvent)
          .on('keyup', function (event) {
              //console.log('keyup')
              //console.log(event)
              _this.context.triggerEvent('keyup', event);
              
              if (event.keyCode === key.code.ENTER) {
                //console.log("ENTER")
                _this.context.triggerEvent('enter', event);
                if (_this.options.clearEnterFormat === true) {
                  _this.clearEnterFormat(event);
                }
              }
          })
          .on('input', function (event) {
              //console.log('input')
              _this.context.triggerEvent('input', event);
          })
          .on('paste', function (event) {
              //console.log('paste')
      
              // a.originalEvent.clipboardData.files
              if (_this.options.enablePasteImage === true
                      && typeof(event) === 'object' 
                      && typeof(event.originalEvent) === 'object'
                      && typeof(event.originalEvent.clipboardData) === 'object'
                      && typeof(event.originalEvent.clipboardData.files) === 'object') {
                event.stopPropagation()
                event.preventDefault()
                let files = event.originalEvent.clipboardData.files
                _this.insertImagesAsDataURL(files)
              }
              else {
                _this.context.triggerEvent('paste', event);
              }
          })
          //.on('compositionstart', function (event) {
          //    console.log('compositionstart')
          //})
          //.on('compositionend', function (event) {
          //    console.log('compositionend')
          //    _this.context.triggerEvent('compositionend', event);
          //})
          .on('focus', function (event) {
              //_this.isFocus = true
              //_this.restoreRange()
              setTimeout(() => {
                _this.isFocus = true
              }, 0)
              _this.context.triggerEvent('focus', event);
          }).on('blur', function (event) {
              setTimeout(() => {
                _this.isFocus = false
              }, 0)
              //console.log('isFocus false')
              _this.context.triggerEvent('blur', event);
              
              // hide popover
              setTimeout(() => {
                //console.log('aaa')
                $$1('.note-popover').fadeOut()
              }, 1000)
          }).on('mousedown', function (event) {
              _this.context.triggerEvent('mousedown', event);
          }).on('mouseup', function (event) {
              setTimeout(() => {
                _this.saveBlurRange()
              }, 0)
              _this.context.triggerEvent('mouseup', event);
          }).on('scroll', function (event) {
              _this.context.triggerEvent('scroll', event);
          })
                  
          $$1(window).on('dragstart', function (event) {
              //_this.context.triggerEvent('scroll', event);
              //console.log('drag')
              if ($$1(event.target).parents('.note-editable:first').length > 0) {
                event.preventDefault()
                event.stopPropagation()
                return false
              }
          });
          // init content before set event
          this.$editable.html(dom.html(this.$note) || dom.emptyPara);
          this.$editable.on(env.inputEventName, func.debounce(function () {
              setTimeout(() => {
                _this.saveBlurRange()
              }, 0)
              _this.context.triggerEvent('change', _this.$editable.html());
          }, 10));
          this.$editor.on('focusin', function (event) {
              _this.context.triggerEvent('focusin', event);
          }).on('focusout', function (event) {
              _this.context.triggerEvent('focusout', event);
          });
          if (!this.options.airMode) {
              if (this.options.width) {
                  this.$editor.outerWidth(this.options.width);
              }
              if (this.options.height) {
                  this.$editable.outerHeight(this.options.height);
              }
              if (this.options.maxHeight) {
                  this.$editable.css('max-height', this.options.maxHeight);
              }
              if (this.options.minHeight) {
                  this.$editable.css('min-height', this.options.minHeight);
              }
          }
          this.history.recordUndo();
      };
      Editor.prototype.destroy = function () {
          this.$editable.off();
      };
      Editor.prototype.handleKeyMap = function (event) {
          var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
          //console.log(keyMap)
          var keys = [];
          if (event.metaKey) {
              keys.push('CMD');
          }
          if (event.ctrlKey && !event.altKey) {
              keys.push('CTRL');
          }
          else {
            if (event.ctrlKey) {
              keys.push('CTRL');
            }
            if (event.altKey) {
              keys.push('ALT');
            }
          }
          
          if (event.shiftKey) {
              keys.push('SHIFT');
          }
          var keyName = key.nameFromCode[event.keyCode];
          if (keyName) {
              keys.push(keyName);
          }
          var eventName = keyMap[keys.join('+')];
          //console.log([keys.join('+'), eventName, event.keyCode])
          //console.log(this.context.invoke(eventName))
          if (eventName) {
              //console.log(this.options.buttons)
              if (this.context.invoke(eventName) !== false) {
                  event.preventDefault();
              }
              else if (typeof(this.options.buttons) === 'object'
                      && typeof(this.options.buttons[eventName]) === 'function') {
                let button = this.options.buttons[eventName](this.context)
                button.click()
                event.preventDefault();
              }
          }
          else if (key.isEdit(event.keyCode)) {
              this.afterCommand();
          }
      };
      Editor.prototype.preventDefaultEditableShortCuts = function (event) {
          // B(Bold, 66) / I(Italic, 73) / U(Underline, 85)
          if ((event.ctrlKey || event.metaKey) &&
              lists.contains([66, 73, 85], event.keyCode)) {
              event.preventDefault();
          }
      };
      Editor.prototype.isLimited = function (pad, event) {
          pad = pad || 0;
          if (typeof event !== 'undefined') {
              if (key.isMove(event.keyCode) ||
                  (event.ctrlKey || event.metaKey) ||
                  lists.contains([key.code.BACKSPACE, key.code.DELETE], event.keyCode)) {
                  return false;
              }
          }
          if (this.options.maxTextLength > 0) {
              if ((this.$editable.text().length + pad) >= this.options.maxTextLength) {
                  return true;
              }
          }
          return false;
      };
      
      
      let blockTagList = ['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'caption']
      let skipTagList = ['td', 'tr', 'th', 'caption', 'code', 'table', 'hr']
      
      /**
       * @author Pulipuli Chen 20190420
       */
      Editor.prototype.clearEnterFormat = function (event) {
        //console.log('clearEnterFormat')
        let target = this.createRange()
        if (target === undefined 
            || typeof(target.sc) !== 'object' 
            || typeof(target.sc.parentElement) !== 'object') {
          return
        }
        let $parent = $(target.sc.parentElement)
        let tagName = $parent.prop('tagName').toLowerCase()
        
        //console.log(tagName, (blockTagList.indexOf(tagName) === -1))
        
        if (skipTagList.indexOf(tagName) > -1 
              || $parent.hasClass('note-editable')) {
          return
        }
        
        while (blockTagList.indexOf(tagName) === -1) {
          $parent = $parent.parent()
          tagName = $parent.prop('tagName').toLowerCase()
          
          if (skipTagList.indexOf(tagName) > -1 
              || $parent.hasClass('note-editable')) {
            return
          }
        }
        
        let content = $parent.html()
        let node = `<${tagName}>${content}</${tagName}>`
        //console.log(node)
        $parent.replaceWith(node)
        
        //console.log(event)
      }
      
      /**
       * create range
       * @return {WrappedRange}
       */
      Editor.prototype.createRange = function (doFocus) {
          this.focus();
          return range.create(this.editable);
      };
      
      /**
       * create range
       * @return {WrappedRange}
       */
      Editor.prototype.getRangeElement = function () {
          let range = this.createRange()
          return $(range.sc.parentElement)
      };
      
      /**
       * saveRange
       *
       * save current range
       *
       * @param {Boolean} [thenCollapse=false]
       */
      Editor.prototype.saveRange = function (thenCollapse) {
          this.lastRange = this.createRange();
          //console.log(this.lastRange)
          if (thenCollapse) {
              this.lastRange.collapse().select();
          }
      };
      
      /**
       * saveRange
       *
       * save current range
       *
       * @param {Boolean} [thenCollapse=false]
       */
      Editor.prototype.saveBlurRange = function (thenCollapse) {
          this.lastBlurRange = this.createRange();
          this.lastBlurPostion = {
            top: document.documentElement.scrollTop, 
            left: document.documentElement.scrollLeft
          }
          //console.log(this.lastRange)
          if (thenCollapse) {
              this.lastRange.collapse().select();
          }
      };
      
      //Editor.prototype.insert = function (html) {
      //  console.log(html)
      //};
      
      /**
       * restoreRange
       *
       * restore lately range
       */
      Editor.prototype.restoreRange = function () {
          if (this.lastRange) {
              this.lastRange.select();
              this.focus();
          }
      };
      /**
       * restoreRange
       *
       * restore lately range
       */
      Editor.prototype.restoreBlurRange = function () {
          if (this.lastBlurRange) {
              window.scrollTo(this.lastBlurPostion.left,this.lastBlurPostion.top)
              this.lastBlurRange.select();
              this.focus();
          }
      };
      
      Editor.prototype.saveScrollPosition = function () {
          this.lastScrollPostion = {
            top: document.documentElement.scrollTop, 
            left: document.documentElement.scrollLeft
          }
          //console.log('saveScrollPosition')
          //console.log(this.lastScrollPostion)
      };
      Editor.prototype.restoreScrollPosition = function () {
          //console.log('restoreScrollPosition')
          //console.log(this.lastScrollPostion)
          window.scrollTo(this.lastScrollPostion.left,this.lastScrollPostion.top)
      };
      
      Editor.prototype.saveTarget = function (node) {
          this.$editable.data('target', node);
      };
      Editor.prototype.clearTarget = function () {
          this.$editable.removeData('target');
      };
      Editor.prototype.restoreTarget = function () {
          return this.$editable.data('target');
      };
      /**
       * currentStyle
       *
       * current style
       * @return {Object|Boolean} unfocus
       */
      Editor.prototype.currentStyle = function () {
          var rng = range.create();
          if (rng) {
              rng = rng.normalize();
          }
          return rng ? this.style.current(rng) : this.style.fromNode(this.$editable);
      };
      /**
       * style from node
       *
       * @param {jQuery} $node
       * @return {Object}
       */
      Editor.prototype.styleFromNode = function ($node) {
          return this.style.fromNode($node);
      };
      
      /**
       * insert
       * @author Pulipuli Chen 20190621
       */
      /*
      Editor.prototype.insert = function (node) {
        console.log(node)
        return node
      }
      */
      
      /**
       * undo
       */
      Editor.prototype.undo = function () {
          /*
          //console.log(['before.command', this.$editable.html()])
          let beforeCommandHTML = this.$editable.html()
          console.log(['before.command', this.$editable.html()])
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.undo();
          let changeHTML = this.$editable.html()
          console.log(['change', this.$editable.html()])
          if (changeHTML.trim() !== '<p><br></p>') {
            //console.log(['change', this.$editable.html()])
            this.context.triggerEvent('change', this.$editable.html());
          }
          else {
            this.$editable.html(beforeCommandHTML)
          }
          */
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.undo();
          this.context.triggerEvent('change', this.$editable.html());
      };
      /*
      * commit
      */
      Editor.prototype.commit = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.commit();
          this.context.triggerEvent('change', this.$editable.html());
      };
      /**
       * redo
       */
      Editor.prototype.redo = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.redo();
          this.context.triggerEvent('change', this.$editable.html());
      };
      /**
       * before command
       */
      Editor.prototype.beforeCommand = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          // keep focus on editable before command execution
          this.focus();
      };
      /**
       * after command
       * @param {Boolean} isPreventTrigger
       */
      Editor.prototype.afterCommand = function (isPreventTrigger) {
          this.normalizeContent();
          this.history.recordUndo();
          if (!isPreventTrigger) {
              this.context.triggerEvent('change', this.$editable.html());
          }
      };
      /**
       * handle tab key
       */
      Editor.prototype.tab = function () {
          var rng = this.createRange();
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.table.tab(rng);
          }
          else {
              if (this.options.tabSize === 0) {
                  return false;
              }
              if (!this.isLimited(this.options.tabSize)) {
                  this.beforeCommand();
                  this.typing.insertTab(rng, this.options.tabSize);
                  this.afterCommand();
              }
          }
      };
      /**
       * handle shift+tab key
       */
      Editor.prototype.untab = function () {
          var rng = this.createRange();
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.table.tab(rng, true);
          }
          else {
              if (this.options.tabSize === 0) {
                  return false;
              }
          }
      };
      /**
       * run given function between beforeCommand and afterCommand
       */
      Editor.prototype.wrapCommand = function (fn) {
          return function () {
              this.beforeCommand();
              fn.apply(this, arguments);
              this.afterCommand();
          };
      };
      /**
       * insert image
       *
       * @param {String} src
       * @param {String|Function} param
       * @return {Promise}
       */
      Editor.prototype.insertImage = function (src, param) {
          var _this = this;
          return createImage(src, param).then(function ($image) {
              _this.beforeCommand();
              if (typeof param === 'function') {
                  param($image);
              }
              else {
                  if (typeof param === 'string') {
                      $image.attr('data-filename', param);
                  }
                  $image.css('width', Math.min(_this.$editable.width(), $image.width()));
              }
              $image.show();
              range.create(_this.editable).insertNode($image[0]);
              range.createFromNodeAfter($image[0]).select();
              _this.afterCommand();
          }).fail(function (e) {
              _this.context.triggerEvent('image.upload.error', e);
          });
      };
      /**
       * insertImages
       * @param {File[]} files
       */
      Editor.prototype.insertImagesAsDataURL = function (files) {
          var _this = this;
          $$1.each(files, function (idx, file) {
              var filename = file.name;
              if (_this.options.maximumImageFileSize && _this.options.maximumImageFileSize < file.size) {
                  _this.context.triggerEvent('image.upload.error', _this.lang.image.maximumFileSizeError);
              }
              else {
                  readFileAsDataURL(file).then(function (dataURL) {
                      return _this.insertImage(dataURL, filename);
                  }).fail(function () {
                      _this.context.triggerEvent('image.upload.error');
                  });
              }
          });
      };
      /**
       * return selected plain text
       * @return {String} text
       */
      Editor.prototype.getSelectedText = function () {
          var rng = this.createRange();
          // if range on anchor, expand range with anchor
          if (rng.isOnAnchor()) {
              rng = range.createFromNode(dom.ancestor(rng.sc, dom.isAnchor));
          }
          return rng.toString();
      };
      
      Editor.prototype.inlineTags = ["b", "big", "i", "small", "tt", "abbr", "acronym", "cite", "code", "dfn", "em", "kbd", "strong", "samp", "var", "a", "bdo", "br", "img", "map", "object", "q", "script", "span", "sub", "sup"]
      
      Editor.prototype.isInlineTag = function (tagName) {
        return this.inlineTags.indexOf(tagName) > -1
      }
      
      Editor.prototype.onFormatBlock = function (tagName, $target) {
          if (Array.isArray(tagName)) {
            tagName.forEach(t => {
              this.onFormatBlock(t, $target)
            })
            return
          }
          
          // ----------------------------
          
          if (dom.isParentsHasList(this.getRangeElement())) {
            //console.log('is list')
            //this.bullet.toggleList(tagName, true)
            this.bullet.outdent()
            this.onFormatBlock(tagName, $target)
            //$(() => {
            //  this.onFormatBlock(tagName, $target)
            //})
            return
          }
          
          // -------------------
      
          // [workaround] for MSIE, IE need `<`
          
          if (this.inlineTags.indexOf(tagName) > -1) {
            this.inlineStyling({
              tagName: tagName
            })
          }
          else if (tagName === '') {
            let t = $($target)
            let options = {
              tagName: t.prop('tagName')
            }
            
            if (t.attr('style') !== undefined && t.attr('style') !== '') {
              options.style = t.attr('style')
            }
            
            if (t.prop('className') !== '') {
              options.className = t.prop('className')
            }
            
            this.inlineStyling(options)
            
            return
          }
          
          tagName = env.isMSIE ? '<' + tagName + '>' : tagName;
          document.execCommand('FormatBlock', false, tagName);
          // support custom class
          if ($target && $target.length) {
              var className = $target[0].className || '';
              if (className) {
                //console.log(className)
                if (className.indexOf('note-btn') > -1) {
                  return
                }
            
                var currentRange = this.createRange();
                var $parent = $$1([currentRange.sc, currentRange.ec]).closest(tagName);
                $parent.addClass(className);
              }
          }
          
          // ----------
          // Remove empty prev element
          
          this.removeEmptySibling()
      };
      Editor.prototype.removeEmptySibling = function (node) {
        if (node === undefined) {
          node = $(this.createRange().sc.parentElement);
        }
        if (typeof(node.prev) !== 'function') {
          node = $(node)
        }
        
        //return
        let prev = node.prev()
        while (this.checkNodeIsRemovable(prev)) {
          let tmp = prev
          prev = tmp.prev()
          tmp.remove()
        }
        
        let next = node.next()
        //console.log(next.text().trim())
        if (this.checkNodeIsRemovable(next)) {
          let tmp = next
          next = tmp.next()
          tmp.remove()
        }
      };
      Editor.prototype.checkNodeIsRemovable = function (node) {
        if (node.length === 0) {
          return false
        }
        
        //console.log(node[0].outerHTML)
        
        //return (node.length > 0 
        //    && ['hr', 'img', 'table', 'hr'].indexOf(node.prop('tagName').toLowerCase()) === -1
        //    && node.find('img:first,table:first,hr:first').length === 0
        //    && node.text().trim() === '')
        let tagName = node.prop('tagName').toLowerCase()
        //console.log([tagName, skipTagList.indexOf(tagName) > -1])
        if (skipTagList.indexOf(tagName) > -1) {
          return false
        }
        
        //console.log([node.find('img:first,table:first,hr:first').length])
        if (node.find('img:first,table:first,hr:first,a[name="more"]').length > 0) {
          return false
        }
        
        //console.log([node.text().trim()])
        if (node.text().trim() === '') {
          return true
        }
      }
      
      Editor.prototype.formatPara = function () {
          this.formatBlock('P');
      };
      Editor.prototype.fontStyling = function (target, value) {
          var rng = this.createRange();
          if (rng) {
              var spans = this.style.styleNodes(rng);
              $$1(spans).css(target, value);
              // [workaround] added styled bogus span for style
              //  - also bogus character needed for cursor position
              if (rng.isCollapsed()) {
                  var firstSpan = lists.head(spans);
                  if (firstSpan && !dom.nodeLength(firstSpan)) {
                      firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                      range.createFromNodeAfter(firstSpan.firstChild).select();
                      this.$editable.data(KEY_BOGUS, firstSpan);
                  }
              }
          }
      };
      Editor.prototype.toggleClassName = function (className) {
          var rng = this.createRange();
          if (rng) {
              var spans = this.style.styleNodes(rng);
              $$1(spans).toggleClass(className);
              // [workaround] added styled bogus span for style
              //  - also bogus character needed for cursor position
              if (rng.isCollapsed()) {
                  var firstSpan = lists.head(spans);
                  if (firstSpan && !dom.nodeLength(firstSpan)) {
                      firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                      range.createFromNodeAfter(firstSpan.firstChild).select();
                      this.$editable.data(KEY_BOGUS, firstSpan);
                  }
              }
          }
      };
      Editor.prototype.addInlineTag = function (tagName) {
          var rng = this.createRange();
          if (rng) {
              var spans = this.style.styleNodes(rng, {
                nodeName: tagName,
                expandClosestSibling: true,
                onlyPartialContains: true
              });
              // [workaround] added styled bogus span for style
              //  - also bogus character needed for cursor position
              if (rng.isCollapsed()) {
                  var firstSpan = lists.head(spans);
                  if (firstSpan && !dom.nodeLength(firstSpan)) {
                      firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                      range.createFromNodeAfter(firstSpan.firstChild).select();
                      this.$editable.data(KEY_BOGUS, firstSpan);
                  }
              }
          }
      };
      Editor.prototype.inlineStyling = function (options) {
          //this.saveRange()
          var rng = this.createRange();
          if (rng) {
              //console.log(rng)
              
              
              let parent = $(rng.sc)
              //console.log([rng.sc.nodeType, Node.TEXT_NODE])
              if (rng.sc.nodeType === Node.TEXT_NODE) {
                parent = $(rng.sc.parentElement)
              }
              
              
              let parentTagName = parent.prop('tagName').toLowerCase()
              let parentClassName = parent.prop('className')
              let parentStyle = parent.attr('style')
              //console.log(parentTagName)
              
              
              //if (this.isInlineTag(parentTagName) === false 
              //  && rng.sc.nodeValue === '') {
              //  return
              //}
              
              let spans, styleNodesOption = {}
              
              /**
               * @Author Pulipuli Chen 20190417
               */
              //console.log([options.tagName, parentTagName])
              //console.log([options.className, parentClassName])
              //console.log([options.style, parentStyle])
              //console.log([rng.sc.nodeValue])
              
              let reset = false
              
              
              if ((
                    (typeof(options.tagName) === 'string' && parentTagName === options.tagName.toLowerCase())
                    || typeof(options.tagName) !== 'string'
                  ) 
                  && (
                    (typeof(options.className) === 'string' && parentClassName === options.className.trim())
                    || (typeof(options.className) !== 'string' && parentClassName === undefined)
                  )
                  && (
                    (typeof(options.style) === 'string' && parentStyle === options.style.trim())
                    || (typeof(options.style) !== 'string' && parentStyle === undefined)
                  )
              ) {
                reset = true
              }
              
              if (reset === true) {
                  // 取代，然後取消
                  let upParent = parent.parent()
                  let doSelect = false
                  if (upParent.text() === parent.text()) {
                    doSelect = true
                  }
                  
                  let content = parent.html()
                  //let contentNodes = parent.children()
                  //console.log(contentNodes)
                  parent.replaceWith(content)
                  //parent.select()
                  //console.log(['cancel', parent[0]])
                  
                  if (doSelect === true) {
                    this.selectElement(upParent[0])
                  }
                  //this.selectElement(contentNodes[0])
                  /*
                  var elm = upParent[0],
    fc = elm.firstChild,
    ec = elm.lastChild,
    range = document.createRange(),
    sel;
elm.focus();
range.setStart(fc,2);
range.setEnd(ec,4);
sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(range);
                 */ 
                  
                  return
                }
              
              if (typeof(options.tagName) === 'string') {
                //console.log([parentTagName, this.isInlineTag(parentTagName), rng.sc.nodeValue, parent])
                if (this.isInlineTag(parentTagName) === false) {
                  //if (rng.sc.nodeValue !== '') {
                  if (rng.so !== rng.eo) {
                    styleNodesOption = {
                      nodeName: options.tagName,
                      expandClosestSibling: true,
                      onlyPartialContains: true
                    };
                    spans = this.style.styleNodes(rng, styleNodesOption)
                  }
                  else if (parent.hasClass('note-editable') === false) {
                    let content = parent.html()
                    let t = options.tagName
                    parent.html(`<${t}>${content}</${t}>`)
                    spans = parent.children()[0]
                  }
                  else {
                    return
                  }
                }
                else {
                  if (parentTagName !== options.tagName.toLowerCase()) {
                    let content = parent.html()
                    let t = options.tagName
                    
                    // Only replace tagName. Keep className and style
                    
                    let c = parent.prop('className')
                    if (c !== undefined) {
                      c = ` class="${c}"`
                    }
                    
                    let s = parent.attr('style')
                    if (s !== undefined) {
                      s = ` style="${s}"`
                    }
                    
                    parent.replaceWith(`<${t}${c}${s}>${content}</${t}>`)
                  }
                  
                  spans = rng.sc.parentElement
                }
              }
              
          
              if (typeof(options.className) === 'string') {
                //$$1(spans).addClass(options.className);
                $$1(spans).prop('className', options.className);
              }
              
              if (typeof(options.style) === 'string') {
                if ($$1(spans).attr('style') !== options.style) {
                  $$1(spans).attr('style', options.style);
                }
                //else {
                //  $$1(spans).removeAttr('style');
                //}
              }
          
              // [workaround] added styled bogus span for style
              //  - also bogus character needed for cursor position
              if (rng.isCollapsed()) {
                  var firstSpan = lists.head(spans);
                  if (firstSpan && !dom.nodeLength(firstSpan)) {
                      firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                      range.createFromNodeAfter(firstSpan.firstChild).select();
                      this.$editable.data(KEY_BOGUS, firstSpan);
                  }
              }
              
              //rng.select()
              //$(spans).select()
              // https://stackoverflow.com/questions/9975707/use-jquery-select-to-select-contents-of-a-div
              this.selectElement(spans)
          }
          //this.change()
      };
      
      Editor.prototype.selectElement = function (node) {
        if (document.body.createTextRange) {
          var range = document.body.createTextRange();
          range.moveToElementText(node);
          range.select();
        } else if (window.getSelection) {
          var selection = window.getSelection();        
          var range = document.createRange();
          range.selectNodeContents($$1(node)[0]);
          selection.removeAllRanges();
          selection.addRange(range);
        }      
      }
      
      /**
       * unlink
       *
       * @type command
       */
      Editor.prototype.unlink = function () {
          var rng = this.createRange();
          if (rng.isOnAnchor()) {
              var anchor = dom.ancestor(rng.sc, dom.isAnchor);
              rng = range.createFromNode(anchor);
              rng.select();
              this.beforeCommand();
              document.execCommand('unlink');
              this.afterCommand();
          }
      };
      /**
       * returns link info
       *
       * @return {Object}
       * @return {WrappedRange} return.range
       * @return {String} return.text
       * @return {Boolean} [return.isNewWindow=true]
       * @return {String} [return.url=""]
       */
      Editor.prototype.getLinkInfo = function () {
          var rng = this.createRange().expand(dom.isAnchor);
          // Get the first anchor on range(for edit).
          var $anchor = $$1(lists.head(rng.nodes(dom.isAnchor)));
          var linkInfo = {
              range: rng,
              text: rng.toString(),
              url: $anchor.length ? $anchor.attr('href') : ''
          };
          // When anchor exists,
          if ($anchor.length) {
              // Set isNewWindow by checking its target.
              //linkInfo.isNewWindow = $anchor.attr('target') === '_blank';
              if ($anchor.attr('target') === '_blank') {
                linkInfo.openMethod = 'blank'
              }
              else if ($anchor.attr('href').startsWith('javascript:window.open(')) {
                linkInfo.openMethod = 'popup'
              }
              else {
                linkInfo.openMethod = 'current'
              }
          }
          //console.log(linkInfo)
          return linkInfo;
      };
      /**
       * returns comment info
       *
       * @author Pulipuli Chen 20190703
       * @return {Object}
       * @return {WrappedRange} return.range
       * @return {String} return.text
       * @return {Boolean} [return.isNewWindow=true]
       * @return {String} [return.url=""]
       */
      Editor.prototype.getCommentInfo = function () {
          var rng = this.createRange().expand(dom.isAnchor);
          // Get the first anchor on range(for edit).
          var $anchor = $$1(lists.head(rng.nodes(dom.isAnchor)));
          //console.log($anchor.length)
          
          if (rng.ec.nodeType === 3) {
            //&& $$1(rng.ec).parents('.node-editor-comment:first').length > 0
            let parent = $$1(rng.sc.parentElement)
            if (parent.hasClass('note-editor-comment')) {
              $anchor = parent
            }
            else if (parent.parents('.note-editor-comment:first').length > 0) {
              $anchor = parent.parents('.note-editor-comment:first')
            }
          }
          
          var commentInfo = {
              range: rng,
              commentTitle: $anchor.length ? $anchor.attr('title') : ''
          };
          return commentInfo;
      };
      
      Editor.prototype.addRow = function (position) {
          var rng = this.createRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.addRow(rng, position);
              this.afterCommand();
          }
      };
      Editor.prototype.addCol = function (position) {
          var rng = this.createRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.addCol(rng, position);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteRow = function () {
          var rng = this.createRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteRow(rng);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteCol = function () {
          var rng = this.createRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteCol(rng);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteTable = function () {
          var rng = this.createRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteTable(rng);
              this.afterCommand();
          }
      };
      /**
       * @param {Position} pos
       * @param {jQuery} $target - target element
       * @param {Boolean} [bKeepRatio] - keep ratio
       */
      Editor.prototype.resizeTo = function (pos, $target, bKeepRatio) {
          var imageSize;
          if (bKeepRatio) {
              var newRatio = pos.y / pos.x;
              var ratio = $target.data('ratio');
              imageSize = {
                  width: ratio > newRatio ? pos.x : pos.y / ratio,
                  height: ratio > newRatio ? pos.x * ratio : pos.y
              };
          }
          else {
              imageSize = {
                  width: pos.x,
                  height: pos.y
              };
          }
          $target.css(imageSize);
      };
      /**
       * returns whether editable area has focus or not.
       */
      Editor.prototype.hasFocus = function () {
          return this.$editable.is(':focus');
      };
      /**
       * set focus
       */
      Editor.prototype.focus = function () {
          // [workaround] Screen will move when page is scolled in IE.
          //  - do focus when not focused
          if (!this.hasFocus()) {
              this.$editable.focus();
          }
      };
      /**
       * returns whether contents is empty or not.
       * @return {Boolean}
       */
      Editor.prototype.isEmpty = function () {
          return dom.isEmpty(this.$editable[0]) || dom.emptyPara === this.$editable.html();
      };
      /**
       * Removes all contents and restores the editable instance to an _emptyPara_.
       */
      Editor.prototype.empty = function () {
          this.context.invoke('code', dom.emptyPara);
      };
      /**
       * normalize content
       */
      Editor.prototype.normalizeContent = function () {
          this.$editable[0].normalize();
      };
      /**
       * trigger change event
       */
      Editor.prototype.change = function () {
          this.$editable.change();
      };
      
      
      return Editor;
  }());

  var Clipboard = /** @class */ (function () {
      function Clipboard(context) {
          this.context = context;
          this.$editable = context.layoutInfo.editable;
      }
      Clipboard.prototype.initialize = function () {
          this.$editable.on('paste', this.pasteByEvent.bind(this));
      };
      /**
       * paste by clipboard event
       *
       * @param {Event} event
       */
      Clipboard.prototype.pasteByEvent = function (event) {
          var clipboardData = event.originalEvent.clipboardData;
          if (clipboardData && clipboardData.items && clipboardData.items.length) {
              // paste img file
              var item = clipboardData.items.length > 1 ? clipboardData.items[1] : lists.head(clipboardData.items);
              if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                  this.context.invoke('editor.insertImagesOrCallback', [item.getAsFile()]);
              }
              this.context.invoke('editor.afterCommand');
          }
      };
      return Clipboard;
  }());

  var Dropzone = /** @class */ (function () {
      function Dropzone(context) {
          this.context = context;
          this.$eventListener = $$1(document);
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.documentEventHandlers = {};
          this.$dropzone = $$1([
              '<div class="note-dropzone">',
              '  <div class="note-dropzone-message"/>',
              '</div>'
          ].join('')).prependTo(this.$editor);
      }
      /**
       * attach Drag and Drop Events
       */
      Dropzone.prototype.initialize = function () {
          if (this.options.disableDragAndDrop) {
              // prevent default drop event
              this.documentEventHandlers.onDrop = function (e) {
                e.preventDefault();
              };
              // do not consider outside of dropzone
              this.$eventListener = this.$dropzone;
              this.$eventListener.on('drop', this.documentEventHandlers.onDrop);
              
          }
          else {
              this.attachDragAndDropEvent();
          }
      };
      /**
       * attach Drag and Drop Events
       */
      Dropzone.prototype.attachDragAndDropEvent = function () {
          var _this = this;
          var collection = $$1();
          var $dropzoneMessage = this.$dropzone.find('.note-dropzone-message');
          this.documentEventHandlers.onDragenter = function (e) {
              var isCodeview = _this.context.invoke('codeview.isActivated');
              var hasEditorSize = _this.$editor.width() > 0 && _this.$editor.height() > 0;
              if (!isCodeview && !collection.length && hasEditorSize) {
                  _this.$editor.addClass('dragover');
                  _this.$dropzone.width(_this.$editor.width());
                  _this.$dropzone.height(_this.$editor.height());
                  $dropzoneMessage.text(_this.lang.image.dragImageHere);
              }
              collection = collection.add(e.target);
          };
          this.documentEventHandlers.onDragleave = function (e) {
              collection = collection.not(e.target);
              if (!collection.length) {
                  _this.$editor.removeClass('dragover');
              }
          };
          this.documentEventHandlers.onDrop = function (event) {
              collection = $$1();
              _this.$editor.removeClass('dragover');

              _this.insertImage(event)
          };
          // show dropzone on dragenter when dragging a object to document
          // -but only if the editor is visible, i.e. has a positive width and height
          this.$eventListener.on('dragenter', this.documentEventHandlers.onDragenter)
              .on('dragleave', this.documentEventHandlers.onDragleave)
              .on('drop', this.documentEventHandlers.onDrop);
          // change dropzone's message on hover.
          this.$dropzone.on('dragenter', function () {
              _this.$dropzone.addClass('hover');
              $dropzoneMessage.text(_this.lang.image.dropImage);
          }).on('dragleave', function () {
              _this.$dropzone.removeClass('hover');
              $dropzoneMessage.text(_this.lang.image.dragImageHere);
          });
          // attach dropImage
          this.$dropzone.on('drop', function (event) {
              //console.log('ondrop')
              var dataTransfer = event.originalEvent.dataTransfer;
              // stop the browser from opening the dropped content
              event.preventDefault();
              if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                  _this.$editable.focus();
                  if (typeof(_this.options.callbacks.onDrop) === 'function') {
                    _this.options.callbacks.onDrop(dataTransfer.files)
                  }
                  else {
                    _this.context.invoke('editor.insertImagesOrCallback', dataTransfer.files);
                  }
              }
              else {
                  $$1.each(dataTransfer.types, function (idx, type) {
                      var content = dataTransfer.getData(type);
                      if (type.toLowerCase().indexOf('text') > -1) {
                          _this.context.invoke('editor.pasteHTML', content);
                      }
                      else {
                          $$1(content).each(function (idx, item) {
                              _this.context.invoke('editor.insertNode', item);
                          });
                      }
                  });
              }
          }).on('dragover', false); // prevent default dragover event
      };
      Dropzone.prototype.destroy = function () {
          var _this = this;
          Object.keys(this.documentEventHandlers).forEach(function (key) {
              _this.$eventListener.off(key.substr(2).toLowerCase(), _this.documentEventHandlers[key]);
          });
          this.documentEventHandlers = {};
      };
      Dropzone.prototype.insertImage = function (event) {
        // 這邊要決定是否要插入圖片
        //console.log(event)
        //console.log('drop 這邊要決定是否要插入圖片')
        //console.log(event.originalEvent.dataTransfer.files.length)
        if (this.options.enableDropImage === true 
                && typeof(event) === 'object' 
                && typeof(event.originalEvent) === 'object' 
                && typeof(event.originalEvent.dataTransfer) === 'object'
                && typeof(event.originalEvent.dataTransfer.files) === 'object') {
          let files = event.originalEvent.dataTransfer.files
          //this.$editor.insertImagesAsDataURL(files)
          this.context.invoke('editor.insertImagesAsDataURL', files);
          /*
          let loop = (i) => {
            if (i < files.length) {
              let file = files[i]
              
              let type = file.type
              if (type.startsWith('image/')) {
                let name = file.name
                //console.log([type, name])
                this.context.invoke('code', dom.emptyPara);
              }
              i++
              loop(i)
            }
          }
          loop(0)
          */
        }
      };
      return Dropzone;
  }());

  var CodeMirror;
  if (env.hasCodeMirror) {
      if (false) {}
      else {
          CodeMirror = window.CodeMirror;
      }
  }
  /**
   * @class Codeview
   */
  var CodeView = /** @class */ (function () {
      let editorViewScrollTop, codeViewScrollTop, $window = $(window)
  
      function CodeView(context) {
          this.context = context;
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.$codable = context.layoutInfo.codable;
          this.options = context.options;
      }
      CodeView.prototype.sync = function () {
          var isCodeview = this.isActivated();
          if (isCodeview && env.hasCodeMirror) {
              this.$codable.data('cmEditor').save();
          }
      };
      /**
       * @return {Boolean}
       */
      CodeView.prototype.isActivated = function () {
          return this.$editor.hasClass('codeview');
      };
      /**
       * toggle codeview
       */
      CodeView.prototype.toggle = function () {
          //console.log()
          //console.log("codeview.toggle 2")
          $(".note-popover").hide()
          //console.log(["a", $(this.$codable).val()])
          if (this.isActivated()) {
              //console.log(["b", $(this.$codable).val()])
              this.deactivate();
          }
          else {
              this.activate();
          }
          
          this.context.triggerEvent('codeview.toggled');
      };
      /**
       * activate code view
       */
      CodeView.prototype.activate = function () {
          editorViewScrollTop = $window.scrollTop()
          //console.log(['editorViewScrollTop', editorViewScrollTop])
      
          var _this = this;
          this.$codable.val(dom.html(this.$editable, this.options.prettifyHtml));
          this.$codable.height(this.$editable.height());
          this.context.invoke('toolbar.updateCodeview', true);
          this.$editor.addClass('codeview');
		  //console.log('code view')
          this.$codable.focus();
          //this.$codable.show();
          // activate CodeMirror as codable
          if (env.hasCodeMirror) {
              var cmEditor_1 = CodeMirror.fromTextArea(this.$codable[0], this.options.codemirror);
              // CodeMirror TernServer
              if (this.options.codemirror.tern) {
                  var server_1 = new CodeMirror.TernServer(this.options.codemirror.tern);
                  cmEditor_1.ternServer = server_1;
                  cmEditor_1.on('cursorActivity', function (cm) {
                      server_1.updateArgHints(cm);
                  });
              }
              cmEditor_1.on('blur', function (event) {
                  _this.context.triggerEvent('blur.codeview', cmEditor_1.getValue(), event);
              });
              // CodeMirror hasn't Padding.
              cmEditor_1.setSize(null, this.$editable.outerHeight());
              this.$codable.data('cmEditor', cmEditor_1);
          }
          else {
			  let val = _this.$codable.val()
			  while (val.indexOf('\n\n') > -1) {
				  val = val.split('\n\n').join('\n')
			  }
			  _this.$codable.val(val)
			  //console.log(val)
              this.$codable.on('blur', function (event) {
                  _this.context.triggerEvent('blur.codeview', _this.$codable.val(), event);
              });
          }
          this.$codable.show();
          
          setTimeout(() => {
            if (codeViewScrollTop === undefined) {
              codeViewScrollTop = this.$codable.parents('.note-editor:first').offset().top
            }
            //console.log(['scroll codeViewScrollTop', codeViewScrollTop])
            $window.scrollTop(codeViewScrollTop)
          }, 0)
      };
      /**
       * deactivate code view
       */
      CodeView.prototype.deactivate = function () {
          codeViewScrollTop = $window.scrollTop()
          //console.log(['codeViewScrollTop', codeViewScrollTop])
      
          //console.log(["c", $(this.$codable).val()])
          // deactivate CodeMirror as codable
          //console.log(env.hasCodeMirror)
          if (env.hasCodeMirror) {
          //if (false) {
              var cmEditor = this.$codable.data('cmEditor');
              this.$codable.val(cmEditor.getValue());
              cmEditor.toTextArea();
          }
          //console.log(["d", $(this.$codable).val()])
          //console.log(this.$editor.find('.note-codable').val())
          //console.log(this.$codable)
          //console.log(dom.emptyPara)
          
          //console.log($(this.$codable).val())
          var value = dom.value(this.$codable, this.options.prettifyHtml) || dom.emptyPara;
          //console.log(value)
          //console.log(this.$codable[0])
          //console.log(["e", $(this.$codable).val()])
          //var value = $(this.$codable).val()
          var isChange = this.$editable.html() !== value
          //window.$e = this.$editable
          //console.log(this.$editable)
          this.$editable.html(value);
          //console.log(value)
          //console.log(this.$editable.html())
          //$(this.$editable).html(value)
          this.$editable.height(this.options.height ? this.$codable.height() : 'auto');
          this.$editor.removeClass('codeview');
          if (isChange) {
              this.context.triggerEvent('change', this.$editable.html(), this.$editable);
          }
          this.$editable.focus();
          this.context.invoke('toolbar.updateCodeview', false);
          //this.$codable.hide()
          
          setTimeout(() => {
            if (editorViewScrollTop === undefined) {
              editorViewScrollTop = this.$editable.parents('.note-editor:first').offset().top
            }
            //console.log(['scroll editorViewScrollTop', editorViewScrollTop])
            $window.scrollTop(editorViewScrollTop)
          }, 0)
      };
      CodeView.prototype.destroy = function () {
          if (this.isActivated()) {
              this.deactivate();
          }
      };
      return CodeView;
  }());

  var EDITABLE_PADDING = 24;
  var Statusbar = /** @class */ (function () {
      function Statusbar(context) {
          this.$document = $$1(document);
          this.$statusbar = context.layoutInfo.statusbar;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
      }
      Statusbar.prototype.initialize = function () {
          var _this = this;
          if (this.options.airMode || this.options.disableResizeEditor) {
              this.destroy();
              return;
          }
          this.$statusbar.on('mousedown', function (event) {
              event.preventDefault();
              event.stopPropagation();
              var editableTop = _this.$editable.offset().top - _this.$document.scrollTop();
              var onMouseMove = function (event) {
                  var height = event.clientY - (editableTop + EDITABLE_PADDING);
                  height = (_this.options.minheight > 0) ? Math.max(height, _this.options.minheight) : height;
                  height = (_this.options.maxHeight > 0) ? Math.min(height, _this.options.maxHeight) : height;
                  _this.$editable.height(height);
              };
              _this.$document.on('mousemove', onMouseMove).one('mouseup', function () {
                  _this.$document.off('mousemove', onMouseMove);
              });
          });
      };
      Statusbar.prototype.destroy = function () {
          this.$statusbar.off();
          this.$statusbar.addClass('locked');
      };
      return Statusbar;
  }());

  var Fullscreen = /** @class */ (function () {
      function Fullscreen(context) {
          var _this = this;
          this.context = context;
          this.$editor = context.layoutInfo.editor;
          this.$toolbar = context.layoutInfo.toolbar;
          this.$editable = context.layoutInfo.editable;
          this.$codable = context.layoutInfo.codable;
          this.$window = $$1(window);
          this.$scrollbar = $$1('html, body');
          this.onResize = function () {
              _this.resizeTo({
                  h: _this.$window.height() - _this.$toolbar.outerHeight()
              });
          };
      }
      Fullscreen.prototype.resizeTo = function (size) {
          this.$editable.css('height', size.h);
          this.$codable.css('height', size.h);
          if (this.$codable.data('cmeditor')) {
              this.$codable.data('cmeditor').setsize(null, size.h);
          }
      };
      /**
       * toggle fullscreen
       */
      Fullscreen.prototype.toggle = function () {
          this.$editor.toggleClass('fullscreen');
          if (this.isFullscreen()) {
              this.$editable.data('orgHeight', this.$editable.css('height'));
              this.$editable.data('orgMaxHeight', this.$editable.css('maxHeight'));
              this.$editable.css('maxHeight', '');
              this.$window.on('resize', this.onResize).trigger('resize');
              this.$scrollbar.css('overflow', 'hidden');
          }
          else {
              this.$window.off('resize', this.onResize);
              this.resizeTo({ h: this.$editable.data('orgHeight') });
              this.$editable.css('maxHeight', this.$editable.css('orgMaxHeight'));
              this.$scrollbar.css('overflow', 'visible');
          }
          this.context.invoke('toolbar.updateFullscreen', this.isFullscreen());
      };
      Fullscreen.prototype.isFullscreen = function () {
          return this.$editor.hasClass('fullscreen');
      };
      return Fullscreen;
  }());

  var Handle = /** @class */ (function () {
      function Handle(context) {
          var _this = this;
          this.context = context;
          this.$document = $$1(document);
          this.$editingArea = context.layoutInfo.editingArea;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.events = {
              'summernote.mousedown': function (we, e) {
                  if (_this.update(e.target, e)) {
                      e.preventDefault();
                  }
              },
              'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function () {
                  _this.update();
              },
              'summernote.disable': function () {
                  _this.hide();
              },
              'summernote.codeview.toggled': function () {
                  _this.update();
              }
          };
      }
      Handle.prototype.initialize = function () {
          var _this = this;
          this.$handle = $$1([
              '<div class="note-handle">',
              '<div class="note-control-selection">',
              '<div class="note-control-selection-bg"></div>',
              '<div class="note-control-holder note-control-nw"></div>',
              '<div class="note-control-holder note-control-ne"></div>',
              '<div class="note-control-holder note-control-sw"></div>',
              '<div class="',
              (this.options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing'),
              ' note-control-se"></div>',
              (this.options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>'),
              '</div>',
              '</div>'
          ].join('')).prependTo(this.$editingArea);
          this.$handle.on('mousedown', function (event) {
              if (dom.isControlSizing(event.target)) {
                  event.preventDefault();
                  event.stopPropagation();
                  var $target_1 = _this.$handle.find('.note-control-selection').data('target');
                  var posStart_1 = $target_1.offset();
                  var scrollTop_1 = _this.$document.scrollTop();
                  var onMouseMove_1 = function (event) {
                      _this.context.invoke('editor.resizeTo', {
                          x: event.clientX - posStart_1.left,
                          y: event.clientY - (posStart_1.top - scrollTop_1)
                      }, $target_1, !event.shiftKey);
                      //_this.context.invoke('imagePopover.hide', event.target);
                      _this.update($target_1[0]);
                  };
                  _this.$document
                      .on('mousemove', onMouseMove_1)
                      .one('mouseup', function (e) {
                      e.preventDefault();
              
                      _this.$document.off('mousemove', onMouseMove_1);
                      _this.context.invoke('editor.afterCommand');
                  });
                  if (!$target_1.data('ratio')) { // original ratio.
                      $target_1.data('ratio', $target_1.height() / $target_1.width());
                  }
              }
          });
          // Listen for scrolling on the handle overlay.
          this.$handle.on('wheel', function (e) {
              e.preventDefault();
              _this.update();
          });
      };
      Handle.prototype.destroy = function () {
          this.$handle.remove();
      };
      Handle.prototype.update = function (target, event) {
          if (this.context.isDisabled()) {
              return false;
          }
          
          var isImage = dom.isImg(target);
          var $selection = this.$handle.find('.note-control-selection');
          if (event === undefined) {
            this.context.invoke('imagePopover.hide', target);
          }
          else {
            this.context.invoke('imagePopover.update', target);
          }
          
          if (isImage) {
              var $image = $$1(target);
              var position = $image.position();
              var pos = {
                  left: position.left + parseInt($image.css('marginLeft'), 10),
                  top: position.top + parseInt($image.css('marginTop'), 10)
              };
              // exclude margin
              var imageSize = {
                  w: $image.outerWidth(false),
                  h: $image.outerHeight(false)
              };
              $selection.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top,
                  width: imageSize.w,
                  height: imageSize.h
              }).data('target', $image); // save current image element.
              $image.attr('width', imageSize.w).css('width', '')
              $image.attr('height', imageSize.h).css('height', '')
              //console.log($image.attr('style'))
              var origImageObj = new Image();
              origImageObj.src = $image.attr('src');
              var sizingText = imageSize.w + 'x' + imageSize.h + ' (' + this.lang.image.original + ': ' + origImageObj.width + 'x' + origImageObj.height + ')';
              $selection.find('.note-control-selection-info').text(sizingText);
              this.context.invoke('editor.saveTarget', target);
          }
          else {
              this.hide();
          }
          return isImage;
      };
      /**
       * hide
       *
       * @param {jQuery} $handle
       */
      Handle.prototype.hide = function () {
          this.context.invoke('editor.clearTarget');
          this.$handle.children().hide();
      };
      return Handle;
  }());

  var defaultScheme = 'http://';
  var linkPattern = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;
  var AutoLink = /** @class */ (function () {
      function AutoLink(context) {
          var _this = this;
          this.context = context;
          this.events = {
              'summernote.keyup': function (we, e) {
                  if (!e.isDefaultPrevented()) {
                      _this.handleKeyup(e);
                  }
              },
              'summernote.keydown': function (we, e) {
                  _this.handleKeydown(e);
              }
          };
      }
      AutoLink.prototype.initialize = function () {
          this.lastWordRange = null;
      };
      AutoLink.prototype.destroy = function () {
          this.lastWordRange = null;
      };
      AutoLink.prototype.replace = function () {
          if (!this.lastWordRange) {
              return;
          }
          var keyword = this.lastWordRange.toString();
          var match = keyword.match(linkPattern);
          if (match && (match[1] || match[2])) {
              var link = match[1] ? keyword : defaultScheme + keyword;
              var node = $$1('<a />').html(keyword).attr('href', link)[0];
              if (this.context.options.linkTargetBlank) {
                  $$1(node).attr('target', '_blank');
              }
              this.lastWordRange.insertNode(node);
              this.lastWordRange = null;
              this.context.invoke('editor.focus');
          }
      };
      AutoLink.prototype.handleKeydown = function (e) {
          if (lists.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
              var wordRange = this.context.invoke('editor.createRange').getWordRange();
              this.lastWordRange = wordRange;
          }
      };
      AutoLink.prototype.handleKeyup = function (e) {
          if (lists.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
              this.replace();
          }
      };
      return AutoLink;
  }());

  /**
   * textarea auto sync.
   */
  var AutoSync = /** @class */ (function () {
      function AutoSync(context) {
          var _this = this;
          this.$note = context.layoutInfo.note;
          this.events = {
              'summernote.change': function () {
                  _this.$note.val(context.invoke('code'));
              }
          };
      }
      AutoSync.prototype.shouldInitialize = function () {
          return dom.isTextarea(this.$note[0]);
      };
      return AutoSync;
  }());

  var Placeholder = /** @class */ (function () {
      function Placeholder(context) {
          var _this = this;
          this.context = context;
          this.$editingArea = context.layoutInfo.editingArea;
          this.options = context.options;
          this.events = {
              'summernote.init summernote.change': function () {
                  _this.update();
              },
              'summernote.codeview.toggled': function () {
                  _this.update();
              }
          };
      }
      Placeholder.prototype.shouldInitialize = function () {
          return !!this.options.placeholder;
      };
      Placeholder.prototype.initialize = function () {
          var _this = this;
          this.$placeholder = $$1('<div class="note-placeholder">');
          this.$placeholder.on('click', function () {
              _this.context.invoke('focus');
          }).html(this.options.placeholder).prependTo(this.$editingArea);
          this.update();
      };
      Placeholder.prototype.destroy = function () {
          this.$placeholder.remove();
      };
      Placeholder.prototype.update = function () {
          var isShow = !this.context.invoke('codeview.isActivated') && this.context.invoke('editor.isEmpty');
          this.$placeholder.toggle(isShow);
      };
      return Placeholder;
  }());

  var Buttons = /** @class */ (function () {
      function Buttons(context) {
          this.ui = $$1.summernote.ui;
          this.context = context;
          this.$toolbar = context.layoutInfo.toolbar;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.invertedKeyMap = func.invertObject(this.options.keyMap[env.isMac ? 'mac' : 'pc']);
      }
      Buttons.prototype.representShortcut = function (editorMethod) {
          var shortcut = this.invertedKeyMap[editorMethod];
          if (!this.options.shortcuts || !shortcut) {
              return '';
          }
          if (env.isMac) {
              shortcut = shortcut.replace('CMD', '⌘').replace('SHIFT', '⇧');
          }
          shortcut = shortcut.replace('BACKSLASH', '\\')
              .replace('SLASH', '/')
              .replace('LEFTBRACKET', '[')
              .replace('RIGHTBRACKET', ']');
          return ' (' + shortcut + ')';
      };
      Buttons.prototype.button = function (o) {
          if (!this.options.tooltip && o.tooltip) {
              delete o.tooltip;
          }
          o.container = this.options.container;
          return this.ui.button(o);
      };
      Buttons.prototype.initialize = function () {
          this.addToolbarButtons();
          this.addImagePopoverButtons();
          this.addLinkPopoverButtons();
          this.addTablePopoverButtons();
          this.fontInstalledMap = {};
      };
      Buttons.prototype.destroy = function () {
          delete this.fontInstalledMap;
      };
      Buttons.prototype.isFontInstalled = function (name) {
          if (!this.fontInstalledMap.hasOwnProperty(name)) {
              this.fontInstalledMap[name] = env.isFontInstalled(name) ||
                  lists.contains(this.options.fontNamesIgnoreCheck, name);
          }
          return this.fontInstalledMap[name];
      };
      Buttons.prototype.isFontDeservedToAdd = function (name) {
          var genericFamilies = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];
          name = name.toLowerCase();
          return ((name !== '') && this.isFontInstalled(name) && ($$1.inArray(name, genericFamilies) === -1));
      };
      Buttons.prototype.colorPalette = function (className, tooltip, backColor, foreColor) {
          var _this = this;
          return this.ui.buttonGroup({
              className: 'note-color ' + className,
              children: [
                  this.button({
                      className: 'note-current-color-button',
                      contents: this.ui.icon(this.options.icons.font + ' note-recent-color'),
                      tooltip: tooltip,
                      click: function (e) {
                          var $button = $$1(e.currentTarget);
                          if (backColor && foreColor) {
                              _this.context.invoke('editor.color', {
                                  backColor: $button.attr('data-backColor'),
                                  foreColor: $button.attr('data-foreColor')
                              });
                          }
                          else if (backColor) {
                              _this.context.invoke('editor.color', {
                                  backColor: $button.attr('data-backColor')
                              });
                          }
                          else if (foreColor) {
                              _this.context.invoke('editor.color', {
                                  foreColor: $button.attr('data-foreColor')
                              });
                          }
                      },
                      callback: function ($button) {
                          var $recentColor = $button.find('.note-recent-color');
                          if (backColor) {
                              $recentColor.css('background-color', '#FFFF00');
                              $button.attr('data-backColor', '#FFFF00');
                          }
                          if (!foreColor) {
                              $recentColor.css('color', 'transparent');
                          }
                      }
                  }),
                  this.button({
                      className: 'dropdown-toggle',
                      contents: this.ui.dropdownButtonContents('', this.options),
                      tooltip: this.lang.color.more,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  this.ui.dropdown({
                      items: (backColor ? [
                          '<div class="note-palette">',
                          '  <div class="note-palette-title">' + this.lang.color.background + '</div>',
                          '  <div>',
                          '    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">',
                          this.lang.color.transparent,
                          '    </button>',
                          '  </div>',
                          '  <div class="note-holder" data-event="backColor"/>',
                          '  <div>',
                          '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="backColorPicker">',
                          this.lang.color.cpSelect,
                          '    </button>',
                          '    <input type="color" id="backColorPicker" class="note-btn note-color-select-btn" value="#FFFF00" data-event="backColorPalette">',
                          '  </div>',
                          '  <div class="note-holder-custom" id="backColorPalette" data-event="backColor"/>',
                          '</div>'
                      ].join('') : '') +
                          (foreColor ? [
                              '<div class="note-palette">',
                              '  <div class="note-palette-title">' + this.lang.color.foreground + '</div>',
                              '  <div>',
                              '    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">',
                              this.lang.color.resetToDefault,
                              '    </button>',
                              '  </div>',
                              '  <div class="note-holder" data-event="foreColor"/>',
                              '  <div>',
                              '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="foreColorPicker">',
                              this.lang.color.cpSelect,
                              '    </button>',
                              '    <input type="color" id="foreColorPicker" class="note-btn note-color-select-btn" value="#000000" data-event="foreColorPalette">',
                              '  <div class="note-holder-custom" id="foreColorPalette" data-event="foreColor"/>',
                              '</div>'
                          ].join('') : ''),
                      callback: function ($dropdown) {
                          $dropdown.find('.note-holder').each(function (idx, item) {
                              var $holder = $$1(item);
                              $holder.append(_this.ui.palette({
                                  colors: _this.options.colors,
                                  colorsName: _this.options.colorsName,
                                  eventName: $holder.data('event'),
                                  container: _this.options.container,
                                  tooltip: _this.options.tooltip
                              }).render());
                          });
                          /* TODO: do we have to record recent custom colors within cookies? */
                          var customColors = [
                              ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
                          ];
                          $dropdown.find('.note-holder-custom').each(function (idx, item) {
                              var $holder = $$1(item);
                              $holder.append(_this.ui.palette({
                                  colors: customColors,
                                  colorsName: customColors,
                                  eventName: $holder.data('event'),
                                  container: _this.options.container,
                                  tooltip: _this.options.tooltip
                              }).render());
                          });
                          $dropdown.find('input[type=color]').each(function (idx, item) {
                              $$1(item).change(function () {
                                  var $chip = $dropdown.find('#' + $$1(this).data('event')).find('.note-color-btn').first();
                                  var color = this.value.toUpperCase();
                                  $chip.css('background-color', color)
                                      .attr('aria-label', color)
                                      .attr('data-value', color)
                                      .attr('data-original-title', color);
                                  $chip.click();
                              });
                          });
                      }, 
                      click: function (event) {
                          //console.log('set color')
                        
                          event.stopPropagation()
                          event.preventDefault()
                          
                          var $parent = $$1('.' + className);
                          var $button = $$1(event.target);
                          var eventName = $button.data('event');
                          var value = $button.attr('data-value');
                          //console.log([eventName, value])
                          //console.log(lists.contains(['backColor', 'foreColor'], eventName))
                          if (eventName === 'openPalette') {
                              var $picker = $parent.find('#' + value);
                              var $palette = $$1($parent.find('#' + $picker.data('event')).find('.note-color-row')[0]);
                              // Shift palette chips
                              var $chip = $palette.find('.note-color-btn').last().detach();
                              // Set chip attributes
                              var color = $picker.val();
                              $chip.css('background-color', color)
                                  .attr('aria-label', color)
                                  .attr('data-value', color)
                                  .attr('data-original-title', color);
                              $palette.prepend($chip);
                              $picker.click();
                              event.preventDefault()
                          }
                          else if (eventName === 'removeFormat') {
                            if (hasSelectedRange() === false) {
                              event.preventDefault()
                              return
                            }
                              
                            let color = 'inherit'
                            /*
                            if (value === 'backColor') {
                              color = 'transparent'
                            }
                            */
                            //console.log(['editor.' + value, color])
                            _this.context.invoke('editor.' + value, color);
                            let $color = $button.closest('.note-color').find('.note-recent-color');
                            $color.css(value, color);
                            
                            let $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                            $currentButton.attr('data-' + value, color);
                          }
                          else if (lists.contains(['backColor', 'foreColor'], eventName)) {
                              if (hasSelectedRange() === false) {
                                event.preventDefault()
                                return
                              }
                            
                              let key = eventName === 'backColor' ? 'background-color' : 'color';
                              let $color = $button.closest('.note-color').find('.note-recent-color');
                              let $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                              $color.css(key, value);
                              $currentButton.attr('data-' + eventName, value);
                              //console.log(['editor.' + eventName, value])
                              //console.log(_this.context.layoutInfo.editor)
                              //if (_this.context.invoke('editor.hasSelectedRange')) {
                              //console.log(hasSelectedRange())
                              
                              _this.context.invoke('editor.' + eventName, value);
                          }
                          else {
                            //console.log('其他')
                          }
                      }
                  })
              ]
          }).render();
      };
      Buttons.prototype.addToolbarButtons = function () {
          var _this = this;
          this.context.memo('button.style', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.magic), _this.options),
                      tooltip: _this.lang.style.style,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown({
                      className: 'dropdown-style',
                      items: _this.options.styleTags,
                      title: _this.lang.style.style,
                      template: function (item) {
                          if (typeof item === 'string') {
                              item = { tag: item, title: (_this.lang.style.hasOwnProperty(item) ? _this.lang.style[item] : item) };
                          }
                          var tag = item.tag;
                          var title = item.title;
                          var style = item.style ? ' style="' + item.style + '" ' : '';
                          var className = item.className ? ' class="' + item.className + '"' : '';
                          return '<' + tag + style + className + '>' + title + '</' + tag + '>';
                      },
                      click: _this.context.createInvokeHandler('editor.formatBlock')
                  })
              ]).render();
          });
          var _loop_1 = function (styleIdx, styleLen) {
              var item = this_1.options.styleTags[styleIdx];
              this_1.context.memo('button.style.' + item, function () {
                  return _this.button({
                      className: 'note-btn-style-' + item,
                      contents: '<div data-value="' + item + '">' + item.toUpperCase() + '</div>',
                      tooltip: _this.lang.style[item],
                      click: _this.context.createInvokeHandler('editor.formatBlock')
                  }).render();
              });
          };
          var this_1 = this;
          for (var styleIdx = 0, styleLen = this.options.styleTags.length; styleIdx < styleLen; styleIdx++) {
              _loop_1(styleIdx, styleLen);
          }
          this.context.memo('button.formatPara', function () {
              return _this.button({
                  className: 'note-btn-formatBlock note-btn-formatP',
                  contents: '<p></p>',
                  tooltip: _this.lang.style.formatPara,
                  click: _this.context.createInvokeHandler('editor.formatBlock', 'P')
              }).render();
          });
          this.context.memo('button.formatCode', function () {
              return _this.button({
                  className: 'note-btn-formatBlock note-btn-formatCode',
                  contents: '<code></code>',
                  tooltip: _this.lang.style.formatCode,
                  click: _this.context.createInvokeHandler('editor.formatBlock', ['code', 'pre'])
              }).render();
          });
          this.context.memo('button.formatH1', function () {
              return _this.button({
                  className: 'note-btn-formatBlock note-btn-formatH1',
                  contents: '<h1></h1>',
                  tooltip: _this.lang.style.formatH1,
                  click: _this.context.createInvokeHandler('editor.formatBlock', 'H1')
              }).render();
          });
          this.context.memo('button.formatH2', function () {
              return _this.button({
                  className: 'note-btn-formatBlock note-btn-formatH2',
                  contents: '<h2></h2>',
                  tooltip: _this.lang.style.formatH2,
                  click: _this.context.createInvokeHandler('editor.formatBlock', 'H2')
              }).render();
          });
          this.context.memo('button.formatH3', function () {
              return _this.button({
                  className: 'note-btn-formatBlock note-btn-formatH3',
                  contents: '<h3></h3>',
                  tooltip: _this.lang.style.formatH3,
                  click: _this.context.createInvokeHandler('editor.formatBlock', 'H3')
              }).render();
          });
          this.context.memo('button.formatH4', function () {
              return _this.button({
                  className: 'note-btn-formatBlock note-btn-formatH4',
                  contents: '<h4></h4>',
                  tooltip: _this.lang.style.formatH4,
                  click: _this.context.createInvokeHandler('editor.formatBlock', 'H4')
              }).render();
          });
          this.context.memo('button.formatH5', function () {
              return _this.button({
                  className: 'note-btn-formatBlock note-btn-formatH5',
                  contents: '<h5></h5>',
                  tooltip: _this.lang.style.formatH5,
                  click: _this.context.createInvokeHandler('editor.formatBlock', 'H5')
              }).render();
          });
          this.context.memo('button.formatH6', function () {
              return _this.button({
                  className: 'note-btn-formatBlock note-btn-formatH6',
                  contents: '<h6></h6>',
                  tooltip: _this.lang.style.formatH6,
                  click: _this.context.createInvokeHandler('editor.formatBlock', 'H6')
              }).render();
          });
          this.context.memo('button.bold', function () {
              return _this.button({
                  className: 'note-btn-bold',
                  contents: _this.ui.icon(_this.options.icons.bold),
                  tooltip: _this.lang.font.bold + _this.representShortcut('bold'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.bold')
              }).render();
          });
          this.context.memo('button.italic', function () {
              return _this.button({
                  className: 'note-btn-italic',
                  contents: _this.ui.icon(_this.options.icons.italic),
                  tooltip: _this.lang.font.italic + _this.representShortcut('italic'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.italic')
              }).render();
          });
          this.context.memo('button.underline', function () {
              return _this.button({
                  className: 'note-btn-underline',
                  contents: _this.ui.icon(_this.options.icons.underline),
                  tooltip: _this.lang.font.underline + _this.representShortcut('underline'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.underline')
              }).render();
          });
          this.context.memo('button.clear', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.eraser),
                  tooltip: _this.lang.font.clear + _this.representShortcut('removeFormat'),
                  click: _this.context.createInvokeHandler('editor.removeFormat')
              }).render();
          });
          this.context.memo('button.strikethrough', function () {
              return _this.button({
                  className: 'note-btn-strikethrough',
                  contents: _this.ui.icon(_this.options.icons.strikethrough),
                  tooltip: _this.lang.font.strikethrough + _this.representShortcut('strikethrough'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.strikethrough')
              }).render();
          });
          this.context.memo('button.comment', function () {
              return _this.button({
                  className: 'note-btn-comment',
                  contents: _this.ui.icon(_this.options.icons.comment),
                  tooltip: _this.lang.font.comment + _this.representShortcut('comment'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.comment')
              }).render();
          });
          this.context.memo('button.uncomment', function () {
              return _this.button({
                  className: 'note-btn-uncomment',
                  contents: _this.ui.icon(_this.options.icons.uncomment),
                  tooltip: _this.lang.font.uncomment + _this.representShortcut('uncomment'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.uncomment')
              }).render();
          });
          this.context.memo('button.htmlify', function () {
              return _this.button({
                  className: 'note-btn-htmlify',
                  contents: 'H',
                  tooltip: _this.lang.font.htmlify + _this.representShortcut('htmlify'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.htmlify')
              }).render();
          });
          this.context.memo('button.textify', function () {
              return _this.button({
                  className: 'note-btn-textify',
                  contents: 'T',
                  tooltip: _this.lang.font.textify + _this.representShortcut('textify'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.textify')
              }).render();
          });
          this.context.memo('button.iframe', function () {
              return _this.button({
                  className: 'note-btn-iframe',
                  contents: 'iFrame',
                  tooltip: _this.lang.font.iframe + _this.representShortcut('iframe'),
                  click: _this.context.createInvokeHandlerAndUpdateState('iframeDialog.show')
              }).render();
          });
          this.context.memo('button.superscript', function () {
              return _this.button({
                  className: 'note-btn-superscript',
                  contents: _this.ui.icon(_this.options.icons.superscript),
                  tooltip: _this.lang.font.superscript,
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.superscript')
              }).render();
          });
          this.context.memo('button.subscript', function () {
              return _this.button({
                  className: 'note-btn-subscript',
                  contents: _this.ui.icon(_this.options.icons.subscript),
                  tooltip: _this.lang.font.subscript,
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.subscript')
              }).render();
          });
          this.context.memo('button.fontname', function () {
              var styleInfo = _this.context.invoke('editor.currentStyle');
              // Add 'default' fonts into the fontnames array if not exist
              $$1.each(styleInfo['font-family'].split(','), function (idx, fontname) {
                  fontname = fontname.trim().replace(/['"]+/g, '');
                  if (_this.isFontDeservedToAdd(fontname)) {
                      if ($$1.inArray(fontname, _this.options.fontNames) === -1) {
                          _this.options.fontNames.push(fontname);
                      }
                  }
              });
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents('<span class="note-current-fontname"/>', _this.options),
                      tooltip: _this.lang.font.name,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      className: 'dropdown-fontname',
                      checkClassName: _this.options.icons.menuCheck,
                      items: _this.options.fontNames.filter(_this.isFontInstalled.bind(_this)),
                      title: _this.lang.font.name,
                      template: function (item) {
                          return '<span style="font-family: \'' + item + '\'">' + item + '</span>';
                      },
                      click: _this.context.createInvokeHandlerAndUpdateState('editor.fontName')
                  })
              ]).render();
          });
          this.context.memo('button.fontsize', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents('<span class="note-current-fontsize"/>', _this.options),
                      tooltip: _this.lang.font.size,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      className: 'dropdown-fontsize',
                      checkClassName: _this.options.icons.menuCheck,
                      items: _this.options.fontSizes,
                      title: _this.lang.font.size,
                      click: _this.context.createInvokeHandlerAndUpdateState('editor.fontSize')
                  })
              ]).render();
          });
          this.context.memo('button.color', function () {
              return _this.colorPalette('note-color-all', _this.lang.color.recent, true, true);
          });
          this.context.memo('button.forecolor', function () {
              return _this.colorPalette('note-color-fore', _this.lang.color.foreground, false, true);
          });
          this.context.memo('button.backcolor', function () {
              return _this.colorPalette('note-color-back', _this.lang.color.background, true, false);
          });
          this.context.memo('button.ul', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.unorderedlist),
                  tooltip: _this.lang.lists.unordered + _this.representShortcut('insertUnorderedList'),
                  click: _this.context.createInvokeHandler('editor.insertUnorderedList')
              }).render();
          });
          this.context.memo('button.ol', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.orderedlist),
                  tooltip: _this.lang.lists.ordered + _this.representShortcut('insertOrderedList'),
                  click: _this.context.createInvokeHandler('editor.insertOrderedList')
              }).render();
          });
          var justifyLeft = this.button({
              contents: this.ui.icon(this.options.icons.alignLeft),
              tooltip: this.lang.paragraph.left + this.representShortcut('justifyLeft'),
              click: this.context.createInvokeHandler('editor.justifyLeft')
          });
          var justifyCenter = this.button({
              contents: this.ui.icon(this.options.icons.alignCenter),
              tooltip: this.lang.paragraph.center + this.representShortcut('justifyCenter'),
              click: this.context.createInvokeHandler('editor.justifyCenter')
          });
          var justifyRight = this.button({
              contents: this.ui.icon(this.options.icons.alignRight),
              tooltip: this.lang.paragraph.right + this.representShortcut('justifyRight'),
              click: this.context.createInvokeHandler('editor.justifyRight')
          });
          var justifyFull = this.button({
              contents: this.ui.icon(this.options.icons.alignJustify),
              tooltip: this.lang.paragraph.justify + this.representShortcut('justifyFull'),
              click: this.context.createInvokeHandler('editor.justifyFull')
          });
          var outdent = this.button({
              contents: this.ui.icon(this.options.icons.outdent),
              tooltip: this.lang.paragraph.outdent + this.representShortcut('outdent'),
              click: this.context.createInvokeHandler('editor.outdent')
          });
          var indent = this.button({
              contents: this.ui.icon(this.options.icons.indent),
              tooltip: this.lang.paragraph.indent + this.representShortcut('indent'),
              click: this.context.createInvokeHandler('editor.indent')
          });
          this.context.memo('button.justifyLeft', func.invoke(justifyLeft, 'render'));
          this.context.memo('button.justifyCenter', func.invoke(justifyCenter, 'render'));
          this.context.memo('button.justifyRight', func.invoke(justifyRight, 'render'));
          this.context.memo('button.justifyFull', func.invoke(justifyFull, 'render'));
          this.context.memo('button.outdent', func.invoke(outdent, 'render'));
          this.context.memo('button.indent', func.invoke(indent, 'render'));
          this.context.memo('button.paragraph', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.alignLeft), _this.options),
                      tooltip: _this.lang.paragraph.paragraph,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown([
                      _this.ui.buttonGroup({
                          className: 'note-align',
                          children: [justifyLeft, justifyCenter, justifyRight, justifyFull]
                      }),
                      _this.ui.buttonGroup({
                          className: 'note-list',
                          children: [outdent, indent]
                      })
                  ])
              ]).render();
          });
          this.context.memo('button.height', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.textHeight), _this.options),
                      tooltip: _this.lang.font.height,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      items: _this.options.lineHeights,
                      checkClassName: _this.options.icons.menuCheck,
                      className: 'dropdown-line-height',
                      title: _this.lang.font.height,
                      click: _this.context.createInvokeHandler('editor.lineHeight')
                  })
              ]).render();
          });
          this.context.memo('button.table', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.table), _this.options),
                      tooltip: _this.lang.table.table,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown({
                      title: _this.lang.table.table,
                      className: 'note-table',
                      items: [
                          '<div class="note-dimension-picker">',
                          '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>',
                          '  <div class="note-dimension-picker-highlighted"/>',
                          '  <div class="note-dimension-picker-unhighlighted"/>',
                          '</div>',
                          '<div class="note-dimension-display">1 x 1</div>'
                      ].join('')
                  })
              ], {
                  callback: function ($node) {
                      var $catcher = $node.find('.note-dimension-picker-mousecatcher');
                      $catcher.css({
                          width: _this.options.insertTableMaxSize.col + 'em',
                          height: _this.options.insertTableMaxSize.row + 'em'
                      }).mousedown(_this.context.createInvokeHandler('editor.insertTable'))
                          .on('mousemove', _this.tableMoveHandler.bind(_this));
                  }
              }).render();
          });
          this.context.memo('button.link', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.link),
                  tooltip: _this.lang.link.link + _this.representShortcut('linkDialog.show'),
                  click: _this.context.createInvokeHandler('linkDialog.show')
              }).render();
          });
          this.context.memo('button.picture', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.picture),
                  tooltip: _this.lang.image.image,
                  click: _this.context.createInvokeHandler('imageDialog.show')
              }).render();
          });
          this.context.memo('button.video', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.video),
                  tooltip: _this.lang.video.video,
                  click: _this.context.createInvokeHandler('videoDialog.show')
              }).render();
          });
          this.context.memo('button.hr', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.minus),
                  tooltip: _this.lang.hr.insert + _this.representShortcut('insertHorizontalRule'),
                  click: _this.context.createInvokeHandler('editor.insertHorizontalRule')
              }).render();
          });
          this.context.memo('button.fullscreen', function () {
              return _this.button({
                  className: 'btn-fullscreen',
                  contents: _this.ui.icon(_this.options.icons.arrowsAlt),
                  tooltip: _this.lang.options.fullscreen,
                  click: _this.context.createInvokeHandler('fullscreen.toggle')
              }).render();
          });
          this.context.memo('button.codeview', function () {
              return _this.button({
                  className: 'btn-codeview',
                  contents: _this.ui.icon(_this.options.icons.code),
                  tooltip: _this.lang.options.codeview,
                  click: _this.context.createInvokeHandler('codeview.toggle')
              }).render();
          });
          this.context.memo('button.redo', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.redo),
                  tooltip: _this.lang.history.redo + _this.representShortcut('redo'),
                  click: _this.context.createInvokeHandler('editor.redo')
              }).render();
          });
          this.context.memo('button.undo', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.undo),
                  tooltip: _this.lang.history.undo + _this.representShortcut('undo'),
                  click: _this.context.createInvokeHandler('editor.undo')
              }).render();
          });
          this.context.memo('button.help', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.question),
                  tooltip: _this.lang.options.help,
                  click: _this.context.createInvokeHandler('helpDialog.show')
              }).render();
          });
      };
      /*
      Buttons.prototype.insertTableCallback = function ($node) {
        var $catcher = $node.find('.note-dimension-picker-mousecatcher');
            $catcher.css({
                width: 10 + 'em',
                height: 10 + 'em'
            }).mousedown(this.context.createInvokeHandler('editor.insertTable'))
                .on('mousemove', this.tableMoveHandler.bind(this));
      }
      */
      /**
       * image : [
       *   ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
       *   ['float', ['floatLeft', 'floatRight', 'floatNone' ]],
       *   ['remove', ['removeMedia']]
       * ],
       */
      Buttons.prototype.addImagePopoverButtons = function () {
          var _this = this;
          // Image Size Buttons
          this.context.memo('button.imageSize100', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">100%</span>',
                  tooltip: _this.lang.image.resizeFull,
                  click: _this.context.createInvokeHandler('editor.resize', '1')
              }).render();
          });
          this.context.memo('button.imageSize50', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">50%</span>',
                  tooltip: _this.lang.image.resizeHalf,
                  click: _this.context.createInvokeHandler('editor.resize', '0.5')
              }).render();
          });
          this.context.memo('button.imageSize25', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">25%</span>',
                  tooltip: _this.lang.image.resizeQuarter,
                  click: _this.context.createInvokeHandler('editor.resize', '0.25')
              }).render();
          });
          // Float Buttons
          this.context.memo('button.floatLeft', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.alignLeft),
                  tooltip: _this.lang.image.floatLeft,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'left')
              }).render();
          });
          this.context.memo('button.floatRight', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.alignRight),
                  tooltip: _this.lang.image.floatRight,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'right')
              }).render();
          });
          this.context.memo('button.floatNone', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.alignJustify),
                  tooltip: _this.lang.image.floatNone,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'none')
              }).render();
          });
          // Remove Buttons
          this.context.memo('button.removeMedia', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.trash),
                  tooltip: _this.lang.image.remove,
                  click: _this.context.createInvokeHandler('editor.removeMedia')
              }).render();
          });
          // Open Buttons
          this.context.memo('button.openMedia', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.arrowsCircleUp) + ' ' + _this.lang.image.open,
                  tooltip: _this.lang.image.open,
                  click: _this.context.createInvokeHandler('editor.openMedia')
              }).render();
          });
          // Copy Buttons
          this.context.memo('button.copyMediaLink', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.code) + ' ' + _this.lang.image.copy,
                  tooltip: _this.lang.image.copy,
                  click: _this.context.createInvokeHandler('editor.copyMediaLink')
              }).render();
          });
          // Save Buttons
          this.context.memo('button.saveMedia', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.arrowsCircleDown) + ' ' + _this.lang.image.save,
                  tooltip: _this.lang.image.save,
                  click: _this.context.createInvokeHandler('editor.saveMedia')
              }).render();
          });
      };
      Buttons.prototype.addLinkPopoverButtons = function () {
          var _this = this;
          this.context.memo('button.linkDialogShow', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.link),
                  tooltip: _this.lang.link.edit,
                  click: _this.context.createInvokeHandler('linkDialog.show')
              }).render();
          });
          this.context.memo('button.unlink', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.unlink),
                  tooltip: _this.lang.link.unlink,
                  click: _this.context.createInvokeHandler('editor.unlink')
              }).render();
          });
          // Remove Buttons
          this.context.memo('button.removeLink', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.trash),
                  tooltip: _this.lang.link.remove,
                  click: _this.context.createInvokeHandler('editor.removeLink')
              }).render();
          });
          // Remove Buttons
          this.context.memo('button.copyLink', function () {
              return _this.button({
                  //contents: _this.ui.icon(_this.options.icons.copy),  // 
                  contents: _this.ui.icon(_this.options.icons.code) + ' ' + _this.lang.link.copy,
                  tooltip: _this.lang.image.copy,
                  click: _this.context.createInvokeHandler('editor.copyLink')
              }).render();
          });
      };
      /**
       * table : [
       *  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
       *  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
       * ],
       */
      Buttons.prototype.addTablePopoverButtons = function () {
          var _this = this;
          this.context.memo('button.addRowUp', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowAbove),
                  tooltip: _this.lang.table.addRowAbove,
                  click: _this.context.createInvokeHandler('editor.addRow', 'top')
              }).render();
          });
          this.context.memo('button.addRowDown', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowBelow),
                  tooltip: _this.lang.table.addRowBelow,
                  click: _this.context.createInvokeHandler('editor.addRow', 'bottom')
              }).render();
          });
          this.context.memo('button.addColLeft', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colBefore),
                  tooltip: _this.lang.table.addColLeft,
                  click: _this.context.createInvokeHandler('editor.addCol', 'left')
              }).render();
          });
          this.context.memo('button.addColRight', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colAfter),
                  tooltip: _this.lang.table.addColRight,
                  click: _this.context.createInvokeHandler('editor.addCol', 'right')
              }).render();
          });
          this.context.memo('button.deleteRow', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowRemove),
                  tooltip: _this.lang.table.delRow,
                  click: _this.context.createInvokeHandler('editor.deleteRow')
              }).render();
          });
          this.context.memo('button.deleteCol', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colRemove),
                  tooltip: _this.lang.table.delCol,
                  click: _this.context.createInvokeHandler('editor.deleteCol')
              }).render();
          });
          this.context.memo('button.deleteTable', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.trash),
                  tooltip: _this.lang.table.delTable,
                  click: _this.context.createInvokeHandler('editor.deleteTable')
              }).render();
          });
      };
      Buttons.prototype.build = function ($container, groups) {
          for (var groupIdx = 0, groupLen = groups.length; groupIdx < groupLen; groupIdx++) {
              var group = groups[groupIdx];
              var groupName = $$1.isArray(group) ? group[0] : group;
              var buttons = $$1.isArray(group) ? ((group.length === 1) ? [group[0]] : group[1]) : [group];
              var $group = this.ui.buttonGroup({
                  className: 'note-' + groupName
              }).render();
              for (var idx = 0, len = buttons.length; idx < len; idx++) {
                  var btn = this.context.memo('button.' + buttons[idx]);
                  if (btn) {
                      $group.append(typeof btn === 'function' ? btn(this.context) : btn);
                  }
              }
              $group.appendTo($container);
          }
      };
      /**
       * @param {jQuery} [$container]
       */
      Buttons.prototype.updateCurrentStyle = function ($container) {
          var _this = this;
          var $cont = $container || this.$toolbar;
          var styleInfo = this.context.invoke('editor.currentStyle');
          this.updateBtnStates($cont, {
              '.note-btn-bold': function () {
                  return styleInfo['font-bold'] === 'bold';
              },
              '.note-btn-italic': function () {
                  return styleInfo['font-italic'] === 'italic';
              },
              '.note-btn-underline': function () {
                  return styleInfo['font-underline'] === 'underline';
              },
              '.note-btn-subscript': function () {
                  return styleInfo['font-subscript'] === 'subscript';
              },
              '.note-btn-superscript': function () {
                  return styleInfo['font-superscript'] === 'superscript';
              },
              '.note-btn-strikethrough': function () {
                  return styleInfo['font-strikethrough'] === 'strikethrough';
              },
              '.note-btn-comment': function () {
                  return styleInfo['font-comment'] === 'comment';
              },
              '.note-btn-uncomment': function () {
                  return styleInfo['font-uncomment'] === 'uncomment';
              },
              '.note-btn-htmlify': function () {
                  return styleInfo['font-htmlify'] === 'htmlify';
              },
              '.note-btn-textify': function () {
                  return styleInfo['font-textify'] === 'textify';
              }
          });
          if (styleInfo['font-family']) {
              var fontNames = styleInfo['font-family'].split(',').map(function (name) {
                  return name.replace(/[\'\"]/g, '')
                      .replace(/\s+$/, '')
                      .replace(/^\s+/, '');
              });
              var fontName_1 = lists.find(fontNames, this.isFontInstalled.bind(this));
              $cont.find('.dropdown-fontname a').each(function (idx, item) {
                  var $item = $$1(item);
                  // always compare string to avoid creating another func.
                  var isChecked = ($item.data('value') + '') === (fontName_1 + '');
                  $item.toggleClass('checked', isChecked);
              });
              $cont.find('.note-current-fontname').text(fontName_1).css('font-family', fontName_1);
          }
          if (styleInfo['font-size']) {
              var fontSize_1 = styleInfo['font-size'];
              $cont.find('.dropdown-fontsize a').each(function (idx, item) {
                  var $item = $$1(item);
                  // always compare with string to avoid creating another func.
                  var isChecked = ($item.data('value') + '') === (fontSize_1 + '');
                  $item.toggleClass('checked', isChecked);
              });
              $cont.find('.note-current-fontsize').text(fontSize_1);
          }
          if (styleInfo['line-height']) {
              var lineHeight_1 = styleInfo['line-height'];
              $cont.find('.dropdown-line-height li a').each(function (idx, item) {
                  // always compare with string to avoid creating another func.
                  var isChecked = ($$1(item).data('value') + '') === (lineHeight_1 + '');
                  _this.className = isChecked ? 'checked' : '';
              });
          }
      };
      Buttons.prototype.updateBtnStates = function ($container, infos) {
          var _this = this;
          $$1.each(infos, function (selector, pred) {
              _this.ui.toggleBtnActive($container.find(selector), pred());
          });
      };
      Buttons.prototype.tableMoveHandler = function (event) {
          var PX_PER_EM = 18;
          var $picker = $$1(event.target.parentNode); // target is mousecatcher
          var $dimensionDisplay = $picker.next();
          var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
          var $highlighted = $picker.find('.note-dimension-picker-highlighted');
          var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');
          var posOffset;
          // HTML5 with jQuery - e.offsetX is undefined in Firefox
          if (event.offsetX === undefined) {
              var posCatcher = $$1(event.target).offset();
              posOffset = {
                  x: event.pageX - posCatcher.left,
                  y: event.pageY - posCatcher.top
              };
          }
          else {
              posOffset = {
                  x: event.offsetX,
                  y: event.offsetY
              };
          }
          var dim = {
              c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
              r: Math.ceil(posOffset.y / PX_PER_EM) || 1
          };
          $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });
          $catcher.data('value', dim.c + 'x' + dim.r);
          if (dim.c > 3 && dim.c < this.options.insertTableMaxSize.col) {
              $unhighlighted.css({ width: dim.c + 1 + 'em' });
          }
          if (dim.r > 3 && dim.r < this.options.insertTableMaxSize.row) {
              $unhighlighted.css({ height: dim.r + 1 + 'em' });
          }
          $dimensionDisplay.html(dim.c + ' x ' + dim.r);
      };
      return Buttons;
  }());

  var Toolbar = /** @class */ (function () {
      function Toolbar(context) {
          this.context = context;
          this.$window = $$1(window);
          this.$document = $$1(document);
          this.ui = $$1.summernote.ui;
          this.$note = context.layoutInfo.note;
          this.$editor = context.layoutInfo.editor;
          this.$toolbar = context.layoutInfo.toolbar;
          this.options = context.options;
          this.followScroll = this.followScroll.bind(this);
          this.noteEditable = null
      }
      Toolbar.prototype.shouldInitialize = function () {
          return !this.options.airMode;
      };
      Toolbar.prototype.initialize = function () {
          var _this = this;
          this.options.toolbar = this.options.toolbar || [];
          if (!this.options.toolbar.length) {
              this.$toolbar.hide();
          }
          else {
              this.context.invoke('buttons.build', this.$toolbar, this.options.toolbar);
          }
          if (this.options.toolbarContainer) {
              this.$toolbar.appendTo(this.options.toolbarContainer);
          }
          this.changeContainer(false);
          this.$note.on('summernote.keyup summernote.mouseup summernote.change', function () {
              _this.context.invoke('buttons.updateCurrentStyle');
          });
          this.context.invoke('buttons.updateCurrentStyle');
          if (this.options.followingToolbar) {
              this.$window.on('scroll resize', this.followScroll);
          }
      };
      Toolbar.prototype.destroy = function () {
          this.$toolbar.children().remove();
          if (this.options.followingToolbar) {
              this.$window.off('scroll resize', this.followScroll);
          }
      };
      Toolbar.prototype.followScroll = function () {
          if (this.$editor.hasClass('fullscreen')) {
              return false;
          }
          var $toolbarWrapper = this.$toolbar.parent('.note-toolbar-wrapper');
          var editorHeight = this.$editor.outerHeight();
          var editorWidth = this.$editor.width();
          var toolbarHeight = this.$toolbar.height();
          $toolbarWrapper.css({
              height: toolbarHeight
          });
          // check if the web app is currently using another static bar
          var otherBarHeight = 0;
          if (this.options.otherStaticBar) {
              otherBarHeight = $$1(this.options.otherStaticBar).outerHeight();
          }
          var currentOffset = this.$document.scrollTop();
          var editorOffsetTop = this.$editor.offset().top;
          var editorOffsetBottom = editorOffsetTop + editorHeight;
          var activateOffset = editorOffsetTop - otherBarHeight;
          var deactivateOffsetBottom = editorOffsetBottom - otherBarHeight - toolbarHeight;
          
          if (this.noteEditable === null) {
            this.noteEditable = this.$editor.find(".note-editable:first")
          }
          
          if ((currentOffset > activateOffset) && (currentOffset < deactivateOffsetBottom)) {
              
              //console.log(["margin-top 4", (this.$toolbar.height())])
              setTimeout(() => {
                this.noteEditable.css("margin-top", (this.$toolbar.height()) + 'px')
              
                this.$toolbar.css({
                    position: 'fixed',
                    top: otherBarHeight,
                    width: editorWidth
                });
                this.$toolbar.addClass('fixed')
              }, 0)
          }
          else {
              setTimeout(() => {
                this.noteEditable.css("margin-top", 'auto')
              
                this.$toolbar.css({
                    position: 'relative',
                    top: 0,
                    width: '100%'
                });
                this.$toolbar.removeClass('fixed')
              }, 0)
          }
      };
      Toolbar.prototype.changeContainer = function (isFullscreen) {
          if (isFullscreen) {
              this.$toolbar.prependTo(this.$editor);
          }
          else {
              if (this.options.toolbarContainer) {
                  this.$toolbar.appendTo(this.options.toolbarContainer);
              }
          }
      };
      Toolbar.prototype.updateFullscreen = function (isFullscreen) {
          this.ui.toggleBtnActive(this.$toolbar.find('.btn-fullscreen'), isFullscreen);
          this.changeContainer(isFullscreen);
      };
      Toolbar.prototype.updateCodeview = function (isCodeview) {
          this.ui.toggleBtnActive(this.$toolbar.find('.btn-codeview'), isCodeview);
          if (isCodeview) {
              this.deactivate();
          }
          else {
              this.activate();
          }
      };
      Toolbar.prototype.activate = function (isIncludeCodeview) {
          var $btn = this.$toolbar.find('button');
          if (!isIncludeCodeview) {
              $btn = $btn.not('.btn-codeview');
          }
          this.ui.toggleBtn($btn, true);
      };
      Toolbar.prototype.deactivate = function (isIncludeCodeview) {
          var $btn = this.$toolbar.find('button');
          if (!isIncludeCodeview) {
              $btn = $btn.not('.btn-codeview');
          }
          this.ui.toggleBtn($btn, false);
      };
      return Toolbar;
  }());

  var CommentDialog = /** @class */ (function () {
      function CommentDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
          context.memo('help.commentDialog.show', this.options.langInfo.help['commentDialog.show']);
      }
      
      CommentDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<div class="form-group note-form-group">',
              '<textarea class="note-comment-title form-control note-form-control note-input"></textarea>',
              '</div>'
          ].join('');
          var footer = [
            "<input type=\"button\" href=\"#\" class=\"" + 'btn btn-primary note-btn note-btn-primary note-comment-update-btn' + "\" value=\"" + this.lang.comment.update + "\">",
            "<input type=\"button\" href=\"#\" class=\"" + 'btn note-btn note-comment-remove-btn' + "\" value=\"" + this.lang.comment.remove + "\"> ",
          ].join('');
          this.$dialog = this.ui.dialog({
              className: 'comment-dialog',
              title: this.lang.comment.dialogTitle,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
          
          this.$dialog.find('.note-comment-title').focus(function (event) {
            if ($$1(this).hasClass('first-focus') === false) {
              return
            }
            $$1(this).removeClass('first-focus')
          
            if (this.value !== undefined && this.value.trim() !== "") {
              return
            }
          })
      };
      CommentDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      CommentDialog.prototype.bindEnterKey = function ($input, $btn) {
        let _this = this
        /*
        $input.on('keypress', (event) => {
          if (event.keyCode === key.code.ENTER) {
            event.stopPropagation()
            event.preventDefault()
            $btn.trigger('click');
            return false
          }
        });
        */
        $input.on('keyup', (event) => {
          if (event.keyCode === key.code.ESC) {
            event.stopPropagation()
            event.preventDefault()
            _this.ui.hideDialog(_this.$dialog);
            return false
          }
        });
      };
      /**
       * Show link dialog and set event handlers on dialog controls.
       *
       * @param {Object} linkInfo
       * @return {Promise}
       */
      CommentDialog.prototype.showCommentDialog = function (commentInfo) {
          var _this = this;
          
          //console.log(commentInfo)
          
          return $$1.Deferred(function (deferred) {
              var $commentTitle = _this.$dialog.find('.note-comment-title');
              var $removeBtn = _this.$dialog.find('.note-comment-remove-btn');
              var $updateBtn = _this.$dialog.find('.note-comment-update-btn');
              
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  
                  if (commentInfo.commentTitle) {
                    $commentTitle.val(commentInfo.commentTitle)
                  }
                  else {
                    $commentTitle.val('')
                  }
                  
                  _this.bindEnterKey($commentTitle, $updateBtn);
                  
                  $removeBtn.one('click', function (event) {
                      event.preventDefault()
                      event.stopPropagation()
                      
                      deferred.resolve({
                          range: commentInfo.range,
                          action: 'remove'
                      });
                      
                      _this.ui.hideDialog(_this.$dialog);
                  })
                  
                  $updateBtn.one('click', function (event) {
                      event.preventDefault()
                      event.stopPropagation()
                      let enableClearEnterFormat = _this.options.clearEnterFormat
                      
                      if (enableClearEnterFormat === true) {
                        _this.options.clearEnterFormat = false
                        setTimeout(() => {
                          _this.options.clearEnterFormat = true
                        }, 100)
                      }
                      //console.log(_this.options.allowEnter)
                      deferred.resolve({
                          range: commentInfo.range,
                          title: $commentTitle.val(),
                          action: 'update'
                      });
                      _this.ui.hideDialog(_this.$dialog);
                  });
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  // detach events
                  $commentTitle.off('input paste keypress');
                  $removeBtn.off('click');
                  $updateBtn.off('click');
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          }).promise();
      };
      /**
       * @param {Object} layoutInfo
       */
      CommentDialog.prototype.show = function () {
          var _this = this;
          var linkInfo = this.context.invoke('editor.getCommentInfo');
          this.context.invoke('editor.saveRange');
          this.showCommentDialog(linkInfo).then(function (commentInfo) {
              _this.context.invoke('editor.restoreRange');
              if (commentInfo.action === 'update') {
                _this.context.invoke('editor.updateComment', commentInfo);
              }
              else {
                _this.context.invoke('editor.removeComment', commentInfo);
              }
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      return CommentDialog;
  }());
  
  // ----------------------------------------------------------------------------------------
  // LinkDialog

  var LinkDialog = /** @class */ (function () {
      function LinkDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
          context.memo('help.linkDialog.show', this.options.langInfo.help['linkDialog.show']);
      }
      
      let isURL = (url) => {
        return ( (url.startsWith("http://") && url.length > 15)
                  || (url.startsWith("https://") && url.length > 15)
                  || (url.startsWith("//") && url.length > 10)
                  || (url.startsWith("#") && url.length > 2))
      }
      
      
      LinkDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.link.textToDisplay + "</label>",
              '<input class="note-link-text form-control note-form-control note-input" type="text" />',
              '</div>',
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.link.url + "</label>",
              '<input class="note-link-url form-control note-form-control note-input" type="url" value="" />',
              '</div>',
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.link.title + "</label>",
              '<input class="note-link-title form-control note-form-control note-input" type="text" value="" />',
              '</div>',
              this.buildOpenInput()
              /*
              !this.options.disableLinkTarget
                  ? $$1('<div/>').append(this.ui.checkbox({
                      className: 'sn-checkbox-open-in-new-window',
                      text: this.lang.link.openInNewWindow,
                      checked: true
                  }).render()).html()
                  : ''
              */
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-link-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.link.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              className: 'link-dialog',
              title: this.lang.link.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
          
          let button = this.$dialog.find('input.note-link-btn')
          
          this.$dialog.find('input.note-link-url').focus(function (event) {
            if ($$1(this).hasClass('first-focus') === false) {
              return
            }
            $$1(this).removeClass('first-focus')
          
            if (this.value !== undefined && this.value.trim() !== "") {
              return
            }
            //console.log(this.value)
            //console.log(event.originalEvent.clipboardData.getData('Text'))
            //console.log(event)
            navigator.clipboard.readText()
              .then(text => {
                text = text.trim()
                //console.log(text)
                //console.log('Pasted content: ', text);
                if (isURL(text)) {
                  this.value = text
                  this.select()
                  //this.keyup()
                  button.removeClass('disabled')
                  button.removeAttr('disabled')
                }
              })
              .catch(err => {
                //console.error('Failed to read clipboard contents: ', err);
              });
          })
          
          let openMethodKey = 'summernote.LinkDialog.openMethod'
          let radio = this.$dialog.find('input:radio')
          radio.change(function () {
            //console.log([this.checked, this.value])
            if (this.checked !== true) {
              return
            }
            let value = this.value
            localStorage.setItem(openMethodKey, value)
          })
      };
      LinkDialog.prototype.buildOpenInput = function () {
        /*
          !this.options.disableLinkTarget
                  ? $$1('<div/>').append(this.ui.checkbox({
                      className: 'sn-checkbox-open-in-new-window',
                      text: this.lang.link.openInNewWindow,
                      checked: true
                  }).render()).html()
                  : ''
        */
        if (this.options.disableLinkTarget === false) {
          return ''
        }
        /*
        return $$1('<div/>').append(this.ui.radio({
                      className: 'sn-checkbox-open-in-new-window',
                      text: this.lang.link.openInNewWindow,
                      checked: true
                  }).render()).html()
        */
        return `<div class="checkbox sn-checkbox-open-in-new-window">
        <label> <input role="radio" type="radio" name="openMethod" value="current" checked="true" aria-checked="true">${this.lang.link.openInCurrentWindow}</label>
        <label> <input role="radio" type="radio" name="openMethod" value="blank" aria-checked="false">${this.lang.link.openInNewWindow}</label>
        <label> <input role="radio" type="radio" name="openMethod" value="popup" aria-checked="false">${this.lang.link.openInPopup}</label>
</div>`
      };
      
      LinkDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      LinkDialog.prototype.bindEnterKey = function ($input, $btn) {
        let _this = this
        $input.on('keypress', (event) => {
          if (event.keyCode === key.code.ENTER) {
            event.stopPropagation()
            event.preventDefault()
            $btn.trigger('click');
            return false
          }
        });
        $input.on('keyup', (event) => {
          if (event.keyCode === key.code.ESC) {
            event.stopPropagation()
            event.preventDefault()
            _this.ui.hideDialog(_this.$dialog);
            return false
          }
        });
      };
      /**
       * toggle update button
       */
      LinkDialog.prototype.toggleLinkBtn = function ($linkBtn, $linkText, $linkUrl) {
          this.ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
      };
      /**
       * Show link dialog and set event handlers on dialog controls.
       *
       * @param {Object} linkInfo
       * @return {Promise}
       */
      LinkDialog.prototype.showLinkDialog = function (linkInfo) {
          var _this = this;
          
          return $$1.Deferred(function (deferred) {
              var $linkText = _this.$dialog.find('.note-link-text');
              var $linkUrl = _this.$dialog.find('.note-link-url');
              var $linkTitle = _this.$dialog.find('.note-link-title');
              var $linkBtn = _this.$dialog.find('.note-link-btn');
              //var $openInNewWindow = _this.$dialog
              //    .find('.sn-checkbox-open-in-new-window input[type=checkbox]');
              
             
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  // if no url was given, copy text to url
                  if (!linkInfo.url) {
                    let url = linkInfo.text
                    
                    if ( isURL(url) ) {
                      linkInfo.url = url
                    }
                    else {
                      //url = window.clipboardData.getData('Text')
                      url = ""
                      if ( isURL(url) ) {
                        linkInfo.url = url
                      }
                      else {
                        linkInfo.url = ''
                      }
                    }
                  }
                  
                  //console.log(linkInfo.url)
                  if (linkInfo.url.startsWith('javascript:window.open(')) {
                    let needle = 'javascript:window.open('
                    linkInfo.url = linkInfo.url.slice(needle.length + 1, linkInfo.url.indexOf('"', needle.length + 2))
                  }
                  
                  $linkText.val(linkInfo.text);
                  var handleLinkTextUpdate = function () {
                      _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                      // if linktext was modified by keyup,
                      // stop cloning text from linkUrl
                      linkInfo.text = $linkText.val();
                  };
                  $linkText.on('input', handleLinkTextUpdate).on('paste', function () {
                      setTimeout(handleLinkTextUpdate, 0);
                  });
                  var handleLinkUrlUpdate = function () {
                      _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                      // display same link on `Text to display` input
                      // when create a new link
                      if (!linkInfo.text) {
                          $linkText.val($linkUrl.val());
                      }
                  };
                  $linkUrl.on('input', handleLinkUrlUpdate).on('paste', function () {
                      setTimeout(handleLinkUrlUpdate, 0);
                  }).val(linkInfo.url);
                  if (!env.isSupportTouch) {
                    $linkUrl.addClass("first-focus")
                    //$linkUrl.trigger('focus');
                    $linkUrl.trigger('select');
                  }
                  _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  _this.bindEnterKey($linkUrl, $linkBtn);
                  _this.bindEnterKey($linkText, $linkBtn);
                  
                  //var isNewWindowChecked = linkInfo.isNewWindow !== undefined
                  //    ? linkInfo.isNewWindow : _this.context.options.linkTargetBlank;
                  //$openInNewWindow.prop('checked', isNewWindowChecked);
                  if (typeof(linkInfo.openMethod) === 'string') {
                    _this.$dialog.find(`.sn-checkbox-open-in-new-window input:radio[value="${linkInfo.openMethod}"]`).prop('checked', true)
                  }
                  
                  //let checkboxKey = 'summernote.LinkDialog.checkbox'
                  //console.log([typeof(localStorage.getItem(checkboxKey)), localStorage.getItem(checkboxKey)])
                  let openMethodKey = 'summernote.LinkDialog.openMethod'
                  if (typeof(linkInfo.openMethod) !== 'string' && typeof(localStorage.getItem(openMethodKey)) === "string") {
                    //let checked = (localStorage.getItem(checkboxKey).toLowerCase() === 'true')
                    //$openInNewWindow.prop('checked', checked);
                    let openMethodSaved = localStorage.getItem(openMethodKey)
                    _this.$dialog.find(`.sn-checkbox-open-in-new-window input:radio[value='${openMethodSaved}']`).prop('checked', true)
                    //checkbox[0].checked = checked
                    //console.log([checked, checkbox[0].checked])
                    // localStorage.getItem('summernote.LinkDialog.checkbox')
                  }
                  
                  $linkBtn.one('click', function (event) {
                      event.preventDefault()
                      event.stopPropagation()
                      let enableClearEnterFormat = _this.options.clearEnterFormat
                      
                      if (enableClearEnterFormat === true) {
                        _this.options.clearEnterFormat = false
                        setTimeout(() => {
                          _this.options.clearEnterFormat = true
                        }, 100)
                      }
                      //console.log(_this.options.allowEnter)
                      var openMethod = _this.$dialog.find(".sn-checkbox-open-in-new-window input:checked").val();
                      let deferredOptions = {
                          range: linkInfo.range,
                          url: $linkUrl.val(),
                          text: $linkText.val(),
                          title: $linkTitle.val(),
                          isNewWindow: false,
                          openMethod: openMethod
                          //isNewWindow: $openInNewWindow.is(':checked')
                      }
                      //console.log(deferredOptions)
                      deferred.resolve(deferredOptions);
                      _this.ui.hideDialog(_this.$dialog);
                      //console.log($linkUrl.val())
                      //let child = $$1(_this.context.invoke('editor.restoreTarget').sc)[0]
                      //console.log(_this.context.invoke('editor.restoreTarget'))
                      //let sel = window.getSelection()
                      //sel.removeAllRanges();
                      
                      //_this.$editor.createRange().collapse()
                      //_this.context.invoke('editor.restoreRange').collapse()
                      /*
                      return
                      
                      setTimeout(() => {
                        let range = document.createRange();
                        let sel = window.getSelection()
                        console.log(linkInfo.range)
                        //console.log(linkInfo.range.sc)
                        range.setStart(child, 1);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                      }, 1000)
                      */
                  });
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  // detach events
                  $linkText.off('input paste keypress');
                  $linkUrl.off('input paste keypress');
                  $linkBtn.off('click');
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          }).promise();
      };
      /**
       * @param {Object} layoutInfo
       */
      LinkDialog.prototype.show = function () {
          var _this = this;
          var linkInfo = this.context.invoke('editor.getLinkInfo');
          this.context.invoke('editor.saveRange');
          this.showLinkDialog(linkInfo).then(function (linkInfo) {
              _this.context.invoke('editor.restoreRange');
              _this.context.invoke('editor.createLink', linkInfo);
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      return LinkDialog;
  }());

  // LinkDialog
  // ----------------------------------------------------------------------------------------
  var IframeDialog = /** @class */ (function () {
      function IframeDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
          context.memo('help.iframeDialog.show', this.options.langInfo.help['iframeDialog.show']);
      }
      
      let isURL = (url) => {
        return ( (url.startsWith("http://") && url.length > 15)
                  || (url.startsWith("https://") && url.length > 15)
                  || (url.startsWith("//") && url.length > 10)
                  || (url.startsWith("#") && url.length > 2))
      }
      
      IframeDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.iframe.title + "</label>",
              '<input class="note-iframe-title form-control note-form-control note-input" type="text" value="" />',
              '</div>',
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.iframe.url + "</label>",
              '<input class="note-iframe-url form-control note-form-control note-input" type="url" value="" />',
              '</div>',
              this.buildOpenInput()
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-iframe-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.iframe.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              className: 'iframe-dialog',
              title: this.lang.iframe.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
          
          let button = this.$dialog.find('input.note-iframe-btn')
          
          this.$dialog.find('input.note-iframe-url').focus(function (event) {
            if ($$1(this).hasClass('first-focus') === false) {
              return
            }
            $$1(this).removeClass('first-focus')
          
            if (this.value !== undefined && this.value.trim() !== "") {
              return
            }
            navigator.clipboard.readText()
              .then(text => {
                text = text.trim()
                if (isURL(text)) {
                  this.value = text
                  this.select()
                  //this.keyup()
                  button.removeClass('disabled')
                  button.removeAttr('disabled')
                }
              })
              .catch(err => {
                //console.error('Failed to read clipboard contents: ', err);
              });
          })
          
          let openMethodKey = 'summernote.IframeDialog.openMethod'
          let checkbox = this.$dialog.find('input:checkbox')
          checkbox.change(function () {
            //console.log([this.checked, this.value])
            if (this.checked !== true) {
              return
            }
            let name = this.name
            localStorage.setItem(openMethodKey + name, this.checked)
          })
      };
      IframeDialog.prototype.buildOpenInput = function () {
        return `<div class="checkbox sn-checkbox-open-in-new-window">
        <label> <input role="checkbox" type="checkbox" name="new" value="current" checked="true" aria-checked="true">${this.lang.iframe.newWindow}</label>
</div>
<div class="checkbox sn-checkbox-open-in-new-window">
        <label> <input role="checkbox" type="checkbox" name="popup" value="blank" checked="true" aria-checked="true">${this.lang.iframe.popupWindow}</label>
</div>`
      };
      
      IframeDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      IframeDialog.prototype.bindEnterKey = function ($input, $btn) {
        let _this = this
        $input.on('keypress', (event) => {
          if (event.keyCode === key.code.ENTER) {
            event.stopPropagation()
            event.preventDefault()
            $btn.trigger('click');
            return false
          }
        });
        $input.on('keyup', (event) => {
          if (event.keyCode === key.code.ESC) {
            event.stopPropagation()
            event.preventDefault()
            _this.ui.hideDialog(_this.$dialog);
            return false
          }
        });
      };
      /**
       * toggle update button
       */
      IframeDialog.prototype.toggleIframeBtn = function ($iframeBtn, $iframeUrl) {
          this.ui.toggleBtn($iframeBtn, $iframeUrl.val());
      };
      /**
       * Show link dialog and set event handlers on dialog controls.
       *
       * @param {Object} linkInfo
       * @return {Promise}
       */
      IframeDialog.prototype.showIframeDialog = function () {
          var _this = this;
          let iframeInfo = {}
          
          return $$1.Deferred(function (deferred) {
              var $iframeTitle = _this.$dialog.find('.note-iframe-title');
              var $iframeUrl = _this.$dialog.find('.note-iframe-url');
              
              var $iframeBtn = _this.$dialog.find('.note-iframe-btn');
              
             
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  // if no url was given, copy text to url
                  
                  // ----------------------
                  
                  var handleIframeTitleUpdate = function () {
                      _this.toggleIframeBtn($iframeBtn, $iframeUrl);
                      // if linktext was modified by keyup,
                      // stop cloning text from linkUrl
                      iframeInfo.title = $iframeTitle.val();
                  };
                  $iframeTitle.on('input', handleIframeTitleUpdate).on('paste', function () {
                      setTimeout(handleIframeTitleUpdate, 0);
                  });
                  
                  // ----------------------
                  
                  var handleIframeUrlUpdate = function () {
                      _this.toggleIframeBtn($iframeBtn, $iframeUrl);
                  };
                  $iframeUrl.on('input', handleIframeUrlUpdate).on('paste', function () {
                      setTimeout(handleIframeUrlUpdate, 0);
                  });
                  
                  // ---------------------------
                  
                  if (!env.isSupportTouch) {
                    $iframeUrl.addClass("first-focus")
                    //$linkUrl.trigger('focus');
                    $iframeUrl.trigger('select');
                  }
                  
                  // --------------------------
                  
                  _this.toggleIframeBtn($iframeBtn, $iframeUrl);
                  _this.bindEnterKey($iframeUrl, $iframeBtn);
                  _this.bindEnterKey($iframeUrl, $iframeBtn);
                  
                  // ----------------------------------------
                  
                  //let checkboxKey = 'summernote.LinkDialog.checkbox'
                  //console.log([typeof(localStorage.getItem(checkboxKey)), localStorage.getItem(checkboxKey)])
                  let openMethodKey = 'summernote.IframeDialog.openMethod'
                  if (typeof(localStorage.getItem(openMethodKey + 'new')) === "string") {
                    let checked = (localStorage.getItem(openMethodKey + 'new').toLowerCase() === 'true')
                    _this.$dialog.find(`.sn-checkbox-open-in-new-window input:checkbox[name='new']`).prop('checked', checked)
                  }
                  if (typeof(localStorage.getItem(openMethodKey + 'popup')) === "string") {
                    let checked = (localStorage.getItem(openMethodKey + 'popup').toLowerCase() === 'true')
                    _this.$dialog.find(`.sn-checkbox-open-in-new-window input:checkbox[name='popup']`).prop('checked', checked)
                  }
                  
                  $iframeBtn.one('click', function (event) {
                      event.preventDefault()
                      event.stopPropagation()
                      let enableClearEnterFormat = _this.options.clearEnterFormat
                      
                      if (enableClearEnterFormat === true) {
                        _this.options.clearEnterFormat = false
                        setTimeout(() => {
                          _this.options.clearEnterFormat = true
                        }, 100)
                      }
                      //console.log(_this.options.allowEnter)
                      var enableNewWindow = _this.$dialog.find(".sn-checkbox-open-in-new-window input:checkbox[name='new']").prop('checked');
                      var enablePopup = _this.$dialog.find(".sn-checkbox-open-in-new-window input:checkbox[name='popup']").prop('checked');
                      let deferredOptions = {
                          url: $iframeUrl.val(),
                          title: $iframeTitle.val(),
                          enableNewWindow: enableNewWindow,
                          enablePopup: enablePopup
                      }
                      //console.log(deferred)
                      //console.log(deferred.resolve)
                      //console.log(deferredOptions)
                      deferred.resolve(deferredOptions);
                      _this.ui.hideDialog(_this.$dialog);
                  });
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  // detach events
                  $iframeTitle.off('input paste keypress');
                  $iframeUrl.off('input paste keypress');
                  $iframeBtn.off('click');
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          }).promise();
      };
      /**
       * @param {Object} layoutInfo
       */
      IframeDialog.prototype.show = function () {
          var _this = this;
          this.context.invoke('editor.saveRange');
          this.showIframeDialog().then(function (iframeInfo) {
              _this.context.invoke('editor.restoreRange');
              console.log(iframeInfo)
              _this.context.invoke('editor.insertIframe', iframeInfo);
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      return IframeDialog;
  }());

  // LinkDialog
  // ----------------------------------------------------------------------------------------
  
  var LinkPopover = /** @class */ (function () {
      function LinkPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function () {
                  _this.update();
              },
              'summernote.disable summernote.dialog.shown summernote.popover.show': function () {
                  //console.log('link hide')
                  _this.hide();
              }
          };
      }
      LinkPopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.link);
      };
      LinkPopover.prototype.initialize = function () {
          let _this = this
          this.$popover = this.ui.popover({
              className: 'note-link-popover',
              callback: ($node) => {
                  var $content = $node.find('.popover-content,.note-popover-content');
                  $content.prepend('<span><a target="_blank" class="note-popover-link"></a>&nbsp;</span>');
                  $content.find('a.note-popover-link').click(function (event) {
                    _this.openNotePopoverLink(this, event)
                  })
              }
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.link);
      };
      LinkPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      LinkPopover.prototype.update = function () {
          // Prevent focusing on editable when invoke('code') is executed
          if (!this.context.invoke('editor.hasFocus')) {
              this.hide();
              return;
          }
          var rng = this.context.invoke('editor.createRange');
          if (rng.isCollapsed() && rng.isOnAnchor()) {
              var anchor = dom.ancestor(rng.sc, dom.isAnchor);
              var href = $$1(anchor).attr('href');
              let displayHref = href
              
              if (displayHref.startsWith('javascript:window.open(')) {
                let needle = 'javascript:window.open('
                displayHref = '*' + displayHref.slice(needle.length + 1, displayHref.indexOf('"', needle.length + 2))
              }
              
              if (displayHref === undefined) {
                return
              }
              if (displayHref.length > 100) {
                let parts = displayHref.split("/")
                displayHref = [parts[0], parts[1], parts[2], '...', parts[(parts.length - 1)]].join('/')
                if (displayHref.length > 100) {
                  let host = parts[2]
                  if (host.length > 30) {
                    host = host.slice(0, 10) + '...' + host.slice(-10)
                  }
                  let filename = parts[(parts.length - 1)]
                  if (filename.length > 30) {
                    filename = filename.slice(0, 10) + '...' + filename.slice(-10)
                  }
                  displayHref = [parts[0], parts[1], host, '...', filename].join('/')
                }
              }
              this.$popover.find('a').attr('href', href).html(displayHref);
			  
              var pos = dom.posFromPlaceholder(anchor);
              //console.log(['LinkPopover update', pos])
			  
			  this.context.triggerEvent('popover.show');
			  
        this.$popover.css({
            display: 'block',
            left: pos.left,
            top: pos.top,
            //width: width + 'px'
        });

			  let width = this.$popover.find('a.note-popover-link').width()
			  width = width + 40
			  //console.log(width)
			  this.$popover.css({
				  'max-width': width + 'px'
              });
          }
          else {
              this.hide();
          }
      };
      LinkPopover.prototype.hide = function () {
		  //console.log('LinkPopover.prototype.hide')
          this.$popover.hide();
      };
      LinkPopover.prototype.openNotePopoverLink = function (aTag, event) {
        let href = aTag.href
        //console.log(href)
        if (href.startsWith('data:image/') 
          || (href.startsWith('filesystem:') && (href.endsWith('.jpg') || href.endsWith('.jpeg')  || href.endsWith('.gif') || href.endsWith('.png') || href.endsWith('.svg') || href.endsWith('.webp') ) )) {
          event.preventDefault()
          event.stopPropagation()
          
          let name = '_blank'
          let title = ''
          if (href.startsWith('filesystem:')) {
            name = href.slice(href.lastIndexOf('/') + 1)
            name = decodeURIComponent(name)
            title = name
          }
          else {
            let MIME = href.slice(href.indexOf('/') + 1, href.indexOf(';'))
            title = `image.${MIME}`
          }
          
          let image = new Image()
          image.src = href
          
          let win = window.open('', name)
          if (win.document !== undefined) {
            win.document.write(image.outerHTML)
            win.document.title = title
          }
        }
      };
      return LinkPopover;
  }());

  var ImageDialog = /** @class */ (function () {
      function ImageDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      ImageDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var imageLimitation = '';
          if (this.options.maximumImageFileSize) {
              var unit = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024));
              var readableSize = (this.options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 +
                  ' ' + ' KMGTP'[unit] + 'B';
              imageLimitation = "<small>" + (this.lang.image.maximumFileSize + ' : ' + readableSize) + "</small>";
          }
          var body = [
              '<div class="form-group note-form-group note-group-select-from-files">',
              '<label class="note-form-label">' + this.lang.image.selectFromFiles + '</label>',
              '<input class="note-image-input note-form-control note-input" ',
              ' type="file" name="files" accept="image/*" multiple="multiple" />',
              imageLimitation,
              '</div>',
              '<div class="form-group note-group-image-url" style="overflow:auto;">',
              '<label class="note-form-label">' + this.lang.image.url + '</label>',
              '<input class="note-image-url form-control note-form-control note-input ',
              ' col-md-12" type="text" />',
              '</div>'
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-image-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.image.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              title: this.lang.image.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
      };
      ImageDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      ImageDialog.prototype.bindEnterKey = function ($input, $btn) {
          $input.on('keypress', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
              }
          });
      };
      ImageDialog.prototype.show = function () {
		  $$1('.note-link-popover').hide()
          var _this = this;
          this.context.invoke('editor.saveRange');
          this.showImageDialog().then(function (data) {
              // [workaround] hide dialog before restore range for IE range focus
              _this.ui.hideDialog(_this.$dialog);
              _this.context.invoke('editor.restoreRange');
              if (typeof data === 'string') { // image url
                  // If onImageLinkInsert set,
                  if (_this.options.callbacks.onImageLinkInsert) {
                      _this.context.triggerEvent('image.link.insert', data);
                  }
                  else {
                      _this.context.invoke('editor.insertImage', data);
                  }
              }
              else { // array of files
                  // If onImageUpload set,
                  if (_this.options.callbacks.onImageUpload) {
                      _this.context.triggerEvent('image.upload', data);
                  }
                  else {
                      // else insert Image as dataURL
                      _this.context.invoke('editor.insertImagesAsDataURL', data);
                  }
              }
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      /**
       * show image dialog
       *
       * @param {jQuery} $dialog
       * @return {Promise}
       */
      ImageDialog.prototype.showImageDialog = function () {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              var $imageInput = _this.$dialog.find('.note-image-input');
              var $imageUrl = _this.$dialog.find('.note-image-url');
              var $imageBtn = _this.$dialog.find('.note-image-btn');
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  // Cloning imageInput to clear element.
                  $imageInput.replaceWith($imageInput.clone().on('change', function (event) {
                      deferred.resolve(event.target.files || event.target.value);
                  }).val(''));
                  $imageBtn.click(function (event) {
                      event.preventDefault();
                      deferred.resolve($imageUrl.val());
                  });
                  $imageUrl.on('keyup paste', function () {
                      var url = $imageUrl.val();
                      _this.ui.toggleBtn($imageBtn, url);
                  }).val('');
                  if (!env.isSupportTouch) {
                      $imageUrl.trigger('focus');
                  }
                  _this.bindEnterKey($imageUrl, $imageBtn);
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  $imageInput.off('change');
                  $imageUrl.off('keyup paste keypress');
                  $imageBtn.off('click');
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          });
      };
      return ImageDialog;
  }());

  /**
   * Image popover module
   *  mouse events that show/hide popover will be handled by Handle.js.
   *  Handle.js will receive the events and invoke 'imagePopover.update'.
   */
  var ImagePopover = /** @class */ (function () {
      function ImagePopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.editable = context.layoutInfo.editable[0];
          this.options = context.options;
          this.events = {
              'summernote.disable summernote.popover.show': function () {
                  //console.log('image hide')
                  _this.hide();
              }
          };
      }
      ImagePopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.image);
      };
      ImagePopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-image-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.image);
      };
      ImagePopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      ImagePopover.prototype.update = function (target) {
          if (dom.isImg(target)) {
              var pos = dom.posFromPlaceholder(target);
              var posEditor = dom.posFromPlaceholder(this.editable);
              this.context.triggerEvent('popover.show');
              
              let left = this.options.popatmouse ? event.pageX - 20 : pos.left
              let top = this.options.popatmouse ? event.pageY : Math.min(pos.top, posEditor.top)
              
              // 算出角落的位置
              //console.log(pos)
              let $target = $$1(target)
              //console.log($target.width())
              //console.log($target.height())
              //let maxLeft = pos.left + $target.width() - this.$popover.width()
              let maxTop = $target.offset().top + $target.height() - this.$popover.height()
              
              //console.log([pos.top, $target.offset().top, $target.height(), this.$popover.height(), maxTop, top])
              if (top > maxTop) {
                top = maxTop - 5
              }
              
              
              this.$popover.css({
                  display: 'block',
                  left: left,
                  top: top
              });
          }
          else {
              this.hide();
          }
      };
      ImagePopover.prototype.hide = function () {
		  //console.log('ImagePopover.prototype.hide')
          this.$popover.hide();
      };
      return ImagePopover;
  }());

  var TablePopover = /** @class */ (function () {
      function TablePopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.mousedown': function (we, e) {
                  _this.update(e.target);
              },
              'summernote.keyup summernote.scroll summernote.change': function () {
                  _this.update();
              },
              'summernote.disable summernote.popover.show': function () {
                  _this.hide();
              }
          };
      }
      TablePopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.table);
      };
      TablePopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-table-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.table);
          // [workaround] Disable Firefox's default table editor
          if (env.isFF) {
              document.execCommand('enableInlineTableEditing', false, false);
          }
      };
      TablePopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      TablePopover.prototype.update = function (target) {
          if (this.context.isDisabled()) {
              return false;
          }
          var isCell = dom.isCell(target);
          if (isCell) {
              var pos = dom.posFromPlaceholder(target);
              this.$popover.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top
              });
          }
          else {
              this.hide();
          }
          return isCell;
      };
      TablePopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return TablePopover;
  }());

  var VideoDialog = /** @class */ (function () {
      function VideoDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      VideoDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<div class="form-group note-form-group row-fluid">',
              "<label class=\"note-form-label\">" + this.lang.video.url + " <small class=\"text-muted\">" + this.lang.video.providers + "</small></label>",
              '<input class="note-video-url form-control note-form-control note-input" type="text" />',
              '</div>'
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-video-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.video.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              title: this.lang.video.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
      };
      VideoDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      VideoDialog.prototype.bindEnterKey = function ($input, $btn) {
          $input.on('keypress', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
              }
          });
      };
      VideoDialog.prototype.createVideoNode = function (url) {
          // video url patterns(youtube, instagram, vimeo, dailymotion, youku, mp4, ogg, webm)
          var ytRegExp = /\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/;
          var ytRegExpForStart = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
          var ytMatch = url.match(ytRegExp);
          var igRegExp = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/;
          var igMatch = url.match(igRegExp);
          var vRegExp = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/;
          var vMatch = url.match(vRegExp);
          var vimRegExp = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/;
          var vimMatch = url.match(vimRegExp);
          var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
          var dmMatch = url.match(dmRegExp);
          var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
          var youkuMatch = url.match(youkuRegExp);
          var qqRegExp = /\/\/v\.qq\.com.*?vid=(.+)/;
          var qqMatch = url.match(qqRegExp);
          var qqRegExp2 = /\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/;
          var qqMatch2 = url.match(qqRegExp2);
          var mp4RegExp = /^.+.(mp4|m4v)$/;
          var mp4Match = url.match(mp4RegExp);
          var oggRegExp = /^.+.(ogg|ogv)$/;
          var oggMatch = url.match(oggRegExp);
          var webmRegExp = /^.+.(webm)$/;
          var webmMatch = url.match(webmRegExp);
          var $video;
          if (ytMatch && ytMatch[1].length === 11) {
              var youtubeId = ytMatch[1];
              var start = 0;
              if (typeof ytMatch[2] !== 'undefined') {
                  var ytMatchForStart = ytMatch[2].match(ytRegExpForStart);
                  if (ytMatchForStart) {
                      for (var n = [3600, 60, 1], i = 0, r = n.length; i < r; i++) {
                          start += (typeof ytMatchForStart[i + 1] !== 'undefined' ? n[i] * parseInt(ytMatchForStart[i + 1], 10) : 0);
                      }
                  }
              }
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', '//www.youtube.com/embed/' + youtubeId + (start > 0 ? '?start=' + start : ''))
                  .attr('width', '640').attr('height', '360');
          }
          else if (igMatch && igMatch[0].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', 'https://instagram.com/p/' + igMatch[1] + '/embed/')
                  .attr('width', '612').attr('height', '710')
                  .attr('scrolling', 'no')
                  .attr('allowtransparency', 'true');
          }
          else if (vMatch && vMatch[0].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', vMatch[0] + '/embed/simple')
                  .attr('width', '600').attr('height', '600')
                  .attr('class', 'vine-embed');
          }
          else if (vimMatch && vimMatch[3].length) {
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('src', '//player.vimeo.com/video/' + vimMatch[3])
                  .attr('width', '640').attr('height', '360');
          }
          else if (dmMatch && dmMatch[2].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2])
                  .attr('width', '640').attr('height', '360');
          }
          else if (youkuMatch && youkuMatch[1].length) {
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('height', '498')
                  .attr('width', '510')
                  .attr('src', '//player.youku.com/embed/' + youkuMatch[1]);
          }
          else if ((qqMatch && qqMatch[1].length) || (qqMatch2 && qqMatch2[2].length)) {
              var vid = ((qqMatch && qqMatch[1].length) ? qqMatch[1] : qqMatch2[2]);
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('height', '310')
                  .attr('width', '500')
                  .attr('src', 'http://v.qq.com/iframe/player.html?vid=' + vid + '&amp;auto=0');
          }
          else if (mp4Match || oggMatch || webmMatch) {
              $video = $$1('<video controls>')
                  .attr('src', url)
                  .attr('width', '640').attr('height', '360');
          }
          else {
              // this is not a known video link. Now what, Cat? Now what?
              return false;
          }
          $video.addClass('note-video-clip');
          return $video[0];
      };
      VideoDialog.prototype.show = function () {
          var _this = this;
          var text = this.context.invoke('editor.getSelectedText');
          this.context.invoke('editor.saveRange');
          this.showVideoDialog(text).then(function (url) {
              // [workaround] hide dialog before restore range for IE range focus
              _this.ui.hideDialog(_this.$dialog);
              _this.context.invoke('editor.restoreRange');
              // build node
              var $node = _this.createVideoNode(url);
              if ($node) {
                  // insert video node
                  _this.context.invoke('editor.insertNode', $node);
              }
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      /**
       * show image dialog
       *
       * @param {jQuery} $dialog
       * @return {Promise}
       */
      VideoDialog.prototype.showVideoDialog = function (text) {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              var $videoUrl = _this.$dialog.find('.note-video-url');
              var $videoBtn = _this.$dialog.find('.note-video-btn');
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  $videoUrl.val(text).on('input', function () {
                      _this.ui.toggleBtn($videoBtn, $videoUrl.val());
                  });
                  if (!env.isSupportTouch) {
                      $videoUrl.trigger('focus');
                  }
                  $videoBtn.click(function (event) {
                      event.preventDefault();
                      deferred.resolve($videoUrl.val());
                  });
                  _this.bindEnterKey($videoUrl, $videoBtn);
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  $videoUrl.off('input');
                  $videoBtn.off('click');
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          });
      };
      return VideoDialog;
  }());

  var HelpDialog = /** @class */ (function () {
      function HelpDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      HelpDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body
          if (typeof(this.options.helpFooter) === 'string') {
            body = this.options.helpFooter
          }
          else {
            body = [
              '<p class="text-center">',
              '<a href="http://summernote.org/" target="_blank">Summernote 0.8.11</a> · ',
              '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ',
              '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>',
              '</p>'
            ].join('');
          }
          this.$dialog = this.ui.dialog({
              title: this.lang.options.help,
              fade: this.options.dialogsFade,
              body: this.createShortcutList(),
              footer: body,
              callback: function ($node) {
                  $node.find('.modal-body,.note-modal-body').css({
                      'max-height': 300,
                      'overflow-y': 'auto'
                  });
              }
          }).render().appendTo($container);
      };
      HelpDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      HelpDialog.prototype.createShortcutList = function () {
          var _this = this;
          var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
          return Object.keys(keyMap).map(function (key) {
              var command = keyMap[key];
              var $row = $$1('<div><div class="help-list-item"/></div>');
              let description = _this.context.memo('help.' + command)
              
              if (description === undefined) {
                description = command
              }
              $row.append($$1('<label><kbd>' + key + '</kdb></label>').css({
                  'width': 180,
                  'margin-right': 10
              })).append($$1('<span/>').html(description));
              return $row.html();
          }).join('');
      };
      /**
       * show help dialog
       *
       * @return {Promise}
       */
      HelpDialog.prototype.showHelpDialog = function () {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  deferred.resolve();
              });
              _this.ui.showDialog(_this.$dialog);
          }).promise();
      };
      HelpDialog.prototype.show = function () {
          var _this = this;
          this.context.invoke('editor.saveRange');
          this.showHelpDialog().then(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      return HelpDialog;
  }());

  var AIR_MODE_POPOVER_X_OFFSET = 20;
  var AirPopover = /** @class */ (function () {
      function AirPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.keyup summernote.mouseup summernote.scroll': function () {
                  _this.update();
              },
              'summernote.disable summernote.change summernote.dialog.shown': function () {
                  _this.hide();
              },
              'summernote.focusout': function (we, e) {
                  // [workaround] Firefox doesn't support relatedTarget on focusout
                  //  - Ignore hide action on focus out in FF.
                  if (env.isFF) {
                      return;
                  }
                  if (!e.relatedTarget || !dom.ancestor(e.relatedTarget, func.eq(_this.$popover[0]))) {
                      _this.hide();
                  }
              }
          };
      }
      AirPopover.prototype.shouldInitialize = function () {
          return this.options.airMode && !lists.isEmpty(this.options.popover.air);
      };
      AirPopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-air-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.air);
      };
      AirPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      AirPopover.prototype.update = function () {
          var styleInfo = this.context.invoke('editor.currentStyle');
          if (styleInfo.range && !styleInfo.range.isCollapsed()) {
              var rect = lists.last(styleInfo.range.getClientRects());
              if (rect) {
                  var bnd = func.rect2bnd(rect);
                  this.$popover.css({
                      display: 'block',
                      left: Math.max(bnd.left + bnd.width / 2, 0) - AIR_MODE_POPOVER_X_OFFSET,
                      top: bnd.top + bnd.height
                  });
                  this.context.invoke('buttons.updateCurrentStyle', this.$popover);
              }
          }
          else {
              this.hide();
          }
      };
      AirPopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return AirPopover;
  }());

  var POPOVER_DIST = 5;
  var HintPopover = /** @class */ (function () {
      function HintPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.hint = this.options.hint || [];
          this.direction = this.options.hintDirection || 'bottom';
          this.hints = $$1.isArray(this.hint) ? this.hint : [this.hint];
          this.events = {
              'summernote.keyup': function (we, e) {
                //console.log('summernote.keyup')
                //console.log('hint keyup')
                if (!e.isDefaultPrevented()) {
                  _this.handleKeyup(e);
                }
              },
              'summernote.input': function (we, e) {
                //console.log('summernote.input')
                //console.log('hint keyup')
                if (!e.isDefaultPrevented()) {
                  _this.handleKeyup(e);
                }
              },
              'summernote.keydown': function (we, e) {
                //console.log('summernote.keydown')
                  _this.handleKeydown(e);
              },
              'summernote.disable summernote.dialog.shown': function () {
                  _this.hide();
              }
          };
      }
      HintPopover.prototype.shouldInitialize = function () {
          return this.hints.length > 0;
      };
      HintPopover.prototype.initialize = function () {
          var _this = this;
          this.lastWordRange = null;
          this.$popover = this.ui.popover({
              className: 'note-hint-popover',
              hideArrow: true,
              direction: ''
          }).render().appendTo(this.options.container);
          this.$popover.hide();
          this.$content = this.$popover.find('.popover-content,.note-popover-content');
          this.$content.on('click', '.note-hint-item', function (e) {
              _this.$content.find('.active').removeClass('active');
              $$1(e.currentTarget).addClass('active');
              _this.replace();
          });
      };
      HintPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      HintPopover.prototype.selectItem = function ($item) {
          this.$content.find('.active').removeClass('active');
          $item.addClass('active');
          this.$content[0].scrollTop = $item[0].offsetTop - (this.$content.innerHeight() / 2);
      };
      HintPopover.prototype.moveDown = function () {
          var $current = this.$content.find('.note-hint-item.active');
          var $next = $current.next();
          if ($next.length) {
              this.selectItem($next);
          }
          else {
              var $nextGroup = $current.parent().next();
              if (!$nextGroup.length) {
                  $nextGroup = this.$content.find('.note-hint-group').first();
              }
              this.selectItem($nextGroup.find('.note-hint-item').first());
          }
      };
      HintPopover.prototype.moveUp = function () {
          var $current = this.$content.find('.note-hint-item.active');
          var $prev = $current.prev();
          if ($prev.length) {
              this.selectItem($prev);
          }
          else {
              var $prevGroup = $current.parent().prev();
              if (!$prevGroup.length) {
                  $prevGroup = this.$content.find('.note-hint-group').last();
              }
              this.selectItem($prevGroup.find('.note-hint-item').last());
          }
      };
      HintPopover.prototype.replace = function () {
        var $item = this.$content.find('.note-hint-item.active');
        if ($item.length) {
          var node = this.nodeFromItem($item);
          // XXX: consider to move codes to editor for recording redo/undo.
          //console.log(node + ']')
          if (node !== undefined) {
            this.lastWordRange.insertNode(node);
            //this.lastWordRange.insertNode(dom.create('&nbsp;'));
            range.createFromNode(node).collapse().select();
            this.lastWordRange = null;
          }
          this.hide();
          this.context.triggerEvent('change', this.$editable.html(), this.$editable[0]);
          this.context.invoke('editor.focus');
        }
      };
      HintPopover.prototype.nodeFromItem = function ($item) {
        var hint = this.hints[$item.data('index')];
        var item = $item.data('item');
        var node = hint.content ? hint.content(item) : item;
        //console.log(`[${node}]`)
        if (typeof node === 'string') {
          //node = dom.createText(node);
          node = $$1(`<span>${node} </span>`)[0]
        }
        //console.log(node)
        return node;
      };
      HintPopover.prototype.createItemTemplates = function (hintIdx, items) {
          var hint = this.hints[hintIdx];
          return items.map(function (item, idx) {
              var $item = $$1('<div class="note-hint-item"/>');
              $item.append(hint.template ? hint.template(item) : item + '');
              $item.data({
                  'index': hintIdx,
                  'item': item
              });
              return $item;
          });
      };
      HintPopover.prototype.handleKeydown = function (e) {
          if (!this.$popover.is(':visible')) {
              return;
          }
          if (e.keyCode === key.code.ENTER) {
              e.preventDefault();
              this.replace();
          }
          else if (e.keyCode === key.code.UP) {
              e.preventDefault();
              this.moveUp();
          }
          else if (e.keyCode === key.code.DOWN) {
              e.preventDefault();
              this.moveDown();
          }
      };
      HintPopover.prototype.searchKeyword = function (index, keyword, callback) {
          var hint = this.hints[index];
          if (hint && hint.match.test(keyword) && hint.search) {
              var matches = hint.match.exec(keyword);
              hint.search(matches[1], callback);
          }
          else {
              callback();
          }
      };
      HintPopover.prototype.createGroup = function (idx, keyword) {
          var _this = this;
          var $group = $$1('<div class="note-hint-group note-hint-group-' + idx + '"/>');
          this.searchKeyword(idx, keyword, function (items) {
              items = items || [];
              if (items.length) {
                  $group.html(_this.createItemTemplates(idx, items));
                  _this.show();
              }
          });
          return $group;
      };
      HintPopover.prototype.handleKeyup = function (e) {
          var _this = this;
          //console.trace(['e.keyCode', e.keyCode])
          if (!lists.contains([key.code.ENTER, key.code.UP, key.code.DOWN], e.keyCode)) {
              var wordRange = this.context.invoke('editor.createRange').getWordRange();
              
              var keyword_1 = wordRange.toString();
              //console.log(['keyword_1', keyword_1])
              if (this.hints.length && keyword_1) {
                  this.$content.empty();
                  var bnd = func.rect2bnd(lists.last(wordRange.getClientRects()));
                  if (bnd) {
                      this.$popover.hide();
                      this.lastWordRange = wordRange;
                      this.hints.forEach(function (hint, idx) {
                        //console.log(['hint', hint])
                        if (hint.match.test(keyword_1)) {
                          _this.createGroup(idx, keyword_1).appendTo(_this.$content);
                        }
                      });
                      // select first .note-hint-item
                      this.$content.find('.note-hint-item:first').addClass('active');
                      // set position for popover after group is created
                      if (this.direction === 'top') {
                          this.$popover.css({
                              left: bnd.left,
                              top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST
                          });
                      }
                      else {
                          this.$popover.css({
                              left: bnd.left,
                              top: bnd.top + bnd.height + POPOVER_DIST
                          });
                      }
                  }
              }
              else {
                  this.hide();
              }
          }
      };
      HintPopover.prototype.show = function () {
          this.$popover.show();
      };
      HintPopover.prototype.hide = function () {
          this.$popover.hide();
      };
      HintPopover.prototype.addItem = function (item) {
        if (this.hint.words.indexOf(item) === -1) {
          this.hint.words.push(item)
          //console.log(item)
        }
      };
      return HintPopover;
  }());

  var Context = /** @class */ (function () {
      /**
       * @param {jQuery} $note
       * @param {Object} options
       */
      function Context($note, options) {
          this.ui = $$1.summernote.ui;
          this.$note = $note;
          this.memos = {};
          this.modules = {};
          this.buttons = {};
          this.layoutInfo = {};
          this.options = options;
          this.initialize();
          this.lastScrollPostion = {}
      }
      /**
       * create layout and initialize modules and other resources
       */
      Context.prototype.initialize = function () {
          this.layoutInfo = this.ui.createLayout(this.$note, this.options);
          this._initialize();
          this.$note.hide();
          return this;
      };
      /**
       * destroy modules and other resources and remove layout
       */
      Context.prototype.destroy = function () {
          this._destroy();
          this.$note.removeData('summernote');
          this.ui.removeLayout(this.$note, this.layoutInfo);
      };
      /**
       * destory modules and other resources and initialize it again
       */
      Context.prototype.reset = function () {
          var disabled = this.isDisabled();
          this.code(dom.emptyPara);
          this._destroy();
          this._initialize();
          if (disabled) {
              this.disable();
          }
      };
      Context.prototype._initialize = function () {
          var _this = this;
          // add optional buttons
          var buttons = $$1.extend({}, this.options.buttons);
          Object.keys(buttons).forEach(function (key) {
              _this.memo('button.' + key, buttons[key]);
          });
          this.buttons = buttons
          
          var modules = $$1.extend({}, this.options.modules, $$1.summernote.plugins || {});
          // add and initialize modules
          Object.keys(modules).forEach(function (key) {
              _this.module(key, modules[key], true);
          });
          Object.keys(this.modules).forEach(function (key) {
              _this.initializeModule(key);
          });
      };
      Context.prototype._destroy = function () {
          var _this = this;
          // destroy modules with reversed order
          Object.keys(this.modules).reverse().forEach(function (key) {
              _this.removeModule(key);
          });
          Object.keys(this.memos).forEach(function (key) {
              _this.removeMemo(key);
          });
          // trigger custom onDestroy callback
          this.triggerEvent('destroy', this);
      };
      Context.prototype.code = function (html) {
          var isActivated = this.invoke('codeview.isActivated');
          if (html === undefined) {
              this.invoke('codeview.sync');
              return isActivated ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
          }
          else {
            //console.log(`[${html}]`)
              if (isActivated) {
                  this.layoutInfo.codable.val(html);
              }
              else {
                  this.layoutInfo.editable.html(html);
              }
              this.$note.val(html);
              this.triggerEvent('change', html);
          }
      };
      Context.prototype.isDisabled = function () {
          return this.layoutInfo.editable.attr('contenteditable') === 'false';
      };
      Context.prototype.enable = function () {
          this.layoutInfo.editable.attr('contenteditable', true);
          this.invoke('toolbar.activate', true);
          this.triggerEvent('disable', false);
      };
      Context.prototype.disable = function () {
          // close codeview if codeview is opend
          if (this.invoke('codeview.isActivated')) {
              this.invoke('codeview.deactivate');
          }
          this.layoutInfo.editable.attr('contenteditable', false);
          this.invoke('toolbar.deactivate', true);
          this.triggerEvent('disable', true);
      };
      Context.prototype.triggerEvent = function () {
          var namespace = lists.head(arguments);
          var args = lists.tail(lists.from(arguments));
          var callback = this.options.callbacks[func.namespaceToCamel(namespace, 'on')];
          if (callback) {
              callback.apply(this.$note[0], args);
          }
          this.$note.trigger('summernote.' + namespace, args);
      };
      Context.prototype.initializeModule = function (key) {
          var module = this.modules[key];
          module.shouldInitialize = module.shouldInitialize || func.ok;
          if (!module.shouldInitialize()) {
              return;
          }
          // initialize module
          if (module.initialize) {
              module.initialize();
          }
          // attach events
          if (module.events) {
              dom.attachEvents(this.$note, module.events);
          }
      };
      Context.prototype.module = function (key, ModuleClass, withoutIntialize) {
          if (arguments.length === 1) {
              return this.modules[key];
          }
          this.modules[key] = new ModuleClass(this);
          if (!withoutIntialize) {
              this.initializeModule(key);
          }
      };
      Context.prototype.removeModule = function (key) {
          var module = this.modules[key];
          if (module.shouldInitialize()) {
              if (module.events) {
                  dom.detachEvents(this.$note, module.events);
              }
              if (module.destroy) {
                  module.destroy();
              }
          }
          delete this.modules[key];
      };
      Context.prototype.memo = function (key, obj) {
          if (arguments.length === 1) {
              return this.memos[key];
          }
          this.memos[key] = obj;
      };
      Context.prototype.removeMemo = function (key) {
          if (this.memos[key] && this.memos[key].destroy) {
              this.memos[key].destroy();
          }
          delete this.memos[key];
      };
      /**
       * Some buttons need to change their visual style immediately once they get pressed
       */
      Context.prototype.createInvokeHandlerAndUpdateState = function (namespace, value) {
          var _this = this;
          return function (event) {
              _this.createInvokeHandler(namespace, value)(event);
              _this.invoke('buttons.updateCurrentStyle');
          };
      };
      Context.prototype.createInvokeHandler = function (namespace, value) {
          var _this = this;
          return function (event) {
              event.preventDefault();
              var $target = $$1(event.target);
              _this.invoke(namespace, value || $target.closest('[data-value]').data('value'), $target);
          };
      };
      Context.prototype.invoke = function () {
          var namespace = lists.head(arguments);
          if (namespace === undefined) {
            namespace = ''
          }
          var args = lists.tail(lists.from(arguments));
          var splits = namespace.split('.');
          var hasSeparator = splits.length > 1;
          var moduleName = hasSeparator && lists.head(splits);
          var methodName = hasSeparator ? lists.last(splits) : lists.head(splits);
          
          // 也要讓這邊可以找到buttons裡面的東西
          
          var module = this.modules[moduleName || 'editor'];
          if (!moduleName && this[methodName]) {
              return this[methodName].apply(this, args);
          }
          else if (module && module[methodName] && module.shouldInitialize()) {
              return module[methodName].apply(module, args);
          }
          else {
            //console.log(['context invoke not found', moduleName, arguments])
            
            // try to find buttons event
            //console.log(this.buttons)
            //console.log($$1.summernote)
            return false
          }
      };
      return Context;
  }());

  $$1.fn.extend({
      /**
       * Summernote API
       *
       * @param {Object|String}
       * @return {this}
       */
      summernote: function () {
          var type = $$1.type(lists.head(arguments));
          var isExternalAPICalled = type === 'string';
          var hasInitOptions = type === 'object';
          var options = $$1.extend({}, $$1.summernote.options, hasInitOptions ? lists.head(arguments) : {});
          // Update options
          options.langInfo = $$1.extend(true, {}, $$1.summernote.lang['en-US'], $$1.summernote.lang[options.lang]);
          options.icons = $$1.extend(true, {}, $$1.summernote.options.icons, options.icons);
          options.tooltip = options.tooltip === 'auto' ? !env.isSupportTouch : options.tooltip;
          this.each(function (idx, note) {
              var $note = $$1(note);
              if (!$note.data('summernote')) {
                  var context = new Context($note, options);
                  $note.data('summernote', context);
                  $note.data('summernote').triggerEvent('init', context.layoutInfo);
              }
          });
          var $note = this.first();
          if ($note.length) {
              var context = $note.data('summernote');
              if (isExternalAPICalled) {
                  return context.invoke.apply(context, lists.from(arguments));
              }
              else if (options.focus) {
                  context.invoke('editor.focus');
              }
          }
          return this;
      }
  });

  $$1.summernote = $$1.extend($$1.summernote, {
      version: '0.8.11',
      ui: ui,
      plugins: {},
      options: {
          modules: {
              'editor': Editor,
              'clipboard': Clipboard,
              'dropzone': Dropzone,
              'codeview': CodeView,
              'statusbar': Statusbar,
              'fullscreen': Fullscreen,
              'handle': Handle,
              // FIXME: HintPopover must be front of autolink
              //  - Script error about range when Enter key is pressed on hint popover
              'hintPopover': HintPopover,
              'autoLink': AutoLink,
              'autoSync': AutoSync,
              'placeholder': Placeholder,
              'buttons': Buttons,
              'toolbar': Toolbar,
              'commentDialog': CommentDialog,
              'linkDialog': LinkDialog,
              'iframeDialog': IframeDialog,
              'linkPopover': LinkPopover,
              'imageDialog': ImageDialog,
              'imagePopover': ImagePopover,
              'tablePopover': TablePopover,
              'videoDialog': VideoDialog,
              'helpDialog': HelpDialog,
              'airPopover': AirPopover
          },
          buttons: {},
          lang: 'en-US',
          followingToolbar: true,
          otherStaticBar: '',
          // toolbar
          toolbar: [
              ['formatBlockHeading', ['formatH1', 'formatH2', 'formatH3', 'formatH4', 'formatH5', 'formatH6']],
              ['formatBlock', ['formatPara', 'formatCode']],
              ['style', ['style']],
              ['font', ['bold', 'italic', 'underline', 'clear']],
              ['fontname', ['fontname']],
              ['fontsize', ['fontsize']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video', 'hr', 'comment', 'htmlify', 'textify', 'iframe']],
              ['view', ['fullscreen', 'codeview', 'help']]
          ],
          // popover
          popatmouse: true,
          popover: {
              image: [
                  ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                  ['float', ['floatLeft', 'floatRight', 'floatNone']],
                  ['imagesLink', ['openMedia', 'saveMedia', 'copyMediaLink']],
                  ['remove', ['removeMedia']]
              ],
              link: [
                  ['link', ['linkDialogShow', 'unlink', 'copyLink']],
                  ['remove', ['removeLink']]
              ],
              table: [
                  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
              ],
              air: [
                  ['color', ['color']],
                  ['font', ['bold', 'underline', 'clear']],
                  ['para', ['ul', 'paragraph']],
                  ['table', ['table']],
                  ['insert', ['link', 'picture']]
              ]
          },
          // air mode: inline editor
          airMode: false,
          width: null,
          height: null,
          linkTargetBlank: true,
          focus: false,
          tabSize: 4,
          styleWithSpan: true,
          shortcuts: true,
          textareaAutoSync: true,
          hintDirection: 'bottom',
          tooltip: 'auto',
          container: 'body',
          maxTextLength: 0,
          clearEnterFormat: false, // 記得要改成false
          showHeadingLabel: false, // 記得要改成false
          enableDropImage: true,
          enablePasteImage: true,
          allowEnter: true,
          helpFooter: null,
          blockquoteBreakingLevel: 2,
          styleTags: ['p', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          fontNames: [
              'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
              'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
              'Tahoma', 'Times New Roman', 'Verdana'
          ],
          fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
          // pallete colors(n x n)
          colors: [
              ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],
              ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],
              ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],
              ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],
              ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],
              ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],
              ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],
              ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
          ],
          // http://chir.ag/projects/name-that-color/
          colorsName: [
              ['Black', 'Tundora', 'Dove Gray', 'Star Dust', 'Pale Slate', 'Gallery', 'Alabaster', 'White'],
              ['Red', 'Orange Peel', 'Yellow', 'Green', 'Cyan', 'Blue', 'Electric Violet', 'Magenta'],
              ['Azalea', 'Karry', 'Egg White', 'Zanah', 'Botticelli', 'Tropical Blue', 'Mischka', 'Twilight'],
              ['Tonys Pink', 'Peach Orange', 'Cream Brulee', 'Sprout', 'Casper', 'Perano', 'Cold Purple', 'Careys Pink'],
              ['Mandy', 'Rajah', 'Dandelion', 'Olivine', 'Gulf Stream', 'Viking', 'Blue Marguerite', 'Puce'],
              ['Guardsman Red', 'Fire Bush', 'Golden Dream', 'Chelsea Cucumber', 'Smalt Blue', 'Boston Blue', 'Butterfly Bush', 'Cadillac'],
              ['Sangria', 'Mai Tai', 'Buddha Gold', 'Forest Green', 'Eden', 'Venice Blue', 'Meteorite', 'Claret'],
              ['Rosewood', 'Cinnamon', 'Olive', 'Parsley', 'Tiber', 'Midnight Blue', 'Valentino', 'Loulou']
          ],
          lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],
          tableClassName: 'table table-bordered',
          insertTableMaxSize: {
              col: 10,
              row: 10
          },
          dialogsInBody: false,
          dialogsFade: false,
          maximumImageFileSize: null,
          callbacks: {
              onInit: null,
              onFocus: null,
              onBlur: null,
              onBlurCodeview: null,
              onEnter: null,
              onKeyup: null,
              onKeydown: null,
              onInput: null,
              onImageUpload: null,
              onImageUploadError: null,
              onImageLinkInsert: null
          },
          codemirror: {
              mode: 'text/html',
              htmlMode: true,
              lineNumbers: true
          },
          keyMap: {
              pc: {
                  'ENTER': 'insertParagraph',
                  'CTRL+Z': 'undo',
                  'CTRL+Y': 'redo',
                  //'TAB': 'tab',
                  //'SHIFT+TAB': 'untab',
                  'CTRL+B': 'bold',
                  'CTRL+I': 'italic',
                  'CTRL+U': 'underline',
                  'CTRL+SHIFT+S': 'strikethrough',
                  'CTRL+M': 'comment',
                  'CTRL+ALT+M': 'uncomment',
                  'CTRL+ALT+H': 'htmlify',
                  'CTRL+ALT+T': 'textify',
                  //'CTRL+SHIFT+E': 'comment',
                  'CTRL+BACKSLASH': 'removeFormat',
                  'CTRL+SHIFT+L': 'justifyLeft',
                  'CTRL+SHIFT+E': 'justifyCenter',
                  'CTRL+SHIFT+R': 'justifyRight',
                  'CTRL+SHIFT+J': 'justifyFull',
                  'CTRL+SHIFT+NUM7': 'insertUnorderedList',
                  'CTRL+SHIFT+NUM8': 'insertOrderedList',
                  'CTRL+LEFTBRACKET': 'outdent',
                  'CTRL+RIGHTBRACKET': 'indent',
                  'SHIFT+TAB': 'outdent',
                  'TAB': 'indent',
                  'CTRL+NUM0': 'formatPara',
                  'CTRL+NUM1': 'formatH1',
                  'CTRL+NUM2': 'formatH2',
                  'CTRL+NUM3': 'formatH3',
                  'CTRL+NUM4': 'formatH4',
                  'CTRL+NUM5': 'formatH5',
                  'CTRL+NUM6': 'formatH6',
                  'CTRL+ENTER': 'insertHorizontalRule',
                  'CTRL+K': 'linkDialog.show',
                  'CTRL+L': 'linkDialog.show'
              },
              mac: {
                  'ENTER': 'insertParagraph',
                  'CMD+Z': 'undo',
                  'CMD+SHIFT+Z': 'redo',
                  'TAB': 'tab',
                  'SHIFT+TAB': 'untab',
                  'CMD+B': 'bold',
                  'CMD+I': 'italic',
                  'CMD+U': 'underline',
                  'CMD+SHIFT+S': 'strikethrough',
                  'CMD+M': 'comment',
                  'CMD+BACKSLASH': 'removeFormat',
                  'CMD+SHIFT+L': 'justifyLeft',
                  'CMD+SHIFT+E': 'justifyCenter',
                  'CMD+SHIFT+R': 'justifyRight',
                  'CMD+SHIFT+J': 'justifyFull',
                  'CMD+SHIFT+NUM7': 'insertUnorderedList',
                  'CMD+SHIFT+NUM8': 'insertOrderedList',
                  'CMD+LEFTBRACKET': 'outdent',
                  'CMD+RIGHTBRACKET': 'indent',
                  'CMD+NUM0': 'formatPara',
                  'CMD+NUM1': 'formatH1',
                  'CMD+NUM2': 'formatH2',
                  'CMD+NUM3': 'formatH3',
                  'CMD+NUM4': 'formatH4',
                  'CMD+NUM5': 'formatH5',
                  'CMD+NUM6': 'formatH6',
                  'CMD+ENTER': 'insertHorizontalRule',
                  'CMD+K': 'linkDialog.show'
              }
          },
          icons: {
              'align': 'note-icon-align',
              'alignCenter': 'note-icon-align-center',
              'alignJustify': 'note-icon-align-justify',
              'alignLeft': 'note-icon-align-left',
              'alignRight': 'note-icon-align-right',
              'rowBelow': 'note-icon-row-below',
              'colBefore': 'note-icon-col-before',
              'colAfter': 'note-icon-col-after',
              'rowAbove': 'note-icon-row-above',
              'rowRemove': 'note-icon-row-remove',
              'colRemove': 'note-icon-col-remove',
              'indent': 'note-icon-align-indent',
              'outdent': 'note-icon-align-outdent',
              'arrowsAlt': 'note-icon-arrows-alt',
              'arrowsCircleDown': 'note-icon-arrow-circle-down',
              'arrowsCircleLeft': 'note-icon-arrow-circle-left',
              'arrowsCircleRight': 'note-icon-arrow-circle-right',
              'arrowsCircleUp': 'note-icon-arrow-circle-up',
              'bold': 'note-icon-bold',
              'caret': 'note-icon-caret',
              'circle': 'note-icon-circle',
              'close': 'note-icon-close',
              'code': 'note-icon-code',
              'eraser': 'note-icon-eraser',
              'font': 'note-icon-font',
              'frame': 'note-icon-frame',
              'italic': 'note-icon-italic',
              'link': 'note-icon-link',
              'unlink': 'note-icon-chain-broken',
              'magic': 'note-icon-magic',
              'menuCheck': 'note-icon-menu-check',
              'minus': 'note-icon-minus',
              'orderedlist': 'note-icon-orderedlist',
              'pencil': 'note-icon-pencil',
              'picture': 'note-icon-picture',
              'question': 'note-icon-question',
              'redo': 'note-icon-redo',
              'square': 'note-icon-square',
              'strikethrough': 'note-icon-strikethrough',
              'comment': 'note-icon-pencil',
              'uncomment': 'note-icon-pencil',
              'htmlify': 'note-icon-pencil',  // 錯誤的圖示
              'textify': 'note-icon-pencil',  // 錯誤的圖示
              'subscript': 'note-icon-subscript',
              'superscript': 'note-icon-superscript',
              'table': 'note-icon-table',
              'textHeight': 'note-icon-text-height',
              'trash': 'note-icon-trash',
              'underline': 'note-icon-underline',
              'undo': 'note-icon-undo',
              'unorderedlist': 'note-icon-unorderedlist',
              'video': 'note-icon-video'
          }
      }
  });

})))


/***/ }),

/***/ "./webpack-app/vendors/summernote/summernote-lite.less":
/*!*************************************************************!*\
  !*** ./webpack-app/vendors/summernote/summernote-lite.less ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./summernote-lite.less */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/less-loader/dist/cjs.js?!./webpack-app/vendors/summernote/summernote-lite.less");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("68b47c78", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/vendors/summernote/summernote-lite.webpack.js":
/*!*******************************************************************!*\
  !*** ./webpack-app/vendors/summernote/summernote-lite.webpack.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _summernote_lite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./summernote-lite.js */ "./webpack-app/vendors/summernote/summernote-lite.js");
/* harmony import */ var _summernote_lite_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_summernote_lite_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _summernote_lite_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./summernote-lite.less */ "./webpack-app/vendors/summernote/summernote-lite.less");
/* harmony import */ var _summernote_lite_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_summernote_lite_less__WEBPACK_IMPORTED_MODULE_1__);



/***/ })

/******/ });
//# sourceMappingURL=client.js.map