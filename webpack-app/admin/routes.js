import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/domain/list' },
  //{ path: '/domain/list/:page?', component: () => import(/* webpackChunkName: "admin-components/domain" */ './components/DomainList/DomainList.vue') },
  //{ path: '/domain/add', component: () => import(/* webpackChunkName: "admin-components/domain" */ './components/DomainAdd/DomainAdd.vue') },
  { path: '/domain/:action/:page?', component: () => import(/* webpackChunkName: "admin-components/domain" */ './components/Domain/Domain.vue') },
  { path: '/webpage/:domainID?/:action?/:page?', component: () => import(/* webpackChunkName: "admin-components/webpage" */ './components/Webpage/Webpage.vue') },
  { path: '/webpage-dashboard/:webpageID/:action?/:page?', component: () => import(/* webpackChunkName: "admin-components/webpage-dashboard" */ './components/WebpageDashboard/WebpageDashboard.vue') },
  { path: '/material/:page?', component: () => import(/* webpackChunkName: "admin-components/material" */ './components/Material/Material.vue') },
]

export default new VueRouter({
  routes: routes
})
