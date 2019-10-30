import FAB from './fab.vue'
import FABItem from './fab-item.vue'
import FABCantainer from './fab-cantainer.vue'
import util from './util'

const testSafariBrower = util.testSafariBrower
const handleSafariBodyClickNotWorkEvent = util.handleSafariBodyClickNotWorkEvent
const listenClick = util.listenClick

function install (Vue, options) {
  if (options && options.iconType) {
    FAB.props.iconType.default = options.iconType
  }
  Vue.component(FAB.name, FAB)
  Vue.component(FABItem.name, FABItem)
  Vue.component(FABCantainer.name, FABCantainer)
  Vue.directive('click-outside', {
    bind: (el, binding, vnode) => {
      el.__clickOutside__ = listenClick
      // 处理safari浏览器body对象无法响应click事件
      handleSafariBodyClickNotWorkEvent(listenClick, testSafariBrower(), {
        el, binding
      })
    },
    unbind: (el, binding) => {
      if (testSafariBrower()) {
        document.removeEventListener('click', el.__clickOutside__)
      } else {
        document.querySelector('html').removeEventListener('click', el.__clickOutside__)
      }
    }
  })
}

export default install
