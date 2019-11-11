import AnnotationEditorHeader from './../components/AnnotationEditorHeader/AnnotationEditorHeader.vue'

import CommonProps from './../commons/CommonProps'
import CommonComputed from './../commons/CommonComputed'
import CommonWatch from './../commons/CommonWatch'
import CommonMethods from './../commons/CommonMethods'

let SectionMainIdea = {
  props: CommonProps,
  data() {
    this.$i18n.locale = this.config.locale
    
    let note = '這邊要加入前面寫過的MainIdea'
    //let note = '<p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>' // for test
    if (this.annotationInstance !== null 
            && typeof(this.annotationInstance) === 'object'
            && Array.isArray(this.annotationInstance.notes)
            && this.annotationInstance.notes.length > 0) {
      note = this.annotationInstance.notes[0].note
    }
    //console.log(this.annotationInstance)
    
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
    },
    note (note) {
      this.sectionsData.sectionAnnotation.draftNote = note
    }
  },
//  mounted() {
//  },
  methods: {
    addAnnotation: async function () {
      
      let data = {
        anchorPositions: [{
            type: 'section',
            seq_id: this.sectionsData.sectionAnnotation.seqID
        }],
        type: this.annotationModule,
        notes: {
          'default': this.note
        }
      }
      
      if (this.lib.auth.currentStepAnnotationConfig.enableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let id = await this.lib.AxiosHelper.post('/client/Annotation/createSectionAnnotation', data)
      //console.log(id) // for test
      if (typeof(id) !== 'number') {
        return false  // 新增失敗
      }
      
      //this.rangy.highlightPinnedSelection('my-' + this.annotationModule, this.pinSelection.anchorParagraphIds)
      this.$refs.editor.reset()
      //this.$emit('hide', false)
      
      this.sectionsData.sectionAnnotation.id = id
      if (typeof(this.sectionsData.sectionAnnotation.callback) === 'function') {
        this.sectionsData.sectionAnnotation.callback()
      }
      this.sectionsData.sectionAnnotation.instance = null
    },
    editAnnotation: async function () {
      let data = {
        id: this.annotationInstance.id,
        notes: {
          'default': this.note
        }
      }
      
      let result = await this.lib.AxiosHelper.post('/client/Annotation/update', data)
      
      if (result !== 1) {
        throw this.$t('Update failed.')
      }
      
      //console.log('AAA')
      if (typeof(this.sectionsData.sectionAnnotation.callback) === 'function') {
        this.sectionsData.sectionAnnotation.callback()
      }
      this.sectionsData.sectionAnnotation.instance = null
    },
    deleteAnnotation () {
      if (typeof(this.sectionsData.sectionAnnotation.callback) === 'function') {
        this.sectionsData.sectionAnnotation.callback()
      }
      this.sectionsData.sectionAnnotation.instance = null
    },
  } // methods
}

export default SectionMainIdea