import Vue from 'vue'

// ----------------------------------
// plugins

import './plugins/plugins'
import './styles/styles'
import i18n from './plugins/i18n'

// --------------------
// Components or routes

import './admin/global-components'

import components from './admin/local-components'
import routes from './admin/routes'

// ----------------------------------
// Helpers
import AxiosHelper from './helpers/AxiosHelper'
//import DayJSHelper from './helpers/DayJSHelper'
import StringHelper from './helpers/StringHelper'
import ValidateHelper from './helpers/ValidateHelper'
import VueHelper from './helpers/VueHelper'
import URLHelper from './helpers/URLHelper'
import ClipboardHelper from './helpers/ClipboardHelper'

// --------------------
// Components

import Auth from './admin/Auth/Auth.vue'

// ----------------------

import $ from 'jquery'
import template from './admin/admin.tpl'
import config from './config.js'

// -----------------------
// 確認 baseURL

let baseURL = ''
let baseScript = $(document.currentScript)
config.baseURL = baseURL
baseScript.before(`<div id="app"></div>`)

// ---------------
// 錯誤訊息的設置

window.onerror = function(message, source, lineno, colno, error) {
  //console.log(message, source, lineno, colno, error)
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
//    message: 'Hello, world.', // for test
    users: [],
    config: config,
    status: {
      role: '',
      username: '',
      displayName: '',
      avatat: '',
      domainID: null,
      needLogin: true,
      title: '',
      webpageURL: '',
      preference: null
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {
      AxiosHelper: AxiosHelper.setBaseURL(baseURL),
      DayJSHelper: null,
      StringHelper: StringHelper,
      ValidateHelper: ValidateHelper,
      VueHelper: VueHelper,
      URLHelper: URLHelper,
      ClipboardHelper: ClipboardHelper,
      //toc: TOCHelper,
    },
    //view: 'Loading',
    view: null,
    errors: [],
    persistAttrs: [
    ]
  },
  
  watch: {
    'status.title': function () {
      document.title = this.status.title
    },
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
    },
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    },
    '$route.query.origin': function () {
      //console.log(this.$route.query.origin)
      if (typeof(this.$route.query.origin) === 'string' 
              && this.$route.query.origin !== '') {
        this.loadUsers(this.$route.query.origin)
      }
    }
  },
//  created: function () {
//  },
  mounted: async function () {
    let DayJSHelper = await (() =>import(/* webpackChunkName: "admin-components/Loading" */ './helpers/DayJSHelper.js'))()
    this.lib.DayJSHelper = await DayJSHelper.default()
    
    //console.log(this.config)
    
    if (typeof(this.$route.query.origin) === 'string' 
            && this.$route.query.origin !== '') {
      this.loadUsers(this.$route.query.origin)
    }
    
    this.lib.DayJSHelper.setI18N((name, data) => {
      return this.$t(name, data)
    })
    
    this.lib.AxiosHelper.setErrorHandler((error) => {
      if (this.$refs.ErrorHandler) {
        this.$refs.ErrorHandler.addError(error)
      }
    })
    
    this.lib.style = this.$refs.style
    
  },
  methods: {
    loadUsers: async function (origin) {
      let users = await this.lib.AxiosHelper.get('/admin/user/list', {
        origin: origin
      })
      
      if (Array.isArray(users)) {
        this.users = users
      }
    }
  }, // methods: {
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: i18n,
  
  template: template,
  router: routes,
  components: components,
}

if (typeof(baseURL) === 'string') {
  $(() => {
    new Vue(VueController)
  })
}

window.VueController = VueController
