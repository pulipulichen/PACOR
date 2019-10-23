let listener = function (event) {
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

let BlockExit = {
  data() {
    return {
    }
  },
  created: function () {
    window.addEventListener('beforeunload', listener, true)
  },
  destroyed: function () {
    window.removeEventListener('beforeunload', listener, true)
    //console.log('destroyed')
  }
}

export default BlockExit