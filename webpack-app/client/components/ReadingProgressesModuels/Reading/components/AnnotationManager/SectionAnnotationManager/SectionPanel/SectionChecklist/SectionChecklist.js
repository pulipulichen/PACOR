let SectionChecklist = {
  props: ['lib', 'status', 'config', 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      checked: [],
      sectionAnnotationIndex: -1,
      wroteAnnotationAt: null
    }
  },
  
//  components: {
//  },
  computed: {
    computedSubmitButtonText () {
      if (this.isChecklistCompleted) {
        return this.$t('I have read this section!')
      }
      else {
        return this.$t('Please finish checklist.')
      }
    },
    localStorageKeyPrefix () {
      return `Pacor.SectionPanel.${this.sectionSeqID}.`
    },
    checklist () {
      if (Array.isArray(this.lib.auth.currentStepConfig.checklist)) {
        let checklist = this.lib.auth.currentStepConfig.checklist
        //console.log(checklist)
        
        this.sectionAnnotationIndex = checklist.indexOf('SectionMainIdea')
        
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
    isWrottenAnnotation () {
      return (this.checked[this.sectionAnnotationIndex] === true 
              || this.wroteAnnotationAt !== null)
    }
  },
//  watch: {
//  },
  mounted() {
    if (Array.isArray(this.sectionsData.checklist[this.sectionSeqID].checked)) {
      this.checked = this.sectionsData.checklist[this.sectionSeqID].checked
    }
  },
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
      
    },
    submitChecklist: async function () {
      this.sectionsData.checklist[this.sectionSeqID].checked = this.checked
      this.sectionsData.checklist[this.sectionSeqID].submittedAt = (new Date()).getTime()
      
      let data = {
        checklist: this.sectionsData.checklist
      }
      
      await this.lib.AxiosHelper.post('/client/ReadingProgress/setLogAttr', data)
    }
  } // methods
}

export default SectionChecklist