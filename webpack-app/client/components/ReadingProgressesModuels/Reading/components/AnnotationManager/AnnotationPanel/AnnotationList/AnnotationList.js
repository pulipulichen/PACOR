let AnnotationList = {
  props: ['lib', 'status', 'config', 'listPositions'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      annotations: [],
      users: [],
      types: []
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
    onFindAnnotation (annotation) {
      this.findAnnotation = annotation
    }
  } // methods
}

export default AnnotationList