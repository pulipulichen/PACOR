let debugEnableAutoList = false

/**
 * https://www.npmjs.com/package/vue-float-action-button
 */
let AnnotationTypeSelector = {
  props: ['status', 'config', 'lib'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      timer: null,
      selection: null
    }
  },
  watch: {
    'selection': function () {
      let fab = this.$refs.fab
      clearTimeout(this.timer)
      
      if (this.selection !== null) {
        //console.log('open')
        this.timer = setTimeout(() => {
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
  computed: {
    annotationModules: function () {
      let modules = []
      
      let currentStep = this.lib.auth.currentStep
      //console.log(currentStep)
      if (typeof(currentStep) === 'string') {
        
        let config = this.status.readingConfig
        if (typeof(config) === 'object') {
          let annotationTypes = config.readingProgressModules[currentStep].annotation.types
          if (Array.isArray(annotationTypes)) {
            annotationTypes.forEach(type => {
              let module = config.annotationTypeModules[type]
              //console.log(module)
              if (typeof(module) === 'object'
                      && module.addable === true) {
                module.type = type
                modules.push(module)
              }
            })
          }
        }
      }
      //console.log(modules)
      modules.reverse()
      return modules
    },
    computedFABPosition () {
      //console.log(this.status.preference.leftHanded)
      if (this.status.preference.leftHanded === true) {
        return 'bottom-left'
      }
      else {
        return 'bottom-right'
      }
    },
    enableList () {
      return (this.selection !== null 
            && this.selection.highlights.length > 0)
    }
  },
  mounted() {
//    //console.log(this.status.preference.leftHanded)
    this.initRangyEvent()
  },
  methods: {
    initRangyEvent () {
      let rangy = this.lib.RangyManager
      rangy.addEventListener('select', (data) => {
        // 如果AnnotationPanel已經顯示，則不動作
        if (this.lib.AnnotationPanel.isHide === false) {
          return false
        }
        
        this.selection = data
        
        // For test
        if (debugEnableAutoList) {
          setTimeout(() => {
            this.list()
          }, 100)
        }
      })
      
      rangy.addEventListener('selectcollapsed', (data) => {
        this.selection = null
      })
    },
    addAnnotation: function (type) {
      //console.log('clickItem', type)
      //this.$emit('selectAnnotation', type)
      
      let ancrhoPositions = this.lib.RangyManager.getAnchorPositionsFromSelection(this.selection)
      
      let annotation = {
        anchorPositions: ancrhoPositions,
        type: type
      }
      
      this.lib.RangyManager.pinSelection()
      
      this.lib.AnnotationPanel.setAnnotation(annotation, {
        'cancel': () => {
          // 如果取消的話，那就恢復選取
          this.lib.RangyManager.unpinSelection(true)
        }
      })
    },
    list () {
      //this.$emit('list')
      let ancrhoPositions = this.lib.RangyManager.getAnchorPositionsFromSelection(this.selection)
      
      this.lib.AnnotationPanel.setAnchorPositions(ancrhoPositions)
    }
  } // methods
}

export default AnnotationTypeSelector