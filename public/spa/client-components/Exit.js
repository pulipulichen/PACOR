(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{418:function(t,i,e){var o=e(643);"string"==typeof o&&(o=[[t.i,o,""]]);var s={insert:"head",singleton:!1};e(7)(o,s);o.locals&&(t.exports=o.locals)},419:function(t,i){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"en":{"For {0}: Congratulation! You finished reading.":"For {0}: Congratulation! You finished reading."},"zh-TW":{"Thank you for your reading":"感謝您的閱讀","Congratulation! You finished reading.":"恭喜您讀完了！","CLOSE WINDOW":"關閉視窗","For {0}: Congratulation! You finished reading.":"{0}：恭喜您讀完了！"}}'),delete t.options._Ctor}},642:function(t,i,e){"use strict";var o=e(418);e.n(o).a},643:function(t,i,e){(t.exports=e(6)(!1)).push([t.i,"img[data-v-6bbe48c7]{width:100px}.firework-overlay[data-v-6bbe48c7]{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999;background-color:#000}.firework-overlay .firework-container[data-v-6bbe48c7]{width:100vw;height:calc(100vh - 17em);margin-top:17em;text-align:center}.firework-overlay .firework-container[data-v-6bbe48c7]  #fireworksField{top:auto!important;bottom:0;width:80vw!important;height:auto!important;position:static!important}",""])},644:function(t,i,e){"use strict";var o=e(419),s=e.n(o);i.default=s.a},723:function(t,i,e){"use strict";e.r(i);function o(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"Exit"},[e("modal",{ref:"ExitModal",staticClass:"ExitModal",attrs:{config:t.config,status:t.status,progress:t.progress,lib:t.lib,dimmer:"transparent",cancelable:"false"},scopedSlots:t._u([{key:"header",fn:function(){return[t._v("\r\n      "+t._s(t.$t("Thank you for your reading"))+"\r\n    ")]},proxy:!0},{key:"content",fn:function(){return[e("div",{staticClass:"ui middle aligned grid"},[e("div",{staticClass:"four wide column"},[e("img",{staticClass:"ui image",attrs:{src:t.status.avatar}})]),t._v(" "),e("div",{staticClass:"twelve wide column"},[e("h1",{staticClass:"ui header"},[t._v("\r\n            "+t._s(t.$t("For {0}: Congratulation! You finished reading.",[t.username]))+"\r\n          ")])])])]},proxy:!0},{key:"actions",fn:function(){return[e("div",{staticClass:"ui button",on:{click:t.logout}},[t._v(t._s(t.$t("LOGOUT")))]),t._v(" "),e("div",{staticClass:"ui button",on:{click:t.exit}},[t._v(t._s(t.$t("CLOSE WINDOW")))])]},proxy:!0}])}),t._v(" "),e("div",{staticClass:"firework-overlay"},[e("div",{ref:"FireworkOverlay",staticClass:"firework-container"})])],1)}o._withStripped=!0;var s,a=e(0),r=e.n(a),n=e(1),h=e.n(n),l=e(3),c=e.n(l);(s=c.a).fn.fireworks=function(h){(h=h||{}).sound=!1,h.opacity=h.opacity||1,h.width=h.width||s(this).width(),h.height=h.height||s(this).height();var l,c=[],a=[],r=h.width,n=h.height,p=[];h.sound&&(l=document.createElement("audio"));var d=document.createElement("canvas");d.id="fireworksField",d.width=r,d.height=n,d.style.width=r+"px",d.style.height=n+"px",d.style.position="absolute",d.style.top="0px",d.style.left="0px",d.style.opacity=h.opacity;var u=d.getContext("2d");function f(t){this.pos={x:t?t.x:0,y:t?t.y:0},this.vel={x:0,y:0},this.shrink=.97,this.size=2,this.resistance=1,this.gravity=0,this.flick=!1,this.alpha=1,this.fade=0,this.color=0}function e(t){f.apply(this,[{x:t,y:n}]),this.explosionColor=0}return f.prototype.update=function(){this.vel.x*=this.resistance,this.vel.y*=this.resistance,this.vel.y+=this.gravity,this.pos.x+=this.vel.x,this.pos.y+=this.vel.y,this.size*=this.shrink,this.alpha-=this.fade},f.prototype.render=function(t){if(this.exists()){t.save(),t.globalCompositeOperation="lighter";var i=this.pos.x,e=this.pos.y,o=this.size/2,s=t.createRadialGradient(i,e,.1,i,e,o);s.addColorStop(.1,"rgba(255,255,255,"+this.alpha+")"),s.addColorStop(.8,"hsla("+this.color+", 100%, 50%, "+this.alpha+")"),s.addColorStop(1,"hsla("+this.color+", 100%, 50%, 0.1)"),t.fillStyle=s,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.flick?Math.random()*this.size:this.size,0,2*Math.PI,!0),t.closePath(),t.fill(),t.restore()}},f.prototype.exists=function(){return.1<=this.alpha&&1<=this.size},((e.prototype=new f).constructor=e).prototype.explode=function(){if(h.sound){var t=(i=0,e=2,i=Math.ceil(i),e=Math.floor(e),Math.floor(Math.random()*(e-i+1))+i);l.src=p[t].prefix+p[t].data,l.play()}for(var i,e,o=10*Math.random()+80,s=0;s<o;s++){var a=new f(this.pos),r=Math.random()*Math.PI*2,n=15*Math.cos(Math.random()*Math.PI/2);a.vel.x=Math.cos(r)*n,a.vel.y=Math.sin(r)*n,a.size=10,a.gravity=.2,a.resistance=.92,a.shrink=.05*Math.random()+.93,a.flick=!0,a.color=this.explosionColor,c.push(a)}},e.prototype.render=function(t){if(this.exists()){t.save(),t.globalCompositeOperation="lighter";var i=this.pos.x,e=this.pos.y,o=this.size/2,s=t.createRadialGradient(i,e,.1,i,e,o);s.addColorStop(.1,"rgba(255, 255, 255 ,"+this.alpha+")"),s.addColorStop(1,"rgba(0, 0, 0, "+this.alpha+")"),t.fillStyle=s,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.flick?Math.random()*this.size/2+this.size/2:this.size,0,2*Math.PI,!0),t.closePath(),t.fill(),t.restore()}},s(this).append(d),setInterval(function(){!function(t){if(a.length<10){var i=new e(t);i.explosionColor=10*Math.floor(360*Math.random()/10),i.vel.y=-3*Math.random()-4,i.vel.x=6*Math.random()-3,i.size=8,i.shrink=.999,i.gravity=.01,a.push(i)}}(r/2)},800),setInterval(function(){r!=window.innerWidth&&(d.width=r=window.innerWidth),n!=window.innerHeight&&(d.height=n=window.innerHeight),u.fillStyle="rgba(0, 0, 0, 0.05)",u.fillRect(0,0,r,n);for(var t=[],i=0;i<a.length;i++){a[i].update(),a[i].render(u);var e=Math.sqrt(Math.pow(r-a[i].pos.x,2)+Math.pow(n-a[i].pos.y,2)),o=a[i].pos.y<2*n/3&&100*Math.random()<=1;a[i].pos.y<n/5||0<=a[i].vel.y||e<50||o?a[i].explode():t.push(a[i])}a=t;var s=[];for(i=0;i<c.length;i++)c[i].update(),c[i].exists()&&(c[i].render(u),s.push(c[i]));for(c=s;400<c.length;)c.shift()},20),this};var p,d,u,f={props:["lib","status","config","progress","error","view"],data:function(){return this.$i18n.locale=this.config.locale,{}},computed:{username:function(){return this.lib.auth.username}},mounted:function(){this.$refs.ExitModal.show(),this.startFirework()},methods:{logout:(u=h()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.$refs.ExitModal.hide(),this.lib.auth.logout();case 2:case"end":return t.stop()}},t,this)})),function(){return u.apply(this,arguments)}),exit:(d=h()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.lib.AxiosHelper.get("/client/auth/logout");case 2:window.close();case 3:case"end":return t.stop()}},t,this)})),function(){return d.apply(this,arguments)}),startFirework:(p=h()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:c()(this.$refs.FireworkOverlay).fireworks({opacity:.9});case 1:case"end":return t.stop()}},t,this)})),function(){return p.apply(this,arguments)})}},v=(e(642),e(2)),g=e(644),y=Object(v.a)(f,o,[],!1,null,"6bbe48c7",null);"function"==typeof g.default&&Object(g.default)(y),y.options.__file="webpack-app/client/Exit/Exit.vue";i.default=y.exports}}]);