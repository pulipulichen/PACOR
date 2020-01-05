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
      enableLoad: true,
      pause: false,
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
    this.addFocusBlurEvent()
    this.initSectionNodes()
  },
  destroyed () {
    this.enableLoad = false
    this.removeFocusBlurEvent()
    //console.log('退場了')
    //$('.non-invasive-web-style-framework.SectionPanel').remove()
  },
  methods: {
    initSectionNodes: async function () {
      //console.log('initSectionNodes', this.lib.auth.currentStepAnnotationConfig)
      if (!this.lib.auth.stepSectionAnnotationConfig) {
        //console.log('initSectionNodes')
        return false
      }
      
      if (this.query.selector) {
        console.error(this.query)
        throw new Error('this.query is incorrect.')
      }
      
      let result = await this.lib.AxiosHelper.get('/client/Section/init', this.query)
      //console.log(result.checklistAnnotation)
      this.sectionsData = result
      
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
      
      this.setupTutorial()
    },
    
    
    addFocusBlurEvent () {
      window.addEventListener('focus', this.focusEvent) 
      window.addEventListener('blur', this.blurEvent)
    },
    removeFocusBlurEvent () {
      window.removeEventListener('focus', this.focusEvent) 
      window.removeEventListener('blur', this.blurEvent)
      this.pause = true
    },
    focusEvent () {
      if (this.pause === true) {
        this.pause = false
        this.loadAnnotation()
      }
    },
    blurEvent () {
      if (this.status.role !== 'reader') {
        // 如果是管理者，那就不做自動停止
        return false
      }
      this.pause = true
    },
    
    loadAnnotation: async function () {
      if (this.enableLoad === false 
              || this.lib.auth.isEnableCollaboration === false
              || this.pause === true) {
        return false
      } 
      
      //console.log(this.query)
      let result = await this.lib.AxiosHelper.get('/client/Section/getSectionAnnotations', this.query)
      //console.log(result)
      if (Array.isArray(result)) {
        this.sectionsData.annotation = result
      }
    },
    setRefreshInterval: async function () {
      if (this.lib.auth.isEnableCollaboration === false) {
        // 如果不是在合作的場合，那就不自動更新
        return false
      }
      
      let updateInterval = this.lib.auth.stepSectionAnnotationConfig.updateInterval
      //console.log(updateInterval)
      if (typeof(updateInterval) !== 'number') {
        return false
      }
      
      await this.lib.VueHelper.sleep(updateInterval)
      
      if (this.enableLoad === false 
              || this.lib.auth.isEnableCollaboration === false
              || this.pause === true) {
        return false
      } 
      
      if (this.sectionsData.enableRefresh === true) {
        this.loadAnnotation()
      }

      this.setRefreshInterval()
    },
    buildDefaultSectionAnnotation (sectionSeqID) {
      let annotation = {
        type: 'SectionMainIdea',
        anchorPositions: [{
          type: 'section',
          section_id: sectionSeqID
        }],
        notes: [{
          type: 'default',
          note: ''
        }]
      }
      
      this.lib.AnnotationHelper.autoComplete(annotation)
      
      return annotation
    },
  } // methods
}

import methodsTutorialSectionManager from './methodsTutorialSectionManager.js'
methodsTutorialSectionManager(SectionManager)

export default SectionManager