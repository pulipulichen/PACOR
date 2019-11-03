'use strict'

const Config = use('Config')

/**
 * 
    // table.bigInteger('created_at_unixms').notNullable()
    // table.bigInteger('updated_at_unixms').notNullable()
 */
class DateUnixMS {
  
  register (Model, attrs) {
    
    let createdAtColumn = 'created_at_unixms'
    let updatedAtColumn = 'updated_at_unixms'
    
    // --------------------------
    
    let getTime = () => {
      return (new Date()).getTime()
    }
    
    Model.addHook('beforeCreate', async (instance) => {
      instance[createdAtColumn] = getTime()
      instance[updatedAtColumn] = getTime()
    })
    
    Model.addHook('beforeUpdate', async (instance) => {
      instance[updatedAtColumn] = getTime()
    })
  }
}

module.exports = DateUnixMS
