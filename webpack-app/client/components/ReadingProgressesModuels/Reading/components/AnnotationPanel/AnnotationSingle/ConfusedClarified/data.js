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

    //console.log(question, answer)

    return {
      question: question,
      questionReset: question,

      answer: answer,
      answerReset: answer,

      recommandResourceSearchIndex: 0,
    }
  }
}