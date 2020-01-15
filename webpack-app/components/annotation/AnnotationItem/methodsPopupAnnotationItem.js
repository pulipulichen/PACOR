import $ from 'jquery'

export default function (AnnotationItem) {
  AnnotationItem.methods.popupUser = function (user, event) {
    this.lib.tippy.popupUser(this, user, event)
  }
}