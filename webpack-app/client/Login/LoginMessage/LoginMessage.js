let LoginMessage = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    steps () {
      return this.status.readingConfig.readingProgresses
    },
    totalTime () {
      let time = 0
      let modules = this.status.readingConfig.readingProgressModules
      let hasAddedReading = false
      
      this.steps.forEach(step => {
        let module = modules[step]
        if (!module) {
          return false
        }
        
        if (['IndividualReading', 'CollaborativeReading'].indexOf(step) > -1) {
          if (hasAddedReading === true) {
            return false
          }
          //console.log('reading', modules['reading'].totalLimitMinutes)
          time = time + modules['reading'].totalLimitMinutes
          hasAddedReading = true
          return false
        }
        
        //console.log('step', step, module.limitMinutes)
        time = time + module.limitMinutes
      })
      
      return time
    },
    computedTotalTimeMessage () {
      return this.$t('It takes about <span class="highlight">{0} minutes</span> in total.', [this.totalTime])
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default LoginMessage