export default (Editor) => {
  Editor.computed = {

    isQuestionEdited() {
      return (this.question !== this.questionReset)
    },

    isQuestionSubmitted() {
      return (this.annotation 
              && typeof(this.annotation.id) === 'number' )
      //console.log(this.properties)
      /*
      return (this.annotation
              && this.annotation.properties
              && typeof (this.annotation.properties.question_submitted_at) === 'number')
       */
    },

    isEnableSubmitQuestion() {
      return (this.isQuestionEdited
              && typeof (this.question) === 'string'
              && this.question !== '')
    },

    // ----------------------------------

    isAnswerEdited() {
      return (this.answer !== this.answerReset)
    },

    isAnswerSubmitted() {
      return (this.annotation
              && this.annotation.properties
              && typeof (this.annotation.properties.answer_submitted_at) === 'number')
    },

    isEnableSubmitAnswer() {
      return (this.isAnswerEdited
              && typeof (this.answer) === 'string'
              && this.answer !== '')
    },

    // ----------------------------------

    isNoteEdited() {
      return (this.isQuestionEdited || this.isAnswerEdited)
    },

    // ----------------------------------

    computedQuestionEditorHeight() {
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
        
      } else {
        
        let height
        if (this.enableCollaboration === true
                && this.lib.style.isStackWidth()) {
          height = (this.lib.style.getClientHeight() / 2)
          height = `calc(${height}px - 21em)`
          
        } else {
          
          height = `5em`
        }
        //console.log(height)
        return height
      }
    },

    computedAnswerEditorHeight() {
      let height
      if (this.enableCollaboration === true
              && this.lib.style.isStackWidth()) {
        height = (this.lib.style.getClientHeight() / 2)
        height = `calc(${height}px - 10em)`
      } else {
        height = `calc(${this.heightPX}px - 15em)`
      }
      //console.log(height)
      return height
    },
    
    questionPlaceholder() {
      let config = this.status.readingConfig.annotationTypeModules['ConfusedClarified']
      return this.$t(config.questionPlaceholder)
    },
    
    answerPlaceholder() {
      let config = this.status.readingConfig.annotationTypeModules['ConfusedClarified']
      return this.$t(config.answerPlaceholder)
    },
    
    // ------------------------------------------

    anchorText() {
      //console.log(this.annotation)
      
      let anchorTexts = this.lib.RangyManager.getAnchorTextArrayFromAnnotation(this.annotation)
      let anchorText = anchorTexts.join(' ')

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

    // -------------------

  }
}