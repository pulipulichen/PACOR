/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */

import Vue from 'vue'

//import Pagination from './../components/ui/Pagination/Pagination.vue'
//Vue.component('pagination', Pagination)

Vue.component('pagination', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui/Pagination/Pagination.vue')
})

//import Modal from './../components/ui-modal/Modal/Modal.vue'
//Vue.component('modal', Modal)
Vue.component('modal', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-modal/Modal/Modal.vue')
})

//import ConfirmModal from './../components/ui-modal/ConfirmModal/ConfirmModal.vue'
//Vue.component('confirm-modal', ConfirmModal)
Vue.component('confirm-modal', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-modal/ConfirmModal/ConfirmModal.vue')
})

//import StepProgressBar from './../components/reading-progress/StepProgressBar/StepProgressBar.vue'
//Vue.component('step-progress-bar', StepProgressBar)
Vue.component('step-progress-bar', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/StepProgressBar/StepProgressBar.vue')
})

//import BlockExit from './../components/reading-progress/BlockExit/BlockExit.vue'
//Vue.component('block-exit', BlockExit)
Vue.component('block-exit', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/BlockExit/BlockExit.vue')
})

//import ActivityTimer from './../components/reading-progress/ActivityTimer/ActivityTimer.vue'
//Vue.component('activity-timer', ActivityTimer)
Vue.component('activity-timer', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/ActivityTimer/ActivityTimer.vue')
})

//import Navigation from './../components/ui/Navigation/Navigation.vue'
//Vue.component('navigation', Navigation)
Vue.component('navigation', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui/Navigation/Navigation.vue')
})

//import Clock from './../components/reading-progress/Clock/Clock.vue'
//Vue.component('clock', Clock)
Vue.component('clock', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/Clock/Clock.vue')
})

//import AnnotationTypeButton from './../components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue'
//Vue.component('annotation-type-button', AnnotationTypeButton)
Vue.component('annotation-type-button', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue')
})

//import CheckboxToggle from './../components/ui-button/CheckboxToggle/CheckboxToggle.vue'
//Vue.component('checkbox-toggle', CheckboxToggle)
Vue.component('checkbox-toggle', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-button/CheckboxToggle/CheckboxToggle.vue')
})

//import CountdownButton from './../components/ui-button/CountdownButton/CountdownButton.vue'
//Vue.component('countdown-button', CountdownButton)
//Vue.component('countdown-button', () => {
//  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-button/CountdownButton/CountdownButton.vue')
//})

//import SimpleCountdownTimer from './../components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue'
//Vue.component('simple-countdown-timer', SimpleCountdownTimer)
//Vue.component('simple-countdown-timer', () => {
//  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue')
//})

//import DigitalCountdownTimer from './../components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue'
//Vue.component('digital-countdown-timer', DigitalCountdownTimer)
Vue.component('digital-countdown-timer', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue')
})

//import ValidationButton from './../components/ui-button/ValidationButton/ValidationButton.vue'
//Vue.component('validation-button', ValidationButton)
Vue.component('validation-button', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-button/ValidationButton/ValidationButton.vue')
})

//import UserAvatarIcons from './../components/ui-user/UserAvatarIcons/UserAvatarIcons.vue'
//Vue.component('user-avatar-icons', UserAvatarIcons)
Vue.component('user-avatar-icons', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-user/UserAvatarIcons/UserAvatarIcons.vue')
})

//import AnnotationItem from './../components/annotation/AnnotationItem/AnnotationItem.vue'
//Vue.component('annotation-item', AnnotationItem)
Vue.component('annotation-item', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/annotation/AnnotationItem/AnnotationItem.vue')
})

//import AnnotationItemInteractive from './../components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue'
//Vue.component('annotation-item-interactive', AnnotationItemInteractive)
Vue.component('annotation-item-interactive', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue')
})

//import AdminBadge from './../components/ui-user/AdminBadge/AdminBadge.vue'
//Vue.component('admin-badge', AdminBadge)
Vue.component('admin-badge', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-user/AdminBadge/AdminBadge.vue')
})

//import UserSelfBadge from './../components/ui-user/UserSelfBadge/UserSelfBadge.vue'
//Vue.component('user-self-badge', UserSelfBadge)
Vue.component('user-self-badge', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-user/UserSelfBadge/UserSelfBadge.vue')
})

//import UserAvatar from './../components/ui-user/UserAvatar/UserAvatar.vue'
//Vue.component('user-avatar', UserAvatar)
Vue.component('user-avatar', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui-user/UserAvatar/UserAvatar.vue')
})

//import IframeMessageSegment from './../components/ui/IframeMessageSegment/IframeMessageSegment.vue'
//Vue.component('iframe-message-segment', IframeMessageSegment)
Vue.component('iframe-message-segment', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/ui/IframeMessageSegment/IframeMessageSegment.vue')
})

// --------------------

Vue.component('pre-imaginary-message', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/PreImaginaryMessage/PreImaginaryMessage.vue')
})

Vue.component('post-recall-message', () => {
  return import(/* webpackChunkName: "client-components/GlobalComponents" */ './../components/reading-progress/PostRecallMessage/PostRecallMessage.vue')
})

// --------------------

Vue.component('HTMLEditor', () => {
  return import(/* webpackChunkName: "vendors/HTMLEditor" */ './../components/annotation/HTMLEditor/HTMLEditor.vue')
})


