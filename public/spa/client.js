!function(u){function e(e){for(var t,r,n=e[0],i=e[1],o=e[2],a=0,s=[];a<n.length;a++)r=n[a],Object.prototype.hasOwnProperty.call(l,r)&&l[r]&&s.push(l[r][0]),l[r]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(u[t]=i[t]);for(h&&h(e);s.length;)s.shift()();return p.push.apply(p,o||[]),c()}function c(){for(var e,t=0;t<p.length;t++){for(var r=p[t],n=!0,i=1;i<r.length;i++){var o=r[i];0!==l[o]&&(n=!1)}n&&(p.splice(t--,1),e=f(f.s=r[0]))}return e}var r={},l={2:0},p=[];function f(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return u[e].call(t.exports,t,t.exports,f),t.l=!0,t.exports}f.e=function(i){var e=[],r=l[i];if(0!==r)if(r)e.push(r[2]);else{var t=new Promise(function(e,t){r=l[i]=[e,t]});e.push(r[2]=t);var n,o=document.createElement("script");o.charset="utf-8",o.timeout=120,f.nc&&o.setAttribute("nonce",f.nc),o.src=function(e){return f.p+""+({3:"client-components/Chat",4:"client-components/Login",5:"vendors/semantic-ui-niwsf"}[e]||e)+".js"}(i);var a=new Error;n=function(e){o.onerror=o.onload=null,clearTimeout(s);var t=l[i];if(0!==t){if(t){var r=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;a.message="Loading chunk "+i+" failed.\n("+r+": "+n+")",a.name="ChunkLoadError",a.type=r,a.request=n,t[1](a)}l[i]=void 0}};var s=setTimeout(function(){n({type:"timeout",target:o})},12e4);o.onerror=o.onload=n,document.head.appendChild(o)}return Promise.all(e)},f.m=u,f.c=r,f.d=function(e,t,r){f.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(t,e){if(1&e&&(t=f(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(f.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)f.d(r,n,function(e){return t[e]}.bind(null,n));return r},f.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(t,"a",t),t},f.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},f.p="http://127.0.0.1:3333/spa/",f.oe=function(e){throw console.error(e),e};var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var i=0;i<t.length;i++)e(t[i]);var h=n;p.push([69,0]),c()}([,,,,,,,function(e,t,r){var n=r(33);"string"==typeof n&&(n=[[e.i,n,""]]);var i={insert:"head",singleton:!1};r(17)(n,i);n.locals&&(e.exports=n.locals)},function(e,t){e.exports=function(e){e.options.__i18n=e.options.__i18n||[],e.options.__i18n.push('{"en":{},"zh-TW":{}}'),delete e.options._Ctor}},function(e,t,r){var n=r(35);"string"==typeof n&&(n=[[e.i,n,""]]);var i={insert:"head",singleton:!1};r(17)(n,i);n.locals&&(e.exports=n.locals)},function(e,t){e.exports=function(e){e.options.__i18n=e.options.__i18n||[],e.options.__i18n.push('{"en":{},"zh-TW":{}}'),delete e.options._Ctor}},,,function(e,t){e.exports={debug:{},locale:"zh-TW",clientConfigName:"CONFIG"}},function(e,t,r){"use strict";var n=r(8),i=r.n(n);t.default=i.a},function(e,t,r){"use strict";var n=r(10),i=r.n(n);t.default=i.a},,,,,function(e,t,r){"use strict";var n=r(3),u=r.n(n),i=r(0),c=r.n(i),o=r(1),a=r.n(o),s=r(6),l=r.n(s);l.a.defaults.withCredentials=!0;var p,f,h,d,v={baseURL:"",errorHandler:null,setBaseURL:function(e){return!0===e.endsWith("/")&&(e=e.slice(0,-1)),this.baseURL=e,this},setErrorHandler:function(e){this.errorHandler=e},handleError:function(e){console.error(e),"function"==typeof this.errorHandler&&this.errorHandler(e)},getURL:function(e){return!1===e.startsWith("/")&&(e="/"+e),this.baseURL+e},get:(d=a()(c.a.mark(function e(t,r,n){var i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.getURL(t),e.next=3,this.getOther(t,r,n);case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}},e,this)})),function(e,t,r){return d.apply(this,arguments)}),getOther:(h=a()(c.a.mark(function e(t,r,n){var i,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i={},"object"===u()(r)&&(i.params=r),e.prev=2,e.next=5,l.a.get(t,i);case 5:return o=e.sent,e.abrupt("return",o.data);case 9:return e.prev=9,e.t0=e.catch(2),"function"!=typeof n?this.handleError(e.t0):n(e.t0),e.abrupt("return");case 13:case"end":return e.stop()}},e,this,[[2,9]])})),function(e,t,r){return h.apply(this,arguments)}),post:(f=a()(c.a.mark(function e(t,r,n){var i,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i={},"object"===u()(r)&&(i=r),e.prev=2,e.next=5,l.a.post(this.getURL(t),i);case 5:return o=e.sent,e.abrupt("return",o.data);case 9:return e.prev=9,e.t0=e.catch(2),"function"!=typeof n?this.handleError(e.t0):n(e.t0),e.abrupt("return");case 13:case"end":return e.stop()}},e,this,[[2,9]])})),function(e,t,r){return f.apply(this,arguments)}),upload:(p=a()(c.a.mark(function e(t,r,n){var i,o,a,s;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("object"!==u()(r))return this.handleError("no data"),e.abrupt("return","");e.next=3;break;case 3:for(o in i=new FormData,r)a=r[o],"object"===u()(a.files)&&(a=a.files[0]),i.append(o,a);return e.prev=5,e.next=8,l.a.post(this.getURL(t),i,{headers:{"Content-Type":"multipart/form-data"}});case 8:return s=e.sent,e.abrupt("return",s.data);case 12:return e.prev=12,e.t0=e.catch(5),"function"!=typeof n?this.handleError(e.t0):n(e.t0),e.abrupt("return");case 16:case"end":return e.stop()}},e,this,[[5,12]])})),function(e,t,r){return p.apply(this,arguments)})};t.a=v},function(e,t,r){"use strict";var n=r(12),i=r.n(n),o=r(26),a=r.n(o);i.a.extend(a.a),r(45).default;var s={setLocale:function(t){if("string"!=typeof t)return this;t=t.toLowerCase();try{i.a.locale(t)}catch(e){console.error("dayjs locale is error: ".concat(t))}return this},fromNow:function(e){return i()(e).fromNow()}};t.a=s},function(e,t,r){"use strict";var n={validateEmail:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}};t.a=n},function(e,t,r){"use strict";function n(){this.$createElement;return this._self._c,this._m(0)}n._withStripped=!0;var i={},o=(r(32),r(4)),a=r(14),s=Object(o.a)(i,n,[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ui segment"},[t("div",{staticClass:"ui active centered inline loader"})])}],!1,null,"076bb14c",null);"function"==typeof a.default&&Object(a.default)(s),s.options.__file="webpack-app/components/Loading/Loading.vue";function u(){var e=this,t=e.$createElement,r=e._self._c||t;return e.showError?r("div",{staticClass:"ui red floating message",attrs:{title:e.$t("Click to close")},on:{click:e.close}},[r("pre",[e._v(e._s(e.error))])]):e._e()}var c=s.exports;u._withStripped=!0;var l=r(3),p=r.n(l),f={props:["config","error"],data:function(){return this.$i18n.locale=this.config.locale,{}},computed:{showError:function(){return"object"===p()(this.error)||"string"==typeof this.error&&""!==this.error.trim()}},watch:{},mounted:function(){},methods:{close:function(){this.error=""}}},h=(r(34),r(15)),d=Object(o.a)(f,u,[],!1,null,"7536335c",null);"function"==typeof h.default&&Object(h.default)(d),d.options.__file="webpack-app/components/ErrorHandler/ErrorHandler.vue";function v(){var e=this.$createElement;return(this._self._c||e)("div")}var g=d.exports;v._withStripped=!0;var b,m,w,y,x=r(0),_=r.n(x),L=r(1),k=r.n(L),j={props:["lib","status","config","progress","error"],data:function(){return{}},mounted:(y=k()(_.a.mark(function e(){var t;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("string"!=typeof this.config.username&&"string"==typeof this.config.usernameQueryURL)return e.next=3,this.loadUsernameFromURL();e.next=4;break;case 3:this.config.username=e.sent;case 4:if(t=!1,"string"==typeof this.config.username)return e.next=8,this.attemptLoginViaUsername(this.config.username);e.next=9;break;case 8:t=e.sent;case 9:if(!1===t)return e.next=12,this.checkLogin();e.next=12;break;case 12:case"end":return e.stop()}},e,this)})),function(){return y.apply(this,arguments)}),methods:{loadUsernameFromURL:(w=k()(_.a.mark(function e(){var t;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.lib.AxiosHelper.getOther(this.config.usernameQueryURL);case 2:if("string"==typeof(t=e.sent))return e.abrupt("return",t);e.next=5;break;case 5:case"end":return e.stop()}},e,this)})),function(){return w.apply(this,arguments)}),attemptLoginViaUsername:(m=k()(_.a.mark(function e(t){var r;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.lib.AxiosHelper.get("/client/user/attempt-login-via-username",{username:t});case 2:if("string"==typeof(r=e.sent))return this.status.username=r,e.abrupt("return",!0);e.next=8;break;case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}},e,this)})),function(e){return m.apply(this,arguments)}),checkLogin:(b=k()(_.a.mark(function e(){var t;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.lib.AxiosHelper.get("/client/user/check-login");case 2:t=e.sent,this.status.username=t;case 4:case"end":return e.stop()}},e,this)})),function(){return b.apply(this,arguments)})}},C=Object(o.a)(j,v,[],!1,null,null,null);C.options.__file="webpack-app/client/components/Auth/Auth.vue";var E={Loading:c,"error-handler":g,Auth:C.exports,Login:function(){return r.e(4).then(r.bind(null,118))},Chat:function(){return r.e(3).then(r.bind(null,117))}};t.a=E},function(e,t,r){"use strict";var n=r(18),i={en:{Title:"Example Title"},"zh-TW":{Title:"範例標題",OK:"確認"}};r(2).a.use(n.a);var o=new n.a({locale:"zh-TW",messages:i,silentTranslationWarn:!0});t.a=o},,,function(e,t,r){"use strict";var n=r(2),i=(r(29),r(25));n.a.config.devtools=!1,n.a.config.productionTip=!1,n.a.use(i.a.Plugin)},,function(e,t,r){var n=r(30);"string"==typeof n&&(n=[[e.i,n,""]]);var i={insert:"head",singleton:!1};r(17)(n,i);n.locals&&(e.exports=n.locals)},function(e,t,r){(e.exports=r(16)(!1)).push([e.i,"",""])},function(e,t,r){var n=r(11);window.jQuery=window.$=n;Promise.all([r.e(0),r.e(5)]).then(r.t.bind(null,48,7))},function(e,t,r){"use strict";var n=r(7);r.n(n).a},function(e,t,r){(e.exports=r(16)(!1)).push([e.i,"",""])},function(e,t,r){"use strict";var n=r(9);r.n(n).a},function(e,t,r){(e.exports=r(16)(!1)).push([e.i,".message[data-v-7536335c]{cursor:pointer}",""])},,,,,,,,,,,function(e,t){e.exports='<div class="non-invasive-web-style-framework">\r\n\r\n  <auth v-bind:config="config"\r\n        v-bind:status="status"\r\n        v-bind:progress="progress"\r\n        v-bind:lib="lib"\r\n        v-bind:error="error"\r\n        ref="auth"></auth>\r\n  <error-handler v-bind:config="config"\r\n                 v-bind:error="error"\r\n                 ref="ErrorHandler"></error-handler>\r\n  \r\n  <router-view v-bind:config="config"\r\n               v-bind:status="status"\r\n               v-bind:progress="progress"\r\n               v-bind:lib="lib"\r\n               v-bind:error="error"></router-view>\r\n  \r\n  <keep-alive>\r\n    <component v-bind:is="view"\r\n        v-bind:config="config"\r\n        v-bind:status="status"\r\n        v-bind:progress="progress"\r\n        v-bind:lib="lib"\r\n        v-bind:error="error"\r\n        v-bind:view="view"></component>\r\n  </keep-alive>\r\n</div>'},,,,,,,,,,,,,,,,,,,,,,,function(e,t,r){"use strict";r.r(t);var n=r(3),i=r.n(n),o=r(2),a=(r(27),r(31),r(24)),s=r(20),u=r(21),c=r(22),l=r(11),p=r.n(l),f=r(46),h=r.n(f),d=r(13),v=r.n(d),g=r(19);o.a.use(g.a);var b=new g.a({routes:[]}),m=r(23),w=r.p;w=w.split("/").slice(0,3).join("/"),v.a.baseURL=w;var y=p()(document.currentScript);1===y.length&&y.before('<div id="app"></div>');var x={data:{config:v.a,status:{username:""},progress:{component:!1,data:!1,display:!1},lib:{AxiosHelper:s.a.setBaseURL(w),DayJSHelper:u.a,StringHelper:c.a},view:"Loading",error:"",persistAttrs:[]},watch:{"status.username":function(){var e="Login";"string"==typeof this.status.username&&(e="Chat"),this.view=e},"config.locale":function(){this.lib.DayJSHelper.setLocale(this.config.locale)}},created:function(){this.loadClientConfig()},mounted:function(){var t=this;this.lib.AxiosHelper.setErrorHandler(function(e){t.error=e})},methods:{loadClientConfig:function(){var e=window[this.config.clientConfigName];if("object"===i()(e))for(var t in e)this.config[t]=e[t]}},el:"#app",i18n:a.a,template:h.a,router:b,components:m.a,errorCaptured:function(e,t,r){this.error=e.stack}};"string"==typeof w&&p()(function(){new o.a(x),p()("body > #TestMessage").remove()}),window.VueController=x}]);