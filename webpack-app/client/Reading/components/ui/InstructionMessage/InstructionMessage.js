let InstructionMessage = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      tempStepName: this.lib.auth.currentStep
    }
  },
//  components: {
//  },
  computed: {
    stepName() {
      return this.lib.auth.currentStep
    },
    localStorageKeyPrefix () {
      return 'InstructionMessage.' + this.status.userID + '.' + this.tempStepName
    },
    instruction () {
      return this.lib.auth.currentStepConfig.instruction
    },
    contentURL () {
      if (this.lib.StringHelper.isURL(this.instruction) ) {
        return this.instruction
      }
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
      if (!this.instruction) {
        return null
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
    }
  } // methods
}

export default InstructionMessage