/* global __webpack_public_path__ */
import Vue from 'vue'

// ----------------------------------
// plugins

import './plugins/plugins'
import './styles/semantic-ui'
import i18n from './plugins/i18n'

// ----------------------------------
// Helpers
import AxiosHelper from './helpers/AxiosHelper'
import DayJSHelper from './helpers/DayJSHelper'
import StringHelper from './helpers/StringHelper'
import ValidateHelper from './helpers/ValidateHelper'

// ----------------------

import $ from 'jquery'
import template from './client/client.tpl'
import config from './config.js'

// --------------------
// Components or routes

import './client/global-components'
import components from './client/local-components'

// -----------------------
// 確認 baseURL

let baseURL = __webpack_public_path__
baseURL = baseURL.split('/').slice(0, 3).join('/')
config.baseURL = baseURL

let baseScript = $(document.currentScript)
if (baseScript.length === 1) {
  baseScript.before(`<div id="app"></div>`)
}

// ---------------
// 錯誤訊息的設置

window.onerror = function(message, source, lineno, colno, error) {
  //console.log(message, source, lineno, colno, error)
  VueController.data.error = error
}

Vue.config.errorHandler  = function(err, vm, info) {
  //console.log(`Error: ${err.stack}\nInfo: ${info}`);
  VueController.data.error = err
  console.error(err)
}

// -----------------------

let VueController = {
  data: {
    config: config,
    status: {
      needLogin: true,
      username: '',
      displayName: '',
      avatar: '',
      role: 'reader',
      readingProgresses: [],
      title: ''
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
      ValidateHelper: ValidateHelper
    },
    view: 'Loading',
    error: '',
    persistAttrs: [
    ]
  },
  computed: {
    'status.currentStep': function () {
      let step = 'not-yet-started'
      if (Array.isArray(this.status.readingProgresses)
              && this.status.readingProgresses.length > 0) {
        for (let i = 0; i < this.status.readingProgresses.length; i++) {
          let s = this.status.readingProgresses[i]
          if (s.isCompleted === true) {
            continue
          }
          else if (typeof(s.start_timestamp) === 'number') {
            return s.step_name
          }
        }
      }
      return step
    }
  },
  watch: {
    'status.username': function () {
      /*
      let path = '/login'
      if (typeof(this.status.username) === 'string') {
        path = '/chat'
      }
      
      if (this.$router.currentRoute.fullPath !== path) {
        this.$router.replace(path)
      }
      */
      let view = 'Login'
      if (typeof(this.status.username) === 'string') {
        view = 'Chat'
      }
      //console.log(view)
      this.view = view
    },
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    }
  },
  created: function () {
    /*
    if (this.$router.currentRoute.fullPath !== '/') {
      this.$router.replace('/')
    }
     */
    this.loadClientConfig()
  },
  mounted: function () {
    this.lib.AxiosHelper.setErrorHandler((error) => {
      this.error = error
    })
  },
  
  methods: {
    loadClientConfig: function () {
      let config = window[this.config.clientConfigName]
      
      if (typeof(config) === 'object') {
        for (let key in config) {
          this.config[key] = config[key]
        }
      }
      
      //console.log(this.config)
    },
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
