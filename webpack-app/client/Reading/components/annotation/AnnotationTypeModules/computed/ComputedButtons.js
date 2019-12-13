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
}