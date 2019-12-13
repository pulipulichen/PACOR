import SectionChecklist from './SectionChecklist/SectionChecklist.vue'
import SectionAnnotationList from './SectionAnnotationList/SectionAnnotationList.vue'

let SectionPanel = {
  props: ['lib', 'status', 'config'
    , 'node', 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    //console.log(this.lib.auth.isEnableCollaboration)
    
    return {
      checklistData: [],
      isChecklistSubmitted: this.lib.auth.isEnableCollaboration
    }
  },
  components: {
    'section-checklist': SectionChecklist,
    'section-annotation-list': SectionAnnotationList
  },
  computed: {
    isShowAnnotationList () {
      if (this.lib.auth.isEnableCollaboration === false) {
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
      
      this.isChecklistSubmitted = (this.sectionsData
              && this.sectionsData.checklistAnnotation
              && typeof(this.sectionsData.checklistAnnotation[this.sectionSeqID]) !== 'undefined' )
      //console.log(this.sectionsData, this.isChecklistSubmitted)
    }
  } // methods
}

export default SectionPanel