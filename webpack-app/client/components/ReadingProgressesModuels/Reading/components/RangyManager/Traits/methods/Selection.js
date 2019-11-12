export default (RangyManager) => {
  RangyManager.methods._initOnSelectEventListener = function () {

    let triggerSelect = () => {
      setTimeout(() => {
        this.onselect()
      }, 0)
    }

    document.addEventListener('touchend', triggerSelect)
    document.addEventListener('keyup', triggerSelect)
    document.addEventListener('mouseup', triggerSelect)
    document.addEventListener('mousedown', triggerSelect)

    this._initSelectionApplier()
  }

  RangyManager.methods.onselect = function () {
    let selection = this.rangy.getSelection()
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

      //console.log(nodes)

      //let section_seq_id = []
      //let paragraph_seq_id = []
      //let paragraph_id = []

      nodes.forEach(anchorNode => {
        if (typeof (anchorNode.getAttribute) === 'function'
                && anchorNode.getAttribute('data-pacor-highlight') !== 'undefined') {
          anchorNode.classList.forEach(c => {
            if ((c.startsWith('my-') || c.endsWith('others-'))
                    && highlightClassList.indexOf(c) === -1) {
              highlightClassList.push(c)
            }
          })
        }


        //let anchorNode = window.$(selection.anchorNode)
        let position = {}

        anchorNode = $(anchorNode)

        // ------------------


        // ------------------

        let parentSection = anchorNode.parents('[data-pacor-section-seq-id]:first')
        if (parentSection.length === 1) {
          //selection.anchorPosition.section_seq_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
          position.section_seq_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
          /*
           if (section_seq_id.indexOf(id) === -1) {
           section_seq_id.push(id)
           }
           */

        } else {
          // we will not select out of scope.
          return false
        }

        let parentParagraph = anchorNode.parents('[data-pacor-paragraph-seq-id]:first')
        if (parentParagraph.length === 1) {
          //selection.anchorPosition.paragraph_seq_id = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
          //selection.anchorPosition.paragraph_id = parentParagraph.attr('id')
          position.seq_id = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
          //if (paragraph_seq_id.indexOf(seqID) === -1) {
          //  paragraph_seq_id.push(seqID)
          //}

          position.paragraph_id = parentParagraph.attr('id')
          selection.anchorParagraphIds.push(position.paragraph_id)
          //if (paragraph_id.indexOf(id) === -1) {
          //  paragraph_id.push(id)
          //}
        } else {
          // we will not select out of scope.
          return false
        }

        selection.anchorPositions.push(position)
      })  // nodes.forEach(anchorNode => {

      if (selection.anchorPositions.length === 0) {
        return false
      }

      selection.highlights = highlightClassList


      //this.$emit('select', selection)
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

  RangyManager.methods._initSelectionApplier = function () {
    // Enable buttons
    let classApplierModule = this.rangy.modules.ClassApplier

    // Next line is pure paranoia: it will only return false if the browser has no support for ranges,
    // selections or TextRanges. Even IE 5 would pass this test.
    if (this.rangy.supported && classApplierModule && classApplierModule.supported) {
      let options = {
        tagNames: ["span", "a", "b", "img"],
        ignoreWhiteSpace: true,
      }
      
      let selectionApplier = this.rangy.createClassApplier("pacor-selection", options)
      this.selectionHighlighter = this.rangy.createHighlighter()
      this.selectionHighlighter.addClassApplier(selectionApplier)

      let hoverApplier = this.rangy.createClassApplier("pacor-hover", options)
      this.hoverHighlighter = this.rangy.createHighlighter()
      this.hoverHighlighter.addClassApplier(hoverApplier)
      
      let rectApplier = this.rangy.createClassApplier("pacor-rect", options)
      this.rectHighlighter = this.rangy.createHighlighter()
      this.rectHighlighter.addClassApplier(rectApplier)
    }
  }

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

      position.start_pos = start_pos
      position.end_pos = end_pos
      position.anchor_text = anchor_text
      position.type = 'textContent'
      //console.log(anchor_text)
      //position.anchor_text = h.classApplier.toString()
    })
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
    return this
  }

  RangyManager.methods.getPinSelectionAnchorText = function () {
    let highlight = this.selectionHighlighter.highlights[0]
    //console.log(highlight)
    let { anchor_text } = this._getAnchorPositionFromHighlight(highlight)
    //console.log(anchor_text)
    return anchor_text
  }
  
}

