let AnnotationTypeButton = {
  props: ['status', 'lib', 'type', 'count', 'clickable'],
  data() {
    return {
    }
  },
  computed: {
    typeName () {
      if (!this.type) {
        return this.$t('All')
      }
      
      let name = this.$t('ANNOTATION_TYPE.' + this.type)
      
      if (!this.lib) {
        console.trace('this.lib is not defined.')
      }
      
      //console.log(this.lib.SectionManager.isArticleNode)
      if (this.type === 'SectionMainIdea' 
              && this.lib
              && this.lib.SectionManager
              && this.lib.SectionManager.isArticleNote) {
        name = this.$t('ANNOTATION_TYPE.ArticleMainIdea')
      }
      
      return name
    },
    computedStyle () {
      if (!this.type) {
        return null
      }
      
      //console.log(this.annotationModule)
      let color
      let backgroundColor
      
      if (typeof(this.status.readingConfig.annotationTypeModules[this.type]) !== 'undefined') {
        ({color, backgroundColor} = this.status.readingConfig.annotationTypeModules[this.type].style.button)
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
    },
    computedClass () {
      if (!this.type) {
        return 'inverted active'
      }
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

export default AnnotationTypeButton