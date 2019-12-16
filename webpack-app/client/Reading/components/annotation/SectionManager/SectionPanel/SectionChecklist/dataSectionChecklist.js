export default (SectionChecklist) => {
  SectionChecklist.data = function () {
    this.$i18n.locale = this.config.locale

    //let checked = []

    if (!this.sectionsData.checklist[this.sectionSeqID]) {
      this.sectionsData.checklist[this.sectionSeqID] = []
      
      if (this.lib.auth.stepSectionAnnotationConfig 
              && this.lib.auth.stepSectionAnnotationConfig.checklist) {
        let checkListLength = this.lib.auth.stepSectionAnnotationConfig.checklist.length
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