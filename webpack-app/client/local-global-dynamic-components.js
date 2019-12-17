/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */

import Vue from 'vue'

Vue.component('rangy', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/annotation/RangyManager/RangyManager.vue')
})
Vue.component('annotation-panel', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/annotation/AnnotationPanel/AnnotationPanel.vue')
})
Vue.component('annotation-manager', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/annotation/AnnotationManager/AnnotationManager.vue')
})
Vue.component('section-manager', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/annotation/SectionManager/SectionManager.vue')
})
Vue.component('search-manager', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/search/SearchManager/SearchManager.vue')
})
Vue.component('search-input', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/search/SearchManager/SearchInput/SearchInput.vue')
})
Vue.component('instruction-message', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/ui/InstructionMessage/InstructionMessage.vue')
})
//Vue.component('compact-navigation', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/ui-navigation/CompactNavigation/CompactNavigation.vue'))
Vue.component('navigation-header-item', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/ui-navigation/NavigationHeaderItem/NavigationHeaderItem.vue')
})
Vue.component('about-item', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/ui-navigation/AboutItem/AboutItem.vue')
})

Vue.component('annotation-type-filter', () => {
  return import(/* webpackChunkName: "client-components/ReadingComponents" */ './Reading/components/search/AnnotationTypeFilter/AnnotationTypeFilter.vue')
})
