let BaseModule = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view', 'log', 'toc'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      stepName: 'PreImaginary'
    }
  },
  components: {
  },
  computed: {
    displayStepData: function () {
      if (typeof(this.stepData) === 'object') {
        let output = JSON.stringify(this.stepData, null, '  ')
        output = output.slice(2, -2).trim()
        return output
      }
    },
    logPair: function () {
      let output = []
      let log = this.log
      if (typeof(log) === 'string' 
              && log.startsWith('{') && log.endsWith('}')) {
        try {
          log = JSON.parse(log)
        } catch (e) {}
      }
      
      if (typeof(log) === 'object') {
        for (let name in log) {
          output.push({
            name: name,
            value: log[name]
          })
        }
      }
      //console.log(typeof(this.log))
      return output
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init: async function () {
      this.stepData = await this.lib.AxiosHelper.get('/admin/UserDashboard/step', {
        stepName: this.stepName,
        webpageID: this.$route.params.webpageID,
        userID: this.$route.params.userID,
      })
      
      //console.log(this.stepData)
      
      this.toc.refresh()
    }
  } // methods
}

export default BaseModule