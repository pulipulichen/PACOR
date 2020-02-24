import Questionnaire from './../components/QuestionnairePageKeyword/QuestionnairePageKeyword.vue'
import Instruction from './PreImaginaryKeywordInstruction/PreImaginaryKeywordInstruction.vue'

let PreImaginary = {
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
}

export default PreImaginary