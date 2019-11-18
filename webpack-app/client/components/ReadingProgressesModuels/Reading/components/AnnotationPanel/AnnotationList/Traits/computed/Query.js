/* global this */

export default (List) => {
    
  List.computed.hasKeywordFilter = function () {
    return (this.panelData.keyword
            && this.panelData.keyword !== '')
  }
  
}