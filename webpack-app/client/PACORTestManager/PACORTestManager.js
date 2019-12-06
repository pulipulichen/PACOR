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
    
    //this.testSession()
  },
  methods: {
    /**
    * 測試用
    * @returns {token}
    */
    testSession: async function () {
      let token = await this.lib.AxiosHelper.get('/client/Highlight/testSessionToken')
      console.log(token)
      
      let time = await this.lib.AxiosHelper.get('/client/Highlight/testSession', {
        token
      })
      console.log(time.time)
      
      await this.lib.VueHelper.sleep(3000)
      let time2 = await this.lib.AxiosHelper.get('/client/Highlight/testSession', {
        token
      })
      console.log(time2.time, (time.time === time2.time))
      
      await this.lib.VueHelper.sleep(3000)
      let time3 = await this.lib.AxiosHelper.get('/client/Highlight/testSession', {
        token
      })
      console.log(time3.time, (time.time === time3.time))
      
      await this.lib.VueHelper.sleep(3000)
      let time4 = await this.lib.AxiosHelper.get('/client/Highlight/clearSession', {
        token
      })
      console.log(time4.time, (time.time === time4.time))
    }
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