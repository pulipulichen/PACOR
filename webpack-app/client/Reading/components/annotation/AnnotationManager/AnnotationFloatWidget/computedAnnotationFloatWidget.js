export default function (AnnotationFloatWidget) {
  AnnotationFloatWidget.computed.computedContainerClassNames = function () {
    if (this.anchorPositions === null) {
      //console.log('no')
      //return this.lastPosition + ' hide'
      return this.lastPosition
    }

    let classList = []

    classList.push('show')

    let windowHeight = window.innerHeight
    let clientY = this.triggerEvent.clientY
    if (clientY < (windowHeight / 2)) {
      classList.push('bottom')
      this.lastPosition = 'bottom'
    } else {
      this.lastPosition = 'top'
    }


    //console.log(this.lib.RangyManager.isSelecting())
    if (this.lib.RangyManager.isSelecting()) {
      classList.push('selecting')
    }

    if (this.lib.style.isEnableAnimte === false) {
      classList.push('disable-animate')
    }
    
    if (this.isFixed) {
      classList.push('is-fixed')
    }

    //console.log(classList)
    //return 'bottom'
    if (classList.length > 0) {
      return classList.join(' ')
    }
  } // AnnotationFloatWidget.computed.computedContainerClassNames = function () {

  AnnotationFloatWidget.computed.computedButtonsClassNames = function () {
    let classList = []
    //console.log(this.status.preference.leftHanded)
    if (this.lib.style.isLeftHanded === true) {
      classList.push('left-handed')
    } else {
      classList.push('right aligned')
    }

    return classList.join(' ')
  }
}