import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.sleep = async function (ms) {
    let min = -500
    let max = 500
    let adjusted = min + Math.floor(Math.random() *  (max - min - 1))
    
    ms = ms + adjusted
    
    return await this.lib.VueHelper.sleep(ms)
  }
  
  PACORTestManager.methods.nextStep = async function () {
    await this.lib.auth.nextStep()
  }
}