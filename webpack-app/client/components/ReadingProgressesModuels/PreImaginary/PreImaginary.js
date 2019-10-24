let Template = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    let data = {}
    if (typeof(this.status) === 'object' 
            && typeof(this.status.readingConfig) === 'object') {
      if (typeof(this.status.readingConfig.readingProgressModules) === 'object'
              && typeof(this.status.readingConfig.readingProgressModules.PreImaginary) === 'object') {
        for (let name in this.status.readingConfig.readingProgressModules.PreImaginary) {
          data[name] = this.status.readingConfig.readingProgressModules.PreImaginary[name]
        }
      }
      data.readingConfig = this.status.readingConfig
    }
    return data
  },
  components: {
  },
  computed: {
    buttonText: function () {
      return this.$t('OK')
    },
    buttonClass: function () {
      //return 'disabled'
      return ''
    }
  },
  watch: {
  },
  mounted() {
    this.$refs.Modal.show()
  },
  methods: {
  } // methods
}

export default Template