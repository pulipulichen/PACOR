//import AnnotationTypeFilter from './../../components/AnnotationTypeFilter/AnnotationTypeFilter.vue'

let pauseAtStart = false
if (pauseAtStart === true) {
  console.log('@test pauseAtStart')
}

let NavigationItems = {
  props: ['lib', 'status', 'config'
    , 'progress', 'error'],
  data() {    
    this.$i18n.locale = this.config.locale
    //console.log(pauseAtStart)
    return {
      pauseAtStart
    }
  },
//  components: {
//    'annotation-type-filter': AnnotationTypeFilter,
//  },
//  
//  computed: {
//  },
  watch: {
    '$refs.AnnotationTypeFilter' (AnnotationTypeFilter) {
      if (AnnotationTypeFilter !== null) {
        this.lib.AnnotationTypeFilter = AnnotationTypeFilter
      }
    }
  },
  mounted() {
    this.initLibComponents()
  },
  methods: {
    initLibComponents () {
      if (this.$refs.UserFilter !== null) {
        this.lib.UserFilter = this.$refs.UserFilter
      }
      if (this.$refs.AnnotationTypeFilter !== null) {
        this.lib.AnnotationTypeFilter = this.$refs.AnnotationTypeFilter
      }
    },
    showInstruction () {
      this.$emit('showInstruction')
    },
    nextStep () {
      this.lib.auth.nextStep()
    }
  } // methods
}

export default NavigationItems