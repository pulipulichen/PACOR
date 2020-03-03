import Questionnaire from './../components/QuestionnairePage/QuestionnairePage.vue'
import Instruction from './PostRecallInstruction/PostRecallInstruction.vue'

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
    if (this.lib.auth.currentStepConfig.preloadPreImaginary === true
            && this.$refs.Questionnaire.answer === '') {
      let answer = await this.lib.AxiosHelper.get('/client/Questionnaire/getPreImaginaryAnswer')
      //console.log(answer)
      this.$refs.Questionnaire.answer = answer
    }
  }
}

export default PostRecall