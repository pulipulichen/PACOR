export default (RangyManager) => {
  RangyManager.computed.isPinned = function () {
    return (this.selectionHighlighter.highlights.length > 0)
  }
  
  
  RangyManager.computed.rangyConfig = function () {
    let output = {}
    if (typeof(this.status) === 'object'
            && typeof(this.status.readingConfig) === 'object') {
      output.articleSelector = this.status.readingConfig.selector.article
      output.sectionSelector = this.status.readingConfig.selector.section
      output.annotationTypeModules = this.status.readingConfig.annotationTypeModules
    }
    return output
  }
}
