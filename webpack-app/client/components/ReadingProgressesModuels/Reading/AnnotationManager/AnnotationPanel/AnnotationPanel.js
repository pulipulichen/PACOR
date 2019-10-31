let AnnotationPanel = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'pinSelection'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      isHide: true
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
    pinSelection: function (pinSelection) {
      if (pinSelection !== null 
              && typeof(pinSelection) === 'object') {
        this.show()
      }
    }
  },
  mounted() {
  },
  methods: {
    show () {
      this.isHide = false
    },
    hide () {
      this.isHide = true
      this.$emit('hide')
    }
  } // methods
}

export default AnnotationPanel