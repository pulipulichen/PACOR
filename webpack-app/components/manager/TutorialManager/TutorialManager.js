//import IntroJs from './introjs/intro.js'
//import anno from './anno/anno.js'

import $ from 'jquery'

let TutorialManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      actionLists: {},
      guide: null,
      isPlaying: false,
      finishModal: null
    }
  },
  created: async function () {
    // import './jquery-guide/jquery-guide.webpack.js'
    await import (/* webpackChunkName: "client-components/ReadingComponents" */ './jquery-guide/jquery-guide.webpack.js')
  },
//  components: {
//  },
  computed: {
    defaultType () {
      return this.lib.auth.currentStep
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