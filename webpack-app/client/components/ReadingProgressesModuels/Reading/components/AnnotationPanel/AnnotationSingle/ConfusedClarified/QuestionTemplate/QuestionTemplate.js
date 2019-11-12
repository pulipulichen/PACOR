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
      let question = this.questions[this.selectIndex]
      this.$emit('selectQuestion', question)
    },
    getDefaultQuestion () {
      return 'AAA'
    }
  } // methods
}

export default QuestionTemplate