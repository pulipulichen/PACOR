import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.sleep = async function (ms) {
    return await this.lib.VueHelper.sleep(ms)
  }

  PACORTestManager.methods.waitForElement = async function (selector, maxWaitMS = 15000) {
    if ($(selector).length > 0) {
      return $(selector)
    }

    return new Promise((resolve, reject) => {
      let check = () => {
        let s = $(selector)
        if (s.length > 0) {
          return resolve(s)
        }
        else {
          maxWaitMS = maxWaitMS - 500
          if (maxWaitMS <= 0) {
            return reject('Element not found: ' + selector)
          }
          
          setTimeout(() => {
            check()
          }, 500)
        }
      }
      
      check()
    })
  } // PACORTestManager.methods.waitForElement = async function (selector, maxWaitMS = 15000) {
  
  PACORTestManager.methods.waitForElementVisible = async function (selector, maxWaitMS) {
    if (selector.endsWith(':visible') === false) {
      selector = selector + ':visible'
    }
    
    return await this.waitForElement(selector, maxWaitMS)
  } // PACORTestManager.methods.waitForElementVisible = async function (selector, maxWaitMS) {
  
  PACORTestManager.methods.waitForElementVisibleClick = async function (selector, maxWaitMS) {
    let $ele = await this.waitForElementVisible(selector, maxWaitMS)
    if (typeof($ele.click) === 'function') {
      $ele.click()
    }
    
    return $ele
  }
}