(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{407:function(t,n,i){var a=i(625);"string"==typeof a&&(a=[[t.i,a,""]]);var e={insert:"head",singleton:!1};i(7)(a,e);a.locals&&(t.exports=a.locals)},408:function(t,n){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}'),delete t.options._Ctor}},624:function(t,n,i){"use strict";var a=i(407);i.n(a).a},625:function(t,n,i){(t.exports=i(6)(!1)).push([t.i,"",""])},626:function(t,n,i){"use strict";var a=i(408),e=i.n(a);n.default=e.a},730:function(t,n,i){"use strict";i.r(n);function a(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"CollaborativeReading"},[i("instruction-message",{ref:"InstructionMessage",attrs:{config:t.config,status:t.status,lib:t.lib}}),t._v(" "),i("rangy",{ref:"RangyManager",attrs:{status:t.status,lib:t.lib}}),t._v(" "),i("annotation-panel",{ref:"AnnotationPanel",attrs:{config:t.config,status:t.status,lib:t.lib}}),t._v(" "),i("navigation-items",{ref:"nav",attrs:{config:t.config,status:t.status,lib:t.lib},on:{showInstruction:t.showInstruction,timeup:t.timeup}}),t._v(" "),i("annotation-manager",{ref:"AnnotationManager",attrs:{config:t.config,status:t.status,lib:t.lib}}),t._v(" "),i("section-manager",{ref:"SectionManager",attrs:{config:t.config,status:t.status,lib:t.lib}}),t._v(" "),i("search-manager",{ref:"SearchManager",attrs:{config:t.config,status:t.status,lib:t.lib}}),t._v(" "),i("activity-timer",{attrs:{config:t.config,lib:t.lib}}),t._v(" "),i("notification-manager",{ref:"NotificationManager",attrs:{config:t.config,status:t.status,lib:t.lib}})],1)}a._withStripped=!0;var e,s=i(0),o=i.n(s),r=i(1),l=i.n(r),c=i(470),u=(i(3),i(469)),f={props:["lib","status","config"],data:function(){return{}},components:{"navigation-items":c.a},mounted:(e=l()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.initComponentToLib();case 1:case"end":return t.stop()}},t,this)})),function(){return e.apply(this,arguments)}),destroyed:function(){this.lib.RangyManager=null,this.lib.AnnotationPanel=null,this.lib.SectionManager=null,this.lib.UserFilter=null,this.lib.AnnotationTypeFilter=null,this.lib.NotificationManager=null},methods:{initComponentToLib:function(){var t=this;if(!this.$refs.RangyManager)return setTimeout(function(){t.initComponentToLib()},100),!1;this.lib.RangyManager=this.$refs.RangyManager,this.lib.AnnotationPanel=this.$refs.AnnotationPanel,this.lib.SectionManager=this.$refs.SectionManager,this.lib.NotificationManager=this.$refs.NotificationManager,this.initNavComponentToLib()},initNavComponentToLib:function(){var t=this;if(!this.$refs.nav.$refs.UserFilter)return setTimeout(function(){t.initNavComponentToLib()},100),!1;this.lib.UserFilter=this.$refs.nav.$refs.UserFilter,this.lib.AnnotationTypeFilter=this.$refs.nav.$refs.AnnotationTypeFilter},showInstruction:function(){this.$refs.InstructionMessage.show()},timeup:function(){this.lib.auth.nextStep()}}};Object(u.a)(f);var g=f,b=(i(624),i(2)),p=i(626),h=Object(b.a)(g,a,[],!1,null,"b99d6bf8",null);"function"==typeof p.default&&Object(p.default)(h),h.options.__file="webpack-app/client/Reading/CollaborativeReading/CollaborativeReading.vue";n.default=h.exports}}]);