export default (List) => {
  List.computed.computedListStyle = function () {
    if (!this.panelData) {
      return
    }
    
    let style = {
      'max-height': `${this.editorHeightPX - 50}px`
    }
    return style
  }
}