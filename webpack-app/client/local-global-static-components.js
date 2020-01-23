/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */

import Vue from 'vue'

//import NotificationManager from './Reading/components/manager/NotificationManager/NotificationManager.vue'
//Vue.component('notification-manager', NotificationManager)
Vue.component('notification-manager', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './Reading/components/manager/NotificationManager/NotificationManager.vue')
})

//import NotificationIcon from './Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue'
//Vue.component('notification-icon', NotificationIcon)
Vue.component('notification-icon', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue')
})

//import UserFilter from './Reading/components/search/UserFilter/UserFilter.vue'
//Vue.component('user-filter', UserFilter)
Vue.component('user-filter', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './Reading/components/search/UserFilter/UserFilter.vue')
})

Vue.component('user-filter', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './Reading/components/search/UserFilter/UserFilter.vue')
})