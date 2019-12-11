/* global Vue, Pagination, Modal, StepProgressBar, BlockExit, ActivityTimer */

import Vue from 'vue'

Vue.component('rangy', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './ReadingProgressesModuels/Reading/components/annotation/RangyManager/RangyManager.vue'))
Vue.component('annotation-panel', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './ReadingProgressesModuels/Reading/components/annotation/AnnotationPanel/AnnotationPanel.vue'))
Vue.component('annotation-manager', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './ReadingProgressesModuels/Reading/components/annotation/AnnotationManager/AnnotationManager.vue'))
Vue.component('section-manager', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './ReadingProgressesModuels/Reading/components/annotation/SectionManager/SectionManager.vue'))
Vue.component('search-manager', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './ReadingProgressesModuels/Reading/components/search/SearchManager/SearchManager.vue'))
Vue.component('instruction-message', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './ReadingProgressesModuels/Reading/components/ui/InstructionMessage/InstructionMessage.vue'))
Vue.component('compact-navigation', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './ReadingProgressesModuels/Reading/components/ui/CompactNavigation/CompactNavigation.vue'))
Vue.component('annotation-type-filter', () => import(/* webpackChunkName: "client-components/ReadingComponents" */ './ReadingProgressesModuels/Reading/components/search/AnnotationTypeFilter/AnnotationTypeFilter.vue'))
