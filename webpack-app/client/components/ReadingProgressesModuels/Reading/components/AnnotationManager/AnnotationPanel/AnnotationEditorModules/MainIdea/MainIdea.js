import AnnotationEditorHeader from './../components/AnnotationEditorHeader/AnnotationEditorHeader.vue'

import CommonProps from './../commons/CommonProps'
import CommonComputed from './../commons/CommonComputed'
import CommonWatch from './../commons/CommonWatch'
import CommonMethods from './../commons/CommonMethods'

let MainIdea = {
  props: CommonProps,
  data() {
    this.$i18n.locale = this.config.locale
    
    let note = ''
    //let note = '<p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>' // for test
    if (this.annotationInstance !== null 
            && typeof(this.annotationInstance) === 'object'
            && typeof(this.annotationInstance.note) === 'string') {
      note = this.annotationInstance.note
    }
    //console.log(note)
    
    return {
      note: note,
      noteReset: note,
      //public: 
    }
  },
  components: {
    'annotation-editor-header': AnnotationEditorHeader
  },
  computed: {
    annotationConfig () {
      return this.lib.auth.currentStepAnnotationConfig
    },
    public () {
      return (this.annotationConfig.defaultPermission === 'public')
    },
    isNoteDifferent () {
      return (this.note !== this.noteReset)
    },
    enableAddAnnotation () {
      if (this.isNoteDifferent 
              && typeof(this.note) === 'string'
              && this.note !== '') {
        return true
      }
      return false
    },
    enableEditAnnotation () {
      return this.enableAddAnnotation
    },
    computedEditorHeight () {
      return CommonComputed.computedEditorHeight(this)
    },
    computedButtonsClass () {
      return CommonComputed.computedButtonsClass(this)
    },
    moduleConfig () {
      return this.status.readingConfig.annotationTypeModules[this.annotationModule]
    },
    editorPlaceholder () {
      return this.$t(this.moduleConfig.placeholder)
    },
    isEditable () {
      return CommonComputed.isEditable(this)
    }
  },
  watch: {
    annotationInstance (annotationInstance) {
      if (annotationInstance !== null 
            && typeof(annotationInstance) === 'object'
            && typeof(annotationInstance.note) === 'string') {
        this.note = annotationInstance.note
        this.$refs.editor.html(this.note)
      }
    }
  },
//  mounted() {
//  },
  methods: {
    addAnnotation: async function () {
      
      let data = {
        anchorPositions: this.pinSelection.anchorPositions,
        type: this.annotationModule,
        notes: {
          'default': this.note
        }
      }
      
      if (this.lib.auth.currentStepAnnotationConfig.enableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let id = await this.lib.AxiosHelper.post('/client/Annotation/create', data)
      //console.log(id) // for test
      if (typeof(id) !== 'number') {
        return false  // 新增失敗
      }
      
      this.rangy.highlightPinnedSelection('my-' + this.annotationModule, this.pinSelection.anchorParagraphIds)
      this.$refs.editor.reset()
      this.$emit('hide', false)
    },
    editAnnotation: async function () {
      let data = {
        id: this.annotationInstance.id,
        note: this.note
      }
      
      let result = await this.lib.AxiosHelper.post('/client/Annotation/update', data)
      
      if (result !== 1) {
        throw this.$t('Update failed.')
      }
      
      this.$emit('update')
    },
    deleteAnnotation () {
      this.$emit('delete')
    },
    hide () {
      this.$emit('hide', true)
    }
  } // methods
}

export default MainIdea