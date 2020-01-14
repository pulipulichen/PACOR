import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.sleep = async function (ms) {
    if (!this.lib.VueHelper) {
      return false
    }
    
    let min = -500
    let max = 500
    let adjusted = min + Math.floor(Math.random() *  (max - min - 1))
    
    ms = ms + adjusted
    
    if (this.lib.VueHelper) {
      return await this.lib.VueHelper.sleep(ms)
    }
  }
  
  PACORTestManager.methods.nextStep = async function () {
    await this.lib.auth.nextStep()
  }
  
  PACORTestManager.methods.retry = async function (max, callback) {
    if (typeof(max) === 'function' 
            && callback === undefined) {
      callback = max
      max = 3
    }
    
    for (let i = 0; i < max; i++) {
      try {
        await callback()
        break
      }
      catch (e) {
        if (i === max - 1) {
          throw e
        }
        else {
          console.error(e)
          console.log('[RETRY] ' + (i+1))
        }
      }
    }
  }
}