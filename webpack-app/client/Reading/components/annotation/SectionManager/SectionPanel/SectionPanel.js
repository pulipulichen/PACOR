import SectionChecklist from './SectionChecklist/SectionChecklist.vue'
import SectionAnnotationList from './SectionAnnotationList/SectionAnnotationList.vue'
import $ from 'jquery'

let SectionPanel = {
  props: ['lib', 'status', 'config'
    , 'node', 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    //console.log(this.lib.auth.isEnableCollaboration)
    
    let isChecklistSubmitted = true
    if (this.lib.auth.stepSectionAnnotationConfig
            && Array.isArray(this.lib.auth.stepSectionAnnotationConfig.checklist)
            && this.lib.auth.stepSectionAnnotationConfig.checklist.length > 0) {
      isChecklistSubmitted = this.lib.auth.isEnableCollaboration
    }
    
    return {
      checklistData: [],
      isChecklistSubmitted
    }
  },
  components: {
    'section-checklist': SectionChecklist,
    'section-annotation-list': SectionAnnotationList
  },
  computed: {
    isShowAnnotationList () {
      if (this.lib.auth.isEnableCollaboration === false) {
        //console.log(this.isChecklistSubmitted)
        return this.isChecklistSubmitted
      }
      else {
        return true
      }
    }
  },
  watch: {
    'lib.auth.isEnableCollaboration' (enable) {
      //console.log('lib.auth.isEnableCollaboration', enable)
      if (enable === true) {
        this.isChecklistSubmitted = true
      }
    }
  },
  mounted() {
    this.initPanel()
    this.checkIsChecklistSubmitted()
  },
  destroyed () {
    //console.log('SectionPanel 退場了')
    //$(this.$refs.panel).remove()
    $(`.non-invasive-web-style-framework.SectionPanel[data-section-id="${this.sectionSeqID}"]`).remove()
  },
  methods: {
    initPanel () {
      //console.log(this.node)
      this.node.parentNode.insertBefore(this.$refs.panel, this.node.nextSibling)
    },
    checkIsChecklistSubmitted () {
      if (this.lib.auth.isEnableCollaboration === true) {
        this.isChecklistSubmitted = true
        return null
      }
      
      //this.isChecklistSubmitted = (this.sectionsData
      //        && this.sectionsData.checklistAnnotation
      //        && typeof(this.sectionsData.checklistAnnotation[this.sectionSeqID]) !== 'undefined' )
      //console.log(this.sectionsData, this.isChecklistSubmitted)
      
      this.isChecklistSubmitted = (this.sectionsData
              && Array.isArray(this.sectionsData.checklistSubmitted)
              && this.sectionsData.checklistSubmitted[this.sectionSeqID] === true )
      
      if (!this.lib.auth.stepSectionAnnotationConfig
            || !Array.isArray(this.lib.auth.stepSectionAnnotationConfig.checklist)
            || this.lib.auth.stepSectionAnnotationConfig.checklist.length === 0) {
        // 如果沒有checklist的設定，那就當作已經確認完了
        this.isChecklistSubmitted = true
      }
    }
  } // methods
}

export default SectionPanel