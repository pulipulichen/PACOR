export default function (StyleManager) {
  
  StyleManager.computed.isLeftHanded = function () {
    if (this.status.preference
            && this.status.preference.leftHanded) {
      return this.status.preference.leftHanded
    }
    return false
  } // StyleManager.computed.isLeftHanded = function () {

  StyleManager.computed.isEnableAnimate = function () {
    if (this.status.preference
            && this.status.preference.enableAnimate) {
      return this.status.preference.enableAnimate
    }
    return true
  } // StyleManager.computed.isEnableAnimate = function () {
}