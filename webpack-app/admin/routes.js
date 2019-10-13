import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/clients' },
  { path: '/clients', component: () => import(/* webpackChunkName: "admin-components/clients" */ './components/Clients/Clients.vue') },
]

export default new VueRouter({
  routes: routes
})