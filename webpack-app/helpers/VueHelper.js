let VueHelper = {
  sleep: function (ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
  },
//  waitReady: async function (component, callback) {
//    if (typeof(callback) !== 'function') {
//      return undefined
//    }
//    
//    while (!component) {
//      await this.sleep(100)
//    }
//    
//    callback()
//  }
}

export default VueHelper