import SectionChecklist from './SectionChecklist/SectionChecklist.vue'
import SectionAnnotationList from './SectionAnnotationList/SectionAnnotationList.vue'

let SectionPanel = {
  props: ['lib', 'status', 'config', 'node', 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      checklistData: []
    }
  },
  components: {
    'section-checklist': SectionChecklist,
    'section-annotation-list': SectionAnnotationList
  },
  computed: {
    isChecklistSubmitted () {
      //console.log(this.sectionsData.checklist[this.sectionSeqID])
      
      return (this.sectionsData !== null 
              && typeof(this.sectionsData) === 'object'
              && typeof(this.sectionsData.checklist[this.sectionSeqID]) === 'object'
              && typeof(this.sectionsData.checklist[this.sectionSeqID].submittedAt) === 'number')
    }
  },
  watch: {
  },
  mounted() {
    this.initPanel()
  },
  methods: {
    initPanel () {
      //console.log(this.node)
      this.node.parentNode.insertBefore(this.$refs.panel, this.node.nextSibling)
    },
  } // methods
}

export default SectionPanel