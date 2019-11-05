let AnnotationModuleButton = {
  props: ['status', 'annotationModule', 'count'],
  data() {
    return {
    }
  },
  computed: {
    'computedStyle' () {
      let {color, backgroundColor} = this.status.readingConfig.annotationTypeModules[this.annotationModule].style.button
      return {color, backgroundColor}
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
  methods: {
  } // methods
   */
}

export default AnnotationModuleButton