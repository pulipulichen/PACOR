import CountdownButton from './CountdownButton/CountdownButton.vue'

let Questionnaire = {
  props: ['lib', 'status', 'config'],
  //data() {},  // 轉移到 dataQuestionnairePageKeyword.js
  components: {
    'countdown-button': CountdownButton,
    //'pre-imaginary-instruction': PreImaginaryInstruction,
    //'post-recall-instruction': PostRecallInstruction
  },
  // watch: {}, // 轉移到 watchQuestionnairePageKeyword.js
  // mounted: async function () {}, // 轉移到 mountedQuestionnairePageKeyword.js
  // methods: {} // 轉移到 methodsQuestionnairePageKeyword.js
}

import dataQuestionnairePageKeyword from "./dataQuestionnairePageKeyword.js"
dataQuestionnairePageKeyword(Questionnaire)

import computedQuestionnairePageKeyword from "./computedQuestionnairePageKeyword.js"
computedQuestionnairePageKeyword(Questionnaire)

import watchQuestionnairePageKeyword from "./watchQuestionnairePageKeyword.js"
watchQuestionnairePageKeyword(Questionnaire)

import mountedQuestionnairePageKeyword from "./mountedQuestionnairePageKeyword.js"
mountedQuestionnairePageKeyword(Questionnaire)

import methodsQuestionnairePageKeyword from "./methodsQuestionnairePageKeyword.js"
methodsQuestionnairePageKeyword(Questionnaire)

export default Questionnaire