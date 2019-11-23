import NavigationItems from './NavigationItems/NavigationItems.vue'
import $ from 'jquery'

let CollaborativeReading = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
  components: {
    'navigation-items': NavigationItems
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.initComponentToLib()
    
    this._testUserFilter()
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
    showInstruction() {
      this.$refs.InstructionMessage.show()
    },
    
    // --------------------------------
    
    _testSearch: async function () {
      console.log('_testSearch')
      await this.lib.VueHelper.sleep(1000)
      
      if (!this.lib.AnnotationPanel) {
        setTimeout(() => {
          this._testSearch()
        }, 100)
        return null
      }
      
      this.status.search.keyword = "不"
      return
      
      // 先設定篩選條件
      this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)
      
      // 再來顯示
      this.lib.AnnotationPanel.setAnchorPositions()
    },
    
    _testAnnotationSingle () {
      console.log('_testAnnotationSingle')
      setTimeout(() => {
        $('.others-MainIdea:first').click()
        
        setTimeout(() => {
          $('.AnnotationFloatWidget .meta').click()
        }, 300)
      }, 500)
    },
    _testAnnotationSingleManyComments () {
      console.log('_testAnnotationSingleManyComments')
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
      console.log('_testAnnotationSingleFocusComment')
      setTimeout(() => {
        this.lib.AnnotationPanel.focusComment(19)
      }, 500)
    },
    _testUserFilter: async function () {
      console.log('_testUserFilter')
      await this.lib.VueHelper.sleep(1000)
      
      //this.lib.UserFilter.show()
      
      this.status.filter.findUser = {
        id: 1
      }
      
    }
  } // methods
}

export default CollaborativeReading