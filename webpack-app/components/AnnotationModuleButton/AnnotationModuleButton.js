let AnnotationModuleButton = {
  props: ['status', 'annotationModule', 'count', 'clickable'],
  data() {
    return {
    }
  },
  computed: {
    'computedStyle' () {
      let {color, backgroundColor} = this.status.readingConfig.annotationTypeModules[this.annotationModule].style.button
      let style = {
        color,
        backgroundColor,
        cursor: 'default'
      }
      
      if (this.clickable !== false) {
        style.cursor = 'pointer'
      }
      
      return style
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