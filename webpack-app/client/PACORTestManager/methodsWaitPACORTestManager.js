import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.waitForElement = async function (selector, options = {}) {
    let {
      timeout,
      baseElement,
      errorMessage
    } = options
    
    let maxWaitMS = timeout
    
    let getElement = () => {
      if (baseElement 
              && typeof(baseElement.find) === 'function') {
        return baseElement.find(selector)
      }
      else {
        return $(selector)
      }
    }
    
    if (!maxWaitMS) {
      maxWaitMS = 150000
    }
    
    let s = getElement()
    if (s.length > 0) {
      return s
    }

    return new Promise((resolve, reject) => {
      let check = () => {
        s = getElement()
        if (s.length > 0) {
          s.eq(0)[0].scrollIntoView({
            behavior: 'smooth'
          })
          return resolve(s)
        }
        else {
          maxWaitMS = maxWaitMS - 100
          if (maxWaitMS <= 0) {
            let message = []
            if (errorMessage) {
              message.push('\n' + errorMessage)
            }
            message.push('\nElement not found: ' + selector)
            message.push(this.getStackTraceString())
            return reject(message.join(''))
          }
          
          setTimeout(() => {
            check()
          }, 100)
        }
      }
      
      check()
    })
  } // PACORTestManager.methods.waitForElement = async function (selector, maxWaitMS = 15000) {
  
  PACORTestManager.methods.waitForElementVisible = async function (selector, options) {
    
    if (selector.endsWith(':visible') === false) {
      selector = selector + ':visible'
    }
    
    return await this.waitForElement(selector, options)
  } // PACORTestManager.methods.waitForElementVisible = async function (selector, maxWaitMS) {
  
  PACORTestManager.methods.waitForElementHidden = async function (selector, options = {}) {
    let {
      timeout,
      baseElement,
      errorMessage
    } = options
    
    let maxWaitMS = timeout
    
    if (selector.endsWith(':visible') === false) {
      selector = selector + ':visible'
    }
    
    let getElement = () => {
      if (baseElement 
              && typeof(baseElement.find) === 'function') {
        return baseElement.find(selector)
      }
      else {
        return $(selector)
      }
    }
    
    if (!maxWaitMS) {
      maxWaitMS = 150000
    }
    
    let s = getElement()
    if (s.length === 0) {
      return true
    }

    return new Promise((resolve, reject) => {
      let check = () => {
        s = getElement()
        if (s.length === 0) {
          setTimeout(() => {
            resolve(true)
          }, 500)
          return 
        }
        else {
          maxWaitMS = maxWaitMS - 500
          if (maxWaitMS <= 0) {
            let message = []
            if (errorMessage) {
              message.push('\n' + errorMessage)
            }
            message.push('\nElement still visible: ' + selector)
            message.push(this.getStackTraceString())
            return reject(message.join(''))
          }
          
          setTimeout(() => {
            check()
          }, 500)
        }
      }
      
      check()
    })
  } // PACORTestManager.methods.waitForElementVisible = async function (selector, maxWaitMS) {
  
  PACORTestManager.methods.waitForElementVisibleClick = async function (selector, options) {
    let $ele = await this.waitForElementVisible(selector, options)
    
    await this.click($ele)
    //if (typeof($ele.click) === 'function') {
    //  $ele.click()
    //}
    
    return $ele
  }
  
}