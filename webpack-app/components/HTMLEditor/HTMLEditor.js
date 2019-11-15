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
//  watch: {
//  },  // watch: {
  mounted() {
    this.initEditor()
  },  // mounted() {
  methods: {
  } // methods
}

import methodsEditor_HTMLEditor from './methodsEditor_HTMLEditor'
methodsEditor_HTMLEditor(HTMLEditor)

import methodsSummernote_HTMLEditor from './methodsSummernote_HTMLEditor'
methodsSummernote_HTMLEditor(HTMLEditor)

import methodsSummernoteCallback_HTMLEditor from './methodsSummernoteCallback_HTMLEditor'
methodsSummernoteCallback_HTMLEditor(HTMLEditor)

export default HTMLEditor