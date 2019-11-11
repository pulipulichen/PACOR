export default (Editor) => {
  Editor.computed.computedButtonsClass = function () {
    let vm = this
    if (vm.status.preference === null
            || vm.status.preference.leftHanded === false) {
      return 'right aligned column'
    } else {
      return 'column'
    }
  }
}