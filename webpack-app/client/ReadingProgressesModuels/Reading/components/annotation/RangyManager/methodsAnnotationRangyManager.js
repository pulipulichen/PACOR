export default (RangyManager) => {

  RangyManager.methods.highlightPinnedSelectionFromAnnotation = function (annotation) {
    if (annotation.anchorPositions[0].type !== 'textContent') {
      return null
    }
    
    let anchorParagraphIds = annotation.anchorPositions.map(pos => {
      return pos.paragraph_id
    })
    
    
    this.highlightPinnedSelection('my-' + annotation.type, anchorParagraphIds)
    
    //let serilized = this.getSerializedHighlightsFromAnnotation(annotation)
    //this.deserializeAppend(serilized)
  }

  RangyManager.methods.getSerializedHighlightsFromAnnotation = function (annotation) {
    let highlightType = this.lib.AnnotationHelper.highlightType(annotation)
    return this.getSerializedHighlightsFromAnchorPositions(highlightType, annotation.anchorPositions)
  }

  RangyManager.methods.getSerializedHighlightsFromAnchorPositions = function (type, anchorPositions) {
    let highlightJSONArray = anchorPositions.map((pos, i) => {
        return [
          pos.start_pos,
          pos.end_pos,
          (i+1),
          type,
          pos.paragraph_id
        ].join('$')
      })
      
    highlightJSONArray.unshift('type:textContent')
    return highlightJSONArray.join('|')
  }
}

