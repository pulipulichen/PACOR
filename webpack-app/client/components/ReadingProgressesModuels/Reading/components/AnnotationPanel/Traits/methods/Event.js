export default (AnnotationPanel) => {
    
  AnnotationPanel.methods.addEventListener = function (event, callback) {
    if (typeof(callback) !== 'function') {
      return false
    }
    
    if (Array.isArray(event)) {
      event.forEach(e => {
        this.addEventListener(e, callback)
      })
      return this
    }
    
    if (Array.isArray(this.events[event]) === false) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    return this
  }
  
  AnnotationPanel.methods.triggerEvent = async function (event) {
    if (Array.isArray(this.events[event])) {
      let events = this.events[event]
      for (let i = 0; i < events.length; i++) {
        await events[i](this.panelData.annotation)
      }
    }
    
    this.triggerHook(event)
    
    if (event === 'add') {
      this.hide(false)
    }
  }
}

