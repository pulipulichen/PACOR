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
}

export default PostRecall