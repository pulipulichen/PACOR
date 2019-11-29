let debugMockUpdate = false
if (debugMockUpdate === true) {
  console.log('@test debugMockUpdate')
}

export default (SectionChecklist) => {
//    initData () {
//      //console.log(this.sectionsData.checklist)
//      let checklistData = this.checked
//      //console.log(checklistData, typeof(checklistData), Array.isArray(checklistData))
//
//      checklistData = checklistData ? checklistData : []
//
//      if (Array.isArray(checklistData) === false
//              || checklistData.length === 0) {
//        //checklistData = []
//        let itemsFromLocalStorage = localStorage
//                  .getItem(this.localStorageKeyPrefix + 'checklist')
//        if (itemsFromLocalStorage !== null) {
//          checklistData = JSON.parse(itemsFromLocalStorage)
//        }
//        //console.log(this.localStorageKeyPrefix + 'checklist')
//      }
//
//      this.checklist.forEach((item, i) => {
//        if (typeof(checklistData[i]) !== 'boolean') {
//          checklistData[i] = false
//        }
//      })
//    },

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
  SectionChecklist.methods.openSectionAnnotationEditor = function () {
    /*
     //      this.wroteAnnotationAt = (new Date()).getTime
     //        this.checked.splice(this.sectionAnnotationIndex, 1, true)
     //        this.sectionsData.sectionAnnotationCallback = null
     //        return
     
     if (this.isWrottenAnnotation === false) {
     this.sectionsData.sectionAnnotation.callback = () => {
     this.wroteAnnotationAt = (new Date()).getTime
     this.checked.splice(this.sectionAnnotationIndex, 1, true)
     this.sectionsData.sectionAnnotation.callback = null
     }
     
     
     }
     this.sectionsData.sectionAnnotation.seqID = this.sectionSeqID
     this.sectionsData.sectionAnnotation.instance = {
     id: this.sectionsData.sectionAnnotation.id,
     type: 'SectionMainIdea',
     note: this.sectionsData.sectionAnnotation.draftNote
     }
     
     //this.checked.splice(this.sectionAnnotationIndex, 1, true)
     //this.wroteAnnotationAt = 1
     */
    this.lib.AnnotationPanel.setAnnotation(this.annotation, {
      'add': (annotation) => {
        annotation.user = this.lib.auth.annotationUserData
        //console.log(annotation)
        //console.log(annotation.notes[0].note)
        //this.sectionsData.checklistAnnotation[this.sectionSeqID] = annotation

        //console.log(this.sectionSeqID)
        //this.sectionsData.checklistAnnotation[this.sectionSeqID] = annotation
        this.sectionsData.checklistAnnotation.splice(this.sectionSeqID, 1, annotation)
//        console.log(this.sectionsData.checklistAnnotation)
//          if (Array.isArray(this.sectionsData.checklist[this.sectionSeqID]) === false) {
//            this.sectionsData.checklist[this.sectionSeqID] = []
//          }

        //this.sectionsData.checklist[this.sectionSeqID].splice(this.checklistAnnotationIndex, 1, true)
        this.sectionsData.checklist[this.sectionSeqID][this.checklistAnnotationIndex] = true

        //console.log(this.sectionsData.checklist[this.sectionSeqID].checked)

        //this.sectionsData.checklist[this.checklistAnnotationIndex] = true
        //this.sectionsData.checklist.splice(this.sectionSeqID, 1, true)
        //this.sectionsData.checklist[this.sectionSeqID]

        //console.log(this.sectionsData.checklist)


//          this.checked.splice(this.checklistAnnotationIndex, 1, true)

        //this.annotation.id = annotation.id
        //this.$forceUpdate()
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

    if (debugMockUpdate === false) {
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
    //console.log(this.checked.length, this.checked)
    //let a = this.checked.length
    //console.log(a)

    /*
     for (let i = 0; i < this.checked.length; i++) {
     console.log(i , this.checked[i], (this.checked[i] === false))
     if (this.checked[i] !== true) {
     return false
     }
     }
     */
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