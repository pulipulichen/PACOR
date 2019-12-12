/* global this */

export default (List) => {
  
  List.methods.checkBeforeHide = async function () {
    if (this.panelData.isAnnotationEditing === true) {
      return true
    }
    
    let confirm = await this.lib.ConfirmModal.show(this.$t('You are still editing. Are you sure to discard changes?'))
    if (confirm === true) {
      this.panelData.isAnnotationEditing = false
    }
    return !confirm
  }
  
}