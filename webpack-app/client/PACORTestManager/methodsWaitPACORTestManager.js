import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.waitForElement = async function (baseElement, selector, maxWaitMS) {
    if (maxWaitMS === undefined && typeof(baseElement) === 'string') {
      maxWaitMS = selector
      selector = baseElement
      baseElement = undefined
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
  
  PACORTestManager.methods.waitForElementVisible = async function (baseElement, selector, maxWaitMS) {
    if (maxWaitMS === undefined && typeof(baseElement) === 'string') {
      maxWaitMS = selector
      selector = baseElement
      baseElement = undefined
    }
    
    if (selector.endsWith(':visible') === false) {
      selector = selector + ':visible'
    }
    
    return await this.waitForElement(baseElement, selector, maxWaitMS)
  } // PACORTestManager.methods.waitForElementVisible = async function (selector, maxWaitMS) {
  
  PACORTestManager.methods.waitForElementHidden = async function (baseElement, selector, maxWaitMS) {
    if (maxWaitMS === undefined && typeof(baseElement) === 'string') {
      maxWaitMS = selector
      selector = baseElement
      baseElement = undefined
    }
    
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
            return reject('Element still visible: ' + selector)
          }
          
          setTimeout(() => {
            check()
          }, 500)
        }
      }
      
      check()
    })
  } // PACORTestManager.methods.waitForElementVisible = async function (selector, maxWaitMS) {
  
  PACORTestManager.methods.waitForElementVisibleClick = async function (baseElement, selector, maxWaitMS) {
    let $ele = await this.waitForElementVisible(baseElement, selector, maxWaitMS)
    if (typeof($ele.click) === 'function') {
      $ele.click()
    }
    
    return $ele
  }
}