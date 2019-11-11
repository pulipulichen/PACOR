export default (RangyManager) => {
  RangyManager.computed.isPinned = function () {
    return (this.selectionHighlighter.highlights.length > 0)
  }
  
  RangyManager.computed.isSelecting = function () {
    return (this.rangy.getSelection().toString() !== '')
  }
  
  RangyManager.computed.rangyConfig = function () {
    let output = {}
    if (typeof(this.status) === 'object'
            && typeof(this.status.readingConfig) === 'object') {
      output.articleSelector = this.status.readingConfig.articleSelector
      output.sectionSelector = this.status.readingConfig.sectionSelector
      output.annotationTypeModules = this.status.readingConfig.annotationTypeModules
    }
    return output
  }
}
