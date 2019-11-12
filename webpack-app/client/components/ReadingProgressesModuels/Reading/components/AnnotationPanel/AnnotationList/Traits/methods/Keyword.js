/* global this */

export default (List) => {
  
  List.methods.findKeyword = function (keyword) {
    
    this.panelData.keyword = keyword
    this.annotation = null
  }
  
  List.methods.clearFindKeyword = function () {
    this.panelData.keyword = null
    this.annotation = null
  }
  
}