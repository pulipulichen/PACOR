/* global this */

export default (List) => {
  List.methods.viewAnnotation = function (annotation) {
    this.annotation = annotation
  }

  List.methods.findUser = function (user) {
    if (!this.panelData.filter) {
      this.panelData.filter = {}
    }
    
    this.panelData.filter.user = user
    this.annotation = null
  }
  
  List.methods.clearFindUser = function () {
    this.panelData.filter.user = null
    this.annotation = null
  }

  List.methods.findType = function (type) {
    if (!this.panelData.filter) {
      this.panelData.filter = {}
    }
    
    //console.log(type)
    this.panelData.filter.type = type
    this.annotation = null
  }
  
  List.methods.clearFindType = function () {
    this.panelData.filter.type = null
    this.annotation = null
  }
  
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
  
  List.methods.clearFilter = function () {
    this.panelData.filter = null
    //console.log('clearFilter')
    this.annotation = null
  }
  
}