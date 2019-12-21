import props from './../props'

import QuestionTemplate from './QuestionTemplate/QuestionTemplate.vue'
import ResourceSearch from './ResourceSearch/ResourceSearch.vue'
import FooterButtons from './FooterButtons/FooterButtons.vue'

let Editor = {
  props: props,
  //data: () => {},
  components: {
    'question-template': QuestionTemplate,
    'resource-search': ResourceSearch,
    'footer-buttons': FooterButtons
  },
  //computed: ,
  //watch: ,
//  mounted() {
//  },
  //methods: 
}

import data from './dataConfusedClarified'
data(Editor)

import computed from './computedConfusedClarified'
computed(Editor)

import watch from './watchConfusedClarified'
watch(Editor)

import methods from './methodsConfusedClarified'
methods(Editor)

import ComputedConfig from './../computed/ComputedConfig'
ComputedConfig(Editor)

import ComputedButtons from './../computed/ComputedButtons'
ComputedButtons(Editor)

import MethodsAnnotation from './../methods/MethodsAnnotation'
MethodsAnnotation(Editor)

export default Editor