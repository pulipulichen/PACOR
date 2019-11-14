let SectionChecklist = {
  props: ['lib', 'status', 'config'
    , 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let checked = []
    
    if (!this.sectionsData.checklist[this.sectionSeqID]) {
      this.sectionsData.checklist[this.sectionSeqID] = {}
    }
    
    if (this.sectionsData.checklist 
            && this.sectionsData.checklist[this.sectionSeqID]
            && Array.isArray(this.sectionsData.checklist[this.sectionSeqID])) {
      checked = this.sectionsData.checklist[this.sectionSeqID]
    }
    
    let isChecklistAnnotationSubmitted = false
    if (this.sectionsData.checklistAnnotation[this.sectionSeqID]) {
      isChecklistAnnotationSubmitted = true
    }
    
    return {
      checked: checked,
      checklistAnnotationIndex: -1,
      isChecklistAnnotationSubmitted: isChecklistAnnotationSubmitted
      //wroteAnnotationAt: null
    }
  },
  
//  components: {
//  },
  computed: {
    annotation () {
      if (this.sectionsData.checklistAnnotation[this.sectionSeqID]) {
        return this.sectionsData.checklistAnnotation[this.sectionSeqID]
      }
      else {
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
    },
    computedSubmitButtonText () {
      if (this.isChecklistCompleted) {
        return this.$t('I have read this section!')
      }
      else {
        return this.$t('Please finish checklist.')
      }
    },
    localStorageKeyPrefix () {
      return `Pacor.SectionChecklist.${this.sectionSeqID}.`
    },
    checklist () {
      if (Array.isArray(this.lib.auth.currentStepConfig.checklist)) {
        let checklist = this.lib.auth.currentStepConfig.checklist
        //console.log(checklist)
        
        this.checklistAnnotationIndex = checklist.indexOf('SectionMainIdea')
        
        //console.log(this.sectionSeqID)
        //console.log(this.sectionsData)
//        if (!this.sectionsData.checklist 
//                || typeof(this.sectionsData.checklist[this.sectionSeqID]) === 'undefined') {
//          //this.sectionsData.checklist
//          this.sectionsData.checklist = []
//          this.sectionsData.checklist[this.sectionSeqID] = {}
//        }
        
        let checklistData = this.sectionsData.checklist[this.sectionSeqID]
        checklistData = checklistData ? checklistData : []
        
        if (Array.isArray(checklistData) === false
                || checklistData.length === 0) {
          //checklistData = []
          let itemsFromLocalStorage = localStorage
                    .getItem(this.localStorageKeyPrefix + 'checklist')
          if (itemsFromLocalStorage !== null) {
            checklistData = JSON.parse(itemsFromLocalStorage)
          }
          //console.log(this.localStorageKeyPrefix + 'checklist')
        }
        
        checklist.forEach((item, i) => {
          if (typeof(checklistData[i]) !== 'boolean') {
            checklistData[i] = false
          }
        })
        //this.checklistData = checklistData
        this.checked = checklistData
        //console.log(this.checked)
        return checklist
      }
    },
    isChecklistCompleted () { 
      //console.log(this.checked.length, this.checked)
      //let a = this.checked.length
      //console.log(a)
      //console.log(this.checked)
      for (let i = 0; i < this.checked.length; i++) {
        //console.log(i , this.checked[i], (this.checked[i] === false))
        if (this.checked[i] === false) {
          return false
        }
      }
      //this.$forceUpdate()
      return true
    },
    computedSubmitButtonClass () {
      //console.log(this.isChecklistCompleted)
      let classList = []
      if (this.isChecklistCompleted === false) {
        //return 'disabled'
        classList.push('disabled')
      }
      else {
        //return 'positive'
        classList.push('positive')
      }
      //console.trace(classList)
      //this.$forceUpdate()
      return classList.join(' ')
    },
//    isChecklistAnnotationSubmitted () {
//      return (typeof(this.annotation.id) === 'number')
//    }
  },
  watch: {
    checklistAnnotationIndex (checklistAnnotationIndex) {
      if (checklistAnnotationIndex !== -1 
              && this.annotation) {
        this.checked.splice(checklistAnnotationIndex, 1, (typeof(this.annotation.id) === 'number'))
      } 
    }
  },
//  mounted() {
//    
//  },
  methods: {
    onChecklistItemChange (i) {
      this.checked.splice(i, 1, !this.checked[i])
      //this.checked[i] = !this.checked[i]
      //this.$forceUpdate()
      
      //console.log(this.checked)
      //console.log(this.isChecklistCompleted)
      let data = JSON.stringify(this.checked)
      localStorage.setItem(this.localStorageKeyPrefix + 'checklist', data)
    },
    openSectionAnnotationEditor () {
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
          //console.log(annotation)
          //this.sectionsData.checklistAnnotation[this.sectionSeqID] = annotation
          
          //console.log(this.sectionSeqID)
          this.sectionsData.checklistAnnotation.splice(this.sectionSeqID, 1, annotation)
          
          if (Array.isArray(this.sectionsData.checklist[this.sectionSeqID]) === false) {
            this.sectionsData.checklist[this.sectionSeqID] = []
          }
          
          this.sectionsData.checklist[this.sectionSeqID].splice(this.checklistAnnotationIndex, 1, true)
          
          //console.log(this.sectionsData.checklist[this.sectionSeqID].checked)
          
          //this.sectionsData.checklist[this.checklistAnnotationIndex] = true
          //this.sectionsData.checklist.splice(this.sectionSeqID, 1, true)
          //this.sectionsData.checklist[this.sectionSeqID]
          
          //console.log(this.sectionsData.checklist)
          
          
          this.checked.splice(this.checklistAnnotationIndex, 1, true)
          //this.annotation.id = annotation.id
          //this.$forceUpdate()
          this.isChecklistAnnotationSubmitted = true
          
          this.sectionsData.annotation.splice(this.sectionSeqID, 1, annotation)
        },
        'update': (annotation) => {
          //console.log(annotation)
          //this.sectionsData.checklistAnnotation[this.sectionSeqID] = annotation
          this.sectionsData.checklistAnnotation.splice(this.sectionSeqID, 1, annotation)
        },
      })
    },
    submitChecklist: async function () {
      this.sectionsData.checklist[this.sectionSeqID] = this.checked
      //this.sectionsData.checklist[this.sectionSeqID].submittedAt = (new Date()).getTime()
      
      let data = {
        checklist: this.sectionsData.checklist
      }
      
      await this.lib.AxiosHelper.post('/client/Section/setChecklist', data)
      
      //this.sectionsData.checklistSubmitted[this.sectionSeqID] = true
      this.sectionsData.checklistSubmitted.splice(this.sectionSeqID, 1, true)
      this.checkAllChecklistsIsComplete()
    },
    checkAllChecklistsIsComplete () {
      
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
        this.$emit('complete')
      }
    }
  } // methods
}

export default SectionChecklist