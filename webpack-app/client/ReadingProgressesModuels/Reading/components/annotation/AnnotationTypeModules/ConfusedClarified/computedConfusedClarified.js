let answerHeightPadding = '8em'

export default (Editor) => {
  Editor.computed = {

    isQuestionEdited() {
      //let note = this.lib.StringHelper.htmlToText(this.question).trim()
      //return (note !== this.questionReset)
      return (this.question !== this.questionReset)
    },

//    isQuestionSubmitted() {
//      return (this.annotation 
//              && typeof(this.annotation.id) === 'number' )
//      //console.log(this.properties)
//      /*
//      return (this.annotation
//              && this.annotation.properties
//              && typeof (this.annotation.properties.question_submitted_at) === 'number')
//       */
//    },

    isEnableSubmitQuestion() {
      return (typeof (this.question) === 'string'
              && this.question !== '')
    },

    // ----------------------------------

    isAnswerEdited() {
      //let note = this.lib.StringHelper.htmlToText(this.answer).trim()
      //return (note !== this.answerReset)
      return (this.answer !== this.answerReset)
    },

    isAnswerSubmitted() {
      return (this.annotation
              && this.annotation.properties
              && typeof (this.annotation.properties.answer_submitted_at) === 'number')
    },

    isEnableSubmitAnswer() {
      if (typeof(this.answer) === 'string' 
              && this.answer === '') {
        return false
      }
      if (typeof(this.question) === 'string'
              && this.question === '') {
        return false
      }
      return (this.isAnswerEdited || this.isQuestionEdited)
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
          height = `calc(${height}px - 9em)`
        } else {
          height = `calc(${this.heightPX}px - 9em)`
        }
        //console.log(height)
        return height
        
      } else {
        return answerHeightPadding
        
//        let height
//        if (this.enableCollaboration === true
//                && this.lib.style.isStackWidth()) {
//          height = (this.lib.style.getClientHeight() / 2)
//          height = `calc(${height}px - 21em)`
//          
//        } else {
//          
//          height = `5em`
//        }
//        //console.log(height)
//        return height
      }
    },

    computedAnswerEditorHeight() {
      let height
      if (this.enableCollaboration === true
              && this.lib.style.isStackWidth()) {
        height = (this.lib.style.getClientHeight() / 2)
        height = `calc(${height}px - ${answerHeightPadding})`
      } else if (this.heightPX > 400) {
        //console.log(this.heightPX)
        height = `calc(${this.heightPX}px - ${answerHeightPadding} - 10em)`
      }
      else {
        height = `10em`
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
      
      let anchorTexts
      //try {
        anchorTexts = this.lib.RangyManager.getAnchorTextArrayFromAnnotation(this.annotation)
      //}
//      catch (e) {
//        console.error(e)
//        this.lib.AnnotationPanel.hide()
//        return ''
//      }
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