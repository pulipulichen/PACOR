export default (Editor) => {
  Editor.methods.deleteAnnotation = function () {
    this.panelData.isAnnotationEditing = false
    this.setWaitSubmit()
    this.$emit('delete')
  }
  
  Editor.methods.setWaitSubmit = function () {
    this.awaitSubmit = true
    setTimeout(() => {
      this.awaitSubmit = false
    }, 3000)
  }
  
  Editor.methods.focusEditor = async function () {
    while (!this.$refs.editor) {
      await this.lib.VueHelper.sleep(100)
    }
    this.$refs.editor.focus()
  }
}