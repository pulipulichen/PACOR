let StepProgressBar = {
  props: ['lib', 'config', 'progresses'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      
    }
  },
  /*
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  */
  computed: {
    currentStep: function () {
      if (Array.isArray(this.progresses) === false 
              || this.progresses.length === 0) {
        return this.$t('Not yet started')
      }
      
      for (let i = 0; i < this.progresses.length; i++) {
        let step = this.progresses[i]
        if (step.isCompleted === true) {
          continue
        }
        
        if (i === 0 
                && typeof(step.start_timestamp) !== 'number') {
          return '(' + this.$t('Not yet started') + ')'
        }
        
        return this.displayTitle(step)
      }
      return this.$t('READING_PROGRESS.finish')
    }
  },
  methods: {
    getTitle: function (step_name) {
      if (typeof(step_name) === 'object'
              && typeof(step_name.step_name) === 'string') {
        step_name = step_name.step_name
      }
      return this.$t(`READING_PROGRESS.${step_name}`)
    },
    displayTitle: function (step) {
      let title = this.getTitle(step)
      if (typeof(step.start_timestamp) === 'number'){
        title = `${title} (${this.displayTime(step)})`
      }
      return title
    },
    displayTime: function (step) {
      if (step.isCompleted === false) {
        return this.lib.DayJSHelper.toNow(step.start_timestamp)
      }
      else {
        return this.lib.DayJSHelper.to(step.end_timestamp, step.start_timestamp)
      }
      /*
      if (index === 0) {
        return this.lib.DayJSHelper.shortTime(start_timestamp)
      }
      else {
        let baseTimestamp = this.steps[0].start_timestamp
        return this.lib.DayJSHelper.to(baseTimestamp, start_timestamp)
      }
      */
    },
    displayClass: function (step) {
      if (step.isCompleted === true) {
        return 'grey'
      }
      else if (typeof(step.start_timestamp) === 'number') {
        return 'green'
      }
      else {
        return 'basic grey'
      }
    }
  } // methods
}

export default StepProgressBar