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
    
    // ----------------------
    // 以下是測試
    
    //this._testSearch()  // for test
    //this._testTutorial()
    //this._testTutorialShowClick()
    //console.log(this.lib.style.scrollBarWidth)
    console.log({
      os: this.lib.style.detectOS,
      browser: this.lib.style.detectBrowser,
    })
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
    
    showInstruction() {
      this.$refs.InstructionMessage.show()
    }
  } // methods
}

import methodsTestIndividualReading from './methodsTestIndividualReading.js'
methodsTestIndividualReading(IndividualReading)

export default IndividualReading