import rangy from './../../../vendors/rangy/rangy-webpack.js'
let highlighter

let RangyManager = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {
    this.$i18n.locale = this.config.locale
    return {
      serializedHighlights: null
    }
  },  // data() {
  computed: {
  },  // computed: {
  watch: {
  },  // watch: {
  mounted() {
    window.rangy = rangy
    this.initHighlighter()
    //console.log(rangy)
  },  // mounted() {
  methods: {
    initHighlighter: function () {
      rangy.init()
      highlighter = rangy.createHighlighter()

      highlighter.addClassApplier(rangy.createClassApplier("highlight", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"],
        elementProperties: {
              href: "#",
              onclick: function() {
                  let highlight = highlighter.getHighlightForElement(this);
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
          }
      }));

      highlighter.addClassApplier(rangy.createClassApplier("note", {
          ignoreWhiteSpace: true,
          elementTagName: "a",
          elementProperties: {
              href: "#",
              onclick: function() {
                  let highlight = highlighter.getHighlightForElement(this);
                  if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                      highlighter.removeHighlights( [highlight] );
                  }
                  return false;
              }
          }
      }))
      
       if (this.serializedHighlights) {
          highlighter.deserialize(this.serializedHighlights);
       }
    },
    highlightSelectedText: function () {
      highlighter.highlightSelection("highlight");
      console.log(highlighter.serialize())
      //$$.cookie(_get_cookie_key(), highlighter.serialize(), {expires: _cookie_expire }); 
      var sel = rangy.getSelection();
      sel.removeAllRanges();
    }
  } // methods
}

export default RangyManager