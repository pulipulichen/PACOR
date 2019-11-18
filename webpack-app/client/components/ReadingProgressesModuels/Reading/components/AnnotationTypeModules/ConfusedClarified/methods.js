/* global this */

export default (Editor) => {
  Editor.methods = {
    
    onQuestionChange (content) {
      this.question = content
      //this.isQuestionEdited = true  // 不應該用這個，應該要用reset
    },
    
    onAnswerChange (content) {
      this.answer = content
      //this.isQuestionEdited = true  // 不應該用這個，應該要用reset
    },
    
    
    selectQuestion (question) {
      if (!this.$refs.QuestionEditor) {
        //setTimeout(() => {
        //  this.selectQuestion(question)
        //}, 100)
        return false
      }
      //console.log([this.isQuestionEdited, this.question, this.questionReset])
      if (this.isQuestionEdited === true
          && this.question !== '') {
        if (!window.confirm(this.$t('New question will overwrite your question. Are you sure?'))) {
          return false
        }
      }
      //console.log(question)
      let q = this._convertQuestionTemplate(question.template)
      this.$refs.QuestionEditor.html(q)
      this.question = q
      this.questionReset = q
      this.recommandResourceSearchIndex = question.searchIndex
    },
    
    _convertQuestionTemplate (template) {
      let q = template.replace(`{anchorText}`, '{0}')
      let anchorText = this.anchorText
      //console.log(anchorText)
      if (anchorText === undefined) {
        anchorText = this.lib.RangyManager.getPinSelectionAnchorText()
        //console.log(anchorText)
        anchorText = this.lib.StringHelper.removePunctuations(anchorText)
      }
      
      q = '<p>' + this.$t(q, [anchorText]) + '</p>'
      return q
    },
    
    // ------------------
    
    submitQuestion: async function () {
      this.annotation.properties = {
        question_submitted_at: (new Date()).getTime()
      }
      
      this.lib.AnnotationHelper.note(this.annotation, 'question', this.question)
      
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
      //let id = 1
      
      //console.log(id) // for test
      
      if (typeof(id) !== 'number') {
        throw 'Create failed'
        return false  // 新增失敗
      }
      
      // -----------------------------------------
      
      this.annotation.id = id
      this.lib.AnnotationHelper.note(this.annotation, 'question', this.question)
      
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
      this.isQuestionSubmitted = true
      this.lib.RangyManager.hoverIn(this.annotation)
      
      //console.log(this.answer)
      //this.answer = ''
      //this.answerReset = ''
      //this.$refs.AnswerEditor.html('')
//      setTimeout(() => {
//        console.log(this.answer)
//      }, 100)
    },
    
    submitAnswer: async function () {
      let type = 'Clarified'
      this.annotation.properties.answer_submitted_at = (new Date()).getTime()
      
      this.lib.AnnotationHelper.note(this.annotation, 'question', this.question)
      this.lib.AnnotationHelper.note(this.annotation, 'answer', this.answer)
      
      let notes = {
          'question': this.question,
          'answer': this.answer
        }
      
      let data = {
        id: this.annotation.id,
        type: type,
        notes: notes,
        properties: this.annotation.properties
      }
      
      if (this.lib.auth.currentStepAnnotationConfig.enableControlPermission === true) {
        data.public = this.public
      }
      
      //console.log(data)
      
      let result = await this.lib.AxiosHelper.post('/client/Annotation/update', data)
      //let result = 1
      
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
      this.lib.AnnotationHelper.note(this.annotation, 'question', this.question)
      this.lib.AnnotationHelper.note(this.annotation, 'answer', this.answer)
      
      let data = {
        id: this.annotation.id,
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
    
  } // methods
}