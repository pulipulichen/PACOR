let AnnotationModuleButton = {
  props: ['status', 'annotationModule', 'count', 'clickable'],
  data() {
    return {
    }
  },
  computed: {
    'computedStyle' () {
      //console.log(this.annotationModule)
      let color
      let backgroundColor
      
      if (typeof(this.status.readingConfig.annotationTypeModules[this.annotationModule]) !== 'undefined') {
        ({color, backgroundColor} = this.status.readingConfig.annotationTypeModules[this.annotationModule].style.button)
      }
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