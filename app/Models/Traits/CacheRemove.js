'use strict'

const Cache = use('Cache')

class CacheRemove {
  
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
          //console.log(instance[attr])
        }
      })
    })
    
    // ------------------------------------------
  }
}

module.exports = CacheRemove
