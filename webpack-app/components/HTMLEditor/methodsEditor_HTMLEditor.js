export default function (HTMLEditor) {

  HTMLEditor.methods.focus = function () {
    this.editor.summernote('focus')

    return false
    $(this.$refs.editorContainer).find(".note-editable:first")[0].focus();
    // select all the content in the element
    document.execCommand('selectAll', false, null)
    // collapse selection to the end
    document.getSelection().collapseToEnd()
  }
  HTMLEditor.methods.html = function (html) {
    if (this.editor === null) {
      setTimeout(() => {
        this.html(html)
      }, 100)
      return this
    }

    if (typeof (html) === 'string') {
      this.editor.summernote('code', html)
    } else {
      this.editor.summernote('code')
    }
    return this
  }
  HTMLEditor.methods.reset = function () {
    this.html('')
  }
}