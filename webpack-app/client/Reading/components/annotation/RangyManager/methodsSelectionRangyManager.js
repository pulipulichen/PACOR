import $ from 'jquery'

export default (RangyManager) => {
  
  RangyManager.methods.onselect = function () {
    let selection = this.rangy.getSelection()
    
    //this.lastSelectionSaved = this.rangy.saveSelection()
    //this.rangy.restoreSelection(this.lastSelectionSaved)
    
    //PACORTestManager.log(selection.toString().length, selection.isCollapsed)
    
    if (selection.toString().length > 0 && selection.isCollapsed === false) {
      let range = selection.getRangeAt(0).cloneRange()
      let rect = range.getBoundingDocumentRect()
      selection.rect = rect

      // 我想要知道它的id跟section做法
      selection.anchorPositions = []
      selection.anchorParagraphIds = []

      let nodes = this._getNodesInRange(selection.getAllRanges())
      //let nodes = [selection.anchorNode]
      //console.log(nodes)
      let highlightClassList = []

      //PACORTestManager.log(nodes.length)
      //console.log(nodes)

      //let section_seq_id = []
      //let paragraph_seq_id = []
      //let paragraph_id = []

      //console.log({nodes})
      nodes.forEach(anchorNode => {
        
        if (typeof (anchorNode.getAttribute) === 'function'
                && anchorNode.getAttribute('data-pacor-highlight') !== 'undefined') {
          //console.log({anchorNode})
          anchorNode.classList.forEach(c => {
            if ((c.startsWith('my-') || c.startsWith('others-'))
                    && highlightClassList.indexOf(c) === -1) {
              highlightClassList.push(c)
            }
          })
        }
        
        if (typeof (anchorNode.getAttribute) === 'function'
                || typeof(anchorNode.wholeText) !== 'string'
                || anchorNode.wholeText.trim().length === 0) {
          //PACORTestManager.log('nodes.forEach(anchorNode)', 'typeof (anchorNode.getAttribute)')
          return false
        }
        
        //window.an = anchorNode
        //console.log(anchorNode.wholeText.trim().length, anchorNode)

        //let anchorNode = window.$(selection.anchorNode)
        let position = {}

        anchorNode = $(anchorNode)
        //PACORTestManager.log('anchorNode', anchorNode.attr('data-pacor-section-seq-id'))
        // ------------------


        // ------------------

        let parentSection
        if (anchorNode.attr('data-pacor-section-seq-id') !== undefined) {
          parentSection = anchorNode
        }
        else {
          parentSection = anchorNode.parents('[data-pacor-section-seq-id]:first')
        }
        
        //PACORTestManager.log('parentSection', parentSection.length)
        
        if (parentSection.length === 1) {
          //selection.anchorPosition.section_seq_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
          
          //position.section_seq_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
          position.section_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
        } else {
          // we will not select out of scope.
          //PACORTestManager.log('nodes.forEach(anchorNode)', '1 we will not select out of scope.')
          return false
        }
        
        // ------------------------------------

        let parentParagraph
        if (anchorNode.attr('data-pacor-paragraph-seq-id') !== undefined) {
          parentParagraph = anchorNode
        }
        else {
          parentParagraph = anchorNode.parents('[data-pacor-paragraph-seq-id]:first')
        }
        //console.log(parentParagraph)
        
        if (parentParagraph.length === 1) {
          //selection.anchorPosition.paragraph_seq_id = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
          //selection.anchorPosition.paragraph_id = parentParagraph.attr('id')
          
          position.seq_id = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
          
          //if (paragraph_seq_id.indexOf(seqID) === -1) {
          //  paragraph_seq_id.push(seqID)
          //}

          position.paragraph_id = parentParagraph.attr('id')
          //console.log(position.paragraph_id)
          
          if (selection.anchorParagraphIds.indexOf(position.paragraph_id) > -1) {
            // 同一個段落，不加入
            return false
          }
          
          selection.anchorParagraphIds.push(position.paragraph_id)
          //if (paragraph_id.indexOf(id) === -1) {
          //  paragraph_id.push(id)
          //}
        } else {
          // we will not select out of scope.
          //PACORTestManager.log('nodes.forEach(anchorNode)', '2 we will not select out of scope.')
          return false
        }

        selection.anchorPositions.push(position)
      })  // nodes.forEach(anchorNode => {
      
      //console.log(selection.anchorPositions)
      
      //PACORTestManager.log(selection.anchorPositions, selection.anchorPositions.length)

      if (selection.anchorPositions.length === 0) {
        //console.log('selection.anchorPositions.length === 0')
        return false
      }

      selection.highlights = highlightClassList


      //this.$emit('select', selection)
      //console.log(selection.anchorPositions)
      //return
      
      //console.log('select', selection.anchorPositions)
      
      //PACORTestManager.log('triggerEvent')
      
      /**
       * For test 20191204
       */
      //if (selection.anchorPositions.length > 1) {
      //  throw new Error('selection.anchorPositions.length > 1', selection.anchorPositions)
      //}
      
      //console.log(selection, selection.highlights.length)
      this.triggerEvent('select', selection)

      //console.log(highlightClassList)
      //console.log('onselect', this.highlighter.getHighlightsForElement(selection.getRangeAt(0)))
      this.selection = selection
      
      
    } else {
      if (this.selection !== null) {
        this.selection = null
        //this.$emit('selectcollapsed')
        this.triggerEvent('selectcollapsed')
      }
    }
  }

  RangyManager.methods._getNextNode = function (node) {
    if (node.firstChild) {
      return node.firstChild;
    }
    while (node) {
      if (node.nextSibling) {
        return node.nextSibling;
      }
      node = node.parentNode;
    }
  }
  
//  RangyManager.methods.restoreLastSelection = function () {
//    if (this.isSelecting() === false) {
//      this.rangy.restoreSelection(this.lastSelectionSaved)
//    }
//  }
  
  RangyManager.methods._getNodesInRange = function (ranges) {
    let nodes = []

    if (Array.isArray(ranges) === false) {
      ranges = [ranges]
    }

    ranges.forEach(range => {
      var start = range.startContainer;
      var end = range.endContainer;
      var commonAncestor = range.commonAncestorContainer;

      var node;

      // walk parent nodes from start to common ancestor
      for (node = start.parentNode; node; node = node.parentNode) {
        nodes.push(node)
        if (node === commonAncestor) {
          break
        }
      }
      nodes.reverse()

      // walk children and siblings from start until end is found
      for (node = start; node; node = this._getNextNode(node)) {
        nodes.push(node)
        if (node === end)
          break
      }
    })

    return nodes;
  }

  // ------------------------------------------------------

  
  RangyManager.methods.pinSelection = function () {
    this.unpinSelection()
    if (this.selection === null
            || Array.isArray(this.selection.anchorPositions) === false
            || Array.isArray(this.selection.anchorParagraphIds) === false) {
      return false
    }

    this.selectionSaved = this.rangy.saveSelection()
    //console.log(this.selectionSaved)
    //.log(this.selection.getAllRanges())

    //console.log(this.selectionSaved)
    //let range = this.selection.saveRanges()
    //console.log(range)
    //console.log(this.selection.getRangeAt(0))

    //this.selectionApplier.toggleSelection(window, 'pacor-paragraph-id-0')
    let highlights = this.selectionHighlighter.highlightSelection('pacor-selection', {
      exclusive: false,
      containerElementId: this.selection.anchorParagraphIds
    })

    // 在這裡為它們加上文字如何？
    //console.log(highlights)
    this.selection.anchorPositions.forEach((position, i) => {
      let h = highlights[i]
      let { start_pos, end_pos, anchor_text } = this._getAnchorPositionFromHighlight(h)
      //console.log(anchor_text)
      position.start_pos = start_pos
      position.end_pos = end_pos
      position.anchor_text = anchor_text
      position.type = 'textContent'
      //console.log(anchor_text)
      //position.anchor_text = h.classApplier.toString()
    })
    
    //this.selection.anchorPositions = this.selection.anchorPositions.filter(position => (typeof(position.start_pos) === 'number') )
    //console.log(this.selection.anchorPositions)

    //console.log(highlight)
    //console.log(this.selectionHighlighter.serialize())
    //console.log(this.highlighter.serialize())


    /*
     if (typeof(scrollOptions) === 'object') {
     if (typeof(scrollOptions.delay) === 'number') {
     setTimeout(() => {
     rangy.restoreSelection(this.selectionSaved)
     this.selection.anchorNode.scrollIntoView(scrollOptions)
     this.selection.removeAllRanges()
     }, scrollOptions.delay)
     }
     else {
     this.selection.anchorNode.scrollIntoView(scrollOptions)
     }
     }
     */
    //console.log('pinSelection', this.selection.anchorPositions[0])
    this.selection.removeAllRanges()
    //this.selection = null


    console.log('pinSelection', this.selection.anchorPositions)
    return this.selection
  }


  RangyManager.methods.unpinSelection = function (restoreSelection) {
    //console.trace('unpinSelection')
    this.selectionHighlighter.removeAllHighlights()
    this.jquery('.pacor-selection').removeClass('pacor-selection')
    this.hoverOut(true)

    /*
     if (typeof(scrollOptions) === 'object') {
     if (typeof(scrollOptions.delay) === 'number') {
     setTimeout(() => {
     rangy.restoreSelection(this.selectionSaved)
     this.selection.anchorNode.scrollIntoView(scrollOptions)
     this.selection.removeAllRanges()
     }, scrollOptions.delay)
     }
     else {
     this.selection.anchorNode.scrollIntoView(scrollOptions)
     }
     }*/

    //console.log(restoreSelection, this.selectionSaved)
    if (restoreSelection === true && this.selectionSaved !== null) {
      let selection = this.rangy.getSelection()
      if (selection.toString().length === 0) {
        //console.log('是我嗎？')
        this.rangy.restoreSelection(this.selectionSaved)
        this.selectionSaved = null
      }
    }
    
    console.trace('unpinSelection')
    return this
  }

  RangyManager.methods.getPinSelectionAnchorText = function () {
    let highlight = this.selectionHighlighter.highlights[0]
    //console.log(highlight)
    if (!highlight) {
      return this.getAnchorTextFromSelection()
    }
    
    let { anchor_text } = this._getAnchorPositionFromHighlight(highlight)
    //console.log(anchor_text)
    return anchor_text
  }
  
  RangyManager.methods.cancelSelection = function () {
    this.rangy.getSelection().removeAllRanges()
    this.triggerEvent('selectcollapsed')
  }
  
  RangyManager.methods.isSelecting = function () {
    //console.log(this.rangy.getSelection().toString())
    return (this.rangy.getSelection().toString() !== '')
  }
  
  RangyManager.methods.getSelectionRect = async function () {
    let sel = await this.lib.RangyManager.rangy.getSelection()
    let range = sel.getRangeAt(0).cloneRange()
    let rect = range.getBoundingDocumentRect()
    //let rect = range.getBoundingClientRect()
    
    return rect
  }
}

