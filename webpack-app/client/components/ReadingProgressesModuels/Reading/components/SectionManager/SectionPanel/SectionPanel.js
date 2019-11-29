import SectionChecklist from './SectionChecklist/SectionChecklist.vue'
import SectionAnnotationList from './SectionAnnotationList/SectionAnnotationList.vue'

let SectionPanel = {
  props: ['lib', 'status', 'config'
    , 'node', 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    return {
      checklistData: [],
      isChecklistSubmitted: this.lib.auth.enableCollaboration
    }
  },
  components: {
    'section-checklist': SectionChecklist,
    'section-annotation-list': SectionAnnotationList
  },
  computed: {
    /*
    isChecklistSubmitted () {
      if (this.sectionsData
              && this.sectionsData.checklistSubmitted
              && this.sectionsData.checklistSubmitted[this.sectionSeqID]) {
        console.log(this.sectionsData.checklistSubmitted[this.sectionSeqID])
      }
      //console.log('isChecklistSubmitted')
      
      return (this.sectionsData
              && this.sectionsData.checklistSubmitted
              && this.sectionsData.checklistSubmitted[this.sectionSeqID])
    }
     */
    isShowAnnotationList () {
      if (this.lib.auth.isEnableCollaboration === false) {
        return this.isChecklistSubmitted
      }
      else {
        return true
      }
    }
    
  },
//  watch: {
//  },
  mounted() {
    this.initPanel()
    this.checkIsChecklistSubmitted()
  },
  methods: {
    initPanel () {
      //console.log(this.node)
      this.node.parentNode.insertBefore(this.$refs.panel, this.node.nextSibling)
    },
    checkIsChecklistSubmitted () {
      if (this.lib.auth.isEnableCollaboration) {
        this.isChecklistSubmitted = true
      }
      
      this.isChecklistSubmitted = (this.sectionsData
              && this.sectionsData.checklistAnnotation
              && typeof(this.sectionsData.checklistAnnotation[this.sectionSeqID]) !== 'undefined' )
      console.log(this.sectionsData, this.isChecklistSubmitted)
    }
  } // methods
}

export default SectionPanel