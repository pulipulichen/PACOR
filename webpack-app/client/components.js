import Loading from './../components/Loading/Loading.vue'
import ErrorHandler from './../components/ErrorHandler/ErrorHandler.vue'
import Auth from './components/Auth/Auth.vue'
import RangyManager from './components/RangyManager/RangyManager.vue'

let components = {
  Loading: Loading,
  'error-handler': ErrorHandler,
  Auth: Auth,
  'rangy-manager': RangyManager,
  Login: () => import(/* webpackChunkName: "client-components/Login" */ './components/Login/Login.vue'),
  Chat: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue'),
}
export default components