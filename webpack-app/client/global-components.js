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

import AnnotationModuleButton from './../components/AnnotationModuleButton/AnnotationModuleButton.vue'
Vue.component('annotation-module-button', AnnotationModuleButton)

Vue.component('HTMLEditor', () => import(/* webpackChunkName: "vendors/HTMLEditor" */ './../components/HTMLEditor/HTMLEditor.vue'))

import CheckboxToggle from './../components/CheckboxToggle/CheckboxToggle.vue'
Vue.component('checkbox-toggle', CheckboxToggle)

import CountdownButton from './../components/CountdownButton/CountdownButton.vue'
Vue.component('countdown-button', CountdownButton)

import UserAvatarIcons from './../components/UserAvatarIcons/UserAvatarIcons.vue'
Vue.component('user-avatar-icons', UserAvatarIcons)

