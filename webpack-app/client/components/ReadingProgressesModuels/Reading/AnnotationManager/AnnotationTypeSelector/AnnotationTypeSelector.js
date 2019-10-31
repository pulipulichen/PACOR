let AnnotationTypeSelector = {
  props: ['status', 'config', 'lib', 'selection'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  watch: {
    'selection': function () {
      let fab = this.$refs.fab
      if (this.selection !== null) {
        //console.log('open')
        fab.onOffFab(true)
      }
      else {
        fab.onOffFab(false)
      }
      //console.log(this.selection)
      //fab.onOffFab((this.selection !== null))
    }
  },
  computed: {
    modules: function () {
      let modules = []
      
      let currentStep = this.lib.auth.getCurrentStep()
      //console.log(currentStep)
      if (typeof(currentStep) === 'string') {
        
        let config = this.status.readingConfig
        if (typeof(config) === 'object') {
          let annotationTypes = config.readingProgressModules[currentStep].annotation.types
          if (Array.isArray(annotationTypes)) {
            annotationTypes.forEach(type => {
              let module = config.annotationTypeModules[type]
              if (typeof(module) === 'object') {
                module.type = type
                modules.push(module)
              }
            })
          }
        }
      }
      //console.log(modules)
      return modules
    }
  },
  mounted() {
  },
  methods: {
    clickItem: function (type) {
      //console.log('clickItem', type)
      this.$emit('selectAnnotation', type)
    }
  } // methods
}

export default AnnotationTypeSelector