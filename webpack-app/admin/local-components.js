import ErrorHandler from './../components/ErrorHandler/ErrorHandler.vue'
import Auth from './components/Auth/Auth.vue'
import Login from './components/Login/Login.vue'
import Navigation from './components/Navigation/Navigation.vue'
import Loading from './../components/Loading/Loading.vue'

let components = {
  Loading: Loading,
  'error-handler': ErrorHandler,
  Auth: Auth,
  Login: Login,
  Navigation: Navigation,
}

export default components