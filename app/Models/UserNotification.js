'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserNotification extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('JSONCase', 'properties')
    this.addTrait('DateUnixMS')
    
    this.addTrait('CacheRemove')
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
  static get hidden () {
    //return ['password']
    return ['webpage_id', 'deleted', 'created_at', 'updated_at', 'created_at_unixms']
    //return ['webpage_id', 'created_at']
  }
}

module.exports = UserNotification
