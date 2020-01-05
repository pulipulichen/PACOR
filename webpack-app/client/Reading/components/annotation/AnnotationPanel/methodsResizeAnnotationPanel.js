const localStorageKeyPrefix = 'client.components.ReadingProgressesModuels.Reading.components.AnnotationManager.AnnotationPanel.'
const disableSelectClass = 'pacor-disable-user-select'
let resizeLocker = false

import $ from 'jquery'

let body = null
let preventScroll = function (event) {
  event.preventDefault()
  event.stopPropagation()
}

export default (AnnotationPanel) => {

  AnnotationPanel.methods.onResizeStart = function (event) {
    if (resizeLocker === true) {
      return false
    }
    resizeLocker = true
    //console.log('start')
    //let body = $('body')
    if (!body) {
      body = $('body')
    }
    body.bind('scroll', preventScroll)
    
    body.addClass(disableSelectClass)
    //console.log(event)
    //console.log(event)
    let currentY = event.clientY
    if (!currentY) {
      currentY = event.touches[0].clientY
    }
    //alert(currentY)
    
    let maxTopGap = this.lib.style.params.AnnotationPanelMaxTopGap
    //console.log(maxTopGap)
    //maxTopGap = 0
    let minPanelHeight = this.lib.style.params.AnnotationPanelMinPanelHeight

    let moveEvent = (event) => {
      let cY = event.clientY
      if (!cY) {
        cY = event.touches[0].clientY
      }
      
      if (this.lib.style.isSmallHeight === false) {
        if (cY < maxTopGap
                || (window.innerHeight - cY) < minPanelHeight) {
          //console.log('被限制1', window.innerHeight, cY, minPanelHeight, maxTopGap)
          return false
        }
      } else {
        if (cY < (maxTopGap / 2)
                || (window.innerHeight - cY) < (minPanelHeight / 2)) {
          //console.log('被限制2', window.innerHeight, cY, minPanelHeight, maxTopGap)
          return false
        }
      }


      let interval = currentY - cY
      //console.log({interval, cY})
      
      this.panelData.heightPX = this.panelData.heightPX + interval
      currentY = cY
      //console.log(this.heightPX)
      //console.log(this.panelData.heightPX)
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
      
      body.unbind('scroll', preventScroll)
    }

    document.addEventListener('mousemove', moveEvent)
    document.addEventListener('mouseup', removeMoveEvent)

    document.addEventListener('touchmove', moveEvent)
    document.addEventListener('touchend', removeMoveEvent)

    event.preventDefault()
    event.stopPropagation()
  }
}