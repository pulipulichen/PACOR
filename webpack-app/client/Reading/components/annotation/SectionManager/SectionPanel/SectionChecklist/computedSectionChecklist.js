import $ from 'jquery'

export default (SectionChecklist) => {
    
  SectionChecklist.computed.checked = function () {
    if (Array.isArray(this.sectionsData.checklist[this.sectionSeqID]) === false
            || this.sectionsData.checklist[this.sectionSeqID].length === 0) {
      this.sectionsData.checklist[this.sectionSeqID] = new Array(this.checklist.length)
    }

    let itemsFromLocalStorage = localStorage
            .getItem(this.localStorageKeyPrefix + 'checklist')
    //console.log(itemsFromLocalStorage)
    if (itemsFromLocalStorage !== null) {
      let json = JSON.parse(itemsFromLocalStorage)
      //console.log(json)
      json.forEach((item, i) => {
        if (typeof (item) === 'boolean') {
          this.sectionsData.checklist[this.sectionSeqID][i] = item
        }
      })
      //console.log(this.sectionsData.checklist[this.sectionSeqID])
    }

    if (this.checklistAnnotationIndex !== -1) {
      let hasAnnotation
      if (this.isChecklistAnnotationSubmitted === true) {
        hasAnnotation = true
      } else if (this.annotation && (typeof (this.annotation.id) === 'number')) {
        hasAnnotation = true
      } else {
        hasAnnotation = false
      }
      //this.sectionsData.checklist[this.sectionSeqID].splice(this.checklistAnnotationIndex, 1, hasAnnotation)
      this.sectionsData.checklist[this.sectionSeqID][this.checklistAnnotationIndex] = hasAnnotation
    }
    return this.sectionsData.checklist[this.sectionSeqID]
  }
  
  SectionChecklist.computed.annotation = function () {
    if (this.sectionsData.checklistAnnotation[this.sectionSeqID]) {
      return this.sectionsData.checklistAnnotation[this.sectionSeqID]
    }
    
    if (!this.lib.SectionManager) {
      return undefined
    }
    
    return this.lib.SectionManager.buildDefaultSectionAnnotation(this.sectionSeqID)
  }
  SectionChecklist.computed.computedSubmitButtonText = function () {
    if (this.isChecklistCompleted) {
      if (this.lib.SectionManager && this.lib.SectionManager.isArticleNote === false) {
        return this.$t('I have read this section!')
      }
      else {
        return this.$t('I have read this article!')
      }
    } else {
      return this.$t('Please finish checklist.')
    }
  }
  SectionChecklist.computed.localStorageKeyPrefix = function () {
    return `Pacor.SectionChecklist.${this.sectionSeqID}.`
  }
  SectionChecklist.computed.checklistAnnotationIndex = function () {
    let i = this.checklistConfig.indexOf('{SectionMainIdea}')
    //console.log(i)
    return i
  }
  
  SectionChecklist.computed.checklistConfig = function () {
    if (!this.lib.auth.stepSectionAnnotationConfig
            && Array.isArray(this.lib.auth.stepSectionAnnotationConfig.checklist) === false) {
      throw new Error(this.$t('Lost checklist config'))
      return []
    }
    
    let checklist = this.lib.auth.stepSectionAnnotationConfig.checklist
    if (this.lib.auth.currentStepConfig.highlightAnnotation.types.indexOf('Confused') === -1) {
      checklist = checklist.filter(i => (i !== '{HighlightConfused}'))
    }
    
    return checklist
  }
  
  SectionChecklist.computed.checklist = function () {
    let checklist = this.checklistConfig
    
    // 稍微過濾一下checklist的內容
    let isArticleNote = this.lib.SectionManager.isArticleNote
    let output = []
    checklist.map(item => {
      if (item === '{CheckRead}') {
        if (isArticleNote === true) {
          output.push('I have already read this article.')
        }
        else {
          output.push('I have already read this section.')
        }
      }
      else if (item === '{HighlightConfused}') {
        if (this.lib.auth.currentStepConfig.highlightAnnotation.types.indexOf('Confused') > -1) {
          if (this.lib.auth.hasCollaborationStep === true) {
            //output.push(`I have already written annotations on a sentence I don't understand.`)
            output.push(`When I read incomprehensible text, I have written down "questions".`)
          }
          else {
            output.push(`When I read incomprehensible text, I have written down "questions" and tried to find answers.`)
          }
        }
      }
      else if (item === '{SectionMainIdea}') {
        if (isArticleNote === true) {
          output.push('I have already written the main ideas of this article.')
        }
        else {
          output.push('I have already written the main ideas of this section.')
        }
      }
    })
    
    return output 
  }

  SectionChecklist.computed.computedSubmitButtonClass = function () {
    //console.log(this.isChecklistCompleted)
    let classList = []
    if (this.isChecklistCompleted === false) {
      //return 'disabled'
      classList.push('disabled')
    } else {
      //return 'positive'
      classList.push('positive')
    }
    //console.trace(classList)
    //this.$forceUpdate()
    return classList.join(' ')
  }
  
  SectionChecklist.computed.sectionHeader = function () {
    let selector = []
    for (let i = 1; i <= 6; i++) {
      selector.push(`[data-pacor-section-seq-id=${this.sectionSeqID}] h${i}:first`)
    }
    selector = selector.join(',')
    
    let header = $(selector)
    if (header.length > 0) {
      header = header.eq(0)
    }
    else {
      return undefined
    }
    
    return this.$t(':') + ' ' + header.text().trim()
  }
  
  SectionChecklist.computed.computedSectionMainIdeaButtonStyle = function () {
    let type = 'SectionMainIdea'
    let buttonStyle = this.status.readingConfig.annotationTypeModules[type].style.button
    return {
      color: buttonStyle.color,
      'background-color': buttonStyle.backgroundColor,
    }
  }
}