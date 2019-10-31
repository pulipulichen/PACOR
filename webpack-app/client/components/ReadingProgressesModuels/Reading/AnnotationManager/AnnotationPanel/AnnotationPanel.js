let AnnotationPanel = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
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
  },
  mounted() {
  },
  methods: {
    show () {
      this.isHide = false
    },
    hide () {
      this.isHide = true
    }
  } // methods
}

export default AnnotationPanel