'use strict'

let TestConfigHelper = function (config, stopName) {
  let stopNumber
  if (typeof(stopName) === 'number') {
    stopNumber = stopName
  }
  
  let output = {}
  
  let i = 0
  for (let name in config) {
    if (stopNumber && i === stopNumber) {
      break
    }
    else if (name === stopName) {
      break
    }
    
    output[name] = config[name]
    i++
  }
  
  return output
}

module.exports = TestConfigHelper