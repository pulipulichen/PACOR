export default (Editor) => {
  Editor.methods.deleteAnnotation = function () {
    this.pandelData.isAnnotationEditing = false
    this.setWaitSubmit()
    this.$emit('delete')
  }
  
  Editor.methods.setWaitSubmit = function () {
    this.awaitSubmit = true
    setTimeout(() => {
      this.awaitSubmit = false
    }, 3000)
  }
}