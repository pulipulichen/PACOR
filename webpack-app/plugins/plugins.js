import Vue from 'vue'
Vue.config.devtools = false
Vue.config.productionTip = false

import './../styles/global.less'

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import VueFab from 'vue-float-action-button'
Vue.use(VueFab, /* {
  ----------------------
  // opitons 可选iconfont图标或MaterialIcons
  iconType: 'MaterialDesign'
  // iconType: 'iconfont'
} */)