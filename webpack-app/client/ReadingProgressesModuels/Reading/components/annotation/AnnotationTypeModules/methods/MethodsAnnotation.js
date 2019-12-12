export default (Editor) => {
  Editor.methods.deleteAnnotation = function () {
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