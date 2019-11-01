let AnnotationModuleButton = {
  props: ['status', 'annotationModule'],
  data() {
    return {
    }
  },
  computed: {
    'computedStyle' () {
      console.log(this.annotationModule)
      let {color, backgroundColor} = this.status.readingConfig.annotationTypeModules[this.annotationModule].style.button
      console.log(color, backgroundColor)
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