import CommonProps from './../commons/CommonProps'
import CommonComputed from './../commons/CommonComputed'
import CommonWatch from './../commons/CommonWatch'
import CommonMethods from './../commons/CommonMethods'

import AnnotationEditorHeader from './../components/AnnotationEditorHeader/AnnotationEditorHeader.vue'
import QuestionTemplate from './../components/QuestionTemplate/QuestionTemplate.vue'
import ResourceSearch from './../components/ResourceSearch/ResourceSearch.vue'

let Confused = {
  props: CommonProps,
  data() {
    this.$i18n.locale = this.config.locale
    
    let question = ''
    let answer = ''
    let properties = null
    //let note = '<p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>' // for test
    if (this.annotationInstance !== null 
            && typeof(this.annotationInstance) === 'object') {
      
      if (this.annotationInstance.note !== null 
              && typeof(this.annotationInstance.note) === 'object') {
        let note = this.annotationInstance.note
        ({question, answer} = note)
      }
      
      if (this.annotationInstance.properties !== null 
              && typeof(this.annotationInstance.properties) === 'object') {
        properties = this.annotationInstance.properties
      }
    }
    
    return {
      question: question,
      questionReset: question,
      isQuestionEdited: false,
      answer: answer,
      answerReset: answer,
      isAnswerEdited: false,
      properties: properties,
      recommandResourceSearchIndex: 0
      //public: 
    }
  },
  components: {
    'annotation-editor-header': AnnotationEditorHeader,
    'question-template': QuestionTemplate,
    'resource-search': ResourceSearch,
  },
  computed: {
    annotationConfig () {
      return this.lib.auth.currentStepAnnotationConfig
    },
    public () {
      return (this.annotationConfig.defaultPermission === 'public')
    },
    isAnswerDifferent () {
      return (this.answer !== this.answerReset)
    },
    isQuestionDifferent () {
      return (this.question !== this.questionReset)
    },
    isNoteDifferent () {
      return (this.isAnswerDifferent || this.isAnswerDifferent)
    },
    isQuestionSubmitted () {
      return (typeof(this.properties.question.submitted_at) === 'number')
    },
    isAnswerSubmitted () {
      return (typeof(this.properties.answer.submitted_at) === 'number')
    },
    enableAddAnnotation () {
      if (this.isNoteDifferent 
              && typeof(this.question) === 'string'
              && this.question !== '') {
        return true
      }
      return false
    },
    enableEditAnnotation () {
      return this.enableAddAnnotation
    },
    computedQuestionEditorHeight () {
      if (this.isQuestionSubmitted === false) {
        return CommonComputed.computedEditorHeight(this)
      }
      else {
        return this.computedAnswerEditorHeight
      }
    },
    computedAnswerEditorHeight () {
      let height
      if (this.enableCollaboration === true
              && this.lib.style.isStackWidth()) {
        height = (this.lib.style.getClientHeight() / 3)
        height = `calc(${height}px - 6em)`
      } else {
        height = `calc(${this.heightPX}px - 12em)`
      }
      //console.log(height)
      return height
    },
    computedButtonsClass () {
      return CommonComputed.computedButtonsClass(this)
    },
    moduleConfig () {
      return this.status.readingConfig.annotationTypeModules[this.annotationModule]
    },
    anchorText () {
      if (this.annotationInstance === null) {
        return this.rangy.getPinSelectionAnchorText()
      }
      else {
        return this.rangy.getHoverAnchorText()
      }
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
    submitQuestion: async function () {
      throw 'submitQuestion'
      
      let data = {
        anchorPositions: this.pinSelection.anchorPositions,
        type: this.annotationModule,
        note: this.note
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
    submitAnwser: async function () {
      throw 'submitAnwser'
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
    },
    selectQuestion (question) {
      if (this.isQuestionEdited === false) {
        if (!window.confirm($t('New question will overwrite your question. Are you sure?'))) {
          return false
        }
      }
      
      let q = question.template.replace(`{anchorText}`, '{0}')
      q = this.$t(q, [this.anchorText])
      this.$refs.questionEditor.html(q)
      this.isQuestionEdited = false
      this.recommandResourceSearchIndex = question.searchIndex
    }
  } // methods
}

export default Confused