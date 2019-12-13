export default (Editor) => {
  Editor.data = function () {
    if (!this.annotation) {
      throw 'No annotation'
    }

    this.$i18n.locale = this.config.locale

    let question = ''
    let answer = ''

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
      questionReset: question,

      answer: answer,
      answerReset: answer,

      recommandResourceSearchIndex: 0,
      
      isQuestionSubmitted: isQuestionSubmitted,
      
      questionMinWords: this.status.readingConfig.annotationTypeModules['ConfusedClarified'].questionMinWords,
      answerMinWords: this.status.readingConfig.annotationTypeModules['ConfusedClarified'].answerMinWords,
      
      awaitSubmit: false
    }
  }
}