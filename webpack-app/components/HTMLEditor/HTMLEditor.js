import './summernote/summernote-lite.webpack.js'

let HTMLEditor = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {
    if (typeof(this.config) === 'object') {
      this.$i18n.locale = this.config.locale
    }
    return {
      editor: null
    }
  },  // data() {
  computed: {
  },  // computed: {
  watch: {
  },  // watch: {
  mounted() {
    this.initEditor()
  },  // mounted() {
  methods: {
    initEditor: function () {
      let options = {
        airMode: true
      }
      
      this.editor = window.$(this.$refs.editor)
      this.editor.summernote(options)
      
      //$('<div class="editor-container"><div id="editor"><h1>Hello Summernote</h1></div></div>').appendTo('body')
      //$('#editor').summernote({
        //airMode: true
      //})
    },
    focus () {
      this.editor.summernote('focus')
    }
  } // methods
}

export default HTMLEditor