import FooterButtons from './FooterButtons/FooterButtons.vue'

import props from './../props'
//import CommonComputed from './../commons/CommonComputed'
//import CommonWatch from './../commons/CommonWatch'
//import CommonMethods from './../commons/CommonMethods'

let debugMockSend = false
if (debugMockSend === true) {
  console.log('@test debugMockSend')
}

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
    
    let noteReset = note
    if (noteReset) {
      noteReset = this.lib.StringHelper.htmlTrim(noteReset)
      noteReset = this.lib.StringHelper.htmlToText(noteReset)
    }
    
    return {
      note: note,
      noteReset: noteReset,
      //public: 
    }
  },
  components: {
    'footer-buttons': FooterButtons
  },
  computed: {
//    annotationConfig () {
//      return this.lib.auth.currentStepAnnotationConfig
//    },
//    public () {
//      return (this.annotationConfig.defaultPermission === 'public')
//    },
    isNoteDifferent () {
      //let note = this.lib.StringHelper.htmlToText(this.note).trim()
      //console.log([this.note, this.noteReset, (this.note !== this.noteReset)])
      let note = this.lib.StringHelper.htmlTrim(this.note)
      note = this.lib.StringHelper.htmlToText(note, true).trim()
      
      let noteReset = this.noteReset.trim()
      //let noteReset = this.lib.StringHelper.htmlTrim(this.noteReset)
      //let noteReset = this.lib.StringHelper.htmlToText(this.noteReset, true)
      //console.log([note, noteReset, (note !== noteReset)])
      
      //return (note !== this.noteReset)
      let isNoteDifferent = (note !== noteReset)
      this.panelData.isAnnotationEditing = isNoteDifferent
      return isNoteDifferent
    },
    
    isEnableSubmitAdd () {
      //console.log(this.isNoteDifferent )
      if (this.isNoteDifferent === true
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
      if (this.heightPX < 200) {
        return '10em'
      }
      
      let vm = this
      let height
      let basePadding = `5em`
      
      //console.log(this.lib.auth.isEnableCollaboration)
      if (this.lib.auth.isEnableCollaboration === true) {
        height = (vm.lib.style.clientHeight / 2)
        //console.log(vm.lib.style.isStackWidth)
        if (vm.lib.style.isStackWidth) {
          height = `calc(${this.heightPX}px - ${basePadding} - 5em)`
        }
        else {
          height = `calc(${this.heightPX}px - ${basePadding})`
        }
      } else {
        height = `calc(${this.heightPX}px - ${basePadding})`
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
        let noteReset = this.lib.StringHelper.htmlTrim(this.note)
        this.noteReset = this.lib.StringHelper.htmlToText(noteReset).trim()
        this.$refs.editor.html(this.note)
      }
    },
    //note (note) {
    //  this.annotation.notes[0].note = this.note
    //} 
  },
  mounted() {
    //console.log([this.note, this.noteReset, (this.note !== this.noteReset)])
    this.loadDraft()
  },
  methods: {
    loadDraft: async function () {
      //console.log(this.note)
      if (this.note !== '') {
        return false
      }
      
      let note
      try {
        note = this.lib.RangyManager.getPinSelectionAnchorText()
      }
      catch (e) {
        console.error(e)
        this.lib.AnnotationPanel.hide()
        return false
      }
      
      note = this.lib.StringHelper.removePunctuations(note).trim()
      note = `<p>${note}</p>`
      this.note = note
      
      let noteReset = this.lib.StringHelper.htmlTrim(note)
      noteReset = this.lib.StringHelper.htmlToText(noteReset, true).trim()
      this.noteReset = noteReset
      
      if (this.$refs.editor) {
        this.$refs.editor.html(this.note)
      }
    },
    addAnnotation: async function () {
      this.setWaitSubmit()
      this.lib.AnnotationHelper.validate(this.annotation)
      
      let data = {
        anchorPositions: this.annotation.anchorPositions, // 所以，應該要在交給它的時候，就已經放入anchorPositions
        type: this.annotation.type,
        notes: {
          'default': this.note
        }
      }
      
      if (this.lib.auth.isEnableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      let id = 1
      if (debugMockSend === false) {
        id = await this.lib.AxiosHelper.post('/client/AnnotationSave/create', data)
      }
      else {
        console.log(data)
      }
      //let id = 1
      //console.log(id) // for test
      
      this.panelData.isAnnotationEditing = false
      
      if (typeof(id) !== 'number') {
        throw 'Create failed'
        return false  // 新增失敗
      }
      
      // ------------------------
      
      // 新增成功之後
      
      //this.lib.RangyManager.highlightPinnedSelectionFromAnnotation('my-' + this.annotation.type, this.pinSelection.anchorParagraphIds)
      this.annotation.id = id
      this.lib.AnnotationHelper.note(this.annotation, 'default', this.note)
      
      if (!this.lib.RangyManager) {
        return  // 似乎是不能執行RangeManager的時候了
      }
      
      this.lib.RangyManager.highlightPinnedSelectionFromAnnotation(this.annotation)
      if (this.$refs.editor) {
        this.$refs.editor.reset()
      }
      
      this.$emit('add')
    },
    
    /**
     * 編輯標註
     */
    editAnnotation: async function () {
      this.setWaitSubmit()
      let data = {
        id: this.annotation.id,
        notes: {
          'default': this.note
        }
        
      }
      
      //throw 'Test'
      //return 
      
      let result = 0
      if (debugMockSend === false) {
        result = await this.lib.AxiosHelper.post('/client/AnnotationSave/update', data)
      }
      
      this.panelData.isAnnotationEditing = false
      
      if (result !== 1) {
        throw this.$t('Update failed.')
      }
      
      // ----------------------
      // 新增成功之後
      
      //console.log('AAA?')
      this.annotation.notes[0].note = this.note
      
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

import ComputedConfig from './../computed/ComputedConfig'
ComputedConfig(Editor)

import ComputedButtons from './../computed/ComputedButtons'
ComputedButtons(Editor)

import MethodsAnnotation from './../methods/MethodsAnnotation'
MethodsAnnotation(Editor)

export default Editor