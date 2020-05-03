'use strict'

const Config = use('Config')
const DateHelper = use('App/Helpers/DateHelper')

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
    
    Model.addHook('beforeCreate', async (instance) => {
      instance[createdAtColumn] = DateHelper.getTime()
      instance[updatedAtColumn] = DateHelper.getTime()
    })
    
    Model.addHook('beforeUpdate', async (instance) => {
      instance[updatedAtColumn] = DateHelper.getTime()
    })
  }
}

module.exports = DateUnixMS
