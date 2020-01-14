// --------------------
// Components or routes

import './../global-components'
import './../local-global-dynamic-components'
import './../local-global-static-components'

// -----------------------------
// Plugin and styles

import './../../plugins/plugins'
import './../../styles/styles'

import $ from 'jquery'

// -------------------

let Loading = {
  props: ['lib', 'status', 'config', 'progress', 'errors'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    HiddenLoading: () => import(/* webpackChunkName: "client-components/Loading" */ './../../components/ui-modal/HiddenLoading/HiddenLoading.vue'),
    'error-handler': () => import(/* webpackChunkName: "client-components/Loading" */ './../../components/manager/ErrorHandler/ErrorHandler.vue'),
    Auth: () => import(/* webpackChunkName: "client-components/Loading" */ './../Auth/Auth.vue'),
    Login: () => import(/* webpackChunkName: "client-components/Loading" */ './../Login/Login.vue'),
    StyleManager: () => import(/* webpackChunkName: "client-components/Loading" */ './../../components/manager/StyleManager/StyleManager.vue'),
    PACORTestManager: () => import(/* webpackChunkName: "client-components/Loading" */ './../../components/manager/PACORTestManager/PACORTestManager.vue'),
    'tutorial-manager': () => import(/* webpackChunkName: "client-components/Loading" */ './../../components/manager/TutorialManager/TutorialManager.vue'),
    
    'CollaborativeReading': () => import(/* webpackChunkName: "client-components/CollaborativeReading" */ './../Reading/CollaborativeReading/CollaborativeReading.vue'),
    'IndividualReading': () => import(/* webpackChunkName: "client-components/IndividualReading" */ './../Reading/IndividualReading/IndividualReading.vue'),
    'PostRecall': () => import(/* webpackChunkName: "client-components/Questionnaire" */ './../Questionnaire/PostRecall/PostRecall.vue'),
    'PreImaginary': () => import(/* webpackChunkName: "client-components/Questionnaire" */ './../Questionnaire/PreImaginary/PreImaginary.vue'),
    'Exit': () => import(/* webpackChunkName: "client-components/Exit" */ './../Exit/Exit.vue'),
    'FreeReading': () => import(/* webpackChunkName: "client-components/FreeReading" */ './../Reading/FreeReading/FreeReading.vue'),
  },
//  computed: {
//    
//  },
  watch: {
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    },
//    "status.view" (view) {
//      console.log('改變了', view)
//    }
  },
  mounted: async function () {
    
    let AxiosHelper = await (function () {return import(/* webpackChunkName: "client-components/Loading" */ './../../helpers/AxiosHelper.js')})()
    AxiosHelper = AxiosHelper.default
    //console.log(AxiosHelper)
    this.lib.AxiosHelper = AxiosHelper.setBaseURL(this.config.baseURL)
    
    let DayJSHelper = await (() =>import(/* webpackChunkName: "client-components/Loading" */ './../../helpers/DayJSHelper.js'))()
    this.lib.DayJSHelper = await DayJSHelper.default()
    
    let StringHelper = await (() =>import(/* webpackChunkName: "client-components/Loading" */ './../../helpers/StringHelper.js'))()
    this.lib.StringHelper = StringHelper.default
    
    let ValidateHelper = await (() =>import(/* webpackChunkName: "client-components/Loading" */ './../../helpers/ValidateHelper.js'))()
    this.lib.ValidateHelper = ValidateHelper.default
    
    let AnnotationHelper = await (() =>import(/* webpackChunkName: "client-components/Loading" */ './../../helpers/AnnotationHelper.js'))()
    this.lib.AnnotationHelper = AnnotationHelper.default
    
    let VueHelper = await (() =>import(/* webpackChunkName: "client-components/Loading" */ './../../helpers/VueHelper.js'))()
    this.lib.VueHelper = VueHelper.default
    
    let NumberHelper = await (() =>import(/* webpackChunkName: "client-components/Loading" */ './../../helpers/NumberHelper.js'))()
    this.lib.NumberHelper = NumberHelper.default
    
    // ----------------------
    
    this.lib.AxiosHelper.setErrorHandler((error) => {
      if (this.$refs.ErrorHandler) {
        this.$refs.ErrorHandler.addError(error)
      }
    })
    
    this.initDayJSHelper()
    
    
    // ----------------------
    
    this.lib.auth = this.$refs.auth
    this.lib.style = this.$refs.style
    this.lib.AnnotationHelper.setStatus(this.status)
    this.lib.ConfirmModal = this.$refs.ConfirmModal
    this.lib.TestManager = this.$refs.TestManager
    this.lib.TutorialManager = this.$refs.TutorialManager
    
    this.lib.auth.init()
  },
  methods: {
    initDayJSHelper () {
      if (!this.lib.DayJSHelper) {
        setTimeout(() => {
          this.initDayJSHelper()
        }, 100)
        return false
      }
      
      //console.log(this.lib.DayJSHelper)
      this.lib.DayJSHelper.setI18N((name, data) => {
        return this.$t(name, data)
      })
    }
  }
//  methods: {} // methods
}

export default Loading