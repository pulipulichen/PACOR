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
}