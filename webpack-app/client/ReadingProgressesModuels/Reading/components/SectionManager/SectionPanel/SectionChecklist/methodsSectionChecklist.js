let debugMockUpdate = true
if (debugMockUpdate === true) {
  console.log('@test debugMockUpdate')
}

export default (SectionChecklist) => {

  SectionChecklist.methods.onChecklistItemChange = function (i) {
    //console.log(i, this.checked)
    //this.checked.splice(i, 1, !this.checked[i])
    this.checked[i] = !this.checked[i]
    this.$forceUpdate()

    //console.log(i, this.checked)
    //console.log(this.isChecklistCompleted)
    this.checkIsChecklistCompleted()
    this._saveToLocalStorage()
    //console.log(this.isChecklistCompleted)
  }
  SectionChecklist.methods._saveToLocalStorage = function () {
    let data = JSON.stringify(this.checked)
    //console.log(data)
    localStorage.setItem(this.localStorageKeyPrefix + 'checklist', data)
  }
  SectionChecklist.methods.removeLocalStorage = function () {
    localStorage.removeItem(this.localStorageKeyPrefix + 'checklist')
  }
  
  SectionChecklist.methods.openSectionAnnotationEditor = function () {
    this.lib.AnnotationPanel.setAnnotation(this.annotation, {
      'add': (annotation) => {
        annotation.user = this.lib.auth.annotationUserData
        this.sectionsData.checklistAnnotation.splice(this.sectionSeqID, 1, annotation)
        this.sectionsData.checklist[this.sectionSeqID][this.checklistAnnotationIndex] = true
        this.isChecklistAnnotationSubmitted = true

        //this.sectionsData.annotation.splice(this.sectionSeqID, 1, [annotation])
        if (!this.sectionsData.annotation[this.sectionSeqID]) {
          this.sectionsData.annotation[this.sectionSeqID] = {}
        }
        if (!this.sectionsData.annotation[this.sectionSeqID].annotations) {
          this.sectionsData.annotation[this.sectionSeqID].annotations = []
        }
        this.sectionsData.annotation[this.sectionSeqID].annotations.push(annotation)
        
        this.checkIsChecklistCompleted()
        //console.log(this.checked)
        this._saveToLocalStorage()
        //console.log(this.sectionsData)
        //this.$emit('')
      },
      'update': (annotation) => {
        //console.log(annotation)
        //this.sectionsData.checklistAnnotation[this.sectionSeqID] = annotation
        this.sectionsData.checklistAnnotation.splice(this.sectionSeqID, 1, annotation)
      },
    })
  }
  SectionChecklist.methods.submitChecklist = async function () {
    this.sectionsData.checklist[this.sectionSeqID] = this.checked
    //this.sectionsData.checklist[this.sectionSeqID].submittedAt = (new Date()).getTime()

    let data = {
      checklist: this.sectionsData.checklist
    }

    if (debugMockUpdate !== true) {
      await this.lib.AxiosHelper.post('/client/Section/setChecklist', data)
    }

    this.sectionsData.checklistSubmitted[this.sectionSeqID] = true
    //this.sectionsData.checklistSubmitted.splice(this.sectionSeqID, 1, true)
    this.checkAllChecklistsIsComplete()

    //this.$forceUpdate()
    this.$emit('checklistComplete')
  }
  
  SectionChecklist.methods.checkAllChecklistsIsComplete = function () {

    // 觀察看看有沒有機會完全完成
    //console.log(this.sectionsData.checklistSubmitted)
    let isAllCompleted = true
    for (let i = 0; i < this.sectionsData.checklistSubmitted.length; i++) {
      if (this.sectionsData.checklistSubmitted[i] !== true) {
        isAllCompleted = false
        break
      }
    }
    //let isAllCompleted = (this.sectionsData.checklistSubmitted.filter(c => (c !== true)).length === 0)
    if (isAllCompleted === true) {
      this.$emit('allComplete')
    }
  }
  
  SectionChecklist.methods.checkIsChecklistCompleted = function () {
    let checked = this.sectionsData.checklist[this.sectionSeqID]
    if (!checked) {
      return false
    }
    //console.log(checked)
    let result = checked.filter(c => c !== true)

    //this.$forceUpdate()
    //console.log(checked.length, checked, result)
    this.isChecklistCompleted = (result.length === 0)
  }
}