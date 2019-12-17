import $ from 'jquery'

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
    
    if (this.lib.style.isEnableAnimte) {
      this.placeholder.transition(transitionMode)
      // @todo 可以不要用semantic ui的jquery嗎？
      $(this.$refs.panel).transition(transitionMode, transitionCallback)
    }
    else {
      this.placeholder.show()
      $(this.$refs.panel).show()
      transitionCallback()
    }

    //this.scrollToPinSelection()
  } // AnnotationPanel.methods.show = function () {
  
  AnnotationPanel.methods.hide = async function (doEmitCancel) {
    // 這個太怪了，根本就不應該在這裡使用
//    if (this.sectionsData.sectionAnnotation.instance !== null) {
//      this.sectionsData.sectionAnnotation.instance = null
//      return false
//    }

    let checkBeforeHide = await this.checkBeforeHide()
    //console.log({checkBeforeHide})
    if (checkBeforeHide === false) {
      return false
    }
    
    let transitionCallback = () => {
      if (this.isHide === true) {
        return false
      }
      this.isHide = true
    }

//    this.lib.rangy.hoverOut(true)
    if (this.lib.style.isEnableAnimte) {
      this.placeholder.transition(transitionMode)

      // @TODO Semantic UI的jQuery
      $(this.$refs.panel).transition(transitionMode, transitionCallback)
    }
    else {
      this.placeholder.show()
      $(this.$refs.panel).show()
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
    
  } // AnnotationPanel.methods.hide = async function (doEmitCancel) {
  
  AnnotationPanel.methods.checkBeforeHide = async function () {
    if (this.panelData.isAnnotationEditing === false) {
      return true
    }
    
    let confirm = await this.lib.ConfirmModal.show(this.$t('You are still editing. Are you sure to discard changes?'))
    if (confirm === true) {
      this.panelData.isAnnotationEditing = false
    }
    //console.log({confirm})
    return confirm
  }
}