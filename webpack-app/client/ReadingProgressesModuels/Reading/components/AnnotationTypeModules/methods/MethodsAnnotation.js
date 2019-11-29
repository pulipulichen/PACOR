export default (Editor) => {
  Editor.methods.deleteAnnotation = function () {
    this.$emit('delete')
  }
}