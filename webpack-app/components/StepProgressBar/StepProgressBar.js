let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      steps: []
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    displayTitle: function (step, index) {
      let title = step.name
      if (typeof(step.timestamp) === 'number'){
        title = `${title} (${this.displayTime(step.timestamp, index)})`
      }
      return title
    },
    displayTime: function (timestamp, index) {
      if (index === 0) {
        return this.lib.DayJSHelper.shortTime(timestamp)
      }
      else {
        let baseTimestamp = this.steps[0].timestamp
        return this.lib.DayJSHelper.to(baseTimestamp, timestamp)
      }
    }
  } // methods
}

export default Template