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
    this.show()
  },
  methods: {
    submit() {
      this.$refs.Modal.hide()
    },
    show() {
      this.$refs.Modal.show()
    }
  } // methods
}

export default InstructionMessage