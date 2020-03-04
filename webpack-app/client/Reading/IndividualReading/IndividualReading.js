import NavigationItems from './NavigationItems/NavigationItems.vue'
//const NavigationItems = require('./NavigationItems/NavigationItems.vue').default
import IndividualReadingInstruction from './IndividualReadingInstruction/IndividualReadingInstruction.vue'

let IndividualReading = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
  components: {
    'navigation-items': NavigationItems,
    'individual-reading-instruction': IndividualReadingInstruction,
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.initComponentToLib()
    
    // ----------------------
    // 以下是測試
    
    //this._testSearch()  // for test
    this._testTutorial()
    //this._testTutorialShowClick()
    //console.log(this.lib.style.scrollBarWidth)
    //this._testDetect()
    //this._testSelectRandom()
    //this._testInstruction()
  },
  destroyed () {
    //console.log('退場了')
    this.lib.RangyManager = null
    this.lib.AnnotationPanel = null
    this.lib.SectionManager = null
  },
  methods: {
    initComponentToLib: async function () {
//      if (!this.$refs.RangyManager) {
//        setTimeout(() => {
//          this.initComponentToLib()
//        }, 100)
//        return false
//      }
//      
      while (!this.$refs.RangyManager) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.RangyManager = this.$refs.RangyManager
      
      while (!this.$refs.AnnotationPanel) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.AnnotationPanel = this.$refs.AnnotationPanel
      
      while (!this.$refs.SectionManager) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.SectionManager = this.$refs.SectionManager
      //console.log(this.lib.AnnotationPanel)
      
      await this.initNavComponentToLib()
      
      this.status.progress.initComponents = true
    },
    initNavComponentToLib: async function () {
      while (!this.$refs.nav.$refs.AnnotationTypeFilter) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.AnnotationTypeFilter = this.$refs.nav.$refs.AnnotationTypeFilter
      
      this.status.progress.initComponents = true
    },
    onChecklistComplete () {
      //throw 'onChecklistComplete'
      
      if (this.lib.auth.currentStepConfig.goToNextStepOnChecklistComplete === true) {
        this.lib.auth.nextStep()
      }
    },
    onTimeup () {
      //throw new Error('Wait')
      //console.log('timeup')
      this.lib.auth.nextStep()
    },
    
    showInstruction() {
      this.$refs.ReadingInstruction.show()
    }
  } // methods
}

import methodsTestIndividualReading from './methodsTestIndividualReading.js'
methodsTestIndividualReading(IndividualReading)

export default IndividualReading