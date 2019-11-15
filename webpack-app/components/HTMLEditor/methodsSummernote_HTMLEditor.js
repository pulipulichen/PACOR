export default function (HTMLEditor) {
  HTMLEditor.methods.initEditor = function () {
      let options = {
        airMode: true,
        disableDragAndDrop: true,
        callbacks: {
          onImageUpload: async (files) => {
            // upload image to server and create imgNode...
            //$summernote.summernote('insertNode', imgNode);
            console.log(files)
          },
          onChange: this._callbacksOnChange
        }
      }
      
      if (typeof(this.placeholder) === 'string') {
        options.placeholder = this.placeholder
      }
      
      this.editor = window.$(this.$refs.editor)
      this.editor.summernote(options)
      
      //console.log(this.contents)
      if (typeof(this.contents) === 'string') {
        //console.log(this.contents)
        this.html(this.contents)
      }
      
      //$('<div class="editor-container"><div id="editor"><h1>Hello Summernote</h1></div></div>').appendTo('body')
      //$('#editor').summernote({
        //airMode: true
      //})
    }
}