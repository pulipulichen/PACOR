import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/domains' },
  { path: '/domains/:page?', component: () => import(/* webpackChunkName: "admin-components/domains" */ './components/Domains/Domains.vue') },
  { path: '/materials/:page?', component: () => import(/* webpackChunkName: "admin-components/materials" */ './components/Materials/Materials.vue') },
]

export default new VueRouter({
  routes: routes
})