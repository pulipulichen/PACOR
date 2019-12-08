import ErrorHandler from './../components/ErrorHandler/ErrorHandler.vue'
import Auth from './components/Auth/Auth.vue'
import Login from './components/Login/Login.vue'
import NavigationItems from './components/NavigationItems/NavigationItems.vue'
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