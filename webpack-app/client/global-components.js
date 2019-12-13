/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */

import Vue from 'vue'

import Pagination from './../components/ui/Pagination/Pagination.vue'
Vue.component('pagination', Pagination)

import Modal from './../components/ui-modal/Modal/Modal.vue'
Vue.component('modal', Modal)

import ConfirmModal from './../components/ui-modal/ConfirmModal/ConfirmModal.vue'
Vue.component('confirm-modal', ConfirmModal)

import StepProgressBar from './../components/reading-progress/StepProgressBar/StepProgressBar.vue'
Vue.component('step-progress-bar', StepProgressBar)

import BlockExit from './../components/reading-progress/BlockExit/BlockExit.vue'
Vue.component('block-exit', BlockExit)

import ActivityTimer from './../components/reading-progress/ActivityTimer/ActivityTimer.vue'
Vue.component('activity-timer', ActivityTimer)

import Navigation from './../components/ui/Navigation/Navigation.vue'
Vue.component('navigation', Navigation)

//import CompactNavigation from './../components/CompactNavigation/CompactNavigation.vue'
//Vue.component('compact-navigation', CompactNavigation)

import Clock from './../components/reading-progress/Clock/Clock.vue'
Vue.component('clock', Clock)

import AnnotationTypeButton from './../components/annotation/AnnotationTypeButton/AnnotationTypeButton.vue'
Vue.component('annotation-type-button', AnnotationTypeButton)

Vue.component('HTMLEditor', () => import(/* webpackChunkName: "vendors/HTMLEditor" */ './../components/annotation/HTMLEditor/HTMLEditor.vue'))

import CheckboxToggle from './../components/ui-button/CheckboxToggle/CheckboxToggle.vue'
Vue.component('checkbox-toggle', CheckboxToggle)

import CountdownButton from './../components/ui-button/CountdownButton/CountdownButton.vue'
Vue.component('countdown-button', CountdownButton)

import SimpleCountdownTimer from './../components/reading-progress/SimpleCountdownTimer/SimpleCountdownTimer.vue'
Vue.component('simple-countdown-timer', SimpleCountdownTimer)

import DigitalCountdownTimer from './../components/reading-progress/DigitalCountdownTimer/DigitalCountdownTimer.vue'
Vue.component('digital-countdown-timer', DigitalCountdownTimer)

import ValidationButton from './../components/ui-button/ValidationButton/ValidationButton.vue'
Vue.component('validation-button', ValidationButton)

import UserAvatarIcons from './../components/ui-user/UserAvatarIcons/UserAvatarIcons.vue'
Vue.component('user-avatar-icons', UserAvatarIcons)

import AnnotationItem from './../components/annotation/AnnotationItem/AnnotationItem.vue'
Vue.component('annotation-item', AnnotationItem)

import AnnotationItemInteractive from './../components/annotation/AnnotationItemInteractive/AnnotationItemInteractive.vue'
Vue.component('annotation-item-interactive', AnnotationItemInteractive)

import AdminBadge from './../components/ui-user/AdminBadge/AdminBadge.vue'
Vue.component('admin-badge', AdminBadge)

import UserSelfBadge from './../components/ui-user/UserSelfBadge/UserSelfBadge.vue'
Vue.component('user-self-badge', UserSelfBadge)

import IframeMessageSegment from './../components/ui/IframeMessageSegment/IframeMessageSegment.vue'
Vue.component('iframe-message-segment', IframeMessageSegment)
