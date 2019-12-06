'use strict'

let createExceptionTest = async function () {
  throw new Error('Stopped')
}

let TestConfigHelper = function (config, stopName) {
  let stopNumber
  if (typeof(stopName) === 'number') {
    stopNumber = stopName
  }
  
  let output = {}
  
  let i = 0
  for (let name in config) {
    if (stopNumber && i === stopNumber) {
      output[name] = createExceptionTest()
      break
    }
    else if (name === stopName) {
      output[name] = createExceptionTest()
      break
    }
    
    output[name] = config[name]
    i++
  }
  
  return output
}

module.exports = TestConfigHelper