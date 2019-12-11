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
        this.questionReset = this.lib.StringHelper.htmlTrim(question)
        
        this.answer = answer
        this.answerReset = this.lib.StringHelper.htmlTrim(answer)
        
        //console.log(answer)
      }
    }
  }
}