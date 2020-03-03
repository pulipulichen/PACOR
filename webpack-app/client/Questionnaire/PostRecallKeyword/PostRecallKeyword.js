import Questionnaire from './../components/QuestionnairePageKeyword/QuestionnairePageKeyword.vue'
import Instruction from './PostRecallKeywordInstruction/PostRecallKeywordInstruction.vue'

let PostRecall = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    'questionnaire': Questionnaire,
    'instruction': Instruction
  },
  mounted: async function () {
    //console.log(this.lib.auth.currentStepConfig.preloadPreImaginary)
    //console.log(this.$refs.Questionnaire.answer)
    //console.log(this.lib.auth.currentStepConfig.preloadPreImaginary)
    if (this.lib.auth.currentStepConfig.preloadPreImaginary === true
            && this.$refs.Questionnaire.answeredList.length === 0
            && this.$refs.Questionnaire.removedList.length === 0) {
      let log = await this.lib.AxiosHelper.get('/client/Questionnaire/getPreImaginaryKeywords')
      //console.log(answer)
      
      if (Array.isArray(log.answeredList)) {
        this.$refs.Questionnaire.answeredList = log.answeredList
      }
      if (Array.isArray(log.removedList)) {
        this.$refs.Questionnaire.removedList = log.removedList
      }
    }
  }
}

export default PostRecall