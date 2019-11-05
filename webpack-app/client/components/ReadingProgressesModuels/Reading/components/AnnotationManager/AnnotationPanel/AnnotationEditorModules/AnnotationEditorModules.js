import AnnotationDiscussion from './AnnotationDiscussion/AnnotationDiscussion.vue'

import AnnotationModuleMainIdea from './MainIdea/MainIdea.vue'
import AnnotationModuleConfusedClarified from './ConfusedClarified/ConfusedClarified.vue'

let AnnotationEditorModules = {
  props: ['lib', 'status', 'config'
    , 'annotationModule', 'pinSelection', 'annotationInstance'
    , 'rangy', 'heightPX'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'annotation-discussion': AnnotationDiscussion,
    
    'MainIdea': AnnotationModuleMainIdea,
    'ConfusedClarified': AnnotationModuleConfusedClarified
  },
  computed: {
    computedGridClass () {
      let classList = []
      if (this.annotationConfig.enableCollaboration === true) {
        classList.push('two')
      }
      else {
        classList.push('one')
      }
      
      return classList.join(' ') + ' column grid'
    },
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default AnnotationEditorModules