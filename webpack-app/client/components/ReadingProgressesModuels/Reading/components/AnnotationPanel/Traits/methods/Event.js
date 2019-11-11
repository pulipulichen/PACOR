export default (RangyManager) => {
    
  RangyManager.methods.addEventListenser = function (event, callback) {
    if (typeof(callback) !== 'function') {
      return false
    }
    
    if (Array.isArray(event)) {
      event.forEach(e => {
        this.addEventListenser(e, callback)
      })
      return this
    }
    
    if (Array.isArray(this.events[event]) === false) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    return this
  }
  
  RangyManager.methods.triggerEvent = async function (event, data) {
    if (Array.isArray(this.events[event])) {
      let events = this.events[event]
      for (let i = 0; i < events.length; i++) {
        await events[i](data)
      }
    }
  }
}

