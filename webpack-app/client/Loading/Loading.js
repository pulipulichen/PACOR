import HiddenLoading from './../../components/ui-modal/HiddenLoading/HiddenLoading.vue'
import ErrorHandler from './../../components/manager/ErrorHandler/ErrorHandler.vue'

import Auth from './../Auth/Auth.vue'
import Login from './../Login/Login.vue'
import StyleManager from './../../components/manager/StyleManager/StyleManager.vue'
import PACORTestManager from './../../components/manager/PACORTestManager/PACORTestManager.vue'
//import RangyManager from './components/RangyManager/RangyManager.vue'
//import NoteEditorManager from './components/NoteEditorManager/NoteEditorManager.vue'

import TutorialManager from './../../components/manager/TutorialManager/TutorialManager.vue'

let Loading = {
  props: ['lib', 'status', 'config', 'progress', 'errors'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
    HiddenLoading: HiddenLoading,
    'error-handler': ErrorHandler,
    Auth: Auth,
    //'rangy-manager': RangyManager,
    //'note-editor-manager': NoteEditorManager,
    Login: Login,
    StyleManager,
    PACORTestManager,
    'tutorial-manager': TutorialManager,
    
    //Chat: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue'),
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
    
  },
  mounted() {
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
    this.lib.TutorialManager = this.$refs.TutorialManager
  },
//  methods: {} // methods
}

export default Loading