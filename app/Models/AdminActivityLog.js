'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AdminActivityLog extends Model {
  static async log (userID, type, log) {
    if (typeof(userID) === 'object'
            && typeof(userID.primaryKeyValue) === 'number') {
      userID = userID.primaryKeyValue
    }
    
    let logInstance = new AdminActivityLog
    
    logInstance.user_id = userID
    logInstance.type = type
    if (typeof(log) !== 'undefined') {
      logInstance.log = log
    }
    await logInstance.save()
  }
  
  
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = AdminActivityLog
