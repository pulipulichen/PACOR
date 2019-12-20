export default (Editor) => {
  Editor.computed.computedButtonsClass = function () {
    let vm = this
    if (vm.lib.style.isLeftHanded === false) {
      return 'right aligned column'
    } else {
      return 'column'
    }
  } // Editor.computed.computedButtonsClass = function () {
  
  Editor.computed.computedSubmitButtonClassList = function () {
    if (this.awaitSubmit === true) {
      return 'disabled'
    }
  } // Editor.computed.computedSubmitButtonClassList = function () {
  
  Editor.computed.computedSubmitButtonStyle = function () {
    let type = this.annotation.type
    let buttonStyle = this.status.readingConfig.annotationTypeModules[type].style.button
    return {
      color: buttonStyle.color,
      'background-color': buttonStyle.backgroundColor,
    }
  } // Editor.computed.computedSubmitButtonClassList = function () {
}