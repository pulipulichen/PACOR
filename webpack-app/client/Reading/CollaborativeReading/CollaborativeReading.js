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
  mounted: async function () {
    this.initComponentToLib()
    
    //this._testUserFilter()
    //await this._testVerticalMenu()
    //this._testSearch()
    //this._testErrorAuth()
    this._testTutorial()
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
    
   } // methods
}

import methodsTestCollaborativeReading from './methodsTestCollaborativeReading.js'
methodsTestCollaborativeReading(CollaborativeReading)

export default CollaborativeReading