/* global this */

export default (List) => {
  
  List.methods.checkBeforeHide = async function () {
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
  
  List.methods.focusCommentInput = function () {
    if (this.$refs.AnnotationSingle) {
      this.$refs.AnnotationSingle.focusCommentInput()
    }
  }
}