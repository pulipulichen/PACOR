/* global this */

export default (List) => {

  List.computed.annotationsIDList = function () {
    if (Array.isArray(this.annotations)) {
      return this.annotations.map(a => a.id)
    } else {
      return []
    }
  }
}