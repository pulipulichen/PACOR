export default function (PACORTestManager) {
  /**
   * https://stackoverflow.com/a/41343061/6645399
   */
  PACORTestManager.methods.initRemoteConsole = function () {
    let AxiosHelper = this.lib.AxiosHelper
    let proxy = function (context, method, type) { 
      return function() {
        let message = []
//        arguments.forEach((arg) => {
//          console.warn(arg)
//          message.push(arg)
//        })
        //console.warn(JSON.stringify(arguments[0], null, 2))
        
        for (let i = 0; i < arguments.length; i++) {
          let arg = arguments[i]
          if (Array.isArray(arg)) {
            arg = arg.join('\n')
          }
          else if (typeof(arg) === 'object') {
            arg = JSON.stringify(arg, null, 2)
          }
          message.push(arg)
        }
        //console.warn(typeof(arguments.length))
        
        AxiosHelper.post('/admin/Log/create', {
          message: message.join('\n'), 
          type
        })
        method.apply(context, Array.prototype.slice.apply(arguments))
      }
    }

    // let's do the actual proxying over originals
    window.console.log = proxy(window.console, window.console.log, 'log')
    window.console.error = proxy(window.console, window.console.error, 'error')
    window.console.warn = proxy(window.console, window.console.warn, 'warn')
    
    //throw new Error('測試throw', '第二個訊息')
    //console.error('測試console.error', '第二個訊息')
//    AxiosHelper.post('/admin/Log/create', {
//      message: 'Hello, world.'
//    })
  }
}