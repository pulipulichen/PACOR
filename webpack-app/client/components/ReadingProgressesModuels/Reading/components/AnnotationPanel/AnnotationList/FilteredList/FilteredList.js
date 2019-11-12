import AnnotationSingle from './../../AnnotationSingle/AnnotationSingle.vue'

let List = {
  props: ['lib', 'status', 'config'
    , 'panelData'],
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
    
    filteringUsers () {
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
        page: this.page
      }
      
      if (this.panelData.query) {
        if (this.panelData.query.anchorPositions) {
          query.anchorPositions = this.panelData.query.anchorPositions
        }
        if (this.panelData.query.keyword 
                && this.panelData.query.keyword !== '') {
          query.keyword = this.panelData.query.keyword
        }
      }
      
      if (this.panelData.filter) {
        if (this.panelData.filter.user) {
          query.findUserID = this.panelData.filter.user.id
        }
        
        if (this.panelData.filter.type) {
          query.findType = this.panelData.filter.type
        }
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

      let summeryHeight = 0
      //console.log([this.panelData.heightPX, summeryHeight])

      return this.panelData.heightPX - summeryHeight
    },
    
    searchingKeyword () {
      if (this.panelData.query 
              && this.panelData.query.keyword
              && this.panelData.query.keyword !== '') {
        return this.panelData.query.keyword
      }
    }
  },
//  watch: {
//    annotations (annotations) {
//      if (annotations.length === 1) {
//        this.annotation = annotations[0]
//      }
//    }
//  },
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
      this.annotation = null
    },
    onDelete() {
      this.annotation = null
    },
  } // methods
}

import Height from './../Traits/computed/Height'
Height(List)

import Filter from './../Traits/methods/Filter'
Filter(List)

import Scroll from './../Traits/methods/Scroll'
Scroll(List)

import Load from './../Traits/methods/Load'
Load(List)

import Keyword from './../Traits/methods/Keyword'
Keyword(List)

//import Event from './../Traits/methods/Event'
//Event(List)

export default List