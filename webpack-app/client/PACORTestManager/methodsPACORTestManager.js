import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.sleep = async function (ms) {
    return await this.lib.VueHelper.sleep(ms)
  }
}