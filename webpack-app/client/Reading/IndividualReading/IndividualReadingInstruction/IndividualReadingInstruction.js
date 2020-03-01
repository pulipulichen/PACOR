let Instruction = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    computedCoverImage () {
      return this.config.baseURL + '/instruction/reading/IndividualReading/cat-1460882_1280.png'
    },
    stepConfig () {
      return this.lib.auth.currentStepConfig
    },
    computedAnnotationType () {
      let types = this.stepConfig.highlightAnnotation.types
      
      let useTypes = []
      if (types.indexOf('MainIdea') > -1) {
        useTypes.push(this.$t(`"{0}"`, [this.$t('ANNOTATION_TYPE.' + 'MainIdea')]))
      }
      if (types.indexOf('Confused') > -1
              && types.indexOf('Clarified') > -1) {
        useTypes.push(this.$t(`"{0}"`, [this.$t('ANNOTATION_TYPE.' + 'Confused') + ' / ' + this.$t('ANNOTATION_TYPE.' + 'Clarified')]))
      }
      
      if (useTypes.length > 2) {
        useTypes[(useTypes.length - 1)] = this.$t(`and {0}`, [useTypes[(useTypes.length - 1)]])
      }
      
      let useTypesTrans = ''
      for (let i = 0; i < useTypes.length; i++) {
        if (i > 0 && i < useTypes.length - 1) {
          useTypesTrans = useTypesTrans + this.$t(', ')
        }
        useTypesTrans = useTypesTrans + useTypes[i]
      }
      
      return this.$t('Please use {0} reading strategies to read this article.', [useTypesTrans])
    },
    computedChecklist () {
      
    },
    limitMinutes () {
      return this.lib.auth.currentStepConfig.limitMinutes
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default Instruction