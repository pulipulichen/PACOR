import AnnotationEditorModules from './../AnnotationEditorModules/AnnotationEditorModules.vue'

let AnnotationList = {
  props: ['lib', 'status', 'config', 'listPositions', 'findAnnotation', 'heightPX', 'rangy'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      annotations: [],
      annotationCount: 0,
      users: [],
      userCount: 0,
      types: [],
      filteredAnnotations: [],
      filteredAnnotationCount: 0,
      filteredUsers: [],
      filteredUserCount: 0,
      filteredTypes: [],
      page: 0,
      annotationInstance: this.findAnnotation,
      findUser: null,
      findType: null,
      
      hoverAnnotation: null
    }
  },
  components: {
    'annotation-editor-modules': AnnotationEditorModules,
  },
  computed: {
    'editorHeightPX' () {
      return this.heightPX - 50
    },
    isFiltering () {
      return (this.findUser !== null || this.findType !== null)
    },
    findUserID () {
      if (this.findUser !== null) {
        return this.findUser.id
      }
    }
  },
  watch: {
    'listPositions' () {
      this.loadInit()
    },
    'findAnnotation' (findAnnotation) {
      this.annotationInstance = findAnnotation
    },
    'findUser' () {
      this.loadFilter()
    },
    'findType' () {
      this.loadFilter()
    },
    'hoverAnnotation' (annotation) {
      if (annotation !== null) {
        this.rangy.hoverIn(annotation)
      }
      else {
        this.rangy.hoverOut(annotation)
      }
    }
  },
  mounted() {
    this.loadInit()
  },
  methods: {
    loadInit: async function () {
      if (Array.isArray(this.listPositions)) {
        this.page = 0
        let query = {
          anchorPositions: this.listPositions,
          withCount: true
          // @TODO 這邊應該要加入page
        }
        let url = '/client/Annotation/list'
        
        let result = await this.lib.AxiosHelper.post(url, query)
        //console.log(result)
        
        for (let key in result) {
          this[key] = result[key]
        }
      }
    },
    loadFilter: async function () {
      if (Array.isArray(this.listPositions)) {
        this.page = 0
        
        let query = {
          anchorPositions: this.listPositions,
          withCount: true,
          // @TODO 這邊應該要加入page
          findUserID: this.findUserID,
          findType: this.findType
        }
        
        let url = '/client/Annotation/list'
        
        let result = await this.lib.AxiosHelper.post(url, query)
        //console.log(result)
        
        this.filteredAnnotations = result.annotations
        this.filteredAnnotationCount = result.annotationCount
      }
    },
    clearFilter () {
      this.findUser = null
      this.findType = null
    },
    
    hoverToggle (annotation) {
      this.hoverAnnotation = annotation
    },
    hoverIn (annotation) {
      this.hoverAnnotation = annotation
    },
    hoverOut () {
      this.hoverAnnotation = null
    }
  } // methods
}

export default AnnotationList