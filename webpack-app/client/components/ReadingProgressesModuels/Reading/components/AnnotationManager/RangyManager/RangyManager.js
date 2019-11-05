//import rangy from 'rangy-updated'
import rangy from './rangy/rangy-webpack.js'
import $ from 'jquery'

let RangyManager = {
  props: ['lib', 'status', 'rangyConfig'],
  data() {
    //console.log(this.status)
    //this.$i18n.locale = this.config.locale
    return {
      //serializedHighlights: null,
      
      //articleSelector: this.status.readingConfig.articleSelector,
      //sectionSelector: this.status.readingConfig.sectionSelector,
      articleNode: null,
      sectionNodes: null,
      paragraphNodes: null,
      
      selectionApplier: null,
      selectionHighlighter: null,
      selection: null,
      selectionSaved: null,
      
      highlighter: null,
      highlightClasses: [],
      
      hoverHighlighter: null,
      hoverAnnotation: null,
      hoverAnnotationLock: false,
    }
  },  // data() {
  /*
  computed: {
  },  // computed: {
  watch: {
  },  // watch: {
   */
  mounted() {
    //console.log('ok')
    //console.log(rangy)
    //window.rangy = rangy
    this._initHighlighter()
    //console.log(rangy)
    
    //document.addEventListener('selectionchange', () => {
    //console.log(document.getSelection());
    //});
    this._initAnchorPosition()
    this._initOnSelectEventListener()
  },  // mounted() {
  methods: {
    _initAnchorPosition: function () {
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
        if (typeof(node.id) !== 'string' || node.id === '') {
          let id = 'pacor-paragraph-id-' + i
          node.setAttribute('id', id)
        }
      })
    },
    _initOnSelectEventListener: function () {
      
      let triggerSelect = () => {
        this.onselect()
      }
      
      document.addEventListener('touchend', triggerSelect)
      document.addEventListener('keyup', triggerSelect)
      document.addEventListener('mouseup', triggerSelect)
      document.addEventListener('mousedown', triggerSelect)
      
      this._initSelectionApplier()
    },
    onselect: function () {
      let selection = rangy.getSelection()
      if (selection.toString().length > 0) {
        let range = selection.getRangeAt(0).cloneRange()
        let rect = range.getBoundingDocumentRect()
        selection.rect = rect
        
        // 我想要知道它的id跟section做法
        selection.anchorPositions = []
        selection.anchorParagraphIds = []
        
        let nodes = this._getNodesInRange(selection.getAllRanges())
        //let nodes = [selection.anchorNode]
        
        
        //console.log(nodes)
        
        //let section_seq_id = []
        //let paragraph_seq_id = []
        //let paragraph_id = []
        
        nodes.forEach(anchorNode => {
          //let anchorNode = window.$(selection.anchorNode)
          let position = {}
          
          anchorNode = $(anchorNode)
          let parentSection = anchorNode.parents('[data-pacor-section-seq-id]:first')
          if (parentSection.length === 1) {
            //selection.anchorPosition.section_seq_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
            position.section_seq_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
            /*
            if (section_seq_id.indexOf(id) === -1) {
              section_seq_id.push(id)
            }
            */
            
          }
          else {
            // we will not select out of scope.
            return false
          }

          let parentParagraph = anchorNode.parents('[data-pacor-paragraph-seq-id]:first')
          if (parentParagraph.length === 1) {
            //selection.anchorPosition.paragraph_seq_id = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
            //selection.anchorPosition.paragraph_id = parentParagraph.attr('id')
            position.paragraph_seq_id = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
            //if (paragraph_seq_id.indexOf(seqID) === -1) {
            //  paragraph_seq_id.push(seqID)
            //}
            
            position.paragraph_id = parentParagraph.attr('id')
            selection.anchorParagraphIds.push(position.paragraph_id)
            //if (paragraph_id.indexOf(id) === -1) {
            //  paragraph_id.push(id)
            //}
          }
          else {
            // we will not select out of scope.
            return false
          }
          
          selection.anchorPositions.push(position)
        })  // nodes.forEach(anchorNode => {
        
        if (selection.anchorPositions.length === 0) {
          return false
        }
        
        this.$emit('select', selection)
        //console.log('onselect', selection)
        this.selection = selection
      }
      else {
        if (this.selection !== null) {
          this.selection = null
          this.$emit('selectcollapsed')
        }
      }
    },
    
    _getNextNode: function (node) {
      if (node.firstChild) {
          return node.firstChild;
        }
      while (node){
        if (node.nextSibling) {
          return node.nextSibling;
        }
        node = node.parentNode;
      }
    },
    
    _getNodesInRange: function (ranges) {
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
    },
    
    // ------------------------------------------------------
    
    _initSelectionApplier: function () {
      // Enable buttons
      let classApplierModule = rangy.modules.ClassApplier;

      // Next line is pure paranoia: it will only return false if the browser has no support for ranges,
      // selections or TextRanges. Even IE 5 would pass this test.
      if (rangy.supported && classApplierModule && classApplierModule.supported) {
        this.selectionApplier = rangy.createClassApplier("pacor-selection", {
          tagNames: ["span", "a", "b", "img"],
          ignoreWhiteSpace: true,
        })
        
        
        this.selectionHighlighter = rangy.createHighlighter()
        this.selectionHighlighter.addClassApplier(this.selectionApplier)
        
        let hoverApplier = rangy.createClassApplier("pacor-hover", {
          tagNames: ["span", "a", "b", "img"],
          ignoreWhiteSpace: true,
        })
        
        this.hoverHighlighter = rangy.createHighlighter()
        this.hoverHighlighter.addClassApplier(hoverApplier)
      }
    },
    
    pinSelection: function () {
      this.unpinSelection()
      if (this.selection === null 
              || Array.isArray(this.selection.anchorPositions) === false
              || Array.isArray(this.selection.anchorParagraphIds) === false) {
        return false
      }
      
      this.selectionSaved = rangy.saveSelection()
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
        
        let start_pos = h.characterRange.start
        let end_pos = h.characterRange.end
        position.start_pos = start_pos
        position.end_pos = end_pos
        
        let element = document.getElementById(h.containerElementId)
        //console.log(element, h.containerElementId, i)
        let anchor_text
        if (start_pos > 0) {
          anchor_text = element.innerText.slice(start_pos - 1, end_pos - 1)
        }
        else {
          anchor_text = element.innerText.slice(0, end_pos)
        }
        position.anchor_text = anchor_text
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
      this.selection.removeAllRanges()
      //this.selection = null
      
      return this.selection
    },
    unpinSelection : function (restoreSelection) {
      //console.trace('unpinSelection')
      this.selectionHighlighter.removeAllHighlights()
      window.$('.pacor-selection').removeClass('pacor-selection')
      
      
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
        let selection = rangy.getSelection()
        if (selection.toString().length === 0) {
          //console.log('是我嗎？')
          rangy.restoreSelection(this.selectionSaved)
          this.selectionSaved = null
        }
      }
      return this
    },
    highlightPinnedSelection: function (className, anchorParagraphIds) {
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
      let selection = rangy.getSelection()
      selection.removeAllRanges()
      
      this.selectionSaved = null
      this.unpinSelection()
      
      //this.selection.highlight = highlight
      
      //return this.selection
    },
    
    removeHighlightFromPinnedSelection: function (className) {
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
      this.selection.removeAllRanges()
      this.unpinSelection()
      
      this.selection.highlightClassName = className
      
      return this.selection
    },
    
    // -------------------
    
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
            event.stopPropagation()
            event.preventDefault()
          },
          onmouseover: function (event) {
            vm.$emit('highlightMouseover', vm._getAnchorPositionFromElement(this, event))
            
            event.stopPropagation()
            event.preventDefault()
          },
          onmouseout: function (event) {
            vm.$emit('highlightMouseout')
            
            event.stopPropagation()
            event.preventDefault()
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
    
    // -----------------------------------------------------------------
    
    hoverIn: function (annotation, doLock) {
      //console.log(disableHoverout)
      if (this.hoverAnnotation === annotation) {
        if (doLock !== true) {
          this.hoverOut()
        }
        this.hoverAnnotationLock = doLock
        return false
      }
      
      this.hoverOut()
      //console.log(annotation)
      let highlight = this._annotationToHighlighString(annotation, 'pacor-hover')
      //console.log(highlight)
      this.hoverHighlighter.deserialize(highlight)
      this.hoverAnnotation = annotation
      this.hoverAnnotationLock = doLock
      //console.log(this.hoverAnnotationLock)
      return this
    },
    hoverOut : function (doUnlock) {
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
    },
    
    // -----------------------------------------------------------------
    
    /**
     * highlightJSON = [
        {
          className: 'mainIdea',
          paragraphID: 'pacor-paragraph-id-1',
          start: 1,
          end: 5
        },
        {
          className: 'mainIdea',
          paragraphID: 'pacor-paragraph-id-2',
          start: 3,
          end: 7
        },
        {
          className: 'mainIdea',
          paragraphID: 'pacor-paragraph-id-0',
          start: 10,
          end: 15
        },
      ]
     */
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
    deserialize: function (highlightJSONArray) {
      // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
      if (typeof(highlightJSONArray) !== 'string') {
        highlightJSONArray = this._annotationToHighlighString(highlightJSONArray)
      }
      
      this.highlighter.deserializeAsync(highlightJSONArray, {
        append: true
      })
    }
  } // methods
}

export default RangyManager