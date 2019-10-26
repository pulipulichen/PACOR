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
  */
  watch: {
    'progresses': function () {
      this.initPopup()
    }
  },
  mounted: function () {
    this.initPopup()
  },
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
    },
    allStepFinished: function () {
      for (let i = 0; i < this.progresses.length; i++) {
        let step = this.progresses[i]
        if (step.isCompleted === true) {
          continue
        }
        else {
          return false
        }
      }
      return true
    }
  },
  methods: {
    initPopup: function () {
      //console.log(Array.isArray(this.progresses))
      if (Array.isArray(this.progresses)) {
        setTimeout(() => {
          let buttons = window.$(this.$refs.buttons).children()
          if (buttons.length > 0) {
            buttons.popup()
          }
        }, 0)
      }
    },
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
      else {
        title = `${title} (${this.$t('not yet started')})`
      }
      return title
    },
    displayTime: function (step) {
      if (step.isCompleted === false) {
        return this.lib.DayJSHelper.toNow(step.start_timestamp)
      }
      else {
        return this.lib.DayJSHelper.shortTime(step.end_timestamp - step.start_timestamp)
        //return this.lib.DayJSHelper.from(step.start_timestamp, step.end_timestamp)
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
      if (this.allStepFinished === true) {
        return 'green'
      } 
      else if (step.isCompleted === true) {
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