'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('App/Models/CustomizedModel/CustomizedModel')

class Notification extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
}

module.exports = Notification
