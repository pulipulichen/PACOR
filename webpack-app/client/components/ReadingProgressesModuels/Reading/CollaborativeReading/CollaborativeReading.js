import NavigationItems from './NavigationItems/NavigationItems.vue'
//const NavigationItems = require('./NavigationItems/NavigationItems.vue').default

let CollaborativeReading = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
  components: {
    'navigation-items': NavigationItems,
    'rangy': () => import(/* webpackChunkName: "client-components/components" */ './../components/RangyManager/RangyManager.vue'),
    'annotation-panel': () => import(/* webpackChunkName: "client-components/components" */ './../components/AnnotationPanel/AnnotationPanel.vue'),
    'annotation-manager': () => import(/* webpackChunkName: "client-components/components" */ './../components/AnnotationManager/AnnotationManager.vue'),
    'section-manager': () => import(/* webpackChunkName: "client-components/components" */ './../components/SectionManager/SectionManager.vue'),
    'instruction-message': () => import(/* webpackChunkName: "client-components/components" */ './../components/InstructionMessage/InstructionMessage.vue'),
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.initComponentToLib()
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

export default CollaborativeReading