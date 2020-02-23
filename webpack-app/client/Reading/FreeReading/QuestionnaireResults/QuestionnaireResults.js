let QuestionnaireResults = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      PreImaginaryResult: null,
      PostRecallResult: null
    }
  },
//  components: {
//  },
  computed: {
    username () {
      return this.lib.auth.username
    }
  },
//  watch: {
//  },
  mounted() {
    this.loadResults()
  },
  methods: {
    loadResults: async function () {
      let results = await this.lib.AxiosHelper.get('/client/Questionnaire/getQuestionnaireAnswers')
//      for (let i = 0; i < 10; i++) {
//        results.PreImaginary = results.PreImaginary + results.PreImaginary
//      }
      
      this.PreImaginaryResult = results.PreImaginary
      
      
      
      this.PostRecallResult = results.PostRecall
    }
  } // methods
}

export default QuestionnaireResults