let PACORTestManager = {
  props: ['lib', 'status', 'config'],
  data() {    
//    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isTesting () {
      return (typeof(window.PACORTestManagerInteractions) === 'function')
    }
  },
//  watch: {
//  },
  mounted() {
    window.PACORTestManager = this
  },
  methods: {
  } // methods
}

import methodsPACORTestManager from './methodsPACORTestManager'
methodsPACORTestManager(PACORTestManager)

import methodsFactoryPACORTestManager from './methodsFactoryPACORTestManager'
methodsFactoryPACORTestManager(PACORTestManager)

import methodsWaitPACORTestManager from './methodsWaitPACORTestManager'
methodsWaitPACORTestManager(PACORTestManager)

import methodsRandomPACORTestManager from './methodsRandomPACORTestManager'
methodsRandomPACORTestManager(PACORTestManager)

import methodsPuppeteerPACORTestManager from './methodsPuppeteerPACORTestManager'
methodsPuppeteerPACORTestManager(PACORTestManager)

import methodsExceptionPACORTestManager from './methodsExceptionPACORTestManager'
methodsExceptionPACORTestManager(PACORTestManager)

// ---------------

import stepQuestionnairePACORTestManager from './stepQuestionnairePACORTestManager'
stepQuestionnairePACORTestManager(PACORTestManager)

import stepWriteAnnotationPACORTestManager from './stepWriteAnnotationPACORTestManager'
stepWriteAnnotationPACORTestManager(PACORTestManager)

import stepSectionPACORTestManager from './stepSectionPACORTestManager'
stepSectionPACORTestManager(PACORTestManager)

import stepStepInstructionPACORTestManager from './stepStepInstructionPACORTestManager'
stepStepInstructionPACORTestManager(PACORTestManager)

export default PACORTestManager