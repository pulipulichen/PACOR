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
  
  webpages () {
    return this.hasMany('App/Models/Webpage')
  }
  
  assets () {
    return this.hasMany('App/Models/MaterialAsset')
  }
}

module.exports = Domain
