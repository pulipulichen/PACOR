import Vue from 'vue'
Vue.config.devtools = false
Vue.config.productionTip = false

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import VueFab from './vue-floating-action-button/index.js'
Vue.use(VueFab, /* {
//  ----------------------
//  // opitons 可选iconfont图标或MaterialIcons
//  iconType: 'MaterialDesign'
//  // iconType: 'iconfont'
} */)