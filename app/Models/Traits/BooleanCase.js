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
    
    Model.addHook('afterFind', async (instance) => {
      attrs.forEach(attr => {
        if (instance[attr] !== null 
                && typeof(instance[attr]) === 'number') {
          instance[attr] = (instance[attr] === 1)
        }
      })
    })
  }
}

module.exports = BooleanCase
