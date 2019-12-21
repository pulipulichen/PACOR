const localStorageKeyPrefix = 'client.components.ReadingProgressesModuels.Reading.components.AnnotationManager.AnnotationPanel.'
const disableSelectClass = 'pacor-disable-user-select'
let resizeLocker = false

import $ from 'jquery'

let body = null

export default (AnnotationPanel) => {

  AnnotationPanel.methods.onResizeStart = function (event) {
    if (resizeLocker === true) {
      return false
    }
    resizeLocker = true

    //let body = $('body')
    if (!body) {
      body = $('body')
    }
    body.addClass(disableSelectClass)
    //console.log(event)
    //console.log(event)
    let currentY = event.clientY
    
    let maxTopGap = this.lib.style.params.AnnotationPanelMaxTopGap
    let minPanelHeight = this.lib.style.params.AnnotationPanelMinPanelHeight

    let moveEvent = (event) => {
      if (this.lib.style.isSmallHeight === false) {
        if (event.clientY < maxTopGap
                || (window.innerHeight - event.clientY) < minPanelHeight) {
          return false
        }
      } else {
        if (event.clientY < (maxTopGap / 2)
                || (window.innerHeight - event.clientY) < (minPanelHeight / 2)) {
          return false
        }
      }


      let interval = currentY - event.clientY
      this.panelData.heightPX = this.panelData.heightPX + interval
      currentY = event.clientY
      //console.log(this.heightPX)
      //console.log(event)
      //event.preventDefault()
      //event.stopPropagation()
    }

    let removeMoveEvent = () => {
      document.removeEventListener('mousemove', moveEvent)
      document.removeEventListener('mouseup', removeMoveEvent)

      document.removeEventListener('touchmove', moveEvent)
      document.removeEventListener('touchend', removeMoveEvent)
      body.removeClass(disableSelectClass)
      resizeLocker = false

      // 計算最後的比例，然後存到preference去
      let sizeRatio = ((window.innerHeight - currentY) / window.innerHeight)
      //console.log(sizeRatio)
      localStorage.setItem(localStorageKeyPrefix + 'sizeRatio', sizeRatio)
    }

    document.addEventListener('mousemove', moveEvent)
    document.addEventListener('mouseup', removeMoveEvent)

    document.addEventListener('touchmove', moveEvent)
    document.addEventListener('touchend', removeMoveEvent)

    event.preventDefault()
    event.stopPropagation()
  }
}