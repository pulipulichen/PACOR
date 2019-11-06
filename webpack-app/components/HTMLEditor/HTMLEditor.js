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
      
      this.editor = window.$(this.$refs.editor)
      this.editor.summernote(options)
      
      //console.log(this.contents)
      if (typeof(this.contents) === 'string') {
        this.html(this.contents)
      }
      if (typeof(this.placeholder) === 'string') {
        this.editor.summernote({
          placeholder: this.placeholder
        })
      }
      
      //$('<div class="editor-container"><div id="editor"><h1>Hello Summernote</h1></div></div>').appendTo('body')
      //$('#editor').summernote({
        //airMode: true
      //})
    },
    _callbacksOnChange (contents) {
      if (contents === '<p><br></p>') {
        contents = ''
      }
      
      if (contents.indexOf('<p>') === -1
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
    },
    html (html) {
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