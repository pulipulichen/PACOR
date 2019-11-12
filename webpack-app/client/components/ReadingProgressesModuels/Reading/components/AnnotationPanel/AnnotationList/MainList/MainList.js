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
        page: this.page
      }
      
        if (this.panelData.anchorPositions) {
          query.anchorPositions = this.panelData.anchorPositions
        }
      
      if (this.panelData.keyword 
              && this.panelData.keyword !== '') {
        query.keyword = this.panelData.keyword
      }
      
      //window.qqq = this.panelData.query
      //console.log(this.panelData.query)
      //console.log(this.$get('panelData.query.keyword'))
      
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
    },
    onDelete() {
      this.annotation = null
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

import Height from './../Traits/computed/Height'
Height(List)

import ComputedFilter from './../Traits/computed/ComputedFilter'
ComputedFilter(List)

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