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
    
    computedFilteredUsers () {
      if (this.hasUserFilter) {
        return [this.panelData.filter.user]
      } 
    },
    
    computedFilteredUserID () {
      if (this.hasUserFilter) {
        return this.panelData.filter.user.id
      } 
    },
    
    hasTypeFilter () {
      return (this.panelData.filter
              && typeof(this.panelData.filter.type) === 'string')
    },
    
    hasKeywordFilter () {
      return (this.panelData.filter 
              && this.panelData.filter.keyword
              && this.panelData.filter.keyword !== '')
    },
    
    hasFilter () {
      return (this.hasTypeFilter 
              || this.hasUserFilter
              || this.hasKeywordFilter)
    },
    
    filteredType () {
      if (this.hasTypeFilter) {
        return this.panelData.filter.type
      }
    },
    
    query () {
      let query = {
        withCount: true,
        page: this.page
      }
      
      if (this.panelData.query
              && this.panelData.query.anchorPositions) {
        query.anchorPositions = this.panelData.query.anchorPositions
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
    }
  },
//  watch: {
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

//import Event from './../Traits/methods/Event'
//Event(List)

export default List