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
  }
  
  List.methods.clearFindUser = function () {
    this.panelData.filter.user = null
  }

  List.methods.findType = function (type) {
    if (!this.panelData.filter) {
      this.panelData.filter = {}
    }
    
    this.panelData.filter.type = type
  }
  
  List.methods.clearFindType = function () {
    this.panelData.filter.type = null
  }
  
  List.methods.findKeyword = function (keyword) {
    if (!this.panelData.filter) {
      this.panelData.filter = {}
    }
    
    this.panelData.filter.keyword = keyword
  }
  
  List.methods.clearFindKeyword = function () {
    this.panelData.filter.keyword = null
  }
  
  List.methods.clearFilter = function () {
    this.panelData.filter = {}
  }
  
}