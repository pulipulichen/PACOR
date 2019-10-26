import Vue from 'vue'

import Pagination from './../components/Pagination/Pagination.vue'
Vue.component('pagination', Pagination)

import Modal from './../components/Modal/Modal.vue'
Vue.component('modal', Modal)

import StepProgressBar from './../components/StepProgressBar/StepProgressBar.vue'
Vue.component('step-progress-bar', StepProgressBar)

//import HTMLEditor from './../components/HTMLEditor/HTMLEditor.vue'
//Vue.component('HTMLEditor', HTMLEditor)
Vue.component('HTMLEditor', () => import(/* webpackChunkName: "vendors/HTMLEditor" */ './../components/HTMLEditor/HTMLEditor.vue'))

import TableOfContents from './../components/TableOfContents/TableOfContents.vue'
Vue.component('table-of-contents', TableOfContents)