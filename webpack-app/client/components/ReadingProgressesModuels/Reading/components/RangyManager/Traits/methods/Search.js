export default (RangyManager) => {
  RangyManager.methods._initSearch = function () {
    var classApplierModule = this.rangy.modules.ClassApplier;
    if (!(this.rangy.supported && classApplierModule && classApplierModule.supported)) {
      return false
    }

    this.searchResultApplier = this.rangy.createClassApplier("pacor-search-result")
  }

  let range
  let searchScopeRange
  let sections
  let options

  RangyManager.methods.searchInArticle = async function (searchTerm) {
    
    //await this.lib.VueHelper.sleep(1000)
    
    //range.selectNodeContents(node);
    //this.searchResultApplier.undoToRange(range);

    this.jquery('.pacor-search-result').removeClass('pacor-search-result')
    if (searchTerm === "") {
      //this.searchResultApplier.detach()
      //console.log('移除嗎？')
      return false
    }
    
    // ---------------
    
    if (!range) {
      range = this.rangy.createRange()
      searchScopeRange = this.rangy.createRange()
      sections = this.articleNode.find('[data-pacor-section-seq-id]')
      
      options = {
        caseSensitive: false,
        wholeWordsOnly: false,
        withinRange: searchScopeRange,
        direction: "forward" // This is redundant because "forward" is the default
      }
      this._initSearch() 
    }

    //searchScopeRange.selectNodeContents(document.body);
    
    //console.log(this.articleNode.length)
    //let node = this.articleNode[0]
    sections.each((i, node) => {
      console.log('==========================================')
      console.log(i, node)
      
      //node = document.body
      range.selectNodeContents(node)
      
      // Iterate over matches
      while (range.findText(searchTerm, options)) {
        // range now encompasses the first text match
        this.searchResultApplier.applyToRange(range)
        // Collapse the range to the position immediately after the match
        range.collapse(false)
      }
    })

  }
}

