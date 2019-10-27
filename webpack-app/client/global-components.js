import Vue from 'vue'

import Pagination from './../components/Pagination/Pagination.vue'
Vue.component('pagination', Pagination)

import Modal from './../components/Modal/Modal.vue'
Vue.component('modal', Modal)

import StepProgressBar from './../components/StepProgressBar/StepProgressBar.vue'
Vue.component('step-progress-bar', StepProgressBar)

import BlockExit from './../components/BlockExit/BlockExit.vue'
Vue.component('block-exit', BlockExit)

import ActivityTimer from './../components/ActivityTimer/ActivityTimer.vue'
Vue.component('activity-timer', ActivityTimer)

import Navigation from './../components/Navigation/Navigation.vue'
Vue.component('navigation', Navigation)

Vue.component('HTMLEditor', () => import(/* webpackChunkName: "vendors/HTMLEditor" */ './../components/HTMLEditor/HTMLEditor.vue'))

