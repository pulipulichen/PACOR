let SectionAnnotationList = {
  props: ['lib', 'status', 'config', 'sectionSeqID', 'sectionData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    users () {
      return this.sectionData.annotationUsers
    },
    annotations () {
      return this.sectionData.annotations
    }
  },
  //watch: {
  //},
//  mounted() {
//  },
  methods: {
    findAnnotation (annotation) {
      //throw '@TODO ' + annotation.id
      this.sectionData.findAnnotation = annotation
    },
    reloadList () {
      
    }
  } // methods
}

export default SectionAnnotationList