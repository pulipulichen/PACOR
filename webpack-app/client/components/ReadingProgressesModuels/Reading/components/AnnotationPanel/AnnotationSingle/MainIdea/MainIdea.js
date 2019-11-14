import props from './../Traits/props'
//import CommonComputed from './../commons/CommonComputed'
//import CommonWatch from './../commons/CommonWatch'
//import CommonMethods from './../commons/CommonMethods'

let Editor = {
  props: props,
  data() {
    if (!this.annotation) {
      throw 'No annotation'
    }
    
    this.$i18n.locale = this.config.locale
    
    //let note = this.lib.RangyManager.getPinSelectionAnchorText()
    let note = ''
    //let note = '<p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>' // for test
    if (this.annotation
            && Array.isArray(this.annotation.notes)
            && this.annotation.notes.length > 0) {
      note = this.annotation.notes[0].note
    }
    //console.log(note)
    
    return {
      note: note,
      noteReset: note,
      
      public: (this.lib.auth.defaultPermission === 'public')
      //public: 
    }
  },
//  components: {
//    'annotation-editor-header': AnnotationEditorHeader
//  },
  computed: {
//    annotationConfig () {
//      return this.lib.auth.currentStepAnnotationConfig
//    },
//    public () {
//      return (this.annotationConfig.defaultPermission === 'public')
//    },
    isNoteDifferent () {
      //console.log([this.note, this.noteReset, (this.note !== this.noteReset)])
      return (this.note !== this.noteReset)
    },
    
    isEnableSubmitAdd () {
      //console.log(this.isNoteDifferent )
      if (this.isNoteDifferent 
              && typeof(this.note) === 'string'
              && this.note !== '') {
        return true
      }
      return false
    },
    isEnableSubmitEdit () {
      return this.isEnableSubmitAdd
    },
    
    editorHeight () {
      let vm = this
      let height
      if (vm.enableCollaboration === true
              && vm.lib.style.isStackWidth()) {
        height = (vm.lib.style.getClientHeight() / 2)
        height = `calc(${height}px - 5em)`
      } else {
        height = `calc(${this.heightPX}px - 5em)`
      }
      
      //console.log(height, this.panelData.heightPX)
      //console.log(height)
      return height
    },
    
//    computedButtonsClass () {
//      return CommonComputed.computedButtonsClass(this)
//    },
    
//    moduleConfig () {
//      return this.status.readingConfig.annotationTypeModules[this.annotationModule]
//    },
    
    editorPlaceholder () {
      return this.$t(this.annotationModuleConfig.placeholder)
    },
    
    enableDelete () {
      return true
    },
    
//    isEditable () {
//      return CommonComputed.isEditable(this)
//    }
  },
  watch: {
    annotation (annotation) {
      if (annotation
            && Array.isArray(annotation.notes)
            && annotation.notes.length > 0) {
        this.note = annotation.notes[0].note
        this.noteReset = this.note
        this.$refs.editor.html(this.note)
      }
    }
  },
  mounted() {
    //console.log([this.note, this.noteReset, (this.note !== this.noteReset)])
    this.loadDraft()
  },
  methods: {
    loadDraft: async function () {
      let note = this.lib.RangyManager.getPinSelectionAnchorText()
      note = this.lib.StringHelper.removePunctuations(note).trim()
      this.note = note
      this.noteReset = note
      if (this.$refs.editor) {
        this.$refs.editor.html(this.note)
      }
    },
    addAnnotation: async function () {
      
      let data = {
        anchorPositions: this.annotation.anchorPositions, // 所以，應該要在交給它的時候，就已經放入anchorPositions
        type: this.annotation.type,
        notes: {
          'default': this.note
        }
      }
      
      if (this.lib.auth.currentStepAnnotationConfig.enableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let id = await this.lib.AxiosHelper.post('/client/Annotation/create', data)
      //let id = 1
      //console.log(id) // for test
      
      if (typeof(id) !== 'number') {
        throw 'Create failed'
        return false  // 新增失敗
      }
      
      //this.lib.RangyManager.highlightPinnedSelectionFromAnnotation('my-' + this.annotation.type, this.pinSelection.anchorParagraphIds)
      this.lib.RangyManager.highlightPinnedSelectionFromAnnotation(this.annotation)
      this.$refs.editor.reset()
      
      this.$emit('add')
    },
    
    editAnnotation: async function () {
      
      let data = {
        id: this.annotation.id,
        notes: {
          'default': this.note
        }
      }
      
      //throw 'Test'
      //return 
      
      let result = await this.lib.AxiosHelper.post('/client/Annotation/update', data)
      
      if (result !== 1) {
        throw this.$t('Update failed.')
      }
      
      //console.log('AAA?')
      
      this.$emit('update')
    },
    
    onNoteChange: function (content) {
      this.note = content
    }
    
//    deleteAnnotation () {
//      this.$emit('delete')
//    }
  } // methods
}

import ComputedConfig from './../Traits/computed/ComputedConfig'
ComputedConfig(Editor)

import ComputedButtons from './../Traits/computed/ComputedButtons'
ComputedButtons(Editor)

import MethodsAnnotation from './../Traits/methods/MethodsAnnotation'
MethodsAnnotation(Editor)

export default Editor