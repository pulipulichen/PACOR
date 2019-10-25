'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ModelHelper = use('App/Helpers/ModelHelper')

class Notification extends Model {
  static boot () {
    super.boot()
    
    ModelHelper.addJSONCaseHook(this, 'properties')
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
}

module.exports = Notification
