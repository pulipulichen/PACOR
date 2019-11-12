//import AnnotationSingle from './../AnnotationSingle/AnnotationSingle.vue'

import MainList from './MainList/MainList.vue'
import FilteredList from './FilteredList/FilteredList.vue'

let AnnotationList = {
  props: ['lib', 'status', 'config'
    // , 'listPositions'
    //, 'findAnnotation', 'propFindUser', 'propFindType'
    //, 'heightPX', 'rangy'
    , 'panelData'
  ],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
//      filteredAnnotations: [],
//      filteredAnnotationCount: 0,
//      filteredUsers: [],
//      filteredUserCount: 0,
//      filteredTypes: [],
//      filteredPage: 0,
//      filteredNoMore: false,
//      
//      annotationInstance: this.findAnnotation,
//      findUser: this.propFindUser,
//      findType: this.propFindType,
//      
//      hoverAnnotation: null
    }
  },
  components: {
    //'annotation-single': AnnotationSingle,
    'main-list': MainList,
    'filtered-list': FilteredList
  },
  computed: {
    isFiltering () {
      if (this.panelData.filter) {
        let f = this.panelData.filter
        //console.log(f, (f.user !== null && typeof(f.user) === 'object' ), (typeof(f.type) === 'string'), (typeof(f.keyword) === 'string'))
        return ( (f.user !== null && typeof(f.user) === 'object' )
                || (typeof(f.type) === 'string')
                || (typeof(f.keyword) === 'string') )
      }
      return false
    },
    
//    isFiltering () {
//      return (this.findUser !== null || this.findType !== null)
//    },
//    findUserID () {
//      if (this.findUser !== null) {
//        return this.findUser.id
//      }
//    }
  },
  watch: {
//    'propFindUser' (propFindUser) {
//      this.findUser = propFindUser
//    },
//    'propFindType' (propFindType) {
//      this.findType = propFindType
//    },
//    'listPositions' () {
//      this.page = 0
//      this.noMore = false
//      this.annotationInstance = this.findAnnotation
//      this.loadInit()
//    },
//    'findAnnotation' (findAnnotation) {
//      this.annotationInstance = findAnnotation
//    },
//    'findUser' () {
//      this.filterPage = 0
//      this.filterNoMore = false
//      this.loadFilter()
//    },
//    'findType' () {
//      this.filterPage = 0
//      this.filterNoMore = false
//      this.loadFilter()
//    },
//    'page' (page) {
//      if (page > 0) {
//        this.loadInitNext()
//      }
//    },
//    'filteredPage' (page) {
//      if (page > 0) {
//        this.loadFilterNext()
//      }
//    },
//    'hoverAnnotation' (annotation) {
//      if (annotation !== null) {
//        this.rangy.hoverIn(annotation)
//      }
//      else {
//        this.rangy.hoverOut(annotation)
//      }
//    },
//    'status.search.showAnnotationList': async function (show) {
//      let query = {
//        withCount: true,
//        page: this.page,
//        keyword: this.status.search.keyword
//        //t: (new Date()).getTime()
//      }
//      let url = '/client/Annotation/list'
//
//      let result = await this.lib.AxiosHelper.post(url, query)
//      if (result === 0) {
//        this.noMore = true
//        return false
//      }
//      //console.log(result)
//
//      for (let key in result) {
//        this[key] = result[key]
//      }
//    }
  },
  mounted() {
//    this.loadInit()
//    this.loadFilter()
    this.scrollTo()
  },
  methods: {
//    loadInit: async function (selectOnlyOne) {
//      if (Array.isArray(this.listPositions)) {
//        let query = {
//          anchorPositions: this.listPositions,
//          withCount: true,
//          page: this.page,
//          //t: (new Date()).getTime()
//        }
//        let url = '/client/Annotation/list'
//        
//        let result = await this.lib.AxiosHelper.post(url, query)
//        if (result === 0) {
//          return this.$emit('close')
//        }
//        //console.log(result)
//        
//        for (let key in result) {
//          this[key] = result[key]
//        }
//        
//        //console.log(this.annotations.length)
//        if (selectOnlyOne !== false) {
//          if (this.annotations.length === 1) {
//            this.annotationInstance = this.annotations[0]
//          }
//        }
//      }
//    },
//    loadInitNext: async function () {
//      if (Array.isArray(this.listPositions)) {
//        let query = {
//          anchorPositions: this.listPositions,
//          withCount: true,
//          page: this.page
//        }
//        let url = '/client/Annotation/listNext'
//        
//        let result = await this.lib.AxiosHelper.post(url, query)
//        //console.log(result)
//        if (Array.isArray(result) && result.length > 0) {
//          this.annotations = this.annotations.concat(result)
//        }
//        else {
//          this.noMore = true
//        }
//      }
//    },
//    loadFilter: async function () {
//      if (Array.isArray(this.listPositions)
//              && (this.findUserID !== null || this.findType !== null) ) {
//        
//        let query = {
//          anchorPositions: this.listPositions,
//          withCount: true,
//          // @TODO 這邊應該要加入page
//          findUserID: this.findUserID,
//          findType: this.findType,
//          page: this.filteredPage
//        }
//        
//        let url = '/client/Annotation/list'
//        
//        let result = await this.lib.AxiosHelper.post(url, query)
//        //console.log(result)
//        
//        this.filteredAnnotations = result.annotations
//        this.filteredAnnotationCount = result.annotationCount
//      }
//    },
//    loadFilterNext: async function () {
//      if (Array.isArray(this.listPositions)
//              && (this.findUserID !== null || this.findType !== null) ) {
//        
//        let query = {
//          anchorPositions: this.listPositions,
//          withCount: true,
//          // @TODO 這邊應該要加入page
//          findUserID: this.findUserID,
//          findType: this.findType,
//          page: this.filteredPage
//        }
//        
//        let url = '/client/Annotation/listNext'
//        
//        let result = await this.lib.AxiosHelper.post(url, query)
//        //console.log(result)
//        
//        if (Array.isArray(result) && result.length > 0) {
//          this.filteredAnnotations = this.filteredAnnotations.concat(result)
//        }
//        else {
//          this.filteredNoMore = true
//        }
//      }
//    },
//    clearFilter () {
//      this.findUser = null
//      this.findType = null
//    },
//    reload: async function () {
//      this.annotations = []
//      this.page = 0
//      this.noMore = false
//      
//      this.filteredAnnotation = []
//      this.filteredPage = 0
//      this.filteredNoMore = false
//      
//      await this.loadInit(false)
//      await this.loadFilter()
//      //console.log('do reload')
//    },
//    hoverToggle (annotation) {
//      this.hoverAnnotation = annotation
//    },
//    hoverIn (annotation) {
//      this.hoverAnnotation = annotation
//    },
//    hoverOut () {
//      this.hoverAnnotation = null
//    },
//    scrollList (event) {
//      if (this.noMore === true) {
//        return false
//      }
//      let element = event.target;
//      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
//        //console.log('scrolled');
//        this.page++
//      }
//    },
//    scrollFilterList (event) {
//      if (this.filteredNoMore === true) {
//        return false
//      }
//      let element = event.target;
//      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
//        //console.log('scrolled');
//        this.filteredPage++
//      }
//    },
//    
//    onDelete () {
//      // 從列表中刪除這個標註
//      //this.rangy.removeHighlightByAnnotation(this.annotationInstance)
//      this.onUpdate()
//    },
//    onUpdate: async function () {
//      await this.reload()
//      //this.annotations = this.annotations.filter(annotation => annotation !== (this.annotationInstance))
//      //this.filteredAnnotations = this.filteredAnnotations.filter(annotation => annotation !== (this.annotationInstance))
//      
//      this.annotationInstance = null
//      if (this.annotations.length < 2) {
//        this.$emit('close')
//      }
//    }
    scrollTo () {
      let rect = this.lib.RangyManager.getRectFromAnchorPositions(this.panelData.query.anchorPositions)
      this.lib.AnnotationPanel.scrollToRect(rect)
      //throw '@TODO'
    },
    onUpdate () {
      this.annotation = null
    }
  } // methods
}

export default AnnotationList