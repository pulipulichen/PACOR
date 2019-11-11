export default (List) => {
  List.computed.editorHeightPX = function () {
    if (!this.panelData) {
      return
    }
    
    let summeryHeight = 50

    if (this.annotations.length < 2) {
      summeryHeight = 0
      // 表示不顯示標頭
    }

    return this.panelData.heightPX - summeryHeight
  }

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