let ErrorHandler = {
  props: ['config', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    showError: function () {
      return (typeof(this.error) === 'object' 
              || (typeof(this.error) === 'string' && this.error.trim() !== '') )
    }
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    close() {
      this.error = ''
    }
  } // methods
}

export default ErrorHandler