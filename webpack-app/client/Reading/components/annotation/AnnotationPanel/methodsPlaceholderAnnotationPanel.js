const localStorageKeyPrefix = 'client.components.ReadingProgressesModuels.Reading.components.AnnotationManager.AnnotationPanel.'
import $ from 'jquery'

export default (AnnotationPanel) => {

  AnnotationPanel.methods._initHeightPX = function () {
    let sizeRatio = localStorage.getItem(localStorageKeyPrefix + this.lib.auth.currentStep + '.sizeRatio')
    if (sizeRatio === null) {
      if (this.lib.auth.currentStep === 'CollaborativeReading') {
        sizeRatio = 0.7
      }
      else {
        sizeRatio = 0.7
      }
    } else {
      sizeRatio = parseFloat(sizeRatio)
    }
    
    if (sizeRatio < this.lib.style.params.AnnotationPanelDisplayMinPanelRatio) {
      sizeRatio = this.lib.style.params.AnnotationPanelDisplayMinPanelRatio
    }
    //console.log(sizeRatio, this.lib.style.params.AnnotationPanelDisplayMinPanelRatio)
    
    //console.log(sizeRatio)
    let height = (window.innerHeight * sizeRatio)
    
    if (height < this.lib.style.params.AnnotationPanelDisplayMinPanelHeight) {
      height = this.lib.style.params.AnnotationPanelDisplayMinPanelHeight
    }
    
    this.panelData.heightPX = height
    
    this.addWindowResizeEvents()
    
  } // AnnotationPanel.methods._initHeightPX = function () {
  
  AnnotationPanel.methods.addWindowResizeEvents = function () {
    window.addEventListener('resize', this.onWindowResize)
  }
  
  AnnotationPanel.methods.removeWindowResizeEvents = function () {
    window.removeEventListener('resize', this.onWindowResize)
  }
  
  AnnotationPanel.methods.onWindowResize = function () {
    let maxHeight = window.innerHeight
    
    //console.log(maxHeight, this.lib.style.params.AnnotationPanelDisplayMinPanelHeight)
    if (maxHeight < this.lib.style.params.AnnotationPanelDisplayMinPanelHeight) {
      maxHeight = this.lib.style.params.AnnotationPanelDisplayMinPanelHeight
    }
    
    if (maxHeight < this.panelData.heightPX) {
      this.panelData.heightPX = maxHeight
    }
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
  } // AnnotationPanel.methods._initPlaceholder = function () {
}