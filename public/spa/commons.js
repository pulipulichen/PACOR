(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[,,,,,,,,,,function(t,e,r){"use strict";var i=r(37),n=r.n(i),o={debug:{ErrorHandler:{verbose:!1}}},s={debug:{ErrorHandler:{verbose:!0}},locale:"zh-TW",clientConfigName:"CONFIG",detectActivitySeconds:10};for(var a in s.styleConfig=n.a,o)s[a]=o[a];e.a=s},,function(t,e,r){var i=r(99);"string"==typeof i&&(i=[[t.i,i,""]]);var n={insert:"head",singleton:!1};r(6)(i,n);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{},"zh-TW":{}}'),delete t.options._Ctor}},function(t,e,r){var i=r(101);"string"==typeof i&&(i=[[t.i,i,""]]);var n={insert:"head",singleton:!1};r(6)(i,n);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{},"zh-TW":{}}'),delete t.options._Ctor}},function(t,e,r){var i=r(103);"string"==typeof i&&(i=[[t.i,i,""]]);var n={insert:"head",singleton:!1};r(6)(i,n);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"not yet started":"尚未開始"}}'),delete t.options._Ctor}},,function(t,e,r){var i=r(107);"string"==typeof i&&(i=[[t.i,i,""]]);var n={insert:"head",singleton:!1};r(6)(i,n);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}'),delete t.options._Ctor}},function(t,e,r){var i=r(109);"string"==typeof i&&(i=[[t.i,i,""]]);var n={insert:"head",singleton:!1};r(6)(i,n);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{},"zh-TW":{}}'),delete t.options._Ctor}},function(t,e,r){var i=r(111);"string"==typeof i&&(i=[[t.i,i,""]]);var n={insert:"head",singleton:!1};r(6)(i,n);i.locals&&(t.exports=i.locals)},function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{},"zh-TW":{}}'),delete t.options._Ctor}},,,,,,,,,function(t,e,r){"use strict";var i=r(1),c=r.n(i),n=r(0),u=r.n(n),o=r(2),s=r.n(o),a=r(11),l=r.n(a);l.a.defaults.withCredentials=!0;var p,d,f,h,m={baseURL:"",errorHandler:null,setBaseURL:function(t){return!0===t.endsWith("/")&&(t=t.slice(0,-1)),this.baseURL=t,this},setErrorHandler:function(t){this.errorHandler=t},handleError:function(t,e){"function"==typeof this.errorHandler&&this.errorHandler(t)},getURL:function(t){return!1===t.startsWith("/")&&(t="/"+t),this.baseURL+t},get:(h=s()(u.a.mark(function t(e,r,i){var n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.getURL(e),t.next=3,this.getOther(e,r,i);case 3:return n=t.sent,t.abrupt("return",n);case 5:case"end":return t.stop()}},t,this)})),function(t,e,r){return h.apply(this,arguments)}),getOther:(f=s()(u.a.mark(function t(e,r,i){var n,o;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return"string"==typeof r&&(r=JSON.parse(r)),n={},"object"===c()(r)&&(n.params=r),t.prev=3,t.next=6,l.a.get(e,n);case 6:return o=t.sent,t.abrupt("return",o.data);case 10:return t.prev=10,t.t0=t.catch(3),"function"!=typeof i?this.handleError(t.t0):i(t.t0),t.abrupt("return");case 14:case"end":return t.stop()}},t,this,[[3,10]])})),function(t,e,r){return f.apply(this,arguments)}),post:(d=s()(u.a.mark(function t(e,r,i){var n,o;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return"string"==typeof r&&(r=JSON.parse(r)),n={},"object"===c()(r)&&(n=r),t.prev=3,t.next=6,l.a.post(this.getURL(e),n);case 6:return o=t.sent,t.abrupt("return",o.data);case 10:return t.prev=10,t.t0=t.catch(3),"function"!=typeof i?this.handleError(t.t0):i(t.t0),t.abrupt("return");case 14:case"end":return t.stop()}},t,this,[[3,10]])})),function(t,e,r){return d.apply(this,arguments)}),upload:(p=s()(u.a.mark(function t(e,r,i){var n,o,s,a;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("object"!==c()(r))return this.handleError("no data"),t.abrupt("return","");t.next=3;break;case 3:for(o in n=new FormData,r)s=r[o],"object"===c()(s.files)&&(s=s.files[0]),n.append(o,s);return t.prev=5,t.next=8,l.a.post(this.getURL(e),n,{headers:{"Content-Type":"multipart/form-data"}});case 8:return a=t.sent,t.abrupt("return",a.data);case 12:return t.prev=12,t.t0=t.catch(5),"function"!=typeof i?this.handleError(t.t0):i(t.t0),t.abrupt("return");case 16:case"end":return t.stop()}},t,this,[[5,12]])})),function(t,e,r){return p.apply(this,arguments)})};e.a=m},function(t,e,r){"use strict";var i=r(8),n=r.n(i),o=r(71),s=r.n(o);n.a.extend(s.a),r(97).default;var a={$t:null,setI18N:function(t){this.$t=t},time:function(){return(new Date).getTime()},setLocale:function(e){if("string"!=typeof e)return this;e=e.toLowerCase();try{n.a.locale(e)}catch(t){console.error("dayjs locale is error: ".concat(e))}return this},fromNow:function(t){return n()(t).fromNow()},toNow:function(t){return n()(t).toNow()},_prefixZero:function(t){return t<10?"0"+t:t},shortTime:function(t){var e=0,r=0,i=0,n=0,o=0;return t<6e4?this.$t("in a minute"):t<864e5?(n=Math.floor(t/36e5),o=Math.floor(t%36e5/6e4),this._prefixZero(n)+":"+this._prefixZero(o)):t<2592e6?(i=Math.ceil(t/864e5),this.$t("in {0} day",[i])):t<31536e6?(r=Math.ceil(t/2592e6),this.$t("in {0} month",[r])):(e=Math.ceil(t/31536e6),this.$t("in {0} year",[e]))},from:function(t,e){return n()(t).from(n()(e))},to:function(t,e){return n()(t).to(n()(e))},format:function(t){return n()(t).format("YYYY-MM-DD HH:mm:ss")},formatHHMMSS:function(t){if(t<60)return t;if(t<3600){var e=Math.floor(t/60),r=t%60;return this._prefixZero(e)+":"+this._prefixZero(r)}var i=Math.floor(t/3600),n=Math.floor(t%3600/60),o=t%60;return console.log(i,n,o),this._prefixZero(i)+":"+this._prefixZero(n)+":"+this._prefixZero(o)}};e.a=a},function(t,e,r){"use strict";var i={validateEmail:function(t){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase())},countWords:function(t){if("string"!=typeof t)return 0;for(var e=new RegExp("[　-䷿]","g"),r=new RegExp("[一-鿿]","g"),i=new RegExp("[฀-๿]","g"),n=(t=(t=(t=(t=(t=(t=t.replace(e," {PNK} ")).replace(r," {CJK} ")).replace(i," {THI} ")).replace(/(\(|\)|\*|\||\+|\”|\’|_|;|:|,|\.|\?)/gi," ")).replace(/(。，、；：「」『』（）—？！…《》～〔〕［］・　)/gi," ")).replace(/\s+/gi," ")).split(/[\s+|\\|\/]/g),o=0,s=0,a=0,c=0;c<n.length;c++)"{PNK}"===n[c]?s++:"{THI}"===n[c]?a++:0<n[c].length&&o++;return o+=Math.ceil(s/3)+Math.ceil(a/4)}};e.a=i},function(t,e,r){"use strict";var i={isEmail:function(t){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase())},_urlPattern:new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i"),isURL:function(t){return!!this._urlPattern.test(t)},isJSON:function(t){if("string"!=typeof t)return!0;try{return JSON.parse(t),!0}catch(t){return!1}}};e.a=i},function(t,e){t.exports={TopMenuHeight:"60px",TocbotWidth:"200px"}},function(t,e,r){"use strict";function i(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"modal",staticClass:"ui modal"},["false"!==t.cancelable?r("i",{staticClass:"close icon"}):t._e(),t._v(" "),t.$slots.header?r("div",{staticClass:"header"},[t._t("header")],2):t._e(),t._v(" "),t.$slots.content?r("div",{staticClass:"content"},[r("div",{staticClass:"ui form"},[t._t("content")],2)]):t._e(),t._v(" "),t.$slots.actions||"true"===t.cancelable||t.reset?r("div",{staticClass:"actions"},["false"!==t.cancelable?r("div",{staticClass:"ui button",on:{click:t.hide}},[t._v("\r\n      "+t._s(t.$t("CANCEL"))+"\r\n    ")]):t._e(),t._v(" "),t.reset?r("div",{staticClass:"ui button",on:{click:t.doReset}},[t._v("\r\n      "+t._s(t.$t("RESET"))+"\r\n    ")]):t._e(),t._v(" "),t._t("actions")],2):t._e()])}i._withStripped=!0;var n=r(1),o=r.n(n),s={props:["lib","status","config","progress","error","view","cancelable","reset","dimmerTransparent"],data:function(){return this.$i18n.locale=this.config.locale,{resetCache:null}},components:{},computed:{},destoryed:function(){this.hide()},watch:{reset:function(){try{"object"===o()(this.reset)?this.resetCache=JSON.parse(JSON.stringify(this.reset)):this.resetCache=this.reset}catch(t){}}},mounted:function(){},methods:{getModal:function(){return window.$(this.$refs.modal)},_awaitInit:function(e){var r=this.getModal();!function t(){"function"!=typeof r.modal?setTimeout(t,100):e(r)}()},show:function(){var r=this;this._awaitInit(function(t){var e={};"false"===r.cancelable&&(e.closable=!1,e.duration=0),"false"===r.dimmerTransparent&&(e.dimmerSettings={dimmerName:"opaque"}),t.modal(e).modal("show")})},hide:function(){this._awaitInit(function(t){t.modal("hide")})},doReset:function(){for(var t in this.resetCache)this.reset[t]=this.resetCache[t]}}},a=(r(100),r(4)),c=r(48),u=Object(a.a)(s,i,[],!1,null,null,null);"function"==typeof c.default&&Object(c.default)(u),u.options.__file="webpack-app/components/Modal/Modal.vue";e.a=u.exports},function(t,e,r){"use strict";function i(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"placeholder"},[r("div",{staticClass:"ui inverted top fixed menu",class:{"compact-mode":e.isCompactMode}},[e._t("header"),e._v(" "),r("media",{attrs:{query:{minWidth:e.maxWidth}},on:{"media-enter":function(t){e.isCompactMode=!1},"media-leave":function(t){e.isCompactMode=!0}}},[r("div",{staticClass:"menu-full right menu"},[e._t("items")],2)]),e._v(" "),r("media",{attrs:{query:{maxWidth:e.maxWidth}}},[r("div",{staticClass:"menu-compact right menu"},[r("a",{staticClass:"icon item",on:{click:e.showSideMenu}},[r("i",{staticClass:"ellipsis vertical icon"})])])])],2),e._v(" "),r("div",{staticClass:"ui inverted right fixed vertical menu",class:{hide:!e.sideMenuDisplay}},[r("div",{staticClass:"item in-vertical close",on:{click:e.hideSideMenu}},[r("img",{attrs:{src:e.config.baseURL+"/imgs/pacor.svg"}}),e._v(" "),r("div",{staticClass:"site-header"},[e._v("\r\n        "+e._s(e.$t("PACOR"))+"\r\n      ")]),e._v(" "),r("i",{staticClass:"close icon"})]),e._v(" "),e._t("items")],2),e._v(" "),e.sideMenuDisplay?r("div",{staticClass:"overlay"}):e._e()])}i._withStripped=!0;var n=r(73),o={props:["config","compactWidth"],data:function(){return{sideMenuDisplay:!1,isCompactMode:!1}},components:{media:r.n(n).a},computed:{maxWidth:function(){var t=this.compactWidth;return"string"==typeof t&&!1===isNaN(t)?parseInt(t,10):"number"==typeof t?t:0}},mounted:function(){var t=0<window.innerWidth?window.innerWidth:screen.width;this.isCompactMode=t<this.compactWidth},methods:{showSideMenu:function(){this.sideMenuDisplay=!0},hideSideMenu:function(){this.sideMenuDisplay=!1}}},s=(r(106),r(4)),a=r(51),c=Object(s.a)(o,i,[],!1,null,"10bf3fd2",null);"function"==typeof a.default&&Object(a.default)(c),c.options.__file="webpack-app/components/Navigation/Navigation.vue";e.a=c.exports},function(t,e,r){"use strict";function i(){var r=this,t=r.$createElement,i=r._self._c||t;return i("div",{staticClass:"step-progress-bar",class:{hide:0===r.progresses.length}},[r._v("\r\n\r\n  "+r._s(r.currentStep)+"\r\n\r\n  "),i("div",{ref:"buttons",staticClass:"ui mini fluid buttons"},r._l(r.progresses,function(t,e){return i("span",{staticClass:"ui button",class:r.displayClass(t),attrs:{title:r.displayTitle(t),"data-content":r.displayTitle(t),"data-position":"bottom center"}})}),0)])}i._withStripped=!0;var n=r(1),o=r.n(n),s={props:["lib","config","progresses"],data:function(){return this.$i18n.locale=this.config.locale,{}},watch:{progresses:function(){this.initPopup()}},mounted:function(){this.initPopup()},computed:{currentStep:function(){if(!1===Array.isArray(this.progresses)||0===this.progresses.length)return this.$t("Not yet started");for(var t=0;t<this.progresses.length;t++){var e=this.progresses[t];if(!0!==e.isCompleted)return 0===t&&"number"!=typeof e.start_timestamp?"("+this.$t("Not yet started")+")":this.displayTitle(e)}return this.$t("READING_PROGRESS.finish")},allStepFinished:function(){for(var t=0;t<this.progresses.length;t++){if(!0!==this.progresses[t].isCompleted)return!1}return!0}},methods:{initPopup:function(){var e=this;Array.isArray(this.progresses)&&setTimeout(function(){var t=window.$(e.$refs.buttons).children();0<t.length&&t.popup()},0)},getTitle:function(t){return"object"===o()(t)&&"string"==typeof t.step_name&&(t=t.step_name),this.$t("READING_PROGRESS.".concat(t))},displayTitle:function(t){var e=this.getTitle(t);return e="number"==typeof t.start_timestamp?"".concat(e," (").concat(this.displayTime(t),")"):"".concat(e," (").concat(this.$t("not yet started"),")")},displayTime:function(t){return!1===t.isCompleted?this.lib.DayJSHelper.toNow(t.start_timestamp):this.lib.DayJSHelper.shortTime(t.end_timestamp-t.start_timestamp)},displayClass:function(t){return!0===this.allStepFinished?"green":!0===t.isCompleted?"grey":"number"==typeof t.start_timestamp?"green":"basic grey"}}},a=(r(102),r(4)),c=r(49),u=Object(a.a)(s,i,[],!1,null,"e5bffb70",null);"function"==typeof c.default&&Object(c.default)(u),u.options.__file="webpack-app/components/StepProgressBar/StepProgressBar.vue";e.a=u.exports},function(t,e,r){"use strict";function i(){this.$createElement;return this._self._c,this._m(0)}i._withStripped=!0;var n={},o=(r(108),r(4)),s=r(52),a=Object(o.a)(n,i,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ui segment"},[e("div",{staticClass:"ui active centered inline loader"})])}],!1,null,"076bb14c",null);"function"==typeof s.default&&Object(s.default)(a),a.options.__file="webpack-app/components/Loading/Loading.vue";e.a=a.exports},function(t,e,r){"use strict";function i(){var e=this,t=e.$createElement,r=e._self._c||t;return e.showError?r("div",{staticClass:"ui red floating message"},[r("i",{staticClass:"close icon",attrs:{title:e.$t("Click to close")},on:{click:e.close}}),e._v(" "),r("div",{staticClass:"ui relaxed divided list"},[e.responseErrorMessage?r("div",{staticClass:"item error-group"},[e.config.debug.ErrorHandler.verbose?r("i",{staticClass:"large node js icon",on:{click:function(t){e.showServerErrorStack=!e.showServerErrorStack}}}):e._e(),e._v(" "),!1===e.config.debug.ErrorHandler.verbose?r("i",{staticClass:"minus circle icon disabled-icon"}):e._e(),e._v(" "),r("div",{staticClass:"content"},[r("a",{staticClass:"header"},[e.responseErrorMessage?r("span",[e._v(e._s(e.responseErrorMessage))]):e._e()]),e._v(" "),e.config.debug.ErrorHandler.verbose?r("div",{staticClass:"description"},[e.responseErrorStack&&!e.showServerErrorStack?r("pre",{staticClass:"more",on:{click:function(t){e.showServerErrorStack=!e.showServerErrorStack}}},[e._v("("+e._s(e.$t("Show stacks..."))+")")]):e._e(),e._v(" "),e.responseErrorStack&&e.showServerErrorStack?r("pre",[e._v(e._s(e.responseErrorStack))]):e._e()]):e._e()])]):e._e(),e._v(" "),e.localErrorMessage&&e.config.debug.ErrorHandler.verbose?r("div",{staticClass:"item error-group"},[r("i",{staticClass:"large vuejs icon",on:{click:function(t){e.showErrorStack=!e.showErrorStack}}}),e._v(" "),r("div",{staticClass:"content"},[r("a",{staticClass:"header"},[e.localErrorMessage?r("span",[e._v(e._s(e.localErrorMessage))]):e._e()]),e._v(" "),r("div",{staticClass:"description"},[e.localErrorStack&&!e.showErrorStack?r("pre",{staticClass:"more",on:{click:function(t){e.showErrorStack=!e.showErrorStack}}},[e._v("("+e._s(e.$t("Show stacks..."))+")")]):e._e(),e._v(" "),e.localErrorStack&&e.showErrorStack?r("pre",[e._v(e._s(e.localErrorStack))]):e._e()])])]):e._e(),e._v(" "),"string"==typeof e.error&&e.config.debug.ErrorHandler.verbose?r("div",{staticClass:"item error-group"},[r("i",{staticClass:"large vuejs icon",on:{click:function(t){e.showErrorStack=!e.showErrorStack}}}),e._v(" "),r("div",{staticClass:"content"},[r("a",{staticClass:"header"},[e.error?r("span",[e._v(e._s(e.error))]):e._e()])])]):e._e(),e._v(" "),e.error.config&&e.error.config.method&&e.config.debug.ErrorHandler.verbose?r("div",{staticClass:"item"},[r("i",{staticClass:"large redo icon",on:{click:e.retry}}),e._v(" "),r("div",{staticClass:"content"},[r("a",{staticClass:"header retry",on:{click:e.retry}},[e.error.config.method?r("span",[e._v(e._s(e.error.config.method))]):e._e(),e._v(" "),e.error.config.method&&e.error.config.url?r("span",[e._v(": ")]):e._e(),e._v(" "),e.error.config.url?r("span",[e._v(e._s(e.error.config.url))]):e._e()]),e._v(" "),r("div",{staticClass:"description"},[r("pre",[e._v(e._s(e.displayErrorData))])])])]):e._e()])]):e._e()}i._withStripped=!0;var n,o=r(0),s=r.n(o),a=r(2),c=r.n(a),u=r(1),l=r.n(u),p={props:["config","error","lib"],data:function(){return this.$i18n.locale=this.config.locale,{showError:!1,showServerErrorStack:!1,showErrorStack:!1}},computed:{responseErrorMessage:function(){if("object"===l()(this.error)&&"object"===l()(this.error.response)&&"object"===l()(this.error.response.data)&&"object"===l()(this.error.response.data.error)){var t="",e=this.error.response.data.error;return"number"==typeof e.status&&(t+="[".concat(e.status,"]")),"string"==typeof e.message&&(""!==t&&(t=" "),t=t+""+e.message.trim()),t}},responseErrorStack:function(){if("object"===l()(this.error)&&"object"===l()(this.error.response)&&"object"===l()(this.error.response.data)&&"object"===l()(this.error.response.data.error)){var t="",e=this.error.response.data.error;return Array.isArray(e.frames)&&(""!==t&&(t+="\n"),t+=e.frames.map(function(t){return"at ".concat(t.method," (").concat(t.file," :").concat(t.line," :").concat(t.column,")")}).join("\n")),t}},localErrorMessage:function(){if("object"===l()(this.error)&&"string"==typeof this.error.message)return this.error.message},localErrorStack:function(){if("object"===l()(this.error)&&"string"==typeof this.error.stack){var t=this.error.stack;return t.trim().startsWith("found in")&&0<t.indexOf("---\x3e")?t.slice(t.indexOf("---\x3e")+4).trim():t.split("\n").slice(1).map(function(t){return t.trim()}).join("\n")}},displayErrorData:function(){var t;if("object"===l()(this.error)&&"object"===l()(this.error.config)&&void 0!==this.error.config.data?t=this.error.config.data:"object"===l()(this.error)&&"object"===l()(this.error.config)&&void 0!==this.error.config.params&&(t=this.error.config.params),void 0!==t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return"object"===l()(t)&&(t=JSON.stringify(t,null," ").slice(2,-2)),t}}},watch:{error:function(){("object"===l()(this.error)||"string"==typeof this.error&&""!==this.error.trim())&&(this.showError=!0,this.showServerErrorStack=!1,this.showErrorStack=!1)}},methods:{close:function(){this.showError=!1},retry:(n=c()(s.a.mark(function t(e){var r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("object"!==l()(this.error)||"object"!==l()(this.error.config)||"string"!=typeof this.error.config.url||"string"!=typeof this.error.config.method)return t.abrupt("return",!1);t.next=2;break;case 2:return this.showError=!1,void 0===(r=this.error.config.params)&&(r=this.error.config.data),t.next=7,this.lib.AxiosHelper[this.error.config.method](this.error.config.url,r);case 7:case"end":return t.stop()}},t,this)})),function(t){return n.apply(this,arguments)})}},d=(r(110),r(4)),f=r(53),h=Object(d.a)(p,i,[],!1,null,"7536335c",null);"function"==typeof f.default&&Object(f.default)(h),h.options.__file="webpack-app/components/ErrorHandler/ErrorHandler.vue";e.a=h.exports},function(t,e,r){"use strict";function i(){var r=this,t=r.$createElement,i=r._self._c||t;return i("div",{staticClass:"pagination"},[i("div",{staticClass:"ui basic icon buttons"},r._l(r.pageConfig.maxPage,function(e){return i("button",{staticClass:"ui button",class:{active:e===r.pageConfig.page},on:{click:function(t){return r.changePage(e)}}},[r._v("\r\n      "+r._s(e)+"\r\n    ")])}),0)])}i._withStripped=!0;var n={props:["pageConfig"],data:function(){return{}},methods:{changePage:function(t){if(t===this.pageConfig.page)return!1;this.pageConfig.page=t}}},o=(r(98),r(4)),s=r(47),a=Object(o.a)(n,i,[],!1,null,"16bb9012",null);"function"==typeof s.default&&Object(s.default)(a),a.options.__file="webpack-app/components/Pagination/Pagination.vue";e.a=a.exports},function(t,e,r){"use strict";var i=r(46),n={en:{Title:"Example Title",Groups:"Group | Groups",Readers:"Reader | Readers","in {0} day":"in {0} day | in {0} days","in {0} month":"in {0} month | in {0} months","in {0} year":"in {0} year | in {0} years","{0} word":"{0} word | {0} words","You still need to write {0} words more.":"You still need to write {0} word more. | You still need to write {0} words more.","Remaining Time: {0}":"Remaining Time: {0}"},"zh-TW":{LOGIN:"登入",LOGOUT:"登出",EXIT:"離開",NEXT:"下一步",Title:"標題",OK:"確認",UPLOAD:"上傳",SUBMIT:"送出",ADD:"新增",CANCEL:"取消",Example:"範例",DATABASE:"資料庫",RESET:"重設",Path:"路徑",Config:"設定",Group:"分組",Groups:"組",Readers:"讀者",Dashboard:"儀表板","Not yet started":"尚未開始","READING_PROGRESS.not-yet-started":"尚未開始","READING_PROGRESS.PreImaginary":"閱讀前的想像","READING_PROGRESS.IndividualReading":"個人閱讀","READING_PROGRESS.CollaborativeReading":"團體閱讀","READING_PROGRESS.PostRecall":"閱讀後的回想","READING_PROGRESS.finish":"已經完成","in {0} day":"在{0}天內","in {0} month":"在{0}月內","in {0} year":"在{0}年內","{0} word":"{0}字","You still need to write {0} words more.":"你還需要寫{0}字。","Remaining Time: {0}":"剩餘時間：{0}"}};r(3).a.use(i.a);var o=new i.a({locale:"zh-TW",messages:n,silentTranslationWarn:!0});e.a=o},,,function(t,e,r){"use strict";var i=r(13),n=r.n(i);e.default=n.a},function(t,e,r){"use strict";var i=r(15),n=r.n(i);e.default=n.a},function(t,e,r){"use strict";var i=r(17),n=r.n(i);e.default=n.a},,function(t,e,r){"use strict";var i=r(20),n=r.n(i);e.default=n.a},function(t,e,r){"use strict";var i=r(22),n=r.n(i);e.default=n.a},function(t,e,r){"use strict";var i=r(24),n=r.n(i);e.default=n.a},,,,,,function(t,e,r){"use strict";var i=r(3),n=(r(78),r(70));i.a.config.devtools=!1,i.a.config.productionTip=!1,i.a.use(n.a.Plugin)},,function(t,e,r){var i=r(9);window.jQuery=window.$=i;Promise.all([r.e(0),r.e(15)]).then(r.t.bind(null,127,7))},,,,,,,,,,,,,,,,,function(t,e,r){var i=r(79);"string"==typeof i&&(i=[[t.i,i,""]]);var n={insert:"head",singleton:!1};r(6)(i,n);i.locals&&(t.exports=i.locals)},function(t,e,r){(t.exports=r(5)(!1)).push([t.i,"",""])},,,,,,,,,,,,,,,,,,,function(t,e,r){"use strict";var i=r(12);r.n(i).a},function(t,e,r){(t.exports=r(5)(!1)).push([t.i,".pagination[data-v-16bb9012]{text-align:center}.pagination .active[data-v-16bb9012]{pointer-events:none}",""])},function(t,e,r){"use strict";var i=r(14);r.n(i).a},function(t,e,r){(t.exports=r(5)(!1)).push([t.i,".non-invasive-web-style-framework.dimmable>.ui.dimmer.opaque{background-color:#000!important}",""])},function(t,e,r){"use strict";var i=r(16);r.n(i).a},function(t,e,r){(t.exports=r(5)(!1)).push([t.i,".step-progress-bar .button[data-v-e5bffb70]{padding:0!important;cursor:default!important}.step-progress-bar .button.green[data-v-e5bffb70],.step-progress-bar .button.grey[data-v-e5bffb70]{margin-right:.3em!important}.step-progress-bar .button.green[data-v-e5bffb70]:last-of-type,.step-progress-bar .button.grey[data-v-e5bffb70]:last-of-type{margin-right:0!important}",""])},,,function(t,e,r){"use strict";var i=r(19);r.n(i).a},function(t,e,r){(t.exports=r(5)(!1)).push([t.i,".placeholder[data-v-10bf3fd2]{padding-top:60px}.vertical.menu[data-v-10bf3fd2]{z-index:103!important}.top.menu[data-v-10bf3fd2]  .in-vertical,.vertical.menu.hide[data-v-10bf3fd2]{display:none!important}.vertical.menu[data-v-10bf3fd2]  .menu-compact{display:none!important}.vertical.menu[data-v-10bf3fd2]  .right.menu>.item{line-height:3rem;color:#fff!important}.vertical.menu[data-v-10bf3fd2]  .menu-full{display:block!important}.vertical.menu[data-v-10bf3fd2]  .in-top{display:none!important}.overlay[data-v-10bf3fd2]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:hsla(0,0%,100%,.7);z-index:102}.ui.vertical.menu .close.item[data-v-10bf3fd2]{cursor:pointer;height:3rem;line-height:inherit;border-bottom:1px solid #ccc}.ui.vertical.menu .close.item img[data-v-10bf3fd2]{width:1.5em;float:left;margin-top:-.2em}.ui.vertical.menu .close.item .site-header[data-v-10bf3fd2]{display:inline-block;padding-left:1em}.ui.vertical.menu .right.menu[data-v-10bf3fd2]  .item{font-size:16px}.ui.top.menu.compact-mode .item.title[data-v-10bf3fd2]{max-width:calc(100vw - 8rem)}",""])},function(t,e,r){"use strict";var i=r(21);r.n(i).a},function(t,e,r){(t.exports=r(5)(!1)).push([t.i,"",""])},function(t,e,r){"use strict";var i=r(23);r.n(i).a},function(t,e,r){(t.exports=r(5)(!1)).push([t.i,".message[data-v-7536335c]{max-width:100%;overflow:auto;position:fixed!important;left:3rem;width:calc(100vw - 6rem);bottom:calc(60px + 1rem);max-height:calc(100vh - 60px - 4rem);z-index:1001}.message .list[data-v-7536335c]{margin-top:0!important}.message .close[data-v-7536335c]{cursor:pointer}.message .disabled-icon[data-v-7536335c]{padding-top:2px!important}.message .item>i.icon[data-v-7536335c]:not(.disabled-icon){padding-top:5px!important;cursor:pointer}.message .item>i.icon[data-v-7536335c]:not(.disabled-icon):active,.message .item>i.icon[data-v-7536335c]:not(.disabled-icon):hover{color:#e67e22}.message .description pre[data-v-7536335c]{margin-top:0}.message .description pre[data-v-7536335c]:first-of-type{margin-bottom:0}.message .header[data-v-7536335c]{cursor:inherit!important}.message .header.retry[data-v-7536335c]{cursor:pointer!important;font-weight:700;font-family:monospace,monospace}.message .error-group .more[data-v-7536335c]{cursor:pointer}.message .error-group .more[data-v-7536335c]:active,.message .error-group .more[data-v-7536335c]:hover{color:#e67e22}.message .error-group .description[data-v-7536335c]{max-width:calc(100vw - 11rem);overflow-x:auto;overflow-y:hidden}",""])}]]);