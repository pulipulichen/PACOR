const localStorageKeyPrefix = 'client.components.ReadingProgressesModuels.Reading.components.AnnotationManager.AnnotationPanel.'
import $ from 'jquery'

export default (AnnotationPanel) => {

  AnnotationPanel.methods._initHeightPX = function () {
    let sizeRatio = localStorage.getItem(localStorageKeyPrefix + 'sizeRatio')
    if (sizeRatio === null) {
      sizeRatio = 0.5
    } else {
      sizeRatio = parseFloat(sizeRatio)
    }
    
    if (sizeRatio < this.lib.style.config.AnnotationPanelDisplayMinPanelRatio) {
      sizeRatio = this.lib.style.config.AnnotationPanelDisplayMinPanelRatio
    }
    //console.log(sizeRatio, this.lib.style.config.AnnotationPanelDisplayMinPanelRatio)
    
    //console.log(sizeRatio)
    let height = (window.innerHeight * sizeRatio)
    
    if (height < this.lib.style.config.AnnotationPanelDisplayMinPanelHeight) {
      height = this.lib.style.config.AnnotationPanelDisplayMinPanelHeight
    }
    
    this.panelData.heightPX = height
  } // AnnotationPanel.methods._initHeightPX = function () {
  
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