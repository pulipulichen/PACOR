import props from './../Traits/props'

import QuestionTemplate from './QuestionTemplate/QuestionTemplate.vue'
import ResourceSearch from './ResourceSearch/ResourceSearch.vue'

let Editor = {
  props: props,
  //data: () => {},
  components: {
    'question-template': QuestionTemplate,
    'resource-search': ResourceSearch,
  },
  //computed: ,
  //watch: ,
//  mounted() {
//  },
  //methods: 
}

import data from './data'
data(Editor)

import computed from './computed'
computed(Editor)

import watch from './watch'
watch(Editor)

import methods from './methods'
methods(Editor)

import ComputedConfig from './../Traits/computed/ComputedConfig'
ComputedConfig(Editor)

import ComputedButtons from './../Traits/computed/ComputedButtons'
ComputedButtons(Editor)

import MethodsAnnotation from './../Traits/methods/MethodsAnnotation'
MethodsAnnotation(Editor)

export default Editor