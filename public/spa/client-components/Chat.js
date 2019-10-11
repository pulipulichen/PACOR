(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{113:function(t,e,s){"use strict";var i=s(73);s.n(i).a},114:function(t,e,s){(t.exports=s(16)(!1)).push([t.i,".chat-list[data-v-60defd64]{max-height:11rem;overflow-y:auto;border:1px solid #ccc;border-radius:.5rem}input[type=file][data-v-60defd64]{display:none!important}.extra.text[data-v-60defd64]  a>img{border:1px solid #ccc;max-height:250px!important;max-width:250px!important;width:auto!important;height:auto!important}",""])},115:function(t,e,s){"use strict";var i=s(74),a=s.n(i);e.default=a.a},117:function(t,e,s){"use strict";s.r(e);function i(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"ui form segment"},[s("div",{ref:"ChatList",staticClass:"ui large feed chat-list"},e._l(e.displayMessages,function(t){return s("div",{staticClass:"event"},[e._m(0,!0),e._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"summary"},[e._v("\r\n          "+e._s(t.user.username)+"\r\n          "),s("div",{staticClass:"date"},[e._v("\r\n            "+e._s(e.displayAge(t.timestamp))+"\r\n          ")])]),e._v(" "),s("div",{staticClass:"extra text",domProps:{innerHTML:e._s(t.message)}})])])}),0),e._v(" "),s("div",{staticClass:"unstackable inline fields"},[s("div",{staticClass:"eight wide field"},[s("label",{attrs:{for:"WritingMessage"}},[e._v("\r\n          "+e._s(e.status.username)+"\r\n        ")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.writingMessage,expression:"writingMessage"}],attrs:{type:"text",id:"WritingMessage"},domProps:{value:e.writingMessage},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.insert(t)},input:function(t){t.target.composing||(e.writingMessage=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"two wide field"},[s("input",{ref:"UploadInput",attrs:{type:"file",name:"picture"},on:{change:e.upload}}),e._v(" "),s("button",{staticClass:"ui fluid button",attrs:{type:"button"},on:{click:e.uploadTrigger}},[e._v("\r\n        "+e._s(e.$t("Upload Image"))+"\r\n      ")])]),e._v(" "),s("div",{staticClass:"two wide field"},[s("button",{staticClass:"ui fluid button",class:{disabled:""===e.writingMessage.trim(),green:""!==e.writingMessage.trim()},attrs:{type:"button"},on:{click:e.insert}},[e._v("\r\n        "+e._s(e.$t("Send"))+"\r\n      ")])]),e._v(" "),s("div",{staticClass:"two wide field"},[s("button",{staticClass:"ui fluid button",attrs:{type:"button"},on:{click:e.openAdmin}},[e._v("\r\n        "+e._s(e.$t("Admin"))+"\r\n      ")])]),e._v(" "),s("div",{staticClass:"two wide field"},[s("button",{staticClass:"ui fluid button",attrs:{type:"button"},on:{click:e.logout}},[e._v("\r\n        "+e._s(e.$t("Logout"))+"\r\n      ")])])])])}i._withStripped=!0;var a,n,r,o,l,c=s(0),u=s.n(c),p=s(1),d=s.n(p),g={props:["lib","status","config","progress","error","view"],data:function(){return this.$i18n.locale=this.config.locale,{displayMessages:[],lastDisplayMessagesLength:0,writingMessage:"",lastUpdateTimestamp:null,stopSync:!1,syncIntervalMS:5e3}},computed:{},watch:{displayMessages:function(){if(this.displayMessages.length>this.lastDisplayMessagesLength){this.lastDisplayMessagesLength=this.displayMessages.length;var t=this.$refs.ChatList;setTimeout(function(){t.scrollTop=t.scrollHeight},100)}}},mounted:function(){this.initDisplayMessages()},destroyed:function(){this.stopSync=!0},methods:{initDisplayMessages:(l=d()(u.a.mark(function t(){var e,s=this;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.lib.AxiosHelper.get("/client/message/list");case 2:if(e=t.sent,!1===Array.isArray(e))return t.abrupt("return",!1);t.next=5;break;case 5:this.displayMessages=e,this.lastUpdateTimestamp=this.getTime(),setTimeout(function(){s.syncDisplayMessages()},this.syncIntervalMS);case 8:case"end":return t.stop()}},t,this)})),function(){return l.apply(this,arguments)}),syncDisplayMessages:(o=d()(u.a.mark(function t(){var e,s=this;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!0===this.stopSync)return t.abrupt("return",!1);t.next=2;break;case 2:return t.next=4,this.lib.AxiosHelper.get("/client/message/sync-list",{lastUpdateTimestamp:this.lastUpdateTimestamp},function(t){console.error("Sync messages fail.")});case 4:if(e=t.sent,!1===Array.isArray(e))return t.abrupt("return",!1);t.next=7;break;case 7:this.displayMessages=this.displayMessages.concat(e),this.lastUpdateTimestamp=this.getTime(),setTimeout(function(){s.syncDisplayMessages()},this.syncIntervalMS);case 10:case"end":return t.stop()}},t,this)})),function(){return o.apply(this,arguments)}),getTime:function(){return(new Date).getTime()},insert:(r=d()(u.a.mark(function t(){var e;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.lib.AxiosHelper.post("/client/message/insert",{message:this.writingMessage});case 2:e=t.sent,this.displayMessages.push({user:{username:this.status.username},message:this.writingMessage,timestamp:e}),this.writingMessage="";case 5:case"end":return t.stop()}},t,this)})),function(){return r.apply(this,arguments)}),logout:(n=d()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.lib.AxiosHelper.get("/client/user/logout");case 2:this.status.username=!1,this.view="Login";case 4:case"end":return t.stop()}},t,this)})),function(){return n.apply(this,arguments)}),displayAge:function(t){return this.lib.DayJSHelper.fromNow(t)},openAdmin:function(){var t=location.href;0<t.indexOf("#")&&(t=t.slice(0,t.indexOf("#")));var e="".concat(this.config.baseURL,"/admin#/?origin=").concat(t);window.open(e,"admin")},uploadTrigger:function(){this.$refs.UploadInput.click()},upload:(a=d()(u.a.mark(function t(){var e,s,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.lib.AxiosHelper.upload("/client/message/upload",{message_picture:this.$refs.UploadInput});case 2:e=t.sent,s=e.url,i='<a href="'.concat(s,'" target="_blank"><img src="').concat(s,'" /></a>'),this.displayMessages.push({user:{username:this.status.username},message:i,timestamp:e.timestamp}),this.$refs.UploadInput.value="";case 7:case"end":return t.stop()}},t,this)})),function(){return a.apply(this,arguments)})}},f=(s(113),s(4)),h=s(115),m=Object(f.a)(g,i,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"label"},[e("i",{staticClass:"pencil alternate icon"})])}],!1,null,"60defd64",null);"function"==typeof h.default&&Object(h.default)(m),m.options.__file="webpack-app/client/components/Chat/Chat.vue";e.default=m.exports},73:function(t,e,s){var i=s(114);"string"==typeof i&&(i=[[t.i,i,""]]);var a={insert:"head",singleton:!1};s(17)(i,a);i.locals&&(t.exports=i.locals)},74:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{},"zh-TW":{"Upload Image":"送出圖片","Send":"送出","Logout":"登出","Admin":"管理"}}'),delete t.options._Ctor}}}]);