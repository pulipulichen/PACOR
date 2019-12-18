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
            && typeof(this.status.preference.EInkMode) === 'boolean' ) {
      return !this.status.preference.EInkMode
    }
    return true
  } // StyleManager.computed.isEnableAnimate = function () {
  
  StyleManager.computed.params = function () {
    return this.config.styleConfig
  }
}