let SectionAnnotationList = {
  props: ['lib', 'status', 'config', 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    return {
      page: 0
    }
  },
//  components: {
//  },
  computed: {
    instance () {
      if (typeof(this.sectionsData.annotation[this.sectionSeqID]) !== 'object') {
        this.sectionsData.annotation[this.sectionSeqID] = {}
      }
      return this.sectionsData.annotation[this.sectionSeqID]
    },
    users () {
      if (Array.isArray(this.instance.users) === false) {
        this.instance.users = []
      }
      return this.instance.users
    },
    userCount () {
      return this.instance.userCount
    },
    annotations () {
      if (Array.isArray(this.instance.annotations) === false) {
        this.instance.annotations = []
      }
      return this.instance.annotations
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