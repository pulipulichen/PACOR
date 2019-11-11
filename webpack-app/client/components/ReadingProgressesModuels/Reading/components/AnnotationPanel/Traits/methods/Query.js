export default (AnnotationPanel) => {
  AnnotationPanel.methods.setQuery = function (query, hideCallback) {
    this.query = query
    this.hideCallback = hideCallback
  }
  
  AnnotationPanel.methods.setAnnotation = function (annotation, hideCallback) {
    this.annotation = annotation
    this.hideCallback = hideCallback
  }
  
  AnnotationPanel.methods.reset = function () {
    this.query = null
    
    if (typeof(this.hideCallback) === 'function') {
      this.hideCallback(this.annotation)
    }
    
    this.hideCallback = null
    this.annotation = null
  }
}