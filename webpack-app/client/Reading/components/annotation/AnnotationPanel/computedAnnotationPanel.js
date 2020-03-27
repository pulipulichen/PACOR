export default (AnnotationPanel) => {

  AnnotationPanel.computed.annotationConfig = function () {
    let stepConfig = this.lib.auth.currentStepConfig
    return stepConfig.annotation
  }
//    enableCollaboration () {
//      //return true // for test
//      return this.annotationConfig.enableCollaboration
//    },
//    enablePermissionControll () {
//      //return true // for test
//      return this.annotationConfig.enablePermissionControll
//    },

  AnnotationPanel.computed.localStorageKeyPrefix = function () {
    let key = 'AnnotationPanel.localStorageKeyPrefix.' + this.lib.auth.currentStep
    
    if (this.lib.auth.enableCollaboration === true) {
      key = key + '.c.'
    }
    else {
      key = key + '.i.'
    }
    
    return key
  }

  AnnotationPanel.computed.computedPlaceholderHeight = function () {
    //return `calc(${this.heightVH}vh - ${this.navigationPlaceholderHeight}px)`
    return `calc(${this.panelData.heightPX}px - ${this.navigationPlaceholderHeight}px)`
  }

  AnnotationPanel.computed.computedSegmentStyle = function () {
    if (this.lib.auth.isEnableCollaboration === true
            && this.lib.style.isStackWidth === true) {
      return {
        'max-height': `${this.panelData.heightPX}px`,
        'overflow-y': 'auto',
        'overflow-x': 'hidden'
      }
    } else {
      return {
        'height': `${this.panelData.heightPX}px`
      }
    }
  }

  AnnotationPanel.computed.computedSegmentClass = function () {
    if (typeof (this.annotationModule) === 'string') {
      return this.status.readingConfig.annotationTypeModules[this.annotationModule].style.segmentColor
    }
  }
  
  AnnotationPanel.computed.currentLocalTutorialKey = function () {
    let keys = ['AnnotationPanel', 'localTutorial']
    
    if (this.panelData.annotation) {
      keys.push('Single')
      keys.push(this.panelData.annotation.type)
      
      //if (this.lib.AnnotationHelper.isEditable(this.panelData.annotation)) {
      //  keys.push('editable')
      //}
    }
    else {
      keys.push('List')
    }
    
    return keys.join('.')
  }
  
}