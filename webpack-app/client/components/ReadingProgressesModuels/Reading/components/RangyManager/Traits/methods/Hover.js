export default (RangyManager) => {
  RangyManager.methods.hoverIn = function (annotation, doLock) {
    //console.log(disableHoverout)
    if (this.hoverAnnotation === annotation) {
      if (doLock !== true) {
        this.hoverOut()
      }
      this.hoverAnnotationLock = doLock
      return false
    }

    this.hoverOut()
    //$('.rangySelectionBoundary').html('')
    //this.unpinSelection()
    //annotation = this._adjustPositionWithPinnedSelection(annotation)
    //console.log(annotation)
    setTimeout(() => {
      let highlight = this._annotationToHighlighString(annotation, 'pacor-hover')
      //console.log(highlight)
      this.hoverHighlighter.deserialize(highlight)
      this.hoverAnnotation = annotation
      this.hoverAnnotationLock = doLock
    }, 0)

    //console.log(this.hoverAnnotationLock)
    return this
  }

  RangyManager.methods.hoverOut = function (doUnlock) {
    if (doUnlock === true) {
      this.hoverAnnotationLock = false
    }

    if (this.hoverAnnotationLock === true) {
      return false
    }
    //console.trace('hoverOut')
    this.hoverHighlighter.removeAllHighlights()
    this.hoverAnnotation = null
    return this
  }

  RangyManager.methods.getHoverAnchorText = function () {
    let highlight = this.hoverHighlighter.highlights[0]
    let { anchor_text } = this._getAnchorPositionFromHighlight(highlight)
    return anchor_text
  }
}

