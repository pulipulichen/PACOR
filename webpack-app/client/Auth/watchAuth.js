export default function (Auth) {
  Auth.watch['status.needLogin'] = async function () {
    if (this.status.needLogin === false) {
      let view = this.currentStep
      if (this.lib.ValidateHelper.isURL(view)) {
        return await this._redirect(view)
      }
      //console.log(view)
      this.status.view = view
    }
  }
  
  Auth.watch['status.status.progress.countdownPause'] = function (countdownPause) {
    if (countdownPause === false) {
      // 由true轉false的瞬間
      console.log('countdownPause true to false')
      this.resetRemainingSeconds()
    }
  }
}