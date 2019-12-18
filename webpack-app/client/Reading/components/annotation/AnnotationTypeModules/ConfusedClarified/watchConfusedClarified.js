export default (Editor) => {
  Editor.watch = {
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
        let questionReset = this.lib.StringHelper.htmlTrim(question)
        questionReset = this.lib.StringHelper.htmlToText(questionReset)
        this.questionReset = questionReset
        console.log({questionReset})
        
        this.answer = answer
        //this.answerReset = this.lib.StringHelper.htmlTrim(answer)
        let answerReset = this.lib.StringHelper.htmlTrim(answer)
        answerReset = this.lib.StringHelper.htmlToText(answerReset)
        this.answerReset = answerReset
        //console.log(answer)
      }
    }
  }
}