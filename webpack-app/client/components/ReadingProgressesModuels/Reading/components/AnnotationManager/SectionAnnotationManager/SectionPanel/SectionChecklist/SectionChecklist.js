let SectionChecklist = {
  props: ['lib', 'status', 'config', 'sectionSeqID', 'sectionData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
    localStorageKeyPrefix () {
      return `Pacor.SectionPanel.${this.sectionSeqID}.`
    },
    checklist () {
      if (Array.isArray(this.lib.auth.currentStepConfig.checklist)) {
        let checklist = this.lib.auth.currentStepConfig.checklist
        
        let checklistData = this.sectionData.checklistData
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
        this.checklistData = checklistData
        
        return checklist
      }
    },
    isChecklistCompleted () { 
      for (let i = 0; i < this.checklistData.length; i++) {
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
  watch: {
  },
  mounted() {
  },
  methods: {
    onChecklistItemChange (i) {
      this.checklistData[i] = !this.checklistData[i]
      
      let data = JSON.stringify(this.checklistData)
      localStorage.setItem(this.localStorageKeyPrefix + 'checklist', data)
    },
    openSectionMainIdeaEditor () {
      throw '@TODO'
    },
    submitChecklist: async function () {
      this.sectionData[this.sectionSeqID].checklistData = this.checklistData
      this.sectionData[this.sectionSeqID].checklistSubmittedAt = (new Data()).getTime()
      
      let data = {
        sectionData: this.sectionData
      }
      
      await this.lib.AxiosHelper.post('/client/ReadingProgress/setAttr', data)
    }
  } // methods
}

export default SectionChecklist