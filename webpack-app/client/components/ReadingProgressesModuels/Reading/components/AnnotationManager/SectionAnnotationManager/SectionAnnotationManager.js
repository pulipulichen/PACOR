import $ from 'jquery'
import SectionPanel from './SectionPanel/SectionPanel.vue'

let SectionAnnotationManager = {
  props: ['lib', 'status', 'config', 'sectionsData'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      sectionNodes: [],
      //sectionData: []
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
      
      
      this.sectionNodes = sectionNodes
    }
  } // methods
}

export default SectionAnnotationManager