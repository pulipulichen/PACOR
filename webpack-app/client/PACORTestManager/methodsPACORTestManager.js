import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.sleep = async function (seconds) {
    return await this.lib.VueHelper.sleep(seconds)
  }

  PACORTestManager.methods.waitForElement = async function (selector, maxWaitMS = 15000) {
    if ($(selector).length > 0) {
      return true
    }

    return new Promise(resolve => {
      let check = () => {
        if ($(selector).length > 0) {
          return resolve($(selector).length)
        }
        else {
          maxWaitMS = maxWaitMS - 500
          if (maxWaitMS <= 0) {
            return resolve(0)
          }
          
          setTimeout(() => {
            check()
          }, 500)
        }
      }
      
      check()
    })
  }
}