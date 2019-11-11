export default (Editor) => {
  Editor.computed.annotationConfig = function () {
    return this.lib.auth.currentStepAnnotationConfig
  }
  
  Editor.computed.annotationModuleConfig = function () {
    if (!this.annotation) {
      return
    }
    
    let type = this.annotation.type
    return this.status.readingConfig.annotationTypeModules[type]
  }
  
  Editor.computed.minWords = function () {
    return this.annotationModuleConfig.minWords
  }
  
  Editor.computed.isEditable = function () {
    return this.lib.auth.isEditable(this.annotation)
  }
  
  Editor.computed.type = function () {
    return this.annotation.type
  }
}