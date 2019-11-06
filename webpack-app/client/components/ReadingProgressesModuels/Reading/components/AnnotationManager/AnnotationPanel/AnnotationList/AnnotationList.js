import AnnotationEditorModules from './../AnnotationEditorModules/AnnotationEditorModules.vue'

let AnnotationList = {
  props: ['lib', 'status', 'config', 'listPositions'
    , 'findAnnotation', 'propFindUser', 'propFindType'
    , 'heightPX'
    , 'rangy'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      annotations: [],
      annotationCount: 0,
      users: [],
      userCount: 0,
      types: [],
      page: 0,
      noMore: false,
      
      filteredAnnotations: [],
      filteredAnnotationCount: 0,
      filteredUsers: [],
      filteredUserCount: 0,
      filteredTypes: [],
      filteredPage: 0,
      filteredNoMore: false,
      
      annotationInstance: this.findAnnotation,
      findUser: this.propFindUser,
      findType: this.propFindType,
      
      hoverAnnotation: null
    }
  },
  components: {
    'annotation-editor-modules': AnnotationEditorModules,
  },
  computed: {
    'editorHeightPX' () {
      let summeryHeight = 50
      if (this.annotations.length < 2) {
        summeryHeight = 0
      }
      return this.heightPX - summeryHeight
    },
    isFiltering () {
      return (this.findUser !== null || this.findType !== null)
    },
    findUserID () {
      if (this.findUser !== null) {
        return this.findUser.id
      }
    },
    computedListStyle () {
      let style = {
        'max-height': `${this.editorHeightPX - 50}px`
      }
      return style
    }
  },
  watch: {
    'propFindUser' (propFindUser) {
      this.findUser = propFindUser
    },
    'propFindType' (propFindType) {
      this.findType = propFindType
    },
    'listPositions' () {
      this.page = 0
      this.noMore = false
      this.annotationInstance = this.findAnnotation
      this.loadInit()
    },
    'findAnnotation' (findAnnotation) {
      this.annotationInstance = findAnnotation
    },
    'findUser' () {
      this.filterPage = 0
      this.filterNoMore = false
      this.loadFilter()
    },
    'findType' () {
      this.filterPage = 0
      this.filterNoMore = false
      this.loadFilter()
    },
    'page' (page) {
      if (page > 0) {
        this.loadInitNext()
      }
    },
    'filteredPage' (page) {
      if (page > 0) {
        this.loadFilterNext()
      }
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
    this.loadFilter()
  },
  methods: {
    loadInit: async function () {
      if (Array.isArray(this.listPositions)) {
        let query = {
          anchorPositions: this.listPositions,
          withCount: true,
          page: this.page
          // @TODO 這邊應該要加入page
        }
        let url = '/client/Annotation/list'
        
        let result = await this.lib.AxiosHelper.post(url, query)
        //console.log(result)
        
        for (let key in result) {
          this[key] = result[key]
        }
        
        //console.log(this.annotations.length)
        if (this.annotations.length === 1) {
          this.annotationInstance = this.annotations[0]
        }
      }
    },
    loadInitNext: async function () {
      if (Array.isArray(this.listPositions)) {
        let query = {
          anchorPositions: this.listPositions,
          withCount: true,
          page: this.page
        }
        let url = '/client/Annotation/listNext'
        
        let result = await this.lib.AxiosHelper.post(url, query)
        //console.log(result)
        if (Array.isArray(result) && result.length > 0) {
          this.annotations = this.annotations.concat(result)
        }
        else {
          this.noMore = true
        }
      }
    },
    loadFilter: async function () {
      if (Array.isArray(this.listPositions)
              && (this.findUserID !== null || this.findType !== null) ) {
        
        let query = {
          anchorPositions: this.listPositions,
          withCount: true,
          // @TODO 這邊應該要加入page
          findUserID: this.findUserID,
          findType: this.findType,
          page: this.filteredPage
        }
        
        let url = '/client/Annotation/list'
        
        let result = await this.lib.AxiosHelper.post(url, query)
        //console.log(result)
        
        this.filteredAnnotations = result.annotations
        this.filteredAnnotationCount = result.annotationCount
      }
    },
    loadFilterNext: async function () {
      if (Array.isArray(this.listPositions)
              && (this.findUserID !== null || this.findType !== null) ) {
        
        let query = {
          anchorPositions: this.listPositions,
          withCount: true,
          // @TODO 這邊應該要加入page
          findUserID: this.findUserID,
          findType: this.findType,
          page: this.filteredPage
        }
        
        let url = '/client/Annotation/listNext'
        
        let result = await this.lib.AxiosHelper.post(url, query)
        //console.log(result)
        
        if (Array.isArray(result) && result.length > 0) {
          this.filteredAnnotations = this.filteredAnnotations.concat(result)
        }
        else {
          this.filteredNoMore = true
        }
      }
    },
    clearFilter () {
      this.findUser = null
      this.findType = null
    },
    reload () {
      this.loadInit()
      this.page = 0
      this.noMore = false
      
      this.loadFilter()
      this.filteredPage = 0
      this.filteredNoMore = false
    },
    hoverToggle (annotation) {
      this.hoverAnnotation = annotation
    },
    hoverIn (annotation) {
      this.hoverAnnotation = annotation
    },
    hoverOut () {
      this.hoverAnnotation = null
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
    scrollFilterList (event) {
      if (this.filteredNoMore === true) {
        return false
      }
      let element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        //console.log('scrolled');
        this.filteredPage++
      }
    },
    onDelete () {
      // 從列表中刪除這個標註
      this.rangy.removeHighlightByAnnotation(this.annotationInstance)
      
      this.reload()
      //this.annotations = this.annotations.filter(annotation => annotation !== (this.annotationInstance))
      //this.filteredAnnotations = this.filteredAnnotations.filter(annotation => annotation !== (this.annotationInstance))
      
      this.annotationInstance = null
    }
  } // methods
}

export default AnnotationList