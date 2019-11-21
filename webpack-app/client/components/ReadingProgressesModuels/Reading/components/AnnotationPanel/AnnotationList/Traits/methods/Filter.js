/* global this */

export default (List) => {
  List.methods.viewAnnotation = function (annotation) {
    this.annotation = annotation
  }

  List.methods.findUser = function (user) {
    if (!this.panelData.filter) {
      this.panelData.filter = {}
    }
    
    //this.panelData.filter.user = user
    if (!this.panelData.filter) {
      this.$set(this.panelData, 'filter', {})
    }
    this.$set(this.panelData.filter, 'user', user)
    this.annotation = null
  }
  
  List.methods.clearFindUser = function () {
    this.panelData.filter.user = null
    this.annotation = null
    
    this.$forceUpdate()
  }

  List.methods.findType = function (type) {
    //if (!this.panelData.filter) {
    //  this.panelData.filter = {}
    //}
    
    //console.log(type)
    if (!this.panelData.filter) {
      this.$set(this.panelData, 'filter', {})
    }
    this.$set(this.panelData.filter, 'type', type)
    //this.panelData.filter.type = type
    this.annotation = null
  }
  
  List.methods.clearFindType = function () {

    this.panelData.filter.type = null
    this.annotation = null
    //console.log(this.panelData.filter)
    
    this.$forceUpdate()
  }
  
  List.methods.findKeyword = function (keyword) {
    this.panelData.keyword = keyword
    this.annotation = null
  }
  
  List.methods.clearFindKeyword = function () {
    this.panelData.keyword = null
    this.annotation = null
  }
  
  List.methods.clearFilter = function () {
    if (this.panelData.filter) {
      this.panelData.filter.user = null
      this.panelData.filter.type = null
    }
    
    this.annotation = null
    //console.log('clearFilter', this.panelData.filter)
    this.$forceUpdate()
  }
  
}