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
      enableLoad: true
      //sectionData: []
    }
  },
  components: {
    'section-panel': SectionPanel
  },
  computed: {
    query () {
      if (this.status.filter.focusUser !== null 
            && typeof(this.status.filter.focusUser.id) === 'number') {
        return {
          focusUserID: this.status.filter.focusUser.id
        }
      }
      else {
        return {}
      }
    }
  },
  watch: {
    'status.filter.focusUser' () {
      //console.log('有換人嗎？')
      this.loadAnnotation()
    },
    'lib.auth.currentStep' () {
      this.loadAnnotation()
    }
  },
  mounted() {
    this.initSectionNodes()
  },
  destroyed () {
    this.enableLoad = false
  },
  methods: {
    initSectionNodes: async function () {
      //console.log('initSectionNodes', this.lib.auth.currentStepAnnotationConfig)
      if (!this.lib.auth.currentStepAnnotationConfig) {
        //console.log('initSectionNodes')
        return false
      }
      this.sectionsData = await this.lib.AxiosHelper.get('/client/Section/init', this.query)
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
    loadAnnotation: async function () {
      if (this.enableLoad === false || this.lib.auth.isEnableCollaboration === false) {
        return false
      } 
      
      //console.log(this.query)
      let result = await this.lib.AxiosHelper.get('/client/Section/annotations', this.query)
      //console.log(result)
      this.sectionsData.annotation = result
      
    },
    setRefreshInterval: async function () {
      if (this.lib.auth.isEnableCollaboration === false) {
        // 如果不是在合作的場合，那就不自動更新
        return false
      }
      
      await this.lib.VueHelper.sleep(30 * 1000)
      
      if (this.enableLoad === false || this.lib.auth.isEnableCollaboration === false) {
        return false
      } 
      
      if (this.sectionsData.enableRefresh === true) {
        this.loadAnnotation()
      }

      this.setRefreshInterval()
    },
    buildDefaultSectionAnnotation (sectionSeqID) {
      return {
        type: 'SectionMainIdea',
        anchorPositions: [{
            type: 'section',
            seq_id: sectionSeqID
          }],
        notes: [{
            type: 'default',
            note: ''
          }]
      }
    }
  } // methods
}

export default SectionManager