// 這件事情不應該在這裡做，他應該在SearchManager做

export default (RangyManager) => {
  RangyManager.watch['status.search.keyword'] = function (keyword) {
    clearTimeout(this.searchResultTimer)
    this.searchResultTimer = setTimeout(() => {
      this.searchInArticle(keyword)
    }, 100)
  }
}
