/* global __webpack_public_path__ */
import Vue from 'vue'


// ----------------------------------
// plugins

import i18n from './plugins/i18n'

// ----------------------


import template from './client/client.tpl'
import config from './config.js'

// --------------------
// Components or routes

//import './client/global-components'
//import './client/local-global-dynamic-components'
//import './client/local-global-static-components'
import components from './client/local-components'

// -----------------------
// 確認 baseURL

let baseURL = __webpack_public_path__
baseURL = baseURL.split('/').slice(0, 3).join('/')

let baseScript = document.currentScript
if (baseScript) {
  
  //console.log(baseScript[0].src)
  let testBaseURL = 'http://pc.pulipuli.info:443'
  let enableBrowserTest = (location.href.endsWith('&t=pacorTest'))
  if (enableBrowserTest === true) {
    console.log('@TEST enableBrowserTest', enableBrowserTest)
    baseURL = testBaseURL
  }
  else {
    let src = baseScript.src
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
  
  
  var appNode = document.createElement("div");
  appNode.id = 'app'
  baseScript.parentNode.insertBefore(appNode, baseScript);
  //baseScript.before(`<div id="app"></div>`)
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
        initComponents: false,
        highlights: false,
        countdownPause: false
      },
      sessionToken: null
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {
      AxiosHelper: null,
      DayJSHelper: null,
      StringHelper: null,
      ValidateHelper: null,
      //style: StyleHelper.setConfig(config),
      AnnotationHelper: null,
      VueHelper: null,
      NumberHelper: null,
      
      auth: null,
      RangyManager: null,
      AnnotationManager: null,
      AnnotationPanel: null,
      UserFilter: null,
      AnnotationTypeFilter: null,
      SectionManager: null,
      ConfirmModal: null,
      NotificationManager: null,
      TestManager: null,
      TutorialManager: null,
      style: null,
      tippy: null,
      //tippyUtils: null,
      
      Main: null,
    },
    errors: [],
    persistAttrs: [
    ]
  },
//  computed: { },
//  watch: {},
  //created: function () {
  //},
  mounted: function () {
//    
//    //console.log(this.lib.auth.nextStep)
    this.lib.Main = this.$refs.Main
  },
  
  //methods: { }, // methods: {
  
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: i18n,
  
  template: template,
  components: components
}

if (typeof(baseURL) === 'string') {
  setTimeout(() => {
    new Vue(VueController)
    //$('body > #TestMessage').remove()
  }, 0)
}

// @Test
//window.VueController = VueController
