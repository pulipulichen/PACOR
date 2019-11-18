let SectionAnnotationList = {
  props: ['lib', 'status', 'config'
    , 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    return {
      page: 0,
      noMore: false
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
      if (Array.isArray(this.sectionsData.annotation[this.sectionSeqID].annotations) === false) {
        this.sectionsData.annotation[this.sectionSeqID].annotations = []
      }
      return this.sectionsData.annotation[this.sectionSeqID].annotations
    },
    hasAnnotation () {
      return (this.sectionsData 
              && this.sectionsData.annotation
              && this.sectionsData.annotation[this.sectionSeqID]
              && this.sectionsData.annotation[this.sectionSeqID].annotations
              && this.sectionsData.annotation[this.sectionSeqID].annotations.length > 0)
    }
  },
  watch: {
    'page' (page) {
      if (page > -1) {
        this.loadNext()
      }
    },
  },
//  mounted() {
//  },
  methods: {
    findAnnotation (annotation) {
      //throw '@TODO ' + annotation.id
      //this.sectionsData.sectionAnnotation.callback = () => {
      //  this.reloadList()
      //}
      
      //this.sectionsData.sectionAnnotation.instance = annotation
      
      this.lib.AnnotationPanel.setAnnotation(annotation, {
        'update': () => {
          this.reloadList()
        }
      })
    },
    loadNext: async function () {
      let query = {
        page: this.page,
        seq_id: this.sectionSeqID
      }
      
      let result = await this.lib.AxiosHelper.get('/client/Section/annotationsNext', query)
      //console.log(result)
      if (Array.isArray(result) && result.length > 0) {
        //console.log(this.sectionsData.annotation[this.sectionSeqID].annotations.length)
        
        result.forEach(a => {
          this.sectionsData.annotation[this.sectionSeqID].annotations.push(a)
        })
        
        //console.log(this.sectionsData.annotation[this.sectionSeqID].annotations.length)
        this.$forceUpdate()
        //this.page++
      }
      else {
        this.noMore = true
      }
    },
    reloadList: async function () {
      this.sectionsData.annotation[this.sectionSeqID].annotations = this.sectionsData.annotation[this.sectionSeqID].annotations.slice(0, 0)
      //console.log(this.sectionsData.annotation[this.sectionSeqID].annotations.length)
      if (this.page === 0) {
        await this.loadNext()
      }
      else {
        this.page = 0
      }
    },
    scrollList (event) {
      if (this.noMore === true) {
        return false
      }
      let element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        //console.log('scrolled');
        this.page++
      }
    },
  } // methods
}

export default SectionAnnotationList