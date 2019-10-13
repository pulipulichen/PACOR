'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Domain extends Model {
  
  /*
  static boot () {
    super.boot()
  }
  */
  
  users () {
    return this.hasMany('App/Models/User')
  }
  
  admins () {
    return this.hasMany('App/Models/User')
  }
  
  webpages () {
    return this.hasMany('App/Models/webpages')
  }
  
}

module.exports = Domain
