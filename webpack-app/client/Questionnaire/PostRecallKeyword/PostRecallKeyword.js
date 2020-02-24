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
    //console.log(this.lib.auth.currentStepConfig.preloadPreImaginaryAnswer)
    //console.log(this.$refs.Questionnaire.answer)
    if (this.lib.auth.currentStepConfig.preloadPreImaginaryAnswer === true
            && this.$refs.Questionnaire.answer === '') {
      let answer = await this.lib.AxiosHelper.get('/client/Questionnaire/getPreImaginaryKeywords')
      //console.log(answer)
      this.$refs.Questionnaire.answer = answer
    }
  }
}

export default PostRecall