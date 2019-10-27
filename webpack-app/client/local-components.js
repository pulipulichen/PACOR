import Loading from './../components/Loading/Loading.vue'
import ErrorHandler from './../components/ErrorHandler/ErrorHandler.vue'
import Auth from './components/Auth/Auth.vue'
import Login from './components/Login/Login.vue'
//import RangyManager from './components/RangyManager/RangyManager.vue'
//import NoteEditorManager from './components/NoteEditorManager/NoteEditorManager.vue'

let components = {
  Loading: Loading,
  'error-handler': ErrorHandler,
  Auth: Auth,
  //'rangy-manager': RangyManager,
  //'note-editor-manager': NoteEditorManager,
  Login: Login,
  //Chat: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue'),
  'CollaborativeReading': () => import(/* webpackChunkName: "client-components/Reading" */ './components/ReadingProgressesModuels/Reading/CollaborativeReading/CollaborativeReading.vue'),
  'IndividualReading': () => import(/* webpackChunkName: "client-components/Reading" */ './components/ReadingProgressesModuels/Reading/IndividualReading/IndividualReading.vue'),
  'PostRecall': () => import(/* webpackChunkName: "client-components/Questionnaire" */ './components/ReadingProgressesModuels/Questionnaire/PostRecall/PostRecall.vue'),
  'PreImaginary': () => import(/* webpackChunkName: "client-components/Questionnaire" */ './components/ReadingProgressesModuels/Questionnaire/PreImaginary/PreImaginary.vue'),
  'Exit': () => import(/* webpackChunkName: "client-components/Exit" */ './components/ReadingProgressesModuels/Exit/Exit.vue'),
  'FreeReading': () => import(/* webpackChunkName: "client-components/Reading" */ './components/ReadingProgressesModuels/Reading/FreeReading/FreeReading.vue'),
}
export default components