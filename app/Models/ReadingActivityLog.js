'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ReadingActivityLog extends Model {
  static async log (webpageID, userID, type, log) {
    if (typeof(webpageID) === 'object'
            && typeof(webpageID.primaryKeyValue) === 'number') {
      webpageID = webpageID.primaryKeyValue
    }
    
    if (typeof(userID) === 'object'
            && typeof(userID.primaryKeyValue) === 'number') {
      userID = userID.primaryKeyValue
    }
    
    let logInstance = new ReadingActivityLog
    
    logInstance.webpage_id = webpageID
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
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
}

module.exports = ReadingActivityLog
