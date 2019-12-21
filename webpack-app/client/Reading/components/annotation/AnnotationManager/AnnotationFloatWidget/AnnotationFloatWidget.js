import data from './dataAnnotationFloatWidget.js'

let AnnotationFloatWidget = {
  props: ['lib', 'status', 'config'
  ],
  data, // 拆開到 dataAnnotationFloatWidget
//  components: {
//  },
  computed: {}, // 拆開到 computedAnnotationFloatWidget.js
  watch: {}, // 拆開到 watchAnnotationFloatWidget
  mounted() {
    this.initRangyEvents()
//    
//    //this.load()
    
  },
  destroyed () {
    this.lib.RangyManager.hoverOut()
  },
  methods: {} // 拆開到 methodsAnnotationFloatWidget
}

import computedAnnotationFloatWidget from './computedAnnotationFloatWidget.js'
computedAnnotationFloatWidget(AnnotationFloatWidget)

import watchAnnotationFloatWidget from './watchAnnotationFloatWidget.js'
watchAnnotationFloatWidget(AnnotationFloatWidget)

import methodsAnnotationFloatWidget from './methodsAnnotationFloatWidget.js'
methodsAnnotationFloatWidget(AnnotationFloatWidget)

import methodsRangyAnnotationFloatWidget from './methodsRangyAnnotationFloatWidget.js'
methodsRangyAnnotationFloatWidget(AnnotationFloatWidget)

export default AnnotationFloatWidget