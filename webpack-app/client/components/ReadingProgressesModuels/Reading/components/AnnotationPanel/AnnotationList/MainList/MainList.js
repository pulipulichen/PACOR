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
    query () {
      let query = {
        withCount: true,
        page: this.page
      }
      
      if (this.panelData.query
              && this.panelData.query.anchorPositions) {
        query.anchorPositions = this.panelData.query.anchorPositions
      }
      
      return query
    },
    isActive () {
      return true
    },
    editorHeightPX () {
      //console.log('aaaa')
      if (!this.panelData) {
        return
      }

      let summeryHeight = 0
      //console.log(this.annotations.length)
      if (this.annotations.length < 2) {
        summeryHeight = -50
        //console.log('aaa')
        // 表示不顯示標頭
      }
      //console.log(this.panelData.heightPX, summeryHeight)
      return this.panelData.heightPX - summeryHeight
    }
  },
  watch: {
    annotations (annotations) {
      if (annotations.length === 1) {
        this.annotation = annotations[0]
      }
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
      this.lib.AnnotationPanel.addEventListener(['delete', 'update'], () => {
        this.reload()
      })
    }
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