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
    this.setupTutorial()
    //this._test()
    
    //$.extend(require('jquery-ui'))
    //$.extend(jQueryUI)
    
    //console.log(typeof($(this.$refs.panel).resizable))
    
  },
  destroyed() {
    this.placeholder.remove()
    //this.this.WindowResizeEvents()
    this.removeWindowResizeEvents()
  },
  methods: {
  } // methods
}

import computed from './computedAnnotationPanel.js'
computed(AnnotationPanel)

import watch from './watchAnnotationPanel.js'
watch(AnnotationPanel)

import Display from './methodsDisplayAnnotationPanel.js'
Display(AnnotationPanel)

import Scroll from './methodsScrollAnnotationPanel.js'
Scroll(AnnotationPanel)

import Placeholder from './methodsPlaceholderAnnotationPanel.js'
Placeholder(AnnotationPanel)

import Query from './methodsQueryAnnotationPanel.js'
Query(AnnotationPanel)

import Event from './methodsEventAnnotationPanel.js'
Event(AnnotationPanel)

import Resize from './methodsResizeAnnotationPanel.js'
Resize(AnnotationPanel)

import methodsTutorialAnnotationPanel from './methodsTutorialAnnotationPanel.js'
methodsTutorialAnnotationPanel(AnnotationPanel)

import methodsTutorialLocalAnnotationPanel from './methodsTutorialLocalAnnotationPanel.js'
methodsTutorialLocalAnnotationPanel(AnnotationPanel)

export default AnnotationPanel