export default function (PACORTestManager) {
  /**
   * https://stackoverflow.com/a/41343061/6645399
   */
  PACORTestManager.methods.initRemoteConsole = async function () {
    if (!this.lib.VueHelper) {
      setTimeout(() => {
        this.initRemoteConsole()
      }, 100)
      return false
    }
    
    while (!this.status.readingConfig.debug) {
      await this.lib.VueHelper.sleep(100)
    }
    //console.log(this.status.readingConfig.debug)
    if (this.status.readingConfig.debug.enableRemoteConosleLog !== true) {
      return false
    }
    
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
          if (Array.isArray(arg) && typeof(arg[0]) !== 'object') {
            arg = arg.join('\n')
          }
          else if (typeof(arg) === 'object') {
            if (typeof(arg.stack) === 'string') {
              arg = arg.stack.trim()
            }
            else {
              try {
                arg = JSON.stringify(arg, null, 2)
              }
              catch (e) {
                arg = arg.toString()
              } 
              if (arg.startsWith('{')) {
                arg = arg.slice(1)
              }
              if (arg.endsWith('}')) {
                arg = arg.slice(0, -1)
              }
              arg = arg.trim()
            }
          }
          message.push(arg)
        }
        //console.warn(typeof(arguments.length))
        
        // --------------------
        
        method.apply(context, Array.prototype.slice.apply(arguments))
        
        AxiosHelper.post('/admin/Log/create', {
          message: message.join('\n'), 
          type
        })
        
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