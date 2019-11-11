export default (AnnotationPanel) => {
  AnnotationPanel.methods.setQuery = function (query, hooks) {
    this.panelData.query = query
    this.panelData.hooks = hooks
    
    this.show()
  }
  
  AnnotationPanel.methods.setAnnotation = function (annotation, hooks) {
    this.panelData.annotation = annotation
    this.panelData.hooks = hooks
    
    this.show()
  }
  
  AnnotationPanel.methods.setFilter = function (filter) {
    this.panelData.filter = filter
  }
  
  AnnotationPanel.methods.setHooks = function (hooks) {
    this.panelData.hooks = hooks
  }
  
  
  AnnotationPanel.methods.reset = function () {
    this.panelData.query = null
    this.panelData.hooks = null
    this.panelData.filter = null
    this.panelData.annotation = null
    this.lib.rangy.hoverOut(true)
  }
  
  AnnotationPanel.methods.triggerHook = async function (type) {
    if (typeof(this.panelData.hooks[type]) === 'function') {
      await this.panelData.hooks[type](this.panelData.annotation)
      delete this.panelData.hooks[type]
    }
  }
}