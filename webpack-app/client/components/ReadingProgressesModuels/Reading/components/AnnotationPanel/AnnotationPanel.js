//import VueDraggableResizable from 'vue-draggable-resizable'
//import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import AnnotationList from './AnnotationList/AnnotationList.vue'
import AnnotationEditorModules from './AnnotationEditorModules/AnnotationEditorModules.vue'

import $ from 'jquery'

import props from './Traits/props'
import data from './Traits/data'

let AnnotationPanel = {
  props: props,
  data() {    
    //this.$i18n.locale = this.config.locale
    return data
  },
  components: {
    //'vue-draggable-resizable': VueDraggableResizable,
    
    'annotation-list': AnnotationList,
    'annotation-editor-modules': AnnotationEditorModules,
    
  },
  computed: {}, // ./Traits/computed.js
  watch: {},// ./Traits/watch.js
  mounted() {
    this._initHeightPX()
    
    this._initPlaceholder()
    //this._test()
    
    //$.extend(require('jquery-ui'))
    //$.extend(jQueryUI)
    
    //console.log(typeof($(this.$refs.panel).resizable))
    
  },
  destroyed() {
    this.placeholder.remove()
  },
  methods: {
  } // methods
}

import computed from './Traits/computed'
computed(AnnotationPanel)

import watch from './Traits/watch'
watch(AnnotationPanel)

import Display from './Traits/methods/Display'
Display(AnnotationPanel)

import Placeholder from './Traits/methods/Placeholder'
Placeholder(AnnotationPanel)

import Query from './Traits/methods/Query'
Query(AnnotationPanel)

export default AnnotationPanel