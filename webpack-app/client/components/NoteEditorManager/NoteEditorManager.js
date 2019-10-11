import './../../../vendors/summernote/summernote-lite.webpack.js'

let NoteEditorManager = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      serializedHighlights: null
    }
  },  // data() {
  computed: {
  },  // computed: {
  watch: {
  },  // watch: {
  mounted() {
  },  // mounted() {
  methods: {
    
  } // methods
}

export default NoteEditorManager