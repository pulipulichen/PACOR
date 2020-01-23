import './VueFab.js'

/**
 * https://www.npmjs.com/package/vue-float-action-button
 */
let AnnotationTypeSelector = {
  props: ['status', 'config', 'lib'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      timer: null,
      selection: null,
      anchorPositions: null,
      anchorParagraphIds: null,
      isTutorialMode: false
    }
  },
  watch: {
    'selection': function () {
      if (this.isTutorialMode === true) {
        return false
      }
      let fab = this.$refs.fab
      clearTimeout(this.timer)
      
      //console.log('watch selection')
      if (this.selection !== null) {
        //console.log('open')
        this.timer = setTimeout(() => {
          //console.log(this.selection.anchorPositions)
          fab.onOffFab(true)
        }, 100)
      }
      else {
        this.timer = setTimeout(() => {
          fab.onOffFab(false)
        }, 100)
      }
      //if (this.selection !== null) {
      //  console.trace(this.selection)
      //}
      //fab.onOffFab((this.selection !== null))
    },
  },
  computed: {}, // computedAnnotationTypeSelector.js
  mounted() {
//    //console.log(this.status.preference.leftHanded)
    this.initRangyEvent()
    
    //this._testAdd()
  },
  methods: {} // methodsAnnotationTypeSelector.js
}

import computedAnnotationTypeSelector from './computedAnnotationTypeSelector.js'
computedAnnotationTypeSelector(AnnotationTypeSelector)

import methodsAnnotationTypeSelector from './methodsAnnotationTypeSelector.js'
methodsAnnotationTypeSelector(AnnotationTypeSelector)

import methodTutorialAnnotationTypeSelector from './methodTutorialAnnotationTypeSelector.js'
methodTutorialAnnotationTypeSelector(AnnotationTypeSelector)

export default AnnotationTypeSelector