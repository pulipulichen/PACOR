import SectionChecklist from './SectionChecklist/SectionChecklist.vue'

let SectionPanel = {
  props: ['lib', 'status', 'config', 'node', 'sectionSeqID', 'sectionData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      checklistData: []
    }
  },
  components: {
    'section-checklist': SectionChecklist
  },
  computed: {
    isChecklistSubmitted () {
      return (this.sectionData.checklistSubmittedAt === 'number')
    }
  },
  watch: {
  },
  mounted() {
    this.initPanel()
  },
  methods: {
    initPanel () {
      console.log(this.node)
      this.node.parentNode.insertBefore(this.$refs.panel, this.node.nextSibling)
    },
    
  } // methods
}

export default SectionPanel