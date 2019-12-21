export default (Editor) => {
  Editor.data = function () {
    if (!this.annotation) {
      throw 'No annotation'
    }

    this.$i18n.locale = this.config.locale

    let question = ''
    let questionReset = ''
    let answer = ''
    let answerReset = ''

    if (Array.isArray(this.annotation.notes)) {
      this.annotation.notes.forEach(note => {
        if (note.type === 'question') {
          question = note.note
        } else if (note.type === 'answer') {
          answer = note.note
        }
      })
    }
    
    if (question === '') {
      let template = this.status.readingConfig.annotationTypeModules['ConfusedClarified'].questionTemplates[0].template
      question = this._convertQuestionTemplate(template)
    }
    
    if (answer !== '') {
      let note = this.lib.StringHelper.htmlTrim(answer)
      note = this.lib.StringHelper.htmlToText(note)
      answerReset = note
    }
    
    if (question !== '') {
      let note = this.lib.StringHelper.htmlTrim(question)
      note = this.lib.StringHelper.htmlToText(note)
      questionReset = note
    }
    
    let isQuestionSubmitted = false
    if (typeof(this.annotation.id) === 'number') {
      isQuestionSubmitted = true
    }
    
    //console.log(question, answer)
    
    this.hook.commentLike = (comment) => {
      this.onCommentLike(comment)
    }

    return {
      question: question,
      questionReset: questionReset,

      answer: answer,
      answerReset: answerReset,

      recommandResourceSearchIndex: 0,
      
      isQuestionSubmitted: isQuestionSubmitted,
      
      questionMinWords: this.status.readingConfig.annotationTypeModules['ConfusedClarified'].questionMinWords,
      answerMinWords: this.status.readingConfig.annotationTypeModules['ConfusedClarified'].answerMinWords,
      
      awaitSubmit: false
    }
  }
}