import Vue from 'vue'
Vue.config.devtools = false
Vue.config.productionTip = false

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import VueFab from './../components/vue-floating-action-button/index.js'
Vue.use(VueFab, /* {
//  ----------------------
//  // opitons 可选iconfont图标或MaterialIcons
//  iconType: 'MaterialDesign'
//  // iconType: 'iconfont'
} */)


/**
 * https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/use_with/vue.md
 */
import iFrameResize from 'iframe-resizer/js/iframeResizer'

Vue.directive('resize', {
  bind: function(el, { value = {} }) {
    el.addEventListener('load', () => iFrameResize(value, el))
  }
})