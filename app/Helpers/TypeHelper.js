'use strict'

let TypeHelper = {
  parseInt: async function (value) {
    if (typeof(value) === 'string'
            && isNaN(value) === false) {
      value = parseInt(value, 10)
    }
    
    if (typeof(value) === 'number') {
      return value
    }
  }
}

module.exports = TypeHelper