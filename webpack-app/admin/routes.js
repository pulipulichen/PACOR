import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/domain/list' },
  //{ path: '/domain/list/:page?', component: () => import(/* webpackChunkName: "admin-components/domain" */ './components/DomainList/DomainList.vue') },
  //{ path: '/domain/add', component: () => import(/* webpackChunkName: "admin-components/domain" */ './components/DomainAdd/DomainAdd.vue') },
  { path: '/referer/', component: () => import(/* webpackChunkName: "admin-components/referer" */ './RefererRedirect/RefererRedirect.vue') },
  { path: '/material/:page?', component: () => import(/* webpackChunkName: "admin-components/material" */ './Material/Material.vue') },
  { path: '/domain/:action/:page?', component: () => import(/* webpackChunkName: "admin-components/domain" */ './Domain/Domain.vue') },
  { path: '/webpage/:domainID?/:action?/:page?', component: () => import(/* webpackChunkName: "admin-components/webpage" */ './Webpage/Webpage.vue') },
  { path: '/webpage-dashboard/:webpageID/:action?/:page?', component: () => import(/* webpackChunkName: "admin-components/webpage-dashboard" */ './WebpageDashboard/WebpageDashboard.vue') },
  { path: '/user-dashboard/:webpageID/:userID/:action?/:page?', component: () => import(/* webpackChunkName: "admin-components/user-dashboard" */ './UserDashboard/UserDashboard.vue') },
]

export default new VueRouter({
  routes: routes
})
