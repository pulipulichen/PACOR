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
        this.questionReset = question
        
        this.answer = answer
        this.answerReset = answer
        
        console.log(answer)
      }
    }
  }
}