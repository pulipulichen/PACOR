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

  AnnotationPanel.computed.computedPlaceholderHeight = function () {
    //return `calc(${this.heightVH}vh - ${this.navigationPlaceholderHeight}px)`
    return `calc(${this.panelData.heightPX}px - ${this.navigationPlaceholderHeight}px)`
  }

  AnnotationPanel.computed.computedSegmentStyle = function () {
    if (this.annotationConfig.enableCollaboration === true
            && this.lib.style.isStackWidth() === true) {
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
}