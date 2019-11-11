import AnnotationSingle from './../../AnnotationSingle/AnnotationSingle.vue'

let List = {
  props: ['lib', 'status', 'config', 'panelData'],
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
      listConfig: {
        enterSingleWhenOnlyOne: true
      }
    }
  },
  components: {
    'annotation-single': AnnotationSingle
  },
  computed: {},
  watch: {
    annotations (annotations) {
      if (annotations.length === 1) {
        this.annotation = annotations[0]
      }
    }
  },
  mounted() {
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

export default List