import $ from 'jquery'
import SectionPanel from './SectionPanel/SectionPanel.vue'

let SectionManager = {
  props: ['lib', 'status', 'config'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      sectionNodes: [],
      sectionsData: {
        checklist: [],
        checklistAnnotation: [],
        checklistSubmitted: [],
        annotation: []
      },
      //sectionData: []
    }
  },
  components: {
    'section-panel': SectionPanel
  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.initSectionNodes()
  },
  methods: {
    initSectionNodes: async function () {
      this.sectionsData = await this.lib.AxiosHelper.get('/client/Section/init')
      //console.log(this.sectionsData)
//      this.sectionData = this.lib.AxiosHelper.get('/client/ReadingProgress/SectionsData')
      let sectionNodes = $('[data-pacor-section-seq-id]').toArray()
      
      //while (this.sectionsData.length < sectionNodes.length) {
      //  this.sectionsData.push({})
      //}
      
      //console.log()
      
//      sectionNodes.forEach((node, i) => {
//        if (typeof(this.sectionsData[i]) === 'undefined') {
//          this.sectionsData[i] = {}
//        }
//      })
      
      // 根據數量來初始化資料
      let nodeCount = sectionNodes.length
      
      
      this.sectionNodes = sectionNodes
      Object.keys(this.sectionsData).forEach(key => {
        if (Array.isArray(this.sectionsData[key]) === false) {
          this.sectionsData[key] = new Array(nodeCount)
        }
      })
      
      this.setRefreshInterval()
      
      //console.log(this.sectionsData)
    },
    setRefreshInterval: async function () {
      if (this.lib.auth.currentStepAnnotationConfig.enableCollaboration === false) {
        // 如果不是在合作的場合，那就不自動更新
        return false
      }
      
      setTimeout(async () => {
        if (this.sectionsData.enableRefresh === true) {
          this.sectionsData.annotation = await this.lib.AxiosHelper.get('/client/Section/annotations')
        }

        this.setRefreshInterval()
      }, 30 * 1000)
    }
  } // methods
}

export default SectionManager