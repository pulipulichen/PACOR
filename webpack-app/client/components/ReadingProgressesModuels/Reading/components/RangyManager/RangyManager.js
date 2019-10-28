//import rangy from 'rangy-updated'
import rangy from './rangy/rangy-webpack.js'

/*
let highlighter
function gEBI(id) {
  return document.getElementById(id);
}

var italicYellowBgApplier, boldRedApplier, pinkLinkApplier;

function toggleItalicYellowBg() {
  var sel = rangy.getSelection();
  console.log(sel.anchorOffset)
  italicYellowBgApplier.toggleSelection();
}

function toggleBoldRed() {
  boldRedApplier.toggleSelection();
}

function togglePinkLink() {
  pinkLinkApplier.toggleSelection();
}
*/
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
      
      document.addEventListener('touchend', () => {
        this.onselect()
      })
      
      let timer = null
      document.addEventListener('selectionchange', () => {
        if (timer !== null) {
          clearTimeout(timer)
        }
        
        timer = setTimeout(() => {
          this.onselect()
          timer = null
        }, 200)
      })
      
      document.addEventListener('keyup', (event) => {
        if (event.shiftKey === true 
                && [37,38,39,40].indexOf(event) > -1) {
          this.onselect()
        }
      })
      
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
        let anchorNode = window.$(selection.anchorNode)
        
        let parentSection = anchorNode.parents('[data-pacor-section-seq-id]:first')
        if (parentSection.length === 1) {
          selection.anchorPosition.section_seq_id = parseInt(parentSection.attr('data-pacor-section-seq-id'), 10)
        }
        else {
          // we will not select out of scope.
          return false
        }
        
        let parentParagraph = anchorNode.parents('[data-pacor-paragraph-seq-id]:first')
        if (parentParagraph.length === 1) {
          selection.anchorPosition.paragraph_seq_id = parseInt(parentParagraph.attr('data-pacor-paragraph-seq-id'), 10)
          selection.anchorPosition.paragraph_id = parentParagraph.attr('id')
        }
        else {
          // we will not select out of scope.
          return false
        }
        
        this.$emit('select', selection)
        console.log('onselect', selection)
        this.selection = selection
      }
    },
    
    _initSelectionApplier: function () {
      // Enable buttons
      let classApplierModule = rangy.modules.ClassApplier;

      // Next line is pure paranoia: it will only return false if the browser has no support for ranges,
      // selections or TextRanges. Even IE 5 would pass this test.
      if (rangy.supported && classApplierModule && classApplierModule.supported) {
        this.selectionApplier = rangy.createClassApplier("pacor-selection", {
          tagNames: ["span", "a", "b", "img"]
        })
      }
    },
    
    pinSelection: function () {
      this.unpinSelection()
      if (this.selection === null 
              || typeof(this.selection.anchorPosition.paragraph_seq_id) !== 'number') {
        return false
      }
      
      this.selectionSaved = rangy.saveSelection()
      
      //let range = this.selection.saveRanges()
      //console.log(range)
      //console.log(this.selection.getRangeAt(0))
      
      this.selectionApplier.toggleSelection()
      this.selection.removeAllRanges()
      //this.selection = null
      
      return this
    },
    unpinSelection : function () {
      window.$('.pacor-selection').removeClass('pacor-selection')
      return this
    },
    highlightPinnedSelection: function (className) {
      if (this.highlightClasses.indexOf(className) === -1
              || this.selectionSaved === null) {
        return false
      }
      
      rangy.restoreSelection(this.selectionSaved);
      //let sel = rangy.getSelection()
      //let id = window.$(sel.anchorNode).parents("[data-pacor-paragraph-seq-id]:first").prop('id')
      //return
      //toggleItalicYellowBg();
      this.highlighter.highlightSelection(className, {
        exclusive: false,
        containerElementId: this.selection.anchorPosition.paragraph_id
      });
      //console.log(className)
      this.selection.removeAllRanges()
      this.unpinSelection()
      
      this.selection.highlightClassName = className
      
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
      let options = {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a", "b", "img"]
      }
      for (let className in this.rangyConfig.annotationTypeModules) {
        let applier = rangy.createClassApplier(className, options)
        this.highlighter.addClassApplier(applier);
        this.highlightClasses.push(className)
        
        // 如果有css style的話
        let rule = this.rangyConfig.annotationTypeModules[className].style
        if (typeof(rule) === 'string') {
          let selector = `[data-pacor-section-seq-id] [data-pacor-paragraph-seq-id] .${className}`
          rules.push(`${selector} {${rule}}`)
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
      
      
      /*
      highlighter.addClassApplier(rangy.createClassApplier("highlight", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a", "b", "img"],
        elementProperties: {
              //href: "#",
              onclick: function() {
                  let highlight = highlighter.getHighlightForElement(this);
                  console.log(highlight)
                  return
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
          }
      }));

      highlighter.addClassApplier(rangy.createClassApplier("note", {
          ignoreWhiteSpace: true,
          elementTagName: "span",
          elementProperties: {
              //href: "#",
              onclick: function() {
                  let highlight = highlighter.getHighlightForElement(this);
                  console.log(highlight)
                  return
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
          }
      }))
      */
       //if (this.serializedHighlights) {
       //   highlighter.deserialize(this.serializedHighlights);
       //}
       /*
       
    
            // Enable buttons
            var classApplierModule = rangy.modules.ClassApplier;

            // Next line is pure paranoia: it will only return false if the browser has no support for ranges,
            // selections or TextRanges. Even IE 5 would pass this test.
            if (rangy.supported && classApplierModule && classApplierModule.supported) {
                boldRedApplier = rangy.createClassApplier("boldRed", {
                    tagNames: ["span", "img"]
                });

                italicYellowBgApplier = rangy.createClassApplier("italicYellowBg", {
                    tagNames: ["span", "a", "b", "img"]
                });

                pinkLinkApplier = rangy.createClassApplier("pinkLink", {
                    elementTagName: "a",
                    elementProperties: {
                        href: "http://code.google.com/p/rangy",
                        title: "Rangy home page"
                    }
                });
                
                highlighter.addClassApplier(boldRedApplier)
                highlighter.addClassApplier(italicYellowBgApplier)
            }
        */
    },
    /*
    highlightSelectedText: function () {
      var sel = rangy.getSelection();
      //console.log(sel)
      let id = window.$(sel.anchorNode).parents("[id^='p']").prop('id')
      //return
      //toggleItalicYellowBg();
      highlighter.highlightSelection("highlight", {
        exclusive: false,
        containerElementId: id
      });
      console.log(highlighter.serialize())
      //$$.cookie(_get_cookie_key(), highlighter.serialize(), {expires: _cookie_expire }); 
      sel = rangy.getSelection();
      sel.removeAllRanges();
    },
    note: function () {
      var sel = rangy.getSelection();
      //console.log(window.$(sel.anchorNode).offset())
      var range = sel.getRangeAt(0).cloneRange();
      var rect = range.getBoundingDocumentRect();
      console.log("y pos:" + rect.top, rect)
      
      let id = window.$(sel.anchorNode).parents("[id^='p']").prop('id')
      //toggleBoldRed();
      highlighter.highlightSelection("note", {
        exclusive: false,
        containerElementId: id
      });
      let hl = highlighter.highlights
      console.log(hl[(hl.length - 1)].characterRange)
      console.log(highlighter.serialize())
      //$$.cookie(_get_cookie_key(), highlighter.serialize(), {expires: _cookie_expire }); 
      //var sel = rangy.getSelection();
      sel.removeAllRanges();
    }
     */
  } // methods
}

export default RangyManager