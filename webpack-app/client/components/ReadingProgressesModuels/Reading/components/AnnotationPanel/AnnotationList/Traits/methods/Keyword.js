/* global this */

export default (List) => {
  
  List.methods.findKeyword = function (keyword) {
    if (!this.panelData.query) {
      this.panelData.query = {}
    }
    
    this.panelData.query.keyword = keyword
    this.annotation = null
  }
  
  List.methods.clearFindKeyword = function () {
    this.panelData.query.keyword = null
    this.annotation = null
  }
  
}