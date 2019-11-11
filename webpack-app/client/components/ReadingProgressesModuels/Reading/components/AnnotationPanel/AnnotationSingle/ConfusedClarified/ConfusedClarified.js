import props from './../Traits/props'

import QuestionTemplate from './../components/QuestionTemplate/QuestionTemplate.vue'
import ResourceSearch from './../components/ResourceSearch/ResourceSearch.vue'

let Confused = {
  props: props,
  data() {
    if (!this.annotation) {
      throw 'No annotation'
    }
    
    this.$i18n.locale = this.config.locale
    
    let question = ''
    let answer = ''
    //let properties = null
    //let notes
    //let type
    //let id
    //let note = '<p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p><p>1</p>' // for test
    
    
    //console.log(this.annotationInstance)
    
    if (this.annotation) {
      
      ({type, id} = this.annotation)
      
      //console.log(this.annotationInstance)
//      if (this.annotationInstance.note !== null 
//              && this.annotationInstance.note !== undefined
//              && typeof(this.annotationInstance.note) === 'object') {
//        notes = this.annotationInstance.note
//        ({question, answer} = notes)
//      }
      if (Array.isArray(this.annotation.notes)) {
        this.annotation.notes.forEach(note => {
          if (note.type === 'question') {
            question = note.note
          }
          else if (note.type === 'answer') {
            answer = note.note
          }
        })
      }
      
      //if (this.annotation.properties) {
      //  properties = this.annotation.properties
      //}
    }
    
    //console.log(question, answer)
    
    return {
      question: question,
      questionReset: question,
      
      answer: answer,
      answerReset: answer,
      
      recommandResourceSearchIndex: 0,
      
      //id: id,
      //type: type,
      //notes: notes,
      //properties: properties
      //public: 
    }
  },
  components: {
//    'annotation-editor-header': AnnotationEditorHeader,
    'question-template': QuestionTemplate,
    'resource-search': ResourceSearch,
  },
  computed: {

    isQuestionDifferent () {
      return (this.question !== this.questionReset)
    },
    
    isQuestionSubmitted () {
      //console.log(this.properties)
      return (this.annotation 
              && this.annotation.properties
              && typeof(this.annotation.properties.question_submitted_at) === 'number')
    },
    
    isEnableSubmitQuestion () {
      return (this.isQuestionDifferent 
              && typeof(this.question) === 'string'
              && this.question !== '')
    },
    
    // ----------------------------------
    
    
    isAnswerDifferent () {
      return (this.answer !== this.answerReset)
    },
    
    isAnswerSubmitted () {
      return (this.annotation 
              && this.annotation.properties
              && typeof(this.annotation.properties.answer_submitted_at) === 'number')
    },
    
    isEnableSubmitAnswer () {
      return (this.isAnswerDifferent 
              && typeof(this.answer) === 'string'
              && this.answer !== '')
    },
    
    // ----------------------------------
    
    computedQuestionEditorHeight () {
      if (this.isQuestionSubmitted === false) {
        let height
        if (this.enableCollaboration === true
                && this.lib.style.isStackWidth()) {
          height = (this.lib.style.getClientHeight() / 2)
          height = `calc(${height}px - 14em)`
        } else {
          height = `calc(${this.heightPX}px - 14em)`
        }
        //console.log(height)
        return height
      }
      else {
        let height
        if (this.enableCollaboration === true
                && this.lib.style.isStackWidth()) {
          height = (this.lib.style.getClientHeight() / 2)
          height = `calc(${height}px - 21em)`
        } else {
          height = `calc(${this.heightPX}px - 21em)`
        }
        //console.log(height)
        return height
      }
    },
    
    computedAnswerEditorHeight () {
      let height
      if (this.enableCollaboration === true
              && this.lib.style.isStackWidth()) {
        height = (this.lib.style.getClientHeight() / 2)
        height = `calc(${height}px - 10em)`
      } else {
        height = `calc(${this.heightPX}px - 21em)`
      }
      //console.log(height)
      return height
    },
    
    anchorText () {
      let anchorText = this.lib.RangyManager.getAnchorTextArrayFromAnnotation(this.annotation).join(' ')
      
      if (anchorText === undefined) {
        return ''
      }
      
      // 刪除標點符號
      anchorText = this.lib.StringHelper.removePunctuations(anchorText)
      
      //console.log(anchorText)
      return anchorText
    },
//    isEditable () {
//      return CommonComputed.isEditable(this)
//    },
    questionPlaceholder () {
      let config = this.status.readingConfig.annotationTypeModules['ConfusedClarified']
      return this.$t(config.questionPlaceholder)
    },
    answerPlaceholder () {
      let config = this.status.readingConfig.annotationTypeModules['ConfusedClarified']
      return this.$t(config.answerPlaceholder)
    }
  },
  watch: {
    annotation (annotation) {
      if (annotation
            && Array.isArray(annotation.notes)
            && annotation.notes.length > 0) {
        let question = ''
        let answer = ''
        
        annotation.notes.forEach(note => {
          if (note.type === 'question') {
            question = note.note
          }
          else if (note.type === 'answer') {
            answer = note.note
          }
        })
      
        this.question = question
        this.questionReset = question
        
        this.answer = answer
        this.answerReset = answer
      }
    }
  },
//  mounted() {
//  },
  methods: {
    onQuestionChange (content) {
      this.question = content
    },
    
    submitQuestion: async function () {
      this.annotation.properties = {
        question_submitted_at: (new Date()).getTime()
      }
      
      let data = {
        anchorPositions: this.annotation.anchorPositions,
        type: this.annotation.type,
        notes: {
          'question': this.question
        },
        properties: this.annotation.properties
      }
      
      if (this.lib.auth.currentStepAnnotationConfig.enableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let id = await this.lib.AxiosHelper.post('/client/Annotation/create', data)
      //console.log(id) // for test
      
      if (typeof(id) !== 'number') {
        throw 'Create failed'
        return false  // 新增失敗
      }
      //this.id = id
      // 請在這裡建立annotationInstance，然後轉換成edit狀態
      //this.id = id
      //this.type = this.annotationModule,
      //this.notes = {
      //  'question': this.question
      //}
      
      this.lib.RangyManager.highlightPinnedSelection('my-' + this.annotationModule, this.pinSelection.anchorParagraphIds, false)
    },
    submitAnswer: async function () {
      let type = 'Clarified'
      this.type = type
      this.properties.answer_submitted_at = (new Date()).getTime()
      
      let data = {
        id: this.id,
        type: type,
        notes: {
          'question': this.question,
          'answer': this.answer
        },
        properties: this.properties
      }
      
      if (this.lib.auth.currentStepAnnotationConfig.enableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.post('/client/Annotation/update', data)
      //console.log(result) // for test
      if (result !== 1) {
        throw 'Update failed'
        return false  // 新增失敗
      }
      
      //this.rangy.highlightPinnedSelection('my-' + this.annotationModule, this.pinSelection.anchorParagraphIds)
      //this.rangy.reloadMyHighlights()
      this.$emit('reloadMyHighlights')
      this.$emit('update')
    },
    writeLater: async function () {
      let data = {
        id: this.id,
        notes: {
          'question': this.question,
          'answer': this.answer
        }
      }
      
      if (this.lib.auth.currentStepAnnotationConfig.enableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.post('/client/Annotation/update', data)
      //console.log(id) // for test
      if (result !== 1) {
        throw 'Update failed'
        return false  // 新增失敗
      }
      
      this.$emit('update')
    },
    selectQuestion (question) {
      if (!this.$refs.QuestionEditor) {
        setTimeout(() => {
          this.selectQuestion(question)
        }, 100)
        return false
      }
      //console.log([this.isQuestionEdited, this.question])
      if (this.isQuestionEdited === true
          && this.question !== '') {
        if (!window.confirm(this.$t('New question will overwrite your question. Are you sure?'))) {
          return false
        }
      }
      //console.log(question)
      let q = question.template.replace(`{anchorText}`, '{0}')
      //console.log(this.anchorText)
      q = this.$t(q, [this.anchorText])
      this.$refs.QuestionEditor.html(q)
      this.isQuestionEdited = false
      this.recommandResourceSearchIndex = question.searchIndex
    }
  } // methods
}

export default Confused