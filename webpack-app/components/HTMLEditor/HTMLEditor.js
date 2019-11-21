import './summernote/summernote-lite.webpack.js'

import $ from 'jquery'

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
    computedClass () {
      if (this.editable) {
        return 'editable'
      }
      else {
        return 'secondary'
      }
    },
    computedStyle () {
      if (this.editable === false) {
        return null
      }
      
      if (typeof(this.height) === 'string') {
        
        let calc = this.height
        if (calc.startsWith('calc')) {
          calc = calc.slice(5, -1)
        }
        calc = `calc(${calc} - 90px)`
        //console.log(calc)
        setTimeout(() => {
          $(this.$refs.editorContainer).find('.note-editable:visible').css('max-height', calc)
          //console.log($(this.$refs.editorContainer).find('.note-editable:visible').length)
        }, 100)
        
        
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