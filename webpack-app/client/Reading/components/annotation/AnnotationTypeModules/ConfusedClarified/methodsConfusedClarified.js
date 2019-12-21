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
    
    
    selectQuestion: async function (question) {
      if (!this.$refs.QuestionEditor) {
        //setTimeout(() => {
        //  this.selectQuestion(question)
        //}, 100)
        return false
      }
      //console.log(this.isQuestionEdited, this.question, this.questionReset)
      if (this.isQuestionEdited === true
          && this.question !== '') {
        let title = this.$t('New question will overwrite your question. Are you sure?')
        let confirm = await this.lib.ConfirmModal.show(title)
        if (confirm === false) {
          return false
        }
      }
      //console.log(question)
      let q = this._convertQuestionTemplate(question.template)
      this.$refs.QuestionEditor.html(q)
      this.question = q
      
      let questionReset = this.lib.StringHelper.htmlTrim(q)
      this.questionReset = this.lib.StringHelper.htmlToText(questionReset)
      //this.questionReset = this.lib.StringHelper.htmlTrim(q)
      this.recommandResourceSearchIndex = question.searchIndex
    },
    
    _convertQuestionTemplate (template) {
      if (!this.lib.RangyManager) {
        return null
      }
      
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
    
    
    
    onCommentLike: async function (comment) {
      
      //console.log(comment)
      if (this.isEditable === false) {
        return null
      }
      
      let commentNote = comment.note
      
      if (this.answer !== '') {
        let title = this.$t('Do you want to use his comment as your answer?')
        let confirm = await this.lib.ConfirmModal.show(title)
        if (confirm === false) {
          return null
        }
      }
      
      this.answer = commentNote
      let answerReset = this.lib.StringHelper.htmlTrim(commentNote)
      answerReset = this.lib.StringHelper.htmlToText(answerReset)
      this.answerReset = answerReset
      
      this.panelData.isAnnotationEditing = true
      
      this.$refs.AnswerEditor.html(this.answer)
      
      this.$refs.AnswerEditor.focus(true)
    }
  } // methods
}