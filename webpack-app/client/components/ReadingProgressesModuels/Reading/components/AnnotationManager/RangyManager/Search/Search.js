import $ from 'jquery'

let Search = {
  props: ['lib', 'status', 'config', 'rangy'],
  data() {
    return {
      searchResultApplier: null,
      searchResultTimer: null
    }
  },
//  components: {
//  },
//  computed: {
//  },
  watch: {
    'status.search.keyword' (keyword) {
      clearTimeout(this.searchResultTimer)
      this.searchResultTimer = setTimeout(() => {
        this.searchInArticle(keyword)
      }, 100)
    }
  },
  mounted() {
    this._initSearch()
  },
  methods: {
    _initSearch () {
      var classApplierModule = this.rangy.modules.ClassApplier;
      if (!(this.rangy.supported && classApplierModule && classApplierModule.supported)) {
        return false
      }
      
      this.searchResultApplier = this.rangy.createClassApplier("pacor-search-result")
    },
    searchInArticle (searchTerm) {
      var range = this.rangy.createRange();
      var searchScopeRange = this.rangy.createRange();
      
      //searchScopeRange.selectNodeContents(document.body);
      let node = this.articleNode[0]
      //let node = document.body
      range.selectNodeContents(node);

      var options = {
          caseSensitive: false,
          wholeWordsOnly: false,
          withinRange: searchScopeRange,
          direction: "forward" // This is redundant because "forward" is the default
      };

      range.selectNodeContents(node);
      //this.searchResultApplier.undoToRange(range);
      
      $('.pacor-search-result').removeClass('pacor-search-result')
      if (searchTerm === "") {
        //this.searchResultApplier.detach()
        //console.log('移除嗎？')
        return false
      }

      // Iterate over matches
      while (range.findText(searchTerm, options)) {
        // range now encompasses the first text match
        this.searchResultApplier.applyToRange(range)
        // Collapse the range to the position immediately after the match
        range.collapse(false);
      }
    }
  } // methods
}

export default Search