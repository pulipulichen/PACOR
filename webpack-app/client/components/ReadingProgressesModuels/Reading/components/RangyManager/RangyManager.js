//import rangy from 'rangy-updated'
import rangy from './rangy/rangy-webpack.js'

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

let RangyManager = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {
    //this.$i18n.locale = this.config.locale
    return {
      serializedHighlights: null
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
    this.initHighlighter()
    //console.log(rangy)
    
    
  },  // mounted() {
  methods: {
    initHighlighter: function () {
      rangy.init()
      highlighter = rangy.createHighlighter()

      highlighter.addClassApplier(rangy.createClassApplier("highlight", {
        ignoreWhiteSpace: true,
        tagNames: "span",
        elementProperties: {
              //href: "#",
              /*
              onclick: function() {
                  let highlight = highlighter.getHighlightForElement(this);
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
              */
          }
      }));

      highlighter.addClassApplier(rangy.createClassApplier("note", {
          ignoreWhiteSpace: true,
          elementTagName: "span",
          elementProperties: {
              //href: "#",
              /*
              onclick: function() {
                  let highlight = highlighter.getHighlightForElement(this);
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
               */
          }
      }))
      
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
       * 
        */
    },
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
  } // methods
}

export default RangyManager