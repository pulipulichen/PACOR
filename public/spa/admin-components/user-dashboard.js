(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{170:function(t,e,s){var a=s(276);"string"==typeof a&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1};s(6)(a,i);a.locals&&(t.exports=a.locals)},171:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}'),delete t.options._Ctor}},172:function(t,e,s){var a=s(279);"string"==typeof a&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1};s(6)(a,i);a.locals&&(t.exports=a.locals)},173:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}'),delete t.options._Ctor}},174:function(t,e,s){var a=s(282);"string"==typeof a&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1};s(6)(a,i);a.locals&&(t.exports=a.locals)},175:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}'),delete t.options._Ctor}},176:function(t,e,s){var a=s(285);"string"==typeof a&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1};s(6)(a,i);a.locals&&(t.exports=a.locals)},177:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}'),delete t.options._Ctor}},178:function(t,e,s){var a=s(288);"string"==typeof a&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1};s(6)(a,i);a.locals&&(t.exports=a.locals)},179:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}'),delete t.options._Ctor}},275:function(t,e,s){"use strict";var a=s(170);s.n(a).a},276:function(t,e,s){(t.exports=s(5)(!1)).push([t.i,"",""])},277:function(t,e,s){"use strict";var a=s(171),i=s.n(a);e.default=i.a},278:function(t,e,s){"use strict";var a=s(172);s.n(a).a},279:function(t,e,s){(t.exports=s(5)(!1)).push([t.i,"",""])},280:function(t,e,s){"use strict";var a=s(173),i=s.n(a);e.default=i.a},281:function(t,e,s){"use strict";var a=s(174);s.n(a).a},282:function(t,e,s){(t.exports=s(5)(!1)).push([t.i,"",""])},283:function(t,e,s){"use strict";var a=s(175),i=s.n(a);e.default=i.a},284:function(t,e,s){"use strict";var a=s(176);s.n(a).a},285:function(t,e,s){(t.exports=s(5)(!1)).push([t.i,"",""])},286:function(t,e,s){"use strict";var a=s(177),i=s.n(a);e.default=i.a},287:function(t,e,s){"use strict";var a=s(178);s.n(a).a},288:function(t,e,s){(t.exports=s(5)(!1)).push([t.i,".ui.secondary.menu h2[data-v-68468aa6]{margin-top:0!important}h4[data-v-68468aa6]{margin-top:1rem!important}.header h2[data-v-68468aa6],.header h3[data-v-68468aa6]{margin:0}.header .sub.header[data-v-68468aa6]{word-break:break-all;width:calc(100vw - 43rem);min-width:10rem}",""])},289:function(t,e,s){"use strict";var a=s(179),i=s.n(a);e.default=i.a},296:function(t,e,s){"use strict";s.r(e);function a(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"ui form"},[a("div",{staticClass:"ui secondary menu"},[a("a",{staticClass:"icon item",attrs:{href:"#/webpage-dashboard/"+s.$route.params.webpageID}},[a("i",{staticClass:"angle left icon"})]),s._v(" "),a("a",{staticClass:"icon item"},[a("img",{attrs:{src:s.user.avatar_url}})]),s._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"ui header"},[a("div",{staticClass:"content"},[a("div",{staticClass:"sub header"},[s._v(s._s(s.webpagePath))]),s._v(" "),a("h2",[s._v("\r\n            "+s._s(s.user.username)+"\r\n            "),s.user.username!==s.user.display_name?[s._v("\r\n              ("+s._s(s.user.display_name)+")\r\n            ")]:s._e()],2)])])]),s._v(" "),a("div",{staticClass:"right menu"},[a("a",{staticClass:"ui item",attrs:{href:s.status.webpageURL,target:"_blank"}},[a("i",{staticClass:"external link icon"}),s._v("\r\n        "+s._s(s.$t("Open Webpage"))+"\r\n      ")]),s._v(" "),(s.status.role="global_admin")?a("a",{staticClass:"ui item",attrs:{href:"/admin/Database/admin?table=reading_progresses",target:"_blank"}},[a("i",{staticClass:"database icon"}),s._v("\r\n        "+s._s(s.$t("Database"))+"\r\n      ")]):s._e()])]),s._v(" "),a("table-of-contents",{ref:"toc",attrs:{config:s.config,lib:s.lib,headings:"h3, h4"}}),s._v(" "),a("div",{staticClass:"ui segment"},[a("h3",{attrs:{id:s.attrHeaderID("steps")}},[s._v("\r\n      "+s._s(s.$t("Reading Progresses"))+"\r\n    ")]),s._v(" "),a("step-progress-bar",{attrs:{lib:s.lib,config:s.config,progresses:s.user.readingProgresses}})],1),s._v(" "),s._l(s.user.readingProgresses,function(t,e){return a("div",{staticClass:"ui segment"},[a("h3",{staticClass:"ui header",class:{teal:t.isCompleted,green:typeof t.start_timestamp&&!1===t.isCompleted},attrs:{id:s.attrHeaderID(t.step_name)}},[a("i",{staticClass:"icon",class:s.stepIcon(t)}),s._v("\r\n      #"+s._s(e+1)+"\r\n      "+s._s(s.$t("READING_PROGRESS."+t.step_name))+"\r\n    ")]),s._v(" "),a("div",{staticClass:"ui list"},[t.start_timestamp?a("div",{staticClass:"item"},[s._v("\r\n        "+s._s(s.$t("Duration"))+": \r\n        "),t.start_timestamp?a("b",[s._v("\r\n          "+s._s(s.lib.DayJSHelper.format(t.start_timestamp))+"\r\n        ")]):s._e(),s._v(" "),t.end_timestamp?[s._v("\r\n          ~\r\n          "),a("b",[s._v("\r\n            "+s._s(s.lib.DayJSHelper.format(t.end_timestamp))+"\r\n          ")]),s._v("\r\n\r\n          ("+s._s(s.lib.DayJSHelper.shortTime(t.duration))+")\r\n        ")]:s._e()],2):s._e(),s._v(" "),t.activity_seconds?a("div",{staticClass:"item"},[s._v("\r\n        "+s._s(s.$t("Activity seconds"))+": \r\n        "),a("b",[s._v("\r\n          "+s._s(t.activity_seconds)+"\r\n          "+s._s(s.$t("sec."))+"\r\n        ")])]):s._e()]),s._v(" "),a(t.step_name,{tag:"component",attrs:{config:s.config,status:s.status,progress:s.progress,lib:s.lib,log:t.log,error:s.error,toc:s.toc}})],1)})],2)}a._withStripped=!0;function i(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",e._l(e.logPair,function(t){return s("div",{staticClass:"ui field"},[s("label",[e._v(e._s(t.name))]),e._v(" "),s("div",[e._v(e._s(t.value))])])}),0)}var n=s(0),r=s.n(n),o=s(2),l=s.n(o);i._withStripped=!0;var u,c=s(1),p=s.n(c),_={props:["lib","status","config","progress","error","view","log","toc"],data:function(){return this.$i18n.locale=this.config.locale,{stepName:"PreImaginary"}},components:{},computed:{displayStepData:function(){if("object"===p()(this.stepData)){var t=JSON.stringify(this.stepData,null,"  ");return t=t.slice(2,-2).trim()}},logPair:function(){var t=[],e=this.log;if("string"==typeof e&&e.startsWith("{")&&e.endsWith("}"))try{e=JSON.parse(e)}catch(t){}if("object"===p()(e))for(var s in e)t.push({name:s,value:e[s]});return t}},mounted:function(){this.init()},methods:{init:(u=l()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.lib.AxiosHelper.get("/admin/UserDashboard/step",{stepName:this.stepName,webpageID:this.$route.params.webpageID,userID:this.$route.params.userID});case 2:this.stepData=t.sent,this.toc.refresh();case 4:case"end":return t.stop()}},t,this)})),function(){return u.apply(this,arguments)})}};_.data=function(){return this.$i18n.locale=this.config.locale,{stepName:"PreImaginary"}};var d=_,f=(s(275),s(4)),v=s(277),h=Object(f.a)(d,i,[],!1,null,"f83bfaa8",null);"function"==typeof v.default&&Object(v.default)(h),h.options.__file="webpack-app/admin/components/UserDashboard/PreImaginary/PreImaginary.vue";function m(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",e._l(e.logPair,function(t){return s("div",{staticClass:"ui field"},[s("label",[e._v(e._s(t.name))]),e._v(" "),s("div",[e._v(e._s(t.value))])])}),0)}var g=h.exports;m._withStripped=!0,_.data=function(){return this.$i18n.locale=this.config.locale,{stepName:"IndividualReading"}};var b=_,S=(s(278),s(280)),w=Object(f.a)(b,m,[],!1,null,"3ec911d8",null);"function"==typeof S.default&&Object(S.default)(w),w.options.__file="webpack-app/admin/components/UserDashboard/IndividualReading/IndividualReading.vue";function y(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",e._l(e.logPair,function(t){return s("div",{staticClass:"ui field"},[s("label",[e._v(e._s(t.name))]),e._v(" "),s("div",[e._v(e._s(t.value))])])}),0)}var C=w.exports;y._withStripped=!0,_.data=function(){return this.$i18n.locale=this.config.locale,{stepName:"CollaborativeReading"}};var E=_,D=(s(281),s(283)),T=Object(f.a)(E,y,[],!1,null,"d0994b68",null);"function"==typeof D.default&&Object(D.default)(T),T.options.__file="webpack-app/admin/components/UserDashboard/CollaborativeReading/CollaborativeReading.vue";function x(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",e._l(e.logPair,function(t){return s("div",{staticClass:"ui field"},[s("label",[e._v(e._s(t.name))]),e._v(" "),s("div",[e._v(e._s(t.value))])])}),0)}var $=T.exports;x._withStripped=!0,_.data=function(){return this.$i18n.locale=this.config.locale,{stepName:"PostRecall"}};var I=_,P=(s(284),s(286)),R=Object(f.a)(I,x,[],!1,null,"2379708c",null);"function"==typeof P.default&&Object(P.default)(R),R.options.__file="webpack-app/admin/components/UserDashboard/PostRecall/PostRecall.vue";var k,M={props:["lib","status","config","progress","error","view"],data:function(){return this.$i18n.locale=this.config.locale,{toc:null,user:{readingProgresses:[]}}},components:{PreImaginary:g,IndividualReading:C,CollaborativeReading:$,PostRecall:R.exports},computed:{webpagePath:function(){if("string"==typeof this.status.webpageURL)return"/"+this.status.webpageURL.split("/").slice(3).join("/")},username:function(){if("string"!=typeof this.user.username)return"";var t=this.user.username;return"string"==typeof this.user.display_name&&this.user.username!==this.user.display_name&&(t=t+" ("+this.user.display_name+")"),t}},mounted:function(){this.initDashboard(),this.toc=this.$refs.toc},methods:{initDashboard:(k=l()(r.a.mark(function t(){var e,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e={webpageID:this.$route.params.webpageID,userID:this.$route.params.userID},t.next=3,this.lib.AxiosHelper.get("/admin/UserDashboard/info",e);case 3:s=t.sent,this.user=s.user,console.log(this.user),this.status.webpageURL=s.webpageURL,this.status.title=this.$t("Dashboard")+" "+this.username;case 8:case"end":return t.stop()}},t,this)})),function(){return k.apply(this,arguments)}),attrHeaderID:function(t){return"/user-dashboard/"+this.$route.params.webpageID+"/"+this.$route.params.userID+"/"+t},stepIcon:function(t){return t.isCompleted?"checkmark":"number"==typeof t.start_timestamp?"play":"hourglass"}}},A=(s(287),s(289)),O=Object(f.a)(M,a,[],!1,null,"68468aa6",null);"function"==typeof A.default&&Object(A.default)(O),O.options.__file="webpack-app/admin/components/UserDashboard/UserDashboard.vue";e.default=O.exports}}]);