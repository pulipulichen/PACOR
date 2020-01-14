import Vue from 'vue'

/**
 * https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/use_with/vue.md
 */
//import iFrameResize from 'iframe-resizer/js/iframeResizer'
import iFrameResize from './iframeResizer/iframeResizer.js'

Vue.directive('resize', {
  bind: function(el, { value = {} }) {
    el.addEventListener('load', () => iFrameResize(value, el))
  }
})