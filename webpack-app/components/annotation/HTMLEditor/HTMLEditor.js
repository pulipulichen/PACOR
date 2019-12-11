import './summernote/summernote-lite.webpack.js'

import $ from 'jquery'

let HTMLEditor = {
  props: ['lib', 'status', 'config'
    , 'contents', 'height', 'editable', 'placeholder'
    , 'label'],
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
    
  },  // computed: {
//  watch: {
//  },  // watch: {
  mounted() {
    this.initEditor()
  },  // mounted() {
  methods: {
  } // methods
}

import computed_HTMLEditor from './computed_HTMLEditor.js'
computed_HTMLEditor(HTMLEditor)

import methodsEditor_HTMLEditor from './methodsEditor_HTMLEditor.js'
methodsEditor_HTMLEditor(HTMLEditor)

import methodsSummernote_HTMLEditor from './methodsSummernote_HTMLEditor.js'
methodsSummernote_HTMLEditor(HTMLEditor)

import methodsSummernoteCallback_HTMLEditor from './methodsSummernoteCallback_HTMLEditor.js'
methodsSummernoteCallback_HTMLEditor(HTMLEditor)

export default HTMLEditor