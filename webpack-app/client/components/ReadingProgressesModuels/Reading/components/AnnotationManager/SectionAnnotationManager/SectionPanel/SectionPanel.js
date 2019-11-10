import SectionChecklist from './SectionChecklist/SectionChecklist.vue'
import SectionAnnotationList from './SectionAnnotationList/SectionAnnotationList.vue'

let SectionPanel = {
  props: ['lib', 'status', 'config', 'node', 'sectionSeqID', 'sectionData'],
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
      return (this.sectionData !== null 
              && typeof(this.sectionData) === 'object'
              && this.sectionData.checklistSubmittedAt === 'number')
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