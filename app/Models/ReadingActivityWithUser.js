'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ReadingActivityWithUser extends Model {
  
  static boot () {
    super.boot()
    
    this.addTrait('NoTimestamp')
  }
  
  user() {
    return this.belongsTo('App/Models/User')
  }
  
}

module.exports = ReadingActivityWithUser
