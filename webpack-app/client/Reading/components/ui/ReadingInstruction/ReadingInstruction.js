import ReadingInstructionMessage from './ReadingInstructionMessage/ReadingInstructionMessage.vue'

let ReadingInstruction = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let localStorageUserKeyPrefix = 'InstructionMessage.' 
              + this.status.userID + '.' 
              + this.lib.auth.currentStep
    let hasReadTutorial = (localStorage.getItem(localStorageUserKeyPrefix) !== null)
    if (this.lib.auth.currentStep === 'FreeReading') {
      hasReadTutorial = true
    }
    
    //console.log(hasReadTutorial, localStorageUserKeyPrefix)
    
    return {
      tempStepName: this.lib.auth.currentStep,
      hasReadTutorial: hasReadTutorial
    }
  },
  components: {
    'reading-instruction-message': ReadingInstructionMessage
  },
  computed: {
    stepName() {
      return this.lib.auth.currentStep
    },
    localStorageKeyPrefix () {
      return 'InstructionMessage.' 
              + this.status.webpageID + '.' 
              + this.status.userID + '.' 
              + this.tempStepName
    },
    localStorageUserKeyPrefix () {
      return 'InstructionMessage.' 
              + this.status.userID + '.' 
              + this.tempStepName
    },
    instruction () {
      return this.lib.auth.currentStepConfig.instruction
    },
    contentURL () {
      //console.log(this.instruction)
      if (!this.instruction || this.$slots.content) {
        return false
      }
      
      if (this.lib.StringHelper.isURL(this.instruction) ) {
        return this.instruction
      }
      
      if (typeof(this.lib.auth.currentStepConfig.goToNextStepOnChecklistComplete) !== 'boolean'
              || this.lib.auth.currentStepConfig.goToNextStepOnChecklistComplete) {
        return this.instruction.checklist
      }
      else {
        return this.instruction.countdown
      }
    },
    enableLogout () {
      return this.lib.auth.currentStepConfig.enableLogout
    },
    showCloseButton () {
      if (this.lib.auth.currentStepConfig.forceTutorial !== true) {
        return true
      }
      return (this.hasReadTutorial 
              || localStorage.getItem(this.localStorageKeyPrefix) !== null
              || localStorage.getItem(this.localStorageUserKeyPrefix) !== null) // 表示這個人已經在不同篇文章讀過這個階段的說明了
    }
  },
//  watch: {
//  },
  mounted() {
    this.checkAutoShow()
  },
  destroyed () {
    //console.log('有移除嗎？ InstructionMessage', this.localStorageKeyPrefix)
    localStorage.removeItem(this.localStorageKeyPrefix)
  },
  methods: {
    checkAutoShow () {
      if (this.status.role !== 'reader') {
        return false
      }
      //console.log(this.lib.auth.currentStepConfig)
      if (this.lib.auth.currentStepConfig.keepShowInstructionMessage === true) {
        return this.show()
      }
      
      if (this.lib.auth.currentStepConfig.showFinishMessage === true) {
        return this.show()
      }
      
      //console.log(localStorage.getItem(this.localStorageKeyPrefix))
      if (localStorage.getItem(this.localStorageKeyPrefix) === null) {
        this.show()
      }
    },
    hide() {
      this.$refs.Modal.hide()
    },
    startTutorial () {
      localStorage.setItem(this.localStorageKeyPrefix, 1)
      localStorage.setItem(this.localStorageUserKeyPrefix, 1)
      this.hasReadTutorial = true
      this.hide()
      this.lib.TutorialManager.start()
    },
    show() {
      if (!this.$refs.Modal) {
        return setTimeout(() => {
          this.show()
        }, 100)
      }
      this.$refs.Modal.show()
    },
    onHide() {
      localStorage.setItem(this.localStorageKeyPrefix, 1)
    },
    nextStep () {
      this.lib.auth.nextStep()
    },
    logout: async function () {
      let confirm = await this.lib.ConfirmModal.show(this.$t('Are you sure to logout?'))
      if (confirm === false) {
        return false
      }
      
      this.$refs.Modal.hide()
      this.lib.auth.logout()
      location.reload()
    },
    gotoNextReadingPage () {
      let url = this.lib.auth.currentStepConfig.nextReadingPage
      location.href = url
    }
  } // methods
}

export default ReadingInstruction