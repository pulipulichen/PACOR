import $ from 'jquery'

export default (RangyManager) => {
    
  RangyManager.methods._initHighlighter = function () {
    
    if (typeof (this.rangyConfig.annotationTypeModules) !== 'object') {
      return false
    }
    
    let rules = []

    this.highlighter = this.rangy.createHighlighter()

    //window.hl = this.highlighter  // @TODO for test

    let vm = this
        
    let lock = {}
    let triggerEvent = (ele, event, type) => {
      if (lock[type] && lock[type] === true) {
        return null
      }
            
      let pos = this._getAnchorPositionFromElement(ele, event)
      
      if (!pos) {
        return null
      }
      
      lock[type] = true
      //console.log(type)
      this.triggerEvent(type, pos)
      setTimeout(() => {
        lock[type] = false
      }, 0)
    }
    
    let options = {
      ignoreWhiteSpace: true,
      tagNames: ["span", "a", "b", "img"],
      elementAttributes: {
        'data-pacor-highlight': ''
      },
      elementProperties: {
        onclick: function (event) {
          triggerEvent(this, event, 'highlightClick')
        },
        ontouch: function (event) {
          triggerEvent(this, event, 'highlightClick')
        },
        onmouseover: function (event) {
          triggerEvent(this, event, 'highlightMouseover')
        },
        onmouseout: function (event) {
          triggerEvent(this, event, 'highlightMouseout')
        },
        onmousedown: function (event) {
          triggerEvent(this, event, 'highlightMousedown')
        },
        onmousemove: function (event) {
          triggerEvent(this, event, 'highlightMousemove')
        },
        onmouseup: function (event) {
          triggerEvent(this, event, 'highlightMouseup')
        },
        ontouchstart: function (event) {
          triggerEvent(this, event, 'highlightMousedown')
        },
        ontouchend: function (event) {
          triggerEvent(this, event, 'highlightMouseup')
        },
      }
    } // let options = {

    let ownerClasses = ['my', 'others']
    ownerClasses.forEach(ownerClass => {
      for (let moduleName in this.rangyConfig.annotationTypeModules) {
        let className = ownerClass + '-' + moduleName
        let applier = this.rangy.createClassApplier(className, options)
        this.highlighter.addClassApplier(applier);
        this.highlightClasses.push(className)

        // 如果有css style的話
        let config = this.rangyConfig.annotationTypeModules[moduleName]
        if (typeof (config.style) === 'object'
                && typeof (config.style.highlight) === 'object'
                && typeof (config.style.highlight[ownerClass]) === 'string') {
          let rule = config.style.highlight[ownerClass]
          //console.log(rule)
          if (typeof (rule) === 'string') {
            let selector = `[data-pacor-section-seq-id] [data-pacor-paragraph-seq-id] .${className}`
            rules.push(`${selector} {${rule}}`)
          }
        }
      } // for (let className in this.rangyConfig.annotationTypeModules) {
    })

    this._setupHighlightSheetRule(rules)
  } // RangyManager.methods._initHighlighter = function () {
  
  RangyManager.methods._setupHighlightSheetRule = function (rules) {
    if (rules.length > 0) {
      let sheet
      if (window.document.styleSheets.length > 0) {
        sheet = window.document.styleSheets[0]
      } else {
        sheet = document.createElement("style")
        sheet.type = "text/css"
        document.head.appendChild(sheet)
      }

      rules.reverse()
      rules.forEach(rule => {
        //console.log(rule)
        sheet.insertRule(rule, sheet.cssRules.length)
      })
    } // if (rules.length > 0) {
  }
  
  RangyManager.methods._getAnchorPositionFromHighlight = function (highlight) {
    if (highlight === undefined) {
      return undefined
    }
    let start_pos = highlight.characterRange.start
    let end_pos = highlight.characterRange.end

    let element = document.getElementById(highlight.containerElementId)
    //console.log(element, h.containerElementId, i)
    let anchor_text
    if (start_pos > 0) {
      //anchor_text = element.innerText.slice(start_pos - 1, end_pos - 1)
      anchor_text = element.innerText.slice(start_pos, end_pos)
    } else {
      anchor_text = element.innerText.slice(0, end_pos)
    }
    return {
      start_pos,
      end_pos,
      anchor_text
    }
  }
  
  RangyManager.methods.highlightPinnedSelection = function (className, anchorParagraphIds, doUnpin) {
    //console.log(className)
    if (this.highlightClasses.indexOf(className) === -1
            || this.selectionSaved === null) {
      return false
    }
    
    this.rangy.restoreSelection(this.selectionSaved)

    this.highlighter.highlightSelection(className, {
      exclusive: false,
      containerElementId: anchorParagraphIds
    })
    
    //console.log(highlight[0])

    if (doUnpin !== false) {
      let selection = this.rangy.getSelection()
      selection.removeAllRanges()

      this.selectionSaved = null
      this.unpinSelection()
    }

    return this
  }

  RangyManager.methods.removeMyHighlights = function () {
    this.highlighter.highlights = this.highlighter.highlights.filter(hl => {
      let className = hl.classApplier.className
      if (className.startsWith('my-')) {
        hl.unapply()
        return false
      } else {
        return true
      }
    })
  }
  
  RangyManager.methods.removeOthersHighlights = function () {
    this.highlighter.highlights = this.highlighter.highlights.filter(hl => {
      let className = hl.classApplier.className
      if (className.startsWith('others-')) {
        hl.unapply()
        return false
      } else {
        return true
      }
    })
  }
  
  RangyManager.methods.removeHighlights = function () {
    //this.highlighter.deserialize('type:textContent|')
    this.highlighter.removeAllHighlights()
    //console.log(this.highlighter.highlights.length)
  }
  
  RangyManager.methods.removeHighlightByAnnotation = function (annotation) {
    let type = this.lib.auth.getHighlightAnnotationType(annotation)
    if (this.highlightClasses.indexOf(type) === -1) {
      return false
    }

    //let range = this.highlighter.highlights[0].getRange().cloneRange()
    //window.range = range // for test

    //console.log(type)
    let highlightsToRemove = []

    this.highlighter.highlights.forEach(hl => {
      let range = hl.characterRange
      //console.log(range)
      let className = hl.classApplier.className
      //console.log(className, type)
      for (let i = 0; i < annotation.anchorPositions.length; i++) {
        let pos = annotation.anchorPositions[i]
        //console.log(pos)
        if (type === className
                && hl.containerElementId === pos.paragraph_id
                && range.start === pos.start_pos
                && range.end === pos.end_pos) {
          hl.unapply()
          highlightsToRemove.push(hl)
          // 然後要把這個從highlights中移除
          break
        }
      }
    })

    this.highlighter.highlights = this.highlighter.highlights.filter(hl => {
      return (highlightsToRemove.indexOf(hl) === -1)
    })

    this.unpinSelection()
    this.hoverOut(true)
  }

  RangyManager.methods.removeHighlightFromPinnedSelection = function (className) {
    //console.log([this.highlightClasses.indexOf(className), this.selectionSaved])
    if (this.highlightClasses.indexOf(className) === -1
            || this.selectionSaved === null) {
      return false
    }

    this.rangy.restoreSelection(this.selectionSaved);
    //let sel = rangy.getSelection()
    //let id = window.$(sel.anchorNode).parents("[data-pacor-paragraph-seq-id]:first").prop('id')
    //return
    //toggleItalicYellowBg();

    //let highlight = this.highlighter.getHighlightForElement(this.selection)
    //highlight.removeHighlights( [className] )

    //console.log(className)
    this.highlighter.unhighlightSelection([className])

    //console.log(className)
    if (this.selection !== null) {
      this.selection.removeAllRanges()
    }
    this.unpinSelection()

    //this.selection.highlightClassName = className

    //return this.selection
    return this
  }
  
  RangyManager.methods._highlightToAnchorPosition = function (highlight) {
    let range = highlight.characterRange
    return {
      start_pos: range.start,
      end_pos: range.end,
      paragraph_id: highlight.containerElementId
    }
  }

  RangyManager.methods._annotationToHighlighString = function (annotations, type) {
    if (annotations === null || annotations === undefined) {
      return ''
    }

    if (Array.isArray(annotations) === false) {
      annotations = [annotations]
    }

    let highlightJSONArray = []
    let id = 0
    annotations.forEach((annotation) => {
      if (type === undefined) {
        type = annotation.type
        if (annotation.user_id === this.status.userID) {
          type = 'my-' + type
        } else {
          type = 'others-' + type
        }
      }

      annotation.anchorPositions.forEach(pos => {
        id++
        highlightJSONArray.push([
          pos.start_pos,
          pos.end_pos,
          id,
          type,
          pos.paragraph_id
        ].join('$'))
      })
    })
    highlightJSONArray.unshift('type:textContent')
    highlightJSONArray = highlightJSONArray.join('|')

    return highlightJSONArray
  }

  RangyManager.methods.deserialize = async function (highlightJSONArray, options) {
    // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
    if (typeof (highlightJSONArray) !== 'string') {
      highlightJSONArray = this._annotationToHighlighString(highlightJSONArray)
    }

    this.highlighter.deserializeAsync(highlightJSONArray, options)
    return this
  }

  RangyManager.methods.deserializeAppend = async function (highlightJSONArray) {
    return await this.deserialize(highlightJSONArray, {
      append: true
    })
  }
  
}

