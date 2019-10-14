import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/clients' },
  { path: '/clients/:page?', component: () => import(/* webpackChunkName: "admin-components/clients" */ './components/Clients/Clients.vue') },
  { path: '/materials/:page?', component: () => import(/* webpackChunkName: "admin-components/materials" */ './components/Materials/Materials.vue') },
]

export default new VueRouter({
  routes: routes
})