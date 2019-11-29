import Loading from './../components/Loading/Loading.vue'
import ErrorHandler from './../components/ErrorHandler/ErrorHandler.vue'

import Auth from './Auth/Auth.vue'
import Login from './Login/Login.vue'
import StyleManager from './StyleManager/StyleManager.vue'
//import RangyManager from './components/RangyManager/RangyManager.vue'
//import NoteEditorManager from './components/NoteEditorManager/NoteEditorManager.vue'

let components = {
  Loading: Loading,
  'error-handler': ErrorHandler,
  Auth: Auth,
  //'rangy-manager': RangyManager,
  //'note-editor-manager': NoteEditorManager,
  Login: Login,
  StyleManager,
  //Chat: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue'),
  'CollaborativeReading': () => import(/* webpackChunkName: "client-components/CollaborativeReading" */ './ReadingProgressesModuels/Reading/CollaborativeReading/CollaborativeReading.vue'),
  'IndividualReading': () => import(/* webpackChunkName: "client-components/IndividualReading" */ './ReadingProgressesModuels/Reading/IndividualReading/IndividualReading.vue'),
  'PostRecall': () => import(/* webpackChunkName: "client-components/Questionnaire" */ './ReadingProgressesModuels/Questionnaire/PostRecall/PostRecall.vue'),
  'PreImaginary': () => import(/* webpackChunkName: "client-components/Questionnaire" */ './ReadingProgressesModuels/Questionnaire/PreImaginary/PreImaginary.vue'),
  'Exit': () => import(/* webpackChunkName: "client-components/Exit" */ './ReadingProgressesModuels/Exit/Exit.vue'),
  'FreeReading': () => import(/* webpackChunkName: "client-components/FreeReading" */ './ReadingProgressesModuels/Reading/FreeReading/FreeReading.vue'),
}
export default components