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
import StyleHelper from './helpers/StyleHelper'

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
  //window.onerror = function(...args) {
  //console.log(error.stack)
  //console.log(message, source, lineno, colno, error)
  if (error === null) {
    error = message
  }
  VueController.data.errors.push(error)
  
}

Vue.config.errorHandler  = function(err, vm, info) {
  //console.log(`Error: ${err.stack}\nInfo: ${info}`);
  VueController.data.errors.push(err)
  console.error(err)
}

// -----------------------

let VueController = {
  data: {
    config: config,
    status: {
      needLogin: true,
      userID: 0,
      username: '',
      displayName: '',
      avatar: '',
      role: 'reader',
      readingProgresses: [],
      title: '',
      view: 'Loading',
      preference: {},
      notifications: []
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
      style: StyleHelper.setConfig(config),
      auth: null
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
  created: function () {
  },
  mounted: function () {
    this.lib.AxiosHelper.setErrorHandler((error) => {
      this.errors.push(error)
    })
    
    this.lib.DayJSHelper.setI18N((name, data) => {
      return this.$t(name, data)
    })
    
    this.lib.auth = this.$refs.auth
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
