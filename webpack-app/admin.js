import Vue from 'vue'

// ----------------------------------
// plugins

import './plugins/plugins'
import './plugins/semantic-ui'
import i18n from './plugins/i18n'

// --------------------
// Components or routes

import routes from './admin/routes'
import components from './admin/components'

// ----------------------------------
// Helpers
import AxiosHelper from './helpers/AxiosHelper'
import DayJSHelper from './helpers/DayJSHelper'
import StringHelper from './helpers/StringHelper'

// --------------------
// Components

import Auth from './admin/components/Auth/Auth.vue'

// ----------------------

import $ from 'jquery'
import template from './admin/admin.tpl'
import config from './config.js'

// -----------------------
// 確認 baseURL

let baseURL = '/'
let baseScript = $(document.currentScript)
config.baseURL = baseURL
baseScript.before(`<div id="app"></div>`)

// -----------------------

let VueController = {
  data: {
    message: 'Hello, world.', // for test
    users: [],
    config: config,
    status: {
      username: '',
      displayName: '',
      avatat: '',
      needLogin: true,
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
      StringHelper: StringHelper
    },
    //view: 'Loading',
    view: null,
    error: '',
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
      console.log(this.$route.query.origin)
      if (typeof(this.$route.query.origin) === 'string' 
              && this.$route.query.origin !== '') {
        this.loadUsers(this.$route.query.origin)
      }
    }
  },
  created: function () {
    
  },
  mounted: function () {
    if (typeof(this.$route.query.origin) === 'string' 
            && this.$route.query.origin !== '') {
      this.loadUsers(this.$route.query.origin)
    }
    
    this.lib.AxiosHelper.setErrorHandler((error) => {
      this.error = error
    })
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
  errorCaptured(err, vm, info) {
    // https://medium.com/js-dojo/error-exception-handling-in-vue-js-application-6c26eeb6b3e4
    this.error = err.stack
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.
    // TODO: Perform any custom logic or log to server
    // return false to stop the propagation of errors further to parent or global error handler
  },
}

if (typeof(baseURL) === 'string') {
  $(() => {
    new Vue(VueController)
  })
}

window.VueController = VueController
