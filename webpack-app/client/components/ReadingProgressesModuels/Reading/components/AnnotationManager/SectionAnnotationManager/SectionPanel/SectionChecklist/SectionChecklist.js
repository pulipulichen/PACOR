let SectionChecklist = {
  props: ['lib', 'status', 'config'],
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
      console.error('#TODO')
      return false
    },
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
    }
  } // methods
}

export default SectionChecklist