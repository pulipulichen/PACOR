import NavigationItems from './NavigationItems/NavigationItems.vue'
//const NavigationItems = require('./NavigationItems/NavigationItems.vue').default

let IndividualReading = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
  components: {
    'navigation-items': NavigationItems,
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.initComponentToLib()
    
    //this._testSearch()  // for test
  },
  destroyed () {
    //console.log('退場了')
    this.lib.RangyManager = null
    this.lib.AnnotationPanel = null
    this.lib.SectionManager = null
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
      //console.log(this.lib.AnnotationPanel)
    },
    onChecklistComplete () {
      //throw 'onChecklistComplete'
      this.lib.auth.nextStep()
    },
    onTimeup () {
      //throw new Error('Wait')
      //console.log('timeup')
      this.lib.auth.nextStep()
    },
    
    // -----------------------------------------------------
    
    _testSearch () {
      if (!this.lib.AnnotationPanel) {
        setTimeout(() => {
          this._testSearch()
        }, 100)
        return
      }
      
      this.status.search.keyword = "我"
      
      // 先設定篩選條件
      this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)
      
      // 再來顯示
      this.lib.AnnotationPanel.setAnchorPositions()
    },
    showInstruction() {
      this.$refs.InstructionMessage.show()
    }
  } // methods
}

export default IndividualReading