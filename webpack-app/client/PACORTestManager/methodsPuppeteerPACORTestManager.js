import $ from 'jquery'

export default function (PACORTestManager) {

  PACORTestManager.methods.log = function (...args) {
    console.log.apply(this, args)
    
    if (typeof(window.PACORTestManagerLog) === 'function') {
      window.PACORTestManagerLog.apply(this, args)
    }
  }
  
  PACORTestManager.methods.interact = async function (method, selector, ...args) {
    if (typeof(window.PACORTestManagerInteractions) !== 'function') {
      return null
    }
    
    if (typeof(selector) === 'string') {
      let ele = $(selector)
      
      if (ele.length === 0) {
        throw new Error('Element not found: ' + selector)
      }
      
      let tmpClassName = 'PACORTestManagerInteractions-' + (new Date()).getTime()
      ele.addClass(tmpClassName)
      await this.sleep(100)
      
      args.unshift('.' + tmpClassName)
      args.unshift(method)
      await window.PACORTestManagerInteractions.apply(this, args)
    }
    else {
      let tmpClassName = 'PACORTestManagerInteractions-' + (new Date()).getTime()
      selector.addClass(tmpClassName)
      
      await this.sleep(100)
      args.unshift('.' + tmpClassName)
      args.unshift(method)
      await window.PACORTestManagerInteractions.apply(this, args)
      
      //await this.sleep(600)
      //selector.removeClass(tmpClassName)
    }
  }
  
  PACORTestManager.methods.typeInput = async function (selector, text) {
    if (typeof(window.PACORTestManagerInteractions) === 'function') {
      await this.interact('type', selector, text)
    }
    else {
      let ele = selector
      if (typeof(ele) === 'string') {
        ele = $(selector)
      }
      let tagName = ele.prop('tagName').toLowerCase()
      if (tagName === 'input'
              || tagName === 'textarea') {
        ele.val(text)
      }
      else {
        ele.html(text)
      }
    }
  }
  
  PACORTestManager.methods.click = async function (selector) {
    if (typeof(window.PACORTestManagerInteractions) === 'function') {
      await this.interact('click', selector)
    }
    else {
      let ele = selector
      if (typeof(ele) === 'string') {
        ele = $(selector)
      }
      ele.click()
    }
  }
}