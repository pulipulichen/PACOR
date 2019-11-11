export default (List) => {
  List.methods.viewAnnotation = function (annotation) {
    this.annotation = annotation
  }

  List.methods.findUser = function (user) {
    this.panel.filter.user = user
  }

  List.methods.findType = function (type) {
    this.panel.filter.type = type
  }
  
  List.methods.resetFilter = function () {
    this.panel.filter = {}
  }
}