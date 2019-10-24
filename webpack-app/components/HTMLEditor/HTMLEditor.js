import './summernote/summernote-lite.webpack.js'

let HTMLEditor = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {
    if (typeof(this.config) === 'object') {
      this.$i18n.locale = this.config.locale
    }
    return {
      serializedHighlights: null
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
      $('<div class="editor-container"><div id="editor"><h1>Hello Summernote</h1></div></div>').appendTo('body')
      $('#editor').summernote({
        //airMode: true
      })
    }
  } // methods
}

export default HTMLEditor