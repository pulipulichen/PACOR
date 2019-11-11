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
      return (typeof(this.panelData.query) === 'object'
              && typeof(this.panelData.query.user) === 'object'
              && this.panelData.query.user !== null)
    },
    
    computedFilteredUsers () {
      if (this.hasUserFilter) {
        return [this.panelData.query.user]
      } 
    },
    
    computedFilteredUserID () {
      if (this.hasUserFilter) {
        return this.panelData.query.user.id
      } 
    },
    
    hasTypeFilter () {
      return (typeof(this.panelData.query) === 'object'
              && typeof(this.panelData.query.type) === 'string')
    },
    
    filteredType () {
      if (this.hasTypeFilter) {
        return this.panelData.query.type
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
          query.findUserID = this.panelData.query.filter.user.id
        }
        
        if (this.panelData.filter.type) {
          query.findType = this.panelData.query.filter.type
        }
      }
      
      return query
    }
  },
  watch: {
  },
  mounted() {
    this.initEventListener()
    this.loadSummary()
  },
  methods: {
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

import Event from './../Traits/methods/Event'
Event(List)

export default List