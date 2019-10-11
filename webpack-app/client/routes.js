import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  //{ path: '/', component: require('./components/Loading/Loading.vue') },
  //{ path: '/login', component: () => import(/* webpackChunkName: "client-components/login" */ './components/Login/Login.vue') },
  //{ path: '/chat', component: () => import(/* webpackChunkName: "client-components/chat" */ './components/Chat/Chat.vue') }
]

export default new VueRouter({
  routes: routes
})