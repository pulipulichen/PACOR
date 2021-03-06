import ErrorHandler from './../components/manager/ErrorHandler/ErrorHandler.vue'
import Auth from './Auth/Auth.vue'
import Login from './Login/Login.vue'
import NavigationItems from './NavigationItems/NavigationItems.vue'
import Loading from './Login/Login.vue'
import StyleManager from './../components/manager/StyleManager/StyleManager.vue'

import PACORTestManager from './../components/test/PACORTestManager/PACORTestManager.vue'

let components = {
  Loading: Loading,
  'error-handler': ErrorHandler,
  Auth: Auth,
  Login: Login,
  NavigationItems: NavigationItems,
  StyleManager,
  PACORTestManager,
}

export default components