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
    }
  },
  components: {
    'main-list': MainList,
    'filtered-list': FilteredList
  },
  computed: {
    isFiltering () {
      if (this.panelData.filter) {
        let f = this.panelData.filter
        //console.log(f, (f.user !== null && typeof(f.user) === 'object' ), (typeof(f.type) === 'string'), (typeof(f.keyword) === 'string'))
        return ( (f.user !== null && typeof(f.user) === 'object' )
                || (typeof(f.type) === 'string') )
      }
      return false
    },
    
  },
//  watch: {
//  },
  mounted() {
//    this.loadInit()
//    this.loadFilter()
    this.scrollTo()
  },
  methods: {
    scrollTo () {
      if (!this.panelData.anchorPositions
              || this.panelData.anchorPositions.length === 0) {
        // 沒有這個參數的話，不捲動
        return false
      }
      
      let rect = this.lib.RangyManager.getRectFromAnchorPositions(this.panelData.anchorPositions)
      this.lib.AnnotationPanel.scrollToRect(rect)
      //throw '@TODO'
    },
    onUpdate () {
      this.annotation = null
    }
  } // methods
}

export default AnnotationList