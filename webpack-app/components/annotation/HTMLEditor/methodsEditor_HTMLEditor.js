import $ from 'jquery'

export default function (HTMLEditor) {

  HTMLEditor.methods.focus = function (glow) {
    this.editor.summernote('focus')

    // 會導致無法點選選單，不可使用 20191116
//    $(this.$refs.editorContainer).find(".note-editable:first")[0].focus();
//    // select all the content in the element
//    document.execCommand('selectAll', false, null)
//    // collapse selection to the end
//    document.getSelection().collapseToEnd()
    if (glow === true) {
      $(this.$refs.editorContainer).transition('glow')
    }
  }
  
  HTMLEditor.methods.html = function (html) {
    if (this.editor === null) {
      setTimeout(() => {
        this.html(html)
      }, 100)
      return this
    }

    if (typeof (html) === 'string'
            && html.trim() !== '') {
      if (html.startsWith('<') === false 
              && html.endsWith('>') === false) {
        html = `<p>${html}</p>`
      }
      
      this.editor.summernote('code', html)
    } else {
      this.editor.summernote('code')
    }
    return this
  } // HTMLEditor.methods.html = function (html) {
  
  HTMLEditor.methods.reset = function () {
    this.html('')
  } // HTMLEditor.methods.reset = function () {
}