let Highlight = {
  props: ['lib', 'status', 'config', 'rangy'],
  data() {
    return {
      highlighter: null,
      highlightClasses: [],
    }
  },
//  components: {
//  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this._initHighlighter()
  },
  methods: {
    _getAnchorPositionFromElement (element, event) {
      let highlights = this.highlighter.getHighlightsForElement(element)
      if (highlights === null) {
        return null
      }
      
      let pidJSON = {}
      highlights.forEach(highlight => {
        let start_pos = highlight.characterRange.start
        let end_pos = highlight.characterRange.end
        let paragraph_id = highlight.containerElementId
        
        if (typeof(pidJSON[paragraph_id]) === 'undefined') {
          pidJSON[paragraph_id] = {
            start_pos,
            end_pos,
            paragraph_id
          }
        }
        else {
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
    },
    
    _initHighlighter: function () {
      if (typeof(this.rangyConfig.annotationTypeModules) !== 'object') {
        return false
      }
      let rules = []
      rangy.init()
      this.highlighter = rangy.createHighlighter()
      
      window.hl = this.highlighter  // @TODO for test
      
      let vm = this
      let options = {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a", "b", "img"],
        elementAttributes: {
          'data-pacor-highlight': ''
        },
        elementProperties: {
          onclick: function (event) {
            let pos = vm._getAnchorPositionFromElement(this, event)
            //console.log(pos)
            vm.$emit('highlightClick', pos)
            //event.stopPropagation()
            //event.preventDefault()
          },
          onmouseover: function (event) {
            vm.$emit('highlightMouseover', vm._getAnchorPositionFromElement(this, event))
            
            //event.stopPropagation()
            //event.preventDefault()
          },
          onmouseout: function (event) {
            vm.$emit('highlightMouseout')
            //event.stopPropagation()
            //event.preventDefault()
          }
        }
      }
      
      let ownerClasses = ['my', 'others']
      ownerClasses.forEach(ownerClass => {
        for (let moduleName in this.rangyConfig.annotationTypeModules) {
          let className = ownerClass + '-' + moduleName
          let applier = rangy.createClassApplier(className, options)
          this.highlighter.addClassApplier(applier);
          this.highlightClasses.push(className)

          // 如果有css style的話
          let config = this.rangyConfig.annotationTypeModules[moduleName]
          if (typeof(config.style) === 'object'
                  && typeof(config.style.highlight) === 'object'
                  && typeof(config.style.highlight[ownerClass]) === 'string') {
            let rule = config.style.highlight[ownerClass]
            //console.log(rule)
            if (typeof(rule) === 'string') {
              let selector = `[data-pacor-section-seq-id] [data-pacor-paragraph-seq-id] .${className}`
              rules.push(`${selector} {${rule}}`)
            }
          }
        } // for (let className in this.rangyConfig.annotationTypeModules) {
      })
      
      if (rules.length > 0) {
        let sheet
        if (window.document.styleSheets.length > 0) {
          sheet = window.document.styleSheets[0]
        }
        else {
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
      
    },
    _getAnchorPositionFromHighlight (highlight) {
      if (highlight === undefined) {
        return ''
      }
      let start_pos = highlight.characterRange.start
      let end_pos = highlight.characterRange.end

      let element = document.getElementById(highlight.containerElementId)
      //console.log(element, h.containerElementId, i)
      let anchor_text
      if (start_pos > 0) {
        //anchor_text = element.innerText.slice(start_pos - 1, end_pos - 1)
        anchor_text = element.innerText.slice(start_pos, end_pos)
      }
      else {
        anchor_text = element.innerText.slice(0, end_pos - 1)
      }
      return {
        start_pos,
        end_pos,
        anchor_text
      }
    },
    highlightPinnedSelection: function (className, anchorParagraphIds, doUnpin) {
      if (this.highlightClasses.indexOf(className) === -1
              || this.selectionSaved === null) {
        return false
      }
      
      
      //let sel = rangy.getSelection()
      //let id = window.$(sel.anchorNode).parents("[data-pacor-paragraph-seq-id]:first").prop('id')
      //return
      //toggleItalicYellowBg();
      //let ids = JSON.parse(JSON.stringify(this.selection.anchorPosition.paragraph_id))
      //console.log(this.selection.anchorPosition.paragraph_id)
      
      /*
      let highlights = []
      
      let loop = (i) => {
        console.log(i, ids.length)
        rangy.restoreSelection(this.selectionSaved)
        if (i < ids.length) {
          let id = ids[i]
          console.log(id)
          let highlight = this.highlighter.highlightSelection(className, {
            exclusive: false,
            containerElementId: id,
            selection: this.selection
          })
          highlights = highlights.concat(highlight)
          this.selection.removeAllRanges()
          setTimeout(function () {
            loop(i+1)
          }, 500)
          return
        }
        else {
          console.log(highlights)

          //console.log(className)
          this.selection.removeAllRanges()
          this.unpinSelection()

          this.selection.highlight = highlights
        }
      }
      loop(0)
      */
      /*
      this.selection.anchorPosition.paragraph_id.forEach(id => {
        console.log(id, className)
        let highlight = this.highlighter.highlightSelection(className, {
          exclusive: false,
          containerElementId: id
        })
        highlights = highlights.concat(highlight)
      })
        
      console.log(highlights)
      
      //console.log(className)
      this.selection.removeAllRanges()
      this.unpinSelection()
      
      this.selection.highlight = highlights
      
      return this.selection
       */
      
      //let ids = JSON.parse(JSON.stringify(this.selection.anchorPosition.paragraph_id))
      
      rangy.restoreSelection(this.selectionSaved)
      
      this.highlighter.highlightSelection(className, {
        exclusive: false,
        containerElementId: anchorParagraphIds
      })
      //console.log(highlight[0])
      
      if (doUnpin !== false) {
        let selection = rangy.getSelection()
        selection.removeAllRanges()

        this.selectionSaved = null
        this.unpinSelection()
      }
      
      //this.selection.highlight = highlight
      
      //return this.selection
    },
    
    removeMyHighlights () {
      
      this.highlighter.highlights = this.highlighter.highlights.filter(hl => {
        let className = hl.classApplier.className
        if (className.startsWith('my-')) {
          hl.unapply()
          return false
        }
        else {
          return true
        }
      })
      
    },
    
    removeHighlightByAnnotation (annotation) {
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
      
      this.highlighter.highlights = this.highlighter.highlights.filter(hl => (highlightsToRemove.indexOf(hl) === -1))
      
      this.unpinSelection()
      this.hoverOut(true)
    },
    
    removeHighlightFromPinnedSelection: function (className) {
      //console.log([this.highlightClasses.indexOf(className), this.selectionSaved])
      if (this.highlightClasses.indexOf(className) === -1
              || this.selectionSaved === null) {
        return false
      }
      
      rangy.restoreSelection(this.selectionSaved);
      //let sel = rangy.getSelection()
      //let id = window.$(sel.anchorNode).parents("[data-pacor-paragraph-seq-id]:first").prop('id')
      //return
      //toggleItalicYellowBg();
      
      //let highlight = this.highlighter.getHighlightForElement(this.selection)
      //highlight.removeHighlights( [className] )
      
      //console.log(className)
      this.highlighter.unhighlightSelection( [className] )
      
      //console.log(className)
      if (this.selection !== null) {
        this.selection.removeAllRanges()
      }
      this.unpinSelection()
      
      //this.selection.highlightClassName = className
      
      //return this.selection
      return this
    },
    _annotationToHighlighString (annotations, type) {
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
          }
          else {
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
    },
    // -------------------
  } // methods
}

export default Highlight