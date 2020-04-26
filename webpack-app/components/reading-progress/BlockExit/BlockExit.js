let preventExit = function (event) {
  //var message = 'Important: Please click on \'Save\' button to leave this page.';
  /*
  if (typeof (event) === 'undefined') {
    event = window.event
  }
  if (event) {
    event.returnValue = message
  }
  return message
  */
  event.returnValue = ''
}

let preventFunctionKeysList = ['F1', 'F3', 'F6', 'F12']
let preventFunctionKeys = function (event) {
  //console.log(event)
  //console.log(event.key)
  if (preventFunctionKeysList.indexOf(event.key) > -1) {
    event.preventDefault()
    return false
  }
}

let BlockExit = {
  data() {
    return {
    }
  },
  created: function () {
    //return // for test
    window.addEventListener('beforeunload', preventExit, true)
    document.body.addEventListener('keydown', preventFunctionKeys, true)
  },
  destroyed: function () {
    window.removeEventListener('beforeunload', preventExit, true)
    document.body.removeEventListener('keydown', preventFunctionKeys, true)
    //console.log('destroyed')
  }
}

export default BlockExit