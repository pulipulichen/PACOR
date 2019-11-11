const localStorageKeyPrefix = 'client.components.ReadingProgressesModuels.Reading.components.AnnotationManager.AnnotationPanel.'
const disableSelectClass = 'pacor-disable-user-select'
let resizeLocker = false

import $ from 'jquery'

export default (AnnotationPanel) => {

  AnnotationPanel.methods._initHeightPX = function () {
    let sizeRatio = localStorage.getItem(localStorageKeyPrefix + 'sizeRatio')
    if (sizeRatio === null) {
      sizeRatio = 0.5
    } else {
      sizeRatio = parseFloat(sizeRatio)
    }
    //console.log(sizeRatio)
    this.panelData.heightPX = (window.innerHeight * sizeRatio)
  }
  AnnotationPanel.methods._initPlaceholder = function () {
    let navPH = $('.Navigation.placeholder:first')
    if (navPH.length === 1) {
      this.navigationPlaceholderHeight = navPH.height()
    }

    let container = $('<div class="non-invasive-web-style-framework"></div>')
            .appendTo('body')
    this.placeholder = $('<div class="AnnotationPanel placeholder"></div>')
            .css('height', this.computedPlaceholderHeight)
            .hide()
            .appendTo(container)
  }
  
  
  AnnotationPanel.methods.onResizeStart = function (event) {
    if (resizeLocker === true) {
      return false
    }
    resizeLocker = true

    let body = $('body')
    body.addClass(disableSelectClass)
    //console.log(event)
    //console.log(event)
    let currentY = event.clientY

    let moveEvent = (event) => {
      if (this.lib.style.isSmallHeight() === false) {
        if (event.clientY < 100
                || (window.innerHeight - event.clientY) < 200) {
          return false
        }
      } else {
        if (event.clientY < 50
                || (window.innerHeight - event.clientY) < 100) {
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