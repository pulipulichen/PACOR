/* global this */

export default (AnnotationPanel) => {
  AnnotationPanel.methods.setAnchorPositions = function (anchorPositions, hooks) {
    if (hooks === undefined 
            && Array.isArray(anchorPositions) === false) {
      hooks = anchorPositions
      anchorPositions = []
    }
    
    this.panelData.anchorPositions = anchorPositions
    if (hooks) {
      this.panelData.hooks = hooks
    }
    
    this.show()
  }
  
  AnnotationPanel.methods.setAnnotation = function (annotation, hooks) {
    this.panelData.annotation = annotation
    if (hooks) {
      this.panelData.hooks = hooks
    }
    
    this.show()
  }
  
  AnnotationPanel.methods.setFilter = function (filter) {
    this.panelData.filter = filter
  }
  
  AnnotationPanel.methods.findType = function (type) {
    if (!this.panelData.filter) {
      this.panelData.filter = {}
    }
    this.panelData.filter.type = type
  }
  
  AnnotationPanel.methods.findUser = function (user) {
    if (!this.panelData.filter) {
      this.panelData.filter = {}
    }
    this.panelData.filter.user = user
  }
  
  AnnotationPanel.methods.findKeyword = function (keyword) {
    this.panelData.keyword = keyword
    
    //console.log(this.panelData)
    //console.log(this.panelData.keyword)
  }
  
  AnnotationPanel.methods.setHooks = function (hooks) {
    this.panelData.hooks = hooks
  }
  
  
  AnnotationPanel.methods.reset = function () {
    this.panelData.anchorPositions = null
    this.panelData.hooks = null
    this.panelData.filter = null
    this.panelData.annotation = null
    this.lib.RangyManager.hoverOut(true)
  }
  
  AnnotationPanel.methods.triggerHook = async function (type) {
    if (this.panelData.hooks 
            && typeof(this.panelData.hooks[type]) === 'function') {
      await this.panelData.hooks[type](this.panelData.annotation)
      delete this.panelData.hooks[type]
    }
  }
}