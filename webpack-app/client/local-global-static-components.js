/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */

import Vue from 'vue'

import NotificationManager from './ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationManager.vue'
Vue.component('notification-manager', NotificationManager)

import NotificationIcon from './ReadingProgressesModuels/Reading/components/manager/NotificationManager/NotificationIcon/NotificationIcon.vue'
Vue.component('notification-icon', NotificationIcon)

import UserFilter from './ReadingProgressesModuels/Reading/components/search/UserFilter/UserFilter.vue'
Vue.component('user-filter', UserFilter)