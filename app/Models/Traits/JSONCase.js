'use strict'

const Config = use('Config')

class JSONCase {
  
  getDatabaseClient () {
    let connection = Config.get('database.connection')
    return Config.get(`database.${connection}.client`)
  }
  
  register (modal, attrs) {
    if (this.getDatabaseClient() !== 'sqlite3') {
      return
    }
    
    if (typeof(attrs) === 'string') {
      attrs = [attrs]
    }
    
    modal.addHook('beforeSave', async (instance) => {
      attrs.forEach(attr => {
        if (instance[attr] !== null && typeof(instance[attr]) === 'object') {
          instance[attr] = JSON.stringify(instance[attr])
        }
      })
    })
    
    modal.addHook('afterFind', async (instance) => {
      attrs.forEach(attr => {
        if (instance[attr] !== null 
                && typeof(instance[attr]) === 'string'
                && instance[attr].startsWith('{')
                && instance[attr].endsWith('}')) {
          instance[attr] = JSON.parse(instance[attr])
        }
      })
    })
  }
}

module.exports = JSONCase
