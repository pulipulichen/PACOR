//import VueDraggableResizable from 'vue-draggable-resizable'
//import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import AnnotationList from './AnnotationList/AnnotationList.vue'
import AnnotationSingle from './AnnotationSingle/AnnotationSingle.vue'

import $ from 'jquery'

import props from './propsAnnotationPanel'
import data from './dataAnnotationPanel'

let AnnotationPanel = {
  props: props,
  data() {    
    //this.$i18n.locale = this.config.locale
    return data
  },
  components: {
    //'vue-draggable-resizable': VueDraggableResizable,
    
    'annotation-list': AnnotationList,
    'annotation-single': AnnotationSingle,
    
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
    this.this.addWindowResizeEvents()
  },
  methods: {
  } // methods
}

import computed from './computedAnnotationPanel'
computed(AnnotationPanel)

import watch from './watchAnnotationPanel'
watch(AnnotationPanel)

import Display from './methodsDisplayAnnotationPanel'
Display(AnnotationPanel)

import Scroll from './methodsScrollAnnotationPanel'
Scroll(AnnotationPanel)

import Placeholder from './methodsPlaceholderAnnotationPanel'
Placeholder(AnnotationPanel)

import Query from './methodsQueryAnnotationPanel'
Query(AnnotationPanel)

import Event from './methodsEventAnnotationPanel'
Event(AnnotationPanel)

import Resize from './methodsResizeAnnotationPanel'
Resize(AnnotationPanel)

export default AnnotationPanel