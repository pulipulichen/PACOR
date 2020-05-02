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
      return this.config.baseURL + '/instruction/reading/CollaborativeReading/animals.png'
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
        useTypes.push(this.$t(`<span class="highlight">"{0}"</span>`, [this.$t('ANNOTATION_TYPE.' + 'Confused') + ' / ' + this.$t('ANNOTATION_TYPE.' + 'Clarified')]))
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
      if (!this.stepConfig.sectionAnnotation 
              || Array.isArray(this.stepConfig.sectionAnnotation.checklist) === false) {
        return false
      }
      let sectionTypeTrans = this.$t('ANNOTATION_TYPE.SectionMainIdea')
      if (this.lib.SectionManager) {
        sectionTypeTrans = this.lib.SectionManager.sectionTypeTrans
      }
      return this.$t('When reading an article, complete both the <span class="highlight">"Checklist"</span> and the <span class="highlight">"{0}"</span> note.', [sectionTypeTrans])
    },
    limitMinutes () {
      let m = this.lib.auth.currentStepConfig.limitMinutes
      if (typeof(m) !== 'number') {
        m = this.status.readingConfig.readingProgressModules.reading.totalLimitMinutes
      }
      return m
    },
    limitSeconds () {
      return this.limitMinutes * 60
    },
    computedLimitTime () {
      return this.$t('Limited to <span class="highlight">{0} minutes</span>, now it starts instant.', [this.limitMinutes])
    },
    computedAssistingReaderTool () {
      if (this.lib.auth.enableCollaboration === false) {
        return false
      }
      return this.$t('Please use the <span class="highlight">"Assist Reader tool"</span> to select a reader to assist.')
    },
    computedSuggestion () {
      if (this.lib.auth.enableCollaboration === false) {
        return false
      }
      return this.$t('Give him / her some <span class="highlight">suggestions</span> based on the annotations written by the reader.')
    },
    computedReadDifferently () {
      if (this.lib.auth.enableCollaboration === false) {
        return false
      }
      return this.$t('Think about <span class="highlight">why others read in different ways</span> with you, and then try to read the article from a different perspective.')
    },
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default Instruction