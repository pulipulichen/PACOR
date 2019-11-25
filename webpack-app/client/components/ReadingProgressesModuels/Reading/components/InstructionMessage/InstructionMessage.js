let InstructionMessage = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    stepName() {
      return this.lib.auth.currentStep
    },
    localStorageKeyPrefix () {
      return 'InstructionMessage.' + this.status.userID + '.' + this.stepName
    },
    message () {
      return this.lib.auth.currentStepConfig.message
    },
    contentURL () {
      if (this.lib.StringHelper.isURL(this.message) ) {
        return this.message
      }
    }
  },
//  watch: {
//  },
  mounted() {
    this.checkAutoShow()
  },
  methods: {
    checkAutoShow () {
      if (!this.message) {
        return null
      }
      
      //console.log(localStorage.getItem(this.localStorageKeyPrefix))
      if (localStorage.getItem(this.localStorageKeyPrefix) === null) {
        this.show()
      }
    },
    submit() {
      this.$refs.Modal.hide()
    },
    show() {
      this.$refs.Modal.show()
    },
    onHide() {
      localStorage.setItem(this.localStorageKeyPrefix, 1)
    }
  } // methods
}

export default InstructionMessage