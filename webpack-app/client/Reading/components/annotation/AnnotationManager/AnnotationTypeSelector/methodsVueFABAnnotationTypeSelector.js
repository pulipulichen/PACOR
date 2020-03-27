
export default function (AnnotationTypeSelector) {
  
  AnnotationTypeSelector.methods.getModuleKey = function (module) {
    let key = module.type

    if (module.quickAdd) {
      key = key + '-quick-add'
    }

    return key
  }
  
  AnnotationTypeSelector.methods.getModuleTitle = function (module) {
    let title = this.$t('ANNOTATION_TYPE.' + module.type)
    
    if (module.quickAdd === true
            && module.enableEditorAdd === true) {
      title = title + ' (' + this.$t('Quick Add') + ')'
    }
    //console.log(title)
    
    return title
  }
  
  AnnotationTypeSelector.methods.getModuleClassList = function (module) {
    let classList = [module.type]
    
    if (module.quickAdd === true
            && module.enableEditorAdd === true) {
      classList.push('quick-add')
    }
    
    return classList
  }
  
  AnnotationTypeSelector.methods.buildQuickModule = function (module) {
    let quickModule = {
      ...module
    }
    quickModule.quickAdd = true

    return quickModule
  }
}