let VueHelper = {
  sleep: function (ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
  } 
}

export default VueHelper