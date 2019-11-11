export default (List) => {
  List.methods.initEventListener = function () {
    
    this.lib.AnnotationPanel.addEventListener(['delete', 'update'], () => {
      this.reload()
    })
    
  }
}