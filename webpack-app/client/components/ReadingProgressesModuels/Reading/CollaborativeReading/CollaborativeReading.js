import NavigationItems from './NavigationItems/NavigationItems.vue'
//const NavigationItems = require('./NavigationItems/NavigationItems.vue').default
import TestDropdown from './TestDropdown/TestDropdown.vue'

import $ from 'jquery'

let CollaborativeReading = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
  components: {
    'navigation-items': NavigationItems,
    'TestDropdown': TestDropdown
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.initComponentToLib()
    
    //this._testAnnotationSingleFocusComment()
  },
  methods: {
    initComponentToLib () {
      if (!this.$refs.RangyManager) {
        setTimeout(() => {
          this.initComponentToLib()
        }, 100)
        return false
      }
      
      this.lib.RangyManager = this.$refs.RangyManager
      this.lib.AnnotationPanel = this.$refs.AnnotationPanel
      //console.log(this.lib.AnnotationPanel)
    },
    _testSearch () {
      if (!this.lib.AnnotationPanel) {
        setTimeout(() => {
          this._testSearch()
        }, 100)
        return null
      }
      
      this.status.search.keyword = "我"
      
      // 先設定篩選條件
      this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)
      
      // 再來顯示
      this.lib.AnnotationPanel.setAnchorPositions()
    },
    
    _testAnnotationSingle () {
      setTimeout(() => {
        $('.others-MainIdea:first').click()
        
        setTimeout(() => {
          $('.AnnotationFloatWidget .meta').click()
        }, 300)
      }, 500)
    },
    _testAnnotationSingleManyComments () {
      setTimeout(() => {
        if ($('.others-Clarified:first').length === 0) {
          this._testAnnotationSingleManyComments()
          return
        }
        $('.others-Clarified:first').click()
        setTimeout(() => {
          $('.AnnotationFloatWidget .AnnotationTypeButton[title="已釐清"]:last').click()
          
          setTimeout(() => {
            //console.log($('.FilteredList .list .AnnotationItem:last .meta i').length)
            $('.FilteredList .list .AnnotationItem:last .meta i').click()
            
            // 測試搜尋
            //this.lib.AnnotationPanel.findKeyword('co')
            
          }, 1000)
        }, 300)
      }, 500)
    },
    _testAnnotationSingleFocusComment () {
      setTimeout(() => {
        this.lib.AnnotationPanel.focusComment(19)
      }, 500)
    },
    showInstruction() {
      this.$refs.InstructionMessage.show()
    }
  } // methods
}

export default CollaborativeReading