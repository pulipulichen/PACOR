let handleClass = (type = 'MaterialDesign', iconClass = '') => {
  return type === 'MaterialDesign' ? 'material-icons' : 'iconfont icon-' + iconClass
}

/**
 * @method testSafariBrower 处理safari浏览器body无法响应click事件
 * @return { Boolean } true / false
 */
const testSafariBrower = (userAgent = null) => {
  let UA = null
  userAgent ? UA = userAgent : UA = window.navigator.userAgent
  if (/iPad/i.test(UA) || /iPhone/i.test(UA) || /Mac/i.test(UA)) {
    return true
  } else {
    return false
  }
}

class TimeoutClass {
  construct() {
    this.timer = null
  }
  
  handleTimeout () {
    return new Promise(resolve => {
      this.timer = setTimeout(() => {
        resolve(true)
      }, 300)
    })
  }
  handleClearTimeout () {
    clearTimeout(this.timer)
    this.timer = null
  }
}

const Timeout = function () {
  return new TimeoutClass()
}

const handleSafariBodyClickNotWorkEvent = (callBack, isSafari, obj) => {
  if (isSafari) {
    let html = document.querySelector('html')
    html.setAttribute('class', 'setCursor')
    html.addEventListener('click', (e) => callBack(obj, e))
  } else {
    window.addEventListener('click', (e) => callBack(obj, e))
  }
}

const listenClick = (obj, e) => {
  if (obj.el.contains(e.target) || e.target.dataset.outside) {
    return false
  }
  return obj.binding.value()
}

export default {
    handleClass: handleClass,
    testSafariBrower: testSafariBrower,
    Timeout: Timeout,
    handleSafariBodyClickNotWorkEvent: handleSafariBodyClickNotWorkEvent,
    listenClick: listenClick
}