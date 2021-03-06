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
    isHeaderVisible () {
      //console.log([this.hasKeywordFilter, this.annotations.length])
      return (this.hasKeywordFilter || this.annotations.length > 1)
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
      
      if (this.panelData.keyword 
              && this.panelData.keyword !== '') {
        query.keyword = this.panelData.keyword
      }
      
      //window.qqq = this.panelData.query
      //console.log(this.panelData.query)
      //console.log(this.$get('panelData.query.keyword'))
      
      if (query.page === null) {
        throw new Error('query.page is null')
      }
      
      return query
    },
    isActive () {
      return true
    },
    editorHeightPX () {
      //console.log('aaaa')
      if (!this.panelData) {
        return null
      }

      let summeryHeight = 0
      if (this.isHeaderVisible) {
        summeryHeight = 80
      }
      //console.log(this.annotations.length)
//      if (this.annotations.length < 2) {
//        summeryHeight = -50
//        //console.log('aaa')
//        // 表示不顯示標頭
//      }
      //console.log(this.panelData.heightPX, summeryHeight)
      return this.panelData.heightPX - summeryHeight
    }
  },
  watch: {
    annotations (annotations) {
      if (this.panelData.keyword 
              && this.panelData.keyword !== '') {
        return null
      }
      
      if (annotations.length === 1) {
        this.annotation = annotations[0]
      }
    },
    'lib.AnnotationPanel' (AnnotationPanel) {
      if (AnnotationPanel) {
        this.initEventListener()
      }
    },
    'panelData.keyword' () {
      this.loadSummary()
    }
  },
  mounted() {
    this.initEventListener()
    this.loadSummary()
  },
  methods: {
    onUpdate () {
      this.annotation = null
      if (this.annotations.length < 2) {
        this.lib.AnnotationPanel.hide()
      }
    },
    onItemDelete (annotation) {
      this.annotaitons = this.annotations.filter(a => (a.id !== annotation.id))
      if (this.annotations.length === 0) {
        this.lib.AnnotationPanel.hide()
      }
    },
    onDelete() {
      this.annotation = null
      if (this.annotations.length < 2) {
        this.lib.AnnotationPanel.hide()
      }
    },
    initEventListener: function () {
      if (!this.lib.AnnotationPanel) {
        return null
      }
      this.lib.AnnotationPanel.addEventListener(['delete', 'update'], () => {
        this.reload()
      })
    }
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