export default function (HTMLEditor) {
  HTMLEditor.methods.initEditor = function () {
    
    this.editor = window.$(this.$refs.editor)
    this.editor.summernote(this._summernoteOptions())

    //console.log(this.contents)
    if (typeof (this.contents) === 'string') {
      //console.log(this.contents)
      this.html(this.contents)
    }

    //$('<div class="editor-container"><div id="editor"><h1>Hello Summernote</h1></div></div>').appendTo('body')
    //$('#editor').summernote({
    //airMode: true
    //})
  }
  
  HTMLEditor.methods._summernoteOptions = function () {
    let options = {
      //airMode: true,
      toolbar: [
        // [groupName, [list of button]]
        ['toolbar', ['link', 'picture', 'video', 'color', 'bold', 'underline']]
        
        /*
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol']],
        ['insert', ['link', 'picture', 'video']],
         */
      ],
      enableStatusbar: false,
      //maxHeight: '5em',
      //disableDragAndDrop: true,
      callbacks: {
        onImageUpload: async (files) => {
          this._onImageUpload(files)
        },
        onChange: this._callbacksOnChange
      }
    }
    
    if (typeof (this.placeholder) === 'string') {
      options.placeholder = this.placeholder
    }
    
    return options
  }
}