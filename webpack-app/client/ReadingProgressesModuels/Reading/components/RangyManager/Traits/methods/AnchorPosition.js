export default (RangyManager) => {

  RangyManager.methods._getAnchorPositionFromElement = function (element, event) {
    let highlights = this.highlighter.getHighlightsForElement(element)
    if (highlights === null) {
      return null
    }

    let pidJSON = {}
    highlights.forEach(highlight => {
      let start_pos = highlight.characterRange.start
      let end_pos = highlight.characterRange.end
      let paragraph_id = highlight.containerElementId

      if (typeof (pidJSON[paragraph_id]) === 'undefined') {
        pidJSON[paragraph_id] = {
          start_pos,
          end_pos,
          paragraph_id
        }
      } else {
        if (start_pos < pidJSON[paragraph_id].start_pos) {
          pidJSON[paragraph_id].start_pos = start_pos
        }
        if (end_pos > pidJSON[paragraph_id].end_pos) {
          pidJSON[paragraph_id].end_pos = end_pos
        }
      }
    })

    let output = []
    for (let key in pidJSON) {
      output.push(pidJSON[key])
    }
    return {
      anchorPositions: output,
      event: event
    }
  }

  RangyManager.methods.getAnchorTextArrayFromAnnotation = function (annotation) {
    return annotation.anchorPositions.map(pos => {
      if (pos.anchor_text) {
        return pos.anchor_text
      }
      
      if (!pos.paragraph_id 
              || !pos.start_pos 
              || !pos.end_pos) {
        throw 'Anchor Positions is not well defined.'
      }
      
      let {start_pos, end_pos, paragraph_id} = pos

      let element = document.getElementById(paragraph_id)
      //console.log(element, h.containerElementId, i)
      let anchor_text
      if (start_pos > 0) {
        //anchor_text = element.innerText.slice(start_pos - 1, end_pos - 1)
        anchor_text = element.innerText.slice(start_pos, end_pos)
      } else {
        anchor_text = element.innerText.slice(0, end_pos - 1)
      }
      
      pos.anchor_text = anchor_text
      
      return anchor_text
    })
  }
  
  RangyManager.methods.getAnchorTextFromSelection = function () {
    return this.rangy.getSelection().toString()
  }
  
  RangyManager.methods.getRectFromAnchorPositions = function (anchorPositions) {
    if (anchorPositions[0].type === 'section') {
      return this.getRectFromSection(anchorPositions[0].seq_id)
    }
    
    let selectionSaved = this.rangy.saveSelection()
    // 先把位置資訊變成字串
    let highlightJSONArray = anchorPositions.map((pos, i) => {
        return [
          pos.start_pos,
          pos.end_pos,
          (i+1),
          'pacor-rect',
          pos.paragraph_id
        ].join('$')
      })
      
    highlightJSONArray.unshift('type:textContent')
    let highlightString = highlightJSONArray.join('|')
    
    this.rectHighlighter.deserialize(highlightString)
    
    //window.rl = this.rectHighlighter
    //console.log('@TODO 這裡可能有錯')
    let range = this.rectHighlighter.highlights[0].getRange()
    let rect = range.getBoundingDocumentRect()
    
    this.rectHighlighter.removeAllHighlights()
    this.rangy.restoreSelection(selectionSaved)
    return rect
  }
  
  RangyManager.methods.getAnchorPositionsFromSelection = function (selection) {
    let selectionSaved = this.rangy.saveSelection()
    //console.log(selectionSaved)
    
    //console.log(selection.anchorPositions)
    let highlights = this.rectHighlighter.highlightSelection('pacor-rect', {
      exclusive: false,
      containerElementId: this.selection.anchorParagraphIds
    })
    
    selection.anchorPositions.forEach((position, i) => {
      let h = highlights[i]
      let { start_pos, end_pos, anchor_text } = this._getAnchorPositionFromHighlight(h)

      position.start_pos = start_pos
      position.end_pos = end_pos
      position.anchor_text = anchor_text
      position.type = 'textContent'
      //console.log(anchor_text)
      //position.anchor_text = h.classApplier.toString()
    })
    
    this.rectHighlighter.removeAllHighlights()
    //throw '有嗎'
    this.rangy.restoreSelection(selectionSaved)
    //throw '有嗎'
    
    return selection.anchorPositions
  }
  
  RangyManager.methods.getRectFromSection = function (seq_id) {
    let selector = `[data-pacor-section-seq-id="${seq_id}"]`
    //console.log(selector)
    let section = document.querySelector(selector)
    
    return {
      top: section.offsetTop,
      height: section.offsetHeight,
      bottom: section.offsetTop + section.offsetHeight,
      
      left: section.offsetLeft,
      width: section.offsetWidth,
      right: section.offsetLeft + section.offsetWidth,
      
      center: (section.offsetLeft + (section.offsetWidth / 2)),
      middle: (section.offsetTop + (section.offsetHeight / 2))
    }
  }
}
