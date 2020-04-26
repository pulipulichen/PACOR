import AnnotationSingle from './../../AnnotationSingle/AnnotationSingle.vue'

let List = {
  props: ['lib', 'status', 'config'
    , 'panelData', 'MainList'],
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
      
      annotation: null,
    }
  },
  components: {
    'annotation-single': AnnotationSingle
  },
  computed: {
    hasUserFilter () {
      return (this.panelData.filter
              && this.panelData.filter.user)
    },
    
    filteringUser () {
      if (this.hasUserFilter) {
        return [this.panelData.filter.user]
      } 
    },
    
    filteringUserID () {
      if (this.hasUserFilter) {
        return this.panelData.filter.user.id
      } 
    },
    
//    filteringKeyword () {
//      return this.panelData.filter.keyword
//    },
    
    hasTypeFilter () {
      return (this.panelData.filter
              && typeof(this.panelData.filter.type) === 'string')
    },
    
//    hasKeywordFilter () {
//      return (this.panelData.filter 
//              && this.panelData.filter.keyword
//              && this.panelData.filter.keyword !== '')
//    },
    
    hasFilter () {
      return (this.hasTypeFilter 
              || this.hasUserFilter)
    },
    
    filteringType () {
      if (this.hasTypeFilter) {
        return this.panelData.filter.type
      }
    },
    
    query () {
      let query = {
        withCount: true,
        //page: this.page,
        page: 0,
        excludeIDList: this.annotationsIDList
      }
      
      if (Array.isArray(this.panelData.anchorPositions)
              && this.panelData.anchorPositions.length > 0) {
        query.anchorPositions = this.panelData.anchorPositions
      }
//        if (this.panelData.query.keyword 
//                && this.panelData.query.keyword !== '') {
//          query.keyword = this.panelData.query.keyword
//        }
      
      if (this.panelData.keyword 
              && this.panelData.keyword !== '') {
        query.keyword = this.panelData.keyword
      }
      
      if (this.panelData.filter) {
        if (this.panelData.filter.user) {
          query.findUserID = this.panelData.filter.user.id
        }
        
        if (this.panelData.filter.type) {
          query.findType = this.panelData.filter.type
        }
      }
      
      if (query.page === null) {
        throw new Error('query.page is null')
      }
      
      return query
    },
    isActive () {
      //console.log(this.hasFilter)
      return (this.hasFilter !== null)
    },
    editorHeightPX () {
      if (!this.panelData) {
        return null
      }

      let summeryHeight = 80

      return this.panelData.heightPX - summeryHeight
    },
    
    searchingKeyword () {
      if (this.panelData.keyword
              && this.panelData.keyword !== '') {
        return this.panelData.keyword
      }
    },
    
    mainListAnnotationCount () {
      if (this.MainList 
              && Array.isArray(this.MainList.annotations)) {
        return this.MainList.annotations.length
      }
      return 0
    }
  },
  watch: {
//    annotations (annotations) {
//      if (annotations.length === 1) {
//        this.annotation = annotations[0]
//      }
//    }
    'panelData.keyword' () {
      this.loadSummary()
    }
  },
  mounted() {
    this.initEventListener()
    this.loadSummary()
  },
  methods: {
    initEventListener: function () {
      this.lib.AnnotationPanel.addEventListener(['delete', 'update'], () => {
        if (this.hasFilter) {
          this.reload()
        }
      })
    },
    onUpdate () {
      this.annotaitons = this.annotations.filter(annotation => {
        if (annotation.id !== this.annotation.id) {
          return annotation
        }
        else {
          return this.annotation
        }
      })
      this.annotation = null
    },
    onItemDelete (annotation) {
      this.annotaitons = this.annotations.filter(a => (a.id !== annotation.id))
      if (this.annotations.length === 0) {
        //this.clearFilter()
        //this.$emit('exit')
        this.exit()
      }
    },
    onDelete() {
      // 從annotations中刪去該項
      this.annotaitons = this.annotations.filter(annotation => (annotation.id !== this.annotation.id))
      this.annotation = null      
      if (this.annotations.length === 0) {
        //this.clearFilter()
        //this.$emit('exit')
        this.exit()
      }
    },
    exit () {
      this.$emit('exit')
      this.clearFilter()
      //console.log(this.panelData)
    },
    glowAnnotation () {
      
    },
//    backToList () {
//      
//      this.glowAnnotation()
//      this.annotation = null
//    }
  } // methods
}

import Height from './../commonList/computedList/heightList'
Height(List)

import ComputedFilter from './../commonList/computedList/computedFilterList'
ComputedFilter(List)

import Query from './../commonList/computedList/queryList'
Query(List)

import Filter from './../commonList/methodsList/filterList'
Filter(List)

import Scroll from './../commonList/methodsList/scrollList'
Scroll(List)

import Load from './../commonList/methodsList/loadList'
Load(List)

import Keyword from './../commonList/methodsList/keywordList'
Keyword(List)

import Event from './../commonList/methodsList/eventList'
Event(List)

//import Event from './../Traits/methods/Event'
//Event(List)

export default List