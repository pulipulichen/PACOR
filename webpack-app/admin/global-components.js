import Vue from 'vue'

import Pagination from './../components/ui/Pagination/Pagination.vue'
Vue.component('pagination', Pagination)

import Modal from './../components/ui-modal/Modal/Modal.vue'
Vue.component('modal', Modal)

import StepProgressBar from './../components/reading-progress/StepProgressBar/StepProgressBar.vue'
Vue.component('step-progress-bar', StepProgressBar)

import Navigation from './../components/ui/Navigation/Navigation.vue'
Vue.component('navigation', Navigation)

//import HTMLEditor from './../components/HTMLEditor/HTMLEditor.vue'
//Vue.component('HTMLEditor', HTMLEditor)
Vue.component('HTMLEditor', () => import(/* webpackChunkName: "vendors/HTMLEditor" */ './../components/annotation/HTMLEditor/HTMLEditor.vue'))

import TableOfContents from './../components/manager/TableOfContents/TableOfContents.vue'
Vue.component('table-of-contents', TableOfContents)

// ----------------------

import WebpageConfigEditor from './../components/admin/WebpageConfigEditor/WebpageConfigEditor.vue'
Vue.component('webpage-config-editor', WebpageConfigEditor)

import WebpageGroupEditor from './../components/admin/WebpageGroupEditor/WebpageGroupEditor.vue'
Vue.component('webpage-group-editor', WebpageGroupEditor)

import ReaderCard from './../components/admin/ReaderCard/ReaderCard.vue'
Vue.component('reader-card', ReaderCard)