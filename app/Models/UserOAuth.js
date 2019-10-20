'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('App/Models/CustomizedModel/CustomizedModel')

class UserOAuth extends Model {
  static get table () {
    return 'user_oauths'
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = UserOAuth
