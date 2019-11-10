export default (RangyManager) => {
  RangyManager.computed.isPinned = function () {
    return (this.selectionHighlighter.highlights.length > 0)
  }
  
  RangyManager.computed.isSelecting = function () {
    return (this.rangy.getSelection().toString() !== '')
  }
}
