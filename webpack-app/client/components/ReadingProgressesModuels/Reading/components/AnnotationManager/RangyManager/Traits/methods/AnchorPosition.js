export default (RangyManager) => {

  RangyManager.methods._initAnchorPosition = function () {
    for (let i = 0; i < this.rangyConfig.articleSelector.length; i++) {
      let node = $(this.rangyConfig.articleSelector[i])
      if (node.length > 0) {
        this.articleNode = node
        break
      }
    }

    if (this.articleNode === null) {
      //console.warn('Cannot found any article node.')
      throw this.$t('Cannot found any article node.')
      return false
    }

    let children = this.articleNode.children()
    for (let i = 0; i < this.rangyConfig.sectionSelector.length; i++) {
      let nodes = children.filter(this.rangyConfig.sectionSelector[i])
      if (nodes.length > 0) {
        this.sectionNodes = nodes
        break
      }
    }

    if (this.sectionNodes === null) {
      //console.warn('Cannot found any article node.')
      throw this.$t('Cannot found any section node.')
      return false
    }

    this.sectionNodes.each((i, node) => {
      //node = window.$(node)
      //node.attr('data-pacor-section-seq-id', i)

      node.setAttribute('data-pacor-section-seq-id', i)
    })

    this.sectionNodes.children().each((i, node) => {
      //node = window.$(node)
      //node.attr('data-pacor-section-seq-id', i)

      node.setAttribute('data-pacor-paragraph-seq-id', i)
      //console.log(typeof(node.id), node.id)
      if (typeof (node.id) !== 'string' || node.id === '') {
        let id = 'pacor-paragraph-id-' + i
        node.setAttribute('id', id)
      }
    })
  }

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

//  RangyManager.methods._adjustPositionWithPinnedSelection = function (annotation) {
//    if (this.isPinned === false) {
//      return annotation
//    }
//
//    //console.log('hoverIn', annotation.anchorPositions[0])
//    //let shift = this.isPinned ? 1 : 0
//    //console.log(shift)
//    let pinHighlights = this.selectionHighlighter.highlights
//    annotation.anchorPositions = annotation.anchorPositions.map(pos => {
//      pinHighlights.forEach(pin => {
//        pin = this._highlightToAnchorPosition(pin)
//        //console.log(pos)
//        //console.log(pin)
//        if (pin.paragraph_id !== pos.paragraph_id) {
//          return false
//        }
//
//        if (pos.start_pos > pin.start_pos
//                && pos.end_pos < pin.end_pos) {
//          // 包含的狀態
//          pos.start_pos = pos.start_pos + 1
//          pos.end_pos = pos.end_pos + 1
//        } else if (pos.end_pos === pin.end_pos) {
//          pos.start_pos = pos.start_pos + 1
//          pos.end_pos = pos.end_pos + 2
//        } else if (pos.end_pos === pin.start_pos
//                || pos.end_pos === pin.start_pos + 1) {
//          pos.end_pos = pos.end_pos + 1
//        } else if (pos.start_pos === pin.start_pos + 1) {
//          pos.end_pos = pos.end_pos + 2
//        }
//      })
//      return pos
//    })
//
//    return annotation
//  }

}

