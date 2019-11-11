/* global this */

export default (List) => {
  List.methods.viewAnnotation = function (annotation) {
    this.annotation = annotation
  }

  List.methods.findUser = function (user) {
    this.panel.filter.user = user
  }
  
  List.methods.clearFindUser = function () {
    this.panel.filter.user = null
  }

  List.methods.findType = function (type) {
    this.panel.filter.type = type
  }
  
  List.methods.clearFindType = function () {
    this.panel.filter.type = null
  }
  
  List.methods.clearFilter = function () {
    this.panel.filter = {}
  }
  
}