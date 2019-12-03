let PACORTestManager = {
  props: ['lib', 'status', 'config'],
  data() {    
//    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
//  computed: {
//  },
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

import methodsQuestionnairePACORTestManager from './methodsQuestionnairePACORTestManager'
methodsQuestionnairePACORTestManager(PACORTestManager)

import methodsAnnotationPACORTestManager from './methodsAnnotationPACORTestManager'
methodsAnnotationPACORTestManager(PACORTestManager)

import methodsSectionPACORTestManager from './methodsSectionPACORTestManager'
methodsSectionPACORTestManager(PACORTestManager)

export default PACORTestManager