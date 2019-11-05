'use strict'

class IntegerCase {

  register (Model, attrs) {
    if (typeof(attrs) === 'string') {
      attrs = [attrs]
    }
    
    // --------------------------
    //console.log(attrs)
    attrs.forEach(attr => {
      Model.prototype[attr] = function (value) {
        if (isNaN(value) === false 
                && typeof(value) === 'string') {
          //console.log(value)
          value = parseInt(value, 10)
        }
        return value
      }
    })
    
  }
}

module.exports = IntegerCase
