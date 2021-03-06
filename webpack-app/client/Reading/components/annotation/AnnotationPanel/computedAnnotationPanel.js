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
    
    //if (this.lib.auth.enableCollaboration) {
    //  keys.push('collaboration')
    //}
    
    if (this.panelData.annotation) {
      keys.push('Single')
      keys.push(this.panelData.annotation.type)
      
      if (this.enableDiscussion) {
        keys.push('discussion')
      }
      
      //if (this.lib.AnnotationHelper.isEditable(this.panelData.annotation)) {
      //  keys.push('editable')
      //}
    }
    else {
      keys.push('List')
      
      let type = this.$refs.AnnotationList.annotationType
      if (type) {
        keys.push(type)
      }
    }
    
    return keys.join('.')
  }
  
  //AnnotationPanel.computed.hasReadLocalTutorial = function () {
  //  return (localStorage.getItem(this.currentLocalTutorialKey) !== null)
  //}
  
  AnnotationPanel.computed.annotationSingleHeightPX = function () {
    let padding = 20
    
    if (this.enableDiscussion) {
      padding = 0
    }
    
    return this.panelData.heightPX - padding
  }
}