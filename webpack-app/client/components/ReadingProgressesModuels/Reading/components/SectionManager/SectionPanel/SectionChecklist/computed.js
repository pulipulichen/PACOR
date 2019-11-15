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
    } else {
      return {
        type: 'SectionMainIdea',
        anchorPositions: [{
            type: 'section',
            seq_id: this.sectionSeqID
          }],
        notes: [{
            type: 'default',
            note: ''
          }]
      }
    }
  }
  SectionChecklist.computed.computedSubmitButtonText = function () {
    if (this.isChecklistCompleted) {
      return this.$t('I have read this section!')
    } else {
      return this.$t('Please finish checklist.')
    }
  }
  SectionChecklist.computed.localStorageKeyPrefix = function () {
    return `Pacor.SectionChecklist.${this.sectionSeqID}.`
  }
  SectionChecklist.computed.checklistAnnotationIndex = function () {
    let i = this.checklist.indexOf('SectionMainIdea')
    //console.log(i)
    return i
  }
  SectionChecklist.computed.checklist = function () {
    if (Array.isArray(this.lib.auth.currentStepConfig.checklist)) {
      let checklist = this.lib.auth.currentStepConfig.checklist
      //console.log(checklist)

      //this.checklistAnnotationIndex = checklist.indexOf('SectionMainIdea')

      //

      //console.log(this.sectionSeqID)
      //console.log(this.sectionsData)
//        if (!this.sectionsData.checklist 
//                || typeof(this.sectionsData.checklist[this.sectionSeqID]) === 'undefined') {
//          //this.sectionsData.checklist
//          this.sectionsData.checklist = []
//          this.sectionsData.checklist[this.sectionSeqID] = {}
//        }


      //this.checklistData = checklistData
      //console.log(checklistData, typeof(checklistData), Array.isArray(checklistData))
      //this.checked = checklistData
      /*
       if (Array.isArray(checklistData) === false
       && typeof(checklistData) === 'object') {
       Object.keys(checklistData).forEach(key => {
       this.checked[key] = checklistData[key]
       })
       }
       else if (Array.isArray(checklistData)) {
       checklistData.forEach((value, i) => {
       this.checked[i] = value
       })
       }
       */

      //this.checked[this.checklistAnnotationIndex] = (this.isChecklistAnnotationSubmitted === true)
      //this.$forceUpdate()
      //console.log(this.checked)
      return checklist
    }
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
}