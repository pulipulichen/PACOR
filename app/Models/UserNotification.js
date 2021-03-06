'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserNotification extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('JSONCase', 'summary')
    
    this.addTrait('DateUnixMS')
    
    //this.addTrait('CacheRemove')
    
    this.addTrait('UserNotification/UserNotificationFind')
    this.addTrait('UserNotification/UserNotificationSave')
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  triggerUser () {
    return this.belongsTo('App/Models/User', 'trigger_user_id')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  static get hidden () {
    //return ['password']
    return ['webpage_id', 'deleted', 'created_at', 'updated_at', 
      //'created_at_unixms'
      'updated_at_unixms'
    ]
    //return ['webpage_id', 'created_at']
  }
}

module.exports = UserNotification
