import $ from 'jquery'

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
    jQuery () {
      return $
    },
    isTesting () {
      return (typeof(window.PACORTestManagerInteractions) === 'function')
    },
    forceMaxTimeoutMinutes () {
      if (!this.status.readingConfig.debug) {
        return 1
      }
      
      let forceMaxTimeoutMinutes = this.status.readingConfig.debug.forceMaxTimeoutMinutes
      if (typeof(forceMaxTimeoutMinutes) === 'number') {
        console.log('@TEST forceMaxTimeoutMinutes', forceMaxTimeoutMinutes)
      }
      return forceMaxTimeoutMinutes
    },
    testConfig () {
      return this.status.readingConfig.debug.test
    }
  },
  watch: {
    'status.readingConfig' () {
      if (this.status.readingConfig
              && this.status.readingConfig.debug
              && this.status.readingConfig.debug.enable) {
        window.PACORTestManager = this
        //console.log('aaa')
        this.initDocumentTitle()
        this.checkBaseURL()
      }
    }
  },
  mounted() {
    this.initRemoteConsole()
//    //this.testSession()
  },
  methods: {
    checkBaseURL () {
      //console.log(this.config.baseURL.indexOf(':4000'))
      if (this.config.baseURL.indexOf(':4000') === -1) {
        //console.log('Current base URL is not for test: ' + this.config.baseURL)
      }
    },
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

import methodsRemoteConsoleLogPACORTestManager from './methodsRemoteConsoleLogPACORTestManager'
methodsRemoteConsoleLogPACORTestManager(PACORTestManager)

//import methodsWindowPACORTestManager from './methodsWindowPACORTestManager'
//methodsWindowPACORTestManager(PACORTestManager)

// ---------------
// readerSteps
// ---------------

import stepQuestionnairePACORTestManager from './stepsReader/stepQuestionnairePACORTestManager.js'
stepQuestionnairePACORTestManager(PACORTestManager)

import stepSectionPACORTestManager from './stepsReader/stepSectionPACORTestManager.js'
stepSectionPACORTestManager(PACORTestManager)

import stepStepInstructionPACORTestManager from './stepsReader/stepStepInstructionPACORTestManager.js'
stepStepInstructionPACORTestManager(PACORTestManager)

import stepLoginPACORTestManager from './stepsReader/stepLoginPACORTestManager.js'
stepLoginPACORTestManager(PACORTestManager)

import stepAddAnnotationPACORTestManager from './stepsReader/stepAddAnnotationPACORTestManager.js'
stepAddAnnotationPACORTestManager(PACORTestManager)

import stepInteractPACORTestManager from './stepsReader/stepInteractPACORTestManager.js'
stepInteractPACORTestManager(PACORTestManager)

// ---------------
// adminSteps
// ---------------

import stepAdminConfigPACORTestManager from './stepsAdmin/stepAdminConfigPACORTestManager.js'
stepAdminConfigPACORTestManager(PACORTestManager)

import stepAdminLoginPACORTestManager from './stepsAdmin/stepAdminLoginPACORTestManager.js'
stepAdminLoginPACORTestManager(PACORTestManager)

export default PACORTestManager