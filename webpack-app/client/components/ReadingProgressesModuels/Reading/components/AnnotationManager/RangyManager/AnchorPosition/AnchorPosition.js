let AnchorPosition = {
  props: ['lib', 'status', 'config', 'rangy'],
  data() {
    return {
      articleNode: null,
      sectionNodes: null,
      paragraphNodes: null,
    }
  },
//  components: {
//  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this._initAnchorPosition()
  },
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
    _highlightToAnchorPosition (highlight) {
      let range = highlight.characterRange
      return {
        start_pos: range.start,
        end_pos: range.end,
        paragraph_id: highlight.containerElementId
      }
    },
    deserialize: function (highlightJSONArray, options) {
      // "type:textContent|28$198$2$confused-clarified$pacor-paragraph-id-2"
      if (typeof(highlightJSONArray) !== 'string') {
        highlightJSONArray = this._annotationToHighlighString(highlightJSONArray)
      }
      
      this.highlighter.deserializeAsync(highlightJSONArray, options)
      return this
    },
    deserializeAppend: function (highlightJSONArray) {
      return this.deserialize(highlightJSONArray, {
        append: true
      })
    },
  } // methods
}

export default AnchorPosition