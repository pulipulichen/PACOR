'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ReadingActivityLog extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('JSONCase', 'log')
    this.addTrait('DateUnixMS')
    this.addTrait('ReadingActivityLog/ReadingActivityLogSave')
  }
  
  static async findLog (webpageID, userID, type) {
    if (typeof(webpageID) === 'object'
            && typeof(webpageID.primaryKeyValue) === 'number') {
      webpageID = webpageID.primaryKeyValue
    }
    
    if (typeof(userID) === 'object'
            && typeof(userID.primaryKeyValue) === 'number') {
      userID = userID.primaryKeyValue
    }
    
    let result = await ReadingActivityLog
            .query()
            .where('webpage_id', webpageID)
            .where('user_id', userID)
            .where('type', type)
            .fetch()
    
    return result.toJSON()
  }
  
  // --------------------------------------------
  
  user() {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  withUsers () {
    return this.hasMany('App/Models/ReadingActivityWithUser')
  }
}

module.exports = ReadingActivityLog
