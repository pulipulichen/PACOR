const CommonComputed = {
  computedButtonsClass(vm) {
    if (vm.status.preference === null
            || vm.status.preference.leftHanded === false) {
      return 'right aligned column'
    } else {
      return 'column'
    }
  },
  computedEditorHeight(vm) {
    let height
    if (vm.enableCollaboration === true
            && vm.lib.style.isStackWidth()) {
      height = (vm.lib.style.getClientHeight() / 2)
      height = `calc(${height}px - 12em)`
    } else {
      height = `calc(${vm.heightPX}px - 12em)`
    }
    //console.log(height)
    return height
  }
}

export default CommonComputed