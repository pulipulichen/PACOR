import Loading from './../components/Loading/Loading.vue'
import ErrorHandler from './../components/ErrorHandler/ErrorHandler.vue'
import Auth from './components/Auth/Auth.vue'
import RangyManager from './components/RangyManager/RangyManager.vue'
import NoteEditorManager from './components/NoteEditorManager/NoteEditorManager.vue'

let components = {
  Loading: Loading,
  'error-handler': ErrorHandler,
  Auth: Auth,
  'rangy-manager': RangyManager,
  'note-editor-manager': NoteEditorManager,
  Login: () => import(/* webpackChunkName: "client-components/Login" */ './components/Login/Login.vue'),
  Chat: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue'),
}
export default components