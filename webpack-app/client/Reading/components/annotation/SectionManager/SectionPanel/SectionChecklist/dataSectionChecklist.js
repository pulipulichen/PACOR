export default (SectionChecklist) => {
  SectionChecklist.data = function () {
    this.$i18n.locale = this.config.locale

    //let checked = []

    if (!this.sectionsData.checklist[this.sectionSeqID]) {
      this.sectionsData.checklist[this.sectionSeqID] = []
      
      if (this.lib.auth.stepSectionAnnotationConfig 
              && this.lib.auth.stepSectionAnnotationConfig.checklist) {
        let checkList = this.lib.auth.stepSectionAnnotationConfig.checklist
        if (this.lib.auth.currentStepConfig.highlightAnnotation.types.indexOf('Confused') === -1) {
          checkList = checkList.filter(i => (i !== '{HighlightConfused}'))
        }
        let checkListLength = checkList.length
        for (let i = 0; i < checkListLength; i++) {
          this.sectionsData.checklist[this.sectionSeqID].push(false)
        }
      }
    }

    //if (this.sectionsData.checklist 
    //        && this.sectionsData.checklist[this.sectionSeqID]
    //        && Array.isArray(this.sectionsData.checklist[this.sectionSeqID])) {
    //checked = this.sectionsData.checklist[this.sectionSeqID]
    //console.log(checked)
    //}

    let isChecklistAnnotationSubmitted = false
    if (this.sectionsData.checklistAnnotation[this.sectionSeqID]) {
      isChecklistAnnotationSubmitted = true
    }

    return {
      //checked: checked,
      //checklistAnnotationIndex: -1,
      isChecklistAnnotationSubmitted: isChecklistAnnotationSubmitted,
      isChecklistCompleted: false
              //wroteAnnotationAt: null
    }
  }
}