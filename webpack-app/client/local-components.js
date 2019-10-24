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
  'CollaborativeReading': () => import(/* webpackChunkName: "client-components/CollaborativeReading" */ './components/ReadingProgressesModuels/CollaborativeReading/CollaborativeReading.vue'),
  'IndividualReading': () => import(/* webpackChunkName: "client-components/IndividualReading" */ './components/ReadingProgressesModuels/IndividualReading/IndividualReading.vue'),
  'PostRecall': () => import(/* webpackChunkName: "client-components/PostRecall" */ './components/ReadingProgressesModuels/PostRecall/PostRecall.vue'),
  'PreImaginary': () => import(/* webpackChunkName: "client-components/PreImaginary" */ './components/ReadingProgressesModuels/PreImaginary/PreImaginary.vue'),
  'Exit': () => import(/* webpackChunkName: "client-components/Exit" */ './components/ReadingProgressesModuels/Exit/Exit.vue'),
  'FreeReading': () => import(/* webpackChunkName: "client-components/FreeReading" */ './components/ReadingProgressesModuels/FreeReading/FreeReading.vue'),
}
export default components