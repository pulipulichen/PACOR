/* global this */

let FooterButtons = {
  props: ['config', 'status', 'lib', 'annotation', 'panelData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
      public: (this.lib.auth.defaultPermission === 'public'),
      
      questionMinWords: this.status.readingConfig.annotationTypeModules['ConfusedClarified'].questionMinWords,
      answerMinWords: this.status.readingConfig.annotationTypeModules['ConfusedClarified'].answerMinWords,
    }
  },
//  components: {
//  },
  computed: {
    computedSubmitQuestionStyle () {
      let type = 'Confused'
      let buttonStyle = this.status.readingConfig.annotationTypeModules[type].style.button
      return {
        color: buttonStyle.color,
        'background-color': buttonStyle.backgroundColor,
      }
    },
    computedSubmitAnswerStyle () {
      let type = 'Clarified'
      let buttonStyle = this.status.readingConfig.annotationTypeModules[type].style.button
      return {
        color: buttonStyle.color,
        'background-color': buttonStyle.backgroundColor,
      }
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    submitQuestion: async function () {
      this.$parent.setWaitSubmit()
      
      this.annotation.properties = {
        question_submitted_at: (new Date()).getTime()
      }
      
      this.lib.AnnotationHelper.note(this.annotation, 'question', this.$parent.question)
      
      this.lib.AnnotationHelper.validate(this.annotation)
      
      let data = {
        anchorPositions: this.annotation.anchorPositions,
        type: this.annotation.type,
        notes: {
          'question': this.$parent.question
        },
        properties: this.annotation.properties
      }
      
      if (this.lib.auth.isEnableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let id = await this.lib.AxiosHelper.post('/client/AnnotationSave/create', data)
      //let id = 1
      this.panelData.isAnnotationEditing = false
      
      //console.log(id) // for test
      
      if (typeof(id) !== 'number') {
        throw 'Create failed'
        return false  // 新增失敗
      }
      
      // -----------------------------------------
      
      this.annotation.id = id
      this.lib.AnnotationHelper.note(this.annotation, 'question', this.$parent.question)
      
      //this.id = id
      // 請在這裡建立annotationInstance，然後轉換成edit狀態
      //this.id = id
      //this.type = this.annotationModule,
      //this.notes = {
      //  'question': this.question
      //}
      
      //this.lib.RangyManager.highlightPinnedSelection('my-' + this.annotation.type, this.pinSelection.anchorParagraphIds, false)
      this.lib.RangyManager.unpinSelection()
      this.lib.RangyManager.highlightPinnedSelectionFromAnnotation(this.annotation)
      
      // this.$emit('add')
      //this.$forceUpdate()
      //console.log(this.isQuestionSubmitted)
      this.$parent.isQuestionSubmitted = true
      this.lib.RangyManager.hoverIn(this.annotation)
      
      //console.log(this.answer)
      //this.answer = ''
      //this.answerReset = ''
      //this.$refs.AnswerEditor.html('')
//      setTimeout(() => {
//        console.log(this.answer)
//      }, 100)
      this.$parent.awaitSubmit = false
    },
    
    submitAnswer: async function () {
      this.$parent.setWaitSubmit()
      let type = 'Clarified'
      this.annotation.properties.answer_submitted_at = (new Date()).getTime()
      
      this.lib.AnnotationHelper.note(this.annotation, 'question', this.$parent.question)
      this.lib.AnnotationHelper.note(this.annotation, 'answer', this.$parent.answer)
      
      let notes = {
          'question': this.$parent.question,
          'answer': this.$parent.answer
        }
      
      let data = {
        id: this.annotation.id,
        type: type,
        notes: notes,
        properties: this.annotation.properties
      }
      
      if (this.lib.auth.isEnableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.post('/client/AnnotationSave/update', data)
      //let result = 1
      this.panelData.isAnnotationEditing = false
      //console.log(result) // for test
      if (result !== 1) {
        throw 'Update failed'
        return false  // 新增失敗
      }
      
      // ------------------------------------------------
      
      this.lib.AnnotationHelper.note(this.annotation, notes)
      
      //this.rangy.highlightPinnedSelection('my-' + this.annotationModule, this.pinSelection.anchorParagraphIds)
      //this.rangy.reloadMyHighlights()
      //this.$emit('reloadMyHighlights')
      await this.lib.RangyManager.reloadMyHighlights()
      
      this.$emit('update')
      //console.log('update')
      this.annotation.type = type
    },
    
    writeLater: async function () {
      this.$parent.setWaitSubmit()
      
      this.lib.AnnotationHelper.note(this.annotation, 'question', this.$parent.question)
      this.lib.AnnotationHelper.note(this.annotation, 'answer', this.$parent.answer)
      
      let data = {
        id: this.annotation.id,
        notes: {
          'question': this.$parent.question,
          'answer': this.$parent.answer
        }
      }
      
      if (this.lib.auth.isEnableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.post('/client/AnnotationSave/update', data)
      //console.log(id) // for test
      
      this.panelData.isAnnotationEditing = false
      
      if (result !== 1) {
        throw 'Update failed'
        return false  // 新增失敗
      }
      
      this.$emit('update')
    },
    onComment () {
      this.lib.AnnotationPanel.focusCommentInput()
    }
  } // methods
}

export default FooterButtons