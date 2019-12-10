import ErrorHandler from './../components/ErrorHandler/ErrorHandler.vue'
import Auth from './Auth/Auth.vue'
import Login from './Login/Login.vue'
import NavigationItems from './NavigationItems/NavigationItems.vue'
import Loading from './../components/Loading/Loading.vue'
import StyleManager from './../components/StyleManager/StyleManager.vue'

let components = {
  Loading: Loading,
  'error-handler': ErrorHandler,
  Auth: Auth,
  Login: Login,
  NavigationItems: NavigationItems,
  StyleManager,
}

export default components