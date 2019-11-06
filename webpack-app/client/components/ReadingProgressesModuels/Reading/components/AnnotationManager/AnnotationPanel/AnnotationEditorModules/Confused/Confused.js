import CommonProps from './../commons/CommonProps'
import CommonComputed from './../commons/CommonComputed'
import CommonWatch from './../commons/CommonWatch'
import CommonMethods from './../commons/CommonMethods'

import AnnotationEditorHeader from './../components/AnnotationEditorHeader/AnnotationEditorHeader.vue'
import QuestionTemplate from './../components/QuestionTemplate/QuestionTemplate.vue'
import ExternalResource from './../components/ExternalResource/ExternalResource.vue'

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
      answer: answer,
      answerReset: answer,
      properties: properties
      //public: 
    }
  },
  components: {
    'annotation-editor-header': AnnotationEditorHeader,
    'question-template': QuestionTemplate,
    'external-resource': ExternalResource,
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
    isQuestionExists () {
      return (typeof(this.properties.question.updated_at) === 'number')
    },
    isAnswerExists () {
      return (typeof(this.properties.answer.updated_at) === 'number')
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
    computedEditorHeight () {
      return CommonComputed.computedEditorHeight(this)
    },
    computedButtonsClass () {
      return CommonComputed.computedButtonsClass(this)
    },
    moduleConfig () {
      return this.status.readingConfig.annotationTypeModules[this.annotationModule]
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
    }
  } // methods
}

export default Confused