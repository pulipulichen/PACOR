const transitionMode = 'slide up'

export default (AnnotationPanel) => {

  AnnotationPanel.methods.show = function () {
    //console.log(this.lib.rangy) // for test
    this.isHide = false
    
    if (this.panelData.heightPX < this.lib.style.config.AnnotationPanelDisplayMinPanelHeight) {
      this.panelData.heightPX = this.lib.style.config.AnnotationPanelDisplayMinPanelHeight
    }
    
    let transitionCallback = () => {
      //this.placeholder.show()
    }
    
    if (this.lib.style.isEnableAnimte()) {
      this.placeholder.transition(transitionMode)
      // @todo 可以不要用semantic ui的jquery嗎？
      window.$(this.$refs.panel).transition(transitionMode, transitionCallback)
    }
    else {
      this.placeholder.show()
      window.$(this.$refs.panel).show()
      transitionCallback()
    }

    //this.scrollToPinSelection()
  } // AnnotationPanel.methods.show = function () {
  
  AnnotationPanel.methods.hide = function (doEmitCancel) {
    // 這個太怪了，根本就不應該在這裡使用
//    if (this.sectionsData.sectionAnnotation.instance !== null) {
//      this.sectionsData.sectionAnnotation.instance = null
//      return false
//    }

    let transitionCallback = () => {
      if (this.isHide === true) {
        return false
      }
      this.isHide = true
    }

//    this.lib.rangy.hoverOut(true)
    if (this.lib.style.isEnableAnimte()) {
      this.placeholder.transition(transitionMode)

      // @TODO Semantic UI的jQuery
      window.$(this.$refs.panel).transition(transitionMode, transitionCallback)
    }
    else {
      this.placeholder.show()
      window.$(this.$refs.panel).show()
      transitionCallback()
    }
    
//    if (this.status.search.showAnnotationList === true) {
//      this.status.search.showAnnotationList = false
//    }
//    this.$emit('hide', doUnpin)

    doEmitCancel = (typeof(doEmitCancel) === 'boolean') ? doEmitCancel : true
    //console.log(doEmitCancel)
    if (doEmitCancel) {
      //console.log('呼叫')
      this.triggerEvent('cancel')
    }
    
    this.lib.RangyManager.hoverOut(true)
    this.reset()
    
  }
}