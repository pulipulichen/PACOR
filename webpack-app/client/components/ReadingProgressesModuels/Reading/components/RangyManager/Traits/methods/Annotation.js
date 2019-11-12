export default (RangyManager) => {

  RangyManager.methods.highlightPinnedSelectionFromAnnotation = function (annotation) {
    if (annotation.anchorPositions[0].type !== 'textContent') {
      return null
    }
    
    let anchorParagraphIds = annotation.anchorPositions.map(pos => {
      return pos.paragraph_id
    })
    this.highlightPinnedSelection('my-' + annotation.type, anchorParagraphIds)
  }

}

