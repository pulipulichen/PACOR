/* global __webpack_public_path__ */
import Vue from 'vue'


// ----------------------------------
// plugins

import './plugins/plugins'
import './styles/styles'
import i18n from './plugins/i18n'

// ----------------------------------
// Helpers
import AxiosHelper from './helpers/AxiosHelper'
import DayJSHelper from './helpers/DayJSHelper'
import StringHelper from './helpers/StringHelper'
import ValidateHelper from './helpers/ValidateHelper'
//import StyleHelper from './helpers/StyleHelper'
import AnnotationHelper from './helpers/AnnotationHelper'
import VueHelper from './helpers/VueHelper'
import NumberHelper from './helpers/NumberHelper'

// ----------------------

import $ from 'jquery'
import template from './client/client.tpl'
import config from './config.js'

// --------------------
// Components or routes

import './client/global-components'
import './client/local-global-dynamic-components'
import './client/local-global-static-components'
import components from './client/local-components'

// -----------------------
// 確認 baseURL

let baseURL = __webpack_public_path__
baseURL = baseURL.split('/').slice(0, 3).join('/')

let baseScript = $(document.currentScript)
if (baseScript.length === 1) {
  
  //console.log(baseScript[0].src)
  let testBaseURL = 'http://pc.pulipuli.info:3333'
  let enableBrowserTest = true
  if (enableBrowserTest === true) {
    console.log('@TEST enableBrowserTest', enableBrowserTest)
    baseURL = testBaseURL
  }
  else {
    let src = baseScript[0].src
    //console.log(src)
    if (src.startsWith('/')) {
      src = window.location.href
      console.log(src)
    }

    baseURL = src.split('/').slice(0, 3).join('/')
  }
  //console.log(baseURL)
  //if (enableBrowserTest && baseScript[0].src.startsWith(testBaseURL)) {
  //if (enableBrowserTest) {
  //}
  
  
    
  baseScript.before(`<div id="app"></div>`)
}
config.baseURL = baseURL

// ---------------
// 錯誤訊息的設置

window.onerror = function(message, source, lineno, colno, error) {
  if (error === null) {
    error = message
  }
  //console.error(error)
  VueController.data.errors.push(error)
}

Vue.config.errorHandler  = function(err, vm, info) {
  //console.log(`errorHandler Error: ${err.stack}\nInfo: ${info}`);
  //console.error(err)
  VueController.data.errors.push(err)
}

// -----------------------

let VueController = {
  data: {
    config: config,
    status: {
      needLogin: true,
      userID: -1,
      username: '',
      displayName: '',
      avatar: '',
      role: 'reader',
      readingProgresses: [],
      title: '',
      view: 'Loading',
      preference: {},
      //notificationUnreadCount: 0,
      search: {
        keyword: '',
        showAnnotationList: false,
        peerID: null,
        count: 0,
      },
      readingConfig: {},
      filter: {
        findType: null,
        focusUser: null
      },
      notificationData: {
        unreadCount: 0,
        unreadNotifications: [],
        hasNotification: true,
      },
      progress: {
        highlights: false
      },
      sessionToken: null
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {
      AxiosHelper: AxiosHelper.setBaseURL(baseURL),
      DayJSHelper: DayJSHelper,
      StringHelper: StringHelper,
      ValidateHelper: ValidateHelper,
      //style: StyleHelper.setConfig(config),
      AnnotationHelper: AnnotationHelper,
      VueHelper: VueHelper,
      NumberHelper,
      
      auth: null,
      RangyManager: null,
      AnnotationPanel: null,
      UserFilter: null,
      AnnotationTypeFilter: null,
      SectionManager: null,
      ConfirmModal: null,
      NotificationManager: null,
      TestManager: null,
      TutorialManager: null,
      style: null,
    },
    errors: [],
    persistAttrs: [
    ]
  },
  computed: {
  },
  watch: {
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    },
  },
  //created: function () {
  //},
  mounted: function () {
    this.lib.AxiosHelper.setErrorHandler((error) => {
      if (this.$refs.ErrorHandler) {
        this.$refs.ErrorHandler.addError(error)
      }
    })
    
    this.lib.DayJSHelper.setI18N((name, data) => {
      return this.$t(name, data)
    })
    
    this.lib.auth = this.$refs.auth
    this.lib.style = this.$refs.style
    this.lib.AnnotationHelper.setStatus(this.status)
    this.lib.ConfirmModal = this.$refs.ConfirmModal
    this.lib.TestManager = this.$refs.TestManager
    //this.lib.TutorialManager = this.$refs.TutorialManager
    //console.log(this.lib.auth.nextStep)
  },
  
  methods: {
  }, // methods: {
  
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: i18n,
  
  template: template,
  components: components
}

if (typeof(baseURL) === 'string') {
  $(() => {
    new Vue(VueController)
    $('body > #TestMessage').remove()
  })
}

window.VueController = VueController
