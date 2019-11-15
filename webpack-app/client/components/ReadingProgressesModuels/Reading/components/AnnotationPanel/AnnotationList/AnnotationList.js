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
      MainList: null
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
        //console.log(f, (f.user !== null && typeof(f.user) === 'object' ), (typeof(f.type) === 'string'))
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
    setTimeout(() => {
      this.MainList = this.$refs.MainList
    }, 0)
    
  },
  methods: {
    scrollTo () {
      if (!this.panelData.anchorPositions
              || this.panelData.anchorPositions.length === 0) {
        // 沒有這個參數的話，不捲動
        return false
      }
      //console.log('你有scroll嗎？')
      let rect = this.lib.RangyManager.getRectFromAnchorPositions(this.panelData.anchorPositions)
      this.lib.AnnotationPanel.scrollToRect(rect)
      //throw '@TODO'
    },
    onFilteredListExit () {
      //console.log(this.$refs.MainList.annotations.length)
      this.$refs.FilteredList.clearFilter()
      if (this.$refs.MainList.annotations.length < 2) {
        this.lib.AnnotationPanel.hide()
      }
    }
    //onUpdate () {
    //  this.annotation = null
    //}
  } // methods
}

export default AnnotationList