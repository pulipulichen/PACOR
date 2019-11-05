import AnnotationEditorModules from './../AnnotationEditorModules/AnnotationEditorModules.vue'

let AnnotationList = {
  props: ['lib', 'status', 'config', 'listPositions', 'findAnnotation'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      annotations: [],
      users: [],
      types: []
    }
  },
  components: {
    'annotation-editor-modules': AnnotationEditorModules,
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    onFindAnnotation (annotation) {
      this.findAnnotation = annotation
    }
  } // methods
}

export default AnnotationList