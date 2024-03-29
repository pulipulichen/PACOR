export default (Editor) => {
  Editor.computed.annotationConfig = function () {
    return this.lib.auth.stepHighlightAnnotationConfig
  }
  
  Editor.computed.annotationModuleConfig = function () {
    if (!this.annotation) {
      return undefined
    }
    
    let type = this.annotation.type
    return this.status.readingConfig.annotationTypeModules[type]
  }
  
  Editor.computed.minWords = function () {
    return this.annotationModuleConfig.minWords
  }
  
  Editor.computed.isEditable = function () {
    return this.lib.AnnotationHelper.isEditable(this.annotation)
  }
  
  Editor.computed.type = function () {
    return this.annotation.type
  }
  
  Editor.computed.displayTime = function () {
    return this.lib.DayJSHelper.fromNow(this.annotation.updated_at_unixms)
  }
}