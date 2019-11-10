export default (RangyManager) => {
  RangyManager.watch['status.search.keyword'] = function (keyword) {
    clearTimeout(this.searchResultTimer)
    this.searchResultTimer = setTimeout(() => {
      this.searchInArticle(keyword)
    }, 100)
  }
}
