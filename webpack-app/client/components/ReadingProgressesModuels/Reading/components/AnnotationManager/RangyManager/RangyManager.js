//import rangy from 'rangy-updated'
import rangy from './rangy/rangy-webpack.js'
let RangyManager = {
  props: ['lib', 'rangyConfig'],
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
      highlightClasses: []
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
        let node = window.$(this.rangyConfig.articleSelector[i])
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
        selection.anchorPosition = {}
        
        // 我放棄，只取第一個
        let nodes = this._getNodesInRange(selection.getAllRanges())
        //let nodes = [selection.anchorNode]
        
        
        //console.log(nodes)
        let section_seq_id = []
        let paragraph_seq_id = []
        let paragraph_id = []
        
        nodes.forEach(anchorNode => {
          //let anchorNode = window.$(selection.anchorNode)
          anchorNode = window.$(anchorNode)
          let parentSection = anchorNode.parents('[data-pacor-section-seq-id]:first')
          if (parentSection.length === 1) {
            //selection.anchorPosition.section_seq_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
            let id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
            if (section_seq_id.indexOf(id) === -1) {
              section_seq_id.push(id)
            }
          }
          else {
            // we will not select out of scope.
            return false
          }

          let parentParagraph = anchorNode.parents('[data-pacor-paragraph-seq-id]:first')
          if (parentParagraph.length === 1) {
            //selection.anchorPosition.paragraph_seq_id = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
            //selection.anchorPosition.paragraph_id = parentParagraph.attr('id')
            let seqID = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
            if (paragraph_seq_id.indexOf(seqID) === -1) {
              paragraph_seq_id.push(seqID)
            }
            
            let id = parentParagraph.attr('id')
            if (paragraph_id.indexOf(id) === -1) {
              paragraph_id.push(id)
            }
          }
          else {
            // we will not select out of scope.
            return false
          }
        })
        
        if (section_seq_id.length === 0 || paragraph_seq_id.length === 0) {
          return false
        }
        
        selection.anchorPosition = {
          section_seq_id,
          paragraph_seq_id,
          paragraph_id
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
      }
    },
    
    pinSelection: function (scrollOptions) {
      this.unpinSelection()
      if (this.selection === null 
              || Array.isArray(this.selection.anchorPosition.paragraph_seq_id) === false
              || this.selection.anchorPosition.paragraph_seq_id.length === 0) {
        return false
      }
      
      this.selectionSaved = rangy.saveSelection()
      //console.log(this.selectionSaved)
      //let range = this.selection.saveRanges()
      //console.log(range)
      //console.log(this.selection.getRangeAt(0))
      
      //this.selectionApplier.toggleSelection(window, 'pacor-paragraph-id-0')
      let highlight = this.selectionHighlighter.highlightSelection('pacor-selection', {
        exclusive: false,
        containerElementId: this.selection.anchorPosition.paragraph_id
      })
      
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
      //window.$('.pacor-selection').removeClass('pacor-selection')
      this.selectionHighlighter.removeAllHighlights()
      
      
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
      
      if (restoreSelection === true && this.selectionSaved !== null) {
        let selection = rangy.getSelection()
        if (selection.toString().length === 0) {
          rangy.restoreSelection(this.selectionSaved)
        }
      }
      return this
    },
    highlightPinnedSelection: function (className) {
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
      let highlight = this.highlighter.highlightSelection(className, {
        exclusive: false,
        containerElementId: this.selection.anchorPosition.paragraph_id
      })
      //console.log(highlight[0])
      this.selection.removeAllRanges()
      this.unpinSelection()
      
      this.selection.highlight = highlight
      
      return this.selection
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
    
    _initHighlighter: function () {
      if (typeof(this.rangyConfig.annotationTypeModules) !== 'object') {
        return false
      }
      let rules = []
      rangy.init()
      this.highlighter = rangy.createHighlighter()
      window.hl = this.highlighter
      
      let options = {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a", "b", "img"]
      }
      for (let className in this.rangyConfig.annotationTypeModules) {
        let applier = rangy.createClassApplier(className, options)
        this.highlighter.addClassApplier(applier);
        this.highlightClasses.push(className)
        
        // 如果有css style的話
        if (typeof(this.rangyConfig.annotationTypeModules[className].style) === 'object'
                && typeof(this.rangyConfig.annotationTypeModules[className].style.highlight) === 'string') {
          let rule = this.rangyConfig.annotationTypeModules[className].style.highlight
          if (typeof(rule) === 'string') {
            let selector = `[data-pacor-section-seq-id] [data-pacor-paragraph-seq-id] .${className}`
            rules.push(`${selector} {${rule}}`)
          }
        }
      }
      
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
      }
      
    },
    
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
    deserialize: function (highlightJSONArray) {
      // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
      if (Array.isArray(highlightJSONArray)) {
        highlightJSONArray = highlightJSONArray.map((json, id) => {
          return [
            json.start,
            json.end,
            id,
            json.className,
            json.paragraphID
          ].join('$')
        })
        highlightJSONArray.unshift('type:textContent')
        highlightJSONArray = highlightJSONArray.join('|')
      }
      
      this.highlighter.deserialize(highlightJSONArray)
    }
  } // methods
}

export default RangyManager