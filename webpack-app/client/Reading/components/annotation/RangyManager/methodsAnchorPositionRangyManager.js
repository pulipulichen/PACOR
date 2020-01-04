import $ from 'jquery'

export default (RangyManager) => {

  RangyManager.methods._getAnchorPositionFromElement = function (element, event) {
    let highlights = this.highlighter.getHighlightsForElement(element)
    if (highlights === null) {
      return null
    }
    
    // --------------------
    
    // 只取最短的那一個highlights
    let highlight
    let highlightLength
    highlights.forEach(hl => {
      let text = hl.getText()
      //console.log({text})
      if (!highlight
              || highlightLength > text.length) {
        highlight = hl
        highlightLength = text.length
      }
    })
    
    if (!highlight) {
      return undefined
    }
    
    //window.hl = highlight
    //console.log(highlight.getText())
    
    // --------------------

    let pidJSON = {}
    //highlights.forEach(highlight => {
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
    //})

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
              || typeof(pos.start_pos) !== 'number' 
              || typeof(pos.end_pos) !== 'number' ) {
        throw new Error('Anchor Positions is not well defined.\n' 
                + JSON.stringify(pos, null, 2))
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
    if (!anchorPositions 
            || Array.isArray(anchorPositions) === false
            || anchorPositions.length === 0) {
      return undefined
    }
    
    if (anchorPositions[0].type === 'section') {
      return this.getRectFromSection(anchorPositions[0].section_id)
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
  
  RangyManager.methods.getSectionAnnotationElement = function (annotation) {
    if (!annotation) {
      return undefined
    }
    
    let id = annotation.id
    let element = $(`.SectionPanel > .SectionAnnotationList .AnnotationItem[data-annotation-id="${id}"]:first`)
    if (element.length === 0) {
      return undefined
    }
    
    return element
  }
  
  RangyManager.methods.getRectFromSectionAnnotation = function (annotation) {
    let element = this.getSectionAnnotationElement(annotation)
    if (!element) {
      return undefined
    }
    
    let offset = element.offset()
    let width = element.width()
    let height = element.height()
    let rect = {
      bottom: (offset.top + height),
      height,
      left: offset.left,
      right: (offset.left + width),
      top: offset.top,
      width
    }
    
    rect.middle = rect.top + (rect.height / 2)
    rect.center = rect.left + (rect.width / 2)
    //console.log(rect)
    //rect.top = rect.top - 50
    return rect
  }
  
  RangyManager.methods.getAnchorPositionsFromSelection = function (selection) {
    if (!selection) {
      return null
      //selection = this.selection
    }
    
    //console.log(selectionSaved)
    
    //console.log(selection.anchorPositions)
    
    let highlights = this.rectHighlighter.highlightSelection('pacor-rect', {
      exclusive: false,
      containerElementId: selection.anchorParagraphIds
    })
    
    let anchorPositions = []
    //console.log(highlights)
    
    highlights.forEach(highlight => {
      let paragraph_id = highlight.containerElementId
      
      for (let i = 0; i < selection.anchorPositions.length; i++) {
        let position = selection.anchorPositions[i]
        if (position.paragraph_id === paragraph_id) {
          let pos = this._getAnchorPositionFromHighlight(highlight)
          let { start_pos, end_pos, anchor_text } = pos

          position.start_pos = start_pos
          position.end_pos = end_pos
          position.anchor_text = anchor_text
          position.type = 'textContent'
          //console.log(anchor_text)
          //position.anchor_text = h.classApplier.toString()

          anchorPositions.push(position)
          break
        }
      }
    })
    
    selection.anchorPositions = anchorPositions
    //console.log(anchorPositions)
    
    let selectionSaved = this.rangy.saveSelection()
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
    if (!section) {
      return undefined
    }
    
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

