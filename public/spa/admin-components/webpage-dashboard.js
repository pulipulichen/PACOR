(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{159:function(t,s,e){var a=e(261);"string"==typeof a&&(a=[[t.i,a,""]]);var r={insert:"head",singleton:!1};e(6)(a,r);a.locals&&(t.exports=a.locals)},160:function(t,s){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"TEST_MESSAGE":"測試訊息"}}'),delete t.options._Ctor}},161:function(t,s,e){var a=e(264);"string"==typeof a&&(a=[[t.i,a,""]]);var r={insert:"head",singleton:!1};e(6)(a,r);a.locals&&(t.exports=a.locals)},162:function(t,s){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"Groups":"小組資訊","Group":"小組"}}'),delete t.options._Ctor}},163:function(t,s,e){var a=e(267);"string"==typeof a&&(a=[[t.i,a,""]]);var r={insert:"head",singleton:!1};e(6)(a,r);a.locals&&(t.exports=a.locals)},164:function(t,s){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"TEST_MESSAGE":"Test Message"},"zh-TW":{"GROUP":"小組"}}'),delete t.options._Ctor}},260:function(t,s,e){"use strict";var a=e(159);e.n(a).a},261:function(t,s,e){(t.exports=e(5)(!1)).push([t.i,"",""])},262:function(t,s,e){"use strict";var a=e(160),r=e.n(a);s.default=r.a},263:function(t,s,e){"use strict";var a=e(161);e.n(a).a},264:function(t,s,e){(t.exports=e(5)(!1)).push([t.i,"h4[data-v-2671bcbe]{margin-top:1rem!important}",""])},265:function(t,s,e){"use strict";var a=e(162),r=e.n(a);s.default=r.a},266:function(t,s,e){"use strict";var a=e(163);e.n(a).a},267:function(t,s,e){(t.exports=e(5)(!1)).push([t.i,".header h2[data-v-4e86c872],.header h3[data-v-4e86c872]{margin:0}.header h2[data-v-4e86c872]{word-break:break-all;width:calc(100vw - 39rem);min-width:10rem}",""])},268:function(t,s,e){"use strict";var a=e(164),r=e.n(a);s.default=r.a},287:function(t,s,e){"use strict";e.r(s);function a(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"ui form"},[e("div",{staticClass:"ui secondary menu"},[e("a",{staticClass:"icon item",attrs:{href:"#/webpage/"+t.$route.params.webpageID+"/list"}},[e("i",{staticClass:"angle left icon"})]),t._v(" "),e("div",{staticClass:"item"},[e("div",{staticClass:"ui header"},[e("div",{staticClass:"content"},[e("div",{staticClass:"sub header"},[t._v("\r\n            "+t._s(t.$t("Dashboard"))+"\r\n          ")]),t._v(" "),e("h2",[t._v(t._s(t.webpagePath))])])])]),t._v(" "),e("div",{staticClass:"right menu"},[e("a",{staticClass:"ui item",attrs:{href:t.status.webpageURL,target:"_blank"}},[e("i",{staticClass:"external link icon"}),t._v("\r\n        "+t._s(t.$t("Open Webpage"))+"\r\n      ")]),t._v(" "),(t.status.role="global_admin")?e("a",{staticClass:"ui item",attrs:{href:"/admin/Database/admin?table=webpages",target:"_blank"}},[e("i",{staticClass:"database icon"}),t._v("\r\n        "+t._s(t.$t("Database"))+"\r\n      ")]):t._e()])]),t._v(" "),e("table-of-contents",{ref:"toc",attrs:{config:t.config,lib:t.lib,headings:"h3, h4"}}),t._v(" "),e("webpage-dashboard-groups",{ref:"auth",attrs:{config:t.config,status:t.status,progress:t.progress,lib:t.lib,error:t.error}})],1)}a._withStripped=!0;function r(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"ui segment"},[e("h3",{staticClass:"ui header",attrs:{id:s.attrHeaderID("dashboard-groups")}},[s._v("\r\n    "+s._s(s.$t("Groups"))+"\r\n  ")]),s._v(" "),s._l(s.groups,function(t){return e("div",[e("h4",{attrs:{id:s.attrHeaderID("dashboard-group"+(t.group_seq_id+1))}},[s._v("\r\n      "+s._s(s.$t("Group"))+" #"+s._s(t.group_seq_id+1)+"\r\n    ")]),s._v(" "),e("div",{staticClass:"ui cards"},[s._l(t.users,function(t){return[e("reader-card",{attrs:{user:t,lib:s.lib,status:s.status,config:s.config}})]})],2)])}),s._v(" "),0<s.notInGroup.users.length?[e("div",{staticClass:"ui divider"}),s._v(" "),e("div",[e("h4",{attrs:{id:s.attrHeaderID("dashboard-not-in-group")}},[s._v("\r\n        "+s._s(s.$t("Readers Not In Group"))+"\r\n      ")]),s._v(" "),e("div",{staticClass:"ui cards"},[s._l(s.notInGroup.users,function(t){return[e("reader-card",{attrs:{user:t,lib:s.lib,status:s.status,config:s.config}})]})],2)])]:s._e()],2)}function i(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"card"},[e("div",{staticClass:"content"},[e("img",{staticClass:"right floated mini ui image",attrs:{src:t.user.avatar_url}}),t._v(" "),e("a",{staticClass:"header",attrs:{href:t.userDashboardLink}},[t._v("\r\n      "+t._s(t.user.username)+"\r\n      "),t.user.username!==t.user.display_name?[t._v("\r\n        ("+t._s(t.user.display_name)+")\r\n      ")]:t._e()],2),t._v(" "),e("div",{staticClass:"meta"},[e("step-progress-bar",{attrs:{lib:t.lib,config:t.config,progresses:t.user.readingProgresses}})],1),t._v(" "),t.user.currentReadingSummary?e("div",{staticClass:"description"},[t._v("\r\n      "+t._s(t.user.currentReadingSummary)+"\r\n    ")]):t._e(),t._v(" "),e("div",{staticClass:"extra content"},[e("div",{staticClass:"ui fluid buttons"},[e("a",{staticClass:"ui button",attrs:{href:t.userDashboardLink}},[t._v("\r\n          "+t._s(t.$t("VIEW"))+"\r\n        ")])])])])])}var n=e(0),o=e.n(n),u=e(2),c=e.n(u);i._withStripped=r._withStripped=!0;var p={props:["lib","status","config","user"],data:function(){return this.$i18n.locale=this.config.locale,{}},components:{},computed:{userDashboardLink:function(){return"#/user-dashboard/"+this.$route.params.webpageID+"/"+this.user.id}},watch:{},mounted:function(){},methods:{}},d=(e(260),e(4)),l=e(262),h=Object(d.a)(p,i,[],!1,null,"08d6c526",null);"function"==typeof l.default&&Object(l.default)(h),h.options.__file="webpack-app/admin/components/WebpageDashboard/WebpageDashboardGroups/ReaderCard/ReaderCard.vue";var f,b={props:["lib","status","config","progress","error","toc"],data:function(){return this.$i18n.locale=this.config.locale,{groups:[],notInGroup:{users:[]}}},components:{"reader-card":h.exports},computed:{},watch:{},mounted:function(){this.initGroups()},methods:{initGroups:(f=c()(o.a.mark(function t(){var s,e,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s={webpageID:this.$route.params.webpageID},t.next=3,this.lib.AxiosHelper.get("/admin/WebpageDashboard/groups",s);case 3:for(a in e=t.sent)this[a]=e[a];this.$parent.$refs.toc.refresh();case 6:case"end":return t.stop()}},t,this)})),function(){return f.apply(this,arguments)}),attrHeaderID:function(t){return"/webpage-dashboard/"+this.$route.params.webpageID+"/"+t}}},_=(e(263),e(265)),g=Object(d.a)(b,r,[],!1,null,"2671bcbe",null);"function"==typeof _.default&&Object(_.default)(g),g.options.__file="webpack-app/admin/components/WebpageDashboard/WebpageDashboardGroups/WebpageDashboardGroups.vue";var v,m={props:["lib","status","config","progress","error","view"],data:function(){return this.$i18n.locale=this.config.locale,{}},components:{"webpage-dashboard-groups":g.exports},computed:{webpagePath:function(){if("string"==typeof this.status.webpageURL)return"/"+this.status.webpageURL.split("/").slice(3).join("/")}},watch:{},mounted:function(){this.initDashboard()},methods:{initDashboard:(v=c()(o.a.mark(function t(){var s,e;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s={webpageID:this.$route.params.webpageID},t.next=3,this.lib.AxiosHelper.get("/admin/WebpageDashboard/info",s);case 3:e=t.sent,this.status.webpageURL=e.webpageURL,this.status.title=this.$t("Dashboard")+" "+this.webpagePath;case 6:case"end":return t.stop()}},t,this)})),function(){return v.apply(this,arguments)})}},w=(e(266),e(268)),C=Object(d.a)(m,a,[],!1,null,"4e86c872",null);"function"==typeof w.default&&Object(w.default)(C),C.options.__file="webpack-app/admin/components/WebpageDashboard/WebpageDashboard.vue";s.default=C.exports}}]);