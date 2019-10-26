let PreImaginary = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      stepName: 'PreImaginary',
      stepData: {}
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
    }
  },
  watch: {
  },
  mounted() {
    this.$parent.$refs.toc.refresh()
    this.init()
  },
  methods: {
    init: async function () {
      this.stepData = await this.lib.AxiosHelper.get('/admin/UserDashboard/PreImaginary', {
        webpageID: this.$route.params.webpageID,
        userID: this.$route.params.userID,
      })
    }
  } // methods
}

export default PreImaginary