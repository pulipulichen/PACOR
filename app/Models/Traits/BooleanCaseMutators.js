'use strict'

const Config = use('Config')

class BooleanCase {
  
  getDatabaseClient () {
    let connection = Config.get('database.connection')
    return Config.get(`database.${connection}.client`)
  }
  
  register (Model, attrs) {
    if (this.getDatabaseClient() !== 'sqlite3') {
      return
    }
    
    if (typeof(attrs) === 'string') {
      attrs = [attrs]
    }
    
    // --------------------------
    
    Model.addHook('beforeSave', async (instance) => {
      attrs.forEach(attr => {
        if (instance[attr] !== null && typeof(instance[attr]) === 'boolean') {
          if (instance[attr] === true) {
            instance[attr] = 1
          }
          else {
            instance[attr] = 0
          }
        }
      })
    })
    
    Model.addHook('afterFind', async (instance) => {
      attrs.forEach(attr => {
        if (instance[attr] !== null 
                && typeof(instance[attr]) === 'number') {
          instance[attr] = (instance[attr] === 1)
          console.log(instance[attr])
        }
      })
    })
    
    attrs.forEach(attr => {
      let setter = 'set' + attr
      
      Model.prototype[setter] = function (value) {
        if (typeof(value) === 'boolean') {
          if (value === true) {
            return 1
          }
          else {
            return 0
          }
        }
        return null
      }
      
      let getter = 'get' + attr
      Model.prototype[getter] = function (value) {
        if (value !== null 
                && typeof(value) === 'number') {
          return (value === 1)
        }
        else {
          return null
        }
      }
    })
    
    // ------------------------------------------
  }
}

module.exports = BooleanCase
