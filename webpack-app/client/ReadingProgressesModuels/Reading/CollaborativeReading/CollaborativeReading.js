import NavigationItems from './NavigationItems/NavigationItems.vue'
//import NotificationManager from './../components/NotificationManager/NotificationManager.vue'
import $ from 'jquery'

let CollaborativeReading = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
  components: {
    'navigation-items': NavigationItems,
    //'notification-manager': NotificationManager
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.initComponentToLib()
    
    this._testUserFilter()
  },
  destroyed () {
    //console.log('退場了')
    this.lib.RangyManager = null
    this.lib.AnnotationPanel = null
    this.lib.SectionManager = null
    this.lib.UserFilter = null
    this.lib.AnnotationTypeFilter = null
    this.lib.NotificationManager = null
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
      this.lib.SectionManager = this.$refs.SectionManager
      this.lib.NotificationManager = this.$refs.NotificationManager
      
      //console.log(this.lib.AnnotationPanel)
      this.initNavComponentToLib()
    },
    initNavComponentToLib () {
       if (!this.$refs.nav.$refs.UserFilter) {
        setTimeout(() => {
          this.initNavComponentToLib()
        }, 100)
        return false
      }
      
      this.lib.UserFilter = this.$refs.nav.$refs.UserFilter
      this.lib.AnnotationTypeFilter = this.$refs.nav.$refs.AnnotationTypeFilter
    },
    showInstruction() {
      this.$refs.InstructionMessage.show()
    },
    timeup () {
      //throw new Error('Wait')
      this.lib.auth.nextStep()
    },
    
    // --------------------------------
    _testConfirmModal: async function () {
      console.log('_testSearch')
      await this.lib.VueHelper.sleep(1000)
      
      let r1 = await this.lib.ConfirmModal.show()
      console.log(r1)
      let r2 = await this.lib.ConfirmModal.show()
      console.log(r2)
    },
    
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
      await this.lib.VueHelper.sleep(2000)
      
      this.lib.UserFilter.show()
      
      /*
      this.status.filter.focusUser = {
        id: 1
      }
      */
    },
    _testTypeFilter: async function () {
      console.log('_testTypeFilter')
      await this.lib.VueHelper.sleep(1000)
      
      this.lib.AnnotationTypeFilter.show()
      
      /*
      this.status.filter.focusUser = {
        id: 1
      }
      */
    },
    _testNotificationFullList: async function () {
      console.log('_testNotificationModal')
      await this.lib.VueHelper.sleep(1000)
      
      this.lib.NotificationManager.showFull()
    }
   } // methods
}

export default CollaborativeReading