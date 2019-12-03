import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.sleep = async function (ms) {
    return await this.lib.VueHelper.sleep(ms)
  }
  
  PACORTestManager.methods.log = function (...args) {
    console.log.apply(this, args)
    
    if (typeof(window.PACORTestManagerLog) === 'function') {
      window.PACORTestManagerLog.apply(this, args)
    }
  }
}