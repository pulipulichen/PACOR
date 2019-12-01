export default (List) => {
  List.computed.computedListStyle = function () {
    if (!this.panelData) {
      return
    }
    
    let padding = 100
    if (this.annotations.length < 2) {
      padding = 0
    }
    
    //console.log(this.editorHeightPX - padding)
    
    let style = {
      'max-height': `${this.editorHeightPX - padding}px`
    }
    return style
  }
}