import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.sleep = async function (ms) {
    let min = -500
    let max = 500
    let adjusted = min + Math.floor(Math.random() *  (max - min - 1))
    
    ms = ms + adjusted
    
    return await this.lib.VueHelper.sleep(ms)
  }
  
  PACORTestManager.methods.log = function (...args) {
    console.log.apply(this, args)
    
    if (typeof(window.PACORTestManagerLog) === 'function') {
      window.PACORTestManagerLog.apply(this, args)
    }
  }
  
  PACORTestManager.methods.typeInput = function (selector, text) {
    if (typeof(window.PACORTestManagerTypeInput) === 'function') {
      window.PACORTestManagerTypeInput(selector, text)
    }
    else {
      let ele = $(selector)
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
  
  PACORTestManager.methods.nextStep = async function () {
    await this.lib.auth.nextStep()
  }
}