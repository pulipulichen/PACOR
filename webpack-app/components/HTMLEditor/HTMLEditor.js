import './summernote/summernote-lite.webpack.js'

let HTMLEditor = {
  props: ['lib', 'status', 'config', 'note'],
  data() {
    if (typeof(this.config) === 'object') {
      this.$i18n.locale = this.config.locale
    }
    return {
      editor: null,
      lastChangedContents: null
    }
  },  // data() {
//  computed: {
//  },  // computed: {
//  watch: {
//  },  // watch: {
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
      
      if (typeof(this.note) === 'string') {
        this.html(this.note)
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
    }
  } // methods
}

export default HTMLEditor