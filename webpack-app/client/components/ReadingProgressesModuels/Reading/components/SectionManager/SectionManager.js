import $ from 'jquery'
import SectionPanel from './SectionPanel/SectionPanel.vue'

let SectionManager = {
  props: ['lib', 'status', 'config'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      sectionNodes: [],
      sectionsData: null,
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
      await this.loadSectionData()
      
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
      
      
      this.sectionNodes = sectionNodes
      
      this.setRefreshInterval()
    },
    loadSectionData: async function () {
      this.sectionsData = await this.lib.AxiosHelper.get('/client/Section/init')
    },
    setRefreshInterval: async function () {
      if (this.lib.auth.currentStepAnnotationConfig.enableCollaboration === false) {
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