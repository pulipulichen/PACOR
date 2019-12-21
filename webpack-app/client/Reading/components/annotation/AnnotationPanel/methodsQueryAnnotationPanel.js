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
    //console.log(hooks)
    if (hooks) {
      this.panelData.hooks = hooks
      //console.log(this.panelData.hooks)
    }
    
    this.show()
  }
  
  AnnotationPanel.methods.focusCommentInput = function (annotation) {
    if (annotation) {
      this.setAnnotation(annotation)
    }
    setTimeout(() => {
      if (this.$refs.AnnotationSingle) {
        this.$refs.AnnotationSingle.focusCommentInput()
      }
      else {
        this.$refs.AnnotationList.focusCommentInput()
      }
    }, 0)
  }
  
  AnnotationPanel.methods.focusAnnotation = async function (annotationID) {
    if (typeof(annotationID) !== 'number') {
      throw new Error('annotationID is not a number. ' + annotationID)
    }
    
    // 先從commentID找回annotation
    let annotation = await this.lib.AxiosHelper.get('/client/Annotation/getAnnotation', {
      annotationID: annotationID
    })
    
    this.setAnnotation(annotation)
  }
  
  AnnotationPanel.methods.focusComment = async function (commentID) {
    if (typeof(commentID) !== 'number') {
      throw new Error('commentID is not a number. ' + commentID)
    }
    
    // 先從commentID找回annotation
    let annotation = await this.lib.AxiosHelper.get('/client/AnnotationComment/getAnnotation', {
      commentID: commentID
    })
    
    //console.log(annotation)
    
    //this.$refs.AnnotationSingle.focusComment(commentID)
    this.panelData.focusCommentID = commentID
    
    this.setAnnotation(annotation)
    
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
    this.panelData.keyword = ''
    this.lib.RangyManager.hoverOut(true)
  }
  
  AnnotationPanel.methods.triggerHook = async function (type) {
    //console.log(this.panelData.hooks)
    if (this.panelData.hooks 
            && typeof(this.panelData.hooks[type]) === 'function') {
      //console.log('呼叫')
      await this.panelData.hooks[type](this.panelData.annotation)
      //delete this.panelData.hooks[type]
      if (this.panelData.hooks
              && typeof(this.panelData.hooks) === 'object') {
        this.panelData.hooks[type] = null
      }
    }
  }
}