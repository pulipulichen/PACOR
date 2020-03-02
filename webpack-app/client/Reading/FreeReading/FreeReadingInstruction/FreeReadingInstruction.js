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
    },
    title () {
      return document.title
    }
  },
//  watch: {
//  },
  mounted() {
    this.loadResults()
  },
  methods: {
    loadResults: async function () {
      let steps = this.status.readingConfig.readingProgresses
      //console.log(steps)
      let results
      if (steps.indexOf('PreImaginary') > -1 
              && steps.indexOf('PostRecall') > -1) {
        results = await this.lib.AxiosHelper.get('/client/Questionnaire/getQuestionnaireAnswers')
      }
      else if (steps.indexOf('PreImaginaryKeyword') > -1 
              && steps.indexOf('PostRecallKeyword') > -1) {
        results = await this.lib.AxiosHelper.get('/client/Questionnaire/getQuestionnaireKeywords')
      }
      //console.log(results)
      
//      for (let i = 0; i < 10; i++) {
//        results.PreImaginary = results.PreImaginary + results.PreImaginary
//      }
      
      this.PreImaginaryResult = results.PreImaginary
      //this.PreImaginaryResult.push('AAAAAAAA') // for test
      
      this.PostRecallResult = results.PostRecall
    },
    isRemovedKeyword (keyword) {
      return (Array.isArray(this.PostRecallResult) 
        && this.PostRecallResult.indexOf(keyword) === -1)
    },
    isAddedKeyword (keyword) {
      return (Array.isArray(this.PreImaginaryResult) 
        && this.PreImaginaryResult.indexOf(keyword) === -1)
    },
  } // methods
}

export default QuestionnaireResults