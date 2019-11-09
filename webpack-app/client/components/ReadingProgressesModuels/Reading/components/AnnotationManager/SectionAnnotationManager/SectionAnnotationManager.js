import $ from 'jquery'
import SectionPanel from './SectionPanel/SectionPanel.vue'

let SectionAnnotationManager = {
  props: ['lib', 'status', 'config'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      sectionNodes: [],
      sectionData: []
    }
  },
  components: {
    'section-panel': SectionPanel
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.initSectionNodes()
  },
  methods: {
    initSectionNodes: async function () {
      this.sectionData = this.lib.AxiosHelper.get('/client/ReadingProgress/SectionsData')
      
      this.sectionNodes = $('[data-pacor-section-seq-id]').toArray()
    }
  } // methods
}

export default SectionAnnotationManager