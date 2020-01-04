export default function (PACORTestManager) {
  /**
   * https://stackoverflow.com/a/41343061/6645399
   */
  PACORTestManager.methods.initRemoteConsole = function () {
    let AxiosHelper = this.lib.AxiosHelper
    let proxy = function (context, method) { 
      return function() {
        AxiosHelper.post('/admin/Log/create', {arguments})
        method.apply(context, Array.prototype.slice.apply(arguments))
      }
    }

    // let's do the actual proxying over originals
    //window.console.log = proxy(window.console, window.console.log)
    //window.console.error = proxy(window.console, window.console.error)
    //window.console.warn = proxy(window.console, window.console.warn)
  }
}