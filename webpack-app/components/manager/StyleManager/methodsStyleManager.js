export default function (StyleManager) {
    
  StyleManager.methods.isStackWidth = function () {
    let StackWidth = this.config.StackWidth
    return (window.innerWidth < StackWidth)
  }
  
  StyleManager.methods.isSmallHeight = function () {
    return (window.innerHeight < this.config.SmallHeight)
  }
  
  StyleManager.methods.getClientHeight = function (unit) {
    let height = window.innerHeight

    if (typeof (unit) === 'string') {
      height = height + unit
    }

    return height
  } // StyleManager.methods.getClientHeight = function (unit) {
}