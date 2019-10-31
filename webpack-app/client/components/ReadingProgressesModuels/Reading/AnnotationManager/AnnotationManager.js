import RangyManager from './RangyManager/RangyManager.vue'
import AnnotationTypeSelector from './AnnotationTypeSelector/AnnotationTypeSelector.vue'
import AnnotationPanel from './AnnotationPanel/AnnotationPanel.vue'

let AnnotationManager = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      selection: null,
      pinSelection: null,
    }
  },
  components: {
    'rangy': RangyManager,
    'annotation-type-selector': AnnotationTypeSelector,
    'annotation-panel': AnnotationPanel
  },
  computed: {
    rangyConfig: function () {
      let output = {}
      if (typeof(this.status) === 'object'
              && typeof(this.status.readingConfig) === 'object') {
        output.articleSelector = this.status.readingConfig.articleSelector
        output.sectionSelector = this.status.readingConfig.sectionSelector
        output.annotationTypeModules = this.status.readingConfig.annotationTypeModules
      }
      return output
    }
  },
  /*
  watch: {
  },
  mounted() {
  },
  */
  methods: {
    onselect: function (selection) {
      if (this.pinSelection !== null) {
        return false
      }
      //console.log(selection)
      this.selection = selection
    },
    onselectcollapsed: function () {
      //console.log('collapsed')
      this.selection = null
    },
    pin: function (type) {
      this.selection = null
      this.pinSelection = this.$refs.RangyManager.pinSelection()
      //this.$refs.AnnotationPanel.show()
      //console.log(type)
    },
    unpin: function () {
      this.$refs.RangyManager.unpinSelection()
      this.selection = null
      this.pinSelection = null
    }
  } // methods
}

export default AnnotationManager