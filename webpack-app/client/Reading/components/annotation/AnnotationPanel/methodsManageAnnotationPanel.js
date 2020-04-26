export default (AnnotationPanel) => {
    
  AnnotationPanel.methods.deleteAnnotation = async function (annotation) {
    if (!annotation || typeof(annotation.id) !== 'number') {
      throw new Error('Annotation ID is not existed.')
    }

    let title = this.$t('Are you sure to delete this annotation?')
    let confirm = await this.lib.ConfirmModal.show(title)
    if (confirm === false) {
      return false
    }

    let data = {
      id: annotation.id
    }

    await this.lib.AxiosHelper.get('/client/AnnotationSave/destroy', data)

    await this.reloadMyHighlights(annotation)

    this.scrollToAnnotation(annotation)

    this.lib.AnnotationPanel.triggerEvent('delete')
    this.$emit('delete')
    
    return true
  }
  
  AnnotationPanel.methods.reloadMyHighlights = async function (annotation) {
    if (!this.lib.RangyManager) {
      return null
    }

    if (annotation.anchorPositions[0].type !== 'textContent') {
      // 如果不是網頁上的，則不重新整理
      return false
    }

    await this.lib.RangyManager.reloadMyHighlights()
  }
  
  AnnotationPanel.methods.scrollToAnnotation = async function (annotation) {
    let rect
    if (this.lib.AnnotationHelper.isPublicSectionAnnotation(annotation)) {
      rect = this.lib.RangyManager.getRectFromSectionAnnotation(annotation)
      //console.log('是', rect)
    }
    else {
      rect = this.lib.RangyManager.getRectFromAnchorPositions(annotation.anchorPositions)
      //console.log('不是', rect)
    }

    //console.log(rect)
    this.lib.AnnotationPanel.scrollToRect(rect)
  }
}