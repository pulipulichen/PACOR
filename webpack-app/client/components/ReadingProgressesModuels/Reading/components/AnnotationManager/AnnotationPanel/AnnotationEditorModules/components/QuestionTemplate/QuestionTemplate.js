let QuestionTemplate = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      selectIndex: 0
    }
  },
  computed: {
    questions () {
      return this.status.readingConfig.annotationTypeModules['ConfusedClarified'].questionTemplates
    }
  },
  watch: {
    selectIndex () {
      this.onSelect()
    }
  },
  mounted() {
    this.onSelect()
  },
  methods: {
    onSelect () {
      let template = this.questions[this.selectIndex].template
      this.$emit('selectQuestion', template)
    }
  } // methods
}

export default QuestionTemplate