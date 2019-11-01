import './summernote/summernote-lite.webpack.js'

let HTMLEditor = {
  props: ['lib', 'status', 'config', 'value', 'editorConfig'],
  data() {
    if (typeof(this.config) === 'object') {
      this.$i18n.locale = this.config.locale
    }
    return {
      editor: null,
      lastChangedContent: null
    }
  },  // data() {
  computed: {
  },  // computed: {
  watch: {
    'value' (value) {
      if (typeof(value) === 'string') {
        this.html(value)
      }
    }
  },  // watch: {
  mounted() {
    this.initEditor()
  },  // mounted() {
  methods: {
    initEditor: function () {
      let options = {
        airMode: true,
        callbacks: {
          onChange: this._callbacksOnChange
        }
      }
      
      this.editor = window.$(this.$refs.editor)
      this.editor.summernote(options)
      
      //$('<div class="editor-container"><div id="editor"><h1>Hello Summernote</h1></div></div>').appendTo('body')
      //$('#editor').summernote({
        //airMode: true
      //})
    },
    _callbacksOnChange (contents) {
      if (contents === '<p><br></p>') {
        contents = ''
      }
      
      if (this.lastChangedContent === contents) {
        return false
      }
      
      this.$emit('change', contents)
      
      this.lastChangedContent = contents
      
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