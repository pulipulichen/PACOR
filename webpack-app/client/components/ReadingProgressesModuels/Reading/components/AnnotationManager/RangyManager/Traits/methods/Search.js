export default (RangyManager) => {
  RangyManager.methods._initSearch = function () {
    var classApplierModule = this.rangy.modules.ClassApplier;
    if (!(this.rangy.supported && classApplierModule && classApplierModule.supported)) {
      return false
    }

    this.searchResultApplier = this.rangy.createClassApplier("pacor-search-result")
  }

  RangyManager.methods.searchInArticle = function (searchTerm) {
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

    this.$('.pacor-search-result').removeClass('pacor-search-result')
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
}

