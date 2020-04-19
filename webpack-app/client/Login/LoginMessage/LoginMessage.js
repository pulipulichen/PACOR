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
      
      let instructionMinute = 0 // 說明時間的偏移，不過算了，就這樣吧
      if (Array.isArray(this.steps) === false) {
        return 0
      }
      
      this.steps.forEach(step => {
        let module = modules[step]
        if (!module) {
          return false
        }
        
//        if (step === 'IndividualReading') {
//          time = time + modules['reading'].totalLimitMinutes
//        }
//        
        if (['IndividualReading', 'CollaborativeReading'].indexOf(step) > -1) {
          if (hasAddedReading === true) {
            return false
          }
          //console.log('reading', modules['reading'].totalLimitMinutes)
          time = time + modules['reading'].totalLimitMinutes + instructionMinute
          hasAddedReading = true
          return false
        }
        
        //console.log('step', step, module.limitMinutes)
        time = time + module.limitMinutes + instructionMinute
      })  // this.steps.forEach(step => {
      
      time = Math.ceil(time)
      
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