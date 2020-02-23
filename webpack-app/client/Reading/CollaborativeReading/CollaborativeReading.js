import NavigationItems from './NavigationItems/NavigationItems.vue'
//import NotificationManager from './../components/NotificationManager/NotificationManager.vue'
//import $ from 'jquery'

let CollaborativeReading = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
  components: {
    'navigation-items': NavigationItems,
    'instruction-message-content': null,
    //'notification-manager': NotificationManager
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted: async function () {
    this.initComponentToLib()
    
    // ----------------------
    // 以下是測試
    
    //this._testUserFilter()
    //await this._testShowVerticalMenu()
    //this._testSearch()
    //this._testErrorAuth()
    //this._testTutorial()
    //this._testTutorialShowClick()
    //this._testInstruction()
    //this._testNotificationFullList()
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
    initComponentToLib: async function () {
      if (!this.$refs.RangyManager) {
        setTimeout(() => {
          this.initComponentToLib()
        }, 100)
        return false
      }
      
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
      
      while (!this.$refs.NotificationManager) {
        await this.lib.VueHelper.sleep(100)
      }
      this.lib.NotificationManager = this.$refs.NotificationManager
      
      //console.log(this.lib.NotificationManager)
      
      //console.log(this.lib.AnnotationPanel)
      await this.initNavComponentToLib()
      
      this.status.progress.initComponents = true
    },
    initNavComponentToLib: async function () {
      
      if (this.lib.auth.enableCollaboration) {
        while (!this.$refs.nav.$refs.UserFilter) {
          await this.lib.VueHelper.sleep(100)
        }
        this.lib.UserFilter = this.$refs.nav.$refs.UserFilter
      }
      
      while (!this.$refs.nav.$refs.AnnotationTypeFilter) {
        await this.lib.VueHelper.sleep(100)
      }
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