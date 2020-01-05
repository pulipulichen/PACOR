export default function (StyleManager) {
  
  StyleManager.methods.scrollTo = function (options) {
    window.scrollTo(options)
  }
  
  StyleManager.methods.scrollIntoView = function (elemenet, options) {
    element.scrollIntoView(options)
  }
}