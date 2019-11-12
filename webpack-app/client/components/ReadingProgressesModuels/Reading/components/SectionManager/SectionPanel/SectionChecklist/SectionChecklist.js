let SectionChecklist = {
  props: ['lib', 'status', 'config'
    , 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let checked = []
    if (Array.isArray(this.sectionsData.checklist[this.sectionSeqID].checked)) {
      checked = this.sectionsData.checklist[this.sectionSeqID].checked
    }
    
    return {
      checked: checked,
      checklistAnnotationIndex: -1,
      
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
        if (typeof(this.sectionsData.checklist[this.sectionSeqID]) === 'undefined') {
          //this.sectionsData.checklist
          this.sectionsData.checklist[this.sectionSeqID] = {}
        }
        
        let checklistData = this.sectionsData.checklist[this.sectionSeqID].checked
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
      //console.log(this.checked)
      for (let i = 0; i < this.checked.length; i++) {
        if (this.checked[i] === false) {
          return false
        }
      }
      
      // 觀察看看有沒有機會完全完成
      let isCompleted = true
      for (let i = 0; i < this.sectionsData.checklist.length; i++) {
        if (i === this.sectionSeqID) {
          continue
        }
        let checked = this.sectionsData.checklist[i]
        for (let j = 0; j < checked.length; j++) {
          if (checked[j] === false) {
            isCompleted = false
            break
          }
        }
        
        if (isCompleted === false) {
          break
        }
      }
      if (isCompleted === true) {
        this.$emit('complete')
      }
      
      return true
    },
    computedSubmitButtonClass () {
      if (this.isChecklistCompleted === false) {
        return 'disabled'
      }
      else {
        return 'positive'
      }
    },
    isChecklistAnnotationSubmitted () {
      return (typeof(this.annotation.id) === 'number')
    }
  },
//  watch: {
//  },
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
          this.sectionsData.checklistAnnotation[this.sectionSeqID] = annotation
          this.sectionsData.checklist[this.checklistAnnotationIndex] = true
        },
        'update': (annotation) => {
          this.sectionsData.checklistAnnotation[this.sectionSeqID] = annotation
        },
      })
    },
    submitChecklist: async function () {
      this.sectionsData.checklist[this.sectionSeqID].checked = this.checked
      this.sectionsData.checklist[this.sectionSeqID].submittedAt = (new Date()).getTime()
      
      let data = {
        checklist: this.sectionsData.checklist
      }
      
      await this.lib.AxiosHelper.post('/client/Section/setChecklist', data)
    }
  } // methods
}

export default SectionChecklist