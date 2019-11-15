const transitionMode = 'slide up'

export default (AnnotationPanel) => {

  AnnotationPanel.methods.show = function () {
    //console.log(this.lib.rangy) // for test
    this.isHide = false
    this.placeholder.transition(transitionMode)
    
    if (this.panelData.heightPX < this.lib.style.config.AnnotationPanelDisplayMinPanelHeight) {
      this.panelData.heightPX = this.lib.style.config.AnnotationPanelDisplayMinPanelHeight
    }
    
    // @TODO Semantic UI的jQuery
    window.$(this.$refs.panel).transition(transitionMode, () => {
      //this.placeholder.show()
    })

    //this.scrollToPinSelection()
  }
  AnnotationPanel.methods.hide = function (doEmitCancel) {
    // 這個太怪了，根本就不應該在這裡使用
//    if (this.sectionsData.sectionAnnotation.instance !== null) {
//      this.sectionsData.sectionAnnotation.instance = null
//      return false
//    }

//    this.lib.rangy.hoverOut(true)
    this.placeholder.transition(transitionMode)
    
    // @TODO Semantic UI的jQuery
    window.$(this.$refs.panel).transition(transitionMode, () => {
      if (this.isHide === true) {
        return false
      }
      this.isHide = true
    })
    
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