import SectionChecklist from './SectionChecklist/SectionChecklist.vue'
import SectionAnnotationList from './SectionAnnotationList/SectionAnnotationList.vue'

let SectionPanel = {
  props: ['lib', 'status', 'config'
    , 'node', 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      checklistData: [],
      isChecklistSubmitted: false
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
      this.isChecklistSubmitted = (this.sectionsData
              && this.sectionsData.checklistSubmitted
              && this.sectionsData.checklistSubmitted[this.sectionSeqID])
    }
  } // methods
}

export default SectionPanel