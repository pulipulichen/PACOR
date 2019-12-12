/* global this */

export default (List) => {
    
  List.computed.hasKeywordFilter = function () {
    return (this.panelData.keyword
            && this.panelData.keyword !== '')
  }
  
  List.computed.querySummary = function () {
    let query = {
      ...this.query
    }

    delete query['excludeIDList']
    //console.log(query)
    return query
  }
}