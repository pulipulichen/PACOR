export default function (AnnotationTypeSelector) {
  AnnotationTypeSelector.computed.annotationModules = function () {
    let modules = []

    let currentStep = this.lib.auth.currentStep
    //console.log(currentStep)
    if (typeof (currentStep) === 'string') {

      let config = this.status.readingConfig
      if (typeof (config) === 'object') {
        let annotationTypes = config.readingProgressModules[currentStep].highlightAnnotation.types
        if (Array.isArray(annotationTypes)) {
          annotationTypes.forEach(type => {
            let module = config.annotationTypeModules[type]
            //console.log(module)
            if (typeof (module) === 'object'
                    && module.addable === true) {
              module.type = type
              modules.push(module)

              if (module.enableQuickAdd === true) {
                let quickModule = {
                  ...module
                }
                quickModule.quickAdd = true
                modules.push(quickModule)
              }
            }
          })
        }
      }
    }
    //console.log(modules)
    modules.reverse()
    return modules
  }
  AnnotationTypeSelector.computed.computedFABPosition = function () {
    //console.log(this.status.preference.leftHanded)
    if (this.lib.style.isLeftHanded === true) {
      return 'bottom-left'
    } else {
      return 'bottom-right'
    }
  }
  AnnotationTypeSelector.computed.enableList = function () {
//      if (this.selection) {
//        console.log(this.selection)
//        console.log(this.selection.highlights.length)
//      }
    return (this.selection !== null
            && this.selection.highlights.length > 0)
  }
}