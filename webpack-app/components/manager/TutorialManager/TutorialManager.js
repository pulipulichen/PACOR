//import IntroJs from './introjs/intro.js'
//import anno from './anno/anno.js'

import $ from 'jquery'
import './jquery-guide/jquery-guide.webpack.js'

let TutorialManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      actionLists: {},
      guide: null,
      isPlaying: false,
      finishModal: null,
      clickFixed: false
    }
  },
  //created: async function () {
    // import './jquery-guide/jquery-guide.webpack.js'
    //await import (/* webpackChunkName: "client-components/ReadingComponents" */ './jquery-guide/jquery-guide.webpack.js')
  //},
//  components: {
//  },
  computed: {
    defaultType () {
      return this.lib.auth.currentStep
    },
    enableTimeout () {
      let enable = true
      if (this.status.readingConfig.debug.tutorialEnableTimeout === false) {
        enable = false
        console.log('@DEBUG tutorialEnableTimeout = false')
      }
      return enable
    }
  },
  watch: {
    'status.needLogin' () {
      this.stop()
    }
  },
  mounted: async function () {
    //this._test()
  },
  destroyed () {
    this.stop()
  },
  methods: {} // methodsTutorialManager.js
}

import methodsTutorialManager from './methodsTutorialManager.js'
methodsTutorialManager(TutorialManager)

import methodsMouseTutorialManager from './methodsMouseTutorialManager.js'
methodsMouseTutorialManager(TutorialManager)

import methodsTestTutorialManager from './methodsTestTutorialManager.js'
methodsTestTutorialManager(TutorialManager)

export default TutorialManager