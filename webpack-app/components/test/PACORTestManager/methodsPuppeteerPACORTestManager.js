/* global Element */

import $ from 'jquery'

export default function (PACORTestManager) {

//  PACORTestManager.methods.log = function (...args) {
//    console.log.apply(this, args)
//    
//    //if (typeof(window.PACORTestManagerLog) === 'function') {
//    //  window.PACORTestManagerLog.apply(this, args)
//    //}
//  }
  
  PACORTestManager.methods.interact = async function (method, selector, ...args) {
    if (typeof(window.PACORTestManagerInteractions) !== 'function') {
      return null
    }
    
    let exec = async (ele) => {
      if (isVisible(ele) === false) {
        throw new Error('\nElement is not visible: ' + this.getDomPath(ele) 
            + this.getStackTraceString())
      }
      
      let tmpClassName = 'PACORTestManagerInteractions-' + this.lib.DayJSHelper.time()
      ele.addClass(tmpClassName)
      
      await this.sleep(100)
      args.unshift('.' + tmpClassName)
      args.unshift(method)
      
      try {
        await window.PACORTestManagerInteractions.apply(this, args)
      }
      catch (e) {
        throw new Error('\nError from puppeteer: ' + e 
                + '\nElement length: ' + ele.length
                + '\nElement classList: ' + ele.prop('classList')
                + '\nElement DOM path: ' + this.getDomPath(ele)
                + this.getStackTraceString())
      }
    }
    
    if (typeof(selector) === 'string') {
      if (selector.endsWith(':visible') === false) {
        selector = selector + ':visible'
      }
      let ele = $(selector)
      
      if (ele.length === 0) {
        throw new Error('\nElement not found: ' + selector 
                + this.getStackTraceString())
      }
      
      await exec(ele)
    }
    else {
      await exec(selector)
    }
  }
  
  PACORTestManager.methods.typeInput = async function (selector, text, throwNonVisibleException) {
    if (typeof(window.PACORTestManagerInteractions) === 'function') {
      let ele = selector
      
      if (typeof(ele) === 'string') {
        if (selector.endsWith(':visible') === false) {
          selector = selector + ':visible'
        }
        ele = $(selector)
      }
      
      if (isVisible(ele) === false) {
        if (throwNonVisibleException === false) {
          console.log('\nElement is not visible: ' + this.getDomPath(ele) 
              + this.getStackTraceString())
          return undefined
        }
        else {
          throw new Error('\nElement is not visible: ' + this.getDomPath(ele) 
              + this.getStackTraceString())
        }
      }
      
      if (ele.length === 0) {
        throw new Error('Element is not found: ' + selector)
      }
      
      let tagName = ele.prop('tagName').toLowerCase()
      let value
      if (tagName === 'input'
              || tagName === 'textarea') {
        value = ele.val()
      }
      else {
        value = ele.html()
      }
      
      await this.interact('type', selector, text)
      
      await this.sleep(100)
      
      if (tagName === 'input'
              || tagName === 'textarea') {
        if (ele.val() === value) {
          console.log('資料沒改變，重寫一次', selector)
          console.log(this.getStackTraceString())
          await this.sleep(1000)
          return await this.typeInput(ele, text)
        }
      }
      else {
        if (ele.html() === value) {
          console.log('資料沒改變，重寫一次', selector)
          console.log(this.getStackTraceString())
          await this.sleep(1000)
          return await this.typeInput(ele, text)
        }
      }
      
      
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
  
  PACORTestManager.methods.getIndex = async function (selector) {
    if (typeof(window.PACORTestManagerIndex) === 'function') {
      return await window.PACORTestManagerIndex()
    }
    return 0
  }
  
  PACORTestManager.methods.getName = async function () {
    if (typeof(window.PACORTestManagerName) === 'function') {
      return await window.PACORTestManagerName()
    }
    return 0
  }
  
  let adminConfig
  PACORTestManager.methods.getAdminConfig = async function () {
    if (adminConfig) {
      return adminConfig
    }
    
    if (typeof(window.PACORTestManagerAdminConfig) === 'function') {
      adminConfig = await window.PACORTestManagerAdminConfig()
      return adminConfig
    }
    return 0
  }
  
  PACORTestManager.methods.error = async function (message) {
    if (typeof(window.PACORTestManagerError) !== 'function') {
      return setTimeout(() => {
        this.error(message)
      }, 500)
    }
    window.PACORTestManagerError(message)
  }
  
  PACORTestManager.methods.pressEnter = async function () {
    if (typeof(window.PACORTestManagerPressEnter) !== 'function') {
      return setTimeout(() => {
        this.pressEnter()
      }, 500)
    }
    await window.PACORTestManagerPressEnter()
  }
  
  PACORTestManager.methods.pressEsc = async function () {
    if (typeof(window.PACORTestManagerPressEsc) !== 'function') {
      return setTimeout(() => {
        this.pressEsc()
      }, 500)
    }
    await window.PACORTestManagerPressEsc()
  }
  
  PACORTestManager.methods.getWebpageConfig = async function () {
    if (typeof(window.PACORTestManagerWebpageConfig) !== 'function') {
      //return setTimeout(() => {
      await this.sleep(500)
      return this.getWebpageConfig()
      //}, 500)
    }
    return await window.PACORTestManagerWebpageConfig()
  }
  
  PACORTestManager.methods.getWebpageGroup = async function () {
    if (typeof(window.PACORTestManagerWebpageGroup) !== 'function') {
      //return setTimeout(() => {
      await this.sleep(500)
      return this.getWebpageGroup()
      //}, 500)
    }
    return await window.PACORTestManagerWebpageGroup()
  }
  
  PACORTestManager.methods.initDocumentTitle = async function () {
    await this.sleep(1000)
    
    if (typeof(window.PACORTestManagerTitlePrefix) !== 'function') {
      //return setTimeout(() => {
      await this.sleep(500)
      return this.initDocumentTitle()
      //}, 500)
    }
    
    let prefix = await window.PACORTestManagerTitlePrefix()
    if (typeof(prefix) === 'string') {
      document.title = prefix + document.title
    }
  }
  
  /*
  let isVisible = function (elem) {
    if (typeof(elem[0]) === 'object') {
      elem = elem[0]
    }
    
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
  }
   */
  let isVisible = function (elem) {
    if (typeof(elem.filter) !== 'function') {
      elem = $(elem)
    }
    return (elem.filter(":visible").length > 0)
  }
}