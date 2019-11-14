import './summernote/summernote-lite.webpack.js'

let HTMLEditor = {
  props: ['lib', 'status', 'config', 'contents', 'height', 'editable', 'placeholder'],
  data() {
    if (typeof(this.config) === 'object') {
      this.$i18n.locale = this.config.locale
    }
    return {
      editor: null,
      lastChangedContents: null
    }
  },  // data() {
  computed: {
    computedStyle () {
      if (typeof(this.height) === 'string') {
        return {
          height: this.height,
          'max-height': this.height
          //border: '1px solid red'
        }
      }
    }
  },  // computed: {
  watch: {
  },  // watch: {
  mounted() {
    this.initEditor()
  },  // mounted() {
  methods: {
    initEditor: function () {
      let options = {
        airMode: true,
        disableDragAndDrop: true,
        callbacks: {
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
    },
    _callbacksOnChange (contents) {
      if (contents === '<p><br></p>'
          || contents === '<p></p>') {
        contents = ''
      }
      
      if (contents !== '' 
              && contents.indexOf('<p>') === -1
              && contents.startsWith('<') === false
              && contents.startsWith('>') === false) {
        contents = `<p>${contents}</p>`
      }
      
      if (this.lastChangedContents === contents) {
        return false
      }
      
      this.$emit('input', contents)
      //this.editorConfig.contents = contents
      
      this.lastChangedContents = contents
      
      //console.log('onChange:', contents, $editable);
    },
    focus () {
      this.editor.summernote('focus')
      
      $(this.$refs.editorContainer).find(".note-editable:first")[0].focus();
      // select all the content in the element
      document.execCommand('selectAll', false, null)
      // collapse selection to the end
      document.getSelection().collapseToEnd()
    },
    html (html) {
      if (this.editor === null) {
        setTimeout(() => {
          this.html(html)
        }, 100)
        return
      }
      
      if (typeof(html) === 'string') {
        this.editor.summernote('code', html)
      }
      else {
        return this.editor.summernote('code')
      }
    },
    reset () {
      this.html('')
    }
  } // methods
}

export default HTMLEditor