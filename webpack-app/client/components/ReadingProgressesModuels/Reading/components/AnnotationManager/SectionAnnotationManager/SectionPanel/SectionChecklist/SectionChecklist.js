let SectionChecklist = {
  props: ['lib', 'status', 'config', 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      checked: []
    }
  },
  
//  components: {
//  },
  computed: {
    localStorageKeyPrefix () {
      return `Pacor.SectionPanel.${this.sectionSeqID}.`
    },
    checklist () {
      if (Array.isArray(this.lib.auth.currentStepConfig.checklist)) {
        let checklist = this.lib.auth.currentStepConfig.checklist
        
        //console.log(this.sectionSeqID)
        //console.log(this.sectionsData)
        if (typeof(this.sectionsData.checklist[this.sectionSeqID]) === 'undefined') {
          //this.sectionsData.checklist
          this.sectionsData.checklist[this.sectionSeqID] = {}
        }
        
        let checklistData = this.sectionsData.checklist[this.sectionSeqID].checked
        checklistData = checklistData ? checklistData : {}
        
        if (Array.isArray(checklistData) === false) {
          //checklistData = []
          let itemsFromLocalStorage = localStorage
                    .getItem(this.localStorageKeyPrefix + 'checklistData')
          if (itemsFromLocalStorage !== null) {
            checklistData = JSON.parse(itemsFromLocalStorage)
          }
        }
        
        checklist.forEach((item, i) => {
          if (typeof(checklistData[i]) !== 'boolean') {
            checklistData[i] = false
          }
        })
        //this.checklistData = checklistData
        this.sectionsData.checklist[this.sectionSeqID].checked = checklistData
        
        return checklist
      }
    },
    isChecklistCompleted () { 
      for (let i = 0; i < this.checked.length; i++) {
        if (this.checklistData[i] === false) {
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
    }
  },
//  watch: {
//  },
  mounted() {
    this.checked = this.sectionsData.checklist[this.sectionSeqID].checked
  },
  methods: {
    onChecklistItemChange (i) {
      this.checked[i] = !this.checked[i]
      
      let data = JSON.stringify(this.checked)
      localStorage.setItem(this.localStorageKeyPrefix + 'checklist', data)
    },
    openSectionAnnotationEditor () {
      throw '@TODO'
    },
    submitChecklist: async function () {
      this.sectionsData.checklist[this.sectionSeqID].checked = this.checklistData
      this.sectionsData.checklist[this.sectionSeqID].submittedAt = (new Data()).getTime()
      
      let data = {
        checklist: this.sectionsData.checklist
      }
      
      await this.lib.AxiosHelper.post('/client/ReadingProgress/setAttr', data)
    }
  } // methods
}

export default SectionChecklist